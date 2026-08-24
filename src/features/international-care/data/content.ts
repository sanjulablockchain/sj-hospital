import type {
  DeskService,
  FactRow,
  InternationalFaq,
  JourneyStep,
  JumpCard,
  RoomTile,
  TreatmentRow,
} from "../types";

/**
 * Every claim on this page traces back to something the repo already publishes:
 * `features/home/data/internationalCare`, `internationalSteps`, `paymentNotes`,
 * `bringWithYou` and `comforts` in `features/services/data/indexContent`, the
 * `telemedicine` entry in `features/services/data/atHome`, the surgical and
 * women & children service entries, and `roomRows`, `roomStandard`,
 * `ambulanceSpecs`, `visitingRows` and `gettingHere` in
 * `features/facilities/data/content`.
 *
 * The design reference this page is built from asserted a good deal more: visa
 * support letters, a quotation within 48 hours, a desk staffed from 7am to 9pm
 * with a duty number after hours, insurance direct billing against a guarantee
 * of payment, a money changer and ATM in the lobby, an itemised interim bill
 * every 48 hours, estimates valid for sixty days, a negotiated-rate guest house
 * list, a free consultant review of your scans, an eight-language interpreter
 * roster, halal diets, a written fit-to-fly opinion, "the closest private
 * hospital to the airport", and knee replacement, hip replacement, hysterectomy
 * and dental implants. None of that is backed here, so none of it survived: the
 * layout, spacing, motion and hover behaviour are the reference's, the facts are
 * the repo's. `content.test.ts` keeps them out.
 *
 * Two rows in `practical` are general travel facts rather than hospital claims
 * (the time zone and the climate), which is why they are phrased without a
 * figure the hospital would have to stand behind.
 */

/** Scrolling strip along the bottom of the hero. */
export const tickerItems = [
  "Ten minutes from Bandaranaike International",
  "Our own ambulance available for transfer",
  "Interpreters on request",
  "Insurance paperwork prepared at the desk",
  "An attendant stays in the room",
  "Records sent to your doctor at home",
];

/** Fact strip along the bottom of the hero. */
export const heroFacts: FactRow[] = [
  { k: "From the airport", v: "Ten minutes" },
  { k: "Estimate", v: "In writing, first" },
  { k: "Language", v: "Interpreters on request" },
  { k: "Records", v: "Sent to your doctor" },
];

export const jumpCards: JumpCard[] = [
  {
    count: "6 steps",
    label: "The journey",
    note: "From the first email to the flight home.",
    href: "#journey",
  },
  {
    count: "10 services",
    label: "The desk",
    note: "Transfers, interpreters, insurance, records.",
    href: "#services",
  },
  {
    count: "In writing",
    label: "Estimates",
    note: "What people travel here for, and how long.",
    href: "#estimates",
  },
  {
    count: "10 answers",
    label: "Before you fly",
    note: "Arrival, insurance, records, going home.",
    href: "#faq",
  },
];

/** `#journey`: the same six stages as the home page's international band, told
 *  in the order a travelling patient meets them. */
export const journeySteps: JourneyStep[] = [
  {
    no: "01",
    title: "Talk to us first",
    desc: "A consultation with one of our doctors by video or by phone, booked daily, so the treatment is discussed with you before you buy a ticket.",
    when: "Before you travel",
  },
  {
    no: "02",
    title: "An estimate in writing",
    desc: "A written estimate is given before treatment starts, covering the likely course of care. Send your policy details and the desk prepares the insurance paperwork alongside it.",
    when: "Before admission",
  },
  {
    no: "03",
    title: "Airport to bedside",
    desc: "Ten minutes from Bandaranaike International Airport, with our own ambulance available for transfer. Tell us your flight and the transfer and admission are arranged before you land.",
    when: "Arrival day",
  },
  {
    no: "04",
    title: "Admission",
    desc: "Bring photo ID, a referral letter if a doctor gave you one, your current medicines and any previous imaging. An interpreter is arranged on request for the consultation and the consent conversation.",
    when: "Arrival day",
  },
  {
    no: "05",
    title: "Treatment and family",
    desc: "One attendant stays in the room, with a bystander bed and chair in every category and meals to dietary orders. From critical care, a family member is called with an update once a day.",
    when: "During your stay",
  },
  {
    no: "06",
    title: "Discharge and home",
    desc: "You leave with copies of your reports, imaging and discharge summary, and a discharge plan with a follow-up date. With your consent the same pack goes to your doctor at home.",
    when: "Going home",
  },
];

