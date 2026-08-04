import type { Metadata } from "next";
import { CareerPage } from "@/features/career";

export const metadata: Metadata = {
  title: "Career | St. Joseph Hospital Negombo",
  description: "Open roles at St. Joseph Hospital Negombo and why it's a great place to build your career.",
};

export default function Page() {
  return <CareerPage />;
}
