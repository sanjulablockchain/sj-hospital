# Services Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/services` as a 36-service hub in the home page's themed design language, and give every service its own prerendered page at `/services/<slug>`.

**Architecture:** The home page's scoped design system is promoted from `features/home` into shared `components/` (renaming its `[data-home]` CSS scope to `[data-sj]`) so both page families share one shell. A single 36-entry service catalog in `features/services/data` feeds both the index directory and the detail routes; catalog invariants and the spec's content rules are enforced by `node --test` tests that need no new dependencies.

**Tech Stack:** Next.js 16.2.11 (App Router, Turbopack), React 19.2.4, TypeScript strict, Tailwind CSS v4 (CSS-first, no config file), `node --test` with native TS type-stripping.

**Spec:** `docs/superpowers/specs/2026-08-20-services-pages-design.md`

## Global Constraints

Every task's requirements implicitly include this section.

**Content rules (from the spec — these are machine-enforced by Task 1's tests):**
- Never a price, a consultant name, an equipment brand, an accreditation, or a success rate.
- The only phone number anywhere is `0117 84 84 84`. The only address is `229/10 St. Joseph Street, Negombo`.
- No text is copied verbatim from the design references or from kingshospital.lk / lankahospitals.com / nawaloka.com.
- `team` entries list roles, never names.
- Hours and turnaround claims only where the site already states them: 24-hour lab, pharmacy, OPD and emergency; two-doctor report verification; X-ray read within the hour; same-day lab reports; 10% OPD lab discount; 6 home-visit vehicles; rooms from 10,000 LKR; Kids & Teens paediatric protocol; ten minutes from Bandaranaike International.
- Dental services and priced health-check packages must not appear.
- Where a service's scope is uncertain, describe it narrowly rather than expansively.

**Next.js 16 rules:**
- `params` is a Promise: `const { slug } = await params` — in the page **and** in `generateMetadata`.
- Server Components by default. `'use client'` only on the smallest interactive leaf.
- Read the relevant guide in `node_modules/next/dist/docs/` before writing route files. Do not code Next.js from memory.
- Tailwind v4 is CSS-first: theme lives in `src/app/globals.css` via `@theme`. There is no `tailwind.config.js`.

**Design system:**
- Import via the `@/*` alias. No `../../..` chains.
- Colours come from `--home-*` custom properties (names unchanged), e.g. `text-[var(--home-heading)]`, `bg-[var(--home-accent)]`. Never hardcode `#2CA6F0` where a token exists.
- Headings use `className="font-display"` (Bricolage Grotesque); body text inherits Manrope from the scope.
- Hovers use Tailwind `group` / `group-hover:` with the reference's exact durations — matching `FacilitiesSection.tsx`, which is the canonical example. Do **not** add new `[data-*]` CSS selectors.
- After Task 2, `[data-home]` and `#home-root` must not appear anywhere in the repo.

**Reference values (from the decoded reference CSS — use these exactly):**
- Reveal: `opacity 0 → 1`, `translateY(34px) → none`, `0.85s cubic-bezier(0.16,0.84,0.28,1)`, stagger step 85ms capped at 340ms.
- Ken Burns: `sj-burns` 26s ease-in-out infinite; disabled under `prefers-reduced-motion`.
- Accordion panel: `max-height 0.55s cubic-bezier(0.2,0.8,0.2,1), opacity 0.4s ease`; the `+` glyph rotates 45° when open (`transform 0.35s cubic-bezier(0.2,0.8,0.2,1)`).
- Centre-of-excellence card: `translateY(-6px)` on hover over `0.45s cubic-bezier(0.2,0.8,0.2,1)`; its hidden line fades in `opacity 0.4s ease` + `translateY(8px) → none`.
- Facility card: image `scale(1.09)` + `opacity 0.78` over `0.75s`; bottom bar `scaleX(0) → 1` from `origin-left` over `0.45s`; body `translateY(-8px)` over `0.5s`.
- Related card: `translateY(-5px)` over `0.4s cubic-bezier(0.2,0.8,0.2,1)`.
- Breakpoints: nav collapses at 1120px; 4-col grids → 2 at 1024px → 1 at 640px; splits stack at 900px; section top padding 76px at 640px.

**Verification gates:** every task ends with `npm test` (where tests exist), `npm run lint`, and — for tasks touching routes or components — `npm run build`. All three must pass before commit.

---

## File Structure

**Created:**

| Path | Responsibility |
|---|---|
| `src/components/theme/ThemeScript.tsx` | FOUC-preventing inline theme boot script |
| `src/components/theme/useSiteTheme.tsx` | Theme context + store (`sj-home-theme`) |
| `src/components/theme/ThemeToggleButton.tsx` | Dark/light toggle leaf |
| `src/components/layout/ThemedShell.tsx` | `#sj-root` wrapper: scope attrs + script + provider |
| `src/components/layout/ThemedHeader.tsx` | Themed header, parameterised by nav items |
| `src/components/layout/ThemedFooter.tsx` | Themed footer, parameterised by link columns |
| `src/components/layout/MobileNavPanel.tsx` | Moved from `features/home/components` |
| `src/components/ui/{Reveal,RevealStagger,ParallaxLayer}.tsx` | Moved from `features/home/components` |
| `src/components/ui/BrandIcons.tsx` | Moved from `features/home/components/icons.tsx` |
| `src/config/servicesNavigation.ts` | Services header nav + footer columns |
| `src/features/services/types.ts` | `Service`, `ServiceGroup`, and row types |
| `src/features/services/data/groups.ts` | Filter order + group list |
| `src/features/services/data/{emergency,surgical,diagnostics,clinics,womenChildren,atHome}.ts` | Catalog, one self-contained module per group |
| `src/features/services/data/services.ts` | Aggregate + `getService` / `serviceSlugs` / `relatedServices` |
| `src/features/services/data/indexContent.ts` | Index-only content: centres, jump, packages, admissions, comforts, international, surgical & diagnostics rows |
| `src/features/services/data/catalog.test.ts` | Structural invariants |
| `src/features/services/data/content.test.ts` | Content-rule enforcement |
| `src/features/services/components/index/*.tsx` | 12 index sections |
| `src/features/services/components/detail/*.tsx` | 8 detail sections |
| `src/features/services/components/{ServicesIndexPage,ServiceDetailPage}.tsx` | Page compositions |
| `src/features/services/index.ts` | Public surface |
| `src/app/services/{layout,page}.tsx`, `src/app/services/[slug]/{page,not-found}.tsx` | Routes |

**Modified:** `package.json` (test script), `src/app/globals.css` (scope rename), `src/features/home/**` (consume shared shell), `src/config/homeNavigation.ts`.

**Deleted:** `src/app/(marketing)/services/`, `src/features/services/components/{MainServicesGrid,DepartmentGrid,DepartmentIcons}.tsx`, `src/features/services/index.tsx` (replaced by `index.ts`), and the four `features/home` files moved to shared.

---

## Task 1: Test harness, catalog types, group taxonomy

**Files:**
- Modify: `package.json` (add `test` script)
- Create: `src/features/services/types.ts`
- Create: `src/features/services/data/groups.ts`
- Test: `src/features/services/data/groups.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `ServiceGroup`, `Service`, `KeyValue`, `Step`, `TeamMember`, `Faq` from `@/features/services/types`; `GROUPS: readonly ["All", ...ServiceGroup[]]` and `SERVICE_GROUPS: readonly ServiceGroup[]` from `data/groups`.

**Why `node --test`:** the repo has no test runner and Node 24.19 strips TypeScript natively, so this adds real tests with **zero new dependencies**. Verified: extensionless `import type` is erased before resolution, so data modules stay Next-compatible while test files import them with an explicit `.ts` specifier.

- [ ] **Step 1: Add the test script**

In `package.json`, add to `scripts`:

```json
"test": "node --test \"src/**/*.test.ts\""
```

- [ ] **Step 2: Write the failing test**

Create `src/features/services/data/groups.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { GROUPS, SERVICE_GROUPS } from "./groups.ts";

test("GROUPS leads with All and matches the reference order", () => {
  assert.deepEqual(GROUPS, [
    "All",
    "Emergency",
    "Surgical",
    "Diagnostics",
    "Clinics",
    "Women & children",
    "At home",
  ]);
});

test("SERVICE_GROUPS is GROUPS without All", () => {
  assert.equal(SERVICE_GROUPS.length, 6);
  assert.ok(!SERVICE_GROUPS.includes("All" as never));
  assert.deepEqual([...SERVICE_GROUPS], GROUPS.slice(1));
});
```

- [ ] **Step 3: Run it to make sure it fails**

Run: `npm test`
Expected: FAIL — cannot find module `./groups.ts`.

- [ ] **Step 4: Write the types**

Create `src/features/services/types.ts`:

```ts
export type ServiceGroup =
  | "Emergency"
  | "Surgical"
  | "Diagnostics"
  | "Clinics"
  | "Women & children"
  | "At home";

export type KeyValue = { k: string; v: string };
export type Step = { no: string; title: string; desc: string };
export type TeamMember = { role: string; note: string };
export type Faq = { q: string; a: string };

export type Service = {
  /** URL segment under /services */
  slug: string;
  /** Detail page <h1> */
  title: string;
  /** Directory row label — may differ from title */
  directoryTitle: string;
  group: ServiceGroup;
  hours: string;
  cta: string;
  /** Directory accordion body */
  desc: string;
  tags: string[];
  facts: KeyValue[];
  lede: string;
  aboutHead: string;
  body1: string;
  body2: string;
  /** Exactly 4 hero stats */
  strip: KeyValue[];
  covers: string[];
  conditions: string[];
  location: string;
  /** Exactly 4 journey steps */
  steps: Step[];
  prep: string[];
  team: TeamMember[];
  faq: Faq[];
};
```

- [ ] **Step 5: Write the groups module**

Create `src/features/services/data/groups.ts`:

```ts
import type { ServiceGroup } from "../types";

export const GROUPS = [
  "All",
  "Emergency",
  "Surgical",
  "Diagnostics",
  "Clinics",
  "Women & children",
  "At home",
] as const;

export const SERVICE_GROUPS: readonly ServiceGroup[] = GROUPS.slice(1) as readonly ServiceGroup[];
```

- [ ] **Step 6: Run the tests and make sure they pass**

Run: `npm test`
Expected: PASS, 2 tests.

- [ ] **Step 7: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 8: Commit**

```bash
git add package.json src/features/services/types.ts src/features/services/data/groups.ts src/features/services/data/groups.test.ts
git commit -m "test: add node --test harness with services catalog types"
```

---

## Task 2: Rename the design-system scope and share the theme module

**Files:**
- Create: `src/components/theme/ThemeScript.tsx`, `src/components/theme/useSiteTheme.tsx`, `src/components/theme/ThemeToggleButton.tsx`
- Modify: `src/app/globals.css` (all `[data-home]` → `[data-sj]`)
- Modify: `src/features/home/components/HomePage.tsx`
- Delete: `src/features/home/components/HomeThemeScript.tsx`, `src/features/home/hooks/useHomeTheme.tsx`, `src/features/home/components/ThemeToggleButton.tsx`

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: `ThemeScript` (no props), `SiteThemeProvider({ children })`, `useSiteTheme(): { theme: "dark" | "light"; toggle: () => void }`, `ThemeToggleButton` (no props). Root element id is `sj-root`; scope attribute is `data-sj`.

The rename is mechanical but must be complete — a missed selector silently drops styling. The storage key stays `sj-home-theme` so visitors keep their saved theme.

- [ ] **Step 1: Rename the scope hook in globals.css**

```bash
sed -i 's/\[data-home\]/[data-sj]/g; s/#home-root/#sj-root/g' src/app/globals.css
```

- [ ] **Step 2: Verify no occurrences remain in CSS**

Run: `grep -n 'data-home\|home-root' src/app/globals.css`
Expected: no output.

- [ ] **Step 3: Create the theme provider**

Create `src/components/theme/useSiteTheme.tsx` — this is `features/home/hooks/useHomeTheme.tsx` with `home-root` → `sj-root` and the exported names changed. Copy the existing file's body verbatim, including its two explanatory comments, and change only:

```tsx
// element lookups
document.getElementById("sj-root")
// exported names
export function SiteThemeProvider({ children }: { children: ReactNode }) { … }
export function useSiteTheme() {
  const ctx = useContext(SiteThemeContext);
  if (!ctx) throw new Error("useSiteTheme must be used within SiteThemeProvider");
  return ctx;
}
```

Keep `const STORAGE_KEY = "sj-home-theme";` unchanged.

- [ ] **Step 4: Create the theme boot script**

Create `src/components/theme/ThemeScript.tsx` — the existing `HomeThemeScript.tsx` with `home-root` → `sj-root` and the component renamed to `ThemeScript`. The `sj-home-theme` key stays.

- [ ] **Step 5: Move the toggle button**

`git mv src/features/home/components/ThemeToggleButton.tsx src/components/theme/ThemeToggleButton.tsx`, then update its import to `useSiteTheme` from `./useSiteTheme`.

- [ ] **Step 6: Point HomePage at the shared module**

In `src/features/home/components/HomePage.tsx`: change `id="home-root"` → `id="sj-root"`, `data-home` → `data-sj`, and the imports to `ThemeScript` / `SiteThemeProvider` from `@/components/theme/...`. Leave every className and the section order untouched.

- [ ] **Step 7: Update remaining home imports**

Run: `grep -rln 'useHomeTheme\|HomeThemeScript\|components/ThemeToggleButton' src`
Update each hit to the new shared paths, then delete the three old files.

- [ ] **Step 8: Verify the rename is complete repo-wide**

Run: `grep -rn 'data-home\|home-root\|useHomeTheme\|HomeThemeScript' src`
Expected: no output.

- [ ] **Step 9: Build and lint**

Run: `npm run lint && npm run build`
Expected: both clean; route list unchanged (11 routes).

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "refactor: promote the themed design system scope to [data-sj]"
```

---

## Task 3: Promote the reveal, parallax and nav primitives to shared

**Files:**
- Move: `src/features/home/components/{Reveal,RevealStagger,ParallaxLayer}.tsx` → `src/components/ui/`
- Move: `src/features/home/components/MobileNavPanel.tsx` → `src/components/layout/`
- Move: `src/features/home/components/icons.tsx` → `src/components/ui/BrandIcons.tsx`
- Modify: every `features/home` file importing them

**Interfaces:**
- Consumes: nothing.
- Produces: `Reveal({ children, className })`, `RevealStagger({ children, className, stepMs })`, `ParallaxLayer({ children, className, factor, maxOffsetPx })` from `@/components/ui/*`; `MobileNavPanel({ items })` from `@/components/layout/MobileNavPanel`; the social/util icon components from `@/components/ui/BrandIcons`.

Pure moves — no behaviour change. Required because CLAUDE.md forbids reaching into another feature's internals, and `features/services` needs all five.

- [ ] **Step 1: Move the files**

```bash
git mv src/features/home/components/Reveal.tsx src/components/ui/Reveal.tsx
git mv src/features/home/components/RevealStagger.tsx src/components/ui/RevealStagger.tsx
git mv src/features/home/components/ParallaxLayer.tsx src/components/ui/ParallaxLayer.tsx
git mv src/features/home/components/MobileNavPanel.tsx src/components/layout/MobileNavPanel.tsx
git mv src/features/home/components/icons.tsx src/components/ui/BrandIcons.tsx
```

- [ ] **Step 2: Find every broken import**

Run: `grep -rn 'from "\./\(Reveal\|RevealStagger\|ParallaxLayer\|MobileNavPanel\|icons\)"\|from "\.\./components/\(Reveal\|icons\)"' src`

- [ ] **Step 3: Rewrite them to the alias**

Replace each with the `@/components/ui/…` or `@/components/layout/…` path. Also fix relative imports *inside* the moved files (e.g. `ParallaxLayer` imports `useScrollParallax`, which lives at `@/hooks/useScrollParallax`; `MobileNavPanel` imports the nav item type from `@/config/navigation`).

- [ ] **Step 4: Verify nothing references the old paths**

Run: `grep -rn 'components/icons"\|/RevealStagger"' src | grep -v '@/components'`
Expected: no output.

- [ ] **Step 5: Build and lint**

Run: `npm run lint && npm run build`
Expected: both clean, 11 routes.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: promote reveal, parallax and nav primitives to shared components"
```

---

## Task 4: Parameterised ThemedShell, ThemedHeader and ThemedFooter

**Files:**
- Create: `src/components/layout/ThemedShell.tsx`, `src/components/layout/ThemedHeader.tsx`, `src/components/layout/ThemedFooter.tsx`
- Modify: `src/features/home/components/{HomePage,HomeHeader,HomeFooter}.tsx`

**Interfaces:**
- Consumes: `ThemeScript`, `SiteThemeProvider`, `ThemeToggleButton` (Task 2); `MobileNavPanel`, `BrandIcons` (Task 3).
- Produces:

```tsx
type ThemedShellProps = { children: ReactNode; className?: string };
// renders <div id="sj-root" data-sj data-theme="dark" suppressHydrationWarning>

type FooterColumn = { heading: string; links: { label: string; href: string }[] };
type ThemedHeaderProps = { navItems: { label: string; href: string }[]; bookHref?: string; homeHref?: string };
type ThemedFooterProps = { columns: FooterColumn[]; id?: string };
```

`HomeHeader` and `HomeFooter` become thin wrappers passing home's data. **The home page's rendered markup must not change** — extract, don't redesign.

- [ ] **Step 1: Extract ThemedShell**

Create `src/components/layout/ThemedShell.tsx` holding exactly the wrapper `HomePage.tsx` renders today:

```tsx
import type { ReactNode } from "react";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { SiteThemeProvider } from "@/components/theme/useSiteTheme";

export function ThemedShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      id="sj-root"
      data-sj
      data-theme="dark"
      suppressHydrationWarning
      className={
        className ??
        "min-h-screen bg-[var(--home-bg)] text-[var(--home-body)] antialiased"
      }
    >
      <ThemeScript />
      <SiteThemeProvider>{children}</SiteThemeProvider>
    </div>
  );
}
```

- [ ] **Step 2: Use it in HomePage**

Replace the wrapper div, `ThemeScript` and `SiteThemeProvider` in `HomePage.tsx` with `<ThemedShell>…</ThemedShell>`; the shell supplies `data-sj`.

The `scroll-margin-top: 0` override then needs a marker that is not `data-home`, because the services pages need the same behaviour — their header is not sticky either. Use `data-flow-header`: add it to `HomePage`'s `<main>`, and rewrite that one rule in `globals.css` (the `[data-home] section[id]` pair renamed by Step 1) as:

```css
[data-sj] [data-flow-header] section[id],
[data-sj] [data-flow-header] footer[id] {
  scroll-margin-top: 0;
}
```

Leave the generic `section[id] { scroll-margin-top: 140px }` rule untouched — it still serves the sticky-header marketing pages. Task 10 applies `data-flow-header` to the services layout.

- [ ] **Step 3: Extract ThemedHeader**

Create `ThemedHeader.tsx` from the current `HomeHeader.tsx` body, replacing the hardcoded `homeNavigation` import with the `navItems` prop, `#top` with `homeHref` (default `"#top"`), and `#book` with `bookHref` (default `"#book"`). Keep every className, the logo block, its two-line comment, and the `min-[1120px]:flex` nav breakpoint byte-identical.

