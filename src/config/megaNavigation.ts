/**
 * The site header's one navigation tree, rendered by `ThemedHeader` on every
 * page (from `ThemedShell`, not from each hero). It replaced seventeen
 * per-page `*Navigation` arrays that differed only in which item was a bare
 * in-page hash; with the header rendered once, above every page, hrefs are
 * absolute paths without exception (`megaNavigation.test.ts`).
 *
 * Labels and descriptions stay English in every locale, per the register
 * rule (docs/superpowers/i18n-register-rule.md): `navigationLabels.test.ts`
 * scans this file for anything else.
 *
 * Icon keys resolve in `MegaNavIcon.tsx`. Keep them as strings here so this
 * module stays plain data that can travel from the server shell to the client
 * header as a prop.
 */

export type MegaNavIconKey =
  | "building"
  | "pill"
  | "home"
  | "globe"
  | "school"
  | "bed"
  | "info"
  | "network"
  | "newspaper"
  | "briefcase"
  | "heart"
  | "shield";

export type MegaNavLink = {
  label: string;
  /** Absolute path, optionally with a `#section` the page owns. */
  href: string;
  /** One line under the title. Tile menus only; the Services directory is title-only. */
  description?: string;
  icon?: MegaNavIconKey;
};

export type MegaNavColumn = {
  /** The column eyebrow. Omitted in tile layouts, where columns are only a wrap hint. */
  heading?: string;
  links: MegaNavLink[];
};

export type MegaNavFooter = {
  /** The accent link on the left of the footer row. */
  primary: MegaNavLink;
  /** The quiet links on the right. */
  links: MegaNavLink[];
};

export type MegaNavMenu = {
  kind: "menu";
  /** Element id stem, also the key the header uses for open state. */
  id: string;
  label: string;
  /**
   * `columns`: eyebrow-headed columns of dense links (the Services directory).
   * `tiles`: a grid of icon + title + description cards.
   */
  layout: "columns" | "tiles";
  columns: MegaNavColumn[];
  footer?: MegaNavFooter;
};

export type MegaNavLinkItem = {
  kind: "link";
  id: string;
  label: string;
  href: string;
};

export type MegaNavSection = MegaNavMenu | MegaNavLinkItem;

// Column order and headings mirror SERVICE_GROUPS in
// src/features/services/data/groups.ts; the test pins both.
const services: MegaNavMenu = {
  kind: "menu",
  id: "services",
  label: "Services",
  layout: "columns",
  columns: [
    {
      heading: "Emergency",
      links: [
        { label: "Accident & emergency", href: "/services/accident-emergency" },
        { label: "Intensive & critical care", href: "/services/intensive-critical-care" },
      ],
    },
    {
      heading: "Surgical",
      links: [
        { label: "General surgery", href: "/services/general-surgery" },
        { label: "Orthopaedic surgery", href: "/services/orthopaedic-surgery" },
        { label: "ENT surgery & audiology", href: "/services/ent-surgery" },
        { label: "Urology", href: "/services/urology" },
        { label: "Ophthalmology & cataract", href: "/services/ophthalmology" },
        { label: "Neurosurgery", href: "/services/neurosurgery" },
        { label: "Gastrointestinal & endoscopy", href: "/services/endoscopy" },
      ],
    },
    {
      heading: "Diagnostics",
      links: [
        { label: "Laboratory services", href: "/services/laboratory" },
        { label: "Radiology & digital X-ray", href: "/services/radiology" },
        { label: "Cardiac screening & ECG", href: "/services/cardiac-screening" },
        { label: "CTG & fetal monitoring", href: "/services/fetal-monitoring" },
      ],
    },
    {
      heading: "Clinics",
      links: [
        { label: "Outpatient department", href: "/services/outpatient-department" },
        { label: "Cardiology", href: "/services/cardiology" },
        { label: "Dermatology & wound clinic", href: "/services/dermatology" },
        { label: "Diabetes & endocrine care", href: "/services/diabetes-endocrinology" },
        { label: "Nutrition & dietetics", href: "/services/nutrition" },
        { label: "Rheumatology", href: "/services/rheumatology" },
        { label: "Neurology", href: "/services/neurology" },
        { label: "Nephrology & renal care", href: "/services/nephrology" },
        { label: "Respiratory & chest medicine", href: "/services/respiratory-medicine" },
        { label: "Haematology", href: "/services/haematology" },
        { label: "Mental health & counselling", href: "/services/mental-health" },
        { label: "Physiotherapy & rehabilitation", href: "/services/physiotherapy" },
        { label: "Speech & language therapy", href: "/services/speech-therapy" },
        { label: "Inpatient rooms", href: "/services/inpatient-rooms" },
      ],
    },
    {
      heading: "Women & children",
      links: [
        { label: "Obstetrics & maternity", href: "/services/obstetrics-maternity" },
        { label: "Gynaecology", href: "/services/gynaecology" },
        { label: "Paediatrics & neonatal care", href: "/services/paediatrics" },
        { label: "Fertility & embryology", href: "/services/fertility" },
        { label: "Vaccination clinic", href: "/services/vaccination-clinic" },
      ],
    },
    {
      heading: "At home",
      links: [
        { label: "24-hour pharmacy", href: "/services/pharmacy" },
        { label: "Medicine delivery", href: "/services/medicine-delivery" },
        { label: "Home visits", href: "/services/home-visits" },
        { label: "Telemedicine", href: "/services/telemedicine" },
      ],
    },
  ],
  footer: {
    primary: { label: "See all services", href: "/services" },
    links: [
      { label: "Book a doctor", href: "/e-channeling" },
      { label: "Doctor directory", href: "/e-channeling#directory" },
      { label: "Health packages", href: "/services#packages" },
    ],
  },
};

