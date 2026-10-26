// Sinhala for the Wellness Center Program list, in the same code-mixed
// register as content.si.ts: "පාසල" for school, "පරීක්ෂණ" for screening and
// "ශ්‍රේණිය" for grade, matching this page's own navigation. "Wellness" is
// "සුවතා", from navigationLabels.si.ts's "පාසල් සුවතාව".
//
// The eyebrow and heading are absent: the site register rule keeps section
// eyebrows and headings in English (docs/superpowers/i18n-register-rule.md).
//
// School names are proper names and stay English in schools.ts only; each
// school here carries just its `done` and `next` lines, by index.

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
  { done: ["සුවතා මධ්‍යස්ථානය පිහිටුවා ඇත", "දෙමව්පිය රැස්වීම පැවැත්විණි", "1, 2 සහ 3 ශ්‍රේණි පරීක්ෂණ අවසන්"] },
  {
    done: [
      "සුවතා මධ්‍යස්ථානය පිහිටුවා ඇත",
      "Red Cross Society සඳහා ප්‍රථමාධාර පුහුණුව අවසන්",
      "සනීපාරක්ෂක වැඩසටහන අවසන්",
      "දන්ත වැඩසටහන අවසන්",
      "2 ශ්‍රේණියේ පරීක්ෂණ අවසන්",
    ],
  },
  { done: ["සුවතා මධ්‍යස්ථානය පිහිටුවා ඇත", "1 සහ 2 ශ්‍රේණි පරීක්ෂණ අවසන්"] },
  { done: ["සුවතා මධ්‍යස්ථානය පිහිටුවා ඇත", "1, 2 සහ 3 ශ්‍රේණි පරීක්ෂණ අවසන්"] },
  { done: ["සුවතා මධ්‍යස්ථානය පිහිටුවා ඇත"], next: "පරීක්ෂණ ළඟදීම" },
  { done: ["සුවතා මධ්‍යස්ථානය පිහිටුවා ඇත", "පෙර පාසල් දෙමව්පියන් සඳහා පෝෂණ වැඩසටහන අවසන්"], next: "පරීක්ෂණ ළඟදීම" },
  { done: ["සුවතා මධ්‍යස්ථානය පිහිටුවා ඇත", "1, 2 සහ 3 ශ්‍රේණි පරීක්ෂණ අවසන්"] },
  { done: ["සුවතා මධ්‍යස්ථානය පිහිටුවා ඇත"], next: "පරීක්ෂණ ළඟදීම" },
  { done: ["සුවතා මධ්‍යස්ථානය පිහිටුවා ඇත"] },
  { next: "හවුල්කාරිත්වය එකඟ විය, සුවතා මධ්‍යස්ථානය ඉදිරියේදී" },
  { next: "හවුල්කාරිත්වය එකඟ විය, සුවතා මධ්‍යස්ථානය ඉදිරියේදී" },
];
