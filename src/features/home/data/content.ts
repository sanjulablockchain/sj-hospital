/**
 * Copy for the home page bands that have no data file of their own: the hero
 * and its ticker, the quick access mosaic, "who we are" and its stat cards, the
 * free OPD band, the specialties carousel, the patient care tiles, the
 * pharmacy band, the standards band and the closing "come see us" band. The
 * reviews, international care, network, FAQ, media and careers bands read
 * their own files beside this one, and `getContent.ts` fetches all of them
 * once per request.
 *
 * Layout and copy follow the v4 reference
 * (docs/superpowers/specs/2026-09-23-home-page-v4-reference.html). Facts
 * (phone numbers, prices, counts, routes, image paths, icon and tone keys)
 * live here and nowhere else; `content.si.ts` / `content.ta.ts` may only
 * replace prose. Where the reference and the repo disagreed on a fact or a
 * house spelling, the repo won: "X-ray", "in-house", and "Ambulance" is not a
 * service, so its chip goes to the facilities page's ambulance section.
 */

// Relative imports straight to each feature's own data file, not its
// `index.ts`: `index.ts` also re-exports that feature's Page component from
// a `.tsx` file, and `node --test` (which loads this file directly, through
// bands.test.ts and content.i18n.test.ts) has no JSX transform, only
// TypeScript type-stripping.
import { hero as pharmacyHero } from "../../pharmacy/data/content.ts";
import { DIRECTIONS_URL } from "../../contact/data/content.ts";
import type { ServiceGroup } from "../../services/types.ts";
import type { HomeIconKey, StatTone } from "../types.ts";

/**
 * Not yet read by a Sinhala or Tamil speaker. `npm run i18n:status` lists
 * every file still in this state.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

/**
 * `headingLine1` / `headingOutline` / `headingAccent` are three independent
 * segments of one visual heading: `HeroSection.tsx` renders the outlined
 * segment with a stroke-only text style. Each locale composes its own phrase
 * across the three segments rather than preserving "a" specifically.
 *
 * The phone number beside the standfirst is a structural fact
 * (`tel:+94117848484`), not copy: there is no separate label to translate.
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

/** The five-item ticker under the hero. The room price is the fact `facilities/data/content.ts` owns. */
export const statTickerItems = [
  "Emergency open 24/7",
  "Surgical theatres to US protocol",
  "Cleaned every two hours",
  "Reports same day, checked twice",
  "Rooms from 10,000 LKR",
];

/**
 * `#book`: the mosaic under the hero. `cta` leaves are link labels (English by
 * the register rule); `bodyTemplate` carries a `{count}` the component fills
 * with `services.length`. "Get directions" opens the same Google Maps route
 * the contact page's map offers, imported rather than typed twice.
 */
export const quickAccess = {
  channel: {
    heading: "Channel a doctor",
    body: "Pick a consultant and a time online, or walk in to our free OPD.",
    cta: "Make an appointment",
    href: "/e-channeling",
    photo: "/images/career-staff.jpg",
    photoAlt: "St. Joseph Hospital doctors and nurses",
  },
  emergencyCall: {
    heading: "24 hour emergency assistance. Call us on",
    href: "tel:+94117848484",
  },
  emergency: {
    title: "Emergency assistance",
    body: "Walk in at any hour. Ambulance bay and critical care open 24/7.",
    cta: "Read more",
    href: "/services/accident-emergency",
    photo: "/images/services/heroes/accident-emergency.jpg",
    photoAlt: "The St. Joseph Hospital emergency team",
  },
  facilities: {
    title: "Facilities and services",
    bodyTemplate: "{count} services under one roof, run to US protocol.",
    cta: "Read more",
    href: "/services",
    photo: "/images/services/heroes/laboratory.jpg",
    photoAlt: "The St. Joseph Hospital laboratory",
  },
  location: {
    title: "Our location",
    body: "229/10 St. Joseph Street, Negombo. Ten minutes from the airport.",
    cta: "Get directions",
    href: DIRECTIONS_URL,
    photo: "/images/hero-exterior.png",
    photoAlt: "The St. Joseph Hospital building",
  },
};

