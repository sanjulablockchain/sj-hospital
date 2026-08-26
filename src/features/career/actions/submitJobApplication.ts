"use server";

import { z } from "zod";
import { ALLOWED_CV_TYPES, MAX_CV_SIZE_BYTES, jobApplicationSchema } from "../schemas";
import { sendJobApplicationEmail } from "../lib/mailer";
import { CAREERS_EMAIL } from "../data/content";
import type { JobApplicationField, JobApplicationFormState } from "../types";

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

export async function submitJobApplication(
  _prevState: JobApplicationFormState,
  formData: FormData
): Promise<JobApplicationFormState> {
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

  const validated = jobApplicationSchema.safeParse({ ...raw, consent: text(formData, "consent") });

  if (!validated.success) {
    return reject(
      "Please fix the highlighted fields and try again.",
      z.flattenError(validated.error).fieldErrors
    );
  }

  const cv = formData.get("cv");

  if (!(cv instanceof File) || cv.size === 0) {
    return reject("Please attach your CV to apply.", {
      cv: ["Attach your CV (PDF or Word document)"],
    });
  }

  if (!ALLOWED_CV_TYPES.includes(cv.type)) {
    return reject("Please fix the highlighted fields and try again.", {
      cv: ["Only PDF or Word documents (.pdf, .doc, .docx) are accepted"],
    });
  }

  if (cv.size > MAX_CV_SIZE_BYTES) {
    return reject("Please fix the highlighted fields and try again.", {
      cv: ["That file is over 5 MB. Please attach a smaller one."],
    });
  }

  try {
    const buffer = Buffer.from(await cv.arrayBuffer());
    await sendJobApplicationEmail(validated.data, {
      filename: sanitizeFileName(cv.name || "cv"),
      content: buffer,
      contentType: cv.type,
    });
  } catch (error) {
    // The applicant must never see an SMTP error, but Human Resources needs to
    // know an application was lost, so this is logged in full server side and
    // the candidate is given the email route as a fallback.
    console.error("Failed to send job application:", error);
    return reject(
      `We could not submit your application just now. Please email it to ${CAREERS_EMAIL} instead.`
    );
  }

  // No `values`, which is what lets the form clear itself on the way out.
  return {
    status: "success",
    message:
      "Thank you. Your application has reached us, and you will hear from a person rather than an automated reply.",
  };
}
