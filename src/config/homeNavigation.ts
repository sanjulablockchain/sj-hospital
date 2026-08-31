import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

export const homeNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  // Points at the /facilities page rather than the home page's own #facilities
  // strip: that strip is a four-card summary, and the full page is now the real
  // destination for anyone asking what the building holds.
  { label: "Facilities", href: "/facilities" },
  // Same reasoning for Pharmacy: the #pharmacy band stays on as the teaser, and
  // this leaves the home page for the full one.
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Care at Home", href: "/home-care" },
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

// Moved here from HomeFooter.tsx so every footer's data lives in src/config,
// where navigation.test.ts can reach it. The Accommodation link now points at
// /accommodation rather than the home page's own #rooms band: that band is a
// four-card teaser, and the full page is the real destination, matching how
// Facilities, Pharmacy, Health Tips, Network and Careers were each repointed
// when their own pages landed.
//
// Surgical care and Media were the last two holding out, scrolling to a home
// band while the pages they name sat one click further away. Every link here
// now leaves the page, and teaserLinks.test.ts asserts it: unlike the other
// footers, this one has no page sections of its own worth linking, because
// every band on the home page is a teaser for somewhere else.
export const homeFooterColumns: FooterColumn[] = [
  {
    heading: "Care",
    links: [
      { label: "Services", href: "/services" },
      { label: "Surgical care", href: "/services/general-surgery" },
      { label: "Pharmacy", href: "/pharmacy" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Care at home", href: "/home-care" },
      { label: "Book a doctor", href: "/e-channeling" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Facilities", href: "/facilities" },
      { label: "International patient care", href: "/international-care" },
      { label: "Health tips", href: "/health-tips" },
      { label: "School wellness", href: "/school-wellness" },
      { label: "Network", href: "/network" },
      { label: "Media", href: "/media" },
      { label: "Careers", href: "/careers" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
