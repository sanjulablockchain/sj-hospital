// Tamil for the school wellness page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns and
// clinical, educational or business terms stay in English rather than being
// replaced by a literary coinage nobody says out loud. So "Consent",
// "Report", "Session", "Class", "Classroom", "Hall", "Principal",
// "Coordinator", "Caretaker" and the named clinical conditions and tools
// ("Caries", "Scoliosis", "Fluorosis", "Malocclusion", "Snellen Chart",
// "Otoscopy", "Audiometry") stay in English throughout, and "Check", "Book"
// and "Review" stay verbs exactly like they are in contact's and home-care's
// own content.ta.ts.
//
// "School" is NOT one of those: `navigationLabels.ta.ts` already translates
// "School Wellness" to "பள்ளி நல்வாழ்வு" and "Why school, not clinic" to
// "Clinic அல்ல, பள்ளி ஏன்" for this exact page's own header and footer links,
// so "School" translates to "பள்ளி" here too, the same way "Negombo"
// translates to "நீர்கொழும்பு" elsewhere: keeping it English would leave one
// page disagreeing with its own navigation. `hero.breadcrumbCurrent` and
// `sectionEyebrows.why` reuse those exact strings rather than inventing a
// second translation of the same English phrase.
//
// "Screening" likewise already has a site-wide translation in
// navigationLabels.ta.ts ("The screening" -> "பரிசோதனை", "Screening by age"
// -> "வயது வாரியான பரிசோதனை"), so it is "பரிசோதனை" here rather than an
// English loanword. "By age group" and "Bring us in" are reused verbatim from
// the same file for the same reason.
//
// "Dengue" transliterates to "டெங்கு", the same spelling
// navigationLabels.ta.ts already uses in "வீட்டில் டெங்கு சிகிச்சை". "Grade"
// translates to "தரம்" (a grade number is a fact and stays exactly as
// written: "தரம் 1", never rounded or reworded) and "Katana" and
// "Kochchikade", the two smaller education divisions named alongside
// Negombo, translate to "கட்டானை" and "கொச்சிக்கடை".
//
// `training[1].title` ("Basic Life Support") is the one whole field kept in
// English: it is an internationally standardised course name, the same way
// "CT" and "MRI" stay English throughout this site rather than being coined
// into a Tamil equivalent nobody trains under. See KEEPS_ENGLISH in
// content.i18n.test.ts.
//
// Only translatable copy lives here. Every href, value, glyph, internal flag
// and station numeral stays in content.ts and has exactly one home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const heroFacts = [
  { k: "எங்கே நடக்கிறது", v: "உங்கள் பள்ளியிலேயே, எங்களுடையதில் அல்ல" },
  { k: "பரிசோதனை நாளில்", v: "300 மாணவர்கள் வரை" },
  { k: "ஒவ்வொரு குழந்தையும் செல்வது", v: "முத்திரையிடப்பட்ட Report உடன் வீட்டிற்கு" },
  { k: "இணைந்தது", v: "தேசிய பள்ளி சுகாதாரத்துடன்" },
];

export const tickerItems: readonly string[] = [
  "பார்வையும் செவிப்புலனும்",
  "உயரம், எடை மற்றும் வளர்ச்சி",
  "பல் பரிசோதனை",
  "முதுகுத்தண்டு மற்றும் நிலைப்பாடு",
  "இரத்த சோகை பரிசோதனை",
  "ஆசிரியர்களுக்கு முதலுதவி பயிற்சி",
  "பள்ளி வளாகத்தில் டெங்கு",
];

export const jumpCards = [
  { count: "ஏன் பள்ளி", label: "Clinic அல்ல", note: "தேவைப்படும் குழந்தைகள் ஒருபோதும் வருவதில்லை." },
  { count: "9 மையங்கள்", label: "பரிசோதனை", note: "ஒரு காலை, 300 மாணவர்கள் வரை." },
  { count: "5 குழுக்கள்", label: "வயதுக் குழு வாரியாக", note: "தரம் 1 முதல் மூத்த தரங்கள் வரை." },
  {
    count: "9 பதில்கள்",
    label: "நியாயமான கேள்விகள்",
    note: "Consent, செலவு, தனியுரிமை, பெற்றோருக்கு கிடைப்பது.",
  },
];

export const whyHeading = "மிகவும் தேவைப்படும் குழந்தைகள் ஒருபோதும் மருத்துவமனைக்கு வருவதில்லை";
export const whyBody =
  "ஏதோ தெளிவாக தவறாக இருக்கும்போதுதான் ஒரு குடும்பம் குழந்தையை மருத்துவமனைக்கு அழைத்து வருகிறது. கண்ணாடி தேவைப்படலாம் என்றோ, Haemoglobin குறைவாக இருக்கலாம் என்றோ யாரும் ஒரு குழந்தையை அழைத்து வருவதில்லை. அந்த நிலைமைகள் அமைதியானவை, அவை பொதுவானவை, அவை மௌனமாக ஒரு குழந்தையிடமிருந்து பள்ளி ஆண்டுகளை திருடுகின்றன. அவற்றை கண்டறிய ஒரே வழி எல்லா குழந்தைகளும் ஏற்கனவே இருக்கும் இடத்திற்கே செல்வதுதான்.";

