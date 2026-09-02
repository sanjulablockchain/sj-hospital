// Tamil for the care at home page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns and
// product-adjacent terms stay in English rather than being replaced by
// literary coinages nobody says out loud. So "Visit", "Sample",
// "Appointment", "Laboratory technician", "Pharmacy", "Counter",
// "Prescription", "Delivery", "Telemedicine", "Consultation", "Vehicle",
// "Emergency" and "Record" stay in English throughout, and "Book", "Call" and
// "Check" stay verbs exactly like they are in contact's and accommodation's
// own content.ta.ts. "WhatsApp" and "Email" are the product names, kept the
// same way contact and accommodation already keep them.
//
// `contactRows[0].value` is the one field this file never carries: the
// hospital's own phone number has nothing to translate, so it is excluded in
// `isUntranslatable` in content.i18n.test.ts rather than repeated here as a
// second copy of the same digits.
//
// Sentence forms use the polite plural ("செய்யுங்கள்"), which is how a
// hospital addresses a patient it has not met.
//
// `hero.visitsCta` sits inside a `whitespace-nowrap` pill at 360px (see
// HomeCareHero.tsx): keep any edit here short enough to fit one line, a
// punchy phrase rather than the full English sentence.
//
// Only translatable copy lives here. Every href, count, step number and
// glyph name stays in content.ts and has exactly one home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const tickerItems: readonly string[] = [
  "Doctors, Nurses மற்றும் Laboratory technicians",
  "Appointment அடிப்படையில் Visits",
  "பிரத்யேக Vehicles 6",
  "Sample வீட்டிலேயே எடுத்தல்",
  "உங்கள் Hospital file இல் குறிப்புகள்",
  "முதியவர்கள், குழந்தைகள் மற்றும் அறுவை சிகிச்சை பின் சிகிச்சை",
  "எங்கள் Counter இலிருந்து மருந்து",
  "Video மற்றும் Phone Consultations",
];

export const heroFacts = [
  { k: "பதிவு", v: "Appointment அடிப்படையில்" },
  { k: "வாகனங்கள்", v: "பிரத்யேக 6" },
  { k: "Sample எடுத்தல்", v: "வீட்டிலேயே" },
  { k: "பதிவுகள்", v: "உங்கள் file இல் எழுதப்படும்" },
];

export const jumpCards = [
  { label: "வீட்டு Visits", note: "Doctors, Nurses மற்றும் Laboratory technicians உங்கள் வீட்டு வாசலில்" },
  { label: "யாருக்கு ஏற்றது", note: "முதியவர்கள், குழந்தைகள் மற்றும் அறுவை சிகிச்சை பின் குணமடைதல்" },
  { label: "Sample எடுத்தல்", note: "Samples வீட்டிலேயே எடுக்கப்படும், Findings உங்கள் file இல்" },
  { label: "ஏற்பாடு செய்தல்", note: "கோரிக்கை முதல் பதிவு செய்யப்பட்ட Visit வரை நான்கு படிகள்" },
];

export const visitLede =
  "எங்கள் Doctors, Nurses மற்றும் Laboratory technicians, உங்களுக்கு Personalized சிகிச்சையை உங்கள் வீட்டு வசதியில் வழங்க உங்கள் வீட்டுக்கு வருகிறார்கள்.";

