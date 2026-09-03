// Tamil for the home page bands that have no dedicated data file: hero,
// "who we are", the services bento, surgical, pharmacy, rooms, school
// wellness, the stat ticker and the closing "come see us" band.
//
// Same code-mixed register as the rest of this feature: the sentence is
// Tamil, everyday English nouns and this site's own register words
// ("Emergency", "OPD", "Digital X-ray", "Pharmacy", "Los Angeles", "Nurse")
// stay in English, the same precedent `career`'s, `facilities`'s, `network`'s
// and `pharmacy`'s own content.ta.ts already establish. Sentence forms use
// the polite plural ("செய்யுங்கள்"), never the familiar imperative.
//
// `hero.headingLine1` / `.headingOutline` / `.headingAccent` are three
// independent segments of one visual three-part heading, not a literal
// translation of "To live is a privilege" split around the letter "a" (see
// the header comment in content.ts). This composes its own coherent Tamil
// sentence across the three segments: "வாழ்வது ஒரு பாக்கியம்." ("Living is a
// fortune"), putting the outlined-glyph treatment on "ஒரு" ("a"/"one"), which
// happens to be the exact Tamil word for the English article it replaces.
//
// "Who we are", "Careers", "Surgical care", "Pharmacy", "Medicine to your
// door", "School wellness" and "Book a room" already have a site-wide
// translation in navigationLabels.ta.ts, so `whoWeAre.eyebrow`,
// `surgical.eyebrow`, `servicesBento.tiles[1].badge`, `pharmacy.eyebrow`,
// `servicesBento.tiles[7].heading`, `schoolWellness.eyebrow` and
// `rooms.cta` / `contactCta.ctaRooms` reuse those exact strings rather than
// inventing second translations.
//
// "St. Joseph Street" keeps the hospital's own address in English, the same
// rule `contact`'s own content.ts states (see content.ts's header note on
// `contactCta`).

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {
  locationLabel: "நீர்கொழும்பு, இலங்கை",
  managedBy: "Los Angeles, USA இலிருந்து இயக்கப்படுகிறது",
  headingLine1: "வாழ்வது",
  headingOutline: "ஒரு",
  headingAccent: "பாக்கியம்.",
  body: "நீர்கொழும்பில் அமெரிக்க சுகாதார Standards: 24 மணி நேர Emergency சிகிச்சை, Surgical அறுவை சிகிச்சை அரங்குகள், House Doctors, நவீன ஆய்வகம், Digital X-ray மற்றும் ஒருபோதும் மூடாத Pharmacy.",
  photoAlt: "St. Joseph Hospital கட்டிடம் அந்தி நேரத்தில்",
};

export const statTickerItems = [
  "Emergency 24/7 திறந்திருக்கும்",
  "US Protocol க்கு அறுவை சிகிச்சை அரங்குகள்",
  "இரு மணி நேரத்திற்கு ஒருமுறை சுத்தம்",
  "Reports அதே நாள், இரு முறை Check செய்யப்படும்",
  "அறைகள் 10,000 LKR முதல்",
];

export const whoWeAre = {
  // Reused verbatim from navigationLabels.ta.ts's "Who we are" -> "நாங்கள் யார்".
  eyebrow: "01 / நாங்கள் யார்",
  heading: { line1: "US மருத்துவமனை", line2: "இலங்கை", line3: "சுற்றுப்புறத்தில்" },
  intro:
    "St. Joseph Hospital ஐ நிர்வகித்து Operate செய்வது Los Angeles இன் Kids & Teens Pediatric Medical Group ஆகும்: அமெரிக்க சிகிச்சையின் Standards, Protocols மற்றும் Clinical Discipline, நீர்கொழும்பு குடும்பங்களுக்கு ஏற்புடைய விலையில்.",
  body: "Consumables ஒருபோதும் மீண்டும் பயன்படுத்தப்படுவதில்லை. கழிவுகள் சர்வதேச Protocol இன் படி Manage செய்யப்படும். ஒவ்வொரு மேற்பரப்பும் இரு மணி நேரத்திற்கு ஒருமுறை Clean செய்யப்படும். எங்கள் House Doctors உங்களுக்கு உண்மையில் தேவையான Tests ஐ மட்டுமே Order செய்வார்கள், ஒவ்வொரு Report உம் அது உங்களை அடைவதற்கு முன் அவர்களில் இருவரால் படிக்கப்படும்.",
  cta: "எங்களைப் பற்றி மேலும்",
  stats: [
    { caption: "ஒரு நாளுக்கு மணி நேரம், ஒவ்வொரு சேவையும் திறந்திருக்கும்" },
    { caption: "Cleaning Cycle, US Specification இன் படி" },
    { caption: "உங்களுக்குத் தேவையில்லாத Tests Order செய்வது" },
  ],
};

