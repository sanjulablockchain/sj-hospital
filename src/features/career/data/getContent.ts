import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as base from "./content";

/**
 * The careers page's copy in one locale.
 *
 * The English module is the shape: the result always has its keys, its array
 * lengths and its facts, and an overlay can only replace strings. A missing
 * translation therefore shows readable English rather than an empty node,
 * which is what lets a half-reviewed locale ship without holes.
 *
 * The overlay loads by dynamic import, so a reader downloads only their own
 * language. This runs in a Server Component, so no translation data reaches
 * the client bundle at all; the two Client Components on this page
 * (`ApplicationForm`, `OpeningsSection`) receive their own slice of the already
 * localized `content` as a prop from `CareersPage`, never by importing this
 * module themselves.
 *
 * `jobs[*].id`, `departments`, `roleIds` and every option's `.id` pass through
 * `localize` unchanged (no overlay ever supplies them), which is exactly what
 * keeps the "Applying for", "Years of experience" and "Where you saw this"
 * selects working after translation: the value a reader's browser submits is
 * always this fixed English id, never the translated label beside it.
 */
const overlays = {
  si: () => import("./content.si"),
  ta: () => import("./content.ta"),
};

export type CareerContent = typeof base;

export async function getCareerContent(locale: Locale): Promise<CareerContent> {
  // Spread, not the namespace itself: `import * as base` is a Module object,
  // and CareersPage hands this whole result to two Client Components
  // (ApplicationForm, OpeningsSection). React refuses to serialize a Module
  // across that boundary ("Only plain objects can be passed to Client
  // Components"). si/ta never hit this because `localize` already builds a
  // plain object, which is what made the bug invisible on those locales.
  if (locale === DEFAULT_LOCALE) return { ...base };
  return localize(base, await overlays[locale]());
}
