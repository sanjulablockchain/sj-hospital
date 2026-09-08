// Tamil for the media page.
//
// Same code-mixed register as contact's, facilities' and every other page's
// own content.ta.ts: the sentence is Tamil, everyday English nouns and
// site-wide terms stay in English rather than being replaced by a literary
// coinage nobody says out loud.
//
// "Logo" stays in English throughout, the same way the nav dictionary's own
// "Press kit and logos" -> "பத்திரிகைக் கருவி மற்றும் Logo" keeps it.
// "Communications" stays in English as the shorthand for the press desk's
// own department inside a sentence (`pressIntro`, `spokespeopleIntro1`,
// `rules[0].a`, `rules[6].a`), the same register that keeps "Reception" and
// "OPD" in English elsewhere on the site.
//
// The register sweep (2026-09-09) deleted `hero` entirely, every
// `sectionEyebrows` entry, every `jumpCards[*].label`, `enquiryKitCta` and
// `enquiryInterviewCta`, every `desk[*].title`/`news[*].title`/
// `featured.title`/`gallery[*].title` (card titles, the policy's own naming
// for them; this also supersedes the file's former "quoted material, kept
// English" framing for `news[*].title`/`featured.title`, since those paths
// now render from the base regardless of locale rather than being an
// overlay decision at all) and `gallery[*].tag` (ruling 2 in
// docs/superpowers/i18n-register-rule.md: a display chip of the same kind
// as a filter chip). Everything around a former quotation, the framing and
// the descriptions, is untouched and still translates: every `news[*].lede`,
// `featured.lede` and `featured.type`.
//
// `newsCategories` and `news[*].tag` are excluded from parity entirely
// (content.i18n.test.ts): they are the structural category identity
// `NewsroomSection`'s own filter state and `===` comparisons key off, not
// copy, the same role `.glyph` plays elsewhere. `categoryLabels` right next
// to them used to carry the six translated words a reader actually sees for
// the same six categories; the sweep emptied it too, since the filter chip
// row is English throughout (the same "Filter and category chips" rule row
// as `library.ta.ts`'s own `categoryLabels` in health-tips).
//
// Only translatable copy lives here. Every href, image path, alt text, file
// format, date and structural category key stays in content.ts and has
// exactly one home.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {};

export const sectionEyebrows = {};

export const tickerItems: readonly string[] = [
  "பத்திரிக்கை அறிக்கைகள்",
  "நிபுணர் நேர்காணல்கள்",
  "Logo மற்றும் Brand கோப்புகள்",
  "வளாகத்தில் படமாக்கல்",
  "சமூக மற்றும் CSR திட்டங்கள்",
  "விருதுகள் மற்றும் Accreditation",
];

export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const categoryLabels = {};

export const newsroomCopy = {
  itemsCountTemplate: "{total} உருப்படிகளில் {shown}",
  forJournalists: "பத்திரிகையாளர்களுக்கு",
};

export const featured = {
  kickerDate: "ஆகஸ்ட் 2026",
  lede: "தனித்தனி Procedure அறைகள் இரண்டும் தனி Recovery Bay ஒன்றும், Gastroscopy மற்றும் Colonoscopy நோய் கண்டறிதலுக்கான காத்திருப்பு நேரத்தை ஒரு வாரத்திற்கும் குறைவாக ஆக்குகிறது. Suite ஆறு நாட்கள் இயங்குகிறது, Sedation ஐ Anaesthetic குழு கையாளுகிறது, Procedure நடைபெறும் போது எடுக்கப்படும் Biopsy க்கு அதே நாளில் அறிக்கை.",
  date: "14 ஆகஸ்ட் 2026",
  type: "பத்திரிக்கை அறிக்கை",
  points: [
    "முழு அறிக்கை, புகைப்படங்கள் மற்றும் Floor Plan கோரிக்கை மேல் கிடைக்கும்",
    "நேர்காணலுக்கு Consultant Gastroenterologist கிடைக்கிறார்",
    "Procedure நேரத்திற்கு வெளியே Suite இல் படமாக்கல் அனுமதிக்கப்படுகிறது",
    "எந்த Resolution இலும் நோயாளர் படங்கள் வெளியிடப்படாது",
  ],
};

