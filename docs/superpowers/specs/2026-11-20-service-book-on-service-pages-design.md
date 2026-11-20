# Service Book details on the service pages, and "Coming soon" services

Date: 2026-11-20. Branch: `worktree-service-book-pages`.

## Intent

The hospital's 2026 printed Service Book (`/service-book`, source PDF and
conversion notes in `docs/service-book.md`) is now the owner's reference for
what the hospital offers. The website's 32 service pages were written before
it, and some describe services the hospital does not run yet. The owner wants:

1. Every service page that the book covers to carry what the book says.
2. Services that are not available yet to be marked **Coming soon** wherever
   the site previews or links to them, while their full detail pages stay up
   with all their content.

A visitor should never be able to read the site and believe a coming-soon
service is available today, and the site should not contradict the book the
hospital hands out at reception.

## Goals

- A "From our Service Book" section on the nine service pages the book covers.
- One "coming soon" flag per service, read by every preview of that service.
- Coming-soon detail pages keep their content but say "Coming soon" at the top
  and swap booking for "Ask us when it opens".
- Where the book and the site disagree on a fact, the site matches the book
  everywhere it states that fact, not only on the service pages (owner
  answers below say which facts).
- English, Sinhala and Tamil, like the rest of the site (new Sinhala and Tamil
  copy is draft, marked for a native speaker the usual way).

## Non-goals

- No new service pages and no removed ones. The 23 services the book does not
  cover keep their current copy (apart from the coming-soon flag).
- No change to the book reader itself or the book artwork.
- No redesign of the service detail layout beyond the new section and the
  coming-soon treatment.

## Anti-goals

- A coming-soon service that still shows a "Book" button, or a "Book a
  consultant" path, anywhere on the site.
- The book's wording scattered so widely that the next edition cannot be
  synced by editing one block per service.
- Hard-coded figures that already have a live home elsewhere (consultant
  counts, lab test count) going stale.

## The coming-soon list (owner, 2026-11-20)

| Service | Slug |
| --- | --- |
| Intensive and critical care | `intensive-critical-care` |
| Gastrointestinal and endoscopy | `endoscopy` |
| Fertility and embryology | `fertility` |
| CTG and fetal monitoring | `fetal-monitoring` |
| Obstetrics and maternity (deliveries) | `obstetrics-maternity` |
| Vaccination clinic | `vaccination-clinic` |
| Telemedicine | `telemedicine` |

