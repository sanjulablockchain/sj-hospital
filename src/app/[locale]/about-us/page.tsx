import type { Metadata } from "next";
import { AboutPage } from "@/features/about";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "About Us | St. Joseph Hospital Negombo",
  description:
    "US standard, high-quality healthcare in Negombo, Sri Lanka, managed by Kids & Teens Medical Group, USA.",
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <AboutPage locale={locale as Locale} />;
}
