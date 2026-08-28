/**
 * The four nodes the home page's network accordion shows.
 *
 * `href` is where the open panel goes. Each node has a page that covers it:
 * the hospital itself is /facilities, the school visits are /school-wellness,
 * and the remote consult is its own service page. The Los Angeles parent has
 * no page here, so it goes to the group family band on /network rather than
 * off site. `teaserLinks.test.ts` pins all four destinations.
 */
export type NetworkNode = {
  index: string;
  location: string;
  name: string;
  body: string;
  photo: string;
  photoAlt: string;
  linkLabel: string;
  href: string;
};

export const networkNodes: NetworkNode[] = [
  {
    index: "01",
    location: "Negombo, LK",
    name: "St. Joseph Hospital",
    body: "Flagship hospital: emergency, OPD, surgery, inpatient, laboratory, imaging and pharmacy.",
    photo: "/images/hero-exterior.png",
    photoAlt: "St. Joseph Hospital in Negombo",
    linkLabel: "Tour the hospital",
    href: "/facilities",
  },
  {
    index: "02",
    location: "Los Angeles, US",
    name: "Kids & Teens Medical Group",
    body: "Managing group: clinical governance, protocols and physician training.",
    photo: "/images/network/kids-teens-clinic.jpg",
    photoAlt: "Reception at the Kids & Teens Medical Group clinic in Los Angeles",
    linkLabel: "Meet the group",
    href: "/network#family",
  },
  {
    index: "03",
    location: "Negombo, LK",
    name: "School wellness programme",
    body: "On campus screening and vaccination across partner schools.",
    // Stand-in: the St. Joseph clinical staff who run the school visits. Swap
    // for a photograph from an actual campus visit when one is available.
    photo: "/images/career-staff.jpg",
    photoAlt: "St. Joseph nurses and doctor who run the school screening visits",
    linkLabel: "The school programme",
    href: "/school-wellness",
  },
  {
    index: "04",
    location: "Island wide, LK",
    name: "Telemedicine & delivery",
    body: "Remote consultations and medicine dispatch beyond the Negombo district.",
    photo: "/images/network/home-visit-vehicle.jpg",
    photoAlt: "St. Joseph Hospital home visit service vehicle",
    linkLabel: "Consult from home",
    href: "/services/telemedicine",
  },
];
