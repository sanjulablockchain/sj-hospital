// Sinhala for the careers page.
//
// Same code-mixed register as contact's, media's and every other page's own
// content.si.ts: the sentence is Sinhala, everyday English nouns and
// site-wide terms stay in English rather than being replaced by a literary
// coinage nobody says out loud. Sentence forms use the polite plural
// ("කරන්න"), never the familiar imperative.
//
// "MBBS", "SLMC", "BSc" and "Diploma" are registration and degree names
// throughout `jobs[*].requirements` and stay English exactly as written, the
// same class of word as any drug name or brand elsewhere on the site.
//
// `jobs[0].detail[0]` quotes the exact word ("Pharmacist") a candidate is
// asked to type into an email subject line. That quoted word is left as
// written, the same treatment the recipe gives quoted material, while the
// sentence around it translates in full.
//
// The register sweep (2026-09-09) deleted every `jobs[*].title` (a card
// title, the policy's own naming for it), taking with it the file's former
// discussion of which titles were bare occupational nouns (KEEPS_ENGLISH)
// and which translated in part: none of the six is translated any more, so
// every job title now renders in English from the base regardless of
// locale. The same sweep deleted `sharedJobTitles`' four properties (each
// one is `jobs[N].title` read back through a named export for
// `home`'s own careers teaser, so the same classification applies), leaving
// it `{}`; `departmentLabels` (the openings filter's chip row) also emptied
// entirely, `hero` emptied entirely (the rule table's "Hero sections,
// entirely" row), every `sectionEyebrows` entry, every `jumpCards[*].label`,
// `applyRows[*].label`, and every section eyebrow/heading listed in the
// array-length test below. `content.ts`'s own header note on why
// `applyRows[1]` carries a separate `value` field (the switchboard number)
// still applies: that fact has exactly one home regardless of what its
// `label` renders as.
//
// Only translatable copy lives here. Every href, id, department key, count
// derivation and structural field stays in content.ts and has exactly one
// home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const jobs = [
  {
    line: "Full Time · Shift Roster · මීගමුව",
    body: "බෙහෙත් Dispense කරනවා, බෙහෙත් පාවිච්චිය ගැන රෝගීන්ට උපදෙස් දෙනවා, Inventory එක Manage කරනවා, සහ වාට්ටු පුරාම සහ Counter එකේත් Prescribing එක ආරක්ෂිතව තියාගන්න Multidisciplinary කණ්ඩායමක් සමඟ වැඩ කරනවා.",
    requirements: [
      "Pharmacy හි Bachelor's උපාධියක්",
      "වලංගු SLMC හෝ Pharmaceutical Registration එකක්",
      "රෝහල් හෝ Retail Pharmacy අත්දැකීම් අවුරුදු එකක සිට දෙකක් දක්වා වඩාත් සුදුසුයි",
      "හොඳ Interpersonal Skills තියෙන, කණ්ඩායමක් විදිහට වැඩ කරන කෙනෙක්",
    ],
    detail: [
      'ඔබේ CV එක "Pharmacist" කියලා Subject Line එකේ දාලා info@sjhospital.lk වලට එවන්න',
      "මුලින්ම පෝස්ට් එක ගැන අහන්න ඕන නම් 074 220 8704 Call කරන්න",
      "St. Joseph Hospital, Negombo හි පිහිටා ඇත",
    ],
  },
  {
    line: "Full Time · Day Roster · මීගමුව",
    body: "විකුණුම් Strategies සකස් කරනවා, Insurance සමාගම් සමඟ Partnerships හදනවා, විය හැකි Clients සම්බන්ධ කරගන්නවා, සහ වැඩිපුර රෝගීන් දැනටමත් Insured වෙලා එන්න Cover එක Coordinate කරනවා.",
    requirements: [
      "Insurance විකුණුම්, Healthcare Marketing හෝ ව්‍යාපාර සංවර්ධනයේ අවුරුදු දෙකක් හෝ ඊට වැඩි කාලයක්",
      "සෞඛ්‍ය Insurance, Claims සහ ශ්‍රී ලංකාවේ Healthcare පරිසරය ගැන අවබෝධයක්",
      "ස්වයං Motivated, හොඳ Record Keeping පුරුදු තියෙන කෙනෙක්",
      "English සහ සිංහල දෙකෙන්ම Fluent, දෙමළ පුළුවන්නම් වාසියක්",
    ],
    detail: [
      "ඔබේ CV එක info@sjhospital.lk වලට එවන්න",
      "පෝස්ට් එක ගැන Enquiries සඳහා 074 220 8704 Call කරන්න",
      "මීගමුවේ පිහිටා ඇත",
    ],
  },
  {
    line: "Full Time · Shift Roster · මීගමුව",
    body: "Emergency ප්‍රතිකාර Unit එකේ Front Line Assessment සහ Resuscitation, මීගමුව නගරයෙන් සහ ගුවන්තොටුපළ පාරෙන් දොරින් ඇතුල් වෙන ඕන දෙයක්ම බලනවා.",
    requirements: [
      "සම්පූර්ණ SLMC Registration එකක් සහිත MBBS",
      "සම්පූර්ණ කරගත් Internship එකක්",
      "Emergency හෝ Acute Medicine අත්දැකීම වාසියක්",
    ],
    detail: [
      "Shift Roster, රාත්‍රී සහ සති අන්තවලත් ඇතුළුව",
      "Role එක Subject Line එකේ දාලා info@sjhospital.lk වලට Apply කරන්න",
    ],
  },
  {
    line: "Full Time · Shift Roster · මීගමුව",
    body: "ශල්‍ය List පුරාම Scrub සහ Circulating රාජකාරි, Post Anaesthetic Recovery එකත් සමඟ, මෙතන Operate කරන Consultant Surgeons සහ Anaesthetists සමඟ එකට වැඩ කරනවා.",
    requirements: [
      "Nursing හි Diploma හෝ BSc එකක්, ශ්‍රී ලංකා Nurses Council Registration එකක් සමඟ",
      "වාට්ටු අත්දැකීම, ශල්‍යාගාර අත්දැකීම වාසියක්",
    ],
    detail: [
      "Shift Roster, Emergency List සඳහා On Call Cover එකක් සමඟ",
      "Role එක Subject Line එකේ දාලා info@sjhospital.lk වලට Apply කරන්න",
    ],
  },
  {
    line: "Full Time · Shift Roster · මීගමුව",
    body: "පැය 24ම වැඩ කරන විද්‍යාගාරයක Haematology, Biochemistry, Microbiology සහ Serology, Emergency Unit එක Wait කරන Urgent Panels ත් ඇතුළුව.",
    requirements: [
      "Medical Laboratory Sciences හි Diploma හෝ BSc එකක්",
      "අදාළ වෙනවනම් අදාළ Council එකේ Registration එකක්",
    ],
    detail: [
      "Shift Roster, රාත්‍රීත් ඇතුළුව",
      "Role එක Subject Line එකේ දාලා info@sjhospital.lk වලට Apply කරන්න",
    ],
  },
  {
    line: "Full Time · Shift Roster · මීගමුව",
    body: "වාට්ටු, ශල්‍යාගාරය සහ Emergency Unit සඳහා Digital Radiography සහ Mobile Imaging, Radiologist විසින් Reporting සහ Ultrasound Perform කරනවා.",
    requirements: ["Radiography හි Diploma හෝ උපාධියක්", "Radiation Safety පුහුණුවක්"],
    detail: [
      "Shift Roster, රාත්‍රීත් ඇතුළුව",
      "Role එක Subject Line එකේ දාලා info@sjhospital.lk වලට Apply කරන්න",
    ],
  },
];

