// Tamil overlay for firstAid.ts (`#firstaid`: the four first aid steps, the
// home kit, the emergency numbers, and the section's own copy).
//
// CLINICAL FIDELITY: every step below translates the English instruction
// exactly, in the same order and with the same emphasis; nothing is
// softened, reordered or corrected. Every number (twenty minutes, five back
// blows, five thrusts, ten minutes) is unchanged from the English base,
// including where it sits inside a sentence.
//
// "Ambulance" and "Pharmacy" stay bare English throughout, the same
// established register word this whole site uses (emergency.ta.ts's own
// header for "Ambulance"; navigationLabels.ta.ts's own "Pharmacy").
// "Paracetamol" (a drug name) stays bare English, matching the register
// rule's own "drug classes, brands" exception and this feature's own
// myths.ts, which never translates a drug name either. "Digital" reuses the
// site's own established "Digital X-ray" compound (services/data/
// indexContent.ta.ts's own KEEPS_ENGLISH) for the identical adjective in
// front of another medical device. "ORS" is the internationally standard
// acronym for oral rehydration salts, said in English in Sri Lanka too, the
// same never-translate class as "OPD"/"ICU". Every other home-kit item and
// number label translates in full: `pharmacy/data/content.ta.ts`'s own
// "Dressings"/"Tapes"/"Antiseptics"/"Thermometers" (its own stock-category
// names) are NOT reused here, because a first aid kit list is not that
// feature's stock catalogue, and the task's own recipe flags exactly this
// kind of borrowed exception ("pharmacy swept four generic supply
// categories into keeps-English and they had to be pulled back out").

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const firstAidSteps = [
  {
    kind: "தீக்காயங்கள்",
    title: "குளிர்ந்த தண்ணீர், இருபது நிமிடங்கள்",
    action:
      "தீக்காயத்தை முழு இருபது நிமிடங்களுக்கும் குளிர்ந்த ஓடும் தண்ணீரின் கீழ் வையுங்கள், பின்னர் Cling Film அல்லது சுத்தமான துணியால் தளர்வாக மூடுங்கள். உள்ளங்கையை விட பெரிய எதற்கும், அல்லது முகம், கைகள் அல்லது ஒரு மூட்டு முழுவதும் ஏற்படும் எந்த தீக்காயத்திற்கும் வாருங்கள்.",
    avoid: "பனிக்கட்டி, பற்பசை, வெண்ணெய், அல்லது கொப்புளங்களை உடைப்பது",
  },
  {
    kind: "மூச்சுத் திணறல்",
    title: "ஐந்து முதுகுத் தட்டல்கள், ஐந்து உந்துதல்கள்",
    action:
      "அவர்களால் இருமவோ பேசவோ முடியாவிட்டால், அவர்களை முன்னோக்கி சாய்த்து தோள்பட்டை எலும்புகளுக்கு இடையே ஐந்து உறுதியான தட்டல்களைக் கொடுங்கள், பின்னர் ஐந்து வயிற்று உந்துதல்களைக் கொடுங்கள். மாற்றி மாற்றி செய்யுங்கள், நீங்கள் தொடரும்போது யாராவது Ambulance ஐ Call செய்யச் சொல்லுங்கள்.",
    avoid: "பார்க்காமல் வாய்க்குள் கையை விட்டு அதை எடுக்க முயற்சிப்பது",
  },
  {
    kind: "இரத்தப்போக்கு",
    title: "கடுமையாக அழுத்துங்கள், தொடர்ந்து அழுத்துங்கள்",
    action:
      "சுத்தமான துணியால் காயத்தின் மீது உறுதியாக அழுத்தி பிடித்திருங்கள், முடிந்தால் அந்த உறுப்பை இதயத்திற்கு மேலாக உயர்த்துங்கள். இடைவிடாத பத்து நிமிட அழுத்தம் பெரும்பாலான இரத்தப்போக்கை நிறுத்தும்.",
    avoid: "ஒவ்வொரு நிமிடமும் துணியைத் தூக்கிப் பார்ப்பது",
  },
  {
    kind: "பாம்பு கடி",
    title: "அசையாமல், தாழ்வாக, நேரடியாக மருத்துவமனைக்கு",
    action:
      "நபரை அமைதியாகவும் முடிந்தவரை அசையாமலும் வையுங்கள், கடிபட்ட உறுப்பை இதய மட்டத்திற்குக் கீழே வையுங்கள், மோதிரங்களையும் இறுக்கமான ஆடைகளையும் அகற்றுங்கள், உடனடியாக அவர்களை அழைத்து வாருங்கள். கடித்த நேரத்தைக் குறித்துக் கொள்ளுங்கள்.",
    avoid: "வெட்டுவது, உறிஞ்சுவது, Tourniquet கட்டுவது, அல்லது பாம்பைத் துரத்துவது",
  },
];

export const homeKit = [
  "Digital வெப்பமானி",
  "Paracetamol, பெரியவர் மற்றும் சிரப்",
  "ORS உப்பு பாக்கெட்டுகள்",
  "மலட்டு Gauze மற்றும் Tape",
  "Crepe கட்டு",
  "கிருமிநாசினி கரைசல்",
  "பலவகை Plaster",
  "கூர்மையற்ற கத்தரிக்கோல் மற்றும் Tweezers",
  "ஒரு முறை பயன்படு கையுறைகள்",
  "உங்கள் மருந்து பட்டியல், அச்சிடப்பட்டது",
  "கைவிளக்கு",
];

export const emergencyNumbers = [
  { label: "மருத்துவமனை மற்றும் Ambulance" },
  { label: "Pharmacy, 24 மணி நேரம்" },
  { label: "தேசிய Ambulance" },
  { label: "தேசிய விஷத் தடுப்பு மையம்" },
];

export const firstAidSection = {
  eyebrow: "04 / வீட்டில் முதலுதவி",
  heading: { line1: "நான்கு நிமிடங்கள்", line2: "நீங்கள் எங்களை அடையும் முன்" },
  neverLabel: "ஒருபோதும் வேண்டாம்:",
  homeKitHeading: "வீட்டில் வையுங்கள்",
  numbersHeading: "இந்த எண்களை வைத்துக் கொள்ளுங்கள்",
};
