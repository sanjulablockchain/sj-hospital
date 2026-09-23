# Home Page v4 Redesign

Date: 2026-09-23

## Purpose

Rebuild the home page (`/`, `/si`, `/ta`) to match the Claude Design reference
"St Joseph Hospital Home v4", supplied as the bundled file
`C:\Users\User\Documents\Designs\sj-hospital\St Joseph Hospital Home v4.html`.
The reference is a light-first page in the logo's own purple and sky palette,
with a matching dark theme, nineteen bands, and the site's existing mega menu
reskinned as its header. The goal is layout, spacing, motion and hover
fidelity to the reference, rebuilt as a Next.js 16 Server and Client
Component tree in this repo's conventions, responsive, in both themes, in all
three languages.

This supersedes `2026-08-18-home-page-redesign-design.md` for the home route.

Decisions locked during brainstorming (2026-09-23):

- **Palette scope: home only.** The new palette is switched on by an
  attribute on the home page's shell. The other seventeen pages keep the
  current navy palette and are not touched. Any page can adopt the palette
  later with the same attribute.
- **Every link goes somewhere real.** The reference uses `href="#"` as a
  placeholder throughout. Every CTA, chip, tile and footer link on the built
  page leaves for the page that owns the content.
- **Facts come from the repo, layout from the reference.** Where the
  reference's copy and the repo's data differ in fact or house spelling, the
  repo wins. The fact-check found the reference was built from the repo's own
  copy, so the differences are few and are listed at the end.
- **Small things are the implementer's call.** The owner asked not to be
  consulted on details.

## How the reference was read

The bundle is a Claude Design export. `<script type="__bundler/template">`
holds a JSON string of the rendered page, `<script type="__bundler/manifest">`
holds a UUID keyed asset map (`{mime, compressed, data}`), and
`<script type="__bundler/ext_resources">` names the assets that came from this
repo's `public/images`. Almost all styling is inline `style` attributes with
`style-hover` pairs for hover states; the page's data and behaviour are in the
inline `<script type="text/x-dc">`. The decoding script used is
`decode-bundle.js` in the session scratchpad; the method is recorded in the
project memory note "design references".

Of the twenty images in the bundle, thirteen are named after repo paths and
six more matched repo files by checksum. Only the header lockup is new.

## Non-goals

- No palette change on any other route, and no change to the shared theme
  default (stored choice, then OS preference).
- No new photography. Every image is already in `public/images`, plus the
  one lockup PNG lifted from the bundle.
- No CMS or data fetching. Copy stays in typed data files.
- The reference's palette picker band (`showPalette`, default off) is a
  design tool and is not built.
- Social icons in the footer: the reference has none, so the home footer has
  none. One line restores them if wanted.

## Palette and theme

### Attribute

`ThemedShell` gains a `palette` prop. `HomePage` passes `palette="brand"`,
which renders `data-palette="brand"` on `#sj-root` beside the existing
`data-sj` and `data-theme`. `globals.css` gains two blocks after the existing
`[data-sj]` and `[data-sj][data-theme="light"]` token blocks:

- `[data-sj][data-palette="brand"]` holds the LIGHT values.
- `[data-sj][data-palette="brand"][data-theme="dark"]` holds the DARK values.

Both selectors outrank or follow the defaults, and `data-theme` is always set
(ThemedShell defaults it and ThemeScript rewrites it before paint), so the
right set always wins.

### Token values

The reference's variables and the tokens they become. Fixed values are the
same in both themes.

