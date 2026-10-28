# Home Hero Slideshow, Laboratory Price List and Network Teaser Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home hero's motto with an eight slide slideshow of the hospital's advantages, add a laboratory price list (home teaser plus a `/laboratory-tests` page generated from the hospital's Excel catalogue), promote the parent group to the top of `/network`, point the affiliation mark at ktdoctor.com, and align the medicine delivery and insurance facts the slides state.

**Architecture:** Every slide, tile and table row reads from one data home (`features/home/data/content.ts`, the generated `features/laboratory/data/catalogue.ts`, `features/network/data/content.ts`, `services/data`), and Server Components hand already localized slices to three small `'use client'` leaves (`HeroSlideshow`, `LabTestTable`, and the existing parallax hook). A dependency free Node script turns the Excel workbook into a committed TypeScript module, with a hand maintained overrides file that survives re-imports.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, `node --test`, Node 24 (type stripping, so scripts may import `.ts` data files).

**Spec:** `docs/superpowers/specs/2026-10-28-hero-slideshow-design.md`

## Global Constraints

- Branch `worktree-hero-slideshow` in `.claude/worktrees/hero-slideshow`; never merge; report and wait.
- No em dash, en dash or " - " as punctuation in any visible string, in any language, in docs or commits (`npm run check:dashes`).
- Colours through `--home-*` tokens only, except the fixed dark hero bands, which keep the literals already recorded in `HeroSection.tsx`, `PharmacyHero.tsx` and `NetworkHero.tsx` (`#0B0826`, `rgba(12,8,38,…)`, `#9FD6F5`, `rgba(82,181,232,0.34)`).
- `next/image` only, with `sizes`; `preload` (not `priority`) on the one above the fold image; raster images under 300 KB.
- Server Components by default; `'use client'` only on `HeroSlideshow.tsx` and `LabTestTable.tsx` (plus the existing hooks); no data file imported in a client leaf.
- Register rule: hero copy (kicker, heading, standfirst, fact chips, hero CTAs), section eyebrows, display headings, card titles, CTA and link labels, filter controls and page `<title>` stay English in every locale; body prose, FAQ, form text and page descriptions get `.si.ts` / `.ta.ts` overlays with `export const __review = { status: "draft", reviewer: null, date: null } as const;`.
- Every new overlay file must be imported by a test (`overlayCoverage.test.ts` fails otherwise).
- Mobile first; verify at 375, 768 and 1280; tap targets 44px; no horizontal scroll; both themes.
- Conventional Commits with the feature scope; each task commits; end every commit message with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Before claiming done: `npm run lint`, `npm test`, `npm run check`, `npm run build` all green.

## Review Focus

1. A reader on a 375px phone with the longest slide (8, "cashless") active: the mark, kicker, heading, body, button and control row must all be visible without clipping inside `min-h-[calc(100vh-120px)]`. Pinned by the visual step in Task 5 and the heading clamp values there.
2. `prefers-reduced-motion`: the slideshow must hold slide 1 and still answer the dots and arrows. Pinned by the `useHeroSlideshow` test in Task 5.
3. A catalogue row whose turnaround phrase is new in next year's sheet: the importer must stop with the phrase in the error rather than publish a wrong number. Pinned by the `turnaroundDays` test in Task 1.
4. A search string with regex characters ("C3 (complement)") or leading spaces in the lab table must filter by plain substring, never throw. Pinned by the `filterTests` test in Task 3.
5. A `heroSlides` href that points at a page section that does not exist (`/facilities#ambulanse`): the test must fail, not the user. Pinned by the route resolution test in Task 5.

---

### Task 1: Catalogue importer, generated data, overrides

**Files:**
- Create: `scripts/import-lab-catalogue.mjs` (the Node entry point; it imports the pure rules below so the rules can be unit tested under `src`)
- Create: `src/features/laboratory/data/importRules.ts`, `importRules.test.ts`, `overrides.ts`, `catalogue.ts` (generated), `summary.ts`, `catalogue.test.ts`
- Modify: `package.json` (add script `"lab:import": "node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/import-lab-catalogue.mjs"`)

**Interfaces:**
- Produces, in `importRules.ts`:
  - `export type LabTest = { code: string; name: string; note?: string; container: string; turnaroundDays: number; price: number | null }`
  - `export type RawRow = { code: string; name: string; container: string; turnaround: string; price: string | number | null }`
  - `export const TURNAROUND_DAYS: Readonly<Record<string, number>>` keyed by lowercased, whitespace collapsed phrase: `"one day": 1, "0ne day": 1, "one days": 1, "two days": 2, "three day": 3, "three days": 3, "four days": 4, "seven days": 7, "seven to ten days": 10, "ten to fourteen days": 14, "fourteen days": 14, "twenty one days": 21, "monday": 7`
  - `export function turnaroundDays(phrase: string): number` (throws `Error("Unknown turnaround phrase: …")`)
  - `export function sentenceCaseName(raw: string): string` (collapse spaces; lowercase; capitalise the first letter; restore tokens in `KEEP_UPPER` to their canonical spelling, matched case insensitively on word boundaries; rewrite `" - "` and `" / "` inside a name to `", "`; close up `"( "` and `" )"`)
  - `export const KEEP_UPPER: readonly string[]` starting list: `FBC FBS RBS UFR CRP TSH ALT AST SGOT SGPT Hb PCV BSS ABST AFB FNAC IgM IgG IgA IgE eGFR HIV HBsAg ESR LDH LH FSH PSA HbA1c CEA AFP ANA ANF PT INR APTT VDRL TPHA HCV HBV CMV EBV TB PCR DNA RNA ECG B12 D3 T3 T4 FT3 FT4 C3 C4 ASO CK CPK GGT ALP BUN HPLC HPV RPR HSV WBC RBC G6PD Rh OPD CSF` (extend while reviewing the generated output)
  - `export function cleanContainer(raw: string): string` (sentence case; `"Sterlized"`/`"Sterilized"` to `"Sterilised"`; `"Eube"` to `"tube"`; `" / "` to `", "`; `"10- 12 hrs Fasting"` to `", 10 to 12 hours fasting"`; `"with ice"` to `", on ice"`)
  - `export function priceOf(value: string | number | null): number | null` (0, blank, non numeric to `null`)
  - `export function overrideKey(code: string, rawName: string): string` returning `` `${code.trim()}|${rawName.trim().replace(/\s+/g, " ")}` ``
  - `export function applyRules(rows: RawRow[], overrides: Record<string, LabOverride>): { tests: LabTest[]; unusedOverrideKeys: string[] }`
