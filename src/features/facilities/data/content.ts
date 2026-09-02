/**
 * Copy for the /facilities page.
 *
 * Every claim here is traceable to something the repo already asserts, mostly
 * `features/services/data/*` and `features/accommodation/components/RoomTypes`.
 * The visual design comes from the Claude Design reference, but that reference's
 * copy invented specifics this hospital has never published: a
 * department-per-floor plan, named HDU/SICU/NCU units, clock-time visiting
 * hours, a theatre count, radiology licensing and generator switchover times.
 * Those are deliberately absent, and content.test.ts fails if they return.
 */

/** One zone in the building walkthrough. */
export type BuildingZone = { no: string; name: string; contents: string };

/** A photo card in the showcase strip. */
export type ShowcaseCard = {
  no: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  photo: string;
  photoAlt: string;
};

/** A key/value row in a spec list. */
export type SpecRow = { k: string; v: string };

/** A monitored-care unit. */
export type CareUnit = { code: string; name: string; desc: string; lead: string };

/** A room category, priced only where the repo states a price. */
export type RoomRow = {
  name: string;
  occupancy: string;
  amenities: string;
  price: string;
};

/** A diagnostic capability, with the turnaround the repo publishes for it. */
export type EquipmentRow = { name: string; note: string; avail: string };

/** A round-the-clock service in the support grid. */
export type SupportRow = { no: string; name: string; desc: string };

/** Two lines of a section heading. */
export type Heading2 = { line1: string; line2: string };

/** Three lines of a section heading. */
export type Heading3 = { line1: string; line2: string; line3: string };

/**
 * One of the closing `#book` rows. `value` is a fact alongside its own
 * translatable `label` (only the phone row has one, the hospital's own
 * number), the same role `contact`'s, `network`'s, `accommodation`'s,
 * `home-care`'s, `pharmacy`'s and `school-wellness`'s own `value` fields play.
 * `internal` marks the one row that is a route on this site rather than a
 * phone number or an external site, so BookSection can send it through
 * `LocaleLink` and keep a reader in the language they are already reading.
 */
export type ContactRow = {
  label: string;
  value?: string;
  href: string;
  glyph: "arrow" | "phone";
  internal?: boolean;
};

/**
 * The hero's own copy, moved here out of FacilitiesHero so it can be
 * translated. `call.value` is the hospital's own switchboard number: a fact,
 * not a label, so it stays untranslated the same way `contactRows[2].value`
 * and `ambulanceCall.value` do, and both of those read this field rather than
 * repeating the digits as a second and third copy of the same string.
 */
export const hero = {
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Facilities",
  headingLead: "Built like a",
  // Kept in English: the abbreviation for the surgical and cleaning standard
  // this building is built to, the same way `theatreSpecs`' "US standard" and
  // `hygieneRows`' "US specification" keep it, and the way `network`'s own
  // content.si.ts and content.ta.ts keep "US" in "US Standard care" rather
  // than spelling the country name out. See KEEPS_ENGLISH in
  // content.i18n.test.ts.
  headingAccent: "US",
  headingTail: "facility.",
  walkCta: "Walk the building",
  call: { value: "0117 84 84 84" },
};

export const heroStandfirst =
  "Six purpose built floors in Negombo: operating theatres with the recovery bay next door, monitored critical care beside them, a laboratory that never closes, and rooms where your family can actually stay the night.";

/**
 * Every value below is reused verbatim from navigationLabels.si.ts and
 * navigationLabels.ta.ts, where that file already translates the same
 * English phrase for this page's own header and footer links ("The
 * building", "Operating theatres", "Critical care", "Rooms & wards",
 * "Diagnostics", "Ambulance & transfers"): see the numbered comments beside
 * each field in content.si.ts and content.ta.ts. "Around the clock",
 * "Hygiene & safety", "For visitors" and "Come and look" have no nav
 * equivalent and are translated fresh.
 */
export const sectionEyebrows = {
  building: "01 / The building",
  theatres: "02 / Operating theatres",
  critical: "03 / Critical care",
  rooms: "04 / Rooms & wards",
  diagnostic: "05 / Diagnostics",
  ambulance: "06 / Ambulance & transfers",
  support: "07 / Around the clock",
  hygiene: "08 / Hygiene & safety",
  visiting: "09 / For visitors",
  book: "10 / Come and look",
};

