// Tamil for the pharmacy page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns and
// product-adjacent terms stay in English rather than being replaced by
// literary coinages nobody says out loud. So "Counter", "Prescription",
// "Delivery", "Pharmacist", "Order", "Record", "File", "Stock" and "WhatsApp"
// stay in English throughout, and "Send", "Call", "Check" and "Book" stay
// verbs, exactly as they are in contact's, accommodation's and home-care's
// own content.ta.ts.
//
// Sentence forms use the polite plural ("செய்யுங்கள்"), which is how a
// hospital addresses a patient it has not met.
//
// Medicine names, dosage forms and category tags in `stock` and `refills`
// stay in English throughout ("Antibiotics", "Blood pressure", "Rx only"),
// which is how a Sri Lankan pharmacist writes and says them: see
// `KEEPS_ENGLISH` in content.i18n.test.ts for the full list, with a reason.
//
// `jumpCards[3].count` ("Digital") is also in `KEEPS_ENGLISH`: it is the
// established loanword the about page already uses for a digital record,
// with no natural Tamil word for a one-line stat badge.
//
// `hero.call.value` and `bookActions[1].value` are the one field this file
// never carries: the counter's own phone number has nothing to translate, so
// both are excluded in `isUntranslatable` in content.i18n.test.ts rather than
// repeated here as a second and third copy of the same digits.
//
// "229/10 St. Joseph Street" in `bookIntro` never changes script: it is the
// address a driver is shown, and "Negombo" translates to "நீர்கொழும்பு"
// because that is a place name, not the hospital's own name or street.
//
// Only translatable copy lives here. Every href, count kept for its own
// reason, glyph name and fact value stays in content.ts and has exactly one
// home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {};

export const sectionEyebrows = {};

export const tickerItems: readonly string[] = [
  "Pharmacist ஒருவர் Counter இல், 24 மணி நேரமும்",
  "ஒவ்வொரு Order உம் உங்கள் Hospital File உடன் பார்க்கப்படும்",
  "Authorized Stock மட்டும், Substitutes இல்லை",
  "நீர்கொழும்பு முழுவதும் Delivery",
  "உங்கள் Prescription ஐ WhatsApp செய்யுங்கள்",
];

export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const jumpCards = [
  {
    count: "ஒரு Counter",
    note: "Ground Floor இல், இரவு 24 மணி நேரமும் Open.",
  },
  {
    count: "10 வகைகள்",
    note: "Prescription, Over the counter மருந்துகள் மற்றும் Supplies.",
  },
  {
    count: "4 படிகள்",
    note: "உங்கள் Prescription ஐ Send செய்யுங்கள், நாங்கள் கொண்டு வருகிறோம்.",
  },
  {
    count: "Digital",
    note: "File இல் உள்ளது, காகிதம் இல்லாமலே மீண்டும் கேட்கலாம்.",
  },
];

export const countersHeading = {};
export const countersIntro =
  "உங்கள் Order எங்களுக்கு வரும் விதம் எதுவாக இருந்தாலும், Counter இல், Consultation ஒன்றின்போது, அல்லது Phone மூலம், Pharmacist பார்ப்பது ஒரே Prescription History தான், அதனால் எதுவும் இரண்டு முறை Dispense ஆகாது.";

export const counters = [
  {
    where: "Counter இல்",
    name: "OPD Dispensing பிரிவு",
    desc: "Ground Floor Counter Clinic Patients, நேரடியாக வரும் வாங்குதல்கள் மற்றும் Collections ஐ கவனிக்கிறது. உங்கள் Prescription ஐ கொண்டு வாருங்கள், அல்லது அதை Consultation இலிருந்தே அனுப்புங்கள், தயார் செய்யும் முன் Pharmacist ஒருவர் அதை உங்கள் File உடன் சரிபார்ப்பார்.",
    hours: "24 மணி நேரமும் Open",
  },
  {
    where: "Admission க்குப் பிறகு",
    name: "Discharge மருந்து",
    desc: "தங்கியிருந்த பிறகு வீட்டுக்கு கொண்டு செல்லும் மருந்து அதே Counter இலிருந்தே, உங்கள் Consultant எழுதியதற்கு ஏற்ப தரப்படும். உறுதியில்லாத எதையும் வீட்டில் Label படித்துக் கொள்வதற்குப் பதிலாக, செல்வதற்கு முன்பே கேட்டு தெரிந்துகொள்ளலாம்.",
    hours: "24 மணி நேரமும் Open",
  },
  {
    where: "Delivery க்காக",
    name: "Delivery செய்யும் Orders",
    desc: "Delivery க்காக செல்லும் Orders இந்த Counter இன் Stock இலிருந்தே தயார் செய்யப்படும், அதனால் நீங்கள் வந்து எடுத்தாலும் நாங்கள் கொண்டு வந்தாலும் அதே Authorized மருந்துதான். அனுப்பும் முன் Pharmacist ஒருவர் ஒவ்வொன்றையும் சரிபார்ப்பார்.",
    hours: "தினமும்",
  },
];

