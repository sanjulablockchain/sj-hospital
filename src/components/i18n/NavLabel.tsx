"use client";

import { navLabel, footerHeading } from "@/config/navigationLabels";
import { useLocale } from "@/lib/i18n/useLocale";

/**
 * A nav or footer string in the reader's language, looked up at render.
 *
 * A client leaf rather than a prop on ThemedFooter: the footer is a Server
 * Component rendered by 15 different Page components, and threading a locale
 * through all of them to translate a heading would be a far larger change
 * than the one this solves.
 */
export function NavLabel({ text, kind = "nav" }: { text: string; kind?: "nav" | "heading" }) {
  const locale = useLocale();
  return <>{kind === "heading" ? footerHeading(text, locale) : navLabel(text, locale)}</>;
}
