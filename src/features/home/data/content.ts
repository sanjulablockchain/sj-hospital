/**
 * Copy for the home page bands that have no topical match among this
 * feature's eight pre-existing per-teaser data files (`careers.ts`,
 * `facilities.ts`, `healthTips.ts`, `homeCare.ts`, `internationalCare.ts`,
 * `media.ts`, `network.ts`, `testimonials.ts`): the hero, "who we are", the
 * services bento, the surgical band, the pharmacy stat band, the rooms band,
 * the school wellness band, the stat ticker and the closing "come see us"
 * band. None of these had a typed array before this task; their copy was
 * hardcoded directly in JSX and, for four of them, inside a `'use client'`
 * component.
 *
 * This file, and its `content.si.ts` / `content.ta.ts` overlays, are not
 * named in this task's brief, which lists only the eight files above. They
 * are added because the brief separately requires `SurgicalSection.tsx`,
 * `PharmacySection.tsx`, `RoomsSection.tsx`, `SchoolWellnessSection.tsx` and
 * `HeroParallaxBackground.tsx` to take their copy as a prop rather than an
 * import, which is only possible once that copy has a home to be threaded
 * from. Flagged in the task report rather than left unexplained.
 */

// Relative imports straight to each feature's own data file, not its
// `index.ts`: `index.ts` also re-exports that feature's Page component from
// a `.tsx` file, and `node --test` (which loads this file directly, through
// content.i18n.test.ts's import graph) has no JSX transform, only
// TypeScript type-stripping. This file still needs to load under plain
// node, so it reaches past each barrel to the same file its `index.ts`
// re-exports `homeCareHero` / `pharmacyHero` from, rather than duplicating
// either fact a second time.
import { hero as homeCareHero } from "../../home-care/data/content.ts";
import { hero as pharmacyHero } from "../../pharmacy/data/content.ts";

/**
 * Not yet read by a Sinhala or Tamil speaker. `npm run i18n:status` lists
 * every file still in this state.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

/**
 * The hero's own copy, moved here out of `HeroSection.tsx`.
 *
 * `headingLine1` / `headingOutline` / `headingAccent` are three independent
 * segments of one visual heading, not a literal split of the English
 * sentence around the letter "a": `HeroSection.tsx` renders the outlined
 * segment with a special stroke-only text style, the same three-part
 * heading shape `career`'s and `network`'s own hero headings already use.
 * Each locale composes its own coherent phrase across the three segments
 * rather than preserving "a" specifically; see content.si.ts / content.ta.ts
 * for how each language fills the outlined segment with a real word.
 *
 * The phone number rendered beside the standfirst is a structural fact
 * (`tel:+94117848484`), not copy, the same as the identical chip in
 * `contactCta` below: there is no separate label to translate.
 */
export const hero = {
  locationLabel: "Negombo, Sri Lanka",
  managedBy: "Managed from Los Angeles, USA",
  headingLine1: "To live is",
  headingOutline: "a",
  headingAccent: "privilege.",
  body: "American healthcare standards in Negombo: 24 hour emergency care, surgical theatres, in-house doctors, a modern laboratory, digital X-ray and a pharmacy that never closes.",
  photoAlt: "St. Joseph Hospital building at dusk",
};

/** The five-item ticker under the hero, moved here out of `StatTicker.tsx`. */
export const statTickerItems = [
  "Emergency open 24/7",
  "Surgical theatres to US protocol",
  "Cleaned every two hours",
  "Reports same day, checked twice",
  "Rooms from 10,000 LKR",
];

/**
 * `#standards`'s own copy, moved here out of `WhoWeAreSection.tsx`.
 * `stats[*].count` / `.suffix` / `.value` are the numeric facts `CountUp`
 * renders and stay in this file only, absent from both overlays.
 */
