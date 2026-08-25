/**
 * PLACEHOLDER CONTENT, NOT YET APPROVED BY ST. JOSEPH HOSPITAL.
 * =============================================================
 *
 * Every string in this file came from the bundled design reference
 * (`SJ Hospital Media.html`) and none of it has been verified against the
 * hospital. Unlike the other pages built from these references, almost nothing
 * here could be checked against the repo, because the repo holds no media
 * content beyond the four teaser rows in `features/home/data/media.ts`, whose
 * titles and dates match none of the items below.
 *
 * Specifically unverified, and to be confirmed with Corporate Communications
 * before this page is published:
 *
 * - Every one of the `news` items, including its date, and every figure inside
 *   it (the thousandth cholecystectomy, the fortieth school, the nine hundred
 *   people screened, the forty nursing officers).
 * - `featured`, which is the August 2026 endoscopy suite release.
 * - The `media@sjhospital.lk` address. The repo only evidences
 *   `careers@sjhospital.lk` and `appointments-sjhospital`, so this follows the
 *   pattern but is an assumption.
 * - The Communications hours (weekdays 8am to 5pm), the duty phone outside
 *   them, and the same working day reply promise in `heroFacts` and `desk`.
 * - Every row of `kit`. None of these files exists in the repo, which is why
 *   `KitAsset` carries no `href` and the section asks people to request them.
 * - Every role in `topics`. The repo names no post holders at all.
 * - The `rules` answers, which describe a consent and filming policy the
 *   hospital has not published.
 *
 * The one thing here that is the hospital's own is the three `gallery` images:
 * all three already ship in `public/images` and are used elsewhere on the site.
 *
 * `content.test.ts` pins this notice and asserts the section stays
 * download-free, so this cannot quietly ship as fact.
 */
import type {
  DeskCard,
  FactRow,
  FeaturedRelease,
  GalleryShot,
  GroundRule,
  JumpCard,
  KitAsset,
  NewsCategory,
  NewsItem,
} from "../types";

/** Marker the test asserts on, so the notice above cannot be dropped silently. */
export const PLACEHOLDER_NOTICE =
  "Placeholder content awaiting St. Joseph Hospital Corporate Communications sign-off.";

/** Press desk address. Assumed from the `careers@` pattern, not confirmed. */
export const MEDIA_EMAIL = "media@sjhospital.lk";

/** The hospital's real switchboard, the one number the repo does evidence. */
export const SWITCHBOARD = "0117 84 84 84";
export const SWITCHBOARD_TEL = "+94117848484";

export const tickerItems: readonly string[] = [
  "Press releases",
  "Consultant interviews",
  "Logo and brand files",
  "Filming on the premises",
  "Community and CSR programmes",
  "Awards and accreditation",
];

export const heroFacts: FactRow[] = [
  { k: "Press desk replies", v: "Same working day" },
  { k: "Interviews", v: "Named consultants" },
  { k: "Patient details", v: "Never, without consent" },
  { k: "Assets", v: "Print resolution, free" },
];

export const newsCategories: readonly NewsCategory[] = [
  "Press releases",
  "Clinical",
  "Community",
  "Awards",
  "Events",
  "In the news",
];

export const featured: FeaturedRelease = {
  kicker: "August 2026 · Press release",
  title: "New endoscopy suite opens on the second floor",
  lede: "Two dedicated procedure rooms and a separate recovery bay bring diagnostic gastroscopy and colonoscopy waiting times under a week. The suite runs six days, with sedation managed by the anaesthetic team and same day reporting for biopsies taken during the procedure.",
  date: "14 August 2026",
  type: "Press release",
  points: [
    "Full release, photographs and floor plan available on request",
    "Consultant gastroenterologist available for interview",
    "Filming in the suite permitted outside procedure hours",
    "No patient images will be released, at any resolution",
  ],
};