export const news = [
  {
    date: "ஆகஸ்ட் 2026",
    lede: "தனித்தனி Procedure அறைகள் இரண்டும் தனி Recovery Bay ஒன்றும், Gastroscopy மற்றும் Colonoscopy காத்திருப்பு நேரத்தை ஒரு வாரத்திற்கும் குறைவாக ஆக்குகிறது.",
  },
  {
    date: "ஜூலை 2026",
    lede: "OPD நுழைவாயிலுக்கு அருகிலுள்ள Dispensary Counter இப்போது இரவு முழுவதும் திறந்திருக்கும், Discharge Prescription காலையை எதிர்பார்த்திருக்க தேவையில்லை.",
  },
  {
    date: "ஜூலை 2026",
    lede: "பொது அறுவை சிகிச்சைப் பிரிவு தனது ஆயிரவது Keyhole Cholecystectomy ஐ முடித்தது, சராசரி அறுவை சிகிச்சைக்கு பிந்தைய தங்குதல் இரண்டு இரவுகள்.",
  },
  {
    date: "ஜூன் 2026",
    lede: "Vascular மற்றும் Podiatry உடன் இணைந்த வாராந்திர Clinic, குணமடையாத புண்கள் உள்ள நோயாளர்களின் பரிந்துரை முறையை மாற்றியுள்ளது.",
  },
  {
    date: "மே 2026",
    lede: "இதய படமெடுத்தல் இப்போது அவசர பிரிவில் இரவிலும் கிடைக்கும், அடுத்த வேலை நாள் காலையை எதிர்பார்த்திருப்பதற்கு பதிலாக.",
  },
  {
    date: "ஆகஸ்ட் 2026",
    lede: "நீர்கொழும்பு மற்றும் காத்தான கல்விப் பகுதிகள் முழுவதும் பள்ளி மாணவர்களுக்கு பார்வை, செவிப்புலன், பல் மற்றும் வளர்ச்சி பரிசோதனை, பள்ளிக்கு இலவசமாக.",
  },
  {
    date: "ஜூலை 2026",
    lede: "Monsoon உச்சத்திற்கு முன், வீடு பரிசோதனைக் குழுக்கள் மற்றும் ஆறு வார்டுகள் முழுவதும் கொள்கலன் அகற்றும் பிரச்சாரம்.",
  },
  {
    date: "ஜூன் 2026",
    lede: "இரண்டு வார இறுதிகளில் தொள்ளாயிரம் பேர் பரிசோதிக்கப்பட்டனர், ஐந்தில் ஒரு பங்கினர் தங்கள் முடிவுகள் பற்றிய முதல் சரியான ஆலோசனைக்காக பரிந்துரைக்கப்பட்டனர்.",
  },
  {
    date: "ஏப்ரல் 2026",
    lede: "St. Mary's பங்கு சபையுடன் இணைந்த பிரச்சாரம் மருத்துவமனை மற்றும் தேசிய இரத்தமாறுதல் சேவைக்காக யூனிட்களை சேகரித்தது.",
  },
  {
    date: "ஜூன் 2026",
    lede: "தொற்று கட்டுப்பாட்டுக் குழு, கை சுகாதாரம் மற்றும் அறுவை சிகிச்சை இட தொற்று கண்காணிப்புக்காக அங்கீகரிக்கப்பட்டது.",
  },
  {
    date: "மார்ச் 2026",
    lede: "தீவிர சிகிச்சை Nursing குழு நோயாளர் பாதுகாப்பு நடைமுறை மற்றும் குடும்ப தொடர்பாடலுக்காக தேசிய விருதைப் பெற்றது.",
  },
  {
    date: "செப்டம்பர் 2026",
    lede: "முதன்மை Lobby இல் இலவச அபாய மதிப்பீடு, இரத்த அழுத்தம் மற்றும் Lipid பரிசோதனைகள், நாள் முழுவதும் இதயநோய் நிபுணர்களுடன்.",
  },
  {
    date: "ஆகஸ்ட் 2026",
    lede: "பிரசவம், பாலூட்டல், புதிதாகப் பிறந்த குழந்தை பராமரிப்பு மற்றும் வீட்டில் முதல் ஆறு வாரங்களை உள்ளடக்கிய, எதிர்பார்க்கும் பெற்றோர்களுக்கான ஆறு வார பாடநெறி.",
  },
  {
    date: "மே 2026",
    lede: "நாற்பது Nursing அதிகாரிகள் சேவைக்காக அங்கீகரிக்கப்பட்டனர், மூவர் மருத்துவமனையில் இருபது ஆண்டுகளுக்கும் மேலாக பணியாற்றியவர்கள்.",
  },
  {
    date: "ஜூலை 2026",
    lede: "எங்கள் Physicians தேசிய தொலைக்காட்சி மற்றும் அச்சு ஊடகங்களுடன் ஆரம்ப எச்சரிக்கை அறிகுறிகள் மற்றும் நான்காம் நாள் Platelet வீழ்ச்சி பற்றி விவாதித்தனர்.",
  },
  {
    date: "ஜூன் 2026",
    lede: "மீண்டும் மீண்டும் நீரிழப்பு மற்றும் வெளிப்புற மற்றும் கட்டுமான தொழிலாளர்களிடையே நாள்பட்ட சிறுநீரக நோய் பற்றிய Nephrology கண்ணோட்டம்.",
  },
  {
    date: "பிப்ரவரி 2026",
    lede: "Accreditation தர நிலைகள், Audit மற்றும் அன்றாட மருத்துவ நடைமுறையை அது எவ்வாறு மாற்றுகிறது என்பது பற்றி எங்கள் Medical Director.",
  },
];

