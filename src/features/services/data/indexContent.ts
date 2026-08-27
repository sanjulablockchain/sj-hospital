import type { Step } from "../types";

/** One of the four "jump to a section" cards near the top of the index page. */
export type JumpCard = {
  count: string;
  label: string;
  note: string;
  /** In-page anchor on the services index. */
  href: string;
};

/** One of the nine centres of excellence. */
export type Centre = {
  no: string;
  name: string;
  desc: string;
  /** Short lead fact shown alongside the name. */
  lead: string;
};

/** One row in the surgical specialties table. */
export type SurgicalRow = { name: string; note: string };

/** One row in the diagnostics table. */
export type DiagnosticRow = { name: string; note: string; turnaround: string };

/** One health-check tier. Deliberately carries no price; see indexContent.test.ts. */
export type PackageTier = {
  tier: string;
  name: string;
  items: string[];
  ctaLabel: string;
  accent: boolean;
};

/**
 * The marquee under the hero. Every other hero on the site carries one; the
 * services index was the only page missing it.
 *
 * Each phrase is a fact the repo already states somewhere else, so the ticker
 * cannot promise something no page delivers: the nine centres are
 * `centres.length`, and the rest are the claims the home page's own service
 * tiles make (around the clock emergency and OPD, a 24 hour laboratory, X-ray
 * read within the hour, two doctors on every report, consultant led theatres,
 * home visits and delivery across Negombo).
 */
export const tickerItems: readonly string[] = [
  "Nine centres of excellence",
  "Emergency and OPD around the clock",
  "Laboratory open 24 hours",
  "Digital X-ray read within the hour",
  "Two doctors read every report",
  "Consultant led theatres",
  "Home visits across Negombo",
];

export const jumpCards: JumpCard[] = [
  {
    count: "9 units",
    label: "Centres of excellence",
    note: "Care organised around one problem, not one visit.",
    href: "#centres",
  },
  {
    // Placeholder, not the source of truth: JumpCards.tsx replaces this count
    // at render time with `groupCounts().All` from the live catalog, so it
    // can never drift from the real number of services.
    count: "36 services",
    label: "Full directory",
    note: "Hours, scope and how to start each one.",
    href: "#directory",
  },
  {
    count: "3 tiers",
    label: "Health checks",
    note: "Structured screening in a single morning.",
    href: "#packages",
  },
  {
    count: "4 steps",
    label: "Admissions",
    note: "What to bring, how billing and insurance work.",
    href: "#admissions",
  },
];

export const centres: Centre[] = [
  {
    no: "01",
    name: "Accident & Emergency",
    desc: "A resuscitation bay behind a covered ambulance entrance, run around the clock with our own ambulance fleet on call.",
    lead: "Open 24 hours",
  },
  {
    no: "02",
    name: "Surgical Care",
    desc: "Seven surgical specialties sharing consultant-led operating lists, from general surgery to neurosurgery.",
    lead: "Consultant led lists",
  },
  {
    no: "03",
    name: "Mother & Baby",
    desc: "Obstetric care through to delivery, with neonatal support in the room from the first minute.",
    lead: "Named consultant",
  },
  {
    no: "04",
    name: "Paediatric Care",
    desc: "Children and teens assessed against a dedicated protocol, kept separate from the adult wards.",
    lead: "Kids & Teens protocol",
  },
  {
    no: "05",
    name: "Laboratory",
    desc: "Haematology, biochemistry, microbiology and histopathology, with every report checked by two doctors before release.",
    lead: "Same day reports",
  },
  {
    no: "06",
    name: "Radiology",
    desc: "Digital X-ray and ultrasound, with portable imaging brought to the ward when a patient cannot travel.",
    lead: "Read in an hour",
  },
  {
    no: "07",
    name: "Endoscopy Unit",
    desc: "Gastroscopy and colonoscopy on scheduled lists, with sedation given by a consultant anaesthetist.",
    lead: "Same day reporting",
  },
  {
    no: "08",
    name: "Wellness & Health Check",
    desc: "Three structured screening tiers covering blood work, imaging review and a consultation, in a single visit.",
    lead: "Structured screening",
  },
  {
    no: "09",
    name: "Physiotherapy & Wound Care",
    desc: "A dedicated wound clinic alongside physiotherapy for post-operative and long-term recovery.",
    lead: "Rehab & dressings",
  },
];

export const surgicalRows: SurgicalRow[] = [
  { name: "General surgery", note: "Laparoscopic where suitable" },
  { name: "Orthopaedic surgery", note: "Day case & inpatient" },
  { name: "ENT surgery & audiology", note: "Weekly adult & paediatric lists" },
  { name: "Urology", note: "Same-visit ultrasound & flow studies" },
  { name: "Ophthalmology & cataract surgery", note: "Day case surgery" },
  { name: "Neurosurgery", note: "By referral, imaging led" },
  { name: "Gastrointestinal & endoscopy", note: "Same-day reporting" },
  { name: "Anaesthesia", note: "Consultant led lists" },
  { name: "Post-operative care", note: "Assigned recovery nurse" },
];

