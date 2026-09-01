import type { Metadata } from "next";
import { SchoolWellnessPage } from "@/features/school-wellness";

export const metadata: Metadata = {
  title: "School Wellness | St. Joseph Hospital Negombo",
  description:
    "A paediatric led screening programme that comes to your school: vision, hearing, dental, growth and posture checks for every student, teacher first aid training, and a report home to every parent.",
};

export default function Page() {
  return <SchoolWellnessPage />;
}
