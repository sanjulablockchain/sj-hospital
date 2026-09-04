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
 * The legal document itself stays English (deliberately, per the recorded
 * exceptions list), but everything framing it does not: the header nav, the
 * footer, and the hero's own breadcrumb and `<h1>`, which are chrome rather
 * than legal text and reuse `navigationLabels`'s existing translations of
 * "Home" and "Privacy policy" rather than coining new ones. So this route is
 * async, to read the reader's locale from `params` like every other route.
 *
 * The dividing line is the document, not the page: `policyLastUpdated` and
 * every block in `PolicyContent` are part of the policy and stay English.
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
