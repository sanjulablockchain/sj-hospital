import type { NavItem } from "@/config/navigation";

export const homeNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  // Points at the /facilities page rather than the home page's own #facilities
  // strip: that strip is a four-card summary, and the full page is now the real
  // destination for anyone asking what the building holds.
  { label: "Facilities", href: "/facilities" },
  // Same reasoning for Pharmacy: the #pharmacy band stays on as the teaser, and
  // this leaves the home page for the full one.
  { label: "Pharmacy", href: "/pharmacy" },
  // And the same again for Health Tips: #tips stays as the four-row teaser,
  // and the library, triage list, screening table and first aid live on
  // /health-tips.
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "#wellness" },
  { label: "Network", href: "#network" },
  { label: "Media", href: "#media" },
  { label: "Careers", href: "#career" },
];
