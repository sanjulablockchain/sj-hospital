import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as base from "./content";

/**
 * The laboratory price list page's copy in one locale. Same pattern as
 * pharmacy's getContent: the English module is the shape, an overlay can
 * only replace strings, and the overlay loads by dynamic import inside a
 * Server Component so no translation reaches the client bundle.
 */
const overlays = {
  si: () => import("./content.si"),
  ta: () => import("./content.ta"),
};

export type LaboratoryContent = typeof base;

export async function getLaboratoryContent(locale: Locale): Promise<LaboratoryContent> {
  if (locale === DEFAULT_LOCALE) return { ...base };
  return localize(base, await overlays[locale]());
}
