// Sinhala for the e-channeling consultant list.
//
// Only `specialization` is here, plus `sessionNote` on the two rows that have
// one. `name` is a proper noun, exactly like the hospital's own name, and
// never changes script; content.i18n.test.ts excludes it by path rather than
// listing all 88 names. `calendlySlug` is a URL fragment and `sessions` holds
// times in numerals, so both stay in doctors.ts too.
//
// The 33 specialities below use the same vocabulary as the hero's ticker
// (content.si.ts's tickerItems) and, where one already exists, the same
// wording as navigationLabels.si.ts's "Find a consultant" so the site says a
// speciality the same way everywhere it appears.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

// One entry per row in doctors.ts, in the same order, index for index.
export const doctors = [
  { specialization: "ප්‍රසව හා නාරි රෝග විශේෂඥ" },
  { specialization: "ප්‍රසව හා නාරි රෝග විශේෂඥ" },
  { specialization: "ප්‍රසව හා නාරි රෝග විශේෂඥ" },
  { specialization: "ප්‍රසව හා නාරි රෝග විශේෂඥ" },
  { specialization: "ප්‍රසව හා නාරි රෝග විශේෂඥ" },
  { specialization: "ප්‍රසව හා නාරි රෝග විශේෂඥ" },
  { specialization: "ප්‍රසව හා නාරි රෝග විශේෂඥ" },
  { specialization: "ළමා රෝග විශේෂඥ" },
  { specialization: "ළමා රෝග විශේෂඥ" },
  { specialization: "ළමා රෝග විශේෂඥ" },
  { specialization: "ළමා රෝග විශේෂඥ" },
  { specialization: "ළමා රෝග විශේෂඥ" },
  { specialization: "ළමා රෝග විශේෂඥ" },
  { specialization: "ළමා රෝග විශේෂඥ" },
  { specialization: "ළමා රෝග විශේෂඥ" },
  { specialization: "ළමා රෝග විශේෂඥ" },
  { specialization: "වෛද්‍ය විශේෂඥ" },
  { specialization: "වෛද්‍ය විශේෂඥ" },
  { specialization: "වෛද්‍ය විශේෂඥ" },
  { specialization: "වෛද්‍ය විශේෂඥ" },
  { specialization: "වෛද්‍ය විශේෂඥ" },
  { specialization: "ක්‍රීඩා හා ව්‍යායාම වෛද්‍ය විශේෂඥ" },
  { specialization: "ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "ශල්‍ය වෛද්‍ය විශේෂඥ", sessionNote: "මසකට වරක්; දිනය දැනගැනීමට අමතන්න" },
  { specialization: "ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "අස්ථි ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "අස්ථි ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "අස්ථි ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "අස්ථි ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "සන්ධි රෝග විශේෂඥ" },
  { specialization: "සන්ධි රෝග විශේෂඥ" },
  { specialization: "සන්ධි රෝග විශේෂඥ", sessionNote: "මසකට දෙවරක්; දින දැනගැනීමට අමතන්න" },
  { specialization: "හෘද රෝග විශේෂඥ" },
  { specialization: "හෘද රෝග විශේෂඥ" },
  { specialization: "හෘද රෝග විශේෂඥ" },
  { specialization: "හෘද රෝග විශේෂඥ" },
  { specialization: "හෘද රෝග විශේෂඥ" },
  { specialization: "ඇස් ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "ඇස් ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "සම රෝග විශේෂඥ" },
  { specialization: "සම රෝග විශේෂඥ" },
  { specialization: "සම රෝග විශේෂඥ" },
  { specialization: "සම රෝග විශේෂඥ" },
  { specialization: "ස්නායු රෝග විශේෂඥ" },
  { specialization: "වකුගඩු රෝග විශේෂඥ" },
  { specialization: "වකුගඩු රෝග විශේෂඥ" },
  { specialization: "වකුගඩු රෝග විශේෂඥ" },
  { specialization: "මනෝ රෝග විශේෂඥ" },
  { specialization: "මනෝ රෝග විශේෂඥ" },
  { specialization: "ENT ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "ENT ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "අන්තර්ස්‍රාවී රෝග විශේෂඥ" },
  { specialization: "පපුවේ රෝග විශේෂඥ" },
  { specialization: "පපුවේ රෝග විශේෂඥ" },
  { specialization: "ස්නායු ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "රක්ත රෝග විශේෂඥ" },
  { specialization: "මුත්‍රා පද්ධති රෝග විශේෂඥ" },
  { specialization: "මුත්‍රා පද්ධති රෝග විශේෂඥ" },
  { specialization: "මුත්‍රා පද්ධති රෝග විශේෂඥ" },
  { specialization: "පිළිකා රෝග විශේෂඥ" },
  { specialization: "පිළිකා ශල්‍ය වෛද්‍ය විශේෂඥ" },
  { specialization: "පටක රෝග විශේෂඥ" },
  { specialization: "විකිරණවේද විශේෂඥ" },
  { specialization: "විකිරණවේද විශේෂඥ" },
  { specialization: "විකිරණවේද විශේෂඥ" },
  { specialization: "විකිරණවේද විශේෂඥ" },
  { specialization: "විකිරණවේද විශේෂඥ" },
  { specialization: "අධිකරණ වෛද්‍ය විශේෂඥ" },
  { specialization: "ශ්‍රවණ පරීක්ෂණ විශේෂඥ" },
  { specialization: "ශ්‍රවණ පරීක්ෂණ විශේෂඥ" },
  { specialization: "EEG (මොළයේ විද්‍යුත් තරංග පරීක්ෂණය)" },
  { specialization: "පෙනහළු ක්‍රියාකාරිත්ව පරීක්ෂණය" },
  { specialization: "වන්ධ්‍යත්ව උපදේශන විශේෂඥ" },
  { specialization: "කථන චිකිත්සක" },
  { specialization: "භෞත චිකිත්සක" },
  { specialization: "පෝෂණ විශේෂඥ" },
  { specialization: "පෝෂණ විශේෂඥ" },
  { specialization: "පෝෂණ විශේෂඥ" },
  { specialization: "මනෝවිද්‍යාත්මක උපදේශනය" },
  { specialization: "මනෝවිද්‍යාත්මක උපදේශනය" },
  { specialization: "උපදේශන මනෝවිද්‍යාඥ" },
];
