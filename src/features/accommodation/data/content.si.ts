// Sinhala for the accommodation page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns and
// product names stay in English rather than being replaced by literary
// coinages nobody says out loud. So "TV" and "Wi-Fi" stay put in the amenity
// lists, "Book" is a verb exactly like it is in contact's content.si.ts, and
// "Standard", "Deluxe" and "Super Deluxe" are the hospital's own room class
// names, kept exactly as its own price list prints them (the same decision
// navigationLabels.si.ts already made for the header and footer nav).
// "Wards" is not one of those names, so it translates like any other word.
// The strings this feature leaves fully in English are listed in
// KEEPS_ENGLISH in content.i18n.test.ts, so each one is a recorded decision
// rather than a string somebody forgot.
//
// Sentence forms use the polite plural ("කරන්න"), which is how a hospital
// addresses a patient it has not met.
//
// Only translatable copy lives here. Every id, href, price, photo path and
// photo alt text stays in content.ts and has exactly one home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const roomTypes = [
  {
    // Kept identical to English: "Standard" is the hospital's own room class
    // name. See KEEPS_ENGLISH in content.i18n.test.ts.
    name: "Standard Rooms",
    shortName: "Standard",
    description:
      "අපගේ Standard කාමර ඔබේ මූලික අවශ්‍යතා සහ කාර්යභාරයට ගැලපෙන අත්‍යවශ්‍ය සුවපහසුව, පූර්ණ වෛද්‍ය සහායක් සමඟ ලබා දෙනවා.",
    amenities: [
      "උණුසුම් හා සිසිල් වතුර",
      "TV",
      "Wi-Fi",
      "රැඳී සිටින්නාගේ ඇඳ සහ පුටුව",
      "වායු සමීකරණය",
      "අවශ්‍ය වෛද්‍ය සහාය",
    ],
  },
  {
    name: "Deluxe Rooms",
    shortName: "Deluxe",
    description: "වඩාත් සුවපහසුවක් අවශ්‍ය රෝගීන් සඳහා වඩා ලොකු, වැඩි සුවපහසුවක් ඇති ස්ථානයක්.",
    amenities: [
      "උණුසුම් හා සිසිල් වතුර",
      "TV",
      "Wi-Fi",
      "රැඳී සිටින්නාගේ ඇඳ සහ සෝෆා",
      "වායු සමීකරණය",
      "තේ ස්ථානයක් සහිත කුස්සියේ ප්‍රදේශය",
      "කෝපි මේසය",
      "උණුසුම් ජල කේතලය",
    ],
  },
  {
    name: "Super Deluxe Rooms",
    shortName: "Super Deluxe",
    description: "වෙන් වූ Steward සේවාවක් සමඟ, අපගේ වඩාත්ම Premium රෝගී කාමර.",
    amenities: [
      "උණුසුම් හා සිසිල් වතුර",
      "TV",
      "Wi-Fi",
      "රැඳී සිටින්නාගේ ඇඳ, සෝෆා සහ පුටුව",
      "වායු සමීකරණය",
      "තේ ස්ථානයක් සහිත කුස්සිය",
      "කෝපි මේසය",
      "උණුසුම් ජල කේතලය",
      "උදෑසන පත්තර",
      "වෙන් වූ Steward සේවාව",
    ],
  },
  {
    // Not a room class name, so this translates like any other word: the
    // same "වාට්ටු" navigationLabels.si.ts already uses for it.
    name: "වාට්ටු",
    shortName: "වාට්ටු",
    description:
      "ඇඳන් 3ක් සහ 2ක් ඇති විකල්ප සහ පුද්ගලිකත්වය සඳහා ඇඳ වෙන් කරන පනා සහිත සුවපහසු බෙදාගත් වාට්ටු. Discharge කිරීමෙන් පසු, රෝගීන්ට නොමිලේ පලතුරු හෝ chocolate කූඩයක් ලැබිය හැක. වෛද්‍යවරයාගේ අභිමතය පරිදි වට්ටම් ද ලබාගත හැකි අතර, වැඩි සත්කාරයක් අපේක්ෂා කරන අයට VIP සේවාව ලබාගත හැක.",
    amenities: [
      "වායු සමීකරණය",
      "උණුසුම් හා සිසිල් වතුර",
      "තනි තනි රැඳී සිටින්නාගේ ඇඳන් සහ පුටු",
      "TV",
      "ඇඳන් 3ක් සහ 2ක් ඇති විකල්ප",
      "පොදු වැසිකිළිය",
      "පුද්ගලිකත්වය සඳහා ඇඳ වෙන් කරන පනා",
    ],
  },
];

