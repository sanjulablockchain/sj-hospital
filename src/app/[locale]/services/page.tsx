import type { Metadata } from "next";
import { ServicesIndexPage } from "@/features/services";
import { groupCounts } from "@/features/services/data/services";
import { SERVICE_GROUPS } from "@/features/services/data/groups";
import type { Locale } from "@/lib/i18n/locales";

const totalServices = groupCounts().All;
const groupList = `${SERVICE_GROUPS.slice(0, -1).join(", ")} and ${SERVICE_GROUPS.at(-1)}`;

export const metadata: Metadata = {
  title: "Medical Services | St. Joseph Hospital Negombo",
  description: `${totalServices} medical services across six groups (${groupList}) at St. Joseph Hospital Negombo.`,
};

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <ServicesIndexPage locale={locale as Locale} />;
}