// Derived from `jobs[2..5].title` rather than a second literal, so a
// translated title would have exactly one home; now empty, since a job
// title is a card title and stays English (see the file header).
export const sharedJobTitles = {};

export const departmentLabels: Record<string, string> = {};

export const generalApplicationLabel = "සාමාන්‍ය අයදුම්පතක්, විශේෂිත Role එකක් නැතුව";

export const experienceOptions = [
  { label: "අලුත් උපාධිධාරී" },
  { label: "අවුරුදු 1 සිට 2 දක්වා" },
  { label: "අවුරුදු 3 සිට 5 දක්වා" },
  { label: "අවුරුදු 6 සිට 10 දක්වා" },
  { label: "අවුරුදු 10 කට වඩා" },
];

export const sourceOptions = [
  { label: "මේ Website එක" },
  { label: "අපේ Facebook හෝ LinkedIn Page එක" },
  { label: "Job Board එකක්" },
  { label: "මෙතන වැඩ කරන යාළුවෙක්" },
  { label: "ශ්‍රී ලංකාවට ආපහු එනවා" },
];

// "6 positions", "6 roles" and "5 steps" are derived from jobs.length /
// process.length in content.ts (6 and 5 respectively as of writing). If a
// vacancy or a hiring step is added or removed, these literals need updating
// to match, the same staleness risk media's own jumpCards counts carry.
export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const tickerItems = [
  "වෛද්‍ය Officers",
  "ශල්‍යාගාර Nurses",
  "Pharmacists",
  "වෛද්‍ය විද්‍යාගාර Technologists",
  "Radiographers",
  "Insurance සහ බිල්පත් කිරීම",
];