/**
 * `#about`. `stats[*].value` is a fact (`{count}` is filled with
 * `services.length`); `icon` and `tone` are structural keys. `label` and
 * `desc` are the stat's caption and translate, the same split the old
 * `caption` had.
 */
export const whoWeAre = {
  eyebrow: "Who we are",
  heading: "A US hospital in a Sri Lankan neighbourhood",
  intro:
    "Managed and operated by the Kids & Teens Pediatric Medical Group of Los Angeles: the standards, protocols and clinical discipline of American care, priced for families in Negombo.",
  body: "Consumables are never reused. Every surface is cleaned on a two hour cycle. Every report is read by two doctors before it reaches you.",
  stats: [
    {
      icon: "clock",
      value: "24/7",
      label: "Emergency and OPD",
      desc: "Every service open, every hour, every day of the year.",
      tone: "red",
    },
    {
      icon: "grid",
      value: "{count}",
      label: "Services",
      desc: "From emergency care to fertility, under one roof.",
      tone: "brand",
    },
    {
      icon: "building",
      value: "6",
      label: "Floor hospital",
      desc: "Purpose built in Negombo, with ambulance bay and covered arrival.",
      tone: "sky",
    },
    {
      icon: "spark",
      value: "2h",
      label: "Cleaning cycle",
      desc: "Every surface, cleaned to US specification.",
      tone: "green",
    },
    {
      icon: "ambulance",
      value: "6",
      label: "Home visit vehicles",
      desc: "Doctors, nurses and lab technicians at your door.",
      tone: "orange",
    },
    {
      icon: "plane",
      value: "10",
      label: "Minutes from the airport",
      desc: "Bandaranaike International to our door.",
      tone: "brand",
    },
  ] satisfies { icon: HomeIconKey; value: string; label: string; desc: string; tone: StatTone }[],
};

/**
 * `#free-opd`: the band announcing that an OPD consultation costs nothing.
 * `eyebrow` is the "A first for Sri Lanka" pill. It carries NO figures,
 * deliberately: the 24 hours, the same-day slots and the 10% laboratory
 * discount all have one home, the `outpatient-department` entry in
 * `services/data/clinics.ts`; `bands.test.ts` fails if a number appears.
 *
 * The photograph is one of the hospital's own doctors, cut from the
 * five-clinician team frame (`2025/08/DSC_6347.jpg`); see the git history of
 * this file for the three frames it replaced and why.
 */
export const freeOpd = {
  eyebrow: "A first for Sri Lanka",
  heading: "Seeing a doctor costs you nothing",
  body: "Consultations at our outpatient department are free, so nobody has to weigh up whether a fever, a lump or a week of pain is worth the money. Walk in and see a doctor.",
  points: [
    "Free consultation, every hour we are open",
    "General complaints and specialist referral alike",
    "Your diagnosis explained before you leave",
  ],
  ctaPrimary: "See the OPD",
  hrefPrimary: "/services/outpatient-department",
  ctaSecondary: "Call the hospital",
  hrefSecondary: "tel:+94117848484",
  photo: "/images/home/free-opd-doctor.jpg",
  photoAlt:
    "A St. Joseph Hospital doctor in a branded white coat, arms folded, a stethoscope around his neck.",
};

export type SpecialtyLink = { title: string; href: string };
export type SpecialtyTab = {
  /** Compared against `SERVICE_GROUPS`; the tabs run in that order. */
  group: ServiceGroup;
  label: string;
  title: string;
  desc: string;
  image: string;
  links: SpecialtyLink[];
};

/**
 * `#services`: six tabs, one per service group, each with a photograph, a
 * paragraph and the group's top services as chips. Every `/services/<slug>`
 * href names a real entry in `services/data/services.ts`
 * (`specialties.test.ts`). Ambulance is not a service in the catalogue, so its
 * chip goes to the facilities page's ambulance section. `headingTemplate` and
 * `viewAll.ctaTemplate` take `{count}`; `countTemplate` takes `{n}` and
 * `{total}`.
 */
