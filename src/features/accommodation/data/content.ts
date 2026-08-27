/**
 * Copy for the /accommodation page.
 *
 * Every string of substance below is a copy-paste out of the two components
 * this page replaces: RoomTypes.tsx (the four room types, their descriptions,
 * amenities and photos, and the meals sentence) and SpecialtiesChecklist.tsx
 * (the ten specialties), plus the price each category carries in
 * features/facilities/data/content.ts's `roomRows`, the repo's price
 * authority: Standard is "From 10,000 LKR"; Deluxe, Super Deluxe and Wards
 * are "On request". content.test.ts pins that split, so a fabricated figure
 * for the other three categories fails the suite.
 *
 * The only new strings on this page are `tickerItems`, `heroFacts`' labels
 * and `jumpCards`' notes: each restates a claim already present in the copy
 * below, so none of them is a new hospital fact.
 *
 * `heroStandfirst` and the `*Intro` constants near the bottom of this file
 * are not new copy either: each is a literal quote of copy the old
 * accommodation page or its components already carried, chosen so a jump
 * card's `note` is never repeated (verbatim or paraphrased) by the section it
 * points at. This page has exactly one prose sentence that is true of every
 * room category rather than one (`mealsNote`), and it is spent once, as
 * `roomsIntro`. `#specialties` has no `intro` at all rather than a second,
 * near-identical quote of that same sentence: see SpecialtiesSection.tsx.
 */

/** One of the four inpatient room categories. */
export type RoomType = {
  id: string;
  name: string;
  /** A short form of `name`, always a substring of it (never new wording),
   * for the chips in RoomTypeNav.tsx: the same short forms ("Standard",
   * "Super Deluxe") the jump cards and footer already use. */
  shortName: string;
  description: string;
  amenities: string[];
  photos: { src: string; alt: string }[];
  price: string;
};

// RoomTypes.tsx's `roomTypes`, verbatim and in order, with a `price` field
// added per features/facilities/data/content.ts's `roomRows`.
export const roomTypes: RoomType[] = [
  {
    id: "standard",
    name: "Standard Rooms",
    shortName: "Standard",
    description:
      "Our standard rooms offer essential comfort to suit your basics and function, backed by comprehensive medical support.",
    amenities: [
      "Hot & cool water",
      "TV",
      "Wi-Fi",
      "Bystander bed & chair",
      "Air conditioning",
      "Necessary medical support",
    ],
    photos: [
      { src: "/images/rooms/standard-1.jpg", alt: "Standard room at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/standard-2.jpg", alt: "Standard room detail" },
    ],
    price: "From 10,000 LKR",
  },
  {
    id: "deluxe",
    name: "Deluxe Rooms",
    shortName: "Deluxe",
    description: "A larger space with added comfort for patients who want a bit more.",
    amenities: [
      "Hot & cool water",
      "TV",
      "Wi-Fi",
      "Bystander bed & sofa",
      "Air conditioning",
      "Pantry area with tea station",
      "Coffee table",
      "Hot water kettle",
    ],
    photos: [
      { src: "/images/rooms/deluxe-1.jpg", alt: "Deluxe room at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/deluxe-2.jpg", alt: "Deluxe room detail" },
    ],
    price: "On request",
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Rooms",
    shortName: "Super Deluxe",
    description: "Our most premium inpatient rooms, with dedicated steward service.",
    amenities: [
      "Hot & cool water",
      "TV",
      "Wi-Fi",
      "Bystander bed, sofa & chair",
      "Air conditioning",
      "Pantry with tea station",
      "Coffee table",
      "Hot water kettle",
      "Morning papers",
      "Separate steward service",
    ],
    photos: [
      { src: "/images/rooms/super-deluxe-1.jpg", alt: "Super Deluxe room at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/super-deluxe-2.jpg", alt: "Super Deluxe room detail" },
    ],
    price: "On request",
  },
  {
    id: "wards",
    name: "Wards",
    shortName: "Wards",
    description:
      "Comfortable shared wards with 3-bed and 2-bed options and bed separators for privacy. Upon discharge, patients may receive a complimentary fruit or chocolate basket. Discounts may also be available at the attending physician's discretion, and VIP service is available for those seeking enhanced care.",
    amenities: [
      "Air conditioning",
      "Hot & cool water",
      "Individual bystander beds & chairs",
      "TV",
      "3-bed & 2-bed options",
      "Common washroom",
      "Bed separators for privacy",
    ],
    photos: [
      { src: "/images/rooms/wards-1.jpg", alt: "Ward at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/wards-2.jpg", alt: "Ward detail" },
    ],
    price: "On request",
  },
];

// SpecialtiesChecklist.tsx's `specialties`, verbatim and in order.
export const specialties: string[] = [
  "Comfortable & Spacious Rooms",
  "24/7 Medical Assistance",
  "Advanced Patient Monitoring",
  "Private & Semi-Private Options",
  "High-Quality Hygiene & Safety",
  "Personalized Meal Plans",
  "Family-Friendly Facilities",
  "Television & Wi-Fi Access",
  "Emergency Response System",
  "Pharmacy & Diagnostic Support",
];

// RoomTypes.tsx's section-header meals sentence, verbatim.
export const mealsNote =
  "Enjoy three daily meals with a choice of Eastern, Western, or Sri Lankan cuisine, including a diabetic menu option, plus tea or coffee with a snack.";

export const tickerItems = [
  "Four room categories",
  "Three daily meals included",
  "Wi-Fi and TV in every room",
  "Air conditioned throughout",
  "24/7 medical support",
  "Private and shared options",
] as const;

export const heroFacts = [
  { k: "Room types", v: "Four" },
  { k: "Standard from", v: "10,000 LKR" },
  { k: "Meals", v: "Three daily" },
  { k: "Nursing", v: "24/7" },
];

export const jumpCards = [
  {
    count: "01",
    label: "Standard",
    note: "Essential comfort, backed by medical support.",
    href: "#standard",
  },
  {
    count: "02",
    label: "Deluxe",
    note: "A larger space with more comfort.",
    href: "#deluxe",
  },
  {
    count: "03",
    label: "Super Deluxe",
    note: "Our most premium rooms, with steward service.",
    href: "#super-deluxe",
  },
  {
    count: "04",
    label: "Wards",
    note: "Shared wards with privacy separators.",
    href: "#wards",
  },
];

// The old page's page-banner title, verbatim. `#top`'s standfirst: broad,
// naming the whole room lineup rather than one category, and distinct from
// every intro below and from every jump card note above.
export const heroStandfirst = "Experience US Standard Comfort and Facilities in Our Inpatient Rooms";

// `#rooms`'s SectionHead intro: `mealsNote` above, restated here by reference
// so the section reads the same sentence the old page put directly under its
// "Our Inpatient Room Types" header.
export const roomsHeading = "Rooms ranging from functional to premium";
export const roomsIntro = mealsNote;

// `#specialties`'s SectionHead heading: the checklist's own old heading,
// verbatim. No matching `*Intro`: see the file-level comment above and
// SpecialtiesSection.tsx for why this section has no standfirst.
export const specialtiesHeading = "Specialties of Our Inpatient Rooms";

// `#book`'s SectionHead heading and intro: the old index.tsx's own booking
// panel copy, verbatim, distinct from every intro and jump card note above.
export const bookHeading = "Book an Inpatient Room";
export const bookIntro = "Send us a message and our team will help you find the right room.";
