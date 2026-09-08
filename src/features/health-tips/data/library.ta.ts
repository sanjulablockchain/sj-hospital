// Tamil overlay for library.ts (`#library`: the 24 article summaries, the
// featured card, and the section's own copy).
//
// `CATEGORIES`/`TIP_CATEGORIES` and every `articles[*].tag`/`featured.tag`
// are excluded in content.i18n.test.ts: they are the exact English
// structural value the filter buttons compare against and `categoryCounts()`
// keys its result by, the same never-translate role `groups.ts`'s own
// `GROUPS` plays for `Service.group`. `categoryLabels` below used to carry a
// translated word for each, looked up by `LibrarySection`; the register
// sweep (2026-09-09) emptied it, because the filter chip row is English
// throughout (see docs/superpowers/i18n-register-rule.md's "Filter and
// category chips" row), so every chip now renders the English structural
// value directly.
//
// PHARMACY VOCABULARY (standing ruling): `articles[19].by` ("Pharmacy")
// stays bare English, the same established register word this whole site
// uses (navigationLabels.ta.ts's own "Pharmacy"). This is the ordinary
// "Pharmacy" (the hospital's dispensary, the byline for the antibiotic-
// course article), not the pharmacy counter's Order/Record/File/Stock
// vocabulary, none of which occurs in this file. "Physiotherapy"
// (`articles[20].by` and `articles[22].by`) stays bare English too, the
// same established compound `facilities`, `international-care` and
// `media`'s own overlays and the services feature's own `clinics.ta.ts` all
// keep. Every other `articles[*].by` translates in full (see the sibling
// test note in content.i18n.test.ts's own `KEEPS_ENGLISH`).
//
// CLINICAL FIDELITY / NUMBERS: every dose, reading and duration ("160/100",
// "sixty second", "4 minute read", "day three", "day four") is unchanged
// from the English base, wherever it sits inside a sentence.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const categoryLabels: Record<string, string> = {};

