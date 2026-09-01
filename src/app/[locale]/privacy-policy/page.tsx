import type { Metadata } from "next";
import { ThemedFooter } from "@/components/layout/ThemedFooter";
import { privacyFooterColumns } from "@/config/privacyNavigation";
import { PolicyHero } from "./_components/PolicyHero";
import { PolicyContent } from "./_components/PolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | St. Joseph Hospital Negombo",
  description:
    "St. Joseph Hospital Negombo's privacy policy: how we collect, use, and protect your personal data.",
};

export default function Page() {
  return (
    <>
      <PolicyHero />
      <PolicyContent />
      <ThemedFooter columns={privacyFooterColumns} id="footer" />
    </>
  );
}
