import type { Metadata } from "next";
import { HealthTipsPage } from "@/features/health-tips";
import { articles } from "@/features/health-tips/data/library";
import { warnings } from "@/features/health-tips/data/warnings";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Health Tips | St. Joseph Hospital Negombo",
  description: `${articles.length} health tips written by our own clinicians, ${warnings.length} signs that mean come in, screening by age and first aid at home, for the conditions that turn up in Negombo.`,
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <HealthTipsPage locale={locale as Locale} />;
}
