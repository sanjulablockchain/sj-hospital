import { LOCALE_COOKIE, type Locale } from "./locales.ts";

/**
 * Remember an explicit choice for a year. This cookie is the only thing that
 * ever moves a reader off English automatically, and only after they have
 * asked for it once by using the switcher.
 *
 * No "use client" directive: this is a plain function that happens to touch
 * `document`, and the client components that call it carry the directive.
 *
 * `Secure` is appended only when the page itself is already HTTPS, not
 * unconditionally: a browser silently drops a `Secure` cookie set from a
 * plain HTTP origin rather than storing it without the flag, and this
 * project's own `npm run dev` (and the Docker dev compose file) serve over
 * plain HTTP. Appending it unconditionally would make the switcher a no-op
 * in every local checkout while looking like it worked (the assignment
 * would not throw). In production, behind HTTPS, the check is true and the
 * cookie gets the flag.
 */
export function rememberLocale(locale: Locale) {
  const secure = location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax${secure}`;
}