export const servicesBento = {
  eyebrow: "02 / நாங்கள் செய்வது",
  heading: { line1: "நாங்கள் உங்களை", line2: "கவனிக்கும் எட்டு வழிகள்" },
  tilesNote: "ஒவ்வொரு Tile உம் ஒரு சேவையைத் திறக்கும்",
  tiles: [
    {
      badge: "/01 Emergency மற்றும் OPD",
      openNow: "இப்போது திறந்துள்ளது",
      heading: { line1: "எந்த நேரமும்", line2: "நேரடியாக வாருங்கள்" },
      body: "Emergency சிகிச்சை, Outpatient Consultations, ஆய்வகம் மற்றும் Digital X-ray, ஆண்டின் ஒவ்வொரு நாளும் 24 மணி நேரமும் Live.",
    },
    {
      // Reused verbatim from navigationLabels.ta.ts's "Surgical care".
      badge: "/02 அறுவை சிகிச்சை பராமரிப்பு",
      heading: "அறுவை சிகிச்சை அரங்குகள், Consultant தலைமையிலான",
      body: "Elective மற்றும் Emergency Surgery, Sterile Instrument Tracking மற்றும் நியமிக்கப்பட்ட Recovery Nurse உடன்.",
      linkLabel: "அறுவை சிகிச்சை சேவைகள்",
    },
    {
      badge: "/03 அறைகள்",
      body: "LKR, ஓர் இரவுக்கு. Private மற்றும் Semi Private, இரு மணி நேரத்திற்கு ஒருமுறை Sanitise செய்யப்படும், உங்கள் பெயரை அறிந்த Nursing.",
    },
    {
      // "Pharmacy": KEEPS_ENGLISH, same as navigationLabels.ta.ts's own entry.
      badge: "/04 Pharmacy",
      heading: "Authorized Stock, 24/7 மட்டும்",
      body: "Verified மருந்து மட்டும். Substitutes இல்லை.",
    },
    {
      // "Digital X-ray": KEEPS_ENGLISH, this site's own register word.
      badge: "/05 Digital X-ray",
      heading: "குறைந்த Dose, கூர்மையான Plates",
      body: "ஒரு மணி நேரத்திற்குள் படிக்கப்படும், வாரமல்ல.",
    },
    {
      badge: "/06 ஆய்வகம்",
      heading: "ஒவ்வொரு Report ஐயும் இரு மருத்துவர்கள் படிப்பார்கள்",
      note: "OPD நோயாளர்களுக்கு 10% தள்ளுபடி",
    },
    {
      badge: "/07 வீட்டு வருகை சேவைகள்",
      heading: "நாங்கள் உங்களிடம் வருகிறோம்",
      body: "மருத்துவர்கள், Nurses மற்றும் Lab Technicians உங்கள் வாசலுக்கு.",
    },
    {
      // Reused verbatim from navigationLabels.ta.ts's "Delivery".
      badge: "/08 விநியோகம்",
      // Reused verbatim from navigationLabels.ta.ts's "Medicine to your door".
      heading: "உங்கள் வீட்டு வாசலுக்கு மருந்து",
      body: "நீர்கொழும்பு முழுவதும், எங்கள் சொந்த Counter இலிருந்து.",
    },
  ],
  footer: {
    label: "முழு சேவை அடைவு",
    heading: "ஒவ்வொரு சேவையும், ஒரே இடத்தில்",
    viewAllTemplate: "அனைத்து {count} சேவைகளையும் பார்க்கவும்",
  },
};

export const surgical = {
  // Reused verbatim from navigationLabels.ta.ts's "Surgical care".
  eyebrow: "03 / அறுவை சிகிச்சை பராமரிப்பு",
  heading: { line1: "அறுவை சிகிச்சை அரங்குகள்", line2: "Protocol படி இயங்குகின்றன,", line3: "பழக்கப்படி அல்ல" },
  body: "Elective மற்றும் Emergency Surgery, Consultant Anaesthesia, Single Use Consumables, ஒவ்வொரு Instrument Set க்கும் Sterile Tracking, மற்றும் அறுவை சிகிச்சை அரங்கிலிருந்து Discharge வரை உங்கள் Recovery க்கு நியமிக்கப்பட்ட Nurse.",
  ctaPrimary: "அறுவை சிகிச்சை Consult ஒன்றைக் கோருங்கள்",
  ctaSecondary: "அறுவை சிகிச்சை அரங்கு Desk உடன் பேசுங்கள்",
  procedures: [
    { name: "பொது அறுவை சிகிச்சை", note: "Elective மற்றும் Emergency" },
    { name: "Obstetric அறுவை சிகிச்சை அரங்கு", note: "Consultant தலைமையிலான" },
    { name: "Orthopaedic நடைமுறைகள்", note: "Day Case மற்றும் Inpatient" },
    { name: "Endoscopy பிரிவு", note: "அதே நாள் Report" },
    { name: "அறுவை சிகிச்சைக்குப் பிந்தைய பராமரிப்பு", note: "நியமிக்கப்பட்ட Recovery Nurse" },
  ],
};