export const jumpCards = [
  {
    count: "මෙතැන ඇයි",
    note: "අපිට හදන්න පුළුවන් දේ, සහ බැරි දේ.",
  },
  {
    count: "Role 6ක්",
    note: "සායනික, අනුබද්ධ සෞඛ්‍ය, Pharmacy, පරිපාලන.",
  },
  {
    count: "පියවර 5ක්",
    note: "හැම Stage එකකදීම ඔබට උත්තරයක් එනවා.",
  },
  {
    count: "වැදගත්",
    note: "අපි කවදාවත් අයදුම්කරුවෙක්ගෙන් සල්ලි ඉල්ලන්නේ නෑ.",
  },
];

export const commitments = [
  "Rosters කලින්ම Publish කරනවා, Staff අතරේ මාරු කරගන්නත් පුළුවන්",
  "උපකරණ Service Contract එකක් යටතේ, සහ තියෙන Maintenance Budget එකක්",
  "හැම New Graduate කෙනෙකුටම, පළමු මාස කිහිපය සඳහා නම් සහිත Preceptor කෙනෙක්",
  "Resuscitation Courses ඉඳන් ඉහළට, Fund කරන Certification",
  "වැටුප Interview එකේදීම විවෘතව කතා කරනවා, Letter එකේදී පුදුමයක් නෑ",
  "Safety Concern එකක් කවුරු කිව්වත් ලිඛිත උත්තරයක් ලැබෙනවා",
];

