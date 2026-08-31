# Trilingual site (English, Sinhala, Tamil): design

Status: **design, awaiting review.** No implementation code exists yet.
Supersedes the interim notes in `2026-09-01-trilingual-i18n-notes.md`, which
recorded the first three decisions before this document existed.

All work happens on branch `worktree-trilingual-i18n` in the worktree at
`.claude/worktrees/trilingual-i18n`. Nothing merges to `main` without an
explicit instruction.

## 1. Summary

Serve the whole SJ Hospital site (17 page files: 15 named routes, the home page, and the `services/[slug]` dynamic route) in English, Sinhala and Tamil. English keeps
its current unprefixed URLs. Sinhala and Tamil live under `/si/` and `/ta/`
path prefixes over the same route tree and the same slugs. Copy is stored as
per-locale overlay files that sit beside the existing English content files, so
hospital facts keep exactly one home. Translations are drafted by Claude and
gated on human review before they are considered done.

## 2. Decisions

| # | Decision | Consequence |
|---|----------|-------------|
| 1 | Full parity across every route | Every `data/*.ts` file and every hardcoded component string is in scope |
| 2 | Path prefix, English unprefixed | `/contact-us`, `/si/contact-us`, `/ta/contact-us` |
| 3 | Claude drafts, a human reviews before launch | Per-file review status, and a report to prove coverage |
| 4 | Sibling locale overlay files, merged by key | Facts and structure stay single-homed in `content.ts` |
| 5 | No `Accept-Language` sniffing | English by default, an explicit choice is remembered in a cookie |
| 6 | Paired display and body type per script | Sinhala and Tamil get real typographic identity, not fallback |
| 7 | Square switcher button mirroring the theme toggle | Costs about 52px of header width |
| 8 | Slugs stay in English | The switcher is a prefix swap, with no slug map to maintain |

### Rejected, and why

- **Prefixing English too** (`/en/contact-us`). Uniform and simpler in routing
  code, but it moves every existing URL and breaks inbound links.
- **Cookie-only, no URL change.** Cheapest to build, but Google indexes one
  language, nobody can share a Sinhala link, and every route loses static
  rendering.
- **Whole-file copies per locale.** Would give the phone number, the email and
  `HOSPITAL_COORDS` three homes each, directly contradicting the existing
  design and the tests that pin them.
- **JSON message catalogs.** The industry default and the easiest translator
  handoff, but it discards the literal types and colocation this codebase
  leans on, and forces a rewrite of all 20 content test files.
- **`Accept-Language` redirect**, which is what the Next.js docs recommend.
  Many Sri Lankan users browse with `en-US` set regardless of what they read,
  so the guess is wrong often, and a wrong guess traps the user.
- **Translated slugs.** Better local search visibility, but it needs a
  bidirectional slug map per locale, per-locale `generateStaticParams` for
  `services/[slug]`, and three redirects for every future slug edit.

## 3. What the codebase forces on the design

Read before proposing changes to this document.

- Next.js **16.2.11**, React 19.2.4, App Router, TypeScript strict, Tailwind v4
  CSS-first. `cacheComponents` is **off**. There is no `src/proxy.ts` yet.
- **17 `page.tsx`** and **16 `layout.tsx`** under `src/app`, each layout owning
  its own metadata.
- **37 content files** under `src/features/*/data/`, about 7,200 lines, with
  **20 companion test files**.
- Those content files interleave three kinds of value, and the design depends
  on telling them apart:
  - translatable copy, for example `"Reach us"`
  - hospital facts that must never drift, for example `0117 84 84 84`,
    `info@sjhospital.lk`, `HOSPITAL_COORDS`, `DIRECTIONS_URL`
  - structure, for example `href`, `count`, anchor targets
- `contact/data/content.test.ts` already pins the facts by value and walks
  every string export **by reflection** so a newly added export cannot be
  missed. The parity test extends that walk rather than replacing it.
- **17 `src/config/*Navigation.ts`** files hold nav labels, one per route.
- **196 component files, 36 of them client components**, of which **10 import
  content directly**. Those 10 receive content as props from a Server
  Component parent instead, matching the existing rule about client leaves.
- `ThemedHeader` measures the real widths of logo, nav, toggle and Book now to
  decide when to collapse, with a `min-[1240px]` fallback before measurement.
  It adapts to longer labels on its own, which is why the switcher's width is
  the thing to control.
- Existing control precedent: `ThemeToggleButton` in the header,
  `ThemeMenuToggle` inside `MobileNavPanel`. The switcher copies this pairing.

## 4. Routing

### 4.1 One tree, English prefix hidden by rewrite

