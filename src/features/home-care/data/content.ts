/**
 * PLACEHOLDER CONTENT, NOT YET APPROVED BY ST. JOSEPH HOSPITAL.
 * =============================================================
 *
 * This page is unusual among the marketing pages: most of it is grounded, not
 * invented. The four things it gathers are already described in the repo, in
 * `features/services/data/atHome.ts`, and the figures here are that file's
 * figures re-presented rather than new claims. `content.test.ts` asserts the
 * agreement instead of trusting it, so the two cannot drift apart.
 *
 * One sentence came from the hospital directly, and is the reason the page
 * exists: `visitLede`. It is pinned verbatim.
 *
 * What is not grounded is the page-level framing, which is the part a landing
 * page needs and a service entry never had to state. Confirm the following with
 * the hospital before treating any of it as fact, then either correct it here or
 * delete `PLACEHOLDER_NOTICE` deliberately (content.test.ts pins the notice, so
 * removing it fails the suite rather than passing unnoticed):
 *
 * - Coverage area. The service entry says medicine delivery covers Negombo, but
 *   says nothing about how far a home visit travels. Nothing here states a
 *   radius, and nothing should until the hospital gives one.
 * - Fees. Whether a home visit is charged, and how, is not in the repo. No
 *   figure appears here.
 * - Response time. How soon a requested visit happens, and whether an urgent
 *   request is treated differently, is unstated. `steps` deliberately says a
 *   visit is arranged by appointment and stops there.
 * - Which sampling is possible at home. The entry confirms sampling is done at
 *   home; it does not list which tests. `samplingPoints` stays general for that
 *   reason, and names no specific panel or turnaround.
 * - Who to ask for. The contact rail uses the hospital's published switchboard,
 *   mailbox and WhatsApp number only. There is no home-visit line, and inventing
 *   one fails the suite.
 */

import type { ContactRow, Handoff, HeroFact, JumpCard, Step, SuitedCase, VisitRole } from "../types";

export const PLACEHOLDER_NOTICE = `Placeholder copy, not verified.

Most of this page is grounded: the figures come from the home visits, medicine
delivery and telemedicine entries this site already publishes, and a test
asserts they still agree. One sentence, the home visit lede, came from the
hospital and is pinned word for word.

The page-level framing is what needs confirming. Check the following with the
hospital before treating any of it as fact, then either correct it in
data/content.ts or delete this notice deliberately (content.test.ts pins the
notice, so removing it fails the suite rather than passing unnoticed).

Coverage: how far a home visit travels. Medicine delivery is published as
covering Negombo, but the visiting team's coverage area is not, so no radius is
stated here.

Fees: whether a home visit is charged, and on what basis. Nothing in the repo
supports a figure, so none appears.

Response time: how soon a requested visit happens, and whether an urgent
request is handled differently from a routine one. The steps say a visit is
arranged by appointment and go no further.

Sampling: which samples can actually be taken at home. That sampling happens at
home is confirmed; the list of tests, any turnaround, and how a sample travels
to the laboratory are not, so the copy stays general.`;

/**
 * The marquee under the hero fact strip, in the register every other hero's
 * ticker uses: short labels naming what the page covers, sentence case here and
 * uppercased by the component.
 *
 * Nothing new is claimed. Each item is something stated in full further down the
 * page or in the home visits service entry, which is the point of the band: a
 * reader who scrolls no further should still know what comes to the door.
 */
export const tickerItems: readonly string[] = [
  "Doctors, nurses and laboratory technicians",
  "Visits by appointment",
  "6 dedicated vehicles",
  "Sampling done at home",
  "Notes on your hospital file",
  "Elders, infants and post-operative care",
  "Medicine from our own counter",
  "Video and phone consultations",
];

/**
 * The strip closing the hero. Every pair here also appears in the home visits
 * service entry, which is what content.test.ts checks it against: these are not
 * independent facts, and a figure edited here alone should fail.
 */