export const benefits = [
  {
    kind: "සල්ලි",
    items: [
      "සමාන පෞද්ගලික රෝහල් වලට සාපේක්ෂව Benchmark කරන ලද වැටුප",
      "EPF සහ ETF දායකත්ව නිවැරදිව සහ වේලාවට ගෙවනවා",
      "රාත්‍රී Shift සහ On Call Allowances ඔබේ Letter එකේ සඳහන් වෙනවා",
      "වාර්ෂික Increment එක Performance එකට එරෙහිව Review කරනවා, Seniority විතරක් නෙවෙයි",
    ],
  },
  {
    kind: "සෞඛ්‍ය",
    items: [
      "ඔබට සහ ඔබේ ආසන්න පවුලට Medical Cover",
      "Staff ලට රෝහලේම Outpatient Consultations",
      "Investigations, Pharmacy සහ Inpatient Care සඳහා Staff Rates",
      "වාර්ෂික සෞඛ්‍ය පරීක්ෂණයක්, සහ සායනික Staff ලට Hepatitis B එන්නත",
    ],
  },
  {
    kind: "කාලය",
    items: [
      "Annual, Casual සහ Medical Leave, Statutory ප්‍රතිලාභයට හෝ ඊටත් වඩා හොඳින්",
      "සම්පූර්ණ Maternity Leave, එකඟතාවකින් Phased Return එකක් සමඟ",
      "සුදුසුකමක් සඳහා Study කරනවනම් විභාග සඳහා Study Leave",
      "අංශ කීපයකම Part Time සහ පාසල් වේලා Arrangements",
    ],
  },
  {
    kind: "වර්ධනය",
    items: [
      "සායනික Staff ලට Fund කරන Resuscitation සහ Specialty Certification",
      "දිගු කාලයක් සේවය කරන Staff ලට Sponsor කරන Diploma සහ කෙටි කාලීන Course Study",
      "පැමිණෙන Consultants සමඟ එකට සායනික Teaching",
      "Post එකක් Open වෙනකොට ශල්‍යාගාරයට, විද්‍යාගාරයට හෝ Imaging එකට අභ්‍යන්තර Route එකක්",
    ],
  },
];

export const process = [
  {
    when: "පළමු දිනයේ",
    body: "මේ පිටුවේ Form එක පාවිච්චි කරන්න, නැත්නම් Role එක Subject Line එකේ දාලා ඔබේ CV එක Email කරන්න. ඔබට Automated Reply එකක් නෙවෙයි, කෙනෙක්ගෙන්ම Acknowledgement එකක් ලැබෙනවා.",
  },
  {
    when: "සති දෙකකින්",
    body: "අයදුම්පත් කියවන්නේ Department එකේ Head එකයි, Human Resources විතරක් නෙවෙයි. ඔබ Shortlist වුනේ නැත්නම් ඒක Email එකෙන් කියනවා, බලාගෙන ඉන්නවා වෙනුවට.",
  },
  {
    when: "එකඟතාව අනුව",
    body: "Department Head සහ Senior Clinician කෙනෙක් සමඟ Panel එකක්, ඔබේ දැනට තියෙන Post එකෙන් Leave ගන්න බල කරන්නේ නැති වේලාවක. වැටුප ගැන මේ Stage එකේදීම විවෘතව කතා කරනවා.",
  },
  {
    when: "ඒම Visit එකේදීම",
    body: "සායනික සහ තාක්ෂණික Posts සඳහා, ඇත්ත Job එකට අදාළ කෙටි Practical එකක් හෝ Scenario එකක්. ඔබ වැඩ කරන්න යන Unit එකත් පෙන්නනවා, එතන Staff එක්කත් කතා කරගන්න පුළුවන්.",
  },
  {
    when: "සතියකින්",
    body: "වැටුප, Allowances, Roster Pattern එක සහ Probation Terms සඳහන් ලිඛිත Offer එකක්. References ගන්නේ ඔබ Principle එකේ Accept කරාට පස්සේ විතරයි, ඔබ නම් කරපු Referees ලගෙන් විතරයි.",
  },
];

export const students = [
  {
    kind: "ශිෂ්‍යත්වය",
    body: "සමූහය වෛද්‍ය Career එකක් අනුගමනය කරන ශිෂ්‍යයන්ට Support කරනවා. Applications Handle කරන්නේ රෝහල නෙවෙයි සමූහයෙන්මයි, ඔබ අපිට Write කළොත් නිවැරදි Contact එකට යොමු කරන්නම්.",
    who: "වෛද්‍ය ශිෂ්‍යයන්",
  },
  {
    kind: "සායනික Placements",
    body: "Nursing පාසල් සහ අනුබද්ධ සෞඛ්‍ය Programmes වලින් ශිෂ්‍යයන් Supervised සායනික Placements සඳහා අරගෙන, නම් සහිත Supervisor කෙනෙක් සමඟ, කවුරු Free ද කියලා Shadow කරන්න දාන්නේ නැතුව.",
    who: "ආයතන සහ ශිෂ්‍යයන්",
  },
  {
    kind: "මූලික මට්ටම",
    body: "Front Office, Pharmacy Assistant සහ Support Roles අකමැත්තෙන් නෙවෙයි පාසල් අවසාන කරපු අයටත් Open, සම්පූර්ණ Training එකක් සමඟ. මෙතන Coordinators කීපදෙනෙක්ම පටන් ගත්තේ Front Desk එකෙන්මයි.",
    who: "පාසල් අවසාන කරපු අය",
  },
];

