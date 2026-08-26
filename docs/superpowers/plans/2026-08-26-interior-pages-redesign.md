# Interior Pages Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the last five pages (`/about-us`, `/contact-us`, `/accommodation`, `/e-channeling`, `/privacy-policy`) off the retired `SiteHeader`/`SiteFooter`/`PageBanner` chrome and onto the current `ThemedShell` design system, then delete the old chrome.

**Architecture:** Each route moves from `src/app/(marketing)/<page>/` to `src/app/<page>/` with a `layout.tsx` wrapping `ThemedShell flowHeader` + `FloatingActions`. Each feature gains a `data/content.ts` (all strings, no JSX) plus a `content.test.ts` pinning the facts, and a `components/` set following the hero / jump cards / numbered sections rhythm of `src/features/school-wellness/`. Nav and footer link lists move into five new `src/config/*Navigation.ts` files registered in the existing `navigation.test.ts` guardrail.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4 (CSS-first, `@theme` in `src/app/globals.css`, no `tailwind.config.js`), `node --test` via `npm test`, Leaflet for the contact map, zod + nodemailer for the contact form.

**Spec:** `docs/superpowers/specs/2026-08-26-interior-pages-redesign-design.md`

## Global Constraints

- **No new hospital facts.** Every user-visible string must already exist in the repo. If the repo does not say it, it does not go on the page. No invented prices, turnarounds, capacities, or promises.
- **No `PLACEHOLDER_NOTICE` anywhere in this work.** Nothing here is unverified, so nothing needs quarantining.
- **No em dash, in any encoding.** Not the literal character (U+2014), not `&mdash;`, not `&#8212;`, not `&#x2014;`. Use a comma, colon, semicolon, parentheses, or a full stop. Grep for all four forms; the bare character alone misses entity-encoded ones.
- **Read the bundled Next.js docs before writing framework code.** `node_modules/next/dist/docs/`. Do not code Next.js 16 from memory: `params`/`searchParams` are Promises, middleware is `src/proxy.ts`, caching is the Cache Components model.
- **Server Components by default.** `'use client'` only for state, effects, event handlers, or browser APIs, at the smallest leaf, never high in the tree.
- **Import via the `@/*` alias** (to `src/*`). No `../../..` chains. Relative imports within a feature are fine and are the existing convention (`../data/content`).
- **Theme tokens only** (`var(--home-*)`), with one documented exception: content sitting directly on a hero photograph keeps literal colours (`#2CA6F0`, `#7FCBFF`, white, `#04122B`), because the light theme swaps `--home-accent` to a deep `#0B6FC0` that sinks into a dark image. Every built hero does this and says so in a comment.
- **URLs do not change.** `/about-us`, `/contact-us`, `/accommodation`, `/e-channeling`, `/privacy-policy`.
- **Do not modify `ThemedHeader.tsx` or `ThemedFooter.tsx`.** Their link lists change via config only.
- Component files `PascalCase.tsx`, hooks `useXxx.ts`, route folders `kebab-case`.
- Run `npm test` after every task. It must stay green. Baseline is 194 passing.

---

## File Structure

**New config (5 files):**

| File | Responsibility |
|---|---|
| `src/config/aboutNavigation.ts` | `aboutNavigation`, `aboutFooterColumns` |
| `src/config/contactNavigation.ts` | `contactNavigation`, `contactFooterColumns` |
| `src/config/accommodationNavigation.ts` | `accommodationNavigation`, `accommodationFooterColumns` |
| `src/config/channelingNavigation.ts` | `channelingNavigation`, `channelingFooterColumns` |
| `src/config/privacyNavigation.ts` | `privacyNavigation`, `privacyFooterColumns` |

**New routes (5 layouts + 5 pages), each `src/app/<slug>/{layout,page}.tsx`.**

**Per feature:** `data/content.ts` (strings only), `data/content.test.ts`, `components/<X>Hero.tsx`, `components/JumpCards.tsx`, `components/SectionHead.tsx`, one component per section, `components/<X>Page.tsx` composing them, `index.ts` exporting only the page component.

**Deleted at Task 7:** `src/app/(marketing)/`, `SiteHeader.tsx`, `SiteFooter.tsx`, `MobileNav.tsx`, `PageBanner.tsx`, `BackToTopButton.tsx`, and the `primaryNavigation`/`footerQuickLinks` exports in `navigation.ts`.

---

### Task 1: Navigation and footer config for all five pages

**Files:**
- Create: `src/config/aboutNavigation.ts`, `src/config/contactNavigation.ts`, `src/config/accommodationNavigation.ts`, `src/config/channelingNavigation.ts`, `src/config/privacyNavigation.ts`
- Modify: `src/config/navigation.test.ts` (register the five new navs, add the new assertions)
- Modify: `src/features/school-wellness/components/WellnessHero.tsx`, `src/features/career/components/CareersHero.tsx`, `src/features/health-tips/components/TipsHero.tsx`, `src/features/international-care/components/InternationalHero.tsx`, `src/features/media/components/MediaHero.tsx`, `src/features/network/components/NetworkHero.tsx` (repoint `bookHref`)
- Modify: `src/features/home/components/HomeFooter.tsx`, `src/config/careerNavigation.ts`, `src/config/facilitiesNavigation.ts`, `src/config/healthTipsNavigation.ts`, `src/config/internationalNavigation.ts`, `src/config/mediaNavigation.ts`, `src/config/networkNavigation.ts`, `src/config/pharmacyNavigation.ts`, `src/config/servicesNavigation.ts`, `src/config/wellnessNavigation.ts` (footer columns gain About / Contact / Accommodation)
- Test: `src/config/navigation.test.ts`

**Interfaces:**
- Consumes: `NavItem` from `@/config/navigation`, `FooterColumn` from `@/components/layout/ThemedFooter`.
- Produces: the five `<page>Navigation: NavItem[]` and `<page>FooterColumns: FooterColumn[]` exports consumed by Tasks 3 to 7.

The section anchors referenced below are created in later tasks. That is deliberate: the config is data, and `navigation.test.ts` validates its shape now, while the anchors land with their pages.

Anchor contract, so later tasks know what ids they must render:

| Page | Own nav item points at | Footer column anchors |
|---|---|---|
| `/about-us` | `#story` | `#story`, `#different`, `#mission`, `#group` |
| `/contact-us` | `#reach` | `#reach`, `#message`, `#map` |
| `/accommodation` | `#rooms` | `#rooms`, `#standard`, `#deluxe`, `#super-deluxe`, `#wards`, `#book` |
| `/e-channeling` | `#directory` | `#directory` |
| `/privacy-policy` | (no own item) | none, all absolute |

Note `/about-us`, `/contact-us`, `/accommodation`, `/e-channeling` and `/privacy-policy` are **not** among the nine header labels, so on those pages every header item is an absolute path to another page. The "own nav item" column above applies only where a label matches; for these five it does not, which is why the table's first column is a footer/breadcrumb target rather than a header one.

- [ ] **Step 1: Write the failing test**

Add to `src/config/navigation.test.ts`. Extend the import block and `ALL_NAVS`, then append these tests:

```ts
import { aboutNavigation, aboutFooterColumns } from "./aboutNavigation.ts";
import { contactNavigation, contactFooterColumns } from "./contactNavigation.ts";
import { accommodationNavigation, accommodationFooterColumns } from "./accommodationNavigation.ts";
import { channelingNavigation, channelingFooterColumns } from "./channelingNavigation.ts";
import { privacyNavigation, privacyFooterColumns } from "./privacyNavigation.ts";
```

Add all five to `ALL_NAVS`. Then:

