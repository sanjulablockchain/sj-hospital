// Tamil for the locations page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns and
// clinical terms stay in English rather than being replaced by literary
// coinages nobody says out loud. So "Emergency", "OPD", "Surgery",
// "Laboratory", "Imaging", "Pharmacy", "Reception", "WhatsApp", "clinic",
// "message", "switchboard" and "American protocol" stay in English, the same
// way they already do in contact's, network's and school-wellness's own
// content.ta.ts.
//
// Both hospitals' own names stay in English throughout, the same way the
// hospital's name never changes script anywhere on this site: recasting
// "Blue Sapphire Hospital" into Tamil letters would not be a translation, it
// would be a different name. See KEEPS_ENGLISH in content.i18n.test.ts.
// "Negombo" translates to "நீர்கொழும்பு" and "Ratnapura" to "இரத்தினபுரி"
// as place names, the same as elsewhere on this site.
//
// Only translatable copy lives here. Every href, id, photo path, street
// address and fact value stays in content.ts and has exactly one home. The
// hero, the eyebrows, the headings, the fact strip and every CTA label are
// English in every language by the register rule, so they are absent here.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {
  photoAlt: "நீர்கொழும்பு St. Joseph Hospital கட்டிடம்",
};

export const tickerItems: readonly string[] = [
  "நீர்கொழும்பு: Emergency 24/7 திறந்துள்ளது",
  "இரத்தினபுரி: 24/7 திறந்துள்ளது",
  "இரு மருத்துவமனைகள், ஒரே protocol",
  "Los Angeles, USA இலிருந்து நிர்வாகம்",
  "Reception எண் 0117 84 84 84",
];

export const hospitalsIntro =
  "இரு மருத்துவமனைகளும் ஒவ்வொரு நாளும் 24 மணி நேரமும் திறந்திருக்கும். உங்களுக்கு அருகிலுள்ளதைத் தேர்ந்தெடுக்கவும், அல்லது ஏதேனும் ஒன்றை அழைக்கவும்; சரியான இடத்திற்கு நாங்கள் வழிகாட்டுவோம்.";

export const hospitals = [
  {
    name: "St. Joseph Hospital",
    city: "நீர்கொழும்பு",
    region: "மேல் மாகாணம்",
    statusLabel: "24/7 திறந்துள்ளது",
    body: "எங்கள் முதன்மை மருத்துவமனை: Emergency, OPD, Surgery, Inpatient, Laboratory, Imaging மற்றும் Pharmacy சேவைகள் ஆறு தளங்களில், American protocol படி இயங்குகிறது.",
    photoAlt: "நீர்கொழும்பு St. Joseph Hospital",
    address: { locality: "நீர்கொழும்பு, இலங்கை" },
    facts: [{ label: "Emergency" }, { label: "Reception" }, { label: "WhatsApp" }],
  },
  {
    name: "Blue Sapphire Hospital",
    city: "இரத்தினபுரி",
    region: "சபரகமுவ மாகாணம்",
    statusLabel: "24/7 திறந்துள்ளது",
    body: "எங்கள் சகோதர மருத்துவமனை: OPD, channeling, eye care, digital X-ray, Laboratory மற்றும் Pharmacy சேவைகள், ஒவ்வொரு நாளும் 24 மணி நேரமும் திறந்து, நீர்கொழும்பு போலவே American protocol படி இயங்குகிறது.",
    photoAlt: "வானத்தின் பின்னணியில் கீழிருந்து பார்க்கும் இரத்தினபுரி Blue Sapphire Hospital",
    address: { locality: "இரத்தினபுரி, இலங்கை" },
    facts: [{ label: "திறந்திருக்கும்" }, { label: "தொலைபேசி" }],
  },
];

export const helpBody =
  "எங்களை அழைக்கவும் அல்லது message அனுப்பவும்; சரியான மருத்துவமனை, சரியான clinic மற்றும் வர வேண்டிய சரியான நேரத்தை நாங்கள் சொல்கிறோம்.";
