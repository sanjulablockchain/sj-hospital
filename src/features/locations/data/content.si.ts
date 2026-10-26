// Sinhala for the locations page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns and
// clinical terms stay in English rather than being replaced by literary
// coinages nobody says out loud. So "Emergency", "OPD", "Surgery",
// "Laboratory", "Imaging", "Pharmacy", "Reception", "WhatsApp", "clinic",
// "message", "switchboard" and "American protocol" stay in English, the same
// way they already do in contact's, network's and school-wellness's own
// content.si.ts.
//
// Both hospitals' own names stay in English throughout, the same way the
// hospital's name never changes script anywhere on this site: recasting
// "Blue Sapphire Hospital" into Sinhala letters would not be a translation,
// it would be a different name. See KEEPS_ENGLISH in content.i18n.test.ts.
// "Negombo" translates to "මීගමුව" and "Ratnapura" to "රත්නපුර" as place
// names, the same as elsewhere on this site.
//
// Only translatable copy lives here. Every href, id, photo path, street
// address and fact value stays in content.ts and has exactly one home. The
// hero, the eyebrows, the headings, the fact strip and every CTA label are
// English in every language by the register rule, so they are absent here.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {
  photoAlt: "මීගමුව St. Joseph Hospital ගොඩනැගිල්ල",
};

export const tickerItems: readonly string[] = [
  "මීගමුව: Emergency 24/7 විවෘතයි",
  "රත්නපුර: විස්තර ළඟදීම",
  "රෝහල් දෙකක්, එක protocol එකක්",
  "Los Angeles, USA සිට කළමනාකරණය",
  "Reception අංකය 0117 84 84 84",
];

export const hospitalsIntro =
  "මීගමුව St. Joseph Hospital දැන් විවෘතයි. රත්නපුර Blue Sapphire Hospital ඊට එකතු වෙනවා; එහි සම්පූර්ණ විස්තර තහවුරු වූ වහාම මෙහි පළ කරනවා.";

export const hospitals = [
  {
    name: "St. Joseph Hospital",
    city: "මීගමුව",
    region: "බස්නාහිර පළාත",
    statusLabel: "24/7 විවෘතයි",
    body: "අපේ ප්‍රධාන රෝහල: Emergency, OPD, Surgery, Inpatient, Laboratory, Imaging සහ Pharmacy සේවා තට්ටු හයක, American protocol අනුව ක්‍රියාත්මක වෙනවා.",
    photoAlt: "මීගමුව St. Joseph Hospital",
    address: { locality: "මීගමුව, ශ්‍රී ලංකාව" },
    facts: [{ label: "Emergency" }, { label: "Reception" }, { label: "WhatsApp" }],
  },
  {
    name: "Blue Sapphire Hospital",
    city: "රත්නපුර",
    region: "සබරගමුව පළාත",
    statusLabel: "විස්තර ළඟදීම",
    body: "අපේ දෙවැනි රෝහල. ලිපිනය, දුරකථන අංක සහ විවෘත වේලාවන් තහවුරු කරමින් සිටින අතර ඒවා මෙහි පළ කරනවා. ඒ තෙක් මීගමුව switchboard එකෙන් උදව් ගන්න පුළුවන්.",
  },
];

export const helpBody =
  "අපට කතා කරන්න හෝ message එකක් එවන්න; නිවැරදි රෝහල, නිවැරදි clinic එක සහ එන්න සුදුසුම වේලාව අපි කියන්නම්.";