export const fraudChecks = [
  "අපි Advertise කරන්නේ මේ Website එකේ, අපේම Social Media Pages වල, සහ පිළිගත් Job Boards වල විතරයි",
  "ඇත්ත Messages එන්නේ sjhospital.lk කියලා අවසන් වෙන ලිපිනයකින්",
  "අපි කවදාවත් Application Fee එකක්, Training Deposit එකක් හෝ Agent Commission එකක් ඉල්ලන්නේ නෑ",
  "Visa එකක් හෝ Overseas Placement එකක් Process කරන්න Payment එකක් අපි කවදාවත් ඉල්ලන්නේ නෑ",
  "Offer එකකට කලින් ඔබේ Bank Details හෝ Original Certificates අපි කවදාවත් ඉල්ලන්නේ නෑ",
  "කිසියම් සැකයක් ඇත්නම්, රෝහලට 0117 84 84 84 අංකයෙන් Call කරලා අහන්න",
];

export const faq = [
  {
    q: "අලුතෙන් Qualify වුන Nurses ලා ගන්නවද?",
    a: "ඔව්. Care කරන එක නැවැත්තුව Experienced Nurse කෙනෙක්ට වඩා, Careful New Graduate කෙනෙක් ගන්නවා අපි කැමති. New Graduates පටන් ගන්නකොට නම් සහිත Preceptor කෙනෙක් සමඟ වැඩ කරනවා, ඒ කාලේදී Roster එකේ සම්පූර්ණ Staff Member කෙනෙක් විදිහට Count කරන්නේ නෑ. Specialist Areas ඉස්සරහට වාට්ටු අත්දැකීම ඉල්ලනවා, ඔබ මාරු වෙන්න Ready වෙනකොට අපි අවංකවම කියන්නම්.",
  },
  {
    q: "Rosters Handle කරන්නේ කොහොමද?",
    a: "කලින්ම Publish කරනවා, Skill Mix එක තියෙනකම් Staff අතරේම Shift Swaps කරගන්නත් පුළුවන්. කෙනාව බිඳගෙන යන්නේ නිතරම තියෙන Short Staffing එක, ඒ නිසා අපි Documented Establishment එකකට Run කරලා, Duty එකේ ඉන්න කෙනාට Absorb කරන්න කියනවා වෙනුවට Relief Staff පාවිච්චි කරනවා. සගයෙක් Sick කියලා Call කළොත්, ඒක ඔබේ නෙවෙයි Management එකේ විසඳගන්න ප්‍රශ්නයක්.",
  },
  {
    q: "Bond එකක් හෝ Training Agreement එකක් තියෙනවද?",
    a: "විශේෂිත Value එකකට වඩා Fund කරන External Courses සඳහා, Terms ලියලා තියෙන්නේ ඔබ Commit කරන්න කලින් කියවන වෙනම Agreement එකක, ඔබේ Letter Of Appointment එකේ නෑරගෙන නෙවෙයි. සාමාන්‍ය In House Induction සහ Mandatory Training සඳහා Bond එකක් නෑ. ඔබේ Original Certificates අපි කවදාවත් තියාගන්නේ නෑ.",
  },
  {
    q: "Study කරමින් වැඩ කිරීම ගැන කොහොමද?",
    a: "මෙතන Common එකක්, විවෘතව Support කරනවා. Nursing උපාධියකට, Pharmacy සුදුසුකමකට හෝ Accountancy විභාග සඳහා Study කරන Staff ට විභාග දින ආශ්‍රිතව Roster Consideration එකක් සහ විභාග සඳහාම Study Leave ලැබෙනවා. Join වෙලා පස්සේ නෙවෙයි, සම්මුඛ සාකච්ඡාවේදීම කියන්න, එතකොට Roster එක මුලසිටම ඒකට හදාගන්න පුළුවන්.",
  },
  {
    q: "විදේශයෙන් ආපහු එන ශ්‍රී ලාංකිකයන්ගෙන් Applications Accept කරනවද?",
    a: "ඇත්තටම, ඒක අපි Actively ඕන කරන Group එකක්. Gulf, United Kingdom හෝ Australia වල අත්දැකීම කියන්නේ බොහෝවිට ඔබව ඉක්මනටම Useful කරන Protocols සහ Equipment වලට Exposure එකක්, Re Registration Requirements Navigate කරගන්න අදාළ Council එකත් සමඟ අපි උදව් කරන්නම්. ඔබේ Notice Period එක කියන්න, ඒකත් සමඟ අපි වැඩ කරගන්නම්.",
  },
  {
    q: "මම Safety Concern එකක් Raise කළොත් මොකද වෙන්නේ?",
    a: "ඒක Clinical Governance Process එකෙන් යනවා, ඔබට ලිඛිත උත්තරයක් ලැබෙනවා. මේ පිටුවේ ඕන Benefit එකකටත් වඩා මේක වැදගත්: Junior Nurse කෙනෙක්ට Equipment එකක් Unsafe කියලා, හෝ වෛද්‍යවරයෙක් Error එකක් කළා කියලා කියන්නම බැරි රෝහලක් Dangerous රෝහලක්. Systems ගැන Reports Treat කරන්නේ Improvement එකක් විදිහට, Blame එකක් විදිහට නෙවෙයි.",
  },
  {
    q: "මගේ දැනට තියෙන Employer ව Contact කරනවද?",
    a: "ඔබේ ලිඛිත Permission එකක් නැතුව නෑ, Offer එකක් හදන්නත් කලින් කවදාවත් නෑ. ඔබ බලනවා කියලා දැනට තියෙන Employer ට කියලා නැත්නම් References Delicate වෙන්න පුළුවන්. ඔබේ සායනික වැඩේ දන්න Referees දෙන්නෙක් දෙන්න, ඉන් කෙනෙක්ව තාම Approach කරන්න බෑ නම් අපිට හරියටම කියන්න.",
  },
  {
    q: "මෙතන කිසිම එකක් මට Fit නම් නැත්නම්?",
    a: "කොහොමත් ඔබේ CV එක සාමාන්‍ය අයදුම්පතක් විදිහට එවන්න. අපි Applications File එකේ තියාගන්නවා, හොඳ Nursing Officer කෙනෙක් හෝ Technologist කෙනෙක් Vacancy එකක් සඳහා දිගු කාලයක් රැඳී ඉන්නේ කලාතුරකින්. ඔබ Aim කරන Department එක කියන්න, යමක් Open වෙනකොට හරි Department Head ලගටම යනවා.",
  },
];

