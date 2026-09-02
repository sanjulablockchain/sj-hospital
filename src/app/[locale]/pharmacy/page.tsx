import type { Metadata } from "next";
import { PharmacyPage } from "@/features/pharmacy";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Pharmacy | St. Joseph Hospital Negombo",
  description:
    "A 24-hour pharmacy counter at St. Joseph Hospital Negombo: authorized stock only, every order checked by a pharmacist against your hospital file, repeat prescriptions held digitally and delivery across Negombo.",
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <PharmacyPage locale={locale as Locale} />;
}
