// Tamil for the network page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns and
// business or clinical terms stay in English rather than being replaced by
// literary coinages nobody says out loud. So "Emergency", "OPD",
// "Telemedicine", "Telehealth", "Pharmacy", "Network" and "Group" (the
// corporate sense) stay in English throughout, the same way they already do
// in about's, contact's, accommodation's, home-care's and pharmacy's own
// content.ta.ts. "Insurance" itself translates to "காப்பீடு", the same word
// about's own content.ta.ts already uses for it.
//
// "Los Angeles" and every abbreviation of it ("LA", "Greater LA") stay in
// English wherever they appear: that is the group's own American city, the
// same way about's own content.ta.ts keeps it while transliterating
// "California" to "கலிபோர்னியா" and "Sri Lanka" to "இலங்கை" alongside it.
// "Negombo" translates to "நீர்கொழும்பு" as a place name, the same as
// elsewhere on this site; "Chilaw" and "Gampaha" translate to their own
// Tamil names, "சாலாவை" and "கம்பஹா".
//
// Every company's own name and short "wordmark" stay in English throughout,
// the same way the hospital's own name never changes script: recasting
// "Kids & Teens Medical Group" into Tamil letters would not be a
// translation, it would be a different name. See KEEPS_ENGLISH in
// content.i18n.test.ts for the full list, with a reason for each.
//
// Sentence forms use the polite plural ("செய்யுங்கள்"), which is how a
// hospital addresses a patient it has not met.
//
// Only translatable copy lives here. Every href, slug, logo path, stat
// number, glyph name and fact value stays in content.ts and has exactly one
// home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {
  strapline: "நீர்கொழும்பிலிருந்து Los Angeles வரை",
  breadcrumbHome: "முகப்பு",
  breadcrumbCurrent: "எங்கள் Network",
  headingLead: "ஒரு மருத்துவமனை",
  headingOutline: "நீர்கொழும்பில்,",
  headingAccent: "LA இலிருந்து ஆதரவு.",
  familyCta: "Network ஐ அறிந்துகொள்ளுங்கள்",
  mattersCta: "இது உங்களுக்கு எதைக் குறிக்கிறது",
};

export const heroStandfirst =
  "St. Joseph Hospital ஐ இயக்குவது கலிபோர்னியாவின் மிகப்பெரிய குழந்தை மருத்துவ Group ஆன Kids & Teens Medical Group ஆகும். Clinical Protocols, Training மற்றும் Second Opinions வருவது அங்கிருந்துதான்.";

// The other eight companies in the group, exactly as ktdoctor.com/network
// names them. See KEEPS_ENGLISH in content.i18n.test.ts.
export const tickerItems: readonly string[] = [
  "Kids & Teens Medical Group",
  "St. Gianna Medical Group",
  "LA Intensive Pediatric Therapy",
  "Serendib Healthways",
  "After-Hours Pediatric Urgent Care",
  "ACIG Asiacorp Insurance Brokers",
  "Human Compass MSO",
  "Blockchain BPO",
];

export const heroFacts = [
  // `v` is the parent company's own name: see KEEPS_ENGLISH.
  { k: "தாய் நிறுவனக் குழு", v: "Kids & Teens Medical Group" },
  { k: "Group இன் Clinics", v: "Greater LA முழுவதும் 25" },
  { k: "குடும்பத்தில் நிறுவனங்கள்", v: "ஒன்பது, இரு கண்டங்களில்" },
  { k: "இலங்கைப் பிரிவு", v: "இந்த மருத்துவமனை, மற்றும் ACIG" },
];

export const jumpCards = [
  { count: "ஏன் முக்கியம்", label: "படுக்கை அருகில்", note: "இந்த தொடர்பு உங்கள் சிகிச்சையில் மாற்றும் விஷயம்." },
  { count: "9 நிறுவனங்கள்", label: "குடும்பம்", note: "கலிபோர்னியா, இலங்கை, மற்றும் ஆதரவுப் பிரிவுகள்." },
  { count: "எண்கள்", label: "Group அளவு", note: "Clinics, மருத்துவர்கள், இடங்கள், வெளியிடப்பட்டவை." },
  { count: "7 பதில்கள்", label: "எங்களுக்கு இடையே பயணம்", note: "Referrals, Second Opinions, காப்பீடு, வேலைகள்." },
];

