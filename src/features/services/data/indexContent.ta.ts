// Tamil overlay for indexContent.ts, the services index and detail pages'
// shared copy (322 original lines plus the eyebrows, headings, paragraphs
// and two small local arrays this task moved out of the section components
// themselves; see the header comment above `hero` in indexContent.ts).
//
// Register matches the rest of the site. Several headings below reuse
// src/config/navigationLabels.ta.ts verbatim rather than coining a second
// Tamil phrase for the same nav concept: "Centres of excellence",
// "Full directory", "Admissions", "Facilities", "Diagnostics & radiology"
// and "Department of surgery" all have an exact entry there.
// "Pharmacy" is KEEPS_ENGLISH there for the same reason it is here. `.no`,
// `.href`, `.accent`, `.index`, `.photo` and `.photoAlt` are omitted
// throughout, matching content.i18n.test.ts's `isUntranslatable`.
//
// `internationalSteps[4].title` had fully translated "Records" ->
// "பதிவுகள்", contradicting `pharmacySection.body`'s own bare "Digital
// Records" two screens up in this same file, and
// `pharmacy/data/content.ta.ts`'s declared English-stays list for
// "Record"/"Records". Fixed to keep "Records" bare English.
// `internationalSteps[5].title` was bare English ("Online Follow Up", a
// reordered, recapitalised form of the base "Follow up online") with no
// Tamil at all, unlike every other sibling in this six-entry array; fixed
// to "Online ஆக Follow-up", keeping "Follow-up" English the way
// `atHome.ta.ts`'s telemedicine service already does throughout, with a
// Tamil connector so the title is not bare English.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const tickerItems: readonly string[] = [
  "ஒன்பது சிறப்பு மையங்கள்",
  "Emergency மற்றும் OPD எல்லா நேரமும்",
  "ஆய்வுகூடம் 24 மணி நேரமும் திறந்திருக்கும்",
  "Digital X-ray ஒரு மணி நேரத்தில் Report ஆகும்",
  "இரண்டு மருத்துவர்கள் ஒவ்வொரு Report ஐயும் படிப்பர்",
  "நிபுணர்கள் Lead செய்யும் அறுவை சிகிச்சை அரங்குகள்",
  "நீர்கொழும்பு முழுவதும் வீட்டு வருகைகள்",
];

export const jumpCards = [
  {
    count: "9 பிரிவுகள்",
    label: "சிறப்பு மையங்கள்",
    note: "ஒரு வருகையை அல்ல, ஒரு பிரச்சினையை மையமாகக் கொண்ட சிகிச்சை.",
  },
  {
    count: "36 சேவைகள்",
    label: "முழு அடைவு",
    note: "நேரங்கள், எல்லை மற்றும் ஒவ்வொன்றையும் தொடங்கும் விதம்.",
  },
  {
    count: "3 நிலைகள்",
    label: "சுகாதார பரிசோதனைகள்",
    note: "ஒரு காலையில் அமைப்புமுறை பரிசோதனை.",
  },
  {
    count: "4 படிகள்",
    label: "அனுமதிகள்",
    note: "என்ன கொண்டு வர வேண்டும், Billing மற்றும் Insurance எப்படி வேலை செய்யும்.",
  },
];

