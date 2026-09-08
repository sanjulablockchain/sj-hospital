// Sinhala for the international care page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns and
// clinical or business terms stay in English rather than being replaced by
// literary coinages nobody says out loud. So "Email", "WhatsApp", "OPD",
// "X-ray", "CT", "MRI" and "Bandaranaike International Airport" stay in
// English throughout, the same way they already do in contact's, about's,
// e-channeling's, accommodation's, home-care's, pharmacy's and network's own
// content.si.ts. "Insurance" transliterates to the loanword "ඉන්ෂුවරන්ස්",
// the same spelling network's own content.si.ts already uses.
//
// "Negombo" translates to "මීගමුව" and "Colombo" translates to "කොළඹ", the
// same Sinhala names contact's, pharmacy's and network's own content.si.ts
// already use for the first of them.
//
// "10,000 LKR" keeps its currency code and figure exactly as content.ts
// prints them: a currency code is not a word with a Sinhala equivalent, the
// same way a phone number or an href is not.
//
// Sentence forms use the polite plural ("කරන්න"), which is how a hospital
// addresses a patient it has not met.
//
// Only translatable copy lives here. Every href, value, glyph and ordinal
// "no" stays in content.ts and has exactly one home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {};

/** Scrolling strip along the bottom of the hero. */
export const tickerItems: readonly string[] = [
  "Bandaranaike International සිට විනාඩි දහයයි",
  "අපගේම Ambulance එක Transfer සඳහා ලබාගත හැක",
  "ඉල්ලීම මත Interpreters ලා",
  "Insurance ලේඛන Desk එකේදීම සකසනවා",
  "කාමරයේ Attendant කෙනෙක් ඉන්නවා",
  "Records ඔබේ ගෙදර වෛද්‍යවරයාට යවනවා",
];

/** Fact strip along the bottom of the hero. */
export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const jumpCards = [
  { count: "පියවර 6ක්", note: "පළමු Email එකේ සිට ආපසු Flight එක දක්වා." },
  { count: "සේවා 10ක්", note: "ප්‍රවාහනය, Interpreters ලා, Insurance, වාර්තා." },
  { count: "ලිඛිතව", note: "මිනිසුන් මෙහි එන්නේ ඇයි, කොපමණ කාලයක්ද." },
  { count: "පිළිතුරු 10ක්", note: "පැමිණීම, Insurance, Records, ආපසු යාම." },
];

/** The numbered eyebrow above every section heading. */
export const sectionEyebrows = {};

export const journeyHeading = {};
export const journeyIntro =
  "කිසිම කෙනෙක් Department එකෙන් Department එකට යවන්නේ නෑ. ඔබේ පළමු Email එකට පිළිතුරු දෙන Desk එකම, ඔබේ Transfer එක සකසන, ඔබ ගෙදර ගෙනියන Pack එක අවසන් කරන එකත්.";

/** `#journey`: the same six stages as the home page's international band, told
 *  in the order a travelling patient meets them. */
