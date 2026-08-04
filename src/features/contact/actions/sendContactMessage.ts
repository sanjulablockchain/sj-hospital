"use server";

import { contactMessageSchema } from "../schemas";
import { sendContactEmail } from "../lib/mailer";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"firstName" | "lastName" | "email" | "message", string[]>>;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};

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
      fieldErrors: validated.error.flatten().fieldErrors,
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