const patientCare: MegaNavMenu = {
  kind: "menu",
  id: "patient-care",
  label: "Patient Care",
  layout: "tiles",
  columns: [
    {
      links: [
        {
          label: "Facilities",
          href: "/facilities",
          description: "Wards, theatres and diagnostics, floor by floor",
          icon: "building",
        },
        {
          label: "Pharmacy",
          href: "/pharmacy",
          description: "Counters, stock, refills and delivery",
          icon: "pill",
        },
      ],
    },
    {
      links: [
        {
          label: "Care at Home",
          href: "/home-care",
          description: "Home visits, nursing and telemedicine",
          icon: "home",
        },
        {
          label: "International Patient Care",
          href: "/international-care",
          description: "Support for patients travelling to Negombo",
          icon: "globe",
        },
      ],
    },
    {
      links: [
        {
          label: "School Wellness",
          href: "/school-wellness",
          description: "Health programmes for schools",
          icon: "school",
        },
        {
          label: "Accommodation",
          href: "/accommodation",
          description: "Rooms for inpatients and the family beside them",
          icon: "bed",
        },
      ],
    },
  ],
  footer: {
    primary: { label: "Book a doctor", href: "/e-channeling" },
    links: [
      { label: "Visiting hours", href: "/facilities#visiting" },
      { label: "Ambulance", href: "/facilities#ambulance" },
      { label: "Medicine delivery", href: "/pharmacy#delivery" },
    ],
  },
};

const about: MegaNavMenu = {
  kind: "menu",
  id: "about",
  label: "About",
  layout: "tiles",
  columns: [
    {
      links: [
        {
          label: "About Us",
          href: "/about-us",
          description: "Who we are and how we care",
          icon: "info",
        },
        {
          label: "Network",
          href: "/network",
          description: "The family of companies behind the hospital",
          icon: "network",
        },
      ],
    },
    {
      links: [
        {
          label: "Media",
          href: "/media",
          description: "Newsroom, press and announcements",
          icon: "newspaper",
        },
        {
          label: "Careers",
          href: "/careers",
          description: "Open roles and how we hire",
          icon: "briefcase",
        },
      ],
    },
    {
      links: [
        {
          label: "Health Tips",
          href: "/health-tips",
          description: "Seasonal advice, screening and first aid",
          icon: "heart",
        },
        {
          label: "Privacy Policy",
          href: "/privacy-policy",
          description: "How we handle your information",
          icon: "shield",
        },
      ],
    },
  ],
  footer: {
    primary: { label: "Contact us", href: "/contact-us" },
    links: [
      { label: "Press", href: "/media#press" },
      { label: "Open roles", href: "/careers#openings" },
    ],
  },
};

export const megaNavigation: MegaNavSection[] = [
  services,
  patientCare,
  about,
  { kind: "link", id: "contact", label: "Contact", href: "/contact-us" },
];

/** Every link the header can reach, flattened: columns, footers and top-level links. */
export function megaNavLinks(): MegaNavLink[] {
  const out: MegaNavLink[] = [];
  for (const section of megaNavigation) {
    if (section.kind === "link") {
      out.push({ label: section.label, href: section.href });
      continue;
    }
    for (const column of section.columns) out.push(...column.links);
    if (section.footer) out.push(section.footer.primary, ...section.footer.links);
  }
  return out;
}
