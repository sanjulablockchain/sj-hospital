import { HOSPITAL_PHONE_LABEL, HOSPITAL_TEL } from "../../contact/data/content.ts";

/**
 * The hero is a slideshow of nine message slides, one per advantage the
 * hospital leads with, in the order the owner set on 2026-10-28 (the ninth,
 * Ratnapura, added 2026-10-29). Each slide
 * is a kicker, a two part heading (`accent` is drawn in `--home-accent`), one
 * paragraph, one or two buttons and its own photograph (`positionClass` is
 * the object-position for `object-cover`, chosen per shot for a portrait
 * crop). Every slide links to the page that backs it; `heroSlides.test.ts`
 * resolves each route and fragment. Five of the photographs are the
 * hospital's own, supplied by the owner on 2026-10-29 (see
 * docs/image-credits.md); the other three are already on the site.
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

/** Time each slide holds before the next crossfade begins (the owner asked for three seconds, 2026-11-17; five before that). */
export const HERO_SLIDE_INTERVAL_MS = 3000;

const callTheHospital = { label: `Call ${HOSPITAL_PHONE_LABEL}`, href: HOSPITAL_TEL };

/** Blue Sapphire Hospital's own site; heroSlides.test.ts pins it to the locations feature's `RATNAPURA_SITE_URL`. */
export const BLUE_SAPPHIRE_SITE_URL = "https://bluesapphirehospitals.lk";

export const heroSlides: readonly HeroSlideContent[] = [
  {
    id: "free-opd",
    kicker: "A first for Sri Lanka",
    heading: { lead: "Seeing a doctor", accent: "costs you nothing." },
    body: "Consultations at our outpatient department are free, every hour we are open. Walk in and see a doctor, and never weigh a fever or a week of pain against the money.",
    ctaPrimary: { label: "See the free OPD", href: "/services/outpatient-department" },
    ctaSecondary: callTheHospital,
    photo: "/images/home/hero-opd-family.jpg",
    photoAlt: "A St. Joseph Hospital doctor high fiving a young girl in the paediatric clinic, a boy beside him and a nurse and mother looking on.",
    positionClass: "object-[50%_45%]",
  },
  {
    id: "medicine-delivery",
    kicker: "Medicine delivery, 24/7",
    heading: { lead: "Your medicine, at your door,", accent: "any hour." },
    body: "Send a photo of your prescription. A pharmacist checks it, and it leaves our own counter for anywhere in Negombo, day or night.",
    ctaPrimary: { label: "Send a prescription", href: "/services/medicine-delivery" },
    photo: "/images/home/hero-pharmacy-counter.jpg",
    photoAlt: "The St. Joseph Hospital pharmacy counter, its wooden front reading Our Kind Of Magic Beans, with stocked shelves behind.",
    positionClass: "object-[50%_55%]",
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
    photo: "/images/home/hero-laboratory-microscope.jpg",
    photoAlt: "A St. Joseph Hospital laboratory technologist in a white coat and gloves looking into a microscope.",
    positionClass: "object-[42%_50%]",
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
    photo: "/images/home/hero-patient-room.jpg",
    photoAlt: "A St. Joseph Hospital patient room: a made bed with a monitor beside it, a table across it and a sofa by the window.",
    positionClass: "object-[50%_50%]",
  },
  {
    id: "cashless",
    kicker: "Cashless care",
    heading: { lead: "Does any other hospital", accent: "do this?" },
    body: "A free consultation. Cashless admission, so nobody waits on money while they are ill. Reports read twice, surfaces cleaned every two hours, and a doctor who explains before you leave. We treat the human spirit.",
    ctaPrimary: { label: "How we care for you", href: "/about-us" },
    photo: "/images/home/hero-ward-team.jpg",
    photoAlt: "Two nurses and a doctor smiling with a patient sitting up in a St. Joseph Hospital bed.",
    positionClass: "object-[50%_45%]",
  },
  // Blue Sapphire Hospital's card on /locations carries its address, phone
  // and hours; this slide states only what that card states. The photograph
  // is the same building front. The button goes to the hospital's own site in
  // the same tab, at the owner's request (2026-11-20).
  {
    id: "ratnapura",
    kicker: "Our sister hospital",
    heading: { lead: "The same care, now in", accent: "Ratnapura." },
    body: "Blue Sapphire Hospital on Colombo Road, Ratnapura is open every hour of every day, run to the same American protocol as St. Joseph Hospital.",
    ctaPrimary: { label: "Find Blue Sapphire", href: BLUE_SAPPHIRE_SITE_URL },
    photo: "/images/locations/ratnapura-building-front.webp",
    photoAlt: "Blue Sapphire Hospital in Ratnapura, seen from below against the sky",
    positionClass: "object-[50%_50%]",
  },
];
