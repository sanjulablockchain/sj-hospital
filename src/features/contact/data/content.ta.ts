// Tamil for the contact page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns stay in
// English rather than being replaced by literary coinages nobody says out
// loud. So "Email" rather than "மின்னஞ்சல்", "Reception" rather than
// "வரவேற்பு", and "Book" as a verb. Every one of those is listed in
// KEEPS_ENGLISH in content.i18n.test.ts, so each is a recorded decision rather
// than a string somebody forgot.
//
// Sentence forms use the polite plural ("அழையுங்கள்"), which is how a hospital
// addresses a patient it has not met.
//
// Only translatable copy lives here. The street address, both phone numbers,
// the email address, the coordinate, the icon names and every href stay in
// content.ts and have exactly one home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const tickerItems = [
  "24 மணி நேரமும் திறந்திருக்கும்",
  "Reception, 24 மணி நேரம்",
  "விரைவான பதிலுக்கு WhatsApp",
  "ஒரு நாளுக்குள் பதில்",
  "நேரில் வாருங்கள், call செய்யுங்கள், அல்லது message அனுப்புங்கள்",
];

export const heroFacts = [
  { k: "Reception", v: "24 மணி நேரமும் திறந்திருக்கும்" },
  { k: "பதில்", v: "ஒரு வேலை நாளுக்குள்" },
  { k: "விரைவானது", v: "WhatsApp" },
  { k: "எங்கே", v: "நீர்கொழும்பு" },
];

export const jumpCards = [
  {
    label: "எங்களைத் தொடர்பு கொள்ள",
    note: "இருப்பிடம், தொலைபேசி, WhatsApp மற்றும் Email.",
  },
  {
    label: "Message அனுப்புங்கள்",
    note: "ஒரு வேலை நாளுக்குள் நாங்கள் பதிலளிப்போம்.",
  },
  {
    // The street stays in English. It is the address a driver is shown and
    // the one printed on the building, and contactRows holds the same string
    // verbatim. The city is written in Tamil because that is a place name,
    // not a proper noun belonging to the hospital.
    label: "எங்களைக் கண்டறியுங்கள்",
    note: "229/10 St. Joseph Street, நீர்கொழும்பு.",
  },
  {
    label: "Doctor ஐ Book செய்யுங்கள்",
    note: "Form ஐத் தவிர்த்து ஒரு நேரத்தைத் தேர்ந்தெடுங்கள்.",
  },
];

export const contactRows = [
  { label: "இருப்பிடம்", sub: "நீர்கொழும்பு, இலங்கை" },
  { label: "எங்களை call செய்யுங்கள்", sub: "Reception, 24 மணி நேரம்" },
  { label: "WhatsApp / Mobile", sub: "விரைவான பதில்" },
  { label: "Email", sub: "ஒரு நாளுக்குள் பதில்" },
];

export const reachIntro =
  "உங்களுக்கு எது எளிதோ அப்படிச் செய்யுங்கள்: call செய்யுங்கள், message அனுப்புங்கள், அல்லது நேரில் வாருங்கள்.";

export const messageIntro = "ஒரு வேலை நாளுக்குள் நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.";

export const mapIntro = "St. Joseph Hospital, Negombo இருப்பிடத்தைக் காட்டும் map.";

export const heroStandfirst = "24 மணி நேரமும், ஒவ்வொரு நாளின் ஒவ்வொரு மணி நேரமும் திறந்திருக்கும்.";

export const sectionEyebrows = {
  reach: "01 / எங்களைத் தொடர்பு கொள்ள",
  message: "02 / Message அனுப்புங்கள்",
  map: "03 / எங்களைக் கண்டறியுங்கள்",
};

export const hero = {
  strapline: "தொடர்பு கொள்ள",
  breadcrumbHome: "முகப்பு",
  breadcrumbCurrent: "தொடர்பு கொள்ள",
  headingLead: "தொடர்பு",
  headingAccent: "கொள்ள.",
  bookCta: "Doctor ஐ Book செய்யுங்கள்",
  reachCta: "எங்களைத் தொடர்பு கொள்ள",
};
