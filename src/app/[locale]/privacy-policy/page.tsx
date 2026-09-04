import type { Metadata } from "next";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { privacyFooterColumns } from "@/config/privacyNavigation";
import { navLabel, translateFooterColumns } from "@/config/navigationLabels";
import type { Locale } from "@/lib/i18n/locales";
import { PolicyHero } from "./_components/PolicyHero";
import { PolicyContent } from "./_components/PolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | St. Joseph Hospital Negombo",
  description:
    "St. Joseph Hospital Negombo's privacy policy: how we collect, use, and protect your personal data.",
};

/**
 * The page's own copy stays English throughout (a legal document, deliberately
 * not translated, per the recorded exceptions list), but the chrome around it
 * is not: the header nav and footer still need the reader's locale, the same
 * as every other route, so this becomes async to read it from `params`.
 */
export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return (
    <>
      <PolicyHero locale={locale as Locale} />
      <PolicyContent />
      <ThemedFooter
        columns={translateFooterColumns(privacyFooterColumns, locale as Locale)}
        reachUsLabel={navLabel("Reach us", locale as Locale)}
        id="footer"
      />
    </>
  );
}
