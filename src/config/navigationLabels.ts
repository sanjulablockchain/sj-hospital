import type { FooterColumn } from "@/components/layout/ThemedFooter";
import type { NavItem } from "@/config/navigation";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { NAV_LABELS as SI_NAV, FOOTER_HEADINGS as SI_FOOTER } from "./navigationLabels.si";
import { NAV_LABELS as TA_NAV, FOOTER_HEADINGS as TA_FOOTER } from "./navigationLabels.ta";

const NAV: Record<string, Record<string, string>> = { si: SI_NAV, ta: TA_NAV };
const FOOTER: Record<string, Record<string, string>> = { si: SI_FOOTER, ta: TA_FOOTER };

/**
 * A nav label in the reader's language. Falls back to the English string, so a
 * label added without a dictionary entry shows readable English rather than
 * nothing. `navigationLabels.test.ts` is what stops that shipping.
 *
 * This module (and the two dictionaries it imports, roughly 16KB combined) is
 * only ever called from Server Components: the Hero and Page components that
 * sit above `ThemedHeader`, `MobileNavPanel` and `ThemedFooter`. Those three
 * stay presentational, receiving already-translated strings as props, so this
 * module never reaches a client bundle. Do not import it from a `'use client'`
 * file.
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

/**
 * `items` with every label translated, ready to hand straight to
 * `ThemedHeader` (which forwards them, already translated, to
 * `MobileNavPanel`).
 */
export function translateNavItems(items: NavItem[], locale: Locale): NavItem[] {
  return items.map((item) => ({ ...item, label: navLabel(item.label, locale) }));
}

/**
 * `columns` with every heading and every link label translated, ready to hand
 * straight to `ThemedFooter`.
 */
export function translateFooterColumns(columns: FooterColumn[], locale: Locale): FooterColumn[] {
  return columns.map((column) => ({
    heading: footerHeading(column.heading, locale),
    links: column.links.map((link) => ({ ...link, label: navLabel(link.label, locale) })),
  }));
}