| Reference | Token | Light | Dark |
|---|---|---|---|
| `--brand` | `--home-brand` | `#45338F` | same |
| `--brandHover` | `--home-brand-hover` | `#362872` | same |
| `--brandText` | `--home-brand-text` | `#45338F` | `#B3A6F5` |
| `--accent` | `--home-accent` | `#52B5E8` | same |
| `--accentHover` | `--home-accent-hover` | `#3FA6DC` | same |
| on accent (`#0F0B30` in reference) | `--home-on-accent` | `#0F0B30` | same |
| `--skyText` | `--home-accent-soft` | `#1B7FC0` | `#6CC4F0` |
| `--deep` | `--home-deep` | `#231A5C` | same |
| `--surface` | `--home-bg` | `#ffffff` | `#110C30` |
| `--lav` | `--home-surface` | `#F5F3FB` | `#1A1444` |
| `--lav2` | `--home-surface-2` | `#F0EDFA` | `#261E57` |
| `--skybg` | `--home-sky-bg` | `#EAF6FD` | `#0F1C3E` |
| `--skybg2` | `--home-sky-bg-2` | `#DFF1FC` | `#13264D` |
| `--ink` | `--home-heading` | `#1A1540` | `#F2F0FB` |
| `--body` | `--home-body` | `#2E2A55` | `#D8D4EE` |
| `--muted` | `--home-muted` | `#4A4668` | `#B9B4D6` |
| `--muted2` | `--home-muted-2` | `#5A5775` | `#A19CC2` |
| `--line` | `--home-hairline` | `rgba(26,21,64,.12)` | `rgba(255,255,255,.12)` |
| `--line2` | `--home-hairline-strong` | `rgba(26,21,64,.2)` | `rgba(255,255,255,.25)` |
| fixed ink `#1A1540` | `--home-ink` | `#1A1540` | same |
| `--chipOn` / `--chipOnFg` | `--home-chip-on` / `--home-chip-on-fg` | `#1A1540` / `#fff` | `#52B5E8` / `#0F0B30` |
| `--fadeA/B/C` | `--home-fade-a/b/c` | `rgba(255,255,255,.97/.88/0)` | `rgba(17,12,48,.97/.86/0)` |
| `--dot` | `--home-dot` | `rgba(255,255,255,.95)` | `rgba(82,181,232,.18)` |
| hover fill on outlined buttons | `--home-invert-bg` / `--home-invert-fg` | `#1A1540` / `#fff` | same |
| accent washes | `--home-accent-tint` / `-soft` | `rgba(82,181,232,.10)` / `.06` | same |
| header Book now | `--home-cta-bg` / `--home-cta-fg` | `--home-brand` / `#fff` | same |
| `--headerBg` | `--sj-chrome-solid-bg` | `rgba(255,255,255,.97)` | `rgba(17,12,48,.94)` |
| mega panel | `--sj-chrome-panel-bg` / `-frame-bg` / `-col-tint` | `#fff` / `#F5F3FB` / transparent | `#110C30` / `#1A1444` / transparent |
| hairline under header | `--sj-chrome-hairline-accent` | `--home-hairline` | same |
| header height | `--sj-header-h` | `84px` | same |

`--home-cta-bg` and `--home-cta-fg` are also added to the DEFAULT palette
(`--home-accent` / `--home-on-accent`) so `ThemedHeader` can paint Book now
from them on every page without changing how other pages look.
`--home-danger` keeps its existing per-theme values. The dark block also sets
`color-scheme: dark`.

Fixed-dark surfaces that ignore the theme, as in the reference: the utility
bar (`#1A1540`, white text), the hero (`#0B0826` with the reference's
gradient, sheen and scan), the ticker, the standards band (`--home-deep` with
a dot pattern), the network panels (`#1A1540` base) and the media card
(`#1A1540`).

### Header variant

`ThemedShell` gains a `header` prop, `"fixed"` (default, current behaviour)
or `"solid"`. `HomePage` passes `"solid"`. In the solid variant `ThemedHeader`:

- is `position: sticky; top: 0` and in normal flow, so the hero starts under
  it rather than behind it and pads by nothing;
- is always `data-solid`, so the existing chrome token flip applies from the
  first pixel;
- is 84px tall and shows the horizontal lockup (`LOGO_LOCKUP_BRAND`, 64px
  tall, `data-logo`) instead of the mark plus wordmark;
- paints Book now from `--home-cta-bg` / `--home-cta-fg`, square cornered.