export const centres = [
  {
    name: "விபத்து மற்றும் அவசர சிகிச்சை",
    desc: "கூரையுள்ள Ambulance நுழைவுக்குப் பின்னால் ஒரு Resuscitation Bay, எங்கள் சொந்த Ambulance வாகனங்களுடன் 24 மணி நேரமும் இயங்கும்.",
    lead: "24 மணி நேரமும் திறந்திருக்கும்",
  },
  {
    name: "அறுவை சிகிச்சை பராமரிப்பு",
    desc: "பொது அறுவை சிகிச்சையிலிருந்து Neurosurgery வரை, நிபுணர்கள் Lead செய்யும் Operating Lists ஐ பகிரும் ஏழு அறுவை சிகிச்சை நிபுணத்துவங்கள்.",
    lead: "நிபுணர் Lead செய்யும் Lists",
  },
  {
    name: "தாயும் குழந்தையும்",
    desc: "பிரசவம் வரையிலான மகப்பேறு சிகிச்சை, முதல் நிமிடத்திலிருந்தே அறையிலேயே புதிதாகப் பிறந்த குழந்தைக்கான ஆதரவுடன்.",
    lead: "நியமிக்கப்பட்ட நிபுணர்",
  },
  {
    name: "குழந்தை சிகிச்சை",
    desc: "வயது வந்தோர் வார்டுகளிலிருந்து பிரிக்கப்பட்டு, ஒரு தனி Protocol க்கு எதிராக Assess செய்யப்படும் குழந்தைகள் மற்றும் இளையோர்.",
    lead: "Kids & Teens protocol",
  },
  {
    name: "ஆய்வுகூடம்",
    desc: "Haematology, Biochemistry, Microbiology மற்றும் Histopathology, வெளியிடுவதற்கு முன் ஒவ்வொரு Report ஐயும் இரண்டு மருத்துவர்கள் சரிபார்ப்பர்.",
    lead: "அன்றே Reports",
  },
  {
    name: "கதிரியக்கவியல்",
    desc: "Digital X-ray மற்றும் Ultrasound, நோயாளி பயணிக்க முடியாதபோது Portable Imaging வார்டுக்கே கொண்டு வரப்படும்.",
    lead: "ஒரு மணி நேரத்தில் படிக்கப்படும்",
  },
  {
    name: "Endoscopy பிரிவு",
    desc: "திட்டமிடப்பட்ட Lists இல் Gastroscopy மற்றும் Colonoscopy, ஒரு நிபுணர் Anaesthetist Sedation வழங்குவார்.",
    lead: "அன்றே Reporting",
  },
  {
    name: "நல்வாழ்வு மற்றும் சுகாதார பரிசோதனை",
    desc: "இரத்த பரிசோதனை, Imaging Review மற்றும் ஒரு Consultation ஐ உள்ளடக்கிய மூன்று அமைப்புமுறை பரிசோதனை நிலைகள், ஒரு வருகையில்.",
    lead: "அமைப்புமுறை பரிசோதனை",
  },
  {
    name: "Physiotherapy மற்றும் காயப் பராமரிப்பு",
    desc: "அறுவை சிகிச்சைக்குப் பிந்தைய மற்றும் நீண்டகால குணமடைதலுக்கு Physiotherapy உடன் இணைந்த ஒரு தனி காயப் பராமரிப்பு Clinic.",
    lead: "Rehab மற்றும் Dressings",
  },
];

export const surgicalRows = [
  { name: "பொது அறுவை சிகிச்சை", note: "பொருந்தும்போது Laparoscopic" },
  { name: "எலும்பியல் அறுவை சிகிச்சை", note: "Day Case மற்றும் Inpatient" },
  { name: "ENT அறுவை சிகிச்சை மற்றும் Audiology", note: "வாராந்திர வயது வந்தோர் மற்றும் குழந்தை Lists" },
  { name: "Urology பிரிவு", note: "அதே வருகை Ultrasound மற்றும் Flow Studies" },
  { name: "கண் அறுவை சிகிச்சை மற்றும் Cataract அறுவை சிகிச்சை", note: "Day Case அறுவை சிகிச்சை" },
  { name: "Neurosurgery பிரிவு", note: "Referral வழியாக, Imaging Led" },
  { name: "Gastrointestinal மற்றும் Endoscopy", note: "அன்றே Reporting" },
  { name: "Anaesthesia சேவை", note: "நிபுணர் Lead செய்யும் Lists" },
  { name: "அறுவை சிகிச்சைக்குப் பிந்தைய பராமரிப்பு", note: "Assign செய்யப்பட்ட Recovery Nurse" },
];

