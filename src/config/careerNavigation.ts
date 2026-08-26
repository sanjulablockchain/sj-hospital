import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page. The reference design for this page shipped its own
// shorter item list (seven entries, School Wellness where Health Tips belongs),
// which would have made the nav change shape as you moved around the site.
// Only the targets differ. Careers is the page you are already on, so it points
// at #openings, the section a candidate actually came for, matching the way the
// reference points its own Careers link.
export const careerNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/school-wellness" },
  { label: "Network", href: "/network" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "#openings" },
];

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
      { label: "All services", href: "/services" },
      { label: "Facilities", href: "/facilities" },
      { label: "Pharmacy", href: "/pharmacy" },
      { label: "Our network", href: "/network" },
    ],
  },
];
