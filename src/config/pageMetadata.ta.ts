// Tamil for every route's `<title>` and meta `description`. See
// pageMetadata.ts for what stays out of this file (services/[slug], both
// interpolation tokens) and pageMetadata.i18n.test.ts for the parity gate.
//
// Same register as every other overlay on this branch: the sentence is
// Tamil, everyday English nouns and product names stay in English. Where a
// route's own feature already translates the exact same fact (a nav label, a
// hero line, a ticker item), that translation is reused verbatim rather than
// re-coined; each such reuse is called out below.
//
// `home.title` and `pharmacy.title` are deliberately identical to the
// English (see pageMetadata.ts's header comment and this file's
// KEEPS_ENGLISH in pageMetadata.i18n.test.ts), so both are still written out
// in full here rather than omitted, the same way chromeCopy.ta.ts writes out
// "whatsapp" in full even though it stays English.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const pageMetadata = {
  home: {
    // The motto stays English as a brand mark; see pageMetadata.ts.
    title: "St. Joseph Hospital Negombo | To Live Is a Privilege",
    description:
      "நீர்கொழும்பு, இலங்கையில் அமெரிக்க தர சுகாதார சேவை. 24/7 OPD, Emergency, Pharmacy, House Doctors, மற்றும் Digital X-ray, 10,000 LKR முதல் தொடங்கும் உள்நோயாளர் அறைகளுடன்.",
  },
  aboutUs: {
    // Reused verbatim from navigationLabels.ta.ts's "About us".
    title: "எங்களைப் பற்றி | St. Joseph Hospital Negombo",
    description:
      "நீர்கொழும்பு, இலங்கையில் அமெரிக்க தர, உயர்தர சுகாதார சேவை, Kids & Teens Medical Group, USA ஆல் நிர்வகிக்கப்படுகிறது.",
  },
  accommodation: {
    // Reused verbatim from navigationLabels.ta.ts's own entry.
    title: "தங்குமிட வசதிகள் | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo இல் Standard, Deluxe, Super Deluxe அறைகள், மற்றும் வார்டுகள், மலிவான விலையில் தொடங்குகிறது.",
  },
  careers: {
    // Reused verbatim from navigationLabels.ta.ts's own entry.
    title: "வேலைவாய்ப்புகள் | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo இல் திறந்த Roles: மருத்துவம், Nursing, Allied Health, Pharmacy மற்றும் நிர்வாகம். நாங்கள் எந்த நிலையிலும் விண்ணப்பதாரர்களிடம் Fee கேட்பதில்லை, மேலும் ஒவ்வொரு Application க்கும் நாங்கள் பதிலளிக்கிறோம்.",
  },
  contactUs: {
    // Reused verbatim from navigationLabels.ta.ts's "Contact us".
    title: "எங்களைத் தொடர்பு கொள்ள | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo உடன் தொடர்பு கொள்ளுங்கள்: முகவரி, தொலைபேசி, Email, மற்றும் தொடர்பு Form.",
  },
  // The page-name half reuses e-channeling's own hero copy ("Make an
  // appointment." -> headingLead/headingAccent "நேரத்தை பதிவு
  // செய்யுங்கள்."), the same fact this page's own title names, rather than
  // the nav dictionary's "Book a doctor" (a related but different phrase,
  // about who you book, not that you're booking a slot).
  eChanneling: {
    title: "நேரத்தை பதிவு செய்யுங்கள் | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo இன் மருத்துவர்களை சிறப்புத்துறை வாரியாகத் தேடுங்கள், மேலும் Calendly மூலம் Online நேரம் பதிவு செய்யுங்கள்.",
  },
  facilities: {
    // Reused verbatim from navigationLabels.ta.ts's own entry.
    title: "வசதிகள் | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo உள்ளே: சிறப்பாகக் கட்டப்பட்ட 6 மாடிகள், அறுவை சிகிச்சை அரங்குகள், Monitor செய்யப்படும் தீவிர சிகிச்சை, 24 மணி நேர ஆய்வுகூடம், நான்கு அறை வகைகள் மற்றும் கூரையுள்ள Ambulance Bay.",
  },
  healthTips: {
    // Reused verbatim from navigationLabels.ta.ts's own entry.
    title: "சுகாதார ஆலோசனைகள் | St. Joseph Hospital Negombo",
    // {articleCount} / {warningCount} are the interpolation tokens; see
    // pageMetadata.ts. "written by our own clinicians" and "the conditions
    // that turn up in Negombo" reuse pageContent.ta.ts's own
    // verticalLabel/body wording verbatim; "screening by age" and "first aid
    // at home" reuse navigationLabels.ta.ts's own entries.
    description:
      "{articleCount} சுகாதார ஆலோசனைகள் எங்கள் மருத்துவர்கள் எழுதியது, {warningCount} இப்போதே வாருங்கள் என்று சொல்லும் அறிகுறிகள், வயது வாரியான பரிசோதனை மற்றும் வீட்டில் முதலுதவி, நீர்கொழும்பில் உண்மையில் ஏற்படும் நிலைமைகளுக்காக.",
  },
  homeCare: {
    // Reused verbatim from navigationLabels.ta.ts's "Care at Home".
    title: "வீட்டு சிகிச்சை | St. Joseph Hospital Negombo",
    // Every fact here reuses content.ta.ts's own tickerItems wording
    // verbatim: "Doctors, Nurses மற்றும் Laboratory technicians", "பிரத்யேக
    // Vehicles 6", "Sample வீட்டிலேயே எடுத்தல்", "உங்கள் Hospital file இல்
    // குறிப்புகள்".
    description:
      "Doctors, Nurses மற்றும் Laboratory technicians உங்கள் வீட்டிற்கு வருகிறார்கள், பிரத்யேக Vehicles 6 இல், முதியவர்கள், குழந்தைகள் மற்றும் அறுவை சிகிச்சைக்குப் பின் குணமாதலுக்காக. Samples வீட்டிலேயே எடுக்கப்படும், கண்டறிதல்கள் உங்கள் Hospital file இல் பதிவு செய்யப்படும்.",
  },
  internationalCare: {
    // Reused verbatim from navigationLabels.ta.ts's own entry.
    title: "வெளிநாட்டு நோயாளர் சிகிச்சை | St. Joseph Hospital Negombo",
    // Reuses content.ta.ts's own "பத்து நிமிடங்கள்" and "எழுத்துப்பூர்வ
    // Estimate" phrasing verbatim.
    description:
      "Bandaranaike International Airport இலிருந்து பத்து நிமிடங்கள். ஒரு Desk Transfer ஐ, எழுத்துப்பூர்வ Estimate ஐ, Interpreter ஐ, Insurance ஆவணங்களை மற்றும் நீங்கள் வீட்டிற்கு எடுத்துச் செல்லும் Records ஐ ஏற்பாடு செய்கிறது.",
  },
  media: {
    // "Media" kept English (navigationLabels.ta.ts's own KEEPS_ENGLISH
    // entry); "மற்றும் பத்திரிகை" ("and press") reuses the root word
    // navigationLabels.ta.ts already uses for "Press desk" -> "பத்திரிகை
    // மேசை".
    title: "Media மற்றும் பத்திரிகை | St. Joseph Hospital Negombo",
    // "செய்தி அறை" (Newsroom), "பத்திரிகை மேசை" (press desk) and
    // "பத்திரிகைக் கருவி" (press kit) all reused verbatim from
    // navigationLabels.ta.ts; "படமாக்கல் மற்றும் நோயாளர் தனியுரிமை" reuses
    // "Filming and privacy"'s own translation, with "நோயாளர்" added for
    // "patient".
    description:
      "St. Joseph Hospital, நீர்கொழும்புக்கான செய்தி அறை, பத்திரிகை மேசை மற்றும் பத்திரிகைக் கருவி. பெயரிடப்பட்ட பேச்சாளர்கள், அங்கீகரிக்கப்பட்ட Logo, அங்கீகரிக்கப்பட்ட புகைப்படங்கள், மற்றும் படமாக்கல் மற்றும் நோயாளர் தனியுரிமை பற்றிய விதிகள்.",
  },
  network: {
    // Reused verbatim from navigationLabels.ta.ts's "Our network".
    title: "எங்கள் வலையமைப்பு | St. Joseph Hospital Negombo",
    // "ஒன்பது நிறுவனங்களில் ஒன்று" / "இரு கண்டங்களில்" reuse content.ta.ts's
    // own heroFacts ("Companies in the family" -> "ஒன்பது, இரு
    // கண்டங்களில்") verbatim.
    description:
      "St. Joseph Hospital ஐ Los Angeles இல் உள்ள Kids & Teens Medical Group நடத்துகிறது, இரு கண்டங்களில் உள்ள ஒன்பது நிறுவனங்களில் ஒன்று. இந்த தொடர்பு உங்கள் சிகிச்சையில் மாற்றும் விஷயங்கள், மற்றும் குடும்பத்தில் வேறு யார் இருக்கிறார்கள்.",
  },
  pharmacy: {
    // "Pharmacy" kept English; see pageMetadata.ts and
    // navigationLabels.ta.ts's own KEEPS_ENGLISH entry for the same word.
    title: "Pharmacy | St. Joseph Hospital Negombo",
    // "Authorized Stock", "Counter", "Order", "Pharmacist", "Hospital File",
    // "Prescriptions" and "Delivery" all reuse content.ta.ts's own
    // KEEPS_ENGLISH register for this feature verbatim.
    description:
      "St. Joseph Hospital Negombo இல் 24 மணி நேரமும் திறந்திருக்கும் Pharmacy Counter: Authorized Stock மட்டும், ஒவ்வொரு Order உம் ஒரு Pharmacist ஆல் உங்கள் Hospital File உடன் சரிபார்க்கப்படும், Repeat Prescriptions Digital ஆக வைக்கப்படும், மற்றும் நீர்கொழும்பு முழுவதும் Delivery.",
  },
  privacyPolicy: {
    // Reused verbatim from navigationLabels.ta.ts's "Privacy policy".
    title: "தனியுரிமைக் கொள்கை | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo இன் தனியுரிமைக் கொள்கை: நாங்கள் உங்கள் தனிப்பட்ட தரவை எவ்வாறு சேகரிக்கிறோம், பயன்படுத்துகிறோம், பாதுகாக்கிறோம்.",
  },
  schoolWellness: {
    // Reused verbatim from navigationLabels.ta.ts's "School Wellness".
    title: "பள்ளி நல்வாழ்வு | St. Joseph Hospital Negombo",
    // "பார்வை" (vision), "செவிப்புலன்" (hearing), "பல்" (dental), "வளர்ச்சி"
    // (growth) and "நிலைப்பாடு" (posture) all reuse content.ta.ts's own
    // `stations[*].title` verbatim; "ஆசிரியர்" (teacher) and "பெற்றோர்"
    // (parent) reuse this feature's own established words.
    description:
      "ஒரு Paediatric தலைமையிலான பரிசோதனை திட்டம் உங்கள் பள்ளிக்கு வருகிறது: ஒவ்வொரு மாணவருக்கும் பார்வை, செவிப்புலன், பல், வளர்ச்சி மற்றும் நிலைப்பாடு பரிசோதனைகள், ஆசிரியர் First Aid பயிற்சி, மற்றும் ஒவ்வொரு பெற்றோருக்கும் வீட்டிற்கு ஒரு அறிக்கை.",
  },
  services: {
    // Reused verbatim from indexContent.ta.ts's own `eyebrow`: "Medical
    // Services" -> "மருத்துவ சேவைகள்". Same fact (this exact page's own
    // eyebrow), one translation.
    title: "மருத்துவ சேவைகள் | St. Joseph Hospital Negombo",
    // {total} / {groupList} are the interpolation tokens; see pageMetadata.ts.
    description: "St. Joseph Hospital Negombo இல் ஆறு பிரிவுகளில் ({groupList}) {total} மருத்துவ சேவைகள்.",
  },
};
