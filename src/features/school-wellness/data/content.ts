/**
 * PLACEHOLDER CONTENT, NOT YET APPROVED BY ST. JOSEPH HOSPITAL.
 * =============================================================
 *
 * Nearly every string in this file came from the bundled design reference
 * (`SJ Hospital School Wellness.html`). The repo can only back the outline of
 * the programme, not its detail: `features/home/components/SchoolWellnessSection`
 * evidences on-campus annual screening per grade, vision, hearing and dental
 * checks, growth tracking, vaccination drives, half day certified teacher first
 * aid, a referral report to parents, and that the programme is paediatric led
 * for Negombo schools. Everything below that line is the reference's invention
 * and follows the pattern set by `features/media/data/content.ts`.
 *
 * Specifically unverified, and to be confirmed with the hospital before this
 * page is published:
 *
 * - The cost and eligibility claims in `faq`: free to government schools in the
 *   Negombo, Katana and Kochchikade education divisions, and a published per
 *   student rate for private and international schools.
 * - Every capacity and turnaround figure: `heroFacts`' up to 300 students a day
 *   and sealed report home, the ten day report in `followUp` and `faq`, the
 *   forty five minute setup, and the split of larger schools across two or
 *   three days.
 * - The whole of `followUp`. The same day phone call, the two week coordinator
 *   call, the six week second call and the next term recheck describe a
 *   tracking process the hospital has not published.
 * - The spectacle fund with an optical partner, in the last `faq` answer.
 * - The Sinhala, Tamil and English consent form, and the finger prick consent
 *   wording alongside it.
 * - Every clinical protocol detail in `stations`: the Snellen chart at six
 *   metres, colour vision, whisper and tuning fork screening, otoscopy,
 *   centile charts, waist measurement, the forward bend test, and the private
 *   wellbeing conversation in the senior grades. The repo names only vision,
 *   hearing, dental and growth.
 * - The nine station count itself, and the five bands in `gradeBands`. The
 *   sports team pre participation check has no support in the repo at all.
 * - The durations and audiences in `training` beyond the half day first aid
 *   course, including the sick room audit, which the repo never mentions.
 * - The whole of `#dengue`: the premises walk with the caretaker, the marked
 *   plan and the weekly checklist. `features/health-tips/data/dengue.ts` covers
 *   dengue as a health topic but describes no school grounds service.
 * - `findings`, which reports what the programme typically turns up. No such
 *   aggregate has been published.
 *
 * The statutory framing in `disclaimer` and the first `faq` answer is the one
 * part written deliberately rather than lifted: the reference already placed
 * the programme alongside the Ministry of Health school medical inspection,
 * and that framing is kept because it is the safe claim, not the impressive
 * one.
 *
 * `content.test.ts` pins this notice, so this cannot quietly ship as fact.
 */
import type { FaqItem } from "@/components/ui/FaqAccordion";
import type {
  ContactRow,
  FollowUpStep,
  GradeBand,
  HeroFact,
  HoverTileItem,
  JumpCard,
} from "../types";

export const PLACEHOLDER_NOTICE = `Placeholder copy, not verified.

Almost everything on this page comes from the design reference and is not
backed by this repo. What the repo does back is the outline only: on campus
annual screening per grade, vision, hearing and dental checks, growth tracking,
vaccination drives, half day certified teacher first aid, a referral report to
parents, and that the programme is paediatric led for Negombo schools.

Confirm the following with the hospital before treating any of it as fact, then
either correct it here or delete this notice deliberately (content.test.ts pins
the notice, so removing it fails the suite rather than passing unnoticed).

Cost and eligibility: that the screening day and the teacher training are free
to government schools in the Negombo, Katana and Kochchikade education
divisions, and that private and international schools pay a published per
student rate.

Capacity and turnaround: up to 300 students in a morning, a sealed individual
report home within ten days, an aggregate report to the principal in the same
ten days, forty five minutes of setup, and larger schools split across two or
three days.

The whole follow up process in followUp: the same day telephone call, the two
week coordinator call to every flagged child's parents, the six week second
call, and the next term recheck at the school.

The spectacle fund held with an optical partner and allocated on the
principal's recommendation.

The Sinhala, Tamil and English written consent form, and the finger prick
consent wording alongside it.

Every clinical protocol detail in stations: the Snellen chart at six metres,
colour vision, whisper and tuning fork screening, otoscopy, centile charts,
waist measurement in the senior grades, the forward bend test, and the private
wellbeing conversation. The repo names only vision, hearing, dental and growth.
The nine station count itself is unverified, as are the five bands in
gradeBands, of which the sports team pre participation check has no support in
the repo at all.

The durations and audiences in training beyond the half day first aid course,
including the sick room audit, which the repo never mentions.

The whole of the dengue section: the premises walk with the caretaker, the
breeding sites marked on a plan, and the weekly checklist left with the school.
features/health-tips/data/dengue.ts covers dengue as a health topic but
describes no school grounds service.

findings, which reports what the programme typically turns up. No such
aggregate has been published.`;