export const articles = [
  {
    by: "அவசர சிகிச்சைக் குழு",
    lede: "டெங்கு பெரும்பாலும் நான்காம் நாள் அளவில் நல்லதாக உணரவைக்கும், அதே நேரத்தில் Platelet எண்ணிக்கை குறையும். அது ஓய்வெடுக்கும் நாள் அல்ல, Check செய்யப்பட வேண்டிய நாள்.",
  },
  {
    by: "சமூக சுகாதாரம்",
    lede: "உங்கள் தோட்டத்தை சுற்றி நடப்பது, தண்ணீர் தேங்கும் எதையும் கொட்டி தேய்ப்பது, எந்த Spray அல்லது Coil ஐ விடவும் சிறந்தது.",
  },
  {
    by: "மருத்துவர்கள்",
    lede: "சந்தேகிக்கப்படும் டெங்கு காய்ச்சலில், Anti-inflammatory வலி நிவாரணிகள் இரத்தப்போக்கு அபாயத்தை அதிகரிக்கும். Paracetamol மற்றும் திரவங்களுடன் நிலைத்திருங்கள்.",
  },
  {
    by: "ஊட்டச்சத்து நிபுணர்",
    lede: "சாதத்தை முழுவதுமாக விட்டுவிட வேண்டியதில்லை. எவ்வளவு, எதனுடன் சாப்பிடுகிறீர்கள், எந்த வரிசையில் சாப்பிடுகிறீர்கள் என்பதை மாற்ற வேண்டும்.",
  },
  {
    by: "காயப்பாடு Clinic",
    lede: "நீரிழிவு நரம்பு சேதம் என்பது வலி இல்லாமலே ஒரு புண் தொடங்கலாம் என்பதாகும். ஒளியின் கீழ் அறுபது வினாடி பார்வை உறுப்பு அகற்றல்களைத் தடுக்கும்.",
  },
  {
    by: "மருத்துவர்கள்",
    lede: "உபவாச சர்க்கரை இன்று காலையைக் காட்டுகிறது. HbA1c கடந்த மூன்று மாதங்களைக் காட்டுகிறது, நீங்கள் மறக்க விரும்பும் நாட்களும் அடங்கும்.",
  },
  {
    by: "மருத்துவர்கள்",
    lede: "பெரும்பாலான மக்கள் 160/100 இலும் முற்றிலும் நலமாக உணர்கின்றனர். அது அறிகுறிகளை ஏற்படுத்தும் நேரத்தில், பொதுவாக அது சேதத்தை ஏற்படுத்தியிருக்கும்.",
  },
  {
    by: "ஊட்டச்சத்து நிபுணர்",
    lede: "உலர் மீன், அப்பளம், Packet Soup, Biscuits மற்றும் ரொட்டி மேசையில் நீங்கள் சேர்க்கும் ஒரு சிட்டிகையை விட அதிக உப்பைக் கொண்டு செல்கின்றன.",
  },
  {
    by: "அவசர சிகிச்சைக் குழு",
    lede: "கூர்மையான பிடிப்பை விட அழுத்தம், தாடை அல்லது கைக்கு பரவுதல், வியர்வை அல்லது மூச்சுத் திணறலுடன். நீங்களே ஓட்ட வேண்டாம்.",
  },
  {
    by: "குழந்தை மருத்துவம்",
    lede: "மூன்று மாதங்களுக்குக் கீழ், எந்த காய்ச்சலும் மருத்துவமனை வருகை. அதற்கு மேல், எண்ணை விட குழந்தை எப்படி நடந்துகொள்கிறது என்பதுதான் முக்கியம்.",
  },
  {
    by: "குழந்தை மருத்துவம்",
    lede: "Nappies குறைவாக நனைதல், அழும்போது கண்ணீர் இல்லாமை, வாய் வறட்சி மற்றும் வழக்கத்திற்கு மாறான தூக்கம். ORS வெறும் தண்ணீரை விட சிறந்தது.",
  },
  {
    by: "குழந்தை மருத்துவம்",
    lede: "மூன்றாவது Centile இல் இருந்து, தன் சொந்த வரியைப் பின்பற்றும் குழந்தை பொதுவாக நலமாக இருக்கும். வரிகளைக் கீழ்நோக்கி கடக்கும் குழந்தை அப்படி அல்ல.",
  },
  {
    by: "தடுப்பூசி Clinic",
    lede: "தவறவிட்ட ஒரு Dose ஐ பிடித்துக்கொள்வது எளிது, ஆனால் எது என்று உங்களுக்குத் தெரிந்தால் மட்டுமே. Card ஐ Photo எடுத்து உங்கள் Phone இல் வைத்திருங்கள்.",
  },
  {
    by: "மருத்துவர்கள்",
    lede: "அதிக Periods, கர்ப்பம் மற்றும் சாதம் அதிகமான உணவு இங்கு இரத்த சோகையை பொதுவானதாக்குகிறது. ஒரு முழு இரத்த எண்ணிக்கை ஒரு நாளில் அதைத் தீர்க்கும்.",
  },
  {
    by: "பெண்கள் ஆரோக்கியம்",
    lede: "மாதத்திற்கு ஒருமுறை, உங்கள் Period க்கு ஒரு வாரம் பிறகு, ஒவ்வொரு Cycle இலும் அதே நேரத்தில். உங்களுக்கு இயல்பானது எப்படி உணரப்படும் என்பதை நீங்கள் கற்றுக்கொள்கிறீர்கள்.",
  },
  {
    by: "பிரசவம்",
    lede: "Neural Tube முதல் மாதத்திலேயே மூடிவிடும், பெரும்பாலும் நீங்கள் கர்ப்பமாக இருப்பதை அறியும் முன். அதனால்தான் அது முன்கூட்டியே தொடங்குகிறது.",
  },
  {
    by: "மருத்துவர்கள்",
    lede: "வலிகளுக்கு தொடர்ந்து Anti-inflammatory Tablets எடுப்பது அமைதியாக சிறுநீரகங்களை சேதப்படுத்தும், குறிப்பாக நீரிழிவு அல்லது அதிக இரத்த அழுத்தத்துடன்.",
  },
  {
    by: "மருத்துவர்கள்",
    lede: "வயல் மற்றும் வெளிப்புற வேலையில் மீண்டும் மீண்டும் ஏற்படும் நீரிழப்பு நாள்பட்ட சிறுநீரக நோயுடன் தொடர்புடையது. தாகம் தாமதமாக வரும்.",
  },
  {
    by: "சிறுநீரகவியல்",
    lede: "சிறுநீரகங்கள் அறிகுறிகள் இல்லாமல் ஆண்டுகளாக செயல்பாட்டை இழக்கும், ஒரு எளிய சிறுநீர் Test வீக்கம் அல்லது சோர்வு வருவதற்கு நீண்ட காலத்திற்கு முன்பே அதைக் கண்டறியும். நீரிழிவு அல்லது அதிக இரத்த அழுத்தத்துடன், அதை ஆண்டுதோறும் கேளுங்கள்.",
  },
  {
    by: "Pharmacy",
    lede: "முன்னதாக நிறுத்துவது கடினமான Bacteria உயிர்வாழ விடும். ஒரு எளிய தொற்று Resistant ஆனதாக மாறுவது இப்படித்தான்.",
  },
  {
    by: "Physiotherapy",
    lede: "இரத்த அழுத்தம், சர்க்கரை மற்றும் Mood க்கு, தினசரி விறுவிறுப்பான நடை விலை உயர்ந்த Gym Membership செய்யும் பெரும்பாலானவற்றைச் செய்யும்.",
  },
  {
    by: "மருத்துவர்கள்",
    lede: "இரவொன்றுக்கு ஆறு மணி நேரத்திற்குக் கீழ் தூங்குவது இரத்த அழுத்தம், பசி மற்றும் இரத்த சர்க்கரையை அமைதியாக, சீராக தவறான திசையில் தள்ளும்.",
  },
  {
    by: "Physiotherapy",
    lede: "ஒவ்வொரு அரை மணி நேரமும் இரண்டு நிமிடங்கள் நின்று நடப்பது, ஒரு Desk நாள் உங்களுக்குச் செய்வதில் ஆச்சரியமான அளவைச் சரிசெய்யும்.",
  },
  {
    by: "ENT அறுவை சிகிச்சை",
    lede: "மெல்லுதல் இலங்கை ஆண்களிடையே வாய்ப் புற்றுநோய்க்கு முதன்மையான காரணம், புகையிலை சேர்க்காமலேயே அது தீங்கு விளைவிக்கும். மூன்று வாரங்களில் குணமாகாத எந்த புண் அல்லது வெள்ளைப் புள்ளியும் பரிசோதிக்கப்பட வேண்டும்.",
  },
];

