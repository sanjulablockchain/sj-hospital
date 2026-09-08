// Tamil for the careers page.
//
// Same code-mixed register as contact's, media's and every other page's own
// content.ta.ts: the sentence is Tamil, everyday English nouns and site-wide
// terms stay in English rather than being replaced by a literary coinage
// nobody says out loud. Sentence forms use the polite plural
// ("செய்யுங்கள்"), never the familiar imperative.
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
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const jobs = [
  {
    line: "Full Time · Shift Roster · நீர்கொழும்பு",
    body: "மருந்துகளை Dispense செய்தல், மருந்து பயன்பாடு பற்றி நோயாளர்களுக்கு ஆலோசனை வழங்குதல், Inventory ஐ Manage செய்தல், மற்றும் வார்டுகள் மற்றும் Counter முழுவதும் Prescribing பாதுகாப்பாக வைத்திருக்க Multidisciplinary குழுவுடன் இணைந்து பணியாற்றுதல்.",
    requirements: [
      "Pharmacy இல் Bachelor's பட்டம்",
      "செல்லுபடியான SLMC அல்லது Pharmaceutical Registration",
      "மருத்துவமனை அல்லது Retail Pharmacy அனுபவம் ஒன்று முதல் இரண்டு ஆண்டுகள் வரை விரும்பப்படுகிறது",
      "நல்ல Interpersonal Skills கொண்ட, குழுவாக பணியாற்றுபவர்",
    ],
    detail: [
      'உங்கள் CV ஐ "Pharmacist" என்று Subject Line இல் இட்டு info@sjhospital.lk க்கு அனுப்புங்கள்',
      "பதவி பற்றி முதலில் கேட்க விரும்பினால் 074 220 8704 ஐ Call செய்யுங்கள்",
      "St. Joseph Hospital, Negombo இல் அமைந்துள்ளது",
    ],
  },
  {
    line: "Full Time · Day Roster · நீர்கொழும்பு",
    body: "விற்பனை Strategies உருவாக்குதல், Insurance நிறுவனங்களுடன் Partnerships கட்டியெழுதல், சாத்தியமான Clients ஐ ஈர்த்தல், மற்றும் அதிக நோயாளர்கள் ஏற்கனவே Insured ஆக வருமாறு Cover ஐ Coordinate செய்தல்.",
    requirements: [
      "Insurance விற்பனை, Healthcare Marketing அல்லது வணிக மேம்பாட்டில் இரண்டு அல்லது அதற்கு மேற்பட்ட ஆண்டுகள்",
      "சுகாதார Insurance, Claims மற்றும் இலங்கை Healthcare சூழல் பற்றிய புரிதல்",
      "சுய Motivated, நல்ல Record Keeping பழக்கங்கள் கொண்டவர்",
      "English மற்றும் சிங்களத்தில் Fluent, தமிழ் தெரிந்தால் ஒரு சாதகம்",
    ],
    detail: [
      "உங்கள் CV ஐ info@sjhospital.lk க்கு அனுப்புங்கள்",
      "பதவி பற்றிய Enquiries க்கு 074 220 8704 ஐ Call செய்யுங்கள்",
      "நீர்கொழும்பில் அமைந்துள்ளது",
    ],
  },
  {
    line: "Full Time · Shift Roster · நீர்கொழும்பு",
    body: "Emergency சிகிச்சை Unit இல் Front Line Assessment மற்றும் Resuscitation, நீர்கொழும்பு நகரிலிருந்தும் விமான நிலைய சாலையிலிருந்தும் கதவு வழியாக வரும் அனைத்தையும் பார்த்தல்.",
    requirements: [
      "முழு SLMC Registration உடன் MBBS",
      "Internship முடிக்கப்பட்டது",
      "Emergency அல்லது Acute Medicine அனுபவம் ஒரு சாதகம்",
    ],
    detail: [
      "Shift Roster, இரவுகள் மற்றும் வார இறுதிகளையும் உள்ளடக்கியது",
      "பதவியை Subject Line இல் இட்டு info@sjhospital.lk க்கு Apply செய்யுங்கள்",
    ],
  },
  {
    line: "Full Time · Shift Roster · நீர்கொழும்பு",
    body: "அறுவை சிகிச்சை பட்டியல் முழுவதும் Scrub மற்றும் Circulating கடமைகள், Post Anaesthetic Recovery உடன் சேர்ந்து, இங்கு Operate செய்யும் Consultant Surgeons மற்றும் Anaesthetists உடன் இணைந்து பணியாற்றுதல்.",
    requirements: [
      "Nursing இல் Diploma அல்லது BSc, இலங்கை Nurses Council Registration உடன்",
      "Ward அனுபவம், அறுவை சிகிச்சை அரங்கு அனுபவம் ஒரு சாதகம்",
    ],
    detail: [
      "Shift Roster, Emergency பட்டியல்களுக்கு On Call Cover உடன்",
      "பதவியை Subject Line இல் இட்டு info@sjhospital.lk க்கு Apply செய்யுங்கள்",
    ],
  },
  {
    line: "Full Time · Shift Roster · நீர்கொழும்பு",
    body: "இருபத்து நான்கு மணி நேரமும் இயங்கும் ஆய்வகத்தில் Haematology, Biochemistry, Microbiology மற்றும் Serology, Emergency Unit எதிர்பார்க்கும் Urgent Panels உட்பட.",
    requirements: [
      "Medical Laboratory Sciences இல் Diploma அல்லது BSc",
      "பொருந்தும் இடத்தில் தொடர்புடைய Council இல் Registration",
    ],
    detail: [
      "Shift Roster, இரவுகளும் உட்பட",
      "பதவியை Subject Line இல் இட்டு info@sjhospital.lk க்கு Apply செய்யுங்கள்",
    ],
  },
  {
    line: "Full Time · Shift Roster · நீர்கொழும்பு",
    body: "வார்டுகள், அறுவை சிகிச்சை அரங்கு மற்றும் Emergency Unit க்கான Digital Radiography மற்றும் Mobile Imaging, Radiologist Reporting மற்றும் Ultrasound Perform செய்கிறார்.",
    requirements: ["Radiography இல் Diploma அல்லது பட்டம்", "Radiation Safety பயிற்சி"],
    detail: [
      "Shift Roster, இரவுகளும் உட்பட",
      "பதவியை Subject Line இல் இட்டு info@sjhospital.lk க்கு Apply செய்யுங்கள்",
    ],
  },
];

