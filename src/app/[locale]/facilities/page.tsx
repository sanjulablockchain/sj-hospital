import type { Metadata } from "next";
import { FacilitiesPage } from "@/features/facilities";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Facilities | St. Joseph Hospital Negombo",
  description:
    "Inside St. Joseph Hospital Negombo: six purpose built floors, operating theatres, monitored critical care, a 24 hour laboratory, four room categories and a covered ambulance bay.",
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <FacilitiesPage locale={locale as Locale} />;
}
