# Services Pages — Design

Date: 2026-08-20
Branch: `worktree-services-pages`

## Goal

Rebuild `/services` as a services hub, and give **every** service its own page,
in the visual language of two Claude Design references.

## Sources and their standing

| Source | Standing |
|---|---|
| `…\Designs\sj-hospital\SJ Hospital Services.html` | **Design only** — index layout, sections, motion |
| `…\Designs\sj-hospital\SJ Hospital Service Pages.html` | **Design only** — detail-page template |
| This repo (`MainServicesGrid`, `DepartmentGrid`, `e-channeling/data/doctors.ts`, home sections) | **Authority on what the hospital actually offers** |
| `kingshospital.lk`, `lankahospitals.com`, `nawaloka.com` | Clinical grounding for wording — scope, conditions, prep |

The references are examples that establish the *look*, not a content contract.
Their service list is partly invented and must not be treated as fact. The
catalog is built from what this hospital actually offers, and the reference
design is applied to it.

The three hospital sites inform vocabulary and the shape of a service
description only. **Nothing is copied verbatim** — all copy is written fresh.
**Every contact detail is St. Joseph's own**: `0117 84 84 84`,
`229/10 St. Joseph Street, Negombo`. No phone, address, price, or consultant
name from any other hospital appears anywhere.

Both refs are bundled artifacts. Decode as in the `home-design-reference`
memory: `JSON.parse(lines[389])` is the rendered DOM, line 378 is the asset map,
styling is inline `style` attributes with `style-hover="…"` pairs for hover.

## Decisions

| Decision | Choice |
|---|---|
| Design shell | The home page's themed system (Bricolage Grotesque + Manrope, `sj-theme` dark/light, `#2CA6F0` accent), **not** the purple marketing shell |
| Shell code | Promote the home design system to shared components; home and services share one implementation |
| Catalog source | The hospital's real services, plus reference extras the user confirmed |
| Taxonomy | The reference's 6 groups |
| Coverage | Every service gets a full detail page — 36 |
| Routing | Real routes `/services/<slug>`, prerendered, per-service metadata |
| Existing page | Replaced; old `features/services` components deleted |

User-confirmed facts (asked because the codebase could not settle them):

- **Full ICU** — monitored beds with ventilation and consultant rounds.
- **No dental service** — dropped entirely; it appears in neither the directory
  nor as a page. (Kings and Lanka both offer dental; St. Joseph does not.)
- **Health-check packages are not priced** — the section keeps the reference's
  three-tier design but carries **no prices**. Each tier gets a "Request a
  quote" CTA instead. No LKR figure from the reference is used.
- **True sub-claims:** neonatal support at delivery, day-case cataract surgery,
  a dedicated wound clinic, and an own ambulance fleet.

## Catalog — 36 services

Every entry is backed by a consultant in `e-channeling/data/doctors.ts`, a
service in `MainServicesGrid`/`DepartmentGrid`, a home-page claim, or an explicit
user confirmation above.

Editorial merges (judgment calls, not new claims): `General Physician` folds into
**OPD**; `PTA` folds into **Physiotherapy**; `Audiology` folds into **ENT** (as
the reference itself does); `Clinical Laboratory` and `Laboratory Services` are
one service; `Scanning` is covered by **Radiology**.

### Emergency (2)

| Slug | Title | Backed by |
|---|---|---|
| `accident-emergency` | Accident & emergency | `MainServicesGrid` Emergency; ambulance bay; own fleet confirmed |
| `intensive-critical-care` | Intensive & critical care | User confirmed full ICU |

### Surgical (7)

| Slug | Title | Backed by |
|---|---|---|
| `general-surgery` | General surgery | `Surgeon`; `SurgicalSection` "General surgery" |
| `orthopaedic-surgery` | Orthopaedic surgery | `Orthopaedic Surgeon`; "Orthopaedic procedures" |
| `ent-surgery` | ENT surgery & audiology | `ENT Surgeon`, `Audiologist` |
| `urology` | Urology | `Urologist` |
| `ophthalmology` | Ophthalmology & cataract surgery | `Eye Surgeon`; day-case cataract confirmed |
| `neurosurgery` | Neurosurgery | `Neuro Surgeon` |
| `endoscopy` | Gastrointestinal & endoscopy | `Gastroenterologist`; "Endoscopy suite" |

### Diagnostics (4)

| Slug | Title | Backed by |
|---|---|---|
| `laboratory` | Laboratory services | Laboratory Services, Clinical Laboratory, `Histopathologist` |
| `radiology` | Radiology & digital X-ray | X-Ray Service, Scanning, `Radiologist` |
| `cardiac-screening` | Cardiac screening & ECG | ECG department, `Cardiologist` |
| `fetal-monitoring` | CTG & fetal monitoring | CTG department |