export const standardsHeading = {};
export const standardsIntro =
  "எதையும் Pack செய்வதற்கு முன் ஒவ்வொரு Prescription உம் Pharmacist ஒருவரால் உங்கள் Hospital Record உடன் சரிபார்க்கப்படுகிறது. அவர்களால் உங்கள் File ஐ Read செய்ய முடிவதால், நீங்கள் எடுக்கும் மற்றொன்றுடன் Interaction இருந்தால் அதை Flag செய்யலாம், அல்லது உங்கள் Doctor எழுதிய Dose உடன் உறுதிப்படுத்தலாம்.";
export const standardsNote =
  "நாங்கள் வைத்திருப்பது Authorized Stock மட்டும், Substitutes இல்லை, Grey market Supply இல்லை, அதனால் உங்கள் Consultant எழுதியதுதான் உங்களுக்கு தரப்படுகிறது.";

export const standards = [
  { k: "Prescription சரிபார்ப்பு", v: "Pharmacist மூலம்" },
  { k: "சரிபார்க்கப்படுவது", v: "உங்கள் Hospital File உடன்" },
  { k: "Interaction சோதனை", v: "தருவதற்கு முன்" },
  { k: "மாற்று மருந்து", v: "பயன்படுத்தப்படாது" },
  { k: "வழங்கல்", v: "Authorized Stock மட்டும்" },
  { k: "கள்ள சந்தை", v: "எப்போதுமே இல்லை" },
  { k: "Records", v: "Digital, File இல்" },
  { k: "ஆலோசனை", v: "Counter இல் தரப்படுகிறது" },
  { k: "Delivery Orders க்காக", v: "அனுப்பும் முன் சரிபார்க்கப்படும்" },
];

export const stockHeading = {};
export const stockIntro =
  "Prescription மருந்து, தினமும் பயன்படுத்தும் Over the counter Items, மற்றும் ஒரு Procedure க்குப் பிறகு நோயாளிகளுக்கு வீட்டில் தேவைப்படும் Dressings மற்றும் Supplies.";

export const stock = [
  {
    name: "Prescription medicine",
    note: "எங்கள் Consultants ஒவ்வொரு Department இலும் Prescribe செய்யும் வகைகள்",
    tag: "On file",
  },
  {
    name: "Antibiotics",
    note: "செல்லுபடியான Prescription ஒன்றுக்கு எதிராக மட்டுமே Dispense செய்யப்படும்",
    tag: "Rx only",
  },
  {
    name: "Chronic medicine",
    note: "Blood pressure, Diabetes, Thyroid, Cardiac மற்றும் Asthma க்கான தொடர் மருந்து",
    tag: "Refillable",
  },
  {
    name: "Paediatric medicine",
    note: "உங்கள் Paediatrician Prescribe செய்த Dose க்கு எதிராக Dispense செய்யப்படும்",
    tag: "Rx only",
  },
  {
    name: "Discharge medicine",
    note: "Admission ஒன்றுக்குப் பிறகு வீட்டுக்கு கொண்டு செல்லும் குறுகிய Course",
    tag: "On file",
  },
  {
    name: "Over the counter",
    note: "Prescription இல்லாமலேயே சட்டப்படி பெறக்கூடிய மருந்து",
    tag: "No Rx",
  },
  {
    name: "காயப் பராமரிப்பு மற்றும் Dressings",
    note: "வீட்டில் Dressing ஒன்றை மாற்றுவதற்கான Dressings, Tapes மற்றும் Antiseptics",
    tag: "No Rx",
  },
  {
    name: "First Aid பொருட்கள்",
    note: "வீடு அல்லது Workplace ஒன்றின் First Aid Kit இல் உள்ள பொருட்கள்",
    tag: "No Rx",
  },
  {
    name: "வீட்டு சுகாதார Devices",
    note: "வீட்டில் கண்காணிக்க Devices, Blood pressure Monitors மற்றும் Thermometers போன்றவை",
    tag: "No Rx",
  },
  {
    name: "குழந்தை மற்றும் தாயின் பராமரிப்பு",
    note: "Feeding Supplies, Nappy Care மற்றும் Postnatal க்கு தேவையானவை",
    tag: "No Rx",
  },
];

