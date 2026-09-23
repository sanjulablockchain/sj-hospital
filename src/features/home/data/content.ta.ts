// Tamil for the home page bands that have no dedicated data file; see
// content.si.ts for what is and is not here. Same code-mixed register as the
// rest of this feature: everyday English nouns and this site's own register
// words stay in English inside a Tamil sentence, Western numerals throughout.

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

export const quickAccess = {
  channel: {
    body: "ஒரு Consultant ஐயும் நேரத்தையும் Online இல் தேர்ந்தெடுங்கள், அல்லது எங்கள் இலவச OPD க்கு நேரடியாக வாருங்கள்.",
  },
  emergency: {
    body: "எந்த நேரத்திலும் நேரடியாக வாருங்கள். Ambulance Bay மற்றும் Critical Care 24 மணி நேரமும் திறந்திருக்கும்.",
  },
  facilities: {
    bodyTemplate: "{count} சேவைகள் ஒரே கூரையின் கீழ், US Protocol இன் படி.",
  },
  location: {
    body: "229/10 St. Joseph Street, நீர்கொழும்பு. Airport இலிருந்து பத்து நிமிடங்கள்.",
  },
};

export const whoWeAre = {
  intro:
    "Los Angeles இன் Kids & Teens Pediatric Medical Group ஆல் நிர்வகிக்கப்பட்டு Operate செய்யப்படுகிறது: அமெரிக்க சிகிச்சையின் Standards, Protocols மற்றும் Clinical Discipline, நீர்கொழும்பு குடும்பங்களுக்கு ஏற்புடைய விலையில்.",
  body: "Consumables ஒருபோதும் மீண்டும் பயன்படுத்தப்படுவதில்லை. ஒவ்வொரு மேற்பரப்பும் இரு மணி நேரத்திற்கு ஒருமுறை Clean செய்யப்படும். ஒவ்வொரு Report உம் உங்களை அடைவதற்கு முன் இரு மருத்துவர்களால் படிக்கப்படும்.",
  stats: [
    { label: "Emergency மற்றும் OPD", desc: "ஒவ்வொரு சேவையும், ஒவ்வொரு மணி நேரமும், ஆண்டின் ஒவ்வொரு நாளும் திறந்திருக்கும்." },
    { label: "சேவைகள்", desc: "Emergency சிகிச்சையிலிருந்து Fertility வரை, ஒரே கூரையின் கீழ்." },
    { label: "மாடி மருத்துவமனை", desc: "நீர்கொழும்பில் இதற்காகவே கட்டப்பட்டது, Ambulance Bay மற்றும் மூடிய வருகைப் பகுதியுடன்." },
    { label: "Cleaning சுழற்சி", desc: "ஒவ்வொரு மேற்பரப்பும், US Specification இன் படி Clean செய்யப்படும்." },
    { label: "Home Visit வாகனங்கள்", desc: "மருத்துவர்கள், Nurses மற்றும் Lab Technicians உங்கள் வாசலுக்கு." },
    { label: "Airport இலிருந்து நிமிடங்கள்", desc: "Bandaranaike International இலிருந்து எங்கள் வாசல் வரை." },
  ],
};

export const freeOpd = {
  body: "எங்கள் வெளிநோயாளர் பிரிவில் Consultations இலவசம், அதனால் ஒரு காய்ச்சலுக்கோ, கட்டிக்கோ, ஒரு வார வலிக்கோ பணம் செலவழிப்பது தகுமா என்று யாரும் யோசிக்க வேண்டியதில்லை. நேரடியாக வந்து ஒரு மருத்துவரைப் பாருங்கள்.",
  points: [
    "நாங்கள் திறந்திருக்கும் ஒவ்வொரு மணி நேரமும் இலவச Consultation",
    "பொதுவான பிரச்சினைகளுக்கும் நிபுணர் Referral க்கும் ஒரேபோல",
    "நீங்கள் புறப்படுவதற்கு முன் உங்கள் நோய் கண்டறிதல் விளக்கப்படும்",
  ],
};

