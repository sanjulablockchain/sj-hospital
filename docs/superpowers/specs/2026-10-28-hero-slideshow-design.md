# Home hero slideshow, laboratory price list, network teaser

Date: 2026-10-28. Branch: `worktree-hero-slideshow`. Not to be merged until the owner says so.

Reviewed mockup: https://claude.ai/artifact/FKQKKbk7jyN7gQ2AsrRxgY (eight slides, lab teaser, lab page, network teaser). The owner approved it on 2026-10-28 and settled the four open claims (see "Claims the owner settled").

## Intent

The hospital's director wants the home hero to sell the hospital's concrete advantages instead of the motto. Each advantage gets its own slide, and the slide links to the page that backs it. Two of the advantages (the laboratory price list, the parent group) also need their own real estate: a lab teaser on the home page and a full price list page, and the parent group promoted to the top of the network page.

## Goals

1. The home hero becomes a slideshow of eight message slides, one per advantage, replacing the "To live is a privilege" heading. Each slide: kicker, heading, one paragraph, one or two buttons, its own photograph.
2. The Kids & Teens affiliation mark opens https://www.ktdoctor.com (new tab) everywhere it appears.
3. A laboratory teaser band on the home page, and a new `/laboratory-tests` page listing every test and price from the hospital's 2026 catalogue, imported by script from the Excel file.
4. On `/network`, a Kids & Teens teaser card sits at the top, directly under the hero and above the jump cards.
5. The facts the slides state are made consistent across the site (medicine delivery hours, insurance wording), each fact keeping one home.

## Non goals

- No redesign of other home bands, the e-channeling page or the school wellness page. The "why come to us" message is a hero slide that links to those pages; the pages are unchanged.
- No new photography. Every slide reuses a photograph already in `public/images`.
- The motto stays where it is set as a brand mark: the home `<title>`, the standards plaque, the footers. Only the hero heading goes.
- No autoplay video, no animation library, no third party carousel package.

## Anti goals (what would make this a failure)

- A hero that is slower to first paint than today. Only the first slide's photo is preloaded; the rest lazy load.
- A slide that states a figure a second time. Every price, count and hour is read from its one home (the catalogue data, `services/data`, `facilities/data`), never retyped into the slide copy.
- Translated hero copy. The register rule (`docs/superpowers/i18n-register-rule.md`) keeps hero sections entirely English in every locale. Slide copy is therefore English only; nothing in the slides goes into `content.si.ts` or `content.ta.ts` except what that rule already translates (nothing in the hero today but `photoAlt`).
- Dash punctuation anywhere in visible copy. `npm run check:dashes` must pass.
- Any slideshow behaviour that breaks under `prefers-reduced-motion`: it must hold the first slide and still allow manual navigation.

## Constraints (from CLAUDE.md, all binding)

Next.js 16 (read `node_modules/next/dist/docs/` before framework code), Server Components by default with `'use client'` only on the smallest leaf, Tailwind v4 utilities only, theme tokens only except in the fixed dark hero (brand literals as recorded in `HeroSection.tsx`), `next/image` for every image with `sizes`, mobile first checked at 375, 768 and 1280, tap targets 44px, `Reveal`/`ParallaxLayer`/`useParallax` for motion, every user facing string with its `.si.ts`/`.ta.ts` overlay where the register rule says it translates, Conventional Commits, `npm run lint`, `npm test`, `npm run check` and `npm run build` green before done.

## Claims the owner settled (2026-10-28)

| Claim | Decision | Where it changes the site |
|---|---|---|
| Medicine delivery 24/7 | Say 24/7 | `services/data/atHome.ts` medicine-delivery `hours`, `facts[0]`, `strip` and `body2` say 24 hours instead of "Daily", with the `.si.ts`/`.ta.ts` overlays for the prose. |
| Patient transport 24/7 | Say it, as the hospital's own ambulance for emergencies and transfers | Already backed by `facilities/data/content.ts` (`ambulanceIntro1`). No change. |
| The only digital X-ray in Negombo | Say "only" | The about page's "one of the latest in the industry" stays as is (it is not contradicted). The slide says "the only digital X-ray in Negombo". |
| Money goes to schools | Say exactly: all the money goes to local schools and children | Slide copy only. The school wellness page is unchanged. |
| Insurance | All insurers accepted, cashless available | Slide copy, plus `components/layout/chromeCopy.ts` `bookFooter` ("Corporate insurance accepted at the OPD" becomes "All insurance accepted at the OPD, cashless available") and its overlays. The about page's "first hospital in Negombo to offer corporate insurance acceptance at our OPD" is a historical first and stays. |
| Lowest lab price | 350 LKR | Derived from the catalogue data at build time, never typed. The one 0 LKR row (Hepatitis B profile) is treated as unpriced: see "Catalogue import". |

