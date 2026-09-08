// Sinhala overlay for indexContent.ts, the services index and detail pages'
// shared copy (322 original lines plus the eyebrows, headings, paragraphs
// and two small local arrays this task moved out of the section components
// themselves; see the header comment above `hero` in indexContent.ts).
//
// Register matches the rest of the site. "Pharmacy" stays English (as it
// does in `pharmacySection.body` and `pharmacyFacts` below) for the same
// reason `pharmacy/data/content.si.ts` keeps it: that is how a Sri Lankan
// reader actually sees the word. `.no`, `.href`, `.accent`, `.index`,
// `.photo` and `.photoAlt` are omitted throughout, matching
// content.i18n.test.ts's `isUntranslatable`.
//
// The 2026-09-09 register sweep removed every section eyebrow, section
// heading and `internationalSteps[].title` from this overlay (they render
// in English on every page now), along with the heading-reuse notes and
// the `internationalSteps[4]`/`[5]` translation fixes this header used to
// document for them.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const tickerItems: readonly string[] = [
  "විශිෂ්ඨතා මධ්‍යස්ථාන නවයක්",
  "Emergency සහ OPD හැම වේලාවකම",
  "රසායනාගාරය පැය 24ම විවෘතයි",
  "Digital X-ray විනාඩි 60කින් Report කරයි",
  "වෛද්‍යවරු දෙදෙනෙක් හැම Report එකක්ම කියවනවා",
  "විශේෂඥ වෛද්‍යවරුන් Lead කරන ශල්‍යාගාර",
  "මීගමුව පුරාම නිවසේ පැමිණීම්",
];

export const jumpCards = [
  {
    count: "ඒකක 9",
    note: "එක් ගැටලුවක් වටා සකසන ලද සත්කාරය, එක් පැමිණීමක් වටා නෙවෙයි.",
  },
  {
    count: "සේවා 36",
    note: "වේලාවන්, විෂය පථය සහ එකින් එක පටන් ගන්නා ආකාරය.",
  },
  {
    count: "මට්ටම් 3",
    note: "එක උදෑසනකදී සංවිධානාත්මක පරීක්ෂණයක්.",
  },
  {
    count: "පියවර 4",
    note: "රැගෙන එන දේ, Billing එකයි Insurance එකයි වැඩ කරන ආකාරය.",
  },
];

export const centres = [
  {
    name: "අනතුරු සහ හදිසි ප්‍රතිකාර",
    desc: "වහලක් සහිත Ambulance පිවිසුමක් පිටුපස තියෙන Resuscitation Bay එකක්, අපගේම Ambulance රථ පිරිසක් සමඟ පැය 24ම ක්‍රියාත්මක වෙනවා.",
    lead: "පැය 24ම විවෘතයි",
  },
  {
    name: "ශල්‍ය සත්කාර",
    desc: "පොදු ශල්‍යකර්මයේ සිට Neurosurgery දක්වා, විශේෂඥ වෛද්‍යවරුන් Lead කරන Operating Lists බෙදාගන්නා ශල්‍ය විශේෂඥතා හතක්.",
    lead: "විශේෂඥ Lead කරන Lists",
  },
  {
    name: "මවයි දරුවයි",
    desc: "දරුවා බිහිවෙනකන් Obstetric ප්‍රතිකාර, පළමු මිනිත්තුවේ සිටම කාමරයේම Neonatal සහාය සමඟ.",
    lead: "නම් කළ විශේෂඥවරයා",
  },
  {
    name: "ළමා සත්කාර",
    desc: "වැඩිහිටි වාට්ටුවලින් වෙන් කර, විශේෂිත Protocol එකකට එරෙහිව Assess කරන ළමුන් සහ තරුණයින්.",
    lead: "Kids & Teens protocol",
  },
  {
    name: "රසායනාගාරය",
    desc: "Haematology, Biochemistry, Microbiology සහ Histopathology, නිකුත් කිරීමට කලින් හැම Report එකක්ම වෛද්‍යවරු දෙදෙනෙක් පරීක්ෂා කරනවා.",
    lead: "එදිනම Reports",
  },
  {
    name: "විකිරණවේදය",
    desc: "Digital X-ray සහ Ultrasound, රෝගියෙක්ට ගමන් කරන්න බැරි උනොත් Portable Imaging වාට්ටුවටම ගෙනෙයි.",
    lead: "පැයකින් කියවනවා",
  },
  {
    name: "Endoscopy ඒකකය",
    desc: "සැලසුම් කළ Lists වල Gastroscopy සහ Colonoscopy, විශේෂඥ Anaesthetist කෙනෙක් විසින් Sedation ලබාදෙනවා.",
    lead: "එදිනම Reporting",
  },
  {
    name: "සුවතාවයයි සෞඛ්‍ය පරීක්ෂණයයි",
    desc: "රුධිර පරීක්ෂණ, Imaging Review සහ Consultation එකක් ආවරණය කරන ව්‍යුහගත පරීක්ෂණ මට්ටම් තුනක්, එක් පැමිණීමකින්.",
    lead: "ව්‍යුහගත පරීක්ෂණ",
  },
  {
    name: "Physiotherapy සහ තුවාල ප්‍රතිකාර",
    desc: "ශල්‍යකර්මයෙන් පසුවයි දිගුකාලීන සුවවීමටයි Physiotherapy සමඟ විශේෂිත තුවාල Clinic එකක්.",
    lead: "Rehab සහ Dressings",
  },
];

