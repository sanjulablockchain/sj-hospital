import { z } from "zod";
import type { Locale } from "@/lib/i18n/locales";
// Explicit extension: this is a runtime (value) import, and `npm test` runs the
// files through Node's own type stripping, which resolves ESM specifiers
// literally and will not guess at `.ts`. tsconfig has
// `allowImportingTsExtensions`, and Turbopack resolves it the same way, so the
// app build is unaffected.
import { experienceOptions, roleIds, sourceOptions } from "./data/content.ts";

export const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Validation messages by locale, the same pattern `contact`'s own
 * `schemas.ts` uses. The keys are shared, and `schemas.i18n.test.ts` fails if
 * one locale is missing any of them: a missing key would otherwise answer a
 * Sinhala or Tamil reader in English.
 *
 * `sendFailed` carries a `{email}` token rather than the careers mailbox
 * pasted into every locale's message, matching the way contact's own
 * `sendFailed` carries `{phone}`.
 */
export const VALIDATION_MESSAGES = {
  en: {
    roleRequired: "Choose the role you are applying for",
    roleInvalid: "Choose a role from the list",
    nameRequired: "Please give us your name",
    emailRequired: "Email is required",
    emailInvalid: "That email address does not look right",
    phoneRequired: "Please give us a mobile number",
    chooseFromList: "Choose an option from the list",
    consentRequired: "Please tick the consent box so we may hold your application",
    fixFields: "Please fix the highlighted fields and try again.",
    cvMissing: "Please attach your CV to apply.",
    cvMissingField: "Attach your CV (PDF or Word document)",
    cvTypeInvalid: "Only PDF or Word documents (.pdf, .doc, .docx) are accepted",
    cvTooLarge: "That file is over 5 MB. Please attach a smaller one.",
    sendFailed: "We could not submit your application just now. Please email it to {email} instead.",
    sendSuccess:
      "Thank you. Your application has reached us, and you will hear from a person rather than an automated reply.",
  },
  si: {
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
  },
  ta: {
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
  },
} satisfies Record<Locale, Record<string, string>>;

/**
 * The nine fields the reference asks for, plus the consent tick.
 *
 * The three selects are validated against `roleIds` / the option lists'
 * `.id`s rather than as free strings: they arrive as `FormData` values a
 * client can set to anything, and an unrecognised role would otherwise be
 * forwarded verbatim into the subject line of an email to Human Resources.
 * Those ids are fixed English strings regardless of `locale` (see the note
 * above `jobs` in `data/content.ts`), which is why this factory only needs
 * `locale` for its messages, not for a different list to validate against.
 *
 * Only name, role, email, phone, consent and the CV are required. The rest are
 * the fields that save a round of emails when they are filled in and cost
 * nothing when they are not.
 */
export function jobApplicationSchema(locale: Locale) {
  const m = VALIDATION_MESSAGES[locale];
  return z.object({
    roleTitle: z
      .string()
      .trim()
      .min(1, m.roleRequired)
      .refine((value) => roleIds.includes(value), m.roleInvalid),
    fullName: z.string().trim().min(1, m.nameRequired).max(120),
    email: z.string().trim().min(1, m.emailRequired).pipe(z.email(m.emailInvalid)),
    phone: z.string().trim().min(1, m.phoneRequired).max(40),
    registrationNumber: z.string().trim().max(60).optional(),
    experience: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || experienceOptions.some((option) => option.id === value),
        m.chooseFromList
      )
      .optional(),
    startDate: z.string().trim().max(120).optional(),
    source: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || sourceOptions.some((option) => option.id === value),
        m.chooseFromList
      )
      .optional(),
    note: z.string().trim().max(4000).optional(),
    // The checkbox only appears in FormData when it is ticked, so the action
    // normalises a missing value to "" and this rejects it.
    consent: z.string().refine((value) => value === "on", m.consentRequired),
  });
}

// The existing type export derives from a const schema, which no longer
// exists. Rederive it from the factory's return type or every importer breaks.
export type JobApplicationInput = z.infer<ReturnType<typeof jobApplicationSchema>>;
