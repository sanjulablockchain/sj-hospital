"use server";

import { z } from "zod";
import { ALLOWED_CV_TYPES, MAX_CV_SIZE_BYTES, VALIDATION_MESSAGES, jobApplicationSchema } from "../schemas";
import { sendJobApplicationEmail } from "../lib/mailer";
import {
  CAREERS_EMAIL,
  GENERAL_APPLICATION_ROLE_ID,
  experienceOptions,
  generalApplicationLabel,
  jobs,
  sourceOptions,
} from "../data/content";
import type { JobApplicationField, JobApplicationFormState } from "../types";
import { DEFAULT_LOCALE, hasLocale } from "@/lib/i18n/locales";

/**
 * Strip anything that could steer a mail client or a filesystem, and keep the
 * tail of the name rather than the head: a long filename's extension is the
 * part worth preserving.
 */
function sanitizeFileName(name: string) {
  return name.replace(/[^\w.\- ]/g, "_").slice(-100);
}

/** `formData.get` returns `File | string | null`; the schema only wants strings. */
function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

const FIELDS: readonly JobApplicationField[] = [
  "fullName",
  "roleTitle",
  "email",
  "phone",
  "registrationNumber",
  "experience",
  "startDate",
  "source",
  "note",
];

/**
 * Human Resources reads every application in English, regardless of which
 * language the applicant filled the form in, because `roleTitle`, `experience`
 * and `source` all travel through the form as the fixed English ids
 * `data/content.ts` defines (see the note above `jobs` there), not the
 * translated label a reader saw. This turns an id such as `"pharmacist"` or
 * `"3-5-years"` back into the English phrase the old, English-only version of
 * this action used to send, so the email HR reads and the subject line it
 * arrives with are unaffected by Task 13.
 */
function toEnglishLabel(input: z.infer<ReturnType<typeof jobApplicationSchema>>) {
  const role =
    input.roleTitle === GENERAL_APPLICATION_ROLE_ID
      ? generalApplicationLabel
      : jobs.find((job) => job.id === input.roleTitle)?.title ?? input.roleTitle;
  const experience = input.experience
    ? experienceOptions.find((option) => option.id === input.experience)?.label ?? input.experience
    : input.experience;
  const source = input.source
    ? sourceOptions.find((option) => option.id === input.source)?.label ?? input.source
    : input.source;
  return { ...input, roleTitle: role, experience, source };
}

export async function submitJobApplication(
  _prevState: JobApplicationFormState,
  formData: FormData
): Promise<JobApplicationFormState> {
  // The locale arrives from a hidden form field, so it is untrusted input: a
  // missing or unrecognised value falls back to English rather than throwing.
  const submittedLocale = String(formData.get("locale") ?? "");
  const locale = hasLocale(submittedLocale) ? submittedLocale : DEFAULT_LOCALE;
  const messages = VALIDATION_MESSAGES[locale];

  const raw = Object.fromEntries(FIELDS.map((field) => [field, text(formData, field)])) as Record<
    JobApplicationField,
    string
  >;
  const consentGiven = text(formData, "consent") === "on";

  // Every rejection carries the applicant's answers back to the form, because
  // React empties an uncontrolled form as soon as the action resolves.
  const reject = (
    message: string,
    fieldErrors?: JobApplicationFormState["fieldErrors"]
  ): JobApplicationFormState => ({
    status: "error",
    message,
    fieldErrors,
    values: raw,
    consentGiven,
  });

  const validated = jobApplicationSchema(locale).safeParse({
    ...raw,
    consent: text(formData, "consent"),
  });

  if (!validated.success) {
    return reject(messages.fixFields, z.flattenError(validated.error).fieldErrors);
  }

  const cv = formData.get("cv");

  if (!(cv instanceof File) || cv.size === 0) {
    return reject(messages.cvMissing, {
      cv: [messages.cvMissingField],
    });
  }

  if (!ALLOWED_CV_TYPES.includes(cv.type)) {
    return reject(messages.fixFields, {
      cv: [messages.cvTypeInvalid],
    });
  }

  if (cv.size > MAX_CV_SIZE_BYTES) {
    return reject(messages.fixFields, {
      cv: [messages.cvTooLarge],
    });
  }

  try {
    const buffer = Buffer.from(await cv.arrayBuffer());
    await sendJobApplicationEmail(toEnglishLabel(validated.data), {
      filename: sanitizeFileName(cv.name || "cv"),
      content: buffer,
      contentType: cv.type,
    });
  } catch (error) {
    // The applicant must never see an SMTP error, but Human Resources needs to
    // know an application was lost, so this is logged in full server side and
    // the candidate is given the email route as a fallback.
    console.error("Failed to send job application:", error);
    return reject(messages.sendFailed.replace("{email}", CAREERS_EMAIL));
  }

  // No `values`, which is what lets the form clear itself on the way out.
  return {
    status: "success",
    message: messages.sendSuccess,
  };
}
