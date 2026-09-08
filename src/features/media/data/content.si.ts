// Sinhala for the media page.
//
// Same code-mixed register as contact's, facilities' and every other page's
// own content.si.ts: the sentence is Sinhala, everyday English nouns and
// site-wide terms stay in English rather than being replaced by a literary
// coinage nobody says out loud.
//
// "Logo" stays in English throughout, the same way the nav dictionary's own
// "Press kit and logos" -> "මාධ්‍ය කට්ටලය සහ Logo" keeps it. "Communications"
// stays in English as the shorthand for the press desk's own department
// inside a sentence (`pressIntro`, `spokespeopleIntro1`, `rules[0].a`,
// `rules[6].a`), the same register that keeps "Reception" and "OPD" in
// English elsewhere on the site.
//
// The register sweep (2026-09-09) deleted `hero` entirely, every
// `sectionEyebrows` entry, every `jumpCards[*].label`, `enquiryKitCta` and
// `enquiryInterviewCta`, every `desk[*].title`/`news[*].title`/
// `featured.title`/`gallery[*].title` (card titles, the policy's own naming
// for them; this also supersedes the file's former "quoted material, kept
// English" framing for `news[*].title`/`featured.title`, since those paths
// now render from the base regardless of locale rather than being an
// overlay decision at all) and `gallery[*].tag` (ruling 2 in
// docs/superpowers/i18n-register-rule.md: a display chip of the same kind
// as a filter chip). Everything around a former quotation, the framing and
// the descriptions, is untouched and still translates: every `news[*].lede`,
// `featured.lede` and `featured.type`.
//
// `newsCategories` and `news[*].tag` are excluded from parity entirely
// (content.i18n.test.ts): they are the structural category identity
// `NewsroomSection`'s own filter state and `===` comparisons key off, not
// copy, the same role `.glyph` plays elsewhere. `categoryLabels` right next
// to them used to carry the six translated words a reader actually sees for
// the same six categories; the sweep emptied it too, since the filter chip
// row is English throughout (the same "Filter and category chips" rule row
// as `library.si.ts`'s own `categoryLabels` in health-tips).
//
// Sentence forms use the polite plural ("කරන්න"), the same register
// `contact`'s own content.si.ts uses throughout.
//
// Only translatable copy lives here. Every href, image path, alt text, file
// format, date and structural category key stays in content.ts and has
// exactly one home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {};

export const sectionEyebrows = {};

export const tickerItems: readonly string[] = [
  "පුවත් නිවේදන",
  "විශේෂඥ සම්මුඛ සාකච්ඡා",
  "Logo සහ Brand ගොනු",
  "පරිශ්‍රයේ රූගත කිරීම්",
  "ප්‍රජා සහ CSR වැඩසටහන්",
  "සම්මාන සහ Accreditation",
];

export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const categoryLabels = {};

export const newsroomCopy = {
  itemsCountTemplate: "අයිතම {total} න් {shown}ක්",
  forJournalists: "මාධ්‍යවේදීන් සඳහා",
};

export const featured = {
  kickerDate: "අගෝස්තු 2026",
  lede: "වෙන් වූ Procedure කාමර දෙකක් සහ වෙනම Recovery Bay එකක් සමඟ, රෝග විනිශ්චය සඳහා වන Gastroscopy සහ Colonoscopy සඳහා රැඳී සිටින කාලය සතියකට වඩා අඩුවෙයි. Suite එක දින හයක් ක්‍රියාත්මක වන අතර, Sedation එක Anaesthetic කණ්ඩායම විසින් හසුරුවනු ලබන අතර, Procedure එකේදී ලබාගත් Biopsy සඳහා එදිනම Report කිරීමකි.",
  date: "14 අගෝස්තු 2026",
  type: "පුවත් නිවේදනය",
  points: [
    "සම්පූර්ණ නිවේදනය, ඡායාරූප සහ Floor Plan එක ඉල්ලීම මත ලබාගත හැක",
    "සම්මුඛ සාකච්ඡාවක් සඳහා Consultant Gastroenterologist කෙනෙක් ලබාගත හැක",
    "Procedure වේලාවෙන් පිටත Suite එකේ රූගත කිරීමට අවසර ඇත",
    "කිසිදු Resolution එකකින් රෝගී ඡායාරූප නිකුත් නොකෙරේ",
  ],
};

