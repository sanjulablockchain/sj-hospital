# Interior Pages Design

Date: 2026-08-04

## Purpose

Add seven interior marketing pages to the St. Joseph Hospital site, sourcing real copy and images from the live site `https://sjhospital.lk/` (a WordPress site) and rebuilding them as Next.js 16 App Router pages that follow this repo's feature-based architecture and the homepage's visual system (see `docs/superpowers/specs/2026-08-03-homepage-design.md`):

- Contact Us (`/contact-us`) — with a working contact form (Nodemailer) and an OpenStreetMap location map.
- Career (`/career`)
- About Us (`/about-us`)
- Accommodation (`/accommodation`)
- Services (`/services`)
- e-Channeling (`/e-channeling`) — the header's "Book Appointment"/"Appointments" CTAs must land here.
- Privacy Policy (`/privacy-policy`)

No automated tests are required; the user verifies manually in a browser (Playwright MCP may be used as a self-check during implementation, as it was for the homepage).

## Non-goals

- No gallery page (nav/footer's "Gallery" link stays pointed at the live external site — not requested).
- No real booking backend for e-Channeling — it links out to each doctor's real Calendly page, exactly as the live site does.
- No CMS/admin UI for editing this content — it's static/hardcoded per-page content, matching the live site's own nature (plain WordPress pages, not a booking or records system).
- Not porting live-site marketing popups ("Nidahas VIP," the "Healthy Life Clinic" location picker, the orphaned test popup) — out of scope, and the VIP popup's own CTA is dead on the live site anyway.
- Not porting the Privacy Policy's mobile-app "Delete Your Personal Data" section — that's Play Store/App Store account-deletion compliance for a mobile app this project doesn't include.
- No real SMTP credentials committed anywhere — only env var *names* are wired up; the user supplies real values in `.env.local`.

## Routing & feature ownership

New routes under the existing `src/app/(marketing)/` route group (adds no URL segment beyond each page's own folder), each a thin `page.tsx`:

| Route | Renders | Feature module |
|---|---|---|
| `/contact-us` | `<ContactPage />` | `src/features/contact/` |
| `/career` | `<CareerPage />` | `src/features/career/` |
| `/about-us` | `<AboutPage />` | `src/features/about/` |
| `/accommodation` | `<AccommodationPage />` | `src/features/accommodation/` |
| `/services` | `<ServicesPage />` | `src/features/services/` |
| `/e-channeling` | `<EChannelingPage />` | `src/features/e-channeling/` |
| `/privacy-policy` | inline sections | route-local `_components/` (pure static legal text; never reused elsewhere, so it stays colocated per CLAUDE.md rather than becoming a feature) |

Each feature follows the same shape as `src/features/home/`: `components/`, an `index.tsx` (or `index.ts`) exporting the composed page, plus `actions/`, `schemas.ts`, `types.ts` where the feature actually has behavior (only `contact` needs these).

### Navigation changes

`src/config/navigation.ts` currently sends most items to homepage anchors and Career to the live external site:

```ts
{ label: "Medical Services", href: "#services" }       -> "/services"
{ label: "Accommodation", href: "#accommodation" }     -> "/accommodation"
{ label: "About Us", href: "#about" }                  -> "/about-us"
{ label: "Career", href: "https://sjhospital.lk/career/" } -> "/career"
{ label: "Contact Us", href: "#contact" }               -> "/contact-us"
```

`SiteHeader.tsx`: both "Book Appointment" and "Appointments" links (currently `https://sjhospital.lk/e-channeling/`) become `Link href="/e-channeling"`; "Inpatient Room Booking" (currently `https://sjhospital.lk/accommodation/`) becomes `Link href="/accommodation"`. `SiteFooter.tsx`: the "Privacy Policy" link becomes `Link href="/privacy-policy"`. Since none of these hrefs start with `http` anymore, the existing `item.href.startsWith("http") ? <a> : <Link>` branches in `SiteHeader`/`SiteFooter` automatically render them as internal `Link`s with no further code change needed there. The footer's "Gallery" link and its `id="contact"` attribute are left as-is (harmless, unused by nav now, still a valid deep-link target).

## Shared infrastructure

### `components/layout/PageBanner.tsx`

A compact, reusable top-of-page banner for interior pages (title, short subtitle/breadcrumb, optional background photo with a dark overlay for text contrast) — replacing the homepage's large `Hero` for these lighter pages. Server Component. Used by About, Career, Accommodation, Services, e-Channeling, Contact; Privacy Policy uses a simpler plain heading (no photo — it's a legal page).

### `features/contact/`

The one feature with real interactivity, reused on both Contact Us and Accommodation (the live site embeds the same contact form on both):

- `components/ContactForm.tsx` — `'use client'` leaf. Fields: First Name*, Last Name*, Email*, Message (matching the live WPForms field set — no phone/subject/department fields exist on the live form). Client-side pending/success/error state via `useActionState`/`useTransition` around the server action.
- `components/ContactInfo.tsx` — address, phone numbers, emails (Server Component, reuses `PhoneIcon`/`SmartphoneIcon`/`MailIcon`).
- `components/LocationMap.tsx` — `'use client'` leaf. Plain `leaflet` (not `react-leaflet` — avoids any React 19 compatibility risk from a wrapper library and keeps the bundle smaller) driven via a `ref` + `useEffect`, OSM tile layer, centered on `(7.206699127328975, 79.8453343846586)` with zoom ~16, a custom marker styled in the site's purple/cyan theme (inline SVG or `L.divIcon`), popup showing "St. Joseph Hospital Negombo." Disabled/no-op safe under SSR (map only initializes client-side in `useEffect`).
- `schemas.ts` — Zod schema: `firstName`, `lastName` (both required, min length), `email` (required, valid email), `message` (optional, matching the live form).
- `actions/sendContactMessage.ts` — `'use server'`. Validates input against the schema, then sends via **Nodemailer** using a transporter built in `lib/mailer.ts` (see below). Returns a discriminated result (`{ ok: true }` | `{ ok: false, error: string }`) for the client to render.
- `lib/mailer.ts` — starts with `import 'server-only'`. Builds a Nodemailer SMTP transporter from env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`. Sends to the comma-separated list in `CONTACT_TO_EMAILS`.
- `index.ts` — exports `ContactForm`, `ContactInfo`, `LocationMap`, `sendContactMessage` for reuse on the Accommodation page.

`.env.local.example` (new file, committed) documents the required vars with placeholder values and a comment; for local dev/testing, `CONTACT_TO_EMAILS` defaults to:
```
CONTACT_TO_EMAILS=sanjula.rajapaksha@ktdoctor.com,sanjulablockchain@gmail.com
```
Real SMTP host/user/pass are left blank for the user to fill in — never committed.

## Per-page content plan

All copy below is sourced verbatim from the live site (research performed this session); minor cleanup applied uniformly: normalize phone number formatting to the homepage's existing style (`0117 84 84 84` / `074 222 333 4`), fix the two malformed Calendly `href`s (stray leading space; missing opening quote) without changing their target URLs, and (per prior homepage precedent) no em dashes in shipped copy.

### About Us (`/about-us`)

- `PageBanner`: "About Us."
- Intro (4 paragraphs, verbatim): hospital delivers "US standard, high-quality healthcare... recently refurbished with a USD 1 million investment led by Kids & Teens Pediatric Medical Group (Los Angeles) and Asia Corp"; first hospital in Negombo accepting corporate insurance at OPD; modern laboratory + digital X-ray; digital file access for patients.
- "What Makes Us Different" — 6 cards: Managed and Operated by USA; Affordable US Healthcare Standards; Advanced Technology; Commitment to Safety and Hygiene; Convenient Location and Comprehensive Services; Evidence Based Billing (each with its live-site one-line description).
- Mission: "Our aim is to provide our community with complete healthcare solutions that combine advanced technology with patient-centered care, empowering them to take charge of their health." Vision: "We aim to make the highest quality healthcare available to everyone in Sri Lanka through collective efforts."
- "About Kids & Teens Medical Group" section with logo + the verbatim paragraph about the 50+ board-certified pediatricians and the expansion-to-Sri-Lanka paragraph (the live site accidentally duplicates the first paragraph twice — we ship it once, that's a content bug not worth reproducing).
- Partner-logo strip: 5 logos, downloaded as-is.

### Career (`/career`)

- `PageBanner`: H1 "Join the Team That Heals With Purpose", subtitle "More than a career, It's a calling to care, serve, and make a difference in lives."
- "Building a Healthier Tomorrow, Together" — 4 verbatim paragraphs about people being the heart of the hospital's success, being operated by Kids and Teens Medical Group (USA), and inviting passionate/qualified candidates.
- "Why Work With Us?" — 7 checkmark items: Supportive Team-Based Culture; Growth & Development; Modern Facilities & Technology; Competitive Pay & Health Benefits; Inclusive & Respectful Work Culture; Work-Life Balance; Opportunities for All Roles.
- "Open Roles" — 2 structured job cards built from the flyer text (not the flyer images themselves):
  - **Pharmacist** — Bachelor's in Pharmacy, valid SLMC/pharmaceutical registration, 1–2 yrs hospital/retail pharmacy experience preferred, strong interpersonal skills, team player. Offers competitive salary, professional environment, growth opportunities. Apply: "Send your CV to hr@ktdoctor.com or contact us at 074 220 8704 for more information. Please include 'Pharmacist' in the subject line." Location: St. Joseph Hospital, Negombo.
  - **Business Development / Insurance Coordinator** — sales strategy, insurance-company partnerships, client outreach, package coordination, targets, record-keeping. Requirements: 2+ yrs insurance sales/healthcare marketing/BD experience, understanding of health insurance/claims/Sri Lanka healthcare landscape, self-motivated, fluent English & Sinhala (Tamil a plus). *(The live flyer's "Male candidates are preferred to apply" line is dropped — discriminatory and not something to carry into the rebuild.)* Apply: "Send your CV to hr@ktdoctor.com. For inquiries, call 074 220 8704."

### Accommodation (`/accommodation`)

- `PageBanner`: "Experience US Standard Comfort and Facilities in Our Inpatient Rooms."
- Intro: room categories range from functional/basic to upgraded premium; 3 daily meals (Eastern/Western/Sri Lankan cuisine, diabetic option), tea/coffee with a snack.
- 4 room-type sections, each with 1–2 real photos + amenity list:
  - **Standard** — hot/cool water, TV, Wi-Fi, bystander bed & chair, AC, necessary medical support.
  - **Deluxe** — larger space + all Standard amenities + bystander sofa, pantry area with tea station, coffee table, hot water kettle.
  - **Super Deluxe** — all Deluxe amenities + bystander sofa and chair, morning papers, separate steward service.
  - **Wards** — AC, cool/hot water, individual bystander beds & chairs, TV, 3-bed/2-bed options, common washroom, bed separators for privacy; discharge may include a complimentary fruit/chocolate basket, physician-discretion discounts, optional VIP service.
- "Specialties of Our Inpatient Rooms" — 10-item checklist (Comfortable & Spacious Rooms; 24/7 Medical Assistance; Advanced Patient Monitoring; Private & Semi-Private Options; High-Quality Hygiene & Safety; Personalized Meal Plans; Family-Friendly Facilities; Television & Wi-Fi Access; Emergency Response System; Pharmacy & Diagnostic Support).
- Shared `ContactForm` + `ContactInfo` side-by-side with the checklist, matching the live 2-column layout. No pricing shown (none exists on the live site).

### Services (`/services`)

- `PageBanner`: "Receive USA Standard Healthcare at Affordable Prices Here in Sri Lanka."
- "Our Main Services" — 7 items: Emergency; OPD (free consultations 7–12 daily, 24/7 otherwise); Pharmacy; Home Visiting Services (6 dedicated vehicles); X-Ray Service; Inpatient Rooms; Laboratory Services (24/7, discounts).
- Department grid, 22 items across 4 categories (new inline SVG icons matching this repo's `Icons.tsx` style, replacing the live site's Font Awesome glyphs):
  - *Emergency and Critical Care*: General Physician, Pediatrics, Orthopedic, Cardiology, Surgeon.
  - *Diagnostic and Imaging Services*: ECG, CTG, Scanning, Clinical Laboratory, Pharmacy.
  - *Specialized Medical Care*: Gynecology, Dermatology, Eye Specialist, ENT, Diabetes Care, Nutrition, Rheumatology.
  - *Rehabilitation Services*: Physiotherapy, Speech Therapy, PTA, Vaccination Clinic, Telemedicine.

### e-Channeling (`/e-channeling`)

- `PageBanner`/hero: "Make An Appointment" / "Our Expert Doctors," with the live site's two intro paragraphs, using the downloaded `doctor-nurses-special-equipment.jpg` photo.
- `data/doctors.ts` — typed array of all **71 doctors** across **28 specializations**, each `{ name, specialization, calendlyUrl }`, transcribed verbatim from the live site (full list captured during this session's research — every name, specialization, and Calendly URL). A code comment above the array flags the ~35 rows whose Calendly slug names a *different* doctor than the row (a pre-existing data-quality bug on sjhospital.lk), per the decision to reproduce as-is rather than guess-fix.
- `components/DoctorDirectory.tsx` — `'use client'` leaf: name-filter input + specialization-filter input over the dataset (client-side `.filter()`, mirroring the live site's UX but as real React state instead of DOM `onkeyup` string-matching), grouped/rendered by specialization, each row linking out to its Calendly URL in a new tab.

### Privacy Policy (`/privacy-policy`)

Full legal text reproduced verbatim from `https://sjhospital.lk/privacy-policy/` (a TermsFeed-generated policy; captured in full during this session's research), organized under these headings, in order: Privacy Policy (intro) → Interpretation and Definitions → Collecting and Using Your Personal Data (Types of Data Collected, Use of Your Personal Data, Retention, Transfer, Delete Your Personal Data *(the generic "you may request deletion" paragraph — kept; distinct from the mobile-app deletion *form*, which is dropped)*, Disclosure, Security) → Children's Privacy → Links to Other Websites → Changes to this Privacy Policy → Contact Us (info@sjhospital.lk, phone, mailing address). "Last updated" date carried over as-is (August 31, 2025) since we're reproducing their actual policy, not authoring a new one.

### Contact Us (`/contact-us`)

- `PageBanner`: "Get In Touch."
- Two-column layout: `ContactInfo` (address "229/10 St. Joseph Street, Negombo," phone numbers, both emails) beside `ContactForm`, with `LocationMap` below the form — matching the live page's structure.

## Images & assets

Reuse already-downloaded `public/images/{hero,welcome,doctors}.jpg` as `PageBanner` backgrounds for pages with no unique photo of their own (Services, Privacy Policy uses none/plain). Newly download and optimize via `next/image`: About's facility photo + Kids & Teens Medical Group logo + 5 partner logos; Career's staff photo; ~8 Accommodation room photos (main + one detail shot per category); e-Channeling's hero photo; Contact's banner (reuses an existing image, no new download needed). If any sourced photo proves too low-resolution at its target display size, substitute a theme-appropriate stock photo rather than upscale/stretch it, and note the substitution in the PR description.

## New dependencies

- `nodemailer` + `@types/nodemailer` — contact form email delivery.
- `zod` — input validation at the server-action boundary (per CLAUDE.md's boundary-validation rule).
- `leaflet` + `@types/leaflet` — OpenStreetMap rendering (used directly, not through `react-leaflet`).

## Error handling

- `sendContactMessage`: Zod validation failures return a field-level error the form displays inline; transport/send failures (bad SMTP config, network) are caught and return a generic "couldn't send, please call us instead" message with the phone number, so a misconfigured `.env.local` fails safely instead of crashing the page.
- `LocationMap`: Leaflet initializes only client-side inside `useEffect`; if it throws (e.g., container not yet mounted), the surrounding markup still renders the address/phone/email so the page remains usable without the map.
- Missing/broken image assets surface immediately as build errors via `next/image`, same as the homepage.

## Testing / verification

No automated tests requested. Manual verification via `npm run dev` across breakpoints; Playwright MCP may be used as a self-check (render without console errors, confirm the contact form's success/error states, confirm the map renders and the marker sits at the right coordinates, spot-check a few Calendly links resolve) but isn't a required deliverable.
