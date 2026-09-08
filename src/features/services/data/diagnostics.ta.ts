// Tamil overlay for diagnostics.ts (4 of the catalog's 36 services:
// laboratory, radiology, cardiac-screening, fetal-monitoring).
//
// See diagnostics.si.ts's header for the full register rationale (reused
// here for Tamil): equipment and modality names stay English throughout
// ("X-ray", "CT", "MRI", "ECG", "Ultrasound", "Echocardiography",
// "Haematology", "Biochemistry", "Microbiology", "Histopathology",
// "Cardiotocography"/"CTG", "Antenatal", "Clinic"), matching
// facilities.ta.ts's own `equipment[*]` and indexContent.ta.ts's own
// `diagnosticRows`. "Radiology" itself is NOT in this class: it has its
// own established full translation, "கதிரியக்கவியல்", reused verbatim from
// indexContent.ta.ts's own diagnosticRows[5].name. A tag or covers entry
// that is otherwise just a bare equipment name always carries a small
// Tamil particle ("சேவை", "ஒரு") so it is never byte-identical to its
// English source, the same shape emergency.ta.ts's own tags already use.
// "Doctor"/"Physician" translate in full (மருத்துவர்), matching
// emergency.ta.ts. "Nurse", "Coordinator", "Technologist", "Technician",
// "Radiographer", "Sonographer", "Radiologist" and "Reception" stay
// English as role/department nouns. Any number (turnaround times,
// discount percentages, hours) is unchanged.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const diagnosticServices = [
  {
    hours: "24 மணி நேரம்",
    desc: "Haematology, Biochemistry, Microbiology மற்றும் Histopathology பரிசோதனைகள், 24 மணி நேரமும் திறந்திருக்கும். வெளியிடுவதற்கு முன் ஒவ்வொரு Report ஐயும் இரண்டு மருத்துவர்கள் Check செய்வர், பெரும்பாலான முடிவுகள் அன்றே கிடைக்கும், OPD நோயாளர்களுக்கு ஆய்வுகூட கட்டணங்களில் 10% தள்ளுபடி கிடைக்கும்.",
    tags: ["Haematology சேவை", "Biochemistry சேவை", "Microbiology சேவை", "அன்றே Reports"],
    facts: [
      { k: "நேரம்", v: "24 மணி நேரம்" },
      { k: "ஒரு Report Check", v: "ஒவ்வொரு Report உம், இரண்டு மருத்துவர்கள்" },
      { k: "கிடைக்கும் நேரம்", v: "பெரும்பாலான பரிசோதனைகள் அன்றே" },
      { k: "OPD தள்ளுபடி", v: "ஆய்வுகூட கட்டணங்களில் 10%" },
    ],
    lede: "இரத்தம், சிறுநீர் மற்றும் திசு பரிசோதனைகள் ஒவ்வொரு நேரமும் திறந்திருக்கும், உங்களை அடைவதற்கு முன் ஒவ்வொரு முடிவும் இரண்டு முறை Check செய்யப்படும்.",
    body1: "ஆய்வுகூடம் Haematology, Biochemistry, Microbiology மற்றும் Histopathology ஐ உள்ளடக்கியது, 24 மணி நேரமும் திறந்திருப்பதால் எந்த நேரத்திலும் எடுக்கப்படும் Sample அடுத்த Shift க்காக காத்திருக்காமல் Process செய்யப்படும். பெரும்பாலான முடிவுகள் அன்றே கிடைக்கும், Ward மற்றும் Emergency Department இலிருந்து வரும் அவசர Requests முன்னுரிமை பெறும்.",
    body2: "வெளியிடுவதற்கு முன் ஒவ்வொரு Report ஐயும் இரண்டு மருத்துவர்கள் Verify செய்வர், Technologist இன் வேலைக்கு மேல் இரண்டாவது Check ஒன்றை சேர்த்து. OPD மூலம் Book செய்யும் Outpatients க்கு ஆய்வுகூட கட்டணங்களில் 10% தள்ளுபடி கிடைக்கும், முடிவுகளை நேரடியாகப் பெறலாம் அல்லது உங்களை Refer செய்த மருத்துவருக்கு அனுப்பலாம்.",
    strip: [
      { k: "நேரம்", v: "24 மணி நேரம்" },
      { k: "Verify செய்தல்", v: "இரண்டு மருத்துவர்கள்" },
      { k: "அறிக்கைகள்", v: "அன்றே" },
      { k: "OPD தள்ளுபடி", v: "10%" },
    ],
    covers: [
      "முழு இரத்த எண்ணிக்கை மற்றும் Haematology பரிசோதனைகள்",
      "Biochemistry மற்றும் Metabolic Panels",
      "Microbiology மற்றும் Culture பரிசோதனைகள்",
      "Histopathology மற்றும் திசு பகுப்பாய்வு",
      "Ward மற்றும் Emergency Department இலிருந்து வரும் அவசர Samples",
    ],
    conditions: [
      "Routine சுகாதார பரிசோதனை",
      "சந்தேகிக்கப்படும் Infection",
      "நீரிழிவு மற்றும் Cholesterol Monitoring",
      "இரத்த சோகை பரிசோதனை",
      "அறுவை சிகிச்சைக்கு முந்தைய இரத்த பரிசோதனை",
      "திசு Biopsy பகுப்பாய்வு",
    ],
    location: "தரைத் தளம், ஆய்வுகூட Reception",
    steps: [
      { desc: "OPD மூலம் ஒரு பரிசோதனையை கோருங்கள், அல்லது உங்கள் மருத்துவரிடமிருந்து ஒரு Referral Form கொண்டு வாருங்கள்." },
      { desc: "ஒரு Phlebotomist உங்கள் Sample ஐ எடுப்பார், தேவைப்பட்டால் முன்கூட்டியே Fasting வழிமுறைகள் தரப்படும்." },
      { desc: "உங்கள் Sample பரிசோதிக்கப்பட்டு, வெளியிடுவதற்கு முன் Report ஐ இரண்டு மருத்துவர்கள் Check செய்வர்." },
      { desc: "பெரும்பாலான Reports அன்றே தயாராகும், நேரடியாக பெறலாம் அல்லது உங்கள் மருத்துவருக்கு அனுப்பலாம்." },
    ],
    prep: [
      "உங்கள் பரிசோதனைக்கு முன் Fasting தேவையா என்று கேளுங்கள்",
      "உங்கள் மருத்துவர் தந்திருந்தால் ஒரு Referral Form கொண்டு வாருங்கள்",
      "10% தள்ளுபடி பெற உங்கள் OPD Card கொண்டு வாருங்கள்",
      "Sampling எளிதாக்க முன்பே தண்ணீர் குடியுங்கள்",
    ],
    team: [
      { role: "ஆய்வுகூட Technologists", note: "Haematology, Biochemistry, Microbiology மற்றும் Histopathology Samples களை 24 மணி நேரமும் Process செய்வர்." },
      { role: "Verify செய்யும் மருத்துவர்கள்", note: "வெளியிடுவதற்கு முன் Technologist இன் கண்டுபிடிப்புகளுக்கு எதிராக ஒவ்வொரு Report ஐயும் Check செய்வர்." },
      { role: "Phlebotomy குழு", note: "Outpatients, Inpatients மற்றும் Emergency வருகையாளர்களிடமிருந்து எந்த நேரத்திலும் Samples எடுப்பர்." },
      { role: "ஆய்வுகூட Reception", note: "Bookings, OPD தள்ளுபடிகள் மற்றும் Report பெறுதலை கையாளும்." },
    ],
    faq: [
      { q: "ஆய்வுகூடம் இரவிலும் திறந்திருக்குமா?", a: "ஆம். ஆய்வுகூடம் 24 மணி நேரமும் இயங்குவதால், எந்த நேரத்திலும் Sample எடுக்கவும் Process செய்யவும் முடியும், Emergency Department இலிருந்து வரும் அவசர Requests உட்பட." },
      { q: "என் முடிவுகள் எப்போது கிடைக்கும்?", a: "பெரும்பாலான Reports அன்றே தயாராகும். நீங்கள் Book செய்யும்போது உங்கள் Test Request எதிர்பார்க்கப்படும் நேரத்தைக் காட்டும்." },
      { q: "ஒரு Report ஐ Check செய்ய இரண்டு மருத்துவர்கள் ஏன் தேவை?", a: "வெளியிடுவதற்கு முன் ஒவ்வொரு Report ஐயும் இரண்டு மருத்துவர்கள் Verify செய்வர், உங்களை அல்லது உங்கள் மருத்துவரை அடைவதற்கு முன் துல்லியத்திற்கு கூடுதல் Check ஐ சேர்த்து." },
      { q: "Outpatient ஆக எனக்கு தள்ளுபடி கிடைக்குமா?", a: "ஆம். OPD நோயாளர்களுக்கு ஆய்வுகூட கட்டணங்களில் 10% தள்ளுபடி கிடைக்கும். பணம் செலுத்தும்போது உங்கள் OPD Card ஐ கொண்டு வாருங்கள்." },
    ],
  },
  {
    hours: "24 மணி நேரம்",
    desc: "Digital X-ray மற்றும் Ultrasound 24 மணி நேரமும் கிடைக்கும், Films ஒரு மணி நேரத்தில் படிக்கப்படும், நோயாளி பயணிக்க முடியாதபோது Portable Imaging வார்டுக்கே கொண்டு வரப்படும். CT மற்றும் MRI இங்கு செய்யப்படாது: ஒரு Scan தேவைப்பட்டால், ஒரு Partner Imaging Centre க்கு Referral ஏற்பாடு செய்யப்படும்.",
    tags: ["Digital X-ray சேவை", "Ultrasound சேவை", "Portable Imaging சேவை", "CT/MRI க்கான Referral"],
    facts: [
      { k: "நேரம்", v: "24 மணி நேரம்" },
      { k: "X-ray கிடைக்கும் நேரம்", v: "ஒரு மணி நேரத்தில்" },
      { k: "இங்கு உள்ளது", v: "Digital X-ray மற்றும் Ultrasound" },
      { k: "CT மற்றும் MRI", v: "Partner Centre க்கு Referral மூலம்" },
    ],
    lede: "Digital X-ray மற்றும் Ultrasound ஒவ்வொரு நேரமும், Films ஒரு மணி நேரத்தில் படிக்கப்படும், ஒரு Scan க்கு CT அல்லது MRI தேவைப்பட்டால் தெளிவான Referral வழியுடன்.",
    body1: "Digital Radiography மற்றும் Ultrasound 24 மணி நேரமும் இயங்கும், ஒவ்வொரு X-ray உம் தனி Film Handling தேவையின்றி நேரடியாக உங்கள் File இல் வரும். நோயாளியை Move செய்யக் கூடாதபோது ஒரு Radiographer ஒரு Portable Machine ஐ வார்டுக்கே கொண்டு வரலாம். X-ray Films ஒரு மணி நேரத்தில் படிக்கப்பட்டு Report செய்யப்படும், அதனால் பொதுவாக அதே Visit இல் ஒரு திட்டம் ஒப்புக்கொள்ளப்படும்.",
    body2: "இந்த மருத்துவமனையில் CT அல்லது MRI Scanning இங்கு இல்லை. இரண்டில் ஒன்று தேவைப்படும் Case வந்தால், எங்கள் குழு ஒரு Partner Imaging Centre க்கு Referral ஏற்பாடு செய்து, உங்கள் தற்போதைய Films மற்றும் Clinical Notes ஐ Referral உடன் அனுப்பும், அதனால் பெறும் Centre வெறுங்கையுடன் தொடங்க வேண்டியதில்லை.",
    strip: [
      { k: "நேரம்", v: "24 மணி நேரம்" },
      { k: "X-ray படிப்பு", v: "ஒரு மணி நேரத்தில்" },
      { k: "Ultrasound சேவை", v: "இங்கேயே" },
      { k: "CT/MRI க்கு", v: "Referral மூலம் மட்டும்" },
    ],
    covers: [
      "Digital X-ray சேவை",
      "Ultrasound Scan செய்தல்",
      "Portable Ward Imaging சேவை",
      "CT Scan க்கான Referral ஏற்பாடு",
      "MRI Scan க்கான Referral ஏற்பாடு",
    ],
    conditions: [
      "சந்தேகிக்கப்படும் எலும்பு முறிவு",
      "மார்பு Infection மதிப்பீடு",
      "Ultrasound தேவைப்படும் வயிற்று வலி",
      "Antenatal Scan செய்தல்",
      "மென்திசு காயம்",
      "CT அல்லது MRI Referral தேவைப்படும் Cases",
    ],
    location: "தரைத் தளம், கதிரியக்கவியல் பிரிவு",
    steps: [
      { desc: "உங்கள் மருத்துவர் தேவையான Imaging ஐ Order செய்வார், அல்லது ஒரு எளிய X-ray க்கு நீங்களே நேரடியாக Book செய்யலாம்." },
      { desc: "Digital X-ray அல்லது Ultrasound இங்கேயே செய்யப்படும், அல்லது ஒரு Portable Machine உங்கள் படுக்கைக்கே கொண்டு வரப்படும்." },
      { desc: "X-ray Films ஒரு மணி நேரத்தில் படிக்கப்படும்; Ultrasound கண்டுபிடிப்புகள் Scan செய்யும் நேரத்திலேயே விவாதிக்கப்படும்." },
      { desc: "CT அல்லது MRI தேவைப்பட்டால், ஒரு Partner Centre க்கு Referral ஏற்பாடு செய்து, உங்கள் Films மற்றும் Notes ஐ முன்கூட்டியே அனுப்புவோம்." },
    ],
    prep: [
      "Scan செய்யப்படும் பகுதிக்கு அருகில் உள்ள Jewellery அல்லது Metal ஐ அகற்றுங்கள்",
      "ஒப்பிட முந்தைய Imaging இருந்தால் கொண்டு வாருங்கள்",
      "வயிற்று Ultrasound திட்டமிடப்பட்டிருந்தால் Fasting பற்றி கேளுங்கள்",
      "மருத்துவர் ஒரு குறிப்பிட்ட Scan கோரியிருந்தால் உங்கள் Referral Letter ஐ கொண்டு வாருங்கள்",
    ],
    team: [
      { role: "எங்கள் Radiographers", note: "Digital X-ray மற்றும் Portable Ward Imaging ஐ 24 மணி நேரமும் செய்வர்." },
      { role: "எங்கள் Sonographers", note: "வயிறு, Antenatal மற்றும் மென்திசு மதிப்பீட்டிற்கு Ultrasound Scans செய்வர்." },
      { role: "Report செய்யும் Radiologists", note: "X-ray Films ஐ ஒரு மணி நேரத்தில் படித்து Report செய்வர்." },
      { role: "Referral Coordinator ஒருவர்", note: "Partner Imaging Centres களில் CT மற்றும் MRI Appointments ஏற்பாடு செய்து Clinical Notes அனுப்புவார்." },
    ],
    faq: [
      { q: "CT அல்லது MRI இங்கு உள்ளதா?", a: "இல்லை. CT மற்றும் MRI Scans இந்த மருத்துவமனையில் செய்யப்படாது. ஒன்று தேவைப்பட்டால், ஒரு Partner Imaging Centre க்கு Referral ஏற்பாடு செய்து, Appointment க்கு முன்பே உங்கள் Notes மற்றும் தற்போதைய Films அனுப்பப்படும்." },
      { q: "என் X-ray எவ்வளவு விரைவில் படிக்கப்படும்?", a: "X-ray Films ஒரு மணி நேரத்தில் படிக்கப்படும், அதனால் நீங்களும் உங்கள் மருத்துவரும் பொதுவாக Department விட்டு செல்வதற்கு முன் ஒரு Report பெறுவீர்கள்." },
      { q: "Imaging என் படுக்கை அருகிலேயே செய்யலாமா?", a: "ஆம். Move செய்யக்கூடாத நோயாளர்களுக்கு ஒரு Radiographer ஒரு Portable X-ray Machine ஐ வார்டுக்கே கொண்டு வரலாம்." },
      { q: "Department இரவிலும் திறந்திருக்குமா?", a: "ஆம். Digital X-ray மற்றும் Ultrasound 24 மணி நேரமும் கிடைக்கும், Emergency Cases உட்பட." },
    ],
  },
  {
    hours: "தினமும்",
    desc: "Resting ECG, Echocardiography மற்றும் இதய ஆபத்து மதிப்பீடு, உங்கள் Visit இலேயே செய்யப்பட்டு ஒரு மருத்துவரால் Review செய்யப்படும், முடிவு தேவைப்பட்டால் Cardiology க்கு Referral உடன்.",
    tags: ["Resting ECG சேவை", "Echocardiography சேவை", "இதய ஆபத்து மதிப்பீடு", "மருத்துவர் Review"],
    facts: [
      { k: "நேரம்", v: "தினமும்" },
      { k: "விளக்கம்", v: "ஒரு மருத்துவரால்" },
      { k: "வழங்கப்படும் பரிசோதனைகள்", v: "ECG மற்றும் Echocardiography" },
      { k: "ஒரு Referral", v: "தேவைப்பட்டால் Cardiology க்கு" },
    ],
    lede: "ECG, Echocardiography மற்றும் ஒரு இதய ஆபத்து மதிப்பீடு தினமும் இயங்கும், உங்கள் Visit இலேயே செய்யப்பட்டு ஒரு மருத்துவரால் Review செய்யப்படும்.",
    body1: "ஒரு Resting ECG இதயத்தின் மின் தாளத்தை Record செய்யும், Echocardiography இதயம் எப்படி Pump செய்கிறது, அதன் Valves எப்படி வேலை செய்கிறது என்பதற்கு ஒரு படத்தை சேர்க்கும். இரண்டும் உங்கள் History, இரத்த அழுத்தம் மற்றும் மற்ற Factors ஐ பரிசோதனை முடிவுகளுடன் பார்க்கும் இதய ஆபத்து மதிப்பீடு உடன் இணைக்கப்படும்.",
    body2: "பரிசோதனை உங்கள் Visit இலேயே செய்யப்பட்டு ஒரு மருத்துவரால் Review செய்யப்படும், அதனால் உங்கள் சிகிச்சை தனி Report ஒன்றை பின்தொடர காத்திருக்க வேண்டியதில்லை. கண்டுபிடிப்புகள் மேலும் நெருக்கமான கவனம் தேவை என்று காட்டினால், மேலும் மதிப்பீடு மற்றும் மேலாண்மைக்காக நீங்கள் Cardiology க்கு Refer செய்யப்படுவீர்கள்.",
    strip: [
      { k: "நேரம்", v: "தினமும்" },
      { k: "ஒரு ECG", v: "Resting, இங்கேயே" },
      { k: "Echo சேவை", v: "இங்கேயே" },
      { k: "விளக்கம்", v: "ஒரு மருத்துவரால்" },
    ],
    covers: [
      "Resting ECG சேவை",
      "Echocardiography சேவை",
      "இதய ஆபத்து மதிப்பீடு",
      "மருத்துவர் முடிவு Review",
      "Cardiology க்கு Referral",
    ],
    conditions: [
      "விசாரணையில் உள்ள மார்பு அசௌகரியம்",
      "இதயம் படபடத்தல்",
      "இதய கவலையுடன் அதிக இரத்த அழுத்தம்",
      "அறுவை சிகிச்சைக்கு முந்தைய இதய Clearance",
      "இதய நோய் குடும்ப History",
      "சோர்வின்போது மூச்சுத் திணறல்",
    ],
    location: "முதல் தளம், இதய நோய் கண்டறிதல்",
    steps: [
      { desc: "ஒரு Screening ஐ நேரடியாக Book செய்யுங்கள், அல்லது உங்கள் மருத்துவரிடமிருந்து ஒரு Referral உடன் வாருங்கள்." },
      { desc: "ஒரு Resting ECG மற்றும், பொருந்தும்போது, ஒரு Echocardiogram Record செய்யப்படும்." },
      { desc: "ஒரு மருத்துவர் உங்கள் முடிவுகளை Review செய்து ஆபத்து மதிப்பீட்டை உங்களுடன் விவாதிப்பார்." },
      { desc: "கண்டுபிடிப்புகள் தேவைப்பட்டால், மேலும் மேலாண்மைக்காக நீங்கள் Cardiology க்கு Refer செய்யப்படுவீர்கள்." },
    ],
    prep: [
      "உங்கள் மார்பை எளிதாக அணுகக்கூடிய Top ஐ அணியுங்கள்",
      "உங்கள் தற்போதைய மருந்துகளின் பட்டியலை கொண்டு வாருங்கள்",
      "முடிந்தால் முன்பே சில மணிநேரம் Caffeine தவிருங்கள்",
      "ஒப்பிட முந்தைய ECG அல்லது இதய Reports இருந்தால் கொண்டு வாருங்கள்",
    ],
    team: [
      { role: "இதய Technicians", note: "Resting ECG மற்றும் Echocardiography Studies ஐ Record செய்வர்." },
      { role: "விளக்கும் மருத்துவர்கள்", note: "பரிசோதனை முடிவுகள் மற்றும் ஆபத்து மதிப்பீட்டை நோயாளியுடன் Review செய்வர்." },
      { role: "Screening Clinic Coordinator ஒருவர்", note: "Appointments ஐ Book செய்து Cardiology க்கு Referrals ஐ மேலாண்மை செய்வார்." },
      { role: "Nursing குழு", note: "பரிசோதனைக்கு நோயாளர்களை Prepare செய்து Screening Clinic க்கு உதவும்." },
    ],
    faq: [
      { q: "என் முடிவுகள் எப்போது கிடைக்கும்?", a: "பரிசோதனை உங்கள் Visit இலேயே செய்யப்பட்டு, ஒரு மருத்துவர் உங்கள் ECG மற்றும் Echocardiogram ஐ Review செய்து கண்டுபிடிப்புகளை உங்களுடன் விவாதிப்பார்." },
      { q: "Screening ஐ Book செய்ய Referral தேவையா?", a: "இல்லை. ஒரு Screening ஐ நேரடியாக Book செய்யலாம், உங்கள் சொந்த மருத்துவரிடமிருந்து ஒரு Referral கிடைத்தாலும் ஏற்கப்படும்." },
      { q: "ஏதேனும் அசாதாரணம் கண்டறியப்பட்டால் என்ன நடக்கும்?", a: "மேலும் மதிப்பீடு மற்றும் மேலாண்மைக்காக நீங்கள் Cardiology க்கு Refer செய்யப்படுவீர்கள், உங்கள் முடிவுகள் அந்த Appointment க்கு முன்பே அனுப்பப்படும்." },
      { q: "Echocardiogram சிரமமானதா?", a: "இல்லை. மார்பின் மேல் Ultrasound பயன்படுத்தப்படும், Needles அல்லது Sedation எதுவும் இல்லை, உங்கள் Appointment இல் அதற்கு நேரம் ஒதுக்கப்பட்டுள்ளது." },
    ],
  },
  {
    hours: "Appointment மூலம்",
    desc: "குழந்தையின் இதயத் துடிப்பு மற்றும் சுருக்கங்களை Monitor செய்ய Cardiotocography (CTG), Antenatal Clinic உடன் இணைந்து இயங்கி Obstetric குழுவால் Review செய்யப்படும்.",
    tags: ["Cardiotocography சேவை", "குழந்தையின் இதயத் துடிப்பு", "சுருக்க Monitoring", "ஒரு Antenatal Clinic"],
    facts: [
      { k: "முன்பதிவு", v: "Appointment மூலம்" },
      { k: "Monitor செய்வது", v: "குழந்தையின் இதயத் துடிப்பு மற்றும் சுருக்கங்கள்" },
      { k: "இணைந்து", v: "Antenatal Clinic உடன்" },
      { k: "Review செய்வது", v: "Obstetric குழு" },
    ],
    lede: "குழந்தையின் இதயத் துடிப்பு மற்றும் சுருக்கங்களை Track செய்ய Cardiotocography, உங்கள் Antenatal Visits உடன் Book செய்யப்பட்டு Obstetric குழுவால் Review செய்யப்படும்.",
    body1: "ஒரு CTG Trace உங்கள் குழந்தையின் இதயத் துடிப்பையும் ஏதேனும் Uterine சுருக்கங்களையும் ஒரு Monitoring காலப்பகுதிக்கு Record செய்யும், பொதுவாக நீங்கள் வசதியாக அமர்ந்திருக்கும் அல்லது சாய்ந்திருக்கும்போது உங்கள் வயிற்றில் இரண்டு Soft Sensors வைக்கப்பட்டு. இது Antenatal Clinic உடன் இணைந்து வழங்கப்படுகிறது, அதனால் முடிந்தவரை உங்கள் வழக்கமான கர்ப்ப பரிசோதனைகள் போலவே அதே Visit இல் பொருந்தும்.",
    body2: "ஒவ்வொரு Trace ஐயும் Obstetric குழு Review செய்யும், அவர்கள் Record செய்யப்பட்ட ஏதேனும் சுருக்கங்களுக்கு எதிராக இதயத் துடிப்பு முறையையும், உங்கள் ஒட்டுமொத்த Antenatal நிலைக்கு எதிராகவும் பார்ப்பர். Trace ஒரு கேள்வியை எழுப்பினால், அது நேரடியாக உங்களுடன் விவாதிக்கப்பட்டு உங்கள் தொடர்ச்சியான Antenatal சிகிச்சையின் ஒரு பகுதியாக Follow-up செய்யப்படும்.",
    strip: [
      { k: "Monitor செய்வது", v: "இதயத் துடிப்பு மற்றும் சுருக்கங்கள்" },
      { k: "முன்பதிவு", v: "Appointment மூலம்" },
      { k: "இடம்", v: "Antenatal Clinic இல்" },
      { k: "Review செய்வது", v: "Obstetric குழு" },
    ],
    covers: [
      "குழந்தையின் இதயத் துடிப்பு Monitoring",
      "சுருக்க Monitoring",
      "ஒரு Antenatal CTG Review",
      "Routine Antenatal Visits உடன் Monitoring",
    ],
    conditions: [
      "குழந்தையின் அசைவு குறைதல்",
      "Post-dates கர்ப்ப Monitoring",
      "High-risk கர்ப்ப Follow-up",
      "சந்தேகிக்கப்படும் விரைவு Labour",
      "ஒரு Routine Antenatal Surveillance",
    ],
    location: "முதல் தளம், Antenatal Clinic",
    steps: [
      { desc: "உங்கள் Antenatal Appointment உடன் இணைந்து, அல்லது உங்கள் Obstetric குழு பரிந்துரைத்தபடி Monitoring ஐ Book செய்யுங்கள்." },
      { desc: "இதயத் துடிப்பு மற்றும் ஏதேனும் சுருக்கங்களை பிடிக்க இரண்டு Soft Sensors உங்கள் வயிற்றில் வைக்கப்படும்." },
      { desc: "உங்கள் Obstetric குழு கேட்ட காலப்பகுதிக்கு Trace இயங்கும், நீங்கள் வசதியாக Rest எடுக்கும்போது." },
      { desc: "நீங்கள் செல்வதற்கு முன் Obstetric குழு Trace ஐ Review செய்து கண்டுபிடிப்புகளை உங்களுடன் விவாதிப்பார்." },
    ],
    prep: [
      "Trace இன் போது குழந்தையின் செயல்பாட்டுக்கு உதவும் என்பதால் முன்பே சாப்பிடுங்கள்",
      "Monitoring தொடங்குவதற்கு முன் வசதிக்காக Bladder ஐ Empty செய்யுங்கள்",
      "உங்கள் Antenatal Record Book ஐ கொண்டு வாருங்கள்",
      "உங்கள் வயிற்றை எளிதாக அணுகக்கூடிய உடையை அணியுங்கள்",
    ],
    team: [
      { role: "Antenatal Nursing குழு", note: "Monitoring Sensors ஐ இணைத்து Trace முழுவதும் நோயாளர்களுக்கு உதவும்." },
      { role: "Obstetric குழு", note: "ஒவ்வொரு CTG Trace ஐயும் Review செய்து கண்டுபிடிப்புகளை நோயாளியுடன் விவாதிக்கும்." },
      { role: "Clinic Coordinator ஒருவர்", note: "Antenatal Visits உடன் இணைந்து Monitoring Appointments ஐ Book செய்வார்." },
    ],
    faq: [
      { q: "Monitoring வலி தருமா?", a: "இல்லை. இரண்டு Soft Sensors உங்கள் வயிற்றில் கட்டப்படும்; Needles இல்லை, உங்கள் உடலுக்குள் எதுவும் நுழையாது." },
      { q: "ஒரு Session எவ்வளவு நேரம் எடுக்கும்?", a: "Obstetric குழு எதைப் பார்க்கிறது என்பதைப் பொறுத்து மாறுபடும், ஆனால் பெரும்பாலான Sessions உங்கள் Antenatal Clinic Visit க்குள் பொருந்துமாறு ஏற்பாடு செய்யப்பட்டுள்ளன." },
      { q: "முடிவுகளை யார் பார்க்கிறார்கள்?", a: "Obstetric குழு ஒவ்வொரு Trace ஐயும் Review செய்து, நீங்கள் Clinic ஐ விட்டு செல்வதற்கு முன் கண்டுபிடிப்புகளை உங்களுடன் விவாதிக்கும்." },
      { q: "Antenatal Appointment இல்லாமல் Monitoring ஐ Book செய்யலாமா?", a: "பொதுவாக Monitoring Antenatal Clinic உடன் இணைந்து ஏற்பாடு செய்யப்படும்; திட்டமிடப்பட்ட Visit க்கு வெளியே தேவைப்பட்டால் Clinic Coordinator உடன் பேசுங்கள்." },
    ],
  },
];
