import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { NAV_LABELS as SI_NAV, FOOTER_HEADINGS as SI_FOOTER } from "./navigationLabels.si";
import { NAV_LABELS as TA_NAV, FOOTER_HEADINGS as TA_FOOTER } from "./navigationLabels.ta";

const NAV: Record<string, Record<string, string>> = { si: SI_NAV, ta: TA_NAV };
const FOOTER: Record<string, Record<string, string>> = { si: SI_FOOTER, ta: TA_FOOTER };

/**
 * A nav label in the reader's language. Falls back to the English string, so a
 * label added without a dictionary entry shows readable English rather than
 * nothing. `navigationLabels.test.ts` is what stops that shipping.
 */
export function navLabel(label: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return label;
  return NAV[locale]?.[label] ?? label;
}

/**
 * A footer heading in the reader's language, the same fallback rule as
 * `navLabel`.
 */
export function footerHeading(heading: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return heading;
  return FOOTER[locale]?.[heading] ?? heading;
}
