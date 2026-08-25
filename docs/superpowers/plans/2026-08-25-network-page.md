# Network Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/network`, the page explaining that St. Joseph Hospital is operated by Kids & Teens Medical Group and sits inside a family of nine companies across two continents, matching the bundled design reference's layout, motion and hover behaviour, and retarget the site's `Network` nav item to it.

**Architecture:** A thin route (`src/app/network/`) over a self-contained feature (`src/features/network/`), following the `international-care` page exactly: `ThemedShell flowHeader` layout, one component per reference section, all copy in `data/content.ts` with a `node:test` file pinning it. Shared UI (`ThemedHeader`, `ThemedFooter`, `Ticker`, `ParallaxLayer`, `Reveal`, `RevealStagger`) is reused unchanged; `FaqAccordion`'s row list is extracted into a shared `AccordionList` so the referrals section can reuse it inside a two-column split.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4 (CSS-first, `@theme` in `src/app/globals.css`), `node:test` via `npm test`, `sharp` for one-off logo normalisation.

**Spec:** `docs/superpowers/specs/2026-08-25-network-page-design.md`

## Global Constraints

- **No em dash anywhere**, in UI copy or documentation, in any encoding: the literal `U+2014`, `&mdash;`, `&#8212;`, `&#x2014;`. Use a comma, colon, semicolon, parentheses, or a full stop. When checking, grep for all four forms.
- **Server Components by default.** `'use client'` only for state, effects, event handlers or browser APIs, at the smallest leaf, never high in the tree.
- **Import via the `@/*` alias** (maps to `src/*`). No `../../..` chains.
- **A feature owns its internals.** Other features import from `features/network/index.ts` only.
- Component files `PascalCase.tsx`, route folders `kebab-case`.
- The hospital is **ten** minutes from Bandaranaike International Airport. The reference says twelve. Ten is correct and is what the repo says in ten other places.
- Do not restyle, re-token or "improve" the reference's layout. Port intent for colour (the reference hard-codes dark-theme hex; this repo is theme-tokenised via `--home-*`), but keep every size, weight, spacing and breakpoint value.
- Blocks sitting on a photograph stay **fixed-dark in both themes** (literal `#FFFFFF` / `#7FCBFF` / `#2CA6F0` rather than `var(--home-*)`), because the light theme swaps the accent to a deep `#0B6FC0` that sinks into the image. This is the documented exemption in `InternationalHero.tsx`. It applies to the hero and to `#reach`.
- Every hover that changes layout or reveals content must sit behind `@media (hover: hover)` so a touch tap does not latch it.
- `npm run lint`, `npm test` and `npm run build` must all pass before the final commit.

---

## File Structure

**Created:**

| File | Responsibility |
| --- | --- |
| `public/images/network/logos/*.png` | Nine normalised group company marks |
| `scripts/normalise-network-logos.mjs` | One-off `sharp` script that produced them, kept for reproducibility |
| `src/components/ui/AccordionList.tsx` | Shared one-open-at-a-time accordion row list, extracted from `FaqAccordion` |
| `src/config/networkNavigation.ts` | `networkNavigation` + `networkFooterColumns` |
| `src/features/network/types.ts` | `JumpCard`, `FactRow`, `Org`, `OrgGroup`, `ReachRow`, `ContactRow` |
| `src/features/network/data/content.ts` | All page copy, opening with the placeholder notice |
| `src/features/network/data/content.test.ts` | Pins the notice, the nine companies, the figures, the anchors |
| `src/features/network/components/NetworkHero.tsx` | `#top` |
| `src/features/network/components/JumpCards.tsx` | `#jump` |
| `src/features/network/components/MattersSection.tsx` | `#matters` |
| `src/features/network/components/OrgCard.tsx` | One organisation card |
| `src/features/network/components/FamilySection.tsx` | `#family` |
| `src/features/network/components/ReachSection.tsx` | `#reach` |
| `src/features/network/components/ReferralSection.tsx` | `#referrals` |
| `src/features/network/components/ContactSection.tsx` | `#contact` |
| `src/features/network/components/NetworkPage.tsx` | Composes the seven blocks and the footer |
| `src/features/network/index.ts` | Exports `NetworkPage` only |
| `src/app/network/layout.tsx` | `ThemedShell flowHeader` + `FloatingActions` |
| `src/app/network/page.tsx` | Metadata + `<NetworkPage />` |

**Modified:**

| File | Change |
| --- | --- |
| `src/components/ui/FaqAccordion.tsx` | Composes `AccordionList` instead of owning the rows |
| `src/config/homeNavigation.ts` | `Network` to `/network` |
| `src/config/servicesNavigation.ts` | `Network` to `/network`, in both nav exports |
| `src/config/facilitiesNavigation.ts` | `Network` to `/network` |
| `src/config/healthTipsNavigation.ts` | `Network` to `/network` |
| `src/config/pharmacyNavigation.ts` | `Network` to `/network` |
| `src/config/internationalNavigation.ts` | `Network` to `/network` |
| `src/config/navigation.test.ts` | Register `networkNavigation`; assert `Network` reaches `/network` |
| `src/features/home/components/NetworkSection.tsx` | Heading links through to `/network` |
| `docs/image-credits.md` | A row per downloaded mark |

---

## Task 0: Install dependencies in the worktree

This worktree has no `node_modules`. Nothing else in the plan can be verified without it.

**Files:** none

- [ ] **Step 1: Install**

```bash
npm ci
```

- [ ] **Step 2: Confirm the toolchain runs**

```bash
npm run lint
npm test
```

Expected: lint clean, and the existing `node:test` suites (`src/config/navigation.test.ts`, the feature `content.test.ts` files) all pass. If they do not pass on a clean checkout, stop and report: the plan assumes a green baseline.

- [ ] **Step 3: No commit**

`node_modules` is gitignored. Nothing to commit.

---

## Task 1: Logo assets

Nine group company marks, normalised to one size and shape so a 48px tile renders them consistently. Six already exist in the repo or on disk; three are downloaded from the companies' own sites.

**Files:**
- Create: `scripts/normalise-network-logos.mjs`
- Create: `public/images/network/logos/{st-joseph,acig,kids-and-teens,st-gianna,laipt,serendib-healthways,after-hours,human-compass,blockchain-bpo}.png`
- Modify: `docs/image-credits.md`

**Interfaces:**
- Consumes: nothing.
- Produces: nine paths of the form `/images/network/logos/<slug>.png`, where `<slug>` is one of `st-joseph`, `acig`, `kids-and-teens`, `st-gianna`, `laipt`, `serendib-healthways`, `after-hours`, `human-compass`, `blockchain-bpo`. Task 3 hard-codes these in `content.ts` and Task 3's test asserts each file exists.

- [ ] **Step 1: Download the three marks that are not on disk**

All three are the companies' own logo files, referenced from their own home pages.

```bash
mkdir -p /tmp/sj-logos
curl -sL --max-time 60 -o /tmp/sj-logos/st-gianna.png "https://sgmdoctor.com/wp-content/uploads/2024/06/cropped-ST.-GIANNA-logo-final-2-1.png"
curl -sL --max-time 60 -o /tmp/sj-logos/laipt.png "https://laipt.org/wp-content/uploads/2025/07/image-1-1.png"
curl -sL --max-time 60 -o /tmp/sj-logos/human-compass.png "https://humancompassmso.com/wp-content/uploads/2025/08/Untitled-design-1-1.png"
```

Use the scratchpad directory rather than `/tmp` if the harness provides one.

Verify each is a real PNG and not an HTML error page:

```bash
file /tmp/sj-logos/*.png
```

Expected: three `PNG image data` lines. `human-compass.png` is 1563x1563 and about 2.5MB; that is correct and the next step shrinks it.

- [ ] **Step 2: Write the normalisation script**

`sharp` is not in `package.json`; it is present in the repository's `node_modules` because Next 16 pulls it in for image optimisation. Resolve it rather than installing it, so no dependency is added for a one-off asset step.

Create `scripts/normalise-network-logos.mjs`:

```js
// One-off: normalises the nine group company marks into a single shape so the
// 48px logo tile on /network renders them consistently.
//
// Every mark is fitted into a 144x144 square (48px at 3x) with `contain`, on a
// transparent canvas, padded so nothing touches the tile edge. The card renders
// them on a solid white chip, so marks that arrive on an opaque white
// background (St. Gianna, LAIPT, Human Compass MSO) need no alpha surgery: the
// white simply meets the white of the chip. That is why this script does not
// repeat the flood-fill and un-composite treatment that `logo-mark.png` needed,
// which exists because that mark sits directly on the dark theme.
//
// sharp is not a declared dependency. It is resolved from the repository's
// node_modules, where Next installs it for image optimisation. Run from the
// repository root:  node scripts/normalise-network-logos.mjs
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const OUT_DIR = path.join("public", "images", "network", "logos");
const SIZE = 144;
const PAD = 8;

/** slug -> source file. Order matches the cards' reading order on the page. */
const SOURCES = {
  "st-joseph": "public/images/logo-mark.png",
  acig: "public/images/partners/partner-4.png",
  "kids-and-teens": "public/images/kids-teens-logo.png",
  "st-gianna": "/tmp/sj-logos/st-gianna.png",
  laipt: "/tmp/sj-logos/laipt.png",
  "serendib-healthways": "C:/Users/User/Pictures/Logo/serendib-logo.png",
  "after-hours": "public/images/partners/partner-5.png",
  "human-compass": "/tmp/sj-logos/human-compass.png",
  "blockchain-bpo": "public/images/partners/partner-2.png",
};

await mkdir(OUT_DIR, { recursive: true });

for (const [slug, src] of Object.entries(SOURCES)) {
  const out = path.join(OUT_DIR, `${slug}.png`);
  await sharp(src)
    .resize(SIZE - PAD * 2, SIZE - PAD * 2, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: PAD,
      bottom: PAD,
      left: PAD,
      right: PAD,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(out);
  const { size } = await sharp(out).metadata();
  console.log(`${slug}: ${out} (${size} bytes)`);
}
```

