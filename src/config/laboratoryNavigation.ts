import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes are safe here, as on the pharmacy page: every one of these
// sections is on this single page, so there is no sibling route the same
// columns have to resolve from.
export const laboratoryFooterColumns: FooterColumn[] = [
  {
    heading: "Laboratory",
    links: [
      { label: "Every test", href: "#list" },
      { label: "How it works", href: "#how" },
      { label: "Book a test", href: "#book" },
      { label: "Laboratory services", href: "/services/laboratory" },
      { label: "Radiology & digital X-ray", href: "/services/radiology" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "All services", href: "/services" },
      { label: "Facilities", href: "/facilities" },
      { label: "Admissions", href: "/services#admissions" },
      { label: "Careers", href: "/careers" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