### Clinics (14)

| Slug | Title | Backed by |
|---|---|---|
| `outpatient-department` | Outpatient department (OPD) | OPD; `Physician` |
| `cardiology` | Cardiology | `Cardiologist` |
| `dermatology` | Dermatology & wound clinic | `Dermatologist`; wound clinic confirmed |
| `diabetes-endocrinology` | Diabetes & endocrine care | Diabetes Care; `Endocrinologist` |
| `nutrition` | Nutrition & dietetics | Nutrition; `Nutritionist` |
| `rheumatology` | Rheumatology | Rheumatology; `Rheumatologist` |
| `neurology` | Neurology | `Neurologist / Neuro Physician` |
| `nephrology` | Nephrology & renal care | `Nephrologist` |
| `respiratory-medicine` | Respiratory & chest medicine | `Respiratory / Chest Physician` |
| `haematology` | Haematology | `Hematologist` |
| `mental-health` | Mental health & counselling | `Psychiatrist`, `Counseling Psychologist` |
| `physiotherapy` | Physiotherapy & rehabilitation | Physiotherapy, PTA; `Physiotherapist` |
| `speech-therapy` | Speech & language therapy | Speech Therapy; `Speech Therapist` |
| `inpatient-rooms` | Inpatient rooms | Inpatient Rooms; `RoomsSection` |

### Women & children (5)

| Slug | Title | Backed by |
|---|---|---|
| `obstetrics-maternity` | Obstetrics & maternity | `Gynecologist`; "Obstetric theatre"; neonatal support confirmed |
| `gynaecology` | Gynaecology | Gynecology; `Gynecologist` |
| `paediatrics` | Paediatrics & neonatal care | Pediatrics; `Pediatrician`; Kids & Teens protocol |
| `fertility` | Fertility & embryology | `Clinical Embryologist / Fertility Counselor` |
| `vaccination-clinic` | Vaccination clinic | Vaccination Clinic |

### At home (4)

| Slug | Title | Backed by |
|---|---|---|
| `pharmacy` | 24-hour pharmacy | Pharmacy; `PharmacySection` 24/7 |
| `medicine-delivery` | Medicine delivery | "Home delivery radius: Negombo" |
| `home-visits` | Home visits | Home Visiting Services, 6 vehicles |
| `telemedicine` | Telemedicine | Telemedicine department |

Filter chip counts, which must sum to 36: All 36 · Emergency 2 · Surgical 7 ·
Diagnostics 4 · Clinics 14 · Women & children 5 · At home 4.

Eleven services have reference copy that can be adapted (`accident-emergency`,
`general-surgery`, `endoscopy`, `obstetrics-maternity`, `paediatrics`,
`laboratory`, `radiology`, `physiotherapy`, `pharmacy`, `home-visits`,
`inpatient-rooms`) — adapted, not pasted, since the reference states facts this
hospital has not confirmed. The other 25 are written from scratch.

## Data model

`src/features/services/types.ts`

```ts
export type ServiceGroup =
  | "Emergency" | "Surgical" | "Diagnostics"
  | "Clinics" | "Women & children" | "At home";

export type KeyValue = { k: string; v: string };
export type Step = { no: string; title: string; desc: string };
export type TeamMember = { role: string; note: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;          // detail <h1>
  directoryTitle: string; // directory row
  group: ServiceGroup;
  hours: string;
  cta: string;
  desc: string;           // directory accordion body
  tags: string[];
  facts: KeyValue[];
  lede: string;
  aboutHead: string;
  body1: string;
  body2: string;
  strip: KeyValue[];      // 4 hero stats
  covers: string[];
  conditions: string[];
  location: string;
  steps: Step[];          // exactly 4
  prep: string[];
  team: TeamMember[];
  faq: Faq[];
};
```

`src/features/services/data/services.ts` exports `services: Service[]` (36),
`getService(slug)`, `serviceSlugs`, and `relatedServices(slug)` — three
same-group services where possible, falling back to the reference's
`(idx + n) % len` walk.

`src/features/services/data/groups.ts` exports the filter order:
`["All", "Emergency", "Surgical", "Diagnostics", "Clinics", "Women & children", "At home"]`.

Because the file is large, the catalog is split into one module per group
(`data/services/emergency.ts`, `surgical.ts`, …) and concatenated in
`data/services.ts`. Keeps each file reviewable.

## Routing

`/services` leaves the `(marketing)` route group — that layout injects the purple
`SiteHeader`/`SiteFooter`, and leaving the old segment would collide on the URL.

