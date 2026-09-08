// Tamil overlay for womenChildren.ts (5 of the catalog's 36 services:
// obstetrics-maternity, gynaecology, paediatrics, fertility,
// vaccination-clinic).
//
// See womenChildren.si.ts's header for the full register rationale (reused
// here for Tamil). "Delivery" here is always the obstetric sense
// (childbirth), never the pharmacy counter's Delivery service, and "stock"
// (vaccination-clinic, cold-chain vaccine supply) is never the pharmacy
// counter's Stock either: this file translates both in full as ordinary
// clinical prose, reusing "பிரசவம்" for obstetric delivery, the site's own
// established word for the identical fact (media/facilities/
// international-care's own content.ta.ts). A THIRD sense of "delivery" also
// occurs, in the vaccination-clinic service's own "from delivery to
// administration" (body1, a team note, and a faq answer): this is neither
// childbirth nor the pharmacy counter, but the vaccine supply chain (when a
// batch of vaccines is received by the hospital), so it translates as
// ordinary logistics prose too ("வந்தடையும் நேரம்", "the time it arrives"),
// not left bare. "Record"/"records" here is
// always the clinical-documentation sense (an antenatal record book, a
// vaccination record card), which school-wellness/data/content.ta.ts already
// translates in full for the identical sense ("Vaccination record" ->
// "தடுப்பூசி பதிவு"), followed here rather than the pharmacy register.
//
// "Obstetric" (the adjective, e.g. "Obstetric Theatre") and "Theatre" stay
// English throughout, matching facilities.ta.ts's and international-care's
// own header. "Obstetrics" and "Paediatrics" (the specialty NOUN, the same
// way this feature's own emergency.ta.ts translates "obstetrics and
// paediatrics" in full) translate in full rather than staying bare like the
// adjective form; "Maternity" (an ordinary noun) translates alongside them
// to "பிரசவம்".
//
// "Neonatal" and "Antenatal" stay English throughout (established:
// facilities.ta.ts's own "Neonatal ஆதரவு", diagnostics.ta.ts's own
// "Antenatal"). "Consultant" translates to நிபுணர் மருத்துவர் as an ordinary
// noun (emergency.ta.ts's own rule), except as a nameplate title directly in
// front of a named role, which stays wholly English: `[0].team[0].role`
// ("Consultant obstetrician") is exactly that pattern, the same one
// media/data/content.ta.ts's own KEEPS_ENGLISH already keeps for
// "Consultant obstetrician and gynaecologist", "Consultant physician" and
// "Consultant paediatrician".
//
// Specific specialist-title role nouns (the person, not the field) stay
// English with a Tamil particle where the grammar wants one, matching
// diagnostics.ta.ts's own explicit rule for "Radiographer", "Sonographer"
// and "Radiologist": "Obstetrician", "Gynaecologist(s)", "Paediatrician(s)",
// "Sonographer(s)", "Coordinator", "Counsellor" and "Midwifery" all follow
// the same shape here. "Doctor"/"Physician" (the generic noun) still
// translate in full to மருத்துவர், matching emergency.ta.ts and
// diagnostics.ta.ts.
//
// "Card" (as in a vaccination/printed record card) stays English with a
// Tamil particle, matching school-wellness/data/content.ta.ts's own
// "தடுப்பூசி Card" for the identical object.
//
// Every number is unchanged from the English base.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const womenChildrenServices = [
  {


    hours: "24 மணி நேரமும் On-call",

    desc: "கர்ப்ப சிகிச்சை ஒரு நிபுணர் மருத்துவரை மையமாகக் கொண்டு அமைக்கப்பட்டுள்ளது, பிரசவம் வரையிலும் உங்களைப் பார்த்துக்கொள்வார், Scans Clinic இலேயே செய்யப்படும், பொது அறுவை சிகிச்சையிலிருந்து தனியாக வைக்கப்பட்ட Obstetric Theatre உடன். தேவைப்பட்டால் பிரசவத்தின்போதே Neonatal ஆதரவு அருகிலேயே இருக்கும், Private Rooms கிடைக்கும்.",
    tags: ["நிபுணர் மருத்துவர் வழிநடத்தும் கர்ப்ப சிகிச்சை", "Clinic இலேயே Scans", "தனியான Obstetric Theatre", "பிரசவத்தில் Neonatal ஆதரவு"],
    facts: [
      { k: "நிபுணர் மருத்துவர்", v: "உங்கள் கர்ப்ப காலம் முழுவதும் ஒருவரே" },
      { k: "பரிசோதனைகள்", v: "Clinic இலேயே செய்யப்படும்" },
      { k: "Theatre", v: "தனியான Obstetric Theatre" },
      { k: "On Call நேரம்", v: "24 மணி நேரமும்" },
    ],
    lede: "கர்ப்பம் மற்றும் பிரசவ சிகிச்சை ஒரு நிபுணர் மருத்துவர் இறுதி வரை பின்தொடர்ந்து, Scans Clinic இலேயே செய்யப்பட்டு, ஒரு தனியான Obstetric Theatre அருகிலேயே உள்ளது.",

    body1: "Antenatal சிகிச்சை மாறி மாறி வரும் குழுவால் அல்ல, உங்கள் கர்ப்பத்தை பிரசவம் வரை பின்தொடரும் ஒரு நிபுணர் மருத்துவரை மையமாகக் கொண்டு அமைக்கப்பட்டுள்ளது, அதனால் ஒவ்வொரு வருகையிலும் உங்களை பரிசோதிக்கும் நபருக்கு உங்கள் History ஏற்கனவே தெரிந்திருக்கும். வழக்கமான Scans அதே Clinic இலேயே செய்யப்படும், முடிந்தவரை Antenatal பரிசோதனைகளை ஒரு வருகைக்கு உள்ளாக்கி வைக்கிறது.",
    body2: "பிரசவம் பொது அறுவை சிகிச்சை Lists இலிருந்து தனியாக வைக்கப்பட்ட ஒரு Obstetric Theatre இல் நடைபெறும், குழந்தையின் நிலைமை தேவைப்பட்டால் பிரசவத்தின்போதே Neonatal ஆதரவும் அருகிலேயே இருக்கும். அனுமதிக்கு Private Rooms கிடைக்கும், ஆலோசனைக்கோ அல்லது பிரசவ வேதனை தொடங்கினாலோ எந்த நேரத்திலும் மகப்பேறு Desk ஐ அணுகலாம்.",
    strip: [
      { k: "நிபுணர் மருத்துவர்", v: "முழுவதும் ஒருவரே" },
      { k: "பரிசோதனைகள்", v: "Clinic இலேயே" },
      { k: "Theatre", v: "தனியான Obstetric" },
      { k: "On Call நேரம்", v: "24 மணி நேரமும்" },
    ],
    covers: [
      "Antenatal Booking மற்றும் தொடர்ச்சியான கர்ப்ப சிகிச்சை",
      "Clinic இலேயே கர்ப்ப Scanning",
      "பிரசவ வேதனை மற்றும் பிரசவம்",
      "பிரசவத்தில் Neonatal ஆதரவு",
      "Private Room அனுமதி",
    ],
    conditions: [
      "வழக்கமான கர்ப்ப சிகிச்சை",
      "அதிக ஆபத்துள்ள கர்ப்பத்திற்கான Follow-up",
      "மருத்துவமனை அனுமதி தேவைப்படும் பிரசவ வேதனை",
      "Neonatal ஆதரவு தேவைப்படும் பிரசவம்",
      "பிரசவத்திற்குப் பின் குணமடைதல்",
    ],
    location: "இரண்டாம் மாடி, மகப்பேறு பிரிவு",
    steps: [
      { desc: "உங்கள் கர்ப்பத்தை நிபுணர் மருத்துவருடன் Register செய்யுங்கள், அவர் பிரசவம் வரை உங்கள் சிகிச்சையைப் பின்தொடர்வார்." },
      { desc: "Antenatal Visits ஒவ்வொன்றிலும் Consultation உம் Clinic இலேயே Scanning உம் கர்ப்பத்தின் ஒவ்வொரு கட்டத்திலும் இணைந்திருக்கும்." },
      { desc: "பிரசவ வேதனையும் பிரசவமும் தனியான Obstetric Theatre இல் நடைபெறும், தேவைப்பட்டால் Neonatal ஆதரவும் அருகிலேயே இருக்கும்." },
      { desc: "நீங்கள் ஒரு Private Room இல் குணமடைவீர்கள், எந்த நேரத்திலும் மகப்பேறு Desk ஐ அணுகலாம்." },
    ],
    prep: [
      "ஒவ்வொரு வருகைக்கும் உங்கள் Antenatal பதிவுப் புத்தகத்தை கொண்டு வாருங்கள்",
      "உங்கள் நிர்ணயிக்கப்பட்ட தேதிக்கு முன் மருத்துவமனை பையை தயார் செய்யுங்கள்",
      "நேரம் தவறிய நேரங்களில் கேள்விகளுக்கு உங்கள் நிபுணர் மருத்துவரின் Contact விவரங்களை குறித்துக் கொள்ளுங்கள்",
      "பிரசவ வேதனை தொடங்கும்போது தேவையான Transport ஐ முன்கூட்டியே ஏற்பாடு செய்யுங்கள்",
    ],
    team: [
      { role: "Consultant obstetrician", note: "ஒவ்வொரு கர்ப்பத்தையும் Booking முதல் பிரசவம் வரை பின்தொடர்வார்." },
      { role: "Midwifery குழு", note: "Antenatal Visits, பிரசவ வேதனை மற்றும் பிரசவத்திற்குப் பின் குணமடைதலுக்கு உதவும்." },
      { role: "Neonatal ஆதரவு குழு", note: "குழந்தையின் நிலைமை தேவைப்பட்டால் பிரசவத்தில் அருகிலேயே இருக்கும்." },
      { role: "Obstetric Theatre குழு", note: "பொது அறுவை சிகிச்சை Lists இலிருந்து தனியாக வைக்கப்பட்ட Theatre ஐ பணியாளர்களுடன் நிர்வகிக்கும்." },
    ],
    faq: [
      { q: "ஒவ்வொரு வருகையிலும் நான் அதே நிபுணர் மருத்துவரையே பார்ப்பேனா?", a: "ஆம். ஒரு நிபுணர் மருத்துவர் உங்கள் கர்ப்பத்தை பிரசவம் வரை பின்தொடர்வார், அதனால் உங்களைப் பார்க்கும் நபருக்கு உங்கள் History ஏற்கனவே தெரிந்திருக்கும்." },
      { q: "Scans க்காக நான் வேறு இடத்திற்குச் செல்ல வேண்டுமா?", a: "இல்லை. வழக்கமான கர்ப்ப Scans உங்கள் Antenatal Visits போலவே அதே Clinic இலேயே செய்யப்படும்." },
      { q: "பிரசவங்களுக்கு தனியான இடம் உள்ளதா?", a: "ஆம். பிரசவங்கள் பொது அறுவை சிகிச்சை Lists இலிருந்து தனியாக வைக்கப்பட்ட ஒரு Obstetric Theatre இல் நடைபெறும்." },
      { q: "பிறக்கும்போது என் குழந்தைக்கு உதவி தேவைப்பட்டால் குழந்தை நிபுணர் குழு அருகில் இருக்குமா?", a: "குழந்தையின் நிலைமை தேவைப்படும் ஒவ்வொரு முறையும் Neonatal ஆதரவு பிரசவத்தில் அருகிலேயே இருக்கும்." },
    ],
  },
  {


    hours: "வாராந்திர Clinics",

    desc: "மாதவிடாய், கருவுறுதல் மற்றும் Menopause கவலைகளுக்கு வாராந்திர Clinics, முதல் வருகையிலேயே Ultrasound கிடைக்கும், தேவைப்பட்டால் Day-case செயல்முறைகள், கோரிக்கையின் பேரில் பெண் Staff.",
    tags: ["மாதவிடாய் ஆரோக்கியம்", "Menopause சிகிச்சை", "Clinic இலேயே Ultrasound", "Day-case செயல்முறைகள்"],
    facts: [
      { k: "நாட்கள்", v: "வாராந்திரம்" },
      { k: "முதல் வருகை", v: "Ultrasound கிடைக்கும்" },
      { k: "செயல்முறைகள்", v: "ஒரு Day Case" },
      { k: "பணியாளர்கள்", v: "கோரிக்கையின் பேரில் பெண் Staff" },
    ],
    lede: "மாதவிடாய், கருவுறுதல் மற்றும் Menopause கவலைகளுக்கு வாராந்திர Gynaecology Clinics, உங்கள் முதல் வருகையிலேயே Ultrasound கிடைக்கும்.",

    body1: "Gynaecology Clinic வாராந்திரம் நடத்தப்பட்டு மாதவிடாய் பிரச்சனைகள், கருவுறுதல் கவலைகள் மற்றும் Menopause மேலாண்மையை உள்ளடக்குகிறது. பரிசோதனைக்கு உதவும் இடத்தில், முதல் வருகையிலேயே Ultrasound கிடைக்கும், அதனால் தனி Scan Appointment க்குப் பிறகு அல்ல, அதே நாளில் கண்டுபிடிப்புகளை உங்களுடன் விவாதிக்க முடியும்.",
    body2: "செயல்முறை தேவைப்பட்டால், பெரும்பாலானவை Day Cases ஆக செய்யப்படுகின்றன, அதனால் தங்காமல் அதே நாளில் வீடு செல்லலாம். பெண் Staff ஆல் பார்க்கப்பட்டு பரிசோதிக்கப்பட விரும்பினால், Book செய்யும்போது Clinic இடம் தெரிவியுங்கள், முடிந்தவரை இது ஏற்பாடு செய்யப்படும்.",
    strip: [
      { k: "நாட்கள்", v: "வாராந்திரம்" },
      { k: "Ultrasound", v: "முதல் வருகையில்" },
      { k: "செயல்முறைகள்", v: "ஒரு Day Case" },
      { k: "பெண் Staff", v: "கோரிக்கையின் பேரில்" },
    ],
    covers: [
      "மாதவிடாய் கோளாறு மதிப்பீடு",
      "கருவுறுதல் தொடர்பான Gynaecology கவலைகள்",
      "Menopause மேலாண்மை",
      "Clinic இலேயே Ultrasound Scanning",
      "Day-case Gynaecology செயல்முறைகள்",
    ],
    conditions: [
      "அதிக அல்லது ஒழுங்கற்ற மாதவிடாய்",
      "Pelvic வலி",
      "Menopause அறிகுறிகள்",
      "சூல்பை Cysts",
      "Fibroid கட்டிகள்",
    ],
    location: "இரண்டாம் மாடி, Gynaecology Clinic",
    steps: [
      { desc: "Gynaecology ஐ Book செய்து, பெண் Staff விரும்பினால் குறிப்பிடுங்கள்." },
      { desc: "ஒரு Gynaecologist உங்கள் History ஐ எடுத்து உங்களை பரிசோதிப்பார், அதே வருகையில் Ultrasound கிடைக்கும்." },
      { desc: "கண்டுபிடிப்புகள் விவாதிக்கப்பட்டு, மேலாண்மை அல்லது செயல்முறை திட்டம் உங்களுடன் ஒப்புக்கொள்ளப்படும்." },
      { desc: "தேவைப்பட்டால், ஒரு Day-case செயல்முறை Book செய்யப்பட்டு, அதே நாளில் வீடு செல்வீர்கள்." },
    ],
    prep: [
      "வருகைக்கு முன் உங்கள் கடைசி மாதவிடாய் தேதியை குறித்துக் கொள்ளுங்கள்",
      "Book செய்யும்போது கருவுறுதல் அல்லது Menopause தொடர்பான தற்போதைய கவலைகளைச் சொல்லுங்கள்",
      "விரும்பினால் முன்கூட்டியே பெண் Staff ஐ கேளுங்கள்",
      "உங்கள் தற்போதைய மருந்துகளின் பட்டியலைக் கொண்டு வாருங்கள்",
    ],
    team: [
      { role: "Gynaecologist கள்", note: "வாராந்திர Clinic ஐ நடத்தி Day-case Gynaecology செயல்முறைகளை செய்வர்." },
      { role: "Sonographer கள்", note: "முதல் வருகையிலேயே Clinic இல் Ultrasound Scans செய்வர்." },
      { role: "பெண் Nursing Staff", note: "கோரிக்கையின் பேரில் பரிசோதனைகள் மற்றும் செயல்முறைகளுக்கு உதவுவர்." },
      { role: "Clinic Coordinator ஒருவர்", note: "Appointments ஐ Book செய்து கோரிக்கையின் பேரில் பெண் Staff ஐ ஏற்பாடு செய்வார்." },
    ],
    faq: [
      { q: "பெண் மருத்துவர் அல்லது செவிலியரை கேட்கலாமா?", a: "ஆம். Book செய்யும்போது Clinic இடம் தெரிவியுங்கள், முடிந்தவரை பெண் Staff ஏற்பாடு செய்யப்படுவார்." },
      { q: "Scan க்கு தனி வருகை தேவையா?", a: "பொதுவாக இல்லை. பரிசோதனைக்கு உதவும் இடத்தில் முதல் வருகையிலேயே Ultrasound கிடைக்கும்." },
      { q: "செயல்முறைக்கு நான் தங்க வேண்டுமா?", a: "பல Gynaecology செயல்முறைகள் Day Case ஆக இருக்கும், அதனால் அதே நாளில் வீடு செல்வீர்கள். உங்கள் நிலைமைக்கு என்ன எதிர்பார்க்க வேண்டும் என்று உங்கள் Gynaecologist உறுதிப்படுத்துவார்." },
      { q: "Clinic எத்தனை முறை நடத்தப்படும்?", a: "Gynaecology Clinic வாராந்திரம் நடத்தப்படும்; அடுத்த கிடைக்கும் Appointment க்கு Gynaecology ஐ Book செய்யுங்கள்." },
    ],
  },
  {


    hours: "24 மணி நேரமும்",

    desc: "புதிதாகப் பிறந்த குழந்தை Review, வளர்ச்சி Tracking மற்றும் முழுமையான தடுப்பூசி Schedule, Kids & Teens Medical Group Protocol ஐப் பின்பற்றி நடத்தப்படும், எந்த நேரத்திலும் கடுமையான குழந்தை நோய் பார்க்கப்படும், புதிதாகப் பிறந்த குழந்தைகளுக்கு Home Visit வழியும் உண்டு.",
    tags: ["Kids & Teens Medical Group Protocol", "புதிதாகப் பிறந்த குழந்தை Review", "வளர்ச்சி Tracking", "24 மணி நேர கடுமையான சிகிச்சை"],
    facts: [
      { k: "நேரம்", v: "24 மணி நேரமும்" },
      { k: "ஒரு Protocol", v: "Kids & Teens Medical Group" },
      { k: "புதிதாகப் பிறந்த குழந்தை சிகிச்சை", v: "Home Visit வழி" },
      { k: "தடுப்பூசி", v: "முழுமையான குழந்தை Schedule" },
    ],
    lede: "புதிதாகப் பிறந்த குழந்தை Review, வளர்ச்சி Tracking மற்றும் குழந்தை தடுப்பூசி Kids & Teens Medical Group Protocol ஐப் பின்பற்றி நடத்தப்படும், எந்த நேரத்திலும் கடுமையான சிகிச்சை கிடைக்கும்.",

    body1: "குழந்தை மருத்துவ சிகிச்சை Kids & Teens Medical Group Protocol ஐப் பின்பற்றுகிறது, பிரசவத்திற்குப் பின் புதிதாகப் பிறந்த குழந்தை Review, தொடர்ச்சியான வளர்ச்சி மற்றும் வளர்ச்சி Tracking, மற்றும் முழுமையான குழந்தை தடுப்பூசி Schedule ஐ உள்ளடக்கியது. வாழ்க்கையின் முதல் நிமிடங்களில் புதிதாகப் பிறந்த குழந்தைக்கு கூடுதல் கவனம் தேவைப்பட்டால் பிரசவத்தில் Neonatal ஆதரவு கிடைக்கும்.",
    body2: "கடுமையான குழந்தை நோய் (காய்ச்சல், மூச்சு திணறல், நீரிழப்பு மற்றும் இதுபோன்ற கவலைகள்) நிர்ணயிக்கப்பட்ட Clinic க்காக காத்திருக்காமல் எந்த நேரத்திலும் பார்க்கப்படும். புதிதாகப் பிறந்த குழந்தைகளுக்கு, மருத்துவமனைக்கு வருவது எளிதான முதல் படி இல்லை என்றால், ஒரு Home Visit வழியும் உள்ளது.",
    strip: [
      { k: "நேரம்", v: "24 மணி நேரமும்" },
      { k: "ஒரு Protocol", v: "Kids & Teens" },
      { k: "புதிதாகப் பிறந்த குழந்தை சிகிச்சை", v: "Home Visits கிடைக்கும்" },
      { k: "கடுமையான சிகிச்சை", v: "எந்த நேரத்திலும்" },
    ],
    covers: [
      "பிரசவத்திற்குப் பின் புதிதாகப் பிறந்த குழந்தை Review",
      "வளர்ச்சி மற்றும் வளர்ச்சி Tracking",
      "முழுமையான குழந்தை தடுப்பூசி Schedule",
      "எந்த நேரத்திலும் கடுமையான குழந்தை நோய் சிகிச்சை",
      "புதிதாகப் பிறந்த குழந்தைகளுக்கு Home Visits",
    ],
    conditions: [
      "பிரசவத்திற்குப் பின் புதிதாகப் பிறந்த குழந்தை பரிசோதனை",
      "குழந்தையின் காய்ச்சல்",
      "குழந்தைக்கு மூச்சு திணறல்",
      "குழந்தைக்கு நீரிழப்பு",
      "வழக்கமான தடுப்பூசி",
      "வளர்ச்சி அல்லது வளர்ச்சிக் கவலைகள்",
    ],
    location: "இரண்டாம் மாடி, குழந்தை பிரிவு",
    steps: [
      { desc: "நிர்ணயிக்கப்பட்ட Review க்கு குழந்தை நிபுணரை Book செய்யுங்கள், அல்லது கடுமையான நோய்க்கு எந்த நேரத்திலும் நேரடியாக வாருங்கள்." },
      { desc: "ஒரு குழந்தை நிபுணர் Kids & Teens Medical Group Protocol ஐப் பின்பற்றி Structured Review க்காக குழந்தையை பரிசோதிப்பார்." },
      { desc: "வளர்ச்சி, வளர்ச்சி மற்றும் தடுப்பூசி நிலை காலப்போக்கில் பதிவு செய்யப்பட்டு Track செய்யப்படும்." },
      { desc: "குழந்தையின் தேவைக்கேற்ப ஒரு Follow-up Review அல்லது Home Visit ஏற்பாடு செய்யப்படும்." },
    ],
    prep: [
      "உங்கள் குழந்தையின் உடல்நலம் மற்றும் தடுப்பூசி பதிவை கொண்டு வாருங்கள்",
      "சமீபத்திய அறிகுறிகள், உணவு மற்றும் தூக்க முறைகளை குறித்துக் கொள்ளுங்கள்",
      "இளைய குழந்தைகளுக்கு ஒரு ஆறுதல் பொருளை கொண்டு வாருங்கள்",
      "மருத்துவமனை வருகை சிரமமாக இருந்தால் புதிதாகப் பிறந்த குழந்தைகளுக்கான Home Visit வழி பற்றி கேளுங்கள்",
    ],
    team: [
      { role: "குழந்தை நிபுணர்கள்", note: "Kids & Teens Medical Group Protocol ஐப் பின்பற்றி புதிதாகப் பிறந்த குழந்தை Review, வளர்ச்சி Tracking மற்றும் கடுமையான சிகிச்சையை நடத்துவர்." },
      { role: "குழந்தை Nursing குழு", note: "தடுப்பூசி, வளர்ச்சி பரிசோதனைகள் மற்றும் எந்த நேரத்திலும் கடுமையான குழந்தை சிகிச்சைக்கு உதவும்." },
      { role: "Neonatal ஆதரவு குழு", note: "புதிதாகப் பிறந்த குழந்தைக்கு கூடுதல் கவனம் தேவைப்பட்டால் பிரசவத்தில் கலந்துகொள்ளும்." },
      { role: "Home Visit குழு", note: "ஏற்பாடு செய்யப்பட்ட புதிதாகப் பிறந்த குழந்தை Home Visits ஐ செய்யும்." },
    ],
    faq: [
      { q: "இரவிலும் குழந்தை நிபுணர் கிடைப்பாரா?", a: "ஆம். கடுமையான குழந்தை நோய் எந்த நேரத்திலும் பார்க்கப்படும், நிர்ணயிக்கப்பட்ட Clinics மட்டும் அல்ல." },
      { q: "Kids & Teens Medical Group Protocol என்றால் என்ன?", a: "இது புதிதாகப் பிறந்த குழந்தை Review, வளர்ச்சி Tracking மற்றும் தடுப்பூசிக்கு எங்கள் குழந்தை குழு பின்பற்றும் Structured Protocol." },
      { q: "இங்கு தடுப்பூசிகள் செய்யப்படுமா?", a: "ஆம். முழுமையான குழந்தை தடுப்பூசி Schedule குழந்தை மருத்துவ சிகிச்சையின் ஒரு பகுதியாக கிடைக்கும்." },
      { q: "மருத்துவமனைக்கு வருவதற்குப் பதிலாக புதிதாகப் பிறந்த குழந்தையை வீட்டிலேயே பார்க்க முடியுமா?", a: "புதிதாகப் பிறந்த குழந்தைகளுக்கு Home Visit வழி உள்ளது; Book செய்யும்போது குழந்தை குழுவிடம் கேளுங்கள்." },
    ],
  },
  {


    hours: "Appointment மூலம்",

    desc: "கருவுறுவதில் சிரமப்படும் யாருக்கும் மதிப்பீடு மற்றும் ஆலோசனை, தொடர்ச்சியான சிகிச்சையின் ஒரு பகுதியாக Cycle Monitoring மற்றும் Embryology ஆதரவுடன்.",
    tags: ["Fertility மதிப்பீடு", "Fertility ஆலோசனை", "ஒரு Cycle Monitoring", "Embryology ஆதரவு"],
    facts: [
      { k: "நேரம்", v: "Appointment மூலம்" },
      { k: "மதிப்பீடு", v: "நிபுணர் மருத்துவர் வழிநடத்துவார்" },
      { k: "ஒரு Monitoring", v: "ஒரு Cycle Monitoring" },
      { k: "ஆதரவு", v: "Embryology ஆதரவு" },
    ],
    lede: "கருவுறுவதில் சிரமப்படும் யாருக்கும் மதிப்பீடு மற்றும் ஆலோசனை, உங்கள் சிகிச்சையுடன் Cycle Monitoring மற்றும் Embryology ஆதரவு.",

    body1: "முதல் Consultation உங்கள் History மற்றும் கருவுறுதலை பாதிக்கும் Factors இன் மதிப்பீட்டை உள்ளடக்குகிறது, கண்டுபிடிப்புகளின் அர்த்தம் மற்றும் பொருத்தமான Options பற்றி பேசும் ஆலோசனையுடன். இரண்டு Partners இருந்தால், மதிப்பீடு இருவரையும் உள்ளடக்கும், அடுத்த படி ஒப்புக்கொள்ளப்படும் முன் ஒவ்வொரு திட்டமும் உங்களுடன் நேரடியாக விவாதிக்கப்படும்.",
    body2: "தொடர்ச்சியான சிகிச்சை பொருத்தமாக இருந்தால், Cycle Monitoring உங்கள் Cycle ஐ காலப்போக்கில் Track செய்யும், அந்த சிகிச்சையின் ஒரு பகுதியாக Embryology ஆதரவும் கிடைக்கும். உங்கள் நிபுணர் மருத்துவர் ஒவ்வொரு கட்டத்திலும் உங்கள் நிலைமைக்கு என்ன தேவை என்று விளக்குவார், அதனால் தொடர்வதற்கு முன் என்ன எதிர்பார்க்க வேண்டும் என்று தெரியும்.",
    strip: [
      { k: "ஒரு Booking", v: "Appointment மூலம்" },
      { k: "மதிப்பீடு", v: "நிபுணர் மருத்துவர் வழிநடத்துவார்" },
      { k: "ஒரு Monitoring", v: "Cycle-Based முறையில்" },
      { k: "ஆதரவு", v: "Embryology சேவை" },
    ],
    covers: [
      "Fertility மதிப்பீடு",
      "ஆலோசனை மற்றும் Options விவாதம்",
      "ஒரு Cycle Monitoring",
      "Embryology ஆதரவு",
    ],
    conditions: [
      "கருவுறுவதில் சிரமம்",
      "கருவுறுதலை பாதிக்கும் ஒழுங்கற்ற Cycles",
      "Fertility மதிப்பீட்டிற்கான Referral",
      "தொடர்ச்சியான Fertility சிகிச்சை ஆதரவு",
    ],
    location: "இரண்டாம் மாடி, Fertility Clinic",
    steps: [
      { desc: "ஆரம்ப Fertility மதிப்பீட்டிற்கு ஒரு Consultation ஐ Book செய்யுங்கள்." },
      { desc: "History மற்றும் மதிப்பீடு செய்யப்பட்டு, கண்டுபிடிப்புகளை விவாதிக்கும் ஆலோசனையுடன்; இரண்டு Partners இருந்தால், மதிப்பீடு இருவரையும் உள்ளடக்கும்." },
      { desc: "பொருத்தமாக இருந்தால், Cycle Monitoring தொடங்கும், அதனுடன் Embryology ஆதரவும் கிடைக்கும்." },
      { desc: "உங்கள் நிபுணர் மருத்துவர் ஒவ்வொரு கட்டத்திலும் உங்களுடன் முன்னேற்றத்தை Review செய்து அடுத்த படியை விவாதிப்பார்." },
    ],
    prep: [
      "Partner இருந்தால், முதல் Consultation க்கு இருவரும் வருவது முழுமையான பார்வையை உருவாக்க உதவும்",
      "உங்கள் மாதவிடாய் Cycle History இன் பதிவை கொண்டு வாருங்கள்",
      "முந்தைய Fertility Test முடிவுகளை கொண்டு வாருங்கள்",
      "மதிப்பீட்டின் ஒவ்வொரு கட்டத்திலும் என்ன உள்ளடங்கும் என்ற கேள்விகளை தயார் செய்யுங்கள்",
    ],
    team: [
      { role: "Fertility நிபுணர் மருத்துவர்கள்", note: "மதிப்பீடு, ஆலோசனை மற்றும் தொடர்ச்சியான சிகிச்சை திட்டமிடலை வழிநடத்துவர்." },
      { role: "Embryology ஆதரவு குழு", note: "Fertility நிபுணர் மருத்துவருடன் இணைந்து சிகிச்சை Cycles க்கு ஆதரவளிக்கும்." },
      { role: "Counsellor ஒருவர்", note: "முடிவு எடுக்கப்படும் முன் கண்டுபிடிப்புகள் மற்றும் Options பற்றி பேசுவார்." },
      { role: "Clinic Coordinator ஒருவர்", note: "Appointments மற்றும் Cycle Monitoring Visits ஐ Book செய்வார்." },
    ],
    faq: [
      { q: "என் Partner வர வேண்டுமா?", a: "அவசியமில்லை. Partner இருந்தால், இருவரும் வருவது முழுமையான பார்வையை உருவாக்க உதவும், ஆனால் ஆரம்ப மதிப்பீடு உங்களுடன் மட்டும் தொடரலாம்." },
      { q: "Cycle Monitoring இல் என்ன நடக்கும்?", a: "இது உங்கள் Cycle ஐ காலப்போக்கில் Track செய்யும், அதனால் உங்கள் நிபுணர் மருத்துவர் என்ன நடக்கிறது என்று பார்வையை உருவாக்கி உங்களுடன் Options பற்றி பேசலாம்." },
      { q: "ஆலோசனை என் சிகிச்சையின் பகுதியாக இருக்குமா?", a: "ஆம். கண்டுபிடிப்புகளை புரிந்துகொண்டு முடிவெடுக்கும் முன் Options பற்றி பேச முடியும் வகையில், ஆலோசனை மதிப்பீட்டுடன் வழங்கப்படும்." },
      { q: "Appointment ஐ எப்படி Book செய்வது?", a: "ஒரு Consultation ஐ Book செய்யுங்கள், Clinic Coordinator உங்கள் முதல் வருகையை ஏற்பாடு செய்வார்." },
    ],
  },
  {


    hours: "தினமும்",

    desc: "முழுமையான குழந்தை Schedule உடன் வயது வந்தோர் மற்றும் Travel தடுப்பூசி, Cold Chain Monitoring உடன் தினமும் நடத்தப்படும், ஒவ்வொரு வருகையிலும் ஒரு அச்சிடப்பட்ட பதிவு Card, உங்கள் அடுத்த Dose க்கு SMS நினைவூட்டல்.",
    tags: ["குழந்தை Schedule", "வயது வந்தோர் மற்றும் Travel தடுப்பூசி", "ஒரு Cold Chain Monitoring", "SMS நினைவூட்டல்கள்"],
    facts: [
      { k: "நேரம்", v: "தினமும்" },
      { k: "உள்ளடக்கம்", v: "குழந்தை, வயது வந்தோர் & Travel" },
      { k: "சேமிப்பு", v: "Cold Chain Monitor செய்யப்படும்" },
      { k: "நினைவூட்டல்கள்", v: "SMS மூலம்" },
    ],
    lede: "குழந்தை, வயது வந்தோர் மற்றும் Travel தடுப்பூசி தினமும் நடத்தப்படும், ஒவ்வொரு வருகையிலும் ஒரு அச்சிடப்பட்ட பதிவு Card, உங்கள் அடுத்த Dose க்கு முன் ஒரு SMS நினைவூட்டல்.",

    body1: "Clinic முழுமையான குழந்தை Immunisation Schedule உடன் வயது வந்தோர் மற்றும் Travel தடுப்பூசியையும் நடத்துகிறது, அதனால் குடும்பங்கள் ஒவ்வொரு Dose ஐயும் ஒரே இடத்தில் வைத்திருக்க முடியும், வேறு Providers க்கு மாறாமல். தடுப்பூசிகள் வந்தடையும் நேரம் முதல் நிர்வகிக்கும் வரை Monitor செய்யப்படும் Cold Chain நிலைமைகளின் கீழ் வைக்கப்படுகின்றன, அதனால் ஒவ்வொரு Dose ஐயும் எவ்வளவு நன்றாக செயல்படுகிறது என்பது பாதுகாக்கப்படும்.",
    body2: "ஒவ்வொரு வருகையும் எது கொடுக்கப்பட்டது, எப்போது கொடுக்கப்பட்டது என்பதைக் காட்டும் அச்சிடப்பட்ட பதிவு Card உடன் முடிவடையும், உங்கள் அடுத்த நிர்ணயிக்கப்பட்ட Dose க்கு முன் ஒரு SMS நினைவூட்டல் அனுப்பப்படும், அதனால் Appointments ஐ, குறிப்பாக முழுமையான குழந்தை Schedule முழுவதும், கண்காணிப்பது எளிதாகிறது.",
    strip: [
      { k: "நேரம்", v: "தினமும்" },
      { k: "ஒரு Schedule", v: "குழந்தை, வயது வந்தோர் & Travel" },
      { k: "சேமிப்பு", v: "Cold Chain Monitor செய்யப்படும்" },
      { k: "நினைவூட்டல்கள்", v: "SMS" },
    ],
    covers: [
      "முழுமையான குழந்தை Immunisation Schedule",
      "வயது வந்தோர் தடுப்பூசி",
      "Travel தடுப்பூசி",
      "அச்சிடப்பட்ட தடுப்பூசி பதிவு Cards",
      "SMS Dose நினைவூட்டல்கள்",
    ],
    conditions: [
      "குழந்தை மற்றும் சிறு குழந்தை தடுப்பூசி",
      "Catch-up தடுப்பூசி",
      "Travel தடுப்பூசி தேவைகள்",
      "வயது வந்தோர் Booster தடுப்பூசி",
    ],
    location: "தரைத் தளம், தடுப்பூசி Clinic",
    steps: [
      { desc: "குழந்தை, வயது வந்தவர் அல்லது வரவிருக்கும் Travel தேவைக்கு ஒரு தடுப்பூசியை Book செய்யுங்கள்." },
      { desc: "பணியாளர்கள் நிர்ணயிக்கப்பட்ட Schedule ஐ சரிபார்த்து வருகைக்கு பொருத்தமான தடுப்பூசிகளை உறுதிப்படுத்துவர்." },
      { desc: "Doses Cold-chain-Monitor செய்யப்பட்ட இருப்பிலிருந்து கொடுக்கப்பட்டு அப்போதே பதிவு செய்யப்படும்." },
      { desc: "நீங்கள் ஒரு அச்சிடப்பட்ட பதிவு Card உடன் செல்வீர்கள், அடுத்த நிர்ணயிக்கப்பட்ட Dose க்கு ஒரு SMS நினைவூட்டல் அமைக்கப்படும்." },
    ],
    prep: [
      "தற்போதுள்ள தடுப்பூசி பதிவு Card இருந்தால் கொண்டு வாருங்கள்",
      "முந்தைய தடுப்பூசிகளுக்கு ஏற்பட்ட எந்த Reaction பற்றியும் பணியாளரிடம் சொல்லுங்கள்",
      "Travel தடுப்பூசிக்கு, உங்கள் Travel தேதிகள் மற்றும் இடத்தை கொண்டு வாருங்கள்",
      "SMS நினைவூட்டல்களுக்கு உங்கள் Phone Number ஐ புதுப்பித்து வையுங்கள்",
    ],
    team: [
      { role: "தடுப்பூசி Clinic Nurses", note: "குழந்தை, வயது வந்தோர் மற்றும் Travel தடுப்பூசிகளை தினமும் வழங்குவர்." },
      { role: "Cold Chain Coordinator ஒருவர்", note: "வந்தடையும் நேரம் முதல் நிர்வகிக்கும் வரை தடுப்பூசி சேமிப்பு நிலைமைகளை Monitor செய்வார்." },
      { role: "எங்கள் Clinic Reception", note: "Bookings, பதிவு Cards வழங்குதல் மற்றும் SMS நினைவூட்டல்களை கையாளும்." },
    ],
    faq: [
      { q: "வயது வந்தோரும் இங்கு Travel தடுப்பூசி பெறலாமா?", a: "ஆம். Clinic குழந்தை Schedule உடன் வயது வந்தோர் மற்றும் Travel தடுப்பூசியையும் நடத்துகிறது." },
      { q: "என் குழந்தை பெற்றதன் பதிவு கிடைக்குமா?", a: "ஆம். ஒவ்வொரு வருகையிலும், எது கொடுக்கப்பட்டது, எப்போது கொடுக்கப்பட்டது என்பதைக் காட்டும் அச்சிடப்பட்ட பதிவு Card ஒன்று கொடுக்கப்படும்." },
      { q: "அடுத்த Dose எப்போது என்று எப்படி தெரிந்துகொள்வேன்?", a: "உங்கள் அடுத்த நிர்ணயிக்கப்பட்ட Dose க்கு முன் ஒரு SMS நினைவூட்டல் அனுப்பப்படும்." },
      { q: "சேமிப்பில் தடுப்பூசிகள் எப்படி Effective ஆக வைக்கப்படுகின்றன?", a: "ஒவ்வொரு தடுப்பூசியும் கொடுக்கப்படும் நிமிடம் வரை வந்தடையும் நேரம் முதல் Monitor செய்யப்படும் Cold Chain நிலைமைகளின் கீழ் வைக்கப்படுகின்றன." },
    ],
  },
];
