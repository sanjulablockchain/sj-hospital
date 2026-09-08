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
// Only translatable copy lives here. `doctors.ta.ts` carries the 71
// consultants' translated specialities; every href, phone number and email
// address stays in content.ts and has exactly one home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

// Same 28 specialities as doctors.ta.ts, in the base's count-sorted order.
export const tickerItems = [
  "குழந்தை மருத்துவ நிபுணர்",
  "பொது மருத்துவ நிபுணர்",
  "அறுவை சிகிச்சை நிபுணர்",
  "மகப்பேறு மற்றும் மகளிர் நோய் நிபுணர்",
  "இதய நோய் நிபுணர்",
  "தோல் நோய் நிபுணர்",
  "ENT அறுவை சிகிச்சை நிபுணர்",
  "கண் அறுவை சிகிச்சை நிபுணர்",
  "கதிரியக்கவியல் நிபுணர்",
  "மூட்டு நோய் நிபுணர்",
  "செவிவழி பரிசோதனை நிபுணர்",
  "நரம்பியல் நோய் நிபுணர்",
  "எலும்பியல் அறுவை சிகிச்சை நிபுணர்",
  "பிசியோதெரபி நிபுணர்",
  "மனநல மருத்துவ நிபுணர்",
  "மார்பு நோய் நிபுணர்",
  "கருவுறுதல் ஆலோசனை நிபுணர்",
  "ஆலோசனை உளவியல் நிபுணர்",
  "நாளமில்லச் சுரப்பி நோய் நிபுணர்",
  "இரைப்பை குடல் மற்றும் கல்லீரல் நோய் நிபுணர்",
  "இரத்த நோய் நிபுணர்",
  "திசு நோயியல் நிபுணர்",
  "சிறுநீரக நோய் நிபுணர்",
  "நரம்பியல் அறுவை சிகிச்சை நிபுணர்",
  "ஊட்டச்சத்து நிபுணர்",
  "உளவியல் ஆலோசனை",
  "பேச்சு சிகிச்சை நிபுணர்",
  "சிறுநீரியல் நிபுணர்",
];

export const heroFacts = [
  { k: "நிபுணர் மருத்துவர்கள்" },
  { k: "சிறப்புத்துறைகள்" },
  { k: "முன்பதிவு", v: "Online, 24 மணி நேரம்" },
  { k: "Channelling கவுன்டர்" },
];

export const heroStandfirst =
  "St. Joseph Hospital, நீர்கொழும்பில் உள்ள எங்கள் மருத்துவர்களை சந்திக்கவும். 24 மணி நேரமும் இயங்கும் Online e-channeling முறையின் மூலம் நேரத்தை பதிவு செய்ய நாங்கள் உங்களுக்கு உதவுவோம்.";

export const hero = {
  strapline: "நிபுணர் Doctor ஐ Book செய்யுங்கள்",
  breadcrumbHome: "முகப்பு",
  // Kept identical to English on purpose: the feature's own name, the way
  // every other page's nav names it. See KEEPS_ENGLISH in
  // content.i18n.test.ts.
  breadcrumbCurrent: "E-Channeling",
  headingLead: "நேரத்தை",
  headingAccent: "பதிவு செய்யுங்கள்.",
  findCta: "நிபுணர் மருத்துவரைக் கண்டறியுங்கள்",
};

export const directoryEyebrow = "01 / நிபுணர் மருத்துவரைக் கண்டறியுங்கள்";
// Shortened to drop the redundant "மருத்துவர்" word: the longer phrasing's
// "மருத்துவர்களைத்" is one unbreakable 15-character token that overflowed a
// 360px viewport even with SectionHead's min-w-0 fix (recipe Step E2). A
// single word cannot shrink below its own width, so this is rephrased rather
// than left for a layout fix that could not help.
export const directoryHeading = "எங்கள் நிபுணர்களைத் தேடுங்கள்";

export const directory = {
  introTemplate:
    "சிறப்புத்துறைகள் {specialities} இல் நிபுணர் மருத்துவர்கள் {count} பேர் உள்ளனர். பெயர் அல்லது சிறப்புத்துறை மூலம் தேடுங்கள், அல்லது கீழே உள்ள பட்டியலைப் பார்க்கவும்.",
  searchPlaceholder: "ஒரு Doctor அல்லது சிறப்புத்துறையைத் தேடுங்கள்…",
  searchAriaLabel: "பெயர் அல்லது சிறப்புத்துறை மூலம் மருத்துவர்களைத் தேடுங்கள்",
  clearSearchAriaLabel: "தேடலை அகற்று",
  allSpecialities: "அனைத்து சிறப்புத்துறைகளும்",
  specialitiesLabel: "சிறப்புத்துறைகள்",
  clearFilters: "வடிகட்டிகளை அகற்று",
  resultCountSingular: "நிபுணர் மருத்துவர்",
  resultCountPlural: "நிபுணர் மருத்துவர்கள்",
  noResultsHeading: "அந்தத் தேடலுக்குப் பொருந்தும் நிபுணர் மருத்துவர் இல்லை",
  noResultsBodyTemplate:
    "வேறு பெயரையோ சிறப்புத்துறையையோ முயற்சிக்கவும், அல்லது எங்கள் Channelling கவுன்டருக்கு {phone}க்கு அழையுங்கள், நாங்கள் உங்களுக்குப் பொருத்தமான மருத்துவரைக் கண்டறிவோம்.",
  showAllDoctors: "அனைத்து மருத்துவர்களையும் காட்டு",
  bookAppointment: "Appointment ஐ Book செய்யுங்கள்",
};

export const helpRail = {
  // Kept short on purpose: ChannelingHero reuses this exact string as a
  // whitespace-nowrap pill-button label (see the hero's "Not sure who to
  // see?" CTA), so a long formal question here overflowed a 360px viewport.
  heading: "யார் எனத் தெரியவில்லையா?",
  body: "எங்கள் Channelling கவுன்டர் நாளின் எந்நேரமும் உங்களுக்குப் பொருத்தமான நிபுணரைக் கண்டறிந்து தரும்.",
  callCtaTemplate: "{phone}க்கு அழையுங்கள்",
  emailCta: "Email செய்யுங்கள்",
};
