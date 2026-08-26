import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page: the reference design for this page invented its
// own items ("Cost estimates", "Questions") and dropped five of ours, which
// would have made the nav change shape as you moved around the site. Only the
// targets differ. International Patient Care is the page you are already on, so
// it points at #journey, the first of its own sections; the other eight resolve
// the same way facilitiesNavigation resolves them.
export const internationalNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "#journey" },
  { label: "School Wellness", href: "/school-wellness" },
  { label: "Network", href: "/network" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
];

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const internationalFooterColumns: FooterColumn[] = [
  {
    heading: "International",
    links: [
      { label: "The journey", href: "#journey" },
      { label: "What the desk handles", href: "#services" },
      { label: "Written estimates", href: "#estimates" },
      { label: "Rooms & attendants", href: "#rooms" },
      { label: "Insurance & billing", href: "#insurance" },
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
      { label: "Health tips", href: "/health-tips" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Contact us", href: "/contact-us" },
    ],
  },
];
