// Sinhala for the pharmacy page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns and
// product-adjacent terms stay in English rather than being replaced by
// literary coinages nobody says out loud. So "Counter", "Prescription",
// "Delivery", "Pharmacist", "Order", "Record", "File", "Stock" and "WhatsApp"
// stay in English throughout, and "Send", "Call", "Check" and "Book" stay
// verbs, exactly as they are in contact's, accommodation's and home-care's
// own content.si.ts.
//
// Sentence forms use the polite plural ("කරන්න"), which is how a hospital
// addresses a patient it has not met.
//
// Medicine names, dosage forms and category tags in `stock` and `refills`
// stay in English throughout ("Antibiotics", "Blood pressure", "Rx only"),
// which is how a Sri Lankan pharmacist writes and says them: see
// `KEEPS_ENGLISH` in content.i18n.test.ts for the full list, with a reason.
//
// `jumpCards[3].count` ("Digital") is also in `KEEPS_ENGLISH`: it is the
// established loanword the about page already uses for a digital record,
// with no natural Sinhala word for a one-line stat badge.
//
// `hero.call.value` and `bookActions[1].value` are the one field this file
// never carries: the counter's own phone number has nothing to translate, so
// both are excluded in `isUntranslatable` in content.i18n.test.ts rather than
// repeated here as a second and third copy of the same digits.
//
// "229/10 St. Joseph Street" in `bookIntro` never changes script: it is the
// address a driver is shown, and "Negombo" translates to "මීගමුව" because
// that is a place name, not the hospital's own name or street.
//
// Only translatable copy lives here. Every href, count kept for its own
// reason, glyph name and fact value stays in content.ts and has exactly one
// home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {};

export const sectionEyebrows = {};

export const tickerItems: readonly string[] = [
  "Pharmacist කෙනෙක් Counter එකේ, පැය 24ම",
  "හැම Order එකක්ම ඔබේ Hospital File එකට බලනවා",
  "Authorized Stock විතරයි, Substitutes නෑ",
  "මීගමුව පුරාම Delivery",
  "ඔබේ Prescription එක WhatsApp කරන්න",
];

export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const jumpCards = [
  {
    count: "Counter එකක්",
    note: "Ground Floor එකේ, රෑ පැය 24ම Open.",
  },
  {
    count: "වර්ග 10ක්",
    note: "Prescription, Over The Counter බෙහෙත් සහ අනිත් Supplies.",
  },
  {
    count: "පියවර 4ක්",
    note: "ඔබේ Prescription එක Send කරන්න, අපි ම ගෙනත් දෙනවා.",
  },
  {
    count: "Digital",
    note: "File එකේ තියෙනවා, පත්‍රයක් නැතුවම නැවත ඉල්ලන්න පුළුවන්.",
  },
];

export const countersHeading = {};
export const countersIntro =
  "ඔබේ Order එක අපිට එන විදිහ මොකක් වුනත්, Counter එකේදී, Consultation එකකදී, හෝ Phone එකෙන්, Pharmacist කවුරුත් බලන්නේ එකම Prescription History එකයි, ඒක නිසා කිසිම එකක් දෙපාරක් Dispense වෙන්නේ නෑ.";

export const counters = [
  {
    where: "Counter එකේදී",
    name: "OPD Dispensing එක",
    desc: "Ground Floor Counter එක Clinic Patients ලා, ඇවිත් මිලදී ගන්න අය සහ Collections හසුරුවනවා. ඔබේ Prescription එක අරගෙන එන්න, නැත්නම් Consultation එකෙන්ම එවන්න, Pharmacist කෙනෙක් ඒක ඔබේ File එකට සරිලනවද බලා සකස් කරන්න කලින් Check කරනවා.",
    hours: "පැය 24ම Open",
  },
  {
    where: "Admission එකකින් පස්සේ",
    name: "Discharge එකේ බෙහෙත්",
    desc: "Admission එකකින් පස්සේ ගෙදර ගෙනියන බෙහෙත් ම Counter එකෙන්ම දෙනවා, ඔබේ Consultant ලියපු දෙයට එරෙහිව. විශ්වාසයක් නැති දෙයක් තියෙනවනම්, ගෙදර ගිහින් Label එකෙන් කියවනවා වඩා, යන්න කලින්ම කතා කරගන්න පුළුවන්.",
    hours: "පැය 24ම Open",
  },
  {
    where: "Delivery සඳහා",
    name: "Delivery කරන Orders",
    desc: "Delivery සඳහා යන Orders ම Counter එකේම තියෙන Stock එකෙන් සකස් කරනවා, ඔබ ම අරගෙන ආවත් අපි ම ගෙනත් දුන්නත් එකම Authorized බෙහෙත්. යවන්න කලින් Pharmacist කෙනෙක් හැම එකක්ම Check කරනවා.",
    hours: "දිනපතා",
  },
];