export const news = [
  {
    date: "අගෝස්තු 2026",
    lede: "වෙන් වූ Procedure කාමර දෙකක් සහ වෙනම Recovery Bay එකක්, රෝග විනිශ්චය Gastroscopy සහ Colonoscopy සඳහා රැඳී සිටින කාලය සතියකට වඩා අඩු කරයි.",
  },
  {
    date: "ජූලි 2026",
    lede: "OPD පිවිසුම අසල Dispensary කවුන්ටරය දැන් රාත්‍රිය පුරාම විවෘතව පවතින නිසා, Discharge Prescription එකකට උදෑසන එනතුරු රැඳී සිටින්න අවශ්‍ය නෑ.",
  },
  {
    date: "ජූලි 2026",
    lede: "සාමාන්‍ය ශල්‍ය අංශය තම දහසවන Keyhole Cholecystectomy සම්පූර්ණ කළේ, සාමාන්‍ය ශල්‍යකර්මයෙන් පසු රැඳී සිටීම රාත්‍රි දෙකකි.",
  },
  {
    date: "ජූනි 2026",
    lede: "Vascular සහ Podiatry දායකත්වය සහිත සතිපතා ඒකාබද්ධ Clinic එකක් නිසා, සුව නොවන තුවාල ඇති රෝගීන් යොමු කරන ආකාරය වෙනස් වී ඇත.",
  },
  {
    date: "මැයි 2026",
    lede: "හෘද රූප ගැනීම දැන් හදිසි අංශයේ රාත්‍රියේත් ලබාගත හැකි වී ඇත, ඊළඟ වැඩ කරන උදෑසන එනතුරු රැඳී සිටීම වෙනුවට.",
  },
  {
    date: "අගෝස්තු 2026",
    lede: "මීගමුව සහ කටාන අධ්‍යාපන කලාප පුරා පාසල් දරුවන් සඳහා දෘෂ්ටි, ශ්‍රවණ, දන්ත සහ වර්ධන පරීක්ෂණ, පාසලට නොමිලේ.",
  },
  {
    date: "ජූලි 2026",
    lede: "Monsoon උච්චතමයට පෙර, නිවාස පරීක්ෂණ කණ්ඩායම් සහ වාට්ටු හයක් පුරා භාජන ඉවත් කිරීමේ ව්‍යාපාරයකි.",
  },
  {
    date: "ජූනි 2026",
    lede: "සති අන්ත දෙකක් තුළ පුද්ගලයන් නවසීයක් පරීක්ෂා කරන ලද අතර, ඔවුන්ගේ ප්‍රතිඵල පිළිබඳ පළමු නිසි උපදේශනයක් සඳහා පස්වන කොටසක් යොමු කරන ලදී.",
  },
  {
    date: "අප්‍රේල් 2026",
    lede: "St. Mary's පල්ලිය සමඟ ඒකාබද්ධ ව්‍යාපාරයක් රෝහල සහ ජාතික රුධිර පාරවිලයන සේවය සඳහා ඒකක එකතු කළේය.",
  },
  {
    date: "ජූනි 2026",
    lede: "ආසාදන පාලන කණ්ඩායම, අත් සනීපාරක්ෂාව සහ ශල්‍ය ස්ථාන ආසාදන අධීක්ෂණය සම්බන්ධයෙන් පිළිගැනීමට ලක් විය.",
  },
  {
    date: "මාර්තු 2026",
    lede: "දැඩි සත්කාර Nursing කණ්ඩායමට රෝගී ආරක්ෂාව සහ පවුල් සන්නිවේදනය සම්බන්ධයෙන් ජාතික සම්මානයක් හිමි විය.",
  },
  {
    date: "සැප්තැම්බර් 2026",
    lede: "ප්‍රධාන Lobby එකේ නොමිලේ අවදානම් තක්සේරුව, රුධිර පීඩන සහ Lipid පරීක්ෂණ, දවස පුරාම හෘද විශේෂඥයන් සමඟ.",
  },
  {
    date: "අගෝස්තු 2026",
    lede: "ප්‍රසූතිය, පෝෂණය, අලුත උපන් සත්කාරය සහ ගෙදර පළමු සති හය ආවරණය කරන අපේක්ෂිත දෙමාපියන් සඳහා සති හයක පාඨමාලාවකි.",
  },
  {
    date: "මැයි 2026",
    lede: "Nursing නිලධාරීන් හතළිස් දෙනෙක් සේවය සම්බන්ධයෙන් පිළිගැනුනු අතර, තිදෙනෙක් රෝහලේ අවුරුදු විස්සකට වඩා සේවය කර ඇත.",
  },
  {
    date: "ජූලි 2026",
    lede: "අපගේ Physicians වන් ජාතික රූපවාහිනී සහ මුද්‍රිත මාධ්‍ය සමඟ මුල් අවවාද ලක්ෂණ සහ හතරවන දින Platelet පහත වැටීම ගැන සාකච්ඡා කළහ.",
  },
  {
    date: "ජූනි 2026",
    lede: "පුනරාවර්තන ජල හිඟය සහ ක්ෂේත්‍ර සහ ඉදිකිරීම් සේවකයන් අතර නිදන්ගත වකුගඩු රෝගය පිළිබඳ Nephrology දෘෂ්ටිකෝණයකි.",
  },
  {
    date: "පෙබරවාරි 2026",
    lede: "Accreditation ගුණාත්මක ප්‍රමිතීන්, Audit සහ එදිනෙදා සායනික භාවිතය වෙනස් කරන්නේ කෙසේද යන්න පිළිබඳ අපගේ Medical Director.",
  },
];