```
src/app/services/layout.tsx
src/app/services/page.tsx
src/app/services/[slug]/page.tsx
src/app/services/[slug]/not-found.tsx
```

Next 16 specifics:

- `params` is a Promise: `const { slug } = await params` — in the page **and**
  `generateMetadata`.
- `generateStaticParams()` returns all 36 slugs.
- Unknown slug → `notFound()`.
- No `cookies`/`headers`/`searchParams` are read, so no `<Suspense>` boundary is
  needed; filter state is client state, not URL state.
- Read the relevant guide in `node_modules/next/dist/docs/` before writing the
  route files.

Deleted: `src/app/(marketing)/services/`, and
`features/services/components/{MainServicesGrid,DepartmentGrid,DepartmentIcons}.tsx`
once nothing imports them.

## Shared shell

The home design system is scoped by `[data-home]` in `globals.css` (28
`--home-*` custom properties, the `.sj-invert` / `.sj-accentify` / `.sj-link` /
`.sj-row` / `.sj-row-fill` / `.sj-bento` hover utilities, and the
`[data-stagger-armed]` / `[data-stagger-revealed]` reveal). The theme store reads
`#home-root`. Only four files touch those hooks: `globals.css`, `HomePage.tsx`,
`HomeThemeScript.tsx`, `useHomeTheme.tsx`.

1. Rename the scope hook `[data-home]` → `[data-sj]`, `#home-root` → `#sj-root`.
   Keep every `--home-*` variable name — renaming 28 tokens across the home
   feature is churn with real regression risk and no benefit.
2. Promote to shared:
   - `src/components/theme/ThemeScript.tsx` (from `HomeThemeScript`)
   - `src/components/theme/useSiteTheme.tsx` (from `useHomeTheme`; storage key
     stays `sj-home-theme` so saved themes survive)
   - `src/components/theme/ThemeToggleButton.tsx`
   - `src/components/layout/ThemedShell.tsx` — the `#sj-root` div with `data-sj`,
     `data-theme="dark"`, `suppressHydrationWarning`, theme script and provider
   - `src/components/ui/{Reveal,RevealStagger,ParallaxLayer}.tsx`
   - `src/components/layout/MobileNavPanel.tsx`
   - `src/components/ui/BrandIcons.tsx` (from `features/home/components/icons.tsx`)
3. `ThemedHeader` / `ThemedFooter` in `src/components/layout/`, parameterised by
   nav items, footer link columns and book href. The references genuinely differ
   here (services nav is
   `Services / Facilities / Health Checks / Admissions / International Patient Care`;
   services footer columns are `Centres of excellence / Full directory / …`), so
   markup is shared and only data differs.
4. `features/home` is refactored to consume all of the above. **The home page's
   rendered markup must not change** — a move-and-parameterise, not a redesign.
   `data-home` → `data-sj` is the only attribute change, and `globals.css` is
   updated in the same commit.

Neither reference header is sticky (both sit inside the hero), so the existing
`[data-home] section[id] { scroll-margin-top: 0 }` rule — becoming `[data-sj] …`
— is correct for the services pages too.

## Index page — `/services`

Thirteen sections, in reference order:

1. **`#top` hero** — fixed-dark exterior render with parallax, header + nav +
   theme toggle, headline, "Open the directory →".
2. **`#jump`** — 4 cards: `9 units / Centres of excellence`,
   `36 services / Full directory`, `Health checks`, `4 steps / Admissions`.
3. **`#centres`** — 9 centres of excellence, each linking into `#directory`.
4. **`#directory`** — the core. Group filter chips with counts (`All (36)`,
   `Emergency (2)`, …), heading switching between `"Everything we treat"` and
   `"<Group> services"`, an `"N of 36 services"` count, and 36 accordion rows
   numbered `/01`–`/36`. An open row shows desc, tags, facts, and — **a
   deviation from the reference** — a link to `/services/<slug>`.
5. **`#surgical`** — Department of surgery: the 7 surgical services plus
   anaesthesia and post-operative care.
6. **`#diagnostics`** — laboratory, imaging and cardiac tests with turnarounds
   already claimed on the site (same-day reports, X-ray read within the hour).
7. **`#packages`** — three health-check tiers, reference design, **no prices**,
   "Request a quote" CTA on each.
8. **`#admissions`** — 4 steps, "Bring with you", "Payment & insurance",
   "The rooms".
9. **`#facilities`** — 4 facility cards plus the comforts chips.
10. **`#pharmacy`** — authorized stock, 24/7, Negombo delivery.
11. **`#international`** — 6 numbered items, airport proximity.
12. **`#book`** — CTA with "Browse services →".
13. **`footer #contact`** — themed footer, services-specific link columns.

