import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

export const servicesNavigation: NavItem[] = [
  { label: "Services", href: "#centres" },
  { label: "Facilities", href: "#facilities" },
  { label: "Health Checks", href: "#packages" },
  { label: "Admissions", href: "#admissions" },
  { label: "International Patient Care", href: "#international" },
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
