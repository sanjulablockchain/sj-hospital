// Tamil overlay for pageContent.ts (the hero, the fact strip, the ticker,
// the jump cards, the book section and the disclaimer).
//
// `breadcrumbHome` ("Home") and `breadcrumbCurrent` ("Health Tips") reuse
// navigationLabels.ta.ts's own established strings verbatim ("முகப்பு",
// "சுகாதார ஆலோசனைகள்") rather than coining a second Tamil form for either;
// `hero.ctaWarning` and every `jumpCards[*].label` that names a section
// this page also has a nav/footer entry for reuse the same dictionary's
// "எப்போது வர வேண்டும்" and "வீட்டில் முதலுதவி" for the identical reason.
// "Call us" reuses the recipe's own worked example verbatim ("எங்களை call
// செய்யுங்கள்").
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
  { countTemplate: "கட்டுரைகள் {n}", label: "நூலகம்", note: "நாங்கள் அதிகம் காணும் நிலைமைகளின் அடிப்படையில் வகைப்படுத்தப்பட்டது." },
  { countTemplate: "அறிகுறிகள் {n}", label: "எப்போது வர வேண்டும்", note: "இன்று இரவு, இன்று, இந்த வாரம், அல்லது வழக்கமாக." },
  { countTemplate: "வயது வாரியாக", label: "பரிசோதனை", note: "எங்கள் மருத்துவர்கள் உண்மையில் பரிந்துரைக்கும் பரிசோதனைகள்." },
  { countTemplate: "அடிப்படைகள் {n}", label: "வீட்டில் முதலுதவி", note: "என்ன செய்ய வேண்டும், என்ன ஒருபோதும் செய்யக்கூடாது." },
];

export const disclaimer =
  "பொது தகவல் மட்டுமே, ஒரு இலங்கை வாசகருக்காக எழுதப்பட்டு எங்கள் Clinical குழுவால் மதிப்பாய்வு செய்யப்பட்டது. இது உங்கள் History, மருந்துகள் அல்லது பரிசோதனை கண்டுபிடிப்புகளைக் கணக்கிடாது, இது ஒரு நோய் கண்டறிதலும் அல்ல. உங்கள் சொந்த நிலைமை பற்றி எப்போதும் ஒரு மருத்துவரிடம் பேசுங்கள்.";

export const hero = {
  verticalLabel: "எங்கள் மருத்துவர்கள் எழுதியது",
  breadcrumbHome: "முகப்பு",
  breadcrumbCurrent: "சுகாதார ஆலோசனைகள்",
  headingLine1: "சிறிய பழக்கங்கள்,",
  headingOutline: "பெரிய",
  headingAccent: "மாற்றம்.",
  body: "Clinic இல் உங்களைப் பார்க்கும் மருத்துவர்கள் எழுதிய நடைமுறை ஆலோசனை, நீர்கொழும்பில் உண்மையில் ஏற்படும் நிலைமைகளுக்காக. அற்புத குணப்படுத்துதல்கள் இல்லை, பயமுறுத்தும் கதைகள் இல்லை.",
  ctaLibrary: "நூலகத்தைப் படியுங்கள்",
  ctaWarning: "இன்று இரவு எப்போது வர வேண்டும்",
};

export const bookSection = {
  eyebrow: "06 / இன்னும் உறுதியாக இல்லையா",
  heading: { line1: "படிப்பது", line2: "கேட்பதற்குச்", line3: "சமமல்ல." },
  body: "இந்தப் பக்கத்தில் எதுவும் உங்களை பரிசோதிக்கக்கூடிய ஒரு மருத்துவரை மாற்றாது. இரண்டு வாரங்களாக ஏதாவது உங்களை கவலைப்படுத்தியிருந்தால், Consultation ஐ Book செய்யுங்கள்.",
  actions: [
    { label: "Consultation ஐ Book செய்யுங்கள்" },
    { label: "WhatsApp இல் கேளுங்கள்" },
    { label: "எங்களை call செய்யுங்கள்" },
  ],
};
