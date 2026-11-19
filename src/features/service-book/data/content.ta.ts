// Tamil for the Service Book page.
//
// Code-mixed, as on every other page: the sentence is Tamil, and the
// English nouns people actually say stay English ("Doctors", "Book",
// "Laboratory", "Tests", "Sample", "Report", "Consultants", "Parking").
// Section and service names that are also link or page names on this site
// ("Laboratory Tests", "Doctor Directory", "Free OPD", "Super Channelling")
// stay English so they match the link a reader clicks next.
//
// Only the prose translates: `editionNote`, `insideIntro` and each
// chapter's `summary`. The hero, eyebrows, headings, link labels and the
// viewer's controls are English by the register rule and are absent here.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const editionNote =
  "இது 2026 பதிப்பு. விலைகளும் Doctors பட்டியலும் ஆண்டின் இடையில் மாறலாம், எனவே Laboratory Tests பக்கமும் Doctor Directory யும் எப்போதும் தற்போதைய விவரங்களைக் கொண்டிருக்கும். Book செய்யும்போது விலையை உறுதிப்படுத்திக் கொள்ளுங்கள்.";

export const insideIntro =
  "வரவேற்புப் பக்கங்களுக்குப் பிறகு புத்தகத்தில் ஐந்து அத்தியாயங்கள் உள்ளன. ஒவ்வொன்றின் சுருக்கமும் கீழே உள்ளது, புத்தகத்தில் அதைத் திறக்கும் ஒரு Link உடனும், இந்த இணையதளத்தில் அதே விடயத்தைக் கூறும் பக்கத்துக்கான Link உடனும்.";

export const chapterGuide = [
  {
    summary:
      "St. Joseph Hospital இன் வரவேற்பும் தலைவர் திரு. சுனில் டி சில்வா அவர்களின் செய்தியும், அதைத் தொடர்ந்து உள்ளடக்கம்.",
  },
  {
    summary:
      "நாங்கள் யார்: USA இன் Kids and Teens Medical Group நிர்வகிக்கும், American Hospital Standards இன்படி இயங்கும் நீர்கொழும்பில் உள்ள மருத்துவமனை, ஞாயிறு முதல் சனி வரை 74 Consultants உடன். எங்களை எப்படி அடைவது, Parking பற்றியும்.",
  },
  {
    summary:
      "ஒன்பது சேவைகள் சுருக்கமாக: Free OPD, 24 மணிநேர Emergency Care, Super Channelling, Exercise ECG, Digital X-ray, 24/7 Laboratory, Home Visits, Delivery உடன் 24/7 Pharmacy, மற்றும் உள்நோயாளிகளுக்கான அறை விலைகள்.",
  },
  {
    summary:
      "2026 Laboratory விலைப் பட்டியல்: Blood Count முதல் Histology வரை பிரிவுகளாக 323 Tests, ஒவ்வொன்றுக்கும் தேவையான Sample, வழக்கமாக Report வரும் நேரம் மற்றும் LKR இல் விலை.",
  },
  {
    summary:
      "Specialist ஒருவரை Book செய்வது எப்படி, அதைத் தொடர்ந்து சிறப்புத் துறை வாரியாக 74 Consultants மற்றும் 13 Allied Health நிபுணர்களின் முழுப் பட்டியல்.",
  },
  {
    summary:
      "Doctor ஒருவரை Book செய்வது படிப்படியாக, அன்றைய தினம் நினைவில் வைக்க வேண்டியவை, எங்கள் திறந்திருக்கும் நேரங்கள், எங்களை எப்படிக் கண்டுபிடிப்பது.",
  },
];
