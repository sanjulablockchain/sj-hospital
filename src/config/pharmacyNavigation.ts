import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes are safe here, unlike servicesFooterColumns: every one of these
// sections is on this single page, so there is no sibling route the same
// columns have to resolve from.
export const pharmacyFooterColumns: FooterColumn[] = [
  {
    heading: "Pharmacy",
    links: [
      { label: "The counter", href: "#counters" },
      { label: "What we stock", href: "#stock" },
      { label: "Delivery", href: "#delivery" },
      { label: "Repeat prescriptions", href: "#refills" },
      { label: "Care at home", href: "/home-care" },
      { label: "Safety & records", href: "#safety" },
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