Adjust the three `/tmp/sj-logos/...` paths and the `C:/Users/User/Pictures/Logo/serendib-logo.png` path if Step 1 wrote elsewhere.

- [ ] **Step 3: Run it**

```bash
node scripts/normalise-network-logos.mjs
```

Expected: nine lines, each naming a file under `public/images/network/logos/`. Every output should be a few kilobytes; if `human-compass.png` is still over 100KB the resize did not apply and the script needs re-checking.

- [ ] **Step 4: Verify the nine files exist and are 144x144**

```bash
node -e "const{createRequire}=require('node:module');const sharp=createRequire(process.argv[1]).call?require('sharp'):require('sharp');const fs=require('fs');const d='public/images/network/logos';for(const f of fs.readdirSync(d)){sharp(d+'/'+f).metadata().then(m=>console.log(f,m.width+'x'+m.height,m.hasAlpha))}"
```

Simpler alternative if that one-liner is awkward:

```bash
ls -la public/images/network/logos
```

Expected: exactly nine `.png` files named for the nine slugs.

- [ ] **Step 5: Look at them**

Open each of the nine PNGs and confirm the mark is centred, uncropped, and legible at small size. This is the only check that catches a mark that resized into a sliver or downloaded as a placeholder. Do not skip it.

- [ ] **Step 6: Credit the three downloads**

Append to `docs/image-credits.md`, matching the file's existing row format:

```markdown
| `images/network/logos/st-gianna.png` | St. Gianna Medical Group | Official mark, from the company's own site (`sgmdoctor.com`). Group company logo, shown as published. |
| `images/network/logos/laipt.png` | LA Intensive Pediatric Therapy | Official mark, from the company's own site (`laipt.org`). Group company logo, shown as published. |
| `images/network/logos/human-compass.png` | Human Compass MSO | Official mark, from the company's own site (`humancompassmso.com`). Group company logo, shown as published. |
```

Read the file first and match its actual column headings; if it is a prose list rather than a table, follow that shape instead.

- [ ] **Step 7: Commit**

```bash
git add public/images/network/logos scripts/normalise-network-logos.mjs docs/image-credits.md
git commit -m "feat(network): normalised marks for the nine group companies

Six came from the repo or the brand folder; St. Gianna, LA Intensive Pediatric
Therapy and Human Compass MSO were taken from the companies' own sites. All nine
are fitted into a 144x144 transparent square so the 48px card tile renders them
at one size.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: Extract `AccordionList` from `FaqAccordion`

The referrals section needs the accordion inside a two-column split, but `FaqAccordion` renders its own `<section id="faq">` and heading. Extract the row list so there is one implementation of the measured-height, `inert`, rotating-glyph behaviour.

**Files:**
- Create: `src/components/ui/AccordionList.tsx`
- Modify: `src/components/ui/FaqAccordion.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces:
  - `export type AccordionItem = { q: string; a: string }`
  - `export function AccordionList(props: { items: AccordionItem[]; className?: string; stepMs?: number }): JSX.Element` (a `'use client'` component rendering only the rows, no section or heading)
  - `FaqAccordion`'s own props (`{ faq, heading, eyebrow }`) and `export type FaqItem` are unchanged. Task 7 consumes `AccordionList`.

- [ ] **Step 1: Create `AccordionList` by moving the existing code**

Create `src/components/ui/AccordionList.tsx`. Move `useIsomorphicLayoutEffect`, the `FaqRow` component (renamed `AccordionRow`) and the `useState(-1)` / `useId` list wiring out of `FaqAccordion.tsx` verbatim. Do not change any behaviour, class, duration or attribute: this is a move, and any edit here is a regression risk on three shipped pages.

```tsx
"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { RevealStagger } from "@/components/ui/RevealStagger";

export type AccordionItem = { q: string; a: string };

// Measuring in a plain `useEffect` would let the browser paint one frame at
// max-height 0 before the effect runs, so a panel that starts open would
// visibly grow open on load. `useLayoutEffect` runs before that paint, but
// only in the browser; on the server it does nothing but warn, so it's
// aliased to the ordinary effect during the framework's server render pass.
// See `ServiceDirectory.tsx`, which this accordion mirrors.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type AccordionListProps = {
  items: AccordionItem[];
  /** Applied to the row container, so a caller can set its own hairline and spacing. */
  className?: string;
  /** Stagger between consecutive rows revealing. */
  stepMs?: number;
};

/**
 * One-open-at-a-time accordion rows, with no section wrapper or heading of its
 * own. Every panel starts closed (`useState(-1)`) since nothing has been
 * clicked yet, unlike `ServiceDirectory`'s rows, which open their first row by
 * default.
 *
 * Extracted from `FaqAccordion` so `/network`'s referrals section can put the
 * same rows inside a two-column split with a sticky heading. The height
 * measurement and the `inert` collapsed panel below are not worth having two
 * copies of.
 */
export function AccordionList({ items, className = "", stepMs = 45 }: AccordionListProps) {
  const [open, setOpen] = useState(-1);
  const baseId = useId();

  return (
    <RevealStagger stepMs={stepMs} className={className}>
      {items.map((item, index) => (
        <AccordionRow
          key={item.q}
          item={item}
          isOpen={open === index}
          onToggle={() => setOpen((current) => (current === index ? -1 : index))}
          idPrefix={`${baseId}-${index}`}
        />
      ))}
    </RevealStagger>
  );
}
```

Then paste the existing `FaqRow` body below it, renamed to `AccordionRow`, with its `FaqRowProps` renamed to `AccordionRowProps` and its `item: FaqItem` retyped to `item: AccordionItem`. Everything else in that function, every class string, the `ResizeObserver` effect, the `inert` panel, the transition inline styles, stays byte-identical.

- [ ] **Step 2: Rewrite `FaqAccordion` to compose it**

`FaqAccordion.tsx` becomes the section wrapper only. Note it no longer needs `'use client'`: it holds no state once the rows move out, so it becomes a Server Component and only `AccordionList` ships to the browser.

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { AccordionList } from "@/components/ui/AccordionList";
import type { AccordionItem } from "@/components/ui/AccordionList";

export type FaqItem = AccordionItem;

type FaqAccordionProps = {
  faq: FaqItem[];
  /** Section heading. */
  heading: string;
  /** Optional numbered kicker above the heading, as the pharmacy page uses. */
  eyebrow?: string;
};

/**
 * `#faq`: one-open-at-a-time accordion under a heading. The rows themselves
 * live in the shared `AccordionList`, which `/network`'s referrals section also
 * uses inside a different layout.
 *
 * Shared rather than owned by a feature: the services detail pages, pharmacy
 * and international care all need this exact section.
 */
export function FaqAccordion({ faq, heading, eyebrow }: FaqAccordionProps) {
  return (
    <section id="faq" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal>
        {eyebrow ? (
          <div className="mb-4.5 text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {eyebrow}
          </div>
        ) : null}
        <h2 className="font-display text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
          {heading}
        </h2>
      </Reveal>

      <AccordionList
        items={faq}
        stepMs={45}
        className="mt-10 flex flex-col gap-px bg-[var(--home-hairline)]"
      />
    </section>
  );
}
```

- [ ] **Step 3: Verify nothing that consumed `FaqAccordion` broke**

```bash
npm run lint
npx tsc --noEmit
```

Expected: both clean. `FaqItem` is re-exported as an alias, so `import type { FaqItem }` in the pharmacy, services and international care data modules keeps resolving.

Confirm the consumers by grep, and check each still type-checks:

```bash
grep -rn "FaqAccordion\|FaqItem" src/ --include=*.ts --include=*.tsx
```

- [ ] **Step 4: Build, then look at one consumer in the browser**

```bash
npm run build
npm run dev
```

Open `http://localhost:3000/pharmacy#faq` and confirm: clicking a row opens it and closes any other, the `+` rotates 45 degrees, the panel animates rather than snapping, and a closed panel's text is not reachable by tab. This is a refactor of shipped UI, so it gets looked at rather than assumed.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/AccordionList.tsx src/components/ui/FaqAccordion.tsx
git commit -m "refactor(ui): split AccordionList out of FaqAccordion

The /network referrals section needs these rows inside a two-column split with a
sticky heading, which FaqAccordion's own section and heading cannot accommodate.
The rows move out verbatim, so the three pages already using FaqAccordion render
identically; FaqAccordion loses its state and becomes a Server Component, and
only the row list ships to the browser now.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: Types, content, and the test that pins it

All page copy in one module, with a notice recording exactly which claims are unverified, and a test that fails if the notice or the verified figures drift. Test first.

**Files:**
- Create: `src/features/network/types.ts`
- Create: `src/features/network/data/content.ts`
- Create: `src/features/network/data/content.test.ts`

**Interfaces:**
- Consumes: the nine logo paths from Task 1.
- Produces, from `content.ts`:
  - `PLACEHOLDER_NOTICE: string`
  - `tickerItems: readonly string[]` (8 items)
  - `heroFacts: FactRow[]` (4)
  - `jumpCards: JumpCard[]` (4)
  - `mattersEyebrow: string`, `mattersHeading: string`, `mattersBody: string`, `practice: string[]` (5)
  - `orgGroups: OrgGroup[]` (3 groups, 9 orgs total)
  - `reachRows: ReachRow[]` (9)
  - `referrals: AccordionItem[]` (7)
  - `contactRows: ContactRow[]` (4)
  - `disclaimer: string`
- From `types.ts`: `JumpCard`, `FactRow`, `Org`, `OrgGroup`, `ReachRow`, `ContactRow`. Tasks 5 through 8 consume all of these.

- [ ] **Step 1: Write `types.ts`**