export const journeySteps = [
  {
    desc: "අපගේ වෛද්‍යවරයෙක් සමඟ Video එකෙන් හෝ Phone එකෙන්, දිනපතා වෙන් කරගත හැකි Consultation එකක්, ඔබ Ticket එකක් ගන්න කලින් Treatment එක ඔබත් සමඟ සාකච්ඡා කරන්න.",
    when: "පියාසර කිරීමට කලින්",
  },
  {
    desc: "Treatment එක ආරම්භ වීමට කලින් ලිඛිත Estimate එකක් ලැබෙනවා, ඇතිවිය හැකි සත්කාර ක්‍රියාවලිය ආවරණය කරමින්. ඔබේ Policy විස්තර එවන්න, Desk එක ඒ එක්කම Insurance ලේඛන සකසාවි.",
    when: "Admission එකට කලින්",
  },
  {
    desc: "Bandaranaike International Airport එකෙන් විනාඩි දහයයි, අපගේම Ambulance එක Transfer සඳහා ලබාගත හැක. ඔබේ Flight එක අපිට කියන්න, ඔබ බසින්න කලින්ම Transfer එකයි Admission එකයි සකසෙනවා.",
    when: "පැමිණෙන දිනය",
  },
  {
    desc: "Photo ID එකක්, වෛද්‍යවරයෙක් දුන්නා නම් Referral Letter එකක්, ඔබේ වර්තමාන බෙහෙත් සහ කලින් ගත් Imaging ඕනෑම දෙයක් ගෙනෙන්න. Consultation එකට සහ Consent කතාබහට ඉල්ලීම මත Interpreter කෙනෙක් සකසනවා.",
    when: "පැමිණෙන දිනය",
  },
  {
    desc: "Attendant කෙනෙක් කාමරයේ රැඳී සිටිනවා, සෑම Category එකකම Bystander ඇඳක් සහ පුටුවක් සමඟ, ආහාර වේල Dietary Order එකට අනුවයි. Critical Care එකේ සිට, පවුලේ කෙනෙකුට දිනකට වරක් යාවත්කාලීන කිරීමක් Call කරනවා.",
    when: "ඔබ රැඳී සිටින කාලය තුළ",
  },
  {
    desc: "ඔබේ Reports, Imaging සහ Discharge Summary එකේ පිටපත් සමඟ ඔබ පිටව යනවා, Follow-up දිනයක් සහිත Discharge Plan එකක් සමඟින්. ඔබේ Consent එකෙන්, එම Pack එකම ගෙදර ඔබේ වෛද්‍යවරයාට යනවා.",
    when: "ගෙදර යාම",
  },
];

export const servicesHeading = {};
export const servicesIntro =
  "එක Desk එකක් Transfer එකයි, Estimate එකයි, Insurance ලේඛනයි, Interpreter එකයි, ඔබ රැගෙන යන Records ත් බලාගන්නවා. ප්‍රධාන පිවිසුමේදී විදේශීය Desk එක ගැන අහන්න, නැත්නම් කලින් ලියන්න, ඔබ බසින්න කලින්ම ඒක සකසෙනවා.";