export const heroFacts: HeroFact[] = [
  { k: "Where it happens", v: "At your school, not ours" },
  { k: "A screening day", v: "Up to 300 students" },
  { k: "Every child leaves with", v: "A sealed report home" },
  { k: "Aligned with", v: "National school health" },
];

export const tickerItems: readonly string[] = [
  "Vision and hearing",
  "Height, weight and growth",
  "Dental check",
  "Spine and posture",
  "Anaemia screening",
  "Teacher first aid training",
  "Dengue in the school grounds",
];

export const jumpCards: JumpCard[] = [
  {
    count: "Why school",
    label: "Not the clinic",
    note: "The children who need it never come in.",
    href: "#why",
  },
  {
    count: "9 stations",
    label: "The screening",
    note: "One morning, up to 300 students.",
    href: "#programme",
  },
  {
    count: "5 bands",
    label: "By age group",
    note: "Grade 1 through the senior grades.",
    href: "#grades",
  },
  {
    count: "9 answers",
    label: "Fair questions",
    note: "Consent, cost, privacy, what parents get.",
    href: "#faq",
  },
];

export const whyEyebrow = "01 / Why school, not clinic";
export const whyHeading = "The children who need it most never come in";
export const whyBody =
  "A family brings a child to hospital when something is obviously wrong. Nobody brings a child because they might need spectacles, or because their haemoglobin might be low. Those conditions are silent, they are common, and they quietly cost a child years of schooling. The only way to find them is to go where all the children already are.";

export const findings: readonly string[] = [
  "Children sitting at the back who cannot read the board, and nobody had tested them",
  "Untreated dental caries, by far the commonest finding at every age",
  "Low haemoglobin, especially in adolescent girls",
  "Growth outside the normal range in both directions, underweight and obese in the same classroom",
  "Hearing loss after untreated ear infections, mistaken for inattention",
];

export const stations: HoverTileItem[] = [
  {
    kicker: "01",
    numeral: true,
    title: "Vision",
    body: "Distance acuity both eyes with a Snellen chart at six metres, near vision, squint and colour vision. Any child below the threshold is referred for a proper refraction.",
    more: "Catches: the back row problem",
  },
  {
    kicker: "02",
    numeral: true,
    title: "Hearing",
    body: "Whisper and tuning fork screening, with otoscopy to look for wax, perforation and glue ear. Children who fail go for audiometry.",
    more: "Catches: mistaken inattention",
  },
  {
    kicker: "03",
    numeral: true,
    title: "Growth",
    body: "Height, weight and body mass index plotted on the child's own centile chart, not judged against a single number. Waist measured in the senior grades.",
    more: "Catches: stunting and obesity",
  },
  {
    kicker: "04",
    numeral: true,
    title: "Dental",
    body: "A look for caries, gum disease, fluorosis and malocclusion, with fluoride advice and brushing technique demonstrated on the spot.",
    more: "Catches: the commonest finding",
  },
  {
    kicker: "05",
    numeral: true,
    title: "Anaemia",
    body: "Haemoglobin by finger prick where the school requests it, with parental consent. Adolescent girls are the priority group.",
    more: "Catches: the tired student",
  },
  {
    kicker: "06",
    numeral: true,
    title: "Spine and posture",
    body: "Forward bend test for scoliosis, plus posture, gait and flat feet. Picked up in the growth spurt years, this is often correctable.",
    more: "Catches: scoliosis, early",
  },
  {
    kicker: "07",
    numeral: true,
    title: "General examination",
    body: "Heart sounds, chest, thyroid, lymph nodes, skin and a look at the abdomen, behind a screen with a same sex staff member present.",
    more: "Catches: the unexpected murmur",
  },
  {
    kicker: "08",
    numeral: true,
    title: "Vaccination record",
    body: "The immunisation card is checked against the national schedule and gaps are listed for the parent, with where to catch up locally.",
    more: "Catches: the missed dose",
  },
  {
    kicker: "09",
    numeral: true,
    title: "Wellbeing conversation",
    body: "A short private conversation in the senior grades about sleep, screens, mood, bullying and exam pressure. Voluntary, and never reported back to teachers.",
    more: "Catches: what nobody asks about",
  },
];

