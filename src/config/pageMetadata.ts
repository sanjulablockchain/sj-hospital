/**
 * The `<title>` and meta `description` for every route under `src/app/[locale]`,
 * in one place.
 *
 * This is the last parity gap the trilingual work left open: every route's
 * `<title>` and `description` were English in all three locales, which a
 * search engine reads as "this /si/ URL exists for Sinhala readers" (the
 * hreflang and self-canonical tags already say so) "and here is its English
 * title", the opposite of the branch's purpose.
 *
 * Structured like `navigationLabels.ts` and `chromeCopy.ts`, the site's other
 * two cross-cutting (not per-feature) overlays, because page metadata is the
 * same shape of problem: a handful of short strings touched by many otherwise
 * unrelated route files, not a single feature's content tree. It is closer to
 * `chromeCopy` than to `navigationLabels`: `navigationLabels` is a dictionary
 * keyed by the English string itself (many call sites share one of a few dozen
 * repeated labels), while every title and description here is a one-off fact
 * about a single route, the same shape `chromeCopy`'s twelve one-off strings
 * take. Unlike `chromeCopy`, nothing here ever reaches a client bundle (every
 * caller is `generateMetadata`, a server-only function), so the getter in
 * `getPageMetadata.ts` merges through `localize` and loads overlays by dynamic
 * import, the same as a feature's own `getContent.ts`, rather than
 * `chromeCopy`'s synchronous no-merge read.
 *
 * `services/[slug]` is deliberately NOT here: its title and description are
 * built from `service.title` and `service.lede`, which already have a
 * Sinhala and Tamil translation apiece in the services feature's own group
 * files (`emergency.si.ts`, `surgical.si.ts`, ...), enforced by that
 * feature's own `content.i18n.test.ts`. Adding a second, parallel English
 * string here for every one of the 36 services would duplicate a fact that
 * already has exactly one home; `src/app/[locale]/services/[slug]/page.tsx`
 * instead reads the already-localized catalog via `getServicesContent`.
 *
 * Two entries are deliberately identical across all three locales, recorded
 * in `pageMetadata.i18n.test.ts`'s `KEEPS_ENGLISH`, not left untranslated by
 * omission:
 *
 * - `home.title` carries the motto ("To Live Is a Privilege") as a brand
 *   mark, and `docs/superpowers/i18n-review-handover.md` already records the
 *   site's rule that the motto stays English wherever it is set as a mark
 *   (the footer lockup, the footer bottom bar, the email signature, and the
 *   page `<title>`) rather than composed as a sentence (the home hero). That
 *   rule was decided before this task and is not this task's to relitigate;
 *   only `home.description` (not a mark) is translated.
 * - `pharmacy.title` keeps "Pharmacy" English, the same word
 *   `navigationLabels.si.ts` / `.ta.ts` already keep English for the same
 *   reason recorded there: it is how a Sri Lankan reader actually sees that
 *   word, in English, on an otherwise Sinhala or Tamil page. Since the title
 *   shape is `"<Page> | St. Joseph Hospital Negombo"` and both halves are
 *   English words, the whole title is identical across locales; the
 *   description below is fully translated.
 */

export type PageMetadataEntry = {
  readonly title: string;
  readonly description: string;
};