## Part 1: the hero slideshow

### Content (`features/home/data/content.ts`)

`hero` is replaced by `heroSlides`, an array of eight. The old `heroSlides.ts` (three photographs of the building) and its test are deleted; the building photographs stay on disk for other pages that use them, and any that nothing else uses are deleted too (check with grep before deleting).

```ts
export type HeroSlideContent = {
  id: string;            // "free-opd", structural, the React key and the dot's aria label suffix
  kicker: string;        // English, hero register
  heading: { lead: string; accent: string }; // accent is the part drawn in --home-accent
  body: string;          // English, hero register
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  photo: string;         // /images/...
  photoAlt: string;      // English on every slide (the register rule's exception for the first slide's alt is dropped with the old hero)
  positionClass: string; // object-position for object-cover, as the old heroSlides.ts carried
};
```

The eight slides, in this order, with copy as reviewed in the mockup (the builder may tighten a sentence but not change a fact or add a figure that has a home elsewhere):

| # | id | kicker | heading (lead / accent) | body | primary | secondary | photo |
|---|---|---|---|---|---|---|---|
| 1 | free-opd | A first for Sri Lanka | Seeing a doctor / costs you nothing. | Consultations at our outpatient department are free, every hour we are open. Walk in and see a doctor, and never weigh a fever or a week of pain against the money. | See the free OPD → /services/outpatient-department | Call 0117 84 84 84 → tel:+94117848484 | /images/home/free-opd-doctor.jpg |
| 2 | medicine-delivery | Medicine delivery, 24/7 | Your medicine, at your door, / any hour. | Send a photo of your prescription. A pharmacist checks it, and it leaves our own counter for anywhere in Negombo, day or night. | Send a prescription → /services/medicine-delivery | | /images/services/heroes/medicine-delivery.jpg |
| 3 | patient-transport | Patient transport, 24/7 | Our ambulance comes to you, / around the clock. | Our own ambulances are on call at every hour, for emergencies and for transfers, dispatched from the covered bay at our door. | Call 0117 84 84 84 → tel:+94117848484 | Ambulance and transfers → /facilities#ambulance | /images/services/heroes/accident-emergency.jpg |
| 4 | digital-xray | Only in Negombo | The only / digital X-ray in Negombo. | Films read within the hour and straight onto your file, with ultrasound beside it, at every hour of the day. | Radiology and digital X-ray → /services/radiology | | /images/services/heroes/radiology.jpg |
| 5 | laboratory | Laboratory | The best equipment. / The lowest prices. | {count} tests, most reported the same day and every report checked by two doctors. Tests from {fromPrice} LKR onwards. | See every test and price → /laboratory-tests | Book a test → /services/laboratory | /images/services/heroes/laboratory.jpg |
| 6 | channeling | Why come to us? | Your visit looks after / the whole town. | Book a consultant here and all the money goes back into our Wellness Centers in local schools, and the children in them. Does any other hospital do this? | Book a consultation → /e-channeling | Our school programme → /school-wellness | /images/school-wellness/assembly.jpg |
| 7 | insurance | Insurance | We accept / all insurance. | Every insurer, personal or corporate, at the OPD and on the wards. Bring your policy and the billing desk does the paperwork with you. | Ask the billing desk → /contact-us | | /images/doctors.jpg |
| 8 | cashless | Cashless care | Does any other hospital / do this? | A free consultation. Cashless admission, so nobody waits on money while they are ill. Reports read twice, surfaces cleaned every two hours, and a doctor who explains before you leave. We treat the human spirit. | How we care for you → /about-us | | /images/welcome.jpg |

Slide 5's `{count}` and `{fromPrice}` are templates filled by the component from the laboratory catalogue (`features/laboratory`'s exported `labCatalogueSummary`), the same `{count}` pattern `quickAccess.facilities.bodyTemplate` already uses. Format `fromPrice` with a thousands separator (`toLocaleString("en")`), as the existing "10,000 LKR" ticker item does.

