import "server-only";
import nodemailer from "nodemailer";

export function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "SMTP is not configured: set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env.local"
    );
  }

  const port = Number(SMTP_PORT);

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // 465 is implicit TLS; 587 (what Microsoft 365 uses) opens in the clear and
    // upgrades with STARTTLS, so `secure` has to be false there.
    secure: port === 465,
    // Without this, an STARTTLS server that fails to advertise the capability
    // would silently leave the session unencrypted and the mailbox password
    // would go over the wire in plain AUTH LOGIN. requireTLS aborts instead.
    requireTLS: port !== 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: { minVersion: "TLSv1.2" },
  });
}
