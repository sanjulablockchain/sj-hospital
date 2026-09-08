import type { Metadata } from "next";
import { PharmacyPage } from "@/features/pharmacy";
import { getPageMetadataEntry } from "@/config/getPageMetadata";
import type { Locale } from "@/lib/i18n/locales";

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadataEntry(locale as Locale, "pharmacy");
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <PharmacyPage locale={locale as Locale} />;
}
