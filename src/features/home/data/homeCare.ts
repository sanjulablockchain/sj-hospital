/**
 * The three cards the home page's care-at-home band shows.
 *
 * Three, not four, though /home-care gathers four strands: medicine delivery is
 * deliberately left out here. The pharmacy band sits directly above this one on
 * the home page and already sends the reader to /pharmacy#delivery, so a fourth
 * card would be the same destination twice in a row.
 *
 * `href` deep links into the band each card describes, following the pattern
 * `facilities.ts` set. Telemedicine is the exception: /home-care only summarises
 * it, so that card skips the summary for /services/telemedicine, where the
 * detail actually lives. `teaserLinks.test.ts` pins all three destinations.
 */
export type HomeCareCard = {
  index: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  accent?: boolean;
};

export const homeCareCards: HomeCareCard[] = [
  {
    index: "01",
    title: "Home visits",
    body: "Doctors, nurses and laboratory technicians at your door, on 6 dedicated vehicles.",
    linkLabel: "For elders, infants and recovery",
    href: "/home-care#visits",
    accent: true,
  },
  {
    index: "02",
    title: "Sampling at home",
    body: "Samples taken where the patient is, processed by the hospital's own laboratory.",
    linkLabel: "Findings on your file",
    href: "/home-care#sampling",
  },
  {
    index: "03",
    title: "Telemedicine",
    body: "Video or phone consultations, with any prescription issued straight to the pharmacy.",
    linkLabel: "No travelling in",
    href: "/services/telemedicine",
  },
];
