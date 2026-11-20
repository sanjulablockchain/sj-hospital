# Service Book on service pages, and Coming soon services: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put the 2026 Service Book's details on the service pages it covers, mark seven services "Coming soon" everywhere they are previewed, and correct OPD hours and room prices across the site.

**Architecture:** One plain list of coming-soon slugs in `src/config/comingSoon.ts` is the single source; every preview asks `isComingSoonHref(href)` or `isComingSoonSlug(slug)` and renders the shared `ComingSoonBadge`. The book's content is a `book` block on each covered `Service`, rendered by a new `BookExcerptSection`, also used by `/e-channeling` for Super Channelling. Fact corrections are data edits with their pinning tests updated.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4, `node --test`.

**Spec:** `docs/superpowers/specs/2026-11-20-service-book-on-service-pages-design.md`

Deviation from the spec, deliberate: the spec puts a `comingSoon` flag on each `Service`. The nav config and the home data cannot import the services feature (client bundles, `node --test` without the `@/` alias), so the flag lives once in `src/config/comingSoon.ts` instead and services read it from there. Still one change per service, as the owner was promised.

## Global Constraints

- Work in `.claude/worktrees/service-book-pages` on `worktree-service-book-pages`; do not merge (the owner confirms first).
- Coming-soon slugs, exactly: `intensive-critical-care`, `endoscopy`, `fertility`, `fetal-monitoring`, `obstetrics-maternity`, `vaccination-clinic`, `telemedicine`.
- No dash punctuation in any visible string (em dash, en dash, spaced hyphen, any encoding). `npm run check:dashes` enforces it.
- Colours only through `--home-*` tokens; Tailwind utilities only; no new CSS files.
- Every new user-facing English string gets Sinhala and Tamil in the matching `.si.ts` / `.ta.ts` overlay (draft, the file's `__review` marker stays `draft`). Labels the register rule keeps English stay English.
- OPD hours everywhere: `7.00 AM to 6.00 PM`. Emergency stays 24 hours. Pharmacy delivery stays "across Negombo".
- Room prices per day: Ward `9,500 LKR`, Standard `12,500 LKR`, Deluxe `15,500 LKR`, Super Deluxe `19,500 LKR`.
- Book phone numbers (`031 784 84 84`, `076 422 8898`) appear only inside book excerpts; everywhere else keeps `0117 84 84 84` and `074 222 333 4`.
- Affiliation wording, never "American hospital standards": "Managed and operated by Kids & Teens Medical Group of Los Angeles, USA."
- Responsive at 375, 768, 1280; light and dark; tap targets at least 44px.
- Before finishing: `npx eslint src scripts`, `npm test`, `npm run check`, `NODE_ENV=production npm run build` (the shell exports `NODE_ENV=development`, which breaks prerender).

## Review Focus

1. A coming-soon service reached by a path nobody listed (a footer column, a "related" pick, a search engine landing): it must still show the badge and no booking button. Pinned by the Task 2 test that walks every `/services/<slug>` href in config and home data.
2. Sinhala or Tamil readers on a coming-soon page: the badge, note and "Ask us when it opens" must be translated, not English fallbacks. Pinned by the Task 1 and Task 3 parity tests.
3. A stale "24 hours" OPD or "10,000 LKR" left in a page the plan did not name (metadata, FAQ, overlays). Pinned by the Task 6 site-wide scan test.
4. The book section's facts grid with four rows (rooms) on a phone: no horizontal scroll. Checked visually in Task 7.
5. The reader link `#page-N` landing on the wrong page because printed and PDF order differ: web page N is printed page N (`docs/service-book.md`). Pinned by the Task 4 test.

---

### Task 1: Coming-soon source of truth and badge

**Files:**
- Create: `src/config/comingSoon.ts`, `src/config/comingSoon.test.ts`, `src/components/ui/ComingSoonBadge.tsx`
- Modify: `src/components/layout/chromeCopy.ts`, `chromeCopy.si.ts`, `chromeCopy.ta.ts` (add `comingSoon`), `src/components/ui/index.ts` if it barrels UI exports

**Interfaces:**
- Produces: `COMING_SOON_SLUGS: readonly string[]`; `isComingSoonSlug(slug: string): boolean`; `isComingSoonHref(href: string): boolean` (true for `/services/<slug>` with an optional `#fragment`, after stripping a `/si` or `/ta` prefix); `ComingSoonBadge({ size?: "sm" | "md" })`, a pill rendering `<ChromeText id="comingSoon" />`; chrome key `comingSoon` = "Coming soon" (si "ළඟදීම", ta "விரைவில்").

- [ ] **Step 1: Write the failing test** `src/config/comingSoon.test.ts`:
  - `COMING_SOON_SLUGS` deep-equals the seven slugs in Global Constraints (sorted compare).
  - every slug is in `serviceSlugs` (`../features/services/data/services.ts`).
  - `isComingSoonHref("/services/telemedicine")`, `("/services/endoscopy#faq")`, `("/si/services/fertility")` are true; `("/services/laboratory")`, `("/e-channeling")`, `("/services")` are false.
- [ ] **Step 2: Run** `node --test src/config/comingSoon.test.ts`; expect FAIL (module not found).
- [ ] **Step 3: Implement** `comingSoon.ts` (plain module, no `@/` imports) and the badge (server component; `inline-flex min-h-6 items-center rounded-full px-2.5 text-[11px] font-bold tracking-[0.14em] uppercase`, background `color-mix(in srgb, var(--home-accent) 16%, transparent)`, text `var(--home-accent)`; `md` slightly larger). Add `comingSoon` to chrome copy and both overlays.
- [ ] **Step 4: Run** `npm test`; expect PASS (chromeCopy i18n parity included).
- [ ] **Step 5: Commit** `feat(services): one list of coming soon services and a shared badge`

### Task 2: Badge on every preview of a coming-soon service

**Files:**
- Modify: `src/features/services/components/index/ServiceDirectory.tsx` (badge beside the card title; the card's `#book` CTA keeps its label from `service.cta`, set in Task 3)
- Modify: `src/features/services/components/detail/RelatedSection.tsx`, `ServicePicker.tsx` (badge after the title / chip label)
- Modify: `src/components/layout/mega-nav/MegaNavPanel.tsx` (column links and `TileLink`), `MobileNavDrawer.tsx` (column links): badge `size="sm"` after the label when `isComingSoonHref(link.href)`
- Modify: `src/features/home/components/SpecialtiesCarousel.tsx` (chip links), the home network teaser component that renders `src/features/home/data/network.ts` (the telemedicine card), `src/features/home-care/components/HandoffSection.tsx` (when `band.href` is coming soon, badge beside the heading)
- Modify: `src/components/layout/ThemedFooter.tsx` footer link rendering (covers `homeCareNavigation.ts`'s Telemedicine link)
- Test: `src/config/comingSoon.test.ts`

**Interfaces:**
- Consumes: `isComingSoonHref`, `isComingSoonSlug`, `ComingSoonBadge` (Task 1).

- [ ] **Step 1: Write the failing test** in `comingSoon.test.ts`: "every link to a coming-soon service sits in a component that badges it". Collect hrefs from `megaNavLinks()`, every `*FooterColumns` export in `src/config/*Navigation.ts`, `features/home/data/content.ts` specialty tabs, `features/home/data/network.ts`, `features/home-care/data/content.ts` handoffs; assert the set of coming-soon hrefs found equals the expected set from these sources (so a new link added elsewhere fails until someone looks at it). List the expected hrefs inline.
- [ ] **Step 2: Run**; expect FAIL only if the expected list is wrong; fix the list until it reflects today's links, then it PASSES (it guards future additions).
- [ ] **Step 3: Implement** the badge in each component listed. Keep tap targets at least 44px; the badge sits inside the existing link so it adds no extra target.
- [ ] **Step 4: Run** `npm test` and `npx eslint src`; expect PASS.
- [ ] **Step 5: Commit** `feat(services): badge coming soon services in every preview`

### Task 3: Coming-soon detail pages

**Files:**
- Modify: `src/features/services/data/emergency.ts`, `surgical.ts`, `diagnostics.ts`, `womenChildren.ts`, `atHome.ts` and their `.si.ts` / `.ta.ts`: for the seven services set `cta: "Ask us when it opens"` (si "විවෘත වන දිනය අපෙන් අසන්න", ta "திறக்கும் நாளை எங்களிடம் கேளுங்கள்")
- Modify: `src/features/services/data/indexContent.ts` (+ overlays): `detailChrome.comingSoonNote` = "This service is not open yet. Call or WhatsApp us to hear when it opens."; `detailChrome.comingSoonHeading` = "Ask us when it opens"
- Modify: `src/features/services/components/detail/ServiceHero.tsx` (badge `size="md"` beside the group kicker; note paragraph under the lede), `DetailBookSection.tsx` (coming-soon variant: heading `comingSoonHeading`; buttons call `tel:+94117848484` and WhatsApp `https://wa.me/94742223334` with `target="_blank" rel="noopener noreferrer"`; keep the back link)
- Test: `src/features/services/data/content.test.ts`

**Interfaces:**
- Consumes: `isComingSoonSlug`, `ComingSoonBadge`.

- [ ] **Step 1: Write the failing tests** in `content.test.ts`: "coming-soon services ask, they do not book": for each coming-soon service `cta === "Ask us when it opens"`; for every other service `cta !== "Ask us when it opens"`. "detail chrome carries the coming-soon copy": both new keys non-empty.
- [ ] **Step 2: Run** `npm test`; expect FAIL on the new tests.
- [ ] **Step 3: Implement** data and components as listed. The hero and AboutSection already link `#book`, so they follow `service.cta` with no further change.
- [ ] **Step 4: Run** `npm test`; expect PASS (services i18n parity included).
- [ ] **Step 5: Commit** `feat(services): coming soon detail pages ask instead of book`

### Task 4: "From our Service Book" section

**Files:**
- Modify: `src/features/services/types.ts`: `export type ServiceBookExcerpt = { page: number; summary: string; facts: KeyValue[]; why: string[] }`; `Service.book?: ServiceBookExcerpt`
- Create: `src/features/services/components/detail/BookExcerptSection.tsx`: `BookExcerptSection({ excerpt, title, labels }: { excerpt: ServiceBookExcerpt; title: string; labels: BookExcerptLabels })`, `BookExcerptLabels = { eyebrow: string; why: string; read: string }` where `eyebrow` and `read` carry a `{page}` token
- Modify: `ServiceDetailPage.tsx` (render between `AboutSection` and `JourneySection` when `service.book`), `src/features/services/index.ts` (export `BookExcerptSection`, `ServiceBookExcerpt`), `src/features/service-book/index.ts` (export `formatPageHash`)
- Modify: `indexContent.ts` (+ overlays): `detailChrome.bookExcerpt = { eyebrow: "From our Service Book · page {page}", why: "Why St. Joseph", read: "Read page {page} of the Service Book" }`
- Modify: service data files (+ overlays) with the `book` blocks below; `src/features/e-channeling/data/content.ts` (+ overlays) gains `bookExcerpt` (page 11); e-channeling page renders it with `title: "Super Channelling"` after its booking section
- Test: `src/features/services/data/content.test.ts`, `content.i18n.test.ts`, `src/features/e-channeling/data/content.test.ts`

Layout: eyebrow, title, summary, facts grid (`grid-cols-1`, from 641px `grid-flow-col auto-cols-fr`, as `/locations` does), "Why St. Joseph" list with check glyphs, then a `LocaleLink` to `/service-book/read` + `formatPageHash(page)`. Theme tokens only.

Book blocks (exact copy; `facts` are `{k, v}`):

| slug | page | summary | facts | why |
| --- | --- | --- | --- | --- |
| `outpatient-department` | 9 | Walk in and see a doctor. Our outpatient department (OPD) service is free. | Hours: 7.00 AM to 6.00 PM; Where: St. Joseph Street, Negombo; Call: 031 784 84 84 | No charge for the OPD service. / Managed and operated by Kids & Teens Medical Group of Los Angeles, USA. / Laboratory, digital X-ray and pharmacy are on the same site. |
| `accident-emergency` | 10 | Urgent care at any hour of the day or night. Come to us straight away. | Hours: 24 hours, every day; Call: 031 784 84 84 | Open day and night, including weekends. / Laboratory and pharmacy are open 24 hours too. / Specialist consultants work from the same hospital. |
| e-channeling | 11 | Choose a consultant and book an appointment by phone or WhatsApp. | Call: 031 784 84 84; WhatsApp: 076 422 8898; Fee: Please ask our staff for the current channelling fee | Consultants across more than 25 specialities. / Many consultants see patients on Sundays and in the evening. / Tests, X-ray and medicines are on the same site. |
| `cardiac-screening` | 12 | An exercise ECG checks how your heart works when it is under effort. Same day appointments are available. | Appointment: Same day. Call or WhatsApp to book; Your test: A medical officer is appointed for your test; Fee: Please ask our staff for the current fee | A same day appointment, so you can be tested without delay. / A medical officer is appointed to look after you during the test. / Consultant cardiologists are on the same site. |
| `radiology` | 13 | Digital X-ray gives your doctor clear images quickly, so treatment can start sooner. | How: Bring your doctor's request, or ask your St. Joseph doctor to refer you; Fee: Please ask our staff for the current fee | Digital X-ray on site: images are ready on screen straight away. / Consultant radiologists are on our doctor list. / Tests, X-ray and medicines are on the same site. |
| `laboratory` | 14 | Blood, urine and other tests, at any hour, with every price on our laboratory price list. | Hours: Open 24 hours, 7 days a week; Reports: Most common tests are reported within 1 day; Call: 031 784 84 84 | Open day and night, so tests are never held up by the clock. / Every test under one roof, with its price published. / A consultant histopathologist is part of our team. |
| `home-visits` | 15 | Cannot come to the hospital? Our team can visit you at home for a health check. | Call: 031 784 84 84; WhatsApp: 076 422 8898; Charges and areas: Please ask when you book | Hospital care that comes to you, helpful for older family members and anyone who finds travel hard. / Part of St. Joseph Hospital, with doctors, laboratory and pharmacy behind it. |
| `pharmacy` | 16 | Send your prescription on WhatsApp and we will get your medicines ready, with delivery across Negombo. | WhatsApp: 076 422 8898; Delivery: Across Negombo; Hours: Open 24 hours, 7 days a week | Order from home, with no travelling when you are unwell. / Medicines from the hospital's own pharmacy. |
| `inpatient-rooms` | 17 | If you need to stay with us, choose the room that suits you and your family. Prices are per day. | Ward: 9,500 LKR; Standard: 12,500 LKR; Deluxe: 15,500 LKR; Super Deluxe: 19,500 LKR | Four room types, from ward to super deluxe, so you can choose what fits your family. / Comfortable patient rooms in a clean hospital. / Specialist doctors, laboratory and pharmacy are all in the same hospital. / Managed and operated by Kids & Teens Medical Group of Los Angeles, USA. |

(The lab summary avoids the book's "323 tests" because the count has a live home in the laboratory feature; the cardiology and radiology points drop the book's counts, which the roster contradicts. Spec, section 2.)

Untranslatable in the overlays: `book.page`, and fact values that are phone numbers or prices.

- [ ] **Step 1: Write the failing tests** (`content.test.ts`):
  - "book excerpts match the Service Book": the set of `{slug: page}` equals `{outpatient-department: 9, accident-emergency: 10, cardiac-screening: 12, radiology: 13, laboratory: 14, home-visits: 15, pharmacy: 16, inpatient-rooms: 17}`; pages unique; every excerpt has 2 to 4 facts and 2 to 4 why points; no coming-soon service has a `book`.
  - extend the `strings(s)` walker to include `book.summary`, `book.facts[*].k|v`, `book.why[*]`.
  - "the only phone number is the hospital's own": allow `0317848484` and `0764228898` only when the label starts with `book.`.
  - "no prices anywhere": `inpatient-rooms` stays exempt (its book block carries the four prices).
  - e-channeling `content.test.ts`: `bookExcerpt.page === 11`.
- [ ] **Step 2: Run** `npm test`; expect FAIL.
- [ ] **Step 3: Implement** types, data, component, wiring and overlays.
- [ ] **Step 4: Run** `npm test`, `npm run check:dashes`; expect PASS.
- [ ] **Step 5: Commit** `feat(services): Service Book details on the pages the book covers`

### Task 5: Prose that presents a coming-soon service as open

Reword (and the matching `.si.ts` / `.ta.ts` lines) so nothing reads as available today. List each change in the commit body.

- `src/features/home/data/content.ts`: l.83 "critical care open 24/7"; l.138 "From emergency care to fertility"; l.312 "with intensive and critical care on site"; l.370 "Maternity, gynaecology and paediatric care" (gynaecology and paediatrics lead, maternity coming soon); l.384 "telemedicine from anywhere on the island".
- `src/features/home/data/internationalCare.ts` l.36; `src/features/home/data/network.ts` l.57 card name/body.
- `src/features/services/data/indexContent.ts`: l.103 (delivery), l.126 and l.188 (Endoscopy Unit), l.151, l.346 heading, l.410 to l.413 ("backed by a full ICU" becomes an ICU opening soon; keep the link, it is badged), l.534.
- `src/features/facilities/data/content.ts`: critical care section (`#critical`) and its jump card, ICU unit card, l.189 endoscopy unit, l.201 neonatal support: qualify "Opening soon" (badge beside the section heading via `ComingSoonBadge` in the facilities components that render them); `src/config/pageMetadata.ts` l.93 "monitored critical care".
- `src/features/international-care/data/content.ts` l.177, l.200, l.245, l.415 (telemedicine, critical care).
- `src/features/network/data/content.ts` l.177 chip "Telemedicine".
- `src/features/home-care/data/content.ts` l.190 band body.
- `src/features/media/data/content.ts` the endoscopy release (l.186, l.202): retitle as opening soon.

- [ ] **Step 1:** Make the edits; update any test that pins the old wording (search the feature's `*.test.ts` for the old string first).
- [ ] **Step 2: Run** `npm test`, `npm run check:dashes`; expect PASS.
- [ ] **Step 3: Commit** `fix(content): stop presenting coming soon services as open`

### Task 6: OPD hours and room prices, site-wide

**Files (with overlays):**
- OPD 7.00 AM to 6.00 PM: `services/data/clinics.ts` (`outpatient-department` `hours`, `facts`, `strip`, body and FAQ mentions of 24 hours), `facilities/data/content.ts` l.183, `config/pageMetadata.ts` l.63 ("24/7 OPD"), `home/data/content.ts` l.193, `home/data/faq.ts` l.24, `home/data/heroSlides.ts` l.52 ("every hour we are open" becomes "from 7.00 AM to 6.00 PM"), `services/data/indexContent.ts` hero tile text that says OPD around the clock (comment l.43 too), `components/layout/chromeCopy.ts` comment only if it states 24/7 OPD.
- Rooms: `accommodation/data/content.ts` (four `price` values, `Standard from` fact becomes `Rooms from: 9,500 LKR`), `facilities/data/content.ts` `roomRows` and the `Rooms from` fact, `international-care/data/content.ts` l.344, `home/data/content.ts` l.59 "Rooms from 9,500 LKR", `config/pageMetadata.ts` l.63, `services/data/clinics.ts` `inpatient-rooms` (`desc`, `facts`, `body2`, `strip`, FAQ "How much does a room cost?"), `services/data/indexContent.ts` l.411.
- Tests that pin the old values: `accommodation` "only the standard room carries a figure", `facilities` and `international-care` "10,000 LKR is the only price", the home strip test if any. Update them to pin the four new prices (Ward 9,500, Standard 12,500, Deluxe 15,500, Super Deluxe 19,500), not delete them.
- Create: `src/lib/siteFacts.test.ts`

- [ ] **Step 1: Write the failing test** `src/lib/siteFacts.test.ts`: walk every `.ts` file under `src/features`, `src/config`, `src/components` (skip `*.test.ts` and `laboratory/data/catalogue.ts`, `overrides.ts`); strip `//` and `/* */` comments; assert no string literal matches `/10,000 LKR|LKR 10,000|24\/7 OPD|OPD[^."]*24 hours|every hour we are open/i`.
- [ ] **Step 2: Run**; expect FAIL listing the current hits.
- [ ] **Step 3: Edit** each file until the test passes; update the pinning tests named above.
- [ ] **Step 4: Run** `npm test`, `npm run check`; expect PASS.
- [ ] **Step 5: Commit** `fix(content): OPD hours and room prices as the 2026 Service Book prints them`

### Task 7: Verify and finish

- [ ] **Step 1:** `npx eslint src scripts`, `npm test`, `npm run check`, `NODE_ENV=production npm run build`; all clean.
- [ ] **Step 2:** `npm start` on a spare port; screenshot with Playwright at 375, 768, 1280 in light and dark: `/services` (directory badges), `/services/telemedicine` (badge, note, ask CTA), `/services/inpatient-rooms` (four price grid), `/services/outpatient-department`, `/e-channeling`, home carousel, header Services menu open, `/si/services/fertility`. No horizontal scroll (`scrollWidth === innerWidth`). Click the "Read page 17" link; confirm the reader opens on page 17.
- [ ] **Step 3:** `npm run i18n:status`; note the new draft overlays in the report.
- [ ] **Step 4:** Working tree clean; report to the owner and wait for the merge go-ahead.