export const specialties = {
  eyebrow: "What we do",
  headingTemplate: "{count} services, six ways we look after you",
  body: "From a walk in consultation to surgery, diagnostics and care at home, every service runs to the same American protocol.",
  topServicesHeading: "Top services",
  findDoctor: { cta: "Find a doctor", href: "/e-channeling" },
  exploreMore: { cta: "Explore more", href: "/services#directory" },
  viewAll: { ctaTemplate: "View all {count} services", href: "/services" },
  countTemplate: "{n} of {total}",
  ariaPrev: "Previous specialty",
  ariaNext: "Next specialty",
  tabs: [
    {
      group: "Emergency",
      label: "Emergency",
      title: "Emergency and critical care",
      desc: "Accident and emergency care around the clock, with intensive and critical care on site. Walk in at any hour, every day of the year, or call and we come to you.",
      image: "/images/services/heroes/accident-emergency.jpg",
      links: [
        { title: "Accident and emergency", href: "/services/accident-emergency" },
        { title: "Intensive and critical care", href: "/services/intensive-critical-care" },
        { title: "Ambulance", href: "/facilities#ambulance" },
      ],
    },
    {
      group: "Surgical",
      label: "Surgical",
      title: "Surgical care",
      desc: "Consultant led theatres with consultant anaesthesia, single use consumables, sterile tracking on every instrument set and a nurse assigned to your recovery.",
      image: "/images/services/heroes/general-surgery.jpg",
      links: [
        { title: "General surgery", href: "/services/general-surgery" },
        { title: "Orthopaedic surgery", href: "/services/orthopaedic-surgery" },
        { title: "ENT surgery and audiology", href: "/services/ent-surgery" },
        { title: "Urology", href: "/services/urology" },
        { title: "Ophthalmology and cataract", href: "/services/ophthalmology" },
        { title: "Neurosurgery", href: "/services/neurosurgery" },
        { title: "Endoscopy", href: "/services/endoscopy" },
      ],
    },
    {
      group: "Diagnostics",
      label: "Diagnostics",
      title: "Laboratory and imaging",
      desc: "A 24 hour laboratory and digital X-ray, with every report read by two doctors and returned the same day. OPD patients save 10% on laboratory tests.",
      image: "/images/services/heroes/laboratory.jpg",
      links: [
        { title: "Laboratory services", href: "/services/laboratory" },
        { title: "Radiology and digital X-ray", href: "/services/radiology" },
        { title: "Cardiac screening and ECG", href: "/services/cardiac-screening" },
        { title: "CTG and fetal monitoring", href: "/services/fetal-monitoring" },
      ],
    },
    {
      group: "Clinics",
      label: "Clinics",
      title: "Specialist clinics",
      desc: "Specialist clinics beside a free outpatient department, so a referral is a walk down the corridor rather than a trip across town.",
      image: "/images/services/heroes/cardiology.jpg",
      links: [
        { title: "Outpatient department", href: "/services/outpatient-department" },
        { title: "Cardiology", href: "/services/cardiology" },
        { title: "Dermatology", href: "/services/dermatology" },
        { title: "Diabetes and endocrine care", href: "/services/diabetes-endocrinology" },
        { title: "Neurology", href: "/services/neurology" },
        { title: "Nephrology", href: "/services/nephrology" },
        { title: "Physiotherapy", href: "/services/physiotherapy" },
        { title: "Mental health", href: "/services/mental-health" },
      ],
    },
    {
      group: "Women & children",
      label: "Women and children",
      title: "Women and children",
      desc: "Maternity, gynaecology and paediatric care, led by the same Kids and Teens protocol our Los Angeles group uses for its own patients.",
      image: "/images/services/heroes/obstetrics-maternity.jpg",
      links: [
        { title: "Obstetrics and maternity", href: "/services/obstetrics-maternity" },
        { title: "Gynaecology", href: "/services/gynaecology" },
        { title: "Paediatrics and neonatal care", href: "/services/paediatrics" },
        { title: "Fertility and embryology", href: "/services/fertility" },
        { title: "Vaccination clinic", href: "/services/vaccination-clinic" },
      ],
    },
    {
      group: "At home",
      label: "At home",
      title: "Care at home",
      desc: "A pharmacy that never closes, medicine delivered across Negombo, home visits on six dedicated vehicles and telemedicine from anywhere on the island.",
      image: "/images/services/heroes/home-visits.jpg",
      links: [
        { title: "24 hour pharmacy", href: "/services/pharmacy" },
        { title: "Medicine delivery", href: "/services/medicine-delivery" },
        { title: "Home visits", href: "/services/home-visits" },
        { title: "Telemedicine", href: "/services/telemedicine" },
      ],
    },
  ] satisfies SpecialtyTab[],
};

