// Sinhala for the laboratory price list page.
//
// Code-mixed register, as on every other page: the sentence is Sinhala and
// the everyday English nouns people actually say stay English ("Lab",
// "Report", "Test", "OPD", "Counter", "Request Form"). Polite plural
// sentence forms. Western numerals, and the `{count}` / `{fromPrice}` /
// `{n}` tokens are kept exactly, since the page fills them.
//
// Per the register rule (docs/superpowers/i18n-register-rule.md) the hero,
// the eyebrows, the headings, the CTAs, the filter row and the column
// headers are ABSENT here and render in English; what remains is prose.
//
// "229/10 St. Joseph Street" in `bookIntro` never changes script.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const listIntro =
  "Test එකේ නම හෝ ඔබේ Request Form එකේ Code එක Type කරන්න. මිල ගණන් ශ්‍රී ලංකා රුපියල් වලින්, Report එකත් ඇතුළුව; OPD රෝගීන් Counter එකේදී අඩුවෙන් ගෙවනවා.";

export const table = {
  showingTemplate: "{total} න් {n} ක් පෙන්වනවා",
  empty: "ඒ නමට ගැලපෙන Test එකක් නෑ. කෙටි වචනයක් හෝ Test Code එක Try කරන්න.",
};

export const turnaroundTemplate = { one: "දින එකයි", many: "දින {n}" };

export const howIntro =
  "ලැයිස්තුවේ හැම Test එකකටම එකම පියවර හතර, ඔබ Request Form එකක් අරන් එනවද, නැත්නම් අපි ගෙදරදී Sample එක ගන්නවද කියලා වෙනසක් නෑ.";

export const bookIntro =
  "229/10 St. Joseph Street, මීගමුව, බිම් මහලේ Lab Reception එක. Request Form එකක් අරන් කෙලින්ම එන්න, නැත්නම් Call කරන්න, අපි ගෙදරදී Sample එක ගන්න වෙලාවක් හදනවා.";
