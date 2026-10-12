// Sinhala for the Wellness Center Program list, in the same code-mixed
// register as content.si.ts: "පාසල" for school, "පරීක්ෂණ" for screening and
// "ශ්‍රේණිය" for grade, matching this page's own navigation. "Wellness" is
// "සුවතා", from navigationLabels.si.ts's "පාසල් සුවතාව".
//
// The eyebrow and heading are absent: the site register rule keeps section
// eyebrows and headings in English (docs/superpowers/i18n-register-rule.md).
//
// School names are proper names and stay English in schools.ts only; each
// school here carries just its `done` lines, by index.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const schoolsCopy = {
  intro:
    "අපි සෑම හවුල්කාර පාසලක් තුළම සුවතා මධ්‍යස්ථානයක් පිහිටුවා, පාසල් වර්ෂය පුරා එහි පරීක්ෂණ සහ සෞඛ්‍ය වැඩසටහන් පවත්වන්නෙමු.",
  stats: {
    total: "වැඩසටහනේ පාසල්",
    open: "පිහිටුවූ සුවතා මධ්‍යස්ථාන",
    joining: "ළඟදීම එක්වේ",
  },
  status: { open: "මධ්‍යස්ථානය විවෘතයි", joining: "ළඟදීම එක්වේ" },
  updated: "යාවත්කාලීන කළේ",
};

export const schools = [
  { done: ["දෙමව්පිය රැස්වීම පැවැත්විණි", "1 සහ 2 ශ්‍රේණි පරීක්ෂණ අවසන්"] },
  { done: ["දන්ත වැඩසටහන අවසන්", "සනීපාරක්ෂක වැඩසටහන අවසන්", "2 ශ්‍රේණියේ පරීක්ෂණ අවසන්"] },
  { done: ["1 සහ 2 ශ්‍රේණි පරීක්ෂණ අවසන්"] },
  { next: "පරීක්ෂණ ළඟදීම" },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];
