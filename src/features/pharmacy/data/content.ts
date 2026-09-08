import type {
  BookAction,
  Counter,
  FactRow,
  JumpCard,
  PharmacyFaq,
  Refill,
  SafetyCard,
  StockRow,
  Step,
} from "../types";

/**
 * Every claim on this page traces back to the `pharmacy` and
 * `medicine-delivery` entries in `@/features/services/data/atHome`, which are
 * the repo's authority on what the counter actually does. The design reference
 * this page is built from asserted a good deal more (a separate A&E counter and
 * ward dispensing window, a 6pm same-day delivery cutoff, cash-or-card on
 * delivery, cold-chain temperature logs, batch-level recall tracing, travel
 * vaccination, a bound controlled-medicines register). None of that is backed
 * here, so none of it survived: the layout is the reference's, the facts are
 * the repo's.
 */

/**
 * The hero's own copy, moved here out of PharmacyHero so it can be
 * translated. `call.value` is the counter's own phone number: a fact, not a
 * label, so it stays untranslated the same way `bookActions[1].value` does,
 * and `bookActions[1].value` reads this field rather than repeating the
 * digits as a second string with a second home.
 */
export const hero = {
  strapline: "The counter never closes",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Pharmacy",
  headingLead: "Authorized",
  headingOutline: "medicine.",
  headingAccent: "Nothing else.",
  sendCta: "Send a prescription",
  call: { value: "074 222 333 4" },
};

export const heroStandfirst =
  "Verified stock only, dispensed by pharmacists who can read your file, at any hour of the night. No substitutes without asking you first, and no grey market supply, ever.";

export const sectionEyebrows = {
  counters: "01 / Where to find us",
  standards: "02 / How we dispense",
  stock: "03 / What we stock",
  delivery: "04 / Delivery",
  refills: "05 / Repeat prescriptions",
  safety: "06 / Safety & records",
  faq: "07 / Questions",
  book: "08 / Start here",
};

export const tickerItems = [
  "A pharmacist on the counter, at every hour",
  "Every order read against your hospital file",
  "Authorized stock only, no substitutes",
  "Delivery across Negombo",
  "Send your prescription on WhatsApp",
];

/** Fact strip along the bottom of the hero. */
export const heroFacts: FactRow[] = [
  { k: "Counter hours", v: "Open 24 hours" },
  { k: "Stock", v: "Authorized only" },
  { k: "Prescriptions", v: "Kept on file" },
  { k: "Delivery", v: "Across Negombo" },
];

export const jumpCards: JumpCard[] = [
  {
    count: "One counter",
    label: "Where to find us",
    note: "Ground floor, open at every hour of the night.",
    href: "#counters",
  },
  {
    count: "10 categories",
    label: "What we stock",
    note: "Prescription, over the counter and supplies.",
    href: "#stock",
  },
  {
    count: "4 steps",
    label: "Delivery",
    note: "Send your prescription, we bring it.",
    href: "#delivery",
  },
  {
    count: "Digital",
    label: "Repeat prescriptions",
    note: "Held on file, reordered without the paper.",
    href: "#refills",
  },
];

export const countersHeading = { line1: "One counter,", line2: "one record" };
export const countersIntro =
  "However your order reaches us, at the counter, from a consultation or by phone, the pharmacist reads the same prescription history, so nothing gets dispensed twice.";

/**
 * One counter doing three jobs, not the reference's three separate counters:
 * the catalog puts both pharmacy entries at "Ground floor, pharmacy counter"
 * and describes no second window.
 */
export const counters: Counter[] = [
  {
    where: "At the counter",
    name: "Outpatient dispensing",
    desc: "The ground floor counter serves clinic patients, walk-in purchases and collections. Bring your prescription, or have it sent through from your consultation, and a pharmacist checks it against your file before it is prepared.",
    hours: "Open 24 hours",
  },
  {
    where: "After an admission",
    name: "Discharge medicine",
    desc: "Medicine to take home after a stay is dispensed from the same counter, against what your consultant wrote. Anything you are unsure of can be gone through before you leave, rather than read off a label at home.",
    hours: "Open 24 hours",
  },
  {
    where: "For delivery",
    name: "Delivery orders",
    desc: "Orders that go out for delivery are filled from this counter's stock, so the same authorized medicine is used whether you collect it or we bring it. A pharmacist checks each one before it is dispatched.",
    hours: "Daily",
  },
];

export const standardsHeading = { line1: "A pharmacist", line2: "reads it, not", line3: "just a shelf" };
export const standardsIntro =
  "Every prescription is checked by a pharmacist against your hospital record before anything is packed. Because they can read your file, they can flag an interaction with something else you are taking, or confirm a dose against what your doctor prescribed.";
export const standardsNote =
  "We hold authorized stock only, with no substitutes and no grey market supply, so what your consultant wrote is what you are handed.";
export const standardsCta = "Set up a repeat prescription";