// Derived from `jobs[2..5].title` rather than a second literal, so a
// translated title would have exactly one home; now empty, since a job
// title is a card title and stays English (see the file header).
export const sharedJobTitles = {};

export const departmentLabels: Record<string, string> = {};

export const generalApplicationLabel = "பொது விண்ணப்பம், குறிப்பிட்ட Role இல்லாமல்";

export const experienceOptions = [
  { label: "புதிய பட்டதாரி" },
  { label: "1 முதல் 2 ஆண்டுகள் வரை" },
  { label: "3 முதல் 5 ஆண்டுகள் வரை" },
  { label: "6 முதல் 10 ஆண்டுகள் வரை" },
  { label: "10 ஆண்டுகளுக்கு மேல்" },
];

export const sourceOptions = [
  { label: "இந்த Website" },
  { label: "எங்கள் Facebook அல்லது LinkedIn Page" },
  { label: "ஒரு Job Board" },
  { label: "இங்கு பணிபுரியும் ஒரு நண்பர்" },
  { label: "இலங்கைக்கு திரும்புதல்" },
];

// "6 positions" / "6 roles" / "5 steps" are derived from jobs.length /
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
  "மருத்துவ Officers",
  "அறுவை சிகிச்சை அரங்கு Nurses",
  "Pharmacists",
  "மருத்துவ ஆய்வக Technologists",
  "Radiographers",
  "Insurance மற்றும் பில்லிங்",
];

