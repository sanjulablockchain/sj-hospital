/**
 * The locations page: the group's hospitals, one card each, and where to turn
 * when a reader is not sure which one to visit.
 *
 * Every Negombo fact below (street, switchboard, WhatsApp, the directions
 * coordinate) is the same value `features/contact/data/content.ts` and the
 * utility bar already publish; `content.test.ts` pins them together so the
 * two pages cannot drift apart.
 *
 * Blue Sapphire Hospital in Ratnapura is listed as `pending`: the hospital has
 * not yet supplied its address, phone numbers or opening hours, and the card
 * says so rather than carrying a guess. When they arrive, fill in `address`,
 * `facts` and `actions`, add a photograph, and flip `status` to `open`;
 * `content.test.ts` refuses a `pending` card that carries an address and an
 * `open` card that lacks one, so the switch cannot be half made.
 */
import type { ContactRow, HeroFact, Hospital } from "../types";

/**
 * The Negombo coordinate's directions link, the same string
 * `features/contact/data/content.ts` owns as `DIRECTIONS_URL`. Restated here
 * rather than imported so this module stays plain data that the node test
 * runner can load without the `@/` alias; the test asserts the two are equal.
 */
export const NEGOMBO_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=7.206699127328975,79.8453343846586";

export const hero = {
  strapline: "Where to find us",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Locations",
  headingLead: "Two hospitals,",
  headingOutline: "one standard",
  headingAccent: "of care.",
  callCta: "Call Negombo",
  exploreCta: "See both hospitals",
  photoAlt: "St. Joseph Hospital building in Negombo",
};

export const heroStandfirst =
  "St. Joseph Hospital in Negombo and Blue Sapphire Hospital in Ratnapura, run to the same American protocol. Pick the one nearest you, or call and we will point you to the right door.";

/** The ticker under the hero. The switchboard is the fact the utility bar owns. */
export const tickerItems = [
  "Negombo: emergency open 24/7",
  "Ratnapura: details to follow",
  "Two hospitals, one protocol",
  "Managed from Los Angeles, USA",
  "Reception 0117 84 84 84",
] as const;

export const heroFacts: HeroFact[] = [
  { k: "Hospitals", v: "Two" },
  { k: "Negombo", v: "Emergency 24/7" },
  { k: "Ratnapura", v: "Details to follow" },
  { k: "Managed from", v: "Los Angeles, USA" },
];

export const sectionEyebrows = {
  hospitals: "01 / Our hospitals",
  help: "02 / Which hospital?",
};

export const hospitalsHeading = { line1: "Find the hospital", line2: "nearest you" };

export const hospitalsIntro =
  "St. Joseph Hospital in Negombo is open now. Blue Sapphire Hospital in Ratnapura joins it, with its full details published here as soon as they are confirmed.";

export const hospitals: Hospital[] = [
  {
    id: "negombo",
    name: "St. Joseph Hospital",
    city: "Negombo",
    region: "Western Province",
    status: "open",
    statusLabel: "Open 24/7",
    body: "Our flagship hospital: six floors of emergency, outpatient, surgical, inpatient, laboratory, imaging and pharmacy care, run to American protocol.",
    photo: "/images/hero-exterior.jpg",
    photoAlt: "St. Joseph Hospital in Negombo",
    address: { street: "229/10 St. Joseph Street", locality: "Negombo, Sri Lanka" },
    facts: [
      { label: "Emergency", value: "24/7" },
      { label: "Reception", value: "0117 84 84 84 / 031" },
      { label: "WhatsApp", value: "074 222 333 4" },
    ],
    actions: [
      { label: "Get directions", href: NEGOMBO_DIRECTIONS_URL, external: true },
      { label: "Call reception", href: "tel:+94117848484" },
      { label: "Contact page", href: "/contact-us", internal: true },
    ],
  },
  {
    id: "ratnapura",
    name: "Blue Sapphire Hospital",
    city: "Ratnapura",
    region: "Sabaragamuwa Province",
    status: "pending",
    statusLabel: "Details coming soon",
    body: "Our second hospital. We are confirming the address, phone numbers and opening hours and will publish them here. Until then, the Negombo switchboard can help.",
    facts: [],
    actions: [{ label: "Call the Negombo switchboard", href: "tel:+94117848484" }],
  },
];

export const helpHeading = { line1: "Not sure", line2: "which hospital?" };

export const helpBody =
  "Call or message us and we will point you to the right hospital, the right clinic and the right time to come in.";

export const contactRows: ContactRow[] = [
  { label: "Call the hospital", value: "0117 84 84 84", href: "tel:+94117848484", glyph: "phone" },
  { label: "WhatsApp us", value: "074 222 333 4", href: "https://wa.me/94742223334", glyph: "arrow" },
  { label: "Book a doctor", href: "/e-channeling", glyph: "arrow", internal: true },
  { label: "Contact page", href: "/contact-us", glyph: "arrow", internal: true },
];
