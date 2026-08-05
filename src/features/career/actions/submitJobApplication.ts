"use server";

import { z } from "zod";
import { ALLOWED_CV_TYPES, MAX_CV_SIZE_BYTES, jobApplicationSchema } from "../schemas";
import { sendJobApplicationEmail } from "../lib/mailer";
import type { JobApplicationFormState } from "../types";

function sanitizeFileName(name: string) {
  return name.replace(/[^\w.\- ]/g, "_").slice(-100);
}

export async function submitJobApplication(
  _prevState: JobApplicationFormState,
  formData: FormData
): Promise<JobApplicationFormState> {
  const validated = jobApplicationSchema.safeParse({
    roleTitle: formData.get("roleTitle"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: z.flattenError(validated.error).fieldErrors,
    };
  }

  const cv = formData.get("cv");

  if (!(cv instanceof File) || cv.size === 0) {
    return {
      status: "error",
      message: "Please attach your CV to apply.",
      fieldErrors: { cv: ["Attach your CV (PDF or Word document)"] },
    };
  }

  if (!ALLOWED_CV_TYPES.includes(cv.type)) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: { cv: ["Only PDF or Word documents (.pdf, .doc, .docx) are accepted"] },
    };
  }

  if (cv.size > MAX_CV_SIZE_BYTES) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: { cv: ["File is too large (max 5 MB)"] },
    };
  }

  try {
    const buffer = Buffer.from(await cv.arrayBuffer());
    await sendJobApplicationEmail(validated.data, {
      filename: sanitizeFileName(cv.name || "cv"),
      content: buffer,
      contentType: cv.type,
    });
  } catch (error) {
    console.error("Failed to send job application:", error);
    return {
      status: "error",
      message: "We couldn't submit your application right now. Please email hr@ktdoctor.com instead.",
    };
  }

  return {
    status: "success",
    message: "Application received. Our team will review it and be in touch soon.",
  };
}
