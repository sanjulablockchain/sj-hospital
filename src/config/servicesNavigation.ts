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

export const servicesFooterColumns: FooterColumn[] = [
  {
    heading: "Care",
    links: [
      { label: "Centres of excellence", href: "#centres" },
      { label: "Full directory", href: "#directory" },
      { label: "Department of surgery", href: "#surgical" },
      { label: "Diagnostics & radiology", href: "#diagnostics" },
      { label: "Pharmacy", href: "#pharmacy" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Health check packages", href: "#packages" },
      { label: "Admissions", href: "#admissions" },
      { label: "Facilities", href: "#facilities" },
      { label: "International patient care", href: "#international" },
      { label: "Home", href: "/" },
    ],
  },
];
