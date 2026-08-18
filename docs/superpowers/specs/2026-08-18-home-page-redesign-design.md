# Home Page Redesign (v2)

Date: 2026-08-18

## Purpose

Replace the current homepage (`/`) with a full recreation of a new reference
design the user supplied (a bundled/exported single HTML file, "SJ Hospital
Negombo.html" — internally a React app snapshot, referred to below as "the
reference"). The reference is a long, single-scrolling, animation-heavy
one-page site with its own header, footer, and dark/light theme system. The
goal is pixel-and-behavior fidelity to that reference: same sections, same
copy, same colors/typography, same animations — rebuilt properly as a
Next.js 16 Server/Client Component tree following this repo's conventions,
fully responsive (mobile/tablet/desktop), with working dark/light mode.

This supersedes `2026-08-03-homepage-design.md` for the `/` route only.

User decisions locked in during brainstorming:
- Home becomes the **full one-page site**, matching the reference exactly.
  Other existing pages/routes are explicitly out of scope for now — revisit
  later as separate work.
- New sections with no current equivalent (Health Tips, International
  Patient Care, School Wellness, Network, Media, Patient testimonials,
  Careers list) are built with the reference's copy **ported as-is** as real
  launch content.
- Images: use this app's existing real photos in `public/images/` as
  placeholders in each image slot (see Images section below) — the user will
  supply final photography later, including a hospital-exterior render they
  shared during brainstorming (to be dropped into `public/images/` and swapped
  in once the file is available).
- Animation: **full fidelity** — parallax, Ken Burns, scroll-reveal, marquee
  ticker, pulse effects, all with `prefers-reduced-motion` support.

## Non-goals

- No changes to `/about-us`, `/services`, `/career`, `/contact-us`,
  `/accommodation`, `/e-channeling`, `/privacy-policy`. Their routes, the
  shared `SiteHeader`/`SiteFooter`/`BackToTopButton`, and their light-only
  theme are untouched.
- No site-wide dark mode. The new dark/light theme system is scoped to the
  home page only (see Theme System). A future task can extend it site-wide.
- No CMS, no data fetching, no backend integration for the new content
  sections (Health Tips, Media, Careers, Testimonials, Network) — copy is
  hardcoded in typed data files, matching how the rest of this app's
  marketing content already works.
- The reference's testimonial carousel shows "1 / 3" but only one
  testimonial's text was present in the captured markup (it's a slider that
  only renders the active slide). Ship a working carousel with that one real
  quote; wire it to support more without further engineering once the user
  supplies the other two.
- The reference has no mobile nav panel in its markup (the hamburger button
  is a dead link in the captured snapshot — it's client-side behavior not
  present in a static export). A real slide-down mobile nav panel is a new
  addition required to satisfy "responsive on mobile" — see Responsiveness.

## Content model & copy

All copy below is ported verbatim from the reference. Numbers in brackets
like `[01]` are the reference's own section numbering, shown in the small
eyebrow label above each heading.

### Header (all viewports)
- Logo mark + wordmark: "ST. JOSEPH" / "HOSPITAL · NEGOMBO"
- Nav links (anchors on this page): Services `#services`, Facilities
  `#facilities`, Pharmacy `#pharmacy`, Health Tips `#tips`, International
  Patient Care `#international`, School Wellness `#wellness`, Network
  `#network`, Media `#media`, Careers `#career`
- Theme toggle button (sun/moon icon)
- "Book now →" button → `#book`

### Hero (`#top`)
- Eyebrow: "Managed from Los Angeles, USA"
- Rail label (desktop only, vertical text): "Negombo, Sri Lanka"
- H1: "To live is **a** privilege." (word "a" is outline/stroke style, no
  fill; "privilege." is accent-colored)
- Body: "American healthcare standards in Negombo: 24 hour emergency care,
  surgical theatres, in-house doctors, a modern laboratory, digital X-ray
  and a pharmacy that never closes."
- CTA: pulsing dot + "0117 84 84 84" → `tel:+94117848484`
- Marquee ticker (looping, duplicated for seamless scroll): "Emergency open
  24/7 ✦ Surgical theatres to US protocol ✦ Cleaned every two hours ✦
  Reports same day, checked twice ✦ Rooms from 10,000 LKR ✦"