export const mattersEyebrow = "01 / படுக்கை அருகில் ஏன் முக்கியம்";
export const mattersHeading = "ஒரு Network நோயாளிக்கு பயன்படும்போது மட்டுமே மதிப்புடையது";
export const mattersBody =
  "பெரும்பாலான மருத்துவமனை Group பக்கங்கள் corporate சுவர்ப்பேப்பர் மட்டுமே. இது இருப்பதற்குக் காரணம், இந்த தொடர்பு உங்கள் சிகிச்சையில் மாற்றும் குறிப்பிட்ட விஷயங்கள்: மருத்துவர்கள் பின்பற்றும் Protocols என்ன, கடினமான Case ஐ யார் மறுஆய்வு செய்கிறார்கள், Los Angeles இல் சிகிச்சை பெற்ற குழந்தை File ஐ மீண்டும் தொடங்காமல் நீர்கொழும்பில் Follow-up செய்யப்படும் விதம்.";

export const practiceHeading = "நடைமுறையில்";

export const practice = [
  "Group இலிருந்து பெறப்பட்ட Paediatric மற்றும் Emergency Protocols, இலங்கை Guidelines க்கு ஏற்ப மாற்றப்பட்டவை",
  "கடினமான Paediatric Cases களை Second Opinion க்காக அமெரிக்காவில் உள்ள Colleagues இடம் கேட்கலாம்",
  "LA மற்றும் இலங்கைக்கு இடையில் நகரும் குடும்பங்கள் ஒரே தொடர்ச்சியான Record ஐ வைத்திருக்கின்றன",
  "Prescriptions Generic பெயர்களில் எழுதப்படுகின்றன, அதனால் இரு பக்கங்களிலும் Dispense செய்யலாம்",
  "Nursing மற்றும் Technician Training Programmes Group தரநிலைகளுக்கு இணங்க நடத்தப்படுகின்றன",
];

export const familyEyebrow = "02 / குடும்பம்";
export const familyHeading = { line1: "ஒன்பது நிறுவனங்கள்,", line2: "இரு கண்டங்கள்" };
export const familyIntro =
  "கலிபோர்னியாவில் Paediatric மற்றும் Family Care, இலங்கையில் மருத்துவமனை சிகிச்சை மற்றும் காப்பீடு, மற்றும் இரண்டையும் இயங்க வைக்கும் நிர்வாக நிறுவனங்கள்.";

