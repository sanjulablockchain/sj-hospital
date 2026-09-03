// Sinhala for the home page's `#media` band.
//
// "Media" itself stays in English throughout, the same site-wide precedent
// navigationLabels.si.ts's own KEEPS_ENGLISH entry sets for this exact word
// (see content.i18n.test.ts's own KEEPS_ENGLISH for `sectionEyebrow`).
// "Gallery" reuses navigationLabels.si.ts's "Image library" root rather than
// coining a second translation of the same idea. `mediaItems[*].date` is a
// press date, a fact rather than copy, excluded from parity the same way
// `media`'s own content.i18n.test.ts excludes every `.date` path.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const mediaItems = [
  { title: "Digital X-ray Suite එක Outpatients ලාට විවෘත වෙනවා", tag: "පුවත්" },
  {
    // "School Wellness" reused verbatim from navigationLabels.si.ts.
    title: "පාසල් සුවතාව වැඩසටහනින් ශිෂ්‍ය 5,000ක් Screen කරා",
    tag: "වාර්තාව",
  },
  { title: "පැය දෙකකට සැරයක් පිරිසිදු කරන රෝහලක් ඇතුලේ", tag: "මාධ්‍ය" },
  { title: "අලුත් ශල්‍යාගාර අංශය: විවෘත කිරීමේ Gallery එක", tag: "රූප එකතුව" },
];

// "Media" is KEEPS_ENGLISH here, same as navigationLabels.si.ts's own entry.
export const sectionEyebrow = "12 / Media";
export const heading = { line1: "පුවත්, මාධ්‍ය", line2: "සහ රූප එකතුව" };
export const cta = "Media විමසීම්";
