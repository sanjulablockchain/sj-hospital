import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page. The reference design for this page ran a seven
// item nav of its own invention (it added "Press desk" and dropped School
// Wellness, Network and Careers), which would have made the nav change shape as
// you moved around the site. Only the targets differ. Media is the page you are
// already on, so it points at #newsroom, the first of its own sections; the
// other eight resolve the same way internationalNavigation resolves them.
export const mediaNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/school-wellness" },
  { label: "Network", href: "/network" },
  { label: "Media", href: "#newsroom" },
  { label: "Careers", href: "/careers" },
];

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
      { label: "All services", href: "/services" },
      { label: "Facilities", href: "/facilities" },
      { label: "Health tips", href: "/health-tips" },
      { label: "International care", href: "/international-care" },
    ],
  },
];
