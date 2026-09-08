// Sinhala for the facilities page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns and
// clinical, engineering and business terms stay in English rather than being
// replaced by literary coinages nobody says out loud. "Consultant",
// "Anaesthesia", "Anaesthetist", "Surgical", "Recovery", "Theatre",
// "Obstetric", "Instrument", "Consumables", "Digital", "Fleet", "Dispatch",
// "Bay" and the named equipment and procedures below stay in English inside
// sentences, the same way `network`'s, `pharmacy`'s and
// `international-care`'s own content.si.ts already keep them. "Call" and
// "Track" stay verbs exactly like they are in `contact`'s and `home-care`'s
// own content.si.ts. "Instrument" and "Consumables" do NOT extend to the
// bare `theatreSpecs`/`hygieneRows` table labels: see the "Protocol"
// paragraph below, which now covers those two labels as well.
//
// "Diagnostics" already has a site-wide translation in navigationLabels.si.ts,
// so `buildingZones[2].name` reuses that exact string rather than inventing a
// second translation of the same English phrase. The register sweep
// (2026-09-09) deleted `sectionEyebrows` entirely, `buildingHeading` and
// every `jumpCards[*].label`, which used to reuse the same nav dictionary
// for "The building", "Operating theatres", "Critical care", "Rooms & wards"
// and "Ambulance & transfers": a section eyebrow, a section heading and a
// link label all go English by the rule table, so none of those strings is
// an overlay decision any more.
//
// "Standard", "Deluxe" and "Super Deluxe" are the hospital's own room class
// names, and `roomRows[0].name`, `roomRows[1].name` and `roomRows[2].name`
// keep them in English exactly as `accommodation`'s own `roomTypes[*].name`
// does; "Wards" is not one of those names, so it translates like any other
// word. Equipment and procedure names (Digital X-ray, Ultrasound, Haematology
// & biochemistry, Microbiology & cultures, Histopathology, ECG &
// echocardiography, Endoscopy, CT & MRI) stay in English throughout, the same
// way `about`'s and `international-care`'s own content.si.ts keep "Digital
// X-ray", "Gastroscopy", "Colonoscopy" and "Biopsy": this is how these are
// said in Sinhala too, not a gap. ICU, PACU and NEO are the international
// clinical unit abbreviations, kept English the same way "OPD" is. See
// KEEPS_ENGLISH in content.i18n.test.ts for the exact list.
//
// "Protocol", "Instrument sets" and "Consumables" translate to "ක්‍රමවේදය",
// "උපකරණ කට්ටල" and "පරිභෝජ්‍ය ද්‍රව්‍ය" here rather than staying English:
// unlike `network`'s own use of "Protocol" (and this file's own use of
// "Instrument Set"/"Consumables") inside a full sentence, these are bare
// table labels in `theatreSpecs`/`hygieneRows`, sitting beside fully
// translated siblings (Anaesthesia, Obstetric Theatre, Emergency Cover;
// "Recovery Bay" and "Recovery Nursing" keep their English noun but
// translate the qualifier before it), so leaving any of them alone would be
// the sibling-test miss the recipe warns about, not a genuine exception. An
// earlier pass shipped "Instrument Set" and "Consumables Stock" for these
// two labels, which differ from the English by a dropped bracket or a
// singularised word but translate nothing; fixed to real Sinhala.
//
// Sentence forms use the polite plural ("කරන්න"), which is how a hospital
// addresses a patient it has not met, the same register `contact`'s own
// content.si.ts uses throughout.
//
// Only translatable copy lives here. Every href, value, glyph, internal flag,
// ordinal numeral, image path, alt text and price stays in content.ts and has
// exactly one home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {};

export const sectionEyebrows = {};

export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const tickerItems: readonly string[] = [
  "වහලක් සහිත Ambulance Bay එක",
  "රසායනාගාරය පැය 24ම විවෘත",
  "Sterile Instrument Sets Track කරයි",
  "සෑම කාමරයකම Attendant සඳහා ඉඩ",
  "නොමිලේ Parking සහ Wifi",
  "සෑම පැය 2කින්ම පිරිසිදු කරයි",
];

