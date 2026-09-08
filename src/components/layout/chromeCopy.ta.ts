// Tamil for the chrome's own hardcoded strings (header, mobile panel,
// floating rail, both theme toggles, the language switcher). Written as a
// full object rather than a partial: all twelve strings are translated, and
// `chromeCopyFor` in chromeCopy.ts reads this synchronously without merging
// through `localize`.
//
// "WhatsApp" is left in English deliberately: it is the product name, the
// same decision as everywhere else in the chrome and in the contact feature.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const chromeCopy = {
  // Shorter than a full "இப்போதே Book செய்யுங்கள்" sentence deliberately: this
  // is a button label, not a sentence, and the header never wraps the row
  // onto a second line (see ThemedHeader.tsx). The fuller form overflowed the
  // header on common phone widths once translated; English "Book now" is two
  // words for the same reason.
  bookNow: "இப்போ Book",
  openMenu: "மெனுவைத் திறக்க",
  closeMenu: "மெனுவை மூட",
  backToTop: "மேலே செல்ல",
  whatsappUs: "எங்களுக்கு WhatsApp செய்யுங்கள்",
  whatsapp: "WhatsApp",
  callUs: "எங்களை call செய்யுங்கள்",
  tagline:
    "இரக்கமுள்ள, நோயாளர் மைய சிகிச்சை மூலம், அமெரிக்க சுகாதார தரநிலைகளை இலங்கைக்குக் கொண்டு வருகிறோம்.",
  toLightMode: "Light mode க்கு மாறுங்கள்",
  toDarkMode: "Dark mode க்கு மாறுங்கள்",
  language: "மொழி",
  changeLanguage: "மொழி: {locale}. மொழியை மாற்றுங்கள்",
};
