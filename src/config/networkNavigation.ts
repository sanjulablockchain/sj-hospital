import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page: the reference design for this page invented its
// own item list, which would have made the nav change shape as you moved around
// the site. Only the targets differ. Network is the page you are already on, so
// it points at #family, the first of its own sections, the same way
// internationalNavigation points International Patient Care at #journey.
export const networkNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Care at Home", href: "/home-care" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/school-wellness" },
  { label: "Network", href: "#family" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
];

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
