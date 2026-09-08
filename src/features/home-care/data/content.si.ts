// Sinhala for the care at home page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns and
// product-adjacent terms stay in English rather than being replaced by
// literary coinages nobody says out loud. So "Visit", "Sample",
// "Appointment", "Laboratory technician", "Pharmacy", "Counter",
// "Prescription", "Delivery", "Telemedicine", "Consultation", "Vehicle",
// "Emergency" and "Record" stay in English throughout, and "Book", "Call" and
// "Check" stay verbs exactly like they are in contact's and accommodation's
// own content.si.ts. "WhatsApp" and "Email" are the product names, kept the
// same way contact and accommodation already keep them.
//
// `contactRows[0].value` is the one field this file never carries: the
// hospital's own phone number has nothing to translate, so it is excluded in
// `isUntranslatable` in content.i18n.test.ts rather than repeated here as a
// second copy of the same digits.
//
// Sentence forms use the polite plural ("කරන්න"), which is how a hospital
// addresses a patient it has not met.
//
// Only translatable copy lives here. Every href, count, step number and
// glyph name stays in content.ts and has exactly one home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const tickerItems: readonly string[] = [
  "වෛද්‍යවරු, හෙදියන් සහ Laboratory technicians",
  "Appointment අනුව Visits",
  "වෙන් වූ Vehicles 6ක්",
  "Sample ගැනීම නිවසේදීම",
  "ඔබේ Hospital file එකට සටහන්",
  "වයෝවෘද්ධ, කුඩා දරුවන් සහ සැත්කම් පසු සත්කාර",
  "අපේම Counter එකෙන් බෙහෙත්",
  "Video සහ Phone මගින් Consultations",
];

export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const jumpCards = [
  { note: "වෛද්‍යවරු, හෙදියන් සහ Laboratory technicians ඔබේ දොරටුවටම" },
  { note: "වයෝවෘද්ධ, කුඩා දරුවන් සහ සැත්කමකින් පසු සුවය ලැබීම" },
  { note: "Samples නිවසේදීම ගන්නවා, findings ඔබේ file එකේ" },
  { note: "ඉල්ලීමක සිට Visit එකක් Record කිරීම දක්වා පියවර හතරක්" },
];

export const visitLede =
  "අපේ වෛද්‍යවරු, හෙදියන් සහ Laboratory technicians, ඔබට Personalized සත්කාරයක් ඔබේ නිවසේ පහසුවෙන්ම දෙන්න ඔබේ නිවසට එනවා.";

export const visitRoles = [
  {
    kicker: "පරීක්ෂා කර තීරණය කරයි",
    body: "රෝගියා නිවසේදීම බලනවා, සුවය ලැබීම හෝ දිගු කාලීන තත්ත්වය කෙසේ දියුණු වේද කියලා Review කරනවා, ඉන් පසු මොනවද වෙන්නේ කියලා තීරණය කරනවා. Treatment එකේ වෙනසක් අවශ්‍ය නම්, ඒක Visit එකේදීම කරනවා, රෝහලට එන එකක් බලාගෙන ඉන්නේ නැතුව.",
  },
  {
    kicker: "සත්කාර කරයි, නිරීක්ෂණය කරයි",
    body: "වාට්ටුවක අවශ්‍ය වන සත්කාරය හසුරුවනවා: Dressings, Observations, සහ Visits අතරතුර පවුලක් හසුරුවන Practical support එක. හෙදියන් නිවසේදීම Sample ගැනීමද කරනවා.",
  },
  {
    kicker: "Samples ගන්නවා",
    body: "Sample එකක් අවශ්‍ය වන විට පැමිණෙනවා, එහෙනම් නිවසේ රැඳී සිටින රෝගියාට ඒක දෙන්න යන්න ඕන නෑ. Sample එක යනවා ම Process කරන ම රෝහලේ Laboratory එකටමයි.",
  },
];

export const suitedCases = [
  {
    body: "රෝහලට එන ගමන Appointment එකටම වඩා අමාරු වන වයෝවෘද්ධ අයෙකුට, Visit එකෙන් ඒ බාධාව ම ඉවත් වෙනවා. Consultation එකේ කිසිම දෙයක් වෙනස් වෙන්නේ නෑ.",
  },
  {
    body: "සැත්කමකින් පසු සති කීපය තුළ තුවාලය බලාගෙන ඉන්න ඕන, ප්‍රශ්නවලට ඉක්මනින් උත්තර ලබාගන්න ඕන. Visit එකෙන් ඒ Review එක රෝගියා ලඟටම එනවා, එයාට ගමන යන්න බැරිම කාලේදීම.",
  },
  {
    body: "කුඩාම දරුවෙක් රෝහලට ගෙනියන එක සමහර වෙලාවට සාමාන්‍ය පරීක්ෂණයක අමාරුම කොටස. Visit එකෙන් ඒ පරීක්ෂණය දරුවා දන්නා තැනකදීම, ගමන නැතුවම, කරගන්න පුළුවන්.",
  },
  {
    body: "රෝහලට එන එකම හේතුව Sample එකක් දීම නම්, ඒ වෙනුවට Laboratory technician කෙනෙක් එනවා. Sample එක දෙකෙන් එකකදිත් යනවා ම රෝහලේ Laboratory එකටමයි.",
  },
];

