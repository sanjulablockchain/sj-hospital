import { z } from "zod";
import type { Locale } from "@/lib/i18n/locales";
import { validationMessages as si } from "./schemas.si.ts";
import { validationMessages as ta } from "./schemas.ta.ts";

/**
 * The English validation messages, and the shape both overlays must match.
 *
 * The Sinhala and Tamil tables live in `schemas.si.ts` and `schemas.ta.ts`,
 * beside this file, each carrying its own `__review` marker so
 * `npm run i18n:status` lists them and a speaker has to sign them off. They
 * used to sit inline here, which kept roughly 30 drafted strings out of the
 * review gate entirely.
 */
export const validationMessages = {
  firstNameRequired: "First name is required",
  lastNameRequired: "Last name is required",
  emailRequired: "Email is required",
  emailInvalid: "Enter a valid email address",
  fixFields: "Please fix the highlighted fields and try again.",
  sendFailed: "We couldn't send your message right now. Please call us at {phone} instead.",
  sendSuccess: "Thanks for reaching out. We'll get back to you within one business day.",
};

export type ValidationMessages = typeof validationMessages;

/**
 * Validation messages by locale. The annotation is what makes both overlays
 * owe every key: a missing or misspelled one fails `tsc` rather than falling
 * back and answering a Sinhala reader in English.
 */
export const VALIDATION_MESSAGES: Record<Locale, ValidationMessages> = {
  en: validationMessages,
  si,
  ta,
};

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
