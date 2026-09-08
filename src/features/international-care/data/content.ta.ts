// Tamil for the international care page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns and
// clinical or business terms stay in English rather than being replaced by
// literary coinages nobody says out loud. So "Email", "WhatsApp", "OPD",
// "X-ray", "CT", "MRI" and "Bandaranaike International Airport" stay in
// English throughout, the same way they already do in contact's, about's,
// e-channeling's, accommodation's, home-care's, pharmacy's and network's own
// content.ta.ts. "Insurance" translates to "காப்பீடு", the same word
// network's own content.ta.ts already uses.
//
// "Negombo" translates to "நீர்கொழும்பு" and "Colombo" translates to
// "கொழும்பு", the same Tamil names contact's, pharmacy's and network's own
// content.ta.ts already use for the first of them.
//
// "10,000 LKR" keeps its currency code and figure exactly as content.ts
// prints them: a currency code is not a word with a Tamil equivalent, the
// same way a phone number or an href is not.
//
// Only translatable copy lives here. Every href, value, glyph and ordinal
// "no" stays in content.ts and has exactly one home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {};

/** Scrolling strip along the bottom of the hero. */
export const tickerItems: readonly string[] = [
  "Bandaranaike International இலிருந்து பத்து நிமிடங்கள்",
  "Transfer க்காக எங்கள் சொந்த Ambulance கிடைக்கும்",
  "கோரிக்கையின் பேரில் Interpreters",
  "Insurance ஆவணங்கள் Desk இல் தயார் செய்யப்படும்",
  "ஒரு Attendant அறையில் தங்குவார்",
  "Records உங்கள் சொந்த மருத்துவருக்கு அனுப்பப்படும்",
];

/** Fact strip along the bottom of the hero. */
export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const jumpCards = [
  { count: "6 படிகள்", note: "முதல் Email முதல் திரும்பும் Flight வரை." },
  { count: "10 சேவைகள்", note: "போக்குவரத்து, Interpreters, Insurance, பதிவுகள்." },
  { count: "எழுத்துப்பூர்வமாக", note: "மக்கள் ஏன் இங்கு வருகிறார்கள், எவ்வளவு காலம்." },
  { count: "10 பதில்கள்", note: "வருகை, Insurance, Records, வீடு திரும்புதல்." },
];

/** The numbered eyebrow above every section heading. */
export const sectionEyebrows = {};

export const journeyHeading = {};
export const journeyIntro =
  "யாரும் ஒரு Department இலிருந்து மற்றொன்றுக்கு அனுப்பப்படுவதில்லை. உங்கள் முதல் Email க்கு பதிலளிக்கும் Desk தான், உங்கள் Transfer ஐ ஏற்பாடு செய்து, நீங்கள் வீட்டிற்கு எடுத்துச் செல்லும் Pack ஐயும் முடிக்கிறது.";

/** `#journey`: the same six stages as the home page's international band, told
 *  in the order a travelling patient meets them. */
