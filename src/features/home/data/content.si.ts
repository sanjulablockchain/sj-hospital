// Sinhala for the home page bands that have no dedicated data file: hero,
// "who we are", the services bento, surgical, pharmacy, rooms, school
// wellness, the stat ticker and the closing "come see us" band.
//
// Same code-mixed register as the rest of this feature: the sentence is
// Sinhala, everyday English nouns and this site's own register words
// ("Emergency", "OPD", "Digital X-ray", "Pharmacy", "Los Angeles", "Nurse")
// stay in English, the same precedent `career`'s, `facilities`'s, `network`'s
// and `pharmacy`'s own content.si.ts already establish. Sentence forms use
// the polite plural ("කරන්න"), never the familiar imperative.
//
// "St. Joseph Street" keeps the hospital's own address in English, the same
// rule `contact`'s own content.ts states (see content.ts's header note on
// `contactCta`).
//
// The register sweep (2026-09-09) deleted every hero field, section eyebrow,
// section/tile heading and CTA/link label from this file: the policy
// (`docs/superpowers/i18n-register-rule.md`) renders all of those in
// English on every page. That also emptied `servicesBento.tiles[6].heading`
// and `pharmacy.heading.line1`, which used to import `home-care`'s and
// `pharmacy`'s own hero strings rather than typing them a second time
// (`homeCareHeroSi.strapline`, `pharmacyHeroSi.headingLead`); both imports
// are gone from this file along with the fields that used them. What
// remains below is intro/body/stat-caption prose, which stays translated.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {
  photoAlt: "St. Joseph Hospital ගොඩනැගිල්ල සන්ධ්‍යාවේ",
};

export const statTickerItems = [
  "Emergency පැය 24ම විවෘත",
  "US Protocol එකට ශල්‍යාගාර",
  "පැය දෙකට සැරයක් පිරිසිදු කරනවා",
  "Reports එදිනම, දෙපාරක් Check කරලා",
  "කාමර 10,000 LKR සිට",
];

export const whoWeAre = {
  heading: {},
  intro:
    "St. Joseph Hospital මෙහෙයවනු සහ Operate කරනු ලබන්නේ Los Angeles හි Kids & Teens Pediatric Medical Group විසිනුයි: ඇමෙරිකානු සත්කාරයේ Standards, Protocols සහ Clinical Discipline, මීගමුවේ පවුල් සඳහා දැරිය හැකි මිලකට.",
  body: "Consumables කවදාවත් නැවත පාවිච්චි කරන්නේ නෑ. කසළ ජාත්‍යන්තර Protocol එකට Manage කරනවා. හැම මතුපිටක්ම පැය දෙකකට සැරයක් Clean කරනවා. අපේ House Doctors ඔබට ඇත්තටම ඕන Tests විතරක් Order කරනවා, සහ හැම Report එකක්ම ඔබ ලඟට එන්න කලින් ඒගොල්ලන් දෙන්නෙක් කියවනවා.",
  stats: [
    { caption: "දිනකට පැය, හැම සේවාවක්ම විවෘත" },
    { caption: "Cleaning Cycle එක, US Specification එකට" },
    { caption: "ඔබට ඕන නැති Tests Order කරන එක" },
  ],
};

export const servicesBento = {
  heading: {},
  tilesNote: "හැම Tile එකක්ම සේවාවක් විවෘත කරනවා",
  tiles: [
    {
      openNow: "දැන් විවෘතයි",
      heading: {},
      body: "Emergency සත්කාරය, Outpatient Consultations, රසායනාගාරය සහ Digital X-ray, අවුරුද්දේ හැම දිනකම පැය 24ම Live.",
    },
    {
      body: "Elective සහ Emergency Surgery, Sterile Instrument Tracking සහ පවරන ලද Recovery Nurse කෙනෙක් සමඟ.",
    },
    {
      body: "LKR, එක රාත්‍රියකට. Private සහ Semi Private, පැය දෙකට සැරයක් Sanitise කරනවා, ඔබේ නම දන්නා Nursing.",
    },
    {
      body: "Verified බෙහෙත් විතරයි. Substitutes නෑ.",
    },
    {
      body: "පැයක් ඇතුලත කියවනවා, සතියක් නෙවෙයි.",
    },
    {
      note: "OPD රෝගීන්ට 10% වට්ටමක්",
    },
    {
      body: "වෛද්‍යවරු, Nurses සහ Lab Technicians ඔබේ දොරටුවට.",
    },
    {
      body: "මීගමුව පුරාම, අපේම Counter එකෙන්.",
    },
  ],
  footer: {},
};