```ts
/** A shortcut card under the hero, anchoring one of this page's sections. */
export type JumpCard = { count: string; label: string; note: string; href: string };

/** One cell of the hero fact strip. */
export type FactRow = { k: string; v: string };

/** One group company. */
export type Org = {
  /** Logo filename and React key. */
  slug: string;
  /** `/images/network/logos/<slug>.png`. */
  logo: string;
  /** Short name set beside the logo. */
  wordmark: string;
  /** Small kicker above the name: "You are here", "Insurance", and so on. */
  badge: string;
  name: string;
  tagline: string;
  body: string;
  chips: string[];
  /** The line revealed on card hover. */
  cta: string;
  /** Absent for St. Joseph Hospital, which is this site. */
  href?: string;
  /** Draws the 3px accent inset along the card's top edge. */
  flagship?: boolean;
};

/** One of the three named groupings in the family section. */
export type OrgGroup = { name: string; note: string; orgs: Org[] };

/** One row of the numbers section. */
export type ReachRow = { n: string; k: string; who: string };

/** One row of the contact panel. */
export type ContactRow = { label: string; href: string; glyph: "phone" | "arrow" };
```

- [ ] **Step 2: Write the failing test**

Create `src/features/network/data/content.test.ts`. It imports from `./content.ts` (the `.ts` extension is required: these run under `node --test` directly, as the sibling suites do).

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import {
  PLACEHOLDER_NOTICE,
  contactRows,
  disclaimer,
  heroFacts,
  jumpCards,
  mattersBody,
  mattersHeading,
  orgGroups,
  practice,
  reachRows,
  referrals,
  tickerItems,
} from "./content.ts";

const orgs = orgGroups.flatMap((g) => g.orgs);

/** Everything on the page that is prose the reader sees. */
const allCopy = [
  ...tickerItems,
  ...heroFacts.flatMap((f) => [f.k, f.v]),
  ...jumpCards.flatMap((c) => [c.count, c.label, c.note]),
  mattersHeading,
  mattersBody,
  ...practice,
  ...orgGroups.flatMap((g) => [g.name, g.note]),
  ...orgs.flatMap((o) => [o.wordmark, o.badge, o.name, o.tagline, o.body, o.cta, ...o.chips]),
  ...reachRows.flatMap((r) => [r.n, r.k, r.who]),
  ...referrals.flatMap((r) => [r.q, r.a]),
  ...contactRows.map((c) => c.label),
  disclaimer,
].join("\n");

// ---- The placeholder notice ----
//
// Unlike every other reference in this project, this one's company
// descriptions and figures check out against ktdoctor.com/network. Two blocks
// do not check out against anything, and the notice is what stops them being
// read as verified fact. If someone confirms or rewrites those blocks, they
// should delete the notice deliberately and watch this test fail, not discover
// later that it drifted away.

test("the placeholder notice names both unverified blocks", () => {
  assert.match(PLACEHOLDER_NOTICE, /not verified/i);
  assert.match(PLACEHOLDER_NOTICE, /In practice/);
  assert.match(PLACEHOLDER_NOTICE, /referral/i);
});

test("the placeholder notice names each unverified claim", () => {
  for (const claim of [
    "protocol",
    "second opinion",
    "generic name",
    "training",
    "ACIG",
    "admitting rights",
    "pricing",
  ]) {
    assert.match(PLACEHOLDER_NOTICE, new RegExp(claim, "i"), `notice does not mention ${claim}`);
  }
});

// ---- Shape ----

test("nine companies across three groups", () => {
  assert.equal(orgGroups.length, 3);
  assert.equal(orgs.length, 9);
});

test("the groups read Sri Lanka first, then California, then support", () => {
  assert.deepEqual(
    orgGroups.map((g) => g.name),
    ["Sri Lanka", "Paediatric and family care, California", "Business and support"],
  );
});

test("exactly the two flagship cards carry the accent inset", () => {
  assert.deepEqual(
    orgs.filter((o) => o.flagship).map((o) => o.slug),
    ["st-joseph", "kids-and-teens"],
  );
});

test("only this hospital's card has no outbound link", () => {
  assert.deepEqual(
    orgs.filter((o) => !o.href).map((o) => o.slug),
    ["st-joseph"],
  );
});

test("the ticker lists the eight companies other than this hospital", () => {
  assert.equal(tickerItems.length, 8);
  assert.ok(!tickerItems.some((t) => /St\. Joseph/i.test(t)));
});

test("four hero facts and four contact rows", () => {
  assert.equal(heroFacts.length, 4);
  assert.equal(contactRows.length, 4);
  assert.equal(contactRows.filter((c) => c.glyph === "phone").length, 1);
});

test("five in-practice lines and seven referral answers", () => {
  assert.equal(practice.length, 5);
  assert.equal(referrals.length, 7);
});

// ---- Anchors ----

test("every jump card anchors a section this page renders", () => {
  assert.equal(jumpCards.length, 4);
  assert.deepEqual(
    jumpCards.map((c) => c.href),
    ["#matters", "#family", "#reach", "#referrals"],
  );
});

test("the numeric jump card counts agree with the lists they point at", () => {
  const count = (href: string) => {
    const card = jumpCards.find((c) => c.href === href);
    assert.ok(card, `no jump card anchors ${href}`);
    return card.count;
  };
  assert.equal(count("#family"), `${orgs.length} companies`);
  assert.equal(count("#referrals"), `${referrals.length} answers`);
});

// ---- Figures, as published by the group ----
//
// Recorded as expected values so an edit that drifts from
// ktdoctor.com/network fails here rather than shipping a wrong number.

test("the numbers section matches what the group publishes", () => {
  assert.equal(reachRows.length, 9);
  const byKey = new Map(reachRows.map((r) => [r.k, r.n]));
  assert.equal(byKey.get("Companies in the network"), "9");
  assert.equal(byKey.get("Kids & Teens clinics"), "25");
  assert.equal(byKey.get("Serendib Healthways locations"), "20+");
  assert.equal(byKey.get("Board certified doctors"), "50+");
  assert.equal(byKey.get("After hours urgent care clinics"), "20+");
  assert.equal(byKey.get("Years of Human Compass MSO"), "25");
  assert.equal(byKey.get("LA Intensive Pediatric Therapy since"), "2010");
  assert.equal(byKey.get("Countries with BPO teams"), "2");
  assert.equal(byKey.get("Hospital in Sri Lanka"), "1");
});

test("the company count in the numbers matches the cards actually rendered", () => {
  const stated = reachRows.find((r) => r.k === "Companies in the network");
  assert.ok(stated);
  assert.equal(Number(stated.n), orgs.length);
});

test("every company links to the domain it is credited with", () => {
  const expected = {
    acig: "acig.lk",
    "kids-and-teens": "ktdoctor.com",
    "st-gianna": "sgmdoctor.com",
    laipt: "laipt.org",
    "serendib-healthways": "serendibhealthways.com",
    "after-hours": "pediatricafterhour.com",
    "human-compass": "humancompassmso.com",
    "blockchain-bpo": "myblockchainbpo.com",
  };
  for (const [slug, domain] of Object.entries(expected)) {
    const org = orgs.find((o) => o.slug === slug);
    assert.ok(org, `no card for ${slug}`);
    assert.ok(org.href?.includes(domain), `${slug} links to ${org.href}, not ${domain}`);
    assert.ok(org.cta.includes(domain), `${slug} cta reads "${org.cta}"`);
  }
});

// ---- Assets ----

test("every logo path points at a file that exists", () => {
  for (const org of orgs) {
    assert.equal(org.logo, `/images/network/logos/${org.slug}.png`);
    assert.ok(existsSync(`public${org.logo}`), `missing public${org.logo}`);
  }
});

// ---- House rules ----

test("no em dash, in any encoding", () => {
  for (const form of ["\u2014", "&mdash;", "&#8212;", "&#x2014;"]) {
    assert.ok(!allCopy.includes(form), `copy contains ${form}`);
    assert.ok(!PLACEHOLDER_NOTICE.includes(form), `notice contains ${form}`);
  }
});

test("the airport distance is never the reference's twelve minutes", () => {
  assert.ok(!/twelve minutes/i.test(allCopy));
  assert.ok(!/12 minutes/i.test(allCopy));
});
```

- [ ] **Step 3: Run it to verify it fails**

```bash
npm test
```

Expected: FAIL. `src/features/network/data/content.test.ts` cannot resolve `./content.ts`.

- [ ] **Step 4: Write `content.ts`**

Copy is the reference's, with the corrections in the Global Constraints. Note `&` is written as a literal `&` in data (JSX escapes are for markup, not strings).

```ts
import type { AccordionItem } from "@/components/ui/AccordionList";
import type { ContactRow, FactRow, JumpCard, OrgGroup, ReachRow } from "../types";

/**
 * The company descriptions, service chips and every figure in `#reach` were
 * checked against the group's own published network page,
 * <https://www.ktdoctor.com/network>, and match it. That is unusual for a
 * design reference in this project, and it is why this page keeps its
 * reference's copy where the pharmacy and international care pages had to cut
 * theirs.
 *
 * Two blocks are not backed by anything: not by this repo, and not by the
 * group's site. They ship as the reference wrote them, marked by
 * PLACEHOLDER_NOTICE below, because cutting them would remove a third of the
 * page and there is no repo content to replace them with. This is the same
 * treatment `features/media/data/content.ts` uses.
 *
 * One correction to the reference: it says the hospital is twelve minutes from
 * the airport. The repo says ten, in ten places. Ten is what is here.
 */
export const PLACEHOLDER_NOTICE = `Placeholder copy, not verified.

Two blocks on this page come from the design reference and are not backed by
this repo or by the group's published network page. Confirm each with the
hospital before treating any of it as fact, then either correct it here or
delete this notice deliberately (content.test.ts pins the notice, so removing
it fails the suite rather than passing unnoticed).

The "In practice" list in the matters section asserts: that the group's
paediatric and emergency protocols are inherited and adapted to Sri Lankan
guidelines; that difficult paediatric cases can be put to colleagues in the
United States for a second opinion; that families keep one continuous record
across countries; that prescriptions are written in generic names so either
country can dispense them; and that nursing and technician training runs against
group standards.

All seven referral answers assert: that a referral desk exists; that an LA
paediatrician's chart is sent ahead of travel and read rather than restarted;
that second opinions are a real channel and are disclosed when used; that dengue
management follows Sri Lankan national guidelines while stricter American
infection control and newborn observation protocols are kept; how an ACIG policy
settles at this hospital; that recruitment charges candidates no fee at any
stage; that admitting rights are open to consultants in Negombo, Chilaw and
Gampaha; and that pricing is set for the Sri Lankan market rather than an
imported cost base.`;

