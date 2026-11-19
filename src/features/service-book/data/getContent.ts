import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as base from "./content";

/**
 * The Service Book page's copy in one locale. Same shape and rules as the
 * pharmacy page's getter: English owns the shape, an overlay only replaces
 * strings, and overlays load by dynamic import in Server Components so no
 * translation reaches the client bundle.
 */
const overlays = {
  si: () => import("./content.si"),
  ta: () => import("./content.ta"),
};

export type ServiceBookContent = typeof base;

export async function getServiceBookContent(locale: Locale): Promise<ServiceBookContent> {
  if (locale === DEFAULT_LOCALE) return { ...base };
  return localize(base, await overlays[locale]());
}
