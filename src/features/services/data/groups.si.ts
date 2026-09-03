// Sinhala overlay for groups.ts. `GROUPS` and `SERVICE_GROUPS` are structural
// (see the header comment on both in groups.ts) and never appear here;
// `groupLabels` carries the word a reader actually sees for each group.
// Reused verbatim from src/config/navigationLabels.si.ts, which already
// translates several of these as nav labels or footer headings:
// "Emergency" appears untranslated nowhere in that dictionary, but
// "Diagnostics" and "Surgical care" do, giving the register for the other two.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const groupLabels: Record<string, string> = {
  All: "සියල්ල",
  // No exact nav-dictionary entry; "Emergency" itself is this site's own
  // register word (see the recipe's register table), so the group name
  // keeps it and adds only the category word.
  Emergency: "හදිසි",
  Surgical: "ශල්‍ය",
  // Matches navigationLabels.si.ts's own "Diagnostics" entry exactly.
  Diagnostics: "රෝග විනිශ්චය",
  Clinics: "Clinic",
  "Women & children": "කාන්තා සහ ළමා",
  "At home": "නිවසේ",
};
