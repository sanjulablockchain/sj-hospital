import { DEFAULT_LOCALE, PREFIXED_LOCALES, type Locale } from "./locales.ts";

/**
 * Matches a locale prefix only when it occupies a whole first segment, so
 * `/site-map` and `/talks` stay English routes rather than being read as
 * Sinhala and Tamil.
 */
const PREFIX_PATTERN = new RegExp(`^/(${PREFIXED_LOCALES.join("|")})(?=[/?#]|$)`);

export type SplitPath = {
  locale: Locale;
  rest: string;
};

/**
 * Split a pathname into the locale it names and the path underneath it.
 * `/contact-us` and `/si/contact-us` both come back with rest `/contact-us`,
 * which is exactly what makes switching language a prefix swap rather than a
 * lookup through a map of translated slugs.
 */
export function splitLocale(pathname: string): SplitPath {
  const match = PREFIX_PATTERN.exec(pathname);
  if (!match) return { locale: DEFAULT_LOCALE, rest: pathname };

  let rest = pathname.slice(match[0].length);
  if (rest === "") {
    rest = "/";
  } else if (!rest.startsWith("/")) {
    rest = "/" + rest;
  }
  return {
    locale: match[1] as Locale,
    rest,
  };
}

/** Move a site-root-relative path under a locale. English stays bare. */
export function localePath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * Where an English page really lives. The whole tree sits under
 * `app/[locale]`, so `/contact-us` is served by `/en/contact-us` behind a
 * proxy rewrite that keeps the short URL in the address bar.
 */
export function internalDefaultPath(path: string): string {
  return path === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${path}`;
}

/** The same page in another language. */
export function swapLocale(pathname: string, target: Locale): string {
  return localePath(splitLocale(pathname).rest, target);
}

/**
 * Prefix an href, but only when it points inside this site. Fragments,
 * `tel:`, `mailto:`, absolute URLs and protocol-relative URLs are returned
 * untouched, and an href that already carries a prefix is left as it is so
 * the pass can run twice without producing `/si/si/services`.
 */
export function localeHref(href: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return href;
  if (!href.startsWith("/")) return href;
  if (href.startsWith("//")) return href;
  if (splitLocale(href).locale !== DEFAULT_LOCALE) return href;
  return localePath(href, locale);
}