export const diagnosticRows = [
  {
    name: "Haematology மற்றும் Biochemistry",
    note: "Full Blood Count, Metabolic மற்றும் Biochemistry Panels",
    turnaround: "அன்றே",
  },
  {
    name: "Microbiology மற்றும் Cultures",
    note: "Infection Screening மற்றும் Culture Testing",
    turnaround: "Cultures முடிந்தவுடன் Report ஆகும்",
  },
  {
    name: "Histopathology சேவை",
    note: "திசு மற்றும் Biopsy பகுப்பாய்வு",
    turnaround: "எங்கள் சொந்த Histopathology சேவை Report செய்யும்",
  },
  {
    name: "Digital X-ray",
    note: "ஒரு Radiologist படித்து Report செய்வார்",
    turnaround: "ஒரு மணி நேரத்தில்",
  },
  {
    name: "Ultrasound சேவை",
    note: "Abdominal, Antenatal மற்றும் Soft Tissue Scanning",
    turnaround: "வருகையிலேயே",
  },
  {
    name: "ECG மற்றும் Echocardiography",
    note: "Resting ECG மற்றும் இதய ஆபத்து மதிப்பீடு",
    turnaround: "அன்றே",
  },
  {
    name: "Endoscopy சேவை",
    note: "Gastroscopy மற்றும் Colonoscopy, அதே Sitting இல் Biopsy உடன்",
    turnaround: "அன்றே",
  },
  {
    name: "CT மற்றும் MRI",
    note: "இங்கு செய்யப்படாது; ஒரு Partner Imaging Centre க்கு அனுப்பப்படும்",
    turnaround: "Referral வழியாக ஏற்பாடு",
  },
];

export const packages = [
  {
    tier: "Essential",
    name: "அடிப்படை சுகாதார பரிசோதனை",
    items: [
      "Full Blood Count மற்றும் வழக்கமான Biochemistry",
      "சிறுநீர் வழக்கமான பகுப்பாய்வு",
      "மார்பு X-ray",
      "மருத்துவர் Consultation மற்றும் Report Review",
    ],
    ctaLabel: "Quote ஒன்றைக் கோருங்கள்",
  },
  {
    tier: "அதிகம் தேர்ந்தது",
    name: "விரிவான பரிசோதனை",
    items: [
      "Full Blood Count, Biochemistry மற்றும் Lipid Profile",
      "நீரிழிவு மற்றும் Thyroid Screening",
      "ECG மற்றும் Resting இதய மதிப்பீடு",
      "வயிறு Ultrasound Scan",
      "Report Review உடன் மருத்துவர் Consultation",
    ],
    ctaLabel: "Quote ஒன்றைக் கோருங்கள்",
  },
  {
    tier: "Executive",
    name: "Executive மற்றும் இதய பரிசோதனை",
    items: [
      "இதய ஆபத்து Screening உடன் முழுமையான Comprehensive Panel",
      "Echocardiography மற்றும் ECG",
      "வயிறு Ultrasound மற்றும் மார்பு X-ray",
      "மருத்துவர் மற்றும் இதயநோயியல் Consultation",
      "Follow-up திட்டமிடலுடன் விரிவான Report Review",
    ],
    ctaLabel: "Quote ஒன்றைக் கோருங்கள்",
  },
];

export const admissionSteps = [
  {
    title: "பிரச்சினையை எங்களிடம் சொல்லுங்கள்",
    desc: "0117 84 84 84 க்கு Call செய்யுங்கள் அல்லது OPD க்கு வந்து உங்கள் அறிகுறிகளை விவரிக்கவும்; ஒரு Coordinator உங்களை சரியான நிபுணத்துவத்திற்கு பொருத்துவார்.",
  },
  {
    title: "ஒரு மருத்துவரைப் பாருங்கள்",
    desc: "ஒரு Consultation என்ன நடக்க வேண்டும் என்பதை உறுதிப்படுத்தும், பயனுள்ளதாக இருந்தால் அதே வருகையில் பரிசோதனைகள் ஏற்பாடு செய்யப்படும்.",
  },
  {
    title: "முதலில் செலவு திட்டம்",
    desc: "சிகிச்சை தொடங்குவதற்கு முன் ஒரு எழுத்து மூல திட்டம் கிடைக்கும், எதுவும் பார்க்காமல் ஒப்புக்கொள்ளப்படாது.",
  },
  {
    title: "சிகிச்சை மற்றும் Follow Up",
    desc: "நீங்கள் சில மணி நேரங்கள் அல்லது பல நாட்கள் தங்கினாலும், Admission, சிகிச்சை மற்றும் Follow-up தேதியுடன் Discharge திட்டம்.",
  },
];