The Next.js guide nests everything under `app/[lang]`, which prefixes English
too. To keep English unprefixed without duplicating the page tree, `src/proxy.ts`
**rewrites** unprefixed paths onto the `en` branch internally. The address bar
keeps the short URL, there is one tree to maintain, and `generateStaticParams`
still prerenders all three locales.

```
src/app/
  [locale]/
    layout.tsx            <- root layout, <html lang>, fonts, generateStaticParams
    page.tsx              <- home
    contact-us/
      layout.tsx
      page.tsx
    services/
      [slug]/page.tsx
    ...every remaining route moved here unchanged
```

### 4.2 Proxy behaviour

```
/si/... or /ta/...              -> pass through untouched
no prefix, cookie sj-locale=si  -> redirect to /si + pathname
no prefix, cookie sj-locale=ta  -> redirect to /ta + pathname
no prefix, no cookie            -> rewrite to /en + pathname (URL unchanged)
```

There is no `Accept-Language` inspection anywhere. A crawler carries no cookie,
so it always gets the rewrite branch and sees stable English with `hreflang`
alternates. The redirect only ever fires on an unprefixed path, so it cannot
loop.

The matcher excludes `_next`, `api`, and static asset extensions. The decision
itself is a pure exported function, `resolveLocaleRoute(pathname, cookie)`,
unit tested independently of the Next runtime.

Keeping the cookie read inside the proxy matters: reading cookies inside a page
would opt that page out of static rendering. In the proxy, every page stays
prerendered.

### 4.3 Locale primitives

`src/lib/i18n/locales.ts`

```ts
export const LOCALES = ["en", "si", "ta"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const hasLocale = (v: string): v is Locale =>
  (LOCALES as readonly string[]).includes(v);
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};
```

Every page and layout awaits `params` (they are Promises in Next 16), guards
with `hasLocale`, and calls `notFound()` on anything else, so `/xx/contact-us`
404s instead of rendering an empty shell. `PageProps<'/[locale]'>` and
`LayoutProps<'/[locale]'>` are global helpers in Next 16 and are used directly.

## 5. Content layer

### 5.1 File shape

```
src/features/contact/data/
  content.ts        <- unchanged. English copy + facts + structure.
  content.si.ts     <- translatable fields only
  content.ta.ts     <- translatable fields only
  content.test.ts   <- existing fact pins, plus the new parity test
```

An overlay carries only translated strings. Anything absent falls back to
English, so a missing string degrades to readable English rather than to an
empty node.

```ts
// content.si.ts
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const jumpCards = [
  { label: "...", note: "..." },   // no href, no count: those are structure
  // ...
];
// phone, email, HOSPITAL_COORDS, DIRECTIONS_URL: absent by design
```

### 5.2 Merge

`src/lib/i18n/localize.ts` exports `localize<T>(base: T, overlay: DeepPartial<T>): T`:

- recurses objects, overlaying by key
- walks arrays **by index**, so ordering is part of the contract and a parity
  test catches any drift
- replaces a string only when the overlay supplies a non-empty string
- never touches numbers, booleans, or anything that is not a string
- returns a new object, leaving the English base frozen and reusable

### 5.3 Access

Each feature exposes a locale-aware getter from its `index.ts`. Overlays load
by dynamic import so a visitor downloads only their own locale:

```ts
const overlays = {
  si: () => import("./content.si"),
  ta: () => import("./content.ta"),
};

export async function getContactContent(locale: Locale) {
  if (locale === "en") return base;
  return localize(base, await overlays[locale]());
}
```

These run in Server Components, so translation data never reaches the client
bundle. The 10 client components that currently import content directly are
converted to receive it as props from their Server Component parent.

The 17 `src/config/*Navigation.ts` files get the same overlay treatment, since
their labels are the strings most exposed to text expansion.

### 5.4 What deliberately stays in English

Phone numbers, email addresses, `HOSPITAL_COORDS`, `DIRECTIONS_URL`, all
`href` values, anchor targets, the hospital's name and brand wordmark, doctor
names, and URL slugs. Each feature declares its own `DO_NOT_TRANSLATE` path
list, consumed by the parity test.

## 6. Typography

None of the four current families (Plus Jakarta Sans, Sora, Bricolage
Grotesque, Manrope) contains a Sinhala or Tamil glyph, so without this section
every translated string falls back to Nirmala UI, Sinhala Sangam MN or Noto
depending on the OS.

| Locale | Headings | Body |
|--------|----------|------|
| en | Sora | Plus Jakarta Sans |
| si | Gemunu Libre | Noto Sans Sinhala |
| ta | Catamaran | Noto Sans Tamil |

The Sinhala and Tamil families are loaded through `next/font/google` in `app/[locale]/layout.tsx` and
applied only for their own locale, so an English visitor downloads no Sinhala
or Tamil bytes. Font choices are provisional and confirmed by eye against the
real hero and card layouts during Phase 3.