export const standards: FactRow[] = [
  { k: "Prescription review", v: "By a pharmacist" },
  { k: "Checked against", v: "Your hospital file" },
  { k: "Interaction check", v: "Before it is handed over" },
  { k: "Substitutes", v: "Not used" },
  { k: "Supply", v: "Authorized stock only" },
  { k: "Grey market", v: "Never" },
  { k: "Records", v: "Digital, on file" },
  { k: "Counselling", v: "Offered at the counter" },
  { k: "Delivery orders", v: "Checked before dispatch" },
];

export const stockHeading = { line1: "On the", line2: "shelves", line3: "tonight" };
export const stockIntro =
  "Prescription medicine, everyday over the counter items, and the dressings and supplies patients actually need at home after a procedure.";
export const stockCta = "Check availability";

export const stock: StockRow[] = [
  {
    name: "Prescription medicine",
    note: "The range our consultants prescribe, across every department",
    tag: "On file",
  },
  {
    name: "Antibiotics",
    note: "Dispensed only against a valid prescription",
    tag: "Rx only",
  },
  {
    name: "Chronic medicine",
    note: "Blood pressure, diabetes, thyroid, cardiac and asthma maintenance",
    tag: "Refillable",
  },
  {
    name: "Paediatric medicine",
    note: "Dispensed against the dose your paediatrician prescribed",
    tag: "Rx only",
  },
  {
    name: "Discharge medicine",
    note: "The short course you go home with after an admission",
    tag: "On file",
  },
  {
    name: "Over the counter",
    note: "Medicine that is legally available without a prescription",
    tag: "No Rx",
  },
  {
    name: "Wound care and dressings",
    note: "Dressings, tapes and antiseptics for changing a dressing at home",
    tag: "No Rx",
  },
  {
    name: "First aid supplies",
    note: "The contents of a household or workplace first aid kit",
    tag: "No Rx",
  },
  {
    name: "Home health devices",
    note: "Devices for monitoring at home, such as blood pressure monitors and thermometers",
    tag: "No Rx",
  },
  {
    name: "Baby and mother care",
    note: "Feeding supplies, nappy care and postnatal essentials",
    tag: "No Rx",
  },
];

export const deliveryHeading = { line1: "Photograph it,", line2: "send it, done" };
export const sendingWellHeading = "Sending a prescription well";
export const deliveryDetailHeading = "Delivery detail";

export const steps: Step[] = [
  {
    no: "01",
    title: "Send it",
    desc: "Send your prescription, or a clear photo of one, to the pharmacy counter on WhatsApp, or call and talk it through.",
  },
  {
    no: "02",
    title: "Pharmacist check",
    desc: "A pharmacist reads the order against your record before anything is prepared, the same check an order at the counter gets.",
  },
  {
    no: "03",
    title: "Prepared",
    desc: "Your order is filled from the counter's own authorized stock, with over the counter items added to the same order if you want them.",
  },
  {
    no: "04",
    title: "Delivered",
    desc: "Dispatched for delivery across Negombo, with any question you have afterwards directed back to the counter.",
  },
];

export const sendingWell = [
  "Photograph the whole page, corner to corner, in good light",
  "Include the doctor's name, the date and the signature in the frame",
  "Tell us about anything else you take daily, so it can be checked",
  "Keep a phone number reachable in case the pharmacist has a question",
];

export const deliveryFacts: FactRow[] = [
  { k: "Coverage", v: "Across Negombo" },
  { k: "Runs", v: "Daily" },
  { k: "Filled from", v: "Our own counter" },
  { k: "Prescriptions", v: "Photos accepted" },
  { k: "Check", v: "Pharmacist, before dispatch" },
  { k: "Order by", v: "WhatsApp or phone" },
];

export const refillsHeading = { line1: "Chronic care", line2: "without the", line3: "paper chase" };
export const refillsIntro =
  "If you take medicine every day for blood pressure, diabetes, thyroid, asthma or heart disease, your prescription is kept on file digitally, so you do not have to carry the paper each time.";
export const refillsNote =
  "Ask for a repeat at the counter, by phone or on WhatsApp. A pharmacist checks it against your record before it is prepared, and it can go out with a delivery.";
export const refillsCta = "Request a refill";
export const refillsPhoneCta = "Ask a pharmacist";

export const refills: Refill[] = [
  { name: "Blood pressure", note: "Daily maintenance medicine" },
  { name: "Diabetes", note: "Oral medicine and supplies" },
  { name: "Thyroid", note: "Daily replacement medicine" },
  { name: "Cardiac medicine", note: "As your consultant prescribed" },
  { name: "Asthma inhalers", note: "Reliever and preventer" },
  { name: "Cholesterol", note: "Daily maintenance medicine" },
  { name: "Discharge medicine", note: "The short course after an admission" },
];

export const safetyHeading = { line1: "Checked before", line2: "it reaches you" };
export const safetyIntro =
  "Nothing is handed over on the strength of the paper alone. Every order is read against your record first, and everything on the shelf is authorized stock.";