/** `#services`: what the international desk handles, on the dark band. */
export const deskServices: DeskService[] = [
  {
    kind: "Before you travel",
    title: "Consultation by video or phone",
    desc: "Telemedicine offers a consultation with one of our doctors by video or by phone, booked daily. It suits a conversation that does not need an examination in person, which is most of them before a flight.",
  },
  {
    kind: "Transport",
    title: "Airport transfer",
    desc: "Ten minutes from Bandaranaike International Airport, on St. Joseph Street in central Negombo. Our own ambulance is available for transfer, dispatched from the covered bay patients arrive through.",
  },
  {
    kind: "Language",
    title: "Interpreters on request",
    desc: "Our clinicians consult in English, and interpreters are arranged on request. Tell the desk before you travel so one is there for your consultation, your consent conversation and your discharge briefing.",
  },
  {
    kind: "Money",
    title: "Estimates and payment",
    desc: "A written estimate before treatment starts. Cash, card and bank transfer are all accepted, and outpatients get a 10% discount on laboratory charges.",
  },
  {
    kind: "Insurance",
    title: "Claims and paperwork",
    desc: "Documentation prepared for international insurers and travel policies, with the desk assisting on the claim rather than leaving it to you. Corporate insurance is accepted at the outpatient department.",
  },
  {
    kind: "Family",
    title: "An attendant in the room",
    desc: "Every room category has a bystander bed and chair, and an attendant may stay overnight. Meals are prepared to the dietary orders noted at admission.",
  },
  {
    kind: "Diagnostics",
    title: "Tests without the wait",
    desc: "Laboratory reports the same day and checked by two doctors, X-ray read within the hour, ultrasound at the visit. CT and MRI are not performed here and are arranged by referral.",
  },
  {
    kind: "While you are here",
    title: "The building itself",
    desc: "Free parking beside the main entrance, free wifi, a cafeteria, a patient lounge, a prayer room, wheelchair access and quiet visiting hours. A 24 hour pharmacy on the ground floor.",
  },
  {
    kind: "After you leave",
    title: "Records to take home",
    desc: "Copies of your reports, imaging referrals and discharge summary to take with you, and the same pack sent to your own doctor at home with your consent.",
  },
  {
    kind: "Follow up",
    title: "Review once you are home",
    desc: "Telemedicine is used for follow-up with patients who have travelled home after being seen here, which keeps the same doctor involved in the next step of your care.",
  },
];

/**
 * `#estimates`: what people actually travel here for. Only treatments the repo
 * publishes appear, and `stay` uses the repo's own wording rather than a night
 * count the hospital has not committed to.
 */