export const jumpCards = [
  {
    count: "ஏன் இங்கே",
    note: "நாங்கள் சரிசெய்யக்கூடியது, சரிசெய்ய முடியாதது.",
  },
  {
    count: "பணிகள் 6",
    note: "மருத்துவம், துணை சுகாதாரம், Pharmacy, நிர்வாகம்.",
  },
  {
    count: "5 படிகள்",
    note: "ஒவ்வொரு Stage இலும் உங்களுக்குப் பதில் வரும்.",
  },
  {
    count: "முக்கியம்",
    note: "நாங்கள் ஒரு விண்ணப்பதாரரிடம் பணம் கேட்பதில்லை.",
  },
];

export const commitments = [
  "Rosters முன்கூட்டியே Publish செய்யப்படும், ஊழியர்களிடையே மாற்றங்களுக்கு அனுமதி",
  "உபகரணங்கள் Service Contract கீழ், மற்றும் ஒரு உண்மையான Maintenance Budget",
  "ஒவ்வொரு புதிய பட்டதாரிக்கும் அவர்களின் முதல் மாதங்களுக்கு பெயரிடப்பட்ட Preceptor ஒருவர்",
  "Resuscitation Courses முதல் மேலாக, Fund செய்யப்பட்ட Certification",
  "சம்பளம் Interview இல் திறந்த முறையில் விவாதிக்கப்படும், Letter இல் திடீரென்று சொல்லப்படாது",
  "ஒரு Safety Concern யார் எழுத்தாலும் எழுத்துப்பூர்வ பதிலைப் பெறும்",
];

export const benefits = [
  {
    kind: "பணம்",
    items: [
      "ஒப்பிடத்தக்க தனியார் மருத்துவமனைகளுக்கு எதிராக Benchmark செய்யப்பட்ட சம்பளம்",
      "EPF மற்றும் ETF பங்களிப்புகள் சரியாகவும் சரியான நேரத்திலும் செலுத்தப்படும்",
      "இரவு Shift மற்றும் On Call Allowances உங்கள் Letter இல் குறிப்பிடப்படும்",
      "வருடாந்திர Increment Performance க்கு எதிராக மதிப்பாய்வு செய்யப்படும், Seniority மட்டுமல்ல",
    ],
  },
  {
    kind: "சுகாதாரம்",
    items: [
      "உங்களுக்கும் உங்கள் நெருங்கிய குடும்பத்திற்கும் Medical Cover",
      "மருத்துவமனையில் ஊழியர்களுக்கு Outpatient Consultations",
      "Investigations, Pharmacy மற்றும் Inpatient Care க்கு Staff Rates",
      "வருடாந்திர சுகாதார பரிசோதனை, மற்றும் மருத்துவ ஊழியர்களுக்கு Hepatitis B தடுப்பூசி",
    ],
  },
  {
    kind: "நேரம்",
    items: [
      "Annual, Casual மற்றும் Medical Leave Statutory உரிமைக்கு அல்லது அதற்கு மேலாக",
      "முழு Maternity Leave, ஏற்பாட்டின் மூலம் Phased Return உடன்",
      "தகுதிக்காக Study செய்தால் தேர்வுகளுக்கு Study Leave",
      "பல துறைகளில் Part Time மற்றும் பள்ளி நேர Arrangements",
    ],
  },
  {
    kind: "வளர்ச்சி",
    items: [
      "மருத்துவ ஊழியர்களுக்கு Fund செய்யப்பட்ட Resuscitation மற்றும் Specialty Certification",
      "நீண்ட காலம் பணியாற்றும் ஊழியர்களுக்கு Sponsor செய்யப்பட்ட Diploma மற்றும் குறுகிய கால Course Study",
      "வருகை தரும் Consultants உடன் இணைந்து மருத்துவ Teaching",
      "Post ஒன்று Open ஆகும்போது அறுவை சிகிச்சை அரங்கு, ஆய்வகம் அல்லது Imaging க்கான உள் Route",
    ],
  },
];

