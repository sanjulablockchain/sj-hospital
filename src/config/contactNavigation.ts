import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page. Contact Us is not one of the nine, so every target
// here is the page it names, the same reasoning aboutNavigation uses.
export const contactNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Care at Home", href: "/home-care" },
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
export const contactFooterColumns: FooterColumn[] = [
  {
    heading: "Contact",
    links: [
      { label: "Reach us", href: "#reach" },
      { label: "Send a message", href: "#message" },
      { label: "Find us", href: "#map" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Book a doctor", href: "/e-channeling" },
      { label: "All services", href: "/services" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
