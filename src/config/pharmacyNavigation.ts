import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Labels and order mirror homeNavigation exactly, so the header reads
// identically on every page: the same choice servicesNavigation makes, and the
// reason this file exists rather than the pharmacy page inventing its own nav.
// Only the targets differ. Pharmacy is the page you are already on, so it
// points at #counters, the first of its own sections; Facilities and
// International Patient Care have pages of their own; the remaining four have
// no home outside the home page.
export const pharmacyNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "#counters" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/#wellness" },
  { label: "Network", href: "/#network" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/#career" },
];

// Bare hashes are safe here, unlike servicesFooterColumns: every one of these
// sections is on this single page, so there is no sibling route the same
// columns have to resolve from.
export const pharmacyFooterColumns: FooterColumn[] = [
  {
    heading: "Pharmacy",
    links: [
      { label: "The counter", href: "#counters" },
      { label: "What we stock", href: "#stock" },
      { label: "Delivery", href: "#delivery" },
      { label: "Repeat prescriptions", href: "#refills" },
      { label: "Safety & records", href: "#safety" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "All services", href: "/services" },
      { label: "Facilities", href: "/facilities" },
      { label: "Admissions", href: "/services#admissions" },
      { label: "Careers", href: "/#career" },
    ],
  },
];
