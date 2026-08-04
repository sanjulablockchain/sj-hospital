import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { PolicyContent } from "./_components/PolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | St. Joseph Hospital Negombo",
  description:
    "St. Joseph Hospital Negombo's privacy policy: how we collect, use, and protect your personal data.",
};

export default function Page() {
  return (
    <>
      <PageBanner title="Privacy Policy" />
      <PolicyContent />
    </>
  );
}
