// Tamil for the facilities page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns and
// clinical, engineering and business terms stay in English rather than being
// replaced by literary coinages nobody says out loud. "Consultant",
// "Recovery", "Theatre", "Instrument", "Consumables", "Digital", "Fleet",
// "Dispatch", "Bay" and the named equipment and procedures below stay in
// English inside sentences, the same way `network`'s, `pharmacy`'s and
// `international-care`'s own content.ta.ts already keep them. "Call" and
// "Track" stay verbs exactly like they are in `contact`'s and `home-care`'s
// own content.ta.ts. "Instrument" and "Consumables" do NOT extend to the
// bare `theatreSpecs`/`hygieneRows` table labels: see the
// "Protocol"/"Anaesthesia" paragraph below, which now covers those two
// labels as well.
//
// "Diagnostics" already has a site-wide translation in navigationLabels.ta.ts,
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
// way `about`'s and `international-care`'s own content.ta.ts keep "Digital
// X-ray", "Gastroscopy", "Colonoscopy" and "Biopsy": this is how these are
// said in Tamil too, not a gap. ICU, PACU and NEO are the international
// clinical unit abbreviations, kept English the same way "OPD" is. See
// KEEPS_ENGLISH in content.i18n.test.ts for the exact list.
//
// "Protocol", "Anaesthesia", "Instrument sets" and "Consumables" translate
// to "நெறிமுறை", "மயக்கவியல்", "கருவி தொகுப்புகள்" and "நுகர்வுப் பொருட்கள்"
// here rather than staying English: unlike `network`'s own use of
// "Protocol"/"Anaesthesia" (and this file's own use of "Instrument
// Set"/"Consumables") inside a full sentence, these are bare table labels in
// `theatreSpecs`/`hygieneRows`, sitting beside fully translated siblings
// (Obstetric Theatre, Emergency Cover; "Recovery Bay" and "Recovery Nursing"
// keep their English noun but translate the qualifier before it), so
// leaving any of them alone would be the sibling-test miss the recipe warns
// about, not a genuine exception. An earlier pass shipped "Instrument Set"
// and "Consumables Stock" for the last two labels, which differ from the
// English by a dropped bracket or a singularised word but translate
// nothing; fixed to real Tamil.
//
// Sentence forms use the polite plural ("செய்யுங்கள்"), which is how a
// hospital addresses a patient it has not met, the same register `contact`'s
// own content.ta.ts uses throughout.
//
// Only translatable copy lives here. Every href, value, glyph, internal flag,
// ordinal numeral, image path, alt text and price stays in content.ts and has
// exactly one home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
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
  "கூரையுள்ள Ambulance Bay",
  "ஆய்வுகூடம் 24 மணி நேரமும் திறந்திருக்கும்",
  "Sterile Instrument Sets அனைத்தும் Track செய்யப்படும்",
  "ஒவ்வொரு அறையிலும் Attendant க்கு இடம்",
  "இலவச Parking மற்றும் Wifi",
  "ஒவ்வொரு 2 மணி நேரத்திற்கும் சுத்தம் செய்யப்படும்",
];

export const jumpCards = [
  {
    count: "6 மாடிகள்",
    note: "எந்த துறைகள் ஒன்றாக இருக்கின்றன, ஏன்.",
  },
  {
    count: "Monitor செய்யப்படும் படுக்கைகள்",
    note: "அறுவை சிகிச்சை அரங்குகளுக்கு அருகில் தீவிர சிகிச்சை.",
  },
  {
    count: "4 வகைகள்",
    note: "பகிரப்பட்ட வார்டு முதல் Super Deluxe அறை வரை.",
  },
  {
    count: "24 மணி நேரமும்",
    note: "எங்கள் சொந்த Fleet, எங்கள் சொந்த Bay இலிருந்தே Dispatch செய்யப்படும்.",
  },
];

export const buildingHeading = {};
export const buildingIntro =
  "ஒன்றாக வேலை செய்யும் துறைகள் ஒன்றாகவே இருக்கும், அதனால் Clinic இல் Order செய்யப்படும் Scan ஒன்று நகரம் முழுவதும் ஒரு பயணமாக மாறாது.";