export const heroFacts: SpecRow[] = [
  { k: "Floors", v: "Six, purpose built" },
  { k: "Cleaning cycle", v: "Every two hours" },
  { k: "Laboratory", v: "Open 24 hours" },
  { k: "Rooms from", v: "10,000 LKR" },
];

export const tickerItems: string[] = [
  "Covered ambulance bay",
  "Laboratory open 24 hours",
  "Sterile instrument tracking",
  "Attendant space in every room",
  "Free parking and wifi",
  "Cleaned every two hours",
];

export const jumpCards: { count: string; label: string; note: string; href: string }[] = [
  {
    count: "6 floors",
    label: "The building",
    note: "Which departments sit together, and why.",
    href: "#floors",
  },
  {
    count: "Monitored beds",
    label: "Critical care",
    note: "Intensive care beside the theatres.",
    href: "#critical",
  },
  {
    count: "4 categories",
    label: "Rooms & wards",
    note: "From a shared ward to a super deluxe room.",
    href: "#rooms",
  },
  {
    count: "24 hours",
    label: "Ambulance",
    note: "Our own fleet, dispatched from our own bay.",
    href: "#ambulance",
  },
];

/**
 * The building described as zones rather than storeys. The hospital publishes
 * that it is six floors and that A&E is on the ground floor, but not which
 * department occupies which level, so these rows group departments that work
 * together instead of assigning each one a floor it may not be on.
 */
export const buildingHeading: Heading2 = { line1: "Six floors, one", line2: "building" };
export const buildingIntro =
  "Departments that work together sit together, so a scan ordered in a clinic does not become a journey across town.";

export const buildingZones: BuildingZone[] = [
  {
    no: "01",
    name: "Emergency & arrival",
    contents:
      "Covered ambulance entrance, resuscitation bay, admissions desk, 24 hour pharmacy and parking beside the main door.",
  },
  {
    no: "02",
    name: "Clinics & outpatients",
    contents:
      "Consulting suites for every specialty, an outpatient department open 24 hours, and physiotherapy.",
  },
  {
    no: "03",
    name: "Diagnostics",
    contents:
      "A 24 hour laboratory, digital X-ray, ultrasound, ECG and echocardiography, and the endoscopy unit.",
  },
  {
    no: "04",
    name: "Theatres & recovery",
    contents:
      "Operating theatres with a recovery bay alongside, a dedicated obstetric theatre kept separate from general lists, and sterile services.",
  },
  {
    no: "05",
    name: "Critical care",
    contents:
      "Intensive care beds placed beside the theatres and the emergency department, with neonatal support for newborns who need it.",
  },
  {
    no: "06",
    name: "Wards & rooms",
    contents:
      "Standard, deluxe and super deluxe rooms, shared wards with bed separators, nursing stations and family waiting space.",
  },
];

export const showcaseCards: ShowcaseCard[] = [
  {
    no: "01",
    title: "Ambulance bay",
    body: "A covered entrance with the resuscitation bay directly behind it, staffed at every hour of the day.",
    linkLabel: "Accident & Emergency",
    href: "/services/accident-emergency",
    photo: "/images/hero-exterior.png",
    photoAlt: "St. Joseph Hospital exterior and ambulance entrance",
  },
  {
    no: "02",
    title: "Reception & admissions",
    body: "One desk for registration and admission, with seating that is a waiting area rather than a corridor.",
    linkLabel: "How admission works",
    href: "/services#admissions",
    photo: "/images/welcome.jpg",
    photoAlt: "Hospital reception desk",
  },
  {
    no: "03",
    title: "Diagnostic corridor",
    body: "The laboratory, digital X-ray and ultrasound sit metres from the consulting suites and the emergency bay.",
    linkLabel: "Diagnostics & radiology",
    href: "/services#diagnostics",
    photo: "/images/doctors.jpg",
    photoAlt: "Clinical team reviewing a patient's results",
  },
  {
    no: "04",
    // Reuses `buildingZones[3].name` rather than a second copy of the same
    // phrase: a string used twice has one home.
    title: buildingZones[3].name,
    body: "Operating suites with the recovery bay next door and one nurse assigned to each patient coming out of theatre.",
    linkLabel: "Inside the theatres",
    href: "#theatres",
    photo: "/images/facilities/operating-theatre.jpg",
    photoAlt: "An operating theatre prepared for surgery",
  },
];