- [ ] **Step 4: Reduce HomeHeader to a wrapper**

```tsx
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { homeNavigation } from "@/config/homeNavigation";

export function HomeHeader() {
  return <ThemedHeader navItems={homeNavigation} />;
}
```

- [ ] **Step 5: Extract ThemedFooter**

Create `ThemedFooter.tsx` from `HomeFooter.tsx`, taking `columns` as a prop. Keep the socials array (with its per-network hover colours and its comment), the logo lockup, the contact block and every className unchanged. `HomeFooter` becomes a wrapper passing its existing `careLinks` / `hospitalLinks` as two columns.

- [ ] **Step 6: Build and lint**

Run: `npm run lint && npm run build`
Expected: both clean, 11 routes.

- [ ] **Step 7: Eyeball the home page**

Run: `npm run dev -- -p 3100`, open `http://localhost:3100/`, and confirm against `git stash`-free comparison: hero parallax, bento hovers, stagger reveals, theme toggle persisting across reload, footer socials, mobile nav at <1120px. Stop the server.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor: extract parameterised ThemedShell, ThemedHeader and ThemedFooter"
```

---

## Task 5: Catalog — Emergency and Surgical (9 services)

**Files:**
- Create: `src/features/services/data/emergency.ts`, `src/features/services/data/surgical.ts`
- Test: `src/features/services/data/catalog.test.ts`, `src/features/services/data/content.test.ts`

**Interfaces:**
- Consumes: `Service` from `../types` (Task 1).
- Produces: `emergencyServices: Service[]` (2), `surgicalServices: Service[]` (7).

Each module is **self-contained**: only `import type { Service } from "../types"`. Type-only imports are erased by Node's stripper, which is what lets the tests import these files directly.

Slugs, in order — `accident-emergency`, `intensive-critical-care`; then `general-surgery`, `orthopaedic-surgery`, `ent-surgery`, `urology`, `ophthalmology`, `neurosurgery`, `endoscopy`.

- [ ] **Step 1: Write the failing structural test**

Create `src/features/services/data/catalog.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import type { Service } from "../types.ts";
import { emergencyServices } from "./emergency.ts";
import { surgicalServices } from "./surgical.ts";