The nav triggers gain a class hook so the palette block can give them the
reference's hover (`background: var(--home-surface); color:
var(--home-brand-text)`) without touching the transparent header on other
pages. `[data-theme="dark"] img[data-logo]` gets `filter: brightness(0)
invert(1)`, as the reference does.

The mobile drawer, language switcher and theme toggle are the existing
components; they already paint from chrome tokens and need no change beyond
what the tokens give them.

### Utility bar

New Server Component `src/components/layout/UtilityBar.tsx`, rendered by
`ThemedShell` above the header when `utilityBar` is true (home passes it).
Fixed `#1A1540`, white 13px text, 9px vertical padding, 1440px container.
Left: a pulsing red dot (`#F04438`), "Emergency 24/7", the phone as a bold
`tel:` link, then the address. Right: "WhatsApp 074 222 333 4" (`wa.me`),
"Careers" (`/careers`), "Media" (`/media`), each `rgba(255,255,255,.85)`
hovering to white. Under 640px the right group is hidden and the address
wraps under the phone. All strings are chrome and stay English.

### Logo asset

The bundle's `629e7264-35ca-4b4d-8b9c-b45101d0601b.png` (1248x386, alpha) is
the logo lockup recoloured to the palette purple with a sky leaf. It is
copied to `public/images/logo-lockup-brand.png` and exported from
`src/config/brand.ts` as `LOGO_LOCKUP_BRAND`.

## Page structure

`HomePage.tsx` renders, inside `ThemedShell` with the palette, solid header
and utility bar:

| # | Band | id | Component | Kind | Data |
|---|---|---|---|---|---|
| 1 | Hero | `top` | `HeroSection` (restyled) with `HeroParallaxBackground`, `Ticker` | server, client leaf | `content.hero`, `content.statTickerItems`, `heroSlides` |
| 2 | Quick access mosaic | `book` | `QuickAccessSection` (new) | server | `content.quickAccess` |
| 3 | Who we are, six stat cards | `about` | `WhoWeAreSection` (rewritten) | server, `RevealStagger` | `content.whoWeAre`, services count |
| 4 | Free OPD | `free-opd` | `FreeOpdSection` (restyled) | server | `content.freeOpd` |
| 5 | Specialties carousel | `services` | `SpecialtiesSection` (new) with `SpecialtiesCarousel` | server, client leaf | `content.specialties`, services data |
| 6 | Patient care tiles | `care` | `PatientCareSection` (new) | server, `RevealStagger` | `content.patientCare`, `megaNavigation` |
| 7 | Pharmacy | `pharmacy` | `PharmacySection` (rewritten, no longer client) | server | `content.pharmacy` |
| 8 | Standards band and motto plaque | `standards` | `StandardsSection` (new) | server | `content.standards` |
| 9 | Patient reviews | `voices` | `TestimonialsSection` (rewritten) | client | `testimonials` |
| 10 | International patient care | `international` | `InternationalCareSection` (rewritten) | server | `internationalCare` |
| 11 | Network accordion | `network` | `NetworkSection` (restyled) with `NetworkAccordion` (restyled) | server, client leaf | `network` |
| 12 | FAQ | `faq` | `FaqSection` (new) with `FaqList` | server, client leaf | `faq`, `GENERAL_EMAIL` |
| 13 | Media and careers | `media` | `MediaCareersSection` (new) | server | `media`, `careers` |
| 14 | Contact | `contact` | `ContactCtaSection` (restyled) | server | `content.contactCta` |
| 15 | Footer | | `HomeFooter` (rewritten as its own footer) | server | `homeFooterColumns`, `chromeCopy.tagline` |
| | Floating rail | | `FloatingActions` (shared, unchanged) | client | |
| | Announcement pop-up | | `AnnouncementModal` (kept) | client | `announcement` |