export const bringWithYou = [
  "Photo ID மற்றும் OPD Card, இருந்தால்",
  "ஒரு Referral Letter, ஒரு மருத்துவர் தந்திருந்தால்",
  "தற்போதைய மருந்துகள், அல்லது அவற்றின் பட்டியல்",
  "முந்தைய பரிசோதனை முடிவுகள் அல்லது Imaging",
  "Insurance Card அல்லது Policy விவரங்கள்",
];

export const paymentNotes = [
  "சிகிச்சை தொடங்குவதற்கு முன் ஒரு எழுத்து மூல Estimate தரப்படும்",
  "Cash, Card மற்றும் Bank Transfer அனைத்தும் ஏற்கப்படும்",
  "Insurance Paperwork Desk இல் தயார் செய்யப்படும்",
  "OPD நோயாளர்களுக்கு ஆய்வுகூட கட்டணங்களில் 10% தள்ளுபடி",
];

export const comforts = [
  "இலவச Parking",
  "இலவச Wifi",
  "ஒரு Cafeteria",
  "அறைகளில் Attendant இடம்",
  "உணவுக் கட்டுப்பாட்டு ஆணைகளுக்கேற்ப உணவு",
  "தொழுகை அறை",
  "சக்கர நாற்காலி வசதி",
  "Card மற்றும் Transfer கொடுப்பனவுகள்",
  "கோரிக்கையின் பேரில் மொழிபெயர்ப்பாளர்கள்",
  "அமைதியான வருகை நேரங்கள்",
];

export const hero = {
  eyebrow: "மருத்துவ சேவைகள்",
  heading: { line1: "ஒவ்வொரு சேவையும்,", accentPrefix: "ஒரே ", accent: "கூரையின் கீழ்." },
  body: "ஒன்பது சிறப்பு மையங்களில் {count} சேவைகள்: Emergency, அறுவை சிகிச்சை, நோய் கண்டறிதல் மற்றும் குடும்ப சிகிச்சை, நீங்கள் வந்த பிரச்சினையை மையமாகக் கொண்டு, அதற்கு சிகிச்சை அளிக்கும் துறையை மையமாகக் கொள்ளாமல்.",
  cta: "அடைவைத் திறக்கவும்",
};

export const jumpCardsCopy = { exploreLabel: "ஆராயுங்கள்" };

export const centresSection = {
  eyebrow: "01 / சிறப்பு மையங்கள்",
  heading: "ஒரு பிரச்சினையை மையமாகக் கொண்டு கட்டப்பட்ட ஒன்பது பிரிவுகள்",
};

export const directory = {
  eyebrow: "02 / முழு அடைவு",
  headingAll: "நாங்கள் சிகிச்சை அளிக்கும் அனைத்தும்",
  headingFiltered: "{group} சேவைகள்",
  countLine: "{total} இல் {shown} சேவைகள்",
  filterAriaLabel: "பிரிவின் அடிப்படையில் சேவைகளை Filter செய்யுங்கள்",
  readMore: "{title} பற்றி மேலும் படிக்கவும்",
};

export const surgicalSection = {
  eyebrow: "03 / அறுவை சிகிச்சைத் துறை",
  heading: { line1: "ஏழு நிபுணத்துவங்கள்,", line2: "ஒரே அறுவை சிகிச்சை தரம்" },
  body: "பொது, எலும்பியல், ENT, Urological, கண், Neuro- மற்றும் Gastrointestinal அறுவை சிகிச்சைகள் முழுவதும் நிபுணர் Lead செய்யும் Lists, ஒவ்வொன்றும் அதன் சொந்த Anaesthesia சேவையுடனும் அறுவை சிகிச்சை அரங்கிலிருந்து Discharge வரை Assign செய்யப்பட்ட Recovery Nurse உடனும்.",
  cta: "அறுவை சிகிச்சை Consultation ஐக் கோருங்கள்",
};