export const pressHeading = {};
export const pressIntro =
  "Corporate Communications, வார நாட்களில் காலை 8 மணி முதல் மாலை 5 மணி வரை Staff செய்யப்பட்டுள்ளது, அந்த நேரத்திற்கு வெளியே breaking செய்திகளுக்கு Duty Phone உடன். எங்களால் Comment செய்ய முடியாத போது நாங்கள் அமைதியாக இருப்பதற்கு பதிலாக, அதை ஏன் என்று உங்களுக்குச் சொல்வோம்.";
export const pressPhoneTemplate = "{phone}, Communications ஐக் கேளுங்கள்";

export const desk = [
  {
    kind: "முதல் தொடர்பு",
    body: "நேர்காணல் கோரிக்கைகள், படமாக்கல், அறிக்கைகள் மற்றும் உண்மை சரிபார்ப்பு உட்பட ஒவ்வொரு Media கோரிக்கையும் இங்கே தொடங்குகிறது. நாங்கள் அதை வழிநடத்தி, நீங்கள் File செய்யும் வரை அந்த Thread இல் இருக்கிறோம்.",
  },
  {
    kind: "நேரங்கள்",
    body: "வேலை நாள் முழுவதும் Staff செய்யப்பட்டு, இரவிலும் வார இறுதிகளிலும் breaking செய்திகளுக்காக முதன்மை மருத்துவமனை எண் மூலம் அடையக்கூடிய Duty Phone உடன்.",
  },
  {
    kind: "பதில்",
    body: "உங்கள் Deadline ஐ Subject Line இல் போடுங்கள், சரியான மருத்துவரைப் பெற நாளை வரை வேண்டும் என்பது பதிலாக இருந்தாலும், வேலை நாளுக்குள் நாங்கள் பதிலளிப்போம்.",
  },
  {
    kind: "நேர்காணல்கள்",
    body: "உண்மையில் அந்த வேலையைச் செய்யும் நிபுணர் உடன் உங்களை இணைக்கிறோம். Topic மற்றும் Deadline ஐக் கொடுங்கள், யார் கிடைக்கிறார் என்பதை நாங்கள் நேர்மையாகச் சொல்வோம்.",
  },
  {
    kind: "அறிக்கைகள்",
    body: "அறிக்கைகள் எழுத்து வடிவில் வெளியிடப்பட்டு, ஒரு பெயரிடப்பட்ட நபருக்கு அவரின் Title உடன் Attribute செய்யப்பட்டு, தேதியிடப்படுகின்றன. நாங்கள் Background இல் பேசி பின்னர் மறுக்க மாட்டோம்.",
  },
  {
    kind: "உண்மை சரிபார்ப்பு",
    body: "நீங்கள் Publish செய்வதற்கு முன் ஒரு Quotation, மருத்துவக் கூற்று, பெயர் அல்லது Title ஐ நாங்கள் சரிபார்ப்போம். Correction ஒன்றை விட உங்களுக்கு வேகமானது, எங்களுக்கும் நல்லது.",
  },
  {
    kind: "சம்பவங்கள்",
    body: "ஒரு பொது சம்பவத்தில், அடையாளம் காணும் விவரங்கள் இல்லாமல் உண்மையான எண்கள் மற்றும் பொது நிலையை நாங்கள் வெளியிட்டு, படம் தெளிவாகும் போது அதை Update செய்கிறோம். Clinicians நோயாளர்களுடன் தங்குகிறார்கள்.",
  },
  {
    kind: "இந்த மேசை அல்ல",
    body: "Advertising, Sponsorship மற்றும் Supplier யோசனைகள் Marketing குழுவிற்குச் செல்ல வேண்டும், பத்திரிகை மேசைக்கு அல்ல. Deadline இல் இருக்கும் பத்திரிகையாளர்களை அது தாமதப்படுத்துகிறது.",
  },
];

