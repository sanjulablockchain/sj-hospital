/**
 * `#faq`: the seven questions the v4 reference answers on the home page. Every
 * answer was checked against the page that owns the fact before it went in:
 * the OPD entry in `services/data/clinics.ts` (free consultation, 10%
 * laboratory discount), `international-care/data/content.ts` (parking,
 * corporate insurance, bystander bed, CT and MRI by referral),
 * `home-care/data/content.ts` (sampling at home, a visit is not an emergency
 * service) and `services/data/diagnostics.ts` (X-ray within the hour, results
 * the same day). Questions and answers translate, per the register rule.
 */

export const __review = { status: "draft", reviewer: null, date: null } as const;

export type FaqItem = { q: string; a: string };

export const sectionEyebrow = "Frequently asked questions";
export const heading = "The questions we always get";
export const body =
  "Short answers to what patients and families ask us most. Anything else, the switchboard answers at every hour.";

export const items: FaqItem[] = [
  {
    q: "Is an OPD consultation really free?",
    a: "Yes. Consultations at our outpatient department are free, every hour we are open, for general complaints and specialist referral alike. Your diagnosis is explained before you leave, and OPD patients save 10% on laboratory tests.",
  },
  {
    q: "How far is the hospital from the airport?",
    a: "Ten minutes. We are at 229/10 St. Joseph Street in central Negombo, between the airport and the town. Our own ambulance is available for transfer, and there is free parking beside the main entrance.",
  },
  {
    q: "Does my insurance work here?",
    a: "Documentation is prepared for international insurers and travel policies, and the desk assists with the claim. Corporate insurance is accepted at the outpatient department, which we were the first hospital in Negombo to offer. Bring your card with you to admission.",
  },
  {
    q: "Can a family member stay with me?",
    a: "Yes. Every room category, from the wards up to super deluxe, has a bystander bed and chair, and one attendant may stay overnight. Meals are prepared to the dietary orders noted at admission.",
  },
  {
    q: "Can a blood sample be taken at home?",
    a: "Yes. A laboratory technician attends when a sample is needed, and it goes back to the hospital's own laboratory. Mention that sampling is likely when you request the visit so the right person comes.",
  },
  {
    q: "Can I have a CT or MRI scan here?",
    a: "Not on site. CT and MRI are arranged by referral to a partner imaging centre, and the desk books it for you. Digital X-ray is read within the hour, ultrasound is done at the visit, and laboratory reports come the same day, checked by two doctors.",
  },
  {
    q: "Is a home visit the right thing in an emergency?",
    a: "No. A home visit is arranged by appointment and is not an emergency service. In an emergency, call 0117 84 84 84 or come to accident and emergency, which is open at every hour.",
  },
];

/** The brand card beside the list. The phone and email it shows are structural facts rendered by the component. */
export const still = {
  title: "Still have a question?",
  body: "Call, WhatsApp or email us. A person answers, day or night.",
};

export const seeAll = { cta: "See all questions", href: "/contact-us" };
