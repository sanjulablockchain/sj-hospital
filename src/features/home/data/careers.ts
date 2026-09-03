export type JobOpening = {
  title: string;
  department: string;
  type: string;
};

/**
 * `jobOpenings` is a five-row teaser for `/careers#openings`, which lists six
 * roles of its own (see `src/features/career/data/content.ts`). Four titles
 * here are the exact same open positions as four of that page's six jobs
 * ("Medical Officer, Emergency", "Theatre Nurse", "Medical Laboratory
 * Technologist", "Radiographer, Digital X-ray"): same institution, same
 * hiring round, the same fact told twice.
 *
 * This is NOT welded into a cross-feature reference: the recipe treats that
 * as a bigger commitment than a within-file duplicate, and importing
 * `career`'s `jobs` here would couple this teaser's five-row shape (title +
 * department + type) to that page's six-row one (title + department + a
 * `line` string carrying the roster pattern and city), which do not match.
 * Instead, `content.si.ts` and `content.ta.ts` reuse `career`'s own
 * already-reviewed translations for these four titles verbatim, the same way
 * this page's own `sectionEyebrows` reuse `navigationLabels`'s strings: same
 * bytes, no import. Reported to the plan controller rather than merged
 * silently.
 */
export const jobOpenings: JobOpening[] = [
  { title: "Medical Officer, Emergency", department: "Emergency", type: "Full time" },
  { title: "Theatre Nurse", department: "Surgical", type: "Full time" },
  { title: "Pharmacist (night shift)", department: "Pharmacy", type: "Shift" },
  { title: "Medical Laboratory Technologist", department: "Laboratory", type: "Full time" },
  { title: "Radiographer, Digital X-ray", department: "Imaging", type: "Full time" },
];

/** `#career`'s own copy, stranded in `CareersSection.tsx` until now. */
export const sectionEyebrow = "13 / Careers";
export const heading = { line1: "Work where", line2: "the standard", line3: "is the point" };
export const body =
  "Clinicians and staff trained to US protocol, supported by a group that invests in them.";
export const cta = "Send your CV";
