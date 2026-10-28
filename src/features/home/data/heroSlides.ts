import { HOSPITAL_PHONE_LABEL, HOSPITAL_TEL } from "../../contact/data/content.ts";

/**
 * The hero is a slideshow of eight message slides, one per advantage the
 * hospital leads with, in the order the owner set on 2026-10-28. Each slide
 * is a kicker, a two part heading (`accent` is drawn in `--home-accent`), one
 * paragraph, one or two buttons and its own photograph (`positionClass` is
 * the object-position for `object-cover`, chosen per shot for a portrait
 * crop). Every slide links to the page that backs it; `heroSlides.test.ts`
 * resolves each route and fragment.
 *
 * Hero copy stays English in every locale (the register rule), so none of
 * this is translated.
 *
 * No slide types a figure that has a home elsewhere. The laboratory slide
 * carries `{count}` and `{fromPrice}`, filled by HomePage from the laboratory
 * feature's catalogue summary, and the two call buttons print the switchboard
 * from `contact`'s own constants.
 *
 * This module has no `.si.ts` / `.ta.ts` overlay on purpose: nothing in it
 * translates, and `content.ts`'s overlay walker would otherwise demand eight
 * placeholder entries per language for an array of English facts.
 */
export type HeroSlideContent = {
  id: string;
  kicker: string;
  heading: { lead: string; accent: string };
  body: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  photo: string;
  photoAlt: string;
  positionClass: string;
};

/** Time each slide holds before the next crossfade begins. */
export const HERO_SLIDE_INTERVAL_MS = 7000;

const callTheHospital = { label: `Call ${HOSPITAL_PHONE_LABEL}`, href: HOSPITAL_TEL };

export const heroSlides: readonly HeroSlideContent[] = [
  {
    id: "free-opd",
    kicker: "A first for Sri Lanka",
    heading: { lead: "Seeing a doctor", accent: "costs you nothing." },
    body: "Consultations at our outpatient department are free, every hour we are open. Walk in and see a doctor, and never weigh a fever or a week of pain against the money.",
    ctaPrimary: { label: "See the free OPD", href: "/services/outpatient-department" },
    ctaSecondary: callTheHospital,
    photo: "/images/home/free-opd-doctor.jpg",
    photoAlt: "A St. Joseph Hospital doctor in a branded white coat, arms folded, a stethoscope around his neck.",
    positionClass: "object-[50%_18%]",
  },
  {
    id: "medicine-delivery",
    kicker: "Medicine delivery, 24/7",
    heading: { lead: "Your medicine, at your door,", accent: "any hour." },
    body: "Send a photo of your prescription. A pharmacist checks it, and it leaves our own counter for anywhere in Negombo, day or night.",
    ctaPrimary: { label: "Send a prescription", href: "/services/medicine-delivery" },
    photo: "/images/services/heroes/medicine-delivery.jpg",
    photoAlt: "Medicine delivery boxes left at a doorstep",
    positionClass: "object-[50%_50%]",
  },
  {
    id: "patient-transport",
    kicker: "Patient transport, 24/7",
    heading: { lead: "Our ambulance comes to you,", accent: "around the clock." },
    body: "Our own ambulances are on call at every hour, for emergencies and for transfers, dispatched from the covered bay at our door.",
    ctaPrimary: callTheHospital,
    ctaSecondary: { label: "Ambulance and transfers", href: "/facilities#ambulance" },
    photo: "/images/services/heroes/accident-emergency.jpg",
    photoAlt: "The St. Joseph Hospital emergency team",
    positionClass: "object-[50%_40%]",
  },
  {
    id: "digital-xray",
    kicker: "Only in Negombo",
    heading: { lead: "The only", accent: "digital X-ray in Negombo." },
    body: "Films read within the hour and straight onto your file, with ultrasound beside it, at every hour of the day.",
    ctaPrimary: { label: "Radiology and digital X-ray", href: "/services/radiology" },
    photo: "/images/services/heroes/radiology.jpg",
    photoAlt: "A digital X-ray room with an overhead imaging unit and examination table",
    positionClass: "object-[50%_50%]",
  },
  {
    id: "laboratory",
    kicker: "Laboratory",
    heading: { lead: "The best equipment.", accent: "The lowest prices." },
    body: "{count} tests, most reported the same day and every report checked by two doctors. Tests from {fromPrice} LKR onwards.",
    ctaPrimary: { label: "See every test and price", href: "/laboratory-tests" },
    ctaSecondary: { label: "Book a test", href: "/services/laboratory" },
    photo: "/images/services/heroes/laboratory.jpg",
    photoAlt: "A gloved hand holding a sample vial beside a laboratory analyser",
    positionClass: "object-[50%_50%]",
  },
  {
    id: "channeling",
    kicker: "Why come to us?",
    heading: { lead: "Your visit looks after", accent: "the whole town." },
    body: "Book a consultant here and all the money goes back into our Wellness Centers in local schools, and the children in them. Does any other hospital do this?",
    ctaPrimary: { label: "Book a consultation", href: "/e-channeling" },
    ctaSecondary: { label: "Our school programme", href: "/school-wellness" },
    photo: "/images/school-wellness/assembly.jpg",
    photoAlt: "A school assembly of students in uniform seen from behind, seated in rows.",
    positionClass: "object-[50%_40%]",
  },
  {
    id: "insurance",
    kicker: "Insurance",
    heading: { lead: "We accept", accent: "all insurance." },
    body: "Every insurer, personal or corporate, at the OPD and on the wards. Bring your policy and the billing desk does the paperwork with you.",
    ctaPrimary: { label: "Ask the billing desk", href: "/contact-us" },
    photo: "/images/doctors.jpg",
    photoAlt: "St. Joseph Hospital doctors",
    positionClass: "object-[50%_30%]",
  },
  {
    id: "cashless",
    kicker: "Cashless care",
    heading: { lead: "Does any other hospital", accent: "do this?" },
    body: "A free consultation. Cashless admission, so nobody waits on money while they are ill. Reports read twice, surfaces cleaned every two hours, and a doctor who explains before you leave. We treat the human spirit.",
    ctaPrimary: { label: "How we care for you", href: "/about-us" },
    photo: "/images/welcome.jpg",
    photoAlt: "The St. Joseph Hospital reception desk, its counter reading We treat the human spirit.",
    positionClass: "object-[50%_50%]",
  },
];
