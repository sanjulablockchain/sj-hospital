import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const aboutFooterColumns: FooterColumn[] = [
  {
    heading: "About us",
    links: [
      { label: "Who we are", href: "#story" },
      { label: "What makes us different", href: "#different" },
      { label: "Mission and vision", href: "#mission" },
      { label: "Our parent group", href: "#group" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "All services", href: "/services" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Book a doctor", href: "/e-channeling" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