export const heroFacts: HeroFact[] = [
  { k: "Booking", v: "By appointment" },
  { k: "Vehicles", v: "6 dedicated" },
  { k: "Sampling", v: "Done at home" },
  { k: "Records", v: "Written into your file" },
];

export const jumpCards: JumpCard[] = [
  { count: "01", label: "Home visits", note: "Doctors, nurses and laboratory technicians at your door", href: "#visits" },
  { count: "02", label: "Who it suits", note: "Elders, infants and recovery after an operation", href: "#who" },
  { count: "03", label: "Sampling", note: "Samples taken at home, findings on your file", href: "#sampling" },
  { count: "04", label: "Arranging one", note: "Four steps from a request to a visit on record", href: "#how" },
];

/**
 * The hospital's own sentence, and the only approved copy on this page. Pinned
 * verbatim by content.test.ts: a copy edit that tightens it would be discarding
 * the one line here that did not need confirming.
 */
export const visitLede =
  "Our doctors, nurses, and laboratory technicians visit your homes to give you personalized care in the comfort of your home.";

export const visitRoles: VisitRole[] = [
  {
    kicker: "Examines and decides",
    title: "A visiting doctor",
    body: "Sees the patient at home, reviews how a recovery or a long-term condition is going, and decides what happens next. Where a change of treatment is needed, it is made on the visit rather than waiting for a trip in.",
  },
  {
    kicker: "Treats and monitors",
    title: "A visiting nurse",
    body: "Handles the care that would otherwise need a ward: dressings, observations, and the practical support a family is managing between visits. Nurses also carry out sampling at home.",
  },
  {
    kicker: "Takes samples",
    title: "A laboratory technician",
    body: "Attends when a sample is needed, so a homebound patient is not asked to travel in for it. The sample goes back to the hospital laboratory that would have processed it anyway.",
  },
];

/**
 * The four cases in `#who`, one per condition on the home visits service entry.
 * content.test.ts pins the count to that entry, so a condition added there is
 * a reminder to expand this band rather than something that quietly diverges.
 */
export const suitedCases: SuitedCase[] = [
  {
    title: "Age or mobility makes travelling hard",
    body: "For an elder who finds the journey in harder than the appointment itself, a visit removes the part that was actually the obstacle. Nothing about the consultation changes.",
  },
  {
    title: "Recovery at home after an operation",
    body: "The weeks after an operation are when a wound needs watching and a question needs answering quickly. A visit brings that review to the patient while they are least able to travel.",
  },
  {
    title: "An infant, where a hospital trip is difficult",
    body: "Bringing a very young child in is sometimes the hardest part of a routine check. A visit lets the check happen without the trip, in a room the child already knows.",
  },
  {
    title: "Routine sampling for a homebound patient",
    body: "Where the only reason to travel in was to give a sample, a laboratory technician comes instead. The sample reaches the same hospital laboratory either way.",
  },
];

export const samplingPoints: string[] = [
  "A laboratory technician attends the visit when a sample is needed, so the patient is not asked to travel in to give one.",
  "Samples go back to the hospital's own laboratory, the same one that would have processed them had the patient come in.",
  "Findings are written into the hospital file rather than handed over as a loose report, so whoever sees the patient next is reading the same record.",
  "Where sampling is expected, saying so when the visit is requested means the right person is on the vehicle.",
];

export const samplingFacts: HeroFact[] = [
  { k: "Taken", v: "At home" },
  { k: "Processed", v: "Hospital laboratory" },
  { k: "Findings", v: "On your hospital file" },
  { k: "Requesting", v: "Mention it with the visit" },
];

/**
 * The two bands that summarise and then get out of the way. Both destinations
 * hold the real detail, and both are asserted outbound by content.test.ts,
 * which also fails if either body grows past a summary or starts restating the
 * delivery specifics that /pharmacy states once.
 */
