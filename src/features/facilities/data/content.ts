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
    title: "Theatres & recovery",
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
  { k: "Recovery nursing", v: "One to one" },
  { k: "Obstetric theatre", v: "Kept separate" },
  { k: "Emergency cover", v: "On call, 24 hours" },
];

export const careUnits: CareUnit[] = [
  {
    code: "ICU",
    name: "Intensive care",
    desc: "Monitored beds for patients who need ventilation or close observation, placed beside the theatres and the emergency department.",
    lead: "Consultant led",
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

export const ambulanceSpecs: SpecRow[] = [
  { k: "Availability", v: "24 hours" },
  { k: "Fleet", v: "Our own" },
  { k: "Dispatched from", v: "Our own bay" },
  { k: "Arrival bay", v: "Covered" },
  { k: "Lab & X-ray", v: "Metres away" },
  { k: "Airport", v: "Ten minutes" },
];

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

export const hygieneRows: SpecRow[] = [
  { k: "Cleaning cycle", v: "Every two hours" },
  { k: "Standard", v: "US specification" },
  { k: "Consumables", v: "Single use, never reused" },
  { k: "Instrument sets", v: "Tracked per set" },
  { k: "Obstetric theatre", v: "Separate from general lists" },
  { k: "Laboratory reports", v: "Checked by two doctors" },
];

export const visitingRows: SpecRow[] = [
  { k: "General wards", v: "Day visiting" },
  { k: "Critical care", v: "Fixed hours" },
  { k: "Family update", v: "Once a day from the unit" },
  { k: "Attendant", v: "May stay overnight" },
];

export const gettingHere: string[] = [
  "229/10 St. Joseph Street, Negombo",
  "Ten minutes from Bandaranaike International Airport",
  "Free parking beside the main entrance",
  "Our own ambulance available for transfer",
];

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
