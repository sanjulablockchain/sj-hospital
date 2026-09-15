/**
 * Copy for the announcement pop-up that opens over the home page.
 *
 * Five slides, rotating: the in-house medicine delivery service, the free OPD
 * offer, home visits, inpatient rooms, and how to reach the hospital or
 * channel a doctor. Contact sits last on purpose, as the closer after the
 * four things worth coming in for. They live here rather than in
 * `content.ts` because the pop-up is not one of the home page's bands: it is
 * chrome over the page, mounted once and dismissed, and giving it its own
 * module keeps `content.ts` about what the page renders inline.
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
 * `contact`'s section eyebrows use. Every eyebrow is English under the
 * register policy, so none of them appears in the overlays at all, and the
 * sibling test in the i18n recipe (which looks for the one entry left in
 * English beside translated neighbours) has no odd one out to find.
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
    // The OPD's own page, not the services directory. This slide pointed at
    // `/services` only because no OPD page had been found; there is one, and
    // sending a reader who just read "free OPD" to a list of twenty-odd
    // services made them hunt for the thing they had come for.
    ctaPrimary: "See the OPD",
    hrefPrimary: "/services/outpatient-department",
    ctaSecondary: "Call the hospital",
    hrefSecondary: "tel:+94117848484",
    photo: "/images/home/hero-night-facade.jpg",
    photoAlt: "The hospital entrance lit at night, seen from the street.",
  },
  {
    eyebrow: "03 / Home visits",
    heading: { line1: "Cannot come in?", line2: "We come to you" },
    body: "Doctors, nurses and laboratory technicians at your door, on six dedicated vehicles. For elders, for infants, and for anyone recovering where they are most comfortable.",
    ctaPrimary: "See home visits",
    hrefPrimary: "/home-care#visits",
    ctaSecondary: "Arrange a visit",
    hrefSecondary: "tel:+94117848484",
    photo: "/images/services/heroes/home-visits.jpg",
    photoAlt: "A nurse attending to a patient at home.",
  },
  {
    /**
     * The brief for this slide was "fed up of dirty and worn-out inpatient
     * rooms", which is a claim about other hospitals' wards rather than about
     * ours. It is not made here: an unnamed competitor is still a competitor,
     * the hospital cannot support it, and announcement.test.ts fails if that
     * framing comes back. The contrast is carried by describing our own rooms
     * concretely instead, which is the part a reader can check.
     *
     * The rate is deliberately absent. It has one home, the `CountUp` in
     * `RoomsSection.tsx`, and a second copy here could drift from it with
     * nothing to notice; the CTA sends the reader to /accommodation, where
     * the rate actually lives.
     */
    eyebrow: "04 / Rooms",
    heading: { line1: "Recover in", line2: "US comfort" },
    body: "Private and semi private rooms, sanitised on a two hour cycle, with attendant space for your family and meals prepared to dietary orders. Held to the standards of our Los Angeles parent group.",
    ctaPrimary: "See the rooms",
    hrefPrimary: "/accommodation",
    ctaSecondary: "Reserve a room",
    hrefSecondary: "/accommodation#book",
    photo: "/images/rooms/super-deluxe-1.jpg",
    photoAlt: "A private inpatient room with an attendant sofa and window.",
  },
  {
    eyebrow: "05 / Contact",
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
