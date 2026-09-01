// Sinhala for the contact page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns stay in
// English rather than being replaced by literary coinages nobody says out
// loud. So "Email" rather than "විද්‍යුත් තැපෑල", "Reception" rather than
// "පිළිගැනීමේ කවුන්ටරය", and "Book" as a verb. Every one of those is listed in
// KEEPS_ENGLISH in content.i18n.test.ts, so each is a recorded decision rather
// than a string somebody forgot.
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
  { k: "Reception", v: "පැය 24 පුරාම විවෘතයි" },
  { k: "පිළිතුර", v: "එක් වැඩ කරන දිනක් ඇතුළත" },
  { k: "වේගවත්ම", v: "WhatsApp" },
  { k: "කොහේද", v: "මීගමුව" },
];

export const jumpCards = [
  {
    label: "අප හා සම්බන්ධ වන්න",
    note: "ස්ථානය, දුරකථනය, WhatsApp සහ Email.",
  },
  {
    label: "Message එකක් යවන්න",
    note: "අපි එක් වැඩ කරන දිනක් ඇතුළත පිළිතුරු දෙනවා.",
  },
  {
    // The street stays in English. It is the address a driver is shown and
    // the one printed on the building, and contactRows holds the same string
    // verbatim. The city is written in Sinhala because that is a place name,
    // not a proper noun belonging to the hospital.
    label: "අප සොයා ගන්න",
    note: "229/10 St. Joseph Street, මීගමුව.",
  },
  {
    label: "වෛද්‍යවරයෙක් Book කරන්න",
    note: "Form එක මඟ හැර වේලාවක් තෝරන්න.",
  },
];

export const contactRows = [
  { label: "ස්ථානය", sub: "මීගමුව, ශ්‍රී ලංකාව" },
  { label: "අපට call කරන්න", sub: "Reception, පැය 24" },
  { label: "WhatsApp / Mobile", sub: "වේගවත්ම පිළිතුර" },
  { label: "Email", sub: "දිනක් ඇතුළත පිළිතුරු" },
];

export const reachIntro = "ඔබට පහසුම විදිහට call කරන්න, message කරන්න, නැත්නම් කෙලින්ම එන්න.";

export const messageIntro = "අපි එක් වැඩ කරන දිනක් ඇතුළත ඔබ හා සම්බන්ධ වෙනවා.";

export const mapIntro = "St. Joseph Hospital, Negombo පිහිටි ස්ථානය පෙන්වන map එක.";

export const heroStandfirst = "පැය 24 පුරාම, සෑම දිනකම සෑම පැයකම විවෘතයි.";

export const sectionEyebrows = {
  reach: "01 / අප හා සම්බන්ධ වන්න",
  message: "02 / Message එකක් යවන්න",
  map: "03 / අප සොයා ගන්න",
};

export const hero = {
  strapline: "අප හා සම්බන්ධ වන්න",
  breadcrumbHome: "මුල් පිටුව",
  breadcrumbCurrent: "සම්බන්ධ වන්න",
  headingLead: "සම්බන්ධ",
  headingAccent: "වන්න.",
  bookCta: "වෛද්‍යවරයෙක් Book කරන්න",
  reachCta: "අප හා සම්බන්ධ වන්න",
};