export const pageMetadata = {
  home: {
    title: "St. Joseph Hospital Negombo | To Live Is a Privilege",
    description:
      "US-standard healthcare in Negombo, Sri Lanka. 24/7 OPD, Emergency, Pharmacy, in-house doctors, and digital X-ray, with inpatient rooms from 10,000 LKR.",
  },
  aboutUs: {
    title: "About Us | St. Joseph Hospital Negombo",
    description:
      "US standard, high-quality healthcare in Negombo, Sri Lanka, managed by Kids & Teens Medical Group, USA.",
  },
  accommodation: {
    title: "Accommodation | St. Joseph Hospital Negombo",
    description:
      "Standard, Deluxe, Super Deluxe rooms, and Wards at St. Joseph Hospital Negombo, starting at affordable rates.",
  },
  careers: {
    title: "Careers | St. Joseph Hospital Negombo",
    description:
      "Open roles at St. Joseph Hospital Negombo: medical, nursing, allied health, pharmacy and administration. We never charge candidates a fee at any stage, and we reply to every application.",
  },
  contactUs: {
    title: "Contact Us | St. Joseph Hospital Negombo",
    description:
      "Get in touch with St. Joseph Hospital Negombo: address, phone, email, and a contact form.",
  },
  eChanneling: {
    title: "Book an Appointment | St. Joseph Hospital Negombo",
    description:
      "Browse St. Joseph Hospital Negombo's doctors by specialization and book an appointment online via Calendly.",
  },
  facilities: {
    title: "Facilities | St. Joseph Hospital Negombo",
    description:
      "Inside St. Joseph Hospital Negombo: six purpose built floors, operating theatres, monitored critical care, a 24 hour laboratory, four room categories and a covered ambulance bay.",
  },
  // `description` is a template: `{articleCount}` and `{warningCount}` are
  // interpolated in `src/app/[locale]/health-tips/page.tsx` from
  // `articles.length` / `warnings.length`, the same English, locale-invariant
  // counts every locale already reads (pattern 3 in the i18n recipe:
  // interpolate with a token, not a split). The tokens are not translated:
  // they carry no digits, so the numeral-parity check has nothing to compare.
  healthTips: {
    title: "Health Tips | St. Joseph Hospital Negombo",
    description:
      "{articleCount} health tips written by our own clinicians, {warningCount} signs that mean come in, screening by age and first aid at home, for the conditions that turn up in Negombo.",
  },
  homeCare: {
    title: "Care at Home | St. Joseph Hospital Negombo",
    description:
      "Doctors, nurses and laboratory technicians who visit your home, on 6 dedicated vehicles, for elders, infants and recovery after an operation. Samples taken at home, findings written into your hospital file.",
  },
  internationalCare: {
    title: "International Patient Care | St. Joseph Hospital Negombo",
    description:
      "Ten minutes from Bandaranaike International Airport. One desk arranges the transfer, the written estimate, the interpreter, the insurance paperwork and the records you take home.",
  },
  media: {
    title: "Media & Press | St. Joseph Hospital Negombo",
    description:
      "Newsroom, press desk and press kit for St. Joseph Hospital, Negombo. Named spokespeople, approved logos, cleared photographs, and the rules on filming and patient privacy.",
  },
  network: {
    title: "Our Network | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital is operated by Kids & Teens Medical Group in Los Angeles, one of nine companies across two continents. What that connection changes about your care, and who else is in the family.",
  },
  pharmacy: {
    title: "Pharmacy | St. Joseph Hospital Negombo",
    description:
      "A 24-hour pharmacy counter at St. Joseph Hospital Negombo: authorized stock only, every order checked by a pharmacist against your hospital file, repeat prescriptions held digitally and delivery across Negombo.",
  },
  privacyPolicy: {
    title: "Privacy Policy | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo's privacy policy: how we collect, use, and protect your personal data.",
  },
  schoolWellness: {
    title: "School Wellness | St. Joseph Hospital Negombo",
    description:
      "A paediatric led screening programme that comes to your school: vision, hearing, dental, growth and posture checks for every student, teacher first aid training, and a report home to every parent.",
  },
  // `description` is a template: `{total}` and `{groupList}` are interpolated
  // in `src/app/[locale]/services/page.tsx`. `{total}` is `groupCounts().All`,
  // a locale-invariant count. `{groupList}` is built from the ALREADY
  // localized `groupLabels` (`src/features/services/data/groups.ts` /
  // `.si.ts` / `.ta.ts`), not restated here: the group names are a fact
  // `groups.ts` owns, and this file does not get a second copy of them. The
  // title reuses `indexContent.eyebrow` ("Medical Services" ->
  // "වෛද්‍ය සේවා" / "மருத்துவ சேவைகள்") verbatim from
  // `src/features/services/data/indexContent.si.ts` / `.ta.ts`: same fact,
  // same page, one translation.
  services: {
    title: "Medical Services | St. Joseph Hospital Negombo",
    description: "{total} medical services across six groups ({groupList}) at St. Joseph Hospital Negombo.",
  },
} as const satisfies Record<string, PageMetadataEntry>;

export type PageMetadataKey = keyof typeof pageMetadata;
