import type { Metadata } from "next";
import { AccommodationPage } from "@/features/accommodation";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Accommodation | St. Joseph Hospital Negombo",
  description:
    "Standard, Deluxe, Super Deluxe rooms, and Wards at St. Joseph Hospital Negombo, starting at affordable rates.",
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <AccommodationPage locale={locale as Locale} />;
}
