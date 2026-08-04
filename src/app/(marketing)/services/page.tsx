import type { Metadata } from "next";
import { ServicesPage } from "@/features/services";

export const metadata: Metadata = {
  title: "Medical Services | St. Joseph Hospital Negombo",
  description:
    "USA standard healthcare services at St. Joseph Hospital Negombo: Emergency, OPD, Pharmacy, Home Visiting, X-Ray, Inpatient Rooms, Laboratory, and 22 specialized departments.",
};

export default function Page() {
  return <ServicesPage />;
}
