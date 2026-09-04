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
// `hero.headingLine1` / `.headingOutline` / `.headingAccent` are three
// independent segments of one visual three-part heading, not a literal
// translation of "To live is a privilege" split around the letter "a" (see
// the header comment in content.ts). This composes its own coherent Sinhala
// sentence across the three segments: "ජීවත් වීම එක් වරප්‍රසාදයකි." ("Living
// is one privilege"), putting the outlined-glyph treatment on "එක්" ("one"),
// a real word, rather than forcing an indefinite article Sinhala does not
// have as a separate word.
//
// "Who we are", "Careers", "Surgical care", "Pharmacy", "Medicine to your
// door", "School wellness" and "Book a room" already have a site-wide
// translation in navigationLabels.si.ts, so `whoWeAre.eyebrow`,
// `surgical.eyebrow`, `servicesBento.tiles[1].badge`, `pharmacy.eyebrow`,
// `servicesBento.tiles[7].heading`, `schoolWellness.eyebrow` and
// `rooms.cta` / `contactCta.ctaRooms` reuse those exact strings rather than
// inventing second translations.
//
// "St. Joseph Street" keeps the hospital's own address in English, the same
// rule `contact`'s own content.ts states (see content.ts's header note on
// `contactCta`).
//
// `servicesBento.tiles[6].heading` ("We come to you") is `home-care`'s own
// hero tagline (`hero.strapline`), imported through its `index.ts` rather
// than typed here a second time: same fact, exactly one home. `pharmacy`'s
// own `heading.line1` is imported the same way from `pharmacy`'s own
// `hero.headingLead`; see the header comment on `pharmacy` for why `line2`
// and `line3` are not.

// See the header comment in content.ts for why these are relative imports to
// each feature's own overlay file rather than through its `index.ts`.
import { hero as homeCareHeroSi } from "../../home-care/data/content.si.ts";
import { hero as pharmacyHeroSi } from "../../pharmacy/data/content.si.ts";

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {
  locationLabel: "මීගමුව, ශ්‍රී ලංකාව",
  managedBy: "Los Angeles, USA සිට මෙහෙයවනවා",
  headingLine1: "ජීවත් වීම",
  headingOutline: "එක්",
  headingAccent: "වරප්‍රසාදයකි.",
  body: "මීගමුවේ ඇමෙරිකානු සෞඛ්‍ය සේවා Standards: පැය 24ම Emergency සත්කාරය, Surgical ශල්‍යාගාර, House Doctors, නවීන රසායනාගාරයක්, Digital X-ray සහ කවදාවත් වහන්නේ නැති Pharmacy එකක්.",
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
  // Reused verbatim from navigationLabels.si.ts's "Who we are" -> "අප කවුද".
  eyebrow: "01 / අප කවුද",
  heading: { line1: "US රෝහලක්", line2: "ශ්‍රී ලාංකික", line3: "අවට ප්‍රදේශයක" },
  intro:
    "St. Joseph Hospital මෙහෙයවනු සහ Operate කරනු ලබන්නේ Los Angeles හි Kids & Teens Pediatric Medical Group විසිනුයි: ඇමෙරිකානු සත්කාරයේ Standards, Protocols සහ Clinical Discipline, මීගමුවේ පවුල් සඳහා දැරිය හැකි මිලකට.",
  body: "Consumables කවදාවත් නැවත පාවිච්චි කරන්නේ නෑ. කසළ ජාත්‍යන්තර Protocol එකට Manage කරනවා. හැම මතුපිටක්ම පැය දෙකකට සැරයක් Clean කරනවා. අපේ House Doctors ඔබට ඇත්තටම ඕන Tests විතරක් Order කරනවා, සහ හැම Report එකක්ම ඔබ ලඟට එන්න කලින් ඒගොල්ලන් දෙන්නෙක් කියවනවා.",
  cta: "අප ගැන තව",
  stats: [
    { caption: "දිනකට පැය, හැම සේවාවක්ම විවෘත" },
    { caption: "Cleaning Cycle එක, US Specification එකට" },
    { caption: "ඔබට ඕන නැති Tests Order කරන එක" },
  ],
};