export const whoWeAre = {
  eyebrow: "01 / Who we are",
  heading: { line1: "A US hospital", line2: "in a Sri Lankan", line3: "neighbourhood" },
  intro:
    "St. Joseph Hospital is managed and operated by the Kids & Teens Pediatric Medical Group of Los Angeles: the standards, protocols and clinical discipline of American care, priced for families in Negombo.",
  body: "Consumables are never reused. Waste is managed to international protocol. Every surface is cleaned on a two hour cycle. Our in-house doctors order only the tests you genuinely need, and every report is read by two of them before it reaches you.",
  cta: "More about us",
  stats: [
    { count: 24, caption: "Hours a day, every service open" },
    { count: 2, suffix: "h", caption: "Cleaning cycle, US specification" },
    { value: "0", caption: "Tests ordered that you don't need" },
  ],
};

/**
 * `#services`'s own copy, moved here out of `ServicesBentoSection.tsx`.
 * `viewAllTemplate` carries a `{count}` token: `ServicesBentoSection.tsx`
 * substitutes the services feature's own `services.length` (a fact, not
 * copy) rather than splitting the sentence around the number.
 */
export const servicesBento = {
  eyebrow: "02 / What we do",
  heading: { line1: "Eight ways we", line2: "look after you" },
  tilesNote: "Every tile opens a service",
  tiles: [
    {
      badge: "/01 Emergency & OPD",
      openNow: "Open now",
      heading: { line1: "Walk in at", line2: "any hour" },
      body: "Emergency care, outpatient consultations, laboratory and digital X-ray, live around the clock every day of the year.",
    },
    {
      badge: "/02 Surgical care",
      heading: "Theatres, consultant led",
      body: "Elective and emergency surgery with sterile instrument tracking and an assigned recovery nurse.",
      linkLabel: "Surgical services",
    },
    {
      badge: "/03 Rooms",
      body: "LKR a night. Private and semi private, sanitised every two hours, nursing that knows your name.",
    },
    {
      badge: "/04 Pharmacy",
      heading: "Authorized stock, 24/7",
      body: "Verified medicine only. No substitutes.",
    },
    {
      badge: "/05 Digital X-ray",
      heading: "Lower dose, sharper plates",
      body: "Read within the hour, not the week.",
    },
    {
      badge: "/06 Laboratory",
      heading: "Two doctors read every report",
      note: "10% off for OPD patients",
    },
    {
      badge: "/07 Home visits",
      // `home-care`'s own hero tagline (`hero.strapline`), read back through
      // its `index.ts` rather than typed here a second time: same fact,
      // exactly one home.
      heading: homeCareHero.strapline,
      body: "Doctors, nurses and lab technicians at your door.",
    },
    {
      badge: "/08 Delivery",
      heading: "Medicine to your door",
      body: "Across Negombo, from our own counter.",
    },
    // `as const`: each tile has a genuinely different shape (tile 0's
    // `heading` is a two-line object, every other tile's is a plain string),
    // and this keeps `tiles[N]` a fixed, per-position type instead of a union
    // of all eight, which is what ServicesBentoSection.tsx's direct indexing
    // needs.
  ] as const,
  footer: {
    label: "Full service directory",
    heading: "Every service, in one place",
    viewAllTemplate: "View all {count} services",
  },
};

/**
 * `#surgical`'s own copy, moved here out of `SurgicalSection.tsx`, a
 * `'use client'` leaf (it runs a parallax effect) that must take this as a
 * prop rather than import it.
 */
export const surgical = {
  eyebrow: "03 / Surgical care",
  heading: { line1: "Theatres run", line2: "to protocol,", line3: "not to habit" },
  body: "Elective and emergency surgery with consultant anaesthesia, single use consumables, sterile tracking on every instrument set and a nurse assigned to your recovery from theatre to discharge.",
  ctaPrimary: "Request a surgical consult",
  ctaSecondary: "Speak to the theatre desk",
  procedures: [
    { name: "General surgery", note: "Elective and emergency" },
    { name: "Obstetric theatre", note: "Consultant led" },
    { name: "Orthopaedic procedures", note: "Day case and inpatient" },
    { name: "Endoscopy suite", note: "Same day reporting" },
    { name: "Post-operative care", note: "Assigned recovery nurse" },
  ],
};

