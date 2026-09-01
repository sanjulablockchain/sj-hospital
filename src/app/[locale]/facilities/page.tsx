import type { Metadata } from "next";
import { FacilitiesPage } from "@/features/facilities";

export const metadata: Metadata = {
  title: "Facilities | St. Joseph Hospital Negombo",
  description:
    "Inside St. Joseph Hospital Negombo: six purpose built floors, operating theatres, monitored critical care, a 24 hour laboratory, four room categories and a covered ambulance bay.",
};

export default function Page() {
  return <FacilitiesPage />;
}