export const servicesBento = {
  eyebrow: "02 / අපි කරන දේ",
  heading: { line1: "අපි ඔබව", line2: "බලාගන්නා විදිහ අටක්" },
  tilesNote: "හැම Tile එකක්ම සේවාවක් විවෘත කරනවා",
  tiles: [
    {
      badge: "/01 Emergency සහ OPD",
      openNow: "දැන් විවෘතයි",
      heading: { line1: "ඕන වෙලාවක", line2: "ඇවිත් එන්න" },
      body: "Emergency සත්කාරය, Outpatient Consultations, රසායනාගාරය සහ Digital X-ray, අවුරුද්දේ හැම දිනකම පැය 24ම Live.",
    },
    {
      // Reused verbatim from navigationLabels.si.ts's "Surgical care".
      badge: "/02 ශල්‍ය සත්කාර",
      heading: "ශල්‍යාගාර, Consultant මෙහෙයවන",
      body: "Elective සහ Emergency Surgery, Sterile Instrument Tracking සහ පවරන ලද Recovery Nurse කෙනෙක් සමඟ.",
      linkLabel: "ශල්‍ය සේවා",
    },
    {
      badge: "/03 කාමර",
      body: "LKR, එක රාත්‍රියකට. Private සහ Semi Private, පැය දෙකට සැරයක් Sanitise කරනවා, ඔබේ නම දන්නා Nursing.",
    },
    {
      // "Pharmacy": KEEPS_ENGLISH, same as navigationLabels.si.ts's own entry.
      badge: "/04 Pharmacy",
      heading: "Authorized Stock, 24/7ම",
      body: "Verified බෙහෙත් විතරයි. Substitutes නෑ.",
    },
    {
      // "Digital X-ray": KEEPS_ENGLISH, this site's own register word.
      badge: "/05 Digital X-ray",
      heading: "අඩු Dose එකක්, තියුණු Plates",
      body: "පැයක් ඇතුලත කියවනවා, සතියක් නෙවෙයි.",
    },
    {
      badge: "/06 රසායනාගාරය",
      heading: "හැම Report එකක්ම වෛද්‍යවරු දෙන්නෙක් කියවනවා",
      note: "OPD රෝගීන්ට 10% වට්ටමක්",
    },
    {
      badge: "/07 නිවසේ සේවා",
      // `home-care`'s own hero tagline (`hero.strapline`), read back through
      // its `index.ts` rather than typed here a second time.
      heading: homeCareHeroSi.strapline,
      body: "වෛද්‍යවරු, Nurses සහ Lab Technicians ඔබේ දොරටුවට.",
    },
    {
      // Reused verbatim from navigationLabels.si.ts's "Delivery".
      badge: "/08 ගෙන්වා දීම",
      // Reused verbatim from navigationLabels.si.ts's "Medicine to your door".
      heading: "ඔබේ දොරටුවට බෙහෙත්",
      body: "මීගමුව පුරාම, අපේම Counter එකෙන්.",
    },
  ],
  footer: {
    label: "සම්පූර්ණ සේවා නාමාවලිය",
    heading: "හැම සේවාවක්ම, එක තැනක",
    viewAllTemplate: "සේවා {count}ම බලන්න",
  },
};

export const surgical = {
  // Reused verbatim from navigationLabels.si.ts's "Surgical care".
  eyebrow: "03 / ශල්‍ය සත්කාර",
  heading: { line1: "ශල්‍යාගාර", line2: "Protocol එකට දුවනවා,", line3: "පුරුද්දට නෙවෙයි" },
  body: "Elective සහ Emergency Surgery, Consultant Anaesthesia, Single Use Consumables, හැම Instrument Set එකකම Sterile Tracking, සහ ශල්‍යාගාරයේ ඉඳන් Discharge වෙනකන් ඔබේ Recovery සඳහා පවරන ලද Nurse කෙනෙක්.",
  ctaPrimary: "ශල්‍ය Consult එකක් ඉල්ලන්න",
  ctaSecondary: "ශල්‍යාගාර Desk එකට කතා කරන්න",
  procedures: [
    { name: "සාමාන්‍ය Surgery", note: "Elective සහ Emergency" },
    { name: "Obstetric ශල්‍යාගාරය", note: "Consultant මෙහෙයවන" },
    { name: "Orthopaedic ක්‍රියාමාර්ග", note: "Day Case සහ Inpatient" },
    { name: "Endoscopy අංශය", note: "එදිනම Report කිරීම" },
    { name: "සැත්කමෙන් පස්සේ සත්කාරය", note: "පවරන ලද Recovery Nurse" },
  ],
};