Client leaves: `ServiceDirectory` (filter + accordion). Everything else is a
Server Component.

## Detail page — `/services/<slug>`

1. **`#top` hero** — Ken Burns exterior image (`data-burns`, 26s, disabled under
   `prefers-reduced-motion`), header, group eyebrow, `<h1>`, lede, CTA, 4-stat
   `strip`.
2. **Service picker** — the reference's client-side `#hash` picker becomes a row
   of `<Link>`s across all 36 routes, current one accent-filled.
3. **`#about`** — `aboutHead`, `body1`, `body2`, "What this covers" (`covers`),
   "Conditions we see most" (`conditions` chips), and a CTA card carrying
   `facts` and `location` above `229/10 St. Joseph Street, Negombo`.
4. **`#journey`** — "Your visit, step by step", 4 big-numbered steps, then
   "How to prepare" / "Bring with you" from `prep`.
5. **`#team`** — role/note pairs. Roles only — **no consultant names**, so the
   pages never go stale against the e-channeling directory.
6. **`#faq`** — accordion over `faq`.
7. **`#related`** — 3 related services, linked.
8. **`#book`** — CTA using the service's `cta`.
9. **`footer #contact`**.

Client leaves: `FaqAccordion`. Everything else is a Server Component.

Metadata: `title: "<title> | St. Joseph Hospital Negombo"`, `description` from
`lede` trimmed to ~155 chars.

## Wiring

- `config/homeNavigation.ts`: `Services` → `/services` (was `#services`).
- `HomeFooter` care column: `Services` → `/services`.
- `ServicesBentoSection`: cards link to their `/services/<slug>`, plus a
  "View all 36 services →" link.
- `config/navigation.ts`: `Medical Services` → `/services` already correct, so
  the marketing footer needs no change.
- Detail pages carry a back-link to `/services`.
- Cross-links between `#centres`, directory rows, `#related` and detail routes.

## Assets

Five reference images already exist in the repo (md5-verified):

| Reference asset | Repo file |
|---|---|
| `e810bcd3…` "Outpatient reception" | `public/images/welcome.jpg` |
| `b36977ed…` "Diagnostics" | `public/images/doctors.jpg` |
| `7dd1ae31…` / `cb3cc71d…` | `public/images/hero-exterior.png` |
| `ee4678cc…` / `72e34c9c…` | logo — use `LOGO_MARK` from `config/brand` |

Two are new exterior dusk renders, added as
`public/images/services/exterior-dusk-a.png` (`7da935c7…`, index and detail hero)
and `public/images/services/exterior-dusk-b.png` (`ea1cbf25…`, ambulance
entrance). Copied as-is — `sharp`'s install scripts are blocked in this worktree,
so no re-encoding.

## Content rules

All 36 services need written copy. Hard rules:

- **Never** a price, a consultant name, an equipment brand, an accreditation, or
  a success rate.
- Turnaround and hours claims only where the site already states them: 24-hour
  lab, pharmacy, OPD and emergency; two-doctor report verification; X-ray read
  within the hour; same-day lab reports; 10% OPD lab discount; 6 home-visit
  vehicles; rooms from 10,000 LKR; Kids & Teens paediatric protocol; ten minutes
  from Bandaranaike International.
- Contact details are always St. Joseph's: `0117 84 84 84`,
  `229/10 St. Joseph Street, Negombo`.
- `team` lists roles, never names.
- Nothing is copied verbatim from any reference or hospital site.
- Where a service's scope is uncertain, describe it narrowly rather than
  expansively.

The implementation hands over a review checklist of all 36 pages and every
clinical claim made, for the user's fact-check.

## Verification

1. `npm run lint` — clean.
2. `npm run build` — succeeds; route list shows `/services` plus 36 prerendered
   `/services/[slug]` entries.
3. Assert in review that no `[data-home]` references remain and that filter
   counts sum to 36.
4. `npm run dev` on a free port; click through `/services` and a sample of detail
   routes in **both** themes — group filter, directory accordion, FAQ accordion,
   reveals, parallax, mobile nav.
5. Re-check the **home page** for regressions from the shared-shell refactor —
   hero, bento hovers, stagger reveals, theme toggle, footer.
6. Hand over the content review checklist.

Baseline before any change: lint clean, build succeeds, 11 static routes.

## Out of scope

- Porting `about-us`, `career`, `contact-us`, `accommodation`, `e-channeling` to
  the themed shell. They keep the purple chrome, so the site carries two looks
  until those are ported separately.
- Booking / e-channeling integration — CTAs point at `#book` or existing routes.
- Renaming the `--home-*` custom properties.
- Any change to the home page's rendered output.
- Dental services, and any priced health-check package.
