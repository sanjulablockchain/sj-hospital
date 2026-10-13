import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as base from "./content";
import * as schoolsBase from "./schools";

/**
 * The school wellness page's copy in one locale.
 *
 * The English module is the shape: the result always has its keys, its array
 * lengths and its facts, and an overlay can only replace strings. A missing
 * translation therefore shows readable English rather than an empty node,
 * which is what lets a half-reviewed locale ship without holes.
 *
 * The overlay loads by dynamic import, so a reader downloads only their own
 * language. This runs in Server Components, so no translation data reaches
 * the client bundle at all.
 *
 * The verified programme list lives apart from the placeholder copy, in
 * `schools.ts` with its own overlays, and is merged in under `programme`.
 */
const overlays = {
  si: () => Promise.all([import("./content.si"), import("./schools.si")]),
  ta: () => Promise.all([import("./content.ta"), import("./schools.ta")]),
};

export type SchoolWellnessContent = typeof base & { programme: typeof schoolsBase };

export async function getSchoolWellnessContent(locale: Locale): Promise<SchoolWellnessContent> {
  if (locale === DEFAULT_LOCALE) return { ...base, programme: { ...schoolsBase } };
  const [content, schools] = await overlays[locale]();
  return { ...localize(base, content), programme: localize(schoolsBase, schools) };
}
