import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const mediaFooterColumns: FooterColumn[] = [
  {
    heading: "Media",
    links: [
      { label: "Newsroom", href: "#newsroom" },
      { label: "Press desk", href: "#press" },
      { label: "Press kit and logos", href: "#kit" },
      { label: "Image library", href: "#gallery" },
      { label: "Filming and privacy", href: "#usage" },
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
      { label: "International care", href: "/international-care" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
