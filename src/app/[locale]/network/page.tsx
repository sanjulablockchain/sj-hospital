import type { Metadata } from "next";
import { NetworkPage } from "@/features/network";
import { getPageMetadataEntry } from "@/config/getPageMetadata";
import type { Locale } from "@/lib/i18n/locales";

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadataEntry(locale as Locale, "network");
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <NetworkPage locale={locale as Locale} />;
}
