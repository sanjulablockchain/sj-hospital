import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather
// than reloading), and absolute paths for everything that lives elsewhere.
export const healthTipsFooterColumns: FooterColumn[] = [
  {
    heading: "Health tips",
    links: [
      { label: "Dengue at home", href: "#seasonal" },
      { label: "The library", href: "#library" },
      { label: "When to come in", href: "#warning" },
      { label: "Screening by age", href: "#screening" },
      { label: "First aid at home", href: "#firstaid" },
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
      { label: "School wellness", href: "/school-wellness" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
