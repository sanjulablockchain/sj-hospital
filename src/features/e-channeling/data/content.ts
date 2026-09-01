/**
 * Copy for the /e-channeling page.
 *
 * `heroFacts`' Consultants and Specialities counts, and `tickerItems`, are all
 * derived from `doctors` below rather than typed in: the hero states these
 * counts and the directory computes them from the same array, so a hand-typed
 * figure could silently disagree with what the directory actually shows or
 * advertise a speciality the directory cannot filter to. content.test.ts pins
 * this.
 *
 * `helpRail`'s heading and body are lifted verbatim from the gradient rail
 * that used to sit inside DoctorDirectory.tsx. `heroStandfirst` is the old
 * index.tsx page banner's own subtitle, verbatim. None of this is a new
 * hospital fact.
 *
 * `hero`, `directoryEyebrow`, `directoryHeading` and `directory` were moved
 * here out of ChannelingHero.tsx, DirectorySection.tsx and
 * DoctorDirectory.tsx so they can be translated. `directory` is handed to
 * DoctorDirectory as a prop rather than imported: that component is a Client
 * Component, so importing this module there would pull all three locales'
 * copy into the browser bundle.
 */
import { doctors } from "./doctors.ts";

const specialityCount = new Set(doctors.map((d) => d.specialization)).size;

export const heroFacts = [
  { k: "Consultants", v: String(doctors.length) },
  { k: "Specialities", v: String(specialityCount) },
  { k: "Booking", v: "Online, 24/7" },
  { k: "Channelling desk", v: "0117 84 84 84" },
];

// Derived, not typed: the ticker lists what you can actually book, so it must
// not be able to advertise a speciality the directory cannot filter to. Sorted
// by headcount so the ticker opens with the specialities most people want.
export const tickerItems: readonly string[] = Object.entries(
  doctors.reduce<Record<string, number>>((counts, d) => {
    counts[d.specialization] = (counts[d.specialization] ?? 0) + 1;
    return counts;
  }, {})
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([speciality]) => speciality);

// The old index.tsx page banner's own subtitle, verbatim.
export const heroStandfirst =
  "Consult our in-house doctors at St. Joseph Hospital in Negombo. We have a 24/7 online doctor channeling system to help you book online.";

/**
 * The hero's own copy, moved here out of ChannelingHero so it can be
 * translated. `breadcrumbCurrent` names this feature the same way every other
 * page's nav does ("E-Channeling", see channelingNavigation.ts's comment that
 * it is not one of the site's nine standard sections), and the site treats
 * that name the way it treats the hospital's own name: never transliterated.
 * See KEEPS_ENGLISH in content.i18n.test.ts.
 *
 * There is no separate "Not sure who to see?" field here: that CTA's label is
 * `helpRail.heading` below, reused rather than duplicated, because it is the
 * exact same sentence the help rail prints at the bottom of the page.
 */
export const hero = {
  strapline: "Book a consultant",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "E-Channeling",
  headingLead: "Make an",
  headingAccent: "appointment.",
  findCta: "Find a consultant",
};

// Moved here out of DirectorySection so they can be translated. The leading
// number in the eyebrow is structural and stays the same in every language;
// translated whole, the same way about's and contact's eyebrows are.
export const directoryEyebrow = "01 / Find a consultant";
export const directoryHeading = "Search our consultants";

/**
 * Copy for DoctorDirectory.tsx, a Client Component. This whole object is
 * handed down as a prop (see DirectorySection.tsx) rather than imported
 * there, so no translation data reaches the browser bundle.
 *
 * `introTemplate` and `noResultsBodyTemplate` carry `{count}` / `{specialities}`
 * / `{phone}` tokens rather than being split into fixed before/after halves:
 * word order moves between languages, and a split cannot survive that. The
 * component interpolates the counts and, for the phone number in
 * `noResultsBodyTemplate`, splits on the token to keep the number itself a
 * clickable link, the same way contact's form.emergency does.
 *
 * `phone` and `phoneHref` are not repeated here: DirectorySection passes the
 * channelling desk's own `helpRail.phone` / `helpRail.phoneHref` through
 * instead, so the number has exactly one home.
 */
export const directory = {
  introTemplate:
    "{count} consultants across {specialities} specialities. Search by name or speciality, or browse the list below.",
  searchPlaceholder: "Search a doctor or speciality…",
  allSpecialities: "All specialities",
  specialitiesLabel: "Specialities",
  clearFilters: "Clear filters",
  // Sinhala and Tamil inflect for count differently than English does, so a
  // translation is free to make these two fields the same word if that is
  // how the language actually says it; that would not be a mistranslation.
  resultCountSingular: "consultant",
  resultCountPlural: "consultants",
  noResultsHeading: "No consultant matched that search",
  noResultsBodyTemplate:
    "Try a different name or speciality, or call our channelling desk on {phone} and we will find the right doctor for you.",
  showAllDoctors: "Show all doctors",
  bookAppointment: "Book appointment",
};

// Lifted verbatim from the gradient rail that used to sit at the bottom of
// DoctorDirectory.tsx. `callCtaTemplate` carries a `{phone}` token for the
// same word-order reason as `directory` above: HelpSection interpolates
// `phone` into it rather than splitting the sentence.
export const helpRail = {
  heading: "Not sure who to see?",
  body: "Our channelling desk will match you to the right consultant, any hour of the day.",
  phone: "0117 84 84 84",
  phoneHref: "tel:+94117848484",
  // The channelling desk books consultations, so it takes the appointments
  // mailbox rather than the general one. See `@/config/contactEmails`.
  email: "appointments@sjhospital.lk",
  callCtaTemplate: "Call {phone}",
  emailCta: "Email us",
};