export const orgGroups = [
  {
    name: "இலங்கை",
    note: "மருத்துவமனை சிகிச்சை மற்றும் காப்பீடு, Group ஆல் இலங்கைக்குக் கொண்டுவரப்பட்டது.",
    orgs: [
      {
        // `wordmark` and `name` are this company's own name: see
        // KEEPS_ENGLISH.
        wordmark: "St. Joseph Hospital",
        badge: "நீங்கள் இங்கே",
        name: "St. Joseph Hospital Negombo",
        tagline: "நீர்கொழும்பில் US தரத்திலான சிகிச்சை.",
        body: "Kids & Teens Medical Group, USA ஆல் இயக்கப்படும், சர்வதேச Airport இலிருந்து பத்து நிமிடத் தொலைவில், அமெரிக்க சுகாதார Standards ஐ, ஏற்புடைய, அணுகக்கூடிய சிகிச்சைக்குக் கொண்டு வருகிறது.",
        chips: ["Emergency மற்றும் OPD", "Inpatient சிகிச்சை", "Telemedicine சிகிச்சை", "Pharmacy மற்றும் Diagnostics"],
        // A statement of fact rather than a company's own domain, so it is
        // translated: see KEEPS_ENGLISH for why the other eight `cta`s are
        // not.
        cta: "இந்த மருத்துவமனை",
      },
      {
        wordmark: "Asiacorp Insurance",
        badge: "காப்பீடு",
        name: "ACIG, Asiacorp Insurance Brokers",
        tagline: "இலங்கை முழுவதும் காப்பீட்டு தீர்வுகள்.",
        body: "தனிநபர்கள் மற்றும் Businesses க்காக ஏற்ப செய்யப்பட்ட Motor, Health, Life மற்றும் Corporate Cover வழங்கும் காப்பீட்டு Brokerage, மற்றும் எங்கள் நோயாளிகள் அதிகம் கேட்கும் Group நிறுவனம்.",
        chips: ["Health காப்பீடு", "Life காப்பீடு", "Motor காப்பீடு", "Corporate காப்பீடு"],
        // This company's own domain, pinned against `href` by
        // content.test.ts: see KEEPS_ENGLISH.
        cta: "acig.lk",
      },
    ],
  },
  {
    name: "Paediatric மற்றும் Family Care, கலிபோர்னியா",
    note: "Greater Los Angeles முழுவதும் குழந்தைகள் மற்றும் குடும்பங்களுக்கான தினசரி Primary, Urgent மற்றும் Specialty சிகிச்சை.",
    orgs: [
      {
        wordmark: "Kids & Teens Medical Group",
        badge: "Flagship, எங்கள் தாய் நிறுவனம்",
        name: "Kids & Teens Medical Group",
        tagline: "முதன்மை Paediatric Network.",
        body: "Greater LA இல் 25 Clinics முழுவதும், வயது 0 முதல் 21 வரை குழந்தைகளுக்கு Board Certified Paediatric சிகிச்சை, மற்றும் இந்த மருத்துவமனையை இயக்கும் Group.",
        chips: ["முதன்மை சிகிச்சை", "அவசர சிகிச்சை", "Telehealth சிகிச்சை", "பிறந்த குழந்தை சிகிச்சை"],
        cta: "ktdoctor.com",
      },
      {
        wordmark: "St. Gianna Medical",
        badge: "குடும்ப மருத்துவம்",
        name: "St. Gianna Medical Group",
        tagline: "அனைத்து வயதினருக்கும் குடும்ப மருத்துவம்.",
        body: "அன்றே Appointments மற்றும் 24 மணி நேர Booking உடன் பெரியவர்கள் மற்றும் குழந்தைகளுக்கான முழுமையான சிகிச்சை, Group ஐ Paediatrics ஐ தாண்டி விரிவாக்குகிறது.",
        chips: ["அன்றே Appointments", "24 மணி நேர Booking", "Telehealth சிகிச்சை", "மேம்பட்ட காயச் சிகிச்சை"],
        cta: "sgmdoctor.com",
      },
      {
        wordmark: "LA Intensive Pediatric Therapy",
        badge: "Therapy, 2010 முதல்",
        name: "LA Intensive Pediatric Therapy",
        tagline: "நிபுணர் Paediatric Therapy.",
        body: "குழந்தைகளுக்கான Individual மற்றும் Centre அடிப்படையிலான Speech, Occupational மற்றும் Developmental Therapy, மற்றும் Early Intervention க்கான Group இன் Reference இடம்.",
        // `chips[1]` and `chips[2]` are clinical therapy-service names
        // without a natural Tamil equivalent Sri Lankans say out loud, the
        // same reason pharmacy's `stock[].name` keeps dosage-form English
        // names: see KEEPS_ENGLISH. `chips[0]` translates "Speech" the same
        // way `reachRows` does further down this file.
        chips: ["பேச்சு Therapy", "Occupational therapy", "Sensory integration"],
        cta: "laipt.org",
      },
      {
        wordmark: "Serendib Healthways",
        badge: "சுகாதார Plans",
        name: "Serendib Healthways",
        tagline: "Greater LA முழுவதும் Paediatric சுகாதார Plans.",
        body: "20க்கும் மேற்பட்ட Clinic இடங்கள் மற்றும் 50க்கும் மேற்பட்ட Board Certified மருத்துவர்களுடன், Los Angeles County முழுவதும் குழந்தைகளுக்கான ஏற்புடைய Coverage வழங்கும் Paediatric HMO மற்றும் IPA Network.",
        // `chips[0]` is a US insurance-scheme acronym with no Tamil
        // equivalent: see KEEPS_ENGLISH.
        chips: ["Paediatric HMO/IPA", "அன்றே Appointments", "Telehealth சிகிச்சை", "நேரத்திற்குப் பின் அவசர சிகிச்சை"],
        cta: "serendibhealthways.com",
      },
      {
        wordmark: "After-Hours Pediatric Urgent Care",
        badge: "24 மணி நேரமும்",
        name: "After-Hours Pediatric Urgent Care",
        tagline: "நேரம் கடந்ததா? உங்கள் குழந்தைகளுக்காக நாங்கள் இருக்கிறோம்.",
        body: "20க்கும் மேற்பட்ட California Clinics இல் வயது 0 முதல் 21 வரை குழந்தைகளுக்கு, எந்த நேரத்திலும் Paediatric Urgent Care, முக்கிய காப்பீட்டு Plans அனைத்தும் ஏற்கப்படும்.",
        chips: ["24 மணி நேர அவசர சிகிச்சை", "அன்றே Appointments", "வயது 0 முதல் 21", "அனைத்து காப்பீடும் ஏற்கப்படும்"],
        cta: "pediatricafterhour.com",
      },
    ],
  },
  {
    name: "Business மற்றும் ஆதரவு",
    note: "Network ஐ இயங்க வைக்கும் நிர்வாக மற்றும் Outsourcing நிறுவனங்கள்.",
    orgs: [
      {
        wordmark: "Human Compass MSO",
        badge: "மேலாண்மை சேவைகள்",
        name: "Human Compass MSO",
        tagline: "சிகிச்சையை வழிநடத்துதல், மனித தீர்வுகளை வழங்குதல்.",
        body: "25 ஆண்டுகளுக்கும் மேலாக நோயாளிகளை Primary, Specialty மற்றும் Urgent Care Providers உடன் இணைக்கும் தென் கலிபோர்னியாவின் Management Services நிறுவனம்.",
        chips: ["முதன்மை சிகிச்சை Network", "Specialty சிகிச்சை", "அவசர சிகிச்சை", "Provider மேலாண்மை"],
        cta: "humancompassmso.com",
      },
      {
        wordmark: "Blockchain BPO",
        badge: "Outsourcing சேவைகள்",
        name: "Blockchain BPO",
        tagline: "US Businesses க்கான Offshore குழுக்கள்.",
        body: "Customer Care, Claims Processing மற்றும் Billing Support க்காக இலங்கை மற்றும் Mexico இல் அர்ப்பணிப்புள்ள Offshore குழுக்கள், மற்றும் Group இன் மிகப்பெரிய இலங்கை Employer களில் ஒன்று.",
        chips: ["வாடிக்கையாளர் சேவை", "Claims செயலாக்கம்", "Billing ஆதரவு", "தரவு உள்ளீடு"],
        cta: "myblockchainbpo.com",
      },
    ],
  },
];

