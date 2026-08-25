import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Same nine labels in the same order as homeNavigation and servicesNavigation,
// so the header reads identically on every page; only the targets differ.
// Facilities is the page we are already on, so it points at this page's own
// building section. The other eight have no home here, so Services goes to the
// services index, Pharmacy and International Patient Care to their own pages,
// and the remaining four back to the matching section on the home page.
export const facilitiesNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "#floors" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/#wellness" },
  { label: "Network", href: "/network" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/#career" },
];

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
      { label: "Book a room", href: "/accommodation" },
    ],
  },
];
