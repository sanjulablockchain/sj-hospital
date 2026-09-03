// Tamil for the home page's `#network` band.
//
// "St. Joseph Hospital" never changes script (the hospital's own name), and
// "Los Angeles", "Kids & Teens Medical Group" and "Telemedicine" stay
// English, the same site-wide precedent the standalone `network` feature's
// own content.ta.ts and navigationLabels.ta.ts already establish. "Network"
// already has a site-wide translation in navigationLabels.ta.ts, so
// `sectionEyebrow` reuses that exact string.
//
// `networkNodes[*].location` translates the city name and keeps the ISO
// country code (LK, US) as a code, the same way a currency code like "LKR"
// stays a code rather than a word with a Tamil equivalent.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const networkNodes = [
  {
    location: "நீர்கொழும்பு, LK",
    // "St. Joseph Hospital": never translates, the hospital's own name.
    name: "St. Joseph Hospital",
    body: "முதன்மை மருத்துவமனை: Emergency, OPD, Surgery, Inpatient, ஆய்வகம், Imaging மற்றும் Pharmacy.",
    linkLabel: "மருத்துவமனையைப் பார்க்கவும்",
  },
  {
    location: "Los Angeles, US",
    // "Kids & Teens Medical Group": stays English, the group's own name.
    name: "Kids & Teens Medical Group",
    body: "நிர்வாகக் குழு: Clinical Governance, Protocols மற்றும் மருத்துவர் பயிற்சி.",
    linkLabel: "Group ஐ அறிந்துகொள்ளுங்கள்",
  },
  {
    location: "நீர்கொழும்பு, LK",
    // Reused verbatim from navigationLabels.ta.ts's "School Wellness" root.
    name: "பள்ளி நல்வாழ்வுத் திட்டம்",
    body: "Partner பள்ளிகள் முழுவதும் On Campus Screening மற்றும் தடுப்பூசி.",
    linkLabel: "பள்ளித் திட்டம்",
  },
  {
    location: "தீவு முழுவதும், LK",
    // Reused verbatim from navigationLabels.ta.ts's "Telemedicine".
    name: "தொலை மருத்துவம் மற்றும் விநியோகம்",
    body: "நீர்கொழும்பு மாவட்டத்திற்கு அப்பால் தொலை Consultations மற்றும் மருந்து அனுப்புதல்.",
    linkLabel: "வீட்டிலிருந்தே Consult செய்யுங்கள்",
  },
];

// Reused verbatim from navigationLabels.ta.ts's "Network" -> "வலையமைப்பு".
export const sectionEyebrow = "11 / வலையமைப்பு";
export const heading = { line1: "ஒரு குழு,", line2: "இரு நாடுகள்" };
export const body =
  "எங்கள் நீர்கொழும்பு மருத்துவமனை Los Angeles இல் உள்ள மிகப்பெரிய Pediatric குழுவுடன் Clinical Governance ஐ Share செய்கிறது.";
export const cta = "முழு வலையமைப்பு";

export const accordionAria = {
  show: "{name} ஐக் காட்டு",
  open: "{name}, திறந்துள்ளது",
};