/** `#services`: what the international desk handles, on the dark band. */
export const deskServices = [
  {
    kind: "පියාසර කිරීමට කලින්",
    desc: "Telemedicine එකෙන් අපගේ වෛද්‍යවරයෙක් සමඟ Video එකෙන් හෝ Phone එකෙන්, දිනපතා වෙන් කරගත හැකි Consultation එකක් ලැබෙනවා. සෘජුව පරීක්ෂණයක් අවශ්‍ය නොවන කතාබහකට ගැලපෙනවා, Flight එකට කලින් බහුතරයක්ම ඒ වගේ.",
  },
  {
    kind: "ප්‍රවාහනය",
    desc: "Bandaranaike International Airport එකෙන් විනාඩි දහයයි, මධ්‍යම මීගමුවේ St. Joseph Street එකේ. අපගේම Ambulance එක Transfer සඳහා ලබාගත හැක, රෝගීන් එන Covered Bay එකෙන්ම Dispatch කරනවා.",
  },
  {
    kind: "භාෂාව",
    desc: "අපගේ Clinicians ලා English භාෂාවෙන් Consult කරනවා, ඉල්ලීම මත Interpreters සකසනවා. පියාසර කිරීමට කලින් Desk එකට කියන්න, එවිට Consultation එකට, Consent කතාබහට සහ Discharge Briefing එකට කෙනෙක් ඉන්නවා.",
  },
  {
    kind: "මුදල්",
    desc: "Treatment එක ආරම්භ වීමට කලින් ලිඛිත Estimate එකක්. Cash, Card සහ Bank Transfer සියල්ලම පිළිගැනේ, Outpatients ලාට Laboratory ගාස්තු වලින් 10%ක වට්ටමක්.",
  },
  {
    kind: "ඉන්ෂුවරන්ස්",
    desc: "ජාත්‍යන්තර Insurers ලාට සහ Travel Policies සඳහා ලේඛන සකසනවා, Claim එක ඔබට හැරදාන්නේ නැතුව Desk එකම උදව් කරමින්. Corporate Insurance එක OPD එකේදී පිළිගැනේ.",
  },
  {
    kind: "පවුල",
    desc: "සෑම කාමර Category එකකම Bystander ඇඳක් සහ පුටුවක් තියෙනවා, Attendant කෙනෙකුට රාත්‍රියත් රැඳී සිටිය හැක. Admission එකේදී සටහන් කරගත් Dietary Order එකට ආහාර සකසනවා.",
  },
  {
    kind: "පරීක්ෂණ",
    desc: "Laboratory Reports එදිනම ලැබෙනවා, වෛද්‍යවරු දෙදෙනෙක් Check කරනවා, X-ray පැයක් ඇතුලත කියවනවා, Ultrasound එක Visit එකේදීම. CT සහ MRI මෙතන කරන්නේ නෑ, Referral එකකින් සකසනවා.",
  },
  {
    kind: "ඔබ මෙහි සිටින විට",
    desc: "ප්‍රධාන පිවිසුම ලඟ නොමිලේ Parking, නොමිලේ Wifi, Cafeteria එකක්, Patient Lounge එකක්, Prayer Room එකක්, Wheelchair Access සහ නිහඬ Visiting වේලාවන්. Ground Floor එකේ පැය 24ම විවෘත Pharmacy එකක්.",
  },
  {
    kind: "ඔබ පිටව යාමෙන් පසු",
    desc: "ඔබේ Reports, Imaging Referrals සහ Discharge Summary එකේ පිටපත් ඔබත් සමඟ ගෙනියන්න, ඔබේ Consent එකෙන් එම Pack එකම ඔබේ වෛද්‍යවරයාට ගෙදරටත් යවනවා.",
  },
  {
    kind: "Follow-up සත්කාර",
    desc: "මෙහි බැලූ රෝගීන් ගෙදර ගිය පසු Follow-up සඳහා Telemedicine Use කරනවා, ඊළඟ පියවරේදීත් එකම වෛද්‍යවරයා සම්බන්ධව තියාගන්නවා.",
  },
];

/**
 * `#estimates`: what people actually travel here for. Only treatments the repo
 * publishes appear, and `stay` uses the repo's own wording rather than a night
 * count the hospital has not committed to.
 */
export const estimatesHeading = {};
export const estimatesIntro =
  "ඔබේ Reports එවන්න, Estimate එක ලිඛිතව ආපසු එනවා, ඇතිවිය හැකි සත්කාර ක්‍රියාවලිය ආවරණය කරමින්. එය Price List එකකට වඩා ඔබේ Scans අනුවයි, මොකද තීරණය කරන්නේ ඔබේ Scans නිසා.";

