import type { Metadata } from "next";
import { LaboratoryPage } from "@/features/laboratory";
import { getPageMetadataEntry } from "@/config/getPageMetadata";
import type { Locale } from "@/lib/i18n/locales";

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadataEntry(locale as Locale, "laboratoryTests");
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <LaboratoryPage locale={locale as Locale} />;
}
