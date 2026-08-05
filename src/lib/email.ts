export const EMAIL_BRAND = {
  primary: "#4a2a82",
  accent: "#33b4e5",
  accentDark: "#14769f",
  surface: "#f4f6fa",
  ink: "#1e1b2e",
  muted: "#5b6472",
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type BrandedEmailOptions = {
  eyebrow: string;
  title: string;
  bodyHtml: string;
  footerNote: string;
};

export function renderBrandedEmail({ eyebrow, title, bodyHtml, footerNote }: BrandedEmailOptions) {
  const { primary, accent, accentDark, surface, ink, muted } = EMAIL_BRAND;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:${surface};font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${surface};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(30,27,46,0.12);">
            <tr>
              <td style="background-color:${primary};padding:28px 32px;">
                <p style="margin:0;font-size:18px;font-weight:800;color:#ffffff;letter-spacing:0.3px;">St. Joseph Hospital</p>
                <p style="margin:2px 0 0;font-size:11px;font-weight:600;color:${accent};text-transform:uppercase;letter-spacing:1.5px;">To Live Is A Privilege</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:${accentDark};text-transform:uppercase;letter-spacing:1px;">${eyebrow}</p>
                <h1 style="margin:0 0 20px;font-size:22px;font-weight:800;color:${ink};">${title}</h1>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:${surface};border-top:1px solid rgba(30,27,46,0.08);">
                <p style="margin:0;font-size:12px;color:${muted};">${footerNote}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
