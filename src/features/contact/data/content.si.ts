// Sinhala for the contact page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns and
// verbs stay in English rather than being replaced by literary coinages
// nobody says out loud ("call", "message" in reachIntro). The form's own
// "Email*" label is "Email" rather than "විද්‍යුත් තැපෑල" for the same
// reason and is listed in KEEPS_ENGLISH in content.i18n.test.ts, so it is a
// recorded decision rather than a string somebody forgot. The register
// sweep moved the rest of what used to sit here (the hero, the jump card
// and contact row labels, "Reception", "Book" as a CTA verb) to English
// from the base instead, so they carry no overlay entry at all.
//
// Sentence forms use the polite plural ("කරන්න"), which is how a hospital
// addresses a patient it has not met.
//
// Only translatable copy lives here. The street address, both phone numbers,
// the email address, the coordinate, the icon names and every href stay in
// content.ts and have exactly one home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const tickerItems = [
  "පැය 24 පුරාම විවෘතයි",
  "Reception, පැය 24",
  "වේගවත්ම පිළිතුර WhatsApp එකෙන්",
  "දිනක් ඇතුළත පිළිතුරු",
  "එන්න, call කරන්න, නැත්නම් message කරන්න",
];

export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const jumpCards = [
  {
    note: "ස්ථානය, දුරකථනය, WhatsApp සහ Email.",
  },
  {
    note: "අපි එක් වැඩ කරන දිනක් ඇතුළත පිළිතුරු දෙනවා.",
  },
  {
    // The street stays in English. It is the address a driver is shown and
    // the one printed on the building, and contactRows holds the same string
    // verbatim. The city is written in Sinhala because that is a place name,
    // not a proper noun belonging to the hospital.
    note: "229/10 St. Joseph Street, මීගමුව.",
  },
  {
    note: "Form එක මඟ හැර වේලාවක් තෝරන්න.",
  },
];

export const contactRows = [
  { sub: "මීගමුව, ශ්‍රී ලංකාව" },
  { sub: "Reception, පැය 24" },
  { sub: "වේගවත්ම පිළිතුර" },
  { sub: "දිනක් ඇතුළත පිළිතුරු" },
];

export const reachIntro = "ඔබට පහසුම විදිහට call කරන්න, message කරන්න, නැත්නම් කෙලින්ම එන්න.";

export const messageIntro = "අපි එක් වැඩ කරන දිනක් ඇතුළත ඔබ හා සම්බන්ධ වෙනවා.";

export const mapIntro = "St. Joseph Hospital, Negombo පිහිටි ස්ථානය පෙන්වන map එක.";

export const sectionEyebrows = {};

export const hero = {};

export const form = {
  firstNameLabel: "මුල් නම*",
  firstNamePlaceholder: "සුනිල්",
  lastNameLabel: "වාසගම*",
  lastNamePlaceholder: "පෙරේරා",
  emailLabel: "Email*",
  emailPlaceholder: "john.doe@example.com",
  messageLabel: "Message එක හෝ අදහසක්",
  messagePlaceholder: "විශේෂ අවශ්‍යතා තිබේ නම් කරුණාකර සඳහන් කරන්න...",
  submit: "Message එක යවන්න",
  submitting: "යවනවා...",
  callInstead: "නැත්නම් call කරන්න",
  emergency: "හදිසි අවස්ථාවකදී {phone} අමතන්න. මෙම form රාත්‍රියේ නිරීක්ෂණය නොකෙරේ.",
};