export const kitHeading = {};
export const kitIntro =
  "St. Joseph Hospital, Negombo க்கு Credit கொடுத்து, மாற்றப்படாமல் Editorial பயன்பாட்டில் இலவசமாக பயன்படுத்தலாம். Advertising இல் அல்லது பொருட்களில் எதையும் பயன்படுத்துவதற்கு முன் எங்களிடம் கேளுங்கள்.";

export const kit = [
  {
    name: "முதன்மை Logo",
    note: "முழு வண்ணத்தில், Light மற்றும் Dark Background இரண்டிலும், தெளிவான இட வழிகாட்டுதலுடன்",
  },
  {
    name: "Logo Mark மட்டும்",
    note: "Wordmark இல்லாத Mark, Square மற்றும் Profile பயன்பாட்டிற்கு",
  },
  {
    name: "ஒரு வண்ண Logo",
    note: "செய்தித்தாள் மற்றும் ஒரு வண்ண அச்சிடலுக்கு ஒற்றை வண்ணம்",
  },
  {
    name: "Brand தாள்",
    note: "வண்ணங்கள், Font, குறைந்தபட்ச அளவுகள் மற்றும் செய்யக்கூடாதவை",
  },
  {
    name: "கட்டிட புகைப்படங்கள்",
    note: "பகல் மற்றும் இரவு Exterior, முதன்மை நுழைவாயில், Lobby, அனைத்தும் Print Resolution",
  },
  {
    name: "வசதி புகைப்படங்கள்",
    note: "அறுவை சிகிச்சை அரங்குகள், தீவிர சிகிச்சை, ஆய்வுகூடம், Imaging, Pharmacy, நோயாளர்கள் இல்லாமல்",
  },
  {
    name: "நிபுணர் புகைப்படங்கள்",
    note: "பேச்சாளர்களின் Headshots, அவர்களின் சம்மதம் File இல் இருந்து வெளியிடப்பட்டவை",
  },
  {
    name: "தகவல் தாள்",
    note: "படுக்கைகள், Unit, சேவைகள், நிறுவப்பட்ட ஆண்டு, முதன்மை எண்கள், காலாண்டு Update செய்யப்பட்டது",
  },
  {
    name: "Boilerplate பத்தி",
    note: "உங்கள் கட்டுரையின் இறுதிக்கு அங்கீகரிக்கப்பட்ட சுருக்கமான விவரிப்பு",
  },
];

export const galleryHeading = {};
export const galleryIntro =
  "இங்குள்ள ஒவ்வொரு புகைப்படமும் Editorial பயன்பாட்டிற்கு அனுமதிக்கப்பட்டுள்ளது. எழுத்து வடிவ சம்மதம் File இல் இல்லாமல், எந்த Resolution இலும் அடையாளம் காணக்கூடிய நோயாளரைக் காட்டும் எதுவும் வெளியிடப்படாது.";

export const gallery = [
  {
    credit: "வழங்கியவர்: St. Joseph Hospital, Negombo",
  },
  {
    credit: "வழங்கியவர்: St. Joseph Hospital, Negombo",
  },
  {
    credit: "மாற்றாமல் Reproduce செய்யுங்கள், முழு Mark மட்டும்",
  },
];

export const spokespeopleHeading = {};
export const spokespeopleIntro1 =
  "கோரிக்கைகள் Communications மூலம் செல்கின்றன, அவர்கள் உண்மையில் அந்த வேலையைச் செய்யும் Clinician உடன் உங்களை இணைப்பார்கள், ஒரு அறிக்கையைப் படிக்கும் பொது பேச்சாளருக்குப் பதிலாக.";