/** Scrolling strip along the bottom of the hero: the other eight companies. */
export const tickerItems = [
  "Kids & Teens Medical Group",
  "St. Gianna Medical Group",
  "LA Intensive Pediatric Therapy",
  "Serendib Healthways",
  "After-Hours Pediatric Urgent Care",
  "ACIG Asiacorp Insurance Brokers",
  "Human Compass MSO",
  "Blockchain BPO",
] as const;

/** Fact strip along the bottom of the hero. The third cell renders in accent. */
export const heroFacts: FactRow[] = [
  { k: "Parent group", v: "Kids & Teens Medical Group" },
  { k: "Group clinics", v: "25 across Greater LA" },
  { k: "Companies in the family", v: "Nine, on two continents" },
  { k: "Sri Lanka arm", v: "This hospital, and ACIG" },
];

export const jumpCards: JumpCard[] = [
  {
    count: "Why it matters",
    label: "At the bedside",
    note: "What the connection changes about your care.",
    href: "#matters",
  },
  {
    count: "9 companies",
    label: "The family",
    note: "California, Sri Lanka, and the support arms.",
    href: "#family",
  },
  {
    count: "The numbers",
    label: "Group reach",
    note: "Clinics, doctors, locations, as published.",
    href: "#reach",
  },
  {
    count: "7 answers",
    label: "Moving between us",
    note: "Referrals, second opinions, insurance, jobs.",
    href: "#referrals",
  },
];

export const mattersEyebrow = "01 / Why it matters at the bedside";
export const mattersHeading = "A network is only worth something to a patient";
export const mattersBody =
  "Most hospital group pages are corporate wallpaper. This one is here because the connection changes specific things about your care: which protocols the doctors follow, who reviews a difficult case, and how a child treated in Los Angeles can be followed up in Negombo without starting the file again.";

/** See PLACEHOLDER_NOTICE: none of these five is verified. */
export const practice = [
  "Paediatric and emergency protocols inherited from the group, adapted to Sri Lankan guidelines",
  "Difficult paediatric cases can be put to colleagues in the United States for a second opinion",
  "Families moving between LA and Sri Lanka keep one continuous record",
  "Prescriptions written in generic names so they can be dispensed on either side",
  "Nursing and technician training programmes run against group standards",
];

export const orgGroups: OrgGroup[] = [
  {
    name: "Sri Lanka",
    note: "Hospital care and insurance, brought to Sri Lanka by the group.",
    orgs: [
      {
        slug: "st-joseph",
        logo: "/images/network/logos/st-joseph.png",
        wordmark: "St. Joseph Hospital",
        badge: "You are here",
        name: "St. Joseph Hospital Negombo",
        tagline: "US standard care in Negombo.",
        body: "Operated by Kids & Teens Medical Group, USA, bringing American healthcare standards to affordable, accessible care ten minutes from the international airport.",
        chips: ["Emergency & outpatient", "Inpatient care", "Telemedicine", "Pharmacy & diagnostics"],
        cta: "This hospital",
        flagship: true,
      },
      {
        slug: "acig",
        logo: "/images/network/logos/acig.png",
        wordmark: "Asiacorp Insurance",
        badge: "Insurance",
        name: "ACIG, Asiacorp Insurance Brokers",
        tagline: "Insurance solutions across Sri Lanka.",
        body: "An insurance brokerage offering tailored motor, health, life and corporate cover for individuals and businesses, and the group company our patients most often ask about.",
        chips: ["Health insurance", "Life insurance", "Motor insurance", "Corporate insurance"],
        cta: "acig.lk",
        href: "https://acig.lk",
      },
    ],
  },
  {
    name: "Paediatric and family care, California",
    note: "Everyday primary, urgent and specialty care for children and families across Greater Los Angeles.",
    orgs: [
      {
        slug: "kids-and-teens",
        logo: "/images/network/logos/kids-and-teens.png",
        wordmark: "Kids & Teens Medical Group",
        badge: "Flagship, our parent",
        name: "Kids & Teens Medical Group",
        tagline: "The flagship paediatric network.",
        body: "Board certified paediatric care across 25 clinics in Greater LA for ages 0 to 21, and the group that operates this hospital.",
        chips: ["Primary care", "Urgent care", "Telehealth", "Newborn care"],
        cta: "ktdoctor.com",
        href: "https://www.ktdoctor.com",
        flagship: true,
      },
      {
        slug: "st-gianna",
        logo: "/images/network/logos/st-gianna.png",
        wordmark: "St. Gianna Medical",
        badge: "Family practice",
        name: "St. Gianna Medical Group",
        tagline: "Family practice for all ages.",
        body: "Comprehensive care for adults and children with same day appointments and round the clock booking, extending the group beyond paediatrics.",
        chips: ["Same day appointments", "24/7 booking", "Telehealth", "Advanced wound care"],
        cta: "sgmdoctor.com",
        href: "https://sgmdoctor.com",
      },
      {
        slug: "laipt",
        logo: "/images/network/logos/laipt.png",
        wordmark: "LA Intensive Paediatric Therapy",
        badge: "Therapy, since 2010",
        name: "LA Intensive Pediatric Therapy",
        tagline: "Expert paediatric therapy.",
        body: "Individual and centre based speech, occupational and developmental therapy for children, and the group's reference point for early intervention.",
        chips: ["Speech therapy", "Occupational therapy", "Sensory integration"],
        cta: "laipt.org",
        href: "https://laipt.org",
      },
      {
        slug: "serendib-healthways",
        logo: "/images/network/logos/serendib-healthways.png",
        wordmark: "Serendib Healthways",
        badge: "Health plans",
        name: "Serendib Healthways",
        tagline: "Paediatric health plans across Greater LA.",
        body: "A paediatric HMO and IPA network with more than 20 clinic locations and over 50 board certified doctors, offering affordable children's coverage across Los Angeles County.",
        chips: ["Paediatric HMO/IPA", "Same day appointments", "Telehealth", "After hours urgent care"],
        cta: "serendibhealthways.com",
        href: "https://serendibhealthways.com",
      },
      {
        slug: "after-hours",
        logo: "/images/network/logos/after-hours.png",
        wordmark: "After-Hours Paediatric Urgent Care",
        badge: "Round the clock",
        name: "After-Hours Pediatric Urgent Care",
        tagline: "Out of hours? We are here for yours.",
        body: "Paediatric urgent care at any hour across more than 20 California clinics, for ages 0 to 21, accepted by all major insurance plans.",
        chips: ["24/7 urgent care", "Same day appointments", "Ages 0 to 21", "All insurance accepted"],
        cta: "pediatricafterhour.com",
        href: "https://pediatricafterhour.com",
      },
    ],
  },
  {
    name: "Business and support",
    note: "The administrative and outsourcing companies that keep the network running.",
    orgs: [
      {
        slug: "human-compass",
        logo: "/images/network/logos/human-compass.png",
        wordmark: "Human Compass MSO",
        badge: "Management services",
        name: "Human Compass MSO",
        tagline: "Guiding care, delivering human solutions.",
        body: "A Southern California management services organisation connecting patients with primary, specialty and urgent care providers for over 25 years.",
        chips: ["Primary care network", "Specialty care", "Urgent care", "Provider management"],
        cta: "humancompassmso.com",
        href: "https://humancompassmso.com",
      },
      {
        slug: "blockchain-bpo",
        logo: "/images/network/logos/blockchain-bpo.png",
        wordmark: "Blockchain BPO",
        badge: "Outsourcing",
        name: "Blockchain BPO",
        tagline: "Offshore teams for US businesses.",
        body: "Dedicated offshore teams in Sri Lanka and Mexico for customer care, claims processing and billing support, and one of the group's largest Sri Lankan employers.",
        chips: ["Customer care", "Claims processing", "Billing support", "Data entry"],
        cta: "myblockchainbpo.com",
        href: "https://myblockchainbpo.com",
      },
    ],
  },
];

/** Figures as published by the group companies. See the test that pins them. */
export const reachRows: ReachRow[] = [
  { n: "9", k: "Companies in the network", who: "Across the United States and Sri Lanka" },
  { n: "25", k: "Kids & Teens clinics", who: "Greater Los Angeles" },
  { n: "20+", k: "Serendib Healthways locations", who: "Los Angeles County" },
  { n: "50+", k: "Board certified doctors", who: "Serendib Healthways network" },
  { n: "20+", k: "After hours urgent care clinics", who: "California, ages 0 to 21" },
  { n: "25", k: "Years of Human Compass MSO", who: "Southern California" },
  { n: "2010", k: "LA Intensive Pediatric Therapy since", who: "Speech, occupational, developmental" },
  { n: "2", k: "Countries with BPO teams", who: "Sri Lanka and Mexico" },
  { n: "1", k: "Hospital in Sri Lanka", who: "This one, in Negombo" },
];