export const treatments: TreatmentRow[] = [
  {
    name: "Health check",
    note: "Bloods and biochemistry, urine analysis, chest X-ray and a physician consultation with report review",
    stay: "Outpatient visit",
  },
  {
    name: "Hernia repair",
    note: "Inguinal or umbilical, laparoscopic where that shortens recovery, otherwise open with mesh",
    stay: "Day case or overnight",
  },
  {
    name: "Gallbladder removal",
    note: "On a scheduled operating list, laparoscopic where it suits your case, with consultant led anaesthesia",
    stay: "Day case or overnight",
  },
  {
    name: "Appendix surgery",
    note: "Scheduled or emergency, with surgical and anaesthetic teams on call at any hour",
    stay: "Day case or overnight",
  },
  {
    name: "Knee or shoulder arthroscopy",
    note: "Day case orthopaedic surgery, with a physiotherapy plan agreed before you are discharged",
    stay: "Day case",
  },
  {
    name: "Fracture fixation",
    note: "Inpatient orthopaedic surgery, with imaging taken in the same corridor as the clinic",
    stay: "Confirmed at your consultation",
  },
  {
    name: "Cataract surgery",
    note: "Day case, with lens options discussed at the first visit and a review the following day",
    stay: "Day case",
  },
  {
    name: "Gastroscopy or colonoscopy",
    note: "Sedation given by a consultant anaesthetist, with biopsy at the same sitting where indicated",
    stay: "Day procedure",
  },
  {
    name: "Obstetrics and delivery",
    note: "One consultant through to delivery, a separate obstetric theatre and neonatal support in the room",
    stay: "Confirmed with your consultant",
  },
  {
    name: "Gynaecology procedures",
    note: "Weekly clinics with ultrasound at the first visit, and female staff available on request",
    stay: "Day case",
  },
  {
    name: "ENT surgery",
    note: "Weekly adult and paediatric lists, with audiology assessment in the same unit",
    stay: "Confirmed at your consultation",
  },
];

/** Sits under the treatment rows, so the ranges above are not read as a quote. */
export const estimateNote =
  "Length of stay is what your surgeon expects, not a guarantee, and is confirmed at your consultation. A written estimate is given before treatment starts and covers the likely course of care, so nothing begins before you have it in writing. CT and MRI are not performed on site and are arranged by referral to a partner imaging centre.";

/** `#rooms`: the four categories the hospital actually offers, taken from
 *  `features/facilities/data/content`. Only the standard single carries a
 *  figure, because 10,000 LKR is the sole room price the repo publishes. */
export const roomTiles: RoomTile[] = [
  {
    tier: "One bed",
    name: "Super Deluxe Rooms",
    desc: "Bystander bed, sofa and chair, a pantry area with a tea station, coffee table and kettle, with morning papers brought up.",
    extra: "Separate steward service",
  },
  {
    tier: "One bed",
    name: "Deluxe Rooms",
    desc: "Bystander bed and sofa, a pantry area with a tea station, coffee table and hot water kettle.",
    extra: "Pantry with a tea station",
  },
  {
    tier: "One bed",
    name: "Standard Rooms",
    desc: "Bystander bed and chair, air conditioning, television and the medical support the room needs. The usual choice for a short procedure.",
    extra: "From 10,000 LKR",
  },
  {
    tier: "Two or three beds",
    name: "Wards",
    desc: "Individual bystander beds and chairs, bed separators for privacy and air conditioning, with day visiting.",
    extra: "Day visiting",
  },
];

/** Shared by every category, so the four tiles above do not repeat them. */
export const roomStandard: string[] = [
  "Hot & cool water",
  "Television",
  "Free wifi",
  "Air conditioning",
  "Bystander bed & chair",
  "Cleaned every two hours",
  "Medical support on call",
];

/** Chips inside the accent panel in `#insurance`. */
export const payChips: string[] = [
  "Written estimate before treatment",
  "Cash accepted",
  "Card payments",
  "Bank transfer",
  "Insurance paperwork at the desk",
  "10% off laboratory charges for outpatients",
];

/** The list beside the accent panel in `#insurance`. */
export const insuranceNotes: string[] = [
  "Documentation prepared for international insurers and travel policies",
  "The desk assists with the claim rather than leaving the paperwork to you",
  "Corporate insurance accepted at the outpatient department, the first in Negombo to do so",
  "Bring your insurance card or policy details with you to admission",
  "In an emergency you are assessed and stabilised first, and billing is settled afterwards",
];

/** `#stay`: the practical list beside the Negombo copy. */
export const practical: FactRow[] = [
  { k: "From the airport", v: "Ten minutes from Bandaranaike International" },
  { k: "Where we are", v: "229/10 St. Joseph Street, in central Negombo" },
  { k: "Parking", v: "Free, beside the main entrance" },
  { k: "Transfer", v: "Our own ambulance, available at any hour" },
  { k: "Payment", v: "Cash, card and bank transfer all accepted" },
  { k: "Time zone", v: "Five and a half hours ahead of GMT, no daylight saving" },
  { k: "Climate", v: "Warm and humid the year round" },
  { k: "Pharmacy", v: "On site and open at every hour" },
  { k: "Attendant", v: "One may stay overnight in every room category" },
  { k: "Any hour", v: "0117 84 84 84 reaches the hospital" },
];