/**
 * `#pharmacy`'s own copy, moved here out of `PharmacySection.tsx`, a
 * `'use client'` leaf that must take this as a prop rather than import it.
 * `stats[*].count` / `.suffix` / `.value` are facts `CountUp` renders and
 * stay in this file only.
 */
export const pharmacy = {
  eyebrow: "05 / Pharmacy",
  // `pharmacy`'s own hero heading (`hero.headingLead` / `.headingOutline` /
  // `.headingAccent`), read back through its `index.ts` rather than typed
  // here a second time: same fact, exactly one home.
  heading: {
    line1: pharmacyHero.headingLead,
    line2: pharmacyHero.headingOutline,
    line3: pharmacyHero.headingAccent,
  },
  body: "Our in-house pharmacy stocks only verified, authorized stock, dispensed by pharmacists who can read your file, at any hour of the night.",
  ctaPrimary: "Order a delivery",
  ctaSecondary: "Ask a pharmacist",
  stats: [
    { label: "Counter hours", count: 24, suffix: " / 7" },
    { label: "Home delivery radius", value: "Negombo" },
    { label: "Prescriptions on file", value: "Digital", accent: true },
    { label: "OPD patient lab discount", count: 10, suffix: "%" },
  ],
};

/**
 * `#rooms`'s own copy, moved here out of `RoomsSection.tsx`, a `'use client'`
 * leaf that must take this as a prop rather than import it. The 10,000 LKR
 * price `CountUp` animates to is a fact and stays in this file only.
 */
export const rooms = {
  eyebrow: "07 / Stay with us",
  heading: { line1: "A room that", line2: "feels like", line3: "recovery" },
  body: "Quiet, private and sanitised on a two hour cycle, with nursing that knows your name and a doctor on the floor at all times.",
  cta: "Reserve a room",
  fromLabel: "Rooms from",
  priceCaption: "LKR per night, all inclusive of nursing care",
  perks: [
    "Private and semi private options",
    "Attendant space for family",
    "Meals prepared to dietary orders",
  ],
};

/**
 * `#wellness`'s own copy, moved here out of `SchoolWellnessSection.tsx`, a
 * `'use client'` leaf that must take this as a prop rather than import it.
 */
export const schoolWellness = {
  eyebrow: "10 / School wellness",
  heading: { line1: "We come to", line2: "the classroom" },
  body: "A pediatric led programme for Negombo schools: annual screening, vision and hearing checks, growth tracking, vaccination drives and teacher first aid training, run by the same doctors who see your children in clinic.",
  rows: [
    { title: "Annual health screening", note: "On campus, per grade" },
    { title: "Vision, hearing & dental", note: "Referral report to parents" },
    { title: "Teacher first aid training", note: "Half day, certified" },
  ],
  cta: "Bring it to our school",
  photoAlt: "Pediatric doctor with a young patient",
  photoCaption: "Kids & Teens pediatric protocol",
};

/**
 * `#book`'s own copy, moved here out of `ContactCtaSection.tsx`. "St. Joseph
 * Street" keeps the hospital's own street name in English, unchanged, the
 * same rule `contact`'s own content.ts states: it is the address a driver is
 * shown, and the building's own signage never changes script. The phone
 * number is a structural fact rendered without a separate label, the same
 * treatment `hero` above gives the identical chip.
 */
export const contactCta = {
  eyebrow: "15 / Come see us",
  heading: { line1: "Open right", line2: "now. Yes,", line3: "right now." },
  body: "229/10 St. Joseph Street, Negombo. Walk in, call us, or send a message on WhatsApp.",
  ctaSurgical: "Surgical care",
  ctaRooms: "Reserve a room",
};