export const gradeBands: GradeBand[] = [
  {
    band: "Grade 1",
    title: "The first proper look",
    body: "For many children this is the first health check since infancy. Vision and hearing matter most here, because a child who cannot see or hear the teacher in their first year rarely catches up later. Growth, teeth and the vaccination card are checked, and any congenital problem missed in infancy tends to surface at this station.",
  },
  {
    band: "Grade 4",
    title: "Habits taking hold",
    body: "Dental caries and weight are the story at this age. Diet and activity patterns set now largely persist, and this is the point at which a nutrition conversation with the parent still changes something. Vision is rechecked because short sightedness commonly appears between seven and ten.",
  },
  {
    band: "Grade 7",
    title: "The growth spurt",
    body: "The scoliosis screening matters most in this band, because a curve found during the growth spurt can often be managed with bracing rather than surgery. Anaemia screening starts in earnest, and menstrual health is discussed with the girls in a session of their own.",
  },
  {
    band: "Grade 10",
    title: "Exam year pressure",
    body: "Physically this band is straightforward. What is not straightforward is sleep, stress, posture from long hours at a desk, eye strain, and for some students the first use of tobacco or alcohol. The wellbeing conversation carries more weight here than any measurement.",
  },
  {
    band: "Sports teams",
    title: "Before the season starts",
    body: "A pre participation check for any student in a school team: heart sounds and rhythm, blood pressure, a history of fainting or chest pain during exertion, previous injuries and joint stability. Sudden cardiac events in young athletes are rare and this is how the rare case is found.",
  },
];

export const training: HoverTileItem[] = [
  {
    kicker: "Half a day",
    title: "First aid for teachers",
    body: "Bleeding, burns, fractures, choking, seizures and fainting, practised rather than lectured. Every participant handles the scenario themselves.",
    more: "All teaching staff",
  },
  {
    kicker: "Two hours",
    title: "Basic life support",
    body: "Chest compressions and rescue breathing on a manikin, plus how to run an emergency until the ambulance reaches the gate.",
    more: "Sports and science staff",
  },
  {
    kicker: "Two hours",
    title: "The child who is unwell",
    body: "Recognising the child who needs a hospital today rather than a lie down in the sick room. Asthma attacks, dehydration, high fever, allergic reactions.",
    more: "Class teachers, matrons",
  },
  {
    kicker: "One hour",
    title: "Sick room audit",
    body: "We review your sick room stock, expiry dates and records, and leave a written list of what is missing and where to buy it locally.",
    more: "Whoever runs it",
  },
];

export const breedingSites: readonly string[] = [
  "Roof gutters blocked with leaves after the monsoon",
  "Trays under potted plants in corridors and the office",
  "Discarded tyres behind the sports store",
  "Uncovered water storage barrels and overhead tanks",
  "Blocked floor drains in toilet blocks used rarely",
  "Bottles, cups and lunch containers in rubbish heaps",
  "Coconut shells and tree stumps at the boundary",
  "Unused tanks, buckets and basins in the caretaker's store",
  "Construction debris and cement mixing trays left standing",
];

export const followUp: FollowUpStep[] = [
  {
    when: "Same day",
    what: "Any child needing urgent attention is identified before we leave, and the parent is telephoned that afternoon rather than sent a note.",
  },
  {
    when: "Within 10 days",
    what: "Every child goes home with a sealed individual report in the parent's language, stating what was found and exactly what to do next.",
  },
  {
    when: "Within 10 days",
    what: "The principal receives an aggregate report with no individual names: how many screened, and what proportion had each finding.",
  },
  {
    when: "Two weeks",
    what: "The coordinator calls the parents of every flagged child to check the referral was understood and to help book the appointment.",
  },
  {
    when: "Six weeks",
    what: "A second call for anyone who has not acted. This is the step most programmes skip, and it is the step that decides whether the screening was worth anything.",
  },
  {
    when: "Next term",
    what: "Flagged children are rechecked at the school, so a spectacle prescription that was never filled does not disappear into the file.",
  },
];

