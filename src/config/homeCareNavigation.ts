import type { NavItem } from "@/config/navigation";
import type { FooterColumn } from "@/components/layout/ThemedFooter";

// The same ten labels in the same order as homeNavigation, so the header reads
// identically on every page: only the targets differ. Care at Home is the page
// you are already on, so it points at #visits, the section its own hero links
// to, the same way wellnessNavigation points School Wellness at #programme.
export const homeCareNavigation: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Facilities", href: "/facilities" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Care at Home", href: "#visits" },
  { label: "Health Tips", href: "/health-tips" },
  { label: "International Patient Care", href: "/international-care" },
  { label: "School Wellness", href: "/school-wellness" },
  { label: "Network", href: "/network" },
  { label: "Media", href: "/media" },
  { label: "Careers", href: "/careers" },
];

// Bare hashes for this page's own sections (ThemedFooter renders plain <a>
// tags, so the browser's same-document fragment navigation scrolls rather than
// reloading the route), absolute paths for everything that lives elsewhere.
//
// Medicine and telemedicine are the two exceptions, and deliberately so. This
// page summarises both in a single band each and then hands off: the detail
// already lives on /pharmacy#delivery and /services/telemedicine, and pointing
// the footer at the page's own thin band instead would leave a reader looking
// for delivery hours on the summary rather than the page that answers them.
export const homeCareFooterColumns: FooterColumn[] = [
  {
    heading: "Care at home",
    links: [
      { label: "Home visit services", href: "#visits" },
      { label: "Who a visit suits", href: "#who" },
      { label: "Sampling at home", href: "#sampling" },
      { label: "Medicine to your door", href: "/pharmacy#delivery" },
      { label: "Telemedicine", href: "/services/telemedicine" },
      { label: "Request a visit", href: "#book" },
    ],
  },
  {
    heading: "Hospital",
    links: [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about-us" },
      { label: "All services", href: "/services" },
      { label: "Facilities", href: "/facilities" },
      { label: "Pharmacy", href: "/pharmacy" },
      { label: "Health tips", href: "/health-tips" },
      { label: "Our network", href: "/network" },
      { label: "Accommodation", href: "/accommodation" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];
