// Tamil overlay for screening.ts (`#screening`: the eleven age-based checks,
// and the section's own copy).
//
// CLINICAL FIDELITY / NUMBERS: every age, range and interval below is
// unchanged from the English base, checked by eye at every `who`/`freq`
// value: twenties (rendered "20களில்", the ordinary Tamil way of naming a
// decade, not a rounded or converted value), 30, 35, 25, 65, 40, "2 to 3",
// "3 to 5" and "1 to 2" years all carry the same digits English does.
//
// "Health check packages" and "Screening by age" reuse
// navigationLabels.ta.ts's own established strings verbatim rather than
// coining a second Tamil form for either. "HbA1c", "ECG" and "Mammogram"
// (test-name abbreviations/terms) stay bare English, the same never-
// translate class as "OPD"/"ICU"; ordinary clinical prose around them
// translates in full.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const screening = [
  {
    check: "இரத்த அழுத்தம்",
    who: "ஒவ்வொரு வயது வந்தவரும், உங்கள் 20களில் இருந்து",
    freq: "ஆண்டுதோறும்",
  },
  {
    check: "இரத்த சர்க்கரை மற்றும் HbA1c",
    who: "தென்னாசியர்களுக்கு 30 இலிருந்து, குடும்ப வரலாறு அல்லது அதிக எடை இருந்தால் முன்னதாகவே",
    freq: "ஆண்டுதோறும்",
  },
  {
    check: "Lipid Profile பரிசோதனை",
    who: "35 இலிருந்து, அல்லது நீரிழிவு, புகைபிடித்தல் அல்லது குடும்ப வரலாறு இருந்தால் முன்னதாகவே",
    freq: "2 முதல் 3 ஆண்டுகள்",
  },
  {
    check: "எடை மற்றும் இடை அளவீடு",
    who: "ஒவ்வொரு வயது வந்தவரும்; இங்கு Scale ஐ விட இடை அளவே முக்கியம்",
    freq: "ஆண்டுதோறும்",
  },
  {
    check: "முழு இரத்த எண்ணிக்கை",
    who: "பிரசவ வயது பெண்கள், மற்றும் தொடர்ந்து சோர்வாக இருப்பவர்கள்",
    freq: "ஆண்டுதோறும்",
  },
  {
    check: "சிறுநீரக செயல்பாடு மற்றும் சிறுநீர் Protein",
    who: "நீரிழிவு, அதிக இரத்த அழுத்தம், அல்லது வெளிப்புற உடல் உழைப்பு உள்ளவர்கள்",
    freq: "ஆண்டுதோறும்",
  },
  {
    check: "கர்ப்பப்பை வாய் Screening",
    who: "25 முதல் 65 வரையிலான பெண்கள்",
    freq: "3 முதல் 5 ஆண்டுகள்",
  },
  {
    check: "மார்பக பரிசோதனை மற்றும் Mammogram",
    who: "30 இலிருந்து Clinical பரிசோதனை; 40 இலிருந்து Mammogram ஆலோசனை",
    freq: "ஆண்டுதோறும் / பரிந்துரையின்படி",
  },
  {
    check: "கண் பரிசோதனை",
    who: "40 இலிருந்து அனைவரும்; நீரிழிவு கண்டறியப்பட்ட நாளிலிருந்து ஆண்டுதோறும்",
    freq: "1 முதல் 2 ஆண்டுகள்",
  },
  {
    check: "பல் பரிசோதனை",
    who: "நீங்கள் தேர்ந்தெடுக்கும் பல் மருத்துவ Practice இல், ஒவ்வொரு வயது வந்தவரும் குழந்தையும்",
    freq: "ஆண்டுதோறும்",
  },
  {
    check: "ECG மற்றும் இதய அபாயம்",
    who: "40 இலிருந்து, அல்லது அறிகுறிகள் அல்லது குடும்ப வரலாறு இருந்தால் முன்னதாகவே",
    freq: "பரிந்துரையின்படி",
  },
];

export const screeningSection = {
  eyebrow: "03 / வயது வாரியான பரிசோதனை",
  heading: { line1: "செய்யத் தகுந்த", line2: "பரிசோதனைகள்" },
  body1:
    "மிகவும் பயனுள்ள Screening மலிவானது, சாதாரணமானது. அறிகுறிகள் இல்லாத, குடும்ப வரலாறு இல்லாத ஒருவருக்கு எங்கள் மருத்துவர்கள் உண்மையில் பரிந்துரைப்பது இவைதான், மற்றும் தோராயமாக எவ்வளவு அடிக்கடி என்பதும்.",
  body2:
    "நீரிழிவு, இதய நோய் அல்லது புற்றுநோய் குடும்ப வரலாறு இருந்தால் அனைத்தும் முன்னதாக நகரும். ஊகிப்பதற்குப் பதிலாக எங்களிடம் கேளுங்கள்.",
  cta: "சுகாதார பரிசோதனை பொதிகள்",
};