export const process = [
  {
    when: "முதல் நாள்",
    body: "இந்தப் பக்கத்தில் உள்ள Form ஐப் பயன்படுத்துங்கள், அல்லது பதவியை Subject Line இல் இட்டு உங்கள் CV ஐ Email செய்யுங்கள். உங்களுக்கு Automated Reply அல்ல, ஒருவரிடமிருந்தே Acknowledgement கிடைக்கும்.",
  },
  {
    when: "இரண்டு வாரங்கள்",
    body: "விண்ணப்பங்களைப் படிப்பவர் துறையின் Head, Human Resources மட்டுமல்ல. நீங்கள் Shortlist செய்யப்படாவிட்டால், காத்திருக்க வைப்பதற்குப் பதிலாக Email மூலம் அது சொல்லப்படும்.",
  },
  {
    when: "ஏற்பாட்டின் அடிப்படையில்",
    body: "துறை Head மற்றும் ஒரு மூத்த Clinician உடன் ஒரு Panel, உங்கள் தற்போதைய பதவியிலிருந்து Leave எடுக்கும்படி கட்டாயப்படுத்தாத நேரத்தில் நடத்தப்படும். சம்பளம் இந்த Stage இல் திறந்த முறையில் விவாதிக்கப்படும்.",
  },
  {
    when: "அதே வருகையில்",
    body: "மருத்துவ மற்றும் தொழில்நுட்ப பதவிகளுக்கு, உண்மையான வேலைக்குப் பொருந்தும் ஒரு சிறிய Practical அல்லது Scenario. நீங்கள் பணியாற்றும் Unit காட்டப்படும், அங்குள்ள Staff உடன் பேசலாம்.",
  },
  {
    when: "ஒரு வாரம்",
    body: "சம்பளம், Allowances, Roster Pattern மற்றும் Probation Terms கூறும் எழுத்துப்பூர்வ Offer. References நீங்கள் Principle இல் ஏற்றுக்கொண்ட பிறகு மட்டுமே, நீங்கள் பரிந்துரைத்த Referees இடமிருந்து மட்டுமே எடுக்கப்படும்.",
  },
];

export const students = [
  {
    kind: "உதவித்தொகை",
    body: "இக்குழு மருத்துவத் தொழிலைத் தேர்ந்த மாணவர்களை Support செய்கிறது. Applications மருத்துவமனையால் அல்ல, குழுவால் கையாளப்படுகின்றன, நீங்கள் எங்களுக்கு எழுதினால் சரியான Contact க்கு வழிகாட்டுவோம்.",
    who: "மருத்துவ மாணவர்கள்",
  },
  {
    kind: "மருத்துவ Placements",
    body: "Nursing பள்ளிகள் மற்றும் துணை சுகாதார Programmes இலிருந்து மாணவர்களை Supervised மருத்துவ Placements க்காக எடுக்கிறோம், பெயரிடப்பட்ட Supervisor உடன், யார் Free ஆக இருக்கிறாரோ அவரை Shadow செய்ய விடுவதற்குப் பதிலாக.",
    who: "நிறுவனங்கள் மற்றும் மாணவர்கள்",
  },
  {
    kind: "ஆரம்ப நிலை",
    body: "Front Office, Pharmacy Assistant மற்றும் Support Roles உண்மையிலேயே பள்ளி முடித்தவர்களுக்கும் Open, முழு Training உடன். இங்குள்ள பல Coordinators Front Desk இலிருந்தே தொடங்கினர்.",
    who: "பள்ளி முடித்தவர்கள்",
  },
];

export const fraudChecks = [
  "நாங்கள் இந்த Website இலும், எங்கள் சொந்த Social Media Pages இலும், அங்கீகரிக்கப்பட்ட Job Boards இலும் மட்டுமே Advertise செய்கிறோம்",
  "உண்மையான Messages sjhospital.lk என்று முடியும் முகவரியிலிருந்து வரும்",
  "நாங்கள் ஒருபோதும் Application Fee, Training Deposit அல்லது Agent Commission கேட்பதில்லை",
  "Visa அல்லது Overseas Placement Process செய்ய பணம் நாங்கள் ஒருபோதும் கேட்பதில்லை",
  "Offer க்கு முன் உங்கள் Bank Details அல்லது Original Certificates நாங்கள் ஒருபோதும் கேட்பதில்லை",
  "ஏதேனும் சந்தேகம் இருந்தால், மருத்துவமனையை 0117 84 84 84 என்ற எண்ணில் Call செய்து கேளுங்கள்",
];

