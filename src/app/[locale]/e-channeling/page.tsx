import type { Metadata } from "next";
import { EChannelingPage } from "@/features/e-channeling";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Book an Appointment | St. Joseph Hospital Negombo",
  description:
    "Browse St. Joseph Hospital Negombo's doctors by specialization and book an appointment online via Calendly.",
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <EChannelingPage locale={locale as Locale} />;
}
