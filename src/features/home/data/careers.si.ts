// Sinhala for the home page's `#career` band.
//
// Four of the five `jobOpenings[*].title` values are the exact same open
// positions as four of `career`'s own six `jobs[*].title` values (see the
// header comment in content.ts). Reused verbatim from
// `src/features/career/data/content.si.ts`'s own already-reviewed file
// header, which explains the per-title split between the occupational noun
// that stays English and the ordinary word that translates:
//
// - "Medical Officer, Emergency": translates "Medical", keeps "Officer" and
//   "Emergency" (a register word) English.
// - "Theatre Nurse": translates "Theatre" to "ශල්‍යාගාර" (reusing
//   navigationLabels.si.ts's own "Operating theatres" root), keeps "Nurse"
//   English.
// - "Medical Laboratory Technologist": translates "Medical Laboratory" to
//   "වෛද්‍ය විද්‍යාගාර", keeps "Technologist" English.
// - "Radiographer, Digital X-ray": KEEPS_ENGLISH in full, the same
//   register-word class as "Digital X-ray" itself.
//
// "Pharmacist (night shift)" is this page's own row, not one of career's six:
// "Pharmacist" keeps career's own KEEPS_ENGLISH precedent (a bare
// occupational noun with no ordinary word riding along), and "night shift"
// translates, keeping "Shift" English the same way career's own `jobs[*].line`
// keeps "Shift Roster" English throughout.
//
// `department` values reuse the site's own vocabulary: "Emergency", "Pharmacy"
// and "Imaging" are KEEPS_ENGLISH (see content.i18n.test.ts), matching
// career's own `departmentLabels` and navigationLabels.si.ts precedents.
// "Surgical" and "Laboratory" translate. "Laboratory" here uses "විද්‍යාගාර"
// rather than facilities'/home-care's "රසායනාගාරය", to match the word this
// same row's own job title already uses for "Medical Laboratory
// Technologist" rather than saying the same thing two ways on one row.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const jobOpenings = [
  { title: "වෛද්‍ය Officer, Emergency", department: "Emergency", type: "Full time" },
  { title: "ශල්‍යාගාර Nurse", department: "ශල්‍ය", type: "Full time" },
  { title: "Pharmacist (රාත්‍රී Shift)", department: "Pharmacy", type: "Shift" },
  { title: "වෛද්‍ය විද්‍යාගාර Technologist", department: "විද්‍යාගාර", type: "Full time" },
  { title: "Radiographer, Digital X-ray", department: "Imaging", type: "Full time" },
];

// Reused verbatim from navigationLabels.si.ts's "Careers" -> "රැකියා".
export const sectionEyebrow = "13 / රැකියා";
export const heading = { line1: "ප්‍රමිතිය", line2: "තියෙන තැන", line3: "වැඩ කරන්න" };
export const body =
  "ඇමෙරිකානු Protocol එකට පුහුණු වූ Clinicians සහ Staff, ඔවුන් වෙනුවෙන් Invest කරන සමූහයක සහයෙන්.";
// Reused from navigationLabels.si.ts's "Submit your CV" -> "ඔබේ CV එවන්න":
// same fact (send us your CV), so this teaser's own CTA reuses it rather
// than coining a second translation of the same action.
export const cta = "ඔබේ CV එවන්න";
