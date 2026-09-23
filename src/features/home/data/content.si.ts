// Sinhala for the home page bands that have no dedicated data file: the hero,
// the quick access mosaic, "who we are", the free OPD band, the specialties
// carousel, the patient care band, the pharmacy band, the standards band and
// the closing "come see us" band.
//
// Same code-mixed register as the rest of this feature: the sentence is
// Sinhala, everyday English nouns and this site's own register words
// ("Emergency", "OPD", "Digital X-ray", "Pharmacy", "Los Angeles", "Nurse")
// stay in English, the same precedent `career`'s, `facilities`'s, `network`'s
// and `pharmacy`'s own content.si.ts already establish. Sentence forms use
// the polite plural ("කරන්න"), never the familiar imperative.
//
// "St. Joseph Street" keeps the hospital's own address in English, the same
// rule `contact`'s own content.ts states.
//
// Per the register rule (docs/superpowers/i18n-register-rule.md) every hero
// field, eyebrow, heading, card title, chip and CTA is ABSENT from this file
// and renders in English; what remains is prose, stat captions and assistive
// text.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {
  photoAlt: "St. Joseph Hospital ගොඩනැගිල්ල සන්ධ්‍යාවේ",
};

export const statTickerItems = [
  "Emergency පැය 24ම විවෘත",
  "US Protocol එකට ශල්‍යාගාර",
  "පැය දෙකට සැරයක් පිරිසිදු කරනවා",
  "Reports එදිනම, දෙපාරක් Check කරලා",
  "කාමර 10,000 LKR සිට",
];

export const quickAccess = {
  channel: {
    body: "Consultant කෙනෙක් සහ වෙලාවක් Online තෝරන්න, නැත්නම් අපේ නොමිලේ OPD එකට කෙලින්ම එන්න.",
  },
  emergency: {
    body: "ඕනෑම වෙලාවක කෙලින්ම එන්න. Ambulance Bay සහ Critical Care පැය 24ම විවෘත.",
  },
  facilities: {
    bodyTemplate: "{count} සේවාවන් එක වහලක් යට, US Protocol එකට.",
  },
  location: {
    body: "229/10 St. Joseph Street, මීගමුව. Airport එකෙන් විනාඩි දහයක්.",
  },
};

export const whoWeAre = {
  intro:
    "Los Angeles හි Kids & Teens Pediatric Medical Group විසින් මෙහෙයවනු සහ Operate කරනු ලබන: ඇමෙරිකානු සත්කාරයේ Standards, Protocols සහ Clinical Discipline, මීගමුවේ පවුල් සඳහා දැරිය හැකි මිලකට.",
  body: "Consumables කවදාවත් නැවත පාවිච්චි කරන්නේ නෑ. හැම මතුපිටක්ම පැය දෙකකට සැරයක් Clean කරනවා. හැම Report එකක්ම ඔබ ලඟට එන්න කලින් වෛද්‍යවරු දෙන්නෙක් කියවනවා.",
  stats: [
    { label: "Emergency සහ OPD", desc: "හැම සේවාවක්ම, හැම පැයකම, අවුරුද්දේ හැම දිනකම විවෘත." },
    { label: "සේවාවන්", desc: "Emergency සත්කාරයේ ඉඳන් Fertility දක්වා, එක වහලක් යට." },
    { label: "මහල් රෝහල", desc: "මීගමුවේ මේ සඳහාම ඉදිකළ, Ambulance Bay සහ වැසුණු පිවිසුමක් සමඟ." },
    { label: "Cleaning Cycle එක", desc: "හැම මතුපිටක්ම, US Specification එකට Clean කරනවා." },
    { label: "Home Visit වාහන", desc: "වෛද්‍යවරු, Nurses සහ Lab Technicians ඔබේ දොරටුවට." },
    { label: "Airport එකෙන් විනාඩි", desc: "Bandaranaike International එකෙන් අපේ දොරටුව දක්වා." },
  ],
};

export const freeOpd = {
  body: "අපේ බාහිර රෝගී අංශයේ Consultations නොමිලේ, ඒ නිසා උණක්, ගෙඩියක් හෝ සතියක වේදනාවක් සඳහා මුදල් වියදම් කරන්න වටිනවද කියලා කාටවත් කල්පනා කරන්න වෙන්නේ නෑ. කෙලින්ම ඇවිත් වෛද්‍යවරයෙක් හමුවෙන්න.",
  points: [
    "අපි විවෘත හැම පැයකම නොමිලේ Consultation",
    "සාමාන්‍ය පැමිණිලිවලට වගේම විශේෂඥ Referral එකටත්",
    "ඔබ යන්න කලින්ම ඔබේ රෝග විනිශ්චය පැහැදිලි කරනවා",
  ],
};