export const faq: InternationalFaq[] = [
  {
    q: "How do I get an opinion before I fly?",
    a: "Email or WhatsApp your scans, laboratory reports, current medicine list and a short history to the international desk, and ask for a telemedicine consultation. That is a consultation with one of our doctors by video or by phone, booked daily, and it suits exactly this: a conversation that does not need an examination in person. Nobody should buy a ticket without having discussed the treatment with the doctor who would carry it out.",
  },
  {
    q: "How far is the hospital from the airport?",
    a: "Ten minutes. We are at 229/10 St. Joseph Street in central Negombo, which puts the hospital between the airport and the town rather than an hour away in Colombo. Our own ambulance is available for transfer and is dispatched from the covered bay that patients arrive through, and there is free parking beside the main entrance if someone is driving you.",
  },
  {
    q: "What should I bring with me to admission?",
    a: "Photo identification, and your OPD card if you have been here before. A referral letter if a doctor gave you one. Your current medicines, or a written list of them with the doses. Any previous test results or imaging, which saves repeating work that has already been done. And your insurance card or policy details, so the desk can start the paperwork rather than chase it later.",
  },
  {
    q: "What if I do not speak English?",
    a: "Our clinicians consult in English, and interpreters are arranged on request. Tell the desk which language you need before you travel rather than on the day, so the interpreter is there for the parts that matter: your consultation, the consent conversation before any procedure, and the discharge briefing where you are told what to do at home.",
  },
  {
    q: "Can a family member stay with me?",
    a: "Yes. Every room category, from the wards up to super deluxe, has a bystander bed and chair, and one attendant may stay overnight. Meals are prepared to the dietary orders noted at admission. General wards are open for day visiting; critical care visiting is kept to fixed hours that the unit desk will confirm, and a family member is called with an update once a day from the unit.",
  },
  {
    q: "Does my insurance work here?",
    a: "Documentation is prepared for international insurers and travel policies, and the desk assists with the claim instead of handing you a folder and wishing you luck. Corporate insurance is accepted at the outpatient department, which we were the first hospital in Negombo to offer. Send your policy details to the desk before you travel so you know where you stand, and bring the card with you to admission.",
  },
  {
    q: "How much will it cost?",
    a: "A written estimate is given before treatment starts, covering the likely course of care, and nothing begins until you have it. What it comes to depends on the operation, the room you choose and how long you stay, which is why the estimate follows your reports rather than a price list. Rooms start at 10,000 LKR a night for a standard single, and outpatients get a 10% discount on laboratory charges.",
  },
  {
    q: "Can I have a CT or MRI scan here?",
    a: "Not on site. CT and MRI are arranged by referral to a partner imaging centre, and the desk books that as part of your care rather than sending you off to organise it. Everything else is here: digital X-ray read and reported within the hour and available overnight, ultrasound at the visit, and laboratory work reported the same day with every report checked by two doctors before release.",
  },
  {
    q: "What records do I take home?",
    a: "Copies of your reports, your imaging referrals and your discharge summary, along with a discharge plan that carries a follow-up date rather than a vague instruction to see someone. With your consent the same pack is sent to your own doctor at home, so the person who sees you next is working from what actually happened here.",
  },
  {
    q: "How soon can I fly home after surgery?",
    a: "It depends entirely on the operation, so ask your surgeon before you book the return leg and prefer a ticket you can change. Where the recovery runs past your flight, telemedicine keeps the same doctor involved once you have travelled: a video or phone review, booked daily, rather than starting again with somebody who has never seen your chart.",
  },
];

/** Chips inside the accent panel in `#enquiry`. */
export const enquiryChips: string[] = [
  "Scans and reports",
  "Current medicines",
  "Photo ID or passport",
  "Insurance details",
];
