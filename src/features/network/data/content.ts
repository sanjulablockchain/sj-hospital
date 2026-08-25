import type { AccordionItem } from "@/components/ui/AccordionList";
import type { ContactRow, FactRow, JumpCard, OrgGroup, ReachRow } from "../types";

/**
 * The company descriptions, service chips and every figure in `#reach` were
 * checked against the group's own published network page,
 * <https://www.ktdoctor.com/network>, and match it. That is unusual for a
 * design reference in this project, and it is why this page keeps its
 * reference's copy where the pharmacy and international care pages had to cut
 * theirs.
 *
 * Two blocks are not backed by anything: not by this repo, and not by the
 * group's site. They ship as the reference wrote them, marked by
 * PLACEHOLDER_NOTICE below, because cutting them would remove a third of the
 * page and there is no repo content to replace them with. This is the same
 * treatment `features/media/data/content.ts` uses.
 *
 * One correction to the reference: it says the hospital is twelve minutes from
 * the airport. The repo says ten, in ten places. Ten is what is here.
 */
export const PLACEHOLDER_NOTICE = `Placeholder copy, not verified.

Two blocks on this page come from the design reference and are not backed by
this repo or by the group's published network page. Confirm each with the
hospital before treating any of it as fact, then either correct it here or
delete this notice deliberately (content.test.ts pins the notice, so removing
it fails the suite rather than passing unnoticed).

mattersBody, in the same section, carries the same unverified assertions in
prose form: which protocols the doctors follow, who reviews a difficult case,
and how a child treated in Los Angeles can be followed up in Negombo without
starting the file again.

The "In practice" list in the matters section asserts: that the group's
paediatric and emergency protocols are inherited and adapted to Sri Lankan
guidelines; that difficult paediatric cases can be put to colleagues in the
United States for a second opinion; that families keep one continuous record
across countries; that prescriptions are written in generic names so either
country can dispense them; and that nursing and technician training runs against
group standards.

All seven referral answers assert: that an LA paediatrician's chart is sent
ahead of travel and read rather than restarted; that second opinions are a real
channel and are disclosed when used; that dengue management follows Sri Lankan
national guidelines while stricter American infection control and newborn
observation protocols are kept; how an ACIG policy settles at this hospital;
that recruitment charges candidates no fee at any stage; that admitting rights
are open to consultants in Negombo, Chilaw and Gampaha; and that pricing is set
for the Sri Lankan market rather than an imported cost base.

Separately, and not one of the seven answers above (none of them mentions a
desk): the referral section's intro paragraph and its call to action assert
that a referral desk exists at this hospital. That claim is not verified
either.`;

/** Scrolling strip along the bottom of the hero: the other eight companies. */
export const tickerItems = [
  "Kids & Teens Medical Group",
  "St. Gianna Medical Group",
  "LA Intensive Pediatric Therapy",
  "Serendib Healthways",
  "After-Hours Pediatric Urgent Care",
  "ACIG Asiacorp Insurance Brokers",
  "Human Compass MSO",
  "Blockchain BPO",
] as const;

/** Fact strip along the bottom of the hero. The third cell renders in accent. */
export const heroFacts: FactRow[] = [
  { k: "Parent group", v: "Kids & Teens Medical Group" },
  { k: "Group clinics", v: "25 across Greater LA" },
  { k: "Companies in the family", v: "Nine, on two continents" },
  { k: "Sri Lanka arm", v: "This hospital, and ACIG" },
];

export const jumpCards: JumpCard[] = [
  {
    count: "Why it matters",
    label: "At the bedside",
    note: "What the connection changes about your care.",
    href: "#matters",
  },
  {
    count: "9 companies",
    label: "The family",
    note: "California, Sri Lanka, and the support arms.",
    href: "#family",
  },
  {
    count: "The numbers",
    label: "Group reach",
    note: "Clinics, doctors, locations, as published.",
    href: "#reach",
  },
  {
    count: "7 answers",
    label: "Moving between us",
    note: "Referrals, second opinions, insurance, jobs.",
    href: "#referrals",
  },
];

export const mattersEyebrow = "01 / Why it matters at the bedside";
export const mattersHeading = "A network is only worth something to a patient";
export const mattersBody =
  "Most hospital group pages are corporate wallpaper. This one is here because the connection changes specific things about your care: which protocols the doctors follow, who reviews a difficult case, and how a child treated in Los Angeles can be followed up in Negombo without starting the file again.";

/** See PLACEHOLDER_NOTICE: none of these five is verified. */
export const practice = [
  "Paediatric and emergency protocols inherited from the group, adapted to Sri Lankan guidelines",
  "Difficult paediatric cases can be put to colleagues in the United States for a second opinion",
  "Families moving between LA and Sri Lanka keep one continuous record",
  "Prescriptions written in generic names so they can be dispensed on either side",
  "Nursing and technician training programmes run against group standards",
];

