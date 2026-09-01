// Sinhala for the chrome's own hardcoded strings (header, mobile panel,
// floating rail, both theme toggles). Written as a full object rather than a
// partial: all ten strings are translated, and `chromeCopyFor` in
// chromeCopy.ts reads this synchronously without merging through `localize`.
//
// "WhatsApp" is left in English deliberately: it is the product name, the
// same decision as everywhere else in the chrome and in the contact feature.

export const chromeCopy = {
  // Shorter than a full "දැන්ම Book කරන්න" sentence deliberately: this is a
  // button label, not a sentence, and the header never wraps the row onto a
  // second line (see ThemedHeader.tsx). The fuller form overflowed the header
  // on common phone widths once translated; English "Book now" is two words
  // for the same reason.
  bookNow: "දැන් Book",
  openMenu: "මෙනුව විවෘත කරන්න",
  closeMenu: "මෙනුව වසන්න",
  backToTop: "මුදුනට යන්න",
  whatsappUs: "අප හට WhatsApp කරන්න",
  whatsapp: "WhatsApp",
  callUs: "අපට call කරන්න",
  reachUs: "අප අමතන්න",
  toLightMode: "Light mode එකට මාරු වෙන්න",
  toDarkMode: "Dark mode එකට මාරු වෙන්න",
};
