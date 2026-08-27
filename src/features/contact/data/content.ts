// Every string of substance below is a copy-paste out of the components this
// page replaces: ContactDetailsPanel.tsx, ContactFormPanel.tsx and
// LocationMap.tsx. `content.test.ts` pins the hospital's real contact details
// and coordinate, so a reword or a dropped digit fails the suite.
//
// The only new strings on this page are `tickerItems`, `heroFacts`' labels and
// `jumpCards`' notes: each restates a claim already present in `contactRows`
// or the old panel copy, so none of them is a new hospital fact.

/** The coordinate has one home here, so LocationMap and this page's tests both
 * reach the same value. Lifted verbatim from the old LocationMap.tsx. */
export const HOSPITAL_COORDS: [number, number] = [7.206699127328975, 79.8453343846586];

// ContactDetailsPanel.tsx's DIRECTIONS_URL, verbatim.
export const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=7.206699127328975,79.8453343846586";

export const tickerItems = [
  "Open 24/7",
  "Reception, 24 hours",
  "WhatsApp for the fastest reply",
  "Replies within a day",
  "Walk in, call, or message",
] as const;

export const heroFacts = [
  { k: "Reception", v: "Open 24/7" },
  { k: "Reply", v: "Within one business day" },
  { k: "Fastest", v: "WhatsApp" },
  { k: "Where", v: "Negombo" },
];

export const jumpCards = [
  { count: "01", label: "Reach us", note: "Location, phone, WhatsApp, and email.", href: "#reach" },
  { count: "02", label: "Send a message", note: "We reply within one business day.", href: "#message" },
  { count: "03", label: "Find us", note: "229/10 St. Joseph Street, Negombo.", href: "#map" },
  { count: "04", label: "Book a doctor", note: "Skip the form and pick a slot.", href: "/e-channeling" },
];

/**
 * The four rows, lifted verbatim from ContactDetailsPanel.tsx's CONTACT_ROWS
 * minus the `icon` field: icons are JSX and stay in the component, keyed by
 * label. `label` is "Call us" rather than the old "Call Us" so it matches the
 * eyebrow/heading case this page's sections use elsewhere; the value and sub
 * text carry the actual hospital facts and are untouched.
 */
export const contactRows: {
  label: string;
  value: string;
  sub: string;
  href: string;
  external?: boolean;
}[] = [
  {
    label: "Location",
    value: "229/10 St. Joseph Street",
    sub: "Negombo, Sri Lanka",
    href: DIRECTIONS_URL,
    external: true,
  },
  {
    label: "Call us",
    value: "0117 84 84 84",
    sub: "Reception, 24 hours",
    href: "tel:+94117848484",
  },
  {
    label: "WhatsApp / Mobile",
    value: "074 222 333 4",
    sub: "Fastest reply",
    href: "tel:+94742223334",
  },
  {
    label: "Email",
    value: "info@sjhospital.lk",
    sub: "Replies within a day",
    href: "mailto:info@sjhospital.lk",
  },
];

// `#reach`'s SectionHead intro: ContactDetailsPanel.tsx's own standfirst,
// verbatim. Distinct from jumpCards[0].note above and from every other intro.
export const reachIntro = "Call, message, or walk in, whichever is easiest for you.";

// `#message`'s SectionHead intro: the old page banner's subtitle and
// ContactFormPanel.tsx's own standfirst (the two were the same sentence in the
// old page too), verbatim. Distinct from jumpCards[1].note above.
export const messageIntro = "We will contact you within one business day.";

// `#map`'s SectionHead intro: LocationMap.tsx's own aria-label, verbatim.
// Distinct from jumpCards[2].note above, which quotes the street address
// instead.
export const mapIntro = "Interactive map showing St. Joseph Hospital Negombo location.";

// The hero standfirst: ContactDetailsPanel.tsx's accent-band line, verbatim.
// The same sentence appears again as the accent band inside `ReachSection`,
// which is deliberate (the hero teases the claim, `#reach` delivers it), and
// it is distinct from `reachIntro`, `messageIntro` and `mapIntro` above, so no
// section's standfirst repeats what the hero already said.
export const heroStandfirst = "Open 24/7, every hour of every day.";
