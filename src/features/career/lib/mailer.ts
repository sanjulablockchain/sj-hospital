import "server-only";
import { getTransporter } from "@/lib/mailer";
import type { JobApplicationInput } from "../schemas";
import { jobApplicationEmailHtml } from "./emailTemplate";

type CvAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export async function sendJobApplicationEmail(input: JobApplicationInput, cv: CvAttachment) {
  const { SMTP_FROM, CAREER_TO_EMAILS } = process.env;

  if (!SMTP_FROM || !CAREER_TO_EMAILS) {
    throw new Error("Missing SMTP_FROM or CAREER_TO_EMAILS in .env.local");
  }

  const transporter = getTransporter();

  await transporter.sendMail({
    from: SMTP_FROM,
    to: CAREER_TO_EMAILS.split(",").map((address) => address.trim()),
    replyTo: input.email,
    subject: `New job application: ${input.roleTitle} - ${input.firstName} ${input.lastName}`,
    text: [
      `Role: ${input.roleTitle}`,
      `Name: ${input.firstName} ${input.lastName}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone?.trim() || "Not provided"}`,
      "",
      input.message?.trim() || "(no cover note provided)",
    ].join("\n"),
    html: jobApplicationEmailHtml(input, cv.filename),
    attachments: [cv],
  });
}
