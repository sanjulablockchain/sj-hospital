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
 *   (Pharmacist, and Business Development / Insurance Coordinator). Their
 *   074 220 8704 application line is real; the `hr@ktdoctor.com` address they
 *   published is not one of the site's two allowed mailboxes, so the
 *   applications route is `info@sjhospital.lk`. The other four
 *   are the vacancies `features/home/data/careers.ts` already advertises on the
 *   home page; only their titles, departments and contract types come from
 *   there, so see the placeholder list below.
 * - The `0117 84 84 84` switchboard, the LinkedIn
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
 * - Nothing from the fraud checklist any more. Its "every genuine
 *   communication comes from an address ending sjhospital.lk" rule was once
 *   cut, because the hospital advertised an `hr@ktdoctor.com` route and the
 *   rule would have branded that address a scam. The route is retired, so the
 *   rule now stands as the reference wrote it.
 *
 * `content.test.ts` pins this notice, the cut claims and the derived counts, so
 * none of it can quietly drift back.
 *
 * ---------------------------------------------------------------------------
 * i18n note (Task 13): every reader-visible sentence on this page now lives
 * here, including copy that used to sit directly inside `CareersHero.tsx`,
 * `CareersPage.tsx`, `BenefitsSection.tsx`, `ProcessSection.tsx`,
 * `StudentsSection.tsx`, `OpeningsSection.tsx`, `ApplicationSection.tsx`,
 * `ApplySection.tsx` and `ApplicationForm.tsx`. See
 * `docs/superpowers/i18n-feature-recipe.md` for why, and `getContent.ts` for
 * how a locale is applied on top of it.
 *
 * Two structural traps this file works around, both flagged by the recipe's
 * "never key JSX off translatable copy" pattern:
 *
 * - `jobs[*].department` is compared against `departments` to drive the
 *   openings filter (`job.department === department`). If that string
 *   translated, the filter would silently return nothing the moment a reader
 *   switched language. It stays English and structural, the same role
 *   `.icon`/`.glyph` play elsewhere; `departmentLabels` carries the words a
 *   reader actually sees for the same department names.
 * - `jobs[*].id`, `roleIds` and each option list's `.id` are the values that
 *   travel through the "Applying for", "Years of experience" and "Where you
 *   saw this" selects and the Zod schema that validates them. A translated
 *   option's `value` attribute has to stay something the server can recognise
 *   in every locale, so the value is this fixed English id and the option's
 *   visible text is the translatable `.title` / `.label` beside it.
 */
import type {
  BenefitGroup,
  FactRow,
  Job,
  JumpCard,
  ProcessStep,
  SelectOption,
  StudentRoute,
} from "../types";
import type { FaqItem } from "@/components/ui/FaqAccordion";

/** Marker the test asserts on, so the notice above cannot be dropped silently. */
export const PLACEHOLDER_NOTICE =
  "Benefits, hiring timings, student routes and FAQ answers await St. Joseph Hospital Human Resources sign-off.";

/** The hospital's switchboard, as published on /network. */
export const SWITCHBOARD = "0117 84 84 84";
export const SWITCHBOARD_TEL = "+94117848484";

/**
 * The one address this page publishes. It was `careers@sjhospital.lk`, and the
 * two fully specified vacancies carried a second route on a second domain,
 * `hr@ktdoctor.com`, inherited from the old /career page. The site now
 * publishes only the two mailboxes `@/config/contactEmails` allows, and a job
 * application is general correspondence rather than a booking, so both routes
 * collapse onto the general one.
 */
export const CAREERS_EMAIL = "info@sjhospital.lk";
export const HR_PHONE = "074 220 8704";

export const LINKEDIN_URL = "https://www.linkedin.com/company/sjhnegomb/";

/**
 * The six real vacancies.
 *
 * The first two are the roles the previous /career page carried in full, with
 * their own application instructions preserved. The last four are the openings
 * `features/home/data/careers.ts` advertises; their titles, departments and
 * contract types are real, everything below that is placeholder (see header).
 *
 * `id` is new for Task 13: a fixed, never-translated slug that the "Applying
 * for" select and `jobApplicationSchema` use as the option's `value` and the
 * row's React key, so a translated `title` never has to double as a value the
 * server matches against. `title`, `line`, `body`, `requirements` and `detail`
 * are all translatable; `department` is not (see the header note).
 *
 * `detail[0][0]` for the Pharmacist post quotes the exact word ("Pharmacist")
 * the candidate is asked to type into an email subject line, the same
 * register the recipe uses for quoted material: the sentence around the quote
 * translates, the quoted word itself does not, because Human Resources reads
 * that subject line in English regardless of which language the applicant
 * read the page in.
 */