export const formNotes = [
  "ඒක යන්නේ Human Resources ලටයි ඔබ Apply කරපු Department එකේ Head ලටයි විතරයි, තවත් කාටවත් නෑ",
  "ඔබට Automated Reply එකක් නෙවෙයි, කෙනෙක්ගෙන්ම Acknowledgement එකක් ලැබෙනවා",
  "අපි ඒක මාස 6ක් File එකේ තියාගෙන පස්සේ Delete කරනවා",
  "ඔබේ ලිඛිත Permission එකක් නැතුව ඔබේ දැනට තියෙන Employer ව කවදාවත් Contact කරන්නේ නෑ",
  "කිසිම Stage එකකදී ගාස්තුවක් නෑ. ඔබෙන් සල්ලි ඉල්ලන කවුරුත් අපි නෙවෙයි",
];

export const applyChecklist = [
  "PDF විදිහට CV එක",
  "Registration Number එක",
  "Referees දෙන්නෙක්",
  "ඉක්මනටම පටන් ගන්න පුළුවන් දිනය",
];

export const applyRows = [{}, {}, {}, {}];

export const equalOpportunity =
  "St. Joseph Hospital යනු සමාන අවස්ථා සලසන සේවායෝජකයෙක්. අපි තෝරාගන්නේ Merit එක අනුව විතරයි, ජාතිකත්වය, ආගම, ස්ත්‍රී පුරුෂ භාවය, විවාහක තත්ත්වය, වයස හෝ ආබාධිතභාවය අනුව වෙනස්කම් කරන්නේ නෑ, ඉල්ලීම මත Recruitment Process එකට සාධාරණ Adjustments කරන්නම්. කරුණාකර ඔබේ පළමු Application එකේ ඔබේ NIC පිටපත, ඡායාරූපය හෝ සෞඛ්‍ය තොරතුරු Include කරන්න එපා; ඒවා අපි Offer Stage එකේදී විතරයි ඉල්ලන්නේ.";