export const handoffs: Handoff[] = [
  {
    eyebrow: "05 / Medicine",
    heading: "Medicine to your door",
    body: "A visit is often not the only thing that needs to reach the house. Prescription and over-the-counter medicine is delivered from the hospital's own pharmacy counter, filled from the same authorized stock as an order collected in person, and checked by a pharmacist before it goes out.",
    points: [
      "Filled from the hospital's own counter, not a third party",
      "Checked by a pharmacist before dispatch",
      "A photographed prescription is enough to start an order",
    ],
    linkLabel: "How delivery works",
    href: "/pharmacy#delivery",
  },
  {
    eyebrow: "06 / Remote",
    heading: "A consultation without travelling in",
    body: "Not every question needs someone at the door. A telemedicine consultation covers a follow-up conversation or a concern that does not need an in-person examination, by video or by phone, with any prescription issued straight to the pharmacy.",
    points: [
      "Video or phone, whichever suits the patient",
      "Any prescription goes to the pharmacy for collection or delivery",
      "Used for follow-up once a patient has travelled home",
    ],
    linkLabel: "About telemedicine",
    href: "/services/telemedicine",
  },
];

/**
 * The four steps, with titles held identical to the home visits service entry
 * by content.test.ts. The descriptions are written for a landing page rather
 * than copied, but the shape of the process may not diverge.
 */
export const steps: Step[] = [
  {
    no: "01",
    title: "Request",
    desc: "Call the hospital and say who needs to be seen and why. Having the hospital file number to hand makes the rest quicker.",
  },
  {
    no: "02",
    title: "Schedule",
    desc: "The visit is arranged by appointment and one of the dedicated vehicles is assigned to it, along with whoever the visit needs.",
  },
  {
    no: "03",
    title: "Visit",
    desc: "A doctor, nurse or laboratory technician attends at the agreed time. If a sample is needed, it is taken there.",
  },
  {
    no: "04",
    title: "Record",
    desc: "Notes from the visit are written straight into the hospital file, so the team seeing the patient next reads the same record.",
  },
];

export const prepPoints: string[] = [
  "Have the patient's hospital file number ready when requesting the visit",
  "Write down the medicines currently being taken, including anything bought over the counter",
  "Set aside a quiet, well lit space the visiting team can work in",
  "Say whether sampling is expected, so the right person is on the vehicle",
  "Keep a phone reachable in case the team needs directions on the day",
];

export const faq = [
  {
    q: "Who are home visits meant for?",
    a: "They are aimed at elders, infants and patients recovering after an operation who find it difficult to travel in. If you are unsure whether a visit is the right thing, the switchboard can talk it through with you.",
  },
  {
    q: "Can a blood sample be taken at home?",
    a: "Yes. A laboratory technician attends when a sample is needed, and it goes back to the hospital's own laboratory. Mention that sampling is likely when you request the visit so the right person comes.",
  },
  {
    q: "Will the regular doctor see what happened at the visit?",
    a: "Yes. Notes from the visit are written straight into the hospital file rather than kept separately, so whoever sees the patient next is reading the same record.",
  },
  {
    q: "How many vehicles cover home visits?",
    a: "Home visits run on 6 dedicated vehicles kept for this purpose, which is why visits are arranged by appointment rather than on demand.",
  },
  {
    q: "Can medicine come with the visit?",
    a: "Medicine delivery is arranged through the pharmacy rather than the visiting team. It is filled from the hospital's own counter and checked by a pharmacist before it goes out.",
  },
  {
    q: "Is a home visit the right thing in an emergency?",
    a: "No. A home visit is arranged by appointment and is not an emergency service. In an emergency, call the hospital switchboard or come to accident and emergency, which is open at every hour.",
  },
];

/**
 * The published hospital contacts, matching components/layout/ThemedFooter.
 * There is no home-visit line: content.test.ts fails on an invented mailbox or
 * phone number, and config/contactEmails.ts allows two addresses site wide.
 */
export const contactRows: ContactRow[] = [
  { label: "0117 84 84 84", href: "tel:+94117848484", glyph: "phone" },
  { label: "WhatsApp us", href: "https://wa.me/94742223334", glyph: "arrow" },
  { label: "Email the hospital", href: "mailto:info@sjhospital.lk", glyph: "arrow" },
  { label: "Book a doctor online", href: "/e-channeling", glyph: "arrow" },
];
