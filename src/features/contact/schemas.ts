import { z } from "zod";
import type { Locale } from "@/lib/i18n/locales";

/**
 * Validation messages by locale. The keys are shared, and
 * `schemas.i18n.test.ts` fails if one locale is missing any of them: a missing
 * key would otherwise fall back and answer a Sinhala reader in English.
 */
export const VALIDATION_MESSAGES = {
  en: {
    firstNameRequired: "First name is required",
    lastNameRequired: "Last name is required",
    emailRequired: "Email is required",
    emailInvalid: "Enter a valid email address",
    fixFields: "Please fix the highlighted fields and try again.",
    sendFailed: "We couldn't send your message right now. Please call us at {phone} instead.",
    sendSuccess: "Thanks for reaching out. We'll get back to you within one business day.",
  },
  si: {
    firstNameRequired: "මුල් නම අවශ්‍යයි",
    lastNameRequired: "වාසගම අවශ්‍යයි",
    emailRequired: "Email එක අවශ්‍යයි",
    emailInvalid: "වලංගු Email එකක් ඇතුළත් කරන්න",
    fixFields: "කරුණාකර සලකුණු කර ඇති කොටස් නිවැරදි කර නැවත උත්සාහ කරන්න.",
    sendFailed: "දැනට ඔබේ message එක යැවීමට නොහැකි විය. කරුණාකර {phone} අමතන්න.",
    sendSuccess: "සම්බන්ධ වීම ගැන ස්තුතියි. අපි එක් වැඩ කරන දිනක් ඇතුළත ඔබ හා සම්බන්ධ වෙනවා.",
  },
  ta: {
    firstNameRequired: "முதல் பெயர் தேவை",
    lastNameRequired: "கடைசிப் பெயர் தேவை",
    emailRequired: "Email தேவை",
    emailInvalid: "சரியான Email ஒன்றை உள்ளிடுங்கள்",
    fixFields: "தயவுசெய்து குறிக்கப்பட்ட புலங்களைச் சரிசெய்து மீண்டும் முயற்சிக்கவும்.",
    sendFailed: "தற்போது உங்கள் message ஐ அனுப்ப முடியவில்லை. தயவுசெய்து {phone} ஐ அழையுங்கள்.",
    sendSuccess: "தொடர்பு கொண்டதற்கு நன்றி. ஒரு வேலை நாளுக்குள் நாங்கள் உங்களைத் தொடர்பு கொள்வோம்.",
  },
} satisfies Record<Locale, Record<string, string>>;

export function contactMessageSchema(locale: Locale) {
  const m = VALIDATION_MESSAGES[locale];
  return z.object({
    firstName: z.string().trim().min(1, m.firstNameRequired),
    lastName: z.string().trim().min(1, m.lastNameRequired),
    email: z.string().trim().min(1, m.emailRequired).pipe(z.email(m.emailInvalid)),
    message: z.string().trim().optional(),
  });
}

// The existing type export derives from a const schema, which no longer
// exists. Rederive it from the factory's return type or every importer breaks.
export type ContactMessageInput = z.infer<ReturnType<typeof contactMessageSchema>>;