export const faq: FaqItem[] = [
  {
    q: "Does this replace the government school medical inspection?",
    a: "No, and it should not be presented to parents that way. The Ministry of Health school medical inspection, run through your area Medical Officer of Health and Public Health Midwife, remains the statutory programme and we work alongside it. What we add is a second pass in the years the national programme does not cover, a faster route to a specialist when something is found, and screening for a few things a routine inspection has no time for.",
  },
  {
    q: "What does it cost the school?",
    a: "The screening day itself and the teacher training sessions are provided free to government schools in the Negombo, Katana and Kochchikade education divisions, as part of the hospital's community programme. Private and international schools are charged per student on a published rate. Onward treatment, if a child needs it, is billed normally, and no family is ever committed to treatment at this hospital as a condition of the screening.",
  },
  {
    q: "Do you need parental consent?",
    a: "Yes, in writing, before the day. We provide a Sinhala, Tamil and English consent form explaining exactly which checks are done and that a finger prick blood sample is included where anaemia screening is requested. Any child whose parent has not consented, or who does not want to be examined on the day, is not examined. Nobody is singled out for it.",
  },
  {
    q: "Is a child examined in private?",
    a: "The vision, hearing and dental stations run in the open hall. The general examination, and anything involving lifting a shirt to look at the spine, happens behind a screen with a same sex staff member present. For adolescents we ask the school to nominate a teacher the students trust to be in the room. This is not negotiable on our side.",
  },
  {
    q: "What do the parents actually receive?",
    a: "A sealed individual report, sent home with the child within ten days, written in plain language in the parent's preferred language. It states what was checked, what was normal, what was not, and precisely what to do next. Where a referral is needed the report names the clinic and gives a number to call, rather than telling the parent vaguely to see a doctor.",
  },
  {
    q: "Does the school see individual results?",
    a: "The principal receives an aggregate report: how many children were screened, what proportion had reduced vision, dental caries, low haemoglobin, growth outside the normal range. Individual clinical findings go to the parent, not to the staff room. The exception, with parental consent, is a condition the school needs to manage day to day, such as a child who should be seated at the front or who has been newly diagnosed with asthma.",
  },
  {
    q: "How long does a screening day take?",
    a: "A morning for up to about 300 students with nine stations running. Larger schools are split across two or three days, usually one grade band per day. We need a hall or two adjacent classrooms, tables, chairs, a power point and one corner that can be screened off. Setup takes about forty five minutes before the first class arrives.",
  },
  {
    q: "What about children who need spectacles but cannot afford them?",
    a: "This is the commonest gap and the one most worth solving, because a pair of spectacles is the cheapest intervention in the whole programme and the one that changes a school report card. We maintain a small fund with our optical partner for children whose families cannot meet the cost, allocated through the school on the principal's recommendation, without the child being identified to their class.",
  },
  {
    q: "Can you help with a health education session for students?",
    a: "Yes, and it is the part schools ask for most. Sessions run for one period and are pitched by age: handwashing and dental care for the primary grades, dengue and nutrition in the middle school, and adolescent health, screen time, sleep and substance awareness for the senior grades. A separate session for parents on the same evening usually gets a better turnout than you would expect.",
  },
];

/**
 * The four ways in, in the reference's order. Each number and address is the
 * hospital's own and matches `components/layout/ThemedFooter`; only the last
 * row is this page's choice, pointing parents at the health tips library.
 */
export const contactRows: ContactRow[] = [
  { label: "0117 84 84 84", href: "tel:+94117848484", glyph: "phone" },
  { label: "Email the hospital", href: "mailto:info@sjhospital.lk", glyph: "arrow" },
  { label: "WhatsApp us", href: "https://wa.me/94742223334", glyph: "arrow" },
  { label: "Health tips for parents", href: "/health-tips#library", glyph: "arrow" },
];

/** The chips listing what the hospital needs from a school to quote a date. */
export const bookingChecklist: readonly string[] = [
  "Student numbers",
  "Grades to include",
  "A hall or two classrooms",
  "Term dates",
];

export const disclaimer =
  "School screening complements, and does not replace, the Ministry of Health school medical inspection and the Public Health Midwife and Medical Officer of Health services in your division. Findings are shared with the school and the parent; onward notification follows the school's own arrangements with the area MOH.";
