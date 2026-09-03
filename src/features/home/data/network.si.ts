// Sinhala for the home page's `#network` band.
//
// "St. Joseph Hospital" never changes script (the hospital's own name), and
// "Los Angeles", "Kids & Teens Medical Group" and "Telemedicine" stay
// English, the same site-wide precedent the standalone `network` feature's
// own content.si.ts and navigationLabels.si.ts already establish. "Network"
// already has a site-wide translation in navigationLabels.si.ts, so
// `sectionEyebrow` reuses that exact string.
//
// `networkNodes[*].location` translates the city name and keeps the ISO
// country code (LK, US) as a code, the same way a currency code like "LKR"
// stays a code rather than a word with a Sinhala equivalent.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const networkNodes = [
  {
    location: "මීගමුව, LK",
    // "St. Joseph Hospital": never translates, the hospital's own name.
    name: "St. Joseph Hospital",
    body: "ප්‍රධාන රෝහල: Emergency, OPD, Surgery, Inpatient, රසායනාගාරය, Imaging සහ Pharmacy.",
    linkLabel: "රෝහල බලන්න",
  },
  {
    location: "Los Angeles, US",
    // "Kids & Teens Medical Group": stays English, the group's own name.
    name: "Kids & Teens Medical Group",
    body: "පාලක සමූහය: Clinical Governance, Protocols සහ වෛද්‍ය පුහුණුව.",
    linkLabel: "Group එක හඳුනාගන්න",
  },
  {
    location: "මීගමුව, LK",
    // Reused verbatim from navigationLabels.si.ts's "School Wellness" root.
    name: "පාසල් සුවතාව වැඩසටහන",
    body: "Partner පාසල් පුරා On Campus Screening සහ එන්නත්කරණය.",
    linkLabel: "පාසල් වැඩසටහන",
  },
  {
    location: "දිවයින පුරා, LK",
    // Reused verbatim from navigationLabels.si.ts's "Telemedicine".
    name: "දුරස්ථ වෛද්‍ය සේවා සහ ගෙන්වා දීම",
    body: "මීගමුව දිස්ත්‍රික්කයෙන් එහායින් දුරස්ථ Consultations සහ බෙහෙත් යැවීම.",
    linkLabel: "ගෙදර ඉඳන් Consult කරන්න",
  },
];

// Reused verbatim from navigationLabels.si.ts's "Network" -> "ජාලය".
export const sectionEyebrow = "11 / ජාලය";
export const heading = { line1: "සමූහයක්,", line2: "රටවල් දෙකක" };
export const body =
  "අපේ මීගමුව රෝහල Los Angeles හි විශාලතම Pediatric සමූහය සමඟ Clinical Governance Share කරනවා.";
export const cta = "සම්පූර්ණ ජාලය";

export const accordionAria = {
  show: "{name} පෙන්වන්න",
  open: "{name}, විවෘතයි",
};