export const whyFindingsLabel = "நாங்கள் பொதுவாக கண்டறிவது";

export const findings: readonly string[] = [
  "பின்னால் அமர்ந்திருக்கும், Board ஐ படிக்க முடியாத குழந்தைகள், யாரும் அவர்களை Test செய்திருக்கவில்லை",
  "சிகிச்சை பெறாத பல் Caries, ஒவ்வொரு வயதிலும் மிகவும் பொதுவான கண்டுபிடிப்பு",
  "குறைந்த Haemoglobin, குறிப்பாக பருவமடையும் பெண்களுக்கு",
  "இயல்பான வரம்பிற்கு வெளியே இரு திசைகளிலும் வளர்ச்சி, ஒரே Classroom இல் எடை குறைவும் பருமனும்",
  "சிகிச்சை பெறாத காது தொற்றுகளால் ஏற்படும் செவித்திறன் இழப்பு, கவனக் குறைவு என்று தவறாக நினைக்கப்படுகிறது",
];

export const screeningHeading = { line1: "ஒன்பது மையங்கள்,", line2: "ஒரு காலை" };
export const screeningIntro =
  "ஒரு Hall இல் அல்லது இரு Classrooms களில் அமைக்கப்படுகிறது. குழந்தைகள் Class குழுக்களாக நகர்கிறார்கள், எனவே எந்த பாடமும் அரை மணி நேரத்திற்கு மேல் இழக்காது.";

export const stations = [
  {
    title: "பார்வை",
    body: "ஆறு மீட்டர் தூரத்தில் Snellen Chart மூலம் இரு கண்களுக்கும் Distance Acuity, Near Vision, Squint மற்றும் நிற பார்வை. Threshold க்கு கீழே இருக்கும் குழந்தை சரியான Refraction க்கு Refer செய்யப்படும்.",
    more: "கண்டறிவது: பின் வரிசைப் பிரச்சனை",
  },
  {
    title: "செவிப்புலன்",
    body: "Whisper மற்றும் Tuning Fork பரிசோதனை, Wax, Perforation மற்றும் Glue Ear ஐ பார்க்க Otoscopy உடன். தேர்ச்சி பெறாத குழந்தைகள் Audiometry க்கு அனுப்பப்படுவார்கள்.",
    more: "கண்டறிவது: தவறாக நினைக்கப்படும் கவனக் குறைவு",
  },
  {
    title: "வளர்ச்சி",
    body: "உயரம், எடை மற்றும் Body Mass Index குழந்தையின் சொந்த Centile Chart இல் Plot செய்யப்படுகிறது, ஒரு எண்ணுக்கு எதிராக மதிப்பிடப்படாது. மூத்த தரங்களில் இடுப்பு அளவிடப்படுகிறது.",
    more: "கண்டறிவது: Stunting மற்றும் பருமன்",
  },
  {
    title: "பல்",
    body: "Caries, Gum Disease, Fluorosis மற்றும் Malocclusion க்கான பரிசோதனை, Fluoride ஆலோசனை மற்றும் Brushing Technique அப்போதே காட்டப்படும்.",
    more: "கண்டறிவது: மிகவும் பொதுவான கண்டுபிடிப்பு",
  },
  {
    title: "இரத்த சோகை",
    body: "பள்ளி கோரினால் Finger Prick மூலம் Haemoglobin, பெற்றோர் Consent உடன். பருவமடையும் பெண்கள் முன்னுரிமைக் குழு.",
    more: "கண்டறிவது: சோர்வான மாணவர்",
  },
  {
    title: "முதுகுத்தண்டு மற்றும் நிலைப்பாடு",
    body: "Scoliosis க்கான Forward Bend Test, மேலும் நிலைப்பாடு, நடை மற்றும் தட்டையான பாதங்கள். வளர்ச்சி Spurt ஆண்டுகளில் கண்டறியப்பட்டால், பெரும்பாலும் சரி செய்யக்கூடியது.",
    more: "கண்டறிவது: Scoliosis, முன்கூட்டியே",
  },
  {
    title: "பொது பரிசோதனை",
    body: "இதய ஒலிகள், மார்பு, Thyroid, Lymph Nodes, தோல் மற்றும் வயிற்றைப் பார்வையிடுதல், அதே Gender ஊழியர் இருக்கும் ஒரு Screen பின்னால்.",
    more: "கண்டறிவது: எதிர்பாராத Murmur",
  },
  {
    title: "தடுப்பூசி பதிவு",
    body: "Immunisation Card தேசிய Schedule உடன் ஒப்பிடப்பட்டு, விடுபட்டவை பெற்றோருக்கு List செய்யப்படும், அருகிலேயே எங்கே Catch Up செய்யலாம் என்பதுடன்.",
    more: "கண்டறிவது: தவறவிட்ட Dose",
  },
  {
    title: "நல்வாழ்வு உரையாடல்",
    body: "மூத்த தரங்களில் தூக்கம், Screens, மனநிலை, Bullying மற்றும் தேர்வு அழுத்தம் பற்றிய குறுகிய தனிப்பட்ட உரையாடல். விருப்பப்படி மட்டும், ஆசிரியர்களுக்கு ஒருபோதும் Report செய்யப்படாது.",
    more: "கண்டறிவது: யாரும் கேட்காதது",
  },
];

