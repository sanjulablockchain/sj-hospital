import "server-only";
import { getTransporter } from "@/lib/mailer";
import type { JobApplicationInput } from "../schemas";
import { applicationRows, jobApplicationEmailHtml } from "./emailTemplate";

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
    // Microsoft 365 will not relay a From the authenticated mailbox has no
    // Send As right over, so the envelope stays the hospital's own address and
    // the applicant goes on Reply-To. Hitting reply in Outlook then answers the
    // candidate, which is the whole point.
    from: SMTP_FROM,
    to: CAREER_TO_EMAILS.split(",").map((address) => address.trim()),
    replyTo: input.email,
    subject: `Job application: ${input.roleTitle} - ${input.fullName}`,
    text: [
      ...applicationRows(input).map((row) => `${row.label}: ${row.value}`),
      "",
      input.note?.trim() || "(nothing added)",
      "",
      `CV attached: ${cv.filename}`,
    ].join("\n"),
    html: jobApplicationEmailHtml(input, cv.filename),
    attachments: [cv],
  });
}