- Produces, in `overrides.ts`: `export type LabOverride = { name?: string; note?: string; exclude?: true; reason?: string }` and `export const labOverrides: Record<string, LabOverride>`
- Produces, in `catalogue.ts` (generated): `export const LAB_CATALOGUE_YEAR = 2026;` and `export const labTests: readonly LabTest[]`
- Produces, in `summary.ts`: `export type LabCatalogueSummary = { count: number; fromPrice: number; sameDayCount: number; year: number }`, `export function summarise(tests: readonly LabTest[], year: number): LabCatalogueSummary`, `export const labCatalogueSummary: LabCatalogueSummary`

- [ ] **Step 1: Write the failing rule tests** in `src/features/laboratory/data/importRules.test.ts`

```ts
test("every turnaround phrase in the 2026 sheet maps to a day count", () => {
  assert.equal(turnaroundDays("0ne day"), 1);
  assert.equal(turnaroundDays(" One  days "), 1);
  assert.equal(turnaroundDays("Ten to fourteen days"), 14);
  assert.equal(turnaroundDays("Twenty one days"), 21);
  assert.throws(() => turnaroundDays("Next week"), /Unknown turnaround phrase: Next week/);
});
test("names come out in sentence case with abbreviations kept", () => {
  assert.equal(sentenceCaseName("C- REACTIVE PROTEIN ( CRP )"), "C reactive protein (CRP)");
  assert.equal(sentenceCaseName("FNAC - SLIDE ONLY"), "FNAC, slide only");
  assert.equal(sentenceCaseName("DENGUE IGM  IGG ANTIBODY"), "Dengue IgM IgG antibody");
  assert.equal(sentenceCaseName("SERUM CREATININE & EGFR"), "Serum creatinine & eGFR");
});
test("containers keep the patient instruction", () => {
  assert.equal(cleanContainer("EDTA Tube 10- 12 hrs Fasting"), "EDTA tube, 10 to 12 hours fasting");
  assert.equal(cleanContainer("Sterlized cotton swab"), "Sterilised cotton swab");
  assert.equal(cleanContainer("Plain Tube /EDTA Tube"), "Plain tube, EDTA tube");
});
test("a zero or blank price is unpriced", () => {
  assert.equal(priceOf(0), null); assert.equal(priceOf(""), null); assert.equal(priceOf(500), 500); assert.equal(priceOf("1,100"), 1100);
});
test("applyRules drops excluded rows, renames, notes, and reports unused keys", () => {
  const rows: RawRow[] = [
    { code: "A1", name: "CSR MEDICAL (BOI KATUNAYAKE)", container: "Plain Tube", turnaround: "One day", price: 1000 },
    { code: "B2", name: "ANTI NEUCLEAR ANTIBODY", container: "Plain Tube", turnaround: "One day", price: 4000 },
  ];
  const { tests, unusedOverrideKeys } = applyRules(rows, {
    [overrideKey("A1", "CSR MEDICAL (BOI KATUNAYAKE)")]: { exclude: true, reason: "corporate package" },
    [overrideKey("B2", "ANTI NEUCLEAR ANTIBODY")]: { name: "Antinuclear antibody (ANA)", note: "Night service" },
    "Z9|GONE": { name: "x" },
  });
  assert.deepEqual(tests, [{ code: "B2", name: "Antinuclear antibody (ANA)", note: "Night service", container: "Plain tube", turnaroundDays: 1, price: 4000 }]);
  assert.deepEqual(unusedOverrideKeys, ["Z9|GONE"]);
});
```

- [ ] **Step 2: Run to verify it fails.** Run: `npm test -- --test-name-pattern="turnaround"` (or simply `node --test src/features/laboratory/data/importRules.test.ts`). Expected: FAIL, module not found.

- [ ] **Step 3: Implement `importRules.ts`** with the signatures above. `applyRules` maps each row through `sentenceCaseName`, `cleanContainer`, `turnaroundDays`, `priceOf`, then applies the override by `overrideKey(code, rawName)`; an `exclude` override drops the row; `name` replaces, `note` adds. Keep the module free of Node imports so `node --test` and the script both load it.

- [ ] **Step 4: Run the rule tests to verify they pass.**

