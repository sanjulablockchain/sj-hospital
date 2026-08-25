import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Labels and order mirror homeNavigation exactly, so the header reads
// identically on every page. Only the targets differ. Facilities, Pharmacy,
// Health Tips and International Patient Care are all pages of their own now,
// superseding the summary bands still on this index, so they leave /services
// entirely. The remaining four (School Wellness, Network, Media, Careers) have
// no home on the services pages, so they always point back at the matching
// section on the home page.
export const servicesNavigation: NavItem[] = [
  { label: "Services", href: "#directory" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/#wellness" },
  { label: "Network", href: "/#network" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/#career" },
];

// Same labels and order as servicesNavigation, for the /services/[slug]
// detail pages, which have none of the /services index sections on
// themselves. Facilities, Pharmacy, Health Tips and International Patient Care
// point at their own pages, the same targets servicesNavigation uses; and
// Services points at the index page itself, since there's no equivalent
// section on a detail page to jump to.
export const servicesDetailNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/#wellness" },
  { label: "Network", href: "/#network" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/#career" },
];

// Absolute `/services#...` targets rather than bare hashes, so these same
// columns work correctly from both page families: from a detail page
// (/services/[slug]) the link navigates to the index and lands on the
// section, while from the index page itself the link resolves to the exact
// URL already loaded: ThemedFooter renders these as plain <a> tags, not
// next/link, so the browser's own same-document fragment navigation takes
// over: it scrolls to the target id rather than reloading, since the
// pathname is unchanged. One source of truth for both contexts, instead of
// a servicesDetailFooterColumns sibling that could drift from this one (the
// same defect servicesDetailNavigation above was introduced to fix, one
// layer up, for the header).
export const servicesFooterColumns: FooterColumn[] = [
  {
    heading: "Care",
    links: [
      { label: "Centres of excellence", href: "/services#centres" },
      { label: "Full directory", href: "/services#directory" },
      { label: "Department of surgery", href: "/services#surgical" },
      { label: "Diagnostics & radiology", href: "/services#diagnostics" },
      { label: "Pharmacy", href: "/pharmacy" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Health check packages", href: "/services#packages" },
      { label: "Admissions", href: "/services#admissions" },
      { label: "Facilities", href: "/facilities" },
      { label: "International patient care", href: "/international-care" },
      { label: "Health tips", href: "/health-tips" },
      { label: "Home", href: "/" },
    ],
  },
];
