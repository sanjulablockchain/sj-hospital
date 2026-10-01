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
 * The four rows, lifted verbatim from ContactDetailsPanel.tsx's CONTACT_ROWS.
 * The icons themselves are JSX and stay in ReachSection, but which icon a row
 * gets is chosen here by the `icon` name below rather than by `label`.
 * `label` is "Call us" rather than the old "Call Us" so it matches the
 * eyebrow/heading case this page's sections use elsewhere; the value and sub
 * text carry the actual hospital facts and are untouched.
 */
export const contactRows: {
  icon: "location" | "phone" | "whatsapp" | "email";
  label: string;
  value: string;
  sub: string;
  href: string;
  external?: boolean;
}[] = [
  {
    // `icon` picks the glyph in ReachSection. It exists because the icon used
    // to be looked up by `label`, which silently returned nothing the moment
    // the label was translated and left four empty blue squares on every
    // Sinhala and Tamil page. Never key JSX off copy that can change language.
    icon: "location",
    label: "Location",
    value: "229/10 St. Joseph Street",
    sub: "Negombo, Sri Lanka",
    href: DIRECTIONS_URL,
    external: true,
  },
  {
    icon: "phone",
    label: "Call us",
    value: "0117 84 84 84 / 031",
    sub: "Reception, 24 hours",
    href: "tel:+94117848484",
  },
  {
    icon: "whatsapp",
    label: "WhatsApp / Mobile",
    value: "074 222 333 4",
    sub: "Fastest reply",
    href: "tel:+94742223334",
  },
  {
    icon: "email",
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

/**
 * The three section eyebrows, moved here out of ReachSection, MessageSection
 * and MapSection so they can be translated with the rest of the page's copy.
 * The leading number is structural and stays the same in every language; only
 * the words after it change.
 */
export const sectionEyebrows = {
  reach: "01 / Reach us",
  message: "02 / Send a message",
  map: "03 / Find us",
};

/**
 * The hero's own copy, moved here out of ContactHero so it can be translated.
 * The heading is split because the second half is painted in the accent
 * colour: `headingLead` is white, `headingAccent` is blue.
 *
 * The CSS uppercases the heading, which is a no-op in Sinhala and Tamil since
 * neither script has letter case, so the same rule can stay on all three.
 */
export const hero = {
  strapline: "Get in touch",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Contact Us",
  headingLead: "Get in",
  headingAccent: "touch.",
  bookCta: "Book a doctor",
  reachCta: "Reach us",
};

/**
 * The contact form's own copy, moved here out of ContactForm so it can be
 * translated. ContactForm is a Client Component, so this arrives as a prop
 * from MessageSection rather than being imported: that keeps the other two
 * locales' copy out of the client bundle.
 *
 * `emergency` carries a {phone} token rather than being split into a before
 * and an after string. Word order moves between languages, and the number
 * does not sit in the same place in a Sinhala sentence as in an English one.
 *
 * NOT here: the field validation messages. Those come back from the Server
 * Action in `schemas.ts`, which has no locale, so they are still English in
 * every language. Translating them needs the action to learn the locale and
 * is its own piece of work.
 */
export const form = {
  firstNameLabel: "First Name*",
  firstNamePlaceholder: "John",
  lastNameLabel: "Last Name*",
  lastNamePlaceholder: "Doe",
  emailLabel: "Email*",
  emailPlaceholder: "john.doe@example.com",
  messageLabel: "Comment or Message",
  messagePlaceholder: "Please let us know any specific requirements...",
  submit: "Send Message",
  submitting: "Sending...",
  callInstead: "Or Call Us",
  emergency: "For emergencies, please call {phone}. The form is not monitored overnight.",
};