export const spokespeopleIntro2 =
  "முதல் Email இலேயே Topic மற்றும் உங்கள் Deadline ஐக் கொடுங்கள். இரண்டும் யாரை வேகமாக வழங்க முடியும் என்பதை மாற்றுகின்றன.";

// `topics[*].v` is a job title, not prose, and the rule for "Consultant" the
// word (see the comment beside `featured.points` in content.ts, and its
// application here) applies to it like everywhere else in this file: kept
// English only where it sits as a title directly in front of a role
// ("Consultant physician"), because that is how it reads on a nameplate;
// translated where it is an ordinary noun. Four rows (`[4]`, `[5]`, `[6]`,
// and `[3]`'s "Consultant Surgeon") are nothing but that nameplate pattern,
// so nothing in them needs translating and they stay in KEEPS_ENGLISH in
// content.i18n.test.ts, one entry each with its own reason, not one line
// covering all ten. The other six were full job-title clauses with no such
// precedent, so their connectors and ordinary words translate, keeping only
// the role name itself and "Communications" (the department, same as
// `spokespeopleIntro1`'s "Communications மூலம்") in English:
// - `[0]`: "through" -> "மூலம்", matching `spokespeopleIntro1`'s own
//   translation of the identical connector.
// - `[2]`: "Head", "of" and "Medicine" translate; "Emergency" translates to
//   "அவசர" to match its own sibling `[2].k` two words to the left, rather
//   than sitting untranslated beside a Tamil word for the same fact.
// - `[3]`: "Consultant Surgeon" is the nameplate and stays English; "in the
//   relevant subspecialty" is ordinary qualifying prose and translates.
//   "Subspecialty" itself stays English the same way this array's own
//   `[1].k`'s "Accreditation" and `[2].k`'s "Trauma" do: an institutional
//   term with no established Tamil rendering in this file, not a role name.
// - `[7]`, `[8]`, `[9]`: "Nursing" and "Pharmacist" stay English because
//   both are established site-wide loanwords (facilities' "Unit
//   Coordinator", pharmacy's own register comment naming "Pharmacist"),
//   the same class of word as "Doctor" or "OPD", not because they are job
//   titles; "Director", "Chief", "Community" and "Health" are ordinary
//   words and translate.
export const topics = [
  { k: "மருத்துவமனை உபாயமும் முதலீடும்", v: "Chief Executive Officer, Communications மூலம்" },
  // "Medical Director" is the one job title that stays fully English with
  // no ordinary word riding along: see KEEPS_ENGLISH in
  // content.i18n.test.ts, which cites `network`'s own overlay keeping this
  // exact title English mid-sentence.
  { k: "மருத்துவத் தரநிலைகள் மற்றும் Accreditation", v: "Medical Director" },
  { k: "அவசர மற்றும் Trauma சிகிச்சை", v: "அவசர மருத்துவத் தலைவர்" },
  { k: "அறுவை சிகிச்சை மற்றும் Day Case Procedure", v: "தொடர்புடைய Subspecialty இல் Consultant Surgeon" },
  // "Consultant physician", "Consultant paediatrician" and "Consultant
  // obstetrician and gynaecologist" below are each nothing but the
  // nameplate pattern (Consultant directly in front of a role), so they
  // stay fully English: see KEEPS_ENGLISH in content.i18n.test.ts.
  { k: "டெங்கு, சர்க்கரை நோய் மற்றும் பொது மருத்துவம்", v: "Consultant physician" },
  { k: "குழந்தைகளின் ஆரோக்கியம் மற்றும் தடுப்பூசி", v: "Consultant paediatrician" },
  { k: "பிரசவமும் பெண்கள் ஆரோக்கியமும்", v: "Consultant obstetrician and gynaecologist" },
  { k: "Nursing, தொற்று கட்டுப்பாடு, நோயாளர் பாதுகாப்பு", v: "Nursing இயக்குநர்" },
  { k: "மருந்துகள், பற்றாக்குறைகள், Prescribing", v: "தலைமை Pharmacist" },
  { k: "சமூக மற்றும் பள்ளி திட்டங்கள்", v: "சமூக ஆரோக்கிய Coordinator" },
];

export const rulesHeading = {};