export const jumpCards = [
  {
    count: "තට්ටු 6ක්",
    note: "කුමන අංශ එකට ඉඳන්නේ, ඇයි කියලා.",
  },
  {
    count: "Monitor කරන ඇඳන්",
    note: "ශල්‍යාගාර අසලින්ම දැඩි සත්කාරය.",
  },
  {
    count: "වර්ග 4ක්",
    note: "බදු වාට්ටුවක සිට Super Deluxe කාමරයක් දක්වා.",
  },
  {
    count: "පැය 24ම",
    note: "අපගේම Fleet එක, අපගේම Bay එකෙන්ම Dispatch කරයි.",
  },
];

export const buildingHeading = {};
export const buildingIntro =
  "එකට වැඩ කරන අංශ එකටම ඉන්නවා, ඒ නිසා Clinic එකකින් Order කරන Scan එකක් නගරය පුරා ගමනක් වෙන්නේ නෑ.";

export const buildingZones = [
  {
    name: "හදිසි සහ පිවිසුම",
    contents:
      "වහලක් සහිත Ambulance පිවිසුම, Resuscitation Bay එක, Admissions Desk එක, පැය 24ම විවෘත Pharmacy එකයි ප්‍රධාන දොරටුව අසල Parking එකයි.",
  },
  {
    name: "Clinics සහ Outpatients",
    contents:
      "සෑම විශේෂඥතාවකටම වෙන් වූ Consulting Suites, පැය 24ම විවෘත Outpatient අංශයක් සහ Physiotherapy.",
  },
  {
    // Reused verbatim from navigationLabels.si.ts's "Diagnostics" ->
    // "රෝග විනිශ්චය".
    name: "රෝග විනිශ්චය",
    contents:
      "පැය 24ම විවෘත රසායනාගාරයක්, Digital X-ray, Ultrasound, ECG සහ Echocardiography, සහ Endoscopy අංශය.",
  },
  {
    name: "ශල්‍යාගාර සහ සුවය ලැබීම",
    contents:
      "අසලින්ම Recovery Bay එකක් සහිත ශල්‍යාගාර, සාමාන්‍ය List වලින් වෙන් කර තියෙන විශේෂිත Obstetric Theatre එකක් සහ Sterile Services.",
  },
  {
    // Reused verbatim from navigationLabels.si.ts's "Critical care" ->
    // "දැඩි සත්කාර".
    name: "දැඩි සත්කාර",
    contents:
      "ශල්‍යාගාර සහ හදිසි අංශය අසලින්ම තියෙන Intensive Care ඇඳන්, ඕන වන අලුත උපන් දරුවන්ට Neonatal සහාය සමඟ.",
  },
  {
    name: "වාට්ටු සහ කාමර",
    contents:
      "Standard, Deluxe සහ Super Deluxe කාමර, Bed Separators සමඟ බදු වාට්ටු, Nursing Stations සහ පවුල් රැඳී සිටින ඉඩම.",
  },
];

export const showcaseCards = [
  {
    body: "පිටුපසින්ම Resuscitation Bay එකක් සහිත වහලක් සහිත පිවිසුමක්, දවසේ සෑම වේලාවකදීම Staff සිටින.",
  },
  {
    body: "Registration එකයි Admission එකයි සඳහා එක් Desk එකක්, Corridor එකකට වඩා රැඳී සිටින ස්ථානයක් වගේ ආසන සමඟ.",
  },
  {
    body: "රසායනාගාරය, Digital X-ray සහ Ultrasound තියෙන්නේ Consulting Suites සහ හදිසි අංශයේ Bay එකට මීටර ගණනකින්.",
  },
  {
    body: "රෝගියෙක් ශල්‍යාගාරයෙන් පිටවෙන හැම විටම එක් Nurse කෙනෙක් Assign කරන Recovery Bay එකක් සමඟ Operating Suites.",
  },
];

export const theatresHeading = {};
export const theatresIntro1 =
  "අපේ ශල්‍යාගාර ක්‍රියාත්මක වෙන්නේ US Surgical Protocol එකට, සෑම Instrument Set එකකම Track කිරීමක් සමඟ. Instruments සහ Consumables සෑම රෝගියෙක් සඳහාම එක් වතාවක් Use කරන, ව්‍යතිරේකයක් නැතුව.";
export const theatresIntro2 =
  "ශල්‍යාගාරයෙන් ඔබ පිටවෙන මොහොතේ සිට ඔබ වාට්ටු ඇඳකට හෝ ගෙදර යාමට සූදානම් වෙනතුරු, Recovery Nurse කෙනෙක් ඔබ Watch කරන්න Assign කරනවා. Surgical සහ Anaesthetic කණ්ඩායම් Call එකේ ඉන්නවා, ඒ නිසා හදිසි ශල්‍යකර්ම මාරු වීමකින් පසුව නෙවෙයි මෙතනදීම සිදු වෙනවා.";

