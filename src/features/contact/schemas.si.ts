// Sinhala for the contact form's own validation messages and banners.
// Written as a full object rather than a partial: every message is
// translated, and `schemas.ts` reads this synchronously into
// VALIDATION_MESSAGES rather than merging it through `localize`, the same
// shape `chromeCopy.si.ts` uses for the chrome's own strings.
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
  firstNameRequired: "මුල් නම අවශ්‍යයි",
  lastNameRequired: "වාසගම අවශ්‍යයි",
  emailRequired: "Email එක අවශ්‍යයි",
  emailInvalid: "වලංගු Email එකක් ඇතුළත් කරන්න",
  fixFields: "කරුණාකර සලකුණු කර ඇති කොටස් නිවැරදි කර නැවත උත්සාහ කරන්න.",
  sendFailed: "දැනට ඔබේ message එක යැවීමට නොහැකි විය. කරුණාකර {phone} අමතන්න.",
  sendSuccess: "සම්බන්ධ වීම ගැන ස්තුතියි. අපි එක් වැඩ කරන දිනක් ඇතුළත ඔබ හා සම්බන්ධ වෙනවා.",
};