export const deliveryHeading = {};

export const steps = [
  {
    desc: "உங்கள் Prescription ஐ, அல்லது அதன் தெளிவான Photo ஒன்றை, Pharmacy Counter க்கு WhatsApp இல் Send செய்யுங்கள், அல்லது Call செய்து பேசுங்கள்.",
  },
  {
    desc: "தயார் செய்வதற்கு முன் Pharmacist ஒருவர் Order ஐ உங்கள் Record உடன் Read செய்வார், Counter இல் உள்ள Order ஒன்றுக்கு கிடைக்கும் அதே Check.",
  },
  {
    desc: "உங்கள் Order Counter இன் சொந்த Authorized Stock இலிருந்தே தயார் செய்யப்படும், வேண்டுமெனில் Over the counter Items அதே Order உடன் சேர்க்கலாம்.",
  },
  {
    desc: "நீர்கொழும்பு முழுவதும் Delivery க்கு Dispatch செய்யப்படும், பிறகு ஏதேனும் கேள்வி இருந்தால் அது Counter க்கே செல்லும்.",
  },
];

export const sendingWell: string[] = [
  "பக்கம் முழுவதையும், ஓரம் முதல் ஓரம் வரை, நல்ல Light இல் Photo எடுங்கள்",
  "Doctor இன் பெயர், தேதி மற்றும் கையொப்பம் Frame இல் இருக்கட்டும்",
  "நீங்கள் தினமும் எடுக்கும் மற்ற எதையும் எங்களிடம் சொல்லுங்கள், அதுவும் Check செய்யப்படும்",
  "Pharmacist கேள்வி கேட்க வேண்டுமெனில் தொடர்பு கொள்ளக்கூடிய Phone Number ஒன்றை வையுங்கள்",
];

export const deliveryFacts = [
  { k: "வரம்பு", v: "நீர்கொழும்பு முழுவதும்" },
  { k: "இயங்குகிறது", v: "தினமும்" },
  { k: "தயார் செய்யப்படுவது", v: "எங்கள் சொந்த Counter இலிருந்து" },
  { k: "Prescription விவரம்", v: "Photos ஏற்றுக்கொள்ளப்படும்" },
  { k: "சரிபார்ப்பு", v: "Pharmacist, அனுப்பும் முன்" },
  { k: "Order செய்யும் விதம்", v: "WhatsApp அல்லது Phone மூலம்" },
];

export const refillsHeading = {};
export const refillsIntro =
  "நீங்கள் தினமும் Blood pressure, Diabetes, Thyroid, Asthma அல்லது இதய நோய்க்கு மருந்து எடுத்தால், உங்கள் Prescription Digital ஆக File இல் வைக்கப்படுகிறது, அதனால் ஒவ்வொரு முறையும் காகிதத்தை கொண்டு செல்ல வேண்டியதில்லை.";
export const refillsNote =
  "Counter இல், Phone மூலம் அல்லது WhatsApp இல் மீண்டும் ஒன்றை கேளுங்கள். தயார் செய்வதற்கு முன் Pharmacist ஒருவர் அதை உங்கள் Record உடன் சரிபார்ப்பார், அது ஒரு Delivery உடனும் அனுப்பப்படலாம்.";

