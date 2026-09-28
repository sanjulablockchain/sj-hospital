import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as base from "./content";
import { doctors as baseDoctors, type Doctor } from "./doctors";

/**
 * The e-channeling page's copy in one locale.
 *
 * The English module is the shape: the result always has its keys, its array
 * lengths and its facts, and an overlay can only replace strings. A missing
 * translation therefore shows readable English rather than an empty node,
 * which is what lets a half-reviewed locale ship without holes.
 *
 * This feature has two data files, so it gets two overlay maps and two
 * getters below, kept in this one getter file per the recipe. Both load by
 * dynamic import, so a reader downloads only their own language, and both run
 * in Server Components, so no translation data reaches the client bundle.
 */
const contentOverlays = {
  si: () => import("./content.si"),
  ta: () => import("./content.ta"),
};

const doctorsOverlays = {
  si: () => import("./doctors.si"),
  ta: () => import("./doctors.ta"),
};

export type EChannelingContent = typeof base;

export async function getEChannelingContent(locale: Locale): Promise<EChannelingContent> {
  if (locale === DEFAULT_LOCALE) return { ...base };
  return localize(base, await contentOverlays[locale]());
}

/**
 * The 71 consultants with `specialization` localized and `name` /
 * `calendlySlug` untouched (doctors.ts explains why: `name` is a proper noun,
 * `calendlySlug` is a Calendly URL fragment). DoctorDirectory filters and
 * searches against whichever locale's specializations this returns, so its
 * speciality rail and search box stay consistent within one language.
 */
export async function getLocalizedDoctors(locale: Locale): Promise<Doctor[]> {
  if (locale === DEFAULT_LOCALE) return baseDoctors;
  const overlay = await doctorsOverlays[locale]();
  return localize(baseDoctors, overlay.doctors);
}
