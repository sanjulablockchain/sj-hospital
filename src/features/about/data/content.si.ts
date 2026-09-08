// Sinhala for the about-us page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns stay in
// English rather than being replaced by literary coinages nobody says out
// loud. So "OPD" rather than a coined term, "X-ray" rather than "විකිරණ
// ඡායාරූපය", and "Book" as a verb. The only string this feature leaves fully
// in English is listed in KEEPS_ENGLISH in content.i18n.test.ts, so it is a
// recorded decision rather than a string somebody forgot.
//
// Sentence forms use the polite plural ("කරන්න"), which is how a hospital
// addresses a patient it has not met.
//
// Only translatable copy lives here. Every href, the jump card counts and the
// partner logo paths stay in content.ts and have exactly one home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const tickerItems = [
  "ඇමරිකානු ප්‍රමිතියේ සත්කාරය",
  "Los Angeles සිට මෙහෙයවනු ලැබේ",
  "OPD හිදී Corporate ඉන්ෂුවරන්ස්",
  "ඩිජිටල් X-ray",
  "නවීන රසායනාගාරය",
  "Digital ලෙස file වලට පිවිසීම",
  "පැය 24 පුරාම විවෘතයි",
];

export const heroFacts = [
  {},
  {},
  {},
  {},
];

export const jumpCards = [
  {
    note: "ඇමරිකානු ප්‍රමිතියේ සත්කාරය, මීගමුවට.",
  },
  {
    note: "අප තමන්ටම බලාපොරොත්තු වන කරුණු හය.",
  },
  {
    note: "අප ලඟා වීමට බලාපොරොත්තු වන්නේ කුමක්ද.",
  },
  {
    // Left in English: this is the parent group's own name, in the register
    // that names always keep, not a sentence to translate.
    note: "Kids & Teens Medical Group, USA.",
  },
];

export const storyParagraphs = [
  "St. Joseph Hospital, මීගමුවේ, ශ්‍රී ලාංකිකයන්ට දැරිය හැකි මිලකට ඇමරිකානු ප්‍රමිතියේ, උසස් තත්ත්වයේ සෞඛ්‍ය සේවා සපයයි. අපගේ රෝහල මෑතකදී Kids & Teens Pediatric Medical Group (Los Angeles) සහ Asia Corp විසින් මූලික කරගත් ඇමෙරිකානු ඩොලර් මිලියන 1ක ආයෝජනයකින් අලුත්වැඩියා කරන ලදී.",
  "දේශීය ප්‍රජාවට සෞඛ්‍ය සේවා පහසුවෙන් හා ලබාගත හැකි වන පිණිස, අපගේ OPD හිදී Corporate ඉන්ෂුවරන්ස් පිළිගන්නා මීගමුවේ ප්‍රථම රෝහල අප වේ.",
  "අපගේ නවීන හා දියුණු රසායනාගාරය ශ්‍රී ලංකාවේ පවතින හොඳම ඒවා අතරින් එකක් ලෙස හඳුනාගෙන ඇත. එහි නවතම, උසස් තත්ත්වයේ උපකරණ ඇත. රෝහලේ ඇති Digital X-ray යන්ත්‍රය නිවැරදි රෝග විනිශ්චයක් සඳහා නිවැරදි තොරතුරු ලබා දෙන, industry එකේ ඇති නවතම ඒවා අතරින් එකකි.",
  "අපගේ රෝගීන්ගේ පහසුව සඳහා Digital ලෙස file වලට පිවිසීමේ පහසුකමද අප ලබා දෙනවා. ශ්‍රී ලංකාවේදීම ජාත්‍යන්තර ප්‍රමිතියේ සෞඛ්‍ය සේවාවක් ලබාගැනීමට අද අප වෙත එන්න.",
];

export const reasons = [
  {
    description: "ඇමෙරිකානු සෞඛ්‍ය සේවා කළමනාකරණ ප්‍රවීණත්වයත් සමඟ ජාත්‍යන්තර ප්‍රමිතීන්.",
  },
  {
    description: "ශ්‍රී ලාංකික පවුල් සඳහා ලබාගත හැකි මිලකට උසස් තත්ත්වයේ සෞඛ්‍ය සේවා.",
  },
  {
    description: "Digital X-ray සහ නවීන රසායනාගාරය ඇතුළු නවීනතම උපකරණ.",
  },
  {
    description: "පිරිසිදුකම සහ රෝගී ආරක්ෂාව සම්බන්ධයෙන් ඉහළම ප්‍රමිතීන් පවත්වා ගැනීම.",
  },
  {
    description: "මීගමුවේ පහසුවෙන් ලගා විය හැකි ස්ථානයක සම්පූර්ණ සෞඛ්‍ය සේවා.",
  },
  {
    description: "Digital ලෙස file වලට පිවිසීමත් සමඟ විනිවිද පෙනෙන හා නිවැරදි බිල්පත් කිරීමේ ක්‍රියාපිළිවෙත්.",
  },
];