export const refills = [
  { name: "Blood pressure", note: "தினசரி பராமரிப்பு மருந்து" },
  { name: "Diabetes", note: "வாய் வழி மருந்து மற்றும் Supplies" },
  { name: "Thyroid", note: "தினசரி மாற்று மருந்து" },
  { name: "Cardiac medicine", note: "உங்கள் Consultant Prescribe செய்தபடி" },
  { name: "Asthma inhalers", note: "Reliever மற்றும் Preventer" },
  { name: "Cholesterol", note: "தினசரி பராமரிப்பு மருந்து" },
  { name: "Discharge medicine", note: "Admission ஒன்றுக்குப் பிறகான குறுகிய Course" },
];

export const safetyHeading = {};
export const safetyIntro =
  "காகிதத்தின் பலத்தை மட்டும் வைத்து எதுவும் தரப்படாது. ஒவ்வொரு Order உம் முதலில் உங்கள் Record உடன் Read செய்யப்படுகிறது, Shelf இல் உள்ள அனைத்தும் Authorized Stock.";

export const safety = [
  {
    name: "Authorized வழங்கல்",
    desc: "Counter இல் உள்ள அனைத்தும் Authorized Stock. Shelf இல் உள்ள எதுவும் Grey market Supply இலிருந்து வராது.",
  },
  {
    name: "மாற்று மருந்து இல்லை",
    desc: "உங்கள் Prescription எழுதப்பட்டபடியே Dispense செய்யப்படும். உங்கள் Doctor தேர்ந்தெடுத்ததற்கு பதிலாக வேறு Brand ஒன்று மறைவாக மாற்றப்படாது.",
  },
  {
    name: "Pharmacist பரிசோதனை",
    desc: "நீங்கள் Counter இல் நின்றாலும் அல்லது Delivery ஒன்றை Order செய்தாலும், தயார் செய்வதற்கு முன் Pharmacist ஒருவர் ஒவ்வொரு Order ஐயும் Read செய்வார்.",
  },
  {
    name: "உங்கள் Hospital File",
    desc: "உங்கள் மருந்தை Dispense செய்யும் Pharmacists உங்கள் File ஐ பார்க்க முடியும், அதனால் நீங்கள் எடுக்கும் மற்றொன்றுடன் Interaction இருந்தால் நீங்கள் செல்வதற்கு முன்பே Flag செய்யப்படும்.",
  },
  {
    name: "Dose உறுதிப்படுத்தல்",
    desc: "Dose ஒன்று உங்கள் Doctor Prescribe செய்ததற்கு எதிராக உறுதிப்படுத்தப்படுகிறது, இதனால்தான் ஒரு Duplicate அல்லது தவறான Strength காகிதத்திலேயே கண்டறியப்படுகிறது.",
  },
  {
    name: "உங்கள் Digital Records",
    desc: "Prescriptions Digital ஆக File இல் வைக்கப்படுகிறது, அதனால் மீண்டும் ஒரு Order அல்லது மற்றொரு Department இலிருந்து வரும் Query உங்கள் Paperwork ஐ சார்ந்திருக்காது.",
  },
  {
    name: "Prescription மட்டும் தேவையான மருந்து",
    desc: "Antibiotics மற்றும் Controlled மருந்துகள் செல்லுபடியான Prescription ஒன்றுக்கு எதிராக மட்டுமே Dispense செய்யப்படும், கேட்டாலும் Over the counter தரப்படாது.",
  },
  {
    name: "ஆலோசனை",
    desc: "Timing, உணவுடன் Interactions, ஒரு Dose தவறினால் என்ன செய்வது, எந்த Side Effects க்கு Call செய்யலாம் என்பது Counter இல் விளக்கப்படும்.",
  },
];

