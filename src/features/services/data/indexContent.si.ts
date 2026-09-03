// Sinhala overlay for indexContent.ts, the services index and detail pages'
// shared copy (322 original lines plus the eyebrows, headings, paragraphs
// and two small local arrays this task moved out of the section components
// themselves; see the header comment above `hero` in indexContent.ts).
//
// Register matches the rest of the site. Several headings below reuse
// src/config/navigationLabels.si.ts verbatim rather than coining a second
// Sinhala phrase for the same nav concept: "Centres of excellence",
// "Full directory", "Admissions", "Facilities", "Diagnostics & radiology"
// and "Department of surgery" all have an exact entry there.
// "Pharmacy" is KEEPS_ENGLISH there for the same reason it is here: that is
// how a Sri Lankan reader actually sees the word. `.no`, `.href`, `.accent`,
// `.index`, `.photo` and `.photoAlt` are omitted throughout, matching
// content.i18n.test.ts's `isUntranslatable`.

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
    label: "විශිෂ්ඨතා මධ්‍යස්ථාන",
    note: "එක් ගැටලුවක් වටා සකසන ලද සත්කාරය, එක් පැමිණීමක් වටා නෙවෙයි.",
  },
  {
    count: "සේවා 36",
    label: "සම්පූර්ණ නාමාවලිය",
    note: "වේලාවන්, විෂය පථය සහ එකින් එක පටන් ගන්නා ආකාරය.",
  },
  {
    count: "මට්ටම් 3",
    label: "සෞඛ්‍ය පරීක්ෂණ",
    note: "එක උදෑසනකදී සංවිධානාත්මක පරීක්ෂණයක්.",
  },
  {
    count: "පියවර 4",
    label: "ඇතුළත් කිරීම්",
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
    ctaLabel: "Quote එකක් ඉල්ලන්න",
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
    ctaLabel: "Quote එකක් ඉල්ලන්න",
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
    ctaLabel: "Quote එකක් ඉල්ලන්න",
  },
];