export const treatments = [
  {
    name: "සෞඛ්‍ය පරීක්ෂණය",
    note: "Bloods සහ Biochemistry, Urine විශ්ලේෂණය, පපුවේ X-ray සහ Report Review එකක් සමඟ වෛද්‍ය Consultation එකක්",
    stay: "Outpatient Visit එකක්",
  },
  {
    name: "Hernia අලුත්වැඩියාව",
    note: "Inguinal හෝ Umbilical, ඒක ඉක්මනින් සුවවීමට උපකාරී වෙනවානම් Laparoscopic, නැත්නම් Mesh එකක් සමඟ Open",
    stay: "Day Case එකක් හෝ එක රැයක්",
  },
  {
    name: "Gallbladder ඉවත් කිරීම",
    note: "සැලසුම් කළ Operating List එකක, ඔබේ Case එකට ගැලපෙනවානම් Laparoscopic, Consultant ලා Lead කරන Anaesthesia සමඟ",
    stay: "Day Case එකක් හෝ එක රැයක්",
  },
  {
    name: "Appendix සැත්කම",
    note: "සැලසුම් කළ හෝ හදිසි, ඕනෑම වේලාවක Surgical සහ Anaesthetic කණ්ඩායම් සූදානම්ව",
    stay: "Day Case එකක් හෝ එක රැයක්",
  },
  {
    name: "දණහිසේ හෝ උරහිසේ Arthroscopy",
    note: "Day Case Orthopaedic සැත්කම, Discharge වීමට කලින් එකඟ වූ Physiotherapy සැලැස්මක් සමඟ",
    stay: "Day Case එකක්",
  },
  {
    name: "අස්ථි බිඳීම් සකස් කිරීම",
    note: "Inpatient Orthopaedic සැත්කම, Clinic එකේම Corridor එකේදී Imaging ගනිමින්",
    stay: "ඔබේ Consultation එකේදී තහවුරු කරගනී",
  },
  {
    name: "Cataract සැත්කම",
    note: "Day Case එකක්, පළමු Visit එකේදීම Lens විකල්ප සාකච්ඡා කර, පසුදින Review එකක් සමඟ",
    stay: "Day Case එකක්",
  },
  {
    name: "Gastroscopy හෝ Colonoscopy",
    note: "Consultant Anaesthetist කෙනෙක් Sedation දෙනවා, අවශ්‍ය වුනොත් එදිනම Biopsy එකක්",
    stay: "Day Procedure එකක්",
  },
  {
    name: "Obstetrics සහ ප්‍රසූතිය",
    note: "Delivery එක දක්වාම Consultant කෙනෙක්, වෙන් වූ Obstetric Theatre එකක් සහ කාමරයේම Neonatal සහාය",
    stay: "ඔබේ Consultant සමඟ තහවුරු කරගනී",
  },
  {
    name: "Gynaecology ක්‍රියාපටිපාටි",
    note: "පළමු Visit එකේදීම Ultrasound සමඟ සතිපතා Clinics, ඉල්ලීම මත කාන්තා Staff ලා",
    stay: "Day Case එකක්",
  },
  {
    name: "ENT සැත්කම",
    note: "සතිපතා වැඩිහිටි සහ ළමා List, එකම Unit එකේදීම Audiology තක්සේරුවක් සමඟ",
    stay: "ඔබේ Consultation එකේදී තහවුරු කරගනී",
  },
];

/** Sits under the treatment rows, so the ranges above are not read as a quote. */
export const estimateNote =
  "රැඳී සිටින කාලය ඔබේ Surgeon බලාපොරොත්තු වන එකයි, පොරොන්දුවක් නෙවෙයි, ඔබේ Consultation එකේදී තහවුරු කරගනී. Treatment එක ආරම්භ වීමට කලින් ලිඛිත Estimate එකක් ලැබෙනවා, ඇතිවිය හැකි සත්කාර ක්‍රියාවලිය ආවරණය කරමින්, ඒක ලිඛිතව ලැබෙන තෙක් කිසිවක් ආරම්භ වන්නේ නෑ. CT සහ MRI මෙතන කරන්නේ නෑ, Partner Imaging Centre එකකට Referral එකකින් සකසනවා.";

/** `#rooms`: the four categories the hospital actually offers, taken from
 *  `features/facilities/data/content`. Only the standard single carries a
 *  figure, because 10,000 LKR is the sole room price the repo publishes. */
export const roomsHeading = {};
/** Sits under the shared amenity list in `#rooms`. */
export const roomsNote = "සෑම Category එකකම, Wards වල සිටම, ඉහත ලැයිස්තුව සම්මතව තියෙනවා.";

