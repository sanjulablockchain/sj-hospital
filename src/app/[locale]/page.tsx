import { HomePage } from "@/features/home";
import type { Locale } from "@/lib/i18n/locales";

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return <HomePage locale={locale as Locale} />;
}
