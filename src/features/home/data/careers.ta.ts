// Tamil for the home page's `#career` band.
//
// `jobOpenings[*].title` used to be read from `career`'s own
// `sharedJobTitlesTa` (four of the five) or typed out here (the fifth,
// "Pharmacist (night shift)"). The register sweep (2026-09-09) deleted every
// `title` on this page: a job opening's title is a card title, so it now
// renders in English from the base module regardless of locale, and this
// overlay no longer needs the shared-title import.
//
// `department` values reuse the site's own vocabulary: "Emergency", "Pharmacy"
// and "Imaging" are KEEPS_ENGLISH (see content.i18n.test.ts). Of the three,
// only "Pharmacy" actually has an entry in career's own `departmentLabels`
// (an English-identity key there); that map's own taxonomy is All / Medical
// / Nursing / Allied health / Pharmacy / Administration / Support services,
// with no Emergency, Surgical, Laboratory or Imaging entry at all, so
// "Emergency" and "Imaging" here rest on the site's independent
// register-word precedent (the same class as "Digital X-ray", "OPD" in
// navigationLabels.ta.ts), not on any match in that map.
// "Surgical" and "Laboratory" translate. "Laboratory" here uses "ஆய்வகம்" to
// match the word this same row's own job title already used for "Medical
// Laboratory Technologist" rather than saying the same thing two ways on one
// row.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const jobOpenings = [
  { department: "Emergency", type: "Full time" },
  { department: "அறுவை சிகிச்சை", type: "Full time" },
  { department: "Pharmacy", type: "Shift" },
  { department: "ஆய்வகம்", type: "Full time" },
  { department: "Imaging", type: "Full time" },
];