const SO_FAR: Service[] = [...emergencyServices, ...surgicalServices];

test("group modules have the expected sizes", () => {
  assert.equal(emergencyServices.length, 2);
  assert.equal(surgicalServices.length, 7);
});

test("every service is tagged with its own group", () => {
  for (const s of emergencyServices) assert.equal(s.group, "Emergency");
  for (const s of surgicalServices) assert.equal(s.group, "Surgical");
});

test("slugs are unique, lowercase and url-safe", () => {
  const slugs = SO_FAR.map((s) => s.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) assert.match(slug, /^[a-z][a-z0-9-]*[a-z0-9]$/);
});

test("required string fields are non-empty", () => {
  const fields = [
    "title", "directoryTitle", "hours", "cta", "desc",
    "lede", "aboutHead", "body1", "body2", "location",
  ] as const;
  for (const s of SO_FAR) {
    for (const f of fields) {
      assert.ok(s[f].trim().length > 0, `${s.slug}.${f} is empty`);
    }
  }
});

test("collection fields have the shapes the pages assume", () => {
  for (const s of SO_FAR) {
    assert.equal(s.strip.length, 4, `${s.slug} needs 4 hero stats`);
    assert.equal(s.steps.length, 4, `${s.slug} needs 4 journey steps`);
    assert.deepEqual(
      s.steps.map((st) => st.no),
      ["01", "02", "03", "04"],
      `${s.slug} steps must be numbered 01-04`,
    );
    assert.ok(s.covers.length >= 4, `${s.slug} needs >=4 covers`);
    assert.ok(s.conditions.length >= 4, `${s.slug} needs >=4 conditions`);
    assert.ok(s.facts.length >= 3, `${s.slug} needs >=3 facts`);
    assert.ok(s.prep.length >= 3, `${s.slug} needs >=3 prep items`);
    assert.ok(s.team.length >= 3, `${s.slug} needs >=3 team entries`);
    assert.ok(s.faq.length >= 3, `${s.slug} needs >=3 FAQs`);
  }
});

test("facts and strips are non-empty key/value pairs", () => {
  for (const s of SO_FAR) {
    for (const kv of [...s.facts, ...s.strip]) {
      assert.ok(kv.k.trim() && kv.v.trim(), `${s.slug} has an empty key/value`);
    }
  }
});
```

- [ ] **Step 2: Write the failing content-rule test**

Create `src/features/services/data/content.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import type { Service } from "../types.ts";
import { emergencyServices } from "./emergency.ts";
import { surgicalServices } from "./surgical.ts";

const ALL: Service[] = [...emergencyServices, ...surgicalServices];

/** Every string in a service, with a label for failure messages. */
function strings(s: Service): [string, string][] {
  const out: [string, string][] = [];
  const push = (label: string, v: string) => out.push([`${s.slug}.${label}`, v]);
  push("title", s.title);
  push("directoryTitle", s.directoryTitle);
  push("hours", s.hours);
  push("cta", s.cta);
  push("desc", s.desc);
  push("lede", s.lede);
  push("aboutHead", s.aboutHead);
  push("body1", s.body1);
  push("body2", s.body2);
  push("location", s.location);
  s.tags.forEach((t, i) => push(`tags[${i}]`, t));
  s.covers.forEach((t, i) => push(`covers[${i}]`, t));
  s.conditions.forEach((t, i) => push(`conditions[${i}]`, t));
  s.prep.forEach((t, i) => push(`prep[${i}]`, t));
  [...s.facts, ...s.strip].forEach((kv, i) => {
    push(`kv[${i}].k`, kv.k);
    push(`kv[${i}].v`, kv.v);
  });
  s.steps.forEach((st, i) => {
    push(`steps[${i}].title`, st.title);
    push(`steps[${i}].desc`, st.desc);
  });
  s.team.forEach((t, i) => {
    push(`team[${i}].role`, t.role);
    push(`team[${i}].note`, t.note);
  });
  s.faq.forEach((f, i) => {
    push(`faq[${i}].q`, f.q);
    push(`faq[${i}].a`, f.a);
  });
  return out;
}

test("no prices anywhere", () => {
  // LKR/Rs amounts, or bare thousands separators like 9,500 / 32,000.
  const price = /\b(?:LKR|Rs\.?|USD|\$)\s?[\d,]+|\b\d{1,3},\d{3}\b/i;
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      assert.ok(!price.test(v), `${label} contains a price: ${v}`);
    }
  }
});

test("the only phone number is the hospital's own", () => {
  const anyPhone = /\b(?:0\d{3}\s?\d{2}\s?\d{2}\s?\d{2}|\+94[\d\s]{7,})\b/g;
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      for (const hit of v.match(anyPhone) ?? []) {
        assert.equal(hit.trim(), "0117 84 84 84", `${label} has a foreign number: ${hit}`);
      }
    }
  }
});

test("team entries carry roles, never personal names", () => {
  // "Dr", "Prof", or a Title Case two-word personal name pattern.
  const named = /\b(?:Dr\.?|Prof\.?|Professor)\s|\bMr\.?\s|\bMs\.?\s|\bMrs\.?\s/;
  for (const s of ALL) {
    for (const t of s.team) {
      assert.ok(!named.test(t.role), `${s.slug} team role names a person: ${t.role}`);
      assert.ok(!named.test(t.note), `${s.slug} team note names a person: ${t.note}`);
    }
  }
});

test("no dental service and no priced package language", () => {
  const banned = /\bdental\b|\bdentist\b|\bpackage price\b|\ball inclusive\b/i;
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      assert.ok(!banned.test(v), `${label} contains banned content: ${v}`);
    }
  }
});

test("no success-rate or accreditation claims", () => {
  const banned = /\b\d{1,3}(?:\.\d+)?%\s*(?:success|survival|accura)|\baccredited\b|\bJCI\b|\bISO\s?\d/i;
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      assert.ok(!banned.test(v), `${label} makes an unverifiable claim: ${v}`);
    }
  }
});

test("addresses, where present, are the hospital's own", () => {
  for (const s of ALL) {
    for (const [label, v] of strings(s)) {
      if (/\bStreet\b|\bRoad\b|\bMawatha\b|\bColombo\b/i.test(v)) {
        assert.match(v, /St\. Joseph Street, Negombo|Negombo/, `${label} cites a foreign address: ${v}`);
      }
    }
  }
});
```

- [ ] **Step 3: Run both tests to confirm they fail**

Run: `npm test`
Expected: FAIL — cannot find module `./emergency.ts`.

- [ ] **Step 4: Write the Emergency module**

Create `src/features/services/data/emergency.ts`. Here is `accident-emergency` **complete** — it is the template for every other entry's shape, tone and length. Adapt the reference's copy; do not paste it, and drop any claim the spec does not license.

```ts
import type { Service } from "../types";

