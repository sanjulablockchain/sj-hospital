import type { Metadata } from "next";
import { AboutPage } from "@/features/about";
import { getPageMetadataEntry } from "@/config/getPageMetadata";
import type { Locale } from "@/lib/i18n/locales";

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadataEntry(locale as Locale, "aboutUs");
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <AboutPage locale={locale as Locale} />;
}
