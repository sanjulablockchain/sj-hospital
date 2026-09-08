// Sinhala overlay for myths.ts (`#myths`: the eight myth corrections our
// clinicians answer most often, plus the section's own copy).
//
// CLINICAL FIDELITY: each answer translates the English myth correction
// exactly, in the same order the myth (the question) is stated and the fact
// (the answer) corrects it, so the correction still reads as a correction
// rather than blurring which half is which. Nothing is softened, reordered
// or corrected beyond what the English itself says. No answer here contains
// a bare number to preserve, so there is nothing to flag for the number
// audit in this file.
//
// Drug and test names ("LDL cholesterol") keep their English abbreviation
// bare, the same never-translate class as "OPD"/"ICU"; ordinary clinical
// prose translates in full around them.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const myths = [
  {
    q: "උණට Antibiotics ගන්නද ඕන?",
    a: "සාමාන්‍යයෙන් නෑ. මෙතන තියෙන බොහෝ උණ Viral තත්ත්වයන්, Antibiotics Virus එකකට එරෙහිව මුකුත් කරන්නේ නෑ, ඒත් ඔබේ බඩේ ක්‍රියාකාරිත්වයට බාධා කරලා Resistance එකක් හදනවා. ආසාදනය Bacterial එකක් කියලා හිතන්න හේතුවක් තියෙනකොට විතරයි අපේ වෛද්‍යවරු බේහෙත් Prescribe කරන්නේ, ඒක ඇයි කියලත් දෙකෙන් එකේම එයාලා පැහැදිලි කරනවා.",
  },
  {
    q: "Saline Drip එකක් වතුර බීමට වඩා හොඳද?",
    a: "ඔබට බීමට පුළුවන් නම් නෑ. මුඛයෙන් ගන්න ජලය හොඳින්ම ශරීරයට උරාගන්නවා, Needle එකක් යවපු තැනකින් ආසාදනයක් වෙන අවදානමකුත් නෑ. කෙනෙක් වමනය කරනවා නම්, ජලය ශරීරයේ තියාගන්න බෑ නම්, හෝ දරුණු ලෙස Dehydrate වෙලා නම් Drip එකක් ඇත්තටම වගේ ප්‍රයෝජනවත්. ඒක සාමාන්‍ය Tonic එකක් නෙවෙයි.",
  },
  {
    q: "මුකුත් වැරදිලා නෑ කියලා විශ්වාස වෙන්න මට සම්පූර්ණ ශරීර Scan එකක් ඕනද?",
    a: "නෑ, ඒකෙන් හානියක්වත් වෙන්න පුළුවන්. රෝග ලක්ෂණ නැති කෙනෙක් Scan කරද්දී හානියක් නැති සොයාගැනීම් හම්බවෙනවා, ඒක තව Scans, තව කනස්සල්ල, ඉඳහිට අනවශ්‍ය ක්‍රියාපටිපාටිවලටත් තදිනවා. ඔබේ වයස සහ History එක අනුව ව්‍යුහගත Screening එකක් වඩාත් ප්‍රයෝජනවත් වෙන්නත්, ගාණකින් හුඟක් අඩුවෙන්නත් පුළුවන්.",
  },
  {
    q: "රුධිර පීඩන කියවීම සාමාන්‍ය වුනාම මගේ Tablets නවත්තන්න පුළුවන්ද?",
    a: "සාමාන්‍ය කියවීම කියන්නේ බෙහෙත වැඩ කරන එකයි, ප්‍රශ්නය නැති වෙලා යන එක නෙවෙයි. නවත්තුවහම සාමාන්‍යයෙන් සති කීපයක් ඇතුළත පීඩනය ආපහු ඉහළ යනවා, බොහෝවිට ඔබට ඒක දැනෙන්නෙවත් නැතුව. Dose එක අඩු කරගන්න හිතනවා නම්, ඒක ඔබේ වෛද්‍යවරයා එක්ක කතාවක්, බර සහ ලුණු වෙනස්කම් එක්කම කරන එකයි වඩාත් හොඳ.",
  },
  {
    q: "දියවැඩියාව ඇතිවෙන්නේ වැඩිය Sugar කන එකෙන්ද?",
    a: "Sugar එකත් එකක් වුනාට, Type 2 දියවැඩියාව බොහෝකොට Total Calories, ශරීර බර, ශාරීරික ක්‍රියාකාරකම් සහ Genetics එක ගැන දෙයක්, දකුණු ආසියාවේ අය යුරෝපීයන්ට වඩා අඩු ශරීර බරකදීම ඒක ඇතිකරගන්නවා. දිනපතා විශාල බත් කොටස් කනවා ඇතුළත රසකැම විතරක් අඩු කරන එකෙන් ඇති වෙන්නේ නෑ.",
  },
  {
    q: "ඖෂධීය සහ ආයුර්වේද බෙහෙත් මගේ Tablets එක්ක එකට ගන්න Safe ද?",
    a: "ඇතැම් ඒවා Safe, ඇතැම් ඒවා නරක විදිහට Interact වෙනවා, ඇතැම් ඒවා අක්මාවට හෝ වකුගඩුවට හානියක් වෙනකන්ම නොපෙනෙන විදිහට Hard වෙනවා. වැදගත්ම දේ තමයි ඔබ ගන්න හැම දෙයක්ම හරියටම ඔබේ වෛද්‍යවරයාට සහ Pharmacist ට කිව්වා, ලැජ්ජාවක් නැතුව, එහෙනම් Interactions Check කරන්න පුළුවන්.",
  },
  {
    q: "සුළු වශයෙන් අසාමාන්‍ය Test ප්‍රතිඵලයක් ගැන කනස්සල්ල වෙන්නද ඕන?",
    a: "බොහෝවිට නෑ. රසායනාගාර Reference Ranges සකසලා තියෙන්නේ සෞඛ්‍ය සම්පන්න අයගෙන් සුළු ප්‍රතිශතයක් ඒවායින් පිට වැටෙන විදිහට, තනිවම බලද්දී එක Borderline අගයක් සාමාන්‍යයෙන් මුකුත් අදහස් කරන්නේ නෑ. වැදගත් වෙන්නේ Trend එක, Context එක, ඒක ඔබේ රෝග ලක්ෂණවලට ගැලපෙනවද කියන එකයි.",
  },
  {
    q: "පොල් තෙල් හදවතට හොඳද නරකද?",
    a: "ඒකේ Saturated Fat වැඩියි, LDL Cholesterol ඉහළ දානවා, ඒනිසා ඒක හදවත ආරක්ෂා කරනවා කියන කියමන්වලට සාක්ෂි නෑ. එළවළු, මාළු වැඩියෙන් සහ බැදපු ආහාර අඩුවෙන් තියෙන ආහාර වේලක කොටසක් විදිහට මධ්‍යස්ථව පාවිච්චි කරනවා නම්, ඒක ප්‍රධාන ප්‍රශ්නයත් නෙවෙයි. Total ආහාර රටාව තමයි තනි අමුද්‍රව්‍යයකට වඩා වැදගත්.",
  },
];

export const mythsSection = {
  heading: {},
};
