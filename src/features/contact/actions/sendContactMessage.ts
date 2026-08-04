"use server";

import { z } from "zod";
import { contactMessageSchema } from "../schemas";
import { sendContactEmail } from "../lib/mailer";
import type { ContactFormState } from "../types";

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validated = contactMessageSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: z.flattenError(validated.error).fieldErrors,
    };
  }

  try {
    await sendContactEmail(validated.data);
  } catch (error) {
    console.error("Failed to send contact message:", error);
    return {
      status: "error",
      message: "We couldn't send your message right now. Please call us at 0117 84 84 84 instead.",
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out. We'll get back to you within one business day.",
  };
}