export const standardsHeading = {};
export const standardsIntro =
  "හැම Prescription එකක්ම Pack කරන්න කලින් Pharmacist කෙනෙක් ඔබේ Hospital Record එකට එරෙහිව Check කරනවා. එයාලට ඔබේ File එක Read කරන්න පුළුවන් නිසා, ඔබ ගන්න අනිත් දේකින් Interaction එකක් තියෙනවනම් ඒක Flag කරන්න, නැත්නම් ඔබේ වෛද්‍යවරයා ලියපු Dose එකට එරෙහිව Confirm කරන්න පුළුවන්.";
export const standardsNote =
  "අපි තියාගන්නේ Authorized Stock විතරයි, Substitutes නෑ, Grey Market Supply එකක් නෑ, ඒ නිසා ඔබේ Consultant ලියපු ම දෙයයි ඔබට දෙන්නේ.";

export const standards = [
  { k: "Prescription Review එක", v: "Pharmacist කෙනෙකු අතින්" },
  { k: "Check කරන්නේ", v: "ඔබේ Hospital File එකට" },
  { k: "Interaction Check එක", v: "දෙන්න කලින්" },
  { k: "Substitute බෙහෙත්", v: "පාවිච්චි කරන්නේ නෑ" },
  { k: "Supply එක", v: "Authorized Stock විතරයි" },
  { k: "Grey Market එක", v: "කවදාවත්ම නෑ" },
  { k: "Records", v: "Digital, File එකේ" },
  { k: "Counselling එක", v: "Counter එකේදී ලබාදෙනවා" },
  { k: "Delivery Orders සඳහා", v: "Dispatch කරන්න කලින් Check කරනවා" },
];

export const stockHeading = {};
export const stockIntro =
  "Prescription බෙහෙත්, හැම දාම ගන්න පුළුවන් Over The Counter Items, සහ Procedure එකකින් පස්සේ නිවසේදී රෝගීන්ට ඕන වෙන Dressings සහ Supplies.";

export const stock = [
  {
    name: "Prescription medicine",
    note: "අපේ Consultants ලා හැම Department එකකින්ම Prescribe කරන පරාසය",
    tag: "On file",
  },
  {
    name: "Antibiotics",
    note: "වැලිඩ් Prescription එකකට එරෙහිව විතරයි Dispense කරන්නේ",
    tag: "Rx only",
  },
  {
    name: "Chronic medicine",
    note: "Blood Pressure, Diabetes, Thyroid, Cardiac සහ Asthma වලට දිගටම ගන්න බෙහෙත්",
    tag: "Refillable",
  },
  {
    name: "Paediatric medicine",
    note: "ඔබේ Paediatrician ලියපු Dose එකට එරෙහිව Dispense කරනවා",
    tag: "Rx only",
  },
  {
    name: "Discharge medicine",
    note: "Admission එකකින් පස්සේ ගෙදර යද්දී ගෙනියන කෙටි Course එක",
    tag: "On file",
  },
  {
    name: "Over the counter",
    note: "Prescription එකක් නැතුවම Legal විදිහට ගන්න පුළුවන් බෙහෙත්",
    tag: "No Rx",
  },
  {
    name: "තුවාල සත්කාරය සහ Dressings",
    note: "නිවසේදී Dressing එකක් මාරු කරගන්න Dressings, Tapes සහ Antiseptics",
    tag: "No Rx",
  },
  {
    name: "First Aid දේවල්",
    note: "නිවසක හෝ Workplace එකක First Aid Kit එකේ තියෙන දේවල්",
    tag: "No Rx",
  },
  {
    name: "නිවසේ සෞඛ්‍ය Devices",
    note: "නිවසේදී Monitor කරන්න Devices, Blood Pressure Monitors සහ Thermometers වගේ",
    tag: "No Rx",
  },
  {
    name: "බබා සහ අම්මාගේ සත්කාරය",
    note: "Feeding Supplies, Nappy Care සහ Postnatal ට ඕන දේවල්",
    tag: "No Rx",
  },
];

