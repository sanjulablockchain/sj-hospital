import type { Metadata } from "next";
import { NetworkPage } from "@/features/network";

export const metadata: Metadata = {
  title: "Our Network | St. Joseph Hospital Negombo",
  description:
    "St. Joseph Hospital is operated by Kids & Teens Medical Group in Los Angeles, one of nine companies across two continents. What that connection changes about your care, and who else is in the family.",
};

export default function Page() {
  return <NetworkPage />;
}
