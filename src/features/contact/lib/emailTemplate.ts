import { escapeHtml, renderBrandedEmail } from "@/lib/email";
import type { ContactMessageInput } from "../schemas";

export function contactEmailHtml(input: ContactMessageInput) {
  const name = escapeHtml(`${input.firstName} ${input.lastName}`.trim());
  const email = escapeHtml(input.email);
  const message = escapeHtml(input.message?.trim() || "(no message provided)").replace(/\n/g, "<br />");

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="padding:0 12px 12px 0;width:80px;font-size:13px;font-weight:700;color:#5b6472;vertical-align:top;">Name</td>
        <td style="padding:0 0 12px;font-size:14px;color:#1e1b2e;">${name}</td>
      </tr>
      <tr>
        <td style="padding:0 12px 0 0;width:80px;font-size:13px;font-weight:700;color:#5b6472;vertical-align:top;">Email</td>
        <td style="padding:0;font-size:14px;">
          <a href="mailto:${email}" style="color:#14769f;text-decoration:none;font-weight:600;">${email}</a>
        </td>
      </tr>
    </table>

    <div style="background-color:#f4f6fa;border-radius:12px;padding:18px 20px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#5b6472;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#1e1b2e;">${message}</p>
    </div>
  `;

  return renderBrandedEmail({
    eyebrow: "Contact Form",
    title: "New Website Message",
    bodyHtml,
    footerNote: "Sent from the contact form at 229/10 St. Joseph Street, Negombo &middot; 0117 84 84 84",
  });
}