export const pharmacy = {
  // "Pharmacy": KEEPS_ENGLISH, same as navigationLabels.ta.ts's own entry.
  eyebrow: "05 / Pharmacy",
  heading: { line1: "Authorized", line2: "மருந்து மட்டும்.", line3: "வேறு எதுவும் இல்லை." },
  body: "எங்கள் House Pharmacy இல் இருப்பது Verified, Authorized Stock மட்டும், உங்கள் File ஐ படிக்கக்கூடிய Pharmacists இரவின் எந்த நேரத்திலும் Dispense செய்வார்கள்.",
  ctaPrimary: "ஒரு Delivery ஐ Order செய்யுங்கள்",
  ctaSecondary: "ஒரு Pharmacist இடம் கேளுங்கள்",
  stats: [
    { label: "Counter நேரங்கள்" },
    { label: "Home Delivery செல்லும் தூரம்" },
    { label: "Prescriptions File இல்" },
    { label: "OPD நோயாளர்களுக்கு Lab தள்ளுபடி" },
  ],
};

export const rooms = {
  eyebrow: "07 / எங்களுடன் தங்குங்கள்",
  heading: { line1: "குணமடைவது", line2: "போல் உணரும்", line3: "ஓர் அறை" },
  body: "அமைதியான, Private, இரு மணி நேரத்திற்கு ஒருமுறை Sanitise செய்யப்படும், உங்கள் பெயரை அறிந்த Nursing மற்றும் எப்போதும் மாடியில் இருக்கும் மருத்துவர் உடன்.",
  // Reused verbatim from navigationLabels.ta.ts's "Book a room": same fact
  // (reserving a room).
  cta: "Room ஐ Book செய்யுங்கள்",
  fromLabel: "அறைகள் தொடக்கம்",
  priceCaption: "LKR, ஓர் இரவுக்கு, Nursing பராமரிப்புடன் அனைத்தும் உட்பட",
  perks: [
    "Private மற்றும் Semi Private Options",
    "குடும்பத்திற்கு Attendant Space",
    "உணவு Dietary Orders படி தயார் செய்யப்படும்",
  ],
};

export const schoolWellness = {
  // Reused verbatim from navigationLabels.ta.ts's "School Wellness".
  eyebrow: "10 / பள்ளி நல்வாழ்வு",
  heading: { line1: "நாங்கள் வருவது", line2: "Classroom க்குத்தான்" },
  body: "நீர்கொழும்பு பள்ளிகளுக்கான Pediatric தலைமையிலான திட்டம்: வருடாந்திர Screening, பார்வை மற்றும் செவிப்புலன் பரிசோதனைகள், வளர்ச்சி Tracking, தடுப்பூசி பயணங்கள் மற்றும் Teacher First Aid பயிற்சி, உங்கள் குழந்தைகளை Clinic இல் பார்க்கும் அதே மருத்துவர்களால் நடத்தப்படுகிறது.",
  rows: [
    { title: "வருடாந்திர சுகாதார Screening", note: "பள்ளியிலேயே, தர வாரியாக" },
    { title: "பார்வை, செவிப்புலன் மற்றும் பல் பரிசோதனை", note: "பெற்றோருக்கு Referral அறிக்கை" },
    { title: "Teacher First Aid பயிற்சி", note: "அரை நாள், Certified" },
  ],
  cta: "எங்கள் பள்ளிக்கு கொண்டு வாருங்கள்",
  // "Kids & Teens Pediatric Protocol": this specific programme's own named
  // protocol, the same class of proper noun as "Kids & Teens Medical Group"
  // itself, which stays English throughout this feature. KEEPS_ENGLISH.
  photoCaption: "Kids & Teens Pediatric Protocol",
};

export const contactCta = {
  eyebrow: "15 / எங்களைப் பார்க்க வாருங்கள்",
  heading: { line1: "இப்போதே", line2: "திறந்துள்ளது. ஆம்,", line3: "இப்போதே." },
  body: "229/10 St. Joseph Street, நீர்கொழும்பு. நேரடியாக வாருங்கள், எங்களை Call செய்யுங்கள், அல்லது WhatsApp இல் Message அனுப்புங்கள்.",
  // Reused verbatim from navigationLabels.ta.ts's "Surgical care".
  ctaSurgical: "அறுவை சிகிச்சை பராமரிப்பு",
  // Reused verbatim from navigationLabels.ta.ts's "Book a room".
  ctaRooms: "Room ஐ Book செய்யுங்கள்",
};