export const pressHeading = {};
export const pressIntro =
  "Corporate Communications, සතියේ දිනවල උදේ 8 සිට හවස 5 දක්වා Staff කරලා, ඒ වේලාවෙන් පිටත වන හදිසි පුවත් සඳහා Duty Phone එකක් සමඟ. අපට Comment කරන්න බැරි වෙලාවක් ඔබට කියනවා, ඇයි කියලත් කියනවා, නිහඬව ඉන්නවා වෙනුවට.";
export const pressPhoneTemplate = "{phone}, Communications එක ඉල්ලන්න";

export const desk = [
  {
    kind: "පළමු සම්බන්ධතාවය",
    body: "සම්මුඛ සාකච්ඡා ඉල්ලීම්, රූගත කිරීම්, ප්‍රකාශ සහ කරුණු පරීක්ෂා කිරීම් ඇතුළුව සෑම Media ඉල්ලීමක්ම පටන් ගන්නේ මෙතනින්. අපි එය යොමු කරලා, ඔබ File කරනතුරු එම Thread එකේම ඉන්නවා.",
  },
  {
    kind: "වේලාවන්",
    body: "වැඩ කරන දවස පුරාම Staff කරලා, රාත්‍රියේ සහ සති අන්තවල හදිසි පුවත් සඳහා ප්‍රධාන රෝහල් අංකය හරහා ලබාගත හැකි Duty Phone එකක් සමඟ.",
  },
  {
    kind: "Reply",
    body: "ඔබේ Deadline එක Subject Line එකේ දාන්න, අපි වැඩ කරන දවස තුළම Reply කරන්නම්, හරිම වෛද්‍යවරයා ලබාගන්න හෙට වෙනකන් ඕන කියලා Reply එක වුනත්.",
  },
  {
    kind: "සම්මුඛ සාකච්ඡා",
    body: "ඇත්තටම වැඩේ කරන විශේෂඥයා සමඟ ඔබව සම්බන්ධ කරනවා. Topic එකයි Deadline එකයි දෙන්න, ලබාගත හැක්කේ කවුද කියලා අපි අවංකවම කියන්නම්.",
  },
  {
    kind: "ප්‍රකාශ",
    body: "ප්‍රකාශ ලිඛිතව නිකුත් කරලා, Title එකත් සමඟ නම් සහිත පුද්ගලයෙකුට Attribute කරලා, දිනගත කරලා. අපි Background එකේ කතා කරලා පස්සේ ප්‍රතික්ෂේප කරන්නේ නෑ.",
  },
  {
    kind: "කරුණු පරීක්ෂාව",
    body: "Publish කරන්න කලින් අපි Quotation එකක්, සායනික Claim එකක්, නමක් හෝ Title එකක් Check කරන්නම්. ඔබට Correction එකකට වඩා ඉක්මන්, අපිටත් හොඳයි.",
  },
  {
    kind: "අනතුරු",
    body: "පොදු අනතුරක දී, හඳුනාගැනීමේ විස්තර නොමැතිව සත්‍ය සංඛ්‍යා සහ පොදු තත්ත්වය අපි නිකුත් කරලා, පින්තූරය පැහැදිලි වෙනකොට Update කරනවා. Clinicians වරු රෝගීන් සමඟම ඉන්නවා.",
  },
  {
    kind: "මේ මේසය නෙවෙයි",
    body: "Advertising, Sponsorship සහ Supplier යෝජනා Marketing කණ්ඩායමට යවන්න, මාධ්‍ය මේසයට නෙවෙයි. Deadline එකේ ඉන්න Journalist කෙනෙක්ට ඒක ප්‍රමාද කරනවා.",
  },
];

