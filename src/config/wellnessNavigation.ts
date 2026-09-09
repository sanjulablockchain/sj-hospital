import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const wellnessFooterColumns: FooterColumn[] = [
  {
    heading: "School wellness",
    links: [
      { label: "Why school, not clinic", href: "#why" },
      { label: "The screening", href: "#programme" },
      { label: "By age group", href: "#grades" },
      { label: "Teacher training", href: "#teachers" },
      { label: "Bring us in", href: "#book" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "All services", href: "/services" },
      { label: "Facilities", href: "/facilities" },
      { label: "Health tips", href: "/health-tips" },
      { label: "Our network", href: "/network" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