export const mission = {
  body: "දියුණු තාක්ෂණය රෝගී කේන්ද්‍රීය සත්කාරය සමඟ ඒකාබද්ධ කරන සම්පූර්ණ සෞඛ්‍ය සේවා විසඳුම් අපගේ ප්‍රජාවට ලබා දීම, එමගින් ඔවුන්ට තමන්ගේම සෞඛ්‍යය භාරගැනීමට හැකි කිරීම අපගේ අරමුණයි.",
};

export const vision = {
  body: "එකමුතු වූ ප්‍රයත්නයන් තුළින් ශ්‍රී ලංකාවේ සියලුම දෙනාට ලබාගත හැකි උසස්ම තත්ත්වයේ සෞඛ්‍ය සේවාව ලබා දීමට අප බලාපොරොත්තු වෙනවා.",
};

export const groupBody = [
  "දකුණු කැලිෆෝනියාවේ ප්‍රමුඛ පෙළේ ළමා සත්කාර සපයන්නෙකු වන Kids & Teens Medical Group, දරුවන් හා යෞවනයන් සඳහා දයාන්විත හා සම්පූර්ණ සෞඛ්‍ය සේවා ලබා දීමට කැපවී සිටිනවා. board-certified pediatricians 50 කට වැඩි කණ්ඩායමක් සමඟ, ඔවුන් primary care, urgent care, telehealth consultations, සහ after-hours care ඇතුළු පුළුල් සේවා පරාසයක් ලබා දෙනවා, එමගින් තරුණ රෝගීන්ට කාලෝචිත හා පුද්ගලීකරණය කළ වෛද්‍ය සත්කාර ලැබෙන බව සහතික කරනවා.",
  "මෙම strategic ව්‍යාප්තිය Kids & Teens Medical Group හි ප්‍රවීණත්වය ඇමරිකාවෙන් ඔබ්බට ගෙන ගොස්, ඔවුන්ගේ රෝගී-කේන්ද්‍රීය ප්‍රවේශය සහ උසස් තත්ත්වයේ ළමා සත්කාරය ශ්‍රී ලංකාවේ පවුල් වෙත ගෙන එනවා යැයි කැපවීම පිළිබිඹු කරනවා. නැවත ප්‍රාණවත් කරන ලද St. Joseph Hospital, මීගමුවේ දරුවන් හා යෞවනයන් සඳහා නවීනතම වෛද්‍ය සේවා සහ පහසුකම් ලබා දෙන, ළමා සෞඛ්‍ය සේවාවේ මූලික ස්ථානයක් වීමට නියමිතයි.",
];

export const storyIntro =
  "අපගේ රෝහල මෑතකදී Kids & Teens Pediatric Medical Group (Los Angeles) සහ Asia Corp විසින් මූලික කරගත් ඇමෙරිකානු ඩොලර් මිලියන 1ක ආයෝජනයකින් අලුත්වැඩියා කරන ලදී.";

export const differentIntro =
  "දේශීය ප්‍රජාවට සෞඛ්‍ය සේවා පහසුවෙන් හා ලබාගත හැකි වන පිණිස, අපගේ OPD හිදී Corporate ඉන්ෂුවරන්ස් පිළිගන්නා මීගමුවේ ප්‍රථම රෝහල අප වේ.";

export const missionIntro =
  "දියුණු තාක්ෂණය රෝගී කේන්ද්‍රීය සත්කාරය සමඟ ඒකාබද්ධ කරන සම්පූර්ණ සෞඛ්‍ය සේවා විසඳුම්";

export const groupIntro =
  "දකුණු කැලිෆෝනියාවේ ප්‍රමුඛ පෙළේ ළමා සත්කාර සපයන්නෙකු වන Kids & Teens Medical Group, දරුවන් හා යෞවනයන් සඳහා දයාන්විත හා සම්පූර්ණ සෞඛ්‍ය සේවා ලබා දීමට කැපවී සිටිනවා.";

export const hero = {};

export const sectionEyebrows = {};
