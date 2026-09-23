export type InternationalCareItem = {
  index: string;
  title: string;
  body: string;
};

export const internationalCareItems: InternationalCareItem[] = [
  {
    index: "01",
    title: "Airport to bedside",
    body: "Ten minutes from Bandaranaike International. We arrange transfer and admission before you land.",
  },
  {
    index: "02",
    title: "Estimates in writing",
    body: "A costed treatment plan in your currency, approved before anything begins.",
  },
  {
    index: "03",
    title: "Insurance and claims",
    body: "Documentation prepared for international insurers and travel policies.",
  },
  {
    index: "04",
    title: "Language support",
    body: "English speaking clinicians, with interpreters arranged on request.",
  },
  {
    index: "05",
    title: "Records to take home",
    body: "Digital reports, imaging and discharge notes sent to your doctor at home.",
  },
  {
    index: "06",
    title: "Follow up online",
    body: "Post treatment review by telemedicine once you have travelled back.",
  },
];

/** `#international`'s own copy, stranded in `InternationalCareSection.tsx` until now. */
export const sectionEyebrow = "Ten minutes from the airport";
export const heading = "International patient care";
export const body =
  "You land at Katunayake. We take it from there. One desk arranges the transfer, the estimate, the interpreter and the records you take home.";
export const ctaPrimary = "Read more";
export const hrefPrimary = "/international-care";
export const ctaSecondary = "WhatsApp the desk";
export const hrefSecondary = "https://wa.me/94742223334";
/** The floating card over the photograph. */
export const badge = { title: "Estimate in writing", note: "Before anything begins" };
export const photo = "/images/international/hero-arrival.jpg";
export const photoAlt = "An international patient arriving at St. Joseph Hospital";
