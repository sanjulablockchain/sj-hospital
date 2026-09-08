// Sinhala overlay for pageContent.ts (the hero, the fact strip, the ticker,
// the jump cards, the book section and the disclaimer).
//
// The register sweep (2026-09-09) deleted the hero entirely (eyebrow,
// heading, standfirst and hero CTAs all go English, per the rule table's
// "Hero sections, entirely" row), every `jumpCards[*].label` and every
// `bookSection.actions[*].label` (link labels), and `bookSection.eyebrow` /
// `.heading`. `factStrip` is a fact caption, not a hero fact strip by the
// policy's own naming (`heroFacts[].k`/`.v`), so it is untouched and stays
// translated below.
//
// `jumpCards[*].countTemplate` and `bookSection.actions[*].value` carry a
// `{n}` token or a bare fact respectively, never touched here: see
// content.i18n.test.ts's own `isUntranslatable` for why.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const factStrip = [
  { label: "ලියන්නේ", value: "අපේම වෛද්‍යවරු" },
  { label: "සමාලෝචනය කළේ", value: "අපේ Clinical කණ්ඩායම" },
  { label: "ඩෙංගු", value: "මෙතන අවුරුද්ද පුරාම අවදානමක්" },
  { label: "ආදේශකයක් නෙවෙයි", value: "වෛද්‍යවරයෙක් හමුවීමට" },
];

export const tickerLines = [
  "සතිපතා නිශ්චල ජලය හලන්න",
  "වාර්ෂිකව ඔබේ රුධිර පීඩනය Check කරන්න",
  "Antibiotic Course එක ඉවර කරන්න",
  "තිගිතෙන්න කලින් වතුර බොන්න",
  "බබෙකුගේ උණ කවදාවත් සාමාන්‍ය දෙයක් නෙවෙයි",
];

export const jumpCards = [
  { countTemplate: "ලිපි {n}ක්", note: "අපි වැඩිම දකින තත්ත්ව අනුව පෙළගැස්සුවා." },
  { countTemplate: "ලකුණු {n}ක්", note: "අද රෑ, අද, මේ සතියේ, හෝ සාමාන්‍යයෙන්." },
  { countTemplate: "වයස අනුව", note: "අපේ වෛද්‍යවරු ඇත්තටම Order කරන පරීක්ෂණ." },
  { countTemplate: "මූලික දේ {n}ක්", note: "කරන්න ඕන දේ, කවදාවත් කරන්න එපා දේ." },
];

export const disclaimer =
  "සාමාන්‍ය තොරතුරු විතරයි, ශ්‍රී ලාංකික පාඨකයෙකු වෙනුවෙන් ලියලා අපේ Clinical කණ්ඩායම විසින් සමාලෝචනය කරලා. ඒකට ඔබේ History එක, බෙහෙත් හෝ පරීක්ෂණ සොයාගැනීම් ගැන කියන්න බෑ, ඒක රෝග විනිශ්චයක්ත් නෙවෙයි. ඔබේම තත්ත්වය ගැන හැමවිටම වෛද්‍යවරයෙකු එක්ක කතා කරන්න.";

export const hero = {};

export const bookSection = {
  heading: {},
  body: "මේ පිටුවේ මුකුත් ඔබව පරීක්ෂා කරන්න පුළුවන් වෛද්‍යවරයෙකුට ආදේශකයක් නෙවෙයි. සති දෙකක් තිස්සේ මුකුත් ඔබට කනස්සල්ලක් හිතුනා නම්, Consultation එක Book කරන්න.",
  actions: [
    {},
    {},
    {},
  ],
};