export const faq = [
  {
    q: "புதிதாக தகுதி பெற்ற Nurses ஐ எடுக்கிறீர்களா?",
    a: "ஆம். Care செய்வதை நிறுத்திய அனுபவமுள்ள Nurse ஒருவரை விட, கவனமான புதிய பட்டதாரி ஒருவரை நாங்கள் எடுக்க விரும்புகிறோம். புதிய பட்டதாரிகள் தொடங்கும்போது பெயரிடப்பட்ட Preceptor உடன் பணியாற்றுகிறார்கள், அந்த காலத்தில் Roster இல் முழு Staff Member ஆக Count செய்யப்படுவதில்லை. Specialist Areas முதலில் Ward அனுபவத்தைக் கேட்கின்றன, நீங்கள் மாற Ready ஆனதும் நேர்மையாகச் சொல்வோம்.",
  },
  {
    q: "Rosters எப்படி Handle செய்யப்படுகின்றன?",
    a: "முன்கூட்டியே Publish செய்யப்படும், Skill Mix பராமரிக்கப்படும் வரை Staff இடையே நேரடியாக Shift Swaps அனுமதிக்கப்படும். மக்களை உடைப்பது நாள்பட்ட Short Staffing தான், எனவே நாங்கள் ஆவணப்படுத்தப்பட்ட Establishment ஒன்றுக்கு Run செய்கிறோம், Duty இல் இருப்பவரை அதை Absorb செய்யச் சொல்வதற்குப் பதிலாக Relief Staff ஐப் பயன்படுத்துகிறோம். ஒரு சகபணியாளர் Sick என்று Call செய்தால், அது உங்கள் பிரச்சனை அல்ல, Management தீர்க்க வேண்டிய பிரச்சனை.",
  },
  {
    q: "Bond அல்லது Training Agreement ஏதும் உள்ளதா?",
    a: "ஒரு குறிப்பிட்ட Value க்கு மேல் Fund செய்யப்பட்ட External Courses க்கு, Terms நீங்கள் Commit செய்வதற்கு முன் படிக்கும் தனி Agreement இல் எழுதப்பட்டுள்ளன, உங்கள் Letter Of Appointment இல் புதைக்கப்படவில்லை. வழக்கமான In House Induction மற்றும் Mandatory Training க்கு Bond இல்லை. உங்கள் Original Certificates ஐ நாங்கள் ஒருபோதும் வைத்திருக்க மாட்டோம்.",
  },
  {
    q: "Study செய்யும்போது வேலை செய்வது பற்றி என்ன?",
    a: "இங்கு பொதுவானது, திறந்த முறையில் Support செய்யப்படுகிறது. Nursing பட்டம், Pharmacy தகுதி அல்லது Accountancy தேர்வுகளுக்காக Study செய்யும் Staff தேர்வு தேதிகளைச் சுற்றி Roster Consideration ஐயும், தேர்வுகளுக்கே Study Leave ஐயும் பெறுகிறார்கள். Join செய்த பிறகு அல்ல, Interview இல் எங்களிடம் சொல்லுங்கள், அப்போது Roster ஐ ஆரம்பத்திலிருந்தே அதைச் சுற்றி உருவாக்க முடியும்.",
  },
  {
    q: "வெளிநாட்டிலிருந்து திரும்பும் இலங்கையர்களிடமிருந்து விண்ணப்பங்களை ஏற்கிறீர்களா?",
    a: "மிகவும், அது நாங்கள் தீவிரமாக விரும்பும் ஒரு குழு. Gulf, United Kingdom அல்லது Australia இல் அனுபவம் என்பது பொதுவாக உங்களை உடனடியாக பயனுள்ளதாக்கும் Protocols மற்றும் Equipment க்கான Exposure ஐ குறிக்கிறது, தொடர்புடைய Council உடன் Re Registration Requirements ஐ Navigate செய்ய நாங்கள் உதவுவோம். உங்கள் Notice Period ஐச் சொல்லுங்கள், அதற்கேற்ப நாங்கள் வேலை செய்வோம்.",
  },
  {
    q: "நான் ஒரு Safety Concern ஐ எழுத்தினால் என்ன நடக்கும்?",
    a: "அது Clinical Governance Process மூலம் செல்கிறது, உங்களுக்கு எழுத்துப்பூர்வ பதில் கிடைக்கும். இந்தப் பக்கத்தில் உள்ள எந்த Benefit ஐ விடவும் இது முக்கியமானது: ஒரு Junior Nurse ஒரு Equipment Unsafe என்று அல்லது ஒரு Doctor Error செய்தார் என்று சொல்ல முடியாத மருத்துவமனை ஒரு ஆபத்தான மருத்துவமனை. Systems பற்றிய Reports Improvement ஆக நடத்தப்படுகின்றன, Blame ஆக அல்ல.",
  },
  {
    q: "என் தற்போதைய Employer ஐ தொடர்பு கொள்வீர்களா?",
    a: "உங்கள் எழுத்துப்பூர்வ அனுமதி இல்லாமல் இல்லை, Offer கொடுப்பதற்கு முன் ஒருபோதும் இல்லை. நீங்கள் பார்க்கிறீர்கள் என்று உங்கள் தற்போதைய Employer க்குச் சொல்லாதிருந்தால் References Delicate ஆக இருக்கலாம். உங்கள் மருத்துவ வேலையை அறிந்த இரண்டு Referees ஐக் கொடுங்கள், அவர்களில் ஒருவரை இன்னும் Approach செய்யக் கூடாது என்றால் தெளிவாகச் சொல்லுங்கள்.",
  },
  {
    q: "இங்கு எதுவும் எனக்குப் பொருந்தவில்லை என்றால்?",
    a: "எப்படியும் உங்கள் CV ஐ ஒரு பொது விண்ணப்பமாக அனுப்புங்கள். நாங்கள் Applications ஐ File இல் வைத்திருக்கிறோம், ஒரு நல்ல Nursing Officer அல்லது Technologist ஒரு Vacancy க்காக அரிதாகவே நீண்ட நேரம் காத்திருப்பார். நீங்கள் எந்த Department ஐ இலக்காகக் கொண்டுள்ளீர்கள் என்று சொல்லுங்கள், அதனால் ஏதேனும் Open ஆகும்போது சரியான Department Head ஐ அடையும்.",
  },
];

