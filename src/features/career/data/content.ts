/**
 * PARTLY PLACEHOLDER CONTENT, NOT YET APPROVED BY ST. JOSEPH HOSPITAL.
 * ====================================================================
 *
 * This page was built from the bundled design reference
 * (`SJ Hospital Careers.html`). The reference invented seventeen vacancies and
 * a long list of specific employment promises. A careers page is not marketing
 * copy: a candidate can hold the hospital to every sentence of it, and a
 * vacancy that does not exist wastes the time of people looking for work. So
 * the split here is deliberate.
 *
 * WHAT IS REAL, and checked against the repo:
 *
 * - All six `jobs`. Two carry the full detail the old /career page published
 *   (Pharmacist, and Business Development / Insurance Coordinator), including
 *   the real `hr@ktdoctor.com` / 074 220 8704 application route. The other four
 *   are the vacancies `features/home/data/careers.ts` already advertises on the
 *   home page; only their titles, departments and contract types come from
 *   there, so see the placeholder list below.
 * - The `0117 84 84 84` switchboard, `careers@sjhospital.lk`, the LinkedIn
 *   page, and the nine-company group, all evidenced elsewhere in this repo.
 * - The hero photograph: St. Joseph Hospital's own staff, in the hospital's own
 *   branded scrubs, from the hospital's own media library.
 *
 * WHAT IS PLACEHOLDER, to be confirmed with Human Resources before publishing:
 *
 * - The `requirements` and `detail` bullets on the four home-page vacancies.
 *   The repo evidences only their titles, so these describe the professional
 *   registration those jobs ordinarily require rather than anything this
 *   hospital has stated.
 * - Every row of `benefits`. Medical cover for spouse and children, the staff
 *   discount, the annual health check, Hepatitis B vaccination, study leave,
 *   phased return from maternity leave, funded certification and the internal
 *   transfer route are all from the reference. EPF and ETF are statutory in Sri
 *   Lanka, but the phrasing here is still the reference's.
 * - Every row of `commitments`, including the month-ahead roster, the service
 *   contracts, the named preceptor and the written answer to a safety concern.
 * - Every `process` step and, in particular, its timings: the three working day
 *   acknowledgement, the two week shortlisting decision and the one week
 *   post-interview answer are service promises the hospital has not published.
 * - Every `students` route. The reference named a specific scholarship, run by
 *   a group foundation the repo evidences nowhere; the name has been cut and
 *   the card now points people at the group rather than asserting a programme.
 * - Every `faq` answer, and the `formNotes` retention promise (six months).
 *
 * WHAT WAS CUT OUTRIGHT:
 *
 * - Eleven of the reference's seventeen vacancies. None of them exists in this
 *   repo, and inventing an open ICU or maternity post is the one error on a
 *   careers page that costs a stranger a wasted application.
 * - "Every genuine communication comes from an address ending sjhospital.lk",
 *   from the fraud checklist. The hospital's own advertised HR address is
 *   `hr@ktdoctor.com`, so the reference's rule would have told candidates that
 *   the real one was a scam. `fraudChecks` names both domains.
 *
 * `content.test.ts` pins this notice, the cut claims and the derived counts, so
 * none of it can quietly drift back.
 */
import type {
  BenefitGroup,
  FactRow,
  Job,
  JumpCard,
  ProcessStep,
  StudentRoute,
} from "../types";
import type { FaqItem } from "@/components/ui/FaqAccordion";

/** Marker the test asserts on, so the notice above cannot be dropped silently. */
export const PLACEHOLDER_NOTICE =
  "Benefits, hiring timings, student routes and FAQ answers await St. Joseph Hospital Human Resources sign-off.";

/** The hospital's switchboard, as published on /network. */
export const SWITCHBOARD = "0117 84 84 84";
export const SWITCHBOARD_TEL = "+94117848484";

/** The address the home page's careers band already sends people to. */
export const CAREERS_EMAIL = "careers@sjhospital.lk";