export const pharmacy = {
  // "Pharmacy": KEEPS_ENGLISH, same as navigationLabels.si.ts's own entry.
  eyebrow: "05 / Pharmacy",
  // `line1` is now read from `pharmacy`'s own standalone feature
  // (`hero.headingLead`, via its `index.ts`) rather than typed here a second
  // time: same three-segment heading shape, same first word, so the two
  // pages agree rather than one translating "Authorized" and the other not.
  // `line2` and `line3` stay this file's own independent literals: they
  // translate the same English words ("medicine." / "Nothing else.") as
  // pharmacy's own `headingOutline` / `headingAccent`, but the two overlays
  // already diverged in wording before this task ("බෙහෙත් විතරයි." here vs
  // pharmacy's own "බෙහෙත්.", "අනිත් කිසිම එකක් නෑ." here vs pharmacy's own
  // "වෙන කිසිවක් නෑ."). Consolidating them would change what this page
  // renders, which this step does not do; flagged for a translation review
  // rather than silently picked one way.
  heading: { line1: pharmacyHeroSi.headingLead, line2: "බෙහෙත් විතරයි.", line3: "අනිත් කිසිම එකක් නෑ." },
  body: "අපේ House Pharmacy එකේ තියෙන්නේ Verified, Authorized Stock විතරයි, ඔබේ File එක කියවන්න පුළුවන් Pharmacists ලා විසින් රාත්‍රියේ ඕන වෙලාවක Dispense කරනවා.",
  ctaPrimary: "Delivery එකක් Order කරන්න",
  ctaSecondary: "Pharmacist කෙනෙක්ගෙන් අහන්න",
  stats: [
    { label: "Counter වෙලාවන්" },
    { label: "Home Delivery කරන පරාසය" },
    { label: "Prescriptions File එකේ" },
    { label: "OPD රෝගීන්ට Lab වට්ටම" },
  ],
};

export const rooms = {
  eyebrow: "07 / අප සමඟ රැඳී සිටින්න",
  heading: { line1: "සුවය වගේ", line2: "දැනෙන", line3: "කාමරයක්" },
  body: "නිස්කලංක, Private, පැය දෙකට සැරයක් Sanitise කරන, ඔබේ නම දන්නා Nursing එකක් සහ හැම වෙලාවකම මාලයේ ඉන්නා වෛද්‍යවරයෙක් සමඟ.",
  // Reused verbatim from navigationLabels.si.ts's "Book a room": same fact
  // (reserving a room).
  cta: "කාමරයක් Book කරන්න",
  fromLabel: "කාමර ආරම්භය",
  priceCaption: "LKR, එක රාත්‍රියකට, Nursing සත්කාරයත් සමඟ සියල්ලම ඇතුළුව",
  perks: [
    "Private සහ Semi Private Options",
    "පවුලේ අයට Attendant Space",
    "ආහාර සකසන්නේ Dietary Orders වලට අනුවයි",
  ],
};

export const schoolWellness = {
  // Reused verbatim from navigationLabels.si.ts's "School Wellness".
  eyebrow: "10 / පාසල් සුවතාව",
  heading: { line1: "අපි එන්නේ", line2: "Classroom එකටමයි" },
  body: "මීගමුව පාසල් සඳහා Pediatric මෙහෙයවන වැඩසටහනක්: වාර්ෂික Screening, දෘෂ්ටි සහ ශ්‍රවණ පරීක්ෂණ, වර්ධන Tracking, එන්නත්කරණ වැඩසටහන් සහ Teacher First Aid පුහුණුව, ඔබේ දරුවන්ව Clinic එකේ බලන ම වෛද්‍යවරුන් විසින්ම මෙහෙයවනවා.",
  rows: [
    { title: "වාර්ෂික සෞඛ්‍ය Screening", note: "පාසලේදීම, ශ්‍රේණිය අනුව" },
    { title: "දෘෂ්ටි, ශ්‍රවණ සහ දත් පරීක්ෂණ", note: "දෙමව්පියන්ට Referral වාර්තාවක්" },
    { title: "Teacher First Aid පුහුණුව", note: "අඩ දවසක්, Certified" },
  ],
  cta: "අපේ පාසලට ගෙන්වන්න",
  // "Kids & Teens Pediatric Protocol": this specific programme's own named
  // protocol, the same class of proper noun as "Kids & Teens Medical Group"
  // itself, which stays English throughout this feature. KEEPS_ENGLISH.
  photoCaption: "Kids & Teens Pediatric Protocol",
};

export const contactCta = {
  eyebrow: "15 / අපිව බලන්න එන්න",
  heading: { line1: "දැන්මම", line2: "විවෘතයි. ඔව්,", line3: "දැන්මම." },
  body: "229/10 St. Joseph Street, මීගමුව. ඇවිත් එන්න, අපිට Call කරන්න, නැත්නම් WhatsApp එකෙන් Message එකක් යවන්න.",
  // Reused verbatim from navigationLabels.si.ts's "Surgical care".
  ctaSurgical: "ශල්‍ය සත්කාර",
  // Reused verbatim from navigationLabels.si.ts's "Book a room".
  ctaRooms: "කාමරයක් Book කරන්න",
};
