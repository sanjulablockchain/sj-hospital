import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const contactFooterColumns: FooterColumn[] = [
  {
    heading: "Contact",
    links: [
      { label: "Reach us", href: "#reach" },
      { label: "Send a message", href: "#message" },
      { label: "Find us", href: "#map" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Book a doctor", href: "/e-channeling" },
      { label: "All services", href: "/services" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
