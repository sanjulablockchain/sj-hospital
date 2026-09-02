import type { Metadata } from "next";
import { InternationalCarePage } from "@/features/international-care";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "International Patient Care | St. Joseph Hospital Negombo",
  description:
    "Ten minutes from Bandaranaike International Airport. One desk arranges the transfer, the written estimate, the interpreter, the insurance paperwork and the records you take home.",
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <InternationalCarePage locale={locale as Locale} />;
}