### 01 / Who we are (`#standards`)
- H2: "A US hospital in a Sri Lankan neighbourhood"
- Lead: "St. Joseph Hospital is managed and operated by the Kids & Teens
  Pediatric Medical Group of Los Angeles: the standards, protocols and
  clinical discipline of American care, priced for families in Negombo."
- Body: "Consumables are never reused. Waste is managed to international
  protocol. Every surface is cleaned on a two hour cycle. Our in-house
  doctors order only the tests you genuinely need, and every report is read
  by two of them before it reaches you."
- 3 stat tiles: **24** "Hours a day, every service open" · **2h** "Cleaning
  cycle, US specification" · **0** "Tests ordered that you don't need"

### 02 / What we do (`#services`) — 8-tile bento grid
Sub-label: "Every tile opens a service"
1. **Emergency & OPD** (large tile, accent-filled, "Open now" pulse) — "Walk
   in at any hour" — "Emergency care, outpatient consultations, laboratory
   and digital X-ray, live around the clock every day of the year." →
   `#book`
2. **Surgical care** (wide, photo background) — "Theatres, consultant led"
   — "Elective and emergency surgery with sterile instrument tracking and
   an assigned recovery nurse." — "Surgical services →" → `#surgical`
3. **Rooms** (tall) — big number "10,000" — "LKR a night. Private and semi
   private, sanitised every two hours, nursing that knows your name." →
   `#rooms`
4. **Pharmacy** — "Authorized stock, 24/7" — "Verified medicine only. No
   substitutes." → `#pharmacy`
5. **Digital X-ray** — "Lower dose, sharper plates" — "Read within the
   hour, not the week." → `#facilities`
6. **Laboratory** (wide, photo background) — "Two doctors read every
   report" — "10% off for OPD patients" → `#facilities`
7. **Home visits** — "We come to you" — "Doctors, nurses and lab
   technicians at your door." → `#book`
8. **Delivery** — "Medicine to your door" — "Across Negombo, from our own
   counter." → `#pharmacy`
- Banner CTA below grid: "Full service directory" / "Go to surgical care &
  services" / "Open the page →" → `#surgical`

### 03 / Surgical care (`#surgical`)
- H2: "Theatres run to protocol, not to habit"
- Body: "Elective and emergency surgery with consultant anaesthesia, single
  use consumables, sterile tracking on every instrument set and a nurse
  assigned to your recovery from theatre to discharge."
- Buttons: "Request a surgical consult →" (`#book`), "Speak to the theatre
  desk" (`tel:+94117848484`)
- List: General surgery / Elective and emergency · Obstetric theatre /
  Consultant led · Orthopaedic procedures / Day case and inpatient ·
  Endoscopy suite / Same day reporting · Post-operative care / Assigned
  recovery nurse

### 04 / Facilities (`#facilities`) — 4-card grid
- H2: "Built like a US facility"
1. "01" "Six floor hospital" — "Purpose built in Negombo, with ambulance
   bay and covered arrival." — "Ambulance bay open 24/7 →"
2. "02" "Outpatient wing" — "Consulting suites with same day triage and no
   shared waiting crush." — "Same day triage →"
3. "03" "Imaging, lab & theatres" — "Digital X-ray, 24 hour laboratory and
   sterile surgical suites." — "Reports read twice →"
4. "04" (accent-filled, no photo) "Inpatient rooms" — "Private and semi
   private, sanitised every two hours. From 10,000 LKR a night." — "See
   rooms →" → `#rooms`

### 05 / Pharmacy (`#pharmacy`)
- H2: "Authorized medicine. Nothing else."
- Body: "Our in-house pharmacy stocks only verified, authorized stock,
  dispensed by pharmacists who can read your file, at any hour of the
  night."
- Buttons: "Order a delivery →" (`#book`), "Ask a pharmacist"
  (`tel:+94742223334`)
- Stat rows: Counter hours **24/7** · Home delivery radius **Negombo** ·
  Prescriptions on file **Digital** · OPD patient lab discount **10%**

### 06 / Stay with us (`#rooms`)
- H2: "A room that feels like recovery"
- Body: "Quiet, private and sanitised on a two hour cycle, with nursing
  that knows your name and a doctor on the floor at all times."
- Button: "Reserve a room →" (`#book`)
- Big stat: "Rooms from" **10,000** "LKR per night, all inclusive of
  nursing care"