export const gradeBandsHeading = { line1: "வெவ்வேறு", line2: "வயது, வெவ்வேறு", line3: "கவலைகள்" };
export const gradeBandsIntro =
  "தேசிய பள்ளி சுகாதார திட்டம் தரம் 1, 4, 7 மற்றும் 10 இல் கவனம் செலுத்துகிறது. நாங்கள் அந்த தாளத்தையே பின்பற்றி, பள்ளி கேட்பதையும் சேர்க்கிறோம்.";

export const gradeBands = [
  {
    band: "தரம் 1",
    title: "முதல் சரியான பார்வை",
    body: "பல குழந்தைகளுக்கு குழந்தைப் பருவத்திற்குப் பிறகு இது முதல் சுகாதார பரிசோதனை. பார்வையும் செவிப்புலனும் இங்கே மிக முக்கியம், ஏனெனில் முதல் ஆண்டில் ஆசிரியரைப் பார்க்கவோ கேட்கவோ முடியாத குழந்தை பின்னர் அரிதாகவே சரிசெய்கிறது. வளர்ச்சி, பற்கள் மற்றும் தடுப்பூசி Card Check செய்யப்படும், குழந்தைப் பருவத்தில் தவறவிடப்பட்ட Congenital பிரச்சனை இந்த Station இல் பெரும்பாலும் வெளிப்படும்.",
  },
  {
    band: "தரம் 4",
    title: "பழக்கங்கள் வேரூன்றும் காலம்",
    body: "பல் Caries மற்றும் எடை தான் இந்த வயதில் கதை. இப்போது உருவாகும் உணவு மற்றும் செயல்பாட்டு முறைகள் பெரும்பாலும் தொடர்கின்றன, பெற்றோருடன் ஊட்டச்சத்து பற்றிய உரையாடல் இன்னும் எதையாவது மாற்றும் தருணமும் இதுவே. ஏழு முதல் பத்து வயதிற்குள் பொதுவாக குறுகிய பார்வைக் குறைபாடு தோன்றுவதால் பார்வை மீண்டும் Check செய்யப்படும்.",
  },
  {
    band: "தரம் 7",
    title: "வளர்ச்சி Spurt",
    body: "Scoliosis பரிசோதனை இந்த குழுவில் மிக முக்கியம், ஏனெனில் வளர்ச்சி Spurt காலத்தில் காணப்படும் ஒரு வளைவை பெரும்பாலும் அறுவை சிகிச்சை இல்லாமல் Bracing மூலமே கையாளலாம். இரத்த சோகை பரிசோதனை தீவிரமாக தொடங்குகிறது, மாதவிடாய் சுகாதாரம் பற்றியும் பெண்களுடன் அவர்களுக்கென்றே தனி Session இல் பேசப்படுகிறது.",
  },
  {
    band: "தரம் 10",
    title: "தேர்வு ஆண்டு அழுத்தம்",
    body: "உடல் ரீதியாக இந்த குழு எளிமையானது. எளிமையாக இல்லாதது தூக்கம், Stress, மேசையில் நீண்ட நேரம் அமர்வதால் ஏற்படும் நிலைப்பாடு, கண் சோர்வு, மற்றும் சில மாணவர்களுக்கு Tobacco அல்லது Alcohol முதன்முறையாக பயன்படுத்துவது. நல்வாழ்வு உரையாடல் இங்கே எந்த அளவீட்டையும் விட அதிக முக்கியத்துவம் பெறுகிறது.",
  },
  {
    band: "விளையாட்டு அணிகள்",
    title: "Season தொடங்குவதற்கு முன்",
    body: "பள்ளி அணியில் உள்ள எந்த மாணவருக்கும் Pre Participation Check: இதய ஒலிகள் மற்றும் தாளம், இரத்த அழுத்தம், சோர்வின்போது Fainting அல்லது மார்பு வலி History, முந்தைய காயங்கள் மற்றும் Joint Stability. இளம் விளையாட்டு வீரர்களுக்கு திடீர் இதய நிகழ்வுகள் அரிது, அரிதான Case கண்டறியப்படுவது இப்படித்தான்.",
  },
];