/**
 * Headline figures for the theatre section. All three are repo-backed.
 *
 * Split into prefix / number / suffix so <AnimatedCounter> can count the
 * numeric part up when the section scrolls in: "1:" + 1, then 0, then 24 + "h".
 */
export const theatresHeading: Heading3 = {
  line1: "Tracked steel,",
  line2: "single use,",
  line3: "one nurse each",
};
export const theatresIntro1 =
  "Our theatres run to US surgical protocol, with tracking on every instrument set. Instruments and consumables are single use for each patient, without exception.";
export const theatresIntro2 =
  "A recovery nurse is assigned to watch over you from the moment you leave theatre until you are ready for a ward bed or for home. Surgical and anaesthetic teams stay on call, so emergency surgery happens here rather than after a transfer.";

export const theatreFigures: { prefix?: string; value: number; suffix?: string; label: string }[] = [
  { prefix: "1:", value: 1, label: "Recovery nursing" },
  { value: 0, label: "Reused consumables" },
  { value: 24, suffix: "h", label: "On call theatre cover" },
];

export const theatreSpecs: SpecRow[] = [
  { k: "Protocol", v: "US standard" },
  { k: "Instrument sets", v: "Tracked per set" },
  { k: "Consumables", v: "Single use, per patient" },
  { k: "Anaesthesia", v: "Consultant led" },
  { k: "Recovery bay", v: "Beside the theatres" },
  // Reuses `theatreFigures[0].label` rather than a second copy of the same
  // phrase: a string used twice has one home.
  { k: theatreFigures[0].label, v: "One to one" },
  { k: "Obstetric theatre", v: "Kept separate" },
  { k: "Emergency cover", v: "On call, 24 hours" },
];

export const criticalHeading: Heading2 = { line1: "Beds that watch", line2: "you all night" };
export const criticalIntro =
  "Monitored beds for patients who need ventilation, close observation after surgery, or stabilising before anything else can happen.";

export const careUnits: CareUnit[] = [
  {
    code: "ICU",
    name: "Intensive care",
    desc: "Monitored beds for patients who need ventilation or close observation, placed beside the theatres and the emergency department.",
    // Reuses `theatreSpecs[3].v` ("Anaesthesia": "Consultant led") rather than
    // a second copy of the same phrase: a string used twice has one home.
    lead: theatreSpecs[3].v,
  },
  {
    code: "PACU",
    name: "Post-operative recovery",
    desc: "A recovery bay adjoining the operating theatres, where one nurse is assigned to each patient until they are ready to move.",
    lead: "One to one nursing",
  },
  {
    code: "NEO",
    name: "Newborn support",
    desc: "Neonatal support present at delivery whenever the baby's condition calls for it, alongside the obstetric theatre.",
    lead: "Paediatric team",
  },
];

export const careNotes: { title: string; body: string }[] = [
  {
    title: "No transfer out",
    body: "Because the unit sits beside the operating theatres and the emergency department, a patient who deteriorates on the ward or after surgery is moved straight in rather than transferred to another hospital.",
  },
  {
    title: "Visiting",
    body: "Visiting the unit is kept to fixed hours so patients can rest and the team can work without interruption. The ICU desk will tell you the current times.",
  },
  {
    title: "Family updates",
    body: "A family member is called with an update once a day, and the unit coordinator handles visiting arrangements and the move back to a ward bed.",
  },
];

/**
 * The four categories the hospital actually offers, taken from
 * `features/accommodation/components/RoomTypes`. Only the entry private room
 * carries a figure, because "private and semi private rooms from 10,000 LKR"
 * is the sole room price the repo publishes.
 */
export const roomsHeading: Heading2 = { line1: "Four ways to", line2: "spend the night" };
export const roomsIntro =
  "Every category is cleaned on the same two hour cycle. What changes is space, privacy and how much room your family gets.";

export const roomRows: RoomRow[] = [
  {
    name: "Super Deluxe Rooms",
    occupancy: "1 bed",
    amenities:
      "Bystander bed, sofa and chair, pantry with tea station, coffee table, kettle, morning papers, separate steward service",
    price: "On request",
  },
  {
    name: "Deluxe Rooms",
    occupancy: "1 bed",
    amenities: "Bystander bed and sofa, pantry area with tea station, coffee table, hot water kettle",
    price: "On request",
  },
  {
    name: "Standard Rooms",
    occupancy: "1 bed",
    amenities: "Bystander bed and chair, air conditioning, television, necessary medical support",
    price: "From 10,000 LKR",
  },
  {
    name: "Wards",
    occupancy: "2 or 3 beds",
    amenities:
      "Individual bystander beds and chairs, bed separators for privacy, air conditioning, day visiting",
    price: "On request",
  },
];