- Bullets: Private and semi private options · Attendant space for family ·
  Meals prepared to dietary orders

### 07 / International patient care (`#international`)
- H2: "Travelling for care, or just visiting"
- Body: "Negombo sits ten minutes from the international airport. We look
  after visitors, expatriates and medical travellers from arrival to follow
  up at home."
- Button: "Talk to the international desk →" (`mailto:international@sjhospital.lk`)
- 6-item grid: Airport to bedside / "Ten minutes from Bandaranaike
  International. We arrange transfer and admission before you land." ·
  Estimates in writing / "A costed treatment plan in your currency,
  approved before anything begins." · Insurance and claims / "Documentation
  prepared for international insurers and travel policies." · Language
  support / "English speaking clinicians, with interpreters arranged on
  request." · Records to take home / "Digital reports, imaging and
  discharge notes sent to your doctor at home." · Follow up online / "Post
  treatment review by telemedicine once you have travelled back."

### 08 / Health tips (`#tips`)
- H2: "Small habits, written by our doctors"
- Link: "All health tips →"
- 4 rows: **Pediatrics** — "Fever in a child: when to wait, when to come
  in" — "The three signs that make a night visit worth it." ·
  **Prevention** — "The five yearly checks worth doing after forty" —
  "What our physicians order, and what they skip." · **Dengue** — "Monsoon
  season: cutting dengue risk at home" — "Twenty minutes a week around your
  garden and gutters." · **Recovery** — "Eating well in the two weeks after
  surgery" — "Protein, fluid and sleep targets that speed healing."

### 09 / School wellness (`#wellness`)
- H2: "We come to the classroom"
- Body: "A pediatric led programme for Negombo schools: annual screening,
  vision and hearing checks, growth tracking, vaccination drives and
  teacher first aid training, run by the same doctors who see your
  children in clinic."
- Rows: Annual health screening / On campus, per grade · Vision, hearing &
  dental / Referral report to parents · Teacher first aid training / Half
  day, certified
- Button: "Bring it to our school →" (`#contact`)
- Side image caption badge: "Kids & Teens pediatric protocol"

### 10 / Network (`#network`)
- H2: "One group, two countries"
- Sub: "Our Negombo hospital shares clinical governance with the largest
  pediatric group in Los Angeles."
- Rows: Negombo, LK / St. Joseph Hospital / "Flagship hospital: emergency,
  OPD, surgery, inpatient, laboratory, imaging and pharmacy." · Los
  Angeles, US / Kids & Teens Medical Group / "Managing group: clinical
  governance, protocols and physician training." · Negombo, LK / School
  wellness programme / "On campus screening and vaccination across partner
  schools." · Island wide, LK / Telemedicine & delivery / "Remote
  consultations and medicine dispatch beyond the Negombo district."

### 11 / Media (`#media`)
- H2: "News, press & gallery"
- Link: "Media enquiries →"
- Rows: 12 Jul 2026 / "Digital X-ray suite opens to outpatients" / News ·
  28 May 2026 / "5,000 students screened in the school wellness drive" /
  Report · 09 Mar 2026 / "Inside a hospital cleaned every two hours" /
  Press · 21 Jan 2026 / "New surgical wing: opening gallery" / Gallery

### 12 / Careers (`#career`)
- H2: "Work where the standard is the point"
- Body: "Clinicians and staff trained to US protocol, supported by a group
  that invests in them."
- Button: "Send your CV →" (`mailto:careers@sjhospital.lk`)
- Job rows (title / department / type): Medical Officer, Emergency /
  Emergency / Full time · Theatre Nurse / Surgical / Full time ·
  Pharmacist (night shift) / Pharmacy / Shift · Medical Laboratory
  Technologist / Laboratory / Full time · Radiographer, Digital X-ray /
  Imaging / Full time

### 13 / Patient voices (`#voices`)
- Quote: "My reports were read by two doctors and sent the same day. They
  actually explained what was wrong with me." — Michael Perera, OPD patient
- Carousel controls (← / →), position indicator "1 / 3"

### 14 / Come see us (`#book`)
- H2: "Open right now. Yes, right now."
- Body: "229/10 St. Joseph Street, Negombo. Walk in, call us, or send a
  message on WhatsApp."
