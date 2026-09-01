// Tamil for the contact page.
//
// Only translatable copy lives here. The hospital's facts, the street address,
// both phone numbers, the email, the coordinate and every href stay in
// content.ts and have exactly one home. `content.i18n.test.ts` fails if a
// string that should be translated is missing, and also if one is left as its
// English original.
//
// The register is the polite plural throughout ("அழையுங்கள்" rather than
// "அழை"), which is how a hospital addresses a patient it has not met.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and the pre-merge check refuses to pass while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const tickerItems = [
  "24 மணி நேரமும் திறந்திருக்கும்",
  "வரவேற்பு, 24 மணி நேரம்",
  "விரைவான பதிலுக்கு WhatsApp",
  "ஒரு நாளுக்குள் பதில்",
  "நேரில் வாருங்கள், அழையுங்கள், அல்லது செய்தி அனுப்புங்கள்",
];

export const heroFacts = [
  { k: "வரவேற்பு", v: "24 மணி நேரமும் திறந்திருக்கும்" },
  { k: "பதில்", v: "ஒரு வேலை நாளுக்குள்" },
  // WhatsApp is a product name and stays as it is in every script.
  { k: "விரைவானது", v: "WhatsApp" },
  { k: "எங்கே", v: "நீர்கொழும்பு" },
];

export const jumpCards = [
  {
    label: "எங்களைத் தொடர்பு கொள்ள",
    note: "இருப்பிடம், தொலைபேசி, WhatsApp மற்றும் மின்னஞ்சல்.",
  },
  {
    label: "ஒரு செய்தி அனுப்புங்கள்",
    note: "ஒரு வேலை நாளுக்குள் நாங்கள் பதிலளிப்போம்.",
  },
  {
    // The street name is transliterated rather than left in English so the
    // line reads as one sentence. The authoritative address is still the
    // English one in contactRows, which this only restates.
    label: "எங்களைக் கண்டறியுங்கள்",
    note: "229/10, புனித ஜோசப் வீதி, நீர்கொழும்பு.",
  },
  {
    label: "மருத்துவரை முன்பதிவு செய்யுங்கள்",
    note: "படிவத்தைத் தவிர்த்து ஒரு நேரத்தைத் தேர்ந்தெடுங்கள்.",
  },
];

export const contactRows = [
  { label: "இருப்பிடம்", sub: "நீர்கொழும்பு, இலங்கை" },
  { label: "எங்களை அழையுங்கள்", sub: "வரவேற்பு, 24 மணி நேரம்" },
  { label: "WhatsApp / கைபேசி", sub: "விரைவான பதில்" },
  { label: "மின்னஞ்சல்", sub: "ஒரு நாளுக்குள் பதில்" },
];

export const reachIntro =
  "உங்களுக்கு எது எளிதோ அப்படிச் செய்யுங்கள்: அழையுங்கள், செய்தி அனுப்புங்கள், அல்லது நேரில் வாருங்கள்.";

export const messageIntro = "ஒரு வேலை நாளுக்குள் நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.";

export const mapIntro =
  "நீர்கொழும்பு புனித ஜோசப் மருத்துவமனையின் இருப்பிடத்தைக் காட்டும் ஊடாடும் வரைபடம்.";

export const heroStandfirst = "24 மணி நேரமும், ஒவ்வொரு நாளின் ஒவ்வொரு மணி நேரமும் திறந்திருக்கும்.";

export const sectionEyebrows = {
  reach: "01 / எங்களைத் தொடர்பு கொள்ள",
  message: "02 / ஒரு செய்தி அனுப்புங்கள்",
  map: "03 / எங்களைக் கண்டறியுங்கள்",
};