export const emergencyServices: Service[] = [
  {
    slug: "accident-emergency",
    title: "Accident & emergency",
    directoryTitle: "Accident & emergency unit",
    group: "Emergency",
    hours: "24 hours, walk in",
    cta: "Come straight in",
    desc: "A resuscitation bay staffed around the clock behind a covered ambulance entrance. Triage starts at the door, and the on-call surgical and anaesthetic teams can be in theatre within minutes of a decision to operate.",
    tags: ["Resuscitation bay", "Trauma", "Ambulance dispatch", "On-call theatre"],
    facts: [
      { k: "Ambulance", v: "0117 84 84 84" },
      { k: "Doctor on site", v: "Always" },
      { k: "Theatre on call", v: "24 hours" },
      { k: "Lab & X-ray", v: "Same floor" },
    ],
    lede: "A resuscitation bay staffed at every hour behind a covered ambulance entrance. No appointment, no queue, and no waiting for a doctor to be called in from home.",
    aboutHead: "Open every hour of every day",
    body1: "Triage begins at the door. A doctor sees you before any paperwork is started, and the on-call surgical and anaesthetic teams can be in theatre within minutes of a decision to operate.",
    body2: "Our own ambulances are dispatched from the same bay, and the laboratory and digital X-ray sit metres away, so bloods and films come back while you are still being assessed rather than after a transfer.",
    strip: [
      { k: "Hours", v: "24 / 7" },
      { k: "Appointment", v: "Not needed" },
      { k: "Triage", v: "At the door" },
      { k: "Ambulance", v: "Own fleet" },
    ],
    covers: [
      "Chest pain and breathlessness",
      "Trauma, fractures and wounds",
      "Acute abdominal pain",
      "Fever and dehydration in children",
      "Poisoning and allergic reactions",
      "Stabilisation before transfer",
    ],
    conditions: [
      "Road traffic injury",
      "Cardiac chest pain",
      "Asthma attack",
      "Dengue fever",
      "Head injury",
      "Burns",
      "Snake bite",
      "Seizures",
    ],
    location: "Ground floor, ambulance entrance",
    steps: [
      { no: "01", title: "Arrive", desc: "Walk in or arrive by ambulance. Registration can wait; assessment does not." },
      { no: "02", title: "Triage", desc: "A nurse and doctor assess severity within minutes and start treatment straight away." },
      { no: "03", title: "Investigate", desc: "Bloods, ECG and imaging are ordered on the spot and reported while you are still here." },
      { no: "04", title: "Admit or discharge", desc: "A room, a theatre slot, or a discharge plan with written instructions and a follow-up date." },
    ],
    prep: [
      "If you can, send someone ahead to register",
      "Bring your current medicine list or the boxes themselves",
      "Note the time your symptoms started",
      "Call 0117 84 84 84 if you need the ambulance",
    ],
    team: [
      { role: "Emergency medical officers", note: "On site at every hour, with immediate access to senior support." },
      { role: "Emergency nursing team", note: "Triage trained, with one nurse assigned to each resuscitation bay." },
      { role: "On-call consultants", note: "Surgery, anaesthesia, obstetrics and paediatrics reachable within minutes." },
      { role: "Ambulance crew", note: "Dispatched from our own bay with oxygen and monitoring on board." },
    ],
    faq: [
      { q: "Do I need an appointment or a referral?", a: "No. Emergency care is walk in at any hour. If you are unsure whether it is an emergency, call 0117 84 84 84 and a nurse will advise you." },
      { q: "Will I be seen before I pay?", a: "Yes. Assessment and stabilisation happen first. Billing is settled afterwards, and the desk will prepare insurance paperwork for you." },
      { q: "Can my family stay with me?", a: "One family member can stay in most cases. During resuscitation we may ask them to wait nearby, and a nurse will keep them updated." },
      { q: "What if I need surgery straight away?", a: "The on-call surgical and anaesthetic teams are reachable within minutes and our theatres are kept ready, so you are not transferred elsewhere for emergency surgery." },
    ],
  },
  // intensive-critical-care follows, same shape.
];
```

Then write `intensive-critical-care` — full ICU (user-confirmed): monitored beds, ventilation, consultant rounds, fixed visiting hours, a daily family update call, one nurse to a small group of beds. `hours: "Continuous"`, `cta: "Speak to the ICU desk"`, `location: "Second floor, intensive care unit"`.

- [ ] **Step 5: Write the Surgical module**

Create `src/features/services/data/surgical.ts` with the seven surgical services, each the same shape. Anchors for each — stay inside these and the Global Constraints:

| Slug | Title / directoryTitle | hours | cta | Scope anchors |
|---|---|---|---|---|
| `general-surgery` | General surgery | Scheduled lists | Request a consult | Laparoscopic where it shortens recovery; hernia, gallbladder, appendix; consultant anaesthesia; single-use consumables; assigned recovery nurse |
| `orthopaedic-surgery` | Orthopaedic surgery | Day case & inpatient | Request a consult | Fractures, arthroscopy, sports injury; imaging in the same corridor; physiotherapy plan agreed before discharge |
| `ent-surgery` | ENT surgery & audiology | Weekly lists | Book an ENT consult | Tonsils, sinus, grommets; audiology assessment before and after where hearing is involved; adult and paediatric lists |
| `urology` | Urology | Weekly lists | Book a urology consult | Stones, prostate, urinary tract; ultrasound and flow studies at the first visit |
| `ophthalmology` | Ophthalmology & cataract surgery | Weekly lists | Book an eye consult | Refraction, pressure checks, retinal assessment; day-case cataract surgery; next-day review. Lens **options** may be mentioned; **no prices** |
| `neurosurgery` | Neurosurgery | By referral | Request a consult | Brain and spine assessment, imaging-led planning, post-operative care. Describe narrowly — scope beyond assessment and planning is unconfirmed |
| `endoscopy` | Gastrointestinal & endoscopy | Scheduled lists | Book endoscopy | Gastroscopy, colonoscopy, biopsy and polypectomy; sedation by a consultant anaesthetist; same-day reporting; recovery bay beside the suite |

- [ ] **Step 6: Run the tests**

Run: `npm test`
Expected: PASS — all catalog and content tests green for 9 services.

- [ ] **Step 7: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 8: Commit**

```bash
git add src/features/services/data
git commit -m "feat(services): add emergency and surgical catalog entries with content-rule tests"
```

---

## Task 6: Catalog — Diagnostics and Women & children (9 services)

**Files:**
- Create: `src/features/services/data/diagnostics.ts`, `src/features/services/data/womenChildren.ts`
- Modify: `src/features/services/data/catalog.test.ts`, `src/features/services/data/content.test.ts`

**Interfaces:**
- Consumes: `Service` from `../types`.
- Produces: `diagnosticServices: Service[]` (4), `womenChildrenServices: Service[]` (5).

- [ ] **Step 1: Extend both test files**

In `catalog.test.ts` and `content.test.ts`, add the imports and widen the arrays:

```ts
import { diagnosticServices } from "./diagnostics.ts";
import { womenChildrenServices } from "./womenChildren.ts";

