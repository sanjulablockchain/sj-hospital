import type { Metadata } from "next";
import { HomeCarePage } from "@/features/home-care";

export const metadata: Metadata = {
  title: "Care at Home | St. Joseph Hospital Negombo",
  description:
    "Doctors, nurses and laboratory technicians who visit your home, on 6 dedicated vehicles, for elders, infants and recovery after an operation. Samples taken at home, findings written into your hospital file.",
};

export default function Page() {
  return <HomeCarePage />;
}