Removed from the page, and deleted with their overlays and tests where
nothing else imports them: `ServicesBentoSection`, `SurgicalSection`,
`FacilitiesSection`, `HomeCareSection`, `RoomsSection`, `HealthTipsSection`,
`SchoolWellnessSection`, `CountUp`, `useCountUp`, and the data files
`facilities.ts`, `healthTips.ts`, `homeCare.ts`. `announcement.ts` currently
imports from one of those files; that import moves to the same fact's other
home before the file goes.

Section eyebrows lose their band numbers ("Who we are", not "01 / Who we
are"), as in the reference.

## Content model

Copy is ported from the reference except where a fact or house spelling in
the repo says otherwise (see Deviations). Paths marked (fact) are never
translated; everything else follows the register rule.

### Hero (`content.hero`, unchanged)

Existing fields. Body keeps the repo's "in-house" and "digital X-ray".
Ticker items unchanged.

### Quick access (`content.quickAccess`, new)

- `channel`: heading "Channel a doctor", body "Pick a consultant and a time
  online, or walk in to our free OPD.", cta "Make an appointment", href
  `/e-channeling` (fact), photo `/images/career-staff.jpg` (fact), photoAlt.
- `emergencyCall`: heading "24 hour emergency assistance. Call us on", the
  phone rendered from the structural `tel:+94117848484`.
- `emergency`: title "Emergency assistance", body "Walk in at any hour.
  Ambulance bay and critical care open 24/7.", more "Read more", href
  `/services/accident-emergency`, photo
  `/images/services/heroes/accident-emergency.jpg`, photoAlt.
- `facilities`: title "Facilities and services", body template "{count}
  services under one roof, run to US protocol.", more "Read more", href
  `/services`, photo `/images/services/heroes/laboratory.jpg`, photoAlt.
- `location`: title "Our location", body "229/10 St. Joseph Street, Negombo.
  Ten minutes from the airport.", more "Get directions", href
  `DIRECTIONS_URL` imported from `contact/data/content.ts` (opens in a new
  tab), photo `/images/hero-exterior.png`, photoAlt.

### Who we are (`content.whoWeAre`, reshaped)

- eyebrow "Who we are"; heading "A USA hospital in a Sri Lankan neighbourhood"
  (one string; the component lets it wrap; "USA" rather than the reference's
  "US" at the owner's request, 2026-09-23).
- intro: the existing sentence. body: "Consumables are never reused. Every
  surface is cleaned on a two hour cycle. Every report is read by two doctors
  before it reaches you."
- `stats`, six cards, each `{ icon, value, label, desc, tone }` where `icon`
  and `tone` are structural keys (fact) and `value` is a fact:
  1. `clock`, "24/7", "Emergency and OPD", "Every service open, every hour, every day of the year.", tone `red`
  2. `grid`, `{count}` (substituted with `services.length`), "Services", "From emergency care to fertility, under one roof.", tone `brand`
  3. `building`, "6", "Floor hospital", "Purpose built in Negombo, with ambulance bay and covered arrival.", tone `sky`
  4. `spark`, "2h", "Cleaning cycle", "Every surface, cleaned to US specification.", tone `green`
  5. `ambulance`, "6", "Home visit vehicles", "Doctors, nurses and lab technicians at your door.", tone `orange`
  6. `plane`, "10", "Minutes from the airport", "Bandaranaike International to our door.", tone `brand`

### Free OPD (`content.freeOpd`, reshaped)

- `pill` "A first for Sri Lanka" replaces the eyebrow.
- heading "Seeing a doctor costs you nothing" (one string).
- body without the "A first for Sri Lanka:" prefix; points, CTAs, hrefs,
  photo and photoAlt unchanged. Still no figures (`bands.test.ts`).

### Specialties (`content.specialties`, new)

- eyebrow "What we do"; headingTemplate "{count} services, six ways we look
  after you"; body "From a walk in consultation to surgery, diagnostics and
  care at home, every service runs to the same American protocol."
- `tabs`, six, in `SERVICE_GROUPS` order, each `{ group (fact, a
  ServiceGroup), label, title, desc, image (fact), links[] }`:
  - Emergency: "Emergency and critical care", desc from the reference, image
    `/images/services/heroes/accident-emergency.jpg`, links: Accident and
    emergency `/services/accident-emergency`; Intensive and critical care
    `/services/intensive-critical-care`; Ambulance `/facilities#ambulance`.
  - Surgical: "Surgical care", image `general-surgery.jpg`, links: General
    surgery; Orthopaedic surgery; ENT surgery and audiology; Urology;
    Ophthalmology and cataract; Neurosurgery; Endoscopy, each to its service.
  - Diagnostics: "Laboratory and imaging", image `laboratory.jpg`, links:
    Laboratory services; Radiology and digital X-ray; Cardiac screening and
    ECG; CTG and fetal monitoring.
  - Clinics: "Specialist clinics", image `cardiology.jpg`, links: Outpatient
    department; Cardiology; Dermatology; Diabetes and endocrine care;
    Neurology; Nephrology; Physiotherapy; Mental health.
  - Women and children: "Women and children", image
    `obstetrics-maternity.jpg`, links: Obstetrics and maternity; Gynaecology;
    Paediatrics and neonatal care; Fertility and embryology; Vaccination
    clinic.
  - At home: "Care at home", image `home-visits.jpg`, links: 24 hour pharmacy
    `/services/pharmacy`; Medicine delivery; Home visits; Telemedicine.
  Each link is `{ label, href }` with `href` a fact. A test asserts every
  `/services/<slug>` href names a real slug and every tab's `group` is a
  real group.
- `topServices` "Top services"; `findDoctor` "Find a doctor" `/e-channeling`;
  `exploreMore` "Explore more" `/services#directory`; `viewAllTemplate`
  "View all {count} services" `/services`; `countTemplate` "{n} of {total}".
- aria: previous and next labels.

### Patient care (`content.patientCare`, new)

- heading "Committed to your better health"; body1 "St. Joseph Hospital is a
  six floor, purpose built hospital in Negombo, run to the protocols of an
  American pediatric group."; body2 "Care does not stop at the ward. Our
  pharmacy never closes, our doctors visit homes and schools, and travelling
  patients are looked after from the airport onward."; cta "All patient
  care", href `/facilities`.
- Tiles are the six links of `megaNavigation`'s Patient Care menu, in
  order, with their labels, descriptions, hrefs and icon keys. One home for
  that list; a test pins the count at six.

### Pharmacy (`content.pharmacy`, reshaped)

- eyebrow "24 hour pharmacy"; heading from `pharmacyHero` as today
  ("Authorized" "medicine." "Nothing else.", the last segment in brand text);
  body unchanged.
- ctaPrimary "Order a delivery" `/pharmacy#delivery`; ctaSecondary "Ask a
  pharmacist" `/pharmacy#contact`.
- `rows`, four, `{ icon, label, value, tone }`: Counter hours "24 / 7";
  Home delivery radius "Negombo"; Prescriptions on file "Digital" (sky);
  OPD patient lab discount "10%" (brand). `value` is a fact.

### Standards (`content.standards`, new)

heading "Built like a US facility"; sub "Medical quality care, to American
protocol"; items: Single use consumables; Infection control; Reports read
twice, each with the reference's one-line description; plaque "To live is a
privilege." (a brand mark, English everywhere).

### Reviews (`testimonials.ts`, extended)

Existing three testimonials unchanged (repo spelling "check-ups"). Add
heading "Satisfied patient reviews", body "Real words from patients who were
treated, operated on and looked after here.", `ariaShow` "Show review {n}",
photo `/images/welcome.jpg` (fact) and photoAlt. The initials avatar is
derived from the name in the component.

### International care (`internationalCare.ts`, reshaped)

Six items unchanged. eyebrow "Ten minutes from the airport"; heading
"International patient care"; body "You land at Katunayake. We take it from
there. One desk arranges the transfer, the estimate, the interpreter and the
records you take home."; ctaPrimary "Read more" `/international-care`;
ctaSecondary "WhatsApp the desk" `https://wa.me/94742223334`; badge
"Estimate in writing" / "Before anything begins"; photo
`/images/international/hero-arrival.jpg` and photoAlt.

### Network (`network.ts`)

Nodes unchanged. eyebrow "Network"; heading, body and cta unchanged; cta href
`/network`.

### FAQ (`faq.ts`, new)

eyebrow "Frequently asked questions"; heading "The questions we always get";
body "Short answers to what patients and families ask us most. Anything
else, the switchboard answers at every hour."; `items`, the reference's
seven `{ q, a }` pairs, all backed by the repo; `still` { title "Still have a
question?", body "Call, WhatsApp or email us. A person answers, day or
night." }; `seeAll` "See all questions" `/contact-us`. The phone is the
structural number; the email is `GENERAL_EMAIL` from `config/contactEmails`.
Questions and answers translate; a test asserts the answers quote no price.

### Media and careers (`media.ts`, `careers.ts`)

Items unchanged. Media: label "Media · News, press and gallery", readStory
"Read the story", cta "Media enquiries and full newsroom" `/media`, every
story links `/media#newsroom`, photo `/images/services/heroes/radiology.jpg`
(fact) and photoAlt. Careers: eyebrow "Careers", heading "Work where the
standard is the point" (one string), cta "Send your CV" `/careers#apply`,
each job row `/careers#openings`.

### Contact (`content.contactCta`, reshaped)

eyebrow "Come see us"; heading "Open right now. Yes, right now." (one
string); body unchanged; `rows`: Surgical care `/services/general-surgery`;
Reserve a room `/accommodation`; "WhatsApp 074 222 333 4"
`https://wa.me/94742223334`; "0117 84 84 84" `tel:+94117848484`, each with an
icon key.

### Footer (`config/homeNavigation.ts`, rewritten)

Three columns as the reference: Services (Accident and emergency, Outpatient
department, Surgical care `/services/general-surgery`, Laboratory,
Radiology, See all services `/services`); Patient care (Facilities,
Pharmacy, Care at home, International patients, School wellness,
Accommodation); About (About us, Network, Media, Careers, Health tips,
Privacy policy). "Reach us": address, phone, WhatsApp. Bottom bar: copyright
and "TO LIVE IS A PRIVILEGE" in brand text. Tagline is `chromeCopy.tagline`.

## Links

| Where | Label | Destination |
|---|---|---|
| Utility bar | phone / WhatsApp / Careers / Media | `tel:` / `wa.me` / `/careers` / `/media` |
| Header | Book now | `/e-channeling` |
| Hero | phone chip | `tel:+94117848484` |
| Quick access | Make an appointment | `/e-channeling` |
| Quick access | emergency call card | `tel:` |
| Quick access | Emergency assistance | `/services/accident-emergency` |
| Quick access | Facilities and services | `/services` |
| Quick access | Get directions | Google Maps directions (new tab) |
| Free OPD | See the OPD / Call | `/services/outpatient-department` / `tel:` |
| Specialties | each chip | its service page, Ambulance to `/facilities#ambulance` |
| Specialties | Find a doctor / Explore more / View all | `/e-channeling` / `/services#directory` / `/services` |
| Patient care | six tiles / All patient care | mega nav hrefs / `/facilities` |
| Pharmacy | Order a delivery / Ask a pharmacist | `/pharmacy#delivery` / `/pharmacy#contact` |
| International | Read more / WhatsApp the desk | `/international-care` / `wa.me` |
| Network | node link / The full network | node href / `/network` |
| FAQ | phone / email / See all questions | `tel:` / `mailto:info@sjhospital.lk` / `/contact-us` |
| Media | story / newsroom cta | `/media#newsroom` / `/media` |
| Careers | Send your CV / job row | `/careers#apply` / `/careers#openings` |
| Contact | four rows | see Contact above |
| Footer | columns | see Footer above |
| Floating rail | back to top / WhatsApp / Call | unchanged |

`teaserLinks.test.ts` keeps asserting that no home link is a bare hash other
than back to top.

## Images

| Slot | File |
|---|---|
| Hero slides | `home/hero-dusk-facade.jpg`, `home/hero-night-facade.jpg`, `home/hero-night-gate.jpg` |
| Quick access team | `career-staff.jpg` (object-position 75% 30%) |
| Quick access emergency | `services/heroes/accident-emergency.jpg` |
| Quick access laboratory | `services/heroes/laboratory.jpg` |
| Quick access building | `hero-exterior.png` |
| Free OPD | `home/free-opd-doctor.jpg` (object-position 50% 15%) |
| Specialties | the six group heroes named above |
| Pharmacy and contact watermark | `logo-mark.png` at 10 to 12 percent opacity |
| Reviews | `welcome.jpg` |
| International | `international/hero-arrival.jpg` |
| Network | the four node photos |
| Media | `services/heroes/radiology.jpg` |
| Header and footer logo | `logo-lockup-brand.png` (new) |

All photos render through `next/image` with `fill` or explicit dimensions and
a `sizes` hint.

## Layout and responsiveness

Container 1440px with 44px side padding on desktop, 32px from `sm`, 20px on
phones. Band paddings follow the reference (110px, 100px, 90px, and the
pharmacy, network, FAQ, media and contact bands padding bottom only). The
reference's JavaScript breakpoints become CSS:

- Header nav visible from `lg` (1024px); below that the hamburger and drawer.
- Quick access: the top row is `auto-fit, minmax(min(100%, 520px), 1fr)`; the
  bottom row is 1 column, 2 from 600px, 4 from 1100px.
- Stat cards: 1 column, 2 from 720px, 3 from 1180px.
- Care tiles: 2 columns, 3 from 560px.
- Network: vertical accordion (760px tall) under 760px, horizontal (540px)
  above, collapsed spines 64px and 90px.
- Every two-column split uses the reference's `auto-fit, minmax(min(100%,
  Npx), 1fr)` so it stacks on its own.
- Hero `min-height: calc(100vh - 120px)`; the vertical "Negombo, Sri Lanka"
  rail hides under 900px.

## Motion and hover

Added at the owner's request after the first review (2026-09-23), beyond the
reference's own motion:

- **Counters.** The six "who we are" figures and the pharmacy fact values
  count up from zero over 2.8 seconds the first time they scroll into view
  (`CountUp`, over the shared `AnimatedCounter`); their dressing ("/7", "h",
  "%", " / 7") stays fixed. Values without digits render as text.
- **International band.** Five parallax depths (dot pattern, disc, photo,
  badges at three rates); the photograph eases up when its ring is hovered,
  each badge lifts and turns, and each list item highlights, slides right and
  grows its dot under the pointer.
- **Motto plaque** lifts, brightens and nudges its text on hover.
- **Card lift.** Every card-shaped element (stat cards, mosaic tiles and the
  switchboard row, care tiles, standards items, FAQ rows, news strips, job
  rows) lifts 6px on a soft shadow on hover (`.sj-card-lift`); photographs
  inside a hovered tile or the newsroom story ease up 4% (`.sj-card-zoom`).
  Pharmacy fact rows wash with the accent tint.
- **Parallax.** Beyond the hero: the mosaic team photograph, the free OPD
  portrait and the reception photograph drift inside clipped boxes; the
  pharmacy and contact leaf watermarks and the motto plaque drift against
  the scroll; the international composition parts in three depths (disc up,
  photograph still, badges down). All through the shared `ParallaxLayer` or
  `useScrollParallax`, disabled under reduced motion.
- **Staggered reveals** on the mosaic tiles, pharmacy rows, standards items,
  FAQ rows, job rows and contact rows in addition to the grids that had them.
- **Specialties card height.** All six tabs' photographs and text are
  rendered stacked in one grid cell, only the active one visible, so the
  card keeps the tallest tab's height and nothing below it moves when the
  tab changes.

Existing keyframes and utilities are reused: `sj-up` (hero copy), `sj-tick`,
`sj-pulse` (dots), `sj-burns`, `sj-sheen`, `sj-scan`, `Reveal` and
`RevealStagger` for sections and grids, `useParallax` for the hero. A
`sj-fade` utility (opacity in, 0.3 to 0.6 s) covers the specialties image
swap, the FAQ answer and the open network panel. Network panels animate
`flex` over 0.6 s with the reference's easing. Hover states are the
reference's `style-hover` pairs, expressed as Tailwind `hover:` classes on
tokens: filled brand buttons darken to `--home-brand-hover`; outlined buttons
fill with `--home-invert-bg`; chips fill with brand; care tiles turn accent;
nav triggers wash lavender. Everything is disabled under
`prefers-reduced-motion: reduce` through the existing media queries.

## Translations

`content.si.ts` and `content.ta.ts` are rewritten to the new shape, `faq.si.ts`
and `faq.ta.ts` are new, and `testimonials`, `internationalCare` overlays gain
the new prose keys. All are `status: "draft"`, like every overlay on the site.
Per `registerPolicy.ts` the eyebrows, headings, pills, card titles, chips,
CTAs, nav, footer and the plaque stay English (absent from the overlays);
body copy, stat descriptions, tile bodies that live in home data, FAQ
questions and answers, and alt text translate. Tile labels and descriptions
that come from `megaNavigation` are nav and stay English. Deleted modules
leave `getContent.ts` and `content.i18n.test.ts`.

## Testing

Existing suites updated: `bands.test.ts` (no numbered eyebrows; the free OPD
band still quotes no figure; the pill and heading exist), `teaserLinks.test.ts`
(every home link leaves the page), `content.i18n.test.ts` (new shape, new
`faq` module, deleted modules, updated `isUntranslatable` for `icon`, `tone`,
`group`, `image`, `value`, `pill`), `navigation.test.ts` (home footer keeps
more than ten outbound links), `megaNavigation.test.ts` untouched.

New guards: every specialties href under `/services/` names a real slug and
every tab group is a `SERVICE_GROUP`; the patient care band renders exactly
the mega nav's Patient Care links; FAQ answers quote no price; the palette
block defines every token the default palette defines (a CSS text test, the
same style as `globals.test.ts`).

Verification before the branch is called done: `npm test`, `npx tsc
--noEmit`, `npx eslint src`, `npm run build`, and a browser pass of `/`,
`/si` and `/ta` at 390, 768 and 1440 px wide in both themes, checking the
header, the carousel, the accordion, the FAQ and every link's destination.

## Deviations from the reference, all deliberate

1. House spelling from the repo: "X-ray", "in-house", "check-ups",
   "Medical Officer, Emergency", "Radiographer, Digital X-ray".
2. "Ambulance" is not a service; its chip links to the facilities page's
   ambulance section.
3. "36" and "View all 36 services" read the live services count.
4. Four placeholder targets chosen: Facilities and services and Explore more
   go to the services index; All patient care goes to `/facilities`; See all
   questions goes to `/contact-us`; Get directions opens Google Maps.
5. The announcement pop-up stays. A static design cannot show a modal and
   the owner added it a week ago.
6. No social icons in the footer, no email in "Reach us", no animated
   counters: the reference has none.
7. "Largest pediatric group in Los Angeles" (home network copy) versus "one
   of the largest paediatric groups in California" (network page) is a
   pre-existing inconsistency and is left as it is on main. Flagged, not
   fixed here.
8. Light is the default theme site-wide (owner's decision after the first
   review, 2026-09-23): a saved choice wins, otherwise the page opens light.
   The OS preference no longer picks the first theme.
9. The lockup keeps its own colours on the dark theme (owner's decision,
   2026-09-23); the reference inverted it to white.
10. A partner logo marquee sits between the network accordion and the FAQ
    (owner's request, 2026-09-23): the nine group companies from the network
    page's own data, desaturated until hovered, pausing under the pointer,
    each opening the network page's family section. Not in the reference.
