import type { Metadata } from "next";
import { AboutPage } from "@/features/about";

export const metadata: Metadata = {
  title: "About Us | St. Joseph Hospital Negombo",
  description:
    "US standard, high-quality healthcare in Negombo, Sri Lanka, managed by Kids & Teens Medical Group, USA.",
};

export default function Page() {
  return <AboutPage />;
}