export const journeySteps = [
  {
    desc: "எங்கள் மருத்துவர்களில் ஒருவருடன் Video அல்லது Phone மூலம், தினமும் ஒதுக்கப்படும் Consultation, நீங்கள் ஒரு Ticket வாங்குவதற்கு முன் சிகிச்சை உங்களுடன் விவாதிக்கப்படும்.",
    when: "பயணிப்பதற்கு முன்",
  },
  {
    desc: "சிகிச்சை தொடங்குவதற்கு முன் ஒரு எழுத்துப்பூர்வ Estimate வழங்கப்படும், சாத்தியமான சிகிச்சை போக்கை உள்ளடக்கியது. உங்கள் Policy விவரங்களை அனுப்புங்கள், Desk அதனுடன் Insurance ஆவணங்களை தயார் செய்யும்.",
    when: "Admission க்கு முன்",
  },
  {
    desc: "Bandaranaike International Airport இலிருந்து பத்து நிமிடங்கள், Transfer க்காக எங்கள் சொந்த Ambulance கிடைக்கும். உங்கள் Flight ஐ எங்களுக்குச் சொல்லுங்கள், நீங்கள் இறங்குவதற்கு முன்பே Transfer மற்றும் Admission ஏற்பாடு செய்யப்படும்.",
    when: "வரும் நாள்",
  },
  {
    desc: "Photo ID, மருத்துவர் ஒருவர் தந்திருந்தால் ஒரு Referral Letter, உங்கள் தற்போதைய மருந்துகள் மற்றும் முந்தைய Imaging ஏதேனும் கொண்டு வாருங்கள். Consultation க்கும் Consent உரையாடலுக்கும் கோரிக்கையின் பேரில் ஒரு Interpreter ஏற்பாடு செய்யப்படும்.",
    when: "வரும் நாள்",
  },
  {
    desc: "ஒரு Attendant அறையில் தங்குவார், ஒவ்வொரு Category இலும் ஒரு Bystander படுக்கையும் நாற்காலியும் உணவும் Dietary Order படி. Critical Care இலிருந்து, குடும்ப உறுப்பினர் ஒருவருக்கு நாளொன்றுக்கு ஒரு Update Call செய்யப்படும்.",
    when: "நீங்கள் தங்கியிருக்கும் போது",
  },
  {
    desc: "உங்கள் Reports, Imaging மற்றும் Discharge Summary இன் நகல்களுடன் நீங்கள் வெளியேறுவீர்கள், Follow-up தேதியுடன் கூடிய ஒரு Discharge Plan உடன். உங்கள் Consent உடன் அதே Pack உங்கள் சொந்த மருத்துவருக்கும் அனுப்பப்படும்.",
    when: "வீடு திரும்புதல்",
  },
];

export const servicesHeading = {};
export const servicesIntro =
  "ஒரு Desk Transfer, Estimate, Insurance ஆவணங்கள், Interpreter மற்றும் நீங்கள் எடுத்துச் செல்லும் Records ஐ கையாளும். வெளிநாட்டு Desk ஐ முதன்மை நுழைவாயிலில் கேளுங்கள், அல்லது முன்கூட்டியே எழுதுங்கள், நீங்கள் இறங்குவதற்கு முன் அது ஏற்பாடு செய்யப்படும்.";

