import type { FooterColumn } from "@/components/layout/ThemedFooter";

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