export const specialties = {
  body: "நேரடியாக வரும் Consultation இலிருந்து Surgery, Diagnostics மற்றும் வீட்டில் பராமரிப்பு வரை, ஒவ்வொரு சேவையும் ஒரே அமெரிக்க Protocol இன் படி நடக்கிறது.",
  countTemplate: "{total} இல் {n}",
  ariaPrev: "முந்தைய சிறப்புப் பிரிவு",
  ariaNext: "அடுத்த சிறப்புப் பிரிவு",
  // Each tab's `links` are service titles and routes, all English or facts, so
  // the entries are empty placeholders: the parity test still checks the
  // array lengths match the English (the same shape media.ta.ts uses).
  tabs: [
    {
      desc: "24 மணி நேரமும் Accident மற்றும் Emergency சிகிச்சை, Intensive மற்றும் Critical Care அங்கேயே. ஆண்டின் ஒவ்வொரு நாளும் எந்த நேரத்திலும் நேரடியாக வாருங்கள், அல்லது Call செய்யுங்கள், நாங்கள் உங்களிடம் வருகிறோம்.",
      links: [{}, {}, {}],
    },
    {
      desc: "Consultant Anaesthesia, Single Use Consumables, ஒவ்வொரு Instrument Set க்கும் Sterile Tracking மற்றும் உங்கள் Recovery க்கு நியமிக்கப்பட்ட Nurse உடன், Consultant தலைமையிலான அறுவை சிகிச்சை அரங்குகள்.",
      links: [{}, {}, {}, {}, {}, {}, {}],
    },
    {
      desc: "24 மணி நேர ஆய்வகம் மற்றும் Digital X-ray, ஒவ்வொரு Report உம் இரு மருத்துவர்களால் படிக்கப்பட்டு அதே நாளில் திருப்பித் தரப்படும். OPD நோயாளர்கள் Laboratory Tests இல் 10% சேமிக்கிறார்கள்.",
      links: [{}, {}, {}, {}],
    },
    {
      desc: "இலவச வெளிநோயாளர் பிரிவுக்கு அருகிலேயே நிபுணர் Clinics, அதனால் ஒரு Referral என்பது ஊர் முழுவதும் பயணம் அல்ல, Corridor இல் சில அடிகள் மட்டுமே.",
      links: [{}, {}, {}, {}, {}, {}, {}, {}],
    },
    {
      desc: "Maternity, Gynaecology மற்றும் Paediatric சிகிச்சை, எங்கள் Los Angeles குழு தன் சொந்த நோயாளர்களுக்குப் பயன்படுத்தும் அதே Kids and Teens Protocol இன் தலைமையில்.",
      links: [{}, {}, {}, {}, {}],
    },
    {
      desc: "ஒருபோதும் மூடாத Pharmacy, நீர்கொழும்பு முழுவதும் மருந்து விநியோகம், ஆறு வாகனங்களில் Home Visits மற்றும் தீவின் எந்த இடத்திலிருந்தும் Telemedicine.",
      links: [{}, {}, {}, {}],
    },
  ],
};

export const patientCare = {
  body1:
    "St. Joseph Hospital நீர்கொழும்பில் இதற்காகவே கட்டப்பட்ட ஆறு மாடி மருத்துவமனை, ஒரு அமெரிக்க Pediatric குழுவின் Protocols இன் படி இயங்குகிறது.",
  body2:
    "பராமரிப்பு வார்டில் நின்றுவிடுவதில்லை. எங்கள் Pharmacy ஒருபோதும் மூடாது, எங்கள் மருத்துவர்கள் வீடுகளுக்கும் பள்ளிகளுக்கும் செல்கிறார்கள், பயணம் செய்யும் நோயாளர்கள் Airport இலிருந்தே கவனிக்கப்படுகிறார்கள்.",
};

export const pharmacy = {
  body: "எங்கள் House Pharmacy இல் இருப்பது Verified, Authorized Stock மட்டும், உங்கள் File ஐ படிக்கக்கூடிய Pharmacists இரவின் எந்த நேரத்திலும் Dispense செய்வார்கள்.",
  stats: [
    { label: "Counter நேரங்கள்" },
    { label: "Home Delivery செல்லும் தூரம்" },
    { label: "Prescriptions File இல்" },
    { label: "OPD நோயாளர்களுக்கு Lab தள்ளுபடி" },
  ],
};

export const standards = {
  sub: "Medical Quality சிகிச்சை, அமெரிக்க Protocol இன் படி",
  items: [
    { desc: "Consumables ஒருபோதும் மீண்டும் பயன்படுத்தப்படுவதில்லை, கழிவுகள் சர்வதேச Protocol இன் படி Manage செய்யப்படும்." },
    { desc: "ஒவ்வொரு மேற்பரப்பும் இரு மணி நேரத்திற்கு ஒருமுறை, US Specification இன் படி Clean செய்யப்படும்." },
    { desc: "ஒவ்வொரு முடிவும் உங்களை அடைவதற்கு முன் இரு மருத்துவர்களால் படிக்கப்படும், அதே நாளில்." },
  ],
};

export const contactCta = {
  body: "229/10 St. Joseph Street, நீர்கொழும்பு. நேரடியாக வாருங்கள், எங்களை Call செய்யுங்கள், அல்லது WhatsApp இல் Message அனுப்புங்கள்.",
  // Link labels, routes and icon keys: English or facts, placeholders only.
  contactRows: [{}, {}, {}, {}],
};
