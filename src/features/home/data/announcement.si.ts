// Sinhala for the home page's announcement pop-up.
//
// Four of the five translatable groups in `announcement.ts` are absent by the
// register policy rather than by oversight (`src/lib/i18n/registerPolicy.ts`,
// which encodes docs/superpowers/i18n-register-rule.md): `title` is a title,
// every `slides[].eyebrow` is a section eyebrow, every `slides[].heading.*` is
// a display heading, and `ctaPrimary` / `ctaSecondary` are CTA labels. All
// four rows of the rule table go English in every language, and "stays
// English" is expressed by deleting the key, never by copying the English in.
//
// What is left is what a Sinhala reader actually reads rather than scans: the
// three `body` paragraphs, plus the four aria labels, which the policy's
// assistive-text guard keeps translated on purpose. Someone using a screen
// reader on a Sinhala page is the reader least able to work around English.
//
// `photoAlt` is the one gap between the two predicates here. The register
// policy would translate it (it is assistive text), but this feature's own
// `isUntranslatable` excuses every `.photoAlt` path except the hero's, so it
// is excluded before the policy is consulted and must stay out of this file.
// That is the home feature's existing rule, followed rather than re-litigated.
//
// Register notes on the copy below: `Pharmacy`, `OPD`, `Doctor`, `Reception`,
// `WhatsApp`, `online`, and `call` / `message` / `channel` / `book` as verbs
// all stay English, which is what Sri Lankans actually say. The hospital's own
// name never changes script.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const ariaPrev = "පෙර නිවේදනය";
export const ariaNext = "ඊළඟ නිවේදනය";
export const ariaClose = "නිවේදන වසන්න";
export const ariaSlide = "නිවේදනය";

export const slides = [
  {
    body: "අපේම Pharmacy එක, අපේම කාර්ය මණ්ඩලය. බෙහෙත් වට්ටෝරු රෝහල තුළදීම සකසා, වාට්ටුවට හෝ ඔබේ නිවසටම ගෙන එනවා. අතරමැදි කිසිවෙකුගේ අත නොගෑවෙනවා.",
  },
  {
    body: "ශ්‍රී ලංකාවේ පළමු වතාවට. St. Joseph Hospital හි OPD උපදේශනයට ඔබෙන් කිසිදු ගාස්තුවක් අය නොකෙරෙනවා. එබැවින් වෛද්‍යවරයෙකු හමුවීම, ඔබට දරාගත හැකි මුදල පිළිබඳ ප්‍රශ්නයක් නොවෙනවා.",
  },
  {
    body: "Reception පැය 24 පුරාම, වසරේ සෑම දිනකම පිළිතුරු දෙනවා. Doctor කෙනෙකු online channel කරන්න, WhatsApp එකෙන් message කරන්න, නැත්නම් call කරන්න. ඊළඟට නිදහස් වේලාව අපි ඔබට සොයා දෙන්නම්.",
  },
];
