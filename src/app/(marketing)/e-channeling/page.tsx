import type { Metadata } from "next";
import { EChannelingPage } from "@/features/e-channeling";

export const metadata: Metadata = {
  title: "Book an Appointment | St. Joseph Hospital Negombo",
  description:
    "Browse St. Joseph Hospital Negombo's doctors by specialization and book an appointment online via Calendly.",
};

export default function Page() {
  return <EChannelingPage />;
}
