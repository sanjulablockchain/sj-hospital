import type { NavItem } from "@/config/navigation";

export const homeNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  // Points at the /facilities page rather than the home page's own #facilities
  // strip: that strip is a four-card summary, and the full page is now the real
  // destination for anyone asking what the building holds.
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "#pharmacy" },
  { label: "Health Tips", href: "#tips" },
  { label: "International Patient Care", href: "#international" },
  { label: "School Wellness", href: "#wellness" },
  { label: "Network", href: "#network" },
  { label: "Media", href: "#media" },
  { label: "Careers", href: "#career" },
];