```ts
const ALL_FOOTERS = [
  aboutFooterColumns,
  contactFooterColumns,
  accommodationFooterColumns,
  channelingFooterColumns,
  privacyFooterColumns,
];

// The three pages that were unreachable before this change. No footer column
// anywhere linked to them, so on the redesigned site the only way in was to
// type the URL. These assertions are the reason the wiring cannot regress.
//
// A page is exempt from linking to itself: /about-us does not need an "About
// us" entry in its own footer, and adding one would be a self-link. OWN records
// that exemption per page.
test("every footer reaches about, contact and accommodation", () => {
  const REQUIRED = ["/about-us", "/contact-us", "/accommodation"];
  const OWN = new Map([
    [aboutFooterColumns, "/about-us"],
    [contactFooterColumns, "/contact-us"],
    [accommodationFooterColumns, "/accommodation"],
  ]);
  for (const columns of ALL_FOOTERS) {
    const hrefs = columns.flatMap((c) => c.links.map((l) => l.href));
    for (const href of REQUIRED) {
      if (OWN.get(columns) === href) continue;
      assert.ok(hrefs.includes(href), `no ${href} in ${columns[0].heading}`);
    }
  }
});

test("footer links are either bare hashes or absolute paths", () => {
  for (const columns of ALL_FOOTERS) {
    for (const column of columns) {
      for (const link of column.links) {
        assert.ok(
          link.href.startsWith("#") || link.href.startsWith("/"),
          `${link.label} points at ${link.href}`
        );
      }
    }
  }
});

test("no footer column is empty and no heading repeats within a page", () => {
  for (const columns of ALL_FOOTERS) {
    const headings = columns.map((c) => c.heading);
    assert.equal(new Set(headings).size, headings.length, `duplicate heading in ${headings}`);
    for (const column of columns) {
      assert.ok(column.links.length > 0, `${column.heading} has no links`);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, cannot find module `./aboutNavigation.ts`.

- [ ] **Step 3: Create the five nav config files**

Each follows `src/config/wellnessNavigation.ts` exactly in shape: a `NavItem[]` with **the same nine labels in the same order as `homeNavigation`**, then a `FooterColumn[]`. Read `src/config/careerNavigation.ts` first for the comment style, which explains *why* the targets are what they are.

None of these five pages is one of the nine header labels, so every header item is an absolute path. `src/config/aboutNavigation.ts`:

```ts
import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page. About Us is not one of the nine, so unlike the
// facilities or careers navs there is no item to anchor into this page: every
// target here is the page it names. navigation.test.ts asserts the label
// equality, which is what caught three earlier navs drifting apart.
export const aboutNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/school-wellness" },
  { label: "Network", href: "/network" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
];

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const aboutFooterColumns: FooterColumn[] = [
  {
    heading: "About us",
    links: [
      { label: "Who we are", href: "#story" },
      { label: "What makes us different", href: "#different" },
      { label: "Mission and vision", href: "#mission" },
      { label: "Our parent group", href: "#group" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "All services", href: "/services" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Book a doctor", href: "/e-channeling" },
      { label: "Contact us", href: "/contact-us" },
    ],
  },
];
```

Build the other four the same way. Their own-page column headings and links:

- `contactNavigation.ts`, heading "Contact": Reach us `#reach`, Send a message `#message`, Find us `#map`. Second column "Hospital": Home `/`, About us `/about-us`, Accommodation `/accommodation`, Book a doctor `/e-channeling`, All services `/services`.
- `accommodationNavigation.ts`, heading "Rooms": Standard `#standard`, Deluxe `#deluxe`, Super deluxe `#super-deluxe`, Wards `#wards`, Book a room `#book`. Second column "Hospital": Home `/`, About us `/about-us`, Facilities `/facilities`, Book a doctor `/e-channeling`, Contact us `/contact-us`.
- `channelingNavigation.ts`, heading "Booking": Find a consultant `#directory`, All services `/services`, Accommodation `/accommodation`. Second column "Hospital": Home `/`, About us `/about-us`, Facilities `/facilities`, Contact us `/contact-us`.
- `privacyNavigation.ts`, heading "Legal": Privacy policy `/privacy-policy`. Second column "Hospital": Home `/`, About us `/about-us`, Accommodation `/accommodation`, Book a doctor `/e-channeling`, Contact us `/contact-us`.

Every one of these five footers must contain `/about-us`, `/contact-us` and `/accommodation`, except that a page is exempt from linking to itself. The `OWN` map in the Step 1 test already encodes that exemption, so no footer needs a self-link.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS, 194 plus the new tests.

- [ ] **Step 5: Add the three pages to the nine existing footers**

The same `ALL_FOOTERS` assertion has to hold for the pages already built. Extend `ALL_FOOTERS` to include `careerFooterColumns`, `facilitiesFooterColumns`, `healthTipsFooterColumns`, `internationalFooterColumns`, `mediaFooterColumns`, `networkFooterColumns`, `pharmacyFooterColumns`, `servicesFooterColumns`, `wellnessFooterColumns`, and the home footer's two arrays from `src/features/home/components/HomeFooter.tsx`.

`HomeFooter.tsx` declares `careLinks` and `hospitalLinks` inline. Export them so the test can import them, or move them to `src/config/homeNavigation.ts` beside `homeNavigation`. **Move them**, so every footer's data lives in `src/config/` and the test has one place to look. Add to `src/config/homeNavigation.ts`:

```ts
import type { FooterColumn } from "@/components/layout/ThemedFooter";

export const homeFooterColumns: FooterColumn[] = [
  {
    heading: "Care",
    links: [
      { label: "Services", href: "/services" },
      { label: "Surgical care", href: "#surgical" },
      { label: "Pharmacy", href: "/pharmacy" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Book a doctor", href: "/e-channeling" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Facilities", href: "/facilities" },
      { label: "International patient care", href: "/international-care" },
      { label: "Health tips", href: "/health-tips" },
      { label: "School wellness", href: "/school-wellness" },
      { label: "Network", href: "/network" },
      { label: "Media", href: "#media" },
      { label: "Careers", href: "/careers" },
      { label: "Contact us", href: "/contact-us" },
    ],
  },
];
```

Note the home "Accommodation" link changes from `#rooms` to `/accommodation`: the home page's `#rooms` band is a teaser, and `/accommodation` is now the real destination, matching how Facilities, Pharmacy, Health Tips, Network and Careers were each repointed when their pages landed.

Then reduce `HomeFooter.tsx` to:

```tsx
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { homeFooterColumns } from "@/config/homeNavigation";

export function HomeFooter() {
  return <ThemedFooter columns={homeFooterColumns} />;
}
```

Add About / Contact / Accommodation entries to the other nine footer configs' second column. Run `npm test` and expect PASS.

- [ ] **Step 6: Repoint `bookHref` to `/e-channeling`**

Six hero files pass an on-page anchor. Change each to `bookHref="/e-channeling"`:

| File | From |
|---|---|
| `src/features/career/components/CareersHero.tsx` | `bookHref="#form"` |
| `src/features/health-tips/components/TipsHero.tsx` | `bookHref="#book"` |
| `src/features/international-care/components/InternationalHero.tsx` | `bookHref="#enquiry"` |
| `src/features/media/components/MediaHero.tsx` | `bookHref="#press"` |
| `src/features/network/components/NetworkHero.tsx` | `bookHref="#contact"` |
| `src/features/school-wellness/components/WellnessHero.tsx` | `bookHref="#book"` |

Also grep for `ThemedHeader` in `src/features/facilities`, `src/features/pharmacy`, `src/features/services` and `src/features/home` and repoint any there too. Then change the default in `ThemedHeader.tsx` and `MobileNavPanel.tsx` from `"#book"` to `"/e-channeling"`, so a hero that forgets to pass it still lands somewhere real. **This is the one permitted edit to `ThemedHeader.tsx`: a default value, not markup.**

Add a test at `src/config/navigation.test.ts`:

```ts
// The header's "Book now" button has to mean the same thing on every page.
// It used to be a per-page anchor (#form, #enquiry, #press, #contact), so the
// same button scrolled somewhere different depending on where you clicked it.
test("no hero passes an in-page bookHref", () => {
  const heroes = globSync("src/features/**/*Hero.tsx");
  assert.ok(heroes.length >= 6, `only found ${heroes.length} heroes`);
  for (const file of heroes) {
    const src = readFileSync(file, "utf8");
    const match = src.match(/bookHref=\{?"([^"]+)"/);
    if (!match) continue;
    assert.ok(!match[1].startsWith("#"), `${file} passes bookHref="${match[1]}"`);
  }
});
```

Import `globSync` from `node:fs` and `readFileSync` from `node:fs` at the top of the test file.

- [ ] **Step 7: Run the full suite**

Run: `npm test`
Expected: PASS, all green.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/config src/features/home/components/HomeFooter.tsx src/features/*/components/*Hero.tsx src/components/layout/ThemedHeader.tsx src/components/layout/MobileNavPanel.tsx
git commit -m "feat(nav): config for the five interior pages, and one meaning for Book now"
```

---

### Task 2: Retire the `linkMismatch` flag from the doctor directory

**Files:**
- Modify: `src/features/e-channeling/data/doctors.ts`
- Create: `src/features/e-channeling/data/doctors.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `doctors: Doctor[]` with `Doctor = { name: string; specialization: string; calendlySlug: string }`. Task 6 renders it. The `linkMismatch` property no longer exists, so nothing may reference it.

Background: the 2026-08-04 spec inferred from slug text that ~35 rows pointed at the wrong doctor and flagged 26 of them. Verified 2026-08-26 by fetching the `og:title` of all 71 Calendly pages: every one names the consultant the repo assigns it to. The slugs are stale leftovers from Calendly's clone feature. The flag is a false alarm on every row.

- [ ] **Step 1: Write the failing test**

Create `src/features/e-channeling/data/doctors.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { CALENDLY_BASE, doctors } from "./doctors.ts";

const source = readFileSync(fileURLToPath(new URL("./doctors.ts", import.meta.url)), "utf8");

test("71 consultants across 28 specialities", () => {
  assert.equal(doctors.length, 71);
  assert.equal(new Set(doctors.map((d) => d.specialization)).size, 28);
});

// Every one of these was verified against the live Calendly og:title on
// 2026-08-26: all 71 resolve to the consultant named in the row. The slugs are
// stale clone artifacts, not a booking bug, so the old linkMismatch flag and
// the docstring calling it "a pre-existing data-quality bug" are both gone.
// This test fails if either comes back.
test("no row carries a linkMismatch flag", () => {
  assert.ok(!source.includes("linkMismatch"), "linkMismatch is back in doctors.ts");
  for (const doctor of doctors) {
    assert.ok(!("linkMismatch" in doctor), `${doctor.name} still carries the flag`);
  }
});

test("every doctor has a non-empty name, speciality and slug", () => {
  for (const doctor of doctors) {
    assert.ok(doctor.name.trim().length > 0);
    assert.ok(doctor.specialization.trim().length > 0);
    assert.ok(doctor.calendlySlug.trim().length > 0);
    assert.ok(!doctor.calendlySlug.startsWith("/"), `${doctor.name} slug is absolute`);
    assert.ok(!doctor.calendlySlug.includes(" "), `${doctor.name} slug has a space`);
  }
});

test("slugs are unique, so no two consultants share a calendar", () => {
  const slugs = doctors.map((d) => d.calendlySlug);
  assert.equal(new Set(slugs).size, slugs.length);
});

test("the Calendly base is the hospital's own account", () => {
  assert.equal(CALENDLY_BASE, "https://calendly.com/appointments-sjhospital/");
});

test("no em dash in any consultant name or speciality", () => {
  for (const value of doctors.flatMap((d) => [d.name, d.specialization])) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL on "no row carries a linkMismatch flag".

- [ ] **Step 3: Strip the flag**

In `src/features/e-channeling/data/doctors.ts`, delete the `linkMismatch?: boolean` member and its whole docstring from the `Doctor` type, then delete all 26 `, linkMismatch: true` occurrences. Replace the type's docstring with:

```ts
/**
 * A consultant and the Calendly event that books them.
 *
 * `calendlySlug` is appended to CALENDLY_BASE. Many slugs name a different
 * doctor than the row does, which looks alarming and was once recorded here as
 * a data-quality bug worth reproducing. It is not a bug: Calendly's "clone"
 * feature keeps the source event's URL slug while the copy gets renamed, and a
 * slug is not required to match its event title. Checked on 2026-08-26 by
 * fetching the og:title of all 71 booking pages, and all 71 resolve to the
 * consultant named here. `doctors.test.ts` fails if the old flag returns.
 */
```

Use a single `sed` over the file for the 26 removals, then read the diff to confirm nothing else changed.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/features/e-channeling/data
git commit -m "fix(e-channeling): the Calendly links were never wrong, so drop linkMismatch"
```

---

### Task 3: Rebuild `/about-us`

**Files:**
- Create: `src/app/about-us/layout.tsx`, `src/app/about-us/page.tsx`
- Create: `src/features/about/data/content.ts`, `src/features/about/data/content.test.ts`
- Create: `src/features/about/components/AboutHero.tsx`, `JumpCards.tsx`, `SectionHead.tsx`, `StorySection.tsx`, `DifferentSection.tsx`, `MissionSection.tsx`, `GroupSection.tsx`, `AboutPage.tsx`
- Modify: `src/features/about/index.tsx` (becomes `index.ts`, exporting `AboutPage` only)
- Delete: `src/features/about/components/Intro.tsx`, `WhyDifferent.tsx`, `MissionVision.tsx`, `ParentGroup.tsx`
- Delete: `src/app/(marketing)/about-us/`
- Test: `src/features/about/data/content.test.ts`

**Interfaces:**
- Consumes: `aboutNavigation`, `aboutFooterColumns` (Task 1); `ThemedShell`, `FloatingActions`, `ThemedHeader`, `ThemedFooter`; `Reveal`, `RevealStagger`, `Ticker`, `ParallaxLayer`.
- Produces: `AboutPage` from `@/features/about`. Renders ids `#top`, `#jump`, `#story`, `#different`, `#mission`, `#group`.

All copy is lifted verbatim from the four components being deleted. Nothing new is written. Read them before starting: `Intro.tsx` has the four paragraphs, `WhyDifferent.tsx` the six reasons, `MissionVision.tsx` the mission and vision, `ParentGroup.tsx` the Kids & Teens paragraphs and the five partner logo paths.

- [ ] **Step 1: Write the failing test**

Create `src/features/about/data/content.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  groupBody,
  heroFacts,
  jumpCards,
  mission,
  partnerLogos,
  reasons,
  storyParagraphs,
  tickerItems,
  vision,
} from "./content.ts";

const allCopy = [
  ...tickerItems,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  ...storyParagraphs,
  ...reasons.flatMap((r) => [r.title, r.description]),
  mission.title,
  mission.body,
  vision.title,
  vision.body,
  ...groupBody,
];

test("four story paragraphs, six reasons, four hero facts, four jump cards", () => {
  assert.equal(storyParagraphs.length, 4);
  assert.equal(reasons.length, 6);
  assert.equal(heroFacts.length, 4);
  assert.equal(jumpCards.length, 4);
  assert.equal(partnerLogos.length, 5);
});

// The facts the live site actually publishes. Each one is repeated on the page
// and in the hero strip, so a drift in one place is a contradiction on screen.
//
// One phrase per source paragraph, so "copy it verbatim" is enforced rather
// than trusted. The four paragraphs come from the deleted Intro.tsx in this
// order, and this test fails if one is reworded, merged, or dropped.
test("the four story paragraphs survive verbatim, in order", () => {
  assert.match(storyParagraphs[0], /USD 1 million investment led by Kids & Teens Pediatric Medical Group \(Los Angeles\) and Asia Corp/);
  assert.match(storyParagraphs[1], /first hospital in Negombo to offer corporate insurance acceptance at our OPD/);
  assert.match(storyParagraphs[2], /digital X-ray machine at the hospital is one of the latest in the industry/);
  assert.match(storyParagraphs[3], /digital file access for our patients/);
});

// Same enforcement for the six differentiators, which are the page's spine.
test("the six reasons keep their live-site titles, in order", () => {
  assert.deepEqual(
    reasons.map((r) => r.title),
    [
      "Managed and Operated by USA",
      "Affordable US Healthcare Standards",
      "Advanced Technology",
      "Commitment to Safety and Hygiene",
      "Convenient Location and Comprehensive Services",
      "Evidence Based Billing",
    ]
  );
});

test("the mission and vision are the hospital's own wording", () => {
  assert.match(mission.body, /complete healthcare solutions that combine\s+advanced technology with patient-centered care/);
  assert.match(vision.body, /highest quality healthcare available to everyone in Sri Lanka/);
});

test("the parent group copy keeps the roster figure and the expansion paragraph", () => {
  assert.equal(groupBody.length, 2);
  assert.match(groupBody[0], /over 50 board-certified\s+pediatricians/);
  assert.match(groupBody[1], /extending their expertise beyond the United States/);
});

test("every jump card anchors to a section this page renders", () => {
  const ids = ["#story", "#different", "#mission", "#group"];
    for (const card of jumpCards) {
    assert.ok(ids.includes(card.href), `${card.label} points at ${card.href}`);
  }
  assert.equal(new Set(jumpCards.map((c) => c.href)).size, 4);
});

test("no invented figure: the only money and count claims are the refurbishment and the pediatrician roster", () => {
  const numbers = allCopy.join(" ").match(/\b\d[\d,.]*\b/g) ?? [];
  const allowed = new Set(["1", "50", "24", "7"]);
  for (const n of numbers) {
    assert.ok(allowed.has(n), `unexpected figure ${n} in about copy`);
  }
});

test("no em dash in any encoding", () => {
  for (const value of allCopy) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, cannot find `./content.ts`.

- [ ] **Step 3: Write `data/content.ts`**

Strings only, no JSX. Shape:

```ts
export const tickerItems = [
  "US standard care",
  "Managed from Los Angeles",
  "Corporate insurance at OPD",
  "Digital X-ray",
  "Modern laboratory",
  "Digital file access",
  "Open 24/7",
] as const;

export const heroFacts = [
  { k: "Refurbishment", v: "USD 1 million" },
  { k: "Managed from", v: "Los Angeles" },
  { k: "First in Negombo", v: "OPD insurance" },
  { k: "Reception", v: "Open 24/7" },
];

export const jumpCards = [
  { count: "01", label: "Who we are", note: "US standard care, brought to Negombo.", href: "#story" },
  { count: "02", label: "What makes us different", note: "Six things we hold ourselves to.", href: "#different" },
  { count: "03", label: "Mission and vision", note: "What we are aiming at.", href: "#mission" },
  { count: "04", label: "Our parent group", note: "Kids & Teens Medical Group, USA.", href: "#group" },
];

// Each of the five below is a copy-paste out of the component being deleted.
// Open the named file, take the string, paste it. Do not retype it, do not
// reword it, do not fix its capitalisation: the tests above pin a phrase from
// every one and will fail on a paraphrase.
export const storyParagraphs: string[] = []; //  <- the 4 strings in Intro.tsx's `paragraphs`
export const reasons: { title: string; description: string }[] = []; // <- WhyDifferent.tsx's `reasons`
export const mission = { title: "Our mission", body: "" }; // <- MissionVision.tsx's mission <p>
export const vision = { title: "Our vision", body: "" }; //  <- MissionVision.tsx's vision <p>
export const groupHeading = "About Kids & Teens Medical Group";
export const groupBody: string[] = []; // <- ParentGroup.tsx's two <p> blocks, in order
export const partnerLogos: string[] = []; // <- ParentGroup.tsx's `partnerLogos`, all 5 paths
```

`ParentGroup.tsx` writes its copy as JSX, so it contains `&amp;` and `&apos;` entities and hard line breaks. In a `.ts` string those become a literal `&` and `'`, and the line breaks collapse to single spaces. Convert them; do not carry the entities across.

The ticker items, hero facts and jump card notes are the only new strings on this page. Each restates a claim already present in `storyParagraphs` or `reasons`, so none is a new fact. Keep it that way.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Build the hero**

Create `src/features/about/components/AboutHero.tsx`, modelled on `src/features/school-wellness/components/WellnessHero.tsx`. Read that file first and mirror its structure: `id="top"`, `min-h-[84vh] max-[899px]:min-h-[76vh]`, a `ParallaxLayer factor={0.14} maxOffsetPx={100}` holding a `fill` `Image` with `priority` and `animate-sj-burns`, two absolutely positioned gradient overlays, `<ThemedHeader navItems={aboutNavigation} homeHref="/" bookHref="/e-channeling" />`, the vertical strapline, the breadcrumb, the `h1`, the standfirst, two buttons, the `heroFacts` strip, and `<Ticker items={tickerItems} />`.

Photograph: `/images/about-facility.jpg`, alt "The St. Joseph Hospital building in Negombo". Keep the literal hero colours and copy the comment from `WellnessHero` explaining why they are not tokens.

The `h1` is the page's only one. Use the existing subtitle as its basis: "US standard, high-quality healthcare, brought to Negombo." Set it as three lines with the middle word outlined via `WebkitTextStroke`, following `WellnessHero`'s treatment.

- [ ] **Step 6: Build jump cards and section head**

`JumpCards.tsx` and `SectionHead.tsx` are near-copies of `src/features/school-wellness/components/JumpCards.tsx` and `SectionHead.tsx`, reading `jumpCards` from `../data/content`. Copy them and change only the import.

- [ ] **Step 7: Build the four sections**

- `StorySection.tsx`, `id="story"`, eyebrow `01 / Who we are`: `storyParagraphs` in a prose column beside a `Reveal`-wrapped `about-facility.jpg`.
- `DifferentSection.tsx`, `id="different"`, eyebrow `02 / Why here`: the six `reasons` as a `RevealStagger` grid, `grid-cols-3 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1`, each cell `sj-fill bg-[var(--home-bg)] px-6 py-6.5` with a numbered eyebrow, title and description. This is the hairline-through-a-1px-grid-gap idiom from `JumpCards`, so there are no double borders.
- `MissionSection.tsx`, `id="mission"`, eyebrow `03 / What we aim at`: mission and vision side by side, two columns at `min-[900px]`, one below.
- `GroupSection.tsx`, `id="group"`, eyebrow `04 / Our parent group`: `groupHeading`, `groupBody`, the Kids & Teens logo, and the partner marquee. Carry over `animate-marquee` and the `mask-[linear-gradient(...)]` edge fade from `ParentGroup.tsx`, and keep `hover:[animation-play-state:paused]`.

All colours are `var(--home-*)`. No `bg-white`, no `text-ink`, no `bg-surface`: those are old-design tokens and they do not respond to the theme.

- [ ] **Step 8: Compose the page, route and layout**

`AboutPage.tsx`:

```tsx
export function AboutPage() {
  return (
    <>
      <main>
        <AboutHero />
        <JumpCards />
        <StorySection />
        <DifferentSection />
        <MissionSection />
        <GroupSection />
      </main>
      <ThemedFooter columns={aboutFooterColumns} id="footer" />
    </>
  );
}
```

`src/app/about-us/layout.tsx` is the `/careers` layout verbatim, with the class name changed. `src/app/about-us/page.tsx` carries the `Metadata` export copied from `src/app/(marketing)/about-us/page.tsx` and renders `<AboutPage />`. Replace `src/features/about/index.tsx` with `index.ts` exporting only `AboutPage`. Delete the four old components and `src/app/(marketing)/about-us/`.

- [ ] **Step 9: Verify**

Run: `npm test` (PASS), `npm run lint` (clean), `npx tsc --noEmit` (clean).

Then `npm run dev` and check `http://localhost:3000/about-us` in both themes and at 375px, 900px and 1440px: one `h1`, the four anchors scroll correctly, the marquee runs, no horizontal body scroll, the theme toggle flips every surface.

- [ ] **Step 10: Commit**

```bash
git add src/app/about-us src/features/about
git rm -r "src/app/(marketing)/about-us"
git commit -m "feat(about): rebuild /about-us on the themed shell"
```

---

### Task 4: Rebuild `/contact-us`

**Files:**
- Create: `src/app/contact-us/layout.tsx`, `src/app/contact-us/page.tsx`
- Create: `src/features/contact/data/content.ts`, `src/features/contact/data/content.test.ts`
- Create: `src/features/contact/components/ContactHero.tsx`, `JumpCards.tsx`, `SectionHead.tsx`, `ReachSection.tsx`, `MessageSection.tsx`, `MapSection.tsx` (rewrite), `ContactPage.tsx`
- Modify: `src/features/contact/components/ContactForm.tsx`, `LocationMap.tsx`, `src/features/contact/index.ts`, `src/app/globals.css`
- Delete: `src/features/contact/components/ContactPageContent.tsx`, `ContactDetailsPanel.tsx`, `ContactFormPanel.tsx`, `ContactInfo.tsx`
- Delete: `src/app/(marketing)/contact-us/`
- Test: `src/features/contact/data/content.test.ts`

**Interfaces:**
- Consumes: `contactNavigation`, `contactFooterColumns` (Task 1).
- Produces: `ContactPage` and `ContactForm` from `@/features/contact`. `ContactForm` must stay exported: Task 5 reuses it on `/accommodation`. Renders ids `#top`, `#jump`, `#reach`, `#message`, `#map`.

**Do not touch** `actions/sendContactMessage.ts`, `schemas.ts`, `types.ts`, or `lib/mailer.ts`. The server path is presentation-agnostic.

`ContactFormPanel.tsx` and `ContactForm.tsx` are two near-duplicate forms (the panel is the richer one, with field errors and the emergency note). Consolidate into one `ContactForm.tsx` carrying the panel's behaviour, since Task 5 needs the same form.

- [ ] **Step 1: Write the failing test**

Create `src/features/contact/data/content.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { HOSPITAL_COORDS, contactRows, heroFacts, jumpCards, tickerItems } from "./content.ts";

test("four contact rows: location, phone, WhatsApp, email", () => {
  assert.equal(contactRows.length, 4);
  assert.deepEqual(
    contactRows.map((r) => r.label),
    ["Location", "Call us", "WhatsApp / Mobile", "Email"]
  );
});

// These five strings appear on this page, in ThemedFooter, and in the
// FloatingActions rail. If one drifts the site contradicts itself, so they are
// pinned rather than reviewed.
test("the hospital's real contact details, unchanged", () => {
  const byLabel = new Map(contactRows.map((r) => [r.label, r]));
  assert.equal(byLabel.get("Location").value, "229/10 St. Joseph Street");
  assert.equal(byLabel.get("Location").sub, "Negombo, Sri Lanka");
  assert.equal(byLabel.get("Call us").value, "0117 84 84 84");
  assert.equal(byLabel.get("Call us").href, "tel:+94117848484");
  assert.equal(byLabel.get("WhatsApp / Mobile").value, "074 222 333 4");
  assert.equal(byLabel.get("Email").value, "info@sjhospital.lk");
  assert.equal(byLabel.get("Email").href, "mailto:info@sjhospital.lk");
});

test("the map sits on the hospital, not a rounded guess", () => {
  assert.deepEqual(HOSPITAL_COORDS, [7.206699127328975, 79.8453343846586]);
});

test("no phone number other than the hospital's own appears anywhere", () => {
  const copy = [
    ...tickerItems,
    ...heroFacts.flatMap((f) => [f.k, f.v]),
    ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
    ...contactRows.flatMap((r) => [r.label, r.value, r.sub]),
  ].join(" ");
  const digits = copy.match(/\d[\d\s]{6,}/g) ?? [];
  for (const run of digits) {
    const bare = run.replace(/\s/g, "");
    assert.ok(
      ["117848484", "0117848484", "0742223334", "7422233 4".replace(/\s/g, "")].includes(bare),
      `unexpected number ${run}`
    );
  }
});

test("no em dash in any encoding", () => {
  const copy = [
    ...tickerItems,
    ...jumpCards.flatMap((c) => [c.label, c.note]),
    ...contactRows.flatMap((r) => [r.label, r.value, r.sub]),
  ];
  for (const value of copy) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, cannot find `./content.ts`.

- [ ] **Step 3: Write `data/content.ts`**

Move `HOSPITAL_COORDS` here from `LocationMap.tsx` and re-import it there, so the coordinate has one home and the test can reach it. `contactRows` carries `{ label, value, sub, href, external? }`, lifted verbatim from `ContactDetailsPanel.tsx`'s `CONTACT_ROWS` minus the `icon` field (icons are JSX and stay in the component, keyed by label). Also export `DIRECTIONS_URL` from `ContactDetailsPanel.tsx`.

`heroFacts`: Reception "Open 24/7"; Reply "Within one business day"; Fastest "WhatsApp"; Where "Negombo". Every one already stated in the old page.

`jumpCards`: Reach us `#reach`, Send a message `#message`, Find us `#map`, Book a doctor `/e-channeling`. Note the fourth leaves the page, which is a deliberate departure from the other pages' four-in-page cards, because booking is the commonest reason someone lands on contact.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Theme the map**

Two changes in `LocationMap.tsx`:

Marker colour. Replace the hardcoded `fill="#4A2A82"` (the retired purple wordmark) and `stroke="#33B4E5"` in the `divIcon` SVG. The SVG is a template string, not JSX, so it cannot read a token directly. Read the computed token at mount and interpolate:

```ts
const root = document.getElementById("sj-root");
const styles = root ? getComputedStyle(root) : null;
const accent = styles?.getPropertyValue("--home-accent").trim() || "#2ca6f0";
const onAccent = styles?.getPropertyValue("--home-on-accent").trim() || "#04122b";
```

Then use `${accent}` for the pin body and `${onAccent}` for the inner circle. Do the same for the popup's link colour.

Tile filter. Add to `src/app/globals.css`, beside the other `[data-sj]` rules:

```css
/* OpenStreetMap ships light tiles only, so on the dark theme the map is a
   glaring white block on an otherwise dark page. Inverting and rotating the hue
   back gives a dark map from the same tiles: no second tile host, no extra
   attribution. Applied to the tile pane alone, so the marker and popup keep
   their real colours. */
[data-sj][data-theme="dark"] .leaflet-tile-pane {
  filter: invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9);
}
```

`LocationMap` is already a `'use client'` leaf loaded through `LocationMapLazy`, so nothing about the boundary changes.

- [ ] **Step 6: Build the page**

`ContactHero.tsx` follows `AboutHero` from Task 3. Photograph `/images/welcome.jpg`, alt "The reception desk at St. Joseph Hospital Negombo". `h1` from the old banner title, "Get in touch".

`ReachSection.tsx`, `id="reach"`, eyebrow `01 / Reach us`: the four `contactRows` as a `RevealStagger` hairline grid, each row an `<a>` with its icon from `@/components/ui/Icons`, keyed by label. Keep `target="_blank" rel="noopener noreferrer"` on the external directions row. Add the 24/7 strip as a full-width accent band below.

`MessageSection.tsx`, `id="message"`, eyebrow `02 / Send a message`: heading, standfirst, and `<ContactForm />`.

Retokenize `ContactForm.tsx` from the consolidated panel: inputs get `border-[var(--home-hairline)] bg-[var(--home-surface)] text-[var(--home-body)]`, focus ring on `var(--home-accent)`, submit button `bg-[var(--home-accent)] text-[var(--home-on-accent)]`. Keep every `name` attribute, `required`, `state.fieldErrors` branch, the `pending` label swap, the `role="status" aria-live="polite"` block, and the emergency note. Use `var(--home-danger)` for errors, which is exactly what that token exists for.

`MapSection.tsx`, `id="map"`, eyebrow `03 / Find us`: `SectionHead` plus the lazy map in a `border border-[var(--home-hairline)]` frame.

`ContactPage.tsx` composes hero, jump cards, the three sections, then `<ThemedFooter columns={contactFooterColumns} id="footer" />`. Route and layout as Task 3. `index.ts` exports `ContactPage` and `ContactForm`.

- [ ] **Step 7: Verify, including the form's three states**

Run: `npm test`, `npm run lint`, `npx tsc --noEmit`. All clean.

`npm run dev`, then at `/contact-us`:
- Submit empty. Native `required` blocks it.
- Submit with an invalid email. The zod `fieldErrors` branch renders in `var(--home-danger)` and is legible in both themes.
- Submit valid. Without SMTP env vars set this takes the error path; confirm the `role="status"` block renders and is legible in both themes. The success path shares that block, so this exercises both.
- The map renders dark on the dark theme and light on the light theme, and the marker sits on the hospital.

- [ ] **Step 8: Commit**

```bash
git add src/app/contact-us src/features/contact src/app/globals.css
git rm -r "src/app/(marketing)/contact-us"
git commit -m "feat(contact): rebuild /contact-us, and give the map a dark theme"
```

---

### Task 5: Rebuild `/accommodation`

**Files:**
- Create: `src/app/accommodation/layout.tsx`, `src/app/accommodation/page.tsx`
- Create: `src/features/accommodation/data/content.ts`, `src/features/accommodation/data/content.test.ts`
- Create: `src/features/accommodation/components/RoomsHero.tsx`, `JumpCards.tsx`, `SectionHead.tsx`, `RoomsSection.tsx`, `SpecialtiesSection.tsx`, `BookSection.tsx`, `AccommodationPage.tsx`
- Modify: `src/features/accommodation/components/RoomTypeNav.tsx` (retokenize), `src/features/accommodation/index.tsx` (becomes `index.ts`)
- Delete: `src/features/accommodation/components/RoomTypes.tsx`, `SpecialtiesChecklist.tsx`
- Delete: `src/app/(marketing)/accommodation/`
- Test: `src/features/accommodation/data/content.test.ts`

**Interfaces:**
- Consumes: `accommodationNavigation`, `accommodationFooterColumns` (Task 1); `ContactForm` from `@/features/contact` (Task 4).
- Produces: `AccommodationPage` from `@/features/accommodation`. Renders ids `#top`, `#jump`, `#rooms`, `#standard`, `#deluxe`, `#super-deluxe`, `#wards`, `#specialties`, `#book`.

Price discipline: `src/features/facilities/data/content.ts` is the authority. Standard is "From 10,000 LKR"; deluxe, super deluxe and wards are "On request". Invent nothing for the other three.

- [ ] **Step 1: Write the failing test**

Create `src/features/accommodation/data/content.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { heroFacts, jumpCards, mealsNote, roomTypes, specialties, tickerItems } from "./content.ts";

test("four room types in the site's own order, with their ids", () => {
  assert.deepEqual(
    roomTypes.map((r) => r.id),
    ["standard", "deluxe", "super-deluxe", "wards"]
  );
});

test("every room type has photos, amenities and a price", () => {
  for (const room of roomTypes) {
    assert.ok(room.amenities.length >= 6, `${room.id} has ${room.amenities.length} amenities`);
    assert.equal(room.photos.length, 2);
    assert.ok(room.description.trim().length > 0);
    assert.ok(room.price.trim().length > 0);
  }
});

// The repo publishes exactly one room price. The other three categories are
// quoted on request, and inventing numbers for them would be inventing a price
// list. features/facilities/data/content.ts is the authority for this.
test("only the standard room carries a figure; the rest are on request", () => {
  const byId = new Map(roomTypes.map((r) => [r.id, r]));
  assert.equal(byId.get("standard").price, "From 10,000 LKR");
  for (const id of ["deluxe", "super-deluxe", "wards"]) {
    assert.equal(byId.get(id).price, "On request");
  }
});

test("no price figure appears anywhere except the standard room's", () => {
  const copy = [
    ...tickerItems,
    mealsNote,
    ...specialties,
    ...heroFacts.flatMap((f) => [f.k, f.v]),
    ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
    ...roomTypes.flatMap((r) => [r.name, r.description, ...r.amenities]),
  ].join(" ");
  assert.equal((copy.match(/LKR|Rs\.?\s*\d/g) ?? []).length, 0, "a price leaked into the copy");
});

test("ten inpatient specialties", () => {
  assert.equal(specialties.length, 10);
});

test("every jump card anchors to a room section this page renders", () => {
  assert.deepEqual(
    jumpCards.map((c) => c.href),
    ["#standard", "#deluxe", "#super-deluxe", "#wards"]
  );
});

test("no em dash in any encoding", () => {
  const copy = [
    ...tickerItems,
    mealsNote,
    ...specialties,
    ...jumpCards.flatMap((c) => [c.label, c.note]),
    ...roomTypes.flatMap((r) => [r.name, r.description, ...r.amenities]),
  ];
  for (const value of copy) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, cannot find `./content.ts`.

- [ ] **Step 3: Write `data/content.ts`**

Move the `RoomType` type and the four-entry `roomTypes` array out of `RoomTypes.tsx` verbatim, adding a `price` field per the table above. Move `specialties` out of `SpecialtiesChecklist.tsx` verbatim. `mealsNote` is the existing meals sentence from `RoomTypes.tsx`'s section header, verbatim.

`heroFacts`: Room types "Four"; Standard from "10,000 LKR"; Meals "Three daily"; Nursing "24/7". The first three are repo-backed; the fourth restates the existing "24/7 Medical Assistance" specialty.

`jumpCards`: the four room types, `count` "01" to "04", `href` `#standard` to `#wards`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Retokenize the sticky room nav**

`RoomTypeNav.tsx` keeps all its behaviour: the `ResizeObserver` measuring the header, the `IntersectionObserver` picking the topmost visible section, the `rootMargin` of `-${headerHeight + 76}px 0px -55% 0px`, the horizontal overflow scroll. Only the classes change:

- container: `sticky z-30 border-b border-[var(--home-hairline)] bg-[var(--home-bg)]/95 backdrop-blur-md`
- active pill: `bg-[var(--home-accent)] text-[var(--home-on-accent)]`
- inactive pill: `text-[var(--home-muted)] hover:text-[var(--home-heading)]`

Read the file's existing comments and keep them. The room ids it observes must match `roomTypes[].id`, so import the labels from `../data/content` instead of redeclaring them, and delete its local `rooms` array.

- [ ] **Step 6: Build the page**

`RoomsHero.tsx` follows `AboutHero`. Photograph `/images/rooms/super-deluxe-1.jpg`, alt "A private inpatient room at St. Joseph Hospital Negombo". `h1` based on the old banner: "US standard comfort, by the night".

`RoomsSection.tsx`, `id="rooms"`, eyebrow `01 / Our rooms`: `RoomTypeNav`, then the four rooms. Each room keeps the alternating layout from `RoomTypes.tsx`: copy on one side, a large photo with an inset second photo on the other, sides swapping on odd indices, and the two-up photo grid below 1024px. Each room's wrapper carries `id={room.id}` and `scroll-mt-[200px]`, because the sticky nav overlays the top of the section. Amenity chips become `border border-[var(--home-hairline)] bg-[var(--home-surface)] text-[var(--home-body)]`; the check icon's `stroke` becomes `currentColor` on a `text-[var(--home-accent)]` wrapper. Price renders as a `font-display` line beside the room name.

`SpecialtiesSection.tsx`, `id="specialties"`, eyebrow `02 / What every room includes`: the ten `specialties` as a `RevealStagger` hairline grid.

`BookSection.tsx`, `id="book"`, eyebrow `03 / Book a room`: `<ContactForm />` beside a contact rail carrying the phone, WhatsApp and email from `@/features/contact`'s content, plus a link to `/e-channeling`.

`AccommodationPage.tsx` composes them, then `<ThemedFooter columns={accommodationFooterColumns} id="footer" />`. Route and layout as Task 3.

- [ ] **Step 7: Verify**

Run: `npm test`, `npm run lint`, `npx tsc --noEmit`. All clean.

`npm run dev`, then at `/accommodation`:
- The sticky nav sits directly under the header and does not overlap it at 375px, 900px and 1440px.
- Clicking each of the four pills scrolls to the right room with the heading clear of the sticky nav.
- The active pill tracks the scroll position.
- Only the standard room shows a figure.
- Both themes.

- [ ] **Step 8: Commit**

```bash
git add src/app/accommodation src/features/accommodation
git rm -r "src/app/(marketing)/accommodation"
git commit -m "feat(accommodation): rebuild /accommodation on the themed shell"
```

---

### Task 6: Rebuild `/e-channeling`

**Files:**
- Create: `src/app/e-channeling/layout.tsx`, `src/app/e-channeling/page.tsx`
- Create: `src/features/e-channeling/data/content.ts`, `src/features/e-channeling/data/content.test.ts`
- Create: `src/features/e-channeling/components/ChannelingHero.tsx`, `SectionHead.tsx`, `DirectorySection.tsx`, `HelpSection.tsx`, `EChannelingPage.tsx`
- Modify: `src/features/e-channeling/components/DoctorDirectory.tsx` (retokenize), `src/features/e-channeling/index.tsx` (becomes `index.ts`)
- Delete: `src/app/(marketing)/e-channeling/`
- Test: `src/features/e-channeling/data/content.test.ts`

**Interfaces:**
- Consumes: `channelingNavigation`, `channelingFooterColumns` (Task 1); `doctors`, `CALENDLY_BASE` from `../data/doctors` (Task 2).
- Produces: `EChannelingPage` from `@/features/e-channeling`. Renders ids `#top`, `#directory`, `#help`.

This page has no jump cards: it has one job, and the directory is directly below the hero. Adding four shortcuts to a page with two sections would be decoration.

- [ ] **Step 1: Write the failing test**

Create `src/features/e-channeling/data/content.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { doctors } from "./doctors.ts";
import { heroFacts, helpRail, tickerItems } from "./content.ts";

// The hero states these counts and the directory computes them from the same
// array. If they disagree the page contradicts itself in the first screen.
test("the hero's counts are computed from the doctor list, not typed in", () => {
  const specialities = new Set(doctors.map((d) => d.specialization)).size;
  const facts = new Map(heroFacts.map((f) => [f.k, f.v]));
  assert.equal(facts.get("Consultants"), String(doctors.length));
  assert.equal(facts.get("Specialities"), String(specialities));
});

test("the help rail offers the hospital's own desk only", () => {
  assert.equal(helpRail.phone, "0117 84 84 84");
  assert.equal(helpRail.phoneHref, "tel:+94117848484");
  assert.equal(helpRail.email, "info@sjhospital.lk");
});

test("no em dash in any encoding", () => {
  const copy = [...tickerItems, ...heroFacts.flatMap((f) => [f.k, f.v]), helpRail.heading, helpRail.body];
  for (const value of copy) {
    for (const form of ["—", "&mdash;", "&#8212;", "&#x2014;"]) {
      assert.ok(!value.includes(form), `${value} contains ${form}`);
    }
  }
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, cannot find `./content.ts`.

- [ ] **Step 3: Write `data/content.ts`**

Derive the counts rather than hardcoding them, which is what the first test enforces:

```ts
import { doctors } from "./doctors";

const specialityCount = new Set(doctors.map((d) => d.specialization)).size;

export const heroFacts = [
  { k: "Consultants", v: String(doctors.length) },
  { k: "Specialities", v: String(specialityCount) },
  { k: "Booking", v: "Online, 24/7" },
  { k: "Channelling desk", v: "0117 84 84 84" },
];

// Derived, not typed: the ticker lists what you can actually book, so it must
// not be able to advertise a speciality the directory cannot filter to. Sorted
// by headcount so the ticker opens with the specialities most people want.
export const tickerItems: readonly string[] = Object.entries(
  doctors.reduce<Record<string, number>>((counts, d) => {
    counts[d.specialization] = (counts[d.specialization] ?? 0) + 1;
    return counts;
  }, {})
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([speciality]) => speciality);

export const helpRail = {
  heading: "Not sure who to see?",
  body: "Our channelling desk will match you to the right consultant, any hour of the day.",
  phone: "0117 84 84 84",
  phoneHref: "tel:+94117848484",
  email: "info@sjhospital.lk",
};
```

`helpRail`'s two strings are lifted verbatim from the existing `DoctorDirectory.tsx` rail. `tickerItems` is the speciality list, so it too is derived, not written.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Build the hero and sections**

`ChannelingHero.tsx` follows `AboutHero`. Photograph `/images/echanneling-hero.jpg`, alt "Clinical staff with medical equipment at St. Joseph Hospital Negombo". `h1` from the old banner, "Make an appointment". Standfirst from the old subtitle, verbatim.

`DirectorySection.tsx`, `id="directory"`, eyebrow `01 / Find a consultant`: `SectionHead` plus `<DoctorDirectory doctors={doctors} />`.

Retokenize `DoctorDirectory.tsx`, keeping every piece of behaviour: the `useMemo` speciality counts, the `useMemo` filter over name and speciality, `MOBILE_CHIP_LIMIT`, the `resetAll` handler, the `resultLabel` string, the empty state, and the `target="_blank" rel="noopener noreferrer"` on each card. Class changes only, in the three helper functions and the JSX:

- search shell: `border border-[var(--home-hairline)] bg-[var(--home-surface)]`
- input text: `text-[var(--home-body)] placeholder:text-[var(--home-muted)]`
- active chip and active rail row: `bg-[var(--home-accent)] text-[var(--home-on-accent)]`
- inactive: `text-[var(--home-muted)] hover:text-[var(--home-heading)]`
- cards: `sj-fill border border-[var(--home-hairline)] bg-[var(--home-bg)]`, speciality eyebrow `text-[var(--home-accent-soft)]`, name `font-display text-[var(--home-heading)]`
- the sticky rail keeps `sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto` and its `themed-scrollbar`

Delete the rail block at the bottom of `DoctorDirectory.tsx` (the "Not sure who to see?" gradient card). It becomes `HelpSection.tsx`, `id="help"`, reading `helpRail`, so the client component stops carrying static content it does not need.

`EChannelingPage.tsx` composes hero, `DirectorySection`, `HelpSection`, then `<ThemedFooter columns={channelingFooterColumns} id="footer" />`. Route and layout as Task 3.

- [ ] **Step 6: Verify**

Run: `npm test`, `npm run lint`, `npx tsc --noEmit`. All clean.

`npm run dev`, then at `/e-channeling`:
- The hero reads 71 consultants and 28 specialities.
- Typing "derm" filters to the four dermatologists.
- The speciality rail counts sum to 71.
- "Clear filters" appears only when filtered and resets both the query and the speciality.
- A search matching nothing shows the empty state with the desk number.
- A card opens the right consultant's Calendly page in a new tab. Spot-check `Dr. Raja Hettiarachchi`, whose slug names Champa Jayamanna, and confirm the Calendly page's own heading says Raja Hettiarachchi.
- The rail is a sticky column at 1440px and the chip row is horizontally scrollable at 375px.
- Both themes.

- [ ] **Step 7: Commit**

```bash
git add src/app/e-channeling src/features/e-channeling
git rm -r "src/app/(marketing)/e-channeling"
git commit -m "feat(e-channeling): rebuild /e-channeling on the themed shell"
```

---

### Task 7: Rebuild `/privacy-policy` and retire the old chrome

**Files:**
- Create: `src/app/privacy-policy/layout.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/privacy-policy/_components/PolicyHero.tsx`
- Move: `src/app/(marketing)/privacy-policy/_components/PolicyContent.tsx` to `src/app/privacy-policy/_components/PolicyContent.tsx`, retokenized
- Delete: `src/app/(marketing)/` entirely, `src/components/layout/SiteHeader.tsx`, `SiteFooter.tsx`, `MobileNav.tsx`, `PageBanner.tsx`, `BackToTopButton.tsx`
- Modify: `src/config/navigation.ts` (drop the two data exports, keep the type), `CLAUDE.md`
- Test: `src/config/navigation.test.ts`

**Interfaces:**
- Consumes: `privacyNavigation`, `privacyFooterColumns` (Task 1).
- Produces: nothing other tasks depend on. This is the last task that touches shared files.

The legal text is reproduced from the hospital's actual published policy. **Restyle it, do not edit a word of it.**

- [ ] **Step 1: Write the failing test**

Add to `src/config/navigation.test.ts`:

```ts
// The old chrome is gone. These files were the last thing rendering the
// pre-redesign header, footer and page banner, and (marketing) was the only
// route group still using them. A stray re-import would silently reintroduce a
// second design system, so it fails the suite instead.
test("the retired chrome is not referenced anywhere in src", () => {
  const RETIRED = [
    "SiteHeader",
    "SiteFooter",
    "MobileNav\"",
    "PageBanner",
    "BackToTopButton",
    "primaryNavigation",
    "footerQuickLinks",
  ];
  const files = globSync("src/**/*.{ts,tsx}");
  for (const file of files) {
    if (file.endsWith("navigation.test.ts")) continue;
    const src = readFileSync(file, "utf8");
    for (const name of RETIRED) {
      assert.ok(!src.includes(name), `${file} still references ${name}`);
    }
  }
});

test("navigation.ts still exports the NavItem type every nav depends on", () => {
  const src = readFileSync("src/config/navigation.ts", "utf8");
  assert.match(src, /export type NavItem/);
  assert.ok(!src.includes("primaryNavigation"));
});
```

`MobileNav"` carries a trailing quote so it does not match `MobileNavPanel`, which stays.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL, the chrome is still referenced.

- [ ] **Step 3: Build the privacy page**

`PolicyHero.tsx` is a shorter hero than the others: no ticker, no fact strip, because a legal page has no facts to strip. `min-h-[52vh]`, no photograph, `bg-[var(--home-surface-2)]` with the same gradient sheen, `ThemedHeader`, breadcrumb, `h1` "Privacy policy", and the policy's "Last updated" line as the standfirst, read from `PolicyContent`.

Retokenize `PolicyContent.tsx`: headings `text-[var(--home-heading)]`, body `text-[var(--home-body)]`, links `sj-link text-[var(--home-accent)]`, dividers `border-[var(--home-hairline)]`. Constrain the measure with `max-w-[72ch]`, since long legal prose at full width is unreadable. Change no wording.

`src/app/privacy-policy/page.tsx` keeps the `Metadata` from the old route and renders the hero, the content, then `<ThemedFooter columns={privacyFooterColumns} id="footer" />`. Layout as Task 3.

- [ ] **Step 4: Confirm nothing imports the old chrome, then delete it**

```bash
grep -rn "SiteHeader\|SiteFooter\|PageBanner\|BackToTopButton\|primaryNavigation\|footerQuickLinks" src --include=*.ts --include=*.tsx
grep -rn "from \"@/components/layout/MobileNav\"" src --include=*.tsx
```

Both must return nothing but the test file. Then delete the five components and the whole `src/app/(marketing)/` directory, and reduce `src/config/navigation.ts` to just:

```ts
export type NavItem = {
  label: string;
  href: string;
};
```

- [ ] **Step 5: Correct the stale claim in CLAUDE.md**

`CLAUDE.md` says "No test runner is configured yet." It is: `npm test` runs `node --test` over `src/**/*.test.ts`. Replace that sentence with a line documenting the real command, so the next reader does not skip writing tests on its word.

- [ ] **Step 6: Run the test to verify it passes**

Run: `npm test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(privacy): rebuild /privacy-policy, then retire the old chrome"
```

---

### Task 8: Whole-site verification

**Files:**
- Modify: whatever the sweep turns up.

**Interfaces:**
- Consumes: everything.
- Produces: a verified branch.

- [ ] **Step 1: The em dash sweep, all four encodings**

```bash
grep -rn -e $'—' -e '&mdash;' -e '&#8212;' -e '&#x2014;' src docs --include=*.ts --include=*.tsx --include=*.css --include=*.md
```

Expected: no hits in `src`. Hits in `docs` are only the spec and plan lines that name the forms. Fix any in `src` by restructuring the sentence.

- [ ] **Step 2: Confirm no old-design token survived**

```bash
grep -rn "bg-surface\|text-ink\|text-muted\b\|text-primary\|bg-primary\|text-accent-dark\|font-heading" src/features/about src/features/contact src/features/accommodation src/features/e-channeling src/app/privacy-policy
```

Expected: nothing. Every hit is a class that does not respond to the theme toggle and must become a `var(--home-*)` equivalent.

- [ ] **Step 3: Full check**

Run: `npm test` (all green), `npm run lint` (clean), `npx tsc --noEmit` (clean), `npm run build` (succeeds).

`npm run build` is the one that catches a Next.js 16 mistake the others miss: runtime data (`cookies`, `headers`, `searchParams`) outside a `<Suspense>` boundary is a build error under `cacheComponents`. Check whether `cacheComponents` is on in `next.config.ts` before assuming it applies.

- [ ] **Step 4: Manual pass over all thirteen pages**

`npm run dev`, then in both themes at 375px and 1440px, visit `/`, `/services`, `/facilities`, `/pharmacy`, `/health-tips`, `/international-care`, `/school-wellness`, `/network`, `/media`, `/careers`, and the five rebuilt pages. For each:

- The header reads the same nine labels in the same order.
- "Book now" goes to `/e-channeling`.
- The footer reaches About, Contact and Accommodation.
- No horizontal body scroll.
- The theme toggle flips every surface, with no white block left behind.
- The browser console is free of errors and hydration warnings.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix(interior-pages): verification sweep across the redesigned pages"
```

- [ ] **Step 6: Report, and do not merge**

Summarize on the branch and stop. Per the project's standing instruction, never merge to `main` unprompted: report what landed and wait.
