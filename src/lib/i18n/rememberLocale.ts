import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/locales";

/**
 * Remember an explicit choice for a year. This cookie is the only thing that
 * ever moves a reader off English automatically, and only after they have
 * asked for it once by using the switcher.
 *
 * No "use client" directive: this is a plain function that happens to touch
 * `document`, and the client components that call it carry the directive.
 */
export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
