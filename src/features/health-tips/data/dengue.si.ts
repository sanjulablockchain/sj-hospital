// Sinhala overlay for dengue.ts (the `#seasonal` band: the weekly compound
// walk and its own section copy).
//
// "Dengue" transliterates to "ඩෙංගු" throughout (established:
// navigationLabels.si.ts's own "Dengue at home" -> "නිවසේ ඩෙංගු සත්කාර",
// school-wellness/data/content.si.ts's own header and "ඩෙංගු කියන්නේ").
//
// `denguePoints[1]`'s breeding-site nouns ("gutters", "plant pot trays",
// "discarded tyres") reuse school-wellness/data/content.si.ts's own
// `breedingSites` forms verbatim for the identical objects in the identical
// domain (dengue prevention), rather than coining a second Sinhala form:
// "Gutters", "Pot ... Trays" and "Tyres" all stay bare English there too.
// "Coconut shells" is that same list's own "පොල් කටු", reused verbatim.
// "Bottle caps" has no precedent there (school-wellness names only bottles,
// not their caps), so it translates in full as an ordinary compound noun:
// "බෝතල් මුට්ටි".
//
// "Lid" and "repellent" have no established site precedent, so both
// translate in full as ordinary nouns: "lid" -> "මූඩිය" (the everyday
// Sinhala word for a container's lid, not the loanword), "repellent" ->
// "මදුරු නාශක". "Screens" in `denguePoints[5]` is the window-mesh sense
// (not the medical-screening sense the rest of the site's "Screen"
// occurrences use), so it translates to "මදුරු දැල්" (mosquito mesh),
// naming what it is for rather than coining a false-friend with the
// medical sense.
//
// Every number in this file (the "twenty minutes" and "hundred metres" in
// `seasonalSection.body1`/`body2` are spelled-out English words, not digits,
// so they translate like any other word) is unchanged from the English base.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const denguePoints = [
  "සතියකට වතාවක් ඔබේ ගෙවත්ත වට බැහැ, ජලය රැඳී තියෙන ඕන දෙයක් හලා දමන්න",
  "බඳුන හලනවා විතරක් නොව මදින්නත් ඕන: බිත්තර වියළි තත්ත්වයේ මාස ගණනක් පවතිනවා",
  "මිනිසුන් අමතක කරන තැන් පරීක්ෂා කරන්න: Gutters, පැළෑටි Pot යටින් තියෙන Trays, දමා තිබෙන Tyres, පොල් කටු, බෝතල් මුට්ටි",
  "ජල ටැංකි සහ බැරල් තදින් වහන මූඩියකින් හෝ දැලකින් වහන්න",
  "මැදුරුවා දිවා කාලයේ දෂ්ට කරන නිසා උදේ සහ හවස් වරුවේ මදුරු නාශක ගාන එක වඩාත්ම වැදගත්",
  "මදුරු දැල් සහ අත් දිග ඇඳුම් දරුවන් පාසල් වේලාවේදීත් රැක දෙනවා, රාත්‍රියේ විතරක් නෙවෙයි",
  "එක ආසාදිත අසල්වැසි බඳුනක්ම ඇති: අසල්වැසි අයගෙන් සම්බන්ධීකරණය කරගන්න",
];

export const seasonalSection = {
  badge: "වළක්වා ගැනීම",
  heading: { line1: "ඩෙංගු පටන් ගන්නේ", line2: "ඔබේම", line3: "ගෙවත්තෙන්" },
  body1:
    "ඩෙංගු ගෙනියන මැදුරුවා බෝ වෙන්නේ පිරිසිදු, නිශ්චල ජලයේ, මිනිසුන් ජීවත් වෙන තැනට ලංව. ඒක වැඩි දුරක් යන්නේ නෑ. අපි ප්‍රතිකාර කරන හැම Case එකකටම පාහේ ආසාදනය වෙලා තියෙන්නේ ගෙදරට, පාසලට හෝ රැකියාවට මීටර සීයක් ඇතුළත.",
  body2:
    "සතියකට වතාවක් විනාඩි විස්සක්, ඔබේම ගෙවත්ත වට බැහැ ජලය හලනවා, ඕන ම Spray එකකට වඩා වැඩ කරනවා. බිත්තර වියළි තත්ත්වයේ මාස ගණනක් පවතින නිසා, බඳුන හලනවා තරමටම එය මැදීමත් වැදගත්.",
  ctaWarning: "ඩෙංගු අනතුරු ලකුණු",
  ctaFever: "උණ පරීක්ෂා කරගන්න",
};
