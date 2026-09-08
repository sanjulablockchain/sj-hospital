import type { Metadata } from "next";
import { ServicesIndexPage } from "@/features/services";
import { groupCounts } from "@/features/services/data/services";
import { SERVICE_GROUPS } from "@/features/services/data/groups";
import { getServicesContent } from "@/features/services/data/getContent";
import { getPageMetadataEntry } from "@/config/getPageMetadata";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";

const totalServices = groupCounts().All;

/**
 * The connector before the last item in the group list, the same word
 * `navigationLabels.si.ts` / `.ta.ts` already use throughout for "and"
 * (e.g. "Diagnostics & radiology" -> "රෝග විනිශ්චය සහ විකිරණවේදය"). Kept in
 * code rather than in `pageMetadata.si.ts` / `.ta.ts` because the English
 * source also hardcodes " and " here rather than in `pageMetadata.ts`: this
 * is the same list-joining logic in every locale, only the joining word
 * itself changes.
 */
const AND_WORD: Record<Locale, string> = { en: "and", si: "සහ", ta: "மற்றும்" };

/**
 * `{total}` is a locale-invariant count, interpolated directly. `{groupList}`
 * is built from the ALREADY localized `groupLabels` (`getServicesContent`),
 * not restated as English inside `pageMetadata.si.ts` / `.ta.ts`: the six
 * group names are a fact `src/features/services/data/groups.ts` owns, and
 * this route reads that translation rather than duplicating it (pattern 3 in
 * the i18n recipe: interpolate with a token, not a split).
 */
export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const [{ title, description }, { groups }] = await Promise.all([
    getPageMetadataEntry(typedLocale, "services"),
    getServicesContent(typedLocale),
  ]);
  const labels = SERVICE_GROUPS.map((group) => groups.groupLabels[group]);
  const groupList = `${labels.slice(0, -1).join(", ")} ${AND_WORD[typedLocale] ?? AND_WORD[DEFAULT_LOCALE]} ${labels.at(-1)}`;
  return {
    title,
    description: description
      .replace("{total}", String(totalServices))
      .replace("{groupList}", groupList),
  };
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <ServicesIndexPage locale={locale as Locale} />;
}