The phone number inside two button labels is a structural fact, the same one `HeroSection.tsx` already prints; keep the `tel:+94117848484` href as the one source and render the label from a shared constant rather than typing the digits in the data twice (the builder picks where the constant lives; `contact/data/content.ts` already owns the phone facts).

The `statTickerItems` ticker under the hero stays as it is.

### Translation

Hero copy is English in every locale per the register rule, so `content.si.ts` and `content.ta.ts` drop their `hero.photoAlt` entries and add nothing for `heroSlides`. `src/lib/i18n/registerPolicy.ts` lists the hero roots (`hero`, `heroStandfirst`, `heroFacts`); `heroSlides` is added there, or the home parity test will demand Sinhala for every kicker, body and CTA. `content.i18n.test.ts` currently requires `content:hero.photoAlt` to be translated; that rule is removed, and `heroSlides[*].photoAlt` is excluded like every other `photoAlt`. The `i18n-register-audit` script and `overlayRegister.test.ts` must stay green.

### Behaviour (`features/home/components/HeroSection.tsx` and a new client leaf `HeroSlideshow.tsx`)

- `HeroSection` stays a Server Component: the band, the gradient and sheen overlays, the vertical location rail, the affiliation mark, and the ticker. It renders `HeroSlideshow` (a `'use client'` leaf) with the localized slides and the lab summary already filled in as props. No data file is imported in the client leaf.
- `HeroSlideshow` owns the active index. Photo layers mount on demand, not all at once: the first slide's photo renders on the server with `preload`; every other slide's photo is mounted only once it has been active or is next in line, so a phone on a slow network downloads one hero photo at first paint, not eight (the old background mounted all three; the slow-network rule in CLAUDE.md wins over that). Layers crossfade by opacity over 1600ms, and each layer's Ken Burns animation is started with a negative `animation-delay` equal to the time since the slideshow mounted, modulo the keyframe duration, so a fade between two frames still reads as one continuous shot. The copy block for the active slide fades and rises in (`animate-sj-up` or an equivalent opacity/translate transition), the previous one fades out. Photo and copy change together.
- Auto advance every 7 seconds (`HERO_SLIDE_INTERVAL_MS` stays as the constant's name). Pauses while the pointer is over the hero, while focus is inside it, and while the tab is hidden (`visibilitychange`). Resumes on leave/blur. Under `prefers-reduced-motion` the timer never starts and the first slide holds; manual controls still work.
- Controls, in a row along the foot of the copy block, above the ticker: one dot per slide (`role="tablist"`, each a 44px tap target with an `aria-label` "Slide n of 8: {kicker}"), a "01 / 08" counter in tabular numerals, and previous/next arrow buttons (44px, `aria-label`). Left and right arrow keys move when focus is inside the hero. Swiping on touch is a nice to have, not required.
- The active slide's copy is the only one in the accessibility tree: inactive slides are `aria-hidden` and `inert` (or unmounted copy with the photo kept). The band is `aria-roledescription="carousel"` with an `aria-live="polite"` region announcing the slide heading on change.
- The page keeps exactly one `<h1>` in the DOM at any time: the heading element of the visible slide. Do not render the first slide's heading as `<h1>` and the others as `<h2>`, since the `<h1>` would then disappear on rotation.
- Only the first slide's `next/image` gets `preload`; the others lazy load with `sizes="100vw"`, as today. Parallax drift on the photo stack stays (`useParallax(0.16, 130)` as today).
- Layout is the existing hero's: the copy block bottom aligned, heading at `clamp(44px, 7.4vw, 120px)` (smaller than today's 152px maximum, since eight headings of two lines must fit under the affiliation mark at 375px without pushing the controls below the fold), body at 18px, buttons as today's bordered pill (secondary) plus an accent filled one (primary, `bg-[var(--home-accent)] text-[var(--home-on-accent)]`). Fixed dark literals as recorded in the file.
- At 375px: the mark, kicker, heading, body, one or two buttons and the control row must all fit in the hero's `min-h-[calc(100vh-120px)]` without clipping on the longest slide (8). If they do not, the body text drops to 16px under `sm:` and the heading's minimum to 40px, in that order.

### Tests

