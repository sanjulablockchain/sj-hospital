// Tamil for the home page's `#international` band.
//
// Same register the standalone `international-care` feature's own
// content.ta.ts already established: "Bandaranaike International" stays
// English (the airport's own official name), "Insurance", "Interpreter",
// "Imaging" and "Discharge" stay English inside the sentence. "International
// patient care" and "International care" already have a site-wide
// translation in navigationLabels.ta.ts, so `sectionEyebrow` and `ctaPrimary`
// reuse those roots rather than inventing second translations.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const internationalCareItems = [
  {
    title: "Airport இலிருந்து Bed வரை",
    body: "Bandaranaike International இலிருந்து பத்து நிமிடங்கள். நீங்கள் Land ஆவதற்கு முன் Transfer மற்றும் Admission ஏற்பாடு செய்யப்படும்.",
  },
  {
    title: "எழுத்துப்பூர்வ Estimates",
    body: "உங்கள் Currency இல் Cost செய்யப்பட்ட Treatment Plan, எதுவும் தொடங்குவதற்கு முன் Approve செய்யப்படும்.",
  },
  {
    title: "Insurance மற்றும் Claims",
    body: "சர்வதேச Insurers மற்றும் Travel Policies களுக்காக Documentation தயார் செய்யப்படும்.",
  },
  {
    title: "மொழி ஆதரவு",
    body: "English பேசும் Clinicians, கோரிக்கையின் பேரில் Interpreters ஏற்பாடு செய்யப்படுவார்கள்.",
  },
  {
    title: "வீட்டிற்கு எடுத்துச் செல்ல Records",
    body: "Digital Reports, Imaging மற்றும் Discharge குறிப்புகள் வீட்டில் உள்ள உங்கள் மருத்துவருக்கு அனுப்பப்படும்.",
  },
  {
    title: "இணையத்தில் Follow-up",
    body: "நீங்கள் திரும்பிச் சென்ற பிறகு Telemedicine மூலம் Treatment க்குப் பிந்தைய Review.",
  },
];

// Reused verbatim from navigationLabels.ta.ts's "International patient care".
export const sectionEyebrow = "08 / வெளிநாட்டு நோயாளர் சிகிச்சை";
export const heading = { line1: "சிகிச்சைக்காக", line2: "Travel செய்கிறீர்களா, அல்லது", line3: "வெறும் வருகையா" };
export const body =
  "நீர்கொழும்பு சர்வதேச Airport இலிருந்து பத்து நிமிட தொலைவில் அமைந்துள்ளது. Visitors, Expatriates மற்றும் Medical Travelers ஐ வருகையிலிருந்து வீட்டு Follow-up வரை நாங்கள் கவனித்துக்கொள்கிறோம்.";
// Reused verbatim from navigationLabels.ta.ts's "International care" -> "வெளிநாட்டு சிகிச்சை".
export const ctaPrimary = "வெளிநாட்டு சிகிச்சையைப் பார்க்கவும்";
export const ctaSecondary = "Desk உடன் பேசுங்கள்";
