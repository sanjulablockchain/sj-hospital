import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
export const accommodationFooterColumns: FooterColumn[] = [
  {
    heading: "Rooms",
    links: [
      { label: "Standard", href: "#standard" },
      { label: "Deluxe", href: "#deluxe" },
      { label: "Super deluxe", href: "#super-deluxe" },
      { label: "Wards", href: "#wards" },
      { label: "Book a room", href: "#book" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "Facilities", href: "/facilities" },
      { label: "Book a doctor", href: "/e-channeling" },
      { label: "Care at home", href: "/home-care" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
