export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Medical Services", href: "/services" },
  { label: "Accommodation", href: "/accommodation" },
  { label: "About Us", href: "/about-us" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
];

export const footerQuickLinks: NavItem[] = primaryNavigation;