/** The route the two fully specified vacancies already publish. */
export const HR_EMAIL = "hr@ktdoctor.com";
export const HR_PHONE = "074 220 8704";

export const LINKEDIN_URL = "https://www.linkedin.com/company/sjhnegomb/";

/**
 * The six real vacancies.
 *
 * The first two are the roles the previous /career page carried in full, with
 * their own application instructions preserved. The last four are the openings
 * `features/home/data/careers.ts` advertises; their titles, departments and
 * contract types are real, everything below that is placeholder (see header).
 */
export const jobs: readonly Job[] = [
  {
    title: "Pharmacist",
    line: "Full time · Shift roster · Negombo",
    department: "Pharmacy",
    body: "Dispense medication, advise patients on drug use, manage inventory, and work with a multidisciplinary team to keep prescribing safe across the wards and the counter.",
    requirements: [
      "Bachelor's in Pharmacy",
      "Valid SLMC or pharmaceutical registration",
      "One to two years of hospital or retail pharmacy experience preferred",
      "Strong interpersonal skills, and a team player",
    ],
    detail: [
      `Send your CV to ${HR_EMAIL} with "Pharmacist" in the subject line`,
      `Call ${HR_PHONE} if you would rather ask about the post first`,
      "Based at St. Joseph Hospital, Negombo",
    ],
  },
  {
    title: "Business Development and Insurance Coordinator",
    line: "Full time · Day roster · Negombo",
    department: "Administration",
    body: "Develop sales strategies, build partnerships with insurance companies, engage potential clients, and coordinate cover so that more patients arrive already insured.",
    requirements: [
      "Two or more years in insurance sales, healthcare marketing or business development",
      "An understanding of health insurance, claims and the Sri Lankan healthcare landscape",
      "Self motivated, with strong record keeping habits",
      "Fluent in English and Sinhala, with Tamil an advantage",
    ],
    detail: [
      `Send your CV to ${HR_EMAIL}`,
      `Call ${HR_PHONE} for enquiries about the post`,
      "Based in Negombo",
    ],
  },
  {
    title: "Medical Officer, Emergency",
    line: "Full time · Shift roster · Negombo",
    department: "Medical",
    body: "Front line assessment and resuscitation in the emergency treatment unit, seeing everything that walks or is carried through the door from Negombo town and the airport road.",
    requirements: [
      "MBBS with full SLMC registration",
      "Completed internship",
      "Emergency or acute medicine experience an advantage",
    ],
    detail: [
      "Shift roster, covering nights and weekends",
      `Apply to ${HR_EMAIL} with the role in the subject line`,
    ],
  },
  {
    title: "Theatre Nurse",
    line: "Full time · Shift roster · Negombo",
    department: "Nursing",
    body: "Scrub and circulating duties across the surgical lists, together with post anaesthetic recovery, working alongside the consultant surgeons and anaesthetists who operate here.",
    requirements: [
      "Diploma or BSc in Nursing, with Sri Lanka Nurses Council registration",
      "Ward experience, with theatre experience an advantage",
    ],
    detail: [
      "Shift roster, with on call cover for emergency lists",
      `Apply to ${HR_EMAIL} with the role in the subject line`,
    ],
  },
  {
    title: "Medical Laboratory Technologist",
    line: "Full time · Shift roster · Negombo",
    department: "Allied health",
    body: "Haematology, biochemistry, microbiology and serology in a laboratory that runs around the clock, including the urgent panels the emergency unit waits on.",
    requirements: [
      "Diploma or BSc in Medical Laboratory Sciences",
      "Registration with the relevant council where applicable",
    ],
    detail: [
      "Shift roster, including nights",
      `Apply to ${HR_EMAIL} with the role in the subject line`,
    ],
  },
  {
    title: "Radiographer, Digital X-ray",
    line: "Full time · Shift roster · Negombo",
    department: "Allied health",
    body: "Digital radiography and mobile imaging for the wards, theatre and the emergency unit, with the radiologist reporting and performing ultrasound.",
    requirements: [
      "Diploma or degree in Radiography",
      "Radiation safety training",
    ],
    detail: [
      "Shift roster, including nights",
      `Apply to ${HR_EMAIL} with the role in the subject line`,
    ],
  },
];

