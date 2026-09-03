// Sinhala for the home page's `#tips` band.
//
// "Dengue" is transliterated as "ඩෙංගු" rather than kept in English letters,
// matching navigationLabels.si.ts's own "Dengue at home" -> "නිවසේ ඩෙංගු
// සත්කාර": that is how this specific word is written site-wide, unlike
// "Emergency" or "OPD".
//
// "Health tips" already has a site-wide translation in navigationLabels.si.ts
// for this exact page's own header and footer links, so `sectionEyebrow` and
// `cta` reuse that root rather than inventing a second one.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const healthTips = [
  {
    category: "ළමා රෝග",
    title: "දරුවෙකුට උණ: බලා ඉන්න ඕන වෙලාව, රෝහලට එන්න ඕන වෙලාව",
    excerpt: "රාත්‍රියේ එන එක වටින බව කියන ලකුණු තුන.",
  },
  {
    category: "වළක්වා ගැනීම",
    title: "හතළිහට පස්සේ කරන එක වටින වාර්ෂික පරීක්ෂණ පහ",
    excerpt: "අපේ Physicians Order කරන දේ, සහ මගහරින දේ.",
  },
  {
    category: "ඩෙංගු",
    title: "වර්ෂා කාලය: ගෙදර ඩෙංගු අවදානම අඩු කරගන්නා විදිහ",
    excerpt: "සතියකට විනාඩි විස්සක් ඔබේ වත්තයි Gutters ගාවයි.",
  },
  {
    category: "සුවය ලැබීම",
    title: "සැත්කමකින් පස්සේ සති දෙකේ හොඳින් කන විදිහ",
    excerpt: "සුවය වේගවත් කරන Protein, තරල සහ නින්ද Targets.",
  },
];

// Reused verbatim from navigationLabels.si.ts's "Health tips" -> "සෞඛ්‍ය උපදෙස්".
export const sectionEyebrow = "09 / සෞඛ්‍ය උපදෙස්";
export const heading = { line1: "කුඩා පුරුදු,", line2: "ලියන්නේ", line3: "අපේ වෛද්‍යවරු" };
export const cta = "සියලුම සෞඛ්‍ය උපදෙස්";
