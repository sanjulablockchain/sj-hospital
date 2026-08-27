import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page. E-channeling is not one of the nine, so every
// target here is the page it names, the same reasoning aboutNavigation uses.
export const channelingNavigation: NavItem[] = [
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
export const channelingFooterColumns: FooterColumn[] = [
  {
    heading: "Booking",
    links: [
      { label: "Find a consultant", href: "#directory" },
      { label: "All services", href: "/services" },
      { label: "Accommodation", href: "/accommodation" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "Facilities", href: "/facilities" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
