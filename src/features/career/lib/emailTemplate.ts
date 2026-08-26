import { escapeHtml, renderBrandedEmail } from "@/lib/email";
import type { JobApplicationInput } from "../schemas";

const NOT_PROVIDED = "Not provided";

/** The nine fields in the order the form asks for them, so the email reads the same way. */
export function applicationRows(input: JobApplicationInput) {
  return [
    { label: "Role", value: input.roleTitle, emphasise: true },
    { label: "Name", value: input.fullName },
    { label: "Email", value: input.email, mailto: true },
    { label: "Mobile", value: input.phone },
    { label: "Registration", value: input.registrationNumber?.trim() || NOT_PROVIDED },
    { label: "Experience", value: input.experience?.trim() || NOT_PROVIDED },
    { label: "Can start", value: input.startDate?.trim() || NOT_PROVIDED },
    { label: "Heard via", value: input.source?.trim() || NOT_PROVIDED },
  ];
}

export function jobApplicationEmailHtml(input: JobApplicationInput, cvFileName: string) {
  const rowsHtml = applicationRows(input)
    .map((row) => {
      const value = escapeHtml(row.value);
      const cell = row.mailto
        ? `<a href="mailto:${value}" style="color:#14769f;text-decoration:none;font-weight:600;">${value}</a>`
        : value;
      return `
      <tr>
        <td style="padding:0 12px 12px 0;width:112px;font-size:13px;font-weight:700;color:#5b6472;vertical-align:top;">${escapeHtml(row.label)}</td>
        <td style="padding:0 0 12px;font-size:14px;color:#1e1b2e;${row.emphasise ? "font-weight:700;" : ""}">${cell}</td>
      </tr>`;
    })
    .join("");

  const note = escapeHtml(input.note?.trim() || "(nothing added)").replace(/\n/g, "<br />");
  const fileName = escapeHtml(cvFileName);

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      ${rowsHtml}
    </table>

    <div style="background-color:#f4f6fa;border-radius:12px;padding:18px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#5b6472;text-transform:uppercase;letter-spacing:0.5px;">Anything we should know</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#1e1b2e;">${note}</p>
    </div>

    <div style="border:1px solid rgba(30,27,46,0.1);border-radius:12px;padding:14px 16px;margin-bottom:20px;">
      <p style="margin:0;font-size:13px;color:#1e1b2e;">
        <span style="font-weight:700;">CV attached:</span> ${fileName}
      </p>
    </div>

    <p style="margin:0;font-size:12px;line-height:1.6;color:#5b6472;">
      The applicant ticked the consent box: this application may be held for six months and the
      applicant contacted about comparable vacancies. Their current employer must not be approached
      without written permission.
    </p>
  `;

  return renderBrandedEmail({
    eyebrow: "Career Application",
    title: `New application: ${input.roleTitle}`,
    bodyHtml,
    footerNote: "Sent from the careers page at sjhospital.lk",
  });
}