export const theatreFigures = [
  { label: "සුවය ලබන කාලේ Nursing" },
  { label: "යළි භාවිත නොකරන Consumables" },
  { label: "Call එකේ ඇති ශල්‍යාගාර ආවරණය" },
];

export const theatreSpecs = [
  { k: "ක්‍රමවේදය", v: "US ප්‍රමිතිය" },
  // Was "Instrument Set": a plural-to-singular change with no actual
  // translation. As a bare table label (not the sentence usage of
  // "Instrument Set" elsewhere in this file), it sits beside four fully
  // translated siblings (ක්‍රමවේදය, නිර්වින්දනය, ප්‍රසව ශල්‍යාගාරය,
  // හදිසි ආවරණය), the same sibling-test miss the file's own comment above
  // already flags for "Protocol". Translated fully: "instrument sets".
  { k: "උපකරණ කට්ටල", v: "Set එකකට Track කරයි" },
  // Was "Consumables Stock": "Stock" does not appear in the English base at
  // all, it was added to make the string differ from "Consumables" without
  // translating anything. Translated fully: "consumable materials", the
  // standard Sinhala technical term.
  { k: "පරිභෝජ්‍ය ද්‍රව්‍ය", v: "රෝගියෙකුට එක් වතාවක් Use කරයි" },
  { k: "නිර්වින්දනය", v: "Consultant විසින් මෙහෙයවනු ලැබේ" },
  { k: "සුවය ලබන Bay එක", v: "ශල්‍යාගාර අසලින්ම" },
  // Same translated phrase as `theatreFigures[0].label`, which content.ts's
  // own `k: theatreFigures[0].label` reuses in English: a string used twice
  // has one home, so both must read the same way here too.
  { k: "සුවය ලබන කාලේ Nursing", v: "එකකට එකක්" },
  { k: "ප්‍රසව ශල්‍යාගාරය", v: "වෙනම තියෙනවා" },
  { k: "හදිසි ආවරණය", v: "Call එකේ, පැය 24ම" },
];

export const criticalHeading = {};
export const criticalIntro =
  "Ventilation එකක් හෝ ළඟින් නිරීක්ෂණයක් ඕන රෝගීන්ට, ශල්‍යකර්මයෙන් පසු, හෝ අනිත් හැම දෙයක්ම වෙන්න කලින් Stabilise කරගන්න Monitor කරන ඇඳන්.";

export const careUnits = [
  {
    // "ICU", "PACU" and "NEO" are restated rather than omitted: KEEPS_ENGLISH
    // in content.i18n.test.ts covers these three paths (see the file
    // header), but the parity test still requires every path to be
    // explicitly filled.
    code: "ICU",
    name: "දැඩි සත්කාර ඒකකය",
    desc: "Ventilation එකක් හෝ ළඟින් නිරීක්ෂණයක් ඕන රෝගීන් සඳහා Monitor කරන ඇඳන්, ශල්‍යාගාර සහ හදිසි අංශය අසලින්ම.",
    // Own literal, matching content.ts's own `lead: "Consultant led"`. Reads
    // the same as `theatreSpecs[3].v`'s translation by coincidence of
    // wording, not because it is the same fact: this is who leads the ICU,
    // `theatreSpecs[3]` is who leads anaesthesia during surgery. Do not
    // re-weld these into a shared reference.
    lead: "Consultant විසින් මෙහෙයවනු ලැබේ",
  },
  {
    code: "PACU",
    name: "ශල්‍යකර්මයෙන් පසු සුවය ලැබීම",
    desc: "ශල්‍යාගාරයට යාබදව Recovery Bay එකක්, එතන එක් Nurse කෙනෙක් සෑම රෝගියෙකුටම Assign වෙනවා, ඔවුන් යන්න සූදානම් වෙනතුරු.",
    lead: "එකකට එකක් Nursing",
  },
  {
    code: "NEO",
    name: "අලුත උපන් සහාය",
    desc: "බබාගේ තත්ත්වය ඉල්ලුවොත් උපදින විටම Neonatal සහාය, Obstetric Theatre එකට යාබදව.",
    lead: "Paediatric කණ්ඩායම",
  },
];