/**
 * Every department the site recognises, clinical first, in the reference's own
 * order. This is the ordering only: a department appears as a filter chip when
 * a vacancy actually sits in it, never otherwise.
 */
export const DEPARTMENT_ORDER: readonly string[] = [
  "Medical",
  "Nursing",
  "Allied health",
  "Pharmacy",
  "Administration",
  "Support services",
];

/**
 * Chips for the openings filter: `All`, then the departments that actually have
 * a vacancy, in DEPARTMENT_ORDER. Derived rather than hard-coded, so the row
 * grows on its own as roles are added and can never offer a filter that returns
 * nothing. The reference hard-coded all seven against seventeen invented jobs.
 */
export const departments: readonly string[] = [
  "All",
  ...DEPARTMENT_ORDER.filter((department) => jobs.some((job) => job.department === department)),
];

/** Role names for the application form's "Applying for" select. */
export const roleOptions: readonly string[] = [
  ...jobs.map((job) => job.title),
  "General application, no specific role",
];

export const experienceOptions: readonly string[] = [
  "New graduate",
  "1 to 2 years",
  "3 to 5 years",
  "6 to 10 years",
  "More than 10 years",
];

export const sourceOptions: readonly string[] = [
  "This website",
  "Our Facebook or LinkedIn page",
  "A job board",
  "A colleague here",
  "Returning to Sri Lanka",
];

/** Derived from `jobs` so the hero can never advertise a count that is wrong. */
export const heroFacts: readonly FactRow[] = [
  { k: "Open right now", v: `${jobs.length} positions` },
  { k: "Application fee", v: "None, ever" },
  { k: "We reply", v: "To every application" },
  { k: "Part of", v: "A nine company group" },
];

/** Derived from the real vacancies, not the reference's invented seven. */
export const tickerItems: readonly string[] = [
  "Medical Officers",
  "Theatre Nurses",
  "Pharmacists",
  "Medical Laboratory Technologists",
  "Radiographers",
  "Insurance and billing",
];

export const jumpCards: readonly JumpCard[] = [
  {
    count: "Why here",
    label: "The honest case",
    note: "What we can fix, and what we cannot.",
    href: "#why",
  },
  {
    count: `${jobs.length} roles`,
    label: "Open positions",
    note: "Clinical, allied health, pharmacy, admin.",
    href: "#openings",
  },
  {
    count: "5 steps",
    label: "How hiring works",
    note: "You hear back at every stage.",
    href: "#process",
  },
  {
    count: "Important",
    label: "Job scams",
    note: "We never ask a candidate for money.",
    href: "#fraud",
  },
];

/** PLACEHOLDER. See the header. */
export const commitments: readonly string[] = [
  "Rosters published ahead of time, with swaps allowed between staff",
  "Equipment under service contract, and a real maintenance budget",
  "A named preceptor for every new graduate, for their first months",
  "Funded certification, from resuscitation courses upwards",
  "Salary discussed openly at interview, not sprung in the letter",
  "A safety concern gets a written answer, whoever raises it",
];

