import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, serviceSlugs } from "@/features/services/data/services";
import { ServiceDetailPage } from "@/features/services";
import { localeAlternates } from "@/lib/i18n/alternates";
import type { Locale } from "@/lib/i18n/locales";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const description =
    service.lede.length > 155 ? `${service.lede.slice(0, 152).trimEnd()}…` : service.lede;
  return {
    title: `${service.title} | St. Joseph Hospital Negombo`,
    description,
    alternates: localeAlternates(`/services/${slug}`, locale as Locale),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
