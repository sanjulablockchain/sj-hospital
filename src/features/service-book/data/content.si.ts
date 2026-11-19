// Sinhala for the Service Book page.
//
// Code-mixed, as on every other page: the sentence is Sinhala, and the
// English nouns people actually say stay English ("Doctors", "Book",
// "Laboratory", "Tests", "Sample", "Report", "Consultants", "Parking").
// Section and service names that are also link or page names on this site
// ("Laboratory Tests", "Doctor Directory", "Free OPD", "Super Channelling")
// stay English so they match the link a reader clicks next.
//
// Only the prose translates: `editionNote`, `insideIntro` and each
// chapter's `summary`. The hero, eyebrows, headings, link labels and the
// viewer's controls are English by the register rule and are absent here.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const editionNote =
  "මේ 2026 සංස්කරණයයි. මිල ගණන් සහ Doctors ලැයිස්තුව අවුරුද්ද තුළ වෙනස් විය හැකි නිසා, අලුත්ම විස්තර හැමවිටම Laboratory Tests පිටුවේ සහ Doctor Directory එකේ තියෙනවා. Book කරන විට මිල තහවුරු කරගන්න.";

export const insideIntro =
  "පිළිගැනීමේ පිටු වල සිට Patient Guide එක දක්වා. ඕනෑම පරිච්ඡේදයක් Reader එකේ Open කරන්න, නැත්නම් මේ වෙබ් අඩවියේ ඒ ගැනම කියන පිටුවට යන්න.";

export const chapterGuide = [
  {
    summary:
      "St. Joseph Hospital එකෙන් පිළිගැනීමක් සහ සභාපති සුනිල් ද සිල්වා මහතාගේ පණිවිඩය, ඊට පස්සේ පටුන.",
  },
  {
    summary:
      "අපි කවුද: USA හි Kids and Teens Medical Group එක කළමනාකරණය කරන, American Hospital Standards වලට අනුව ක්‍රියාත්මක වන මීගමුවේ රෝහලක්, ඉරිදා සිට සෙනසුරාදා දක්වා Consultants 74 දෙනෙක් එක්ක. අප වෙත එන හැටි සහ Parking ගැනත්.",
  },
  {
    summary:
      "සේවා නවය කෙටියෙන්: Free OPD, පැය 24 Emergency Care, Super Channelling, Exercise ECG, Digital X-ray, 24/7 Laboratory, Home Visits, Delivery සහිත 24/7 Pharmacy, සහ නේවාසික රෝගීන් සඳහා කාමර මිල.",
  },
  {
    summary:
      "2026 Laboratory මිල ලැයිස්තුව: Blood Count සිට Histology දක්වා කොටස් වලින් Tests 323ක්, හැම එකකටම අවශ්‍ය Sample එක, සාමාන්‍යයෙන් Report එක ලැබෙන කාලය සහ මිල LKR වලින්.",
  },
  {
    summary:
      "Specialist කෙනෙක් Book කරන හැටි, ඊට පස්සේ විශේෂඥතාව අනුව Consultants 74 දෙනා සහ Allied Health වෘත්තිකයන් 13 දෙනාගේ සම්පූර්ණ ලැයිස්තුව.",
  },
  {
    summary:
      "Doctor කෙනෙක් Book කරන හැටි පියවරෙන් පියවර, එදිනට මතක තබාගත යුතු දේ, අපේ විවෘත වේලාවන් සහ අපව සොයාගන්නා හැටි.",
  },
];
