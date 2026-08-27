import type { Metadata } from "next";
import { AccommodationPage } from "@/features/accommodation";

export const metadata: Metadata = {
  title: "Accommodation | St. Joseph Hospital Negombo",
  description:
    "Standard, Deluxe, Super Deluxe rooms, and Wards at St. Joseph Hospital Negombo, starting from 10,000 LKR.",
};

export default function Page() {
  return <AccommodationPage />;
}