export const samplingPoints: string[] = [
  "Sample එකක් අවශ්‍ය වන විට Laboratory technician කෙනෙක් Visit එකට එනවා, එහෙනම් රෝගියාට ඒක දෙන්න යන්න ඕන නෑ.",
  "Samples යනවා රෝහලේම Laboratory එකට, රෝගියා ආවත් Process කරන්නේ ඒම Laboratory එකෙන්.",
  "Findings ලියන්නේ Hospital file එකටමයි, වෙනම Report එකක් විදිහට දෙන්නේ නෑ, එහෙනම් ඊළඟට රෝගියා බලන කෙනාට ම Record එක Read කරන්න පුළුවන්.",
  "Sample ගැනීමක් අපේක්ෂා කරනවා නම්, Visit එක ඉල්ලනකොටම ඒක කියන එකෙන් හරි කෙනා Vehicle එකේ ඉන්නවා.",
];

export const samplingFacts = [
  { k: "ගන්නවා", v: "නිවසේදීම" },
  { k: "Process කරනවා", v: "Hospital Laboratory එකේ" },
  { k: "ප්‍රතිඵල", v: "ඔබේ Hospital file එකේ" },
  { k: "ඉල්ලීම", v: "Visit එකත් එක්කම කියන්න" },
];

export const handoffs = [
  {
    body: "නිවසට ගෙනියන්න ඕන දේ Visit එක විතරක් නෙවෙයි, සමහර වෙලාවට. Prescription සහ Counter බෙහෙත් රෝහලේම Pharmacy Counter එකෙන් Deliver කරනවා, පෞද්ගලිකව ගන්න එන Order එකකට Fill කරන ම Authorized Stock එකෙන්ම, එහෙම යවන්න කලින් Pharmacist කෙනෙක් Check කරනවා.",
    points: [
      "Third party කෙනෙක්ගෙන් නෙවෙයි, රෝහලේම Counter එකෙන්ම Fill කරනවා",
      "යවන්න කලින් Pharmacist කෙනෙක් Check කරනවා",
      "Photo එකක් අරගත්ත Prescription එකක් Order එකක් පටන්ගන්න ඇති",
    ],
  },
  {
    body: "හැම ප්‍රශ්නයකටම දොරකඩ කෙනෙක් ඕන නෑ. Telemedicine Consultation එකකින් Follow-up කතාවක් හෝ In-person Examination එකක් ඕන නැති ප්‍රශ්නයක් Video එකෙන් හෝ Phone එකෙන් Cover කරගන්න පුළුවන්, Prescription එකක් තිබ්බොත් ඒක කෙළින්ම Pharmacy එකට යනවා.",
    points: [
      "Video හෝ Phone, රෝගියාට ගැලපෙන එකෙන්",
      "Prescription එකක් තිබ්බොත් ඒක Pharmacy එකට යනවා, Collect කරගන්න හෝ Deliver කරගන්න",
      "රෝගියා නිවසට ගිය පසු Follow-up එකට Use කරනවා",
    ],
  },
];

export const steps = [
  {
    desc: "රෝහලට Call කරලා කවුද බලන්න ඕන, ඇයි කියලා කියන්න. Hospital file Number එක ලග තියෙනවනම් ඉතුරු දේවල් ඉක්මන් වෙනවා.",
  },
  {
    desc: "Visit එක Appointment එකකින් Arrange කරනවා, ඒකට Dedicated Vehicle එකක් සහ Visit එකට ඕන කෙනා Assign කරනවා.",
  },
  {
    desc: "එකඟ වුන වෙලාවට වෛද්‍යවරයෙක්, හෙදියෙක් හෝ Laboratory technician කෙනෙක් එනවා. Sample එකක් ඕන නම්, ඒක එතනදීම ගන්නවා.",
  },
  {
    desc: "Visit එකේ Notes කෙළින්ම Hospital file එකට ලියනවා, එහෙනම් ඊළඟට රෝගියා බලන Team එකට ම Record එක Read කරන්න පුළුවන්.",
  },
];