export const teacherHeading = { line1: "முதலில் அங்கே", line2: "இருப்பவர்களுக்கு", line3: "பயிற்சி அளியுங்கள்" };
export const teacherIntro =
  "ஒரு செவ்வாய்க்கிழமை மதியம் ஒரு குழந்தை மயங்கி விழுந்தால், அருகில் மண்டியிடுபவர் ஒரு ஆசிரியர். இந்த Sessions திட்டத்தில் உள்ள பள்ளிகளுக்கு இலவசமாக நடத்தப்படுகின்றன.";

export const training = [
  {
    kicker: "அரை நாள்",
    title: "ஆசிரியர்களுக்கு முதலுதவி",
    body: "இரத்தப்போக்கு, தீக்காயங்கள், எலும்பு முறிவுகள், மூச்சுத் திணறல், Seizures மற்றும் Fainting, விரிவுரை செய்வதற்குப் பதிலாக நடைமுறையில் பயிற்சி அளிக்கப்படுகிறது. ஒவ்வொரு Participant உம் Scenario ஐ தானே கையாள்கிறார்.",
    more: "அனைத்து ஆசிரியர் Staff",
  },
  {
    // Kept in English: an internationally standardised course name, the same
    // way CT and MRI stay English throughout this site. See the file header
    // and KEEPS_ENGLISH in content.i18n.test.ts.
    kicker: "இரண்டு மணி நேரம்",
    title: "Basic Life Support",
    body: "ஒரு Manikin இல் Chest Compressions மற்றும் Rescue Breathing, மேலும் Ambulance வாசலுக்கு வரும் வரை ஒரு Emergency ஐ கையாளும் விதம்.",
    more: "Sports மற்றும் Science Staff",
  },
  {
    kicker: "இரண்டு மணி நேரம்",
    title: "உடல்நிலை சரியில்லாத குழந்தை",
    body: "Sick Room இல் படுத்திருப்பதற்குப் பதிலாக இன்று மருத்துவமனை தேவைப்படும் குழந்தையை அடையாளம் காணுதல். Asthma Attacks, Dehydration, High Fever, Allergic Reactions.",
    more: "Class ஆசிரியர்கள், Matrons",
  },
  {
    kicker: "ஒரு மணி நேரம்",
    // "நோயாளர் அறை" ("patient room"), not the longer "நோய்வாய்ப்பட்டோர்
    // அறை": the longer compound overflowed this tile's title column by 9px
    // at 1280px, the whitespace-nowrap-adjacent trap Step E measures for
    // rather than guesses at.
    title: "நோயாளர் அறை Review",
    body: "உங்கள் Sick Room Stock, Expiry Dates மற்றும் பதிவுகளை நாங்கள் Review செய்து, என்ன இல்லை, அருகிலேயே எங்கே வாங்கலாம் என்று எழுதப்பட்ட List ஐ விட்டுச் செல்கிறோம்.",
    more: "அதை நடத்தும் யாரும்",
  },
];

export const dengueHeading = { line1: "டெங்கு ஒரு", line2: "பள்ளி பிரச்சனை" };
export const dengueIntro =
  "கொசு பகலில் கடிக்கிறது, அதாவது குழந்தைகள் பள்ளியில் கடிக்கப்படுகிறார்கள், வீட்டில் படுக்கையில் அல்ல. Corridor இல் ஒரு Pot அடியில் உள்ள ஒரு Tray அல்லது அடைபட்ட ஒரு Gutter ஒரு முழு Class க்கும் போதுமானது.";
export const dengueNote =
  "உங்கள் Caretaker உடன் நாங்கள் வளாகத்தில் நடந்து, இனப்பெருக்க இடங்களை ஒரு Plan இல் குறித்து, நாங்கள் இல்லாமலேயே உங்கள் சொந்த Staff வாராந்திரம் மீண்டும் செய்யக்கூடிய ஒரு Checklist ஐ கையளிக்கிறோம்.";
export const dengueFindingsLabel = "நாங்கள் பொதுவாக கண்டறியும் இடங்கள்";