export const buildingZones = [
  {
    name: "அவசரம் மற்றும் வருகை",
    contents:
      "கூரையுள்ள Ambulance நுழைவு, Resuscitation Bay, Admissions Desk, 24 மணி நேர Pharmacy மற்றும் முதன்மை வாசலுக்கு அருகில் Parking.",
  },
  {
    name: "Clinics மற்றும் Outpatients",
    contents:
      "ஒவ்வொரு சிறப்புத் துறைக்கும் Consulting Suites, 24 மணி நேரமும் திறந்திருக்கும் Outpatient துறை மற்றும் Physiotherapy.",
  },
  {
    // Reused verbatim from navigationLabels.ta.ts's "Diagnostics" ->
    // "நோய் கண்டறிதல்".
    name: "நோய் கண்டறிதல்",
    contents:
      "24 மணி நேர ஆய்வுகூடம், Digital X-ray, Ultrasound, ECG மற்றும் Echocardiography, மற்றும் Endoscopy பிரிவு.",
  },
  {
    name: "அறுவை சிகிச்சை அரங்குகள் மற்றும் குணமாதல்",
    contents:
      "அருகிலேயே Recovery Bay உடன் அறுவை சிகிச்சை அரங்குகள், பொது Lists இலிருந்து தனியாக வைக்கப்பட்ட Obstetric Theatre மற்றும் Sterile Services.",
  },
  {
    // Reused verbatim from navigationLabels.ta.ts's "Critical care" ->
    // "தீவிர சிகிச்சை".
    name: "தீவிர சிகிச்சை",
    contents:
      "அறுவை சிகிச்சை அரங்குகள் மற்றும் அவசரத் துறைக்கு அருகில் Intensive Care படுக்கைகள், தேவைப்படும் புதிதாகப் பிறந்த குழந்தைகளுக்கு Neonatal ஆதரவுடன்.",
  },
  {
    name: "வார்டுகள் மற்றும் அறைகள்",
    contents:
      "Standard, Deluxe மற்றும் Super Deluxe அறைகள், Bed Separators உடன் பகிரப்பட்ட வார்டுகள், Nursing Stations மற்றும் குடும்ப காத்திருப்பு இடம்.",
  },
];

export const showcaseCards = [
  {
    body: "நேரடியாகப் பின்னால் Resuscitation Bay உடன் கூரையுள்ள நுழைவு, நாளின் ஒவ்வொரு நேரத்திலும் Staff உடன்.",
  },
  {
    body: "Registration மற்றும் Admission க்கு ஒரு Desk, Corridor ஐ விட காத்திருப்பு இடம் போன்ற இருக்கைகளுடன்.",
  },
  {
    body: "ஆய்வுகூடம், Digital X-ray மற்றும் Ultrasound, Consulting Suites மற்றும் அவசரத் துறை Bay இலிருந்து சில மீட்டர்களில் அமைந்துள்ளன.",
  },
  {
    body: "ஒரு நோயாளர் அறுவை சிகிச்சை அரங்கிலிருந்து வெளியேறும் ஒவ்வொரு முறையும் ஒரு Nurse Assign செய்யப்படும் Recovery Bay உடன் Operating Suites.",
  },
];

export const theatresHeading = {};
export const theatresIntro1 =
  "எங்கள் அறுவை சிகிச்சை அரங்குகள் US Surgical நெறிமுறைப்படி இயங்குகின்றன, ஒவ்வொரு Instrument Set உம் Track செய்யப்படும். Instruments மற்றும் Consumables ஒவ்வொரு நோயாளருக்கும் ஒரே முறை Use செய்யப்படும், விதிவிலக்கு இல்லாமல்.";
export const theatresIntro2 =
  "நீங்கள் அறுவை சிகிச்சை அரங்கிலிருந்து வெளியேறும் தருணத்திலிருந்து, நீங்கள் ஒரு வார்டு படுக்கைக்கோ அல்லது வீட்டிற்கோ செல்லத் தயாராகும் வரை, ஒரு Recovery Nurse உங்களை Watch செய்ய Assign செய்யப்படுவார். Surgical மற்றும் Anaesthetic குழுக்கள் Call இல் இருப்பார்கள், அதனால் அவசர அறுவை சிகிச்சை மாற்றலுக்குப் பிறகு அல்ல இங்கேயே நடக்கும்.";

export const theatreFigures = [
  { label: "குணமாகும் காலத்தில் Nursing" },
  { label: "மீண்டும் பயன்படுத்தப்படாத Consumables" },
  { label: "Call இல் உள்ள அறுவை சிகிச்சை அரங்க ஆதரவு" },
];