export const deliveryHeading = {};

export const steps = [
  {
    desc: "ඔබේ Prescription එක, නැත්නම් ඒකේ පැහැදිලි Photo එකක්, Pharmacy Counter එකට WhatsApp කරන්න, නැත්නම් Call කරලා කතා කරන්න.",
  },
  {
    desc: "සකස් කරන්න කලින් Pharmacist කෙනෙක් Order එක ඔබේ Record එකට එරෙහිව Read කරනවා, Counter එකේ Order එකකට වගේම Check එකක්.",
  },
  {
    desc: "ඔබේ Order එක Counter එකේම Authorized Stock එකෙන් Fill කරනවා, ඕන නම් Over The Counter Items ම එකම Order එකට එකතු කරගන්න පුළුවන්.",
  },
  {
    desc: "මීගමුව පුරාම Delivery සඳහා Dispatch කරනවා, ඊට පස්සේ ප්‍රශ්නයක් තියෙනවනම් ඒක ම Counter එකටම යනවා.",
  },
];

export const sendingWell: string[] = [
  "පිටුවම, කොනේ ඉඳන් කොනට, හොඳ Light එකේ Photo ගන්න",
  "වෛද්‍යවරයාගේ නම, දිනය සහ අත්සන Frame එකේ ඇතුළත් කරගන්න",
  "ඔබ දිනපතා ගන්න අනිත් දේවල් ගැනත් කියන්න, එහෙනම් ඒකත් Check කරන්න පුළුවන්",
  "Pharmacist කෙනාට ප්‍රශ්නයක් ආවොත් Reach කරගන්න පුළුවන් Phone Number එකක් තියාගන්න",
];

export const deliveryFacts = [
  { k: "Coverage එක", v: "මීගමුව පුරාම" },
  { k: "දුවනවා", v: "දිනපතා" },
  { k: "Fill කරන්නේ", v: "අපේම Counter එකෙන්" },
  { k: "Prescription ටික", v: "Photos ලාත් ගන්නවා" },
  { k: "Check එක", v: "Pharmacist, Dispatch කරන්න කලින්" },
  { k: "Order කරන විදිහ", v: "WhatsApp හෝ Phone එකෙන්" },
];

export const refillsHeading = {};
export const refillsIntro =
  "ඔබ දිනපතා Blood Pressure, Diabetes, Thyroid, Asthma හෝ හෘද රෝගයට බෙහෙත් ගන්නවනම්, ඔබේ Prescription එක Digital ලෙස File එකේ තියෙනවා, ඒ නිසා හැම වෙලාවෙම Paper එක අරගෙන යන්න ඕන නෑ.";
export const refillsNote =
  "Counter එකේදී, Phone එකෙන් හෝ WhatsApp එකෙන් නැවත එකක් ඉල්ලන්න. සකස් කරන්න කලින් Pharmacist කෙනෙක් ඒක ඔබේ Record එකට එරෙහිව Check කරනවා, Delivery එකකත් එක්කම යවන්නත් පුළුවන්.";

