// Sinhala overlay for warnings.ts (`#warning`: the eleven triage rows, most
// urgent first, plus the section's own copy).
//
// CLINICAL FIDELITY: every symptom and advice line translates the English
// instruction exactly, in the same order and with the same emphasis;
// nothing is softened, reordered or corrected, including the ambulance
// number and every age/duration inside a sentence.
//
// NUMBERS: "0117 84 84 84" (row 1's own ambulance number) is unchanged from
// the English base, digit for digit. Every other number inside a sentence
// (day three, three months, two weeks, forty) is unchanged too, checked by
// eye at every occurrence.
//
// "Ambulance" stays bare English (emergency.si.ts's own established rule).
// "OPD" and "X-ray" stay bare English, the site's own never-translate class
// throughout. "Tuberculosis" translates to the standard Sinhala clinical
// term "ක්ෂය රෝගය", with the "TB" abbreviation alongside it exactly as the
// English base carries no such abbreviation itself but Sri Lankan clinical
// speech commonly does; this is the same register choice diagnostics.si.ts
// makes for other test/condition names.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const LEVEL_LABELS: Record<string, string> = {
  "Come in now": "දැන්ම එන්න",
  "Same day": "එදිනම",
  "This week": "මේ සතියේ",
  "Book routinely": "සාමාන්‍යයෙන් Book කරන්න",
};