export const careNotes = [
  {
    body: "Unit එක ශල්‍යාගාර සහ හදිසි අංශය අසලින්ම තියෙන නිසා, වාට්ටුවේදී හෝ ශල්‍යකර්මයෙන් පසු තත්ත්වය නරක අතට හැරෙන රෝගියෙක් වෙනත් රෝහලකට මාරු කරනවා වෙනුවට කෙලින්ම මෙතනට ගෙනියනවා.",
  },
  {
    body: "රෝගීන්ට විවේක ගන්නත් කණ්ඩායමට බාධාවකින් තොරව වැඩ කරන්නත් Unit එකට එන එක නියම වේලාවලට සීමා කරලා. දැනට ඇති වේලාවන් ICU Desk එකෙන් ඔබට කියාවි.",
  },
  {
    body: "දිනකට එක් වතාවක් පවුලේ කෙනෙකුට Call එකක් එනවා, සහ Unit Coordinator විසින් පැමිණීමේ කටයුතුත් වාට්ටු ඇඳකට ආපසු මාරු වීමත් හසුරුවනවා.",
  },
];

export const roomsHeading = {};
export const roomsIntro =
  "සෑම වර්ගයක්ම එකම පැය 2ක Cycle එකේ පිරිසිදු කරනවා. වෙනස් වෙන්නේ ඉඩකඩ, පෞද්ගලිකත්වය සහ ඔබේ පවුලට ලැබෙන ඉඩ ප්‍රමාණයයි.";

export const roomRows = [
  {
    // Restated rather than omitted: KEEPS_ENGLISH in content.i18n.test.ts
    // covers `roomRows[0].name` through `roomRows[2].name` (see the file
    // header, and `accommodation`'s own `roomTypes[*].name`), but the parity
    // test still requires every path to be explicitly filled.
    name: "Super Deluxe Rooms",
    occupancy: "ඇඳ 1ක්",
    amenities:
      "Bystander ඇඳක්, Sofa එකක් සහ පුටුවක්, Tea Station එකක් සහිත Pantry එකක්, Coffee Table එකක්, Kettle එකක්, උදෑසන පත්‍රිකා, වෙන් වූ Steward සේවාවක්",
  },
  {
    name: "Deluxe Rooms",
    occupancy: "ඇඳ 1ක්",
    amenities: "Bystander ඇඳක් සහ Sofa එකක්, Tea Station එකක් සහිත Pantry ප්‍රදේශයක්, Coffee Table එකක්, උණු වතුර Kettle එකක්",
  },
  {
    name: "Standard Rooms",
    occupancy: "ඇඳ 1ක්",
    amenities: "Bystander ඇඳක් සහ පුටුවක්, වායු සමීකරණය, රූපවාහිනිය, අවශ්‍ය වෛද්‍ය සහාය",
  },
  {
    name: "වාට්ටු",
    occupancy: "ඇඳන් 2ක් හෝ 3ක්",
    amenities:
      "එක් එක් Bystander ඇඳන් සහ පුටු, පෞද්ගලිකත්වය සඳහා Bed Separators, වායු සමීකරණය, දවාලේ පැමිණීම",
  },
];

export const roomsNote =
  "කාමර ගාස්තුව ආවරණය කරන්නේ නවාතැන සහ Nursing සත්කාරයයි. වෛද්‍ය Visits, බෙහෙත්, පරීක්ෂණ සහ ක්‍රියාපිළිවෙත් වෙනම Bill කරලා ඔබේ Interim Bill එකේ පේනවා.";

/** Shared by every category, so the table above does not repeat them. */
export const roomStandard: readonly string[] = [
  "උණු සහ සිසිල් වතුර",
  "රූපවාහිනිය",
  "නොමිලේ Wifi",
  "වායු සමීකරණය",
  "Bystander ඇඳ සහ පුටුව",
  "සෑම පැය 2කින්ම පිරිසිදු කරයි",
  "Call එකේ වෛද්‍ය සහාය",
];

export const roomExtras: readonly string[] = [
  "Super Deluxe කාමර වල වෙන් වූ Steward සේවාවක්",
  "Deluxe සහ Super Deluxe කාමර වල Tea Station එකක් සහිත Pantry ප්‍රදේශයක්",
  "Super Deluxe කාමර වල උදෑසන පත්‍රිකා",
  "වාට්ටු වලින් Discharge වන විට නොමිලේ පලතුරු හෝ Chocolate කූඩයක්",
];

