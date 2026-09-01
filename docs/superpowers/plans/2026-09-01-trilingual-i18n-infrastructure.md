# Trilingual i18n Infrastructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the SJ Hospital site serve three locales from one route tree, with English on its current unprefixed URLs and Sinhala and Tamil under `/si/` and `/ta/`, so that the only remaining work is writing the translations themselves.

**Architecture:** Every route moves under `src/app/[locale]`. `src/proxy.ts` rewrites unprefixed paths onto the `en` branch so English URLs never show a prefix, and redirects to a remembered locale when a cookie says so. Pure, unit-tested functions in `src/lib/i18n` hold all the locale reasoning; the Next.js glue stays thin enough to read in one screen.

**Tech Stack:** Next.js 16.2.11 (App Router), React 19.2.4, TypeScript strict, Tailwind CSS v4 (CSS-first), `node:test` with Node's native type stripping.

**Spec:** `docs/superpowers/specs/2026-09-01-trilingual-i18n-design.md`

**Branch:** `worktree-trilingual-i18n`, in the worktree at `.claude/worktrees/trilingual-i18n`. Do not merge to `main`.

## Scope

This plan covers spec phases 1 to 5, plus the content-overlay machinery from spec section 5.2. It deliberately does **not** translate any copy. When it is done: English behaves exactly as it does today, `/si/*` and `/ta/*` render the same pages with English text, the switcher works, internal links keep the reader inside their locale, and the merge and parity tooling is ready.

The per-feature translation work (spec phases 6 to 8, 15 features) is a separate plan, written after this one lands.

## Global Constraints

Every task's requirements implicitly include this section.

- **Next.js is 16.2.11 and differs from older versions.** Read the relevant guide in `node_modules/next/dist/docs/` before writing framework code. Do not code Next.js from memory.
- **`params` and `searchParams` are Promises.** Always `const { locale } = await params`. Same inside `generateMetadata`.
- **Middleware is Proxy.** The file is `src/proxy.ts` with a default or named `proxy` export. One proxy file per project.
- **`cacheComponents` is off.** Follow the "Caching and Revalidating (Previous Model)" guide, not the `use cache` model.
- **Server Components by default.** Add `'use client'` only for state, effects, event handlers or browser APIs, at the smallest leaf, never high in the tree.
- **Tailwind v4 is CSS-first.** Theme lives in `src/app/globals.css` via `@theme`. There is no `tailwind.config.js`.
- **Tests run under plain Node, not Next.** `npm test` is `node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test "src/**/*.test.ts"` on Node v24.19.0 with native type stripping. Two consequences that will bite you:
  - The `@/*` alias **does not resolve** under `node --test`. In any module reachable from a test, use relative imports **with an explicit `.ts` extension** (`./locales.ts`). `@/` is allowed only in `import type` statements, which are erased before Node sees them.
  - Only erasable TypeScript is allowed: **no `enum`, no `namespace`, no parameter properties.** `as const`, `satisfies` and type annotations are fine.
- **Never use the em dash** in UI copy, comments or documentation, in any encoding: the literal character, `&mdash;`, `&#8212;`, or `&#x2014;`. Use a comma, colon, semicolon, parentheses or a full stop.
- **Naming:** component files `PascalCase.tsx`, hooks `useXxx.ts`, route folders `kebab-case`.
- **Import via `@/*`** in application code. The relative-import exception above applies only to `src/lib/i18n/*` and `*.test.ts`.
- **Baseline:** `npm test` passes with 275 tests before this plan starts. It must never go down.

---

### Task 1: Locale primitives

The single source of truth for which locales exist. Everything else imports from here.

**Files:**
- Create: `src/lib/i18n/locales.ts`
- Test: `src/lib/i18n/locales.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `LOCALES: readonly ["en","si","ta"]`, `type Locale = "en" | "si" | "ta"`, `DEFAULT_LOCALE: Locale`, `PREFIXED_LOCALES: readonly ["si","ta"]`, `hasLocale(value: string): value is Locale`, `LOCALE_LABELS: Record<Locale, string>`, `LOCALE_COOKIE: string`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/i18n/locales.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_LOCALE,
  hasLocale,
  LOCALE_COOKIE,
  LOCALE_LABELS,
  LOCALES,
  PREFIXED_LOCALES,
} from "./locales.ts";

test("three locales, English first and default", () => {
  assert.deepEqual([...LOCALES], ["en", "si", "ta"]);
  assert.equal(DEFAULT_LOCALE, "en");
});

test("only Sinhala and Tamil carry a URL prefix", () => {
  assert.deepEqual([...PREFIXED_LOCALES], ["si", "ta"]);
  assert.ok(!(PREFIXED_LOCALES as readonly string[]).includes(DEFAULT_LOCALE));
});

test("hasLocale accepts the three and rejects everything else", () => {
  for (const locale of LOCALES) assert.ok(hasLocale(locale));
  for (const other of ["", "EN", "en-US", "fr", "contact-us", "si/", "..", "sitemap"]) {
    assert.ok(!hasLocale(other), `${other} must not be treated as a locale`);
  }
});

// A reader picks their language out of a menu by recognising its own script,
// so an English transliteration would defeat the control.
test("each language is labelled in its own script", () => {
  assert.equal(LOCALE_LABELS.en, "English");
  // Escapes rather than literal characters: this assertion must keep working
  // whatever a future editor does to the file's encoding.
  assert.match(LOCALE_LABELS.si, /[\u0D80-\u0DFF]/, "Sinhala label must use Sinhala characters");
  assert.match(LOCALE_LABELS.ta, /[\u0B80-\u0BFF]/, "Tamil label must use Tamil characters");
});

test("every locale has a label, with no gaps", () => {
  assert.deepEqual(Object.keys(LOCALE_LABELS).sort(), [...LOCALES].sort());
});

test("the cookie name is site-scoped", () => {
  assert.equal(LOCALE_COOKIE, "sj-locale");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL, `Cannot find module` for `./locales.ts`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/i18n/locales.ts`:

```ts
/**
 * The three locales the site ships in. English is the default and the only one
 * served without a path prefix, so `/contact-us` is English while
 * `/si/contact-us` and `/ta/contact-us` are the other two. Keeping English off
 * the prefix list is what lets every existing URL and inbound link keep working.
 */
export const LOCALES = ["en", "si", "ta"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** The locales that appear in a URL. `en` is served from the bare path. */
export const PREFIXED_LOCALES = ["si", "ta"] as const;

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Each language named in its own script. A reader scanning the switcher
 * recognises the shape of their own language before they read any of it, so
 * these are never transliterated into English.
 */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};

/**
 * Remembers an explicit choice from the switcher. Read in `src/proxy.ts` only:
 * reading it inside a page would opt that page out of static rendering.
 */
export const LOCALE_COOKIE = "sj-locale";
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, total climbs from 275 to 281.

- [ ] **Step 5: Commit**

```bash
git add src/lib/i18n/locales.ts src/lib/i18n/locales.test.ts
git commit -m "feat(i18n): name the three locales and the cookie that remembers one"
```

---

### Task 2: Locale path helpers

Pure string functions for splitting a locale off a path, moving a path into a locale, and prefixing an href. All URL reasoning in the app funnels through these.

**Files:**
- Create: `src/lib/i18n/paths.ts`
- Test: `src/lib/i18n/paths.test.ts`

**Interfaces:**
- Consumes: `Locale`, `DEFAULT_LOCALE`, `PREFIXED_LOCALES` from `./locales.ts`.
- Produces:
  - `splitLocale(pathname: string): { locale: Locale; rest: string }`
  - `localePath(path: string, locale: Locale): string`
  - `internalDefaultPath(path: string): string`
  - `swapLocale(pathname: string, target: Locale): string`
  - `localeHref(href: string, locale: Locale): string`

- [ ] **Step 1: Write the failing test**

Create `src/lib/i18n/paths.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  internalDefaultPath,
  localeHref,
  localePath,
  splitLocale,
  swapLocale,
} from "./paths.ts";