export const visitRoles = [
  {
    kicker: "பரிசோதித்து முடிவெடுக்கிறார்",
    title: "வீட்டுக்கு வரும் Doctor",
    body: "நோயாளியை வீட்டிலேயே பார்க்கிறார், குணமடைதல் அல்லது நீண்டகால நிலை எப்படி முன்னேறுகிறது என Review செய்கிறார், பின் என்ன செய்யவேண்டும் என முடிவெடுக்கிறார். Treatment இல் மாற்றம் தேவைப்பட்டால், அது Visit இலேயே செய்யப்படும், மருத்துவமனைக்கு வர வேண்டியிராது.",
  },
  {
    kicker: "சிகிச்சை அளித்து கண்காணிக்கிறார்",
    title: "வீட்டுக்கு வரும் Nurse",
    body: "வார்டு ஒன்றில் தேவைப்படும் சிகிச்சையை கையாளுகிறார்: Dressings, Observations, மற்றும் Visits இடையே ஒரு குடும்பம் நிர்வகிக்கும் Practical support. Nurses வீட்டிலேயே Sample எடுத்தலும் செய்கிறார்கள்.",
  },
  {
    kicker: "Samples எடுக்கிறார்",
    title: "வீட்டுக்கு வரும் Laboratory technician",
    body: "Sample ஒன்று தேவைப்படும்போது வருகிறார், அதனால் வீட்டில் இருக்கும் நோயாளி அதற்காக பயணிக்க தேவையில்லை. Sample அதை Process செய்யும் அதே மருத்துவமனை Laboratory க்கே திரும்பிச் செல்கிறது.",
  },
];

export const suitedCases = [
  {
    title: "வயது அல்லது இயலாமையால் பயணம் கடினமாக இருப்பது",
    body: "மருத்துவமனைக்கு வரும் பயணம் Appointment ஐ விட கடினமாக இருக்கும் முதியவருக்கு, Visit அந்த தடையை மட்டும் நீக்குகிறது. Consultation இல் எதுவும் மாறாது.",
  },
  {
    title: "அறுவை சிகிச்சைக்குப் பின் வீட்டில் குணமடைதல்",
    body: "அறுவை சிகிச்சைக்குப் பின் வாரங்களில் காயத்தை கண்காணிக்க வேண்டும், கேள்விகளுக்கு விரைவாக பதில் தேவை. Visit அந்த Review ஐ நோயாளிக்கு அருகில் கொண்டு வருகிறது, பயணிக்க முடியாத நேரத்திலேயே.",
  },
  {
    title: "மருத்துவமனைக்கு செல்வது கடினமான குழந்தை",
    body: "மிகச் சிறிய குழந்தையை மருத்துவமனைக்கு கொண்டு வருவது சில நேரங்களில் வழக்கமான பரிசோதனையின் கடினமான பகுதி. Visit மூலம் அந்த பரிசோதனை குழந்தைக்கு பழக்கமான இடத்திலேயே, பயணமின்றி நடக்கும்.",
  },
  {
    title: "வீட்டில் இருக்கும் நோயாளிக்கு வழக்கமான Sample எடுத்தல்",
    body: "மருத்துவமனைக்கு வருவதற்கான ஒரே காரணம் Sample கொடுப்பதாக இருந்தால், அதற்குப் பதிலாக Laboratory technician வருகிறார். Sample எப்படியும் அதே மருத்துவமனை Laboratory க்கே செல்கிறது.",
  },
];

export const samplingPoints: string[] = [
  "Sample தேவைப்படும்போது Laboratory technician ஒருவர் Visit க்கு வருகிறார், அதனால் நோயாளி அதை கொடுக்க பயணிக்க தேவையில்லை.",
  "Samples மருத்துவமனையின் சொந்த Laboratory க்கே செல்கின்றன, நோயாளி வந்திருந்தாலும் Process செய்யப்படும் அதே Laboratory.",
  "Findings தனி Report ஆக கொடுக்கப்படாமல் Hospital file இல் எழுதப்படுகின்றன, அதனால் அடுத்து நோயாளியை பார்ப்பவரும் அதே Record ஐ படிக்கிறார்.",
  "Sample எடுக்கப்படும் என எதிர்பார்க்கப்பட்டால், Visit கேட்கும்போதே அதை சொல்வது சரியான நபர் Vehicle இல் இருப்பதை உறுதி செய்யும்.",
];

export const samplingFacts = [
  { k: "எடுக்கப்படுகிறது", v: "வீட்டிலேயே" },
  { k: "Process செய்யப்படுகிறது", v: "Hospital Laboratory இல்" },
  { k: "முடிவுகள்", v: "உங்கள் Hospital file இல்" },
  { k: "கோருவது", v: "Visit உடன் சொல்லுங்கள்" },
];

