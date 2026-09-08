"use server";

import { z } from "zod";
import { contactMessageSchema, VALIDATION_MESSAGES } from "../schemas";
import { sendContactEmail } from "../lib/mailer";
import type { ContactFormState } from "../types";
import { DEFAULT_LOCALE, hasLocale } from "@/lib/i18n/locales";
import { contactRows } from "../data/content";

// The phone number is a fact with one home, `contactRows`, so it is looked up
// by its structural `icon` key rather than pasted into every locale's message.
const HOSPITAL_PHONE = contactRows.find((row) => row.icon === "phone")?.value ?? "0117 84 84 84";

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // The locale arrives from a hidden form field, so it is untrusted input: a
  // missing or unrecognised value falls back to English rather than throwing.
  const submittedLocale = String(formData.get("locale") ?? "");
  const locale = hasLocale(submittedLocale) ? submittedLocale : DEFAULT_LOCALE;
  const messages = VALIDATION_MESSAGES[locale];

  const validated = contactMessageSchema(locale).safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validated.success) {
    return {
      status: "error",
      message: messages.fixFields,
      fieldErrors: z.flattenError(validated.error).fieldErrors,
    };
  }

  try {
    await sendContactEmail(validated.data);
  } catch (error) {
    console.error("Failed to send contact message:", error);
    return {
      status: "error",
      message: messages.sendFailed.replace("{phone}", HOSPITAL_PHONE),
    };
  }

  return {
    status: "success",
    message: messages.sendSuccess,
  };
}
