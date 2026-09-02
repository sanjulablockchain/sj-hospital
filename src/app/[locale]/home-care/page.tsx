import type { Metadata } from "next";
import { HomeCarePage } from "@/features/home-care";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Care at Home | St. Joseph Hospital Negombo",
  description:
    "Doctors, nurses and laboratory technicians who visit your home, on 6 dedicated vehicles, for elders, infants and recovery after an operation. Samples taken at home, findings written into your hospital file.",
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <HomeCarePage locale={locale as Locale} />;
}
