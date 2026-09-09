import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Bare hashes for this page's own sections, absolute paths for everything else.
// ThemedFooter renders these as plain <a> tags rather than next/link, so the
// browser's own same-document fragment navigation handles the hashes: it
// scrolls to the target id instead of reloading the route.
export const facilitiesFooterColumns: FooterColumn[] = [
  {
    heading: "The building",
    links: [
      { label: "Six floors, one building", href: "#floors" },
      { label: "Operating theatres", href: "#theatres" },
      { label: "Critical care", href: "#critical" },
      { label: "Rooms & wards", href: "#rooms" },
      { label: "Diagnostics", href: "#diagnostic" },
    ],
  },
  {
    heading: "Patients",
    links: [
      { label: "Ambulance & transfers", href: "#ambulance" },
      { label: "Visiting & getting here", href: "#visiting" },
      { label: "All services", href: "/services" },
      { label: "Admissions", href: "/services#admissions" },
      // Already the reachability check's target for /accommodation, so About
      // us and Contact us are the only two links this column was missing.
      { label: "Book a room", href: "/accommodation" },
      { label: "About us", href: "/about-us" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
