import type { Metadata } from "next";
import { SchoolWellnessPage } from "@/features/school-wellness";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "School Wellness | St. Joseph Hospital Negombo",
  description:
    "A paediatric led screening programme that comes to your school: vision, hearing, dental, growth and posture checks for every student, teacher first aid training, and a report home to every parent.",
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <SchoolWellnessPage locale={locale as Locale} />;
}
