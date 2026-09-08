// Tamil overlay for pageContent.ts (the hero, the fact strip, the ticker,
// the jump cards, the book section and the disclaimer).
//
// The register sweep (2026-09-09) deleted the hero entirely (eyebrow,
// heading, standfirst and hero CTAs all go English, per the rule table's
// "Hero sections, entirely" row), every `jumpCards[*].label` and every
// `bookSection.actions[*].label` (link labels), and `bookSection.eyebrow` /
// `.heading`. `factStrip` is a fact caption, not a hero fact strip by the
// policy's own naming (`heroFacts[].k`/`.v`), so it is untouched and stays
// translated below.
//
// `jumpCards[*].countTemplate` and `bookSection.actions[*].value` carry a
// `{n}` token or a bare fact respectively, never touched here: see
// content.i18n.test.ts's own `isUntranslatable` for why.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const factStrip = [
  { label: "எழுதியவர்", value: "எங்கள் சொந்த மருத்துவர்கள்" },
  { label: "மதிப்பாய்வு செய்தவர்", value: "எங்கள் Clinical குழு" },
  { label: "டெங்கு", value: "இங்கு வருடம் முழுவதும் ஒரு அபாயம்" },
  { label: "மாற்று அல்ல", value: "மருத்துவரை பார்ப்பதற்கு" },
];

export const tickerLines = [
  "வாரந்தோறும் தேங்கும் தண்ணீரை கொட்டுங்கள்",
  "ஆண்டுதோறும் உங்கள் இரத்த அழுத்தத்தை பரிசோதிக்கவும்",
  "Antibiotic Course ஐ முடிக்கவும்",
  "தாகமாகும் முன் தண்ணீர் குடிக்கவும்",
  "குழந்தையின் காய்ச்சல் ஒருபோதும் சாதாரணமானதல்ல",
];

export const jumpCards = [
  { countTemplate: "கட்டுரைகள் {n}", note: "நாங்கள் அதிகம் காணும் நிலைமைகளின் அடிப்படையில் வகைப்படுத்தப்பட்டது." },
  { countTemplate: "அறிகுறிகள் {n}", note: "இன்று இரவு, இன்று, இந்த வாரம், அல்லது வழக்கமாக." },
  { countTemplate: "வயது வாரியாக", note: "எங்கள் மருத்துவர்கள் உண்மையில் பரிந்துரைக்கும் பரிசோதனைகள்." },
  { countTemplate: "அடிப்படைகள் {n}", note: "என்ன செய்ய வேண்டும், என்ன ஒருபோதும் செய்யக்கூடாது." },
];

export const disclaimer =
  "பொது தகவல் மட்டுமே, ஒரு இலங்கை வாசகருக்காக எழுதப்பட்டு எங்கள் Clinical குழுவால் மதிப்பாய்வு செய்யப்பட்டது. இது உங்கள் History, மருந்துகள் அல்லது பரிசோதனை கண்டுபிடிப்புகளைக் கணக்கிடாது, இது ஒரு நோய் கண்டறிதலும் அல்ல. உங்கள் சொந்த நிலைமை பற்றி எப்போதும் ஒரு மருத்துவரிடம் பேசுங்கள்.";

export const hero = {};

export const bookSection = {
  heading: {},
  body: "இந்தப் பக்கத்தில் எதுவும் உங்களை பரிசோதிக்கக்கூடிய ஒரு மருத்துவரை மாற்றாது. இரண்டு வாரங்களாக ஏதாவது உங்களை கவலைப்படுத்தியிருந்தால், Consultation ஐ Book செய்யுங்கள்.",
  actions: [
    {},
    {},
    {},
  ],
};