export const kitHeading = {};
export const kitIntro =
  "St. Joseph Hospital, Negombo ට Credit දෙමින්, වෙනස් නොකර Editorial ආවරණයේදී නොමිලේ භාවිතා කරන්න. Advertising එකකදී හෝ භාණ්ඩයක Use කරන්න කලින් අපෙන් අහන්න.";

export const kit = [
  {
    name: "ප්‍රධාන Logo",
    note: "සම්පූර්ණ වර්ණයෙන්, Light සහ Dark Background දෙකෙහිම, පැහැදිලි ඉඩ මාර්ගෝපදේශ සමඟ",
  },
  {
    name: "Logo Mark එක පමණයි",
    note: "Wordmark එක නැති Mark එක, Square සහ Profile භාවිතය සඳහා",
  },
  {
    name: "එක් වර්ණයේ Logo",
    note: "පුවත්පත් සහ එක් වර්ණ මුද්‍රණය සඳහා තනි වර්ණයක්",
  },
  {
    name: "Brand Sheet එක",
    note: "වර්ණ, Font, අවම ප්‍රමාණ සහ නොකළ යුතු දේවල්",
  },
  {
    name: "ගොඩනැගිල්ලේ ඡායාරූප",
    note: "දවල් සහ රාත්‍රී Exterior, ප්‍රධාන පිවිසුම, Lobby, සියල්ල Print Resolution",
  },
  {
    name: "පහසුකම් ඡායාරූප",
    note: "ශල්‍යාගාර, දැඩි සත්කාරය, රසායනාගාරය, Imaging, Pharmacy, රෝගීන් නොමැතිව",
  },
  {
    name: "විශේෂඥ ඡායාරූප",
    note: "කථිකයන්ගේ Headshots, ඔවුන්ගේ කැමැත්ත File එකේ ඇතුව නිකුත් කරන ලද",
  },
  {
    name: "කරුණු පත්‍රිකාව",
    note: "ඇඳන්, Unit, සේවා, ආරම්භක වර්ෂය, ප්‍රධාන සංඛ්‍යා, කාර්තුමය Update කරන ලද",
  },
  {
    name: "Boilerplate ඡේදය",
    note: "ඔබේ ලිපියේ අවසානය සඳහා අනුමත කෙටි විස්තරය",
  },
];

export const galleryHeading = {};
export const galleryIntro =
  "මෙතන තියෙන හැම ඡායාරූපයක්ම Editorial භාවිතය සඳහා අනුමතයි. ලිඛිත කැමැත්තක් File එකේ නැතුව, කිසිදු Resolution එකකින් හඳුනාගත හැකි රෝගියෙක් පෙන්වන කිසිවක් නිකුත් නොකෙරේ.";

export const gallery = [
  {
    credit: "සපයන ලද්දේ: St. Joseph Hospital, Negombo",
  },
  {
    credit: "සපයන ලද්දේ: St. Joseph Hospital, Negombo",
  },
  {
    credit: "වෙනස් නොකර Reproduce කරන්න, සම්පූර්ණ Mark එක පමණයි",
  },
];

export const spokespeopleHeading = {};
export const spokespeopleIntro1 =
  "ඉල්ලීම් Communications හරහා යනවා, ඔවුන් ඔබව ඇත්තටම වැඩේ කරන Clinician සමඟ සම්බන්ධ කරනවා, ප්‍රකාශයක් කියවන පොදු කථිකයෙකු වෙනුවට.";
