import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const networkFooterColumns: FooterColumn[] = [
  {
    heading: "Network",
    links: [
      { label: "Why it matters", href: "#matters" },
      { label: "The family of companies", href: "#family" },
      { label: "The numbers", href: "#reach" },
      { label: "Moving between us", href: "#referrals" },
      { label: "Get in touch", href: "#contact" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "All services", href: "/services" },
      { label: "Facilities", href: "/facilities" },
      { label: "Pharmacy", href: "/pharmacy" },
      { label: "Care at home", href: "/home-care" },
      { label: "Health tips", href: "/health-tips" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
