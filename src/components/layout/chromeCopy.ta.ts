// Tamil for the chrome's own hardcoded strings (header, mobile panel,
// floating rail, both theme toggles, the language switcher). `chromeCopyFor`
// in chromeCopy.ts now merges this through `localize`, so a key absent here
// falls back to the English string rather than rendering empty.
//
// Five keys are deliberately ABSENT, per the register policy
// (`docs/superpowers/i18n-register-rule.md`, `registerPolicy.ts`) and the
// owner's ruling on 2026-09-09 ("book now should be in english in every
// language", "nav bar and footer should be in english in every language"):
// `bookNow` (the Book CTA), `tagline` (the footer's own tagline), `callUs`
// and `whatsappUs` (the floating rail's CTAs), and `language` (the visible
// "Language" label in the mobile panel, which is chrome, not an aria-label).
// Deleting the key is how "stays English" is expressed; translating it to
// itself is rejected by the identity assertion in chromeCopy.i18n.test.ts.
//
// "WhatsApp" is left in English deliberately: it is the product name, the
// same decision as everywhere else in the chrome and in the contact feature.
// It is NOT one of the five above: `whatsapp` (the bare product name) is
// still translated copy that happens to read identically in every language,
// while `whatsappUs` (the sentence built around it) is now register-policy
// English and is absent below.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const chromeCopy = {
  openMenu: "மெனுவைத் திறக்க",
  closeMenu: "மெனுவை மூட",
  backToTop: "மேலே செல்ல",
  whatsapp: "WhatsApp",
  toLightMode: "Light mode க்கு மாறுங்கள்",
  toDarkMode: "Dark mode க்கு மாறுங்கள்",
  changeLanguage: "மொழி: {locale}. மொழியை மாற்றுங்கள்",
  // The booking sheet's prose. Its heading, eyebrow, kickers, card titles
  // and "Not now" are register-policy English and absent here.
  bookSubtitle: "OPD இல் அதே நாள் Slots, மற்றும் 24 மணி நேரமும் Online Booking.",
  bookOnlineDesc: "ஒரு Consultant ஐயும் நேரத்தையும் தேர்ந்தெடுங்கள்; Channelling Desk அதை Confirm செய்யும்.",
  bookMessageDesc: "உங்கள் பெயரையும் உங்களுக்குத் தேவையான Clinic ஐயும் அனுப்புங்கள்.",
  bookCallDesc: "Switchboard ஒவ்வொரு மணி நேரமும் பதிலளிக்கும்.",
  bookFooter: "OPD Consultation இலவசம். OPD இல் Corporate Insurance ஏற்றுக்கொள்ளப்படும்.",
  closeBooking: "Booking விருப்பங்களை மூடு",
};