- `heroSlides.test.ts` is rewritten against `content.heroSlides`: eight slides; unique ids and photos; every photo on disk; every `href` either a `tel:` or a route that resolves (routes checked against the `STATIC_PATHS` list in `app/sitemap.ts` plus `/services/<slug>` in the catalogue, plus `#` fragments on those pages); every slide has a `positionClass` with `object-[`; no slide body contains a digit followed by `%` or a `LKR` price typed by hand except through the `{fromPrice}` template (the same guard `bands.test.ts` applies to the free OPD band); slide 5 contains both templates.
- `bands.test.ts`'s free OPD guard stays.

## Part 2: the affiliation mark

`components/layout/AffiliationMark.tsx`: `AFFILIATION.href` becomes `https://www.ktdoctor.com` and the component renders an `<a target="_blank" rel="noopener noreferrer">` instead of `LocaleLink`, with a visually hidden "(opens in a new tab)" suffix for screen readers. The hover colour and layout are unchanged. The comment at the top is updated (it currently says the mark links to `/network#family`). The home network accordion's own link for the Los Angeles parent is not this component and is unchanged.

## Part 3: the laboratory catalogue

### Catalogue import

A new script `scripts/import-lab-catalogue.mjs` reads an `.xlsx` path given on the command line (the owner keeps the master at `C:\Users\User\Documents\Designs\sj-hospital\Data\Laboratory Tests Catalogue.xlsx`; the file is NOT committed) and writes `src/features/laboratory/data/catalogue.ts`, a generated, committed TypeScript module. The script is listed in `package.json` as `lab:import`. It needs an xlsx reader: add `xlsx`-free parsing by unzipping the sheet XML with Node's built in `zlib` and a small parser, OR add a well maintained dev dependency (`exceljs` or `xlsx`), the builder's call; keep `npm run check:audit` clean (it only audits production dependencies, so a dev dependency is fine).

Each row becomes:

```ts
export type LabTest = {
  code: string;        // "G2512", as printed, trimmed
  name: string;        // Title case from the sheet's uppercase, with known abbreviations kept uppercase: FBC, FBS, RBS, UFR, CRP, TSH, ALT, AST, SGOT, SGPT, HB, PCV, BSS, ABST, AFB, FNAC, IgM, IgG, eGFR, HIV, HBsAg and any other all-caps token of 2 to 5 letters inside parentheses
  container: string;   // cleaned free text, see "Catalogue cleaning": the sheet has about 35 variants including combinations and patient instructions ("EDTA tube, 10 to 12 hours fasting"), which must reach the reader
  turnaroundDays: number; // 1, 2, 3, 4, 7, 10, 14, 21 (the sheet's "0ne day", "One days", "Ten to fourteen days" etc. map to a number; a range maps to its upper bound; "Monday" maps to 7 with a comment)
  price: number | null;   // LKR, null when the sheet has 0 or blank
};
export const labTests: readonly LabTest[];
export const labCatalogueSummary: { count: number; fromPrice: number; sameDayCount: number; year: 2026 };
```