export const formNotes = [
  "அது Human Resources க்கும் நீங்கள் Apply செய்த Department இன் Head க்கும் மட்டுமே செல்கிறது, வேறு யாருக்கும் இல்லை",
  "உங்களுக்கு Automated Reply அல்ல, ஒருவரிடமிருந்தே Acknowledgement கிடைக்கும்",
  "நாங்கள் அதை 6 மாதங்களுக்கு File இல் வைத்திருந்து பின் Delete செய்கிறோம்",
  "உங்கள் எழுத்துப்பூர்வ அனுமதி இல்லாமல் உங்கள் தற்போதைய Employer ஒருபோதும் தொடர்பு கொள்ளப்பட மாட்டார்",
  "எந்த Stage இலும் கட்டணம் இல்லை. உங்களிடம் பணம் கேட்பவர் யாராக இருந்தாலும் அது நாங்கள் அல்ல",
];

export const applyChecklist = [
  "PDF ஆக CV",
  "பதிவு எண்",
  "இரண்டு Referees",
  "விரைவில் தொடங்கக்கூடிய தேதி",
];

export const applyRows = [{}, {}, {}, {}];

export const equalOpportunity =
  "St. Joseph Hospital ஒரு சம வாய்ப்பு வழங்குநர். நாங்கள் Merit அடிப்படையில் தேர்ந்தெடுக்கிறோம், இனம், மதம், பாலினம், திருமண நிலை, வயது அல்லது இயலாமை அடிப்படையில் பாகுபாடு காட்டுவதில்லை, மேலும் கோரிக்கையின் பேரில் ஆட்சேர்ப்பு செயல்முறையில் நியாயமான Adjustments செய்வோம். உங்கள் முதல் Application இல் உங்கள் NIC நகல், புகைப்படம் அல்லது சுகாதாரத் தகவலை Include செய்ய வேண்டாம்; அவை Offer Stage இல் மட்டுமே கேட்கப்படும்.";