export const roomsStandardHeading = "In every category";
export const roomsExtrasHeading = "Small things that help";
export const roomsCta = "See the rooms";
export const roomsNote =
  "Room rates cover accommodation and nursing care. Doctor visits, medicine, tests and procedures are billed separately and appear on your interim bill.";

/** Shared by every category, so the table above does not repeat them. */
export const roomStandard: string[] = [
  "Hot & cool water",
  "Television",
  "Free wifi",
  "Air conditioning",
  "Bystander bed & chair",
  "Cleaned every two hours",
  "Medical support on call",
];

export const roomExtras: string[] = [
  "A separate steward service in super deluxe rooms",
  "A pantry area with a tea station in deluxe and super deluxe rooms",
  "Morning papers in super deluxe rooms",
  "A complimentary fruit or chocolate basket on discharge from the wards",
];

export const diagnosticHeading: Heading3 = { line1: "The machines,", line2: "and who", line3: "reads them" };
export const diagnosticIntro =
  "Equipment is worth nothing without the discipline around it. Every laboratory report is checked by two doctors before it is released, and X-rays are read and reported by a radiologist within the hour.";
export const diagnosticCta = "Diagnostic services";

/**
 * Every equipment name below stays in English in every translation: X-ray,
 * Ultrasound, CT and MRI are how these are said in Sinhala and Tamil too, the
 * same way `about`'s and `international-care`'s own overlays keep "Digital
 * X-ray", "Ultrasound", "Biochemistry", "Gastroscopy", "Colonoscopy" and
 * "Biopsy" in English throughout. See KEEPS_ENGLISH in content.i18n.test.ts.
 */
export const equipment: EquipmentRow[] = [
  { name: "Digital X-ray", note: "Read and reported by a radiologist", avail: "Within an hour" },
  { name: "Ultrasound", note: "Abdominal, antenatal and soft tissue scanning", avail: "At the visit" },
  {
    name: "Haematology & biochemistry",
    note: "Full blood count, metabolic and biochemistry panels",
    avail: "Same day",
  },
  { name: "Microbiology & cultures", note: "Infection screening and culture testing", avail: "As cultures complete" },
  { name: "Histopathology", note: "Tissue and biopsy analysis", avail: "Via our service" },
  { name: "ECG & echocardiography", note: "Resting ECG and cardiac risk assessment", avail: "Same day" },
  {
    name: "Endoscopy",
    note: "Gastroscopy and colonoscopy, with biopsy at the same sitting",
    avail: "Same day",
  },
  {
    name: "CT & MRI",
    note: "Not performed on site; sent to a partner imaging centre",
    avail: "By referral",
  },
];

export const ambulanceHeading: Heading3 = {
  line1: "Treatment",
  line2: "starts in the",
  line3: "vehicle",
};
export const ambulanceIntro1 =
  "Our own ambulances are on call around the clock and dispatched from the same covered bay that patients arrive through, so care begins before you reach the door.";
export const ambulanceIntro2 =
  "The laboratory and digital X-ray sit metres from that bay, so bloods and films come back while you are still being assessed. We are ten minutes from Bandaranaike International, and our own ambulance is available for transfer.";

/**
 * The tel: CTA that closes the ambulance band. `value` reuses `hero.call`
 * rather than repeating the hospital's own number as a third copy of the
 * same digits (`contactRows[2].value` is the second).
 */
export const ambulanceCall: ContactRow = {
  label: "Call an ambulance",
  value: hero.call.value,
  href: "tel:+94117848484",
  glyph: "phone",
};

export const ambulanceSpecs: SpecRow[] = [
  { k: "Availability", v: "24 hours" },
  { k: "Fleet", v: "Our own" },
  { k: "Dispatched from", v: "Our own bay" },
  { k: "Arrival bay", v: "Covered" },
  { k: "Lab & X-ray", v: "Metres away" },
  { k: "Airport", v: "Ten minutes" },
];

export const supportHeading: Heading2 = { line1: "Open when you", line2: "need it open" };
export const supportIntro =
  "A hospital is judged at three in the morning. These eight are staffed or on call whenever you arrive.";