export const rules = [
  {
    q: "மருத்துவமனைக்குள் நாங்கள் படமாக்கலாமா அல்லது புகைப்படம் எடுக்கலாமா?",
    a: "ஆம், Corporate Communications மூலம் முன்கூட்டியே ஏற்பாடு செய்து, எப்போதும் ஒரு Escort உடன். மருத்துவப் பகுதிகள், அவசர பிரிவு, அறுவை சிகிச்சை அரங்குகள் மற்றும் Intensive Care Unit க்கு Department Head இடமிருந்து தனிப்பட்ட அனுமதியும் தேவை, நோயாளர்கள் அந்த தருணத்தில் அர்த்தமுள்ள சம்மதம் தர முடியாத இடங்களில் பதில் வெறுமனே இல்லை என்று இருக்கும். முடிந்த இடத்தில் எங்களுக்கு இரண்டு வேலை நாட்கள் கொடுங்கள். Breaking News வேகமாக Handle செய்யப்படும், ஆனால் Escort இல்லாமல் ஒருபோதும் இல்லை.",
  },
  {
    q: "ஒரு நோயாளியைப் பற்றிய விவரங்களை நீங்கள் உறுதிப்படுத்துவீர்களா?",
    a: "இல்லை, நோயாளரிடமிருந்து அல்லது, நோயாளர் சம்மதம் தர முடியாதபோது அவரது நெருங்கிய குடும்பத்தினரிடமிருந்து எழுத்து வடிவ சம்மதம் இல்லாமல். இது அனுமதிகள், நிலை, காயத்திற்கான காரணம் மற்றும் ஒரு பெயரிடப்பட்ட நபர் கட்டிடத்தில் இருக்கிறாரா என்பதற்கும் பொருந்தும், பொது பிரமுகர்கள் மற்றும் Social Media இல் ஏற்கனவே பரவும் Case களுக்கும் உட்பட. யாராவது இங்கே இருக்கிறார்கள் என்பதை உறுதிப்படுத்துவதே ஒரு வெளிப்படுத்தல். மறுப்பை ஒரு தவிர்ப்பாகப் படிக்க வேண்டாம்.",
  },
  {
    q: "ஒரு விபத்து அல்லது பொது சம்பவத்தை நீங்கள் எவ்வாறு கையாளுகிறீர்கள்?",
    a: "ஒரு Mass Casualty அல்லது பொது சம்பவத்தில், பெயர்கள் அல்லது அடையாளம் காணும் விவரங்கள் இல்லாமல் பெறப்பட்ட Casualty எண்ணிக்கை மற்றும் அவர்களின் பொது நிலையை உள்ளடக்கிய உண்மையான Holding Statement ஐ நாங்கள் வெளியிட்டு, படம் தெளிவாகும் போது அதை Update செய்கிறோம். கோரிக்கைகள் Corridor இல் Clinicians ஆல் அல்ல, மையமாகக் கையாளப்படுகின்றன, அதனால் சிகிச்சை தடைபடாமல் உங்களுக்குக் கிடைக்கும் தகவல் துல்லியமாக இருக்கும்.",
  },
  {
    q: "ஒரு நிபுணர் பொது மருத்துவ Topic ஒன்றில் Comment செய்யலாமா?",
    a: "பொதுவாக ஆம், இது நாங்கள் பெறுவதற்கு மிகவும் மகிழ்ச்சியான கோரிக்கை. Topic மற்றும் உங்கள் Deadline ஐச் சொல்லுங்கள், உண்மையில் அந்த வேலையைச் செய்யும் Clinician ஐ நாங்கள் Offer செய்வோம். அவர்கள் பொது மருத்துவ நடைமுறை, தடுப்பு மற்றும் நோயாளர்கள் கவனிக்க வேண்டியவை பற்றி பேசுவார்கள். அவர்கள் மற்றொரு மருத்துவமனையின் Case, நடைபெறும் சட்ட விஷயம் அல்லது ஒரு பெயரிடப்பட்ட நபரின் சிகிச்சை பற்றி Comment செய்ய மாட்டார்கள்.",
  },
  {
    q: "உங்கள் Logo வை நாங்கள் பயன்படுத்தலாமா?",
    a: "மருத்துவமனையின் Editorial ஆவரணத்தில், ஆம், மாற்றப்படாமல், தெளிவான இடத்துடன், மீண்டும் வண்ணமிடப்படாமல். இது Advertising இல், பொருட்களில், ஒரு தயாரிப்பு அல்லது சேவைக்கான Endorsement ஐக் குறிக்கும் வகையில், அல்லது Partnership ஐக் குறிக்கும் வகையில் மற்றொரு நிறுவனத்தின் Mark உடன் பயன்படுத்தப்படக்கூடாது. Press Kit இல் சரியான File கள் மற்றும் குறைந்தபட்ச அளவுகள் உள்ளன. உங்கள் பயன்பாடு தெளிவாக Editorial அல்லவென்றால் எங்களிடம் கேளுங்கள்.",
  },
  {
    q: "வெளியிடுவதற்கு முன் கட்டுரைகளை நீங்கள் Review செய்கிறீர்களா?",
    a: "நாங்கள் Editorial ஒப்புதலைக் கேட்க மாட்டோம், எதிர்பார்க்கவும் மாட்டோம். Publish செய்வதற்கு முன் ஒரு Quotation, மருத்துவக் கூற்று, பெயர் அல்லது Job Title ஐ நாங்கள் மகிழ்ச்சியுடன் சரிபார்ப்போம், பின்னர் ஒரு Correction வெளியிடுவதற்கு பதிலாக. பகுதியை அனுப்புங்கள், நாங்கள் விரைவாக Turn Around செய்வோம்.",
  },
  {
    q: "நோயாளர்களை நாங்கள் நேர்காணல் செய்யலாமா?",
    a: "நோயாளர் தாமே எங்களை அணுகியிருந்தால் அல்லது, சிகிச்சை குழுவின் அறிவுடன் Communications மூலம் ஏற்பாடு செய்யப்பட்டு, முன்கூட்டியே எழுத்து வடிவ சம்மதம் கொடுத்திருந்தால் மட்டுமே. பேச விரும்பும் ஒருவரைக் கண்டுபிடிக்க நாங்கள் பத்திரிகையாளர்களை ஒரு Ward க்கு நடத்திச் செல்ல மாட்டோம், கடுமையான Admission ஒன்றின் போது உங்கள் சார்பாக நோயாளர்களை அணுக மாட்டோம். மீட்சி கதைகள் பொதுவாக Discharge க்குப் பிறகு சொல்வதே சிறந்தது.",
  },
  {
    q: "நீங்கள் Advertising ஐ Sponsor செய்கிறீர்களா அல்லது வைக்கிறீர்களா?",
    a: "Commercial அணுகுமுறைகள், Advertising Sale மற்றும் Sponsorship யோசனைகள் Marketing குழுவிற்குச் செல்ல வேண்டும், பத்திரிகை மேசைக்கு அல்ல, Media முகவரி சரியான வழி அல்ல. Deadline இல் இருக்கும் பத்திரிகையாளர்களை அது தாமதப்படுத்துகிறது. பத்திரிகை Inbox க்கு அனுப்பப்படும் Commercial எதுவும் வெறுமனே அனுப்பப்படும்.",
  },
];