export const handoffs = [
  {
    eyebrow: "05 / மருந்து",
    heading: "மருந்து உங்கள் வீட்டு வாசலுக்கு",
    body: "வீட்டுக்கு செல்ல வேண்டியது Visit ஒன்று மட்டும் அல்ல, சில நேரங்களில். Prescription மற்றும் Counter மருந்துகள் மருத்துவமனையின் சொந்த Pharmacy Counter இலிருந்து Deliver செய்யப்படுகின்றன, நேரடியாக வந்து பெறும் Order ஒன்றுக்கு நிரப்பப்படும் அதே Authorized Stock இலிருந்தே, மேலும் அனுப்பும் முன் Pharmacist ஒருவரால் Check செய்யப்படுகிறது.",
    points: [
      "Third party இடமிருந்து அல்ல, மருத்துவமனையின் சொந்த Counter இலிருந்தே நிரப்பப்படுகிறது",
      "அனுப்பும் முன் Pharmacist ஒருவரால் Check செய்யப்படுகிறது",
      "புகைப்படம் எடுத்த Prescription ஒன்று Order ஐ தொடங்க போதுமானது",
    ],
    linkLabel: "Delivery எப்படி வேலை செய்கிறது",
  },
  {
    eyebrow: "06 / தொலைதூர",
    heading: "பயணிக்காமல் ஒரு Consultation",
    body: "எல்லா கேள்விக்கும் வாசலில் ஒருவர் தேவையில்லை. Telemedicine Consultation ஒன்று Follow-up உரையாடல் அல்லது In-person Examination தேவையில்லாத ஒரு கவலையை Video அல்லது Phone மூலம் Cover செய்யும், Prescription ஏதேனும் இருந்தால் நேரடியாக Pharmacy க்கு அனுப்பப்படும்.",
    points: [
      "Video அல்லது Phone, நோயாளிக்கு ஏற்றபடி",
      "Prescription ஏதேனும் இருந்தால் அது Pharmacy க்கு செல்லும், Collect செய்யவோ Deliver செய்யவோ",
      "நோயாளி வீடு திரும்பியபின் Follow-up க்கு பயன்படுத்தப்படுகிறது",
    ],
    linkLabel: "Telemedicine பற்றி",
  },
];

export const steps = [
  {
    title: "கோரிக்கை",
    desc: "மருத்துவமனையை Call செய்து யாரை பார்க்க வேண்டும், ஏன் என்று சொல்லுங்கள். Hospital file Number கையிருப்பில் இருந்தால் மற்றவை வேகமாக நடக்கும்.",
  },
  {
    title: "Schedule செய்தல்",
    desc: "Visit ஒரு Appointment மூலம் Arrange செய்யப்படுகிறது, அதற்கு ஒரு Dedicated Vehicle மற்றும் Visit க்கு தேவையானவர் Assign செய்யப்படுவார்.",
  },
  {
    title: "Visit செய்தல்",
    desc: "ஒப்புக்கொள்ளப்பட்ட நேரத்தில் Doctor, Nurse அல்லது Laboratory technician வருகிறார். Sample தேவைப்பட்டால், அது அங்கேயே எடுக்கப்படும்.",
  },
  {
    title: "Record செய்தல்",
    desc: "Visit இன் Notes நேரடியாக Hospital file இல் எழுதப்படுகின்றன, அதனால் அடுத்து நோயாளியை பார்க்கும் Team அதே Record ஐ படிக்கும்.",
  },
];

