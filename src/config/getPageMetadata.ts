import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { pageMetadata as base, type PageMetadataKey } from "./pageMetadata";

/**
 * Every route's `<title>` and `description`, in one locale.
 *
 * Same shape as a feature's own `getContent.ts` (`getContactContent` et al.):
 * the English object is the shape, the overlay can only replace strings, and
 * a locale without a translated field falls back to readable English rather
 * than an empty title. Overlays load by dynamic import so a `generateMetadata`
 * call for one locale never pulls the other locale's strings into its module
 * graph.
 */
const overlays = {
  si: () => import("./pageMetadata.si"),
  ta: () => import("./pageMetadata.ta"),
};

export type PageMetadata = typeof base;

export async function getPageMetadata(locale: Locale): Promise<PageMetadata> {
  if (locale === DEFAULT_LOCALE) return base;
  const overlay = await overlays[locale]();
  return localize(base, overlay.pageMetadata);
}

/** One route's `<title>` and `description`, in one locale. */
export async function getPageMetadataEntry(
  locale: Locale,
  key: PageMetadataKey
): Promise<PageMetadata[typeof key]> {
  const all = await getPageMetadata(locale);
  return all[key];
}