/** `#services`: what the international desk handles, on the dark band. */
export const deskServices = [
  {
    kind: "பயணிப்பதற்கு முன்",
    desc: "Telemedicine எங்கள் மருத்துவர்களில் ஒருவருடன் Video அல்லது Phone மூலம், தினமும் ஒதுக்கப்படும் Consultation ஐ வழங்குகிறது. நேரடியாக பரிசோதனை தேவையில்லாத ஒரு உரையாடலுக்கு இது பொருந்தும், Flight க்கு முன் பெரும்பாலானவை அப்படித்தான்.",
  },
  {
    kind: "போக்குவரத்து",
    desc: "Bandaranaike International Airport இலிருந்து பத்து நிமிடங்கள், மத்திய நீர்கொழும்பில் St. Joseph Street இல். Transfer க்காக எங்கள் சொந்த Ambulance கிடைக்கும், நோயாளர்கள் வரும் Covered Bay இலிருந்தே அனுப்பப்படும்.",
  },
  {
    kind: "மொழி",
    desc: "எங்கள் Clinicians ஆங்கிலத்தில் Consult செய்கிறார்கள், கோரிக்கையின் பேரில் Interpreters ஏற்பாடு செய்யப்படும். பயணிப்பதற்கு முன் Desk இடம் சொல்லுங்கள், அப்போது உங்கள் Consultation, Consent உரையாடல் மற்றும் Discharge Briefing க்கு ஒருவர் இருப்பார்.",
  },
  {
    kind: "பணம்",
    desc: "சிகிச்சை தொடங்குவதற்கு முன் எழுத்துப்பூர்வ Estimate. Cash, Card மற்றும் Bank Transfer அனைத்தும் ஏற்கப்படும், Outpatients க்கு Laboratory கட்டணங்களில் 10% தள்ளுபடி.",
  },
  {
    kind: "காப்பீடு",
    desc: "சர்வதேச Insurers மற்றும் Travel Policies களுக்காக ஆவணங்கள் தயார் செய்யப்படும், Claim ஐ உங்களிடம் விடுவதற்குப் பதிலாக Desk உதவுகிறது. Corporate Insurance OPD இல் ஏற்கப்படும்.",
  },
  {
    kind: "குடும்பம்",
    desc: "ஒவ்வொரு அறை Category இலும் ஒரு Bystander படுக்கையும் நாற்காலியும் உள்ளது, ஒரு Attendant இரவில் தங்கலாம். Admission இல் குறிக்கப்பட்ட Dietary Order படி உணவு தயார் செய்யப்படும்.",
  },
  {
    kind: "பரிசோதனைகள்",
    desc: "Laboratory Reports அன்றே கிடைக்கும், இரு மருத்துவர்களால் Check செய்யப்படும், X-ray ஒரு மணி நேரத்திற்குள் படிக்கப்படும், Ultrasound வருகையின்போதே. CT மற்றும் MRI இங்கு செய்யப்படுவதில்லை, Referral மூலம் ஏற்பாடு செய்யப்படும்.",
  },
  {
    kind: "நீங்கள் இங்கு இருக்கும்போது",
    desc: "முதன்மை நுழைவாயில் அருகில் இலவச Parking, இலவச Wifi, ஒரு Cafeteria, ஒரு Patient Lounge, ஒரு Prayer Room, Wheelchair Access மற்றும் அமைதியான Visiting நேரங்கள். Ground Floor இல் 24 மணி நேர Pharmacy.",
  },
  {
    kind: "நீங்கள் புறப்பட்ட பிறகு",
    desc: "உங்கள் Reports, Imaging Referrals மற்றும் Discharge Summary இன் நகல்களை உங்களுடன் எடுத்துச் செல்லுங்கள், உங்கள் Consent உடன் அதே Pack உங்கள் சொந்த மருத்துவருக்கும் அனுப்பப்படும்.",
  },
  {
    kind: "Follow-up சிகிச்சை",
    desc: "இங்கு பார்க்கப்பட்டு வீடு திரும்பிய நோயாளர்களுக்கு Follow-up க்காக Telemedicine பயன்படுத்தப்படுகிறது, இது உங்கள் அடுத்த சிகிச்சை படியிலும் அதே மருத்துவரை ஈடுபடுத்துகிறது.",
  },
];

/**
 * `#estimates`: what people actually travel here for. Only treatments the repo
 * publishes appear, and `stay` uses the repo's own wording rather than a night
 * count the hospital has not committed to.
 */
export const estimatesHeading = {};
export const estimatesIntro =
  "உங்கள் Reports அனுப்புங்கள், Estimate எழுத்துப்பூர்வமாக திரும்பி வரும், சாத்தியமான சிகிச்சை போக்கை உள்ளடக்கியது. இது ஒரு Price List ஐ விட உங்கள் Scans ஐ பின்பற்றுகிறது, ஏனெனில் உங்கள் Scans தான் தீர்மானிக்கின்றன.";