export const surgicalRows = [
  { name: "පොදු ශල්‍යකර්මය", note: "සුදුසු වුනොත් Laparoscopic" },
  { name: "අස්ථි ශල්‍යකර්මය", note: "එදින සහ ඇතුළත් රෝගී" },
  { name: "ENT ශල්‍යකර්මය සහ Audiology", note: "සතිපතා වැඩිහිටි සහ ළමා Lists" },
  { name: "Urology අංශය", note: "එදිනම Ultrasound සහ Flow Studies" },
  { name: "ඇස් ශල්‍යකර්මය සහ Cataract ශල්‍යකර්මය", note: "එදින ශල්‍යකර්මය" },
  { name: "Neurosurgery අංශය", note: "Referral එකකින්, Imaging Lead" },
  { name: "Gastrointestinal සහ Endoscopy", note: "එදිනම Reporting" },
  { name: "Anaesthesia සේවාව", note: "විශේෂඥ Lead කරන Lists" },
  { name: "ශල්‍යකර්මයෙන් පසු ප්‍රතිකාර", note: "Assign කළ Recovery Nurse" },
];

export const diagnosticRows = [
  {
    name: "Haematology සහ Biochemistry",
    note: "Full Blood Count, Metabolic සහ Biochemistry Panels",
    turnaround: "එදිනම",
  },
  {
    name: "Microbiology සහ Cultures",
    note: "Infection Screening සහ Culture Testing",
    turnaround: "Cultures සම්පූර්ණ වන විදිහට Report කරයි",
  },
  {
    name: "Histopathology සේවාව",
    note: "පටක සහ Biopsy විශ්ලේෂණය",
    turnaround: "අපගේම Histopathology සේවාව Report කරයි",
  },
  {
    name: "Digital X-ray",
    note: "Radiologist කෙනෙක් විසින් කියවලා Report කරයි",
    turnaround: "පැයකින්",
  },
  {
    name: "Ultrasound සේවාව",
    note: "Abdominal, Antenatal සහ Soft Tissue Scanning",
    turnaround: "පැමිණීමේදීම",
  },
  {
    name: "ECG සහ Echocardiography",
    note: "Resting ECG සහ හෘද අවදානම් තක්සේරුව",
    turnaround: "එදිනම",
  },
  {
    name: "Endoscopy සේවාව",
    note: "Gastroscopy සහ Colonoscopy, එම Sitting එකේම Biopsy සමඟ",
    turnaround: "එදිනම",
  },
  {
    name: "CT සහ MRI",
    note: "මෙතන සිදු කරන්නේ නෑ; Partner Imaging Centre එකකට යවනවා",
    turnaround: "Referral එකකින් සකසයි",
  },
];