export const hero = {};

export const sectionEyebrows = {};

export const whySection = {
  body: "Nurse කෙනෙක් හෝ Technologist කෙනෙක් Gulf එකට Leave යනකොට, ඒක සල්ලි ගැන විතරක් වෙන්නේ අඩුවෙන්. ඒක Relief එකක් නැති පැය 12ක Shift එක, අවුරුද්දක් Broken තියෙන උපකරණ, සහ කවුරුවත් ඔබව හොඳ දෙයකට Train කරන්නේ නෑ කියන හැඟීම. ජාතික වැටුප් Market එක අපිට හදාගන්න බෑ. ඒ දේවල් තුනම අපිට හදාගන්න පුළුවන්, රෝහල ඒක උත්සාහ කරන්න Set කරලා තියෙනවා.",
};

export const fraudSection = {
  body: "ශ්‍රී ලංකාවේ False රෝහල් සහ Overseas Nursing Jobs Trade එකක් ඇත්තටම තියෙනවා, ඒක Target කරන්නේ අඩුම වශයෙන් දරාගන්න පුළුවන් අයවමයි. අපි කිසිම Stage එකකදී Application Fees, Registration Fees, Training Deposits, Agent Commissions හෝ Visa Processing සල්ලි අය කරන්නේ නෑ. මේ රෝහලෙන් කියලා කවුරුහරි ඔබෙන් Payment එකක් ඉල්ලනවනම්, ඒක Fraud එකක්. පහත Number එකෙන් අපිට Call කරලා කියන්න.",
};

export const benefitsHeading = {};
export const benefitsAside =
  "Rewarding Environment එකක් ගැන අපැහැදිලි කතාවක් නෑ. මේවා ඔබේ Letter Of Appointment එකේ තියෙන විශේෂිත දේවල්.";

export const openings = {
  positionsCountTemplate: "Positions {total} න් {shown}ක්",
  filterAriaLabel: "Department අනුව Positions Filter කරන්න",
  emptyNote:
    "මෙතන ඔබට Fit වෙන එකක් නැද්ද? කොහොමත් ඔබේ CV එක එවන්න. අපි Applications File එකේ තියාගන්නවා, හොඳ Nursing Officer කෙනෙක් හෝ Technologist කෙනෙක් Vacancy එකක් සඳහා දිගු කාලයක් රැඳී ඉන්නේ කලාතුරකින්.",
};

export const processHeading = {};
export const processIntro =
  "සම්මුඛ සාකච්ඡාවකින් පස්සේ නිහඬව තියෙන එක තමයි මේ රටේ රෝහල් බඳවා ගැනීම ගැන තියෙන Common Complaint එක. අපි ගන්නේ නැති අයටත් ඇතුළුව, අපි හැමෝටම උත්තරයක් දෙනවා.";

export const studentsHeading = {};
export const studentsAside =
  "වෛද්‍ය ක්ෂේත්‍රයට එන ශිෂ්‍යයන්ට සමූහය Support කරනවා, රෝහලේදීම අපි Trainees ලා ගන්නවා.";

