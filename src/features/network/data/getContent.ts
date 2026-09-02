import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as base from "./content";

/**
 * The network page's copy in one locale.
 *
 * The English module is the shape: the result always has its keys, its array
 * lengths and its facts, and an overlay can only replace strings. A missing
 * translation therefore shows readable English rather than an empty node,
 * which is what lets a half-reviewed locale ship without holes.
 *
 * The overlay loads by dynamic import, so a reader downloads only their own
 * language. This runs in Server Components, so no translation data reaches
 * the client bundle at all.
 */
const overlays = {
  si: () => import("./content.si"),
  ta: () => import("./content.ta"),
};

export type NetworkContent = typeof base;

export async function getNetworkContent(locale: Locale): Promise<NetworkContent> {
  if (locale === DEFAULT_LOCALE) return base;
  return localize(base, await overlays[locale]());
}
