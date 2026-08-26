import type { Metadata } from "next";
import { CareersPage } from "@/features/career";

export const metadata: Metadata = {
  title: "Careers | St. Joseph Hospital Negombo",
  description:
    "Open roles at St. Joseph Hospital Negombo: medical, nursing, allied health, pharmacy and administration. We never charge candidates a fee at any stage, and we reply to every application.",
};

export default function Page() {
  return <CareersPage />;
}
