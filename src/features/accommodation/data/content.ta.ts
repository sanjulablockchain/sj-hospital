// Tamil for the accommodation page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns and
// product names stay in English rather than being replaced by literary
// coinages nobody says out loud. So "TV" and "Wi-Fi" stay put in the amenity
// lists, "Book" is a verb exactly like it is in contact's content.ta.ts, and
// "Standard", "Deluxe" and "Super Deluxe" are the hospital's own room class
// names, kept exactly as its own price list prints them (the same decision
// navigationLabels.ta.ts already made for the header and footer nav).
// "Wards" is not one of those names, so it translates like any other word.
// The strings this feature leaves fully in English are listed in
// KEEPS_ENGLISH in content.i18n.test.ts, so each one is a recorded decision
// rather than a string somebody forgot.
//
// Sentence forms use the polite plural ("செய்யுங்கள்"), which is how a
// hospital addresses a patient it has not met.
//
// Only translatable copy lives here. Every id, href, price, photo path and
// photo alt text stays in content.ts and has exactly one home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const roomTypes = [
  {
    // Kept identical to English: "Standard" is the hospital's own room class
    // name. See KEEPS_ENGLISH in content.i18n.test.ts.
    name: "Standard Rooms",
    shortName: "Standard",
    description:
      "எங்கள் Standard அறைகள் உங்கள் அடிப்படை தேவைகளுக்கும் செயல்பாட்டுக்கும் ஏற்ற அத்தியாவசிய வசதியை, முழுமையான மருத்துவ ஆதரவுடன் வழங்குகின்றன.",
    amenities: [
      "சூடான & குளிர்ந்த தண்ணீர்",
      "TV",
      "Wi-Fi",
      "துணையாளர் படுக்கை & நாற்காலி",
      "குளிரூட்டி",
      "தேவையான மருத்துவ ஆதரவு",
    ],
  },
  {
    name: "Deluxe Rooms",
    shortName: "Deluxe",
    description: "இன்னும் சிறிது வசதி விரும்பும் நோயாளர்களுக்கு கூடுதல் வசதியுடன் பெரிய இடம்.",
    amenities: [
      "சூடான & குளிர்ந்த தண்ணீர்",
      "TV",
      "Wi-Fi",
      "துணையாளர் படுக்கை & சோஃபா",
      "குளிரூட்டி",
      "தேநீர் நிலையத்துடன் கூடிய சமையலறைப் பகுதி",
      "காபி மேசை",
      "சூடான நீர் கெட்டில்",
    ],
  },
  {
    name: "Super Deluxe Rooms",
    shortName: "Super Deluxe",
    description: "தனி Steward சேவையுடன், எங்கள் மிகச் சிறந்த Premium நோயாளர் அறைகள்.",
    amenities: [
      "சூடான & குளிர்ந்த தண்ணீர்",
      "TV",
      "Wi-Fi",
      "துணையாளர் படுக்கை, சோஃபா & நாற்காலி",
      "குளிரூட்டி",
      "தேநீர் நிலையத்துடன் கூடிய சமையலறை",
      "காபி மேசை",
      "சூடான நீர் கெட்டில்",
      "காலை செய்தித்தாள்கள்",
      "தனி Steward சேவை",
    ],
  },
  {
    // Not a room class name, so this translates like any other word: the
    // same "வார்டுகள்" navigationLabels.ta.ts already uses for it.
    name: "வார்டுகள்",
    shortName: "வார்டுகள்",
    description:
      "3-படுக்கை மற்றும் 2-படுக்கை விருப்பங்கள் மற்றும் தனியுரிமைக்கான படுக்கை பிரிப்பான்களுடன் வசதியான பகிரப்பட்ட வார்டுகள். Discharge செய்யப்பட்ட பிறகு, நோயாளர்களுக்கு இலவச பழம் அல்லது chocolate கூடை வழங்கப்படலாம். மருத்துவரின் விருப்பப்படி தள்ளுபடிகளும் கிடைக்கலாம், மேலும் கூடுதல் சிகிச்சை விரும்புவோருக்கு VIP சேவை கிடைக்கும்.",
    amenities: [
      "குளிரூட்டி",
      "சூடான & குளிர்ந்த தண்ணீர்",
      "தனித்தனி துணையாளர் படுக்கைகள் & நாற்காலிகள்",
      "TV",
      "3-படுக்கை & 2-படுக்கை விருப்பங்கள்",
      "பொதுவான கழிப்பறை",
      "தனியுரிமைக்கான படுக்கை பிரிப்பான்கள்",
    ],
  },
];

export const specialties = [
  "வசதியான மற்றும் விசாலமான அறைகள்",
  "24 மணி நேர மருத்துவ உதவி",
  "முன்னேறிய நோயாளர் கண்காணிப்பு",
  "தனியார் மற்றும் அரை-தனியார் விருப்பங்கள்",
  "உயர்தர சுத்தம் மற்றும் பாதுகாப்பு",
  "தனிப்பயனாக்கப்பட்ட உணவு திட்டங்கள்",
  "குடும்பம் சார்ந்த வசதிகள்",
  "Television மற்றும் Wi-Fi அணுகல்",
  "அவசர பதில் அமைப்பு",
  "Pharmacy மற்றும் நோய் கண்டறிதல் ஆதரவு",
];

export const mealsNote =
  "கிழக்கு, மேற்கு, அல்லது இலங்கை உணவு வகைகளில் விருப்பப்படி தேர்ந்தெடுக்கக்கூடிய தினமும் மூன்று வேளை உணவுகளை அனுபவியுங்கள், நீரிழிவு நோயாளர்களுக்கான menu விருப்பமும் அடங்கும், மேலும் tea அல்லது coffee ஒரு snack உடன்.";

export const tickerItems = [
  "நான்கு அறை வகைகள்",
  "தினமும் மூன்று வேளை உணவுகள் அடங்கும்",
  "ஒவ்வொரு அறையிலும் Wi-Fi மற்றும் TV",
  "முழுவதும் குளிரூட்டப்பட்டது",
  "24 மணி நேரமும் மருத்துவ உதவி",
  "தனியார் மற்றும் பகிரப்பட்ட விருப்பங்கள்",
];

export const heroFacts = [{}, {}, {}, {}];

export const jumpCards = [
  {
    note: "மருத்துவ ஆதரவுடன் கூடிய அத்தியாவசிய வசதி.",
  },
  {
    note: "மேலும் வசதியுடன் கூடிய பெரிய இடம்.",
  },
  {
    note: "Steward சேவையுடன், எங்கள் மிகச் சிறந்த Premium அறைகள்.",
  },
  {
    note: "தனியுரிமை பிரிப்பான்களுடன் பகிரப்பட்ட வார்டுகள்.",
  },
];

export const roomsIntro = mealsNote;

export const bookIntro =
  "எங்களுக்கு Message அனுப்புங்கள், எங்கள் குழு உங்களுக்குப் பொருந்தும் அறையைக் கண்டறிய உதவும்.";

export const bookRail = [{}, {}, {}, {}];

export const hero = {};

export const sectionEyebrows = {};
