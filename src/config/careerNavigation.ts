import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const careerFooterColumns: FooterColumn[] = [
  {
    heading: "Careers",
    links: [
      { label: "Why here", href: "#why" },
      { label: "Benefits", href: "#benefits" },
      { label: "Open positions", href: "#openings" },
      { label: "How hiring works", href: "#process" },
      { label: "Recruitment fraud", href: "#fraud" },
      { label: "Submit your CV", href: "#form" },
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
      { label: "Our network", href: "/network" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