export const breedingSites: readonly string[] = [
  "பருவமழைக்குப் பிறகு இலைகளால் அடைபட்ட கூரை Gutters",
  "Corridors மற்றும் அலுவலகத்தில் Pot செடிகளுக்கு அடியில் உள்ள Trays",
  "Sports Store பின்னால் வீசப்பட்ட Tyres",
  "மூடப்படாத நீர் சேமிப்பு பீப்பாய்கள் மற்றும் மேல்நிலை Tanks",
  "அரிதாக பயன்படுத்தப்படும் Toilet Blocks இல் அடைபட்ட தரை வடிகால்கள்",
  "குப்பை குவியல்களில் பாட்டில்கள், கோப்பைகள் மற்றும் மதிய உணவு Containers",
  "எல்லையில் தேங்காய் ஓடுகள் மற்றும் மரக் குற்றிகள்",
  "Caretaker இன் Store இல் பயன்படுத்தப்படாத Tanks, வாளிகள் மற்றும் பேசின்கள்",
  "விடப்பட்டிருக்கும் கட்டுமான Debris மற்றும் Cement கலக்கும் Trays",
];

export const followUpHeading = {
  line1: "Report இல்",
  line2: "முடியும்",
  line3: "பரிசோதனை",
  line4: "பாதி மட்டுமே",
};
export const followUpIntro =
  "முக்கியமானது Data அல்ல. முக்கியமானது குறைந்த Haemoglobin உள்ள குழந்தை உண்மையில் Treatment பெறுவதுதான். Flag செய்யப்பட்ட ஒவ்வொரு குழந்தையும் ஏதாவது நடக்கும் வரை Track செய்யப்படும்.";
export const followUpCta = "Coordinator உடன் பேசுங்கள்";

export const followUp = [
  {
    when: "அன்றே",
    what: "அவசர கவனிப்பு தேவைப்படும் குழந்தை நாங்கள் புறப்படுவதற்கு முன் அடையாளம் காணப்படும், பெற்றோருக்கு அன்று மதியமே ஒரு Note அனுப்புவதற்குப் பதிலாக Call செய்யப்படும்.",
  },
  {
    when: "10 நாட்களுக்குள்",
    what: "ஒவ்வொரு குழந்தையும் பெற்றோரின் மொழியில் முத்திரையிடப்பட்ட தனிப்பட்ட Report உடன் வீடு செல்கிறது, என்ன கண்டறியப்பட்டது மற்றும் அடுத்து சரியாக என்ன செய்ய வேண்டும் என்று குறிப்பிடுகிறது.",
  },
  {
    when: "10 நாட்களுக்குள்",
    what: "Principal க்கு தனிப்பட்ட பெயர்கள் இல்லாத Aggregate Report கிடைக்கும்: எத்தனை பேர் பரிசோதிக்கப்பட்டனர், எந்த சதவீதத்திற்கு ஒவ்வொரு கண்டுபிடிப்பும் இருந்தது என்பது.",
  },
  {
    when: "இரண்டு வாரங்களில்",
    what: "Flag செய்யப்பட்ட ஒவ்வொரு குழந்தையின் பெற்றோருக்கும் Coordinator Call செய்து Referral புரிந்துகொள்ளப்பட்டதா என Check செய்து, Appointment Book செய்ய உதவுகிறார்.",
  },
  {
    when: "ஆறு வாரங்களில்",
    what: "இன்னும் எதுவும் செய்யாதவர்களுக்கு இரண்டாவது Call. பெரும்பாலான திட்டங்கள் தவிர்க்கும் Step இதுவே, பரிசோதனை மதிப்புள்ளதா என்று தீர்மானிக்கும் Step உம் இதுவே.",
  },
  {
    when: "அடுத்த Term இல்",
    what: "Flag செய்யப்பட்ட குழந்தைகள் பள்ளியிலேயே மீண்டும் Check செய்யப்படுவார்கள், அதனால் ஒருபோதும் Fill செய்யப்படாத கண்ணாடி Prescription ஒரு File க்குள் மறைந்துவிடாது.",
  },
];

export const faqHeading = { line1: "எங்களிடம் கேட்க", line2: "நியாயமான கேள்விகள்" };

