// Tamil for every route's meta `description`. See pageMetadata.ts for what
// stays out of this file (services/[slug], both interpolation tokens) and
// pageMetadata.i18n.test.ts for the parity gate.
//
// Same register as every other overlay on this branch: the sentence is
// Tamil, everyday English nouns and product names stay in English.
//
// Every route's `title` is deliberately ABSENT here, per the register policy
// (`docs/superpowers/i18n-register-rule.md`, `registerPolicy.ts`) and the
// owner's ruling on 2026-09-09: a route's `<title>` is a page name, and a tab
// title must not disagree with the menu label for the same page, which is now
// English (see navigationLabels.ta.ts). `getPageMetadata` reads this file
// through `localize`, so the missing key falls back to the English title.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const pageMetadata = {
  home: {
    description:
      "நீர்கொழும்பு, இலங்கையில் அமெரிக்க தர சுகாதார சேவை. 24/7 OPD, Emergency, Pharmacy, House Doctors, மற்றும் Digital X-ray, 10,000 LKR முதல் தொடங்கும் உள்நோயாளர் அறைகளுடன்.",
  },
  aboutUs: {
    description:
      "நீர்கொழும்பு, இலங்கையில் அமெரிக்க தர, உயர்தர சுகாதார சேவை, Kids & Teens Medical Group, USA ஆல் நிர்வகிக்கப்படுகிறது.",
  },
  accommodation: {
    description:
      "St. Joseph Hospital Negombo இல் Standard, Deluxe, Super Deluxe அறைகள், மற்றும் வார்டுகள், மலிவான விலையில் தொடங்குகிறது.",
  },
  careers: {
    description:
      "St. Joseph Hospital Negombo இல் திறந்த Roles: மருத்துவம், Nursing, Allied Health, Pharmacy மற்றும் நிர்வாகம். நாங்கள் எந்த நிலையிலும் விண்ணப்பதாரர்களிடம் Fee கேட்பதில்லை, மேலும் ஒவ்வொரு Application க்கும் நாங்கள் பதிலளிக்கிறோம்.",
  },
  contactUs: {
    description:
      "St. Joseph Hospital Negombo உடன் தொடர்பு கொள்ளுங்கள்: முகவரி, தொலைபேசி, Email, மற்றும் தொடர்பு Form.",
  },
  eChanneling: {
    description:
      "St. Joseph Hospital Negombo இன் மருத்துவர்களை சிறப்புத்துறை வாரியாகத் தேடுங்கள், மேலும் Calendly மூலம் Online நேரம் பதிவு செய்யுங்கள்.",
  },
  facilities: {
    description:
      "St. Joseph Hospital Negombo உள்ளே: சிறப்பாகக் கட்டப்பட்ட 6 மாடிகள், அறுவை சிகிச்சை அரங்குகள், Monitor செய்யப்படும் தீவிர சிகிச்சை, 24 மணி நேர ஆய்வுகூடம், நான்கு அறை வகைகள் மற்றும் கூரையுள்ள Ambulance Bay.",
  },
  healthTips: {
    // {articleCount} / {warningCount} are the interpolation tokens; see
    // pageMetadata.ts. "written by our own clinicians" and "the conditions
    // that turn up in Negombo" reuse pageContent.ta.ts's own
    // verticalLabel/body wording verbatim.
    description:
      "{articleCount} சுகாதார ஆலோசனைகள் எங்கள் மருத்துவர்கள் எழுதியது, {warningCount} இப்போதே வாருங்கள் என்று சொல்லும் அறிகுறிகள், வயது வாரியான பரிசோதனை மற்றும் வீட்டில் முதலுதவி, நீர்கொழும்பில் உண்மையில் ஏற்படும் நிலைமைகளுக்காக.",
  },
  homeCare: {
    // Every fact here reuses content.ta.ts's own tickerItems wording
    // verbatim: "Doctors, Nurses மற்றும் Laboratory technicians", "பிரத்யேக
    // Vehicles 6", "Sample வீட்டிலேயே எடுத்தல்", "உங்கள் Hospital file இல்
    // குறிப்புகள்".
    description:
      "Doctors, Nurses மற்றும் Laboratory technicians உங்கள் வீட்டிற்கு வருகிறார்கள், பிரத்யேக Vehicles 6 இல், முதியவர்கள், குழந்தைகள் மற்றும் அறுவை சிகிச்சைக்குப் பின் குணமாதலுக்காக. Samples வீட்டிலேயே எடுக்கப்படும், கண்டறிதல்கள் உங்கள் Hospital file இல் பதிவு செய்யப்படும்.",
  },
  internationalCare: {
    // Reuses content.ta.ts's own "பத்து நிமிடங்கள்" and "எழுத்துப்பூர்வ
    // Estimate" phrasing verbatim.
    description:
      "Bandaranaike International Airport இலிருந்து பத்து நிமிடங்கள். ஒரு Desk Transfer ஐ, எழுத்துப்பூர்வ Estimate ஐ, Interpreter ஐ, Insurance ஆவணங்களை மற்றும் நீங்கள் வீட்டிற்கு எடுத்துச் செல்லும் Records ஐ ஏற்பாடு செய்கிறது.",
  },
  media: {
    // "செய்தி அறை" (Newsroom), "பத்திரிகை மேசை" (press desk) and
    // "பத்திரிகைக் கருவி" (press kit) all reused verbatim from earlier
    // drafts of navigationLabels.ta.ts; "படமாக்கல் மற்றும் நோயாளர் தனியுரிமை"
    // reuses "Filming and privacy"'s own translation, with "நோயாளர்" added
    // for "patient".
    description:
      "St. Joseph Hospital, நீர்கொழும்புக்கான செய்தி அறை, பத்திரிகை மேசை மற்றும் பத்திரிகைக் கருவி. பெயரிடப்பட்ட பேச்சாளர்கள், அங்கீகரிக்கப்பட்ட Logo, அங்கீகரிக்கப்பட்ட புகைப்படங்கள், மற்றும் படமாக்கல் மற்றும் நோயாளர் தனியுரிமை பற்றிய விதிகள்.",
  },
  network: {
    // "ஒன்பது நிறுவனங்களில் ஒன்று" / "இரு கண்டங்களில்" reuse content.ta.ts's
    // own heroFacts ("Companies in the family" -> "ஒன்பது, இரு
    // கண்டங்களில்") verbatim.
    description:
      "St. Joseph Hospital ஐ Los Angeles இல் உள்ள Kids & Teens Medical Group நடத்துகிறது, இரு கண்டங்களில் உள்ள ஒன்பது நிறுவனங்களில் ஒன்று. இந்த தொடர்பு உங்கள் சிகிச்சையில் மாற்றும் விஷயங்கள், மற்றும் குடும்பத்தில் வேறு யார் இருக்கிறார்கள்.",
  },
  pharmacy: {
    // "Authorized Stock", "Counter", "Order", "Pharmacist", "Hospital File",
    // "Prescriptions" and "Delivery" all reuse content.ta.ts's own
    // KEEPS_ENGLISH register for this feature verbatim.
    description:
      "St. Joseph Hospital Negombo இல் 24 மணி நேரமும் திறந்திருக்கும் Pharmacy Counter: Authorized Stock மட்டும், ஒவ்வொரு Order உம் ஒரு Pharmacist ஆல் உங்கள் Hospital File உடன் சரிபார்க்கப்படும், Repeat Prescriptions Digital ஆக வைக்கப்படும், மற்றும் நீர்கொழும்பு முழுவதும் Delivery.",
  },
  privacyPolicy: {
    description:
      "St. Joseph Hospital Negombo இன் தனியுரிமைக் கொள்கை: நாங்கள் உங்கள் தனிப்பட்ட தரவை எவ்வாறு சேகரிக்கிறோம், பயன்படுத்துகிறோம், பாதுகாக்கிறோம்.",
  },
  schoolWellness: {
    // "பார்வை" (vision), "செவிப்புலன்" (hearing), "பல்" (dental), "வளர்ச்சி"
    // (growth) and "நிலைப்பாடு" (posture) all reuse content.ta.ts's own
    // `stations[*].title` verbatim; "ஆசிரியர்" (teacher) and "பெற்றோர்"
    // (parent) reuse this feature's own established words.
    description:
      "ஒரு Paediatric தலைமையிலான பரிசோதனை திட்டம் உங்கள் பள்ளிக்கு வருகிறது: ஒவ்வொரு மாணவருக்கும் பார்வை, செவிப்புலன், பல், வளர்ச்சி மற்றும் நிலைப்பாடு பரிசோதனைகள், ஆசிரியர் First Aid பயிற்சி, மற்றும் ஒவ்வொரு பெற்றோருக்கும் வீட்டிற்கு ஒரு அறிக்கை.",
  },
  services: {
    // {total} / {groupList} are the interpolation tokens; see pageMetadata.ts.
    description: "St. Joseph Hospital Negombo இல் ஆறு பிரிவுகளில் ({groupList}) {total} மருத்துவ சேவைகள்.",
  },
};
