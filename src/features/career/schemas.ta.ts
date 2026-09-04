// Tamil for the careers form's own validation messages and banners.
// Written as a full object rather than a partial: every message is
// translated, and `schemas.ts` reads this synchronously into
// VALIDATION_MESSAGES rather than merging it through `localize`, the same
// shape `chromeCopy.ta.ts` uses for the chrome's own strings.
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
  roleRequired: "நீங்கள் விண்ணப்பிக்கும் Role ஐ தேர்ந்தெடுங்கள்",
  roleInvalid: "பட்டியலிலிருந்து ஒரு Role ஐ தேர்ந்தெடுங்கள்",
  nameRequired: "தயவுசெய்து உங்கள் பெயரைத் தரவும்",
  emailRequired: "Email தேவை",
  emailInvalid: "அந்த Email முகவரி சரியாகத் தெரியவில்லை",
  phoneRequired: "தயவுசெய்து உங்கள் Mobile எண்ணைத் தரவும்",
  chooseFromList: "பட்டியலிலிருந்து ஒரு விருப்பத்தைத் தேர்ந்தெடுங்கள்",
  consentRequired: "உங்கள் விண்ணப்பத்தை நாங்கள் வைத்திருக்க தயவுசெய்து Consent Box ஐ Tick செய்யுங்கள்",
  fixFields: "தயவுசெய்து குறிக்கப்பட்ட புலங்களைச் சரிசெய்து மீண்டும் முயற்சிக்கவும்.",
  cvMissing: "விண்ணப்பிக்க தயவுசெய்து உங்கள் CV ஐ Attach செய்யுங்கள்.",
  cvMissingField: "உங்கள் CV ஐ Attach செய்யுங்கள் (PDF அல்லது Word ஆவணம்)",
  cvTypeInvalid: "PDF அல்லது Word ஆவணங்கள் (.pdf, .doc, .docx) மட்டுமே ஏற்கப்படும்",
  cvTooLarge: "அந்த கோப்பு 5 MB ஐ விட அதிகமாக உள்ளது. தயவுசெய்து சிறிய ஒன்றை Attach செய்யுங்கள்.",
  sendFailed: "தற்போது உங்கள் விண்ணப்பத்தை Submit செய்ய முடியவில்லை. தயவுசெய்து அதை {email} க்கு Email செய்யுங்கள்.",
  sendSuccess:
    "நன்றி. உங்கள் விண்ணப்பம் எங்களுக்கு வந்துவிட்டது, Automated Reply அல்ல, ஒருவரிடமிருந்து பதில் வரும்.",
};