export const news: NewsItem[] = [
  {
    tag: "Press releases",
    date: "August 2026",
    title: "New endoscopy suite opens on the second floor",
    lede: "Two dedicated procedure rooms with a separate recovery bay, cutting the wait for diagnostic gastroscopy and colonoscopy to under a week.",
  },
  {
    tag: "Press releases",
    date: "July 2026",
    title: "24 hour pharmacy service extended to the outpatient wing",
    lede: "The dispensary counter beside the OPD entrance now stays open overnight, so discharge prescriptions no longer wait for morning.",
  },
  {
    tag: "Clinical",
    date: "July 2026",
    title: "One thousandth laparoscopic gallbladder removal",
    lede: "The general surgical unit completed its thousandth keyhole cholecystectomy, with an average post operative stay of two nights.",
  },
  {
    tag: "Clinical",
    date: "June 2026",
    title: "Diabetic foot clinic reports fewer amputations",
    lede: "A weekly combined clinic with vascular and podiatry input has changed the referral pattern for patients with non healing ulcers.",
  },
  {
    tag: "Clinical",
    date: "May 2026",
    title: "Round the clock echocardiography for chest pain",
    lede: "Cardiology imaging is now available overnight in the emergency unit rather than waiting for the next working morning.",
  },
  {
    tag: "Community",
    date: "August 2026",
    title: "School wellness programme reaches its fortieth school",
    lede: "Vision, hearing, dental and growth screening for schoolchildren across the Negombo and Katana education zones, free to the school.",
  },
  {
    tag: "Community",
    date: "July 2026",
    title: "Dengue prevention drive with the Municipal Council",
    lede: "Household inspection teams and a container clearing campaign across six wards ahead of the monsoon peak.",
  },
  {
    tag: "Community",
    date: "June 2026",
    title: "Free blood pressure and sugar camp at the fish market",
    lede: "Nine hundred people screened over two weekends, with a fifth referred for a first proper consultation about their readings.",
  },
  {
    tag: "Community",
    date: "April 2026",
    title: "Blood donation drive with the parish",
    lede: "A joint campaign with St. Mary's collected units for the hospital and the National Blood Transfusion Service.",
  },
  {
    tag: "Awards",
    date: "June 2026",
    title: "Recognition for infection prevention practice",
    lede: "The infection control team was recognised for hand hygiene compliance and surgical site infection surveillance.",
  },
  {
    tag: "Awards",
    date: "March 2026",
    title: "Nursing excellence award for the critical care unit",
    lede: "The intensive care nursing team received a national award for patient safety practice and family communication.",
  },
  {
    tag: "Events",
    date: "September 2026",
    title: "World Heart Day open clinic",
    lede: "Free risk assessment, blood pressure and lipid checks in the main lobby, with cardiology consultants on hand all day.",
  },
  {
    tag: "Events",
    date: "August 2026",
    title: "Antenatal education series begins",
    lede: "A six week course for expectant parents covering labour, feeding, newborn care and the first six weeks at home.",
  },
  {
    tag: "Events",
    date: "May 2026",
    title: "Nurses Day and long service recognition",
    lede: "Forty nursing officers recognised for service, including three with more than twenty years at the hospital.",
  },
  {
    tag: "In the news",
    date: "July 2026",
    title: "Consultant physician on the monsoon dengue rise",
    lede: "Our physicians discussed early warning signs and the day four platelet fall with national television and print media.",
  },
  {
    tag: "In the news",
    date: "June 2026",
    title: "Comment on kidney disease in outdoor workers",
    lede: "A nephrology perspective on repeated dehydration and chronic kidney disease among field and construction workers.",
  },
  {
    tag: "In the news",
    date: "February 2026",
    title: "Interview: what an accredited hospital actually means",
    lede: "Our medical director on quality standards, audit and why accreditation changes day to day clinical practice.",
  },
];

