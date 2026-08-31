import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same nine labels in the same order as homeNavigation, so the header reads
// identically on every page. Privacy policy is not one of the nine, so every
// target here is the page it names, the same reasoning aboutNavigation uses.
export const privacyNavigation: NavItem[] = [
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

// This page has no sections of its own to anchor into, so the "own" column the
// other four pages carry does not apply here; the brief's anchor contract
// records that in its own row: "(no own item)... none, all absolute". Absolute
// paths only, no bare hashes.
export const privacyFooterColumns: FooterColumn[] = [
  {
    heading: "Legal",
    links: [{ label: "Privacy policy", href: "/privacy-policy" }],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Book a doctor", href: "/e-channeling" },
      { label: "Contact us", href: "/contact-us" },
    ],
  },
];