export const spokespeopleIntro2 =
  "පළමු Email එකේම Topic එකයි Deadline එකයි දෙන්න. දෙකම අපිට Offer කරන්න පුළුවන් කවුද, කොච්චර ඉක්මණින්ද කියලා වෙනස් කරනවා.";

// `topics[*].v` is a job title, not prose, and the rule for "Consultant" the
// word (see the comment beside `featured.points` in content.ts, and its
// application here) applies to it like everywhere else in this file: kept
// English only where it sits as a title directly in front of a role
// ("Consultant physician"), because that is how it reads on a nameplate;
// translated where it is an ordinary noun. Four rows (`[4]`, `[5]`, `[6]`,
// and `[3]`'s "Consultant Surgeon") are nothing but that nameplate pattern,
// so nothing in them needs translating and they stay in KEEPS_ENGLISH in
// content.i18n.test.ts, one entry each with its own reason, not one line
// covering all ten. The other six were full job-title clauses with no such
// precedent, so their connectors and ordinary words translate, keeping only
// the role name itself and "Communications" (the department, same as
// `spokespeopleIntro1`'s "Communications හරහා") in English:
// - `[0]`: "through" -> "හරහා", matching `spokespeopleIntro1`'s own
//   translation of the identical connector.
// - `[2]`: "Head", "of" and "Medicine" translate; "Emergency" translates to
//   "හදිසි" to match its own sibling `[2].k` two words to the left, rather
//   than sitting untranslated beside a Sinhala word for the same fact.
// - `[3]`: "Consultant Surgeon" is the nameplate and stays English; "in the
//   relevant subspecialty" is ordinary qualifying prose and translates.
//   "Subspecialty" itself stays English the same way this array's own
//   `[1].k`'s "Accreditation" and `[2].k`'s "Trauma" do: an institutional
//   term with no established Sinhala rendering in this file, not a role
//   name.
// - `[7]`, `[8]`, `[9]`: "Nursing" and "Pharmacist" stay English because
//   both are established site-wide loanwords (facilities' "Unit
//   Coordinator", pharmacy's own register comment naming "Pharmacist"),
//   the same class of word as "Doctor" or "OPD", not because they are job
//   titles; "Director", "Chief", "Community" and "Health" are ordinary
//   words and translate.
export const topics = [
  { k: "රෝහල් උපායමාර්ගය සහ ආයෝජනය", v: "Chief Executive Officer, Communications හරහා" },
  // "Medical Director" is the one job title that stays fully English with
  // no ordinary word riding along: see KEEPS_ENGLISH in
  // content.i18n.test.ts, which cites `network`'s own overlay keeping this
  // exact title English mid-sentence.
  { k: "සායනික ප්‍රමිතීන් සහ Accreditation", v: "Medical Director" },
  { k: "හදිසි සහ Trauma සත්කාරය", v: "හදිසි වෛද්‍ය ප්‍රධානී" },
  { k: "ශල්‍යකර්ම සහ Day Case Procedure", v: "අදාළ Subspecialty එකේ Consultant Surgeon" },
  // "Consultant physician", "Consultant paediatrician" and "Consultant
  // obstetrician and gynaecologist" below are each nothing but the
  // nameplate pattern (Consultant directly in front of a role), so they
  // stay fully English: see KEEPS_ENGLISH in content.i18n.test.ts.
  { k: "ඩෙංගු, දියවැඩියාව සහ පොදු වෛද්‍ය", v: "Consultant physician" },
  { k: "දරුවන්ගේ සෞඛ්‍යය සහ එන්නත්කරණය", v: "Consultant paediatrician" },
  { k: "ප්‍රසූතිය සහ කාන්තා සෞඛ්‍යය", v: "Consultant obstetrician and gynaecologist" },
  { k: "Nursing, ආසාදන පාලනය, රෝගී ආරක්ෂාව", v: "Nursing අධ්‍යක්ෂ" },
  { k: "බෙහෙත්, හිඟකම්, Prescribing", v: "ප්‍රධාන Pharmacist" },
  { k: "ප්‍රජා සහ පාසල් වැඩසටහන්", v: "ප්‍රජා සෞඛ්‍ය Coordinator" },
];