export const roomTiles = [
  {
    tier: "එක ඇඳක්",
    // "Standard", "Deluxe" and "Super Deluxe" are the hospital's own room
    // class names, kept exactly as accommodation's own content.si.ts keeps
    // them. See KEEPS_ENGLISH in content.i18n.test.ts.
    name: "Super Deluxe Rooms",
    desc: "Bystander ඇඳක්, Sofa එකක් සහ පුටුවක්, තේ Station එකක් සහිත Pantry ප්‍රදේශයක්, Coffee Table එකක් සහ Kettle එකක්, උදෑසන පත්තර ගෙනත් දෙනවා.",
    extra: "වෙන් වූ Steward සේවාවක්",
  },
  {
    tier: "එක ඇඳක්",
    name: "Deluxe Rooms",
    desc: "Bystander ඇඳක් සහ Sofa එකක්, තේ Station එකක් සහිත Pantry ප්‍රදේශයක්, Coffee Table එකක් සහ උණුසුම් ජල Kettle එකක්.",
    extra: "තේ Station එකක් සහිත Pantry",
  },
  {
    tier: "එක ඇඳක්",
    name: "Standard Rooms",
    desc: "Bystander ඇඳක් සහ පුටුවක්, වායු සමීකරණය, රූපවාහිනිය සහ කාමරයට අවශ්‍ය වෛද්‍ය සහාය. කෙටි ක්‍රියාපටිපාටියකට සාමාන්‍ය තේරීම.",
    extra: "10,000 LKR සිට",
  },
  {
    tier: "ඇඳ දෙකක් හෝ තුනක්",
    // Kept as "වාට්ටු", the same word navigationLabels.si.ts and
    // accommodation's own content.si.ts already use for "Wards": unlike
    // "Standard", "Deluxe" and "Super Deluxe", it is not one of the
    // hospital's own room class names, so it translates like any other word.
    name: "වාට්ටු",
    desc: "වෙන් වූ Bystander ඇඳ සහ පුටු, පෞද්ගලිකත්වය සඳහා ඇඳ Separators සහ වායු සමීකරණය, දහවල් Visiting සමඟ.",
    extra: "දහවල් Visiting",
  },
];

/** Shared by every category, so the four tiles above do not repeat them. */
export const roomStandard: readonly string[] = [
  "උණුසුම් සහ සිසිල් වතුර",
  "රූපවාහිනිය",
  "නොමිලේ Wifi",
  "වායු සමීකරණය",
  "Bystander ඇඳ සහ පුටුව",
  "පැය දෙකකට වරක් පිරිසිදු කරනවා",
  "ඕනෑම වේලාවක වෛද්‍ය සහාය",
];

export const billingIntro =
  "Treatment එක ආරම්භ වීමට කලින් ලිඛිත Estimate එකක් ලැබෙනවා, ඇතිවිය හැකි සත්කාර ක්‍රියාවලිය ආවරණය කරමින්, ඒක ඔබ ඉදිරියේ තියෙන තෙක් කිසිවක් ආරම්භ වන්නේ නෑ. පියාසර කිරීමට කලින් ඔබේ Policy විස්තර Desk එකට එවන්න, ඒ එක්කම Insurance ලේඛන සකසෙනවා.";
/** Eyebrow above `insuranceNotes` in the narrow list panel. */
export const billingSideLabel = "ඉන්ෂුවරන්ස්";

/** Chips inside the accent panel in `#insurance`. */
export const payChips: readonly string[] = [
  "Treatment එකට කලින් ලිඛිත Estimate එකක්",
  "Cash පිළිගැනේ",
  "Card ගෙවීම්",
  "Bank මාරුව",
  "Insurance ලේඛන Desk එකේදීම",
  "Outpatients ලාට Laboratory ගාස්තු වලින් 10%ක වට්ටමක්",
];

/** The list beside the accent panel in `#insurance`. */
export const insuranceNotes: readonly string[] = [
  "ජාත්‍යන්තර Insurers ලාට සහ Travel Policies සඳහා ලේඛන සකසනවා",
  "Claim එකේදී ලේඛන ඔබට හැරදාන්නේ නැතුව Desk එකම උදව් කරනවා",
  "Corporate Insurance එක OPD එකේදී පිළිගැනේ, මීගමුවේ ඒක කරන පළමු රෝහල",
  "Admission එකට ඔබේ Insurance Card එක හෝ Policy විස්තර ගෙනෙන්න",
  "හදිසි අවස්ථාවක ඔබව මුලින්ම තක්සේරු කර ස්ථාවර කරනවා, Billing එක පස්සේ Settle කරනවා",
];