export const reachEyebrow = "03 / எண்கள்";
export const reachHeading = { line1: "Network இன்", line2: "கூட்டுத்தொகை", line3: "இதுதான்." };
export const reachIntro =
  "Group நிறுவனங்கள் வெளியிட்ட Figures. கவர்ச்சியான தெளிவற்ற எண்ணை விட, சிறிய, நேர்மையான எண்ணைக் காட்டுவதையே நாங்கள் விரும்புகிறோம்.";

export const reachRows = [
  { k: "Network இல் நிறுவனங்கள்", who: "அமெரிக்கா மற்றும் இலங்கை முழுவதும்" },
  { k: "Kids & Teens இன் Clinics", who: "Greater Los Angeles பகுதி" },
  { k: "Serendib Healthways இடங்கள்", who: "Los Angeles County பகுதி" },
  { k: "Board Certified மருத்துவர்கள்", who: "Serendib Healthways Network இல்" },
  { k: "நேரத்திற்குப் பின் அவசர சிகிச்சை Clinics", who: "கலிபோர்னியா, வயது 0 முதல் 21" },
  { k: "Human Compass MSO இன் ஆண்டுகள்", who: "தென் கலிபோர்னியா" },
  { k: "LA Intensive Pediatric Therapy முதல்", who: "பேச்சு, Occupational, வளர்ச்சி" },
  { k: "BPO குழுக்களுடன் நாடுகள்", who: "இலங்கை மற்றும் Mexico" },
  { k: "இலங்கையில் மருத்துவமனை", who: "இதுதான், நீர்கொழும்பில்" },
];

