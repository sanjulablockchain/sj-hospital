// A relative import straight to career's own data file, not its `index.ts`:
// `index.ts` also re-exports `CareersPage` from a `.tsx` file, and `node
// --test` (which loads this file directly, through content.i18n.test.ts's
// import graph) has no JSX transform, only TypeScript type-stripping. This
// file still needs to load under plain node, so it reaches past the barrel
// to the same file `career`'s own `index.ts` re-exports `sharedJobTitles`
// from, rather than duplicating the fact a third time.
import { sharedJobTitles } from "../../career/data/content.ts";

export type JobOpening = {
  title: string;
  department: string;
  type: string;
};

/**
 * `jobOpenings` is a five-row teaser for `/careers#openings`, which lists six
 * roles of its own (see `src/features/career/data/content.ts`). Four titles
 * here are the exact same open positions as four of that page's six jobs:
 * same institution, same hiring round, the same fact told twice, so they are
 * read from `career`'s own `sharedJobTitles`, exported through its
 * `index.ts`, rather than typed here a second time.
 *
 * This does NOT couple the two pages' array shapes together: importing
 * `career`'s `jobs` here would couple this teaser's five-row shape (title +
 * department + type) to that page's six-row one (title + department + a
 * `line` string carrying the roster pattern and city), which do not match.
 * Only the four title strings cross the boundary; `department` and `type`
 * stay this teaser's own, independent facts.
 */
export const jobOpenings: JobOpening[] = [
  { title: sharedJobTitles.medicalOfficerEmergency, department: "Emergency", type: "Full time" },
  { title: sharedJobTitles.theatreNurse, department: "Surgical", type: "Full time" },
  { title: "Pharmacist (night shift)", department: "Pharmacy", type: "Shift" },
  { title: sharedJobTitles.medicalLaboratoryTechnologist, department: "Laboratory", type: "Full time" },
  { title: sharedJobTitles.radiographerDigitalXray, department: "Imaging", type: "Full time" },
];

/** `#career`'s own copy, stranded in `CareersSection.tsx` until now. */
export const sectionEyebrow = "14 / Careers";
export const heading = { line1: "Work where", line2: "the standard", line3: "is the point" };
export const body =
  "Clinicians and staff trained to US protocol, supported by a group that invests in them.";
export const cta = "Send your CV";
