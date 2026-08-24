import type { NavItem } from "@/config/navigation";

export const homeNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "#facilities" },
  // Pharmacy has its own page now, so this leaves the home page rather than
  // jumping to the #pharmacy band, which stays on as the teaser that leads there.
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Health Tips", href: "#tips" },
  { label: "International Patient Care", href: "#international" },
  { label: "School Wellness", href: "#wellness" },
  { label: "Network", href: "#network" },
  { label: "Media", href: "#media" },
  { label: "Careers", href: "#career" },
];