Per-locale scale, in `globals.css`, keyed off `html[lang]`:

- line-height increased for both scripts, which need more room than Latin for
  ascenders and loops
- a small font-size increase applied **to text elements only, never to the root
  element**, so rem-based Tailwind spacing is unchanged and no layout shifts

## 7. The switcher

Two client leaves under `src/components/i18n/`, mirroring the theme controls
file for file:

- `LanguageToggleButton.tsx`, an `h-11 w-11` button beside `ThemeToggleButton`
  in `ThemedHeader`, opening a menu listing English, the Sinhala name and the
  Tamil name, each rendered in its own script
- `LanguageMenuToggle.tsx`, the compact form, inside `MobileNavPanel` beside
  `ThemeMenuToggle`

Both compute the target URL from `usePathname()` by swapping the prefix, which
works because slugs are identical across locales. Choosing a language writes
`sj-locale` (one year, `SameSite=Lax`, `path=/`) and navigates, so the reader
lands on the same page in the new language rather than on the home page.

Accessibility: the menu is a labelled listbox, the current locale carries
`aria-current`, each option sets `lang` on itself so a screen reader announces
the native names in the right voice, and focus returns to the button on close.

## 8. Metadata and SEO

- Each of the 16 route layouts converts its static `metadata` export to
  `generateMetadata({ params })`, awaits `params`, and pulls the localized
  title and description.
- Every page emits `alternates.languages` for all three locales plus a
  canonical, giving correct `hreflang`.
- `<html lang>` reflects the active locale. It is currently hardcoded to `en`.
- A new `src/app/sitemap.ts` emits all three locales across all routes and
  service slugs. No sitemap exists today.

## 9. Testing

- **Merge unit tests** for `localize`: overlay wins, missing keys fall back,
  arrays align by index, non-strings are never touched.
- **Route resolution unit tests** for `resolveLocaleRoute`, covering each of
  the four proxy branches and the no-loop property.
- **Parity tests**, one per feature, extending the existing reflection walk:
  collect every string path in the English base, subtract that feature's
  `DO_NOT_TRANSLATE` list, and assert each remaining path exists and is
  non-empty in both overlays. A newly added English string fails the suite
  until both translations exist.
- **Existing fact tests are unchanged.** They keep pinning the English base,
  which is still the only home for the phone number and the coordinate.
- **Review report**: `npm run i18n:status` prints per-file `__review` status.
  A pre-merge test asserts nothing is still `draft`.
- **Manual QA** at 360px, 768px, 1280px and 1440px in all three locales,
  checking header collapse, nav wrapping, button text, and hero fit. This is
  where text expansion of 10 to 30 percent shows up.

## 10. Phases

Each phase is a reviewable commit on `worktree-trilingual-i18n`. Phases 1 to 5
change no visible English behaviour.

| Phase | Work | Visible change |
|-------|------|----------------|
| 1 | `src/lib/i18n` primitives, `localize`, `resolveLocaleRoute`, their tests | none |
| 2 | Move 17 routes under `app/[locale]`, add `src/proxy.ts`, `hasLocale` guards, `generateStaticParams`, `<html lang>` | none, English serves identically |
| 3 | Fonts and per-locale type scale | none for English |
| 4 | Switcher components in header and mobile panel | switcher appears |
| 5 | `generateMetadata`, `hreflang`, `sitemap.ts` | none visible |
| 6 | Content overlays: 37 data files, 17 nav configs, extraction from 196 components, 10 client components converted to props | the bulk of the work |
| 7 | Human review pass, flip `__review` to reviewed | translations become final |
| 8 | Full QA sweep at four widths in three locales | ready to merge |

Phase 6 dominates. It is decomposed feature by feature in the implementation
plan, not here.

## 11. Risks

- **Phase 6 volume.** Extracting hardcoded strings out of 196 components is the
  large majority of the effort, and it is mechanical rather than difficult. The
  parity test is the safety net: it fails on anything missed.
- **Clinical copy.** health-tips covers symptoms, first aid and emergency
  guidance. A mistranslation there carries real risk, which is why Phase 7 is a
  hard gate and not a formality.
- **Font quality.** Gemunu Libre and Catamaran are provisional. If either reads
  poorly next to the existing heroes, Phase 3 substitutes another face. This
  affects no other phase.
- **Text expansion in the chrome.** `ThemedHeader` measures rather than
  assumes, so it should adapt, but the collapse threshold will land at a
  different width per locale. Phase 8 confirms it.

## 12. Open questions

None blocking. Font pairings are confirmed by eye in Phase 3, and the ordering
of features within Phase 6 is set by the implementation plan.
