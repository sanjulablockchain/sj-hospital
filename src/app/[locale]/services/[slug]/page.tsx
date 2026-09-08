import type { Metadata } from "next";
import { serviceSlugs } from "@/features/services/data/services";
import { getServicesContent, findService } from "@/features/services/data/getContent";
import { ServiceDetailPage } from "@/features/services";
import { localeAlternates } from "@/lib/i18n/alternates";
import type { Locale } from "@/lib/i18n/locales";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

/**
 * Metadata is sourced from the ALREADY localized catalog
 * (`getServicesContent`), not a second, parallel English-only lookup: every
 * service's `title` and `lede` already have a Sinhala and Tamil translation
 * in the services feature's own group files (`emergency.si.ts`,
 * `surgical.si.ts`, ...), enforced by that feature's own
 * `content.i18n.test.ts`. Reading them here, rather than adding a
 * `pageMetadata.ts` entry per service, is what keeps that fact in its one
 * home (`src/config/pageMetadata.ts` explains the same choice from the
 * other side).
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const { services } = await getServicesContent(typedLocale);
  const service = findService(services, slug);
  if (!service) return {};
  const description =
    service.lede.length > 155 ? `${service.lede.slice(0, 152).trimEnd()}…` : service.lede;
  return {
    title: `${service.title} | St. Joseph Hospital Negombo`,
    description,
    alternates: localeAlternates(`/services/${slug}`, typedLocale),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <ServiceDetailPage slug={slug} locale={locale as Locale} />;
}
