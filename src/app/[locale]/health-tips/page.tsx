import type { Metadata } from "next";
import { HealthTipsPage } from "@/features/health-tips";
import { articles } from "@/features/health-tips/data/library";
import { warnings } from "@/features/health-tips/data/warnings";
import { getPageMetadataEntry } from "@/config/getPageMetadata";
import type { Locale } from "@/lib/i18n/locales";

/**
 * `articles.length` and `warnings.length` are locale-invariant counts (the
 * same articles and warnings exist in every language, only their words
 * change), so they are interpolated into the localized description template
 * here rather than duplicated as facts inside `pageMetadata.si.ts` /
 * `.ta.ts` (pattern 3 in the i18n recipe: interpolate with a token, not a
 * split).
 */
export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  const { title, description } = await getPageMetadataEntry(locale as Locale, "healthTips");
  return {
    title,
    description: description
      .replace("{articleCount}", String(articles.length))
      .replace("{warningCount}", String(warnings.length)),
  };
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <HealthTipsPage locale={locale as Locale} />;
}