export const referralEyebrow = "04 / எங்களுக்கு இடையே பயணம்";
export const referralHeading = { line1: "ஒரே File,", line2: "நீங்கள்", line3: "எங்கிருந்தாலும்" };

export const referralIntro =
  "Group இல் உள்ள குடும்பங்கள் நீங்கள் நினைப்பதை விட அடிக்கடி Los Angeles மற்றும் இலங்கைக்கு இடையில் நகர்கின்றன. தாத்தா பாட்டியுடன் Summer, ஒரு Semester சொந்த ஊரில், வெளிநாடு சென்ற பெற்றோர். Referral Desk இருப்பதன் காரணம் யாரும் வெற்றுப் பக்கத்திலிருந்து தொடங்க வேண்டியதில்லை.";

export const referralCta = "Referral Desk இடம் கேளுங்கள்";

export const referrals = [
  {
    q: "என் குழந்தைக்கு Los Angeles இல் Kids & Teens சிகிச்சை அளிக்கிறது. இங்கே Follow-up செய்ய முடியுமா?",
    a: "ஆம், மற்றும் குடும்பங்கள் Network ஐப் பயன்படுத்துவதற்கு பெரும்பாலான காரணம் இதுதான். பயணத்திற்கு முன் உங்கள் LA Paediatrician இடம் Chart ஐ மருத்துவமனைக்கு அனுப்பச் சொல்லுங்கள், எங்கள் Paediatric குழு புதிதாக History தொடங்குவதற்குப் பதிலாக அதைப் படிக்கிறது. Growth Charts, Vaccination Records மற்றும் தொடர்ந்து எடுக்கும் Prescriptions இரு பக்கமும் கொண்டு செல்லப்படும், மேலும் இங்கே வழங்கப்படும் எதும் Generic பெயர்களில் எழுதப்படுகிறது, அதனால் நீங்கள் திரும்பும்போது கலிபோர்னியாவில் உள்ள Pharmacy அதைப் பொருத்தலாம்.",
  },
  {
    q: "நீர்கொழும்பில் உள்ள Case ஐ அமெரிக்காவில் உள்ள Group மருத்துவர் மறுஆய்வு செய்ய முடியுமா?",
    a: "கடினமான Paediatric Cases க்கு, ஆம். எங்கள் Consultants Imaging மற்றும் Reports இணைத்து, Second Opinion க்காக Group இல் உள்ள Colleagues இடம் Case ஐ கொடுக்க முடியும், அவ்வாறு செய்தால் நாங்கள் உங்களுக்கு தெளிவாகச் சொல்கிறோம். இது நீர்கொழும்பில் அமெரிக்க மருத்துவர்கள் உங்களுக்குச் சிகிச்சை அளிப்பதாகக் கூறும் Marketing வாக்குறுதி அல்ல; ஒரு Case க்கு உண்மையிலேயே இன்னொரு பார்வை தேவைப்படும்போது பயன்படுத்தப்படும் உண்மையான வழி.",
  },
  {
    q: "Clinical Protocols உண்மையில் US பக்கத்திலிருந்து வருகிறதா?",
    a: "Group இன் Paediatric மற்றும் Emergency Protocols தொடக்கப் புள்ளியாக இருக்கின்றன, இங்கே கிடைப்பவை மற்றும் பொதுவாக இருப்பவைக்கு ஏற்ப மாற்றப்பட்டவை. உதாரணமாக, Dengue Management இலங்கை தேசிய Guidelines ஐப் பின்பற்றுகிறது, ஏனெனில் இதுவே இந்த நாட்டிற்கான சரியான Standard. Infection Control அல்லது Newborn Observation இல் அமெரிக்க Protocol கடுமையானதாக இருந்தால், நாங்கள் கடுமையானதையே வைத்திருக்கிறோம்.",
  },
  {
    q: "என் ACIG காப்பீட்டு Policy இந்த மருத்துவமனையிலேயே நேரடியாக Settle செய்யப்படுமா?",
    a: "ACIG என்பது அதே குடும்பத்தில் உள்ள Brokerage, ஒரு Insurer அல்ல, எனவே Settlement உங்கள் Policy க்குப் பின்னால் உள்ள Insurer ஐப் பொறுத்தது, Group உறவைப் பொறுத்தது அல்ல. Admission க்கு முன் உங்கள் Policy ஆவணங்களை Billing Desk க்குக் கொண்டு வாருங்கள், Direct Settlement பொருந்துமா அல்லது எங்கள் Invoice Pack உடன் பின்னர் Claim செய்ய வேண்டுமா என்பதை நாங்கள் நேர்மையாகச் சொல்வோம்.",
  },
  {
    q: "நான் Group க்காக வேலை செய்ய விரும்புகிறேன். எங்கே Apply செய்ய வேண்டும்?",
    a: "நீர்கொழும்பில் Clinical மற்றும் Hospital Roles இந்த மருத்துவமனையின் Careers பக்கம் மூலம் செல்கிறது. இலங்கையில் Blockchain BPO உடனான Roles, மற்றும் கலிபோர்னியாவில் Clinical Roles, அந்த நிறுவனங்களாலேயே Advertise செய்யப்படுகின்றன. நாங்கள் எந்த கட்டத்திலும் Candidates இடமிருந்து Fee வசூலிப்பதில்லை, மற்றும் Group இல் எவருக்கும் உங்களிடம் அதைக் கேட்க அனுமதி இல்லை.",
  },
  {
    q: "புதிய Partner Hospitals அல்லது Referring Doctors ஏற்றுக்கொள்ளப்படுகிறார்களா?",
    a: "ஆம், குறிப்பாக Admission உரிமை விரும்பும் நீர்கொழும்பு, சாலாவை மற்றும் கம்பஹா வில் உள்ள Consultants, மற்றும் வெளிநாட்டிலிருந்து வரும் நோயாளிகளுக்காக Airport அருகில் Partner தேடும் மருத்துவமனைகள். மருத்துவமனைக்கு எழுதுங்கள், அந்த Enquiry ஒரு Marketing Inbox க்கு அல்ல Medical Director இடமே செல்கிறது.",
  },
  {
    q: "அமெரிக்க Group இன் ஒரு Part ஆக இருப்பது Treatment ஐ அதிக விலையுடையதாக மாற்றுமா?",
    a: "இல்லை, இந்த Arrangement இன் நோக்கமே எதிர்மாறானது. Prices இலங்கை Market க்காக Set செய்யப்படுகின்றன, நீங்கள் Commit செய்வதற்கு முன் Estimate இல் Publish செய்யப்படும். Group வழங்குவது Protocols, Training மற்றும் Purchasing Scale ஆகும், இறக்குமதி செய்யப்பட்ட Cost Base அல்ல.",
  },
];