/** PLACEHOLDER. See the header. */
export const benefits: readonly BenefitGroup[] = [
  {
    kind: "Money",
    title: "Pay and statutory",
    items: [
      "Salary benchmarked against comparable private hospitals",
      "EPF and ETF contributions paid correctly and on time",
      "Night shift and on call allowances stated in your letter",
      "Annual increment reviewed against performance, not seniority alone",
    ],
  },
  {
    kind: "Health",
    title: "Cover for your family",
    items: [
      "Medical cover for you and your immediate family",
      "Outpatient consultations for staff at the hospital",
      "Staff rates on investigations, pharmacy and inpatient care",
      "Annual health check, and Hepatitis B vaccination for clinical staff",
    ],
  },
  {
    kind: "Time",
    title: "Leave that you can take",
    items: [
      "Annual, casual and medical leave to statutory entitlement or better",
      "Maternity leave in full, with a phased return by arrangement",
      "Study leave for examinations if you are reading for a qualification",
      "Part time and school hours arrangements in several departments",
    ],
  },
  {
    kind: "Growth",
    title: "Being trained into something",
    items: [
      "Funded resuscitation and specialty certification for clinical staff",
      "Sponsored diploma and short course study for long serving staff",
      "Clinical teaching alongside the visiting consultants",
      "An internal route into theatre, laboratory or imaging as posts open",
    ],
  },
];

/** PLACEHOLDER, timings especially. See the header. */
export const process: readonly ProcessStep[] = [
  {
    n: "01",
    title: "You apply",
    when: "Day one",
    body: "Use the form on this page, or email your CV with the role in the subject line. You get an acknowledgement from a person, not an automated reply.",
  },
  {
    n: "02",
    title: "Shortlisting",
    when: "Two weeks",
    body: "The head of department reads the applications, not only human resources. If you are not shortlisted you are told so, by email, rather than left waiting.",
  },
  {
    n: "03",
    title: "Interview",
    when: "By arrangement",
    body: "A panel with the department head and a senior clinician, held at a time that does not force you to take leave from your current post. Salary is discussed at this stage, openly.",
  },
  {
    n: "04",
    title: "Practical assessment",
    when: "Same visit",
    body: "For clinical and technical posts, a short practical or scenario relevant to the actual job. You are shown the unit you would work in and can talk to the staff there.",
  },
  {
    n: "05",
    title: "Offer and references",
    when: "One week",
    body: "A written offer stating salary, allowances, roster pattern and probation terms. References are taken only after you accept in principle, and only from the referees you nominated.",
  },
];

/** PLACEHOLDER. The reference's named scholarship has been cut; see the header. */
export const students: readonly StudentRoute[] = [
  {
    kind: "Scholarship",
    title: "Support for medical students",
    body: "The group supports students pursuing careers in medicine. Applications are handled by the group rather than by the hospital, and we will point you to the right contact if you write to us.",
    who: "Medical students",
  },
  {
    kind: "Clinical placements",
    title: "Nursing and allied health training",
    body: "We take students from nursing schools and allied health programmes for supervised clinical placements, with a named supervisor rather than being left to shadow whoever is free.",
    who: "Institutions and students",
  },
  {
    kind: "Entry level",
    title: "Start without experience",
    body: "Front office, pharmacy assistant and support roles are genuinely open to school leavers, with full training given. Several coordinators here started at the front desk.",
    who: "School leavers",
  },
];

/**
 * The one section of the reference that needed almost no cutting, because it
 * makes promises about what the hospital will NOT do. The exception is the
 * domain rule: the reference said every genuine message ends `sjhospital.lk`,
 * which would have branded the hospital's own advertised `hr@ktdoctor.com` a
 * scam. Both domains are named instead.
 */
export const fraudChecks: readonly string[] = [
  "We advertise only on this website, our own social media pages, and recognised job boards",
  "Genuine messages come from an address ending sjhospital.lk or ktdoctor.com",
  "We never ask for an application fee, training deposit or agent commission",
  "We never ask for a payment to process a visa or an overseas placement",
  "We never ask for your bank details or your original certificates before an offer",
  `If in any doubt, telephone the hospital on ${SWITCHBOARD} and ask`,
];

