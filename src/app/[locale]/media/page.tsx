import type { Metadata } from "next";
import { MediaPage } from "@/features/media";
import { getPageMetadataEntry } from "@/config/getPageMetadata";
import type { Locale } from "@/lib/i18n/locales";

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadataEntry(locale as Locale, "media");
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <MediaPage locale={locale as Locale} />;
}
