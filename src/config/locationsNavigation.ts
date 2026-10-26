import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
//
// The header's Locations menu deep links to `#negombo` and `#ratnapura`, and
// megaNavigation.test.ts only accepts an anchor some footer vouches for, so
// the two hospital rows here are what let the menu reach each card directly.
export const locationsFooterColumns: FooterColumn[] = [
  {
    heading: "Locations",
    links: [
      { label: "Our hospitals", href: "#hospitals" },
      { label: "St. Joseph Hospital, Negombo", href: "#negombo" },
      { label: "Blue Sapphire Hospital, Ratnapura", href: "#ratnapura" },
      { label: "Which hospital?", href: "#help" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "All services", href: "/services" },
      { label: "Facilities", href: "/facilities" },
      { label: "Our network", href: "/network" },
      { label: "International patients", href: "/international-care" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