export const support: SupportRow[] = [
  {
    no: "01",
    name: "Accident & emergency",
    desc: "A resuscitation bay staffed around the clock, where triage starts before any paperwork does.",
  },
  {
    no: "02",
    name: "Laboratory",
    desc: "Open at every hour, with every report checked by two doctors before it is released.",
  },
  {
    no: "03",
    name: "Digital X-ray",
    desc: "Available overnight as well as in clinic hours, read and reported within the hour.",
  },
  {
    no: "04",
    name: "Outpatient department",
    desc: "Consulting suites open 24 hours, staffed alongside the emergency entrance whenever you arrive.",
  },
  {
    no: "05",
    name: "Pharmacy",
    desc: "A 24 hour dispensary on site, so a prescription written at night can be filled the same night.",
  },
  {
    no: "06",
    name: "Ambulance dispatch",
    desc: "Our own fleet on call and dispatched from the same covered bay that patients arrive through.",
  },
  {
    no: "07",
    name: "Sterile services",
    desc: "Tracking on every instrument set, with consumables single use for each patient without exception.",
  },
  {
    no: "08",
    name: "On call surgical cover",
    desc: "Surgical and anaesthetic teams on call, so emergency surgery happens here rather than after a transfer.",
  },
];

export const hygieneHeading: Heading3 = { line1: "Cleaned every", line2: "two hours,", line3: "by the clock" };
export const hygieneIntro =
  "Infection control is a schedule, not a slogan. Every surface in the building is cleaned on a two hour cycle to US specification.";
export const hygieneCaption = "Consumables are single use, and never reused";

export const hygieneRows: SpecRow[] = [
  { k: "Cleaning cycle", v: "Every two hours" },
  { k: "Standard", v: "US specification" },
  { k: "Consumables", v: "Single use, never reused" },
  { k: "Instrument sets", v: "Tracked per set" },
  { k: "Obstetric theatre", v: "Separate from general lists" },
  { k: "Laboratory reports", v: "Checked by two doctors" },
];

export const visitorsHeading: Heading2 = { line1: "Getting here,", line2: "and waiting well" };
export const visitorsIntro =
  "Ten minutes from Bandaranaike International Airport, on St. Joseph Street in central Negombo.";

export const visitingCardHeading = "Visiting";
export const visitingRows: SpecRow[] = [
  { k: "General wards", v: "Day visiting" },
  { k: "Critical care", v: "Fixed hours" },
  { k: "Family update", v: "Once a day from the unit" },
  { k: "Attendant", v: "May stay overnight" },
];
export const visitingNote = "The ward or unit desk will confirm the current times before you travel.";

export const gettingHereHeading = "Getting here";
export const gettingHere: string[] = [
  "229/10 St. Joseph Street, Negombo",
  "Ten minutes from Bandaranaike International Airport",
  "Free parking beside the main entrance",
  "Our own ambulance available for transfer",
];

export const whileYouWaitHeading = "While you wait";
export const comforts: string[] = [
  "Free parking",
  "Free wifi",
  "Cafeteria",
  "Patient lounge",
  "Wheelchair access",
  "24 hour pharmacy",
  "Card payments",
  "Quiet visiting hours",
];

export const bookHeading: Heading3 = { line1: "See the rooms", line2: "before you", line3: "need them." };
export const bookIntro =
  "Ask at reception and we will show you a room and the ward. No appointment, and no sales talk.";

/**
 * The three rows closing `#book`. `contactRows[2]` used to carry the
 * hospital's own number as its whole `label`, with no separate action
 * phrase, so it rendered as bare digits with no translatable text at all, in
 * every language including English, the same bug `contact`'s,
 * `accommodation`'s, `home-care`'s, `pharmacy`'s, `network`'s and
 * `school-wellness`'s own contact rows had. `label` now carries the action
 * ("Call the hospital"), and the digits live in `value`, reusing `hero.call`
 * rather than a fourth copy of the same string.
 */
export const contactRows: ContactRow[] = [
  { label: "Reserve a room", href: "/accommodation", glyph: "arrow", internal: true },
  { label: "Message on WhatsApp", href: "https://wa.me/94742223334", glyph: "arrow" },
  { label: "Call the hospital", value: hero.call.value, href: "tel:+94117848484", glyph: "phone" },
];
