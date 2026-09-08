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
export const sectionEyebrow = "08 / International patient care";
export const heading = { line1: "Travelling", line2: "for care, or", line3: "just visiting" };
export const body =
  "Negombo sits ten minutes from the international airport. We look after visitors, expatriates and medical travellers from arrival to follow up at home.";
export const ctaPrimary = "See international care";
export const ctaSecondary = "Talk to the desk";