export const orgGroups: OrgGroup[] = [
  {
    name: "Sri Lanka",
    note: "Hospital care and insurance, brought to Sri Lanka by the group.",
    orgs: [
      {
        slug: "st-joseph",
        logo: "/images/network/logos/st-joseph.png",
        wordmark: "St. Joseph Hospital",
        badge: "You are here",
        name: "St. Joseph Hospital Negombo",
        tagline: "US standard care in Negombo.",
        body: "Operated by Kids & Teens Medical Group, USA, bringing American healthcare standards to affordable, accessible care ten minutes from the international airport.",
        chips: ["Emergency & outpatient", "Inpatient care", "Telemedicine", "Pharmacy & diagnostics"],
        cta: "This hospital",
        flagship: true,
      },
      {
        slug: "acig",
        logo: "/images/network/logos/acig.png",
        wordmark: "Asiacorp Insurance",
        badge: "Insurance",
        name: "ACIG, Asiacorp Insurance Brokers",
        tagline: "Insurance solutions across Sri Lanka.",
        body: "An insurance brokerage offering tailored motor, health, life and corporate cover for individuals and businesses, and the group company our patients most often ask about.",
        chips: ["Health insurance", "Life insurance", "Motor insurance", "Corporate insurance"],
        cta: "acig.lk",
        href: "https://acig.lk",
      },
    ],
  },
  {
    name: "Paediatric and family care, California",
    note: "Everyday primary, urgent and specialty care for children and families across Greater Los Angeles.",
    orgs: [
      {
        slug: "kids-and-teens",
        logo: "/images/network/logos/kids-and-teens.png",
        wordmark: "Kids & Teens Medical Group",
        badge: "Flagship, our parent",
        name: "Kids & Teens Medical Group",
        tagline: "The flagship paediatric network.",
        body: "Board certified paediatric care across 25 clinics in Greater LA for ages 0 to 21, and the group that operates this hospital.",
        chips: ["Primary care", "Urgent care", "Telehealth", "Newborn care"],
        cta: "ktdoctor.com",
        href: "https://www.ktdoctor.com",
        flagship: true,
      },
      {
        slug: "st-gianna",
        logo: "/images/network/logos/st-gianna.png",
        wordmark: "St. Gianna Medical",
        badge: "Family practice",
        name: "St. Gianna Medical Group",
        tagline: "Family practice for all ages.",
        body: "Comprehensive care for adults and children with same day appointments and round the clock booking, extending the group beyond paediatrics.",
        chips: ["Same day appointments", "24/7 booking", "Telehealth", "Advanced wound care"],
        cta: "sgmdoctor.com",
        href: "https://sgmdoctor.com",
      },
      {
        slug: "laipt",
        logo: "/images/network/logos/laipt.png",
        wordmark: "LA Intensive Pediatric Therapy",
        badge: "Therapy, since 2010",
        name: "LA Intensive Pediatric Therapy",
        tagline: "Expert paediatric therapy.",
        body: "Individual and centre based speech, occupational and developmental therapy for children, and the group's reference point for early intervention.",
        chips: ["Speech therapy", "Occupational therapy", "Sensory integration"],
        cta: "laipt.org",
        href: "https://laipt.org",
      },
      {
        slug: "serendib-healthways",
        logo: "/images/network/logos/serendib-healthways.png",
        wordmark: "Serendib Healthways",
        badge: "Health plans",
        name: "Serendib Healthways",
        tagline: "Paediatric health plans across Greater LA.",
        body: "A paediatric HMO and IPA network with more than 20 clinic locations and over 50 board certified doctors, offering affordable children's coverage across Los Angeles County.",
        chips: ["Paediatric HMO/IPA", "Same day appointments", "Telehealth", "After hours urgent care"],
        cta: "serendibhealthways.com",
        href: "https://serendibhealthways.com",
      },
      {
        slug: "after-hours",
        logo: "/images/network/logos/after-hours.png",
        wordmark: "After-Hours Pediatric Urgent Care",
        badge: "Round the clock",
        name: "After-Hours Pediatric Urgent Care",
        tagline: "Out of hours? We are here for yours.",
        body: "Paediatric urgent care at any hour across more than 20 California clinics, for ages 0 to 21, accepted by all major insurance plans.",
        chips: ["24/7 urgent care", "Same day appointments", "Ages 0 to 21", "All insurance accepted"],
        cta: "pediatricafterhour.com",
        href: "https://pediatricafterhour.com",
      },
    ],
  },
  {
    name: "Business and support",
    note: "The administrative and outsourcing companies that keep the network running.",
    orgs: [
      {
        slug: "human-compass",
        logo: "/images/network/logos/human-compass.png",
        wordmark: "Human Compass MSO",
        badge: "Management services",
        name: "Human Compass MSO",
        tagline: "Guiding care, delivering human solutions.",
        body: "A Southern California management services organisation connecting patients with primary, specialty and urgent care providers for over 25 years.",
        chips: ["Primary care network", "Specialty care", "Urgent care", "Provider management"],
        cta: "humancompassmso.com",
        href: "https://humancompassmso.com",
      },
      {
        slug: "blockchain-bpo",
        logo: "/images/network/logos/blockchain-bpo.png",
        wordmark: "Blockchain BPO",
        badge: "Outsourcing",
        name: "Blockchain BPO",
        tagline: "Offshore teams for US businesses.",
        body: "Dedicated offshore teams in Sri Lanka and Mexico for customer care, claims processing and billing support, and one of the group's largest Sri Lankan employers.",
        chips: ["Customer care", "Claims processing", "Billing support", "Data entry"],
        cta: "myblockchainbpo.com",
        href: "https://myblockchainbpo.com",
      },
    ],
  },
];

