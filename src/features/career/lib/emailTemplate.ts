import { escapeHtml, renderBrandedEmail } from "@/lib/email";
import type { JobApplicationInput } from "../schemas";

export function jobApplicationEmailHtml(input: JobApplicationInput, cvFileName: string) {
  const name = escapeHtml(`${input.firstName} ${input.lastName}`.trim());
  const email = escapeHtml(input.email);
  const phone = escapeHtml(input.phone?.trim() || "Not provided");
  const role = escapeHtml(input.roleTitle);
  const fileName = escapeHtml(cvFileName);
  const message = escapeHtml(input.message?.trim() || "(no cover note provided)").replace(
    /\n/g,
    "<br />"
  );

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="padding:0 12px 12px 0;width:90px;font-size:13px;font-weight:700;color:#5b6472;vertical-align:top;">Role</td>
        <td style="padding:0 0 12px;font-size:14px;color:#1e1b2e;font-weight:700;">${role}</td>
      </tr>
      <tr>
        <td style="padding:0 12px 12px 0;width:90px;font-size:13px;font-weight:700;color:#5b6472;vertical-align:top;">Name</td>
        <td style="padding:0 0 12px;font-size:14px;color:#1e1b2e;">${name}</td>
      </tr>
      <tr>
        <td style="padding:0 12px 12px 0;width:90px;font-size:13px;font-weight:700;color:#5b6472;vertical-align:top;">Email</td>
        <td style="padding:0 0 12px;font-size:14px;">
          <a href="mailto:${email}" style="color:#14769f;text-decoration:none;font-weight:600;">${email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:0 12px 0 0;width:90px;font-size:13px;font-weight:700;color:#5b6472;vertical-align:top;">Phone</td>
        <td style="padding:0;font-size:14px;color:#1e1b2e;">${phone}</td>
      </tr>
    </table>

    <div style="background-color:#f4f6fa;border-radius:12px;padding:18px 20px;margin-bottom:20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#5b6472;text-transform:uppercase;letter-spacing:0.5px;">Cover Note</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#1e1b2e;">${message}</p>
    </div>

    <div style="display:flex;align-items:center;gap:10px;border:1px solid rgba(30,27,46,0.1);border-radius:12px;padding:14px 16px;">
      <p style="margin:0;font-size:13px;color:#1e1b2e;">
        <span style="font-weight:700;">CV attached:</span> ${fileName}
      </p>
    </div>
  `;

  return renderBrandedEmail({
    eyebrow: "Career Application",
    title: `New Application: ${input.roleTitle}`,
    bodyHtml,
    footerNote: "Sent from the careers page at sjhospital.lk",
  });
}