export const rulesHeading = {};

export const rules = [
  {
    q: "රෝහල තුළ Film කරන්න හෝ ඡායාරූප ගන්න පුළුවන්ද?",
    a: "ඔව්, Corporate Communications හරහා කලින් සම්බන්ධ වී, සැමවිටම Escort කෙනෙකු සමඟ. සායනික ප්‍රදේශ, හදිසි අංශය, ශල්‍යාගාර සහ Intensive Care Unit එකට Department Head ගෙන් වෙනම අනුමැතියක් ද අවශ්‍යයි, සහ රෝගීන්ට එම මොහොතේ අර්ථවත් ලෙස කැමැත්ත දෙන්න බැරි නිසා පිළිතුර සරලවම නැහැ වන තැන් ද තියෙනවා. පුළුවන් තැන් වේලාවක වැඩ කරන දින දෙකක් අපිට දෙන්න. Breaking News ඉක්මනින් Handle කෙරෙනවා, නමුත් Escort එකක් නැතුව කවදාවත් නෑ.",
  },
  {
    q: "රෝගියෙක් ගැන විස්තර ඔබ තහවුරු කරයිද?",
    a: "නෑ, රෝගියාගෙන් හෝ, රෝගියාට කැමැත්ත දෙන්න බැරි නම් ඔවුන්ගේ ළඟම ඥාතියාගෙන්, ලිඛිත කැමැත්තක් නැතුව. මෙය ඇතුළත් කිරීම්, තත්ත්වය, තුවාලයේ හේතුව සහ නම් සහිත පුද්ගලයෙක් ගොඩනැගිල්ලේ ඉන්නවාද කියන එකටත් අදාළයි, ප්‍රසිද්ධ පුද්ගලයන්ට සහ Social Media වල දැනටමත් සංසරණය වන Case සඳහාත් ඇතුළුව. කවුරුහරි මෙතන ඉන්නවා කියලා තහවුරු කරන එකම එක Disclosure එකක්. කරුණාකර ප්‍රතික්ෂේප කිරීමක් Evasion එකක් විදිහට කියවන්න එපා.",
  },
  {
    q: "අනතුරක් හෝ පොදු Incident එකක් ඔබ Handle කරන්නේ කෙසේද?",
    a: "Mass Casualty එකකදී හෝ පොදු Incident එකකදී, නම් හෝ හඳුනාගැනීමේ විස්තර නොමැතිව ලැබුණු Casualty ගණන සහ ඔවුන්ගේ පොදු තත්ත්වය ආවරණය කරන සත්‍ය Holding Statement එකක් අපි නිකුත් කරලා, පින්තූරය පැහැදිලි වෙනකොට එය Update කරනවා. ඉල්ලීම් Corridor එකේ Clinicians වරු විසින් නෙවෙයි, මධ්‍යගතව Handle කරන නිසා, ප්‍රතිකාරයට බාධාවක් නොවී ඔබට ලැබෙන තොරතුරු නිවැරදියි.",
  },
  {
    q: "විශේෂඥ කෙනෙක්ට පොදු වෛද්‍ය Topic එකක් ගැන Comment කරන්න පුළුවන්ද?",
    a: "සාමාන්‍යයෙන් ඔව්, මේක අපිට ලැබෙන්න වඩාත්ම සතුටු ඉල්ලීම. Topic එකයි Deadline එකයි කියන්න, ඇත්තටම ඒ වැඩේ කරන Clinician කෙනා අපි Offer කරන්නම්. ඔවුන් සාමාන්‍ය සායනික භාවිතය, වැළැක්වීම සහ රෝගීන් බලාගෙන ඉන්න ඕන දේ ගැන කතා කරයි. ඔවුන් වෙනත් රෝහලක Case එකක්, පවතින නීතිමය කාරණයක් හෝ නම් සහිත පුද්ගලයෙකුගේ ප්‍රතිකාරය ගැන Comment කරන්නේ නෑ.",
  },
  {
    q: "ඔබේ Logo එක අපිට Use කරන්න පුළුවන්ද?",
    a: "රෝහල ගැන Editorial ආවරණයේදී, ඔව්, වෙනස් නොකර, වටේ පැහැදිලි ඉඩක් සමඟ, නැවත වර්ණ නොකර. එය Advertising එකකදී, භාණ්ඩයක, නිෂ්පාදනයක් හෝ සේවාවක Endorsement එකක් ඇඟවෙන ආකාරයට, හෝ Partnership එකක් ඇඟවෙන ආකාරයට වෙනත් සංවිධානයක Mark එකක් සමඟ Use කරන්න බෑ. Press Kit එකේ නිවැරදි File සහ අවම ප්‍රමාණ තියෙනවා. ඔබේ Use එක පැහැදිලිවම Editorial නොවේ නම් අපෙන් අහන්න.",
  },
  {
    q: "Publish කරන්න කලින් ලිපි ඔබ Review කරනවාද?",
    a: "අපි Editorial අනුමැතියක් ඉල්ලන්නේ නෑ, බලාපොරොත්තුත් වෙන්නේ නෑ. Publish කරන්න කලින් Quotation එකක්, සායනික Claim එකක්, නමක් හෝ Job Title එකක් අපි සතුටින් Check කරන්නම්, ඊට පස්සේ Correction එකක් නිකුත් කරනවාට වඩා. කොටස එවන්න, අපි ඉක්මනින් Turn Around කරන්නම්.",
  },
  {
    q: "රෝගීන් සමඟ අපිට සම්මුඛ සාකච්ඡා කරන්න පුළුවන්ද?",
    a: "රෝගියා තමන්ම අප වෙත ළඟා වී තිබුණොත් හෝ Communications හරහා, ප්‍රතිකාර කණ්ඩායමේ දැනුමත් සමඟ, කලින් ලිඛිත කැමැත්තක් දී තිබුණොත් පමණයි. අපි Journalist වරුන් Ward එකකට ඇවිද ගිහින් කතා කරන්න කැමති කෙනෙක් හොයන්නේ නෑ, තියුණු Admission එකකදී ඔබ වෙනුවෙන් රෝගීන් අමතන්නේ නෑ. සුවය ලැබීමේ කතන්දර සාමාන්‍යයෙන් Discharge එකෙන් පස්සේ කියන එකයි හොඳම.",
  },
  {
    q: "ඔබ Advertising Sponsor කරනවාද හෝ තියනවාද?",
    a: "Commercial ඉල්ලීම්, Advertising Sale සහ Sponsorship යෝජනා මාධ්‍ය මේසය නොව Marketing කණ්ඩායමට යා යුතුයි, Media ලිපිනය හරි මාර්ගය නෙවෙයි. Deadline එකේ ඉන්න Journalist වරුන්ට එය ප්‍රමාද කරනවා. මාධ්‍ය Inbox එකට එවන Commercial ඕනෑම දෙයක් සරලවම යවනු ලැබේ.",
  },
];

