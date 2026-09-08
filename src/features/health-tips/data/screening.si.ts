// Sinhala overlay for screening.ts (`#screening`: the eleven age-based
// checks, and the section's own copy).
//
// CLINICAL FIDELITY / NUMBERS: every age, range and interval below is
// unchanged from the English base, checked by eye at every `who`/`freq`
// value: twenties (rendered "20 ගණන්", the ordinary Sinhala way of naming a
// decade, not a rounded or converted value), 30, 35, 25, 65, 40, "2 to 3",
// "3 to 5" and "1 to 2" years all carry the same digits English does.
//
// "HbA1c", "ECG" and "Mammogram" (test-name abbreviations/terms) stay bare
// English, the same never-translate class as "OPD"/"ICU"; ordinary clinical
// prose around them translates in full.
//
// The register sweep (2026-09-09) deleted `screeningSection.eyebrow`,
// `.heading` and `.cta` (the section's own eyebrow, heading and CTA, which
// used to reuse navigationLabels.si.ts's "Health check packages" and
// "Screening by age" verbatim); `screening[*]` itself is clinical content
// and is untouched below.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const screening = [
  {
    check: "රුධිර පීඩනය",
    who: "සෑම වැඩිහිටියෙක්ම, ඔබේ 20 ගණන් වයසේ සිට",
    freq: "වාර්ෂිකව",
  },
  {
    check: "රුධිර සීනි සහ HbA1c",
    who: "දකුණු ආසියාවේ අයට 30 සිට, පවුල් History එකක් හෝ අධික බරක් තියෙනවා නම් ඊටත් කලින්",
    freq: "වාර්ෂිකව",
  },
  {
    check: "Lipid Profile එක",
    who: "35 සිට, හෝ දියවැඩියාව, දුම්පානය හෝ පවුල් History එකක් තියෙනවා නම් ඊටත් කලින්",
    freq: "අවුරුදු 2 සිට 3 දක්වා",
  },
  {
    check: "බර සහ ඉණ ප්‍රමාණය",
    who: "සෑම වැඩිහිටියෙක්ම; මෙතන Scale එකට වඩා ඉණ ප්‍රමාණය වැදගත්",
    freq: "වාර්ෂිකව",
  },
  {
    check: "සම්පූර්ණ රුධිර ගණන",
    who: "දරු ප්‍රසූත වයසේ කාන්තාවන්, සහ අඛණ්ඩව මහන්සි දැනෙන ඕන කෙනෙක්",
    freq: "වාර්ෂිකව",
  },
  {
    check: "වකුගඩු ක්‍රියාකාරිත්වය සහ මුත්‍රා Protein",
    who: "දියවැඩියාව, ඉහළ රුධිර පීඩනය, හෝ එළිමහන් ශාරීරික වැඩ කරන ඕන කෙනෙක්",
    freq: "වාර්ෂිකව",
  },
  {
    check: "ගැබ්ගෙල Screening එක",
    who: "25 සිට 65 දක්වා කාන්තාවන්",
    freq: "අවුරුදු 3 සිට 5 දක්වා",
  },
  {
    check: "පියයුරු පරීක්ෂණය සහ Mammogram එක",
    who: "30 සිට Clinical පරීක්ෂණය; 40 සිට Mammogram සාකච්ඡාව",
    freq: "වාර්ෂිකව / උපදෙස් අනුව",
  },
  {
    check: "ඇස් පරීක්ෂණය",
    who: "40 සිට හැමෝම; දියවැඩියාව රෝග විනිශ්චය වුනු දා සිට වාර්ෂිකව",
    freq: "අවුරුදු 1 සිට 2 දක්වා",
  },
  {
    check: "දන්ත පරීක්ෂණය",
    who: "ඔබ තෝරාගන්න දන්ත වෛද්‍ය Practice එකක් සමඟ, සෑම වැඩිහිටියෙක්ම සහ දරුවෙක්ම",
    freq: "වාර්ෂිකව",
  },
  {
    check: "ECG සහ හෘද අවදානම",
    who: "40 සිට, හෝ රෝග ලක්ෂණ හෝ පවුල් History එකක් තියෙනවා නම් ඊටත් කලින්",
    freq: "උපදෙස් අනුව",
  },
];

export const screeningSection = {
  heading: {},
  body1:
    "වැඩිම ප්‍රයෝජනවත් Screening ලාභයි, උද්යෝගිමත් නෑ. රෝග ලක්ෂණ නැති, පවුල් History එකක් නැති කෙනෙක්ට අපේ වෛද්‍යවරු ඇත්තටම Order කරන්නේ මේවා, සහ ආසන්න වශයෙන් කොපමණ නිතරද කියලා.",
  body2:
    "දියවැඩියාව, හෘද රෝග හෝ පිළිකා පවුල් History එකක් තියෙනවා නම් හැම දෙයක්ම ඉස්සරහට යනවා. අනුමාන කරනවා වෙනුවට අපෙන් අහන්න.",
};