export const stayHeading = {};
export const stayIntro =
  "මීගමුව නිහඬ, Walkable වෙරළබඩ නගරයක්, ගුවන් තොටුපළෙන් විනාඩි දහයයි, කොළඹින් පැයක් විතරයි. බොහෝ රෝගීන් ක්‍රියාපටිපාටියකින් පස්සේ සතියක් ගෙවන්නේ ගමන දිගටම කරගෙන යනවා වෙනුවට මෙතනයි.";
export const stayNote =
  "කිසිම දෙයක් සැලසුම් කරන්න කලින් ඔබේ Consultant ලවා අහන්න. සැත්කමකින් පසු Flying, පිහිනීම සහ දිගු ගමන් වල එයාගේම කාල රාමුවක් තියෙනවා, පිළිතුර රඳා පවතින්නේ Operation එක මතයි.";

/** `#stay`: the practical list beside the Negombo copy. */
export const practical = [
  { k: "ගුවන් තොටුපළෙන්", v: "Bandaranaike International සිට විනාඩි දහයයි" },
  { k: "අපි ඉන්නේ කොහෙද", v: "229/10 St. Joseph Street, මධ්‍යම මීගමුවේ" },
  { k: "Parking එක", v: "නොමිලේ, ප්‍රධාන පිවිසුම ලඟ" },
  { k: "Transfer එක", v: "අපගේම Ambulance එක, ඕනෑම වේලාවක ලබාගත හැක" },
  { k: "ගෙවීම", v: "Cash, Card සහ Bank Transfer සියල්ලම පිළිගැනේ" },
  { k: "වේලා කලාපය", v: "GMT ට වඩා පැය පහයි විනාඩි තිහක් ඉදිරියෙන්, Daylight Saving නෑ" },
  { k: "දේශගුණය", v: "වසර පුරාම උණුසුම් හා තෙතමනයි" },
  { k: "Pharmacy එක", v: "ස්ථානයේම, ඕනෑම වේලාවක විවෘත" },
  { k: "Attendant කෙනා", v: "සෑම කාමර Category එකකම එක් අයෙකුට රාත්‍රිය රැඳී සිටිය හැක" },
  { k: "ඕනෑම වේලාවක", v: "0117 84 84 84 අමතන්න රෝහල ලැබෙනවා" },
];

