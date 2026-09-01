import { LOCALES, type Locale } from "./locales.ts";
import { localePath } from "./paths.ts";

/** The public origin, used to make metadata alternates absolute. */
export const SITE_URL = "https://sjhospital.lk";

/**
 * The canonical URL and the hreflang set for one page in one locale.
 *
 * The canonical is the locale's own URL, never English's. A translation whose
 * canonical points at the English page is telling a search engine to drop it
 * as a duplicate, which would waste the entire translation effort. Each locale
 * is canonical for itself, and the shared `languages` map is what ties the
 * three together as one page in three languages.
 */
export function localeAlternates(
  path: string,
  locale: Locale
): {
  canonical: string;
  languages: Record<string, string>;
} {
  const languages: Record<string, string> = {};
  for (const other of LOCALES) {
    languages[other] = `${SITE_URL}${localePath(path, other)}`;
  }
  return { canonical: `${SITE_URL}${localePath(path, locale)}`, languages };
}