export const faq = [
  {
    q: "மருத்துவமனைக்கு வெளியே உள்ள Doctors இன் Prescriptions ஐ ஏற்றுக்கொள்வீர்களா?",
    a: "ஆம். எங்கள் சொந்த Doctors எழுதிய மற்றும் வேறு எங்காவது உள்ள பதிவுசெய்யப்பட்ட Practitioner ஒருவர் எழுதிய Prescriptions ஐ நாங்கள் Dispense செய்கிறோம். Original ஐ கொண்டு வாருங்கள் அல்லது தெளிவான Photo ஒன்றை Send செய்யுங்கள், Dispense செய்வதற்கு முன் எங்கள் Pharmacist அதை Check செய்வார்.",
  },
  {
    q: "இரவில் Pharmacy Open ஆக இருக்குமா?",
    a: "ஆம். Counter Ground Floor இல், 24 மணி நேரமும் Open. எந்த நேரமும் Collect செய்யலாம், இதனால்தான் இரவு Admission க்குப் பிறகு அவசர Prescription ஒன்று எளிதாகிறது.",
  },
  {
    q: "Prescribe செய்யப்பட்ட அதே மருந்தை எப்போதும் பெறுவேனா?",
    a: "ஆம். Counter இல் Authorized மருந்து மட்டுமே இருக்கும், Substitutes இல்லை, Grey market Supply இல்லை, அதனால் உங்கள் Consultant எழுதியதுதான் உங்களுக்கு தரப்படும்.",
  },
  {
    q: "நான் எடுக்கும் மற்றவற்றை Pharmacists அறிவார்களா?",
    a: "உங்கள் மருந்தை Dispense செய்யும் Pharmacists உங்கள் Hospital File ஐ Read செய்ய முடியும், இதனால் புதிய Order ஒன்றை தருவதற்கு முன் நீங்கள் ஏற்கனவே எடுப்பதற்கு எதிராக Check செய்ய முடியும். File இல் இல்லாத எதையும் எடுத்தால் Pharmacist இடம் சொல்லுங்கள்.",
  },
  {
    q: "மீண்டும் Prescription ஒன்றை எளிதாக Reorder செய்யலாமா?",
    a: "ஆம். Prescriptions Digital ஆக File இல் வைக்கப்படுகிறது, அதனால் மீண்டும் ஒரு Order ஒவ்வொரு முறையும் காகிதத்தை கொண்டு செல்வதை சார்ந்திருக்காது. Counter இல், Phone மூலம் அல்லது WhatsApp இல் கேளுங்கள்.",
  },
  {
    q: "என் Prescription இன் Photo ஒன்றை Send செய்யலாமா?",
    a: "ஆம். Delivery Order ஒன்றை தொடங்க தெளிவான Photo ஏற்றுக்கொள்ளப்படும், Original ஐ நேரில் கொண்டு வர முடியாவிட்டால் இது உதவும். பக்கம் முழுவதையும் Photo எடுங்கள், Doctor இன் பெயர், தேதி மற்றும் கையொப்பத்தையும் சேருங்கள்.",
  },
  {
    q: "Delivery எங்கு வரை செல்லும்?",
    a: "Delivery நீர்கொழும்பு முழுவதும் செல்லும், தினமும் இயங்கும். Orders மருத்துவமனையின் சொந்த Pharmacy Counter இலிருந்தே தயார் செய்யப்படும், அதனால் நேரில் வந்து பெறும் Order க்கும் Delivery க்கும் அதே Authorized Stock தான்.",
  },
  {
    q: "என் Delivery Order அனுப்பும் முன் Check செய்யப்படுமா?",
    a: "ஆம். Dispatch செய்வதற்கு முன் Pharmacist ஒருவர் ஒவ்வொரு Order ஐயும் Check செய்வார், Counter இல் உள்ள Order ஒன்றுக்கு செய்யப்படும் அதே விதமாக. பிறகு ஏதேனும் கேள்வி இருந்தால் அது Counter க்கே செல்லும், Courier இடம் அல்ல.",
  },
  {
    q: "Over the counter Items ஐயும் Order செய்யலாமா?",
    a: "ஆம். Over the counter மருந்து மற்றும் Supplies ஐ ஒரு Prescription உடன் அதே Delivery Order இல் சேர்க்கலாம். Antibiotics மற்றும் Controlled மருந்துகளுக்கு இன்னமும் செல்லுபடியான Prescription தேவை.",
  },
];

export const bookHeading = {};

export const bookIntro =
  "229/10 St. Joseph Street, நீர்கொழும்பு. Ground Floor இல் உள்ள Counter க்கு வாருங்கள், Call செய்யுங்கள், அல்லது உங்கள் Prescription ஐ WhatsApp செய்யுங்கள்.";

export const bookActions = [
  {},
  {},
  {},
];