/** PLACEHOLDER. See the header. */
export const faq: readonly FaqItem[] = [
  {
    q: "Do you take newly qualified nurses?",
    a: "Yes. We would rather take a careful new graduate than an experienced nurse who has stopped caring. New graduates work with a named preceptor at the start and are not counted as a full staff member on the roster during that period. The specialist areas ask for ward experience first, and we will tell you honestly when you are ready to move.",
  },
  {
    q: "How are the rosters handled?",
    a: "Published in advance, with shift swaps allowed directly between staff as long as the skill mix holds. Chronic short staffing is what breaks people, so we run to a documented establishment and use relief staff rather than asking the person on duty to absorb it. If a colleague calls in sick, that is a management problem to solve, not yours.",
  },
  {
    q: "Is there a bond or a training agreement?",
    a: "For funded external courses beyond a certain value the terms are written into a separate agreement you read before you commit, not buried in your letter of appointment. For ordinary in house induction and mandatory training there is no bond. We will never hold your original certificates.",
  },
  {
    q: "What about working while studying?",
    a: "Common here and openly supported. Staff reading for a nursing degree, a pharmacy qualification or accountancy examinations get roster consideration around examination dates, and study leave for the examinations themselves. Tell us at interview rather than after you join, so the roster can be built around it from the start.",
  },
  {
    q: "Do you accept applications from Sri Lankans returning from abroad?",
    a: "Very much so, and it is a group we actively want. Experience in the Gulf, the United Kingdom or Australia usually means exposure to protocols and equipment that make you immediately useful, and we will help you navigate the re registration requirements with the relevant council. Tell us your notice period and we will work with it.",
  },
  {
    q: "What happens if I raise a safety concern?",
    a: "It goes through the clinical governance process and you get a written answer. This matters more than any benefit on this page: a hospital where a junior nurse cannot say that a piece of equipment is unsafe, or that a doctor made an error, is a dangerous hospital. Reports about systems are treated as improvement, not blame.",
  },
  {
    q: "Will you contact my current employer?",
    a: "Not without your written permission, and never before an offer is made. References can be delicate when you have not told your present employer you are looking. Give us two referees who know your clinical work, and tell us plainly if one of them should not be approached yet.",
  },
  {
    q: "What if nothing here fits me?",
    a: "Send your CV anyway, as a general application. We keep applications on file and a good nursing officer or technologist rarely waits long for a vacancy. Say which department you are aiming for so it reaches the right head of department when something opens.",
  },
];

/** PLACEHOLDER retention period. See the header. */
export const formNotes: readonly string[] = [
  "It goes to human resources and to the head of the department you applied to, nobody else",
  "You get an acknowledgement from a person, not an automated reply",
  "We keep it on file for six months, then delete it",
  "Your current employer is never contacted without your written permission",
  "There is no fee at any stage. Anyone asking you for money is not us",
];

/** The four things to have ready, shown as chips in the closing call to action. */
export const applyChecklist: readonly string[] = [
  "CV as PDF",
  "Registration number",
  "Two referees",
  "Earliest start date",
];

/** The four rows beside the closing call to action, each inverting on hover. */
export const applyRows: readonly { label: string; href: string; glyph: "phone" | "arrow" }[] = [
  { label: "Email your CV", href: `mailto:${CAREERS_EMAIL}`, glyph: "arrow" },
  { label: SWITCHBOARD, href: `tel:${SWITCHBOARD_TEL}`, glyph: "phone" },
  { label: "Follow us on LinkedIn", href: LINKEDIN_URL, glyph: "arrow" },
  { label: "Roles elsewhere in the group", href: "/network#family", glyph: "arrow" },
];

/**
 * The reference's closing notice, kept almost verbatim: it is the one piece of
 * copy on the page that constrains the hospital rather than promising anything,
 * and the request not to send an NIC copy or photograph protects the applicant.
 */
export const equalOpportunity =
  "St. Joseph Hospital is an equal opportunity employer. We select on merit and do not discriminate by ethnicity, religion, gender, marital status, age or disability, and we will make reasonable adjustments to the recruitment process on request. Please do not include your NIC copy, photograph or health information in a first application; we ask for those only at offer stage.";
