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
// Only translatable copy lives here. `doctors.si.ts` carries the 88
// consultants' translated specialities; every href, phone number and email
// address stays in content.ts and has exactly one home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

// Same 33 specialities as doctors.si.ts, in the base's count-sorted order.
export const tickerItems = [
  "ශල්‍ය වෛද්‍ය විශේෂඥ",
  "ළමා රෝග විශේෂඥ",
  "ප්‍රසව හා නාරි රෝග විශේෂඥ",
  "හෘද රෝග විශේෂඥ",
  "වෛද්‍ය විශේෂඥ",
  "විකිරණවේද විශේෂඥ",
  "සම රෝග විශේෂඥ",
  "අස්ථි ශල්‍ය වෛද්‍ය විශේෂඥ",
  "වකුගඩු රෝග විශේෂඥ",
  "පෝෂණ විශේෂඥ",
  "සන්ධි රෝග විශේෂඥ",
  "මුත්‍රා පද්ධති රෝග විශේෂඥ",
  "ශ්‍රවණ පරීක්ෂණ විශේෂඥ",
  "ENT ශල්‍ය වෛද්‍ය විශේෂඥ",
  "ඇස් ශල්‍ය වෛද්‍ය විශේෂඥ",
  "මනෝ රෝග විශේෂඥ",
  "මනෝවිද්‍යාත්මක උපදේශනය",
  "පපුවේ රෝග විශේෂඥ",
  "වන්ධ්‍යත්ව උපදේශන විශේෂඥ",
  "උපදේශන මනෝවිද්‍යාඥ",
  "EEG (මොළයේ විද්‍යුත් තරංග පරීක්ෂණය)",
  "අන්තර්ස්‍රාවී රෝග විශේෂඥ",
  "රක්ත රෝග විශේෂඥ",
  "පටක රෝග විශේෂඥ",
  "පෙනහළු ක්‍රියාකාරිත්ව පරීක්ෂණය",
  "අධිකරණ වෛද්‍ය විශේෂඥ",
  "ස්නායු ශල්‍ය වෛද්‍ය විශේෂඥ",
  "ස්නායු රෝග විශේෂඥ",
  "පිළිකා ශල්‍ය වෛද්‍ය විශේෂඥ",
  "පිළිකා රෝග විශේෂඥ",
  "භෞත චිකිත්සක",
  "කථන චිකිත්සක",
  "ක්‍රීඩා හා ව්‍යායාම වෛද්‍ය විශේෂඥ",
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
  weekdays: {
    mon: "සඳු",
    tue: "අඟ",
    wed: "බදා",
    thu: "බ්‍රහ",
    fri: "සිකු",
    sat: "සෙන",
    sun: "ඉරි",
  },
};

export const helpRail = {
  body: "අපගේ Channelling කවුන්ටරය ඔබට ගැලපෙන විශේෂඥ වෛද්‍යවරයා දවසේ ඕන වෙලාවක සොයා දෙනවා.",
};
