// Tamil for the about-us page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns stay in
// English rather than being replaced by literary coinages nobody says out
// loud. So "OPD" rather than a coined term, "X-ray" rather than a Tamil
// translation, and "Book" as a verb. The only string this feature leaves
// fully in English is listed in KEEPS_ENGLISH in content.i18n.test.ts, so it
// is a recorded decision rather than a string somebody forgot.
//
// Sentence forms use the polite plural ("செய்யுங்கள்"), which is how a
// hospital addresses a patient it has not met.
//
// Only translatable copy lives here. Every href, the jump card counts and the
// partner logo paths stay in content.ts and have exactly one home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const tickerItems = [
  "அமெரிக்க தர சிகிச்சை",
  "லாஸ் ஏஞ்சல்ஸ் இலிருந்து நிர்வகிக்கப்படுகிறது",
  "OPD இல் Corporate காப்பீடு",
  "டிஜிட்டல் X-ray",
  "நவீன ஆய்வுகூடம்",
  "Digital ஆக file அணுகல்",
  "24 மணி நேரமும் திறந்திருக்கும்",
];

export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const jumpCards = [
  {
    note: "அமெரிக்க தர சிகிச்சை, நீர்கொழும்புக்கு.",
  },
  {
    note: "நாங்கள் எங்களுக்கே நிர்ணயித்துக் கொண்ட ஆறு விடயங்கள்.",
  },
  {
    note: "நாங்கள் எதை நோக்கமாகக் கொண்டிருக்கிறோம்.",
  },
  {
    // Left in English: this is the parent group's own name, in the register
    // that names always keep, not a sentence to translate.
    note: "Kids & Teens Medical Group, USA.",
  },
];

export const storyParagraphs = [
  "நீர்கொழும்பில் உள்ள St. Joseph Hospital, இலங்கையர்களுக்கு ஏற்புடைய விலையில் அமெரிக்க தரத்திலான, உயர்தர சுகாதார சேவைகளை வழங்குகிறது. எங்கள் மருத்துவமனை சமீபத்தில் Kids & Teens Pediatric Medical Group (Los Angeles) மற்றும் Asia Corp தலைமையிலான அமெரிக்க டாலர் 1 மில்லியன் முதலீட்டுடன் புதுப்பிக்கப்பட்டது.",
  "உள்ளூர் சமூகத்திற்கு சுகாதார சேவைகளை வசதியாகவும் அணுகக்கூடியதாகவும் மாற்றும் வகையில், எங்கள் OPD இல் Corporate காப்பீட்டை ஏற்றுக்கொள்ளும் நீர்கொழும்பின் முதல் மருத்துவமனை நாங்கள்.",
  "எங்கள் நவீன மற்றும் முன்னேறிய ஆய்வுகூடம் இலங்கையின் சிறந்தவற்றில் ஒன்றாக அறியப்படுகிறது. இதில் புதிய, உயர்தரமான உபகரணங்கள் உள்ளன. மருத்துவமனையில் உள்ள Digital X-ray இயந்திரம் சரியான நோய் கண்டறிதலுக்கு துல்லியமான தகவலைத் தரும், industry இல் உள்ள புதியவற்றில் ஒன்று.",
  "எங்கள் நோயாளிகளின் வசதிக்காக Digital ஆக file அணுகலையும் நாங்கள் வழங்குகிறோம். இலங்கையிலேயே சர்வதேச தரத்திலான சுகாதார சேவையை அனுபவிக்க இன்று எங்களை வந்து சந்தியுங்கள்.",
];

export const reasons = [
  {
    description: "அமெரிக்க சுகாதார மேலாண்மை நிபுணத்துவத்துடன் சர்வதேச தரநிலைகள்.",
  },
  {
    description: "இலங்கைக் குடும்பங்களுக்கு அணுகக்கூடிய விலையில் உயர்தர சுகாதார சேவை.",
  },
  {
    description: "Digital X-ray மற்றும் நவீன ஆய்வுகூடம் உட்பட நவீன உபகரணங்கள்.",
  },
  {
    description: "சுத்தம் மற்றும் நோயாளி பாதுகாப்பில் உயர்ந்த தரநிலைகளைப் பேணுதல்.",
  },
  {
    description: "நீர்கொழும்பில் எளிதில் அணுகக்கூடிய இருப்பிடத்தில் முழுமையான சுகாதார சேவை.",
  },
  {
    description: "Digital ஆக file அணுகலுடன் வெளிப்படையான மற்றும் துல்லியமான கட்டணமிடல் நடைமுறைகள்.",
  },
];