export const hero = {};

export const sectionEyebrows = {};

export const whySection = {
  body: "ஒரு Nurse அல்லது Technologist Gulf க்குச் செல்லும்போது, அது அரிதாகவே பணத்தைப் பற்றி மட்டும் இருக்கும். அது Relief இல்லாத 12 மணி நேர Shift, ஒரு வருடமாக Broken ஆக இருக்கும் உபகரணங்கள், யாரும் உங்களை சிறந்த ஒன்றாக Train செய்யப் போவதில்லை என்ற உணர்வு. தேசிய சம்பள Market ஐ நாங்கள் சரிசெய்ய முடியாது. அந்த மூன்று விஷயங்களை நாங்கள் சரிசெய்ய முடியும், மருத்துவமனையை அதற்கு முயற்சிக்க அமைத்துள்ளோம்.",
};

export const fraudSection = {
  body: "இலங்கையில் போலி மருத்துவமனை மற்றும் வெளிநாட்டு Nursing வேலைகளின் ஒரு உண்மையான Trade உள்ளது, அது குறைவாக செலவிட முடிந்தவர்களையே இலக்காகக் கொண்டுள்ளது. நாங்கள் எந்த Stage இலும் Application Fees, Registration Fees, Training Deposits, Agent Commissions அல்லது Visa Processing பணம் வசூலிப்பதில்லை. இந்த மருத்துவமனையிலிருந்து என்று கூறி யாரேனும் உங்களிடம் ஒரு Payment கேட்டால், அது ஒரு Fraud. கீழே உள்ள எண்ணில் எங்களை Call செய்து சொல்லுங்கள்.",
};

export const benefitsHeading = {};
export const benefitsAside =
  "ஒரு Rewarding Environment பற்றிய தெளிவற்ற பேச்சு இல்லை. இவை உங்கள் Letter Of Appointment இல் உள்ள குறிப்பிட்ட விஷயங்கள்.";

export const openings = {
  positionsCountTemplate: "Positions {total} இல் {shown}",
  filterAriaLabel: "Department வாரியாக Positions ஐ Filter செய்யுங்கள்",
  emptyNote:
    "இங்கு உங்களுக்குப் பொருந்தும் ஒன்று இல்லையா? எப்படியும் உங்கள் CV ஐ அனுப்புங்கள். நாங்கள் Applications ஐ File இல் வைத்திருக்கிறோம், ஒரு நல்ல Nursing Officer அல்லது Technologist ஒரு Vacancy க்காக அரிதாகவே நீண்ட நேரம் காத்திருப்பார்.",
};

export const processHeading = {};
export const processIntro =
  "ஒரு Interview க்குப் பிறகு அமைதியாக விடப்படுவது இந்த நாட்டில் மருத்துவமனை பணியமர்த்தல் பற்றிய பொதுவான Complaint. நாங்கள் எடுக்காதவர்கள் உட்பட அனைவருக்கும் பதிலளிக்கிறோம்.";

export const studentsHeading = {};
export const studentsAside =
  "மருத்துவத் துறையில் நுழையும் மாணவர்களுக்கு குழு Support செய்கிறது, மருத்துவமனையிலேயே நாங்கள் Trainees ஐ எடுக்கிறோம்.";

export const faqHeading = {};

export const applicationHeading = {};
export const applicationAside =
  "ஒன்பது Fields, ஒன்றும் அலங்காரமானது அல்ல. Registration Number ஐ நாங்கள் கேட்கிறோம், ஏனெனில் அது ஒரு Department Head முதலில் பார்க்கும் விஷயம்.";
