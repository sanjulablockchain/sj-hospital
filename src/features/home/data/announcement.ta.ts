// Tamil for the home page's announcement pop-up.
//
// The same shape as its Sinhala sibling, and absent for the same reasons: the
// `title`, the three `slides[].eyebrow` values, every `slides[].heading.*`
// segment and both CTA labels per slide are English in every language under
// the register policy (`src/lib/i18n/registerPolicy.ts`), expressed by
// deleting the key rather than by restating the English.
//
// Left translated: the three `body` paragraphs, which are what a Tamil reader
// reads rather than scans, and the four aria labels, kept by the policy's
// assistive-text guard. `photoAlt` is excluded by this feature's own
// `isUntranslatable` before the policy is consulted, so it stays out of here
// even though the policy alone would translate it.
//
// Register notes: `Pharmacy`, `OPD`, `Doctor`, `Reception`, `WhatsApp`,
// `online`, and `call` / `message` / `channel` / `book` as verbs stay English.
// Polite plural throughout. The hospital's own name never changes script.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const ariaPrev = "முந்தைய அறிவிப்பு";
export const ariaNext = "அடுத்த அறிவிப்பு";
export const ariaClose = "அறிவிப்புகளை மூடுங்கள்";
export const ariaSlide = "அறிவிப்பு";

export const slides = [
  {
    body: "எங்கள் சொந்த Pharmacy, எங்கள் சொந்த ஊழியர்கள். மருந்துச் சீட்டுகள் மருத்துவமனைக்குள்ளேயே தயாரிக்கப்பட்டு, வார்டுக்கோ உங்கள் வீட்டுக்கோ கொண்டு வரப்படுகின்றன. இடையில் வெளியாரின் கை படுவதில்லை.",
  },
  {
    body: "இலங்கையில் இதுவே முதல் முறை. St. Joseph Hospital இல் OPD ஆலோசனைக்கு உங்களிடம் எந்தக் கட்டணமும் அறவிடப்படுவதில்லை. எனவே Doctor ஐப் பார்ப்பது, உங்களால் கட்ட முடியுமா என்ற கேள்வியே அல்ல.",
  },
  {
    body: "Reception 24 மணி நேரமும், வருடத்தின் ஒவ்வொரு நாளும் பதிலளிக்கிறது. Doctor ஐ online channel செய்யுங்கள், WhatsApp இல் message அனுப்புங்கள், அல்லது call செய்யுங்கள். அடுத்த காலி நேரத்தை நாங்கள் பார்த்துத் தருகிறோம்.",
  },
];
