// Tamil overlay for dengue.ts (the `#seasonal` band: the weekly compound
// walk and its own section copy).
//
// "Dengue" is written as "டெங்கு" throughout (established:
// navigationLabels.ta.ts's own "Dengue at home" -> "வீட்டில் டெங்கு சிகிச்சை",
// school-wellness/data/content.ta.ts's own header and "டெங்கு ஒரு").
//
// `denguePoints[1]`'s breeding-site nouns ("gutters", "plant pot trays",
// "discarded tyres") reuse school-wellness/data/content.ta.ts's own
// `breedingSites` forms verbatim for the identical objects in the identical
// domain (dengue prevention): "Gutters", "Pot செடிகளுக்கு அடியில் உள்ள Trays"
// and "வீசப்பட்ட Tyres" all stay bare English there too. "Coconut shells"
// is that same list's own "தேங்காய் ஓடுகள்", reused verbatim. "Bottle caps"
// has no precedent there, so it translates in full: "பாட்டில் மூடிகள்".
//
// "Lid" and "repellent" have no established site precedent, so both
// translate in full as ordinary nouns ("மூடி", "கொசு விரட்டி"). "Screens" in
// `denguePoints[5]` is the window-mesh sense, not the medical-screening
// sense the rest of the site's "Screen" occurrences use, so it translates
// to "கொசு வலைகள்" (mosquito mesh) rather than a false-friend with the
// medical sense.
//
// Every number in this file (the "twenty minutes" and "hundred metres" in
// `seasonalSection.body1`/`body2` are spelled-out English words, not digits,
// so they translate like any other word) is unchanged from the English base.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const denguePoints = [
  "வாரத்திற்கு ஒருமுறை உங்கள் தோட்டத்தை சுற்றி நடந்து, தண்ணீர் தேங்கியிருக்கும் எதையும் கொட்டிவிடுங்கள்",
  "பாத்திரத்தை தேய்த்து சுத்தம் செய்யுங்கள், வெறுமனே கொட்டாதீர்கள்: முட்டைகள் காய்ந்த நிலையில் மாதங்களுக்கு உயிர்வாழும்",
  "மக்கள் மறந்துவிடும் இடங்களைச் சரிபார்க்கவும்: Gutters, Pot செடிகளுக்கு அடியில் உள்ள Trays, வீசப்பட்ட Tyres, தேங்காய் ஓடுகள், பாட்டில் மூடிகள்",
  "நீர் சேமிப்பு தொட்டிகள் மற்றும் பீப்பாய்களை இறுக்கமான மூடியால் அல்லது வலையால் மூடுங்கள்",
  "கொசு பகலில் கடிக்கிறது, எனவே காலையிலும் மாலையிலும் கொசு விரட்டி பயன்படுத்துவது மிக முக்கியம்",
  "கொசு வலைகளும் நீண்ட கை ஆடைகளும் பள்ளி நேரத்திலும் குழந்தைகளைப் பாதுகாக்கும், இரவில் மட்டும் அல்ல",
  "அருகிலுள்ள ஒரு தொற்று பாத்திரம் போதுமானது: அருகில் வசிப்பவர்களுடன் ஒருங்கிணைந்து செயல்படுங்கள்",
];

export const seasonalSection = {
  badge: "தடுப்பு",
  heading: { line1: "டெங்கு தொடங்குவது", line2: "உங்கள் சொந்த", line3: "தோட்டத்திலிருந்தே" },
  body1:
    "டெங்குவைக் கொண்டு செல்லும் கொசு சுத்தமான, அசையாத தண்ணீரில், மக்கள் வசிக்கும் இடத்திற்கு அருகிலேயே இனப்பெருக்கம் செய்கிறது. அது வெகுதூரம் பயணிக்காது. நாங்கள் சிகிச்சை அளிக்கும் ஒவ்வொரு Case உம் ஏறக்குறைய வீடு, பள்ளி அல்லது வேலைக்கு நூறு மீட்டர் தூரத்திற்குள் தொற்றியுள்ளது.",
  body2:
    "வாரத்திற்கு ஒருமுறை இருபது நிமிடங்கள், உங்கள் தோட்டத்தை சுற்றி நடந்து தண்ணீரைக் கொட்டுவது, எந்த Spray ஐ விடவும் அதிகம் செய்யும். முட்டைகள் காய்ந்த நிலையில் மாதங்களுக்கு உயிர்வாழும், எனவே பாத்திரத்தைத் தேய்ப்பதும் கொட்டுவதைப் போலவே முக்கியம்.",
  ctaWarning: "டெங்கு எச்சரிக்கை அறிகுறிகள்",
  ctaFever: "காய்ச்சலை பரிசோதித்துக் கொள்ளுங்கள்",
};