export const admissionSteps = [
  {
    title: "ගැටලුව අපිට කියන්න",
    desc: "0117 84 84 84 ට Call කරන්න හෝ OPD එකට ඇවිත් ඔබේ රෝග ලක්ෂණ විස්තර කරන්න; Coordinator කෙනෙක් ඔබට හරි විශේෂඥතාව හඳුනාගන්නවා.",
  },
  {
    title: "වෛද්‍යවරයෙක් හමුවෙන්න",
    desc: "මොනවද වෙන්න ඕන කියලා Consultation එකෙන් තහවුරු කරනවා, ප්‍රයෝජනවත් නම් එදිනම පරීක්ෂණත් සකසනවා.",
  },
  {
    title: "මුලින්ම වියදම් සැලැස්මක්",
    desc: "ප්‍රතිකාර පටන් ගන්න කලින් ලිඛිත සැලැස්මක් ලැබෙනවා, එහෙනම් කිසිම දෙයක් අන්ධකාරයේ එකඟ වෙන්නේ නෑ.",
  },
  {
    title: "ප්‍රතිකාරයයි Follow Up එකයි",
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
  eyebrow: "වෛද්‍ය සේවා",
  heading: { line1: "සේවා හැමවිටම,", accentPrefix: "එකම ", accent: "වහලක් යටතේ." },
  body: "විශිෂ්ඨතා මධ්‍යස්ථාන නවයක සේවා {count}ක්: Emergency, ශල්‍ය, රෝග විනිශ්චය සහ පවුලේ සත්කාර, ඔබ ආ ගැටලුව වටා සකසන ලද, එය සුදුසුවෙන් ප්‍රතිකාර කරන අංශය වටා නෙවෙයි.",
  cta: "නාමාවලිය විවෘත කරන්න",
};

export const jumpCardsCopy = { exploreLabel: "සොයන්න" };

export const centresSection = {
  eyebrow: "01 / විශිෂ්ඨතා මධ්‍යස්ථාන",
  heading: "එක් ගැටලුවක් වටා තැනූ ඒකක නවයක්",
};

export const directory = {
  eyebrow: "02 / සම්පූර්ණ නාමාවලිය",
  headingAll: "අප ප්‍රතිකාර කරන හැම දෙයක්ම",
  headingFiltered: "{group} සේවා",
  countLine: "සේවා {total}න් {shown}ක්",
  filterAriaLabel: "මධ්‍යස්ථානය අනුව සේවා Filter කරන්න",
  readMore: "{title} ගැන තව කියවන්න",
};

export const surgicalSection = {
  eyebrow: "03 / ශල්‍ය අංශය",
  heading: { line1: "විශේෂඥතා හතක්,", line2: "එකම ශල්‍ය ප්‍රමිතියක්" },
  body: "පොදු, අස්ථි, ENT, Urological, ඇස්, Neuro- සහ Gastrointestinal ශල්‍යකර්ම හරහා විශේෂඥ Lead කරන Lists, එකින් එකට Anaesthesia සේවාවක් සහ ශල්‍යාගාරයේ සිට Discharge දක්වා Assign කළ Recovery Nurse කෙනෙක් සමඟ.",
  cta: "ශල්‍ය Consultation එකක් ඉල්ලන්න",
};

export const diagnosticsSection = {
  eyebrow: "04 / රෝග විනිශ්චය සහ විකිරණවේදය",
  heading: "රසායනාගාරය, Imaging සහ Endoscopy",
  cta: "පරීක්ෂණයක් Book කරන්න",
};

export const packagesSection = {
  eyebrow: "05 / සෞඛ්‍ය පරීක්ෂණ",
  heading: "එක උදෑසනකදී Screening",
};

export const admissionsSection = {
  eyebrow: "06 / ඇතුළත් කිරීම්",
  heading: "පියවර හතරක්, පුදුමයක් නෑ",
  bringWithYouHeading: "රැගෙන එන්න",
  paymentHeading: "ගෙවීම සහ Insurance",
  roomsHeading: "කාමර",
  roomsBody: "Attendant ඉඩක් සහිත Private සහ Semi-Private කාමර, පැය දෙකකට වරක් Sanitise කරනවා.",
  roomsCta: "කාමර බලන්න",
};

export const facilitiesSection = {
  eyebrow: "07 / පහසුකම්",
  heading: { line1: "සම්පූර්ණ රැඳී සිටීම සඳහා", line2: "තැනූ Campus එකක්" },
  comfortsHeading: "එදිනෙදා පහසුකම්",
};

export const facilityCards = [
  {
    title: "එක් Campus එකක්, මහල් හයක්",
    body: "මීගමුවේ විශේෂයෙන් තැනූ රෝහලක්, Ambulance Bay එකටයි OPD රෝගීන්ටයි වහලක් සහිත පිවිසුම් සමඟ.",
    linkLabel: "අනතුරු සහ හදිසි ප්‍රතිකාර බලන්න",
  },
  {
    title: "Reception සහ OPD",
    body: "පැය 24ම විවෘත OPD එකක්, ඔබ ඕනෑම වේලාවක ආවත් Emergency පිවිසුම ලඟින්ම සේවකයින් සිටිනවා.",
    linkLabel: "ඇතුළත් කිරීම් බලන්න",
  },
  {
    title: "වාට්ටු, කාමර සහ ICU",
    body: "රාත්‍රියකට LKR 10,000 සිට Private සහ Semi-Private කාමර, උසස් Dependency සත්කාරය සඳහා සම්පූර්ණ ICU එකක් සහිතව.",
    linkLabel: "දැඩි සත්කාර බලන්න",
  },
  {
    title: "Ambulance පිවිසුම",
    body: "අපගේම Ambulance රථ පිරිසක් සේවය කරන වහලක් සහිත පිවිසුමක්, Bandaranaike International සිට විනාඩි දහයයි.",
    linkLabel: "විදේශීය සත්කාර බලන්න",
  },
];

export const pharmacySection = {
  eyebrow: "08 / Pharmacy",
  heading: { line1: "විශ්වාස කළ හැකි බෙහෙත්,", line2: "දවල් වේවා රෑ වේවා" },
  body: "Counter එකේ තියෙන්නේ Authorized Stock විතරයි, එය භාරදෙන්න හෝ Delivery සඳහා යවන්න කලින් Pharmacist කෙනෙක් හැම Order එකක්ම ඔබේ File එකට එරෙහිව පරීක්ෂා කරනවා. Digital Records නිසා නැවත Order එකක් සරලයි, Delivery මීගමුව පුරාම නිවෙස්වලට ලඟාවෙනවා.",
  cta: "Pharmacy එකට යන්න",
};

export const pharmacyFacts = [
  { name: "වේලාවන්", note: "පැය 24ම විවෘතයි" },
  { name: "තොග", note: "Authorized බෙහෙත් විතරයි" },
  { name: "Dispatch පරීක්ෂාව", note: "මුලින්ම Pharmacist කෙනෙක් තහවුරු කරනවා" },
  { name: "ගෙන්වා දීම", note: "මීගමුව පුරාම" },
  { name: "බෙහෙත් වට්ටෝරු", note: "Digital ලෙස File කරලා තියෙනවා" },
];

export const internationalSection = {
  eyebrow: "09 / විදේශීය රෝගීන්",
  heading: "ගුවන් තොටුපළින් විනාඩි දහයයි",
};

export const bookSection = {
  // "වෙන් කිරීම" matches navigationLabels.si.ts's own FOOTER_HEADINGS
  // "Booking" entry exactly, rather than keeping "Book" English here.
  eyebrow: "10 / වෙන් කිරීම",
  heading: "ඔබට අවශ්‍ය දේ අපිට කියන්න",
  body: "පහත අංකයට Call කරන්න හෝ ඔබේ විස්තර එවන්න. Coordinator කෙනෙක් ඔබට හරි අංශය හඳුනාගෙන කිසිම දෙයක් පටන් ගන්න කලින් සැලැස්මක් තහවුරු කරයි.",
  contactCta: "අප හා සම්බන්ධ වන්න",
  browseServices: "සේවා පිරික්සන්න",
};

export const allServicesLabel = "සියලුම සේවා";

export const detailChrome = {
  aboutCoversHeading: "මෙයින් ආවරණය වන්නේ",
  aboutConditionsHeading: "වැඩිපුරම හමුවෙන තත්ත්ව",
  addressLine: "229/10 St. Joseph Street, මීගමුව",
  journeyHeading: "ඔබේ පැමිණීම, පියවරෙන් පියවර",
  prepHeading: "සූදානම් වෙන ආකාරය",
  teamHeading: "මෙම සේවාවේ කණ්ඩායම",
  relatedHeading: "අදාළ සේවා",
  faqHeading: "අහන්න කලින්ම අහපු ප්‍රශ්න",
  bookHeading: "{cta} අදම.",
  backToServices: "සියලුම සේවා වෙතට ආපහු",
};

export const internationalSteps = [
  {
    title: "ගුවන් තොටුපළේ සිට ඇඳ දක්වා",
    desc: "Bandaranaike International සිට විනාඩි දහයයි, Transfer සඳහා අපගේම Ambulance එක ලබාගත හැක.",
  },
  {
    title: "ලිඛිත Estimates",
    desc: "ප්‍රතිකාර ආරම්භයට කලින් ලිඛිත Estimate එකක් ලබාදෙනවා, ලැබෙන ප්‍රතිකාර ගමන ආවරණය කරමින්.",
  },
  {
    title: "Insurance සහ Claims",
    desc: "අපගේ Desk එක විදේශීය Insurers සඳහා Documentation සකසා Claims සඳහා සහාය දෙනවා.",
  },
  {
    title: "භාෂා සහාය",
    desc: "ඔබේ පැමිණීම පුරාම ඉල්ලුවහොත් භාෂා පරිවර්තකයින් ලබාගත හැක.",
  },
  {
    title: "ගෙදර ගෙනියන්න වාර්තා",
    desc: "ඔබ සමඟ ගෙනියන්න ඔබේ Reports, Imaging Referrals සහ Discharge Summary එකේ පිටපත්.",
  },
  {
    title: "Online Follow Up",
    desc: "ඔබ ගෙදර ගිය පසුවත් Telemedicine Consultation එකක් ඔබේ සත්කාරය දිගටම කරගෙන යනවා.",
  },
];