- 3 link rows: "Surgical care →" (`#surgical`) · "Reserve a room →"
  (`#rooms`) · "0117 84 84 84 ☎" (`tel:+94117848484`)

### Footer (`#contact`)
- Logo + "ST. JOSEPH HOSPITAL" / "TO LIVE IS A PRIVILEGE"
- Tagline: "Compassionate, patient centered care, bringing American
  healthcare standards to Sri Lanka."
- Socials: Facebook, Instagram, LinkedIn, WhatsApp (URLs match the app's
  existing `SiteFooter.tsx` exactly — see Assets)
- Columns — **Care**: Services, Surgical care, Pharmacy, Accommodation.
  **Hospital**: Facilities, International patient care, Health tips, School
  wellness, Network, Media, Careers. **Reach us**: address, phone,
  WhatsApp, email.
- Bottom bar: "© 2026 St. Joseph Hospital, Negombo" / "To live is a
  privilege"

### Floating action button (all pages, bottom-right)
- Back-to-top (appears after scrolling past hero)
- WhatsApp button (green) → `https://wa.me/94742223334`
- Call button (accent, pulsing) → `tel:+94117848484`
- On mobile, buttons collapse to icon-only (labels hidden)

## Architecture

### Routing change

Move the home route out of the `(marketing)` route group so it no longer
inherits the shared `SiteHeader`/`SiteFooter`/`BackToTopButton` (this page
supplies its own, per the reference):

- Delete `src/app/(marketing)/page.tsx`.
- Add `src/app/page.tsx` (root) rendering `<HomePage />` from
  `@/features/home`.
- `src/app/(marketing)/layout.tsx` and every other route under
  `(marketing)/` are unchanged.
- Root `src/app/layout.tsx` stays minimal but gains the two new font
  loaders (see Visual system). It must **not** force a light or dark
  background at the `<html>`/`<body>` level, since other pages are
  light-only and the home page manages its own background.

### Feature: `src/features/home/` (full rewrite)

```
features/home/
  components/
    HomePage.tsx           # composes all sections in order; Server Component
    HomeHeader.tsx          # logo, nav, theme toggle, book-now button (Server Component; delegates interactive bits to leaves below)
    MobileNavPanel.tsx      # 'use client' — slide-down panel + hamburger toggle state
    ThemeToggleButton.tsx   # 'use client' — reads/writes theme context
    HeroSection.tsx         # parallax bg (Ken Burns), headline, CTA, ticker
    StatTicker.tsx          # 'use client' or pure CSS marquee (see Animation system)
    WhoWeAreSection.tsx     # sticky split + 3 stat tiles
    ServicesBentoSection.tsx
    SurgicalSection.tsx
    FacilitiesSection.tsx
    PharmacySection.tsx
    RoomsSection.tsx
    InternationalCareSection.tsx
    HealthTipsSection.tsx
    SchoolWellnessSection.tsx
    NetworkSection.tsx
    MediaSection.tsx
    CareersSection.tsx
    TestimonialsSection.tsx # 'use client' — carousel state
    ContactCtaSection.tsx
    HomeFooter.tsx
    FloatingActions.tsx     # 'use client' — scroll-based back-to-top visibility
    Reveal.tsx              # 'use client' leaf — wraps children, IntersectionObserver fade/slide-in (mirrors reference's data-rv)
  hooks/
    useHomeTheme.ts         # theme context + provider, localStorage + system-preference resolution
    useParallax.ts          # rAF-throttled scroll-linked transform, respects prefers-reduced-motion
  data/
    services.ts             # 8 bento tiles
    facilities.ts            # 4 facility cards
    internationalCare.ts    # 6 items
    healthTips.ts            # 4 articles
    network.ts               # 4 rows
    media.ts                 # 4 press items
    careers.ts                # 5 job rows
    testimonials.ts           # 1 quote (extensible to 3)
  index.ts                  # exports HomePage
```

All data files are typed (`interface`/`type` + `as const` arrays), matching
how `src/features/e-channeling/data/doctors.ts` already structures content
in this repo.

### Config

- `src/config/homeNavigation.ts` — typed array of the 9 anchor nav items,
  consumed by both `HomeHeader` and `HomeFooter`'s link columns (avoids
  duplicating the list, consistent with the existing
  `src/config/navigation.ts` pattern used elsewhere).

## Visual system

### Fonts

