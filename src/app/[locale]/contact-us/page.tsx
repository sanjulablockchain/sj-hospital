import type { Metadata } from "next";
import { ContactPage } from "@/features/contact";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Contact Us | St. Joseph Hospital Negombo",
  description:
    "Get in touch with St. Joseph Hospital Negombo: address, phone, email, and a contact form.",
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <ContactPage locale={locale as Locale} />;
}