export const safety: SafetyCard[] = [
  {
    no: "01",
    name: "Authorized supply",
    desc: "Everything held at the counter is authorized stock. Nothing on the shelf comes from grey market supply.",
  },
  {
    no: "02",
    name: "No substitutes",
    desc: "Your prescription is dispensed as it was written. A different brand is not quietly swapped in for the one your doctor chose.",
  },
  {
    no: "03",
    name: "Pharmacist check",
    desc: "A pharmacist reads every order before it is prepared, whether you are standing at the counter or ordering a delivery.",
  },
  {
    no: "04",
    name: "Your hospital file",
    desc: "Pharmacists dispensing your medicine can see your file, so an interaction with something else you take can be flagged before you leave.",
  },
  {
    no: "05",
    name: "Dose confirmation",
    desc: "A dose is confirmed against what your doctor prescribed, which is how a duplicate or a wrong strength gets caught on paper.",
  },
  {
    no: "06",
    name: "Digital records",
    desc: "Prescriptions are kept on file digitally, so a repeat order or a query from another department does not depend on your paperwork.",
  },
  {
    no: "07",
    name: "Prescription only medicine",
    desc: "Antibiotics and controlled medicines are dispensed only against a valid prescription, never over the counter on request.",
  },
  {
    no: "08",
    name: "Counselling",
    desc: "Timing, food interactions, what to do about a missed dose and which side effects are worth calling about, explained at the counter.",
  },
];

export const faq: PharmacyFaq[] = [
  // First, as in the reference. Cut on the first pass because the catalog does
  // not mention external prescriptions; restored on the user's confirmation
  // that the counter does accept them, in their own wording.
  {
    q: "Do you accept prescriptions from doctors outside the hospital?",
    a: "Yes. We dispense prescriptions written by our own doctors and by any registered practitioner elsewhere. Bring the original or send a clear photograph, and our pharmacist will check it before dispensing.",
  },
  {
    q: "Is the pharmacy open at night?",
    a: "Yes. The counter is open 24 hours, on the ground floor. Collection is possible at any hour, which is what makes an urgent prescription after a night admission straightforward.",
  },
  {
    q: "Will I always get the exact medicine prescribed?",
    a: "Yes. The counter stocks authorized medicine only, with no substitutes and no grey market supply, so what your consultant wrote is what you are handed.",
  },
  {
    q: "Do pharmacists know what else I am taking?",
    a: "Pharmacists dispensing your medicine can read your hospital file, which lets them check a new order against what you are already on before handing it over. Tell the pharmacist about anything you take that is not on the file.",
  },
  {
    q: "Can I reorder a repeat prescription easily?",
    a: "Yes. Prescriptions are kept on file digitally, so a repeat order does not depend on you carrying the paper each time. Ask at the counter, by phone, or on WhatsApp.",
  },
  {
    q: "Can I send a photo of my prescription?",
    a: "Yes. A clear photo is accepted to start a delivery order, which helps if you cannot bring the original in person. Photograph the whole page, and include the doctor's name, the date and the signature.",
  },
  {
    q: "Where does delivery cover?",
    a: "Delivery covers Negombo and runs daily. Orders are filled from the hospital's own pharmacy counter, so delivery uses the same authorized stock as an order collected in person.",
  },
  {
    q: "Is my delivery order checked before it is sent out?",
    a: "Yes. A pharmacist checks every order before it is dispatched, in the same way an order at the counter is checked. Any question afterwards comes back to the counter, not to a courier.",
  },
  {
    q: "Can I order over the counter items too?",
    a: "Yes. Over the counter medicine and supplies can be added to the same delivery order as a prescription. Antibiotics and controlled medicines still need a valid prescription.",
  },
];

export const faqHeading = "Asked at the counter";

export const bookHeading = { line1: "Open right", line2: "now. Yes,", line3: "right now." };

// "229/10 St. Joseph Street" never changes script: it is the address a driver
// is shown, the same reason contact's own `contactRows[0].note` and `mapIntro`
// keep it untranslated in Sinhala and Tamil. "Negombo" does translate there.
export const bookIntro =
  "Ground floor at 229/10 St. Joseph Street, Negombo. Walk up to the counter, call, or send your prescription on WhatsApp.";

/**
 * The three actions closing `#book`. `bookActions[0].label` reuses
 * `hero.sendCta` and `bookActions[1].value` reuses `hero.call.value`, rather
 * than each repeating its own copy of the same string: a string used twice
 * has one home.
 *
 * `bookActions[1]` used to carry the counter's phone number as its own
 * `label`, with no separate action phrase, so the row rendered as bare
 * digits in every language including English, the same bug `home-care`'s
 * `contactRows[0]` had. `label` now carries the action ("Call the counter"),
 * and the digits live in `value`, excluded from parity the same way
 * `hero.call.value` is.
 */
export const bookActions: BookAction[] = [
  { label: hero.sendCta, href: "https://wa.me/94742223334", glyph: "arrow" },
  { label: "Call the counter", value: hero.call.value, href: "tel:+94742223334", glyph: "phone" },
  { label: "All services", href: "/services", glyph: "arrow", internal: true },
];
