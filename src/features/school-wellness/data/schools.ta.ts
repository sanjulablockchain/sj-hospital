// Tamil for the Wellness Center Program list, in the same register as
// content.ta.ts: "பள்ளி" for school and "நல்வாழ்வு" for wellness, from
// navigationLabels.ta.ts's "பள்ளி நல்வாழ்வு", and "தரம்" for grade.
//
// The eyebrow and heading are absent: the site register rule keeps section
// eyebrows and headings in English (docs/superpowers/i18n-register-rule.md).
//
// School names are proper names and stay English in schools.ts only; each
// school here carries just its `done` lines, by index.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const schoolsCopy = {
  intro:
    "ஒவ்வொரு பங்காளர் பள்ளியிலும் ஒரு நல்வாழ்வு மையத்தை அமைத்து, பள்ளி ஆண்டு முழுவதும் அங்கு பரிசோதனைகளையும் சுகாதாரத் திட்டங்களையும் நடத்துகிறோம்.",
  stats: {
    total: "திட்டத்தில் உள்ள பள்ளிகள்",
    open: "அமைக்கப்பட்ட நல்வாழ்வு மையங்கள்",
    joining: "விரைவில் இணைகின்றன",
  },
  status: { open: "மையம் திறக்கப்பட்டது", joining: "விரைவில் இணைகிறது" },
  updated: "புதுப்பிக்கப்பட்டது",
};

export const schools = [
  { done: ["பெற்றோர் கூட்டம் நடைபெற்றது", "தரம் 1 மற்றும் 2 பரிசோதனை நிறைவு"] },
  { done: ["பல் சுகாதாரத் திட்டம் நிறைவு", "சுகாதாரப் பழக்கத் திட்டம் நிறைவு", "தரம் 2 பரிசோதனை நிறைவு"] },
  { done: ["தரம் 1 மற்றும் 2 பரிசோதனை நிறைவு"] },
  { next: "பரிசோதனை விரைவில்" },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];
