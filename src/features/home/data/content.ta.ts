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
// "St. Joseph Street" keeps the hospital's own address in English, the same
// rule `contact`'s own content.ts states (see content.ts's header note on
// `contactCta`).
//
// The register sweep (2026-09-09) deleted every hero field, section eyebrow,
// section/tile heading and CTA/link label from this file: the policy
// (`docs/superpowers/i18n-register-rule.md`) renders all of those in
// English on every page. That also emptied `servicesBento.tiles[6].heading`
// and `pharmacy.heading`, which used to import `home-care`'s and
// `pharmacy`'s own hero strings rather than typing them a second time
// (`homeCareHeroTa.strapline`, `pharmacyHeroTa.headingLead` /
// `.headingAccent`); both imports are gone from this file along with the
// fields that used them. What remains below is intro/body/stat-caption
// prose, which stays translated.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {
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
  heading: {},
  intro:
    "St. Joseph Hospital ஐ நிர்வகித்து Operate செய்வது Los Angeles இன் Kids & Teens Pediatric Medical Group ஆகும்: அமெரிக்க சிகிச்சையின் Standards, Protocols மற்றும் Clinical Discipline, நீர்கொழும்பு குடும்பங்களுக்கு ஏற்புடைய விலையில்.",
  body: "Consumables ஒருபோதும் மீண்டும் பயன்படுத்தப்படுவதில்லை. கழிவுகள் சர்வதேச Protocol இன் படி Manage செய்யப்படும். ஒவ்வொரு மேற்பரப்பும் இரு மணி நேரத்திற்கு ஒருமுறை Clean செய்யப்படும். எங்கள் House Doctors உங்களுக்கு உண்மையில் தேவையான Tests ஐ மட்டுமே Order செய்வார்கள், ஒவ்வொரு Report உம் அது உங்களை அடைவதற்கு முன் அவர்களில் இருவரால் படிக்கப்படும்.",
  stats: [
    { caption: "ஒரு நாளுக்கு மணி நேரம், ஒவ்வொரு சேவையும் திறந்திருக்கும்" },
    { caption: "Cleaning Cycle, US Specification இன் படி" },
    { caption: "உங்களுக்குத் தேவையில்லாத Tests Order செய்வது" },
  ],
};

export const servicesBento = {
  heading: {},
  tilesNote: "ஒவ்வொரு Tile உம் ஒரு சேவையைத் திறக்கும்",
  tiles: [
    {
      openNow: "இப்போது திறந்துள்ளது",
      heading: {},
      body: "Emergency சிகிச்சை, Outpatient Consultations, ஆய்வகம் மற்றும் Digital X-ray, ஆண்டின் ஒவ்வொரு நாளும் 24 மணி நேரமும் Live.",
    },
    {
      body: "Elective மற்றும் Emergency Surgery, Sterile Instrument Tracking மற்றும் நியமிக்கப்பட்ட Recovery Nurse உடன்.",
    },
    {
      body: "LKR, ஓர் இரவுக்கு. Private மற்றும் Semi Private, இரு மணி நேரத்திற்கு ஒருமுறை Sanitise செய்யப்படும், உங்கள் பெயரை அறிந்த Nursing.",
    },
    {
      body: "Verified மருந்து மட்டும். Substitutes இல்லை.",
    },
    {
      body: "ஒரு மணி நேரத்திற்குள் படிக்கப்படும், வாரமல்ல.",
    },
    {
      note: "OPD நோயாளர்களுக்கு 10% தள்ளுபடி",
    },
    {
      body: "மருத்துவர்கள், Nurses மற்றும் Lab Technicians உங்கள் வாசலுக்கு.",
    },
    {
      body: "நீர்கொழும்பு முழுவதும், எங்கள் சொந்த Counter இலிருந்து.",
    },
  ],
  footer: {},
};

export const surgical = {
  heading: {},
  body: "Elective மற்றும் Emergency Surgery, Consultant Anaesthesia, Single Use Consumables, ஒவ்வொரு Instrument Set க்கும் Sterile Tracking, மற்றும் அறுவை சிகிச்சை அரங்கிலிருந்து Discharge வரை உங்கள் Recovery க்கு நியமிக்கப்பட்ட Nurse.",
  procedures: [
    { name: "பொது அறுவை சிகிச்சை", note: "Elective மற்றும் Emergency" },
    { name: "Obstetric அறுவை சிகிச்சை அரங்கு", note: "Consultant தலைமையிலான" },
    { name: "Orthopaedic நடைமுறைகள்", note: "Day Case மற்றும் Inpatient" },
    { name: "Endoscopy பிரிவு", note: "அதே நாள் Report" },
    { name: "அறுவை சிகிச்சைக்குப் பிந்தைய பராமரிப்பு", note: "நியமிக்கப்பட்ட Recovery Nurse" },
  ],
};

export const pharmacy = {
  heading: {},
  body: "எங்கள் House Pharmacy இல் இருப்பது Verified, Authorized Stock மட்டும், உங்கள் File ஐ படிக்கக்கூடிய Pharmacists இரவின் எந்த நேரத்திலும் Dispense செய்வார்கள்.",
  stats: [
    { label: "Counter நேரங்கள்" },
    { label: "Home Delivery செல்லும் தூரம்" },
    { label: "Prescriptions File இல்" },
    { label: "OPD நோயாளர்களுக்கு Lab தள்ளுபடி" },
  ],
};

export const rooms = {
  heading: {},
  body: "அமைதியான, Private, இரு மணி நேரத்திற்கு ஒருமுறை Sanitise செய்யப்படும், உங்கள் பெயரை அறிந்த Nursing மற்றும் எப்போதும் மாடியில் இருக்கும் மருத்துவர் உடன்.",
  fromLabel: "அறைகள் தொடக்கம்",
  priceCaption: "LKR, ஓர் இரவுக்கு, Nursing பராமரிப்புடன் அனைத்தும் உட்பட",
  perks: [
    "Private மற்றும் Semi Private Options",
    "குடும்பத்திற்கு Attendant Space",
    "உணவு Dietary Orders படி தயார் செய்யப்படும்",
  ],
};

export const schoolWellness = {
  heading: {},
  body: "நீர்கொழும்பு பள்ளிகளுக்கான Pediatric தலைமையிலான திட்டம்: வருடாந்திர Screening, பார்வை மற்றும் செவிப்புலன் பரிசோதனைகள், வளர்ச்சி Tracking, தடுப்பூசி பயணங்கள் மற்றும் Teacher First Aid பயிற்சி, உங்கள் குழந்தைகளை Clinic இல் பார்க்கும் அதே மருத்துவர்களால் நடத்தப்படுகிறது.",
  rows: [
    { note: "பள்ளியிலேயே, தர வாரியாக" },
    { note: "பெற்றோருக்கு Referral அறிக்கை" },
    { note: "அரை நாள், Certified" },
  ],
  // "Kids & Teens Pediatric Protocol": this specific programme's own named
  // protocol, the same class of proper noun as "Kids & Teens Medical Group"
  // itself, which stays English throughout this feature. KEEPS_ENGLISH.
  photoCaption: "Kids & Teens Pediatric Protocol",
};

export const contactCta = {
  heading: {},
  body: "229/10 St. Joseph Street, நீர்கொழும்பு. நேரடியாக வாருங்கள், எங்களை Call செய்யுங்கள், அல்லது WhatsApp இல் Message அனுப்புங்கள்.",
};
