/**
 * The four cards the home page's facilities band shows.
 *
 * `href` deep links into the section of /facilities that each card describes,
 * rather than the page root: a reader who clicks "Reports read twice" wants
 * the diagnostics section, not the top of a long page with the relevant part
 * below the fold. The rooms card is the exception, belonging to /accommodation.
 * `teaserLinks.test.ts` pins all four destinations.
 */
export type FacilityCard = {
  index: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  photo?: string;
  photoAlt?: string;
  accent?: boolean;
};

export const facilities: FacilityCard[] = [
  {
    index: "01",
    title: "Six floor hospital",
    body: "Purpose built in Negombo, with ambulance bay and covered arrival.",
    linkLabel: "Ambulance bay open 24/7",
    href: "/facilities#ambulance",
    photo: "/images/hero-exterior.png",
    photoAlt: "Hospital exterior",
  },
  {
    index: "02",
    title: "Outpatient wing",
    body: "Consulting suites with same day triage and no shared waiting crush.",
    linkLabel: "Same day triage",
    href: "/facilities#floors",
    photo: "/images/welcome.jpg",
    photoAlt: "Outpatient reception",
  },
  {
    index: "03",
    title: "Imaging, lab & theatres",
    body: "Digital X-ray, 24 hour laboratory and sterile surgical suites.",
    linkLabel: "Reports read twice",
    href: "/facilities#diagnostic",
    photo: "/images/doctors.jpg",
    photoAlt: "Imaging and diagnostics",
  },
  {
    index: "04",
    title: "Inpatient rooms",
    body: "Private and semi private, sanitised every two hours. From 10,000 LKR a night.",
    linkLabel: "See rooms",
    href: "/accommodation#rooms",
    accent: true,
  },
];