const SO_FAR: Service[] = [
  ...emergencyServices,
  ...surgicalServices,
  ...diagnosticServices,
  ...womenChildrenServices,
];
```

Add to the sizes test in `catalog.test.ts`:

```ts
assert.equal(diagnosticServices.length, 4);
assert.equal(womenChildrenServices.length, 5);
```

and to the group test:

```ts
for (const s of diagnosticServices) assert.equal(s.group, "Diagnostics");
for (const s of womenChildrenServices) assert.equal(s.group, "Women & children");
```

- [ ] **Step 2: Run to confirm failure**

Run: `npm test`
Expected: FAIL — cannot find module `./diagnostics.ts`.

- [ ] **Step 3: Write the Diagnostics module**

| Slug | Title | hours | cta | Scope anchors |
|---|---|---|---|---|
| `laboratory` | Laboratory services | 24 hours | Book a test | Haematology, biochemistry, microbiology, histopathology; every report verified by two doctors before release; same-day reports; 10% discount for OPD patients |
| `radiology` | Radiology & digital X-ray | 24 hours | Book imaging | Digital radiography and ultrasound; lower dose, sharper plates; read within the hour; portable ward imaging; CT and MRI arranged by referral to partner centres — **state plainly that CT/MRI are referral, not on site** |
| `cardiac-screening` | Cardiac screening & ECG | Daily | Book a screening | Resting ECG, echocardiography, cardiac risk assessment; interpreted by a physician the same day; referral to cardiology when the result calls for it |
| `fetal-monitoring` | CTG & fetal monitoring | By appointment | Book monitoring | Cardiotocography for fetal heart rate and contractions; run alongside the antenatal clinic; reviewed by the obstetric team |

- [ ] **Step 4: Write the Women & children module**

| Slug | Title | hours | cta | Scope anchors |
|---|---|---|---|---|
| `obstetrics-maternity` | Obstetrics & maternity | 24 hours on call | Speak to maternity | One named consultant through the pregnancy; scans in the clinic; a dedicated obstetric theatre separate from general surgery; neonatal support present at delivery when needed; private room |
| `gynaecology` | Gynaecology | Weekly clinics | Book gynaecology | Menstrual, fertility and menopause concerns; ultrasound at the first visit; day-case procedures; female staff on request |
| `paediatrics` | Paediatrics & neonatal care | 24 hours | Book paediatrics | Kids and Teens Medical Group protocol; newborn review, growth tracking, the full vaccination schedule, acute childhood illness at any hour; home visit option for newborns |
| `fertility` | Fertility & embryology | By appointment | Book a consultation | Assessment and counselling for couples, cycle monitoring, embryology support. Describe narrowly — do not name techniques or quote outcomes |
| `vaccination-clinic` | Vaccination clinic | Daily | Book a vaccination | Full childhood schedule plus adult and travel vaccination; cold chain monitoring; a printed record card every visit; SMS reminders |

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS for 18 services.

- [ ] **Step 6: Lint and commit**

```bash
npm run lint
git add src/features/services/data
git commit -m "feat(services): add diagnostics and women & children catalog entries"
```

---

## Task 7: Catalog — Clinics (14 services)

**Files:**
- Create: `src/features/services/data/clinics.ts`
- Modify: both test files

**Interfaces:**
- Consumes: `Service` from `../types`.
- Produces: `clinicServices: Service[]` (14).

- [ ] **Step 1: Extend the tests**

Add `import { clinicServices } from "./clinics.ts";` to both, include it in `SO_FAR`, assert `clinicServices.length === 14`, and assert every entry's `group === "Clinics"`.

- [ ] **Step 2: Run to confirm failure**

Run: `npm test`
Expected: FAIL — cannot find module `./clinics.ts`.

- [ ] **Step 3: Write the module**

| Slug | Title | hours | cta | Scope anchors |
|---|---|---|---|---|
| `outpatient-department` | Outpatient department (OPD) | 24 hours | Book a consultation | General and specialist consultations with in-house doctors; only the tests that change the plan; diagnosis explained before you leave; follow-up booked at the same desk; same-day slots; 10% lab discount for OPD patients |
| `cardiology` | Cardiology | Weekly clinics | Book a cardiology consult | Consultant clinics for blood pressure, rhythm and heart failure follow-up; ECG and echo in the same visit |
| `dermatology` | Dermatology & wound clinic | Weekly clinics | Book dermatology | Skin, hair and nail conditions; minor skin surgery; a dedicated wound clinic for diabetic and non-healing wounds with structured dressing schedules; dressings supplied |
| `diabetes-endocrinology` | Diabetes & endocrine care | Weekly clinics | Book a review | Diabetes review with HbA1c and complication screening; thyroid and hormone disorders; a written plan and dietitian referral |
| `nutrition` | Nutrition & dietetics | By appointment | Book a session | Diet assessment and written plans for diabetes, weight, pregnancy and post-operative recovery; ward reviews for inpatients |
| `rheumatology` | Rheumatology | Weekly clinics | Book rheumatology | Joint and connective tissue disease assessment; inflammatory markers and imaging in the same corridor; long-term review |
| `neurology` | Neurology | Weekly clinics | Book neurology | Headache, seizure, stroke follow-up and nerve complaints; imaging arranged as needed |
| `nephrology` | Nephrology & renal care | Weekly clinics | Book nephrology | Kidney function assessment, blood pressure and renal follow-up; lab panels reported the same day. **Dialysis is not claimed** |
| `respiratory-medicine` | Respiratory & chest medicine | Weekly clinics | Book a consult | Asthma, COPD and chest infection assessment; chest X-ray in the same visit; respiratory physiotherapy for inpatients |
| `haematology` | Haematology | By referral | Book a consult | Anaemia and blood count abnormalities; blood film and marrow reporting through our histopathology service; consultant review |
| `mental-health` | Mental health & counselling | By appointment | Book an appointment | Psychiatric assessment and counselling in private consulting rooms; medication review; follow-up scheduling. Keep tone plain and non-stigmatising |
| `physiotherapy` | Physiotherapy & rehabilitation | Daily | Book physiotherapy | Post-operative, orthopaedic and neurological rehabilitation; written home programme; respiratory physiotherapy on the ward; sessions of 30 or 45 minutes |
| `speech-therapy` | Speech & language therapy | By appointment | Book a session | Assessment and therapy for speech, language and swallowing difficulties in children and adults; home practice plan |
| `inpatient-rooms` | Inpatient rooms | Continuous | Reserve a room | Standard, deluxe and super deluxe rooms plus wards; sanitised every two hours; attendant space; meals to dietary orders; from 10,000 LKR a night (the one licensed price) |

Note the deliberate exception: `inpatient-rooms` is the only entry allowed a price, because the site already states "From 10,000 LKR a night". Add it as a `facts` entry, and add this allowance to the price test:

```ts
const PRICE_EXEMPT = new Set(["inpatient-rooms"]);
// inside the loop:
if (PRICE_EXEMPT.has(s.slug)) continue;
```

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: PASS for 32 services.

- [ ] **Step 5: Lint and commit**

```bash
npm run lint
git add src/features/services/data
git commit -m "feat(services): add clinics catalog entries"
```

---

## Task 8: Catalog — At home, aggregate and helpers

**Files:**
- Create: `src/features/services/data/atHome.ts`, `src/features/services/data/services.ts`
- Modify: both test files
- Test: new assertions in `catalog.test.ts`

**Interfaces:**
- Consumes: all six group modules.
- Produces:

```ts
export const services: Service[];                       // 36, index order
export const serviceSlugs: string[];
export function getService(slug: string): Service | undefined;
export function relatedServices(slug: string, count?: number): Service[];
export function servicesByGroup(group: ServiceGroup): Service[];
export function groupCounts(): Record<string, number>;   // keyed by GROUPS entries
```

- [ ] **Step 1: Extend the tests with the aggregate assertions**

Add to `catalog.test.ts`:

```ts
import { atHomeServices } from "./atHome.ts";
import { services, serviceSlugs, getService, relatedServices, groupCounts } from "./services.ts";

test("the catalog holds 36 services", () => {
  assert.equal(atHomeServices.length, 4);
  assert.equal(services.length, 36);
  assert.equal(serviceSlugs.length, 36);
  assert.equal(new Set(serviceSlugs).size, 36);
});

test("group counts sum to 36 and match the spec", () => {
  const counts = groupCounts();
  assert.deepEqual(counts, {
    All: 36,
    Emergency: 2,
    Surgical: 7,
    Diagnostics: 4,
    Clinics: 14,
    "Women & children": 5,
    "At home": 4,
  });
  const sum = Object.entries(counts)
    .filter(([g]) => g !== "All")
    .reduce((n, [, v]) => n + v, 0);
  assert.equal(sum, 36);
});

test("getService resolves every slug and rejects unknown ones", () => {
  for (const slug of serviceSlugs) assert.equal(getService(slug)?.slug, slug);
  assert.equal(getService("not-a-service"), undefined);
});

test("relatedServices returns 3 distinct others, preferring the same group", () => {
  for (const s of services) {
    const rel = relatedServices(s.slug);
    assert.equal(rel.length, 3, `${s.slug} related count`);
    assert.ok(!rel.some((r) => r.slug === s.slug), `${s.slug} relates to itself`);
    assert.equal(new Set(rel.map((r) => r.slug)).size, 3, `${s.slug} related duplicates`);
  }
});
```

Also widen `content.test.ts`'s `ALL` to import from `./services.ts` instead of listing modules, so every future entry is covered automatically:

```ts
import { services as ALL } from "./services.ts";
```

- [ ] **Step 2: Run to confirm failure**

Run: `npm test`
Expected: FAIL — cannot find module `./atHome.ts`.

- [ ] **Step 3: Write the At home module**

| Slug | Title / directoryTitle | hours | cta | Scope anchors |
|---|---|---|---|---|
| `pharmacy` | 24-hour pharmacy | 24 hours | Order medicine | Authorized stock only, dispensed by pharmacists who can read your file; no substitutes and no grey-market supply; digital prescriptions on file |
| `medicine-delivery` | Medicine delivery | Daily | Send a prescription | Prescription and over-the-counter medicine delivered across Negombo from our own counter; pharmacist check before dispatch; photo prescriptions accepted |
| `home-visits` | Home visits | By appointment | Request a visit | Doctors, nurses and laboratory technicians at your door for elders, infants and post-operative care; 6 dedicated vehicles; sampling at home; notes written straight into your file |
| `telemedicine` | Telemedicine | Daily | Book a consultation | Video and phone consultations with our doctors; prescriptions issued to the pharmacy for delivery; follow-up for patients who have travelled home |

- [ ] **Step 4: Write the aggregate**

Create `src/features/services/data/services.ts`:

```ts
import type { Service, ServiceGroup } from "../types";
import { GROUPS } from "./groups";
import { emergencyServices } from "./emergency";
import { surgicalServices } from "./surgical";
import { diagnosticServices } from "./diagnostics";
import { clinicServices } from "./clinics";
import { womenChildrenServices } from "./womenChildren";
import { atHomeServices } from "./atHome";

export const services: Service[] = [
  ...emergencyServices,
  ...surgicalServices,
  ...diagnosticServices,
  ...clinicServices,
  ...womenChildrenServices,
  ...atHomeServices,
];

export const serviceSlugs: string[] = services.map((s) => s.slug);

const bySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string): Service | undefined {
  return bySlug.get(slug);
}

export function servicesByGroup(group: ServiceGroup): Service[] {
  return services.filter((s) => s.group === group);
}

export function groupCounts(): Record<string, number> {
  const counts: Record<string, number> = { All: services.length };
  for (const g of GROUPS.slice(1)) {
    counts[g] = services.filter((s) => s.group === g).length;
  }
  return counts;
}

/**
 * Three sibling services: same group first (the reference walked the flat list,
 * which paired unrelated services), then the flat walk as a fallback so small
 * groups still fill three slots.
 */
export function relatedServices(slug: string, count = 3): Service[] {
  const current = getService(slug);
  if (!current) return [];
  const picked: Service[] = [];
  const seen = new Set([slug]);
  const take = (candidates: Service[]) => {
    for (const c of candidates) {
      if (picked.length >= count) return;
      if (seen.has(c.slug)) continue;
      seen.add(c.slug);
      picked.push(c);
    }
  };
  take(servicesByGroup(current.group));
  const start = services.indexOf(current);
  take(services.slice(start + 1).concat(services.slice(0, start)));
  return picked;
}
```

Note `services.ts` imports its siblings **extensionless**, which Next requires. The tests import it as `./services.ts`; Node resolves the aggregate's own extensionless specifiers because they are value imports — so add the extension there too if Node objects. If `npm test` fails to resolve them, the fix is to give `services.ts` the `.ts` extensions and set `"allowImportingTsExtensions": true` in `tsconfig.json`; verify `npm run build` still passes before choosing that route.

- [ ] **Step 5: Run the tests**

Run: `npm test`
Expected: PASS — 36 services, counts matching the spec.

- [ ] **Step 6: Lint and commit**

```bash
npm run lint
git add src/features/services/data
git commit -m "feat(services): complete the 36-service catalog with aggregate helpers"
```

---

## Task 9: Index-only content

**Files:**
- Create: `src/features/services/data/indexContent.ts`
- Test: `src/features/services/data/indexContent.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `jumpCards`, `centres`, `surgicalRows`, `diagnosticRows`, `packages`, `admissionSteps`, `bringWithYou`, `paymentNotes`, `comforts`, `internationalSteps` — all typed and exported.

