// Sinhala for the contact page.
//
// Only translatable copy lives here. The hospital's facts, the street address,
// both phone numbers, the email, the coordinate and every href stay in
// content.ts and have exactly one home. `content.i18n.test.ts` fails if a
// string that should be translated is missing, and also if one is left as its
// English original.
//
// The register is the polite plural throughout ("කරන්න" rather than "කරපන්"),
// which is how a hospital addresses a patient it has not met.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and the pre-merge check refuses to pass while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const tickerItems = [
  "පැය 24 පුරාම විවෘතයි",
  "පිළිගැනීමේ කවුන්ටරය, පැය 24",
  "වේගවත්ම පිළිතුර සඳහා WhatsApp",
  "දිනක් ඇතුළත පිළිතුරු",
  "පැමිණෙන්න, කතා කරන්න, හෝ පණිවිඩයක් යවන්න",
];

export const heroFacts = [
  { k: "පිළිගැනීම", v: "පැය 24 පුරාම විවෘතයි" },
  { k: "පිළිතුර", v: "එක් වැඩ කරන දිනක් ඇතුළත" },
  // WhatsApp is a product name and stays as it is in every script.
  { k: "වේගවත්ම", v: "WhatsApp" },
  { k: "කොහේද", v: "මීගමුව" },
];

export const jumpCards = [
  {
    label: "අප හා සම්බන්ධ වන්න",
    note: "ස්ථානය, දුරකථනය, WhatsApp සහ විද්‍යුත් තැපෑල.",
  },
  {
    label: "පණිවිඩයක් යවන්න",
    note: "අපි එක් වැඩ කරන දිනක් ඇතුළත පිළිතුරු දෙමු.",
  },
  {
    // The street name is transliterated rather than left in English so the
    // line reads as one sentence. The authoritative address is still the
    // English one in contactRows, which this only restates.
    label: "අප සොයා ගන්න",
    note: "229/10, ශාන්ත ජෝසප් වීදිය, මීගමුව.",
  },
  {
    label: "වෛද්‍යවරයෙකු වෙන්කරවා ගන්න",
    note: "පෝරමය මඟ හැර වේලාවක් තෝරන්න.",
  },
];

export const contactRows = [
  { label: "ස්ථානය", sub: "මීගමුව, ශ්‍රී ලංකාව" },
  { label: "අපට කතා කරන්න", sub: "පිළිගැනීම, පැය 24" },
  { label: "WhatsApp / ජංගම", sub: "වේගවත්ම පිළිතුර" },
  { label: "විද්‍යුත් තැපෑල", sub: "දිනක් ඇතුළත පිළිතුරු" },
];

export const reachIntro = "ඔබට පහසුම ආකාරයෙන් අමතන්න, පණිවිඩයක් යවන්න, නැතහොත් කෙලින්ම පැමිණෙන්න.";

export const messageIntro = "අපි එක් වැඩ කරන දිනක් ඇතුළත ඔබ හා සම්බන්ධ වන්නෙමු.";

export const mapIntro = "ශාන්ත ජෝසප් රෝහල, මීගමුව පිහිටි ස්ථානය දක්වන අන්තර්ක්‍රියාකාරී සිතියම.";

export const heroStandfirst = "පැය 24 පුරාම, සෑම දිනකම සෑම පැයකම විවෘතයි.";

export const sectionEyebrows = {
  reach: "01 / අප හා සම්බන්ධ වන්න",
  message: "02 / පණිවිඩයක් යවන්න",
  map: "03 / අප සොයා ගන්න",
};
