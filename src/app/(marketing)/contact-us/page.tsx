import type { Metadata } from "next";
import { ContactPageContent } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact Us | St. Joseph Hospital Negombo",
  description:
    "Get in touch with St. Joseph Hospital Negombo: address, phone, email, and a contact form.",
};

export default function Page() {
  return <ContactPageContent />;
}