test("an unprefixed path is English, and keeps its whole path", () => {
  assert.deepEqual(splitLocale("/"), { locale: "en", rest: "/" });
  assert.deepEqual(splitLocale("/contact-us"), { locale: "en", rest: "/contact-us" });
  assert.deepEqual(splitLocale("/services/cardiology"), {
    locale: "en",
    rest: "/services/cardiology",
  });
});

test("a prefixed path yields its locale and the path underneath", () => {
  assert.deepEqual(splitLocale("/si"), { locale: "si", rest: "/" });
  assert.deepEqual(splitLocale("/si/"), { locale: "si", rest: "/" });
  assert.deepEqual(splitLocale("/ta/contact-us"), { locale: "ta", rest: "/contact-us" });
  assert.deepEqual(splitLocale("/si/services/cardiology"), {
    locale: "si",
    rest: "/services/cardiology",
  });
});

// A route that merely starts with the same letters is not a locale prefix.
// `/site-map` must not be read as Sinhala.
test("a prefix only counts on a whole segment", () => {
  assert.deepEqual(splitLocale("/site-map"), { locale: "en", rest: "/site-map" });
  assert.deepEqual(splitLocale("/talks"), { locale: "en", rest: "/talks" });
  assert.deepEqual(splitLocale("/services/silver"), {
    locale: "en",
    rest: "/services/silver",
  });
});

test("localePath moves a path under a prefix, and leaves English bare", () => {
  assert.equal(localePath("/contact-us", "en"), "/contact-us");
  assert.equal(localePath("/contact-us", "si"), "/si/contact-us");
  assert.equal(localePath("/", "ta"), "/ta");
  assert.equal(localePath("/", "en"), "/");
});

// English pages physically live under app/[locale], so the proxy needs the
// real internal path even though the address bar never shows it.
test("internalDefaultPath exposes where English actually lives", () => {
  assert.equal(internalDefaultPath("/"), "/en");
  assert.equal(internalDefaultPath("/contact-us"), "/en/contact-us");
});

test("swapLocale lands on the same page in another language", () => {
  assert.equal(swapLocale("/contact-us", "si"), "/si/contact-us");
  assert.equal(swapLocale("/si/contact-us", "ta"), "/ta/contact-us");
  assert.equal(swapLocale("/si/contact-us", "en"), "/contact-us");
  assert.equal(swapLocale("/ta", "en"), "/");
  assert.equal(swapLocale("/", "si"), "/si");
});

test("swapping to the locale you are already in changes nothing", () => {
  assert.equal(swapLocale("/si/services", "si"), "/si/services");
  assert.equal(swapLocale("/services", "en"), "/services");
});

test("localeHref prefixes internal links only", () => {
  assert.equal(localeHref("/services", "si"), "/si/services");
  assert.equal(localeHref("/", "si"), "/si");
  assert.equal(localeHref("/services", "en"), "/services");
});

// Everything that does not point inside this site must survive untouched, or
// the footer's phone, mail and social links break in two locales out of three.
test("localeHref leaves anything that is not an internal path alone", () => {
  for (const href of [
    "#reach",
    "tel:+94117848484",
    "mailto:info@sjhospital.lk",
    "https://wa.me/94742223334",
    "//cdn.example.com/x.png",
  ]) {
    assert.equal(localeHref(href, "si"), href, `${href} must not be rewritten`);
  }
});