export const prepPoints: string[] = [
  "Visit கேட்கும்போது நோயாளியின் Hospital file Number ஐ தயாராக வையுங்கள்",
  "இப்போது எடுத்துக்கொள்ளும் மருந்துகளை எழுதி வையுங்கள், Counter இலிருந்து வாங்கியவையும் சேர்த்து",
  "Visit Team வேலை செய்யக்கூடிய அமைதியான, நல்ல வெளிச்சமுள்ள இடத்தை ஒதுக்குங்கள்",
  "Sample எடுக்கப்படும் என எதிர்பார்க்கிறீர்களா என சொல்லுங்கள், அதனால் சரியான நபர் Vehicle இல் இருப்பார்",
  "அன்று Team க்கு Directions தேவைப்பட்டால் Phone எட்டக்கூடியதாக வைத்திருங்கள்",
];

export const faq = [
  {
    q: "வீட்டு Visits யாருக்காக?",
    a: "அவை முதியவர்கள், குழந்தைகள் மற்றும் அறுவை சிகிச்சைக்குப் பின் குணமடையும், பயணிப்பது கடினமான நோயாளிகளுக்காக. Visit சரியானதா என உறுதியில்லை என்றால், Switchboard உடன் Call செய்து தெரிந்துகொள்ளலாம்.",
  },
  {
    q: "வீட்டிலேயே Blood Sample எடுக்க முடியுமா?",
    a: "ஆம். Sample தேவைப்படும்போது Laboratory technician ஒருவர் வருகிறார், அது மருத்துவமனையின் சொந்த Laboratory க்கே செல்கிறது. Visit கேட்கும்போதே Sample எடுக்கப்படும் என்று சொல்லுங்கள், அப்போது சரியான நபர் வருவார்.",
  },
  {
    q: "Visit இல் நடந்தது Regular Doctor க்கு தெரியுமா?",
    a: "ஆம். Visit இன் Notes தனியாக வைக்கப்படாமல் நேரடியாக Hospital file இல் எழுதப்படுகின்றன, அதனால் அடுத்து நோயாளியை பார்ப்பவரும் அதே Record ஐ படிக்கிறார்.",
  },
  {
    q: "வீட்டு Visits க்கு எத்தனை Vehicles உள்ளன?",
    a: "வீட்டு Visits இதற்கென Dedicated ஆன 6 Vehicles இல் நடக்கின்றன, அதனாலேயே Visits Demand இல் அல்ல Appointment இல் Arrange செய்யப்படுகின்றன.",
  },
  {
    q: "Visit உடன் மருந்து வர முடியுமா?",
    a: "மருந்து Delivery Pharmacy மூலமே Arrange செய்யப்படுகிறது, Visit Team மூலம் அல்ல. அது மருத்துவமனையின் சொந்த Counter இலிருந்து நிரப்பப்பட்டு, அனுப்பும் முன் Pharmacist ஒருவரால் Check செய்யப்படுகிறது.",
  },
  {
    q: "Emergency ஒன்றில் வீட்டு Visit சரியானதா?",
    a: "இல்லை. வீட்டு Visit ஒன்று Appointment மூலம் Arrange செய்யப்படுகிறது, அது Emergency சேவை அல்ல. Emergency இல், மருத்துவமனை Switchboard ஐ Call செய்யுங்கள் அல்லது 24 மணி நேரமும் திறந்திருக்கும் Accident & Emergency க்கு வாருங்கள்.",
  },
];

// `contactRows[0].value` (the phone number) is absent here on purpose: see
// the file header and `isUntranslatable` in content.i18n.test.ts.
export const contactRows = [
  { label: "எங்களை Call செய்யுங்கள்" },
  { label: "எங்களை WhatsApp செய்யுங்கள்" },
  { label: "மருத்துவமனைக்கு Email செய்யுங்கள்" },
  { label: "Online ஆக Doctor ஐ Book செய்யுங்கள்" },
];