export const faq = [
  {
    q: "இது அரசாங்க பள்ளி மருத்துவ பரிசோதனைக்கு மாற்றாகுமா?",
    a: "இல்லை, பெற்றோருக்கு அப்படி Present செய்யவும் கூடாது. உங்கள் பகுதியின் Medical Officer of Health மற்றும் Public Health Midwife மூலம் நடத்தப்படும் Ministry of Health பள்ளி மருத்துவ பரிசோதனை, இன்னும் Statutory திட்டமாக உள்ளது, நாங்கள் அதனுடன் இணைந்து வேலை செய்கிறோம். நாங்கள் சேர்ப்பது தேசிய திட்டம் Cover செய்யாத ஆண்டுகளில் ஒரு Second Pass, ஏதேனும் கண்டறியப்பட்டால் ஒரு Specialist க்கு விரைவான வழி, மற்றும் ஒரு Routine Inspection க்கு நேரம் இல்லாத சில விஷயங்களுக்கு பரிசோதனை.",
  },
  {
    q: "இது பள்ளிக்கு எவ்வளவு செலவாகும்?",
    a: "பரிசோதனை நாள் மற்றும் ஆசிரியர் பயிற்சி Sessions மருத்துவமனையின் Community திட்டத்தின் ஒரு பகுதியாக நீர்கொழும்பு, கட்டானை மற்றும் கொச்சிக்கடை கல்விப் பிரிவுகளில் உள்ள அரசாங்க பள்ளிகளுக்கு இலவசமாக வழங்கப்படுகிறது. Private மற்றும் International பள்ளிகளுக்கு ஒரு மாணவருக்கு Publish செய்யப்பட்ட Rate இல் Charge செய்யப்படும். ஒரு குழந்தைக்கு Onward Treatment தேவைப்பட்டால், அது வழக்கம் போல் Bill செய்யப்படும், பரிசோதனைக்கு நிபந்தனையாக எந்த குடும்பமும் இந்த மருத்துவமனையின் Treatment க்கு ஒருபோதும் கட்டுப்படுத்தப்படாது.",
  },
  {
    q: "பெற்றோர் Consent தேவையா?",
    a: "ஆம், எழுத்துப்பூர்வமாக, நாளுக்கு முன். சரியாக என்ன Check செய்யப்படுகிறது, இரத்த சோகை பரிசோதனை கோரப்பட்டால் ஒரு Finger Prick Blood Sample உம் அடங்கும் என்று விளக்கும் Sinhala, Tamil மற்றும் English Consent Form ஐ நாங்கள் வழங்குகிறோம். பெற்றோர் Consent கொடுக்காத, அல்லது அன்று Examine செய்யப்பட விரும்பாத எந்த குழந்தையும் Examine செய்யப்படாது. யாரும் தனியாக சுட்டிக்காட்டப்படுவதில்லை.",
  },
  {
    q: "ஒரு குழந்தை தனியாக Examine செய்யப்படுமா?",
    a: "பார்வை, செவிப்புலன் மற்றும் பல் Stations Open Hall இல் நடக்கும். பொது பரிசோதனை, மற்றும் முதுகுத்தண்டைப் பார்க்க Shirt ஐ தூக்க வேண்டிய எதுவும், அதே Gender ஊழியர் இருக்கும் ஒரு Screen பின்னால் நடக்கும். பருவமடையும் வயதினருக்கு Room இல் இருக்க மாணவர்கள் நம்பும் ஒரு ஆசிரியரை Nominate செய்ய பள்ளியிடம் கேட்கிறோம். இது எங்கள் தரப்பில் Negotiable அல்ல.",
  },
  {
    q: "பெற்றோருக்கு உண்மையில் என்ன கிடைக்கும்?",
    a: "பத்து நாட்களுக்குள் குழந்தையுடன் வீட்டிற்கு அனுப்பப்படும் முத்திரையிடப்பட்ட தனிப்பட்ட Report, பெற்றோர் விரும்பும் மொழியில் எளிமையாக எழுதப்பட்டது. என்ன Check செய்யப்பட்டது, என்ன Normal, என்ன இல்லை, அடுத்து சரியாக என்ன செய்ய வேண்டும் என்பது அதில் உள்ளது. Referral தேவைப்படும் இடத்தில் Report Clinic இன் பெயரையும் Call செய்ய Number ஐயும் தருகிறது, மருத்துவரைப் பார்க்கும்படி பெற்றோருக்கு தெளிவின்றி சொல்வதற்குப் பதிலாக.",
  },
  {
    q: "பள்ளிக்கு தனிப்பட்ட முடிவுகள் தெரியுமா?",
    a: "Principal க்கு கிடைப்பது Aggregate Report: எத்தனை பேர் பரிசோதிக்கப்பட்டனர், எந்த சதவீதத்திற்கு குறைந்த பார்வை, பல் Caries, குறைந்த Haemoglobin, இயல்பான வரம்பிற்கு வெளியே வளர்ச்சி இருந்தது என்பது. தனிப்பட்ட Clinical கண்டுபிடிப்புகள் பெற்றோருக்குச் செல்கின்றன, Staff Room க்கு அல்ல. விதிவிலக்கு, பெற்றோர் Consent உடன், முன்னால் அமர வேண்டிய குழந்தை அல்லது புதிதாக Asthma Diagnose செய்யப்பட்ட குழந்தை போன்று, பள்ளி தினமும் Manage செய்ய வேண்டிய ஒரு நிலைமையாக இருந்தால் மட்டுமே.",
  },
  {
    q: "ஒரு பரிசோதனை நாள் எவ்வளவு நேரம் எடுக்கும்?",
    a: "ஒன்பது Stations ஓடும்போது சுமார் 300 மாணவர்கள் வரை ஒரு காலை. பெரிய பள்ளிகள் இரண்டு அல்லது மூன்று நாட்களாக பிரிக்கப்படும், பொதுவாக ஒரு நாளுக்கு ஒரு தர குழு. எங்களுக்கு ஒரு Hall அல்லது அருகில் உள்ள இரண்டு Classrooms, Tables, நாற்காலிகள், ஒரு Power Point மற்றும் Screen செய்யக்கூடிய ஒரு Corner தேவை. முதல் Class வரும் வரை Setup க்கு சுமார் நாற்பத்தைந்து நிமிடங்கள் ஆகும்.",
  },
  {
    q: "கண்ணாடி தேவைப்பட்டும் Afford செய்ய முடியாத குழந்தைகளுக்கு என்ன செய்வது?",
    a: "இது மிகவும் பொதுவான இடைவெளி, தீர்ப்பதற்கு மிகவும் மதிப்புள்ளது, ஏனெனில் முழு திட்டத்திலும் மிக மலிவான Intervention ஒரு ஜோடி கண்ணாடிதான், பள்ளி Report Card ஐ மாற்றுவதும் அதுவே. செலவை ஈடுசெய்ய முடியாத குடும்பங்களின் குழந்தைகளுக்காக எங்கள் Optical Partner உடன் ஒரு சிறிய நிதியை நாங்கள் பராமரிக்கிறோம், Principal இன் பரிந்துரையின் பேரில் பள்ளி மூலம் ஒதுக்கப்படுகிறது, குழந்தை அவர்களின் Class க்கு அடையாளம் காணப்படாமல்.",
  },
  {
    q: "மாணவர்களுக்கு ஒரு Health Education Session க்கு உதவ முடியுமா?",
    a: "ஆம், பள்ளிகள் அதிகம் Ask செய்யும் பகுதி இதுவே. Sessions ஒரு Period ஓடுகின்றன, வயதுக்கு ஏற்ப Pitch செய்யப்படுகின்றன: Primary Grades க்கு கை கழுவுதல் மற்றும் பல் பராமரிப்பு, Middle School இல் டெங்கு மற்றும் ஊட்டச்சத்து, மூத்த தரங்களுக்கு பருவமடையும் வயது சுகாதாரம், Screen Time, தூக்கம் மற்றும் Substance Awareness. அதே மாலையில் பெற்றோருக்கு தனி Session ஒன்று நீங்கள் நினைப்பதை விட சிறந்த Turnout ஐ பொதுவாக பெறுகிறது.",
  },
];