/** Figures as published by the group companies. See the test that pins them. */
export const reachRows: ReachRow[] = [
  { n: "9", k: "Companies in the network", who: "Across the United States and Sri Lanka" },
  { n: "25", k: "Kids & Teens clinics", who: "Greater Los Angeles" },
  { n: "20+", k: "Serendib Healthways locations", who: "Los Angeles County" },
  { n: "50+", k: "Board certified doctors", who: "Serendib Healthways network" },
  { n: "20+", k: "After hours urgent care clinics", who: "California, ages 0 to 21" },
  { n: "25+", k: "Years of Human Compass MSO", who: "Southern California" },
  { n: "2010", k: "LA Intensive Pediatric Therapy since", who: "Speech, occupational, developmental" },
  { n: "2", k: "Countries with BPO teams", who: "Sri Lanka and Mexico" },
  { n: "1", k: "Hospital in Sri Lanka", who: "This one, in Negombo" },
];

/** See PLACEHOLDER_NOTICE: the referral desk this asserts is not verified. */
export const referralIntro =
  "Families in the group move between Los Angeles and Sri Lanka more often than you would think. Summer with grandparents, a semester back home, a parent posted abroad. The referral desk exists so nobody starts from a blank page.";

/** See PLACEHOLDER_NOTICE: the referral desk this asserts is not verified. */
export const referralCta = "Ask the referral desk";

/** See PLACEHOLDER_NOTICE: none of these seven answers is verified. */
export const referrals: AccordionItem[] = [
  {
    q: "My child is treated by Kids & Teens in Los Angeles. Can you follow up here?",
    a: "Yes, and this is the most common reason families use the network. Ask your LA paediatrician to send the chart to the hospital before you travel, and our paediatric team reads it rather than starting a fresh history. Growth charts, vaccination records and ongoing prescriptions carry across, and anything dispensed here is written in generic names so the pharmacy in California can match it on your return.",
  },
  {
    q: "Can a case from Negombo be reviewed by a doctor in the group in the United States?",
    a: "For difficult paediatric cases, yes. Our consultants can put a case to colleagues in the group for a second opinion, with imaging and reports attached, and we tell you plainly when we have done so. It is not a marketing promise of American doctors treating you in Negombo; it is a real channel used when a case genuinely warrants another pair of eyes.",
  },
  {
    q: "Do the clinical protocols really come from the US side?",
    a: "The group's paediatric and emergency protocols are the starting point, adapted to what is available and what is prevalent here. Dengue management, for instance, follows Sri Lankan national guidelines because that is the correct standard for this country. Where the American protocol is stricter, on infection control or on newborn observation, we keep the stricter one.",
  },
  {
    q: "Is my ACIG insurance policy settled directly at this hospital?",
    a: "ACIG is a brokerage in the same family, not an insurer, so the settlement depends on the insurer behind your policy rather than on the group relationship. Bring your policy documents to the billing desk before admission and we will tell you honestly whether direct settlement applies or whether you will be claiming afterwards with our invoice pack.",
  },
  {
    q: "I want to work for the group. Where do I apply?",
    a: "Clinical and hospital roles in Negombo go through this hospital's careers page. Roles with Blockchain BPO in Sri Lanka, and clinical roles in California, are advertised by those companies directly. We do not charge candidates a fee at any stage, and nobody in the group is authorised to ask you for one.",
  },
  {
    q: "Are you accepting new partner hospitals or referring doctors?",
    a: "Yes, particularly consultants in Negombo, Chilaw and Gampaha who would like admitting rights, and hospitals looking for a partner near the airport for patients arriving from abroad. Write to the hospital and the enquiry reaches the medical director rather than a marketing inbox.",
  },
  {
    q: "Does being part of an American group make treatment more expensive?",
    a: "No, and the point of the arrangement is the opposite. Prices are set for the Sri Lankan market and published on the estimate before you commit. What the group provides is protocols, training and purchasing scale rather than an imported cost base.",
  },
];

export const contactRows: ContactRow[] = [
  { label: "0117 84 84 84", href: "tel:+94117848484", glyph: "phone" },
  { label: "Email the hospital", href: "mailto:info@sjhospital.lk", glyph: "arrow" },
  { label: "The group network page", href: "https://www.ktdoctor.com/network", glyph: "arrow" },
  { label: "Travelling for treatment", href: "/international-care#journey", glyph: "arrow" },
];

export const disclaimer =
  "Company names, logos and figures on this page belong to the respective group companies and partners, and are shown as published by them. Each company is responsible for its own services and regulatory obligations in its own jurisdiction.";