export const theatreSpecs = [
  { k: "நெறிமுறை", v: "US தரம்" },
  // Was "Instrument Set": a plural-to-singular change with no actual
  // translation. As a bare table label (not the sentence usage of
  // "Instrument Set" elsewhere in this file), it sits beside four fully
  // translated siblings (நெறிமுறை, மயக்கவியல், மகப்பேறு அறுவை சிகிச்சை
  // அரங்கு, அவசர ஆதரவு), the same sibling-test miss the file's own comment
  // above already flags for "Protocol"/"Anaesthesia". Translated fully:
  // "instrument sets".
  { k: "கருவி தொகுப்புகள்", v: "Set ஒன்றுக்கு Track செய்யப்படும்" },
  // Was "Consumables Stock": "Stock" does not appear in the English base at
  // all, it was added to make the string differ from "Consumables" without
  // translating anything. Translated fully: "consumable goods", the
  // standard Tamil technical term.
  { k: "நுகர்வுப் பொருட்கள்", v: "நோயாளர் ஒருவருக்கு ஒரே முறை Use செய்யப்படும்" },
  { k: "மயக்கவியல்", v: "Consultant தலைமையில்" },
  { k: "குணமாகும் Bay", v: "அறுவை சிகிச்சை அரங்குகளுக்கு அருகில்" },
  // Same translated phrase as `theatreFigures[0].label`, which content.ts's
  // own `k: theatreFigures[0].label` reuses in English: a string used twice
  // has one home, so both must read the same way here too.
  { k: "குணமாகும் காலத்தில் Nursing", v: "ஒன்றுக்கு ஒன்று" },
  { k: "மகப்பேறு அறுவை சிகிச்சை அரங்கு", v: "தனியாக வைக்கப்பட்டுள்ளது" },
  { k: "அவசர ஆதரவு", v: "Call இல், 24 மணி நேரமும்" },
];

export const criticalHeading = {};
export const criticalIntro =
  "Ventilation அல்லது நெருக்கமான கண்காணிப்பு தேவைப்படும் நோயாளர்களுக்கு, அறுவை சிகிச்சைக்குப் பிறகு, அல்லது வேறு எதுவும் நடப்பதற்கு முன் Stabilise செய்யப்பட Monitor செய்யப்படும் படுக்கைகள்.";

export const careUnits = [
  {
    // "ICU", "PACU" and "NEO" are restated rather than omitted: KEEPS_ENGLISH
    // in content.i18n.test.ts covers these three paths (see the file
    // header), but the parity test still requires every path to be
    // explicitly filled.
    code: "ICU",
    name: "தீவிர சிகிச்சைப் பிரிவு",
    desc: "Ventilation அல்லது நெருக்கமான கண்காணிப்பு தேவைப்படும் நோயாளர்களுக்கு Monitor செய்யப்படும் படுக்கைகள், அறுவை சிகிச்சை அரங்குகள் மற்றும் அவசரத் துறைக்கு அருகில்.",
    // Own literal, matching content.ts's own `lead: "Consultant led"`. Reads
    // the same as `theatreSpecs[3].v`'s translation by coincidence of
    // wording, not because it is the same fact: this is who leads the ICU,
    // `theatreSpecs[3]` is who leads anaesthesia during surgery. Do not
    // re-weld these into a shared reference.
    lead: "Consultant தலைமையில்",
  },
  {
    code: "PACU",
    name: "அறுவை சிகிச்சைக்குப் பிறகு குணமாதல்",
    desc: "அறுவை சிகிச்சை அரங்குகளுக்கு அடுத்துள்ள Recovery Bay, அங்கு ஒரு Nurse ஒவ்வொரு நோயாளருக்கும் Assign செய்யப்படுவார், அவர்கள் நகர தயாராகும் வரை.",
    lead: "ஒன்றுக்கு ஒன்று Nursing",
  },
  {
    code: "NEO",
    name: "புதிதாகப் பிறந்தோர் ஆதரவு",
    desc: "குழந்தையின் நிலைமை தேவைப்பட்டால் பிரசவத்தின்போதே Neonatal ஆதரவு, Obstetric Theatre க்கு அடுத்தாக.",
    lead: "Paediatric குழு",
  },
];