- [ ] **Step 5: Write `scripts/import-lab-catalogue.mjs`.** Usage: `node scripts/import-lab-catalogue.mjs "<path to .xlsx>"`. No dependency: an `.xlsx` is a zip; read the file, walk the local file headers (signature `0x04034b50`, little endian name length and extra length, compression method 8 = `zlib.inflateRawSync`, 0 = stored; sizes from the central directory when the data descriptor flag is set), pull `xl/sharedStrings.xml` and `xl/worksheets/sheet1.xml`, parse `<si><t>` strings and `<c r="B4" t="s"><v>3</v></c>` cells with regular expressions (decode `&amp;`), and build `RawRow[]` from row 4 onward, columns B to F (code, name, container, turnaround, price), skipping rows with an empty name. Import `applyRules` and `labOverrides` from the `.ts` files (Node 24 strips types). Write `src/features/laboratory/data/catalogue.ts` with a header comment naming the workbook file name and the import date, `LAB_CATALOGUE_YEAR` read from the sheet's A1 ("LABORATORY PRICE LIST - 2026", take the trailing number), and `labTests` as a JSON literal typed `readonly LabTest[]` importing the type from `./importRules`. Print `Imported N tests, M excluded` and one `warning: unused override key …` line per unused key; exit 1 on an unknown turnaround phrase.

- [ ] **Step 6: Fill `overrides.ts`** with entries for the rows the builder check named, keyed by `overrideKey(code, rawName)` exactly as the sheet spells them: exclude `CSR MEDICAL (BOI KATUNAYAKE)`; rename the spelling slips (NEUCLEAR, COMPLIMENT, HELICOBACTOR, QUNTITATIVE, Luteinizinng, Samlple, NOTROGEN, ESTRASE, CHROMATOGRAPHI, ALLEGEN, HEMOLYTIE, STANDED, HEPATITS, "(Rh Factor)" on rheumatoid factor); rename rows carrying reference lab markers (`- LH`, `(LH)`, `-(A)`, `LANKA`, `(GENE LAB)`, `(OPD)`, `- L`, `(BACTEC)`) to the bare test name; give `note: "Night service"` to the `NIGHT002` row and `note: "OPD"` where "(OPD)" distinguished a duplicate. Leave genuine duplicates in (Vitamin B12 twice, histology large twice, BSS, thrombin time). Add a header comment pointing to the spec's "Catalogue cleaning" section.

- [ ] **Step 7: Run the import.** Run: `npm run lab:import -- "C:\Users\User\Documents\Designs\sj-hospital\Data\Laboratory Tests Catalogue.xlsx"`. Expected: `Imported 334 tests, 1 excluded`, no warnings. Open the generated file and scan every name; add `KEEP_UPPER` entries or overrides where a name reads wrongly, re-run until clean. Then run `npm run check:dashes`: expected clean (the importer removed every " - ").

- [ ] **Step 8: Write `summary.ts`** (`summarise` = count of tests, minimum non null price, count with `turnaroundDays === 1`, year) and `catalogue.test.ts`:

```ts
test("the catalogue is the 2026 sheet", () => { assert.equal(LAB_CATALOGUE_YEAR, 2026); assert.ok(labTests.length >= 330); });
test("every test has a code, a sentence case name, a container and a day count", () => { for (const t of labTests) { assert.ok(t.code); assert.ok(t.name); assert.notEqual(t.name, t.name.toUpperCase()); assert.ok(!/\( | \)| - /.test(t.name), t.name); assert.ok(t.container); assert.ok([1,2,3,4,7,10,14,21].includes(t.turnaroundDays), `${t.name}: ${t.turnaroundDays}`); } });
test("the summary is derived, and the lowest price is a real test", () => { assert.equal(labCatalogueSummary.fromPrice, 350); assert.equal(labCatalogueSummary.count, labTests.length); assert.ok(labCatalogueSummary.sameDayCount > 200); assert.ok(labTests.every((t) => t.price === null || t.price >= 350)); });
test("no excluded row ships and every override key still matches a row", () => { /* re-derive keys from overrides.ts: assert no test name equals an excluded row's cleaned name, and assert each override key's code appears in labTests or was excluded */ });
test("a note is short", () => { for (const t of labTests) if (t.note) assert.ok(t.note.length <= 24); });
```

- [ ] **Step 9: Run the laboratory tests and the whole suite.** Run: `npm test`. Expected: all pass (the new overlay coverage walker sees no overlay yet in this folder).

- [ ] **Step 10: Commit**

```bash
git add scripts/import-lab-catalogue.mjs package.json src/features/laboratory/data
git commit -m "feat(laboratory): import the 2026 test catalogue from the hospital's workbook"
```

---

### Task 2: Laboratory page copy, loader, metadata, navigation

**Files:**
- Create: `src/features/laboratory/data/content.ts`, `content.si.ts`, `content.ta.ts`, `getContent.ts`, `content.test.ts`, `content.i18n.test.ts`
- Modify: `src/config/pageMetadata.ts`, `pageMetadata.si.ts`, `pageMetadata.ta.ts` (add `laboratoryTests`)
- Modify: `src/app/sitemap.ts` (`STATIC_PATHS` gains `"/laboratory-tests"` after `"/international-care"`)
- Modify: `src/config/megaNavigation.ts` Diagnostics column: add `{ label: "Laboratory tests & prices", href: "/laboratory-tests" }` after "Laboratory services"
- Modify: `src/config/servicesNavigation.ts` Care column: add `{ label: "Laboratory tests & prices", href: "/laboratory-tests" }` after "Diagnostics & radiology"
- Create: `src/config/laboratoryNavigation.ts` exporting `laboratoryFooterColumns: FooterColumn[]` (two columns in the pharmacy file's pattern: "Laboratory" with `#list`, `#how`, `#book`, `/services/laboratory`, `/services/radiology`; "Hospital" identical to the pharmacy file's)