export const diagnosticHeading = {};
export const diagnosticIntro =
  "Equipment එකක වටිනාකමක් නෑ එය පිටුපස තියෙන Discipline එක නැතුව. සෑම රසායනාගාර Report එකක්ම නිකුත් කරන්න කලින් වෛද්‍යවරු දෙදෙනෙක් Check කරනවා, X-rays පැයක් ඇතුළත Radiologist කෙනෙක් විසින් කියවා Report කරයි.";

export const equipment = [
  { name: "Digital X-ray", note: "Radiologist කෙනෙක් විසින් කියවා Report කරයි", avail: "පැයක් ඇතුළත" },
  { name: "Ultrasound", note: "බඩ, ගැබිනි සහ මාංශ පේශි Scanning", avail: "Visit එකේදීම" },
  {
    name: "Haematology & biochemistry",
    note: "සම්පූර්ණ රුධිර ගණනය, Metabolic සහ Biochemistry Panels",
    avail: "එදිනම",
  },
  { name: "Microbiology & cultures", note: "ආසාදන පරීක්ෂණය සහ Culture Testing", avail: "Cultures සම්පූර්ණ වූ විට" },
  { name: "Histopathology", note: "පටක සහ Biopsy විශ්ලේෂණය", avail: "අපගේ සේවාව හරහා" },
  { name: "ECG & echocardiography", note: "විවේකී ECG සහ හෘද අවදානම් තක්සේරුව", avail: "එදිනම" },
  {
    name: "Endoscopy",
    note: "Gastroscopy සහ Colonoscopy, එකම වාරයේදීම Biopsy සමඟ",
    avail: "එදිනම",
  },
  {
    name: "CT & MRI",
    note: "ස්ථානයේ කරන්නේ නෑ; Partner Imaging Centre එකකට යවයි",
    avail: "Referral එකකින්",
  },
];

export const ambulanceHeading = {};
export const ambulanceIntro1 =
  "අපගේම Ambulances Call එකේ පැය 24ම ඉඳලා, රෝගීන් එන එකම වහලක් සහිත Bay එකෙන්ම Dispatch කරනවා, එහෙනම් සත්කාරය ඔබ දොරටුවට එනකන් කලින්ම පටන් ගන්නවා.";
export const ambulanceIntro2 =
  "රසායනාගාරයයි Digital X-rayයි ඒ Bay එකට මීටර ගණනකින්, එහෙනම් ඔබව තවම Assess කරන අතරේම Bloods සහ Films ආපහු එනවා. අපි Bandaranaike International සිට විනාඩි දහයයි, අපගේම Ambulance එක Transfer සඳහා ලබාගත හැක.";

export const ambulanceCall = {};

export const ambulanceSpecs = [
  { k: "ලබාගත හැකි බව", v: "පැය 24ම" },
  { k: "Fleet එක", v: "අපගේම" },
  { k: "Dispatch වෙන්නේ", v: "අපගේම Bay එකෙන්" },
  { k: "පැමිණීමේ Bay එක", v: "වහලක් සහිත" },
  { k: "රසායනාගාරය සහ X-ray", v: "මීටර කිහිපයක් ඈතින්" },
  { k: "Airport එක", v: "විනාඩි දහයයි" },
];

export const supportHeading = {};
export const supportIntro =
  "රෝහලක් විනිශ්චය කරන්නේ මධ්‍යම රාත්‍රි තුනට. මේ අට Staff කරලා හෝ Call එකේ ඉන්නවා ඔබ එන ඕන වෙලාවකදීම.";