export const careNotes = [
  {
    body: "Unit அறுவை சிகிச்சை அரங்குகள் மற்றும் அவசரத் துறைக்கு அருகில் இருப்பதால், வார்டில் அல்லது அறுவை சிகிச்சைக்குப் பிறகு நிலைமை மோசமாகும் நோயாளர் மற்றொரு மருத்துவமனைக்கு மாற்றப்படுவதற்குப் பதிலாக நேரடியாக இங்கு கொண்டு வரப்படுவார்.",
  },
  {
    body: "நோயாளர்கள் ஓய்வெடுக்கவும் குழு தடையின்றி வேலை செய்யவும் Unit க்கு வருகை நிலையான நேரங்களுக்கு மட்டுப்படுத்தப்பட்டுள்ளது. தற்போதைய நேரங்களை ICU Desk உங்களுக்குச் சொல்லும்.",
  },
  {
    body: "ஒரு நாளுக்கு ஒரு முறை குடும்ப உறுப்பினர் ஒருவருக்கு Call வரும், மற்றும் Unit Coordinator வருகை ஏற்பாடுகளையும் வார்டு படுக்கைக்குத் திரும்பும் நடவடிக்கையையும் கையாள்வார்.",
  },
];

export const roomsHeading = {};
export const roomsIntro =
  "ஒவ்வொரு வகையும் அதே 2 மணி நேர Cycle இல் சுத்தம் செய்யப்படும். மாறுவது இடம், தனியுரிமை மற்றும் உங்கள் குடும்பத்திற்குக் கிடைக்கும் இட அளவு.";

export const roomRows = [
  {
    // Restated rather than omitted: KEEPS_ENGLISH in content.i18n.test.ts
    // covers `roomRows[0].name` through `roomRows[2].name` (see the file
    // header, and `accommodation`'s own `roomTypes[*].name`), but the parity
    // test still requires every path to be explicitly filled.
    name: "Super Deluxe Rooms",
    occupancy: "1 படுக்கை",
    amenities:
      "Bystander படுக்கை, Sofa மற்றும் நாற்காலி, Tea Station உடன் Pantry, Coffee Table, Kettle, காலை நாளிதழ்கள், தனி Steward சேவை",
  },
  {
    name: "Deluxe Rooms",
    occupancy: "1 படுக்கை",
    amenities: "Bystander படுக்கை மற்றும் Sofa, Tea Station உடன் Pantry பகுதி, Coffee Table, சூடான நீர் Kettle",
  },
  {
    name: "Standard Rooms",
    occupancy: "1 படுக்கை",
    amenities: "Bystander படுக்கை மற்றும் நாற்காலி, குளிரூட்டி, தொலைக்காட்சி, தேவையான மருத்துவ ஆதரவு",
  },
  {
    name: "வார்டுகள்",
    occupancy: "2 அல்லது 3 படுக்கைகள்",
    amenities:
      "தனித்தனி Bystander படுக்கைகள் மற்றும் நாற்காலிகள், தனியுரிமைக்கான Bed Separators, குளிரூட்டி, பகல் நேர வருகை",
  },
];

export const roomsNote =
  "அறை கட்டணம் தங்குமிடம் மற்றும் Nursing சிகிச்சையை உள்ளடக்கியது. Doctor வருகைகள், மருந்து, பரிசோதனைகள் மற்றும் நடைமுறைகள் தனியாக Bill செய்யப்பட்டு உங்கள் Interim Bill இல் தோன்றும்.";

/** Shared by every category, so the table above does not repeat them. */
export const roomStandard: readonly string[] = [
  "சூடான மற்றும் குளிர்ந்த நீர்",
  "தொலைக்காட்சி",
  "இலவச Wifi",
  "குளிரூட்டி",
  "Bystander படுக்கை மற்றும் நாற்காலி",
  "ஒவ்வொரு 2 மணி நேரத்திற்கும் சுத்தம்",
  "Call இல் மருத்துவ ஆதரவு",
];

export const roomExtras: readonly string[] = [
  "Super Deluxe அறைகளில் தனி Steward சேவை",
  "Deluxe மற்றும் Super Deluxe அறைகளில் Tea Station உடன் Pantry பகுதி",
  "Super Deluxe அறைகளில் காலை நாளிதழ்கள்",
  "வார்டுகளிலிருந்து Discharge ஆகும்போது இலவச பழம் அல்லது Chocolate கூடை",
];

export const diagnosticHeading = {};
export const diagnosticIntro =
  "Equipment இன் மதிப்பு அதைச் சுற்றியுள்ள Discipline இல்லாமல் ஒன்றுமில்லை. ஒவ்வொரு ஆய்வுகூட Report உம் வெளியிடப்படுவதற்கு முன் இரு மருத்துவர்களால் Check செய்யப்படும், X-rays ஒரு மணி நேரத்திற்குள் ஒரு Radiologist ஆல் படிக்கப்பட்டு Report செய்யப்படும்.";