export const featured = {
  lede: "டெங்குவுக்கு ஒரு கொடிய தன்மை உள்ளது. நான்காம் நாள் அளவில் காய்ச்சல் பெரும்பாலும் குறைந்து மக்கள் நலமாக உணர்கின்றனர், அதுவே சரியாக Plasma கசியத் தொடங்கி Platelet எண்ணிக்கை குறையும் தருணம். நாங்கள் அனுமதிக்கும் ஒவ்வொரு கடுமையான Case உம் வர வேண்டிய நாளில் ஓய்வெடுத்த ஒருவரை உள்ளடக்கியிருக்கும்.",
  by: "அவசர சிகிச்சைக் குழு",
  read: "4 நிமிட வாசிப்பு",
  points: [
    "டெங்கு காலத்தில் எந்த காய்ச்சலுக்கும் மூன்றாம் நாளில் ஒரு முழு இரத்த எண்ணிக்கையைப் பெறுங்கள்",
    "Paracetamol மட்டும், Ibuprofen அல்லது Aspirin ஒருபோதும் வேண்டாம்",
    "நான்காம் நாளில் நலமாக உணர்வது குணமடைவதற்கான ஆதாரம் அல்ல",
    "ஈறு இரத்தப்போக்கு, கருப்பு மலம் அல்லது கடுமையான வயிற்று வலி என்றால் இப்போதே வாருங்கள் என்று அர்த்தம்",
  ],
};

export const featuredKicker = "இங்கிருந்து தொடங்குங்கள்";

export const librarySection = {
  filterAriaLabel: "தலைப்பின் அடிப்படையில் சுகாதார ஆலோசனைகளை Filter செய்யுங்கள்",
  countTemplate: "{total} இல் {shown} கட்டுரைகள்",
};