export const treatments = [
  {
    name: "சுகாதார பரிசோதனை",
    note: "Bloods மற்றும் Biochemistry, Urine பகுப்பாய்வு, மார்பு X-ray மற்றும் Report Review உடன் ஒரு மருத்துவ Consultation",
    stay: "Outpatient Visit ஒன்று",
  },
  {
    name: "Hernia சரிசெய்தல்",
    note: "Inguinal அல்லது Umbilical, குணமாகும் நேரத்தைக் குறைத்தால் Laparoscopic, இல்லையேல் Mesh உடன் Open",
    stay: "Day Case அல்லது ஒரு இரவு",
  },
  {
    name: "Gallbladder அகற்றுதல்",
    note: "திட்டமிடப்பட்ட Operating List இல், உங்கள் Case க்கு பொருந்தினால் Laparoscopic, Consultant தலைமையிலான Anaesthesia உடன்",
    stay: "Day Case அல்லது ஒரு இரவு",
  },
  {
    name: "Appendix அறுவை சிகிச்சை",
    note: "திட்டமிடப்பட்ட அல்லது அவசர, எந்நேரமும் Surgical மற்றும் Anaesthetic குழுக்கள் தயார்",
    stay: "Day Case அல்லது ஒரு இரவு",
  },
  {
    name: "முழங்கால் அல்லது தோள்பட்டை Arthroscopy",
    note: "Day Case Orthopaedic அறுவை சிகிச்சை, Discharge முன் ஒப்புக்கொள்ளப்பட்ட Physiotherapy திட்டத்துடன்",
    stay: "Day Case ஒன்று",
  },
  {
    name: "எலும்பு முறிவு சரிசெய்தல்",
    note: "Inpatient Orthopaedic அறுவை சிகிச்சை, அதே Clinic Corridor இல் Imaging எடுக்கப்படும்",
    stay: "உங்கள் Consultation இல் உறுதி செய்யப்படும்",
  },
  {
    name: "Cataract அறுவை சிகிச்சை",
    note: "Day Case, முதல் Visit இல் Lens விருப்பங்கள் விவாதிக்கப்பட்டு, மறுநாள் Review உடன்",
    stay: "Day Case ஒன்று",
  },
  {
    name: "Gastroscopy அல்லது Colonoscopy",
    note: "Consultant Anaesthetist ஒருவரால் Sedation, தேவைப்பட்டால் அதே அமர்வில் Biopsy",
    stay: "Day Procedure ஒன்று",
  },
  {
    name: "Obstetrics மற்றும் பிரசவம்",
    note: "Delivery வரை ஒரு Consultant, தனி Obstetric Theatre மற்றும் அறையிலேயே Neonatal ஆதரவு",
    stay: "உங்கள் Consultant உடன் உறுதி செய்யப்படும்",
  },
  {
    name: "Gynaecology செயல்முறைகள்",
    note: "முதல் Visit இல் Ultrasound உடன் வாராந்திர Clinics, கோரிக்கையின் பேரில் பெண் Staff",
    stay: "Day Case ஒன்று",
  },
  {
    name: "ENT அறுவை சிகிச்சை",
    note: "வாராந்திர பெரியவர் மற்றும் குழந்தை List, அதே Unit இல் Audiology மதிப்பீடு",
    stay: "உங்கள் Consultation இல் உறுதி செய்யப்படும்",
  },
];

/** Sits under the treatment rows, so the ranges above are not read as a quote. */
export const estimateNote =
  "தங்கும் காலம் உங்கள் Surgeon எதிர்பார்ப்பது, ஒரு உத்தரவாதம் அல்ல, உங்கள் Consultation இல் உறுதி செய்யப்படும். சிகிச்சை தொடங்குவதற்கு முன் ஒரு எழுத்துப்பூர்வ Estimate வழங்கப்படும், சாத்தியமான சிகிச்சை போக்கை உள்ளடக்கியது, அது எழுத்துப்பூர்வமாக கிடைக்கும் வரை எதுவும் தொடங்காது. CT மற்றும் MRI தளத்தில் செய்யப்படுவதில்லை, ஒரு Partner Imaging Centre க்கு Referral மூலம் ஏற்பாடு செய்யப்படும்.";

/** `#rooms`: the four categories the hospital actually offers, taken from
 *  `features/facilities/data/content`. Only the standard single carries a
 *  figure, because 10,000 LKR is the sole room price the repo publishes. */
export const roomsHeading = {};
/** Sits under the shared amenity list in `#rooms`. */
export const roomsNote = "Wards முதல் மேலாக, ஒவ்வொரு Category இலும் மேலே உள்ள பட்டியல் standard ஆக உள்ளது.";

