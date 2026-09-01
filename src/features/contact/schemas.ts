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
  },
  si: {
    firstNameRequired: "මුල් නම අවශ්‍යයි",
    lastNameRequired: "වාසගම අවශ්‍යයි",
    emailRequired: "Email එක අවශ්‍යයි",
    emailInvalid: "වලංගු Email එකක් ඇතුළත් කරන්න",
  },
  ta: {
    firstNameRequired: "முதல் பெயர் தேவை",
    lastNameRequired: "கடைசிப் பெயர் தேவை",
    emailRequired: "Email தேவை",
    emailInvalid: "சரியான Email ஒன்றை உள்ளிடுங்கள்",
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