export const enquiryHeading = {};
export const enquiryIntro =
  "ඔබේ Outlet එක, Topic එක සහ Deadline එක පළමු පේළියේ දාන්න, අපි වැඩ කරන දවස ඇතුළත ආපහු එන්නම්. රාත්‍රී සහ සති අන්ත කතන්දර ප්‍රධාන රෝහල් අංකය හරහා Duty Phone එකට ළඟා වේ.";

export const jumpCards = [
  {
    // Derived from news.length (17) in content.ts. If a release is added or
    // removed, this literal count needs updating to match, the same
    // staleness risk content.ts's own comment on `jumpCards` flags for the
    // English derivation it protects against; there is no automated check
    // on the translated count itself.
    count: "අයිතම 17ක්",
    note: "නිකුත් කිරීම්, සායනික සන්ධිස්ථාන, ප්‍රජා වැඩ.",
  },
  {
    count: "එක් Inbox එකක්",
    note: "කාටද කතා කරන්නේ, කොච්චර ඉක්මනින් Reply කරනවද.",
  },
  {
    // Derived from kit.length (9). Same staleness note as jumpCards[0].count.
    count: "සම්පත් 9ක්",
    note: "Logo, ඡායාරූප, කරුණු පත්‍රිකාව, Boilerplate.",
  },
  {
    // Derived from rules.length (8). Same staleness note as jumpCards[0].count.
    count: "නීති 8ක්",
    note: "අපිට තහවුරු කරන්න පුළුවන් සහ බැරි දේ.",
  },
];
