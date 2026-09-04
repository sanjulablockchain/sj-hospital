// Sinhala overlay for pageContent.ts (the hero, the fact strip, the ticker,
// the jump cards, the book section and the disclaimer).
//
// `breadcrumbHome` ("Home") and `breadcrumbCurrent` ("Health Tips") reuse
// navigationLabels.si.ts's own established strings verbatim ("මුල් පිටුව",
// "සෞඛ්‍ය උපදෙස්") rather than coining a second Sinhala form for either;
// `hero.ctaWarning` and every `jumpCards[*].label` that names a section
// this page also has a nav/footer entry for reuse the same dictionary's
// "පැමිණිය යුතු වේලාව" and "නිවසේ ප්‍රථමාධාර" for the identical reason.
// "Call us" reuses the recipe's own worked example verbatim ("අපට call
// කරන්න").
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
  { countTemplate: "ලිපි {n}ක්", label: "පුස්තකාලය", note: "අපි වැඩිම දකින තත්ත්ව අනුව පෙළගැස්සුවා." },
  { countTemplate: "ලකුණු {n}ක්", label: "පැමිණිය යුතු වේලාව", note: "අද රෑ, අද, මේ සතියේ, හෝ සාමාන්‍යයෙන්." },
  { countTemplate: "වයස අනුව", label: "පරීක්ෂණ", note: "අපේ වෛද්‍යවරු ඇත්තටම Order කරන පරීක්ෂණ." },
  { countTemplate: "මූලික දේ {n}ක්", label: "නිවසේ ප්‍රථමාධාර", note: "කරන්න ඕන දේ, කවදාවත් කරන්න එපා දේ." },
];

export const disclaimer =
  "සාමාන්‍ය තොරතුරු විතරයි, ශ්‍රී ලාංකික පාඨකයෙකු වෙනුවෙන් ලියලා අපේ Clinical කණ්ඩායම විසින් සමාලෝචනය කරලා. ඒකට ඔබේ History එක, බෙහෙත් හෝ පරීක්ෂණ සොයාගැනීම් ගැන කියන්න බෑ, ඒක රෝග විනිශ්චයක්ත් නෙවෙයි. ඔබේම තත්ත්වය ගැන හැමවිටම වෛද්‍යවරයෙකු එක්ක කතා කරන්න.";

export const hero = {
  verticalLabel: "අපේ වෛද්‍යවරු ලියපු",
  breadcrumbHome: "මුල් පිටුව",
  breadcrumbCurrent: "සෞඛ්‍ය උපදෙස්",
  headingLine1: "කුඩා පුරුදු,",
  headingOutline: "විශාල",
  headingAccent: "වෙනසක්.",
  body: "Clinic එකේදී ඔබව බලන වෛද්‍යවරු ලියපු ප්‍රායෝගික උපදෙස්, මීගමුවේ ඇත්තටම එන තත්ත්ව සඳහා. Miracle සුවකිරීම් නෑ, බය කරවන කතා නෑ.",
  ctaLibrary: "පුස්තකාලය කියවන්න",
  ctaWarning: "අද රෑ එන්න ඕන වේලාව",
};

export const bookSection = {
  eyebrow: "06 / තවම විශ්වාස නැද්ද",
  heading: { line1: "කියවීම", line2: "අහන එකට", line3: "සමාන නෑ." },
  body: "මේ පිටුවේ මුකුත් ඔබව පරීක්ෂා කරන්න පුළුවන් වෛද්‍යවරයෙකුට ආදේශකයක් නෙවෙයි. සති දෙකක් තිස්සේ මුකුත් ඔබට කනස්සල්ලක් හිතුනා නම්, Consultation එක Book කරන්න.",
  actions: [
    { label: "Consultation එකක් Book කරන්න" },
    { label: "WhatsApp වලින් අහන්න" },
    { label: "අපට call කරන්න" },
  ],
};
