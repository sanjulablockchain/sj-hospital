import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const channelingFooterColumns: FooterColumn[] = [
  {
    heading: "Booking",
    links: [
      { label: "Find a consultant", href: "#directory" },
      { label: "All services", href: "/services" },
      { label: "Care at home", href: "/home-care" },
      { label: "Accommodation", href: "/accommodation" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "Facilities", href: "/facilities" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