export const desk: DeskCard[] = [
  {
    kind: "First contact",
    title: "Corporate Communications",
    body: "Every media request starts here, including interview requests, filming, statements and fact checks. We route it and stay on the thread until you have filed.",
  },
  {
    kind: "Hours",
    title: "Weekdays 8am to 5pm",
    body: "Staffed through the working day, with a duty phone reachable through the main hospital number for breaking stories overnight and at weekends.",
  },
  {
    kind: "Response",
    title: "Same working day",
    body: "Put your deadline in the subject line and we reply within the working day, even if the reply is that we need until tomorrow to get the right clinician.",
  },
  {
    kind: "Interviews",
    title: "The clinician, not a script",
    body: "We put you with the consultant who actually does the work. Give us the topic and deadline and we will tell you honestly who is available.",
  },
  {
    kind: "Statements",
    title: "Attributable and dated",
    body: "Statements are issued in writing, attributed to a named person with their title, and dated. We do not brief on background and then deny it.",
  },
  {
    kind: "Fact checking",
    title: "Send us the passage",
    body: "We will check a quotation, a clinical claim, a name or a title before you publish. Faster for you than a correction, and better for us.",
  },
  {
    kind: "Incidents",
    title: "Holding statement first",
    body: "In a public incident we issue factual numbers and broad condition without identifying detail, updated as the picture clarifies. Clinicians stay with patients.",
  },
  {
    kind: "Not this desk",
    title: "Commercial approaches",
    body: "Advertising, sponsorship and supplier proposals go to marketing. Sending them here slows down journalists working to a deadline.",
  },
];

export const kit: KitAsset[] = [
  {
    name: "Primary logo",
    note: "Full colour, on light and on dark backgrounds, with clear space guidance",
    format: "SVG, PNG, EPS",
  },
  {
    name: "Logo mark only",
    note: "The mark without the wordmark, for square and profile use",
    format: "SVG, PNG",
  },
  {
    name: "Monochrome logo",
    note: "Single colour for newsprint and one colour printing",
    format: "SVG, EPS",
  },
  {
    name: "Brand sheet",
    note: "Colours, typefaces, minimum sizes and the things not to do",
    format: "PDF",
  },
  {
    name: "Building photographs",
    note: "Exterior by day and night, main entrance, lobby, all print resolution",
    format: "JPEG, 300dpi",
  },
  {
    name: "Facility photographs",
    note: "Theatres, intensive care, laboratory, imaging, pharmacy, no patients present",
    format: "JPEG, 300dpi",
  },
  {
    name: "Consultant portraits",
    note: "Headshots of spokespeople, released with their consent on file",
    format: "JPEG, 300dpi",
  },
  {
    name: "Fact sheet",
    note: "Beds, units, services, founding year, key numbers, updated quarterly",
    format: "PDF, DOCX",
  },
  {
    name: "Boilerplate paragraph",
    note: "The approved short description for the end of your piece",
    format: "TXT, DOCX",
  },
];

// The only content on this page that is genuinely the hospital's own: all three
// files already ship in `public/images` and carry other pages on the site.
export const gallery: GalleryShot[] = [
  {
    src: "/images/hero-exterior.png",
    tag: "Exterior",
    title: "Main building after dark",
    alt: "The St. Joseph Hospital Negombo building lit at dusk, with an ambulance at the covered bay",
    credit: "Credit: St. Joseph Hospital, Negombo",
    fit: "cover",
  },
  // Not the reference's `doctors.jpg`: that photograph shows an identifiable
  // patient in a bed, which is precisely what the caption above this grid says
  // is never released. See the note on `MediaHero`.
  {
    src: "/images/career-staff.jpg",
    tag: "Clinical team",
    title: "Consultants and nursing staff",
    alt: "Three St. Joseph Hospital clinicians in branded scrubs standing together",
    credit: "Credit: St. Joseph Hospital, Negombo",
    fit: "cover",
  },
  {
    src: "/images/logo-mark.png",
    tag: "Brand",
    title: "The hospital mark",
    alt: "The St. Joseph Hospital leaf mark",
    credit: "Reproduce unmodified, full mark only",
    fit: "contain",
  },
];

export const topics: FactRow[] = [
  { k: "Hospital strategy and investment", v: "Chief Executive Officer, through Communications" },
  { k: "Clinical standards and accreditation", v: "Medical Director" },
  { k: "Emergency and trauma care", v: "Head of Emergency Medicine" },
  { k: "Surgery and day case procedures", v: "Consultant surgeon in the relevant subspecialty" },
  { k: "Dengue, diabetes and general medicine", v: "Consultant physician" },
  { k: "Children's health and vaccination", v: "Consultant paediatrician" },
  { k: "Maternity and women's health", v: "Consultant obstetrician and gynaecologist" },
  { k: "Nursing, infection control, patient safety", v: "Director of Nursing" },
  { k: "Medicines, shortages, prescribing", v: "Chief Pharmacist" },
  { k: "Community and school programmes", v: "Community Health Coordinator" },
];

