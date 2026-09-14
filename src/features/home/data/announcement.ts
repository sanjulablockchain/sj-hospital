/**
 * Copy for the announcement pop-up that opens over the home page.
 *
 * Three slides, rotating: the in-house medicine delivery service, the free
 * OPD offer, and how to reach the hospital or channel a doctor. They live
 * here rather than in `content.ts` because the pop-up is not one of the home
 * page's bands: it is chrome over the page, mounted once and dismissed, and
 * giving it its own module keeps `content.ts` about what the page renders
 * inline.
 *
 * `photo`, `photoAlt`, `hrefPrimary` and `hrefSecondary` are facts, not copy,
 * and have exactly one home here (see content.i18n.test.ts's
 * `isUntranslatable`, which excuses each of them by suffix). An href is
 * either site-root-relative, which `AnnouncementModal` prefixes with the
 * reader's locale, or a `tel:` / `https:` action, which it must not: that
 * split is asserted in announcement.test.ts rather than left to a reader of
 * the component.
 *
 * The free OPD slide states the offer as plain fact, on the hospital's own
 * confirmation that it is live and genuinely free. What it deliberately does
 * NOT do is attach a deadline, a quota or a "terms apply" to it, because no
 * such condition has been published; announcement.test.ts fails if one
 * appears. The delivery slide is under the same guard `pharmacy`'s own
 * content.test.ts carries: no cutoff time, no delivery window, no payment
 * method, none of which the hospital has committed to.
 */

/**
 * Not yet read by a Sinhala or Tamil speaker. `npm run i18n:status` lists
 * every file still in this state.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

/**
 * The pop-up's own heading. The hospital's name stays in English script in
 * every locale, the same rule the logo and the rest of the site follow.
 */
export const title = "What's new at St. Joseph Hospital";

export const ariaPrev = "Previous announcement";
export const ariaNext = "Next announcement";
export const ariaClose = "Close announcements";

/**
 * Read by the dot indicators, which append the slide's own number to it
 * ("Announcement 2"). The numeral is structural and never translated, so the
 * word is all this string carries.
 */
export const ariaSlide = "Announcement";

/**
 * The three slides, in the order they rotate.
 *
 * Each `eyebrow` leads with its own ordinal, the same "01 / Reach us" shape
 * `contact`'s section eyebrows use. The word after the numeral is a register
 * noun in all three: "Pharmacy" has direct precedent as an eyebrow kept in
 * English on this very page (`content.pharmacy.eyebrow`), "OPD" is on the
 * register rule's keep-English list, and "Contact" is nav vocabulary, which
 * the owner's 2026-09-09 ruling keeps English in every language. All three
 * being English together is what makes this a rule rather than a miss: the
 * sibling test in the i18n recipe looks for the odd one out, and there is
 * none.
 */
export const slides = [
  {
    eyebrow: "01 / Pharmacy",
    heading: { line1: "Medicine,", line2: "delivered by us" },
    body: "Our own pharmacy, our own staff. Prescriptions are dispensed in house and carried to the ward or to your door, with nobody outside the hospital handling them in between.",
    ctaPrimary: "See how delivery works",
    hrefPrimary: "/pharmacy#delivery",
    ctaSecondary: "Our pharmacy",
    hrefSecondary: "/pharmacy",
    photo: "/images/pharmacy/dispensing-pharmacist.jpg",
    photoAlt: "A pharmacist dispensing medicine at the hospital pharmacy counter.",
  },
  {
    eyebrow: "02 / OPD",
    heading: { line1: "Free OPD", line2: "healthcare" },
    body: "A first for Sri Lanka. An OPD consultation at St. Joseph Hospital costs you nothing, so seeing a doctor is never a question of what you can afford.",
    ctaPrimary: "See our services",
    hrefPrimary: "/services",
    ctaSecondary: "Call the hospital",
    hrefSecondary: "tel:+94117848484",
    photo: "/images/home/hero-night-facade.jpg",
    photoAlt: "The hospital entrance lit at night, seen from the street.",
  },
  {
    eyebrow: "03 / Contact",
    heading: { line1: "Talk to us,", line2: "or book online" },
    body: "Reception answers around the clock, every day of the year. Channel a doctor online, message us on WhatsApp, or call and we will find you the next open slot.",
    ctaPrimary: "Book a doctor",
    hrefPrimary: "/e-channeling",
    ctaSecondary: "WhatsApp us",
    hrefSecondary: "https://wa.me/94742223334",
    photo: "/images/home/hero-dusk-facade.jpg",
    photoAlt: "The hospital building at dusk with the reception entrance open.",
  },
];
