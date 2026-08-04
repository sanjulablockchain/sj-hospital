import "server-only";
import nodemailer from "nodemailer";
import type { ContactMessageInput } from "../schemas";

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "SMTP is not configured: set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env.local"
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

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
  });
}