export const roomTiles = [
  {
    tier: "ஒரு படுக்கை",
    // "Standard", "Deluxe" and "Super Deluxe" are the hospital's own room
    // class names, kept exactly as accommodation's own content.ta.ts keeps
    // them. See KEEPS_ENGLISH in content.i18n.test.ts.
    name: "Super Deluxe Rooms",
    desc: "Bystander படுக்கை, Sofa மற்றும் நாற்காலி, தேநீர் Station உடன் Pantry பகுதி, Coffee Table மற்றும் Kettle, காலை பத்திரிக்கைகள் கொண்டு வரப்படும்.",
    extra: "தனி Steward சேவை",
  },
  {
    tier: "ஒரு படுக்கை",
    name: "Deluxe Rooms",
    desc: "Bystander படுக்கை மற்றும் Sofa, தேநீர் Station உடன் Pantry பகுதி, Coffee Table மற்றும் சூடான நீர் Kettle.",
    extra: "தேநீர் Station உடன் Pantry",
  },
  {
    tier: "ஒரு படுக்கை",
    name: "Standard Rooms",
    desc: "Bystander படுக்கை மற்றும் நாற்காலி, குளிரூட்டி, தொலைக்காட்சி மற்றும் அறைக்குத் தேவையான மருத்துவ ஆதரவு. ஒரு குறுகிய செயல்முறைக்கான வழக்கமான தேர்வு.",
    extra: "10,000 LKR முதல்",
  },
  {
    tier: "இரண்டு அல்லது மூன்று படுக்கைகள்",
    // Kept as "வார்டுகள்", the same word navigationLabels.ta.ts and
    // accommodation's own content.ta.ts already use for "Wards": unlike
    // "Standard", "Deluxe" and "Super Deluxe", it is not one of the
    // hospital's own room class names, so it translates like any other word.
    name: "வார்டுகள்",
    desc: "தனித்தனி Bystander படுக்கைகள் மற்றும் நாற்காலிகள், தனியுரிமைக்கான படுக்கை Separators மற்றும் குளிரூட்டி, பகல் Visiting உடன்.",
    extra: "பகல் Visiting",
  },
];

/** Shared by every category, so the four tiles above do not repeat them. */
export const roomStandard: readonly string[] = [
  "சூடான & குளிர்ந்த நீர்",
  "தொலைக்காட்சி",
  "இலவச Wifi",
  "குளிரூட்டி",
  "Bystander படுக்கை & நாற்காலி",
  "இரண்டு மணி நேரத்திற்கு ஒரு முறை சுத்தம் செய்யப்படும்",
  "எந்நேரமும் மருத்துவ ஆதரவு",
];

export const billingIntro =
  "சிகிச்சை தொடங்குவதற்கு முன் ஒரு எழுத்துப்பூர்வ Estimate வழங்கப்படும், சாத்தியமான சிகிச்சை போக்கை உள்ளடக்கியது, அது உங்கள் முன் இருக்கும் வரை எதுவும் தொடங்காது. பயணிப்பதற்கு முன் உங்கள் Policy விவரங்களை Desk க்கு அனுப்புங்கள், அதனுடன் Insurance ஆவணங்களும் தயார் செய்யப்படும்.";
/** Eyebrow above `insuranceNotes` in the narrow list panel. */
export const billingSideLabel = "காப்பீடு";

/** Chips inside the accent panel in `#insurance`. */
export const payChips: readonly string[] = [
  "சிகிச்சைக்கு முன் எழுத்துப்பூர்வ Estimate",
  "Cash ஏற்கப்படும்",
  "Card செலுத்துதல்",
  "Bank பரிமாற்றம்",
  "Desk இல் Insurance ஆவணங்கள்",
  "Outpatients க்கு Laboratory கட்டணங்களில் 10% தள்ளுபடி",
];

/** The list beside the accent panel in `#insurance`. */
export const insuranceNotes: readonly string[] = [
  "சர்வதேச Insurers மற்றும் Travel Policies களுக்காக ஆவணங்கள் தயார் செய்யப்படும்",
  "Claim இல் ஆவணங்களை உங்களிடம் விடுவதற்குப் பதிலாக Desk உதவுகிறது",
  "Corporate Insurance OPD இல் ஏற்கப்படும், அதை செய்யும் நீர்கொழும்பின் முதல் மருத்துவமனை",
  "Admission க்கு உங்கள் Insurance Card அல்லது Policy விவரங்களை கொண்டு வாருங்கள்",
  "அவசர காலத்தில் முதலில் மதிப்பீடு செய்து நிலைப்படுத்தப்படுவீர்கள், Billing பின்னர் Settle செய்யப்படும்",
];