// `02 / Free OPD`. The eyebrow, both heading lines and both CTA labels are
// English in every language under the register policy, so they are absent
// here rather than restated; what is left is the paragraph and the three
// points, which is what a Sinhala reader actually reads.
export const freeOpd = {
  heading: {},
  body: "ශ්‍රී ලංකාවේ පළමු වතාවට: අපේ බාහිර රෝගී අංශයේ Consultations නොමිලේ. උණක්, ගෙඩියක් හෝ සතියක වේදනාවක් සඳහා මුදල් වියදම් කරන්න වටිනවද කියලා කාටවත් කල්පනා කරන්න වෙන්නේ නෑ. කෙලින්ම ඇවිත් වෛද්‍යවරයෙක් හමුවෙන්න.",
  points: [
    "අපි විවෘත හැම පැයකම නොමිලේ Consultation",
    "සාමාන්‍ය පැමිණිලිවලට වගේම විශේෂඥ Referral එකටත්",
    "ඔබ යන්න කලින්ම ඔබේ රෝග විනිශ්චය පැහැදිලි කරනවා",
  ],
};

export const surgical = {
  heading: {},
  body: "Elective සහ Emergency Surgery, Consultant Anaesthesia, Single Use Consumables, හැම Instrument Set එකකම Sterile Tracking, සහ ශල්‍යාගාරයේ ඉඳන් Discharge වෙනකන් ඔබේ Recovery සඳහා පවරන ලද Nurse කෙනෙක්.",
  procedures: [
    { name: "සාමාන්‍ය Surgery", note: "Elective සහ Emergency" },
    { name: "Obstetric ශල්‍යාගාරය", note: "Consultant මෙහෙයවන" },
    { name: "Orthopaedic ක්‍රියාමාර්ග", note: "Day Case සහ Inpatient" },
    { name: "Endoscopy අංශය", note: "එදිනම Report කිරීම" },
    { name: "සැත්කමෙන් පස්සේ සත්කාරය", note: "පවරන ලද Recovery Nurse" },
  ],
};

export const pharmacy = {
  heading: {},
  body: "අපේ House Pharmacy එකේ තියෙන්නේ Verified, Authorized Stock විතරයි, ඔබේ File එක කියවන්න පුළුවන් Pharmacists ලා විසින් රාත්‍රියේ ඕන වෙලාවක Dispense කරනවා.",
  stats: [
    { label: "Counter වෙලාවන්" },
    { label: "Home Delivery කරන පරාසය" },
    { label: "Prescriptions File එකේ" },
    { label: "OPD රෝගීන්ට Lab වට්ටම" },
  ],
};

export const rooms = {
  heading: {},
  body: "නිස්කලංක, Private, පැය දෙකට සැරයක් Sanitise කරන, ඔබේ නම දන්නා Nursing එකක් සහ හැම වෙලාවකම මාලයේ ඉන්නා වෛද්‍යවරයෙක් සමඟ.",
  fromLabel: "කාමර ආරම්භය",
  priceCaption: "LKR, එක රාත්‍රියකට, Nursing සත්කාරයත් සමඟ සියල්ලම ඇතුළුව",
  perks: [
    "Private සහ Semi Private Options",
    "පවුලේ අයට Attendant Space",
    "ආහාර සකසන්නේ Dietary Orders වලට අනුවයි",
  ],
};

export const schoolWellness = {
  heading: {},
  body: "මීගමුව පාසල් සඳහා Pediatric මෙහෙයවන වැඩසටහනක්: වාර්ෂික Screening, දෘෂ්ටි සහ ශ්‍රවණ පරීක්ෂණ, වර්ධන Tracking, එන්නත්කරණ වැඩසටහන් සහ Teacher First Aid පුහුණුව, ඔබේ දරුවන්ව Clinic එකේ බලන ම වෛද්‍යවරුන් විසින්ම මෙහෙයවනවා.",
  rows: [
    { note: "පාසලේදීම, ශ්‍රේණිය අනුව" },
    { note: "දෙමව්පියන්ට Referral වාර්තාවක්" },
    { note: "අඩ දවසක්, Certified" },
  ],
  // "Kids & Teens Pediatric Protocol": this specific programme's own named
  // protocol, the same class of proper noun as "Kids & Teens Medical Group"
  // itself, which stays English throughout this feature. KEEPS_ENGLISH.
  photoCaption: "Kids & Teens Pediatric Protocol",
};

export const contactCta = {
  heading: {},
  body: "229/10 St. Joseph Street, මීගමුව. ඇවිත් එන්න, අපිට Call කරන්න, නැත්නම් WhatsApp එකෙන් Message එකක් යවන්න.",
};
