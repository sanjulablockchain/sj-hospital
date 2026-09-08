/**
 * The three locales the site ships in. English is the default and the only one
 * served without a path prefix, so `/contact-us` is English while
 * `/si/contact-us` and `/ta/contact-us` are the other two. Keeping English off
 * the prefix list is what lets every existing URL and inbound link keep working.
 */
export const LOCALES = ["en", "si", "ta"] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * `satisfies` rather than a `: Locale` annotation, deliberately. An annotation
 * widens the type to the whole union, which stops TypeScript narrowing
 * `locale` to "si" | "ta" after an early return on the default. Every feature's
 * content getter relies on exactly that narrowing to index its overlay map.
 */
export const DEFAULT_LOCALE = "en" satisfies Locale;

/** The locales that appear in a URL. `en` is served from the bare path. */
export const PREFIXED_LOCALES = ["si", "ta"] as const;

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * Each language named in its own script. A reader scanning the switcher
 * recognises the shape of their own language before they read any of it, so
 * these are never transliterated into English.
 */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};

/**
 * Remembers an explicit choice from the switcher. Read in `src/proxy.ts` only:
 * reading it inside a page would opt that page out of static rendering.
 */
export const LOCALE_COOKIE = "sj-locale";