/** See PLACEHOLDER_NOTICE: none of these seven answers is verified. */
export const referrals: AccordionItem[] = [
  {
    q: "My child is treated by Kids & Teens in Los Angeles. Can you follow up here?",
    a: "Yes, and this is the most common reason families use the network. Ask your LA paediatrician to send the chart to the hospital before you travel, and our paediatric team reads it rather than starting a fresh history. Growth charts, vaccination records and ongoing prescriptions carry across, and anything dispensed here is written in generic names so the pharmacy in California can match it on your return.",
  },
  {
    q: "Can a case from Negombo be reviewed by a doctor in the group in the United States?",
    a: "For difficult paediatric cases, yes. Our consultants can put a case to colleagues in the group for a second opinion, with imaging and reports attached, and we tell you plainly when we have done so. It is not a marketing promise of American doctors treating you in Negombo; it is a real channel used when a case genuinely warrants another pair of eyes.",
  },
  {
    q: "Do the clinical protocols really come from the US side?",
    a: "The group's paediatric and emergency protocols are the starting point, adapted to what is available and what is prevalent here. Dengue management, for instance, follows Sri Lankan national guidelines because that is the correct standard for this country. Where the American protocol is stricter, on infection control or on newborn observation, we keep the stricter one.",
  },
  {
    q: "Is my ACIG insurance policy settled directly at this hospital?",
    a: "ACIG is a brokerage in the same family, not an insurer, so the settlement depends on the insurer behind your policy rather than on the group relationship. Bring your policy documents to the billing desk before admission and we will tell you honestly whether direct settlement applies or whether you will be claiming afterwards with our invoice pack.",
  },
  {
    q: "I want to work for the group. Where do I apply?",
    a: "Clinical and hospital roles in Negombo go through this hospital's careers page. Roles with Blockchain BPO in Sri Lanka, and clinical roles in California, are advertised by those companies directly. We do not charge candidates a fee at any stage, and nobody in the group is authorised to ask you for one.",
  },
  {
    q: "Are you accepting new partner hospitals or referring doctors?",
    a: "Yes, particularly consultants in Negombo, Chilaw and Gampaha who would like admitting rights, and hospitals looking for a partner near the airport for patients arriving from abroad. Write to the hospital and the enquiry reaches the medical director rather than a marketing inbox.",
  },
  {
    q: "Does being part of an American group make treatment more expensive?",
    a: "No, and the point of the arrangement is the opposite. Prices are set for the Sri Lankan market and published on the estimate before you commit. What the group provides is protocols, training and purchasing scale rather than an imported cost base.",
  },
];

export const contactRows: ContactRow[] = [
  { label: "0117 84 84 84", href: "tel:+94117848484", glyph: "phone" },
  { label: "Email the hospital", href: "mailto:info@sjhospital.lk", glyph: "arrow" },
  { label: "The group network page", href: "https://www.ktdoctor.com/network", glyph: "arrow" },
  { label: "Travelling for treatment", href: "/international-care#journey", glyph: "arrow" },
];

export const disclaimer =
  "Company names, logos and figures on this page belong to the respective group companies and partners, and are shown as published by them. Each company is responsible for its own services and regulatory obligations in its own jurisdiction.";
```

- [ ] **Step 5: Run the test to verify it passes**

```bash
npm test
```

Expected: PASS, all of `content.test.ts`. If "every logo path points at a file that exists" fails, Task 1 did not produce all nine files under the exact slugs.

- [ ] **Step 6: Commit**

```bash
git add src/features/network/types.ts src/features/network/data
git commit -m "feat(network): page content, with the unverified blocks marked

The company descriptions, chips and every figure in the numbers section check
out against ktdoctor.com/network and are kept as the reference wrote them, with
the figures pinned by test so a later edit cannot silently drift from the
source. The in-practice list and the seven referral answers are backed by
nothing, so they ship behind PLACEHOLDER_NOTICE, which the test also pins.
The reference's twelve minutes from the airport is corrected to ten.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: Navigation config

**Files:**
- Create: `src/config/networkNavigation.ts`
- Modify: `src/config/navigation.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `networkNavigation: NavItem[]` and `networkFooterColumns: FooterColumn[]`. Tasks 5 and 8 consume both.

- [ ] **Step 1: Extend the navigation test first**

In `src/config/navigation.test.ts`, add the import and register the new nav:

```ts
import { networkNavigation } from "./networkNavigation.ts";
```

Add `networkNavigation` to the end of the `ALL_NAVS` array.

Then extend the existing "Facilities, Pharmacy and International reach their pages from every other nav" test by adding one pair to its list:

```ts
      ["Network", "/network"],
```

and add:

```ts
test("on the network page itself, Network is an in-page anchor", () => {
  const item = networkNavigation.find((i) => i.label === "Network");
  assert.ok(item);
  assert.equal(item.href, "#family");
});

test("no nav item still points at the superseded home network band", () => {
  for (const nav of ALL_NAVS) {
    const item = nav.find((i) => i.label === "Network");
    assert.ok(item, "no Network item");
    assert.ok(
      item.href === "#family" || item.href === "/network",
      `Network points at ${item.href}`,
    );
  }
});
```

- [ ] **Step 2: Run it to verify it fails**

```bash
npm test
```

Expected: FAIL, twice over. `./networkNavigation.ts` does not resolve, and once it does, the six existing navs still point `Network` at `/#network` or `#network`.

- [ ] **Step 3: Write `networkNavigation.ts`**

```ts
import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page: the reference design for this page invented its
// own item list, which would have made the nav change shape as you moved around
// the site. Only the targets differ. Network is the page you are already on, so
// it points at #family, the first of its own sections, the same way
// internationalNavigation points International Patient Care at #journey.
export const networkNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/#wellness" },
  { label: "Network", href: "#family" },
  { label: "Media", href: "/#media" },
  { label: "Careers", href: "/#career" },
];

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const networkFooterColumns: FooterColumn[] = [
  {
    heading: "Network",
    links: [
      { label: "Why it matters", href: "#matters" },
      { label: "The family of companies", href: "#family" },
      { label: "The numbers", href: "#reach" },
      { label: "Moving between us", href: "#referrals" },
      { label: "Get in touch", href: "#contact" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "All services", href: "/services" },
      { label: "Facilities", href: "/facilities" },
      { label: "Pharmacy", href: "/pharmacy" },
      { label: "Health tips", href: "/health-tips" },
    ],
  },
];
```

- [ ] **Step 4: Retarget `Network` in the six existing navs**

In each file below, change the `Network` item's `href` to `/network`:

- `src/config/homeNavigation.ts`: `{ label: "Network", href: "#network" }` becomes `{ label: "Network", href: "/network" }`
- `src/config/servicesNavigation.ts`: both occurrences, in `servicesNavigation` and `servicesDetailNavigation`
- `src/config/facilitiesNavigation.ts`
- `src/config/healthTipsNavigation.ts`
- `src/config/pharmacyNavigation.ts`
- `src/config/internationalNavigation.ts`

In `homeNavigation.ts`, add a comment above the item, matching the style of the ones already there for Facilities, Pharmacy and Health Tips:

```ts
  // And the same again for Network: the #network band stays on as the
  // four-node teaser, and the family of companies, the group figures and the
  // referral answers live on /network. A nav label has to mean the same thing
  // wherever it is clicked, so this points at the page here too, not at the
  // teaser directly below it.
  { label: "Network", href: "/network" },
```

Where a config's leading comment lists which items "point back at the matching section on the home page" (`servicesNavigation.ts` does), update it so Network is no longer named among them.

- [ ] **Step 5: Run the test to verify it passes**

```bash
npm test
```

Expected: PASS. All nav suites green, including the pre-existing "every page's nav carries the same labels in the same order".

- [ ] **Step 6: Commit**

```bash
git add src/config
git commit -m "feat(network): nav config, and retarget Network to /network

Network was a home page anchor on six navs. It is a page now, so every nav
reaches it, homeNavigation included: a label that scrolls on one page and
navigates on every other is exactly the drift navigation.test.ts exists to
catch, so the test now asserts the target rather than leaving it to review.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: Hero and jump cards

**Files:**
- Create: `src/features/network/components/NetworkHero.tsx`
- Create: `src/features/network/components/JumpCards.tsx`

**Interfaces:**
- Consumes: `heroFacts`, `tickerItems`, `jumpCards` from `../data/content`; `networkNavigation` from `@/config/networkNavigation`.
- Produces: `NetworkHero` and `JumpCards`, both taking no props. Task 8 renders both.

- [ ] **Step 1: Write `NetworkHero.tsx`**

Both components are Server Components. `ParallaxLayer` and `Ticker` are the client leaves.

The hero image is the dusk exterior render the reference uses, which is already in the repo as `public/images/services/exterior-dusk-a.png`. Check both `exterior-dusk-a.png` and `exterior-dusk-b.png` and pick whichever matches the reference's framing (the reference's asset is a 1155x839 three-quarter view of the lit facade with the ambulance under the canopy at lower left). If neither matches, extract the reference's own asset: it is the `image/png` entry keyed `85c9c743-083e-4a15-824f-107ceb6067d6` on line 378 of the bundle, base64 with a `compressed` flag, and it saves as `public/images/network/exterior-network.png`.

```tsx
import Image from "next/image";
import Link from "next/link";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Ticker } from "@/components/ui/Ticker";
import { networkNavigation } from "@/config/networkNavigation";
import { heroFacts, tickerItems } from "../data/content";

/**
 * `#top`: the dusk exterior behind the themed header and the page's only <h1>,
 * closed off by a fact strip and the ticker of the other eight companies.
 *
 * Accent colours here are literal rather than `var(--home-accent)`: this block
 * is fixed-dark in both themes because it sits on a photograph, and the light
 * theme swaps that token to a deep `#0B6FC0` that would sink into the image.
 * The reference solves the same problem with its `[data-fixed-dark]` blocks.
 *
 * Copy animates with `animate-sj-up` rather than `Reveal`, since it is already
 * in the first viewport and should not wait on an intersection observer.
 */
