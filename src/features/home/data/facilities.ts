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
    href: "#facilities",
    photo: "/images/hero.jpg",
    photoAlt: "Hospital exterior",
  },
  {
    index: "02",
    title: "Outpatient wing",
    body: "Consulting suites with same day triage and no shared waiting crush.",
    linkLabel: "Same day triage",
    href: "#facilities",
    photo: "/images/welcome.jpg",
    photoAlt: "Outpatient reception",
  },
  {
    index: "03",
    title: "Imaging, lab & theatres",
    body: "Digital X-ray, 24 hour laboratory and sterile surgical suites.",
    linkLabel: "Reports read twice",
    href: "#facilities",
    photo: "/images/doctors.jpg",
    photoAlt: "Imaging and diagnostics",
  },
  {
    index: "04",
    title: "Inpatient rooms",
    body: "Private and semi private, sanitised every two hours. From 10,000 LKR a night.",
    linkLabel: "See rooms",
    href: "#rooms",
    accent: true,
  },
];
