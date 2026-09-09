import type { FooterColumn } from "@/components/layout/ThemedFooter";

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