export const applicationEmailPrompt = "Email செய்வது சிறந்ததா?";
export const applicationEmailNote =
  "பதவியை Subject Line இல் இடுங்கள். ஒரு Email இந்த Form ஐப் போலவே சம மதிப்புடையது.";

export const applyHeading = {};
export const applyBody =
  "மேலே உள்ள Form ஐப் பயன்படுத்துங்கள், அல்லது பதவியை Subject Line இல் இட்டு உங்கள் CV ஐ Email செய்யுங்கள். உங்கள் Registration Number மற்றும் கிடைக்கக்கூடிய தொடக்கத் தேதியை மேலே இடுங்கள்: இது Emails இன் ஒரு Round ஐச் சேமிக்கும்.";

export const form = {
  fullNameLabel: "முழுப் பெயர்",
  fullNamePlaceholder: "உங்கள் Certificates இல் இருப்பதைப் போலவே",
  roleLabel: "விண்ணப்பிப்பது",
  rolePlaceholder: "ஒரு Role ஐ தேர்ந்தெடுங்கள்",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",
  phoneLabel: "Mobile",
  phonePlaceholder: "07X XXX XXXX",
  registrationLabel: "பதிவு எண்",
  registrationPlaceholder: "SLMC, Nurses Council, அல்லது பொருந்தாது",
  experienceLabel: "அனுபவ ஆண்டுகள்",
  experiencePlaceholder: "ஒன்றைத் தேர்ந்தெடுங்கள்",
  startDateLabel: "விரைவில் தொடங்கக்கூடிய தேதி",
  startDatePlaceholder: "உடனடியாக, அல்லது ஒரு மாத Notice க்குப் பிறகு",
  sourceLabel: "இதை நீங்கள் பார்த்த இடம்",
  sourcePlaceholder: "ஒன்றைத் தேர்ந்தெடுங்கள்",
  noteLabel: "நாங்கள் அறிய வேண்டிய ஏதேனும் உண்டா",
  notePlaceholder:
    "Study Commitments, உங்களுக்குத் தேவையான ஒரு Shift Pattern, அல்லது நீங்கள் குறிப்பாக பணியாற்ற விரும்பும் Unit. Optional.",
  cvHeading: "உங்கள் CV ஐ PDF ஆக Attach செய்யுங்கள்",
  cvHintDefault: "PDF Prefer செய்யப்படுகிறது, 5 MB க்கும் குறைவாக. இந்த Stage இல் உங்கள் NIC நகல் அல்லது புகைப்படத்தை அனுப்ப வேண்டாம்.",
  cvHintReattach:
    "தயவுசெய்து உங்கள் CV ஐ மீண்டும் Attach செய்யுங்கள். தோல்வியடைந்த Submission ஒன்றின் மூலம் கோப்பை வைத்திருக்க எந்த Browser உம் அனுமதிக்காது.",
  cvChooseFile: "கோப்பைத் தேர்ந்தெடுங்கள்",
  cvChangeFile: "கோப்பை மாற்றுங்கள்",
  consentLabel:
    "St. Joseph Hospital என் Application ஐ 6 மாதங்களுக்கு வைத்திருக்கவும், இது மற்றும் ஒப்பிடத்தக்க வெற்றிடங்கள் குறித்து என்னைத் தொடர்பு கொள்ளவும் முடியும் என்பதை நான் ஒப்புக்கொள்கிறேன். என் தற்போதைய Employer என் எழுத்துப்பூர்வ அனுமதி இல்லாமல் அணுகப்பட மாட்டார்.",
  submitIdle: "Application ஐ Submit செய்யுங்கள்",
  submitPending: "அனுப்புகிறது",
  submitSuccess: "Application கிடைத்தது",
  defaultStatus: "நாங்கள் முன்னெடுத்துச் செல்லாதவை உட்பட, ஒவ்வொரு Application க்கும் நாங்கள் Reply செய்கிறோம்.",
};