export const jobs: readonly Job[] = [
  {
    id: "pharmacist",
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
      `Send your CV to ${CAREERS_EMAIL} with "Pharmacist" in the subject line`,
      `Call ${HR_PHONE} if you would rather ask about the post first`,
      "Based at St. Joseph Hospital, Negombo",
    ],
  },
  {
    id: "business-development-insurance-coordinator",
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
      `Send your CV to ${CAREERS_EMAIL}`,
      `Call ${HR_PHONE} for enquiries about the post`,
      "Based in Negombo",
    ],
  },
  {
    id: "medical-officer-emergency",
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
      `Apply to ${CAREERS_EMAIL} with the role in the subject line`,
    ],
  },
  {
    id: "theatre-nurse",
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
      `Apply to ${CAREERS_EMAIL} with the role in the subject line`,
    ],
  },
  {
    id: "medical-laboratory-technologist",
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
      `Apply to ${CAREERS_EMAIL} with the role in the subject line`,
    ],
  },
  {
    id: "radiographer-digital-xray",
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
      `Apply to ${CAREERS_EMAIL} with the role in the subject line`,
    ],
  },
];

/**
 * The English title for the four vacancies here that
 * `features/home/data/careers.ts` also advertises on the home page's own
 * teaser (see that file's own header comment). Derived from `jobs` rather
 * than a second literal, so the fact has exactly one home in this file;
 * exported through this feature's `index.ts` so the teaser imports the
 * string instead of carrying its own copy of it (Pattern 4 in the i18n
 * recipe: a string used twice has one home). Task 14 copied these four
 * titles' reviewed translations byte-for-byte instead of importing across
 * the boundary; this is the fix.
 */
export const sharedJobTitles = {
  medicalOfficerEmergency: jobs[2].title,
  theatreNurse: jobs[3].title,
  medicalLaboratoryTechnologist: jobs[4].title,
  radiographerDigitalXray: jobs[5].title,
} as const;

/**
 * Every department the site recognises, clinical first, in the reference's own
 * order. This is the ordering only: a department appears as a filter chip when
 * a vacancy actually sits in it, never otherwise.
 *
 * Structural and never translated, because `jobs[*].department` is compared
 * against these exact strings to build the openings filter. `departmentLabels`
 * below carries the translated word a reader actually sees for each one.
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
 *
 * Structural and never translated; see the note above `DEPARTMENT_ORDER`.
 */
export const departments: readonly string[] = [
  "All",
  ...DEPARTMENT_ORDER.filter((department) => jobs.some((job) => job.department === department)),
];

/**
 * The translated word for each entry in `departments`, keyed by the same
 * structural English string. English is the identity mapping here (the key
 * and the value are the same word) so a reader on the English site sees no
 * change; `content.si.ts` and `content.ta.ts` replace the values, never the
 * keys, which is what keeps the filter's own comparisons working in every
 * locale.
 */
export const departmentLabels: Record<string, string> = {
  All: "All",
  Medical: "Medical",
  Nursing: "Nursing",
  "Allied health": "Allied health",
  Pharmacy: "Pharmacy",
  Administration: "Administration",
  "Support services": "Support services",
};

/**
 * The id of the "general application" option in the "Applying for" select,
 * i.e. the one option that has no vacancy behind it. Fixed and never
 * translated, the same role every `jobs[*].id` plays.
 */
export const GENERAL_APPLICATION_ROLE_ID = "general";

/** The translatable label shown for `GENERAL_APPLICATION_ROLE_ID`. */
export const generalApplicationLabel = "General application, no specific role";

/**
 * Every id the "Applying for" select and `jobApplicationSchema` accept.
 * Structural: this is what actually travels in `FormData` and gets checked
 * against, never displayed to a reader directly.
 */
export const roleIds: readonly string[] = [...jobs.map((job) => job.id), GENERAL_APPLICATION_ROLE_ID];

/**
 * The "Years of experience" select. `id` is the value the form submits and the
 * schema validates, fixed in English forever; `label` is what a reader sees
 * and is fully translatable.
 */
