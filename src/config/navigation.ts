export type NavItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Medical Services", href: "#services" },
  { label: "Accommodation", href: "#accommodation" },
  { label: "About Us", href: "#about" },
  { label: "Career", href: "https://sjhospital.lk/career/" },
  { label: "Contact Us", href: "#contact" },
];

export const footerQuickLinks: NavItem[] = primaryNavigation;
