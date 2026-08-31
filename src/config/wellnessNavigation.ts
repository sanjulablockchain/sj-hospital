import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page: the reference design for this page invented its
// own seven-item list, which would have made the nav change shape as you moved
// around the site. Only the targets differ. School Wellness is the page you are
// already on, so it points at #programme, the section its own hero links to,
// the same way networkNavigation points Network at #family.
export const wellnessNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Care at Home", href: "/home-care" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "#programme" },
  { label: "Network", href: "/network" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
];

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
