import type { FooterColumn } from "@/components/layout/ThemedFooter";

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