The whole service is coming soon in every case (owner, 2026-11-20), not just
a specialised unit: no booking path at all for any of the seven, including
antenatal care under obstetrics. The ICU and the endoscopy unit are built but
not yet running, so sections describing them (the `/facilities` critical care
section, its building zones, the services index admissions band "backed by a
full ICU") stay and are qualified "Opening soon" rather than removed.
## Approaches considered

- **A. One flag per service plus a dedicated Service Book section (chosen by
  the owner).** A `comingSoon` flag on the service data drives every preview;
  the book's content lives in one `book` block per service, rendered as its
  own section with a link into the reader at that page. Easy to sync with the
  next edition; facts the book changes are also corrected in the existing copy.
- **B. Same flag, book wording merged into the existing sections** (facts,
  steps, FAQ). Reads more seamlessly but scatters the book's wording and makes
  the next edition hard to apply.
- **C. Badges on previews only.** Fastest, but leaves "Book" buttons on
  services that cannot be booked.

## Design

### 1. Data

- `Service` (`src/features/services/types.ts`) gains:
  - `comingSoon?: true`
  - `book?: ServiceBookExcerpt`, where `ServiceBookExcerpt` is
    `{ page: number; summary: string; facts: { k: string; v: string }[]; why: string[] }`.
    `page` is the printed page number (equals the reader's page number, see
    `docs/service-book.md`).
- A single exported list of coming-soon slugs is derived from the data
  (`comingSoonSlugs`), exported through `features/services/index.ts` so other
  features and `config/` can read it without reaching into internals. Where a
  module cannot import it (node-test-loaded config), it restates the list and a
  test asserts the two are equal, the pattern `locations` already uses.
- Sinhala and Tamil overlays (`*.si.ts`, `*.ta.ts`) gain the `book.summary`,
  `book.facts[*].k|v` (values that are numbers or phone numbers stay
  untranslatable), and `book.why[*]` strings. `comingSoon` and `page` are
  structural and untranslatable.

### 2. Book content per service

Transcribed from the 2026 book pages (read 2026-11-20). "Why St. Joseph"
points are the book's own; numbers that have a live home on the site are
handled as noted.

| Book page | Book service | Site page | Notes |
| --- | --- | --- | --- |
| 9 | Free OPD | `outpatient-department` | Hours 7.00 AM to 6.00 PM, where, call. Why: no charge; managed and operated by Kids & Teens Medical Group of Los Angeles, USA; lab, X-ray, pharmacy on site |
| 10 | Emergency care, 24 hours | `accident-emergency` | Hours: 24 hours (the book's "7.00 AM to 6.00 PM" box is an artwork slip, owner confirmed). Why: open day and night incl. weekends; lab and pharmacy 24 h; consultants on site |
| 11 | Super Channelling | none (goes on `/e-channeling`) | Call, WhatsApp, fee "ask our staff". Why: consultants across 25+ specialities; Sunday and evening sessions; tests, X-ray and medicines on site |
| 12 | Exercise ECG | `cardiac-screening` | Same day appointment; a medical officer is appointed for your test; fee: ask staff. Why: same day; medical officer; consultant cardiologists on site |
| 13 | Digital X-ray | `radiology` | How: bring your doctor's request or be referred; fee: ask staff. Why: images on screen straight away; consultant radiologists; tests, X-ray, medicines on site |
| 14 | Laboratory, open 24/7 | `laboratory` | Hours 24/7; most common tests reported within 1 day; call. Why: open day and night; tests under one roof with prices; consultant histopathologist |
| 15 | Home visits | `home-visits` | Call, WhatsApp; charges and areas: ask when you book. Why: care that comes to you; doctors, lab and pharmacy behind it |
| 16 | Pharmacy, open 24/7 | `pharmacy` | WhatsApp prescription; delivery across Negombo (the site's existing terms stay, owner; the book's "free within 1 km" is not printed); open 24/7. Why: order from home; hospital's own pharmacy |
| 17 | Rooms and inpatient care | `inpatient-rooms` | Ward 9,500, Standard 12,500, Deluxe 15,500, Super Deluxe 19,500 LKR per day (owner: the book is correct). Why: four room types; comfortable rooms; doctors, lab, pharmacy in one hospital; managed and operated by Kids & Teens Medical Group |

`book` is a `Service`-only field, one excerpt per page number (page 16 goes
on `pharmacy` only). The stand-alone `/pharmacy`, `/accommodation` and
`/laboratory-tests` pages get the corrected facts but no excerpt section.
(Builder's call.)

The book's "managed to American hospital standards" points are written with
the owner-approved affiliation wording ("Managed and operated by Kids & Teens
Medical Group of Los Angeles, USA"), not as printed, so the site makes no
standards or accreditation claim. (Builder's call.)

Figures with a live home elsewhere: the lab test count comes from the
laboratory feature's catalogue summary (as the home hero slide already does),
and consultant counts per specialty are not typed (the book's "five
radiologists" and "five cardiologists" disagree with the live roster's 2 and
4, and "74 consultants" with its 83). The Why points are worded without those
counts. (Builder's call, recorded here.)

### 3. "From our Service Book" section (detail pages)

Rendered by a new `detail/BookExcerptSection.tsx` between `AboutSection` and
`JourneySection`, only when `service.book` is set:

```
FROM OUR SERVICE BOOK · PAGE 12
Exercise ECG
An exercise ECG checks how your heart works when it is under effort...
┌──────────────┬──────────────────────┬──────────────────────┐
│ APPOINTMENT  │ YOUR TEST            │ FEE                  │
│ Same day...  │ A medical officer... │ Ask our staff...     │
└──────────────┴──────────────────────┴──────────────────────┘
Why St. Joseph
 ✓ Same-day appointment, so you can be tested without delay
 ✓ A medical officer looks after you during the test
 ✓ Consultant cardiologists on the same site
[ Read page 12 of the Service Book → ]   (opens /service-book/read#page-12)
```

Same theme tokens and type scale as the existing detail sections; facts grid
follows the column-count-from-facts pattern used on `/locations`. Mobile:
one column. The link uses the reader's existing page hash
(`features/service-book/lib/pageHash.ts`, to be exported through that
feature's `index.ts`).

Phone and WhatsApp facts in an excerpt print the book's numbers
(031 784 84 84, 076 422 8898); the owner confirmed both those and the site's
own (0117 84 84 84, 074 222 333 4) are in use, so the rest of the site keeps
its current numbers.

The Super Channelling excerpt renders on `/e-channeling` through the same
component, exported via `features/services/index.ts`.

### 4. Coming soon

A shared `ComingSoonBadge` in `components/ui` (pill, `--home-accent` tint,
"Coming soon" / Sinhala / Tamil from chrome copy).

Shown on every preview or link to a coming-soon service:

- `/services` directory cards (`ServiceDirectory`) and the index bands that
  list services (`CentresSection`, `SurgicalSection`, `DiagnosticsSection`,
  and any other band that links a coming-soon slug).
- Home page specialties carousel (`features/home/data/content.ts` links) and
  any home teaser linking a coming-soon slug (the network teaser's telemedicine
  link).
- Header Services menu (desktop panel and mobile drawer): a small "Soon" pill
  after the title; the menu stays title-only otherwise.
- Detail pages: the service picker chips and the related-services cards.
- Home care page: the telemedicine hand-off band and its footer link.

On a coming-soon detail page:

- A "Coming soon" badge beside the hero kicker, and one line under the lede:
  "This service is not open yet. Call or WhatsApp us to hear when it opens."
- Every booking CTA on the page (the hero button, the AboutSection link and
  `DetailBookSection`, which today point at `#book` and from there at
  `/contact-us` and the phone line) becomes "Ask us when it opens", linking to
  the hospital's call and WhatsApp numbers.
- All other content (about, journey, team, FAQ) stays.

Prose elsewhere that presents a coming-soon service as available today is
reworded or qualified (for example the home "From emergency care to
fertility" line, "telemedicine from anywhere on the island", the facilities
"endoscopy unit", international care's "review by telemedicine"). The builder
lists each change in the commit message.

### 5. Facts the book changes, site-wide

Applied wherever the site states them (services data, accommodation,
facilities, international care, home page strip and hero, page metadata), with
the tests that pin the old values updated, not deleted:

- **OPD hours:** 7.00 AM to 6.00 PM, not 24 hours (for example the
  `outpatient-department` service, facilities "open 24 hours", metadata
  "24/7 OPD", the home free OPD slide's "every hour we are open").
- **Room prices:** Ward 9,500, Standard 12,500, Deluxe 15,500, Super Deluxe
  19,500 LKR per day, replacing "from 10,000 LKR" and "on request".
- **Emergency** stays 24 hours; **pharmacy delivery** stays "across Negombo";
  **phone and WhatsApp** stay as they are outside the excerpts.

### 6. Tests

- Every `comingSoon` slug is in the owner's list and vice versa.
- No coming-soon service links to `/e-channeling` or carries a "Book" CTA.
- Every link to `/services/<coming-soon slug>` across nav, home and services
  data is rendered with the badge (data-level: the link carries the flag).
- `book.page` is within the Services chapter (pages 9 to 17) and unique.
- Existing "no prices" and "only phone number" tests are updated (the four
  room prices on `inpatient-rooms`; the book's two numbers inside `book`
  excerpts), not deleted.
- i18n parity for the new strings.

## Owner answers (2026-11-20)

1. WhatsApp: both 076 422 8898 and 074 222 333 4 are in use.
2. Phone: both 031 784 84 84 and 0117 84 84 84 are in use.
3. All seven services are wholly coming soon.
4. The ICU and endoscopy unit are built but not yet running.
5. OPD hours are 7.00 AM to 6.00 PM, as the book says.
6. The book's room prices are correct.
7. Pharmacy delivery stays "across Negombo".
8. Emergency is 24 hours; the book's hours box is a slip.

## Left to the builder

- Exact section spacing and badge styling within the existing tokens.
- Wording of reworded prose for coming-soon services.
- Sinhala and Tamil drafts.