export const equipment = [
  { name: "Digital X-ray", note: "Radiologist ஒருவரால் படிக்கப்பட்டு Report செய்யப்படும்", avail: "ஒரு மணி நேரத்திற்குள்" },
  { name: "Ultrasound", note: "வயிறு, கருவுற்ற மற்றும் Soft Tissue Scanning", avail: "Visit இன்போதே" },
  {
    name: "Haematology & biochemistry",
    note: "முழு இரத்த எண்ணிக்கை, Metabolic மற்றும் Biochemistry Panels",
    avail: "அன்றே",
  },
  { name: "Microbiology & cultures", note: "தொற்று பரிசோதனை மற்றும் Culture Testing", avail: "Cultures முடிந்ததும்" },
  { name: "Histopathology", note: "திசு மற்றும் Biopsy பகுப்பாய்வு", avail: "எங்கள் Service மூலம்" },
  { name: "ECG & echocardiography", note: "ஓய்வு நேர ECG மற்றும் இதய அபாய மதிப்பீடு", avail: "அன்றே" },
  {
    name: "Endoscopy",
    note: "Gastroscopy மற்றும் Colonoscopy, அதே அமர்வில் Biopsy உடன்",
    avail: "அன்றே",
  },
  {
    name: "CT & MRI",
    note: "இங்கு செய்யப்படுவதில்லை; Partner Imaging Centre க்கு அனுப்பப்படும்",
    avail: "Referral மூலம்",
  },
];

export const ambulanceHeading = {};
export const ambulanceIntro1 =
  "எங்கள் சொந்த Ambulances Call இல் 24 மணி நேரமும் இருந்து, நோயாளர்கள் வரும் அதே கூரையுள்ள Bay இலிருந்தே Dispatch செய்யப்படும், அதனால் சிகிச்சை நீங்கள் வாசலை அடைவதற்கு முன்பே தொடங்கும்.";
export const ambulanceIntro2 =
  "ஆய்வுகூடம் மற்றும் Digital X-ray அந்த Bay இலிருந்து சில மீட்டர்களில் அமைந்துள்ளன, அதனால் நீங்கள் இன்னும் Assess செய்யப்படும்போதே Bloods மற்றும் Films திரும்பி வரும். நாங்கள் Bandaranaike International இலிருந்து பத்து நிமிடங்கள், Transfer க்காக எங்கள் சொந்த Ambulance கிடைக்கும்.";

export const ambulanceCall = {};

export const ambulanceSpecs = [
  { k: "கிடைக்கும் தன்மை", v: "24 மணி நேரமும்" },
  { k: "வாகன Fleet", v: "எங்கள் சொந்தம்" },
  { k: "Dispatch செய்யப்படுவது", v: "எங்கள் சொந்த Bay இலிருந்து" },
  { k: "வருகை Bay", v: "கூரையுள்ளது" },
  { k: "ஆய்வுகூடம் மற்றும் X-ray", v: "சில மீட்டர்களில்" },
  { k: "விமான நிலையம்", v: "பத்து நிமிடங்கள்" },
];

export const supportHeading = {};
export const supportIntro =
  "ஒரு மருத்துவமனை நள்ளிரவு மூன்று மணிக்கு மதிப்பிடப்படுகிறது. இந்த எட்டும் நீங்கள் வரும் எந்த நேரமும் Staff செய்யப்பட்டு அல்லது Call இல் இருக்கும்.";

export const support = [
  {
    name: "விபத்து மற்றும் அவசர சிகிச்சை",
    desc: "24 மணி நேரமும் Staff செய்யப்பட்ட Resuscitation Bay, Paperwork க்கு முன்பே Triage தொடங்கும்.",
  },
  {
    name: "ஆய்வுகூடம்",
    desc: "ஒவ்வொரு நேரமும் திறந்திருக்கும், வெளியிடப்படுவதற்கு முன் ஒவ்வொரு Report உம் இரு மருத்துவர்களால் Check செய்யப்படும்.",
  },
  {
    name: "Digital X-ray",
    desc: "Clinic நேரங்களைப் போலவே இரவிலும் கிடைக்கும், ஒரு மணி நேரத்திற்குள் படிக்கப்பட்டு Report செய்யப்படும்.",
  },
  {
    name: "Outpatient துறை",
    desc: "24 மணி நேரமும் திறந்திருக்கும் Consulting Suites, நீங்கள் வரும் எந்த நேரமும் அவசரத் துறை நுழைவுக்கு அருகில் Staff உடன்.",
  },
  {
    name: "Pharmacy",
    desc: "இடத்திலேயே 24 மணி நேர Dispensary, அதனால் இரவில் எழுதப்பட்ட Prescription அதே இரவில் Fill செய்யப்படலாம்.",
  },
  {
    name: "Ambulance அனுப்புதல்",
    desc: "நோயாளர்கள் வரும் அதே கூரையுள்ள Bay இலிருந்தே Dispatch செய்யப்படும் எங்கள் சொந்த Fleet Call இல்.",
  },
  {
    name: "Sterile சேவைகள்",
    desc: "ஒவ்வொரு Instrument Set உம் Track செய்யப்படும், Consumables ஒவ்வொரு நோயாளருக்கும் விதிவிலக்கு இல்லாமல் ஒரே முறை Use செய்யப்படும்.",
  },
  {
    name: "Call இல் Surgical ஆதரவு",
    desc: "Surgical மற்றும் Anaesthetic குழுக்கள் Call இல் இருப்பார்கள், அதனால் அவசர அறுவை சிகிச்சை மாற்றலுக்குப் பிறகு அல்ல இங்கேயே நடக்கும்.",
  },
];