export const hero = {
  strapline: "நாங்கள் உங்களிடம் வருகிறோம்",
  breadcrumbHome: "முகப்பு",
  breadcrumbCurrent: "வீட்டு சிகிச்சை",
  headingLead: "மருத்துவமனை",
  headingOutline: "உங்களிடம்",
  headingAccent: "வருகிறது.",
  bookCta: "Visit ஒன்றை கேளுங்கள்",
  // Keep this short: a whitespace-nowrap pill at 360px (see the file header).
  // Measured live in Chromium at a 360px viewport (see task-6 fix report):
  // the fully plural, two-clause "யார் வருவார்கள், என்ன செய்வார்கள்?"
  // rendered 390px wide, 30px past the viewport; the previously shipped
  // "யார் வருகிறார்கள்?" (just "who is coming") rendered short enough but
  // dropped "and what they do" entirely, understating the #visits section
  // this button opens (both halves must carry, same as the Sinhala pill
  // does). This phrasing keeps an explicit verb for each half, "வந்து"
  // ("comes") and "செய்கிறார்" ("does"), in the singular polite form Tamil
  // uses number-neutrally for this kind of respectful reference (the same
  // way Sinhala's "එන්නේ"/"කරන්නේ" in hero.visitsCta above do not mark
  // number either), and rendered 320px wide, comfortably inside the pill at
  // 360px with the "Request a visit" button wrapped above it.
  visitsCta: "யார் வந்து, என்ன செய்கிறார்",
};

export const heroStandfirst =
  "வயதானவர், குழந்தை, அல்லது அறுவை சிகிச்சைக்குப் பின் குணமடையும் ஒருவருக்கு, மருத்துவமனைக்கு வரும் பயணம் பெரும்பாலும் Appointment ஐ விட கடினமாக இருக்கும். எனவே அந்த பயணத்தை நாங்களே செய்கிறோம்.";

export const whoHeading = { line1: "அங்கு செல்வதுதான்", line2: "கடினமான பகுதி" };
export const whoIntro =
  "Visit என்பது மருத்துவமனைக்கு வருவதைவிட குறைவானது அல்ல. இது அதே குழு, தடையாக இருந்தது Appointment அல்ல என்ற நோயாளிகளுக்கு.";

export const samplingHeading = { line1: "Sample", line2: "பயணிக்கும்,", line3: "நோயாளி அல்ல." };
export const samplingIntro =
  "மருத்துவமனைக்கு வர வேண்டிய ஒரே காரணம் Sample கொடுப்பதாக இருந்தால், அதற்குப் பதிலாக Laboratory technician வருகிறார்.";
export const samplingLabels = { howItWorks: "இது எப்படி வேலை செய்கிறது", whatIsSettled: "உறுதி செய்யப்பட்டவை" };

export const howHeading = { line1: "Call செய்யுங்கள்,", line2: "கதவைத் திறங்கள்." };
export const readyLabel = "இவற்றை Ready ஆக வையுங்கள்";

export const faqHeading = { line1: "எங்களை Call செய்வதற்கு", line2: "முன்பு" };

export const bookHeading = { line1: "யாரை பார்க்க வேண்டும்", line2: "என்று", line3: "எங்களிடம் சொல்லுங்கள்." };
export const bookIntro =
  "மருத்துவமனையை Call செய்து, Visit யாருக்காக, ஏன் என்று சொல்லுங்கள், இருந்தால் Hospital file Number ஐயும் கையிருப்பில் வையுங்கள். Sample தேவைப்படக்கூடும் என்றால் அதையும் சொல்லுங்கள், அதனால் சரியான நபர் Vehicle இல் இருப்பார்.";
export const emergencyNote =
  "வீட்டு Visits Appointment மூலம் Arrange செய்யப்படுகின்றன, அவை Emergency சேவை அல்ல. Emergency இல், மருத்துவமனையை Call செய்யுங்கள் அல்லது 24 மணி நேரமும் திறந்திருக்கும் Accident & Emergency க்கு நேரடியாக வாருங்கள்.";

export const sectionEyebrows = {
  visits: "01 / வீட்டு Visit சேவைகள்",
  who: "02 / யாருக்கு ஏற்றது",
  sampling: "03 / Sample எடுத்தல்",
  how: "04 / Visit ஒன்றை ஏற்பாடு செய்தல்",
  faq: "07 / நியாயமான கேள்விகள்",
  book: "08 / Visit ஒன்றை கேளுங்கள்",
};
