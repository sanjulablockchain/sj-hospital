// Sinhala for the e-channeling page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns stay in
// English rather than being replaced by literary coinages nobody says out
// loud. So "Book" as a verb, and "Channelling" (this page's own booking
// service, treated like the hospital's own name) rather than a coined term.
// The only string this feature leaves fully in English is listed in
// KEEPS_ENGLISH in content.i18n.test.ts, so it is a recorded decision rather
// than a string somebody forgot.
//
// Sentence forms use the polite plural ("කරන්න"), which is how a hospital
// addresses a patient it has not met.
//
// Only translatable copy lives here. `doctors.si.ts` carries the 71
// consultants' translated specialities; every href, phone number and email
// address stays in content.ts and has exactly one home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

// Same 28 specialities as doctors.si.ts, in the base's count-sorted order.
export const tickerItems = [
  "ළමා රෝග විශේෂඥ",
  "වෛද්‍ය විශේෂඥ",
  "ශල්‍ය වෛද්‍ය විශේෂඥ",
  "ප්‍රසව හා නාරි රෝග විශේෂඥ",
  "හෘද රෝග විශේෂඥ",
  "සම රෝග විශේෂඥ",
  "ENT ශල්‍ය වෛද්‍ය විශේෂඥ",
  "ඇස් ශල්‍ය වෛද්‍ය විශේෂඥ",
  "විකිරණවේද විශේෂඥ",
  "සන්ධි රෝග විශේෂඥ",
  "ශ්‍රවණ පරීක්ෂණ විශේෂඥ",
  "ස්නායු රෝග විශේෂඥ",
  "අස්ථි ශල්‍ය වෛද්‍ය විශේෂඥ",
  "භෞත චිකිත්සක",
  "මනෝ රෝග විශේෂඥ",
  "පපුවේ රෝග විශේෂඥ",
  "වන්ධ්‍යත්ව උපදේශන විශේෂඥ",
  "උපදේශන මනෝවිද්‍යාඥ",
  "අන්තර්ස්‍රාවී රෝග විශේෂඥ",
  "ආමාශ ආන්ත්‍ර හා අක්මා රෝග විශේෂඥ",
  "රක්ත රෝග විශේෂඥ",
  "පටක රෝග විශේෂඥ",
  "වකුගඩු රෝග විශේෂඥ",
  "ස්නායු ශල්‍ය වෛද්‍ය විශේෂඥ",
  "පෝෂණ විශේෂඥ",
  "මනෝවිද්‍යාත්මක උපදේශනය",
  "කථන චිකිත්සක",
  "මුත්‍රා පද්ධති රෝග විශේෂඥ",
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
    "විශේෂඥතා {specialities} ක් තුළ විශේෂඥ වෛද්‍යවරු {count} දෙනෙක් සිටිනවා. නම හෝ විශේෂඥතාව අනුව සොයන්න, නැත්නම් පහත ලැයිස්තුව බලන්න.",
  searchAriaLabel: "නම හෝ විශේෂඥතාව අනුව වෛද්‍යවරු සොයන්න",
  clearSearchAriaLabel: "සෙවීම ඉවත් කරන්න",
  specialitiesLabel: "විශේෂඥතා",
  resultCountSingular: "විශේෂඥ වෛද්‍යවරයෙක්",
  resultCountPlural: "විශේෂඥ වෛද්‍යවරු",
  noResultsBodyTemplate:
    "වෙනත් නමක් හෝ විශේෂඥතාවක් උත්සාහ කරන්න, නැත්නම් අපගේ Channelling කවුන්ටරයට {phone} අමතන්න, අපි ඔබට ගැලපෙන වෛද්‍යවරයා සොයා දෙන්නම්.",
};

export const helpRail = {
  body: "අපගේ Channelling කවුන්ටරය ඔබට ගැලපෙන විශේෂඥ වෛද්‍යවරයා දවසේ ඕන වෙලාවක සොයා දෙනවා.",
};