The generated file carries a header comment naming the source workbook and the import date, and the import is deterministic (sorted by the sheet's row order, which is what the hospital prints). The script normalises double spaces, the "0ne"/"One days" variants, and trailing spaces; it fails loudly on an unknown turnaround phrase rather than guessing.

`fromPrice` is the minimum of the non null prices (350 today). `sameDayCount` is the count with `turnaroundDays === 1` (217 today).

### Catalogue cleaning (settled after the builder check, 2026-10-28)

The sheet is a working document, not print ready: it has spelling slips (NEUCLEAR, HEPATITS, COMPLIMENT, HELICOBACTOR), reference-lab and internal markers inside names ("- LH", "(GENE LAB)", "(OPD)", "(BACTEC)", "LANKA"), a corporate medical package that is not a test ("CSR MEDICAL (BOI KATUNAYAKE)"), and a few tests listed twice (Vitamin B12 under code 10134 at two prices and two turnarounds; ANA under 10049 and NIGHT002; histology large under 10097 and 10180; BSS and thrombin time twice). The importer therefore has two parts:

1. **A pure transform** of every row: trim, collapse double spaces, map the turnaround phrase to a number (fail loudly on an unknown phrase), convert the uppercase name to sentence case with the abbreviation list kept uppercase, replace " - " and " / " used as punctuation inside a name with a comma or parentheses, and clean the container text to sentence case with the patient instruction kept ("EDTA tube, 10 to 12 hours fasting", "EDTA tube, on ice").
2. **A hand maintained overrides file**, `src/features/laboratory/data/overrides.ts`, keyed by the sheet's row (code plus the raw name, since a code repeats), that the importer applies after the transform and that survives every re-import. Each entry is one of: `{ name: "Antinuclear antibody (ANA/ANF)" }` to replace the display name; `{ exclude: true, reason: "corporate package, not a test" }` to drop the row; `{ note: "Night service" }` to add a short qualifier shown after the name. The builder fills it for the obvious cases above (spelling slips, stripped markers, the package row) and leaves every genuine duplicate in, distinguished by its turnaround or note, since the hospital charges both prices. The importer prints a warning for any override whose key no longer matches a row, so a renamed row in the next sheet cannot silently lose its correction.

The owner reviews the published list once it is up (the branch is not merged until then), and that review is where a duplicate gets dropped or a medical spelling gets corrected further; the overrides file is where that lands. `catalogue.test.ts` pins: no name is all uppercase, no name contains "( " or " )" or a lone " - ", no excluded row ships, every override key matches a row.

`laboratory.featuredCodes` on the home teaser may carry a short `label` per entry ("CRP", "Dengue IgM and IgG") used in place of the catalogue name on the tile; the price always comes from the catalogue.

A test `catalogue.test.ts` pins: every test has a non empty code and name; codes are unique or, where the sheet repeats one, the duplicate is recorded in the test with a comment (check during import; there may be a few); `fromPrice` is the minimum positive price; no name contains a dash used as punctuation (" - " inside a name such as "FNAC - SLIDE ONLY" is rewritten by the importer to "FNAC, slide only" or "FNAC (slide only)", since `check:dashes` scans every string under `src`).

### The page `/laboratory-tests`

New feature folder `features/laboratory/` with `components/`, `data/` (`catalogue.ts` generated, `content.ts` + `.si.ts` + `.ta.ts` for the page copy, `getContent.ts`), `index.ts` (exports `LaboratoryPage`, `labTests`, `labCatalogueSummary`), and the route `app/[locale]/laboratory-tests/{layout,page}.tsx` following the pharmacy route pair exactly (ThemedShell brand palette, solid header, utility bar, FloatingActions, metadata through `getPageMetadataEntry(locale, "laboratoryTests")`, alternates through `localeAlternates`).

Page order:

1. Hero, fixed dark like the pharmacy hero: strapline "Laboratory price list", breadcrumb Home / Laboratory tests, heading "Every test. / One honest price." (lead / accent), standfirst "Our laboratory runs at every hour, most reports come back the same day, and every report is read by two doctors before it reaches you. Here is every test we run and what it costs, from {fromPrice} LKR." Fact strip: Tests {count}; From {fromPrice} LKR; Same day {sameDayCount}; OPD discount 10% (the 10% is read from the laboratory service entry in `services/data/diagnostics.ts`, not typed). Ticker of the eight common tests (see teaser) with prices. Photo: `/images/services/heroes/laboratory.jpg`.
2. The list: a client leaf `LabTestTable.tsx` receives `labTests` as a prop. Controls in one row: a search box (filters on name and code, case insensitive, matches as you type, with a "No test matches" empty row), and a turnaround segmented control (All / Same day / 2 to 4 days / A week or more). Columns: Test, Sample, Report in, Price (LKR), prices right aligned in tabular numerals, "On request" where price is null. The table is a real `<table>` from 640px; below that each row renders as a stacked card (name, then the three facts as label/value pairs) so nothing scrolls sideways. The whole list renders server side on first paint (no empty state on load); the client leaf only filters. A results count "Showing n of {count}" sits above the table. Search and filter labels are chrome and stay English; the empty state sentence translates.
3. "How it works" band reusing the four `steps` the laboratory service entry already carries (Book, Sample, Process, Collect), read from `services/data/diagnostics.ts` through the services feature's public surface rather than copied.
4. A closing rail with "Book a test" → `/services/laboratory` and the phone, in the pharmacy page's BookSection pattern.

Navigation: add "Laboratory tests and prices" → `/laboratory-tests` to the Diagnostics column of the services mega menu (`config/megaNavigation.ts`), to the services page's footer columns next to "Laboratory services", and to `STATIC_PATHS` in `app/sitemap.ts`. Add `laboratoryTests` to `config/pageMetadata.ts` and its `.si.ts`/`.ta.ts` (title English, description translated). The `/services/laboratory` service page gets a link to the price list: add a `priceListHref` to that one service entry if the `Service` type has no such field, rendered as a second CTA on the service detail page; the builder may instead add the link to the service's `faq` answer about cost. Keep it to one visible link.

### The home teaser band (`features/home/components/LaboratorySection.tsx`)

A new band directly after `FreeOpdSection` and before `CommunitySection`, in the pharmacy band's visual pattern (sky card, eyebrow, display heading, body, two pill buttons) with, on the right, a two column grid of eight tiles: price in display numerals over the test name. The eight tests are chosen by code in `content.ts` (`laboratory.featuredCodes`: FBC 10073, FBS G2311, UFR G2512, lipid profile G2333, creatinine and eGFR G4029, CRP G4000, TSH G4002, dengue IgM IgG G2541) and the names and prices come from `labTests`, so a price change in the catalogue changes the band. A test in `patientCareTiles.test.ts`'s style asserts every featured code exists in the catalogue.

Copy (`content.ts`, `laboratory`): eyebrow "Laboratory"; heading "The best equipment, / at the lowest prices." (line1 / accent line2); `bodyTemplate` "{count} tests, most back the same day, every report read by two doctors, and prices set for Negombo. Tests from {fromPrice} LKR onwards."; `ctaPrimary` "See all tests and prices" → `/laboratory-tests`; `ctaSecondary` "Book a test" → `/services/laboratory`. The body translates in `.si.ts`/`.ta.ts` (prose); eyebrow, heading and CTAs stay English.

## Part 4: the network teaser

`features/network/components/ParentTeaser.tsx`, a Server Component rendered between `NetworkHero` and `JumpCards` in `NetworkPage.tsx`. It takes the Kids & Teens `Org` from `orgGroups` (found by slug `kids-and-teens`, with a test that it exists) so the logo, name, body and chips have one home, plus a new `parentTeaser` block in `network/data/content.ts`: `eyebrow` "Our parent, Los Angeles", `cta` "Visit ktdoctor.com" (English), and `note` (prose, translated): "Everything on this site is run to the protocols of the group that operates this hospital. Their own site has the clinics, the doctors and the care they give in California." Layout: a full width accent tinted panel (`--home-accent-tint` background, `--home-accent` 1px border), logo on a white chip at 64px, text beside it, chips row, the CTA as an external link (`target="_blank" rel="noopener noreferrer"`). Stacks logo above text under 640px. `Reveal` on scroll. The family section's own Kids & Teens card is unchanged.

`network/data/content.test.ts` and `content.i18n.test.ts` extend to the new block.

## Part 5: facts made consistent

- `services/data/atHome.ts` medicine delivery: `hours` "24 hours", `facts[0].v` "24 hours", `strip` gets a "Hours / 24 hours" cell in place of one of the four (the builder picks which; keep four), and `body2`'s "orders run daily" becomes "orders go out at any hour". Overlays updated for the prose. Any test pinning "Daily" is updated.
- `components/layout/chromeCopy.ts` `bookFooter`: "Free OPD consultation. All insurance accepted, cashless available." with overlays.
- `config/pageMetadata.ts` `home.description` keeps its text (it already names free OPD, digital X-ray and the lab).

## What is left to the builder

- Exact Tailwind classes, transition timings inside the ranges above, and whether `HeroSlideshow` keeps inactive copy mounted (`inert`) or unmounts it.
- The xlsx parsing approach and the title case function.
- How `services/[slug]` surfaces the price list link.
- `hero-night-gate.jpg` is the only building photograph nothing else uses (the other two are in `announcement.ts`); delete it with the old `heroSlides.ts`.
- The order of commits, provided each is focused and conventional: suggested `feat(home): hero slideshow`, `feat(layout): affiliation mark opens ktdoctor.com`, `feat(laboratory): catalogue import and price list page`, `feat(home): laboratory teaser band`, `feat(network): parent group teaser`, `fix(services): medicine delivery runs 24 hours`, `fix(layout): insurance line in the booking footer`.

## Verification before reporting done

`npm run lint`, `npm test`, `npm run check`, `npm run build`, `npm run i18n:status` (new overlays listed as awaiting review, which is expected), then a visual pass of `/`, `/laboratory-tests`, `/network` and `/services/laboratory` at 375, 768 and 1280 in both themes, with the dev server restarted inside the worktree first. Report, then wait for the owner before merging.
