// Tamil overlay for surgical.ts (7 of the catalog's 36 services:
// general-surgery, orthopaedic-surgery, ent-surgery, urology, ophthalmology,
// neurosurgery, endoscopy).
//
// See surgical.si.ts's header for the full register rationale (reused here
// for Tamil). No pharmacy-counter vocabulary occurs anywhere in surgical.ts
// (grep-checked, case-insensitive, plurals included): the only two "record"
// hits are the ordinary clinical-testing verb, not the pharmacy counter's
// Record, and translate as ordinary prose.
//
// "Anaesthesia"/"Anaesthetist" stay English in flowing prose (established
// site-wide register, facilities.ta.ts's own header). "Surgical" translates
// in full here ("அறுவை சிகிச்சை"), consistently across all five
// occurrences, matching emergency.ta.ts's own practice for the same
// adjective. "Theatre" does NOT translate here: every occurrence in this
// file (body prose, a step description, and two team[*].role fields, five
// in total) stays bare English "Theatre". This diverges from
// emergency.ta.ts, which translates "Theatre" throughout its own body
// prose, as "அறுவை சிகிச்சை அரங்கு"/"அறுவை சிகிச்சை அரங்கம்" (not "அறுவை
// சிகிச்சை அறை" as an earlier version of this comment claimed; grep-verified:
// neither form occurs anywhere in this file's content). The two files'
// handling of "Theatre" has not been reconciled; treat that as an open
// question, not a precedent either way. "Recovery" stays English only in
// the fixed compound "Recovery Bay"/"Recovery nurse(s)",
// the same shape emergency.ta.ts's own "Resuscitation Bay" already uses.
//
// "Consultant" translates to நிபுணர் மருத்துவர் as an ordinary noun
// (emergency.ta.ts's own rule). It never occurs here as a singular
// nameplate title directly before one named role, so there is no such
// exception in this file.
//
// Specific specialist-title role nouns stay English with a Tamil particle,
// matching diagnostics.ta.ts's own explicit rule for "Radiographer"/
// "Sonographer"/"Radiologist": "Surgeon(s)", "Anaesthetist(s)",
// "Urologist(s)", "Ophthalmologist(s)", "Optometrist(s)", "Neurosurgeon(s)",
// "Gastroenterologist(s)", "Radiologist(s)", "Radiographer(s)",
// "Audiologist(s)", "Physiotherapist(s)", "Sonographer(s)" and
// "Coordinator" all follow the same shape. "Doctor"/"Physician" (the
// generic noun) still translate in full, matching emergency.ta.ts and
// diagnostics.ta.ts.
//
// Procedure and equipment names stay English where that is what a Sri
// Lankan doctor actually says, matching facilities.ta.ts's own established
// "Cataract", "Gastroscopy" and "Colonoscopy": "Laparoscopic"/"Laparoscopy",
// "Arthroscopy", "Gastroscopy", "Colonoscopy", "Biopsy", "Polypectomy",
// "Endoscopy", "Cataract" and "Grommets" all stay bare English throughout.
// "ENT" stays English as an abbreviation. Ordinary clinical nouns with a
// common, everyday Tamil equivalent translate in full: "fracture(s)" ->
// "எலும்பு முறிவுகள்" (the same word emergency.ta.ts's own covers list
// already uses for the identical fact), "kidney stones" -> "சிறுநீரக
// கற்கள்", "bladder" -> "சிறுநீர்ப்பை", "urinary tract" -> "சிறுநீர்ப் பாதை",
// "brain"/"spine" -> "மூளை"/"முதுகுத் தண்டு", "glasses" -> "கண்ணாடி".
// "Hernia", "Gallbladder", "Appendix", "Ligament", "Meniscus", "Rotator
// cuff", "Prostate" and "Retina"/"Retinal" stay bare English, the same
// code-mixed register emergency.ta.ts's own covers list already applies to
// "Allergic Reactions".
//
// A short, isolated `facts`/`strip` label with a well-known Tamil clinical
// equivalent translates even where the identical word stays bare in
// flowing prose two lines away (the same fix this feature's own
// emergency.ta.ts applied to "Monitoring"/"Nursing"/"Rounds" as
// `strip[*].k` values). This file applies it to every bare one/two-word
// `facts[*].k`/`strip[*].k` that would otherwise be byte-identical to its
// English source: "Anaesthesia" -> "மயக்க மருந்து", "Consumables" ->
// "நுகர்பொருள்கள்" (facilities.ta.ts's own corrected form for this exact
// word), "Lists" -> "பட்டியல்கள்", "Sedation" -> "மயக்க நிலை", "Imaging" ->
// "படமாக்கல்", "Booking"/"Consultation" -> "முன்பதிவு"/"ஆலோசனை", "Consult"
// -> "ஆலோசனை", "Review" -> "மீளாய்வு", "Follow-up" -> "பின்தொடர்வு",
// "Reporting" -> "அறிக்கை அளித்தல்". Every one of these words stays bare
// English in flowing desc/body/faq prose throughout this file, matching the
// site-wide register; only the isolated bare label translates.
//
// Every number is unchanged from the English base.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const surgicalServices = [
  {
    title: "பொது அறுவை சிகிச்சை",
    directoryTitle: "பொது அறுவை சிகிச்சை",
    hours: "நிர்ணயிக்கப்பட்ட Lists",
    cta: "ஒரு Consult ஐ கோருங்கள்",
    desc: "Hernia, Gallbladder மற்றும் Appendix அறுவை சிகிச்சைகளுக்கு Elective Operating Lists, முடிந்தவரை Laparoscopically செய்யப்படும், அதனால் குணமடைதல் விரைவாகிறது. நிபுணர் மருத்துவர் வழிநடத்தும் மயக்க மருந்து மற்றும் ஒரு நோயாளிக்கு ஒரு Recovery Nurse Anaesthetic Room முதல் Discharge வரை சிகிச்சையை கொண்டு செல்வர்.",
    tags: ["Laparoscopic அறுவை சிகிச்சை", "Hernia சரிசெய்தல்", "Gallbladder அகற்றுதல்", "Appendix அறுவை சிகிச்சை"],
    facts: [
      { k: "மயக்க மருந்து", v: "நிபுணர் மருத்துவர் வழிநடத்துவார்" },
      { k: "அணுகுமுறை", v: "பொருத்தமாக இருந்தால் Laparoscopic" },
      { k: "நுகர்பொருள்கள்", v: "நோயாளிக்கு Single-use" },
      { k: "குணமடைதல்", v: "நோயாளிக்கு ஒரு Nurse Assign செய்யப்பட்டவர்" },
    ],
    lede: "Hernia, Gallbladder மற்றும் Appendix பிரச்சனைகளுக்கு Elective அறுவை சிகிச்சை, உங்களை விரைவில் வீட்டிற்கு அனுப்பும் Laparoscopic அணுகுமுறையை முடிந்தவரை பயன்படுத்தி.",
    aboutHead: "குணமடைதலை மையமாகக் கொண்ட Elective Lists",
    body1: "Hernia Repairs, Gallbladder அகற்றுதல் மற்றும் Appendix அறுவை சிகிச்சை நிர்ணயிக்கப்பட்ட Operating Lists இல் Book செய்யப்படுகின்றன, Open அறுவை சிகிச்சையுடன் ஒப்பிடும்போது குணமடைதலை குறைத்து காயத்தையும் குறைக்கும் Laparoscopic அணுகுமுறை முடிந்தவரை பயன்படுத்தப்படுகிறது. ஒரு நிபுணர் Anaesthetist அறுவை சிகிச்சைக்கு முன் ஒவ்வொரு நோயாளியையும் Review செய்து, முழுவதும் மயக்க மருந்திற்கு பொறுப்பாக இருப்பார்.",
    body2: "Instruments மற்றும் Consumables ஒவ்வொரு நோயாளிக்கும் Single-use, நீங்கள் Theatre இலிருந்து வெளியேறும் தருணத்திலிருந்து வீட்டிற்கு செல்ல அல்லது Ward Bed க்கு தயாராகும் வரை உங்களை கவனிக்க ஒரு Recovery Nurse Assign செய்யப்பட்டிருப்பார். Discharge க்கு முன் Wound-care வழிமுறைகள் மற்றும் ஒரு Follow-up தேதியுடன் செல்வீர்கள்.",
    strip: [
      { k: "அணுகுமுறை", v: "முதலில் Laparoscopic" },
      { k: "மயக்க மருந்து", v: "நிபுணர் மருத்துவர் வழிநடத்துவார்" },
      { k: "பட்டியல்கள்", v: "நிர்ணயிக்கப்பட்டவை" },
      { k: "குணமடைதல்", v: "நோயாளிக்கு ஒரு Nurse" },
    ],
    covers: [
      "Hernia சரிசெய்தல்",
      "Gallbladder அகற்றுதல்",
      "Appendix அறுவை சிகிச்சை",
      "சிறிய Lump மற்றும் Cyst அகற்றுதல்",
      "காயம் மற்றும் Abscess மேலாண்மை",
    ],
    conditions: [
      "Inguinal மற்றும் Umbilical Hernia",
      "Gallbladder கற்கள்",
      "கடுமையான Appendicitis",
      "வயிற்று சுவர் Lumps",
      "தோல் Abscesses",
    ],
    location: "மூன்றாம் மாடி, பொது அறுவை சிகிச்சை பிரிவு",
    steps: [
      { no: "01", title: "Consult செய்தல்", desc: "ஒரு Surgeon உங்களை பரிசோதித்து, ஏதேனும் Scans ஐ Review செய்து, உங்கள் நிலைமைக்கு Laparoscopic அல்லது Open அணுகுமுறை பொருத்தமா என்று விளக்குவார்." },
      { no: "02", title: "Book செய்தல்", desc: "உங்கள் அறுவை சிகிச்சை ஒரு List இல் Schedule செய்யப்பட்டு, முந்தைய நாட்களில் Pre-operative பரிசோதனைகள் ஏற்பாடு செய்யப்படும்." },
      { no: "03", title: "அறுவை சிகிச்சை", desc: "நிபுணர் மயக்க மருந்தும் அர்ப்பணிக்கப்பட்ட Theatre குழுவும் செயல்முறை முழுவதும் உங்களை கவனிக்கும்." },
      { no: "04", title: "குணமடைதல்", desc: "Assign செய்யப்பட்ட Recovery Nurse பிறகு உங்களை Monitor செய்வார், எழுத்து மூல Wound-care மற்றும் Follow-up வழிமுறைகளுடன் செல்வீர்கள்." },
    ],
    prep: [
      "அனுமதி நேரத்திற்கு முன் வழிமுறைகளின்படி உபவாசம் இருங்கள்",
      "உங்கள் தற்போதைய மருந்து பட்டியலைக் கொண்டு வாருங்கள்",
      "பிறகு உங்களை வீட்டிற்கு கொண்டு செல்ல ஒருவரை ஏற்பாடு செய்யுங்கள்",
      "Blood Thinners ஐ நிறுத்துவது பற்றி முன்கூட்டியே கேளுங்கள்",
    ],
    team: [
      { role: "பொது Surgeon கள்", note: "Hernia, Gallbladder மற்றும் Appendix அறுவை சிகிச்சைக்கு Consultations மற்றும் Operating Lists ஐ வழிநடத்துவர்." },
      { role: "நிபுணர் Anaesthetist கள்", note: "ஒவ்வொரு நோயாளியையும் முன்கூட்டியே Assess செய்து அறுவை சிகிச்சையின்போது மயக்க மருந்திற்கு பொறுப்பாக இருப்பர்." },
      { role: "Theatre Nursing குழு", note: "Single-use Instruments ஐ தயார் செய்து ஒவ்வொரு Case இலும் Surgeon க்கு உதவும்." },
      { role: "Recovery Nurse கள்", note: "அறுவை சிகிச்சை முடிவிலிருந்து Discharge அல்லது Ward Transfer வரை நோயாளர்களை Monitor செய்ய Assign செய்யப்பட்டவர்." },
    ],
    faq: [
      { q: "என் அறுவை சிகிச்சை Laparoscopically செய்யப்படுமா?", a: "பொருத்தமாக இருந்தால், ஆம், ஒரு Laparoscopic அணுகுமுறை பயன்படுத்தப்படும், ஏனெனில் பொதுவாக குறைவான வலியும் விரைவான வீடு திரும்புதலும் கிடைக்கும். உங்கள் நிலைமைக்கு Open அறுவை சிகிச்சை சிறந்ததாக இருந்தால் உங்கள் Surgeon விளக்குவார்." },
      { q: "மயக்க மருந்தை யார் தருவர்?", a: "ஒரு நிபுணர் Anaesthetist உங்களை முன்கூட்டியே Assess செய்து அறுவை சிகிச்சை முழுவதும் உங்கள் மயக்க மருந்திற்கு பொறுப்பாக இருப்பார்." },
      { q: "நான் மருத்துவமனையில் எவ்வளவு காலம் இருப்பேன்?", a: "பல Hernia, Gallbladder மற்றும் Appendix அறுவை சிகிச்சைகள் Day Case அல்லது ஒரு இரவு தங்குதல்; உங்கள் Consultation இல் உங்கள் Surgeon என்ன எதிர்பார்க்க வேண்டும் என்று உறுதிப்படுத்துவார்." },
      { q: "அறுவை சிகிச்சைக்கு நேரடியாகப் பிறகு என்ன நடக்கும்?", a: "நீங்கள் ஒரு Ward Bed க்கு மாற்றப்படும் வரை அல்லது எழுத்து மூல வழிமுறைகளுடன் Discharge ஆகும் வரை, நீங்கள் விழிக்கும்போது உங்களை கவனிக்க ஒரு Recovery Nurse Assign செய்யப்பட்டிருப்பார்." },
    ],
  },
  {
    title: "எலும்பியல் அறுவை சிகிச்சை",
    directoryTitle: "எலும்பியல் அறுவை சிகிச்சை",
    hours: "Day Case மற்றும் Inpatient",
    cta: "ஒரு Consult ஐ கோருங்கள்",
    desc: "எலும்பு முறிவுகள், விளையாட்டு காயங்கள் மற்றும் Joint பிரச்சனைகளுக்கு Day Case மற்றும் Inpatient அறுவை சிகிச்சை, அதே Corridor இலேயே Imaging கிடைக்கும், நீங்கள் செல்வதற்கு முன்பே ஒரு Physiotherapy திட்டம் ஒப்புக்கொள்ளப்படும்.",
    tags: ["எலும்பு முறிவு அறுவை சிகிச்சை", "Arthroscopy சிகிச்சை", "விளையாட்டு காயம்", "Physiotherapy திட்டமிடல்"],
    facts: [
      { k: "படமாக்கல்", v: "அதே Corridor இலேயே" },
      { k: "பட்டியல்கள்", v: "Day Case மற்றும் Inpatient" },
      { k: "Physiotherapy திட்டம்", v: "Discharge க்கு முன் திட்டமிடப்படும்" },
      { k: "பின்தொடர்வு", v: "Discharge இல் Schedule செய்யப்படும்" },
    ],
    lede: "எலும்பு முறிவுகள், விளையாட்டு காயங்கள் மற்றும் Joint பிரச்சனைகளுக்கு அறுவை சிகிச்சை, படிகள் தொலைவில் Imaging மற்றும் வீட்டிற்குச் செல்வதற்கு முன் தீர்மானிக்கப்படும் ஒரு Physiotherapy திட்டத்துடன்.",
    aboutHead: "காயத்திலிருந்து Rehabilitation வரை ஒரே இடத்தில்",
    body1: "எலும்பு முறிவுகள், Ligament காயங்கள் மற்றும் Joint பிரச்சனைகள் Clinic இன் அதே Corridor இலேயே Imaging எடுத்து மதிப்பிடப்படுகின்றன, அதனால் வேறு இடத்தில் முடிவுகளுக்காக காத்திருக்காமல் முதல் வருகையிலேயே ஒரு திட்டம் ஒப்புக்கொள்ளப்படலாம். அறுவை சிகிச்சை Day-case Arthroscopy முதல் Inpatient எலும்பு முறிவு Fixation வரை நீள்கிறது.",
    body2: "மருத்துவமனையை விட்டு செல்வதற்கு முன், ஒரு Physiotherapist உங்களுடன் ஒரு Rehabilitation திட்டத்தை ஒப்புக்கொள்வார், அசைவு, எடை தாங்குதல் மற்றும் வீட்டில் தொடங்க வேண்டிய Exercises ஐ உள்ளடக்கியது. உங்கள் Surgeon குணமடைதலையும் அந்த திட்டத்திற்கு எதிரான முன்னேற்றத்தையும் சரிபார்க்க ஒரு Follow-up Appointment ஏற்பாடு செய்யப்படும்.",
    strip: [
      { k: "படமாக்கல்", v: "அதே Corridor இலேயே" },
      { k: "பட்டியல்கள்", v: "Day Case மற்றும் Inpatient" },
      { k: "Physio திட்டம்", v: "Discharge க்கு முன்" },
      { k: "பின்தொடர்வு", v: "Discharge இல் ஏற்பாடு" },
    ],
    covers: [
      "எலும்பு முறிவு Fixation",
      "முழங்கால் மற்றும் தோள்பட்டை Arthroscopy",
      "விளையாட்டு காயம் Repair",
      "Ligament மற்றும் Tendon அறுவை சிகிச்சை",
      "Joint வலி மதிப்பீடு",
    ],
    conditions: [
      "எலும்பு முறிவுகள்",
      "கிழிந்த Ligaments",
      "Meniscus கிழிசல்கள்",
      "Rotator Cuff காயம்",
      "விளையாட்டு தொடர்பான Joint வலி",
    ],
    location: "முதல் மாடி, எலும்பியல் பிரிவு",
    steps: [
      { no: "01", title: "மதிப்பீடு", desc: "ஒரு எலும்பியல் Surgeon காயத்தை பரிசோதித்து அதே Corridor இலேயே Imaging ஏற்பாடு செய்வார்." },
      { no: "02", title: "திட்டமிடல்", desc: "எலும்பு முறிவு அல்லது காயத்திற்கு தேவையானதைப் பொறுத்து அறுவை சிகிச்சை Day Case அல்லது Inpatient ஆக Book செய்யப்படும்." },
      { no: "03", title: "அறுவை சிகிச்சை", desc: "Fixation, Arthroscopy அல்லது Repair எலும்பியல் Theatre குழுவால் செய்யப்படும்." },
      { no: "04", title: "Rehabilitate செய்தல்", desc: "நீங்கள் செல்வதற்கு முன் ஒரு Physiotherapist உங்களுடன் ஒரு அசைவு மற்றும் Exercise திட்டத்தை ஒப்புக்கொள்வார்." },
    ],
    prep: [
      "முந்தைய Scans அல்லது X-rays உடன் கொண்டு வாருங்கள்",
      "அறுவை சிகிச்சைக்குப் பிறகு முதல் நாட்களுக்கு வீட்டில் ஆதரவை ஏற்பாடு செய்யுங்கள்",
      "Crutches அல்லது Brace பற்றி முன்கூட்டியே கேளுங்கள்",
      "Dressing அல்லது Splint க்கு மேல் பொருந்தும் தளர்வான உடைகளை அணியுங்கள்",
    ],
    team: [
      { role: "எலும்பியல் Surgeon கள்", note: "எலும்பு முறிவுகள் மற்றும் Joint காயங்களை மதிப்பீடு செய்து Fixation மற்றும் Arthroscopic அறுவை சிகிச்சையை செய்வர்." },
      { role: "Radiographer கள்", note: "அதே Corridor இலேயே Imaging வழங்குவர், அதனால் முடிவுகள் முதல் வருகையிலேயே கிடைக்கும்." },
      { role: "Physiotherapist கள்", note: "Discharge க்கு முன் ஒவ்வொரு நோயாளியுடனும் ஒரு Rehabilitation திட்டத்தை ஒப்புக்கொள்வர்." },
      { role: "எலும்பியல் Nursing குழு", note: "Ward இல் அறுவை சிகிச்சைக்கு முன்பும் பின்பும் சிகிச்சைக்கு உதவும்." },
    ],
    faq: [
      { q: "எனக்கு அறுவை சிகிச்சை தேவையா, Physiotherapy மட்டும் போதுமா?", a: "இது காயத்தைப் பொறுத்தது. பல Sprains மற்றும் சிறு கிழிசல்கள் Physiotherapy மட்டுமே நன்றாக Respond செய்யும்; எலும்பு முறிவுகள் மற்றும் கடுமையான Ligament கிழிசல்கள் பொதுவாக அறுவை சிகிச்சைக்காக மதிப்பிடப்படும்." },
      { q: "Imaging எவ்வளவு விரைவாக செய்யப்படும்?", a: "Imaging Clinic இன் அதே Corridor இலேயே எடுக்கப்படுகிறது, அதனால் பல நோயாளர்கள் அதே வருகையில் Scan மற்றும் Surgeon ஐ பார்க்கின்றனர்." },
      { q: "நான் அதே நாளில் வீடு செல்வேனா?", a: "பல Arthroscopic செயல்முறைகள் Day Case. எலும்பு முறிவு Fixation மற்றும் பெரிய Repairs பொதுவாக ஒரு குறுகிய Inpatient தங்குதல் தேவைப்படும், உங்கள் Surgeon முன்கூட்டியே இதை உறுதிப்படுத்துவார்." },
      { q: "Physiotherapy எப்போது தொடங்கும்?", a: "Discharge ஆவதற்கு முன் ஒரு Physiotherapist உடன் ஒரு திட்டம் ஒப்புக்கொள்ளப்படும், அதனால் வீட்டில் முதல் நாளிலிருந்தே என்ன செய்ய வேண்டும் என்று உங்களுக்குத் தெரியும்." },
    ],
  },
  {
    title: "ENT அறுவை சிகிச்சை மற்றும் செவித்திறனியல்",
    directoryTitle: "ENT அறுவை சிகிச்சை மற்றும் செவித்திறனியல்",
    hours: "வாராந்திர Lists",
    cta: "ஒரு ENT Consult ஐ Book செய்யுங்கள்",
    desc: "Tonsils, Sinuses மற்றும் செவிப்புலன் பிரச்சனைகளுக்கு அறுவை சிகிச்சை, வாராந்திர வயது வந்தோர் மற்றும் குழந்தை Lists இல் நடத்தப்படும், செவிப்புலனை பாதிக்கும் எந்த செயல்முறைக்கும் முன்பும் பின்பும் ஒரு செவித்திறனியல் மதிப்பீடு.",
    tags: ["Tonsil அறுவை சிகிச்சை", "Sinus அறுவை சிகிச்சை", "Grommets பொருத்துதல்", "செவித்திறனியல் மதிப்பீடு"],
    facts: [
      { k: "பட்டியல்கள்", v: "வாராந்திரம், வயது வந்தோர் மற்றும் குழந்தை" },
      { k: "செவித்திறனியல்", v: "முன்பும் பின்பும் மதிப்பிடப்படும்" },
      { k: "வயது வரம்பு", v: "குழந்தைகள் மற்றும் வயது வந்தோர்" },
      { k: "ஆலோசனை", v: "முன்கூட்டியே Book செய்யப்படும்" },
    ],
    lede: "Tonsils, Sinuses மற்றும் Grommets க்கு அறுவை சிகிச்சை, செவிப்புலனைத் தொடும் எந்த செயல்முறைக்கும் முன்பும் பின்பும் ஒரு செவித்திறனியல் பரிசோதனை.",
    aboutHead: "ஒவ்வொரு வயதிற்கும் காது, மூக்கு மற்றும் தொண்டை அறுவை சிகிச்சை",
    body1: "வாராந்திர Operating Lists Tonsillectomy, Sinus அறுவை சிகிச்சை மற்றும் Grommet Insertion ஐ குழந்தைகள் மற்றும் வயது வந்தோர் இருவருக்கும் உள்ளடக்குகின்றன. ஒரு செயல்முறை செவிப்புலனை பாதிக்கக்கூடும் என்றால், முன்பே ஒரு Baseline ஐ அமைக்க ஒரு செவித்திறனியல் மதிப்பீடு செய்யப்பட்டு, முடிவை உறுதிப்படுத்த பின்பும் மீண்டும் செய்யப்படும்.",
    body2: "குழந்தை Lists வயது வந்தோர் Lists இலிருந்து தனியாக நடத்தப்படுகின்றன, குழந்தைகள் மற்றும் அவர்களின் பெற்றோருக்கு ஏற்ற பணியாளர்கள் மற்றும் நேரங்களுடன். அறுவை சிகிச்சைக்கு முன் ஒரு Consultation என்ன எதிர்பார்க்க வேண்டும், குணமடைய எவ்வளவு நேரம் எடுக்கும், Follow-up எப்படி இருக்கும் என்பதை உள்ளடக்குகிறது.",
    strip: [
      { k: "பட்டியல்கள்", v: "வாராந்திரம்" },
      { k: "பட்டியல்கள் உள்ளடக்கம்", v: "வயது வந்தோர் & குழந்தை" },
      { k: "செவித்திறனியல்", v: "முன்பும் பின்பும்" },
      { k: "முன்பதிவு", v: "Consultation மூலம்" },
    ],
    covers: [
      "Tonsillectomy அறுவை சிகிச்சை",
      "Sinus அறுவை சிகிச்சை",
      "Grommet பொருத்துதல்",
      "செவிப்புலன் மதிப்பீடு",
      "மூக்கு காற்றுப் பாதை பிரச்சனைகள்",
    ],
    conditions: [
      "மீண்டும் மீண்டும் ஏற்படும் Tonsillitis",
      "நீடித்த Sinusitis",
      "குழந்தைகளின் Glue Ear",
      "செவித்திறன் இழப்பு",
      "மூக்கு அடைப்பு",
    ],
    location: "இரண்டாம் மாடி, ENT பிரிவு",
    steps: [
      { no: "01", title: "Consult செய்தல்", desc: "ஒரு ENT Surgeon உங்களை பரிசோதித்து, செவிப்புலன் சம்பந்தப்பட்டால் ஒரு செவித்திறனியல் மதிப்பீட்டை ஏற்பாடு செய்வார்." },
      { no: "02", title: "மதிப்பீடு", desc: "உங்கள் செயல்முறை Book செய்யப்படுவதற்கு முன் Baseline செவிப்புலன் பரிசோதனைகள் பதிவு செய்யப்படும்." },
      { no: "03", title: "அறுவை சிகிச்சை", desc: "அறுவை சிகிச்சை பொருத்தமான வாராந்திர வயது வந்தோர் அல்லது குழந்தை List இல் செய்யப்படும்." },
      { no: "04", title: "Review செய்தல்", desc: "ஒரு Follow-up செவித்திறனியல் பரிசோதனை மற்றும் Consultation குணமடைதலையும் செவிப்புலன் முடிவையும் உறுதிப்படுத்தும்." },
    ],
    prep: [
      "முந்தைய செவிப்புலன் பரிசோதனை முடிவுகளை கொண்டு வாருங்கள்",
      "குழந்தைகளுக்கு, வருகை முழுவதும் ஒரு பெற்றோர் இருக்க ஏற்பாடு செய்யுங்கள்",
      "சமீபத்திய காது Infection அல்லது செவிப்புலன் மாற்றங்களை குறித்துக் கொள்ளுங்கள்",
      "Booking இல் கொடுக்கப்பட்ட உபவாச வழிமுறைகளை பின்பற்றுங்கள்",
    ],
    team: [
      { role: "ENT Surgeon கள்", note: "வாராந்திர வயது வந்தோர் மற்றும் குழந்தை Lists இல் Tonsil, Sinus மற்றும் Grommet அறுவை சிகிச்சையை செய்வர்." },
      { role: "Audiologist கள்", note: "செவிப்புலனை பாதிக்கக்கூடிய எந்த செயல்முறைக்கும் முன்பும் பின்பும் செவிப்புலனை மதிப்பிடுவர்." },
      { role: "குழந்தை Nursing குழு", note: "தனியான குழந்தை Lists மூலம் குழந்தைகள் மற்றும் பெற்றோருக்கு ஆதரவளிக்கும்." },
      { role: "ENT Clinic Coordinator ஒருவர்", note: "Consultations, செவித்திறனியல் Slots மற்றும் Follow-up Appointments ஐ ஏற்பாடு செய்வார்." },
    ],
    faq: [
      { q: "குழந்தைகளுக்கு தனி List உள்ளதா?", a: "ஆம். குழந்தை Cases அவற்றுக்கே தனியாக ஒதுக்கப்பட்ட Lists இல் நடத்தப்படுகின்றன, குழந்தைகள் மற்றும் பெற்றோருக்கு ஏற்ற பணியாளர்கள் மற்றும் நேரங்களுடன்." },
      { q: "அறுவை சிகிச்சைக்கு முன் என் செவிப்புலன் பரிசோதிக்கப்படுமா?", a: "ஒரு செயல்முறை செவிப்புலனை பாதிக்கக்கூடும் என்றால், முன்பே ஒரு Baseline ஐ பதிவு செய்ய ஒரு செவித்திறனியல் மதிப்பீடு செய்யப்பட்டு, முடிவை பரிசோதிக்க பின்பும் மீண்டும் செய்யப்படும்." },
      { q: "Consultation ஐ எப்படி Book செய்வது?", a: "ஒரு ENT Consult ஐ Book செய்யுங்கள், ஒரு Surgeon உங்களை பரிசோதித்து Options பற்றி பேசுவதற்கு முன் தேவையான Imaging அல்லது செவித்திறனியல் பரிசோதனைகளை ஏற்பாடு செய்வார்." },
      { q: "அறுவை சிகிச்சைக்கு எவ்வளவு காலம் காத்திருக்க வேண்டும்?", a: "Operating Lists வாராந்திரம் நடத்தப்படுகின்றன, உங்கள் Consultation மற்றும் Pre-operative பரிசோதனைகள் முடிந்ததும் உங்கள் Surgeon எதிர்பார்க்கப்படும் தேதியை தருவார்." },
    ],
  },
  {
    title: "சிறுநீர்ப்பாதை அறுவை சிகிச்சை",
    directoryTitle: "சிறுநீர்ப்பாதை அறுவை சிகிச்சை",
    hours: "வாராந்திர Lists",
    cta: "ஒரு Urology Consult ஐ Book செய்யுங்கள்",
    desc: "சிறுநீரக கற்கள், Prostate பிரச்சனைகள் மற்றும் சிறுநீர்ப் பாதை நிலைமைகளுக்கு மதிப்பீடு மற்றும் அறுவை சிகிச்சை, உங்கள் முதல் வருகையிலேயே Ultrasound மற்றும் Flow Studies செய்யப்படும்.",
    tags: ["சிறுநீரக கற்கள்", "Prostate அறுவை சிகிச்சை", "சிறுநீர்ப் பாதை", "Flow பரிசோதனைகள்"],
    facts: [
      { k: "பட்டியல்கள்", v: "வாராந்திரம்" },
      { k: "முதல் வருகை", v: "Ultrasound மற்றும் Flow Studies" },
      { k: "வயது வரம்பு", v: "வயது வந்தோர்" },
      { k: "முன்பதிவு", v: "Consultation மூலம்" },
    ],
    lede: "சிறுநீரக கற்கள், Prostate பிரச்சனைகள் மற்றும் சிறுநீர்ப் பாதை நிலைமைகளுக்கு மதிப்பீடு மற்றும் அறுவை சிகிச்சை, உங்கள் முதல் வருகையில் செய்யப்படும் Ultrasound மற்றும் Flow Studies உடன்.",
    aboutHead: "சிறுநீர் பிரச்சனைகளுக்கு அதே வருகையில் மதிப்பீடு",
    body1: "சிறுநீரகம் மற்றும் சிறுநீர்ப்பை கற்கள், Prostate பெருக்கம் மற்றும் மீண்டும் மீண்டும் ஏற்படும் சிறுநீர்ப் பாதை பிரச்சனைகள் முதல் Consultation இலேயே Ultrasound மற்றும் சிறுநீர் Flow Studies உடன் மதிப்பிடப்படுகின்றன, அதனால் முடிவுகளுக்கு தனி வருகை இல்லாமல் ஒரு சிகிச்சை திட்டத்தை விவாதிக்க முடியும்.",
    body2: "அறுவை சிகிச்சை தேவைப்பட்டால், செயல்முறைகள் வாராந்திர Operating Lists இல் Book செய்யப்படுகின்றன. உங்கள் Surgeon கல் அகற்றுதலிலிருந்து Prostate அறுவை சிகிச்சை வரை உங்கள் நிலைமைக்கு பொருத்தமான அணுகுமுறையையும், எதிர்பார்க்கப்படும் குணமடைதல் மற்றும் Follow-up ஐயும் விளக்குவார்.",
    strip: [
      { k: "பட்டியல்கள்", v: "வாராந்திரம்" },
      { k: "முதல் வருகை", v: "Ultrasound மற்றும் Flow Studies" },
      { k: "ஆலோசனை", v: "Booking மூலம்" },
      { k: "பின்தொடர்வு", v: "அறுவை சிகிச்சைக்குப் பின் ஏற்பாடு" },
    ],
    covers: [
      "சிறுநீரகம் மற்றும் சிறுநீர்ப்பை கல் சிகிச்சை",
      "Prostate அறுவை சிகிச்சை",
      "சிறுநீர்ப் பாதை Infection மதிப்பீடு",
      "சிறுநீர் Flow Studies",
      "சிறுநீர்ப்பை பிரச்சனைகள்",
    ],
    conditions: [
      "சிறுநீரக கற்கள்",
      "பெரிதாகிய Prostate",
      "மீண்டும் மீண்டும் ஏற்படும் சிறுநீர் Infection",
      "சிறுநீரில் இரத்தம்",
      "சிறுநீர் தேக்கம்",
    ],
    location: "முதல் மாடி, Urology Clinic",
    steps: [
      { no: "01", title: "Consult செய்தல்", desc: "ஒரு Urologist முதல் வருகையிலேயே உங்கள் History ஐ எடுத்து உங்களை பரிசோதிப்பார்." },
      { no: "02", title: "விசாரணை", desc: "Ultrasound மற்றும் சிறுநீர் Flow Studies அதே நாளில் செய்யப்படும்." },
      { no: "03", title: "திட்டமிடல்", desc: "உங்கள் Surgeon கண்டுபிடிப்புகளை விவாதித்து ஒரு சிகிச்சை அல்லது அறுவை சிகிச்சை திட்டத்தை உங்களுடன் ஒப்புக்கொள்வார்." },
      { no: "04", title: "சிகிச்சை", desc: "தேவைப்பட்டால், அறுவை சிகிச்சை ஒரு வாராந்திர List இல் Book செய்யப்பட்டு, பின்பு Follow-up ஏற்பாடு செய்யப்படும்." },
    ],
    prep: [
      "Flow Study திட்டமிடப்பட்டிருந்தால் வசதியாக நிரம்பிய சிறுநீர்ப்பையுடன் வாருங்கள்",
      "உங்கள் தற்போதைய மருந்து பட்டியலைக் கொண்டு வாருங்கள்",
      "சமீபத்திய சிறுநீர் Test முடிவுகளை குறித்துக் கொள்ளுங்கள்",
      "அறுவை சிகிச்சைக்கு முன் Blood Thinners ஐ நிறுத்துவது பற்றி கேளுங்கள்",
    ],
    team: [
      { role: "Urologist கள்", note: "கற்கள், Prostate மற்றும் சிறுநீர்ப் பாதை நிலைமைகளை மதிப்பீடு செய்து வாராந்திர Lists இல் அறுவை சிகிச்சை செய்வர்." },
      { role: "Sonographer கள்", note: "முதல் Consultation இலேயே Ultrasound Scans செய்வர்." },
      { role: "Urology Nursing குழு", note: "Flow Studies, Pre-operative பரிசோதனைகள் மற்றும் அறுவை சிகிச்சைக்குப் பின் சிகிச்சைக்கு உதவும்." },
      { role: "Clinic Coordinator ஒருவர்", note: "Consultations மற்றும் அறுவை சிகிச்சை Slots ஐ Book செய்வார்." },
    ],
    faq: [
      { q: "அதே நாளில் முடிவுகள் கிடைக்குமா?", a: "Ultrasound மற்றும் Flow Studies முதல் வருகையிலேயே செய்யப்படுகின்றன, அதனால் உங்கள் Urologist பொதுவாக அதே நாளில் கண்டுபிடிப்புகளை உங்களுடன் விவாதிக்க முடியும்." },
      { q: "Flow Study க்கு நான் தயார் செய்ய வேண்டுமா?", a: "வசதியாக நிரம்பிய சிறுநீர்ப்பையுடன் வர கேட்கப்படும்; Book செய்யும்போது Clinic நேரத்தை விளக்கும்." },
      { q: "கற்களுக்கு எப்போதும் அறுவை சிகிச்சை தேவையா?", a: "எப்போதும் இல்லை. சில கற்கள் தானாகவே கடந்து செல்கின்றன அல்லது மருந்தால் மேலாண்மை செய்யப்படுகின்றன. உங்கள் நிலைமைக்கு பொருத்தமான Options ஐ உங்கள் Urologist விளக்குவார்." },
      { q: "அறுவை சிகிச்சை எவ்வளவு விரைவாக Book செய்யப்படும்?", a: "செயல்முறைகள் வாராந்திர Lists இல் இயங்குகின்றன, மதிப்பீடு முடிந்ததும் உங்கள் Urologist எதிர்பார்க்கப்படும் தேதியை தருவார்." },
    ],
  },
  {
    title: "கண் மருத்துவம் மற்றும் Cataract அறுவை சிகிச்சை",
    directoryTitle: "கண் மருத்துவம் மற்றும் Cataract அறுவை சிகிச்சை",
    hours: "வாராந்திர Lists",
    cta: "ஒரு கண் Consult ஐ Book செய்யுங்கள்",
    desc: "கண் மதிப்பீடு மற்றும் Day-case Cataract அறுவை சிகிச்சை, உங்கள் முதல் வருகையிலேயே Refraction, Pressure பரிசோதனைகள் மற்றும் ஒரு Retinal மதிப்பீடு, அறுவை சிகிச்சைக்கு மறுநாள் ஒரு Review உடன்.",
    tags: ["Cataract அறுவை சிகிச்சை", "Refraction பரிசோதனை", "Pressure பரிசோதனைகள்", "Retinal மதிப்பீடு"],
    facts: [
      { k: "பட்டியல்கள்", v: "வாராந்திரம்" },
      { k: "அறுவை சிகிச்சை", v: "ஒரு Day Case" },
      { k: "மீளாய்வு", v: "மறுநாள்" },
      { k: "முதல் வருகை", v: "Refraction, Pressure மற்றும் Retinal பரிசோதனை" },
    ],
    lede: "கண் மதிப்பீடு மற்றும் Day-case Cataract அறுவை சிகிச்சை, உங்கள் முதல் வருகையில் ஒரு முழுமையான பரிசோதனையும் மறுநாள் ஒரு Review உம்.",
    aboutHead: "மதிப்பீட்டிலிருந்து Review வரை Cataract சிகிச்சை",
    body1: "முதல் வருகை Refraction, கண் Pressure பரிசோதனைகள் மற்றும் ஒரு Retinal மதிப்பீட்டை உள்ளடக்குகிறது, Cataract அறுவை சிகிச்சை உங்களுக்கு பொருத்தமா என்று விவாதிக்கும் முன் உங்கள் Ophthalmologist க்கு ஒரு முழுமையான பார்வையை தருகிறது. Lens Options இந்த கட்டத்தில் அறுவை சிகிச்சை திட்டத்தின் ஒரு பகுதியாக விவாதிக்கப்படலாம்.",
    body2: "Cataract அறுவை சிகிச்சை ஒரு Day Case ஆக செய்யப்படுகிறது, Drops மற்றும் எழுத்து மூல வழிமுறைகளுடன் அதே நாளில் வீடு செல்வீர்கள். மறுநாள் ஒரு Review குணமடைதலையும் பார்வையையும் பரிசோதித்து, தேவைப்பட்டால் மேலும் Follow-up ஏற்பாடு செய்யும்.",
    strip: [
      { k: "பட்டியல்கள்", v: "வாராந்திரம்" },
      { k: "அறுவை சிகிச்சை", v: "ஒரு Day Case" },
      { k: "மீளாய்வு", v: "மறுநாள்" },
      { k: "மதிப்பீடு", v: "Refraction, Pressure மற்றும் Retina" },
    ],
    covers: [
      "Cataract அறுவை சிகிச்சை",
      "Refraction மற்றும் கண்ணாடி மதிப்பீடு",
      "கண் Pressure பரிசோதனைகள்",
      "Retinal மதிப்பீடு",
      "Lens Option விவாதம்",
    ],
    conditions: [
      "Cataract நிலை",
      "மங்கலான பார்வை",
      "அதிகரித்த கண் Pressure",
      "Retinal மாற்றங்கள்",
      "இரவு பார்வையில் சிரமம்",
    ],
    location: "தரைத் தளம், Ophthalmology Clinic",
    steps: [
      { no: "01", title: "மதிப்பீடு", desc: "ஒரு Ophthalmologist உங்கள் முதல் வருகையிலேயே Refraction, கண் Pressure மற்றும் Retina ஐ பரிசோதிப்பார்." },
      { no: "02", title: "விவாதம்", desc: "கண்டுபிடிப்புகள் மற்றும் Lens Options விவாதிக்கப்பட்டு, பொருத்தமாக இருந்தால் அறுவை சிகிச்சை Book செய்யப்படும்." },
      { no: "03", title: "அறுவை சிகிச்சை", desc: "Cataract அறுவை சிகிச்சை ஒரு வாராந்திர List இல் Day Case ஆக செய்யப்படும்." },
      { no: "04", title: "Review செய்தல்", desc: "பார்வை மற்றும் குணமடைதலை பரிசோதிக்க நீங்கள் மறுநாள் திரும்பி வருவீர்கள்." },
    ],
    prep: [
      "அறுவை சிகிச்சைக்குப் பிறகு உங்களை வீட்டிற்கு கொண்டு செல்ல ஒருவரை ஏற்பாடு செய்யுங்கள்",
      "உங்கள் மதிப்பீட்டிற்கு உங்கள் தற்போதைய கண்ணாடியை கொண்டு வாருங்கள்",
      "ஏதேனும் Eye Drops ஐ நிறுத்துவது பற்றி முன்கூட்டியே கேளுங்கள்",
      "மறுநாள் Review க்கு ஒரு துணையை திட்டமிடுங்கள்",
    ],
    team: [
      { role: "Ophthalmologist கள்", note: "பார்வை, கண் Pressure மற்றும் Retina ஐ மதிப்பிட்டு வாராந்திர Lists இல் Cataract அறுவை சிகிச்சையை செய்வர்." },
      { role: "Optometrist கள்", note: "முதல் மதிப்பீட்டின் பகுதியாக Refraction பரிசோதனையை செய்வர்." },
      { role: "Theatre Nursing குழு", note: "Day-case Cataract அறுவை சிகிச்சையை தயார் செய்து ஆதரவளிக்கும்." },
      { role: "Clinic Coordinator ஒருவர்", note: "மதிப்பீடு, அறுவை சிகிச்சை மற்றும் மறுநாள் Review ஐ Book செய்வார்." },
    ],
    faq: [
      { q: "Cataract அறுவை சிகிச்சைக்குப் பிறகு நான் தங்க வேண்டுமா?", a: "இல்லை. Cataract அறுவை சிகிச்சை ஒரு Day Case ஆக செய்யப்படுகிறது, Drops மற்றும் எழுத்து மூல வழிமுறைகளுடன் அதே நாளில் வீடு செல்வீர்கள்." },
      { q: "முதல் வருகையில் என்ன நடக்கும்?", a: "உங்கள் Ophthalmologist Refraction, கண் Pressure மற்றும் Retina ஐ பரிசோதித்து, அறுவை சிகிச்சை Book செய்யப்படுவதற்கு முன் Lens Options உங்களுடன் விவாதிப்பார்." },
      { q: "அன்று எனக்கு ஒருவர் தேவையா?", a: "ஆம், அறுவை சிகிச்சைக்குப் பிறகு உங்களை வீட்டிற்கு கொண்டு செல்ல ஒருவரை ஏற்பாடு செய்யுங்கள், செயல்முறையின்போது பயன்படுத்தப்படும் Drops காரணமாக உங்கள் பார்வை மங்கலாக இருக்கும்." },
      { q: "பிறகு என் பார்வை எப்போது பரிசோதிக்கப்படும்?", a: "மறுநாள் Review க்கு திரும்பி வருவீர்கள், உங்கள் Ophthalmologist Recommend செய்தால் மேலும் Follow-up ஏற்பாடு செய்யப்படும்." },
    ],
  },
  {
    title: "நரம்பியல் அறுவை சிகிச்சை",
    directoryTitle: "நரம்பியல் அறுவை சிகிச்சை",
    hours: "Referral மூலம்",
    cta: "ஒரு Consult ஐ கோருங்கள்",
    desc: "மூளை மற்றும் முதுகுத் தண்டு பிரச்சனைகளுக்கு Imaging வழிநடத்தும் மதிப்பீடு, அடுத்த படி விவாதிக்கப்படுவதற்கு முன் ஒரு திட்டம் ஒப்புக்கொள்ளப்பட்டு பிறகு Structured சிகிச்சையுடன். Referral மூலம் பார்க்கப்படும், எந்த Recommendation க்கும் முன் Scans ஒரு நரம்பியல் Surgeon உடன் இணைந்து Review செய்யப்படும்.",
    tags: ["மூளை மதிப்பீடு", "முதுகுத் தண்டு மதிப்பீடு", "Imaging-Led திட்டமிடல்", "அறுவை சிகிச்சைக்குப் பிந்தைய சிகிச்சை"],
    facts: [
      { k: "அணுகுமுறை", v: "Referral மூலம்" },
      { k: "திட்டமிடல்", v: "Imaging அடிப்படையில்" },
      { k: "ஆலோசனை", v: "Scans ஒன்றாக Review செய்யப்படும்" },
      { k: "சிகிச்சை", v: "அறுவை சிகிச்சைக்குப் பிந்தைய Follow-up" },
    ],
    lede: "மூளை மற்றும் முதுகுத் தண்டு பிரச்சனைகள் மதிப்பீடு, Imaging மற்றும் ஒரு Referral வழியை மையமாகக் கொண்டு, சரியான அடுத்த சிகிச்சைப் படிக்கு.",
    aboutHead: "Imaging வழிநடத்தும் மதிப்பீடு மற்றும் திட்டமிடல்",
    body1: "நோயாளர்கள் Referral மூலம் பார்க்கப்படுவர், ஒரு நரம்பியல் Surgeon நோயாளியுடன் இணைந்து Imaging ஐ Review செய்து அடுத்து ஏதேனும் நடக்க வேண்டுமா என்று விவாதிப்பார். திட்டமிடல் ஒரு நிலையான செயல்முறை பட்டியலைவிட Scans காட்டுவதை மையமாகக் கொண்டு அமைக்கப்பட்டுள்ளது, அதனால் ஒவ்வொரு Case உம் அதன் சொந்த கண்டுபிடிப்புகளின் அடிப்படையில் கருதப்படுகிறது.",
    body2: "அறுவை சிகிச்சை Recommend செய்யப்பட்டால், பொருத்தமான அறுவை சிகிச்சை வழி மூலம் ஏற்பாடு செய்யப்படும், இந்த சேவை நோயாளியை பிறகும் தொடர்ந்து பின்தொடரும்: Imaging ஐ Review செய்து, குணமடைதலை பரிசோதித்து, மேலும் சிகிச்சைக்கான திட்டத்தை உறுதிப்படுத்தும்.",
    strip: [
      { k: "அணுகுமுறை", v: "Referral மூலம்" },
      { k: "திட்டமிடல்", v: "Imaging அடிப்படையில்" },
      { k: "மீளாய்வு", v: "நரம்பியல் Surgeon உடன்" },
      { k: "பின்தொடர்வு", v: "அறுவை சிகிச்சைக்குப் பிந்தைய சிகிச்சை" },
    ],
    covers: [
      "மூளை Imaging மதிப்பீடு",
      "முதுகுத் தண்டு Imaging மதிப்பீடு",
      "Referral அடிப்படையிலான Consultation",
      "அறுவை சிகிச்சைக்குப் பிந்தைய Follow-up சிகிச்சை",
    ],
    conditions: [
      "மதிப்பீடு தேவைப்படும் தலைக் காயம்",
      "சந்தேகிக்கப்படும் Spinal Cord Compression",
      "தொடர்ச்சியான கடுமையான தலைவலி",
      "முதுகு அல்லது கால் Nerve வலி",
      "மூளை அல்லது முதுகுத் தண்டு Imaging இல் அசாதாரண கண்டுபிடிப்புகள்",
    ],
    location: "இரண்டாம் மாடி, நரம்பியல் Consultation Suite",
    steps: [
      { no: "01", title: "Refer செய்தல்", desc: "உங்கள் Referral மற்றும் ஏதேனும் இருக்கும் Imaging உங்கள் Consultation க்கு முன் Review செய்யப்படும்." },
      { no: "02", title: "மதிப்பீடு", desc: "ஒரு நரம்பியல் Surgeon உங்களை பரிசோதித்து உங்களுடன் இணைந்து Imaging ஐ Review செய்வார்." },
      { no: "03", title: "திட்டமிடல்", desc: "கண்டுபிடிப்புகள் விவாதிக்கப்பட்டு, தேவைப்பட்டால் மேலும் Imaging உடன் ஒரு திட்டம் ஒப்புக்கொள்ளப்படும்." },
      { no: "04", title: "Follow up செய்தல்", desc: "ஏதேனும் அறுவை சிகிச்சைக்குப் பிறகு, Review Appointments குணமடைதலை Track செய்து அடுத்த படிகளை உறுதிப்படுத்தும்." },
    ],
    prep: [
      "உங்கள் மருத்துவரிடமிருந்து ஒரு Referral Letter ஐ கொண்டு வாருங்கள்",
      "ஏற்கனவே இருக்கும் மூளை அல்லது முதுகுத் தண்டு Imaging நகல்களை கொண்டு வாருங்கள்",
      "உங்கள் அறிகுறிகள் தொடங்கிய நேரத்தையும் அவை மாறிய விதத்தையும் குறித்துக் கொள்ளுங்கள்",
      "உங்கள் தற்போதைய மருந்துகளை பட்டியலிடுங்கள்",
    ],
    team: [
      { role: "நரம்பியல் Surgeon கள்", note: "Imaging ஐ Review செய்து மூளை மற்றும் முதுகுத் தண்டு Referrals க்கு மதிப்பீடு மற்றும் திட்டமிடலை வழிநடத்துவர்." },
      { role: "Radiologist கள்", note: "நரம்பியல் குழுவுடன் இணைந்து மூளை மற்றும் முதுகுத் தண்டு Imaging ஐ Report செய்வர்." },
      { role: "நரம்பியல் Nursing குழு", note: "Consultations மற்றும் அறுவை சிகிச்சைக்குப் பிந்தைய Follow-up க்கு உதவும்." },
      { role: "Clinic Coordinator ஒருவர்", note: "Referrals மற்றும் Follow-up Appointments ஐ மேலாண்மை செய்வார்." },
    ],
    faq: [
      { q: "பார்க்கப்பட எனக்கு Referral தேவையா?", a: "ஆம். இந்த சேவை Referral மூலம் இயங்குகிறது, எனவே உங்கள் மருத்துவரிடமிருந்து ஒரு Letter ஐயும் ஏற்கனவே இருக்கும் ஏதேனும் Imaging ஐயும் கொண்டு வாருங்கள்." },
      { q: "எனக்கு அறுவை சிகிச்சை தேவைப்படுமா?", a: "அவசியமில்லை. மதிப்பீடு உங்கள் Imaging ஐ மையமாகக் கொண்டுள்ளது, பல Referrals ஒரு அறுவை சிகிச்சைக்கு பதிலாக Monitoring மற்றும் Follow-up மூலம் மேலாண்மை செய்யப்படுகின்றன." },
      { q: "என் Imaging க்கு என்ன நடக்கும்?", a: "ஒரு நரம்பியல் Surgeon உங்கள் Scans ஐ நேரடியாக உங்களுடன் Review செய்வார், திட்டமிடல் ஒரு Standard செயல்முறையைவிட அந்த கண்டுபிடிப்புகளின் அடிப்படையில் இருக்கும்." },
      { q: "அறுவை சிகிச்சைக்குப் பிறகு என்ன Follow-up எதிர்பார்க்கலாம்?", a: "Review Appointments உங்கள் குணமடைதலை Track செய்து உங்களுக்கு தேவையான மேலும் சிகிச்சைக்கான திட்டத்தை உறுதிப்படுத்தும்." },
    ],
  },
  {
    title: "செரிமான அமைப்பு மற்றும் Endoscopy",
    directoryTitle: "செரிமான அமைப்பு மற்றும் Endoscopy",
    hours: "நிர்ணயிக்கப்பட்ட Lists",
    cta: "Endoscopy ஐ Book செய்யுங்கள்",
    desc: "நிர்ணயிக்கப்பட்ட Gastroscopy மற்றும் Colonoscopy Lists, தேவைப்பட்டால் அதே Sitting இலேயே Biopsy மற்றும் Polypectomy செய்யப்படும், ஒரு நிபுணர் Anaesthetist தரும் Sedation உடன், நீங்கள் செல்வதற்கு முன் அதே நாள் Reporting உடன்.",
    tags: ["Gastroscopy பரிசோதனை", "Colonoscopy பரிசோதனை", "Biopsy மற்றும் Polypectomy", "ஒரு Sedation"],
    facts: [
      { k: "மயக்க நிலை", v: "நிபுணர் Anaesthetist தருவார்" },
      { k: "அறிக்கை அளித்தல்", v: "அதே நாளில்" },
      { k: "குணமடைதல்", v: "Suite க்கு அடுத்த Bay இல்" },
      { k: "பட்டியல்கள்", v: "நிர்ணயிக்கப்பட்டவை" },
    ],
    lede: "நிர்ணயிக்கப்பட்ட Lists இல் Gastroscopy மற்றும் Colonoscopy, அதே Sitting இல் Biopsy அல்லது Polypectomy மற்றும் நீங்கள் வீடு செல்வதற்கு முன் அதே நாள் Reporting உடன்.",
    aboutHead: "Sedation உம் அதே நாள் பதில்களும் கொண்ட Endoscopy",
    body1: "Gastroscopy மற்றும் Colonoscopy நிர்ணயிக்கப்பட்ட Lists இல் செய்யப்படுகின்றன, கண்டுபிடிப்புகள் தேவைப்பட்டால் அதே Sitting இலேயே Biopsy அல்லது Polypectomy செய்யப்படும். Sedation ஒரு நிபுணர் Anaesthetist ஆல் தரப்படுகிறது, அதனால் செயல்முறை முழுவதும் Monitoring தொடர்கிறது.",
    body2: "ஒரு Recovery Bay Endoscopy Suite க்கு அடுத்ததாக அமைந்துள்ளது, Sedation குறையும் வரை உங்களை அங்கு Observe செய்வர். Reporting அதே நாளில் முடிக்கப்படுகிறது, அதனால் என்ன கண்டறியப்பட்டது, அடுத்து ஏதேனும் இருந்தால் என்ன நடக்கும் என்பதைப் பற்றி ஒரு தெளிவான பார்வையுடன் நீங்கள் செல்வீர்கள்.",
    strip: [
      { k: "மயக்க நிலை", v: "நிபுணர் மருத்துவர் வழிநடத்துவார்" },
      { k: "அறிக்கை அளித்தல்", v: "அதே நாளில்" },
      { k: "குணமடைதல்", v: "Suite க்கு அடுத்ததாக" },
      { k: "பட்டியல்கள்", v: "நிர்ணயிக்கப்பட்டவை" },
    ],
    covers: [
      "Gastroscopy பரிசோதனை",
      "Colonoscopy பரிசோதனை",
      "Biopsy எடுத்தல்",
      "Polypectomy செய்தல்",
      "Sedated செயல்முறைகள்",
    ],
    conditions: [
      "தொடர்ச்சியான அஜீரணம்",
      "விளக்கமளிக்க முடியாத எடை இழப்பு",
      "மலத்தில் இரத்தம்",
      "குடல் இயக்கத்தில் மாற்றம்",
      "சந்தேகிக்கப்படும் Ulcers",
    ],
    location: "முதல் மாடி, Endoscopy Suite",
    steps: [
      { no: "01", title: "Book செய்தல்", desc: "உங்கள் செயல்முறை Schedule செய்யப்பட்டு, தயாரிப்பு வழிமுறைகள் முன்கூட்டியே கொடுக்கப்படும்." },
      { no: "02", title: "தயார் செய்தல்", desc: "வருவதற்கு முன் உபவாசம் அல்லது குடல் தயாரிப்பு வழிமுறைகளை பின்பற்றுவீர்கள்." },
      { no: "03", title: "செயல்முறை", desc: "Gastroscopy அல்லது Colonoscopy Sedation இன் கீழ் செய்யப்படும், தேவைப்பட்டால் Biopsy அல்லது Polypectomy உடன்." },
      { no: "04", title: "குணமடைந்து Report பெறுதல்", desc: "நீங்கள் Suite க்கு அடுத்த Bay இல் குணமடைந்து, Discharge க்கு முன் அதே நாள் Reporting ஐ பெறுவீர்கள்." },
    ],
    prep: [
      "கொடுக்கப்பட்ட உபவாசம் அல்லது குடல் தயாரிப்பு வழிமுறைகளை சரியாகப் பின்பற்றுங்கள்",
      "Sedation Driving ஐ பாதிக்கும் என்பதால் உங்களை வீட்டிற்கு கொண்டு செல்ல ஒருவரை ஏற்பாடு செய்யுங்கள்",
      "உங்கள் தற்போதைய மருந்து பட்டியலைக் கொண்டு வாருங்கள்",
      "Blood Thinners ஐ நிறுத்துவது பற்றி முன்கூட்டியே கேளுங்கள்",
    ],
    team: [
      { role: "Gastroenterologist கள்", note: "தேவைப்பட்டால் Biopsy மற்றும் Polypectomy உடன் Gastroscopy மற்றும் Colonoscopy ஐ செய்வர்." },
      { role: "நிபுணர் Anaesthetist கள்", note: "ஒவ்வொரு செயல்முறையிலும் Sedation ஐ வழங்கி Monitor செய்வர்." },
      { role: "Endoscopy Nursing குழு", note: "தயாரிப்பு, செயல்முறை மற்றும் குணமடைதலுக்கு உதவும்." },
      { role: "Recovery Nurse கள்", note: "Sedation குறையும் வரை Suite க்கு அடுத்த Bay இல் நோயாளர்களை Monitor செய்வர்." },
    ],
    faq: [
      { q: "செயல்முறையின்போது நான் தூங்குவேனா?", a: "ஒரு நிபுணர் Anaesthetist உங்களுக்கு Sedation தருவார், அதனால் நீங்கள் முழுமையான General Anaesthesia க்கு பதிலாக தளர்வாகவும் Monitor செய்யப்பட்டும் இருப்பீர்கள்." },
      { q: "என் முடிவுகள் எப்போது கிடைக்கும்?", a: "Reporting அதே நாளில் முடிக்கப்படுகிறது, அதனால் என்ன கண்டறியப்பட்டது என்பதற்கான தெளிவான விளக்கத்துடன் நீங்கள் செல்வீர்கள்." },
      { q: "அதே செயல்முறையின்போது Biopsy எடுக்கலாமா?", a: "ஆம். கண்டுபிடிப்புகள் தேவைப்பட்டால் Biopsy மற்றும் Polypectomy அதே Sitting இலேயே செய்யப்படும், தனி வருகை தேவையில்லை." },
      { q: "பிறகு நான் Drive செய்யலாமா?", a: "இல்லை. Sedation மீதமுள்ள நாளுக்கு உங்கள் Reactions ஐ பாதிக்கும், எனவே உங்களை வீட்டிற்கு கொண்டு செல்ல ஒருவரை ஏற்பாடு செய்யுங்கள்." },
    ],
  },
];
