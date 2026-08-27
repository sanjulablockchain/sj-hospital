import type { Metadata } from "next";
import { AccommodationPage } from "@/features/accommodation";

export const metadata: Metadata = {
  title: "Accommodation | St. Joseph Hospital Negombo",
  description:
    "Standard, Deluxe, Super Deluxe rooms, and Wards at St. Joseph Hospital Negombo, starting at affordable rates.",
};

export default function Page() {
  return <AccommodationPage />;
}