export const faq = [
  {
    q: "පියාසර කිරීමට කලින් අදහසක් ලබාගන්නේ කොහොමද?",
    a: "ඔබේ Scans, Laboratory Reports, වර්තමාන බෙහෙත් ලැයිස්තුව සහ කෙටි ඉතිහාසයක් විදේශීය Desk එකට Email කරන්න හෝ WhatsApp කරන්න, Telemedicine Consultation එකක් ඉල්ලන්න. ඒක අපගේ වෛද්‍යවරයෙක් සමඟ Video එකෙන් හෝ Phone එකෙන්, දිනපතා වෙන් කරගත හැකි Consultation එකක්, සෘජුව පරීක්ෂණයක් අවශ්‍ය නොවන කතාබහකට හරියටම ගැලපෙනවා. Treatment එක Carry කරන වෛද්‍යවරයා සමඟ සාකච්ඡා නොකර කිසිම කෙනෙක් Ticket එකක් ගන්න ඕන නෑ.",
  },
  {
    q: "රෝහල ගුවන් තොටුපළෙන් කොපමණ දුරද?",
    a: "විනාඩි දහයයි. අපි ඉන්නේ මධ්‍යම මීගමුවේ 229/10 St. Joseph Street එකේ, ඒකෙන් රෝහල තියෙන්නේ ගුවන් තොටුපළත් නගරයත් අතරයි, පැයක් ඈතින් කොළඹ නෙවෙයි. අපගේම Ambulance එක Transfer සඳහා ලබාගත හැක, රෝගීන් එන Covered Bay එකෙන්ම Dispatch කරනවා, කවුරු හරි ඔබව Drive කරනවානම් ප්‍රධාන පිවිසුම ලඟ නොමිලේ Parking තියෙනවා.",
  },
  {
    q: "Admission එකට මම මොනවද ගේන්න ඕන?",
    a: "Photo ID එකක්, කලින් මෙතන ඇවිත් තියෙනවානම් ඔබේ OPD Card එකත්. වෛද්‍යවරයෙක් දුන්නා නම් Referral Letter එකක්. ඔබේ වර්තමාන බෙහෙත්, නැත්නම් Dose සමඟ ලියපු ලැයිස්තුවක්. කලින් Test Results හෝ Imaging තියෙනවානම්, ඒකෙන් දැනටමත් කරපු වැඩ නැවත කරන්න වෙන්නේ නෑ. සහ ඔබේ Insurance Card එක හෝ Policy විස්තර, එවිට Desk එකට ලේඛන පස්සේට තියනවා වෙනුවට දැන්ම පටන් ගන්න පුළුවන්.",
  },
  {
    q: "මට English කතා කරන්න බැරි නම්?",
    a: "අපගේ Clinicians ලා English භාෂාවෙන් Consult කරනවා, ඉල්ලීම මත Interpreters සකසනවා. ඔබට ඕන භාෂාව දවසේම නෙවෙයි, පියාසර කිරීමට කලින් Desk එකට කියන්න, එවිට වැදගත් කොටස් වලට Interpreter කෙනෙක් ඉන්නවා: ඔබේ Consultation එක, ඕනෑම ක්‍රියාපටිපාටියකට කලින් Consent කතාබහ, සහ ගෙදර මොනවද කරන්නේ කියලා කියන Discharge Briefing එක.",
  },
  {
    q: "පවුලේ කෙනෙකුට මා එක්ක රැඳී සිටින්න පුළුවන්ද?",
    a: "ඔව්. Wards වල සිට Super Deluxe දක්වා සෑම කාමර Category එකකම Bystander ඇඳක් සහ පුටුවක් තියෙනවා, එක් Attendant කෙනෙකුට රාත්‍රිය රැඳී සිටිය හැක. Admission එකේදී සටහන් කරගත් Dietary Order එකට ආහාර සකසනවා. සාමාන්‍ය Wards දහවල් Visiting සඳහා විවෘතයි; Critical Care Visiting Unit Desk එක තහවුරු කරන නිශ්චිත වේලාවන් වලට සීමායි, පවුලේ කෙනෙකුට Unit එකෙන් දිනකට වරක් යාවත්කාලීන කිරීමක් Call කරනවා.",
  },
  {
    q: "මගේ Insurance එක මෙතන වැඩ කරනවද?",
    a: "ජාත්‍යන්තර Insurers ලාට සහ Travel Policies සඳහා ලේඛන සකසනවා, Claim එකේදී Desk එකම ඔබට උදව් කරනවා, Folder එකක් දීලා Luck එකට හරින්නේ නෑ. Corporate Insurance එක OPD එකේදී පිළිගැනේ, මීගමුවේ ඒක කරන පළමු රෝහල අපියි. පියාසර කිරීමට කලින් ඔබේ Policy විස්තර Desk එකට එවන්න, ඔබ කොහෙද ඉන්නේ කියලා දැනගන්න, Admission එකට Card එකත් ගෙනෙන්න.",
  },
  {
    q: "කොපමණ මුදලක් වැයවේද?",
    a: "Treatment එක ආරම්භ වීමට කලින් ලිඛිත Estimate එකක් ලැබෙනවා, ඇතිවිය හැකි සත්කාර ක්‍රියාවලිය ආවරණය කරමින්, ඒක ලැබෙන තෙක් කිසිවක් ආරම්භ වන්නේ නෑ. එය Operation එක, ඔබ තෝරාගන්නා කාමරය සහ රැඳී සිටින කාලය මතයි, ඒකයි Estimate එක Price List එකකට වඩා ඔබේ Reports අනුව එන්නේ. Standard Single එකකට කාමර 10,000 LKR සිට ආරම්භ වේ, Outpatients ලාට Laboratory ගාස්තු වලින් 10%ක වට්ටමක්.",
  },
  {
    q: "මට මෙතන CT හෝ MRI Scan එකක් කරගන්න පුළුවන්ද?",
    a: "ස්ථානයේ නෑ. CT සහ MRI Partner Imaging Centre එකකට Referral එකකින් සකසනවා, එය සංවිධානය කරගන්න ඔබව යවනවා වෙනුවට Desk එකම ඔබේ සත්කාරයේ කොටසක් විදිහට Book කරනවා. අනිත් හැමදේම මෙතන තියෙනවා: Digital X-ray පැයක් ඇතුලත කියවා, Report කර, රාත්‍රියටත් ලබාගත හැක, Ultrasound Visit එකේදීම, Laboratory වැඩ එදිනම Report කර, සෑම Report එකක්ම වෛද්‍යවරු දෙදෙනෙක් Check කරලා.",
  },
  {
    q: "මම ගෙදර මොනවද අරගෙන යන්නේ?",
    a: "ඔබේ Reports, Imaging Referrals සහ Discharge Summary එකේ පිටපත්, Follow-up දිනයක් සහිත Discharge Plan එකක් සමඟින්, කෙනෙක්ව බලන්න කියන අපැහැදිලි උපදෙසක් නෙවෙයි. ඔබේ Consent එකෙන් එම Pack එකම ඔබේ වෛද්‍යවරයාට ගෙදරටත් යවනවා, එහෙනම් ඔබව ඊළඟට බලන කෙනා මෙතන ඇත්තටම වුනු දේ අනුවම වැඩ කරනවා.",
  },
  {
    q: "සැත්කමකින් පස්සේ මට කොපමණ ඉක්මනින් ගෙදර පියාසර කරන්න පුළුවන්ද?",
    a: "ඒක තියෙන්නේ Operation එක මතම, ඒ නිසා ආපසු Ticket එක Book කරන්න කලින් ඔබේ Surgeon ලවා අහන්න, වෙනස් කරගත හැකි Ticket එකක් තෝරන්න. Recovery එක ඔබේ Flight එකට වඩා දිගු වුනොත්, ඔබ ගමන් කරාට පස්සේත් Telemedicine එකයි එකම වෛද්‍යවරයා සම්බන්ධව තියාගන්නේ: Video එකෙන් හෝ Phone එකෙන් දිනපතා වෙන් කරගත හැකි Review එකක්, ඔබේ Chart එක කවදාවත් නොදැක්ක කෙනෙක් සමඟ අලුතින් පටන් ගන්නවා වෙනුවට.",
  },
];

export const enquiryHeading = {};
export const enquiryIntro =
  "ඔබේ Scans, Reports, වර්තමාන බෙහෙත් සහ කෙටි ඉතිහාසයක් Email කරන්න හෝ WhatsApp කරන්න. නිවැරදි වෛද්‍යවරයා සමඟ Video එකෙන් හෝ Phone එකෙන් Consultation එකක් Desk එක සකසනවා, කිසිවක් Book කරන්න කලින් ලිඛිත Estimate එකත් එනවා.";

/** Chips inside the accent panel in `#enquiry`. */
export const enquiryChips: readonly string[] = [
  "Scans සහ Reports",
  "වර්තමාන බෙහෙත්",
  "Photo ID හෝ Passport",
  "Insurance විස්තර",
];

/** The three direct contacts, in the order the reference stacks them. `[2]`
 *  used to carry the hospital's own phone number as its whole `label`, with
 *  no separate value: see the file header and `EnquiryContactRow` in
 *  `types.ts`. */
export const enquiryContactRows = [
  {},
  {},
  {},
];

/** The last row in `#enquiry`, a next/link to the services directory. */