export const packages = [
  {
    tier: "Essential",
    name: "මූලික සෞඛ්‍ය පරීක්ෂණය",
    items: [
      "Full Blood Count සහ සාමාන්‍ය Biochemistry",
      "මුත්‍රා සාමාන්‍ය විශ්ලේෂණය",
      "පපුවේ X-ray",
      "වෛද්‍ය Consultation සහ Report Review",
    ],
  },
  {
    tier: "වැඩිම තෝරන",
    name: "සම්පූර්ණ පරීක්ෂණය",
    items: [
      "Full Blood Count, Biochemistry සහ Lipid Profile",
      "දියවැඩියාව සහ Thyroid Screening",
      "ECG සහ Resting හෘද තක්සේරුව",
      "බඩේ Ultrasound Scan එකක්",
      "Report Review සමඟ වෛද්‍ය Consultation",
    ],
  },
  {
    tier: "Executive",
    name: "Executive සහ හෘද පරීක්ෂණය",
    items: [
      "හෘද අවදානම් Screening සමඟ සම්පූර්ණ Comprehensive Panel එකක්",
      "Echocardiography සහ ECG",
      "බඩේ Ultrasound සහ පපුවේ X-ray",
      "වෛද්‍ය සහ හෘද රෝග Consultation",
      "Follow-up සැලසුම් සමඟ විස්තරාත්මක Report Review",
    ],
  },
];

export const admissionSteps = [
  {
    desc: "0117 84 84 84 ට Call කරන්න හෝ OPD එකට ඇවිත් ඔබේ රෝග ලක්ෂණ විස්තර කරන්න; Coordinator කෙනෙක් ඔබට හරි විශේෂඥතාව හඳුනාගන්නවා.",
  },
  {
    desc: "මොනවද වෙන්න ඕන කියලා Consultation එකෙන් තහවුරු කරනවා, ප්‍රයෝජනවත් නම් එදිනම පරීක්ෂණත් සකසනවා.",
  },
  {
    desc: "ප්‍රතිකාර පටන් ගන්න කලින් ලිඛිත සැලැස්මක් ලැබෙනවා, එහෙනම් කිසිම දෙයක් අන්ධකාරයේ එකඟ වෙන්නේ නෑ.",
  },
  {
    desc: "ඔබ රැඳී සිටින්නේ පැය කිහිපයක් හෝ දින කිහිපයක් වුනත්, Admission එකයි ප්‍රතිකාරයයි Follow-up දිනයක් සහිත Discharge සැලැස්මක්.",
  },
];

export const bringWithYou = [
  "Photo ID එකයි OPD Card එකයි, තියෙනවානම්",
  "Referral Letter එකක්, වෛද්‍යවරයෙක් දුන්නානම්",
  "දැනට ගන්නා බෙහෙත් හෝ ඒවායේ ලැයිස්තුවක්",
  "කලින් කරපු පරීක්ෂණ ප්‍රතිඵල හෝ Imaging",
  "Insurance Card එක හෝ Policy විස්තර",
];

export const paymentNotes = [
  "ප්‍රතිකාර පටන් ගන්න කලින් ලිඛිත Estimate එකක් දෙනවා",
  "Cash, Card සහ Bank Transfer තුනම පිළිගන්නවා",
  "Insurance Paperwork Desk එකේදීම සකසනවා",
  "OPD රෝගීන්ට රසායනාගාර ගාස්තුවලින් 10% වට්ටමක්",
];

export const comforts = [
  "නොමිලේ Parking",
  "නොමිලේ Wifi",
  "Cafeteria එක",
  "කාමරවල Attendant ඉඩ",
  "ආහාර පාලන අනුව ආහාර",
  "යාච්ඤා කාමරය",
  "රෝද පුටු පහසුකම්",
  "Card සහ Transfer ගෙවීම්",
  "ඉල්ලුවහොත් භාෂා පරිවර්තකයින්",
  "නිශ්ශබ්ද පැමිණීමේ වේලාවන්",
];

export const hero = {
  heading: {},
};

export const jumpCardsCopy = {};

export const centresSection = {};

export const directory = {
  countLine: "සේවා {total}න් {shown}ක්",
  filterAriaLabel: "මධ්‍යස්ථානය අනුව සේවා Filter කරන්න",
};

export const surgicalSection = {
  heading: {},
  body: "පොදු, අස්ථි, ENT, Urological, ඇස්, Neuro- සහ Gastrointestinal ශල්‍යකර්ම හරහා විශේෂඥ Lead කරන Lists, එකින් එකට Anaesthesia සේවාවක් සහ ශල්‍යාගාරයේ සිට Discharge දක්වා Assign කළ Recovery Nurse කෙනෙක් සමඟ.",
};

