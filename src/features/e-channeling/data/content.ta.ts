// Tamil for the e-channeling page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns stay in
// English rather than being replaced by literary coinages nobody says out
// loud. So "Book" as a verb, and "Channelling" (this page's own booking
// service, treated like the hospital's own name) rather than a coined term.
// The only string this feature leaves fully in English is listed in
// KEEPS_ENGLISH in content.i18n.test.ts, so it is a recorded decision rather
// than a string somebody forgot.
//
// Sentence forms use the polite plural ("செய்யுங்கள்"), which is how a
// hospital addresses a patient it has not met.
//
// Only translatable copy lives here. `doctors.ta.ts` carries the 88
// consultants' translated specialities; every href, phone number and email
// address stays in content.ts and has exactly one home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

// Same 33 specialities as doctors.ta.ts, in the base's count-sorted order.
export const tickerItems = [
  "அறுவை சிகிச்சை நிபுணர்",
  "குழந்தை மருத்துவ நிபுணர்",
  "மகப்பேறு மற்றும் மகளிர் நோய் நிபுணர்",
  "இதய நோய் நிபுணர்",
  "பொது மருத்துவ நிபுணர்",
  "கதிரியக்கவியல் நிபுணர்",
  "தோல் நோய் நிபுணர்",
  "எலும்பியல் அறுவை சிகிச்சை நிபுணர்",
  "சிறுநீரக நோய் நிபுணர்",
  "ஊட்டச்சத்து நிபுணர்",
  "மூட்டு நோய் நிபுணர்",
  "சிறுநீரியல் நிபுணர்",
  "செவிவழி பரிசோதனை நிபுணர்",
  "ENT அறுவை சிகிச்சை நிபுணர்",
  "கண் அறுவை சிகிச்சை நிபுணர்",
  "மனநல மருத்துவ நிபுணர்",
  "உளவியல் ஆலோசனை",
  "மார்பு நோய் நிபுணர்",
  "கருவுறுதல் ஆலோசனை நிபுணர்",
  "ஆலோசனை உளவியல் நிபுணர்",
  "EEG (மூளை மின் அலை பரிசோதனை)",
  "நாளமில்லச் சுரப்பி நோய் நிபுணர்",
  "இரத்த நோய் நிபுணர்",
  "திசு நோயியல் நிபுணர்",
  "நுரையீரல் செயல்பாட்டு பரிசோதனை",
  "சட்ட மருத்துவ நிபுணர்",
  "நரம்பியல் அறுவை சிகிச்சை நிபுணர்",
  "நரம்பியல் நோய் நிபுணர்",
  "புற்றுநோய் அறுவை சிகிச்சை நிபுணர்",
  "புற்றுநோய் நிபுணர்",
  "பிசியோதெரபி நிபுணர்",
  "பேச்சு சிகிச்சை நிபுணர்",
  "விளையாட்டு மற்றும் உடற்பயிற்சி மருத்துவ நிபுணர்",
];

export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const hero = {};

export const directory = {
  introTemplate:
    "சிறப்புத்துறைகள் {specialities} இல் நிபுணர் மருத்துவர்கள் {count} பேர் உள்ளனர். பெயர் அல்லது சிறப்புத்துறை மூலம் தேடுங்கள், அல்லது கீழே உள்ள பட்டியலைப் பார்க்கவும்.",
  searchAriaLabel: "பெயர் அல்லது சிறப்புத்துறை மூலம் மருத்துவர்களைத் தேடுங்கள்",
  clearSearchAriaLabel: "தேடலை அகற்று",
  specialitiesLabel: "சிறப்புத்துறைகள்",
  resultCountSingular: "நிபுணர் மருத்துவர்",
  resultCountPlural: "நிபுணர் மருத்துவர்கள்",
  noResultsBodyTemplate:
    "வேறு பெயரையோ சிறப்புத்துறையையோ முயற்சிக்கவும், அல்லது எங்கள் Channelling கவுன்டருக்கு {phone}க்கு அழையுங்கள், நாங்கள் உங்களுக்குப் பொருத்தமான மருத்துவரைக் கண்டறிவோம்.",
  weekdays: {
    mon: "திங்கள்",
    tue: "செவ்வாய்",
    wed: "புதன்",
    thu: "வியாழன்",
    fri: "வெள்ளி",
    sat: "சனி",
    sun: "ஞாயிறு",
  },
  dayRangeTemplate: "{from} முதல் {to} வரை",
};

export const helpRail = {
  body: "எங்கள் Channelling கவுன்டர் நாளின் எந்நேரமும் உங்களுக்குப் பொருத்தமான நிபுணரைக் கண்டறிந்து தரும்.",
};