export const specialties = {
  body: "කෙලින්ම එන Consultation එකේ ඉඳන් Surgery, Diagnostics සහ ගෙදරදී සත්කාරය දක්වා, හැම සේවාවක්ම දුවන්නේ එකම ඇමෙරිකානු Protocol එකටයි.",
  countTemplate: "{total}න් {n}",
  ariaPrev: "කලින් විශේෂඥ අංශය",
  ariaNext: "ඊළඟ විශේෂඥ අංශය",
  // Each tab's `links` are service titles and routes, all English or facts, so
  // the entries are empty placeholders: the parity test still checks the
  // array lengths match the English (the same shape media.si.ts uses).
  tabs: [
    {
      desc: "පැය 24ම Accident සහ Emergency සත්කාරය, Intensive සහ Critical Care එතැනම. අවුරුද්දේ හැම දිනකම ඕනෑම වෙලාවක කෙලින්ම එන්න, නැත්නම් Call කරන්න, අපි ඔබ ලඟට එනවා.",
      links: [{}, {}, {}],
    },
    {
      desc: "Consultant Anaesthesia, Single Use Consumables, හැම Instrument Set එකකම Sterile Tracking සහ ඔබේ Recovery සඳහා පවරන ලද Nurse කෙනෙක් සමඟ Consultant මෙහෙයවන ශල්‍යාගාර.",
      links: [{}, {}, {}, {}, {}, {}, {}],
    },
    {
      desc: "පැය 24 රසායනාගාරයක් සහ Digital X-ray, හැම Report එකක්ම වෛද්‍යවරු දෙන්නෙක් කියවලා එදිනම ලබා දෙනවා. OPD රෝගීන්ට Laboratory Tests සඳහා 10% ඉතිරියක්.",
      links: [{}, {}, {}, {}],
    },
    {
      desc: "නොමිලේ බාහිර රෝගී අංශයක් ලඟින්ම විශේෂඥ Clinics, ඒ නිසා Referral එකක් කියන්නේ නගරය හරහා ගමනක් නෙවෙයි, Corridor එකේ ටිකක් ඇවිදින එකයි.",
      links: [{}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      desc: "Maternity, Gynaecology සහ Paediatric සත්කාරය, අපේ Los Angeles සමූහය තමන්ගේම රෝගීන්ට පාවිච්චි කරන ම Kids and Teens Protocol එකෙන් මෙහෙයවනවා.",
      links: [{}, {}, {}, {}, {}],
    },
    {
      desc: "කවදාවත් වහන්නේ නැති Pharmacy එකක්, මීගමුව පුරාම බෙහෙත් ගෙන්වා දීම, වාහන හයක් මත Home Visits සහ දිවයිනේ ඕනෑම තැනකින් Telemedicine.",
      links: [{}, {}, {}, {}],
    },
  ],
};

export const patientCare = {
  body1:
    "St. Joseph Hospital කියන්නේ මීගමුවේ මේ සඳහාම ඉදිකළ මහල් හයක රෝහලක්, ඇමෙරිකානු Pediatric සමූහයක Protocols වලට දුවන.",
  body2:
    "සත්කාරය වාට්ටුවෙන් නවතින්නේ නෑ. අපේ Pharmacy එක කවදාවත් වහන්නේ නෑ, අපේ වෛද්‍යවරු ගෙවල් සහ පාසල් වලට යනවා, සහ ගමන් කරන රෝගීන් Airport එකෙන් පටන් බලාගන්නවා.",
};

export const pharmacy = {
  body: "අපේ House Pharmacy එකේ තියෙන්නේ Verified, Authorized Stock විතරයි, ඔබේ File එක කියවන්න පුළුවන් Pharmacists ලා විසින් රාත්‍රියේ ඕන වෙලාවක Dispense කරනවා.",
  stats: [
    { label: "Counter වෙලාවන්" },
    { label: "Home Delivery කරන පරාසය" },
    { label: "Prescriptions File එකේ" },
    { label: "OPD රෝගීන්ට Lab වට්ටම" },
  ],
};

export const standards = {
  sub: "Medical Quality සත්කාරය, ඇමෙරිකානු Protocol එකට",
  items: [
    { desc: "Consumables කවදාවත් නැවත පාවිච්චි කරන්නේ නෑ, කසළ ජාත්‍යන්තර Protocol එකට Manage කරනවා." },
    { desc: "හැම මතුපිටක්ම පැය දෙකකට සැරයක්, US Specification එකට Clean කරනවා." },
    { desc: "හැම ප්‍රතිඵලයක්ම ඔබ ලඟට එන්න කලින් වෛද්‍යවරු දෙන්නෙක් කියවනවා, එදිනම." },
  ],
};

export const contactCta = {
  body: "229/10 St. Joseph Street, මීගමුව. ඇවිත් එන්න, අපිට Call කරන්න, නැත්නම් WhatsApp එකෙන් Message එකක් යවන්න.",
  // Link labels, routes and icon keys: English or facts, placeholders only.
  contactRows: [{}, {}, {}, {}],
};