export const diagnosticRows: DiagnosticRow[] = [
  {
    name: "Haematology & biochemistry",
    note: "Full blood count, metabolic and biochemistry panels",
    turnaround: "Same day",
  },
  {
    name: "Microbiology & cultures",
    note: "Infection screening and culture testing",
    turnaround: "Reported as cultures complete",
  },
  {
    name: "Histopathology",
    note: "Tissue and biopsy analysis",
    turnaround: "Reported by our histopathology service",
  },
  {
    name: "Digital X-ray",
    note: "Read and reported by a radiologist",
    turnaround: "Within an hour",
  },
  {
    name: "Ultrasound",
    note: "Abdominal, antenatal and soft tissue scanning",
    turnaround: "At the visit",
  },
  {
    name: "ECG & echocardiography",
    note: "Resting ECG and cardiac risk assessment",
    turnaround: "Same day",
  },
  {
    name: "Endoscopy",
    note: "Gastroscopy and colonoscopy, with biopsy at the same sitting",
    turnaround: "Same day",
  },
  {
    name: "CT & MRI",
    note: "Not performed on site; sent to a partner imaging centre",
    turnaround: "Arranged by referral",
  },
];

export const packages: PackageTier[] = [
  {
    tier: "Essential",
    name: "Basic health check",
    items: [
      "Full blood count and routine biochemistry",
      "Urine routine analysis",
      "Chest X-ray",
      "Physician consultation and report review",
    ],
    ctaLabel: "Request a quote",
    accent: false,
  },
  {
    tier: "Most chosen",
    name: "Comprehensive check",
    items: [
      "Full blood count, biochemistry and lipid profile",
      "Diabetes and thyroid screening",
      "ECG and resting cardiac assessment",
      "Ultrasound abdomen scan",
      "Physician consultation with report review",
    ],
    ctaLabel: "Request a quote",
    accent: true,
  },
  {
    tier: "Executive",
    name: "Executive & cardiac",
    items: [
      "Full comprehensive panel with cardiac risk screening",
      "Echocardiography and ECG",
      "Ultrasound abdomen and chest X-ray",
      "Physician and cardiology consultation",
      "Detailed report review with follow-up planning",
    ],
    ctaLabel: "Request a quote",
    accent: false,
  },
];

export const admissionSteps: Step[] = [
  {
    no: "01",
    title: "Tell us the problem",
    desc: "Call 0117 84 84 84 or come to OPD and describe your symptoms; a coordinator matches you to the right specialty.",
  },
  {
    no: "02",
    title: "See a doctor",
    desc: "A consultation confirms what needs to happen, with any same-visit tests arranged where useful.",
  },
  {
    no: "03",
    title: "Costed plan first",
    desc: "You receive a written plan before treatment starts, so nothing is agreed to blind.",
  },
  {
    no: "04",
    title: "Treatment and follow up",
    desc: "Admission, treatment and a discharge plan with a follow-up date, whether you stay a few hours or several days.",
  },
];

export const bringWithYou: string[] = [
  "Photo ID and OPD card, if you have one",
  "A referral letter, if a doctor gave you one",
  "Current medicines, or a list of them",
  "Previous test results or imaging",
  "Insurance card or policy details",
];

export const paymentNotes: string[] = [
  "A written estimate is given before treatment starts",
  "Cash, card and bank transfer are all accepted",
  "Insurance paperwork is prepared at the desk",
  "OPD patients get a 10% discount on laboratory charges",
];

export const comforts: string[] = [
  "Free parking",
  "Free wifi",
  "Cafeteria",
  "Attendant space in rooms",
  "Meals to dietary orders",
  "Prayer room",
  "Wheelchair access",
  "Card & transfer payments",
  "Interpreters on request",
  "Quiet visiting hours",
];

export const internationalSteps: Step[] = [
  {
    no: "01",
    title: "Airport to bedside",
    desc: "Ten minutes from Bandaranaike International, with our own ambulance available for transfer.",
  },
  {
    no: "02",
    title: "Estimates in writing",
    desc: "A written estimate is provided before treatment begins, covering the likely course of care.",
  },
  {
    no: "03",
    title: "Insurance and claims",
    desc: "Our desk prepares documentation for international insurers and assists with claims.",
  },
  {
    no: "04",
    title: "Language support",
    desc: "Interpreters are available on request throughout your visit.",
  },
  {
    no: "05",
    title: "Records to take home",
    desc: "Copies of your reports, imaging referrals and discharge summary to take with you.",
  },
  {
    no: "06",
    title: "Follow up online",
    desc: "A telemedicine consultation continues your care once you are back home.",
  },
];
