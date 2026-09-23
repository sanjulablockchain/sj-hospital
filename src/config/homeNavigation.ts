import type { FooterColumn } from "@/components/layout/ThemedFooter";

/**
 * The home footer's three columns, as the v4 reference lays them out:
 * Services, Patient care, About. Every link leaves the page
 * (teaserLinks.test.ts, navigation.test.ts); the home page has no section of
 * its own worth linking, because every band on it is a teaser for a page
 * somewhere else.
 */
export const homeFooterColumns: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "Accident and emergency", href: "/services/accident-emergency" },
      { label: "Outpatient department", href: "/services/outpatient-department" },
      { label: "Surgical care", href: "/services/general-surgery" },
      { label: "Laboratory", href: "/services/laboratory" },
      { label: "Radiology", href: "/services/radiology" },
      { label: "See all services", href: "/services" },
    ],
  },
  {
    heading: "Patient care",
    links: [
      { label: "Facilities", href: "/facilities" },
      { label: "Pharmacy", href: "/pharmacy" },
      { label: "Care at home", href: "/home-care" },
      { label: "International patients", href: "/international-care" },
      { label: "School wellness", href: "/school-wellness" },
      { label: "Accommodation", href: "/accommodation" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "Network", href: "/network" },
      { label: "Media", href: "/media" },
      { label: "Careers", href: "/careers" },
      { label: "Health tips", href: "/health-tips" },
      { label: "Privacy policy", href: "/privacy-policy" },
      // Not in the reference's column, but every footer on the site must reach
      // the contact page (navigation.test.ts), and "Reach us" beside it holds
      // the numbers rather than the link.
      { label: "Contact us", href: "/contact-us" },
    ],
  },
];
