// Tamil for the contact form's own validation messages and banners.
// Written as a full object rather than a partial: every message is
// translated, and `schemas.ts` reads this synchronously into
// VALIDATION_MESSAGES rather than merging it through `localize`, the same
// shape `chromeCopy.ta.ts` uses for the chrome's own strings.
//
// These are the words a patient reads when the form rejects what they
// typed, so they sit in an overlay with a `__review` marker like every
// other translated string on the site rather than inline in `schemas.ts`,
// where `npm run i18n:status` could not see them and no reviewer was ever
// told they existed.
//
// "Email" and "message" stay in English deliberately: everyday nouns a Sri
// Lankan form already prints in English, the same decision as this
// feature's own content overlays.
//
// `{phone}` is a token the component splits on, never a number pasted into
// the sentence: the hospital's number has exactly one home, in
// `data/content.ts`.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const validationMessages = {
  firstNameRequired: "முதல் பெயர் தேவை",
  lastNameRequired: "கடைசிப் பெயர் தேவை",
  emailRequired: "Email தேவை",
  emailInvalid: "சரியான Email ஒன்றை உள்ளிடுங்கள்",
  fixFields: "தயவுசெய்து குறிக்கப்பட்ட புலங்களைச் சரிசெய்து மீண்டும் முயற்சிக்கவும்.",
  sendFailed: "தற்போது உங்கள் message ஐ அனுப்ப முடியவில்லை. தயவுசெய்து {phone} ஐ அழையுங்கள்.",
  sendSuccess: "தொடர்பு கொண்டதற்கு நன்றி. ஒரு வேலை நாளுக்குள் நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.",
};
