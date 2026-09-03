import type { Metadata } from "next";
import { CareersPage } from "@/features/career";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Careers | St. Joseph Hospital Negombo",
  description:
    "Open roles at St. Joseph Hospital Negombo: medical, nursing, allied health, pharmacy and administration. We never charge candidates a fee at any stage, and we reply to every application.",
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <CareersPage locale={locale as Locale} />;
}