export const prepPoints: string[] = [
  "Visit එක ඉල්ලනකොට රෝගියාගේ Hospital file Number එක Ready කරගන්න",
  "දැන් ගන්න බෙහෙත් ලියාගන්න, Counter එකෙන් අරගත්ත ඒවත් ඇතුළුව",
  "Visit Team එකට වැඩ කරන්න පුළුවන් නිස්කලංක, Light හොඳ Space එකක් තියාගන්න",
  "Sample ගැනීමක් අපේක්ෂා කරනවද කියලා කියන්න, එහෙනම් හරි කෙනා Vehicle එකේ ඉන්නවා",
  "දවසේදී Team එකට Directions ඕන වුනොත් Phone එකක් ලග තියාගන්න",
];

export const faq = [
  {
    q: "නිවසේ Visits කාටද ඕන කරන්නේ?",
    a: "ඒවා වයෝවෘද්ධ අය, කුඩා දරුවන් සහ සැත්කමකින් පසු සුවය ලබන, ගමන අමාරු රෝගීන් සඳහායි. Visit එකක් හරි දේද කියලා විශ්වාසයක් නැත්නම්, Switchboard එකට Call කරලා අහන්න පුළුවන්.",
  },
  {
    q: "නිවසේදී Blood Sample එකක් ගන්න පුළුවන්ද?",
    a: "ඔව්. Sample එකක් ඕන වන විට Laboratory technician කෙනෙක් එනවා, ඒක යනවා රෝහලේම Laboratory එකට. Visit එක ඉල්ලනකොට Sample ගැනීමක් ඇති කියලා කියන්න, එහෙනම් හරි කෙනා එනවා.",
  },
  {
    q: "Visit එකේදී වුන දේ Regular වෛද්‍යවරයාට බලාගන්න පුළුවන්ද?",
    a: "ඔව්. Visit එකේ Notes වෙනම තියාගන්නේ නැතුව කෙළින්ම Hospital file එකට ලියනවා, එහෙනම් ඊළඟට රෝගියා බලන කෙනාට ම Record එක Read කරන්න පුළුවන්.",
  },
  {
    q: "නිවසේ Visits Cover කරන්නේ කීයක් Vehicles ද?",
    a: "නිවසේ Visits ම Purpose එකට Dedicated 6ක් Vehicles වල දුවනවා, ඒ නිසාම Visits Arrange කරන්නේ Demand එකට නෙවෙයි Appointment එකට.",
  },
  {
    q: "Visit එකත් එක්කම බෙහෙත් එවන්න පුළුවන්ද?",
    a: "බෙහෙත් Delivery එක Arrange කරන්නේ Pharmacy එකෙන්මයි, Visit Team එකෙන් නෙවෙයි. ඒක Fill කරන්නේ රෝහලේම Counter එකෙන්, යවන්න කලින් Pharmacist කෙනෙක් Check කරනවා.",
  },
  {
    q: "Emergency එකකදී නිවසේ Visit එකක් හරි දෙයක්ද?",
    a: "නෑ. නිවසේ Visit එකක් Arrange කරන්නේ Appointment එකකින්, ඒක Emergency සේවාවක් නෙවෙයි. Emergency එකකදී, රෝහලේ Switchboard එකට Call කරන්න හෝ පැය 24ම Open තියෙන Accident & Emergency එකට එන්න.",
  },
];

// `contactRows[0].value` (the phone number) is absent here on purpose: see
// the file header and `isUntranslatable` in content.i18n.test.ts.
export const contactRows = [
  {},
  {},
  {},
  {},
];

export const hero = {};

export const whoHeading = {};
export const whoIntro =
  "Visit එකක් කියන්නේ රෝහලට පැමිණීමට වඩා අඩු දෙයක් නෙවෙයි. ඒක ම කණ්ඩායම, Appointment එකම Challenge එක වුනේ නැති රෝගීන්ට විතරයි.";

export const samplingHeading = {};
export const samplingIntro =
  "රෝහලට එන්නම ඕන හේතුව Sample එකක් දීම නම්, ඒ වෙනුවට Laboratory technician කෙනෙක් එනවා.";
export const samplingLabels = { howItWorks: "වෙන්නේ මෙහෙමයි", whatIsSettled: "සහතික වූ දේ" };

export const howHeading = {};
export const readyLabel = "මේවා Ready කරගන්න";

export const faqHeading = {};

export const bookHeading = {};
export const bookIntro =
  "රෝහලට Call කරලා, Visit එක කාටද ඇයිද කියලා කියන්න, තියෙනවනම් Hospital file Number එකත් ලග තියාගන්න. Sample ගැනීමක් ඕන වෙයි කියලා හිතෙනවනම්, ඒකත් කියන්න, එහෙනම් හරි කෙනා Vehicle එකේ ඉන්නවා.";
export const emergencyNote =
  "නිවසේ Visits Arrange කරන්නේ Appointment එකකින්, ඒවා Emergency සේවාවක් නෙවෙයි. Emergency එකකදී, රෝහලට Call කරන්න හෝ පැය 24ම Open තියෙන Accident & Emergency එකට කෙළින්ම එන්න.";

export const sectionEyebrows = {};