export const diagnosticsSection = {
  eyebrow: "04 / நோய் கண்டறிதல் மற்றும் கதிரியக்கவியல்",
  heading: "ஆய்வுகூடம், Imaging மற்றும் Endoscopy",
  cta: "ஒரு பரிசோதனையை Book செய்யுங்கள்",
};

export const packagesSection = {
  eyebrow: "05 / சுகாதார பரிசோதனைகள்",
  heading: "ஒரு காலையில் Screening",
};

export const admissionsSection = {
  eyebrow: "06 / அனுமதிகள்",
  heading: "நான்கு படிகள், ஆச்சரியங்கள் இல்லை",
  bringWithYouHeading: "கொண்டு வர வேண்டியவை",
  paymentHeading: "கொடுப்பனவு மற்றும் Insurance",
  roomsHeading: "அறைகள்",
  roomsBody: "Attendant இடத்துடன் Private மற்றும் Semi-Private அறைகள், இரண்டு மணி நேர சுழற்சியில் சுத்தம் செய்யப்படும்.",
  roomsCta: "அறைகளைப் பார்க்கவும்",
};

export const facilitiesSection = {
  eyebrow: "07 / வசதிகள்",
  heading: { line1: "முழு தங்கலுக்கும்", line2: "கட்டப்பட்ட Campus" },
  comfortsHeading: "அன்றாட வசதிகள்",
};

export const facilityCards = [
  {
    title: "ஒரு Campus, ஆறு மாடிகள்",
    body: "நீர்கொழும்பில் விசேடமாக கட்டப்பட்ட மருத்துவமனை, Ambulance Bay மற்றும் Outpatients இருவருக்கும் கூரையுள்ள வருகையுடன்.",
    linkLabel: "விபத்து மற்றும் அவசர சிகிச்சையைப் பார்க்கவும்",
  },
  {
    title: "Reception மற்றும் OPD",
    body: "24 மணி நேர Outpatient பிரிவு, நீங்கள் எப்போது வந்தாலும் Emergency நுழைவுக்கு அருகில் பணியாளர்களுடன்.",
    linkLabel: "அனுமதிகளைப் பார்க்கவும்",
  },
  {
    title: "வார்டுகள், அறைகள் மற்றும் ICU",
    body: "ஒரு இரவுக்கு LKR 10,000 முதல் Private மற்றும் Semi-Private அறைகள், அதிக Dependency சிகிச்சைக்கு முழு ICU உடன்.",
    linkLabel: "தீவிர சிகிச்சையைப் பார்க்கவும்",
  },
  {
    title: "Ambulance நுழைவு",
    body: "எங்கள் சொந்த Ambulance வாகனங்கள் சேவை செய்யும் கூரையுள்ள நுழைவு, Bandaranaike International இலிருந்து பத்து நிமிடங்கள்.",
    linkLabel: "வெளிநாட்டு சிகிச்சையைப் பார்க்கவும்",
  },
];

export const pharmacySection = {
  eyebrow: "08 / Pharmacy",
  heading: { line1: "நம்பகமான மருந்து,", line2: "பகலோ இரவோ" },
  body: "Counter இல் Authorized Stock மட்டுமே உள்ளது, அதை ஒப்படைப்பதற்கு முன் அல்லது Delivery க்கு அனுப்புவதற்கு முன் ஒரு Pharmacist ஒவ்வொரு Order ஐயும் உங்கள் File க்கு எதிராக சரிபார்ப்பார். Digital Records மீண்டும் ஒரு Order எடுப்பதை எளிதாக்குகிறது, Delivery நீர்கொழும்பு முழுவதும் வீடுகளை அடைகிறது.",
  cta: "Pharmacy ஐப் பார்வையிடவும்",
};

