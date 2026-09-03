// Tamil for the home page's `#career` band.
//
// Four of the five `jobOpenings[*].title` values are the exact same open
// positions as four of `career`'s own six `jobs[*].title` values (see the
// header comment in content.ts). Reused verbatim from
// `src/features/career/data/content.ta.ts`'s own already-reviewed file
// header, which explains the per-title split between the occupational noun
// that stays English and the ordinary word that translates:
//
// - "Medical Officer, Emergency": translates "Medical", keeps "Officer" and
//   "Emergency" (a register word) English.
// - "Theatre Nurse": translates "Theatre" to "அறுவை சிகிச்சை அரங்கு" (reusing
//   navigationLabels.ta.ts's own "Operating theatres" root), keeps "Nurse"
//   English.
// - "Medical Laboratory Technologist": translates "Medical Laboratory" to
//   "மருத்துவ ஆய்வக", keeps "Technologist" English.
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
// and "Imaging" are KEEPS_ENGLISH (see content.i18n.test.ts). Of the three,
// only "Pharmacy" actually has an entry in career's own `departmentLabels`
// (an English-identity key there); that map's own taxonomy is All / Medical
// / Nursing / Allied health / Pharmacy / Administration / Support services,
// with no Emergency, Surgical, Laboratory or Imaging entry at all, so
// "Emergency" and "Imaging" here rest on the site's independent
// register-word precedent (the same class as "Digital X-ray", "OPD" in
// navigationLabels.ta.ts), not on any match in that map.
// "Surgical" and "Laboratory" translate. "Laboratory" here uses "ஆய்வகம்" to
// match the word this same row's own job title already uses for "Medical
// Laboratory Technologist" rather than saying the same thing two ways on one
// row.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const jobOpenings = [
  { title: "மருத்துவ Officer, Emergency", department: "Emergency", type: "Full time" },
  { title: "அறுவை சிகிச்சை அரங்கு Nurse", department: "அறுவை சிகிச்சை", type: "Full time" },
  { title: "Pharmacist (இரவு Shift)", department: "Pharmacy", type: "Shift" },
  { title: "மருத்துவ ஆய்வக Technologist", department: "ஆய்வகம்", type: "Full time" },
  { title: "Radiographer, Digital X-ray", department: "Imaging", type: "Full time" },
];

// Reused verbatim from navigationLabels.ta.ts's "Careers" -> "வேலைவாய்ப்புகள்".
export const sectionEyebrow = "13 / வேலைவாய்ப்புகள்";
export const heading = { line1: "தரம்", line2: "இருக்கும் இடத்தில்", line3: "வேலை செய்யுங்கள்" };
export const body =
  "அமெரிக்க Protocol க்கு பயிற்சி பெற்ற Clinicians மற்றும் Staff, அவர்களில் Invest செய்யும் ஒரு குழுவின் ஆதரவுடன்.";
// Reused from navigationLabels.ta.ts's "Submit your CV": same fact (send us
// your CV), so this teaser's own CTA reuses it rather than coining a second
// translation of the same action.
export const cta = "உங்கள் CV ஐ சமர்ப்பியுங்கள்";