export const contactRows = [
  { label: "மருத்துவமனைக்கு Call செய்யுங்கள்" },
  { label: "மருத்துவமனைக்கு Email செய்யுங்கள்" },
  { label: "எங்களுக்கு WhatsApp செய்யுங்கள்" },
  { label: "பெற்றோருக்கு Health Tips" },
];

export const bookingChecklist: readonly string[] = [
  "மாணவர் எண்ணிக்கை",
  "சேர்க்க வேண்டிய தரங்கள்",
  "ஒரு Hall அல்லது இரண்டு Classrooms",
  "Term தேதிகள்",
];

export const disclaimer =
  "பள்ளி பரிசோதனை Ministry of Health பள்ளி மருத்துவ பரிசோதனை மற்றும் உங்கள் Division இன் Public Health Midwife மற்றும் Medical Officer of Health சேவைகளையும் Complement செய்கிறது, மாற்றாக இல்லை. கண்டுபிடிப்புகள் பள்ளியுடனும் பெற்றோருடனும் Share செய்யப்படுகின்றன; மேலதிக அறிவிப்பு பள்ளியின் சொந்த பகுதி MOH உடன் உள்ள ஏற்பாடுகளைப் பின்பற்றுகிறது.";

export const hero = {
  strapline: "நாங்கள் பள்ளிக்கு வருகிறோம்",
  breadcrumbHome: "முகப்பு",
  // Reused verbatim from navigationLabels.ta.ts's "School Wellness" ->
  // "பள்ளி நல்வாழ்வு": this page's own header and footer already print that
  // translation, so the breadcrumb has to agree with it.
  breadcrumbCurrent: "பள்ளி நல்வாழ்வு",
  headingLead: "பிரச்சனை",
  headingOutline: "யாரும்",
  // Shorter synonym than a literal "கவனிக்கவில்லை" ("did not notice"): that
  // word alone is wider than a 360px column at this heading's font size, and
  // wrap-break-word split it mid-word ("கவனிக்கவில்" / "லை.") rather than
  // wrapping it as a whole word. "கண்டதில்லை" ("never found/discovered")
  // carries the same meaning here and is short enough to sit on its own line.
  headingAccent: "கண்டதில்லை.",
  bookCta: "எங்களை உங்கள் பள்ளிக்கு அழையுங்கள்",
  // Short deliberately: this sits inside a whitespace-nowrap pill at 360px
  // (see WellnessHero.tsx), the same trap that cost e-channeling's
  // helpRail.heading a rewrite. A one-line punchy phrase, not the full
  // English sentence.
  exploreCta: "பரிசோதனையில் என்ன",
};