export const stayHeading = {};
export const stayIntro =
  "நீர்கொழும்பு ஒரு அமைதியான, நடக்கக்கூடிய கடலோர நகரம், விமான நிலையத்திலிருந்து பத்து நிமிடங்கள் மற்றும் கொழும்பிலிருந்து ஒரு மணி நேரம். பெரும்பாலான நோயாளர்கள் ஒரு செயல்முறைக்குப் பின் தொடர்ந்து பயணிப்பதற்குப் பதிலாக இங்கேயே வாரம் ஒன்று செலவிடுகிறார்கள்.";
export const stayNote =
  "எதையும் திட்டமிடுவதற்கு முன் உங்கள் Consultant இடம் கேளுங்கள். அறுவை சிகிச்சைக்குப் பிறகு பறத்தல், நீச்சல் மற்றும் நீண்ட பயணங்கள் ஒவ்வொன்றிற்கும் அதன் சொந்த கால அளவு உள்ளது, பதில் Operation ஐ பொறுத்தது.";

/** `#stay`: the practical list beside the Negombo copy. */
export const practical = [
  { k: "விமான நிலையத்திலிருந்து", v: "Bandaranaike International இலிருந்து பத்து நிமிடங்கள்" },
  { k: "நாங்கள் இருக்குமிடம்", v: "229/10 St. Joseph Street, மத்திய நீர்கொழும்பில்" },
  { k: "Parking இடம்", v: "இலவசம், முதன்மை நுழைவாயில் அருகில்" },
  { k: "Transfer வசதி", v: "எங்கள் சொந்த Ambulance, எந்நேரமும் கிடைக்கும்" },
  { k: "செலுத்துதல்", v: "Cash, Card மற்றும் Bank Transfer அனைத்தும் ஏற்கப்படும்" },
  { k: "நேர மண்டலம்", v: "GMT ஐ விட ஐந்தரை மணி நேரம் முன்னால், Daylight Saving இல்லை" },
  { k: "வானிலை", v: "ஆண்டு முழுவதும் சூடாகவும் ஈரமாகவும் இருக்கும்" },
  { k: "Pharmacy வசதி", v: "தளத்திலேயே, எந்நேரமும் திறந்திருக்கும்" },
  { k: "Attendant ஒருவர்", v: "ஒவ்வொரு அறை Category இலும் ஒருவர் இரவில் தங்கலாம்" },
  { k: "எந்நேரமும்", v: "0117 84 84 84 மருத்துவமனையை அடையும்" },
];