export const experienceOptions: readonly SelectOption[] = [
  { id: "new-graduate", label: "New graduate" },
  { id: "1-2-years", label: "1 to 2 years" },
  { id: "3-5-years", label: "3 to 5 years" },
  { id: "6-10-years", label: "6 to 10 years" },
  { id: "10-plus-years", label: "More than 10 years" },
];

/** The "Where you saw this" select. Same id/label split as `experienceOptions`. */
export const sourceOptions: readonly SelectOption[] = [
  { id: "website", label: "This website" },
  { id: "social", label: "Our Facebook or LinkedIn page" },
  { id: "job-board", label: "A job board" },
  { id: "colleague", label: "A colleague here" },
  { id: "returning", label: "Returning to Sri Lanka" },
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
 * The one section of the reference that needed no cutting, because it makes
 * promises about what the hospital will NOT do. Its domain rule was once the
 * exception: the reference said every genuine message ends `sjhospital.lk`,
 * which would have branded the hospital's then advertised `hr@ktdoctor.com`
 * route a scam. That route is retired and the site publishes from one domain
 * now, so the rule is stated as the reference wrote it.
 */
export const fraudChecks: readonly string[] = [
  "We advertise only on this website, our own social media pages, and recognised job boards",
  "Genuine messages come from an address ending sjhospital.lk",
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

/**
 * The four rows beside the closing call to action, each inverting on hover.
 *
 * The phone row used to carry the hospital's own number as its whole `label`,
 * with no separate action phrase, so it rendered as bare digits with no
 * translatable text at all, in every language including English; `label` is
 * now the action phrase and `value` carries the number, the same fix
 * `network`'s own `contactRows` needed. `internal` marks the one row that is
 * a route on this site rather than `mailto:`, `tel:` or an external page, so
 * `ApplySection` can send it through `LocaleLink`.
 */
export const applyRows: readonly {
  label: string;
  value?: string;
  href: string;
  glyph: "phone" | "arrow";
  internal?: boolean;
}[] = [
  { label: "Email your CV", href: `mailto:${CAREERS_EMAIL}`, glyph: "arrow" },
  { label: "Call us", value: SWITCHBOARD, href: `tel:${SWITCHBOARD_TEL}`, glyph: "phone" },
  { label: "Follow us on LinkedIn", href: LINKEDIN_URL, glyph: "arrow" },
  {
    label: "Roles elsewhere in the group",
    href: "/network#family",
    glyph: "arrow",
    internal: true,
  },
];

/**
 * The reference's closing notice, kept almost verbatim: it is the one piece of
 * copy on the page that constrains the hospital rather than promising anything,
 * and the request not to send an NIC copy or photograph protects the applicant.
 */
export const equalOpportunity =
  "St. Joseph Hospital is an equal opportunity employer. We select on merit and do not discriminate by ethnicity, religion, gender, marital status, age or disability, and we will make reasonable adjustments to the recruitment process on request. Please do not include your NIC copy, photograph or health information in a first application; we ask for those only at offer stage.";

/* ------------------------------------------------------------------------ */
/* Copy that used to live directly inside a component, moved here for Task 13 */
/* ------------------------------------------------------------------------ */

/** `CareersHero`'s own strings. */
export const hero = {
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Careers",
  strapline: "We never charge candidates",
  headingLine1: "Stay in",
  headingOutline: "Sri Lanka.",
  headingAccent: "Practise properly.",
  standfirst:
    "Too many good clinicians leave because the equipment is old, the rosters are punishing and nobody invests in them. We are trying to be the hospital that gives you a reason to stay.",
  ctaPrimary: "See open roles",
  ctaSecondary: "Beware of job scams",
};

/** The numbered kicker above every section heading, in page order. */
export const sectionEyebrows = {
  why: "01 / Why here",
  benefits: "02 / What you get",
  openings: "03 / Open positions",
  process: "04 / How hiring works",
  students: "05 / Starting out",
  fraud: "06 / Recruitment fraud",
  faq: "07 / Candidate questions",
  form: "08 / Submit your CV",
  apply: "09 / Apply",
};

/** `#why`, the first `FeatureSplit`. `items` is `commitments`, above. */
export const whySection = {
  heading: "The reasons people actually give for leaving",
  body: "When a nurse or a technologist leaves for the Gulf, it is rarely only about money. It is the twelve hour shift with no relief, the equipment that has been broken for a year, and the sense that nobody is going to train you into anything better. We cannot fix a national salary market. We can fix those three things, and we have set the hospital up to try.",
  listHeading: "What we commit to",
};

/** `#fraud`, the second `FeatureSplit`. `items` is `fraudChecks`, above. */
export const fraudSection = {
  heading: "Nobody here will ever ask you for money",
  body: "There is a real trade in fake hospital and overseas nursing jobs in Sri Lanka, and it targets exactly the people who can least afford it. We do not charge application fees, registration fees, training deposits, agent commissions or visa processing money at any stage. If someone claiming to be from this hospital asks you for a payment, it is a fraud. Call us on the number below and tell us.",
  listHeading: "How to check a posting is ours",
};

/** `#benefits`. */
export const benefitsHeading = { line1: "Benefits, stated", line2: "plainly" };
export const benefitsAside =
  "No vague talk of a rewarding environment. These are the specific things in the letter of appointment.";

/** `#openings`, the one section besides the form with its own interactive state. */
export const openings = {
  headingAllRoles: "Every open role",
  /** `{shown}` and `{total}` are replaced with numbers, never split on. */
  positionsCountTemplate: "{shown} of {total} positions",
  filterAriaLabel: "Filter positions by department",
  requirementsHeading: "You will need",
  detailHeading: "The detail",
  applyForRoleCta: "Apply for this role",
  emptyNote:
    "Nothing here that fits? Send your CV anyway. We keep applications on file and a good nursing officer or technologist rarely waits long for a vacancy.",
};

/** `#process`. */
export const processHeading = {
  line1: "Five steps,",
  line2: "and you hear",
  line3: "back at",
  line4: "each one",
};
export const processIntro =
  "Being left in silence after an interview is the commonest complaint about hospital recruitment in this country. We answer everybody, including the people we do not take.";

/** `#students`. */
export const studentsHeading = { line1: "Students and", line2: "new graduates" };
export const studentsAside =
  "The group supports students entering medicine, and we take trainees directly at the hospital.";

/** `#faq`'s own heading, hard-broken to the reference's two lines. */
export const faqHeading = { line1: "Before you", line2: "apply" };

/** `#form`. */
export const applicationHeading = { line1: "Fill this in", line2: "once" };
export const applicationAside =
  "Nine fields, none of them decorative. We ask for a registration number because it is the first thing a department head looks for.";
export const applicationSidebarHeading = "What happens to this";
export const applicationEmailPrompt = "Rather email it?";
export const applicationEmailNote =
  "Put the role in the subject line. An email carries exactly the same weight as this form.";

/** `#apply`. */
export const applyHeading = { line1: "Send it in.", line2: "You will hear", line3: "from us." };
export const applyBody =
  "Use the form above, or email your CV with the role in the subject line. Put your registration number and available start date at the top: it saves a round of emails.";

/**
 * `ApplicationForm`'s own copy: field labels, placeholders, the consent
 * sentence and the four status strings a submission can show. Moved here so
 * the client component never imports content directly (see the header note
 * above `jobs`); `ApplicationSection` reads this and passes it down as a prop.
 */
export const form = {
  fullNameLabel: "Full name",
  fullNamePlaceholder: "As it appears on your certificates",
  roleLabel: "Applying for",
  rolePlaceholder: "Choose a role",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",
  phoneLabel: "Mobile",
  phonePlaceholder: "07X XXX XXXX",
  registrationLabel: "Registration number",
  registrationPlaceholder: "SLMC, Nurses Council, or not applicable",
  experienceLabel: "Years of experience",
  experiencePlaceholder: "Choose one",
  startDateLabel: "Earliest start date",
  startDatePlaceholder: "Immediately, or after one month's notice",
  sourceLabel: "Where you saw this",
  sourcePlaceholder: "Choose one",
  noteLabel: "Anything we should know",
  notePlaceholder:
    "Study commitments, a shift pattern you need, or the unit you particularly want to work in. Optional.",
  cvHeading: "Attach your CV as a PDF",
  cvHintDefault: "PDF preferred, under 5 MB. Do not send your NIC copy or a photograph at this stage.",
  cvHintReattach: "Please attach your CV again. A browser will not let us keep the file across a failed submission.",
  cvChooseFile: "Choose file",
  cvChangeFile: "Change file",
  consentLabel:
    "I agree that St. Joseph Hospital may hold my application for six months and contact me about this and comparable vacancies. My current employer will not be approached without my written permission.",
  submitIdle: "Submit application",
  submitPending: "Sending",
  submitSuccess: "Application received",
  defaultStatus: "We reply to every application, including the ones we do not take forward.",
};
