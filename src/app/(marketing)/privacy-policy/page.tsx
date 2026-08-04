import type { Metadata } from "next";
import { PolicyContent } from "./_components/PolicyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | St. Joseph Hospital Negombo",
  description:
    "St. Joseph Hospital Negombo's privacy policy: how we collect, use, and protect your personal data.",
};

export default function Page() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-mid px-6 py-14">
        <div className="mx-auto max-w-[1240px]">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Privacy Policy
          </h1>
        </div>
      </section>
      <PolicyContent />
    </>
  );
}
