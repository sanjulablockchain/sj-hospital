import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page. About Us is not one of the nine, so unlike the
// facilities or careers navs there is no item to anchor into this page: every
// target here is the page it names. navigation.test.ts asserts the label
// equality, which is what caught three earlier navs drifting apart.
export const aboutNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/school-wellness" },
  { label: "Network", href: "/network" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
];

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
    ],
  },
];