export const faqHeading = {};

export const applicationHeading = {};
export const applicationAside =
  "Fields නවයක්, එකක්වත් Decorative නෑ. අපි Registration Number එකක් ඉල්ලන්නේ ඒක තමයි Department Head කෙනෙක් මුලින්ම බලන දේ නිසා.";
export const applicationEmailPrompt = "Email කරන එක වඩා ගැලපෙනවද?";
export const applicationEmailNote =
  "Role එක Subject Line එකේ දාන්න. Email එකකටත් මේ Form එකටත් තියෙන්නේ එකම වටිනාකම.";

export const applyHeading = {};
export const applyBody =
  "උඩ තියෙන Form එක පාවිච්චි කරන්න, නැත්නම් Role එක Subject Line එකේ දාලා ඔබේ CV එක Email කරන්න. ඔබේ Registration Number එකයි පටන් ගන්න පුළුවන් දිනයයි උඩම දාන්න: ඒකෙන් Emails Round එකක් Save වෙනවා.";

export const form = {
  fullNameLabel: "සම්පූර්ණ නම",
  fullNamePlaceholder: "ඔබේ Certificates වල තියෙන විදිහටම",
  roleLabel: "Apply කරන්නේ",
  rolePlaceholder: "Role එකක් තෝරන්න",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",
  phoneLabel: "Mobile",
  phonePlaceholder: "07X XXX XXXX",
  registrationLabel: "Registration Number එක",
  registrationPlaceholder: "SLMC, Nurses Council, නැත්නම් අදාළ නෑ",
  experienceLabel: "අත්දැකීම් අවුරුදු ගණන",
  experiencePlaceholder: "එකක් තෝරන්න",
  startDateLabel: "ඉක්මනටම පටන් ගන්න පුළුවන් දිනය",
  startDatePlaceholder: "දැන්මම, නැත්නම් මාසයක Notice එකකට පස්සේ",
  sourceLabel: "ඔබ මේක දැක්කේ කොහෙන්ද",
  sourcePlaceholder: "එකක් තෝරන්න",
  noteLabel: "අපි දැනගන්න ඕන දෙයක් තියෙනවද",
  notePlaceholder:
    "Study Commitments, ඔබට ඕන Shift Pattern එකක්, නැත්නම් ඔබ විශේෂයෙන් වැඩ කරන්න ඕන Unit එක. Optional.",
  cvHeading: "ඔබේ CV එක PDF විදිහට Attach කරන්න",
  cvHintDefault: "PDF එකක් Prefer කරනවා, 5 MB ට අඩුවෙන්. මේ Stage එකේදී ඔබේ NIC පිටපත හෝ ඡායාරූපයක් එවන්න එපා.",
  cvHintReattach:
    "කරුණාකර ඔබේ CV එක ආයෙත් Attach කරන්න. Fail වුන Submission එකක් හරහා File එක තියාගන්න Browser කිසිම එකක් ඉඩ දෙන්නේ නෑ.",
  cvChooseFile: "ගොනුව තෝරන්න",
  cvChangeFile: "ගොනුව මාරු කරන්න",
  consentLabel:
    "St. Joseph Hospital ට මාස 6ක් මගේ Application එක තියාගන්නත්, මේ ගැනයි සමාන Vacancies ගැනයි මාව Contact කරන්නත් පුළුවන් කියලා මම එකඟ වෙනවා. මගේ දැනට තියෙන Employer ව මගේ ලිඛිත Permission එකක් නැතුව Approach කරන්නේ නෑ.",
  submitIdle: "Application එක Submit කරන්න",
  submitPending: "යවනවා",
  submitSuccess: "Application එක ලැබුණා",
  defaultStatus: "අපි ඉස්සරහට ගෙනියන්නේ නැති ඒවා ඇතුළුව, අපි හැම Application එකකටම Reply කරනවා.",
};
