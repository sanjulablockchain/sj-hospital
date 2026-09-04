import { z } from "zod";
import type { Locale } from "@/lib/i18n/locales";
// Explicit extension: this is a runtime (value) import, and `npm test` runs the
// files through Node's own type stripping, which resolves ESM specifiers
// literally and will not guess at `.ts`. tsconfig has
// `allowImportingTsExtensions`, and Turbopack resolves it the same way, so the
// app build is unaffected.
import { experienceOptions, roleIds, sourceOptions } from "./data/content.ts";
import { validationMessages as si } from "./schemas.si.ts";
import { validationMessages as ta } from "./schemas.ta.ts";

export const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;

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