**Interfaces:**
- Produces `content.ts` exports: `hero = { strapline: "Laboratory price list", breadcrumbHome: "Home", breadcrumbCurrent: "Laboratory tests", headingLead: "Every test.", headingAccent: "One honest price.", bookCta: "Book a test", call: { value: "0117 84 84 84" } }`; `heroStandfirstTemplate` (the spec's sentence with `{fromPrice}`); `heroFacts: FactRow[]` with `{ k: "Tests", v: "{count}" }, { k: "From", v: "{fromPrice} LKR" }, { k: "Same day", v: "{sameDayCount}" }, { k: "OPD discount", v: "{opdDiscount}" }`; `featuredCodes: readonly { code: string; label: string }[]` (`10073` "Full blood count", `G2311` "Fasting blood sugar", `G2512` "Urine full report", `G2333` "Lipid profile", `G4029` "Creatinine and eGFR", `G4000` "CRP", `G4002` "TSH", `G2541` "Dengue IgM and IgG"); `sectionEyebrows = { list: "01 / Every test", how: "02 / How it works", book: "03 / Start here" }`; `listHeading = { line1: "Search", line2: "the price list" }`; `listIntro` (prose); `table = { search: "Search a test or code", searchAria: "Search tests", filterAll: "All", filterSameDay: "Same day", filterShort: "2 to 4 days", filterLong: "A week or more", colTest: "Test", colSample: "Sample", colTurnaround: "Report in", colPrice: "Price (LKR)", onRequest: "On request", showingTemplate: "Showing {n} of {total}", empty: "No test matches that. Try a shorter word or the test code." }`; `turnaroundTemplate = { one: "One day", many: "{n} days" }`; `howHeading = { line1: "Four steps,", line2: "one report" }`; `howIntro` (prose); `bookHeading = { line1: "Walk in.", line2: "Any hour.", line3: "Any test." }`; `bookIntro` (prose, carries "229/10 St. Joseph Street, Negombo"); `bookActions: ContactRow[]` (`{ label: "Book a test", href: "/services/laboratory", glyph: "arrow", internal: true }`, `{ label: "Call the hospital", value: "0117 84 84 84", href: "tel:+94117848484", glyph: "phone" }`, `{ label: "Radiology and digital X-ray", href: "/services/radiology", glyph: "arrow", internal: true }`)
- Produces `getContent.ts`: `export type LaboratoryContent = typeof base; export async function getLaboratoryContent(locale: Locale): Promise<LaboratoryContent>` (pharmacy's pattern)
- Types `FactRow`, `ContactRow` come from a new `src/features/laboratory/types.ts` copied from the network feature's shapes.
- Consumes from Task 1: `labTests`, `labCatalogueSummary`.

- [ ] **Step 1: Write the failing tests.** `content.test.ts`: every `featuredCodes[].code` exists in `labTests`; `heroFacts` has four rows and the second's `v` contains `{fromPrice}`; `bookActions[1].href === "tel:+94117848484"`; `table.showingTemplate` contains `{n}` and `{total}`. `content.i18n.test.ts`: the pharmacy file's shape (parity for si and ta with `isUntranslatable` = `.href`, `.glyph`, `.internal`, `.value`, `.code`, `.label` under `featuredCodes`; no overlay key outside the base; no translated string identical to English). Also extend `src/config/pageMetadata.i18n.test.ts` expectations implicitly by adding the entry (its parity tests will fail until the overlays carry the description).

- [ ] **Step 2: Run to verify failure.** `node --test src/features/laboratory/data/*.test.ts src/config/pageMetadata.i18n.test.ts`. Expected: FAIL.

- [ ] **Step 3: Write `content.ts`, `content.si.ts`, `content.ta.ts`, `getContent.ts`, `types.ts`.** Overlays carry only prose (`heroStandfirstTemplate` is hero, so English; `listIntro`, `howIntro`, `bookIntro`, `table.empty`, and the page description translate) in the code mixed register the home overlays use ("Lab", "Report", "Test" stay English inside Sinhala and Tamil sentences). Add `laboratoryTests` to the three `pageMetadata` files: title `"Laboratory tests & prices | St. Joseph Hospital Negombo"` (English only), description in all three.

- [ ] **Step 4: Navigation and sitemap edits** as listed under Files. Run `node --test src/config/*.test.ts src/app/*.test.ts src/lib/i18n/*.test.ts` to see any navigation test that pins link counts, and update the pinned count with a one line comment.

- [ ] **Step 5: Run the suite.** `npm test`. Expected: pass, including `overlayCoverage` (both new overlays are imported by `content.i18n.test.ts`) and `overlayRegister` (no English only key in an overlay).

- [ ] **Step 6: Commit**

```bash
git add src/features/laboratory src/config src/app/sitemap.ts
git commit -m "feat(laboratory): page copy, metadata and navigation for the price list"
```

---

### Task 3: Laboratory page components and route

**Files:**
- Create: `src/features/laboratory/components/LaboratoryHero.tsx`, `LabListSection.tsx`, `LabTestTable.tsx` (`'use client'`), `HowSection.tsx`, `LabBookSection.tsx`, `LaboratoryPage.tsx`
- Create: `src/features/laboratory/lib/filterTests.ts`, `filterTests.test.ts`, `fillTemplate.ts`
- Create: `src/features/laboratory/index.ts` exporting `LaboratoryPage`, `labTests`, `labCatalogueSummary`, `type LabTest`, `fillTemplate`
- Create: `src/app/[locale]/laboratory-tests/layout.tsx`, `page.tsx` (copy the pharmacy pair; metadata key `"laboratoryTests"`; alternates path `"/laboratory-tests"`)
- Modify: `src/features/services/data/diagnostics.ts` laboratory entry: append to `faq` `{ q: "Where can I see the price of a test?", a: "Every test and its price is published on our laboratory price list, and OPD patients get 10% off at the counter." }` and modify `src/features/services/components/detail/AboutSection.tsx` to render, under the facts `<dl>`, a `LocaleLink` to `/laboratory-tests` labelled "See every test and price" ONLY when `service.slug === "laboratory"` (one visible link, as the spec allows).

**Interfaces:**
- `fillTemplate(template: string, values: Record<string, string | number>): string` replaces each `{key}`; numbers formatted with `toLocaleString("en")`.
- `filterTests(tests: readonly LabTest[], query: string, band: "all" | "1" | "2-4" | "7+"): LabTest[]` (plain case insensitive substring on `name` and `code`, trimmed; band by `turnaroundDays`).
- `LabTestTable({ tests, copy, turnaround }: { tests: readonly LabTest[]; copy: LaboratoryContent["table"]; turnaround: LaboratoryContent["turnaroundTemplate"] })` renders controls, count line and the list; state is `query` and `band`.
- `LaboratoryPage({ locale }: { locale: Locale })` fetches `getLaboratoryContent`, computes `const summary = labCatalogueSummary` and `opdDiscount` from `services.find(s => s.slug === "laboratory")!.facts[3].v`, fills the hero templates, and renders hero, list (`id="list"`), how (`id="how"`, steps read from that same service entry's `steps`), book (`id="book"`), `ThemedFooter` with `laboratoryFooterColumns`.

- [ ] **Step 1: Write failing tests** for `filterTests` and `fillTemplate`:

```ts
test("filter matches name and code, ignoring case, spaces and regex characters", () => {
  const t = labTests;
  assert.ok(filterTests(t, "  fbc ", "all").some((x) => x.code === "10073"));
  assert.ok(filterTests(t, "g4000", "all").some((x) => x.name.includes("CRP")));
  assert.doesNotThrow(() => filterTests(t, "C3 (complement)", "all"));
  assert.equal(filterTests(t, "", "1").length, labCatalogueSummary.sameDayCount);
  assert.ok(filterTests(t, "", "7+").every((x) => x.turnaroundDays >= 7));
});
test("fillTemplate formats numbers with thousands separators", () => {
  assert.equal(fillTemplate("From {p} LKR", { p: 10000 }), "From 10,000 LKR");
});
```

- [ ] **Step 2: Run to verify failure**, then **Step 3: implement** `filterTests.ts` and `fillTemplate.ts`, **Step 4: run to pass.**

- [ ] **Step 5: Build the components.** `LaboratoryHero` is `PharmacyHero` with this feature's content, photo `/images/services/heroes/laboratory.jpg` with `preload`, a ticker of the eight featured tests as `"{label} {price} LKR"`. `LabListSection` renders eyebrow, heading, intro, then `<LabTestTable>`; the first paint already contains every row (the client leaf renders from props, no effect gated rendering). The table: from `sm:` a real `<table>` with `tabular-nums` right aligned prices and `"On request"` for null; under `sm:` each row a stacked card (name bold, then three `dt`/`dd` pairs). Controls: a `<label>`ed `<input type="search" id="lab-search">` and four 44px tall segmented buttons with `aria-pressed`. `HowSection` renders the four `steps` in the services detail `JourneySection`'s visual pattern (do not import that component across features; reproduce the simple grid). `LabBookSection` is the pharmacy `BookSection` pattern with this feature's `bookActions`. `LaboratoryPage` composes them as in Interfaces.

- [ ] **Step 6: Route pair, index, services link** as listed under Files.

- [ ] **Step 7: Verify.** `npm run lint && npm test && npm run check && npm run build`. Expected: all green. Then `npm run dev` inside the worktree and open `/laboratory-tests`, `/si/laboratory-tests`, `/services/laboratory` at 375, 768, 1280 in both themes: no horizontal scroll, search and filters work, count line updates, English chrome with Sinhala prose on `/si`.

- [ ] **Step 8: Commit**

```bash
git add src/features/laboratory src/app/[locale]/laboratory-tests src/features/services
git commit -m "feat(laboratory): the /laboratory-tests price list page"
```

---

### Task 4: Home laboratory teaser band

**Files:**
- Modify: `src/features/home/data/content.ts` (add `laboratory` block), `content.si.ts`, `content.ta.ts` (add `laboratory.bodyTemplate`)
- Create: `src/features/home/components/LaboratorySection.tsx`
- Modify: `src/features/home/components/HomePage.tsx` (render `<LaboratorySection>` after `FreeOpdSection`, passing `content.laboratory`, `locale`, and `tiles` computed from `labTests` and `featuredCodes` imported from `@/features/laboratory`)
- Modify: `src/features/home/data/content.i18n.test.ts` `isUntranslatable`: `.code` and `.label` under `laboratory.featured` are facts
- Create: `src/features/home/data/laboratoryTeaser.test.ts`

**Interfaces:**
- `content.laboratory = { eyebrow: "Laboratory", heading: { line1: "The best equipment,", line2: "at the lowest prices." }, bodyTemplate: "{count} tests, most back the same day, every report read by two doctors, and prices set for Negombo. Tests from {fromPrice} LKR onwards.", ctaPrimary: "See all tests and prices", hrefPrimary: "/laboratory-tests", ctaSecondary: "Book a test", hrefSecondary: "/services/laboratory", featured: [{ code: "10073", label: "Full blood count" }, …same eight as Task 2] }`
- `LaboratorySection({ content, tiles, body, locale }: { content: HomeContent["content"]["laboratory"]; tiles: { label: string; price: number }[]; body: string; locale: Locale })`
- The spec names `laboratory.featuredCodes`; the home band owns its own `featured` list (same eight) so the home test can pin it without reaching into the laboratory feature's content. `HomePage` builds `tiles` by looking each code up in `labTests` and `body` by `fillTemplate(content.laboratory.bodyTemplate, labCatalogueSummary)`.

- [ ] **Step 1: Failing test** `laboratoryTeaser.test.ts`: all eight codes exist in `labTests` with a non null price; `bodyTemplate` contains `{count}` and `{fromPrice}`; `hrefPrimary === "/laboratory-tests"`; the band quotes no literal `LKR` price in `bodyTemplate` other than through the template (`!/\d{3,}/.test(bodyTemplate)`).
- [ ] **Step 2: Run to fail. Step 3: add the data and overlays** (`bodyTemplate` is prose, translated in si and ta, keeping `{count}` and `{fromPrice}` tokens; `overlayNumerals` must still pass, so no digits in the overlays).
- [ ] **Step 4: Build `LaboratorySection`** in the pharmacy band's visual pattern (sky card, `Eyebrow`, display heading with `line2` in `text-[var(--home-brand-text)]`, body, two `pillButton`s, and on the right a `grid-cols-2` of eight tiles: price in `font-display` `tabular-nums` over the label, each tile `bg-[var(--home-bg)]` with a hairline). `Reveal` on the card, `RevealStagger` on the tiles. Stacks under 900px.
- [ ] **Step 5: Wire into `HomePage`** after `FreeOpdSection`.
- [ ] **Step 6: Verify** `npm test`, `npm run lint`, then dev server: home at 375/768/1280, both themes, the band reads the real prices.
- [ ] **Step 7: Commit** `git commit -m "feat(home): laboratory teaser band with live prices"`

---

### Task 5: The hero slideshow

**Files:**
- Modify: `src/features/home/data/content.ts` (replace `hero` with `heroSlides`; add `HERO_SLIDE_INTERVAL_MS = 7000`), `content.si.ts`, `content.ta.ts` (remove `hero`)
- Delete: `src/features/home/data/heroSlides.ts`, `heroSlides.test.ts`, `public/images/home/hero-night-gate.jpg`
- Create: `src/features/home/data/heroSlides.test.ts` (new, against `content.heroSlides`)
- Create: `src/features/home/components/HeroSlideshow.tsx` (`'use client'`), `src/features/home/hooks/useHeroSlideshow.ts`, `useHeroSlideshow.test.ts`
- Modify: `src/features/home/components/HeroSection.tsx` (takes `locale`; builds `HeroSlideView[]`; renders `HeroSlideshow`), `HomePage.tsx` (pass `locale`, `heroSlides`)
- Delete: `src/features/home/components/HeroParallaxBackground.tsx`
- Modify: `src/lib/i18n/registerPolicy.ts` `HERO_ROOTS` gains `"heroSlides"`
- Modify: `src/features/home/data/content.i18n.test.ts` (drop the `content:hero.photoAlt` requirement; `heroSlides[*].photoAlt`, `.id`, `.photo`, `.positionClass` untranslatable)
- Modify: `src/config/pageMetadata.ts` is unchanged (the motto in `home.title` stays, per the spec's non goals)

**Interfaces:**
- `content.heroSlides: readonly HeroSlideContent[]` with the type from the spec (`id`, `kicker`, `heading: { lead, accent }`, `body`, `ctaPrimary: { label, href }`, `ctaSecondary?`, `photo`, `photoAlt`, `positionClass`), eight entries with the spec's table copy verbatim; slide 5's body carries `{count}` and `{fromPrice}`; button labels "Call 0117 84 84 84" are built as `` `Call ${HOSPITAL_PHONE_LABEL}` `` where `export const HOSPITAL_PHONE_LABEL = "0117 84 84 84"` and `export const HOSPITAL_TEL = "tel:+94117848484"` are added to `src/features/contact/data/content.ts` and re-exported from `src/features/contact/index.ts`; `HeroSection.tsx`'s own hard coded number switches to the same constants.
- `export type HeroSlideView = Omit<HeroSlideContent, "body"> & { body: string; preload: boolean }` (hrefs already passed through `localeHref`; body already filled).
- `useHeroSlideshow(count: number, intervalMs: number): { active: number; go: (i: number) => void; next: () => void; prev: () => void; pause: () => void; resume: () => void; mounted: ReadonlySet<number> }` in `hooks/useHeroSlideshow.ts`: `mounted` is the set of indexes whose photo should be in the DOM (active, every index already shown, and `(active + 1) % count`); the interval does not start under `prefers-reduced-motion`; `visibilitychange` pauses; `pause`/`resume` are called by the component on pointer enter/leave and focus in/out.
- `HeroSlideshow({ slides, intervalMs, ariaShow, ariaPrev, ariaNext }: { slides: HeroSlideView[]; intervalMs: number; ariaShow: string; ariaPrev: string; ariaNext: string })` renders: the parallax photo stack (`useParallax(0.16, 130)` as today, each mounted slide an absolutely positioned `next/image` `fill sizes="100vw"` with `animate-sj-burns` and `style={{ animationDelay: `-${(Date.now() - mountedAt) % BURNS_MS}ms` }}`, crossfading over 1600ms, `preload` on slide 0 only, `loading="lazy"` otherwise), then the active slide's copy. `HeroSlideshow` owns both the photo stack and the copy; `HeroSection` wraps it with the gradient, sheen, rail, mark and ticker. One `<h1>` for the active slide; inactive copy unmounted; an `aria-live="polite"` visually hidden `<p>` announcing the active heading; a control row with dots (`role="tablist"`, 44px buttons, `aria-label={ariaShow.replace("{n}", …).replace("{kicker}", …)}`), a `01 / 08` counter and two 44px arrow buttons; ArrowLeft/ArrowRight on the section's `onKeyDown`. The aria strings live in `content.ts` as `heroAria = { show: "Slide {n} of {total}: {kicker}", prev: "Previous slide", next: "Next slide" }` (assistive text; translated in overlays per the policy's `isAssistiveText` rule, which keys on an `Aria`/`aria` name, so name them `heroAria`).
- Heading classes: `font-display text-[clamp(40px,7.4vw,120px)] leading-[0.88] font-extrabold tracking-[-0.045em] text-white uppercase` with the accent span `text-[var(--home-accent)]`; body `text-[16px] sm:text-[18px]`.

- [ ] **Step 1: Failing data test** `heroSlides.test.ts`:

```ts
test("eight slides in the owner's order, each with a distinct id and photo on disk", () => {
  assert.deepEqual(heroSlides.map((s) => s.id), ["free-opd","medicine-delivery","patient-transport","digital-xray","laboratory","channeling","insurance","cashless"]);
  assert.equal(new Set(heroSlides.map((s) => s.photo)).size, 8);
  for (const s of heroSlides) assert.ok(existsSync(fileURLToPath(new URL(`../../../../public${s.photo}`, import.meta.url))), s.photo);
});
test("every slide link is a call or a page on this site, and every fragment names a real section", () => {
  // routes = STATIC_PATHS from app/sitemap.ts plus /services/<slug>; for a `#frag` read the feature's component files under src/features/<feature>/components for `id="frag"`
});
test("no slide types a figure that has a home elsewhere", () => {
  for (const s of heroSlides) { const copy = `${s.kicker} ${s.heading.lead} ${s.heading.accent} ${s.body}`; assert.ok(!/\d+\s*%/.test(copy), s.id); assert.ok(!/\b\d{1,3},\d{3}\b/.test(copy), s.id); }
  assert.match(heroSlides[4].body, /\{count\}/); assert.match(heroSlides[4].body, /\{fromPrice\}/);
});
test("every slide carries a focal point class", () => { for (const s of heroSlides) assert.match(s.positionClass, /object-\[/); });
```

- [ ] **Step 2: Failing hook test** `useHeroSlideshow.test.ts` (pure logic extracted so `node --test` can run it): put the index arithmetic and the mounted set in a pure `export function stepSlides(state: { active: number; shown: number[] }, count: number, to: number): { active: number; shown: number[]; mounted: number[] }` in the same hook file's sibling `slideState.ts`, and test: wrapping (`to: -1` from 0 gives 7; `to: 8` gives 0), `mounted` always includes `active` and `(active+1)%count`, and `shown` never shrinks.

- [ ] **Step 3: Run both to fail. Step 4: implement data, `slideState.ts`, the hook, the component, the `HeroSection` rewrite, `HomePage` wiring, `registerPolicy` root, the i18n test change, the deletions.** `HeroSection` keeps its gradient, sheen, scan line, rail and `Ticker` exactly; `AffiliationMark` stays above the slideshow copy.

- [ ] **Step 5: Run `npm test`, `npm run lint`, `npm run check:images`** (the deleted photo must not be referenced anywhere: `grep -rn hero-night-gate src` returns nothing). Expected: green.

- [ ] **Step 6: Visual verification.** Restart `npm run dev` in the worktree. At 375, 768, 1280, both themes: all eight slides readable; slide 8 fits without clipping at 375 (if not, drop body to 16px below `sm:` and the heading minimum to 40px, in that order, and record it in the component comment); dots, arrows, keyboard and hover pause work; the first slide holds with reduced motion emulated in DevTools; the network tab shows one hero photo fetched at load and the next one only when it becomes due.

- [ ] **Step 7: Commit**

```bash
git add -A src/features/home src/features/contact src/lib/i18n/registerPolicy.ts public/images/home
git commit -m "feat(home): turn the hero into an eight slide slideshow of what we offer"
```

---

### Task 6: Affiliation mark opens ktdoctor.com

**Files:**
- Modify: `src/components/layout/AffiliationMark.tsx` (`AFFILIATION.href = "https://www.ktdoctor.com"`; plain `<a target="_blank" rel="noopener noreferrer">` instead of `LocaleLink`; a `<span className="sr-only">` "(opens in a new tab)" after the name; header comment updated)
- Create: `src/components/layout/AffiliationMark.test.ts` pinning `AFFILIATION.href === "https://www.ktdoctor.com"` and that the component source contains `rel="noopener noreferrer"` (read the file as text, the way `teaserLinks.test.ts` reads sources). Note `AFFILIATION` must be importable by `node --test`: move it to `src/components/layout/affiliation.ts` and import it from the `.tsx`.

- [ ] **Step 1: Failing test. Step 2: run. Step 3: implement. Step 4: pass.**
- [ ] **Step 5: Visual check** of the mark in the hero, the "who we are" band and both footers; the link opens ktdoctor.com in a new tab.
- [ ] **Step 6: Commit** `git commit -m "feat(layout): the affiliation mark opens ktdoctor.com"`

---

### Task 7: Network parent teaser

**Files:**
- Modify: `src/features/network/data/content.ts` (add `parentTeaser = { eyebrow: "Our parent, Los Angeles", cta: "Visit ktdoctor.com", note: "Everything on this site is run to the protocols of the group that operates this hospital. Their own site has the clinics, the doctors and the care they give in California." }`), `content.si.ts`, `content.ta.ts` (`parentTeaser.note`)
- Modify: `src/features/network/data/content.test.ts` (test: `orgGroups` contains an org with `slug === "kids-and-teens"` whose `href === "https://www.ktdoctor.com"`; `parentTeaser.cta` names ktdoctor.com)
- Create: `src/features/network/components/ParentTeaser.tsx`
- Modify: `src/features/network/components/NetworkPage.tsx` (render `<ParentTeaser content={content} />` between `NetworkHero` and `JumpCards`)

**Interfaces:**
- `ParentTeaser({ content }: { content: NetworkContent })` finds the org by slug (throws if missing, the test guards it) and renders a `Reveal` panel: `bg-[var(--home-accent-tint)] border border-[var(--home-accent)]`, logo on a 64px white chip, eyebrow, name as `<h2>`, `org.body`, `parentTeaser.note`, chips row, external CTA `<a target="_blank" rel="noopener noreferrer">`; `grid-cols-[64px_1fr]` from 640px, stacked below; `mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 lg:px-11` so it sits inside the same gutters as `JumpCards`.

- [ ] Steps: failing test, run, implement, pass, visual check at 375/768/1280 in both themes, commit `feat(network): parent group teaser at the top of the page`.

---

### Task 8: Facts aligned with the slides

**Files:**
- Modify: `src/features/services/data/atHome.ts` medicine-delivery: `hours: "24 hours"`, `facts[0].v: "24 hours"`, `strip[0] = { k: "Hours", v: "24 hours" }` (replacing the Coverage cell; Coverage stays in `facts`), `body2` last sentence "…and orders go out at any hour of the day or night."; `desc` gains "around the clock".
- Modify: `src/features/services/data/atHome.si.ts`, `atHome.ta.ts` (`body2`, `desc` prose updated to say 24 hours)
- Modify: `src/components/layout/chromeCopy.ts` `bookFooter: "Free OPD consultation. All insurance accepted, cashless available."`, `chromeCopy.si.ts`, `chromeCopy.ta.ts` (same sentence translated)
- Modify: any test pinning "Daily" or the old `bookFooter` (grep first: `grep -rn "Daily\|Corporate insurance accepted" src --include=*.test.ts`)

- [ ] **Step 1: grep and update pinned tests** (write the new expectation first so they fail).
- [ ] **Step 2: Edit data and overlays. Step 3: `npm test` green. Step 4: Commit** as two commits: `fix(services): medicine delivery runs 24 hours` and `fix(layout): booking footer says all insurance accepted, cashless available`.

---

### Task 9: Final verification and report

- [ ] `npm run lint && npm test && npm run check && npm run build` from the worktree: all green; paste the tail of each in the report.
- [ ] `npm run i18n:status`: the new overlays (`laboratory/data/content.si.ts`, `.ta.ts`) and the changed ones are listed as awaiting review; expected.
- [ ] Restart `npm run dev` in the worktree; walk `/`, `/si`, `/laboratory-tests`, `/network`, `/services/laboratory`, `/services/medicine-delivery` at 375, 768 and 1280 in both themes; scroll each full page for motion timing.
- [ ] `git status` clean; `git log --oneline main..HEAD` shows the task commits.
- [ ] Report to the owner with: what changed, the overrides applied to the catalogue (list the renamed and excluded rows for their review), the calls made (container free text, lazy photo mounting, the home band's own `featured` list, the laboratory service FAQ link), and wait. Do not merge.

---

## Self review notes

- Spec coverage: Part 1 → Task 5; Part 2 → Task 6; Part 3 → Tasks 1 to 4; Part 4 → Task 7; Part 5 → Task 8; verification → Task 9. The spec's `featuredCodes` on the laboratory content (Task 2) and the home band's `featured` (Task 4) are the same eight; Task 4 records why both exist.
- Type consistency: `LabTest`, `LabOverride`, `labTests`, `labCatalogueSummary`, `fillTemplate`, `filterTests`, `HeroSlideContent`, `HeroSlideView`, `useHeroSlideshow`, `stepSlides` are each defined once and used by name in later tasks.
- Review Focus items 1 to 5 are pinned in Tasks 5, 5, 1, 3 and 5 respectively.