export const refills = [
  { name: "Blood pressure", note: "දිනපතා ගන්න Maintenance බෙහෙත්" },
  { name: "Diabetes", note: "බීමට ගන්න බෙහෙත් සහ Supplies" },
  { name: "Thyroid", note: "දිනපතා ගන්න Replacement බෙහෙත්" },
  { name: "Cardiac medicine", note: "ඔබේ Consultant ලියපු විදිහට" },
  { name: "Asthma inhalers", note: "Reliever එකක් සහ Preventer එකක්" },
  { name: "Cholesterol", note: "දිනපතා ගන්න Maintenance බෙහෙත්" },
  { name: "Discharge medicine", note: "Admission එකකින් පස්සේ ගන්න කෙටි Course එක" },
];

export const safetyHeading = {};
export const safetyIntro =
  "Paper එකේ ශක්තිය විතරක් බලලා කිසිම දෙයක් දෙන්නේ නෑ. හැම Order එකක්ම මුලින්ම ඔබේ Record එකට එරෙහිව Read කරනවා, Shelf එකේ තියෙන හැම එකක්ම Authorized Stock.";

export const safety = [
  {
    name: "Authorized Supply එක",
    desc: "Counter එකේ තියෙන හැම එකක්ම Authorized Stock. Shelf එකේ තියෙන කිසිම දෙයක් Grey Market Supply එකකින් එන්නේ නෑ.",
  },
  {
    name: "Substitutes නෑ",
    desc: "ඔබේ Prescription එක ලියපු විදිහටම Dispense කරනවා. ඔබේ වෛද්‍යවරයා තෝරගත්ත එකට වෙනස් Brand එකක් හොරෙන් මාරු කරන්නේ නෑ.",
  },
  {
    name: "Pharmacist Check එක",
    desc: "ඔබ Counter එකේ ඉන්නවද, Delivery එකක් Order කරනවද කියලා මොකක් වුනත්, සකස් කරන්න කලින් Pharmacist කෙනෙක් හැම Order එකක්ම Read කරනවා.",
  },
  {
    name: "ඔබේ Hospital File එක",
    desc: "ඔබේ බෙහෙත් Dispense කරන Pharmacists ලට ඔබේ File එක බලන්න පුළුවන්, ඒ නිසා ඔබ ගන්න අනිත් දේකින් Interaction එකක් තියෙනවනම් ඔබ යන්න කලින්ම Flag කරන්න පුළුවන්.",
  },
  {
    name: "Dose Confirmation එක",
    desc: "Dose එකක් ඔබේ වෛද්‍යවරයා ලියපු දෙයට එරෙහිව Confirm කරනවා, ඒකයි Duplicate එකක් හෝ වැරදි Strength එකක් Paper එකේදීම අහුවෙන්නේ.",
  },
  {
    name: "ඔබේ Digital Records එක",
    desc: "Prescriptions ම Digital ලෙස File එකේ තියෙනවා, ඒ නිසා නැවත Order එකක් හෝ අනිත් Department එකකින් එන Query එකක් ඔබේ Paperwork එක මත රඳා නෑ.",
  },
  {
    name: "Prescription විතරක් ඕන බෙහෙත්",
    desc: "Antibiotics සහ Controlled බෙහෙත් Dispense කරන්නේ වැලිඩ් Prescription එකකට එරෙහිව විතරයි, ඉල්ලුවත් Over The Counter දෙන්නේ කවදාවත්ම නෑ.",
  },
  {
    name: "Counselling එක",
    desc: "Timing, කෑම එක්ක Interactions, Dose එකක් අමතක වුනොත් මොකද කරන්නේ, කතා කරන්න වටින Side Effects මොනවද කියලා Counter එකේදීම Explain කරනවා.",
  },
];

