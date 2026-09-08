// Tamil for the contact page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns and verbs
// stay in English rather than being replaced by literary coinages nobody
// says out loud ("call", "message" in reachIntro). The form's own "Email*"
// label is "Email" rather than "மின்னஞ்சல்" for the same reason and is
// listed in KEEPS_ENGLISH in content.i18n.test.ts, so it is a recorded
// decision rather than a string somebody forgot. The register sweep moved
// the rest of what used to sit here (the hero, the jump card and contact
// row labels, "Reception", "Book" as a CTA verb) to English from the base
// instead, so they carry no overlay entry at all.
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
  {},
  {},
  {},
  {},
];

export const jumpCards = [
  {
    note: "இருப்பிடம், தொலைபேசி, WhatsApp மற்றும் Email.",
  },
  {
    note: "ஒரு வேலை நாளுக்குள் நாங்கள் பதிலளிப்போம்.",
  },
  {
    // The street stays in English. It is the address a driver is shown and
    // the one printed on the building, and contactRows holds the same string
    // verbatim. The city is written in Tamil because that is a place name,
    // not a proper noun belonging to the hospital.
    note: "229/10 St. Joseph Street, நீர்கொழும்பு.",
  },
  {
    note: "Form ஐத் தவிர்த்து ஒரு நேரத்தைத் தேர்ந்தெடுங்கள்.",
  },
];

export const contactRows = [
  { sub: "நீர்கொழும்பு, இலங்கை" },
  { sub: "Reception, 24 மணி நேரம்" },
  { sub: "விரைவான பதில்" },
  { sub: "ஒரு நாளுக்குள் பதில்" },
];

export const reachIntro =
  "உங்களுக்கு எது எளிதோ அப்படிச் செய்யுங்கள்: call செய்யுங்கள், message அனுப்புங்கள், அல்லது நேரில் வாருங்கள்.";

export const messageIntro = "ஒரு வேலை நாளுக்குள் நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.";

export const mapIntro = "St. Joseph Hospital, Negombo இருப்பிடத்தைக் காட்டும் map.";

export const sectionEyebrows = {};

export const hero = {};

export const form = {
  firstNameLabel: "முதல் பெயர்*",
  firstNamePlaceholder: "சுனில்",
  lastNameLabel: "கடைசிப் பெயர்*",
  lastNamePlaceholder: "பெரேரா",
  emailLabel: "Email*",
  emailPlaceholder: "john.doe@example.com",
  messageLabel: "Message அல்லது கருத்து",
  messagePlaceholder: "ஏதேனும் குறிப்பிட்ட தேவைகள் இருந்தால் தெரிவியுங்கள்...",
  submit: "Message அனுப்புங்கள்",
  submitting: "அனுப்புகிறது...",
  callInstead: "அல்லது call செய்யுங்கள்",
  emergency: "அவசர நிலையில் {phone} ஐ அழையுங்கள். இந்த form இரவு நேரத்தில் கண்காணிக்கப்படுவதில்லை.",
};