export const specialties = [
  "සුවපහසු සහ විශාල කාමර",
  "පැය 24 පුරාම වෛද්‍ය සහාය",
  "දියුණු රෝගී නිරීක්ෂණය",
  "පුද්ගලික සහ අර්ධ-පුද්ගලික විකල්ප",
  "උසස් තත්ත්වයේ පිරිසිදුකම සහ ආරක්ෂාව",
  "පුද්ගලීකරණය කළ ආහාර සැලසුම්",
  "පවුල් හිතකාමී පහසුකම්",
  "Television සහ Wi-Fi ප්‍රවේශය",
  "හදිසි ප්‍රතිචාර පද්ධතිය",
  "Pharmacy සහ රෝග විනිශ්චය සහාය",
];

export const mealsNote =
  "නැගෙනහිර, බටහිර, හෝ ශ්‍රී ලාංකික ආහාර වලින් කැමති එකක් තෝරාගත හැකි දිනකට ආහාර වේල් තුනක් ලබාගන්න, දියවැඩියා රෝගීන් සඳහා විශේෂ menu එකක්ද ඇතුළුව, ඊට අමතරව තේ හෝ කෝපි snack එකක් සමඟ.";

export const tickerItems = [
  "කාමර වර්ග හතරක්",
  "දිනකට ආහාර වේල් තුනක් ඇතුළත්",
  "සෑම කාමරයකම Wi-Fi සහ TV",
  "සම්පූර්ණයෙන්ම වායු සමීකරණය කර ඇත",
  "පැය 24 පුරාම වෛද්‍ය සහාය",
  "පුද්ගලික සහ බෙදාගත් විකල්ප",
];

export const heroFacts = [
  { k: "කාමර වර්ග", v: "හතරක්" },
  // `v` omitted on purpose: "10,000 LKR" is a price fact, excluded from this
  // overlay by its own exact path in content.i18n.test.ts, not translated.
  { k: "Standard සිට" },
  { k: "ආහාර", v: "දිනකට තුනක්" },
  { k: "හෙදකාර සේවා", v: "පැය 24 පුරාම" },
];

export const jumpCards = [
  {
    // Kept identical to English: see KEEPS_ENGLISH in content.i18n.test.ts.
    label: "Standard",
    note: "වෛද්‍ය සහායක් සමඟ, අත්‍යවශ්‍ය සුවපහසුව.",
  },
  {
    label: "Deluxe",
    note: "වඩාත් සුවපහසුවක් සහිත වැඩි ඉඩක්.",
  },
  {
    label: "Super Deluxe",
    note: "Steward සේවාවක් සමඟ, අපගේ වඩාත්ම Premium කාමර.",
  },
  {
    label: "වාට්ටු",
    note: "පුද්ගලිකත්ව බාධකවලින් වෙන් කළ බෙදාගත් වාට්ටු.",
  },
];

export const heroStandfirst =
  "අපගේ රෝගී කාමරවල ඇමරිකානු ප්‍රමිතියේ සුවපහසුව සහ පහසුකම් අත්විඳින්න.";

export const roomsHeading = "සරල සිට Premium දක්වා විහිදෙන කාමර";
export const roomsIntro = mealsNote;

export const specialtiesHeading = "අපගේ රෝගී කාමරවල විශේෂතා";

export const bookHeading = "රෝගී කාමරයක් Book කරන්න";
export const bookIntro = "අපට Message එකක් එවන්න, අපගේ කණ්ඩායම ඔබට ගැලපෙන කාමරය සොයාගැනීමට උදව් කරයි.";

export const bookRail = [
  { label: "අපට call කරන්න" },
  // Kept identical to English: a product name in every script, the same as
  // contact's `contactRows[2].label`. See KEEPS_ENGLISH.
  { label: "WhatsApp" },
  // Kept identical to English, the same as contact's `contactRows[3].label`.
  { label: "Email" },
  { label: "ඒ වෙනුවට වෛද්‍යවරයෙක් Book කරන්න" },
];

export const hero = {
  strapline: "ඔබ නවාතැන් ගන්නා තැන",
  breadcrumbHome: "මුල් පිටුව",
  // "Accommodation" is an ordinary noun, not this feature's own brand name
  // (unlike e-channeling's "E-Channeling"), so it translates: the same word
  // navigationLabels.si.ts already uses for this page's own nav link.
  breadcrumbCurrent: "නවාතැන් පහසුකම්",
  headingLead: "ඇමරිකානු ප්‍රමිතියේ සුවපහසුව,",
  headingAccent: "එක් රැයකට.",
  bookCta: "වෛද්‍යවරයෙක් Book කරන්න",
  seeRoomsCta: "කාමර බලන්න",
};

export const sectionEyebrows = {
  rooms: "01 / අපගේ කාමර",
  specialties: "02 / සෑම කාමරයකම ඇති දේ",
  book: "03 / කාමරයක් Book කරන්න",
};