- [ ] **Step 1: Write the failing test**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { centres, jumpCards, packages, admissionSteps, internationalSteps, comforts } from "./indexContent.ts";

test("nine centres of excellence, numbered 01-09", () => {
  assert.equal(centres.length, 9);
  assert.deepEqual(centres.map((c) => c.no), ["01","02","03","04","05","06","07","08","09"]);
});

test("four jump cards, each anchoring to a section on this page", () => {
  assert.equal(jumpCards.length, 4);
  for (const c of jumpCards) assert.match(c.href, /^#[a-z]+$/);
});

test("three package tiers, none of them priced", () => {
  assert.equal(packages.length, 3);
  for (const p of packages) {
    assert.ok(p.items.length >= 4);
    const text = [p.tier, p.name, ...p.items].join(" ");
    assert.ok(!/\b\d{1,3},\d{3}\b|LKR|Rs\.?/i.test(text), `${p.name} is priced`);
    assert.match(p.ctaLabel, /quote/i);
  }
});

test("four admission steps and six international steps", () => {
  assert.deepEqual(admissionSteps.map((s) => s.no), ["01","02","03","04"]);
  assert.equal(internationalSteps.length, 6);
});

test("comforts are short chips", () => {
  assert.ok(comforts.length >= 8);
  for (const c of comforts) assert.ok(c.length <= 32, `${c} is too long for a chip`);
});
```

- [ ] **Step 2: Run to confirm failure**

Run: `npm test`
Expected: FAIL — cannot find module `./indexContent.ts`.

- [ ] **Step 3: Write the module**

Content, all licensed by the spec:

- `jumpCards` — `{ count: "9 units", label: "Centres of excellence", note: "Care organised around one problem, not one visit.", href: "#centres" }`, `{ count: "36 services", label: "Full directory", note: "Hours, scope and how to start each one.", href: "#directory" }`, `{ count: "3 tiers", label: "Health checks", note: "Structured screening in a single morning.", href: "#packages" }`, `{ count: "4 steps", label: "Admissions", note: "What to bring, how billing and insurance work.", href: "#admissions" }`.
- `centres` — nine `{ no, name, desc, lead }`: Accident & Emergency ("Open 24 hours"), Surgical Care ("Consultant led lists"), Mother & Baby ("Named consultant"), Paediatric Care ("Kids & Teens protocol"), Laboratory ("Same day reports"), Radiology ("Read in an hour"), Endoscopy Unit ("Same day reporting"), Wellness & Health Check ("Structured screening"), Physiotherapy & Wound Care ("Weekly reviews").
- `surgicalRows` — nine `{ name, note }` drawn from the seven surgical services plus "Anaesthesia — Consultant led lists" and "Post-operative care — Assigned recovery nurse".
- `diagnosticRows` — eight `{ name, note, turnaround }`: Haematology & biochemistry (Same day), Microbiology & cultures (48 to 72 h), Histopathology (3 to 5 days), Digital X-ray (Within an hour), Ultrasound (At the visit), ECG & echocardiography (Same day), Endoscopy (Same day), CT & MRI referral (Arranged by referral).
- `packages` — three `{ tier, name, items, ctaLabel: "Request a quote", accent }`, `accent: true` on the middle tier only. Tiers: "Essential" / Basic health check, "Most chosen" / Comprehensive check, "Executive" / Executive & cardiac. Items describe the panels, never a price.
- `admissionSteps` — four `{ no, title, desc }`: Tell us the problem, See a doctor, Costed plan first, Treatment and follow up.
- `bringWithYou`, `paymentNotes` — short string arrays for the admissions side panels.
- `comforts` — free parking, free wifi, cafeteria, attendant space in rooms, meals to dietary orders, prayer room, wheelchair access, card & transfer payments, interpreters on request, quiet visiting hours.
- `internationalSteps` — six `{ no, title, desc }`: Airport to bedside (ten minutes from Bandaranaike International), Estimates in writing, Insurance and claims, Language support, Records to take home, Follow up online.

- [ ] **Step 4: Run the tests, lint, commit**

```bash
npm test && npm run lint
git add src/features/services/data
git commit -m "feat(services): add index page content data"
```

---

## Task 10: Services route, shell, hero and jump cards

**Files:**
- Create: `src/app/services/layout.tsx`, `src/app/services/page.tsx`
- Create: `src/config/servicesNavigation.ts`
- Create: `src/features/services/components/ServicesIndexPage.tsx`
- Create: `src/features/services/components/index/ServicesHero.tsx`, `JumpCards.tsx`
- Create: `src/features/services/index.ts`
- Copy: two images into `public/images/services/`
- Delete: `src/app/(marketing)/services/page.tsx`

**Interfaces:**
- Consumes: `ThemedShell`, `ThemedHeader` (Task 4); `Reveal`, `RevealStagger`, `ParallaxLayer` (Task 3); `jumpCards` (Task 9); `groupCounts` (Task 8).
- Produces: `ServicesIndexPage` from `@/features/services`; `servicesNavigation` and `servicesFooterColumns` from `@/config/servicesNavigation`.

The old `(marketing)/services/page.tsx` must go in this task — two routes cannot both own `/services`.

- [ ] **Step 1: Add the two new images**

```bash
mkdir -p public/images/services
cp "/c/Users/User/AppData/Local/Temp/claude/c--dev-sj-hospital/52c2ea90-d2cb-4b39-aa59-ff28861e1165/scratchpad/ref/img/7da935c7.png" public/images/services/exterior-dusk-a.png
cp "/c/Users/User/AppData/Local/Temp/claude/c--dev-sj-hospital/52c2ea90-d2cb-4b39-aa59-ff28861e1165/scratchpad/ref/img/ea1cbf25.png" public/images/services/exterior-dusk-b.png
```

If that scratchpad is gone, re-extract with the script described in the spec's "Sources" section.

- [ ] **Step 2: Write the navigation config**

`src/config/servicesNavigation.ts` — header nav (in-page anchors, matching the reference): Services `#centres`, Facilities `#facilities`, Health Checks `#packages`, Admissions `#admissions`, International Patient Care `#international`. Plus `servicesFooterColumns`: a "Care" column (Centres of excellence, Full directory, Department of surgery, Diagnostics & radiology, Pharmacy) and a "Hospital" column (Health check packages, Admissions, Facilities, International patient care, Home).

- [ ] **Step 3: Delete the old route and swap the feature surface**

```bash
git rm -r "src/app/(marketing)/services"
git rm src/features/services/index.tsx
```

Create `src/features/services/index.ts` exporting `ServicesIndexPage` and (from Task 16) `ServiceDetailPage`.

- [ ] **Step 4: Write the layout**

`src/app/services/layout.tsx` wraps children in `ThemedShell` and adds `data-flow-header` (so the `scroll-margin-top: 0` rule from Task 4 applies — the header is not sticky here either).

- [ ] **Step 5: Write the hero**

`ServicesHero.tsx` — a `data-fixed-dark`-equivalent section, min-height ~86vh (74vh below 900px), the `exterior-dusk-a.png` background inside a `ParallaxLayer` with a dark gradient overlay, `ThemedHeader` with `servicesNavigation`, an eyebrow, an `<h1>` using `font-display text-[clamp(...)] uppercase` matching the home hero's scale, and an "Open the directory →" link to `#directory`. The header sits on the dark image in both themes, so its text stays fixed-light — follow the comment in `ThemedHeader`.

- [ ] **Step 6: Write the jump cards**

`JumpCards.tsx` — a `RevealStagger` 4-column grid (2 at 1024px, 1 at 640px) of anchor cards, each showing `count`, `label`, `note`, hover-lifting `-translate-y-1.5` over `450ms`. Pull the "36 services" figure from `groupCounts().All` rather than hardcoding, so it can never drift.

- [ ] **Step 7: Compose the page**

`ServicesIndexPage.tsx` renders `<ServicesHero />` then `<JumpCards />`. `src/app/services/page.tsx` exports `metadata` (title "Medical Services | St. Joseph Hospital Negombo", description naming the 36 services and the six groups) and renders `<ServicesIndexPage />`.

- [ ] **Step 8: Build and check the route**

Run: `npm run lint && npm run build`
Expected: clean; `/services` present, still 11 routes total.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(services): add themed services route with hero and jump cards"
```

---

## Task 11: Centres of excellence section

**Files:**
- Create: `src/features/services/components/index/CentresSection.tsx`
- Modify: `src/features/services/components/ServicesIndexPage.tsx`

**Interfaces:**
- Consumes: `centres` (Task 9), `Reveal`/`RevealStagger` (Task 3).
- Produces: `CentresSection` (no props).

- [ ] **Step 1: Write the section**

`#centres`, eyebrow "01 / Centres of excellence", heading "Nine units built around one problem" in `font-display … uppercase`. A 3-column grid (2 at 1024px with the last cell spanning both, 1 at 640px) of `group` cards. Each card: `no` in accent, `name`, `desc`, and a `lead` line that is **hidden until hover** — `opacity-0 translate-y-2` → `group-hover:opacity-100 group-hover:translate-y-0` over `400ms`/`450ms`, with the card lifting `-translate-y-1.5` over `450ms`. Each card links to `#directory`.

- [ ] **Step 2: Add it to the page**

Insert `<CentresSection />` after `<JumpCards />`.

- [ ] **Step 3: Build, lint, commit**

```bash
npm run lint && npm run build
git add -A
git commit -m "feat(services): add centres of excellence section"
```

---

## Task 12: The service directory

**Files:**
- Create: `src/features/services/components/index/ServiceDirectory.tsx` (`'use client'`)
- Modify: `src/features/services/components/ServicesIndexPage.tsx`

**Interfaces:**
- Consumes: `services`, `groupCounts` (Task 8); `GROUPS` (Task 1).
- Produces: `ServiceDirectory({ services, counts })` — takes data as props so the client bundle holds no import of the data module's helpers.

This is the page's core and the only stateful part of the index: the group filter and which row is expanded.

- [ ] **Step 1: Write the component**

`'use client'` at the top. Two pieces of state:

```tsx
const [filter, setFilter] = useState<(typeof GROUPS)[number]>("All");
const [open, setOpen] = useState(0);
```

Structure:
- Eyebrow "02 / Full directory", heading `filter === "All" ? "Everything we treat" : \`${filter} services\`` and a count line `` `${shown.length} of ${services.length} services` ``.
- A chip row (`overflow-x-auto flex-nowrap` below 1024px) of 7 buttons labelled `` `${g} (${counts[g]})` ``. The active chip is `bg-[var(--home-accent)] text-[var(--home-on-accent)]`; the rest are bordered ghosts. Selecting a filter resets `open` to `0`.
- Rows: a `grid-cols-[64px_1fr_auto_34px]` button per service (`50px 1fr 34px` with the meta column hidden below 900px), showing `/01`-style index, `directoryTitle`, `hours`, and a `+` glyph that rotates 45° when open (`transition-transform duration-[350ms]`).
- The panel below each row uses the reference's measured-height pattern: `overflow-hidden` with `max-height` and `opacity` transitions (`550ms` / `400ms`). Prefer a `ref`-measured `scrollHeight` over the reference's fixed `700px` so long rows are never clipped — a real improvement, since several services have more tags than the reference's did.
- The open panel shows `desc`, the `tags` as chips, the `facts` as key/value pairs, the service's `cta` linking to `#book`, **and** a "Read more about <title> →" `<Link href={`/services/${slug}`}>` — the deviation the spec calls for.

Row indices are computed over the **filtered** list, matching the reference.

- [ ] **Step 2: Add it to the page**

```tsx
<ServiceDirectory services={services} counts={groupCounts()} />
```

- [ ] **Step 3: Build, lint, commit**

```bash
npm run lint && npm run build
git add -A
git commit -m "feat(services): add filterable service directory"
```

---

## Task 13: Department of surgery and diagnostics sections

**Files:**
- Create: `src/features/services/components/index/SurgicalSection.tsx`, `DiagnosticsSection.tsx`
- Modify: `src/features/services/components/ServicesIndexPage.tsx`

**Interfaces:**
- Consumes: `surgicalRows`, `diagnosticRows` (Task 9).
- Produces: `SurgicalSection`, `DiagnosticsSection` (no props).

- [ ] **Step 1: Write the surgical section**

`#surgical` on a `bg-[var(--home-surface-2)]` band. Eyebrow "03 / Department of surgery", a two-column split (stacking at 900px): copy on the left, and on the right a hairline-separated list of `surgicalRows` as `name` / `note` pairs. A "Request a surgical consult →" link to `#book`.

- [ ] **Step 2: Write the diagnostics section**

`#diagnostics`. Eyebrow "04 / Diagnostics & radiology", heading "Lab, imaging & endoscopy". Rows of `name` / `note` / `turnaround`, the turnaround right-aligned in accent and hidden below 900px. A "Book a test →" link to `#book`. State the CT/MRI row plainly as arranged by referral.

- [ ] **Step 3: Add both to the page, build, lint, commit**

```bash
npm run lint && npm run build
git add -A
git commit -m "feat(services): add surgery and diagnostics sections"
```

---

## Task 14: Health checks and admissions sections

**Files:**
- Create: `src/features/services/components/index/PackagesSection.tsx`, `AdmissionsSection.tsx`
- Modify: `src/features/services/components/ServicesIndexPage.tsx`

**Interfaces:**
- Consumes: `packages`, `admissionSteps`, `bringWithYou`, `paymentNotes` (Task 9).
- Produces: `PackagesSection`, `AdmissionsSection` (no props).

- [ ] **Step 1: Write the packages section**

`#packages`, heading "Priced up front, in one morning" — **reword**, since nothing is priced: use "Screening in a single morning". Three cards (1 column below 1024px); the middle card is `accent: true`, rendering on `bg-[var(--home-accent)]` with `text-[var(--home-on-accent)]`, the others on `--home-surface-2`. Each card shows `tier`, `name`, a ticked `items` list (accent ticks), and a "Request a quote" button linking to `#book`. **No price element at all** — do not leave an empty price slot.

- [ ] **Step 2: Write the admissions section**

`#admissions`, eyebrow "06 / Admissions", heading "Four steps, no surprises". A 4-column `RevealStagger` of `admissionSteps` with large `no` numerals (`font-display`, `clamp` down to 56px below 900px), then two side panels: "Bring with you" (`bringWithYou`) and "Payment & insurance" (`paymentNotes`), and a short "The rooms" block linking to `/accommodation`.

- [ ] **Step 3: Add both, build, lint, commit**

```bash
npm run lint && npm run build
git add -A
git commit -m "feat(services): add health check and admissions sections"
```

---

## Task 15: Facilities, pharmacy, international, book and footer

**Files:**
- Create: `src/features/services/components/index/FacilitiesSection.tsx`, `PharmacySection.tsx`, `InternationalSection.tsx`, `BookSection.tsx`
- Modify: `src/features/services/components/ServicesIndexPage.tsx`

**Interfaces:**
- Consumes: `comforts`, `internationalSteps` (Task 9); `ThemedFooter`, `servicesFooterColumns` (Tasks 4, 10); `ParallaxLayer`.
- Produces: the four sections, and a complete index page.

Name these files inside `components/index/` — they do not collide with the same-named home components, which stay in `features/home`.

- [ ] **Step 1: Write the facilities section**

`#facilities` — four cards in the exact `FacilitiesSection.tsx` idiom from `features/home`: `group` card, photo in a `ParallaxLayer` with `group-hover:scale-[1.09] group-hover:opacity-78 duration-700`, a bottom bar `origin-left scale-x-0 group-hover:scale-x-100 duration-[450ms]`, and a body block `group-hover:-translate-y-2 duration-500`. Use `hero-exterior.png`, `welcome.jpg`, `doctors.jpg` and `exterior-dusk-b.png` (alt "Hospital exterior and ambulance entrance"). Follow with the `comforts` chips.

- [ ] **Step 2: Write the pharmacy section**

`#pharmacy` on a surface band: authorized stock only, 24/7 counter, Negombo delivery radius, pharmacist check, digital prescriptions. An "Order a delivery →" link to `#book`. Reuse the wording anchors from the `pharmacy` and `medicine-delivery` catalog entries without duplicating whole sentences.

- [ ] **Step 3: Write the international section**

`#international`, heading "Ten minutes from the airport", the six `internationalSteps` in a 3-column grid (1 below 900px).

- [ ] **Step 4: Write the book section**

`#book` — the closing CTA: heading "Tell us what you need", a short paragraph, the hospital's phone `0117 84 84 84`, a primary button to `/contact-us` and a ghost "Browse services →" to `#directory`.

- [ ] **Step 5: Add the footer and finish the page**

Append `<ThemedFooter columns={servicesFooterColumns} id="contact" />` inside `ServicesIndexPage`, after the sections. Confirm the section order matches the spec: hero, jump, centres, directory, surgical, diagnostics, packages, admissions, facilities, pharmacy, international, book, footer.

- [ ] **Step 6: Build, lint, commit**

```bash
npm run lint && npm run build
git add -A
git commit -m "feat(services): complete the services index page"
```

---

## Task 16: Detail route, hero and service picker

**Files:**
- Create: `src/app/services/[slug]/page.tsx`, `src/app/services/[slug]/not-found.tsx`
- Create: `src/features/services/components/ServiceDetailPage.tsx`
- Create: `src/features/services/components/detail/ServiceHero.tsx`, `ServicePicker.tsx`
- Modify: `src/features/services/index.ts`

**Interfaces:**
- Consumes: `getService`, `serviceSlugs`, `services` (Task 8); `ThemedHeader`, `ParallaxLayer`.
- Produces: `ServiceDetailPage({ service })`; the route exports `generateStaticParams` and `generateMetadata`.

**Read `node_modules/next/dist/docs/` on dynamic routes and metadata before writing this task.** `params` is a Promise in Next 16.

- [ ] **Step 1: Write the route**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, serviceSlugs } from "@/features/services/data/services";
import { ServiceDetailPage } from "@/features/services";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const description =
    service.lede.length > 155 ? `${service.lede.slice(0, 152).trimEnd()}…` : service.lede;
  return {
    title: `${service.title} | St. Joseph Hospital Negombo`,
    description,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
```

- [ ] **Step 2: Write not-found**

A themed page inside the services layout: "We don't have that service" plus a link back to `/services`.

- [ ] **Step 3: Write the hero**

`ServiceHero.tsx` — `#top`, fixed-dark, min-height ~72vh. Background `exterior-dusk-a.png` with `className="animate-sj-burns"` (the Ken Burns keyframe already in `globals.css`, already disabled under `prefers-reduced-motion`). `ThemedHeader` with `servicesNavigation`. Then: a group eyebrow, `<h1>{service.title}</h1>` in `font-display … uppercase`, the `lede`, a CTA button using `service.cta` linking to `#book`, a back-link to `/services`, and the four `strip` stats as a hairline-separated row.

- [ ] **Step 4: Write the picker**

`ServicePicker.tsx` — a Server Component (no state needed now that these are real routes): a wrapping chip row of `<Link>`s over all 36 services. The current service's chip is `bg-[var(--home-accent)] text-[var(--home-on-accent)]`; the others are bordered ghosts. Below 1024px the row scrolls horizontally.

- [ ] **Step 5: Compose and build**

`ServiceDetailPage` renders `<ServiceHero service={service} />` then `<ServicePicker current={service.slug} />`. Export it from `features/services/index.ts`.

Run: `npm run lint && npm run build`
Expected: clean, and the route list gains 36 prerendered `/services/[slug]` entries.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(services): add per-service routes with hero and picker"
```

---

## Task 17: About and journey sections

**Files:**
- Create: `src/features/services/components/detail/AboutSection.tsx`, `JourneySection.tsx`
- Modify: `src/features/services/components/ServiceDetailPage.tsx`

**Interfaces:**
- Consumes: `Service` (Task 1).
- Produces: `AboutSection({ service })`, `JourneySection({ service })`.

- [ ] **Step 1: Write the about section**

`#about`, a two-column split (stacking at 900px). Left: `aboutHead` as `<h2 className="font-display …">`, then `body1` and `body2` in muted text; then "What this covers" as a two-column hairline list of `covers`, and "Conditions we see most" as ghost chips of `conditions`. Right: a sticky (static below 900px) surface card holding the `cta` as its heading, the `facts` as key/value rows, and the `location` above `229/10 St. Joseph Street, Negombo`.

- [ ] **Step 2: Write the journey section**

`#journey` on a surface band. Heading "Your visit, step by step". The four `steps` in a 4-column grid (1 below 900px) with large `no` numerals (`font-display`, dropping to 56px below 900px). Below, a two-column block: "How to prepare" with the `prep` items, and "Bring with you" with a short fixed list (ID, current medicines, previous reports, insurance details).

- [ ] **Step 3: Add both, build, lint, commit**

```bash
npm run lint && npm run build
git add -A
git commit -m "feat(services): add about and journey sections to service pages"
```

---

## Task 18: Team, FAQ, related and book sections

**Files:**
- Create: `src/features/services/components/detail/TeamSection.tsx`, `FaqAccordion.tsx` (`'use client'`), `RelatedSection.tsx`, `DetailBookSection.tsx`
- Modify: `src/features/services/components/ServiceDetailPage.tsx`

**Interfaces:**
- Consumes: `Service`, `relatedServices` (Task 8).
- Produces: `TeamSection({ service })`, `FaqAccordion({ faq })`, `RelatedSection({ slug })`, `DetailBookSection({ service })`.

- [ ] **Step 1: Write the team section**

`#team`, heading "The team on this service", the `team` entries as hairline-separated `role` / `note` rows. Roles only — the content tests enforce that no names appear.

- [ ] **Step 2: Write the FAQ accordion**

`'use client'`, `#faq`, heading "Asked before you ask". One `useState<number>(-1)` for the open index. Each item is a button row with the question and a `+` that rotates 45° when open (`duration-[350ms]`), over a panel using the same measured-height pattern as the directory (`max-height` + `opacity`, `550ms`/`400ms`). Only one open at a time; clicking the open one closes it.

- [ ] **Step 3: Write the related section**

`#related`, heading "Related services", three cards from `relatedServices(slug)`. Each shows `group`, `directoryTitle` and its first `strip` pair as a meta line, lifts `-translate-y-1.5` on hover over `400ms`, and links to `/services/<slug>`.

- [ ] **Step 4: Write the book section**

`#book` — heading using the service's `cta` (e.g. "Book endoscopy today."), the hospital's phone, a button to `/contact-us`, and a ghost link back to `/services`.

- [ ] **Step 5: Finish the page**

Section order: hero, picker, about, journey, team, faq, related, book, `<ThemedFooter columns={servicesFooterColumns} id="contact" />`.

- [ ] **Step 6: Build, lint, commit**

```bash
npm run lint && npm run build
git add -A
git commit -m "feat(services): complete per-service pages with team, FAQ and related"
```

---

## Task 19: Site-wide wiring and removal of the old services code

**Files:**
- Modify: `src/config/homeNavigation.ts`
- Modify: `src/features/home/components/HomeFooter.tsx`
- Modify: `src/features/home/components/ServicesBentoSection.tsx`
- Delete: `src/features/services/components/{MainServicesGrid,DepartmentGrid,DepartmentIcons}.tsx`

**Interfaces:**
- Consumes: `services` (Task 8).
- Produces: no new exports — this task connects what exists.

- [ ] **Step 1: Point the home nav at the real page**

In `homeNavigation.ts`, change `{ label: "Services", href: "#services" }` to `href: "/services"`. Leave the other in-page anchors alone.

- [ ] **Step 2: Point the home footer at it**

In `HomeFooter.tsx`'s `careLinks`, change `Services` to `/services`.

- [ ] **Step 3: Link the bento cards**

In `ServicesBentoSection.tsx`, repoint each card's `href` from its `#anchor` to the matching `/services/<slug>`, and add a "View all 36 services →" link to `/services`. Derive the count from `services.length`, not a literal.

- [ ] **Step 4: Confirm the marketing nav is already correct**

Run: `grep -n 'services' src/config/navigation.ts`
Expected: `{ label: "Medical Services", href: "/services" }` — no change needed, and `footerQuickLinks` inherits it.

- [ ] **Step 5: Delete the superseded components**

```bash
git rm src/features/services/components/MainServicesGrid.tsx \
       src/features/services/components/DepartmentGrid.tsx \
       src/features/services/components/DepartmentIcons.tsx
```

- [ ] **Step 6: Prove nothing references them**

Run: `grep -rn 'MainServicesGrid\|DepartmentGrid\|DepartmentIcons' src`
Expected: no output.

- [ ] **Step 7: Build, lint, commit**

```bash
npm run lint && npm run build
git add -A
git commit -m "feat: link the services hub from nav, footer and home bento"
```

---

## Task 20: Full verification and content review handover

**Files:**
- Create: `docs/superpowers/plans/2026-08-20-services-content-review.md`

**Interfaces:**
- Consumes: everything.
- Produces: the review checklist the user needs to fact-check the copy.

- [ ] **Step 1: Run the whole gate**

```bash
npm test
npm run lint
npm run build
```
Expected: tests pass; lint clean; build lists `/services` plus 36 prerendered `/services/[slug]` routes.

- [ ] **Step 2: Assert the invariants the spec calls out**

```bash
grep -rn 'data-home\|home-root' src ; echo "expect no output"
grep -rn 'MainServicesGrid\|DepartmentGrid' src ; echo "expect no output"
```

- [ ] **Step 3: Confirm the route count mechanically**

Run: `npm run build 2>&1 | grep -c '/services/'`
Expected: 36 detail routes plus the index line — confirm the number rather than eyeballing.

- [ ] **Step 4: Click through in the browser**

Run `npm run dev -- -p 3100`. Check, in **both** themes:
- `/services`: every filter chip (counts 2/7/4/14/5/4 summing to 36), accordion open/close, a "Read more" link, all in-page anchors, mobile nav below 1120px, reveals and parallax.
- Three detail routes from different groups: picker highlighting, FAQ accordion, related links, back-link.
- `/services/not-a-real-service`: the themed not-found page.
- `/`: hero, bento hovers and new links, stagger reveals, theme toggle persistence, footer — **the home-page regression check** for Tasks 2–4.

- [ ] **Step 5: Write the content review checklist**

Create `docs/superpowers/plans/2026-08-20-services-content-review.md` listing all 36 services, marking which 11 were adapted from the reference and which 25 were written fresh, and — per service — every clinical claim a clinician should verify (scope, hours, turnaround, who is present, what the patient must do to prepare). Flag explicitly the entries the spec told us to keep narrow: `neurosurgery`, `fertility`, `haematology`, `nephrology` (no dialysis claimed), and `radiology` (CT/MRI by referral only).

- [ ] **Step 6: Commit**

```bash
git add docs/superpowers/plans/2026-08-20-services-content-review.md
git commit -m "docs: add services content review checklist"
```

---

## Self-Review

**Spec coverage.** Every spec section maps to a task: sources and content rules → Global Constraints + Task 5's `content.test.ts`; decisions → Tasks 2–4 (shell), 5–8 (catalog), 10/16 (routing); the 36-service catalog → Tasks 5–8, with per-group counts asserted in Task 8; data model → Task 1; routing → Tasks 10 and 16; shared shell → Tasks 2–4; index page's 13 sections → Tasks 10–15; detail page's 9 sections → Tasks 16–18; wiring → Task 19; assets → Task 10 Step 1; verification → Task 20. The spec's "out of scope" items appear in no task, as intended.

**Two spec deviations, both deliberate and recorded here.** The packages heading is reworded from the reference's "Priced up front" because nothing is priced; and directory/FAQ panels use a measured `scrollHeight` instead of the reference's fixed `700px`/`320px` caps, since several of our services carry more content than the reference's did and would otherwise clip.

**One risk the plan carries.** Task 8's aggregate imports its siblings extensionless for Next's benefit, while the tests import the aggregate with a `.ts` extension. If Node cannot resolve the aggregate's own value imports, Task 8 Step 4 documents the fallback (`allowImportingTsExtensions`) and requires re-verifying `npm run build` before adopting it. The single-group modules are unaffected, since they only use `import type`.

**Type consistency.** `Service`, `KeyValue`, `Step`, `TeamMember`, `Faq` are defined once in Task 1 and used unchanged throughout. Helper names are stable across tasks: `getService`, `serviceSlugs`, `services`, `servicesByGroup`, `groupCounts`, `relatedServices`. `GROUPS` (7, with "All") is distinct from `SERVICE_GROUPS` (6) everywhere. `ThemedShell` / `ThemedHeader` / `ThemedFooter` prop shapes are declared in Task 4 and consumed as declared in Tasks 10, 15, 16 and 18. The theme exports are `ThemeScript`, `SiteThemeProvider`, `useSiteTheme`, `ThemeToggleButton` — the old `HomeThemeScript` / `useHomeTheme` names appear only in Task 2's deletion steps.