/**
 * `#care`. The six tiles themselves are the Patient Care menu of
 * `src/config/megaNavigation.ts`, read through `patientCareTiles.ts`, so the
 * labels and one-liners have one home; only the band's own copy lives here.
 * "All patient care" has no index page of its own, so it opens the first
 * tile's destination.
 */
export const patientCare = {
  heading: "Committed to your better health",
  body1:
    "St. Joseph Hospital is a six floor, purpose built hospital in Negombo, run to the protocols of an American pediatric group.",
  body2:
    "Care does not stop at the ward. Our pharmacy never closes, our doctors visit homes and schools, and travelling patients are looked after from the airport onward.",
  cta: "All patient care",
  href: "/facilities",
};

/**
 * `#pharmacy`. The heading is `pharmacy`'s own hero heading, read back
 * through its data file rather than typed here a second time. `stats[*].value`
 * is a fact and stays in this file only; `label` is the caption and
 * translates. `tone` picks the value's colour.
 */
export const pharmacy = {
  eyebrow: "24 hour pharmacy",
  heading: {
    line1: pharmacyHero.headingLead,
    line2: pharmacyHero.headingOutline,
    line3: pharmacyHero.headingAccent,
  },
  body: "Our in-house pharmacy stocks only verified, authorized stock, dispensed by pharmacists who can read your file, at any hour of the night.",
  ctaPrimary: "Order a delivery",
  hrefPrimary: "/pharmacy#delivery",
  ctaSecondary: "Ask a pharmacist",
  hrefSecondary: "/pharmacy#contact",
  stats: [
    { icon: "clock", label: "Counter hours", value: "24 / 7", tone: "ink" },
    { icon: "ambulance", label: "Home delivery radius", value: "Negombo", tone: "ink" },
    { icon: "report", label: "Prescriptions on file", value: "Digital", tone: "sky" },
    { icon: "flask", label: "OPD patient lab discount", value: "10%", tone: "brand" },
  ] satisfies { icon: HomeIconKey; label: string; value: string; tone: "ink" | "sky" | "brand" }[],
};

/** `#standards`: the deep band and the motto plaque hanging off its foot. */
export const standards = {
  heading: "Built like a US facility",
  sub: "Medical quality care, to American protocol",
  items: [
    {
      icon: "drop",
      title: "Single use consumables",
      desc: "Consumables are never reused, and waste is managed to international protocol.",
    },
    {
      icon: "shield",
      title: "Infection control",
      desc: "Every surface is cleaned on a two hour cycle, to US specification.",
    },
    {
      icon: "report",
      title: "Reports read twice",
      desc: "Every result is read by two doctors before it reaches you, the same day.",
    },
  ] satisfies { icon: HomeIconKey; title: string; desc: string }[],
  /** The motto set as a brand mark, English in every locale (see ThemedFooter's note). */
  plaqueHeading: "To live is a privilege.",
};

/**
 * `#contact`: the closing band. "St. Joseph Street" keeps the hospital's own
 * street name in English, unchanged, the same rule `contact`'s own content.ts
 * states. `contactRows[*].label` are link labels (English); `href` and `icon`
 * are facts.
 */
export const contactCta = {
  eyebrow: "Come see us",
  heading: "Open right now. Yes, right now.",
  body: "229/10 St. Joseph Street, Negombo. Walk in, call us, or send a message on WhatsApp.",
  contactRows: [
    { label: "Surgical care", href: "/services/general-surgery", icon: "arrow" },
    { label: "Reserve a room", href: "/accommodation", icon: "arrow" },
    { label: "WhatsApp 074 222 333 4", href: "https://wa.me/94742223334", icon: "chat" },
    { label: "0117 84 84 84", href: "tel:+94117848484", icon: "phone" },
  ] satisfies { label: string; href: string; icon: HomeIconKey }[],
};