export const pharmacyFacts = [
  { name: "நேரம்", note: "24 மணி நேரமும் திறந்திருக்கும்" },
  { name: "எங்களிடம் உள்ள Stock", note: "Authorized மருந்து மட்டுமே" },
  { name: "Dispatch சரிபார்ப்பு", note: "முதலில் ஒரு Pharmacist உறுதிப்படுத்துவார்" },
  { name: "Delivery சேவை", note: "நீர்கொழும்பு முழுவதும்" },
  { name: "மீண்டும் Prescriptions", note: "Digital ஆக File செய்யப்பட்டுள்ளது" },
];

export const internationalSection = {
  eyebrow: "09 / வெளிநாட்டு நோயாளர்கள்",
  heading: "விமான நிலையத்திலிருந்து பத்து நிமிடங்கள்",
};

export const bookSection = {
  // "முன்பதிவு" matches navigationLabels.ta.ts's own FOOTER_HEADINGS
  // "Booking" entry exactly, rather than keeping "Book" English here.
  eyebrow: "10 / முன்பதிவு",
  heading: "உங்களுக்கு தேவையானதை எங்களிடம் சொல்லுங்கள்",
  body: "கீழே உள்ள எண்ணுக்கு Call செய்யுங்கள் அல்லது உங்கள் விவரங்களை அனுப்புங்கள். ஒரு Coordinator உங்களை சரியான துறைக்குப் பொருத்தி எதுவும் தொடங்குவதற்கு முன் ஒரு திட்டத்தை உறுதிப்படுத்துவார்.",
  contactCta: "எங்களைத் தொடர்பு கொள்ள",
  browseServices: "சேவைகளை பார்வையிடுங்கள்",
};

export const allServicesLabel = "அனைத்து சேவைகளும்";

export const detailChrome = {
  aboutCoversHeading: "இது உள்ளடக்குவது",
  aboutConditionsHeading: "அதிகம் காணப்படும் நிலைமைகள்",
  addressLine: "229/10 St. Joseph Street, நீர்கொழும்பு",
  journeyHeading: "உங்கள் வருகை, படிப்படியாக",
  prepHeading: "எப்படி தயார் செய்வது",
  teamHeading: "இந்த சேவையின் குழு",
  relatedHeading: "தொடர்புடைய சேவைகள்",
  faqHeading: "நீங்கள் கேட்பதற்கு முன் கேட்கப்பட்டவை",
  bookHeading: "இன்றே {cta}.",
  backToServices: "அனைத்து சேவைகளுக்கும் திரும்பு",
};

export const internationalSteps = [
  {
    title: "விமான நிலையம் முதல் படுக்கை வரை",
    desc: "Bandaranaike International இலிருந்து பத்து நிமிடங்கள், Transfer க்காக எங்கள் சொந்த Ambulance கிடைக்கும்.",
  },
  {
    title: "எழுத்து மூல Estimates",
    desc: "சிகிச்சை தொடங்குவதற்கு முன் ஒரு எழுத்து மூல Estimate வழங்கப்படும், சிகிச்சையின் சாத்தியமான போக்கை உள்ளடக்கியது.",
  },
  {
    title: "Insurance மற்றும் Claims",
    desc: "எங்கள் Desk வெளிநாட்டு Insurers க்கான Documentation தயார் செய்து Claims இல் உதவும்.",
  },
  {
    title: "மொழி ஆதரவு",
    desc: "உங்கள் வருகை முழுவதும் கோரிக்கையின் பேரில் மொழிபெயர்ப்பாளர்கள் கிடைப்பர்.",
  },
  {
    title: "வீட்டிற்குக் கொண்டு செல்ல Records",
    desc: "உங்கள் Reports, Imaging Referrals மற்றும் Discharge Summary இன் பிரதிகளை உங்களுடன் கொண்டு செல்ல.",
  },
  {
    title: "Online ஆக Follow-up",
    desc: "நீங்கள் வீடு திரும்பியதும் ஒரு Telemedicine Consultation உங்கள் சிகிச்சையைத் தொடரும்.",
  },
];
