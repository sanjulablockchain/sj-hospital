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
  { label: "School Wellness", href: "/school-wellness" },
  // And the same again for Network: the #network band stays on as the
  // four-node teaser, and the family of companies, the group figures and the
  // referral answers live on /network. A nav label has to mean the same thing
  // wherever it is clicked, so this points at the page here too, not at the
  // teaser directly below it.
  { label: "Network", href: "/network" },
  { label: "Media", href: "/media" },
  // And the same again for Careers: the #career band stays on as the teaser,
  // and the open roles, benefits, hiring process and application form live on
  // /careers. A nav label has to mean the same thing wherever it is clicked, so
  // this points at the page here too, not at the teaser below it.
  { label: "Careers", href: "/careers" },
];