export const support = [
  {
    name: "අනතුරු සහ හදිසි අංශය",
    desc: "පැය 24ම Staff කරන Resuscitation Bay එකක්, Paperwork එකකට කලින්ම Triage එක පටන් ගන්නවා.",
  },
  {
    name: "රසායනාගාරය",
    desc: "සෑම වේලාවකදීම විවෘත, නිකුත් කරන්න කලින් සෑම Report එකක්ම වෛද්‍යවරු දෙදෙනෙක් Check කරනවා.",
  },
  {
    name: "Digital X-ray",
    desc: "Clinic පැය වගේම රාත්‍රියේත් ලබාගත හැක, පැයක් ඇතුළත කියවා Report කරයි.",
  },
  {
    name: "Outpatient අංශය",
    desc: "පැය 24ම විවෘත Consulting Suites, ඔබ එන ඕන වෙලාවකදීම හදිසි අංශයේ පිවිසුම අසලින්ම Staff කර.",
  },
  {
    name: "Pharmacy",
    desc: "ස්ථානයේම පැය 24ක Dispensary එකක්, එහෙනම් රාත්‍රියේ ලියපු Prescription එකක් එදින රැයේම Fill කරගන්න පුළුවන්.",
  },
  {
    name: "Ambulance යැවීම",
    desc: "රෝගීන් එන එකම වහලක් සහිත Bay එකෙන්ම Dispatch කරන අපගේම Fleet එක Call එකේ.",
  },
  {
    name: "Sterile සේවා",
    desc: "සෑම Instrument Set එකකම Track කිරීමක්, Consumables සෑම රෝගියෙක් සඳහාම ව්‍යතිරේකයක් නැතුව එක් වතාවක් Use කරයි.",
  },
  {
    name: "Call එකේ Surgical ආවරණය",
    desc: "Surgical සහ Anaesthetic කණ්ඩායම් Call එකේ, ඒ නිසා හදිසි ශල්‍යකර්ම මාරු වීමකින් පසුව නෙවෙයි මෙතනදීම සිදු වෙනවා.",
  },
];

export const hygieneHeading = {};
export const hygieneIntro =
  "ආසාදන පාලනය කියන්නේ කාල සටහනක්, Slogan එකක් නෙවෙයි. ගොඩනැගිල්ලේ සෑම මතුපිටක්ම US Specification එකකට පැය 2ක Cycle එකේ පිරිසිදු කරනවා.";
export const hygieneCaption = "Consumables එක් වතාවක් Use කරයි, කවදාවත් නැවත Use කරන්නේ නෑ";

export const hygieneRows = [
  { k: "පිරිසිදු කිරීමේ Cycle එක", v: "සෑම පැය 2කට වතාවක්" },
  { k: "ප්‍රමිතිය", v: "US Specification එකකට" },
  // Same fix, and the same reasoning, as `theatreSpecs`' own two entries
  // above: a real Sinhala translation, not just a dropped bracket or a
  // singularised word.
  { k: "පරිභෝජ්‍ය ද්‍රව්‍ය", v: "එක් වතාවක් Use කරයි, කවදාවත් නැවත නෑ" },
  { k: "උපකරණ කට්ටල", v: "Set එකකට Track කරයි" },
  { k: "ප්‍රසව ශල්‍යාගාරය", v: "සාමාන්‍ය List වලින් වෙනම" },
  { k: "රසායනාගාර Reports", v: "වෛද්‍යවරු දෙදෙනෙක් Check කරයි" },
];

export const visitorsHeading = {};
export const visitorsIntro =
  "Bandaranaike International Airport සිට විනාඩි දහයයි, මධ්‍යම මීගමුවේ St. Joseph Street එකේ.";

export const visitingRows = [
  { k: "සාමාන්‍ය වාට්ටු", v: "දවාලේ පැමිණීම" },
  { k: "දැඩි සත්කාර", v: "නියම වේලාවලට" },
  { k: "පවුලේ අයට යාවත්කාලීන කිරීම", v: "Unit එකෙන් දිනකට එක් වතාවක්" },
  { k: "Bystander", v: "රෑ රැඳී සිටින්න පුළුවන්" },
];
export const visitingNote = "වාට්ටුවේ හෝ Unit Desk එකෙන් ඔබ යාමට කලින් දැනට ඇති වේලාවන් තහවුරු කරාවි.";

export const gettingHere: readonly string[] = [
  "229/10 St. Joseph Street, මීගමුව",
  "Bandaranaike International Airport සිට විනාඩි දහයයි",
  "ප්‍රධාන පිවිසුම අසල නොමිලේ Parking",
  "Transfer සඳහා අපගේම Ambulance එක ලබාගත හැක",
];

export const comforts: readonly string[] = [
  "නොමිලේ Parking",
  "නොමිලේ Wifi",
  "Cafeteria එක",
  "රෝගී Lounge එක",
  "රෝද පුටු පිවිසුම",
  "පැය 24 Pharmacy",
  "Card ගෙවීම්",
  "නිශ්ශබ්ද පැමිණීමේ වේලා",
];

export const bookHeading = {};
export const bookIntro =
  "Reception එකේ අහන්න, අපි ඔබට කාමරයයි වාට්ටුවයි පෙන්නන්නම්. Appointment එකක් නෑ, Sales කතාවක්වත් නෑ.";

export const contactRows = [
  {},
  {},
  {},
];