Add via `next/font/google` in `src/app/layout.tsx`, alongside the existing
Plus Jakarta Sans / Sora loaders (which keep serving every other page):

- **Bricolage Grotesque** (weights 400/600/700/800) → CSS var
  `--font-bricolage`
- **Manrope** (weights 400–800) → CSS var `--font-manrope`

These two variables are applied only within the home page's root wrapper
(`HomePage`'s outer `<div>` sets `font-family: var(--font-manrope)`;
headings use `font-family: var(--font-bricolage)` via a small `font-heading`
utility scoped to that wrapper). They are **not** added to the global
Tailwind `@theme` block, so `font-sans`/`font-heading` utilities elsewhere
in the app keep resolving to Plus Jakarta Sans/Sora unchanged.

### Color tokens (scoped, not global)

Defined as plain CSS custom properties on a `[data-home]` wrapper in
`globals.css` (not added to the global `@theme` block, to avoid colliding
with or expanding the existing `--color-primary`/`--color-accent`/etc.
tokens that the rest of the site's light-only pages rely on). Consumed via
Tailwind arbitrary-value utilities, e.g. `bg-[var(--home-bg)]`.

```css
[data-home] {
  --home-bg: #060B1F;           /* page background */
  --home-surface: #0B1846;      /* card/tile background */
  --home-surface-2: #081A3A;    /* secondary surface (e.g. lab tile bg) */
  --home-heading: #FFFFFF;
  --home-body: rgba(242, 246, 255, 0.82);
  --home-muted: rgba(242, 246, 255, 0.6);
  --home-hairline: rgba(242, 246, 255, 0.14);
  --home-accent: #2CA6F0;
  --home-accent-soft: #7FCBFF;
  --home-on-accent: #04122B;    /* text/icon color on accent-filled surfaces */
}
[data-home][data-theme="light"] {
  --home-bg: #F1F5FC;
  --home-surface: #FFFFFF;
  --home-surface-2: #FFFFFF;
  --home-heading: #0A1030;
  --home-body: #0A1030;
  --home-muted: #4B587A;
  --home-hairline: rgba(10, 16, 48, 0.16);
  --home-accent: #0B6FC0;
  --home-accent-soft: #0B6FC0;
  --home-on-accent: #FFFFFF;
}
```

Sections whose background image needs to stay dark even in light mode
(hero, surgical, rooms — all have a photo + dark gradient overlay for text
legibility) keep hardcoded dark values for just that section rather than
switching to the light tokens, matching the reference's `data-fixed-dark`
behavior.

## Theme system

- `useHomeTheme` provides `{ theme: 'dark' | 'light', toggle: () => void }`
  via React context, provider mounted once at the top of `HomePage`.
- Resolution order on first load: `localStorage['sj-home-theme']` → OS
  `prefers-color-scheme` → `'dark'` (the reference's default).
- To avoid a flash of the wrong theme, a small inline script (fixed,
  non-interpolated content — no user input, so safe to inline) runs in
  `<head>` before hydration, reading `localStorage`/`matchMedia` and setting
  `data-theme` on the home wrapper element synchronously, the same pattern
  libraries like `next-themes` use.
- Toggling persists the new choice to `localStorage` and updates the
  `data-theme` attribute; no page reload.
- Scope: only the home page reads/writes this. Other pages are unaffected.

## Animation system

All keyframes ported verbatim from the reference (same names/timings, added
to `globals.css` or a home-scoped stylesheet):

| Name | Effect | Used on |
|---|---|---|
| `sjup` | fade + translateY(26px→0) on mount | hero eyebrow/H1/CTA row (staggered) |
| `sjtick` | translateX(0 → -50%) infinite, 34s linear | stat marquee ticker (duplicated track for seamless loop) |
| `sjpulse` | box-shadow ring pulse, 2.2–2.6s ease-in-out infinite | phone CTA dot, "Open now" dot, call FAB |
| `sjburns` | scale(1.04→1.16) + slight translate, 26s ease-in-out infinite | hero background photo, other full-bleed section photos ("Ken Burns") |
| `sjsheen` | opacity/translateX drift, 18s ease-in-out infinite | hero radial glow overlay |
| `sjscan` | translateY sweep, 14s linear infinite | hero top scan-line overlay |

Scroll-triggered reveal (`Reveal.tsx` + nothing-fancy IntersectionObserver):
mirrors the reference's `data-rv`/`data-rv-on` pattern — element starts
`opacity:0, translateY(34px)`, animates to visible once when it enters the
viewport, never re-hides on scroll-out.

Parallax (`useParallax.ts`): rAF-throttled scroll listener computing a small
translateY offset (matching the reference's `data-px` factors, 0.05–0.16)
for background images in hero, surgical, rooms, pharmacy watermark, and
school-wellness photo.

`prefers-reduced-motion: reduce` disables `sjburns`/parallax entirely and
makes all `Reveal` content visible immediately (no animation), matching the
reference's own reduced-motion handling.

## Responsiveness

Breakpoints ported from the reference (implemented as Tailwind arbitrary
breakpoints or matching custom CSS, applied to this page only):

- **≥1280px**: full desktop layout as designed.
- **<1280px**: nav gap/font-size tightens slightly.
- **<1120px**: full inline nav hidden, hamburger button shown.
- **<1024px**: services bento 4→2 columns; facilities/international grids
  adjust; page padding reduces.
- **<900px**: all two-column split sections (Who we are, Surgical, Pharmacy,
  Rooms, International, Careers) stack to one column; hero min-height
  reduces; vertical side-rail label hidden; big numeric stats shrink.
- **<640px**: bento grid to 1 column; section top padding reduces; FAB
  labels hidden (icon-only, smaller buttons); ticker font-size reduces.

**New (not in the reference's static markup):** a real mobile nav panel.
Below 1120px, tapping the hamburger opens a full-width slide-down panel
(dark/light aware) listing all 9 nav links, the theme toggle, and the
"Book now" button, closing on link click or a second tap. This fills a gap
— the reference's hamburger is a dead anchor link in the captured snapshot
because the actual menu-open behavior is client-side React state not
present in a static export.

## Images

Reference slot → this app's existing real photo (temporary, swappable
1:1 later):

| Reference slot | File used now |
|---|---|
| Hero background (hospital exterior, dusk) | `public/images/hero.jpg` — replace with the exterior render the user shared once saved to the repo |
| Header/footer logo mark | `public/images/logo.png` (already the real logo, no change needed) |
| Services bento — Surgical care tile background | `public/images/about-facility.jpg` |
| Services bento — Laboratory tile background | `public/images/doctors.jpg` |
| Facilities card 1 — "Six floor hospital" | `public/images/hero.jpg` (or the new exterior render once available) |
| Facilities card 2 — "Outpatient wing" | `public/images/welcome.jpg` |
| Facilities card 3 — "Imaging, lab & theatres" | `public/images/doctors.jpg` |
| Surgical section background watermark | `public/images/about-facility.jpg` |
| Pharmacy section corner watermark (logo, low opacity) | `public/images/logo.png` |
| Rooms section background | pick from `public/images/rooms/*.jpg` (best wide shot) |
| School wellness photo | `public/images/career-staff.jpg` |

All images render via `next/image` with explicit `alt` text matching the
reference's alt attributes, `fill` + `object-fit: cover` for background-style
placements.

## Accessibility

- All interactive elements (theme toggle, mobile menu, carousel controls,
  FAB buttons) are real `<button>`/`<a>` elements, keyboard operable, with
  `aria-label`/`title` where the visible content is icon-only.
- Color contrast checked in both themes for body text, muted text, and
  accent-on-surface combinations (the reference's own light-mode palette
  already targets AA; dark mode uses white/near-white text on very dark
  backgrounds, comfortably AA).
- `prefers-reduced-motion` support as described above.
- Marquee ticker content is duplicated in the DOM for the seamless-loop
  effect; the duplicate is `aria-hidden="true"` so screen readers don't
  announce it twice.

## Testing / verification

No automated test suite exists in this repo for UI (per `CLAUDE.md`, no
test runner is configured). Verification is manual, matching this project's
established practice for prior homepage/interior-page redesigns:
- `npm run dev`, visually compare each section against the reference
  (rendered live in a browser) at mobile (375px), tablet (768px), desktop
  (1280px+) widths.
- Toggle dark/light mode and confirm all sections re-theme correctly,
  including the fixed-dark photo sections.
- Toggle OS `prefers-reduced-motion` and confirm animations stop/reveal
  content immediately.
- `npm run lint` and `npm run build` must pass before calling this done.
