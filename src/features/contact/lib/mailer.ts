import "server-only";
import { getTransporter } from "@/lib/mailer";
import type { ContactMessageInput } from "../schemas";
import { contactEmailHtml } from "./emailTemplate";

export async function sendContactEmail(input: ContactMessageInput) {
  const { SMTP_FROM, CONTACT_TO_EMAILS } = process.env;

  if (!SMTP_FROM || !CONTACT_TO_EMAILS) {
    throw new Error("Missing SMTP_FROM or CONTACT_TO_EMAILS in .env.local");
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: SMTP_FROM,
    to: CONTACT_TO_EMAILS.split(",").map((address) => address.trim()),
    replyTo: input.email,
    subject: `New website message from ${input.firstName} ${input.lastName}`,
    text: [
      `Name: ${input.firstName} ${input.lastName}`,
      `Email: ${input.email}`,
      "",
      input.message?.trim() || "(no message provided)",
    ].join("\n"),
    html: contactEmailHtml(input),
  });
}
