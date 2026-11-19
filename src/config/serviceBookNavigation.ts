import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The bare hash is safe here, as on the pharmacy page: that section is on
// this single page.
export const serviceBookFooterColumns: FooterColumn[] = [
  {
    heading: "Service book",
    links: [
      { label: "Read the book", href: "/service-book/read" },
      { label: "Inside the book", href: "#inside" },
      { label: "Laboratory tests & prices", href: "/laboratory-tests" },
      { label: "Doctor directory", href: "/e-channeling#directory" },
      { label: "All services", href: "/services" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "Facilities", href: "/facilities" },
      { label: "Pharmacy", href: "/pharmacy" },
      { label: "Careers", href: "/careers" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