export const rules: GroundRule[] = [
  {
    q: "Can we film or photograph inside the hospital?",
    a: "Yes, with prior arrangement through Corporate Communications, and always with an escort. Clinical areas, the emergency unit, theatres and the intensive care unit need specific approval from the department head as well, and there are places where the answer will simply be no because patients cannot meaningfully consent in the moment. Give us two working days where you can. Breaking news gets handled faster, but never without an escort.",
  },
  {
    q: "Will you confirm details about a patient?",
    a: "No, not without written consent from the patient or, where the patient cannot consent, their next of kin. This holds for admissions, condition, cause of injury and whether a named person is even in the building, including for people in the public eye and for cases already circulating on social media. Confirming that someone is here is itself a disclosure. Please do not read a refusal as an evasion.",
  },
  {
    q: "How do you handle an accident or public incident?",
    a: "In a mass casualty or public incident we issue a factual holding statement covering the number of casualties received and their broad condition, without names or identifying detail, and update it as the picture becomes clear. Requests are handled centrally rather than by clinicians in the corridor, so that treatment is not interrupted and the information you get is accurate.",
  },
  {
    q: "Can a consultant comment on a general medical topic?",
    a: "Usually yes, and this is the request we are happiest to get. Tell us the topic and your deadline, and we will offer the clinician who actually does that work. They will speak to general clinical practice, prevention and what patients should watch for. They will not comment on another hospital's case, on an ongoing legal matter, or on a named individual's treatment.",
  },
  {
    q: "May we use your logo?",
    a: "In editorial coverage of the hospital, yes, unmodified, with clear space around it and no recolouring. It may not be used in advertising, on merchandise, in a way that implies endorsement of a product or service, or alongside another organisation's mark in a way that suggests partnership. The press kit includes the correct files and the minimum sizes. Ask us if your use is not obviously editorial.",
  },
  {
    q: "Do you review articles before publication?",
    a: "We do not ask for editorial approval and would not expect it. We are glad to fact check a quotation, a clinical claim, a name or a job title before you publish, and we would much rather do that than issue a correction afterwards. Send the passage and we will turn it around quickly.",
  },
  {
    q: "Can we interview patients?",
    a: "Only where the patient has approached us themselves or has given written consent in advance, arranged through Communications with the treating team's knowledge. We do not walk journalists onto a ward to find someone willing to talk, and we do not approach patients on your behalf during an acute admission. Recovery stories are usually best told after discharge.",
  },
  {
    q: "Do you sponsor or place advertising?",
    a: "Commercial approaches, advertising sales and sponsorship proposals should go to the marketing team rather than the press desk, and the media address is not the right route. It slows down journalists who are on deadline. Anything commercial sent to the press inbox will simply be forwarded on.",
  },
];

// Declared last because three of the four counts are derived from the lists
// above, and a `const` read before its initialiser runs would hit the temporal
// dead zone. Deriving them at all is the point: the reference typed "17 items",
// "9 assets" and "8 rules" by hand, which silently goes stale the first time
// someone adds a release. `content.test.ts` asserts the derivation holds.
export const jumpCards: JumpCard[] = [
  {
    count: `${news.length} items`,
    label: "Newsroom",
    note: "Releases, clinical milestones, community work.",
    href: "#newsroom",
  },
  {
    count: "One inbox",
    label: "Press desk",
    note: "Who to contact, and how fast we reply.",
    href: "#press",
  },
  {
    count: `${kit.length} assets`,
    label: "Press kit",
    note: "Logos, photographs, fact sheet, boilerplate.",
    href: "#kit",
  },
  {
    count: `${rules.length} rules`,
    label: "Filming and privacy",
    note: "What we can and cannot confirm.",
    href: "#usage",
  },
];
