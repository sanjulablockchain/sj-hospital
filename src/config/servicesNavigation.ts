import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

export const servicesNavigation: NavItem[] = [
  { label: "Services", href: "#centres" },
  { label: "Facilities", href: "#facilities" },
  { label: "Health Checks", href: "#packages" },
  { label: "Admissions", href: "#admissions" },
  { label: "International Patient Care", href: "#international" },
];

// Same labels as servicesNavigation, but the targets are sections that only
// exist on the /services index page. Detail pages (/services/[slug]) don't
// have #centres, #facilities, #packages, #admissions or #international on
// themselves, so their header must point back at the index page's anchors
// instead of a same-page hash that resolves to nothing.
export const servicesDetailNavigation: NavItem[] = [
  { label: "Services", href: "/services#centres" },
  { label: "Facilities", href: "/services#facilities" },
  { label: "Health Checks", href: "/services#packages" },
  { label: "Admissions", href: "/services#admissions" },
  { label: "International Patient Care", href: "/services#international" },
];

// Absolute `/services#...` targets rather than bare hashes, so these same
// columns work correctly from both page families: from a detail page
// (/services/[slug]) the link navigates to the index and lands on the
// section, while from the index page itself the link resolves to the exact
// URL already loaded — ThemedFooter renders these as plain <a> tags, not
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
      { label: "Pharmacy", href: "/services#pharmacy" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Health check packages", href: "/services#packages" },
      { label: "Admissions", href: "/services#admissions" },
      { label: "Facilities", href: "/services#facilities" },
      { label: "International patient care", href: "/services#international" },
      { label: "Home", href: "/" },
    ],
  },
];