export const warnings = [
  {
    symptom: "පපුවේ තද බවක් හකු, අත හෝ පිටට පැතිරෙනවා",
    advice:
      "විශේෂයෙන් දහඩිය දැමීම, Nausea හෝ හුස්ම ගැනීමේ අපහසුතාවක් එක්ක නම්, මෙය හෘදයාබාධයක් විදිහටම සලකන්න, වෙන කිසිවක් ඔප්පු වෙනකන්. ඔබම වාහනේ ධාවනය කරනවා වෙනුවට Ambulance එකට 0117 84 84 84 ට Call කරන්න. වෛද්‍යවරයෙක් මේ තත්ත්වයටම Aspirin තියාගන්න ඔබට කලින්ම කියලා තිබෙනවා නම්, එයාලා කිව්වා විදිහටම එය ගන්න; නැත්නම් ඔබම මුකුත් ගන්නවා වෙනුවට කණ්ඩායම එනකන් ඉන්න. විනාඩි Outcome එක වෙනස් කරනවා.",
  },
  {
    symptom: "මාස තුනට අඩු බබෙකුට ඕන උණක්",
    advice:
      "අලුත උපන් බබෙකුගේ ප්‍රතිශක්තිකරණ පද්ධතිය ආසාදනයක් බැරෑරුම් වෙනකන් අනතුරු ඇඟවීම් ටිකක් විතරයි දෙන්නේ, සහ මද වශයෙන් පෙනෙන උණ එකම ලක්ෂණය වෙන්නත් පුළුවන්. උදේ Clinic එක එනකන් බලා ඉන්න එපා, Paracetamol දීලා බලාපොරොත්තු වෙන්නත් එපා. බබාව හදිසි ප්‍රතිකාර අංශයට ගෙනියන්න.",
  },
  {
    symptom: "උණක් අතරතුර මුඛයේ ලේ ගැලීම, කළු මළ මූත්‍ර හෝ ලේ වමනය",
    advice:
      "ඩෙංගු උණකදී මේවා Plasma කාන්දු වෙනවා සහ Platelets පහත වැටිලා තියෙනවා කියන අනතුරු ඇඟවීම්. Admission එකයි Fluid කළමනාකරණයයි Outcome එක වෙනස් කරන අවස්ථාව මෙයයි. ඕන පැයක කෙලින්ම එන්න.",
  },
  {
    symptom: "එක පැත්තකට හදිසි දුර්වලකම, කැපුම් කැපුම් කතාව හෝ එල්ලෙන මුහුණ",
    advice:
      "මේක Stroke එකක්. වැඩ කරන ප්‍රතිකාර තියෙන්නේ රෝග ලක්ෂණ පටන් ගත්තු මොහොතේ ඉඳන් පැය ගණනින් මනින පටු කාලයක්, එහෙනම් වෙලාව සටහන් කරගෙන ඉක්මනින්ම එන්න. නිදාගෙන ඒක නැති වෙයිද කියලා බලා ඉන්න එපා.",
  },
  {
    symptom: "දින තුනේදීත් තියෙන උණ",
    advice:
      "බොහෝ Viral උණ දින තුනෙන් සන්සිඳෙනවා. ඒක සන්සිඳෙන්නේ නැත්නම්, විශේෂයෙන් ඩෙංගු කාලයේ, Platelets සහ Haematocrit පරීක්ෂා කරන්න සම්පූර්ණ රුධිර ගණනක් ඕන. එදිනම OPD Visit එකක් ඇති; අනතුරු ඇඟවීම් නැත්නම් හදිසි ප්‍රතිකාර අංශය ඕන නෑ.",
  },
  {
    symptom: "නිදිමතව, බුරුල්ව, හෝ බීමට ඉඳන් නැති දරුවෙක්",
    advice:
      "දරුවන් සම්බන්ධව, Behaviour එක Thermometer එකට වඩා වැඩිය කියනවා. බීමට ඉඳන් නැති, තිත්ත Nappies අඩුවෙන් තියෙන, කඳුළු නැතුව අඬන, හෝ නොපුරුදු විදිහට අවදි කරගන්න අමාරු දරුවෙක් හෙට එනකන් නොව අද දැකගන්න ඕන.",
  },
  {
    symptom: "උණ හෝ පිටේ වේදනාව එක්ක මුත්‍රා දැවීම",
    advice:
      "සරල මුත්‍රාශය ආසාදනයක් අපහසුයි ඒත් හදිසි නෑ. උණ හෝ පැත්තේ වේදනාවක් තියෙනකොට, ආසාදනය වකුගඩුවට ලංවෙන්න ඇති, ඒකට අනුමානයක් වෙනුවට මුත්‍රා Culture එකක් සහ නිසි Antibiotics ඕන.",
  },
  {
    symptom: "සති දෙකකට වඩා තියෙන කැස්සක්",
    advice:
      "Viral අසනීපයකින් පස්සේ බොහෝ කැස්ස සති දෙකක් ඇතුළත සන්සිඳෙනවා. ඊටත් වඩා, විශේෂයෙන් බර අඩුවීමක්, රෑට දහඩිය දැමීමක් හෝ පිච්චලේ ලේ එක්ක නම්, පපුවේ X-ray එකක් ඕන. ශ්‍රී ලංකාවේ ක්ෂය රෝගය (TB) හරියටම බැහැර කරන්න ඕන තරම් Common.",
  },
  {
    symptom: "අලුතින්, තද වෙලා හෝ වැඩෙන ඕන තැනක බෙල්ලක්",
    advice:
      "බොහෝ බෙල්ල හානිකර නැති බව හම්බවෙනවා, හානිකර ඒවා මුල් අවස්ථාවේම හඳුනාගත්තහම ප්‍රතිකාර කරන්න බොහෝ පහසුයි. මාස ගණනක් බලාගෙන ඉන්නවා වෙනුවට මේ සතියේම Consultation එකක් Book කරන්න. එකම Visit එකේදීම Ultrasound එකකින් සාමාන්‍යයෙන් ප්‍රශ්නය විසඳෙනවා.",
  },
  {
    symptom: "සති කීපයකට වඩා තියෙන බඩවැල් පුරුද්දේ වෙනසක්",
    advice:
      "නොනැවතෙන මලබද්ධය, වඩාත් ලිහිල් මළ මූත්‍ර, හෝ ලේ, විශේෂයෙන් 40න් එහාට, බැලීම අවශ්‍යයි. සාමාන්‍යයෙන් ඒක අර්ශස් වගේ හානිකර නොවන දෙයක්, ඒත් ඒක තහවුරු කරන තක්සේරුව සරලයි, කරන්නත් වටිනවා.",
  },
  {
    symptom: "ඔබට හොඳටම දැනෙනවා ඒත් අවුරුදු ගණනක් Check එකක් කරලා නෑ",
    advice:
      "එන්න හරියටම හොඳ වෙලාව මෙයයි. රුධිර පීඩනය, රුධිර සීනි සහ Lipid Profile එක ලාභයි, ඉක්මන්, රෝග ලක්ෂණ නැති නිසාම වැඩිම හානිය කරන තත්ත්ව අල්ලගන්නවා. ව්‍යුහගත සෞඛ්‍ය පරීක්ෂණයකට උදෑසනක් යනවා.",
  },
];

export const warningSection = {
  eyebrow: "02 / පැමිණිය යුතු වේලාව",
  heading: { line1: "බලා ඉන්නද", line2: "අද රෑම එන්නද" },
  intro:
    "අවංක පිළිතුර සඳහා රෝග ලක්ෂණයක් Open කරන්න. සැක සහිතව ඉන්නවා නම්, එන්න. ඔබව බලලා ගෙදර යවනවා අපිට වඩා හොඳයි.",
};