export const contactEyebrow = "05 / எங்களைத் தொடர்பு கொள்ளுங்கள்";
export const contactHeading = { line1: "Network இல்", line2: "எங்கிருந்து தொடங்கினாலும்", line3: "பரவாயில்லை." };
export const contactIntro =
  "நோயாளிகள், Partner Hospitals, Insurers மற்றும் Group உடன் இணைந்து பணியாற்ற விரும்பும் நிறுவனங்கள்: மருத்துவமனையை நேரடியாகத் தொடர்பு கொள்ளுங்கள், நாங்கள் உங்களைச் சரியான நிறுவனத்திற்கு Route செய்வோம்.";

// `contactRows[0].value` (the hospital's own phone number) is absent here on
// purpose: see the file header and `isUntranslatable` in
// content.i18n.test.ts.
export const contactRows = [
  { label: "மருத்துவமனையை Call செய்யுங்கள்" },
  { label: "மருத்துவமனைக்கு Email அனுப்புங்கள்" },
  { label: "Group இன் Network பக்கம்" },
  { label: "Treatment க்காக Travel செய்தல்" },
];

export const disclaimer =
  "இந்தப் பக்கத்தில் உள்ள Company பெயர்கள், Logos மற்றும் Figures சம்பந்தப்பட்ட Group நிறுவனங்கள் மற்றும் Partners க்கு உரியவை, அவை அவர்கள் Publish செய்த வண்ணமே காட்டப்படுகின்றன. ஒவ்வொரு நிறுவனமும் தன் சொந்த Services மற்றும் தன் அதிகார எல்லையில் உள்ள Regulatory கடமைகளுக்குப் பொறுப்பாகும்.";
