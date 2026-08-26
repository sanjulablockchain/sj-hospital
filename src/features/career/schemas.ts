import { z } from "zod";
// Explicit extension: this is a runtime (value) import, and `npm test` runs the
// files through Node's own type stripping, which resolves ESM specifiers
// literally and will not guess at `.ts`. tsconfig has
// `allowImportingTsExtensions`, and Turbopack resolves it the same way, so the
// app build is unaffected.
import { experienceOptions, roleOptions, sourceOptions } from "./data/content.ts";

export const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * The nine fields the reference asks for, plus the consent tick.
 *
 * The three selects are validated against the option lists rather than as free
 * strings: they arrive as `FormData` values a client can set to anything, and
 * an unrecognised role would otherwise be forwarded verbatim into the subject
 * line of an email to Human Resources.
 *
 * Only name, role, email, phone, consent and the CV are required. The rest are
 * the fields that save a round of emails when they are filled in and cost
 * nothing when they are not.
 */
export const jobApplicationSchema = z.object({
  roleTitle: z
    .string()
    .trim()
    .min(1, "Choose the role you are applying for")
    .refine((value) => roleOptions.includes(value), "Choose a role from the list"),
  fullName: z.string().trim().min(1, "Please give us your name").max(120),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("That email address does not look right")),
  phone: z.string().trim().min(1, "Please give us a mobile number").max(40),
  registrationNumber: z.string().trim().max(60).optional(),
  experience: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || experienceOptions.includes(value),
      "Choose an option from the list"
    )
    .optional(),
  startDate: z.string().trim().max(120).optional(),
  source: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || sourceOptions.includes(value),
      "Choose an option from the list"
    )
    .optional(),
  note: z.string().trim().max(4000).optional(),
  // The checkbox only appears in FormData when it is ticked, so the action
  // normalises a missing value to "" and this rejects it.
  consent: z
    .string()
    .refine((value) => value === "on", "Please tick the consent box so we may hold your application"),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