export const hygieneHeading = {};
export const hygieneIntro =
  "தொற்று கட்டுப்பாடு ஒரு கால அட்டவணை, Slogan அல்ல. கட்டிடத்தில் உள்ள ஒவ்வொரு மேற்பரப்பும் US Specification படி 2 மணி நேர Cycle இல் சுத்தம் செய்யப்படும்.";
export const hygieneCaption = "Consumables ஒரே முறை Use செய்யப்படும், மீண்டும் ஒருபோதும் இல்லை";

export const hygieneRows = [
  { k: "சுத்தம் செய்யும் Cycle", v: "ஒவ்வொரு 2 மணி நேரத்திற்கும்" },
  { k: "தரம்", v: "US Specification படி" },
  // Same fix, and the same reasoning, as `theatreSpecs`' own two entries
  // above: a real Tamil translation, not just a dropped bracket or a
  // singularised word.
  { k: "நுகர்வுப் பொருட்கள்", v: "ஒரே முறை Use செய்யப்படும், மீண்டும் இல்லை" },
  { k: "கருவி தொகுப்புகள்", v: "Set ஒன்றுக்கு Track செய்யப்படும்" },
  { k: "மகப்பேறு அறுவை சிகிச்சை அரங்கு", v: "பொது Lists இலிருந்து தனியாக" },
  { k: "ஆய்வுகூட Reports", v: "இரு மருத்துவர்களால் Check செய்யப்படும்" },
];

export const visitorsHeading = {};
export const visitorsIntro =
  "Bandaranaike International Airport இலிருந்து பத்து நிமிடங்கள், மத்திய நீர்கொழும்பில் St. Joseph Street இல்.";

export const visitingRows = [
  { k: "சாதாரண வார்டுகள்", v: "பகல் நேர வருகை" },
  { k: "தீவிர சிகிச்சை", v: "நிலையான நேரங்கள்" },
  { k: "குடும்பத்திற்கு புதுப்பிப்பு", v: "Unit இலிருந்து நாளுக்கு ஒரு முறை" },
  { k: "Bystander", v: "இரவு தங்கலாம்" },
];
export const visitingNote = "வார்டு அல்லது Unit Desk நீங்கள் பயணிக்கும் முன் தற்போதைய நேரங்களை உறுதிசெய்யும்.";

export const gettingHere: readonly string[] = [
  "229/10 St. Joseph Street, நீர்கொழும்பு",
  "Bandaranaike International Airport இலிருந்து பத்து நிமிடங்கள்",
  "முதன்மை நுழைவாயிலுக்கு அருகில் இலவச Parking",
  "Transfer க்காக எங்கள் சொந்த Ambulance கிடைக்கும்",
];

export const comforts: readonly string[] = [
  "இலவச Parking",
  "இலவச Wifi",
  "ஒரு Cafeteria",
  "நோயாளர் Lounge",
  "சக்கர நாற்காலி அணுகல்",
  "24 மணி நேர Pharmacy",
  "Card பணம் செலுத்துதல்",
  "அமைதியான வருகை நேரங்கள்",
];

export const bookHeading = {};
export const bookIntro =
  "Reception இல் கேளுங்கள், நாங்கள் உங்களுக்கு ஒரு அறையையும் வார்டையும் காண்பிப்போம். Appointment இல்லை, Sales பேச்சும் இல்லை.";

export const contactRows = [
  {},
  {},
  {},
];