export const enquiryHeading = {};
export const enquiryIntro =
  "உங்கள் Outlet, Topic மற்றும் Deadline ஐ முதல் வரியில் போடுங்கள், நாங்கள் வேலை நாளுக்குள் திரும்பி வருவோம். இரவு மற்றும் வார இறுதி கதைகள் முதன்மை மருத்துவமனை எண் மூலம் Duty Phone ஐ அடையும்.";

export const jumpCards = [
  {
    // Derived from news.length (17) in content.ts. If a release is added or
    // removed, this literal count needs updating to match, the same
    // staleness risk content.ts's own comment on `jumpCards` flags for the
    // English derivation it protects against; there is no automated check
    // on the translated count itself.
    count: "17 உருப்படிகள்",
    note: "வெளியீடுகள், மருத்துவ மைல்கல்கள், சமூக வேலை.",
  },
  {
    count: "ஒரு Inbox",
    note: "யாரைத் தொடர்பு கொள்வது, எவ்வளவு வேகமாக பதிலளிக்கிறோம்.",
  },
  {
    // Derived from kit.length (9). Same staleness note as jumpCards[0].count.
    count: "9 சொத்துக்கள்",
    note: "Logo, புகைப்படங்கள், தகவல் தாள், Boilerplate.",
  },
  {
    // Derived from rules.length (8). Same staleness note as jumpCards[0].count.
    count: "8 விதிகள்",
    note: "நாங்கள் உறுதிப்படுத்த முடிந்தது மற்றும் முடியாதது.",
  },
];
