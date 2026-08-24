import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// Labels and order mirror homeNavigation exactly, so the header reads
// identically on every page: the reference design for this page invented its
// own items ("When to come in", "Screening") and dropped four of ours, which
// would have made the nav change shape as you moved around the site. Only the
// targets differ here. Health Tips is the one item with a home on this page,
// so it points at the library; everything else points back at the home page
// or the services index, matching how servicesNavigation is built.
export const healthTipsNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/services#facilities" },
  { label: "Pharmacy", href: "/services#pharmacy" },
  { label: "Health Tips", href: "#library" },
  { label: "International Patient Care", href: "/services#international" },
  { label: "School Wellness", href: "/#wellness" },
  { label: "Network", href: "/#network" },
  { label: "Media", href: "/#media" },
  { label: "Careers", href: "/#career" },
];

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather
// than reloading), and absolute paths for everything that lives elsewhere.
export const healthTipsFooterColumns: FooterColumn[] = [
  {
    heading: "Health tips",
    links: [
      { label: "Dengue at home", href: "#seasonal" },
      { label: "The library", href: "#library" },
      { label: "When to come in", href: "#warning" },
      { label: "Screening by age", href: "#screening" },
      { label: "First aid at home", href: "#firstaid" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "All services", href: "/services" },
      { label: "Facilities", href: "/services#facilities" },
      { label: "Pharmacy", href: "/services#pharmacy" },
      { label: "School wellness", href: "/#wellness" },
    ],
  },
];