export function NetworkHero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[84vh] flex-col overflow-hidden bg-[#060B1F] max-[899px]:min-h-[76vh]"
    >
      <ParallaxLayer
        factor={0.14}
        maxOffsetPx={100}
        className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
      >
        <Image
          src="/images/services/exterior-dusk-a.png"
          alt="St. Joseph Hospital Negombo lit at dusk"
          fill
          priority
          className="animate-sj-burns object-cover"
          style={{ objectPosition: "50% 46%" }}
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(6,11,31,0.9) 0%, rgba(6,11,31,0.58) 44%, rgba(6,11,31,0.97) 100%)",
        }}
      />
      <div
        className="animate-sj-sheen absolute inset-0"
        style={{
          background:
            "radial-gradient(64% 50% at 78% 28%, rgba(44,166,240,0.32) 0%, rgba(6,11,31,0) 66%)",
        }}
      />

      <ThemedHeader navItems={networkNavigation} homeHref="/" bookHref="#contact" />

      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[1440px] gap-10 px-5 sm:px-8 lg:px-11">
        {/* Decorative vertical strapline, dropped below 900px where there is no
            gutter to spare. */}
        <div
          aria-hidden
          className="flex shrink-0 basis-11 flex-col items-center gap-4.5 pb-2.5 max-[899px]:hidden"
        >
          <span
            className="text-[11px] tracking-[0.3em] text-white/50 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Negombo to Los Angeles
          </span>
          <span className="w-px flex-1 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        <div className="flex-1 pb-11">
          <div className="animate-sj-up inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
            <span aria-hidden className="h-px w-11 bg-[#2CA6F0]" />
            <Link href="/" className="text-[#7FCBFF] hover:text-white">
              Home
            </Link>
            <span aria-hidden className="opacity-50">
              /
            </span>
            Our Network
          </div>

          <h1 className="font-display animate-sj-up mt-4.5 text-[clamp(42px,7vw,118px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            A hospital in
            <br />
            {/* Outlined rather than filled, so the three lines read as one
                phrase stepping from solid to hollow to accent. */}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.4px rgba(242,246,255,0.75)" }}
            >
              Negombo,
            </span>
            <br />
            <span className="text-[#2CA6F0]">backed from LA.</span>
          </h1>

          <div className="animate-sj-up mt-8 flex flex-col items-start gap-5.5">
            <p
              className="max-w-[54ch] text-[18px] leading-[1.6] text-white/82"
              style={{ textWrap: "pretty" }}
            >
              St. Joseph Hospital is operated by Kids &amp; Teens Medical Group, one of the largest
              paediatric groups in California. That is where the clinical protocols, the training
              and the second opinions come from.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#family"
                className="sj-invert inline-flex items-center gap-2.5 bg-[#2CA6F0] px-6 py-4 text-[15px] font-bold text-[#04122B]"
              >
                Meet the network <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="#matters"
                className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold whitespace-nowrap text-white transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                <span aria-hidden className="animate-sj-pulse h-2 w-2 rounded-full bg-[#2CA6F0]" />
                What it means for you
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-11 border-t border-white/14 bg-[#060B1F]/55">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-4 px-5 sm:px-8 lg:px-11 max-[899px]:grid-cols-2 max-[640px]:grid-cols-1">
          {heroFacts.map((fact, index) => (
            <div
              key={fact.k}
              className={`py-5.5 ${index === 0 ? "pr-6" : "px-6"} max-[899px]:px-0 max-[899px]:pr-6`}
            >
              <dt className="text-[11.5px] tracking-[0.16em] text-white/50 uppercase">{fact.k}</dt>
              <dd
                className={`font-display mt-1.5 text-[22px] font-bold tracking-[-0.02em] ${
                  index === 2 ? "text-[#2CA6F0]" : "text-white"
                }`}
              >
                {fact.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <Ticker items={tickerItems} />
    </section>
  );
}
```

- [ ] **Step 2: Write `JumpCards.tsx`**

```tsx
import { RevealStagger } from "@/components/ui/RevealStagger";
import { jumpCards } from "../data/content";

/**
 * `#jump`: four in-page shortcuts sitting directly under the hero. The hairline
 * between cards is the parent background showing through a 1px grid gap, so
 * there are no double borders where cards meet.
 *
 * Hover fills the whole card with the accent, per the reference. That is the
 * shared `sj-fill` utility: it carries the `* { color: inherit }` needed to
 * pull the three spans (each with its own explicit colour) onto the fill, it is
 * tokenised so the light theme fills with its own deeper accent, and it sits
 * behind `@media (hover: hover)` so a touch device does not latch a card into
 * the filled state.
 */
export function JumpCards() {
  return (
    <section id="jump" className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 lg:px-11">
      <RevealStagger
        stepMs={80}
        className="grid grid-cols-4 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {jumpCards.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="sj-fill flex flex-col gap-2.5 bg-[var(--home-bg)] px-6 py-6.5"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {card.count}
            </span>
            <span className="font-display text-[25px] leading-[1.04] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {card.label}
            </span>
            <span className="text-[14px] leading-[1.5] text-[var(--home-muted)]">{card.note}</span>
          </a>
        ))}
      </RevealStagger>
    </section>
  );
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both clean. These components are not rendered by a route yet, so there is nothing to view; Task 8 wires the page up and Task 8 is where the hero gets looked at.

- [ ] **Step 4: Commit**

```bash
git add src/features/network/components
git commit -m "feat(network): hero and jump cards

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: Matters section, org card, family section

**Files:**
- Create: `src/features/network/components/MattersSection.tsx`
- Create: `src/features/network/components/OrgCard.tsx`
- Create: `src/features/network/components/FamilySection.tsx`

**Interfaces:**
- Consumes: `mattersEyebrow`, `mattersHeading`, `mattersBody`, `practice`, `orgGroups` from `../data/content`; `Org` from `../types`.
- Produces: `MattersSection` and `FamilySection`, no props; `OrgCard({ org }: { org: Org })`. Task 8 renders `MattersSection` and `FamilySection`.

- [ ] **Step 1: Write `MattersSection.tsx`**

The accent panel is `--home-accent` filled with `--home-on-accent` text, so it works in both themes. Its own children inherit, so they do not each need a colour.

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { mattersBody, mattersEyebrow, mattersHeading, practice } from "../data/content";

/**
 * `#matters`: the argument for the page existing, in an accent-filled panel,
 * beside the five things the connection is said to change at the bedside.
 *
 * The `1.3fr / 0.7fr` split collapses to one column at 900px, as the
 * reference's `[data-r="feat"]` rule does. The hairline between the two panels
 * is the grid's own 1px gap showing the parent background through.
 *
 * Every line in the right-hand list is unverified copy. See PLACEHOLDER_NOTICE
 * in `data/content.ts`.
 */
export function MattersSection() {
  return (
    <section id="matters" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal className="grid grid-cols-[1.3fr_0.7fr] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-10.5 pt-11.5 pb-11 text-[var(--home-on-accent)]">
          <span className="text-[11.5px] font-bold tracking-[0.2em] uppercase opacity-68">
            {mattersEyebrow}
          </span>
          <h2 className="font-display mt-4 max-w-[24ch] text-[clamp(30px,3.8vw,54px)] leading-[0.94] font-extrabold tracking-[-0.035em] uppercase">
            {mattersHeading}
          </h2>
          <p className="mt-4.5 max-w-[56ch] text-[17px] leading-[1.62] opacity-86">{mattersBody}</p>
        </div>
        <div className="flex flex-col bg-[var(--home-bg)] px-7.5 py-8.5">
          <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
            In practice
          </span>
          <ul className="mt-4.5 flex flex-col gap-3.25">
            {practice.map((line) => (
              <li key={line} className="flex gap-3 text-[15px] leading-[1.55] text-[var(--home-body)]">
                <span aria-hidden className="text-[var(--home-accent)]">
                  &#10022;
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 2: Write `OrgCard.tsx`**

This carries the reference's whole `[data-org]` hover contract.

```tsx
import Image from "next/image";
import type { Org } from "../types";

/**
 * One group company.
 *
 * The reference's `[data-org]` hover is `translateY(-6px)` plus a
 * `rgba(44,166,240,0.1)` wash on a `0.35s / 0.45s cubic-bezier(0.2,0.8,0.2,1)`
 * transition, cancelled under `prefers-reduced-motion`. That is the shared
 * `sj-tint` utility exactly, down to `--home-accent-tint` already being that
 * colour, so no new CSS is needed here.
 *
 * The flagship marker is the reference's `[data-accent="1"]` rule: a 3px accent
 * inset along the top edge, drawn as an inset box-shadow rather than a border
 * so it does not change the card's box and shift the grid by a pixel.
 *
 * `min-h-[356px]` is the reference's figure. It keeps the hover CTA on the
 * baseline across a row of cards whose bodies differ in length, since `mt-auto`
 * pushes the CTA to the bottom of whichever card is tallest.
 *
 * The logo tile is one deliberate departure from the reference, which has no
 * logos at all: it renders a monogram (`SJH`, `KTMG`) on a
 * `rgba(242,246,255,0.12)` chip, filled solid accent for the flagship. Four of
 * the real marks carry dark or gold lettering on white and would be illegible
 * on either, so the chip is solid white in both themes and the flagship's
 * accent fill is dropped. The card-level accent inset still distinguishes the
 * two flagships.
 */
export function OrgCard({ org }: { org: Org }) {
  const inner = (
    <>
      {/* opacity lift on card hover, per the reference's [data-org-logo]. */}
      <span className="flex h-12 items-center gap-3 opacity-88 transition-opacity duration-[400ms] [@media(hover:hover)]:group-hover:opacity-100">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-white">
          <Image
            src={org.logo}
            alt=""
            width={144}
            height={144}
            className="h-full w-full object-contain"
          />
        </span>
        <span className="font-display block max-w-[150px] text-[15px] leading-[1.12] font-bold tracking-[-0.02em] text-[var(--home-heading)] uppercase">
          {org.wordmark}
        </span>
      </span>

      <span className="mt-5.5 text-[11px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
        {org.badge}
      </span>
      <span className="font-display mt-2.5 text-[24px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
        {org.name}
      </span>
      <span className="mt-2 text-[15px] leading-[1.5] font-semibold text-[var(--home-body)]">
        {org.tagline}
      </span>
      <span className="mt-2.5 text-[14.5px] leading-[1.58] text-[var(--home-muted)]">
        {org.body}
      </span>

      <span className="mt-4 flex flex-wrap gap-1.75">
        {org.chips.map((chip) => (
          <span
            key={chip}
            className="border border-[var(--home-hairline-strong)] px-2.75 py-1.75 text-[12px] font-semibold text-[var(--home-muted)]"
          >
            {chip}
          </span>
        ))}
      </span>

      {/* Hidden until the card is hovered, and only where hover is a real
          input: on a touch screen there is no hover to end, so an unguarded
          reveal latches visible after the first tap. Same pattern as
          features/health-tips/components/LibrarySection.tsx. */}
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[13.5px] font-bold text-[var(--home-accent-soft)] transition-[opacity,transform] duration-[450ms] motion-reduce:transform-none [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
        {org.cta} <span aria-hidden>&rarr;</span>
      </span>
    </>
  );

  const className = `sj-tint group flex min-h-[356px] flex-col bg-[var(--home-bg)] px-6.5 pt-7.5 pb-7 ${
    org.flagship ? "shadow-[inset_0_3px_0_0_var(--home-accent)]" : ""
  }`;

  // St. Joseph Hospital is this site, so its card is not a link out. Everything
  // else opens the company's own site in a new tab.
  if (!org.href) {
    return <div className={className}>{inner}</div>;
  }

  return (
    <a href={org.href} target="_blank" rel="noreferrer noopener" className={className}>
      {inner}
    </a>
  );
}
```

- [ ] **Step 3: Write `FamilySection.tsx`**

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { OrgCard } from "./OrgCard";
import { orgGroups } from "../data/content";

/**
 * `#family`: the nine group companies, in three named groupings.
 *
 * Sri Lanka comes first, then California, then the support companies. That is
 * the reference's order and it is deliberate: the reader's own hospital is the
 * first card they meet.
 *
 * Each grouping is its own `Reveal`, so the three arrive as you scroll rather
 * than all at once, and the grid drops to two columns at 1024px and one at
 * 640px, per the reference's `[data-r="orgs"]` rules.
 */
export function FamilySection() {
  return (
    <section id="family" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal className="flex flex-wrap items-end justify-between gap-10">
        <div>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            02 / The family
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Nine companies,
            <br />
            two continents
          </h2>
        </div>
        <p className="max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
          Paediatric and family care in California, hospital care and insurance in Sri Lanka, and
          the administrative companies that keep both running.
        </p>
      </Reveal>

      {orgGroups.map((group) => (
        <Reveal key={group.name} className="mt-13">
          <div className="flex flex-wrap items-baseline gap-4.5 border-b border-[var(--home-hairline)] pb-4">
            <span className="font-display text-[27px] font-bold tracking-[-0.03em] text-[var(--home-heading)]">
              {group.name}
            </span>
            <span className="text-[15px] leading-[1.5] text-[var(--home-muted)]">{group.note}</span>
          </div>
          <div className="mt-px grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1">
            {group.orgs.map((org) => (
              <OrgCard key={org.slug} org={org} />
            ))}
          </div>
        </Reveal>
      ))}
    </section>
  );
}
```

- [ ] **Step 4: Type-check and lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both clean.

- [ ] **Step 5: Commit**

```bash
git add src/features/network/components
git commit -m "feat(network): the matters section and the nine company cards

Card hover is the shared sj-tint utility, whose lift, wash, timing and
reduced-motion cancel already match the reference's [data-org] rule exactly.
The logo tile is white rather than the reference's translucent dark chip: four
of the real marks carry dark or gold lettering on white and would be illegible
on it.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: Numbers, referrals, contact

**Files:**
- Create: `src/features/network/components/ReachSection.tsx`
- Create: `src/features/network/components/ReferralSection.tsx`
- Create: `src/features/network/components/ContactSection.tsx`

**Interfaces:**
- Consumes: `reachRows`, `referrals`, `contactRows`, `disclaimer` from `../data/content`; `AccordionList` from `@/components/ui/AccordionList` (Task 2).
- Produces: `ReachSection`, `ReferralSection`, `ContactSection`, all with no props. Task 8 renders all three.

- [ ] **Step 1: Write `ReachSection.tsx`**

Fixed-dark, because it sits over a photograph. The photo is the ward round already in the repo at `public/images/international/ward-round.jpg`, which is the same asset the reference uses here.

```tsx
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { reachRows } from "../data/content";

/**
 * `#reach`: the group's published figures, over a ward round at 20% opacity.
 *
 * Fixed-dark in both themes, like the hero: the copy sits on a photograph, and
 * the light theme's deeper accent would sink into it.
 *
 * The left column is sticky through the nine rows on the right, and goes static
 * at 900px where the split collapses. The right-hand `who` column drops out at
 * 1024px, per the reference's `[data-r="reachwho"]` rule: at that width the
 * three columns crush the middle one.
 */
export function ReachSection() {
  return (
    <section id="reach" className="relative mt-26 overflow-hidden bg-[#08123A]">
      <ParallaxLayer factor={0.12} maxOffsetPx={90} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image
          src="/images/international/ward-round.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #060B1F 4%, rgba(6,11,31,0.9) 55%, rgba(6,11,31,0.76) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-23 sm:px-8 lg:px-11">
        <Reveal className="grid grid-cols-[0.85fr_1.15fr] items-start gap-14.5 max-[899px]:grid-cols-1 max-[899px]:gap-10">
          <div className="sticky top-10 max-[899px]:static">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              03 / The numbers
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.6vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              What the
              <br />
              network
              <br />
              adds up to
            </h2>
            <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.65] text-white/78">
              Figures as published by the group companies. We would rather show you a small honest
              number than an impressive vague one.
            </p>
          </div>

          <dl>
            {reachRows.map((row) => (
              <div
                key={row.k}
                className="grid grid-cols-[0.5fr_1fr_0.5fr] items-baseline gap-5.5 border-b border-white/16 px-1 py-5 max-[1023px]:grid-cols-[1fr_0.6fr] max-[899px]:grid-cols-1 max-[899px]:gap-y-1.5"
              >
                <dd className="font-display order-first text-[34px] leading-none font-extrabold tracking-[-0.04em] text-[#2CA6F0] tabular-nums">
                  {row.n}
                </dd>
                <dt className="text-[16px] font-bold text-white">{row.k}</dt>
                <dd className="text-right text-[13.5px] leading-[1.5] text-white/60 max-[1023px]:hidden">
                  {row.who}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
```

Note the `dl` ordering: a definition list must pair each `dt` with its `dd`, but the reference draws the number first. `order-first` on the figure keeps the visual order while the DOM stays `dd` after `dt` would be invalid, so put the `dt` first in the DOM and let `order-first` move the number. If lint or the HTML validator objects to the `dd` before `dt` ordering, use a plain `div` with `role="list"` instead rather than shipping invalid markup.

- [ ] **Step 2: Write `ReferralSection.tsx`**

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { AccordionList } from "@/components/ui/AccordionList";
import { referrals } from "../data/content";

/**
 * `#referrals`: seven answers about moving between the group's countries, in a
 * sticky-heading split.
 *
 * The rows are the shared `AccordionList`, which is also what `FaqAccordion`
 * renders. This section cannot use `FaqAccordion` itself because that component
 * brings its own full-width section and heading, and the reference puts the
 * rows beside a sticky column instead.
 *
 * Every answer here is unverified copy. See PLACEHOLDER_NOTICE in
 * `data/content.ts`.
 */
export function ReferralSection() {
  return (
    <section
      id="referrals"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal className="grid grid-cols-[0.85fr_1.15fr] items-start gap-14.5 max-[899px]:grid-cols-1 max-[899px]:gap-10">
        <div className="sticky top-10 max-[899px]:static">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            04 / Moving between us
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            One file,
            <br />
            wherever
            <br />
            you are
          </h2>
          <p className="mt-5 max-w-[38ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            Families in the group move between Los Angeles and Sri Lanka more often than you would
            think. Summer with grandparents, a semester back home, a parent posted abroad. The
            referral desk exists so nobody starts from a blank page.
          </p>
          <a
            href="#contact"
            className="sj-invert mt-6 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.75 text-[14.5px] font-bold text-[var(--home-on-accent)]"
          >
            Ask the referral desk <span aria-hidden>&rarr;</span>
          </a>
        </div>

        <AccordionList
          items={referrals}
          stepMs={45}
          className="flex flex-col border-t border-[var(--home-hairline)]"
        />
      </Reveal>
    </section>
  );
}
```

`AccordionList`'s rows carry their own `bg-[var(--home-bg)]`, and here the container supplies a top border with each row bordered below it, matching the reference's `border-top` on the list plus `border-bottom` per row. If the rows come out without their dividing lines, add `[&>*]:border-b [&>*]:border-[var(--home-hairline)]` to this `className` rather than editing the shared component.

- [ ] **Step 3: Write `ContactSection.tsx`**

```tsx
import { Reveal } from "@/components/ui/Reveal";
import { contactRows, disclaimer } from "../data/content";

/**
 * `#contact`: the accent panel and four rows that each invert on hover, then
 * the rights notice for the third-party marks used on this page.
 *
 * `sj-invert` is the shared utility for that hover, so the light theme inverts
 * to its own pair rather than to the reference's hard-coded `#F2F6FF`.
 *
 * The last row is an internal route, so it is a plain anchor like the rest: the
 * others are `tel:`, `mailto:` and an external site, and mixing next/link in
 * for one of four would make the row list read inconsistently for no gain.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal className="grid grid-cols-[1.15fr_0.85fr] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)]">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
            05 / Get in touch
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            Wherever
            <br />
            in the network
            <br />
            you start.
          </h2>
          <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">
            Patients, partner hospitals, insurers and institutions looking to work with the group:
            reach the hospital directly and we will route you to the right company.
          </p>
        </div>

        <div className="flex flex-col bg-[var(--home-bg)]">
          {contactRows.map((row, index) => (
            <a
              key={row.href}
              href={row.href}
              {...(row.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className={`sj-invert font-display flex flex-1 items-center justify-between gap-5 px-8 py-6.5 text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] ${
                index === contactRows.length - 1 ? "" : "border-b border-[var(--home-hairline)]"
              } ${row.glyph === "phone" ? "tabular-nums" : ""}`}
            >
              {row.label} <span aria-hidden>{row.glyph === "phone" ? "\u260E" : "\u2192"}</span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal>
        <p className="mt-4.5 max-w-[84ch] text-[13.5px] leading-[1.6] text-[var(--home-muted)]">
          {disclaimer}
        </p>
      </Reveal>
    </section>
  );
}
```

- [ ] **Step 4: Type-check and lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both clean.

- [ ] **Step 5: Commit**

```bash
git add src/features/network/components
git commit -m "feat(network): the numbers, referrals and contact sections

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: Wire up the page and the route

The first task that produces something viewable. This is where the reference gets compared side by side.

**Files:**
- Create: `src/features/network/components/NetworkPage.tsx`
- Create: `src/features/network/index.ts`
- Create: `src/app/network/layout.tsx`
- Create: `src/app/network/page.tsx`

**Interfaces:**
- Consumes: all seven section components from Tasks 5 through 7, `networkFooterColumns` from Task 4.
- Produces: `export { NetworkPage } from "./components/NetworkPage"` in `index.ts`, and the `/network` route.

- [ ] **Step 1: Write `NetworkPage.tsx`**

```tsx
import { NetworkHero } from "./NetworkHero";
import { JumpCards } from "./JumpCards";
import { MattersSection } from "./MattersSection";
import { FamilySection } from "./FamilySection";
import { ReachSection } from "./ReachSection";
import { ReferralSection } from "./ReferralSection";
import { ContactSection } from "./ContactSection";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { networkFooterColumns } from "@/config/networkNavigation";

// The network page in the reference's order: hero, jump cards, then the five
// numbered sections (why it matters, the family, the numbers, moving between
// us, get in touch) and the footer.
//
// ThemedFooter's own id is left at its default rather than pointed at
// #contact, because unlike the international care page this one has a real
// #contact section of its own.
export function NetworkPage() {
  return (
    <>
      <main>
        <NetworkHero />
        <JumpCards />
        <MattersSection />
        <FamilySection />
        <ReachSection />
        <ReferralSection />
        <ContactSection />
      </main>
      <ThemedFooter columns={networkFooterColumns} id="footer" />
    </>
  );
}
```

Read `ThemedFooter`'s signature before finalising the `id`: it defaults to `"contact"`, which would collide with `ContactSection`'s own `id="contact"`. Two elements sharing an id is invalid and breaks anchor navigation, so the footer must take a different one.

- [ ] **Step 2: Write `index.ts`**

```ts
export { NetworkPage } from "./components/NetworkPage";
```

- [ ] **Step 3: Write `src/app/network/layout.tsx`**

```tsx
import type { ReactNode } from "react";
import { ThemedShell } from "@/components/layout/ThemedShell";
import { FloatingActions } from "@/components/layout/FloatingActions";

// Same arrangement as the /international-care, /pharmacy and /facilities
// layouts: the header lives inside the hero and scrolls away with it rather
// than sticking, so flowHeader cancels the sticky-header anchor offset for
// every in-page anchor on this route.
//
// FloatingActions is a client leaf ('use client', its own scroll listener), so
// this layout stays a Server Component and only renders it. It has to sit
// inside ThemedShell: the --home-* tokens it reads are scoped to ThemedShell's
// [data-sj] root.
export default function NetworkLayout({ children }: { children: ReactNode }) {
  return (
    <ThemedShell flowHeader>
      {children}
      <FloatingActions />
    </ThemedShell>
  );
}
```

- [ ] **Step 4: Write `src/app/network/page.tsx`**

```tsx
import type { Metadata } from "next";
import { NetworkPage } from "@/features/network";

export const metadata: Metadata = {
  title: "Our Network | St. Joseph Hospital Negombo",
  description:
    "St. Joseph Hospital is operated by Kids & Teens Medical Group in Los Angeles, one of nine companies across two continents. What that connection changes about your care, and who else is in the family.",
};

export default function Page() {
  return <NetworkPage />;
}
```

- [ ] **Step 5: Build**

```bash
npm run lint
npm test
npm run build
```

Expected: all three pass, and the build output lists `/network` among the routes.

- [ ] **Step 6: Compare against the reference, side by side**

This is the step the whole plan exists for. Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000/network` beside the decoded reference. Walk the list:

- Hero: image drifts on scroll and slowly zooms; the three heading lines read solid, outlined, accent; the pulse dot animates on the second button; the fact strip's third value is accent; the ticker loops without a visible seam.
- Jump cards: four across, one hairline between them, each filling solid accent on hover with all three lines flipping colour.
- Matters: accent panel and dark list side by side at `1.3fr / 0.7fr`.
- Family: three groupings, nine cards, three columns. Hover a card: it lifts 6px, washes accent, and the CTA line fades up from below. St. Joseph and Kids & Teens carry the 3px accent line along their top edge. Every logo is legible on its white tile.
- Numbers: left column stays put while the nine rows scroll past; photo is faint behind them.
- Referrals: left column sticky; clicking a row opens it and closes any other; the `+` rotates.
- Contact: four rows each inverting on hover; the disclaimer sits below.

Then check the breakpoints, at 1280, 1160, 1024, 900 and 640: the nav collapses to the hamburger at 1160; the org and jump grids go two-up at 1024 and one-up at 640; the splits collapse and the sticky columns go static at 900; the `who` column disappears at 1024; the fact strip goes two-up at 900 and one-up at 640.

Then toggle the theme. The hero, ticker and numbers band stay dark in both. Everything else follows the tokens, and no text should be washing out.

Fix anything that does not match before committing. Note in the commit message anything that deviates on purpose.

- [ ] **Step 7: Commit**

```bash
git add src/features/network src/app/network
git commit -m "feat(network): the /network page

Layout, spacing, motion and hover behaviour are the reference's; the copy is the
reference's where ktdoctor.com/network backs it and is marked placeholder where
nothing does.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: Link the home page teaser through

The home page keeps its four-node `#network` accordion as a teaser. It should now offer a way to the full page.

**Files:**
- Modify: `src/features/home/components/NetworkSection.tsx`

**Interfaces:**
- Consumes: the `/network` route from Task 8.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Read the file and the sections around it**

```bash
grep -rn "href=\"/facilities\"\|href=\"/pharmacy\"\|href=\"/health-tips\"" src/features/home/components/
```

The home page's Facilities, Pharmacy and Health Tips teasers already link through to their full pages. Match whichever pattern they use, rather than inventing a new one. Read at least one of them in full before writing.

- [ ] **Step 2: Add the link**

In `NetworkSection.tsx`, add a link to `/network` in the same shape the sibling teasers use. If they wrap the heading, wrap the heading; if they add a labelled link beside the copy, do that. Keep the section's existing `id="network"` and its `10 / Network` eyebrow: the eyebrow numbers the home page's own bands and has nothing to do with this page's `02 / The family` numbering.

- [ ] **Step 3: Verify**

```bash
npm run lint
npm run build
npm run dev
```

Open `http://localhost:3000/` and scroll to the Network band. Confirm the link is there, matches its siblings, and lands on `/network`.

- [ ] **Step 4: Commit**

```bash
git add src/features/home/components/NetworkSection.tsx
git commit -m "feat(home): link the network teaser through to /network

Matches how the facilities, pharmacy and health tips teasers already reach their
full pages.

Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: Final verification

**Files:** none

- [ ] **Step 1: Full check**

```bash
npm run lint
npm test
npm run build
```

All three must pass. Paste the actual output when reporting; do not summarise it as "passing".

- [ ] **Step 2: Grep for em dashes across everything the branch touched**

```bash
git diff --name-only main...HEAD
```

Then, for each of those files, search all four encodings. A search for the bare character alone misses the entity-encoded forms:

```bash
grep -rn -e $'\u2014' -e '&mdash;' -e '&#8212;' -e '&#x2014;' src/features/network src/config/networkNavigation.ts src/app/network docs/superpowers/specs/2026-08-25-network-page-design.md docs/superpowers/plans/2026-08-25-network-page.md
```

Expected: no matches.

- [ ] **Step 3: Confirm no stale anchors remain**

```bash
grep -rn '#network' src/config src/features src/app
```

Expected: only `src/features/home/components/NetworkSection.tsx`'s own `id="network"`. No nav item should still target `/#network`.

- [ ] **Step 4: Check every outbound link resolves**

```bash
for u in acig.lk www.ktdoctor.com sgmdoctor.com laipt.org serendibhealthways.com pediatricafterhour.com humancompassmso.com myblockchainbpo.com; do printf '%s ' "$u"; curl -s -o /dev/null -w '%{http_code}\n' -L --max-time 20 "https://$u"; done
```

Expected: `200` for each. A `404` or a connection failure means a card is advertising a domain that does not answer, which should be reported rather than shipped quietly.

- [ ] **Step 5: Report, and stop**

Do not merge to main. Report what was built, paste the verification output, and name explicitly: the two blocks shipped behind `PLACEHOLDER_NOTICE`, the twelve-to-ten minutes correction, the white logo tile deviation, and any outbound domain that did not return 200. Wait for the user's decision on merging.

---

## Self-Review

**Spec coverage.** Every section of the spec maps to a task: the seven reference blocks to Tasks 5, 6, 7; the hover and motion table to Tasks 5, 6, 7 (and Task 8's Step 6 verifies it); content and the placeholder notice to Task 3; the `AccordionList` extraction to Task 2; logos to Task 1; data shapes to Task 3 Step 1; nav wiring to Task 4; the home teaser to Task 9; testing to Task 3, Task 4 and Task 10. The spec's "out of scope" list needs no task by definition.

**Placeholders.** No "TBD", no "add error handling", no "similar to Task N". Every code step carries the actual code. Three steps deliberately defer to what is on disk rather than pre-deciding it: Task 1 Step 6 (match `image-credits.md`'s real format), Task 5 Step 1 (pick the exterior render that matches the reference's framing), and Task 9 Step 2 (match the sibling teasers' link pattern). Each says what to read first and what to match, which is a check against the codebase, not a gap in the plan.

**Type consistency.** `Org.slug` is used as both the logo filename stem and the React key in Task 3, Task 6 and Task 3's test, consistently. `AccordionItem` is defined in Task 2, imported by `content.ts` in Task 3 for `referrals`, and consumed by `ReferralSection` in Task 7. `FaqItem` survives as an alias of `AccordionItem` so Task 2 breaks no existing consumer. `ContactRow.glyph` is the union `"phone" | "arrow"` in Task 3's types, is asserted in Task 3's test, and is switched on in Task 7. `networkNavigation` and `networkFooterColumns` are produced in Task 4 and consumed in Tasks 5 and 8. `reachRows` keys in Task 3's data match the keys the same task's test looks up by name.

**One risk worth flagging to the executor.** Task 7's `ReachSection` uses a `dl` with the `dd` visually first. The step says to fall back to `role="list"` if that ordering is invalid rather than shipping bad markup. Do not skip that judgement.