export const heroStandfirst =
  "Board ஐ படிக்க முடியாத குழந்தை மந்தமானவன் அல்ல. வகுப்பில் தூங்கும் குழந்தைக்கு இரத்த சோகை இருக்கலாம். எங்கள் குழு உங்கள் பள்ளிக்கு வந்து, ஒவ்வொரு மாணவரையும் பரிசோதித்து, யாருக்கு மருத்துவர் தேவை என்று உங்களுக்குச் சொல்கிறது.";

// "குழந்தை", not "குழந்தையும்": the fuller form is a single token wider than
// a 360px column at this heading's font size, and wrap-break-word split it
// mid-word rather than wrapping it whole.
//
// line3 was previously shortened to "பார்வை." ("a look."), a noun that
// does not carry the sense of a clinical exam the English "seen." and the
// Sinhala "පරීක්ෂා කරනවා." ("examines.") both make; a reviewer caught this
// as a meaning change, not a register choice, on a children's health page.
// "பரிசோதிக்கப்படும்." ("will be examined/screened.") is the correct sense,
// but measured 407.5px against this heading's 232px column at 360px: wider
// than every shorter alternative tried and measured here (all still too
// wide to hold as one line at 360px): "சோதிக்கப்படும்." 335.1px, "பரிசோதிக்
// கப்பட்டது." 436.8px, "பரிசோதிப்பு." 272.2px, "பரிசோதனை." 310.2px, and the
// noun-only "சோதனை." at 237.9px, which still overflows the 232px column by
// ~6px and, worse, alone (without the "பரி" that ties it to "examination")
// reads more like "trial/ordeal" than "clinical exam" in everyday Tamil, so
// it is not a safe substitute either. No verb or verbal noun that keeps
// the clinical sense fits on one line, so this is a layout problem, not a
// word problem: the full verb is kept, and wrap-break-word is left to wrap
// it across two lines.
//
// Measured (not guessed) where it actually breaks, at both widths, because
// a forced break point (a zero-width space) turned out to be unnecessary:
// the browser's own line-breaking already refuses to split inside a
// grapheme cluster (CSS Text: overflow-wrap must not break a character
// sequence that forms a single grapheme cluster), so it lands on a clean
// syllable boundary on its own, confirmed against the real rendered DOM,
// not a synthetic off-screen probe (an isolated probe estimated a
// different, wrong split point; only the in-context measurement below is
// trustworthy). At 360px it breaks as "பரிசோதி" (203.3px) / "க்கப்படும்."
// (204.2px), both under the 232px column. At 1280px, where the font is
// much larger (64px vs. 36px) but the column is wider too, it breaks
// later, as "பரிசோதிக்கப்படு" (552.3px) / "ம்." (68.7px), both under that
// width's 597px column; "ம்." (m + virama) is a complete grapheme, not a
// severed vowel sign, so the short trailing line is a plain word-wrap, not
// a glyph split. Confirmed by screenshot at both widths, not just by these
// measurements.
export const bookHeading = {
  line1: "ஒரு காலை.",
  line2: "ஒவ்வொரு குழந்தை",
  line3: "பரிசோதிக்கப்படும்.",
};
export const bookIntro =
  "உங்கள் மாணவர் எண்ணிக்கை மற்றும் ஏற்ற Term தேதிகளை எங்களுக்குச் சொல்லுங்கள். நாங்கள் முதலில் வந்து Hall ஐ பார்த்து, பின்னர் ஒரு தேதியை உறுதி செய்கிறோம். நீர்கொழும்பு, கட்டானை மற்றும் கொச்சிக்கடை பிரிவுகளில் உள்ள பள்ளிகள் எங்கள் முன்னுரிமை.";

// Every value below is reused verbatim from navigationLabels.ta.ts where that
// file already translates the same English phrase for this page's own header
// and footer links ("Why school, not clinic", "The screening", "By age
// group", "Bring us in"): see the file header. `faq`'s own "Principal" stays
// an English loanword throughout its body copy, so the eyebrow matches rather
// than switching to the formal "அதிபர்" only here.
export const sectionEyebrows = {
  why: "01 / Clinic அல்ல, பள்ளி ஏன்",
  programme: "02 / பரிசோதனை",
  grades: "03 / வயதுக் குழு வாரியாக",
  teachers: "04 / ஆசிரியர் அறைக்காக",
  dengue: "05 / பள்ளி வளாகம்",
  referral: "06 / பரிசோதனைக்குப் பிறகு",
  faq: "07 / Principal களுக்கும் பெற்றோர்களுக்கும்",
  book: "08 / எங்களை அழையுங்கள்",
};
