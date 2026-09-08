// Sinhala for the careers form's own validation messages and banners.
// Written as a full object rather than a partial: every message is
// translated, and `schemas.ts` reads this synchronously into
// VALIDATION_MESSAGES rather than merging it through `localize`, the same
// shape `chromeCopy.si.ts` uses for the chrome's own strings.
//
// These are the words an applicant reads when the form rejects what they
// typed, so they sit in an overlay with a `__review` marker like every
// other translated string on the site rather than inline in `schemas.ts`,
// where `npm run i18n:status` could not see them and no reviewer was ever
// told they existed.
//
// Role, Email, Mobile, CV, PDF, Word, Attach, Submit, Consent Box, Tick and
// Automated Reply stay in English deliberately: they are what a Sri Lankan
// applicant reads on the form itself and says out loud, the same register
// as this feature's own content overlays.
//
// `{email}` is a token the component splits on, never the careers mailbox
// pasted into every locale's message.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const validationMessages = {
  roleRequired: "ඔබ අයදුම් කරන Role එක තෝරන්න",
  roleInvalid: "ලැයිස්තුවෙන් Role එකක් තෝරන්න",
  nameRequired: "කරුණාකර ඔබේ නම දෙන්න",
  emailRequired: "Email එක අවශ්‍යයි",
  emailInvalid: "එම Email ලිපිනය හරි නෑ වගේ",
  phoneRequired: "කරුණාකර ඔබේ Mobile අංකය දෙන්න",
  chooseFromList: "ලැයිස්තුවෙන් විකල්පයක් තෝරන්න",
  consentRequired: "කරුණාකර අපිට ඔබේ අයදුම්පත තියාගන්න පුළුවන් වෙන්න Consent Box එක Tick කරන්න",
  fixFields: "කරුණාකර සලකුණු කර ඇති කොටස් නිවැරදි කර නැවත උත්සාහ කරන්න.",
  cvMissing: "අයදුම් කරන්න කරුණාකර ඔබේ CV එක Attach කරන්න.",
  cvMissingField: "ඔබේ CV එක Attach කරන්න (PDF හෝ Word ලේඛනයක්)",
  cvTypeInvalid: "PDF හෝ Word ලේඛන (.pdf, .doc, .docx) විතරයි පිළිගන්නේ",
  cvTooLarge: "එම ගොනුව 5 MB ට වඩා වඩියි. කරුණාකර කුඩා එකක් Attach කරන්න.",
  sendFailed: "දැනට ඔබේ අයදුම්පත Submit කරන්න බැරි වුණා. කරුණාකර {email} වලට එය Email කරන්න.",
  sendSuccess:
    "ස්තුතියි. ඔබේ අයදුම්පත අපිට ලැබුණා, ඔබට Automated Reply එකක් නෙවෙයි කෙනෙක්ගෙන් උත්තරයක් එනවා.",
};