export const faq = [
  {
    q: "රෝහලෙන් පිටින් ඉන්න වෛද්‍යවරුන්ගේ Prescriptions Accept කරනවද?",
    a: "ඔව්. අපේම වෛද්‍යවරු ලියපු සහ අනිත් තැන්වල ඉන්න Registered Practitioner ලා ලියපු Prescriptions ම Dispense කරනවා. Original එක ගෙනියන්න, නැත්නම් පැහැදිලි Photo එකක් Send කරන්න, Dispense කරන්න කලින් අපේ Pharmacist කෙනෙක් ඒක Check කරයි.",
  },
  {
    q: "රෑට Pharmacy එක Open ද?",
    a: "ඔව්. Counter එක Ground Floor එකේ, පැය 24ම Open. ඕන වෙලාවක Collect කරගන්න පුළුවන්, ඒකයි රෑ Admission එකකින් පස්සේ Urgent Prescription එකක් ගන්න එක Simple කරන්නේ.",
  },
  {
    q: "Prescribe කරපු Exact බෙහෙත්ම මට හැම වෙලේම ලැබෙනවද?",
    a: "ඔව්. Counter එකේ තියෙන්නේ Authorized බෙහෙත් විතරයි, Substitutes නෑ, Grey Market Supply එකක් නෑ, ඒ නිසා ඔබේ Consultant ලියපු ම දෙයයි ඔබට දෙන්නේ.",
  },
  {
    q: "මම ගන්න අනිත් දේවල් Pharmacists ලා දන්නවද?",
    a: "ඔබේ බෙහෙත් Dispense කරන Pharmacists ලට ඔබේ Hospital File එක Read කරන්න පුළුවන්, ඒකෙන් අලුත් Order එකක් දෙන්න කලින් ඔබ දැනටමත් ගන්න දේකට එරෙහිව Check කරන්න පුළුවන් වෙනවා. File එකේ නැති කිසිම දෙයක් ගන්නවනම් Pharmacist කෙනාට කියන්න.",
  },
  {
    q: "නැවත Prescription එකක් ලේසියෙන් Reorder කරන්න පුළුවන්ද?",
    a: "ඔව්. Prescriptions ම Digital ලෙස File එකේ තියෙනවා, ඒ නිසා නැවත Order එකක් හැම වෙලේම Paper එක අරගෙන යාම මත රඳා නෑ. Counter එකේදී, Phone එකෙන් හෝ WhatsApp එකෙන් අහන්න.",
  },
  {
    q: "මගේ Prescription එකේ Photo එකක් Send කරන්න පුළුවන්ද?",
    a: "ඔව්. Delivery Order එකක් පටන්ගන්න පැහැදිලි Photo එකක් Accept කරනවා, Original එක ම ඔබටම ගෙනියන්න බැරි නම් ඒක උදව් වෙනවා. පිටුවම Photo ගන්න, වෛද්‍යවරයාගේ නම, දිනය සහ අත්සන ඇතුළත් කරගන්න.",
  },
  {
    q: "Delivery Cover කරන්නේ කොහෙද?",
    a: "Delivery මීගමුව Cover කරනවා, දිනපතා දුවනවා. Orders ම රෝහලේම Pharmacy Counter එකෙන් Fill කරනවා, ඒ නිසා Delivery එකේත් තියෙන්නේ Collect කරගන්න Order එකට වගේම Authorized Stock එකයි.",
  },
  {
    q: "මගේ Delivery Order එක Send කරන්න කලින් Check කරනවද?",
    a: "ඔව්. Dispatch කරන්න කලින් Pharmacist කෙනෙක් හැම Order එකක්ම Check කරනවා, Counter එකේ Order එකක් Check කරන විදිහටම. ඊට පස්සේ ප්‍රශ්නයක් තියෙනවනම් ඒක යන්නේ Counter එකටමයි, Courier කෙනාට නෙවෙයි.",
  },
  {
    q: "Over The Counter Items ත් Order කරන්න පුළුවන්ද?",
    a: "ඔව්. Over The Counter බෙහෙත් සහ Supplies ම Prescription එකක් එක්ක එකම Delivery Order එකට එකතු කරගන්න පුළුවන්. Antibiotics සහ Controlled බෙහෙත් වලට තාමත් වැලිඩ් Prescription එකක් ඕන.",
  },
];

export const bookHeading = {};

export const bookIntro =
  "229/10 St. Joseph Street, මීගමුව. Ground Floor එකේ Counter එකට එන්න, Call කරන්න, හෝ ඔබේ Prescription එක WhatsApp කරන්න.";

export const bookActions = [
  {},
  {},
  {},
];
