import type { Metadata } from "next";
import { MediaPage } from "@/features/media";

export const metadata: Metadata = {
  title: "Media & Press | St. Joseph Hospital Negombo",
  description:
    "Newsroom, press desk and press kit for St. Joseph Hospital, Negombo. Named spokespeople, approved logos, cleared photographs, and the rules on filming and patient privacy.",
};

export default function Page() {
  return <MediaPage />;
}