export const diagnosticsSection = {};

export const packagesSection = {};

export const admissionsSection = {
  roomsBody: "Attendant ඉඩක් සහිත Private සහ Semi-Private කාමර, පැය දෙකකට වරක් Sanitise කරනවා.",
};

export const facilitiesSection = {
  heading: {},
};

export const facilityCards = [
  {
    body: "මීගමුවේ විශේෂයෙන් තැනූ රෝහලක්, Ambulance Bay එකටයි OPD රෝගීන්ටයි වහලක් සහිත පිවිසුම් සමඟ.",
  },
  {
    body: "පැය 24ම විවෘත OPD එකක්, ඔබ ඕනෑම වේලාවක ආවත් Emergency පිවිසුම ලඟින්ම සේවකයින් සිටිනවා.",
  },
  {
    body: "රාත්‍රියකට LKR 10,000 සිට Private සහ Semi-Private කාමර, උසස් Dependency සත්කාරය සඳහා සම්පූර්ණ ICU එකක් සහිතව.",
  },
  {
    body: "අපගේම Ambulance රථ පිරිසක් සේවය කරන වහලක් සහිත පිවිසුමක්, Bandaranaike International සිට විනාඩි දහයයි.",
  },
];

export const pharmacySection = {
  heading: {},
  body: "Counter එකේ තියෙන්නේ Authorized Stock විතරයි, එය භාරදෙන්න හෝ Delivery සඳහා යවන්න කලින් Pharmacist කෙනෙක් හැම Order එකක්ම ඔබේ File එකට එරෙහිව පරීක්ෂා කරනවා. Digital Records නිසා නැවත Order එකක් සරලයි, Delivery මීගමුව පුරාම නිවෙස්වලට ලඟාවෙනවා.",
};

export const pharmacyFacts = [
  { name: "වේලාවන්", note: "පැය 24ම විවෘතයි" },
  { name: "Stock එක", note: "Authorized බෙහෙත් විතරයි" },
  { name: "Dispatch පරීක්ෂාව", note: "මුලින්ම Pharmacist කෙනෙක් තහවුරු කරනවා" },
  { name: "Delivery එක", note: "මීගමුව පුරාම" },
  { name: "නැවත Prescriptions", note: "Digital ලෙස File කරලා තියෙනවා" },
];

export const internationalSection = {};

export const bookSection = {
  // "වෙන් කිරීම" matches navigationLabels.si.ts's own FOOTER_HEADINGS
  // "Booking" entry exactly, rather than keeping "Book" English here.
  body: "පහත අංකයට Call කරන්න හෝ ඔබේ විස්තර එවන්න. Coordinator කෙනෙක් ඔබට හරි අංශය හඳුනාගෙන කිසිම දෙයක් පටන් ගන්න කලින් සැලැස්මක් තහවුරු කරයි.",
};

export const detailChrome = {
  addressLine: "229/10 St. Joseph Street, මීගමුව",
};

export const internationalSteps = [
  {
    desc: "Bandaranaike International සිට විනාඩි දහයයි, Transfer සඳහා අපගේම Ambulance එක ලබාගත හැක.",
  },
  {
    desc: "ප්‍රතිකාර ආරම්භයට කලින් ලිඛිත Estimate එකක් ලබාදෙනවා, ලැබෙන ප්‍රතිකාර ගමන ආවරණය කරමින්.",
  },
  {
    desc: "අපගේ Desk එක විදේශීය Insurers සඳහා Documentation සකසා Claims සඳහා සහාය දෙනවා.",
  },
  {
    desc: "ඔබේ පැමිණීම පුරාම ඉල්ලුවහොත් භාෂා පරිවර්තකයින් ලබාගත හැක.",
  },
  {
    desc: "ඔබ සමඟ ගෙනියන්න ඔබේ Reports, Imaging Referrals සහ Discharge Summary එකේ පිටපත්.",
  },
  {
    desc: "ඔබ ගෙදර ගිය පසුවත් Telemedicine Consultation එකක් ඔබේ සත්කාරය දිගටම කරගෙන යනවා.",
  },
];