export const mission = {
  body: "முன்னேறிய தொழில்நுட்பத்தை நோயாளி மையச் சிகிச்சையுடன் இணைக்கும் முழுமையான சுகாதார தீர்வுகளை எங்கள் சமூகத்திற்கு வழங்குவது, அதன்மூலம் அவர்கள் தங்கள் சுகாதாரப் பொறுப்பை ஏற்க அவர்களை ஊக்குவிப்பதே எங்கள் நோக்கம்.",
};

export const vision = {
  body: "கூட்டு முயற்சிகள் மூலம் இலங்கையில் உள்ள அனைவருக்கும் மிக உயர்தரமான சுகாதார சேவையை அணுகக்கூடியதாக மாற்ற நாங்கள் நோக்கமாகக் கொண்டுள்ளோம்.",
};

export const groupBody = [
  "தென் கலிபோர்னியாவின் முன்னணி குழந்தை சிகிச்சை வழங்குநரான Kids & Teens Medical Group, குழந்தைகள் மற்றும் இளைஞர்களுக்கு அன்பான மற்றும் முழுமையான சுகாதார சேவைகளை வழங்குவதில் அர்ப்பணிப்புடன் உள்ளது. 50 க்கும் அதிகமான board-certified pediatricians குழுவுடன், அவர்கள் primary care, urgent care, telehealth consultations மற்றும் after-hours care உட்பட பரந்த அளவிலான சேவைகளை வழங்குகிறார்கள், இதனால் இளம் நோயாளிகள் காலத்திற்குரிய மற்றும் தனிப்பயனாக்கப்பட்ட மருத்துவ கவனிப்பைப் பெறுவது உறுதி செய்யப்படுகிறது.",
  "இந்த strategic விரிவாக்கம் Kids & Teens Medical Group இன் நிபுணத்துவத்தை அமெரிக்காவைத் தாண்டி விரிவுபடுத்தும் அர்ப்பணிப்பை பிரதிபலிக்கிறது, அவர்களின் நோயாளி மைய அணுகுமுறையையும் உயர்தர குழந்தை சிகிச்சையையும் இலங்கையில் உள்ள குடும்பங்களுக்குக் கொண்டு வருகிறது. புதுப்பிக்கப்பட்ட St. Joseph Hospital, நீர்கொழும்பில் குழந்தைகள் மற்றும் இளைஞர்களுக்கான நவீன மருத்துவ சேவைகள் மற்றும் வசதிகளை வழங்கும் குழந்தை சுகாதாரத்தின் முக்கிய மையமாக மாற உள்ளது.",
];

export const storyIntro =
  "எங்கள் மருத்துவமனை சமீபத்தில் Kids & Teens Pediatric Medical Group (Los Angeles) மற்றும் Asia Corp தலைமையிலான அமெரிக்க டாலர் 1 மில்லியன் முதலீட்டுடன் புதுப்பிக்கப்பட்டது.";

export const differentIntro =
  "உள்ளூர் சமூகத்திற்கு சுகாதார சேவைகளை வசதியாகவும் அணுகக்கூடியதாகவும் மாற்றும் வகையில், எங்கள் OPD இல் Corporate காப்பீட்டை ஏற்றுக்கொள்ளும் நீர்கொழும்பின் முதல் மருத்துவமனை நாங்கள்.";

export const missionIntro =
  "முன்னேறிய தொழில்நுட்பத்தை நோயாளி மையச் சிகிச்சையுடன் இணைக்கும் முழுமையான சுகாதார தீர்வுகள்";

export const groupIntro =
  "தென் கலிபோர்னியாவின் முன்னணி குழந்தை சிகிச்சை வழங்குநரான Kids & Teens Medical Group, குழந்தைகள் மற்றும் இளைஞர்களுக்கு அன்பான மற்றும் முழுமையான சுகாதார சேவைகளை வழங்குவதில் அர்ப்பணிப்புடன் உள்ளது.";

export const hero = {};

export const sectionEyebrows = {};