export const faq = [
  {
    q: "பறப்பதற்கு முன் ஒரு கருத்தை எப்படி பெறுவது?",
    a: "உங்கள் Scans, Laboratory Reports, தற்போதைய மருந்து பட்டியல் மற்றும் ஒரு சுருக்கமான வரலாற்றை வெளிநாட்டு Desk க்கு Email செய்யுங்கள் அல்லது WhatsApp செய்யுங்கள், ஒரு Telemedicine Consultation கேளுங்கள். இது எங்கள் மருத்துவர்களில் ஒருவருடன் Video அல்லது Phone மூலம், தினமும் ஒதுக்கப்படும் Consultation, இது நேரடியாக பரிசோதனை தேவையில்லாத ஒரு உரையாடலுக்கு சரியாக பொருந்தும். சிகிச்சையை மேற்கொள்ளும் மருத்துவருடன் விவாதிக்காமல் யாரும் Ticket வாங்கக் கூடாது.",
  },
  {
    q: "மருத்துவமனை விமான நிலையத்திலிருந்து எவ்வளவு தூரம்?",
    a: "பத்து நிமிடங்கள். நாங்கள் மத்திய நீர்கொழும்பில் 229/10 St. Joseph Street இல் இருக்கிறோம், இது மருத்துவமனையை விமான நிலையத்திற்கும் நகரத்திற்கும் இடையே வைக்கிறது, ஒரு மணி நேரம் தொலைவில் கொழும்பில் அல்ல. Transfer க்காக எங்கள் சொந்த Ambulance கிடைக்கும், நோயாளர்கள் வரும் Covered Bay இலிருந்தே அனுப்பப்படும், உங்களை ஒருவர் Drive செய்தால் முதன்மை நுழைவாயில் அருகில் இலவச Parking உள்ளது.",
  },
  {
    q: "Admission க்கு நான் என்ன கொண்டு வர வேண்டும்?",
    a: "Photo ID, முன்பு இங்கு வந்திருந்தால் உங்கள் OPD Card. மருத்துவர் ஒருவர் தந்திருந்தால் ஒரு Referral Letter. உங்கள் தற்போதைய மருந்துகள், அல்லது Dose களுடன் எழுதப்பட்ட ஒரு பட்டியல். முந்தைய Test Results அல்லது Imaging ஏதேனும் இருந்தால், அது ஏற்கனவே செய்யப்பட்ட வேலையை மீண்டும் செய்வதைத் தடுக்கும். மற்றும் உங்கள் Insurance Card அல்லது Policy விவரங்கள், அப்போது Desk ஆவணங்களை பின்னர் துரத்துவதற்குப் பதிலாக இப்போதே தொடங்கலாம்.",
  },
  {
    q: "எனக்கு ஆங்கிலம் பேச முடியாவிட்டால்?",
    a: "எங்கள் Clinicians ஆங்கிலத்தில் Consult செய்கிறார்கள், கோரிக்கையின் பேரில் Interpreters ஏற்பாடு செய்யப்படும். உங்களுக்கு தேவையான மொழியை அன்றைய நாளில் அல்ல, பயணிப்பதற்கு முன் Desk இடம் சொல்லுங்கள், அப்போது முக்கியமான பகுதிகளுக்கு ஒரு Interpreter இருப்பார்: உங்கள் Consultation, எந்த செயல்முறைக்கும் முன் Consent உரையாடல், மற்றும் வீட்டில் என்ன செய்ய வேண்டும் என்று சொல்லும் Discharge Briefing.",
  },
  {
    q: "ஒரு குடும்ப உறுப்பினர் என்னுடன் தங்கலாமா?",
    a: "ஆம். Wards முதல் Super Deluxe வரை ஒவ்வொரு அறை Category இலும் ஒரு Bystander படுக்கையும் நாற்காலியும் உள்ளது, ஒரு Attendant இரவில் தங்கலாம். Admission இல் குறிக்கப்பட்ட Dietary Order படி உணவு தயார் செய்யப்படும். பொது Wards பகல் Visiting க்காக திறந்திருக்கும்; Critical Care Visiting Unit Desk உறுதி செய்யும் நிலையான நேரங்களுக்கு மட்டுப்படும், குடும்ப உறுப்பினர் ஒருவருக்கு Unit இலிருந்து நாளொன்றுக்கு ஒரு Update Call செய்யப்படும்.",
  },
  {
    q: "எனது Insurance இங்கு வேலை செய்யுமா?",
    a: "சர்வதேச Insurers மற்றும் Travel Policies களுக்காக ஆவணங்கள் தயார் செய்யப்படும், Claim இல் Desk உதவுகிறது, ஒரு Folder ஐ கையில் கொடுத்து அனுப்புவதற்குப் பதிலாக. Corporate Insurance OPD இல் ஏற்கப்படும், அதை செய்யும் நீர்கொழும்பின் முதல் மருத்துவமனை நாங்கள். பயணிப்பதற்கு முன் உங்கள் Policy விவரங்களை Desk க்கு அனுப்புங்கள், நீங்கள் எங்கு நிற்கிறீர்கள் என்று அறிய, Admission க்கு Card ஐயும் கொண்டு வாருங்கள்.",
  },
  {
    q: "எவ்வளவு செலவாகும்?",
    a: "சிகிச்சை தொடங்குவதற்கு முன் ஒரு எழுத்துப்பூர்வ Estimate வழங்கப்படும், சாத்தியமான சிகிச்சை போக்கை உள்ளடக்கியது, அது கிடைக்கும் வரை எதுவும் தொடங்காது. இது Operation, நீங்கள் தேர்ந்தெடுக்கும் அறை மற்றும் தங்கும் காலத்தைப் பொறுத்தது, அதனால்தான் Estimate ஒரு Price List ஐ விட உங்கள் Reports ஐ பின்பற்றுகிறது. Standard Single அறைகள் இரவுக்கு 10,000 LKR முதல் தொடங்குகின்றன, Outpatients க்கு Laboratory கட்டணங்களில் 10% தள்ளுபடி.",
  },
  {
    q: "எனக்கு இங்கு CT அல்லது MRI Scan செய்யலாமா?",
    a: "தளத்தில் இல்லை. CT மற்றும் MRI ஒரு Partner Imaging Centre க்கு Referral மூலம் ஏற்பாடு செய்யப்படும், அதை ஒழுங்கமைக்க உங்களை அனுப்புவதற்குப் பதிலாக Desk உங்கள் சிகிச்சையின் ஒரு பகுதியாக Book செய்கிறது. மற்ற அனைத்தும் இங்கே உள்ளன: Digital X-ray ஒரு மணி நேரத்திற்குள் படிக்கப்பட்டு, Report செய்யப்பட்டு, இரவிலும் கிடைக்கும், Ultrasound வருகையின்போதே, Laboratory வேலை அன்றே Report செய்யப்பட்டு, ஒவ்வொரு Report ம் இரு மருத்துவர்களால் Check செய்யப்படும்.",
  },
  {
    q: "நான் என்ன Records வீட்டிற்கு எடுத்துச் செல்வேன்?",
    a: "உங்கள் Reports, Imaging Referrals மற்றும் Discharge Summary இன் நகல்கள், Follow-up தேதியுடன் கூடிய ஒரு Discharge Plan உடன், யாரையாவது பார்க்கும்படி ஒரு தெளிவற்ற அறிவுறுத்தலுக்குப் பதிலாக. உங்கள் Consent உடன் அதே Pack உங்கள் சொந்த மருத்துவருக்கும் அனுப்பப்படும், அதனால் உங்களை அடுத்து பார்க்கும் நபர் இங்கு உண்மையில் நடந்ததை அடிப்படையாகக் கொண்டு செயல்படுவார்.",
  },
  {
    q: "அறுவை சிகிச்சைக்குப் பிறகு நான் எவ்வளவு விரைவில் வீடு பறக்க முடியும்?",
    a: "இது முற்றிலும் Operation ஐ பொறுத்தது, எனவே திரும்பும் பயணத்தை Book செய்வதற்கு முன் உங்கள் Surgeon இடம் கேளுங்கள், மாற்றக்கூடிய Ticket ஒன்றைத் தேர்வு செய்யுங்கள். Recovery உங்கள் Flight ஐ விட நீண்டால், நீங்கள் பயணித்த பிறகும் Telemedicine அதே மருத்துவரை ஈடுபடுத்துகிறது: Video அல்லது Phone மூலம் தினமும் ஒதுக்கப்படும் ஒரு Review, உங்கள் Chart ஐ ஒருபோதும் பார்க்காத ஒருவருடன் மீண்டும் தொடங்குவதற்குப் பதிலாக.",
  },
];

export const enquiryHeading = {};
export const enquiryIntro =
  "உங்கள் Scans, Reports, தற்போதைய மருந்துகள் மற்றும் ஒரு சுருக்கமான வரலாற்றை Email செய்யுங்கள் அல்லது WhatsApp செய்யுங்கள். Desk சரியான மருத்துவருடன் Video அல்லது Phone மூலம் ஒரு Consultation ஐ ஏற்பாடு செய்யும், எதையும் Book செய்வதற்கு முன் எழுத்துப்பூர்வ Estimate பின்தொடரும்.";

/** Chips inside the accent panel in `#enquiry`. */
export const enquiryChips: readonly string[] = [
  "Scans மற்றும் Reports",
  "தற்போதைய மருந்துகள்",
  "Photo ID அல்லது Passport",
  "Insurance விவரங்கள்",
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