// Applying the pass twice must not produce /si/si/services.
test("localeHref is idempotent on an already-prefixed href", () => {
  assert.equal(localeHref("/si/services", "si"), "/si/services");
  assert.equal(localeHref(localeHref("/services", "ta"), "ta"), "/ta/services");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL, `Cannot find module` for `./paths.ts`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/i18n/paths.ts`:

```ts
import { DEFAULT_LOCALE, PREFIXED_LOCALES, type Locale } from "./locales.ts";

/**
 * Matches a locale prefix only when it occupies a whole first segment, so
 * `/site-map` and `/talks` stay English routes rather than being read as
 * Sinhala and Tamil.
 */
const PREFIX_PATTERN = new RegExp(`^/(${PREFIXED_LOCALES.join("|")})(?=/|$)`);

export type SplitPath = {
  locale: Locale;
  rest: string;
};

/**
 * Split a pathname into the locale it names and the path underneath it.
 * `/contact-us` and `/si/contact-us` both come back with rest `/contact-us`,
 * which is exactly what makes switching language a prefix swap rather than a
 * lookup through a map of translated slugs.
 */
export function splitLocale(pathname: string): SplitPath {
  const match = PREFIX_PATTERN.exec(pathname);
  if (!match) return { locale: DEFAULT_LOCALE, rest: pathname };

  const rest = pathname.slice(match[0].length);
  return {
    locale: match[1] as Locale,
    rest: rest === "" || rest === "/" ? "/" : rest,
  };
}

/** Move a site-root-relative path under a locale. English stays bare. */
export function localePath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Where an English page really lives. The whole tree sits under
 * `app/[locale]`, so `/contact-us` is served by `/en/contact-us` behind a
 * proxy rewrite that keeps the short URL in the address bar.
 */
export function internalDefaultPath(path: string): string {
  return path === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${path}`;
}

/** The same page in another language. */
export function swapLocale(pathname: string, target: Locale): string {
  return localePath(splitLocale(pathname).rest, target);
}

/**
 * Prefix an href, but only when it points inside this site. Fragments,
 * `tel:`, `mailto:`, absolute URLs and protocol-relative URLs are returned
 * untouched, and an href that already carries a prefix is left as it is so
 * the pass can run twice without producing `/si/si/services`.
 */
export function localeHref(href: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return href;
  if (!href.startsWith("/")) return href;
  if (href.startsWith("//")) return href;
  if (splitLocale(href).locale !== DEFAULT_LOCALE) return href;
  return localePath(href, locale);
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, total climbs to 291.

- [ ] **Step 5: Commit**

```bash
git add src/lib/i18n/paths.ts src/lib/i18n/paths.test.ts
git commit -m "feat(i18n): split, swap and prefix locale paths"
```

---

### Task 3: Proxy route resolution

The decision the proxy makes, as a pure function, so it can be tested without a Next.js request.

**Files:**
- Create: `src/lib/i18n/resolveLocaleRoute.ts`
- Test: `src/lib/i18n/resolveLocaleRoute.test.ts`

**Interfaces:**
- Consumes: `DEFAULT_LOCALE`, `hasLocale` from `./locales.ts`; `internalDefaultPath`, `localePath`, `splitLocale` from `./paths.ts`.
- Produces: `type RouteAction = { kind: "pass" } | { kind: "redirect"; pathname: string } | { kind: "rewrite"; pathname: string }` and `resolveLocaleRoute(pathname: string, cookieLocale: string | undefined): RouteAction`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/i18n/resolveLocaleRoute.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveLocaleRoute } from "./resolveLocaleRoute.ts";

test("an already-prefixed path is served as it stands", () => {
  assert.deepEqual(resolveLocaleRoute("/si/contact-us", undefined), { kind: "pass" });
  assert.deepEqual(resolveLocaleRoute("/ta", "si"), { kind: "pass" });
});

// No cookie means no opinion, so English is served from the bare URL. This is
// the branch every crawler takes, which is why it must never be a redirect.
test("no cookie serves English without changing the URL", () => {
  assert.deepEqual(resolveLocaleRoute("/contact-us", undefined), {
    kind: "rewrite",
    pathname: "/en/contact-us",
  });
  assert.deepEqual(resolveLocaleRoute("/", undefined), {
    kind: "rewrite",
    pathname: "/en",
  });
});

test("a remembered choice redirects to that locale", () => {
  assert.deepEqual(resolveLocaleRoute("/contact-us", "si"), {
    kind: "redirect",
    pathname: "/si/contact-us",
  });
  assert.deepEqual(resolveLocaleRoute("/", "ta"), {
    kind: "redirect",
    pathname: "/ta",
  });
});

test("a cookie saying English serves English, without redirecting", () => {
  assert.deepEqual(resolveLocaleRoute("/contact-us", "en"), {
    kind: "rewrite",
    pathname: "/en/contact-us",
  });
});

test("a junk cookie is ignored rather than trusted", () => {
  for (const junk of ["", "fr", "EN", "en-US", "../etc", "si;ta"]) {
    assert.deepEqual(
      resolveLocaleRoute("/contact-us", junk),
      { kind: "rewrite", pathname: "/en/contact-us" },
      `cookie ${junk} must fall back to English`
    );
  }
});

// /en/... is reachable by hand and would otherwise serve the same page at two
// URLs, which splits its search ranking.
test("an explicit /en URL redirects to the canonical bare path", () => {
  assert.deepEqual(resolveLocaleRoute("/en/contact-us", undefined), {
    kind: "redirect",
    pathname: "/contact-us",
  });
  assert.deepEqual(resolveLocaleRoute("/en", undefined), {
    kind: "redirect",
    pathname: "/",
  });
});

// The property that matters most: following the redirects must always stop.
// Chains are allowed and one real case produces one: /en with a Sinhala cookie
// goes /en -> / -> /si, which is correct behaviour, not a loop. What must never
// happen is a chain that fails to terminate.
test("following redirects always terminates", () => {
  const paths = ["/", "/contact-us", "/services/cardiology", "/en", "/en/services", "/si", "/si/x"];
  const cookies = [undefined, "en", "si", "ta", "junk"];

  for (const path of paths) {
    for (const cookie of cookies) {
      const seen = new Set([path]);
      let current = path;

      for (let hop = 0; hop < 5; hop += 1) {
        const action = resolveLocaleRoute(current, cookie);
        if (action.kind !== "redirect") break;

        assert.ok(
          !seen.has(action.pathname),
          `${path} with cookie ${cookie} redirects back to ${action.pathname}, a loop`
        );
        seen.add(action.pathname);
        current = action.pathname;
      }

      assert.notEqual(
        resolveLocaleRoute(current, cookie).kind,
        "redirect",
        `${path} with cookie ${cookie} was still redirecting after 5 hops`
      );
    }
  }
});

// The chain above, pinned explicitly so the two-hop case is a documented
// decision rather than an accident nobody noticed.
test("an explicit /en with a Sinhala cookie lands on Sinhala in two hops", () => {
  assert.deepEqual(resolveLocaleRoute("/en/contact-us", "si"), {
    kind: "redirect",
    pathname: "/contact-us",
  });
  assert.deepEqual(resolveLocaleRoute("/contact-us", "si"), {
    kind: "redirect",
    pathname: "/si/contact-us",
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL, `Cannot find module` for `./resolveLocaleRoute.ts`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/i18n/resolveLocaleRoute.ts`:

```ts
import { DEFAULT_LOCALE, hasLocale } from "./locales.ts";
import { internalDefaultPath, localePath, splitLocale } from "./paths.ts";

export type RouteAction =
  | { kind: "pass" }
  | { kind: "redirect"; pathname: string }
  | { kind: "rewrite"; pathname: string };

const DEFAULT_PREFIX = `/${DEFAULT_LOCALE}`;

/**
 * What the proxy should do with an incoming path.
 *
 * There is deliberately no `Accept-Language` inspection. Plenty of readers in
 * Sri Lanka browse with `en-US` set whatever language they actually read, so
 * sniffing guesses wrong often, and a wrong guess strands the reader. Only an
 * explicit choice from the switcher, remembered in a cookie, moves anyone.
 *
 * A crawler carries no cookie and therefore always takes the rewrite branch,
 * seeing stable English at the canonical URL with hreflang alternates.
 */
export function resolveLocaleRoute(
  pathname: string,
  cookieLocale: string | undefined
): RouteAction {
  // Already in Sinhala or Tamil: nothing to decide.
  if (splitLocale(pathname).locale !== DEFAULT_LOCALE) return { kind: "pass" };

  // `/en/...` is reachable by hand and would serve every English page at a
  // second URL, so it collapses onto the canonical bare path.
  if (pathname === DEFAULT_PREFIX || pathname.startsWith(`${DEFAULT_PREFIX}/`)) {
    const bare = pathname.slice(DEFAULT_PREFIX.length);
    return { kind: "redirect", pathname: bare === "" ? "/" : bare };
  }

  const remembered =
    cookieLocale !== undefined && hasLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  if (remembered !== DEFAULT_LOCALE) {
    return { kind: "redirect", pathname: localePath(pathname, remembered) };
  }

  return { kind: "rewrite", pathname: internalDefaultPath(pathname) };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, total climbs to 299.

- [ ] **Step 5: Commit**

```bash
git add src/lib/i18n/resolveLocaleRoute.ts src/lib/i18n/resolveLocaleRoute.test.ts
git commit -m "feat(i18n): decide rewrite, redirect or pass for every incoming path"
```

---

### Task 4: Locale route tree and proxy

Move every route under `app/[locale]` and wire the proxy. These ship together because neither works alone: the tree without the proxy 404s every existing URL, and the proxy without the tree rewrites to nothing.

**Files:**
- Move: `src/app/layout.tsx` to `src/app/[locale]/layout.tsx` with `git mv`, then edit it in place. It is not deleted and not rewritten from scratch: the four font declarations and the metadata export must survive the move untouched.
- Move: every route directory and `page.tsx` under `src/app` into `src/app/[locale]/`, with `git mv`
- Create: `src/proxy.ts`
- Leave in place: `src/app/globals.css`, `src/app/globals.test.ts`, `src/app/icon.png`

**Interfaces:**
- Consumes: `LOCALES`, `hasLocale`, `LOCALE_COOKIE`, `type Locale` from `@/lib/i18n/locales`; `resolveLocaleRoute` from `@/lib/i18n/resolveLocaleRoute`.
- Produces: a `[locale]` route param available to every page and layout as `Promise<{ locale: string }>`.

- [ ] **Step 1: Read the Next.js docs for this task**

Run: `sed -n '1,120p' node_modules/next/dist/docs/01-app/02-guides/internationalization.md`

Confirm two things before touching files: all special files must sit under the dynamic segment, and the root layout may live inside it.

- [ ] **Step 2: Move the routes with git mv, so history follows**

```bash
mkdir -p "src/app/[locale]"
for entry in about-us accommodation careers contact-us e-channeling facilities \
             health-tips home-care international-care media network pharmacy \
             privacy-policy school-wellness services page.tsx; do
  git mv "src/app/$entry" "src/app/[locale]/$entry"
done
git mv src/app/layout.tsx "src/app/[locale]/layout.tsx"
ls src/app
```

Expected remaining directly under `src/app`: `[locale]`, `globals.css`, `globals.test.ts`, `icon.png`.

- [ ] **Step 3: Turn the moved layout into a locale-aware root layout**

Edit `src/app/[locale]/layout.tsx`. Change the stylesheet import, add the static params and the guard, and drive `lang` from the segment. The four font declarations and the `metadata` export stay exactly as they are for now: Task 5 adds the Sinhala and Tamil families, Task 8 makes the metadata per-locale.

Replace the import line:

```ts
import "./globals.css";
```

with:

```ts
import { notFound } from "next/navigation";
import { LOCALES, hasLocale } from "@/lib/i18n/locales";
import "../globals.css";
```

Replace the whole `RootLayout` function with:

```tsx
/**
 * Prerender all three locales. Without this the tree is dynamic and every page
 * loses static rendering, which is the whole reason the cookie is read in the
 * proxy rather than in a page.
 */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;

  // A path such as /xx/contact-us must be a 404, not an English page wearing a
  // nonsense prefix.
  if (!hasLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${plusJakartaSans.variable} ${sora.variable} ${bricolageGrotesque.variable} ${manrope.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Write the proxy**

Create `src/proxy.ts`:

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/lib/i18n/locales";
import { resolveLocaleRoute } from "@/lib/i18n/resolveLocaleRoute";

/**
 * Keeps English on its historic unprefixed URLs while the route tree lives
 * under `app/[locale]`.
 *
 * Every decision is made by `resolveLocaleRoute`, which is a pure function with
 * its own tests. This file is only the Next.js glue, and stays that way: the
 * proxy runs on every request, so it must never fetch data.
 */
export function proxy(request: NextRequest) {
  const action = resolveLocaleRoute(
    request.nextUrl.pathname,
    request.cookies.get(LOCALE_COOKIE)?.value
  );

  if (action.kind === "pass") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = action.pathname;

  return action.kind === "redirect"
    ? NextResponse.redirect(url)
    : NextResponse.rewrite(url);
}

export const config = {
  // Everything except Next internals, API routes, and any path with a file
  // extension, which covers icon.png, the sitemap and the rest of the static
  // assets.
  matcher: ["/((?!_next|api|.*\\.[a-zA-Z0-9]+$).*)"],
};
```

- [ ] **Step 5: Run the unit tests, which must still pass untouched**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, 299 tests. Nothing here changes any tested module, so a failure means a route move broke an import.

- [ ] **Step 6: Build, which is the real check on the route move**

Run: `npm run build 2>&1 | tail -40`
Expected: build succeeds. In the route list every page appears three times, as `/en/...`, `/si/...` and `/ta/...`, and they are prerendered rather than dynamic.

If the build complains that a page's `params` is not awaited, that page needs `const { locale } = await params` before use. Fix each one it names.

One failure is known in advance. `src/app/[locale]/services/[slug]/page.tsx` types its own params by hand as `{ params: Promise<{ slug: string }> }`, which is now wrong because the route has two dynamic segments. Change both `generateStaticParams` and `generateMetadata` there to account for the locale, typing the params as `Promise<{ locale: string; slug: string }>`. Leave the slug list and the metadata body alone: `serviceSlugs` and `getService` still come from `@/features/services/data/services`.

- [ ] **Step 7: Verify the URLs by hand**

Run `npm run dev`, then in another terminal:

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/contact-us
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/si/contact-us
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/en/contact-us
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://localhost:3000/xx/contact-us
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/icon.png
```

Expected, in order: `200` with no redirect, `200`, `307` to `/contact-us`, `404`, `200`.

Then open `http://localhost:3000/` in a browser and confirm the home page is unchanged, and `http://localhost:3000/si/` renders the same page in English with `<html lang="si">`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(i18n): serve every route from a locale tree, English unprefixed

Move the 17 pages under app/[locale] and add src/proxy.ts, which rewrites
bare paths onto the en branch so English URLs are unchanged, redirects to
a remembered locale when the cookie names one, and collapses a hand-typed
/en/... onto its canonical bare path."
```

---

### Task 5: Sinhala and Tamil type

None of the four current families contains a Sinhala or Tamil glyph, so without this every translated string falls back to whatever the operating system supplies.

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: the `locale` already resolved in the root layout.
- Produces: CSS variables `--font-noto-sinhala`, `--font-gemunu`, `--font-noto-tamil`, `--font-catamaran`, and per-locale rebinding of `--font-sans` and `--font-heading`.

- [ ] **Step 1: Declare the four families in the root layout**

In `src/app/[locale]/layout.tsx`, extend the existing `next/font/google` import and add four declarations beside the current ones:

```ts
import {
  Plus_Jakarta_Sans,
  Sora,
  Bricolage_Grotesque,
  Manrope,
  Noto_Sans_Sinhala,
  Gemunu_Libre,
  Noto_Sans_Tamil,
  Catamaran,
} from "next/font/google";

// preload is off for these four on purpose. All eight families are declared in
// one module, so preloading would make an English reader fetch Sinhala and
// Tamil files they will never see. Without the preload hint a browser fetches a
// face only when text actually uses it, which is exactly the behaviour wanted.
const notoSansSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
  preload: false,
  display: "swap",
});

const gemunuLibre = Gemunu_Libre({
  variable: "--font-gemunu",
  subsets: ["sinhala"],
  weight: ["400", "600", "700", "800"],
  preload: false,
  display: "swap",
});

const notoSansTamil = Noto_Sans_Tamil({
  variable: "--font-noto-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
  preload: false,
  display: "swap",
});

const catamaran = Catamaran({
  variable: "--font-catamaran",
  subsets: ["tamil", "latin"],
  weight: ["400", "600", "700", "800"],
  preload: false,
  display: "swap",
});
```

- [ ] **Step 2: Attach all eight variables to the html element**

In the same file, extend the `className` on `<html>`:

```tsx
className={`${plusJakartaSans.variable} ${sora.variable} ${bricolageGrotesque.variable} ${manrope.variable} ${notoSansSinhala.variable} ${gemunuLibre.variable} ${notoSansTamil.variable} ${catamaran.variable} antialiased`}
```

Declaring all eight is safe. Which ones are actually referenced is decided by the CSS in the next step, keyed off `lang`.

- [ ] **Step 3: Rebind the two role variables per locale**

Append to `src/app/globals.css`, after the `@theme inline` block:

```css
/* Sinhala and Tamil type.
   --font-sans and --font-heading are declared in @theme inline, which means the
   generated utilities read the variable rather than baking in a value, so
   rebinding them here re-points every existing font-sans and font-heading
   utility without touching a single component.
   Latin fallbacks stay in each stack: a Sinhala page still renders English
   proper nouns, phone numbers and the brand name. */
html[lang="si"] {
  --font-sans: var(--font-noto-sinhala), var(--font-plus-jakarta-sans), system-ui, sans-serif;
  --font-heading: var(--font-gemunu), var(--font-sora), system-ui, sans-serif;
}

html[lang="ta"] {
  --font-sans: var(--font-noto-tamil), var(--font-plus-jakarta-sans), system-ui, sans-serif;
  --font-heading: var(--font-catamaran), var(--font-sora), system-ui, sans-serif;
}

/* Both scripts carry taller ascenders and descenders than Latin and crowd
   themselves at Latin line-heights. This is a floor, not a rule: any component
   that sets its own leading utility still wins, and the ones that then look
   cramped get fixed individually during the QA sweep. */
@layer base {
  html[lang="si"] body,
  html[lang="ta"] body {
    line-height: 1.75;
  }
}
```

- [ ] **Step 4: Build, which is what validates the font names, subsets and weights**

Run: `npm run build 2>&1 | tail -30`
Expected: build succeeds. `next/font/google` fails the build loudly on an unknown family, an unavailable subset or a weight that does not exist, so a green build is the confirmation that all four picks are real.

If a subset or weight is rejected, read the error, correct that declaration, and build again.

- [ ] **Step 5: Confirm an English page downloads no Sinhala or Tamil bytes**

Run `npm run dev`, open `http://localhost:3000/` with the browser's network panel filtered to fonts, and hard-reload.

Expected: only Latin faces are fetched, and no request mentions sinhala, tamil, gemunu or catamaran. Then open `http://localhost:3000/si/` and confirm the Sinhala faces are fetched there. Since no Sinhala text exists yet, confirm the swap instead by inspecting `<html>` in the element panel: its computed `--font-sans` must resolve to the Noto Sans Sinhala stack.

- [ ] **Step 6: Run the CSS test**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, 299 tests. `src/app/globals.test.ts` asserts things about this stylesheet, so if it fails, read what it pins before changing anything.

- [ ] **Step 7: Commit**

```bash
git add src/app/[locale]/layout.tsx src/app/globals.css
git commit -m "feat(i18n): give Sinhala and Tamil real type instead of OS fallback"
```

---

### Task 6: Keep internal links inside their locale

354 internal hrefs point at absolute paths such as `/services`. On a Sinhala page every one of them currently drops the reader back into English on the first click. This task fixes the chrome, which every page shares; per-feature body links follow in the content plan.

**Files:**
- Create: `src/lib/i18n/useLocale.ts`
- Create: `src/components/i18n/LocaleLink.tsx`
- Modify: `src/components/layout/ThemedHeader.tsx`
- Modify: `src/components/layout/MobileNavPanel.tsx`
- Modify: `src/components/layout/ThemedFooter.tsx`

**Interfaces:**
- Consumes: `localeHref`, `splitLocale` from `@/lib/i18n/paths`; `type Locale`, `DEFAULT_LOCALE` from `@/lib/i18n/locales`.
- Produces: `useLocale(): Locale` and `<LocaleLink href className children />`.

- [ ] **Step 1: Write the hook**

Create `src/lib/i18n/useLocale.ts`:

```ts
"use client";

import { usePathname } from "next/navigation";
import { splitLocale } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";

/**
 * The locale of the page currently on screen, read from the address bar.
 *
 * This works because an English page is served from its bare URL: the rewrite
 * onto `/en` happens inside the proxy and never reaches the browser, so a
 * pathname with no prefix is English by definition. Deriving it here means no
 * provider to mount and no locale prop threaded through twenty components.
 */
export function useLocale(): Locale {
  return splitLocale(usePathname()).locale;
}
```

- [ ] **Step 2: Write the link component**

Create `src/components/i18n/LocaleLink.tsx`:

```tsx
"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/lib/i18n/useLocale";
import { localeHref } from "@/lib/i18n/paths";

type LocaleLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/**
 * An anchor that keeps the reader in the language they are already reading.
 *
 * A plain `<a>` is deliberate rather than `next/link`: these are the footer and
 * chrome links, several of them are same-document fragments, and the existing
 * markup they replace is a plain anchor. `localeHref` leaves fragments, `tel:`,
 * `mailto:` and absolute URLs untouched, so one component covers every link in
 * a footer column.
 */
export function LocaleLink({ href, className, children }: LocaleLinkProps) {
  return (
    <a href={localeHref(href, useLocale())} className={className}>
      {children}
    </a>
  );
}
```

- [ ] **Step 3: Localize the header's own links**

`ThemedHeader` is already a client component, so it can read the locale directly. In `src/components/layout/ThemedHeader.tsx`, add the imports:

```ts
import { useLocale } from "@/lib/i18n/useLocale";
import { localeHref } from "@/lib/i18n/paths";
```

Inside the component body, after the existing state declarations, add:

```ts
// Nav items, the logo target and Book now all arrive as English paths from
// src/config/*Navigation.ts. Prefixing them here rather than at each of the
// twenty call sites keeps the heroes unchanged.
const locale = useLocale();
```

Then wrap the three places an href is rendered. The logo anchor becomes:

```tsx
<a ref={logoRef} href={localeHref(homeHref, locale)} className="flex shrink-0 items-center gap-2.5 sm:gap-3.25">
```

The nav anchor becomes:

```tsx
<a key={item.href} href={localeHref(item.href, locale)} className="text-white/82 hover:text-white">
```

And the Book now anchor's `href={bookHref}` becomes `href={localeHref(bookHref, locale)}`.

- [ ] **Step 4: Localize the mobile panel's links**

In `src/components/layout/MobileNavPanel.tsx`, add the same two imports, call `const locale = useLocale();` beside the existing `useState`, and change the nav anchor to:

```tsx
<a
  key={item.href}
  href={localeHref(item.href, locale)}
  onClick={() => setIsOpen(false)}
  className="px-2 py-3 text-[15px] font-semibold text-[var(--home-body)] hover:text-[var(--home-heading)]"
>
```

- [ ] **Step 5: Localize the footer's links**

`ThemedFooter` is a Server Component and stays one. Only the column links need locale awareness, so swap that single anchor for the client leaf. In `src/components/layout/ThemedFooter.tsx` add:

```ts
import { LocaleLink } from "@/components/i18n/LocaleLink";
```

and replace the column-link anchor at line 88:

```tsx
<a key={item.href} href={item.href} className="sj-link text-[var(--home-body)]">
```

with:

```tsx
<LocaleLink key={item.href} href={item.href} className="sj-link text-[var(--home-body)]">
```

remembering to close it with `</LocaleLink>`.

Leave the `tel:`, `https://wa.me/` and `mailto:` anchors as plain `<a>` elements. They are not internal paths, `localeHref` would return them unchanged, and making them client components would buy nothing.

- [ ] **Step 6: Run the tests and the build**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, 299 tests.

Run: `npm run build 2>&1 | tail -20`
Expected: build succeeds.

- [ ] **Step 7: Verify a Sinhala page keeps you in Sinhala**

Run `npm run dev` and open `http://localhost:3000/si/contact-us`.

- Hover the header nav links: every one must point at `/si/...`.
- Click Services: you must land on `/si/services`, not `/services`.
- Click the logo: you must land on `/si`.
- In the footer, hover Privacy policy: `/si/privacy-policy`. Hover the phone number: still `tel:+94117848484`, unprefixed.
- Narrow the window until the hamburger appears, open it, and check those links carry `/si/` too.
- Open `http://localhost:3000/contact-us` and confirm every one of those links is back to its bare English path.

- [ ] **Step 8: Commit**

```bash
git add src/lib/i18n/useLocale.ts src/components/i18n/LocaleLink.tsx src/components/layout/ThemedHeader.tsx src/components/layout/MobileNavPanel.tsx src/components/layout/ThemedFooter.tsx
git commit -m "feat(i18n): keep header, menu and footer links inside the reader's locale"
```

---

### Task 7: The language switcher

**Files:**
- Create: `src/lib/i18n/rememberLocale.ts`
- Create: `src/components/i18n/LanguageToggleButton.tsx`
- Create: `src/components/i18n/LanguageMenuToggle.tsx`
- Modify: `src/components/layout/ThemedHeader.tsx`
- Modify: `src/components/layout/MobileNavPanel.tsx`

**Interfaces:**
- Consumes: `useLocale`, `swapLocale`, `LOCALE_LABELS`, `LOCALES`, `LOCALE_COOKIE`, `type Locale`.
- Produces: `rememberLocale(locale: Locale): void`, `<LanguageToggleButton />` and `<LanguageMenuToggle />`.

- [ ] **Step 1: Write the cookie write, on its own**

Both switcher variants need it, and a component file is the wrong home for a helper another component imports.

Create `src/lib/i18n/rememberLocale.ts`:

```ts
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/locales";

/**
 * Remember an explicit choice for a year. This cookie is the only thing that
 * ever moves a reader off English automatically, and only after they have
 * asked for it once by using the switcher.
 *
 * No "use client" directive: this is a plain function that happens to touch
 * `document`, and the client components that call it carry the directive.
 */
export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
```

- [ ] **Step 2: Write the header button**

Create `src/components/i18n/LanguageToggleButton.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/i18n/locales";
import { swapLocale } from "@/lib/i18n/paths";
import { rememberLocale } from "@/lib/i18n/rememberLocale";
import { useLocale } from "@/lib/i18n/useLocale";

/**
 * The header's language control, sized and bordered to match
 * ThemeToggleButton beside it so the pair reads as one set. A 44px square is
 * also the smallest comfortable touch target, and keeping it square is what
 * stops the header's width measurement from collapsing the nav any earlier
 * than it already does.
 */
export function LanguageToggleButton() {
  const current = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      // Escape must not strand the focus ring inside a menu that is no longer
      // on screen, so it goes back to the control that opened it.
      buttonRef.current?.focus();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function choose(locale: Locale) {
    rememberLocale(locale);
    setIsOpen(false);
    router.push(swapLocale(pathname, locale));
  }

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Language: ${LOCALE_LABELS[current]}. Change language`}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/28 bg-transparent text-[16px] text-white"
      >
        <span aria-hidden>&#127760;</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Language"
          className="absolute right-0 top-full z-40 mt-1 min-w-40 border border-[var(--home-hairline)] bg-[var(--home-bg)] py-1"
        >
          {LOCALES.map((locale) => (
            <button
              key={locale}
              type="button"
              role="menuitem"
              lang={locale}
              aria-current={locale === current ? "true" : undefined}
              onClick={() => choose(locale)}
              className={`block w-full px-4 py-2.5 text-left text-[15px] ${
                locale === current
                  ? "font-semibold text-[var(--home-heading)]"
                  : "text-[var(--home-body)] hover:text-[var(--home-heading)]"
              }`}
            >
              {LOCALE_LABELS[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

The `lang` attribute on each option matters: it tells a screen reader to pronounce the Sinhala and Tamil names in the right voice instead of spelling them out as English.

- [ ] **Step 3: Write the mobile menu row**

Create `src/components/i18n/LanguageMenuToggle.tsx`:

```tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/i18n/locales";
import { swapLocale } from "@/lib/i18n/paths";
import { useLocale } from "@/lib/i18n/useLocale";
import { rememberLocale } from "@/lib/i18n/rememberLocale";

/**
 * The language switch as a menu row, the same relationship ThemeMenuToggle has
 * to ThemeToggleButton. Inside the panel there is room to lay all three
 * languages out flat, so there is no second menu to open.
 */
export function LanguageMenuToggle() {
  const current = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function choose(locale: Locale) {
    rememberLocale(locale);
    router.push(swapLocale(pathname, locale));
  }

  return (
    <div className="px-2 py-3">
      <p className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-[var(--home-body)]">
        Language
      </p>
      <div className="flex flex-wrap gap-2">
        {LOCALES.map((locale) => (
          <button
            key={locale}
            type="button"
            lang={locale}
            aria-current={locale === current ? "true" : undefined}
            onClick={() => choose(locale)}
            className={`border px-3 py-2 text-[15px] ${
              locale === current
                ? "border-[var(--home-heading)] font-semibold text-[var(--home-heading)]"
                : "border-[var(--home-hairline)] text-[var(--home-body)]"
            }`}
          >
            {LOCALE_LABELS[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Put the button in the header**

In `src/components/layout/ThemedHeader.tsx`, add:

```ts
import { LanguageToggleButton } from "@/components/i18n/LanguageToggleButton";
```

and render it immediately before `<ThemeToggleButton />`, inside the same toggle container:

```tsx
<LanguageToggleButton />
<ThemeToggleButton />
```

Do not add a wrapper element around the pair. The container is one of the elements the header measures to decide when to collapse, and an extra box would change that measurement.

- [ ] **Step 5: Put the row in the mobile panel**

In `src/components/layout/MobileNavPanel.tsx`, add:

```ts
import { LanguageMenuToggle } from "@/components/i18n/LanguageMenuToggle";
```

and extend the existing bordered block at the foot of the panel so it holds both controls:

```tsx
<div className="mt-3 border-t border-[var(--home-hairline)] pt-2">
  <LanguageMenuToggle />
  <ThemeMenuToggle />
</div>
```

- [ ] **Step 6: Run the tests and the build**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, 299 tests.

Run: `npm run build 2>&1 | tail -20`
Expected: build succeeds.

- [ ] **Step 7: Verify the switcher end to end**

Run `npm run dev` and, starting at `http://localhost:3000/contact-us`:

- Open the globe menu. Three options appear, English marked as current.
- Choose the Sinhala option. The URL becomes `/si/contact-us`, the same page, not the home page.
- Reload. You stay on `/si/contact-us`.
- Navigate to `http://localhost:3000/` by editing the address bar. The cookie now redirects you to `/si`. This is the remembered-choice branch working.
- Switch back to English. The URL becomes `/`, with no prefix.
- Press Escape with the menu open: it closes. Click outside it: it closes.
- Narrow to 375px, open the hamburger, and confirm all three language buttons are there, reachable, and above the theme row.
- At 1280px, confirm the header has not collapsed to a hamburger. If it has, the switcher is wider than the 52px budget and needs trimming.

- [ ] **Step 8: Commit**

```bash
git add src/components/i18n/LanguageToggleButton.tsx src/components/i18n/LanguageMenuToggle.tsx src/components/layout/ThemedHeader.tsx src/components/layout/MobileNavPanel.tsx
git commit -m "feat(i18n): add the language switcher to the header and the mobile menu"
```

---

### Task 8: Per-locale metadata, hreflang and a sitemap

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Create: `src/lib/i18n/alternates.ts`
- Test: `src/lib/i18n/alternates.test.ts`
- Create: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `LOCALES`, `type Locale`, `localePath`.
- Produces: `SITE_URL: string`, `localeAlternates(path: string, locale: Locale): { canonical: string; languages: Record<string, string> }`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/i18n/alternates.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { localeAlternates, SITE_URL } from "./alternates.ts";

// Each locale is canonical for itself. Pointing a translation's canonical at
// the English URL would tell a search engine the Sinhala page is a duplicate
// to drop from the index, which would throw away the whole translation effort.
test("a page is canonical for itself, in its own locale", () => {
  assert.equal(localeAlternates("/contact-us", "en").canonical, `${SITE_URL}/contact-us`);
  assert.equal(localeAlternates("/contact-us", "si").canonical, `${SITE_URL}/si/contact-us`);
  assert.equal(localeAlternates("/contact-us", "ta").canonical, `${SITE_URL}/ta/contact-us`);
});

test("every locale is offered as an alternate, absolute", () => {
  const { languages } = localeAlternates("/contact-us", "en");
  assert.deepEqual(languages, {
    en: `${SITE_URL}/contact-us`,
    si: `${SITE_URL}/si/contact-us`,
    ta: `${SITE_URL}/ta/contact-us`,
  });
});

// The three pages must agree about the set they belong to, or a search engine
// treats the cluster as inconsistent and ignores the hreflang entirely.
test("the alternate set is the same whichever locale asks for it", () => {
  const fromEnglish = localeAlternates("/services", "en").languages;
  assert.deepEqual(localeAlternates("/services", "si").languages, fromEnglish);
  assert.deepEqual(localeAlternates("/services", "ta").languages, fromEnglish);
});

test("the home page alternates do not collect a double slash", () => {
  const { canonical, languages } = localeAlternates("/", "si");
  assert.equal(canonical, `${SITE_URL}/si`);
  assert.equal(languages.en, `${SITE_URL}/`);
  assert.equal(languages.si, `${SITE_URL}/si`);
  assert.equal(languages.ta, `${SITE_URL}/ta`);
});

test("the site URL is absolute and carries no trailing slash", () => {
  assert.match(SITE_URL, /^https:\/\//);
  assert.ok(!SITE_URL.endsWith("/"));
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL, `Cannot find module` for `./alternates.ts`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/i18n/alternates.ts`:

```ts
import { LOCALES, type Locale } from "./locales.ts";
import { localePath } from "./paths.ts";

/** The public origin, used to make metadata alternates absolute. */
export const SITE_URL = "https://sjhospital.lk";

/**
 * The canonical URL and the hreflang set for one page in one locale.
 *
 * The canonical is the locale's own URL, never English's. A translation whose
 * canonical points at the English page is telling a search engine to drop it
 * as a duplicate, which would waste the entire translation effort. Each locale
 * is canonical for itself, and the shared `languages` map is what ties the
 * three together as one page in three languages.
 */
export function localeAlternates(
  path: string,
  locale: Locale
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const languages: Record<string, string> = {};
  for (const other of LOCALES) {
    languages[other] = `${SITE_URL}${localePath(path, other)}`;
  }
  return { canonical: `${SITE_URL}${localePath(path, locale)}`, languages };
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, total climbs to 304.

- [ ] **Step 5: Make the root layout's metadata locale-aware**

Read the API reference first: `sed -n '1,80p' node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`

In `src/app/[locale]/layout.tsx`, replace the static `metadata` export with:

```ts
import type { Metadata } from "next";
import { localeAlternates, SITE_URL } from "@/lib/i18n/alternates";

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL(SITE_URL),
    title: "St. Joseph Hospital Negombo | To Live Is a Privilege",
    description:
      "US-standard healthcare in Negombo, Sri Lanka. 24/7 OPD, Emergency, Pharmacy, in-house doctors, and digital X-ray, with inpatient rooms from 10,000 LKR.",
    // The title and description above stay English until the content plan
    // translates them. The alternates are what matter now: they tell a search
    // engine the three URLs are the same page in different languages rather
    // than duplicate content.
    alternates: localeAlternates("/", locale),
    openGraph: { locale },
  };
}
```

Keep the existing `import type { Metadata } from "next"` if the file already has one rather than adding a second.

This covers the home page only. Metadata set in a layout is inherited by everything beneath it, so without the next step every route would claim to be canonically the home page, which is worse than having no canonical at all.

- [ ] **Step 6: Give each route its own alternates**

Fifteen route layouts plus the services detail page each need the alternates for their own path. This is the same three-line edit fifteen times, so do them in one pass rather than one at a time.

For each layout in the table below, add these imports:

```ts
import type { Metadata } from "next";
import { localeAlternates } from "@/lib/i18n/alternates";
```

and this export, using that row's path:

```ts
export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: localeAlternates("/contact-us", locale) };
}
```

| Layout file, under `src/app/[locale]/` | Path argument |
|---|---|
| `about-us/layout.tsx` | `/about-us` |
| `accommodation/layout.tsx` | `/accommodation` |
| `careers/layout.tsx` | `/careers` |
| `contact-us/layout.tsx` | `/contact-us` |
| `e-channeling/layout.tsx` | `/e-channeling` |
| `facilities/layout.tsx` | `/facilities` |
| `health-tips/layout.tsx` | `/health-tips` |
| `home-care/layout.tsx` | `/home-care` |
| `international-care/layout.tsx` | `/international-care` |
| `media/layout.tsx` | `/media` |
| `network/layout.tsx` | `/network` |
| `pharmacy/layout.tsx` | `/pharmacy` |
| `privacy-policy/layout.tsx` | `/privacy-policy` |
| `school-wellness/layout.tsx` | `/school-wellness` |
| `services/layout.tsx` | `/services` |

Two of these already export something metadata-shaped. Where a layout already has a `metadata` object or a `generateMetadata`, do not add a second export: fold `alternates` into the one that is there, keeping its existing title and description untouched. Run `grep -rn "export const metadata\|export async function generateMetadata" "src/app/[locale]"` first and read what each one has.

The services detail page is the one dynamic route and needs the slug in its path. In `src/app/[locale]/services/[slug]/page.tsx`, extend the existing `generateMetadata` return value with:

```ts
alternates: localeAlternates(`/services/${slug}`, locale as Locale),
```

taking `locale` from the same `await params` the previous task added there, and importing `type Locale` from `@/lib/i18n/locales`.

- [ ] **Step 7: Add the sitemap**

Read the reference first: `sed -n '1,60p' node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/metadata/sitemap.md`

Create `src/app/sitemap.ts`:

```ts
import type { MetadataRoute } from "next";
import { localeAlternates } from "@/lib/i18n/alternates";
import { serviceSlugs } from "@/features/services/data/services";

/**
 * Every page, once, at its canonical English URL, each carrying the Sinhala and
 * Tamil alternates. Listing the prefixed URLs as separate entries as well would
 * describe the same page three times.
 *
 * The site had no sitemap before this, so nothing here replaces an old one.
 */
const STATIC_PATHS = [
  "/",
  "/about-us",
  "/accommodation",
  "/careers",
  "/contact-us",
  "/e-channeling",
  "/facilities",
  "/health-tips",
  "/home-care",
  "/international-care",
  "/media",
  "/network",
  "/pharmacy",
  "/privacy-policy",
  "/school-wellness",
  "/services",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...serviceSlugs.map((slug) => `/services/${slug}`)];

  return paths.map((path) => {
    // The English URL is the entry, with the other two hanging off it as
    // alternates. Listing all three as separate entries would describe the
    // same page three times.
    const { canonical, languages } = localeAlternates(path, "en");
    return { url: canonical, alternates: { languages } };
  });
}
```

`serviceSlugs` is already exported from `@/features/services/data/services`, which is where `src/app/[locale]/services/[slug]/page.tsx` gets it. Import it, do not re-declare the list.

- [ ] **Step 8: Build and verify the output**

Run: `npm run build 2>&1 | tail -30`
Expected: build succeeds and `/sitemap.xml` appears in the route list.

Run `npm run dev`, then:

```bash
curl -s http://localhost:3000/sitemap.xml | head -30
for u in /contact-us /si/contact-us /ta/services; do
  echo "== $u"
  curl -s "http://localhost:3000$u" | grep -oE '<link rel="(alternate|canonical)"[^>]*>'
done
```

Expected:

- the sitemap lists every path once, each with three `xhtml:link` alternates
- every one of the three pages carries `hreflang` links for en, si and ta
- `/contact-us` is canonical to `https://sjhospital.lk/contact-us`
- `/si/contact-us` is canonical to `https://sjhospital.lk/si/contact-us`, **not** to the English URL. A Sinhala page claiming the English page as canonical is the specific bug this step exists to catch.
- `/ta/services` is canonical to `https://sjhospital.lk/ta/services`, which proves the per-route step landed and pages are not all inheriting the home page's alternates.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(i18n): declare the three URLs of every page to search engines"
```

---

### Task 9: Content overlay machinery

The merge and the parity check that the content plan will use fifteen times. No copy is translated here; this task delivers the tools and proves them against fixtures.

**Files:**
- Create: `src/lib/i18n/localize.ts`
- Test: `src/lib/i18n/localize.test.ts`
- Create: `src/lib/i18n/stringPaths.ts`
- Test: `src/lib/i18n/stringPaths.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `localize<T>(base: T, overlay: unknown): T`
  - `stringPaths(value: unknown, prefix?: string): string[]`
  - `assertTranslationParity(base: object, overlay: object, exclude: (path: string) => boolean): string[]` returning the missing paths.

- [ ] **Step 1: Write the failing test for the merge**

Create `src/lib/i18n/localize.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { localize } from "./localize.ts";

test("a translated string replaces the English one", () => {
  assert.deepEqual(localize({ label: "Reach us" }, { label: "Sinhala here" }), {
    label: "Sinhala here",
  });
});

// The overlay only carries copy, so everything it omits has to fall through.
// A missing translation shows readable English, never an empty node.
test("anything the overlay omits falls back to English", () => {
  const base = { label: "Reach us", note: "Location, phone, WhatsApp, and email." };
  assert.deepEqual(localize(base, { label: "Sinhala here" }), {
    label: "Sinhala here",
    note: "Location, phone, WhatsApp, and email.",
  });
  assert.deepEqual(localize(base, {}), base);
  assert.deepEqual(localize(base, undefined), base);
});

test("an empty or blank overlay string is treated as no translation", () => {
  const base = { label: "Reach us" };
  assert.deepEqual(localize(base, { label: "" }), base);
  assert.deepEqual(localize(base, { label: "   " }), base);
});

// Facts and structure live only in the English file, and the overlay never
// mentions them, so the merge must not disturb them.
test("non-strings are returned untouched", () => {
  const base = {
    coords: [7.206699127328975, 79.8453343846586],
    count: 4,
    featured: true,
    missing: null,
  };
  assert.deepEqual(localize(base, { count: 9, featured: false }), base);
});

test("arrays align by index", () => {
  const base = [{ label: "One" }, { label: "Two" }, { label: "Three" }];
  assert.deepEqual(localize(base, [{ label: "Eka" }, {}, { label: "Thuna" }]), [
    { label: "Eka" },
    { label: "Two" },
    { label: "Thuna" },
  ]);
});

test("an overlay array shorter than the base leaves the tail in English", () => {
  const base = [{ label: "One" }, { label: "Two" }];
  assert.deepEqual(localize(base, [{ label: "Eka" }]), [{ label: "Eka" }, { label: "Two" }]);
});

// An overlay must never be able to add or remove entries: the English file owns
// the shape, and a longer overlay array is a mistake, not an instruction.
test("the base owns the shape, so extra overlay entries are dropped", () => {
  const base = [{ label: "One" }];
  assert.deepEqual(localize(base, [{ label: "Eka" }, { label: "Deka" }]), [{ label: "Eka" }]);
  assert.deepEqual(localize({ a: "A" }, { a: "Aa", b: "Bb" }), { a: "Aa" });
});

test("nesting is followed all the way down", () => {
  const base = { hero: { facts: [{ k: "Reception", v: "Open 24/7" }] } };
  const overlay = { hero: { facts: [{ v: "Sinhala hours" }] } };
  assert.deepEqual(localize(base, overlay), {
    hero: { facts: [{ k: "Reception", v: "Sinhala hours" }] },
  });
});

test("the English base is never mutated", () => {
  const base = { label: "Reach us", nested: { note: "Note" } };
  const before = JSON.stringify(base);
  localize(base, { label: "Sinhala here", nested: { note: "Sinhala note" } });
  assert.equal(JSON.stringify(base), before);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL, `Cannot find module` for `./localize.ts`.

- [ ] **Step 3: Write the merge**

Create `src/lib/i18n/localize.ts`:

```ts
/**
 * A translation overlay: the same shape as the English content, with every
 * string optional and nothing else allowed. Facts, hrefs and counts are absent
 * from an overlay by design, because they have exactly one home in the English
 * file.
 */
export type Overlay<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Overlay<U>[]
    : T extends object
      ? { readonly [K in keyof T]?: Overlay<T[K]> }
      : never;

/**
 * Lay a translation over the English content.
 *
 * The English base owns the shape: the result always has the base's keys and
 * the base's array lengths, and the overlay can only replace strings. That is
 * what lets a half-written overlay ship safely, showing English wherever a
 * translation is missing rather than an empty node.
 */
export function localize<T>(base: T, overlay: unknown): T {
  if (typeof base === "string") {
    const translated = typeof overlay === "string" && overlay.trim() !== "";
    return (translated ? overlay : base) as T;
  }

  if (Array.isArray(base)) {
    const items = Array.isArray(overlay) ? overlay : [];
    return base.map((item, index) => localize(item, items[index])) as T;
  }

  if (base !== null && typeof base === "object") {
    const source =
      overlay !== null && typeof overlay === "object" && !Array.isArray(overlay)
        ? (overlay as Record<string, unknown>)
        : {};

    const merged: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(base as Record<string, unknown>)) {
      merged[key] = localize(value, source[key]);
    }
    return merged as T;
  }

  // Numbers, booleans, null and undefined are never translated.
  return base;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, total climbs to 313.

- [ ] **Step 5: Write the failing test for the parity check**

Create `src/lib/i18n/stringPaths.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { assertTranslationParity, stringPaths } from "./stringPaths.ts";

test("every string in a tree is named by its path", () => {
  const value = {
    heroFacts: [{ k: "Reception", v: "Open 24/7" }],
    intro: "Hello",
    count: 4,
  };
  assert.deepEqual(stringPaths(value).sort(), [
    "heroFacts[0].k",
    "heroFacts[0].v",
    "intro",
  ]);
});

test("non-strings contribute no paths", () => {
  assert.deepEqual(stringPaths({ n: 1, b: true, z: null, list: [1, 2] }), []);
});

// Module namespace objects carry the review marker, which is metadata about
// the translation rather than copy to be translated.
test("keys beginning with a double underscore are skipped", () => {
  const value = { __review: { status: "draft" }, label: "Reach us" };
  assert.deepEqual(stringPaths(value), ["label"]);
});

test("parity passes when every translatable path is present", () => {
  const base = { label: "Reach us", note: "A note" };
  const overlay = { label: "Sinhala label", note: "Sinhala note" };
  assert.deepEqual(assertTranslationParity(base, overlay, () => false), []);
});

test("parity reports exactly the paths a translation is missing", () => {
  const base = { label: "Reach us", note: "A note", extra: "Third" };
  const overlay = { label: "Sinhala label" };
  assert.deepEqual(
    assertTranslationParity(base, overlay, () => false).sort(),
    ["extra", "note"]
  );
});

// Facts and hrefs are absent from an overlay on purpose, so they must not be
// reported as gaps.
test("excluded paths are not required of a translation", () => {
  const base = { label: "Call us", value: "0117 84 84 84", href: "tel:+94117848484" };
  const overlay = { label: "Sinhala label" };
  const exclude = (path: string) => path === "value" || path.endsWith("href");
  assert.deepEqual(assertTranslationParity(base, overlay, exclude), []);
});

test("an empty translation counts as missing, not as present", () => {
  const base = { label: "Reach us" };
  assert.deepEqual(assertTranslationParity(base, { label: "   " }, () => false), ["label"]);
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npm test 2>&1 | tail -20`
Expected: FAIL, `Cannot find module` for `./stringPaths.ts`.

- [ ] **Step 7: Write the parity check**

Create `src/lib/i18n/stringPaths.ts`:

```ts
/**
 * Every string in a value, named by where it sits. This is the same reflection
 * trick the content tests already use to catch a newly added export, applied to
 * translations: if a string exists in English it has a path, and if it has a
 * path both overlays owe a translation for it.
 *
 * Keys beginning `__` are skipped, which keeps the `__review` marker on each
 * overlay out of the comparison.
 */
export function stringPaths(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") return prefix === "" ? [] : [prefix];

  if (Array.isArray(value)) {
    return value.flatMap((item, index) => stringPaths(item, `${prefix}[${index}]`));
  }

  if (value !== null && typeof value === "object") {
    return Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !key.startsWith("__"))
      .flatMap(([key, item]) => stringPaths(item, prefix === "" ? key : `${prefix}.${key}`));
  }

  return [];
}

/**
 * The translatable paths an overlay has not filled in, so a test can name them.
 * An empty array means the overlay is complete.
 *
 * `exclude` is how a feature declares what must never be translated: phone
 * numbers, email addresses, coordinates and every href.
 */
export function assertTranslationParity(
  base: object,
  overlay: object,
  exclude: (path: string) => boolean
): string[] {
  const translated = new Set(stringPaths(overlay));
  return stringPaths(base)
    .filter((path) => !exclude(path))
    .filter((path) => !translated.has(path));
}
```

Note that `stringPaths` returns `[]` for a bare string at the root, since a root has no path to name. Only objects and arrays are ever passed in practice.

- [ ] **Step 8: Run the test to verify it passes**

Run: `npm test 2>&1 | tail -8`
Expected: PASS, total climbs to 320.

- [ ] **Step 9: Run the whole suite and build one last time**

Run: `npm test 2>&1 | tail -8 && npm run build 2>&1 | tail -12 && npm run lint`
Expected: 320 tests pass, the build succeeds, lint is clean.

- [ ] **Step 10: Commit**

```bash
git add src/lib/i18n/localize.ts src/lib/i18n/localize.test.ts src/lib/i18n/stringPaths.ts src/lib/i18n/stringPaths.test.ts
git commit -m "feat(i18n): merge translations over English, and name what is missing"
```

---

## Done when

- `npm test` passes with 320 tests, up from the 275 baseline, and none of the original 275 were changed.
- `npm run build` succeeds and `npm run lint` is clean.
- `/contact-us` serves English at its original URL, with no redirect.
- `/si/contact-us` and `/ta/contact-us` render that page with English copy, Sinhala or Tamil font variables bound, and `<html lang>` set correctly.
- `/en/contact-us` redirects to `/contact-us`, and `/xx/contact-us` is a 404.
- The switcher appears in the header and in the mobile menu, moves between locales on the same page, and is remembered across a reload.
- Header, mobile menu and footer links keep the reader inside their locale.
- An English page downloads no Sinhala or Tamil font bytes.
- `/sitemap.xml` lists every page once with three alternates, each page head carries hreflang for all three, and every page is canonical to its own locale's URL rather than to English.

## Not in this plan

Translating any copy. That is the content plan: per-feature `content.si.ts` and `content.ta.ts` overlays, locale-aware getters on each feature's `index.ts`, the 44 in-component hrefs, threading locale into the 20 hero components, the per-feature parity tests, the `npm run i18n:status` review report and the pre-merge test that no file is still `draft`, the human review pass, and the QA sweep at 360px, 768px, 1280px and 1440px in all three locales.

Two notes for whoever writes that plan. Localizing the header nav in Task 6 means `ThemedHeader` reads the locale itself, so the 20 hero components did **not** need changing here; they will need it only where their own body copy is translated. And the per-locale line-height added in Task 5 is a floor that any component's own leading utility overrides, so the QA sweep is where cramped Sinhala and Tamil text actually gets fixed, component by component.
