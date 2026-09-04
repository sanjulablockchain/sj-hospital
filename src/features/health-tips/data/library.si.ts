// Sinhala overlay for library.ts (`#library`: the 24 article summaries, the
// featured card, and the section's own copy).
//
// `CATEGORIES`/`TIP_CATEGORIES` and every `articles[*].tag`/`featured.tag`
// are excluded in content.i18n.test.ts: they are the exact English
// structural value the filter buttons compare against and `categoryCounts()`
// keys its result by, the same never-translate role `groups.ts`'s own
// `GROUPS` plays for `Service.group`. `categoryLabels` below carries the
// translated word instead, looked up by `LibrarySection` rather than the
// structural value ever being displayed.
//
// PHARMACY VOCABULARY (standing ruling): `articles[19].by` ("Pharmacy")
// stays bare English, the same established register word this whole site
// uses (navigationLabels.si.ts's own "Pharmacy"). This is the ordinary
// "Pharmacy" (the hospital's dispensary, the byline for the antibiotic-
// course article), not the pharmacy counter's Order/Record/File/Stock
// vocabulary, none of which occurs in this file. "Physiotherapy"
// (`articles[20].by` and `articles[22].by`) stays bare English too, the
// same established compound `facilities`, `international-care` and
// `media`'s own overlays and the services feature's own `clinics.si.ts` all
// keep. Every other `articles[*].by` translates in full (see the sibling
// test note in content.i18n.test.ts's own `KEEPS_ENGLISH`).
//
// CLINICAL FIDELITY / NUMBERS: every dose, reading and duration ("160/100",
// "sixty second", "4 minute read", "day three", "day four") is unchanged
// from the English base, wherever it sits inside a sentence.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const categoryLabels: Record<string, string> = {
  All: "සියල්ල",
  "Dengue & fever": "ඩෙංගු හා උණ",
  Diabetes: "දියවැඩියාව",
  "Heart & pressure": "හදවත හා පීඩනය",
  Children: "දරුවන්",
  Women: "කාන්තාවන්",
  Kidney: "වකුගඩු",
  "Living well": "යහපත් ජීවිතය",
};

export const articles = [
  {
    title: "සතරවෙනි දිනයේ උණ තමයි වැදගත් වෙන දිනය",
    by: "හදිසි ප්‍රතිකාර කණ්ඩායම",
    lede: "ඩෙංගු බොහෝවිට හතරවෙනි දිනය ලඟදී හොඳ වගේ දැනෙනවා, ඒක Platelet ගණන අඩුවෙන කාලයම. ඒක Relax වෙන දිනය නෙවෙයි, Check කරගන්න ඕන දිනය.",
  },
  {
    title: "ඩෙංගුවට එරෙහිව සතියකට විනාඩි විස්සක්",
    by: "ප්‍රජා සෞඛ්‍යය",
    lede: "ඔබේම ගෙවත්ත වට ඇවිදිල්ල, ජලය රැඳී තියෙන ඕන දෙයක් හලලා මැදීම, ඕන ම Spray එකකට හෝ Coil එකකට වඩා වඩාත් ප්‍රයෝජනවත්.",
  },
  {
    title: "Paracetamol ඔව්, Ibuprofen එපා",
    by: "වෛද්‍යවරු",
    lede: "සැක සහිත ඩෙංගු උණකදී, Anti-inflammatory වේදනා නාශක ලේ ගැලීමේ අවදානම වැඩි කරනවා. Paracetamol සහ ජලයට එකඟව ඉන්න.",
  },
  {
    title: "කවුරුත් Enjoy නොකරන බත් කොටස ගැන කතාව",
    by: "පෝෂණවේදියා",
    lede: "බත් සම්පූර්ණයෙන්ම නවත්තන්න ඕන නෑ. ඕන වෙන්නේ කොපමණද, එක්ක මොනවද කන්නේ, කවුරුත් කන පිළිවෙළ මොකක්ද කියලා වෙනස් කරන එකයි.",
  },
  {
    title: "හැම රැයකම ඔබේ පා පරීක්ෂා කරන්න",
    by: "තුවාල Clinic එක",
    lede: "දියවැඩියා ස්නායු හානිය කියන්නේ වණයක් වේදනාවක් නැතුවම පටන් ගන්න පුළුවන් කියන එකයි. ආලෝකයක් යටතේ තත්පර 60ක බැල්මක් අත් පා කැපීම් වළක්වනවා.",
  },
  {
    title: "HbA1c: කතාවකින් වළක්කන්න බැරි ඉලක්කම",
    by: "වෛද්‍යවරු",
    lede: "උපවාස සීනි කියන්නේ අද උදේ. HbA1c කියන්නේ පසුගිය මාස තුන, ඔබ අමතක කරන්න කැමති දවස්ත් ඇතුළුව.",
  },
  {
    title: "ඉහළ රුධිර පීඩනයට රෝග ලක්ෂණ නෑ. ඒකයි ප්‍රශ්නය",
    by: "වෛද්‍යවරු",
    lede: "බොහෝ අය 160/100 දීත් සම්පූර්ණයෙන්ම හොඳින් දැනෙනවා. ඒක රෝග ලක්ෂණ ඇති කරන කොටත් සාමාන්‍යයෙන් හානියක් කරලා තියෙනවා.",
  },
  {
    title: "ලුණු හංගිලා තියෙන්නේ ඔබ සැක නොකරන දේවල්වල",
    by: "පෝෂණවේදියා",
    lede: "කරවල, අප්පලම්, Packet Soup, Biscuits සහ පාන් මේසෙන් ඔබ එකතු කරන පොකුරට වඩා ලුණු වැඩිය අරගෙන යනවා.",
  },
  {
    title: "පපුවේ වේදනාව: හදිසි එකක් කරන්නේ මොකද්ද",
    by: "හදිසි ප්‍රතිකාර කණ්ඩායම",
    lede: "තියුණු අල්ලීමකට වඩා තද බවක්, හකුවට හෝ අතට පැතිරෙනවා, දහඩිය හෝ හුස්ම ගැනීමේ අපහසුතාවත් එක්ක. ඔබම වාහනේ ධාවනය කරන්න එපා.",
  },
  {
    title: "දරුවෙකුගේ උණ: කවදද බලා ඉන්නේ, කවදද එන්නේ",
    by: "ළමා රෝග",
    lede: "මාස තුනට අඩු නම්, ඕන උණක් රෝහල් Visit එකක්. ඊට වඩා නම්, ඉලක්කමට වඩා දරුවා හැසිරෙන විදිහ තමයි වැදගත්.",
  },
  {
    title: "දරුවෙකුගේ Dehydration එක, මුලින්ම හඳුනාගැනීම",
    by: "ළමා රෝග",
    lede: "තෙත් Nappies අඩුවීම, අඬද්දී කඳුළු නැතිකම, වේළුණු මුඛයක් සහ නොපුරුදු නින්ද. ORS සරල වතුරට වඩා හොඳයි.",
  },
  {
    title: "කලබල නොවී වර්ධන Chart එකක් කියවීම",
    by: "ළමා රෝග",
    lede: "තුන්වෙනි Centile එකේ ඉන්න, තමන්ගේම රේඛාව අනුගමනය කරන දරුවෙක් සාමාන්‍යයෙන් හොඳයි. පහළට රේඛා තරණය කරන දරුවෙක් නෙවෙයි.",
  },
  {
    title: "එන්නත් Card එක ආරක්ෂිතව තියාගැනීම",
    by: "එන්නත් Clinic එක",
    lede: "අත්හැරගිය Dose එකක් අල්ලගන්න ලේසියි, ඒත් ඒක මොකක්ද කියලා ඔබ දන්නවා නම් විතරයි. Card එකේ Photo එකක් අරගෙන ඔබේ Phone එකේ තියාගන්න.",
  },
  {
    title: "යකඩ ඌනතාවය කියන්නේ මහන්සියක් දැනීම විතරක් නෙවෙයි",
    by: "වෛද්‍යවරු",
    lede: "වැඩි Periods, ගැබ්ගැනීම සහ බත් වැඩි ආහාර වේලක් මෙතන Anaemia Common කරනවා. සම්පූර්ණ රුධිර ගණනකින් දවසින් ඒක විසඳෙනවා.",
  },
  {
    title: "නිසි ලෙස කරන පියයුරු ස්ව-පරීක්ෂණය",
    by: "කාන්තා සෞඛ්‍යය",
    lede: "මසකට වතාවක්, ඔබේ Period එකෙන් සතියකට පස්සේ, හැම Cycle එකකදීම එකම වෙලාවේ. ඔබට සාමාන්‍ය දැනෙන්නේ කොහොමද කියලා ඔබ ඉගෙන ගන්නවා.",
  },
  {
    title: "ගැබ්ගැනීමට කලින් Folic Acid, පස්සේ නෙවෙයි",
    by: "ප්‍රසූතිය",
    lede: "Neural Tube එක වහන්නේ මුල් මාසේම, බොහෝවිට ඔබ ගැබ්ගත් බව දන්නවත් කලින්. ඒකයි ඒක කලින්ම පටන් ගන්නේ.",
  },
  {
    title: "වේදනා නාශක සහ ඔබේ වකුගඩු",
    by: "වෛද්‍යවරු",
    lede: "වේදනා සඳහා නිතිපතා Anti-inflammatory Tablets ගැනීම නිශ්ශබ්දව වකුගඩුවලට හානි කරනවා, විශේෂයෙන් දියවැඩියාව හෝ ඉහළ රුධිර පීඩනය එක්ක.",
  },
  {
    title: "තිගිතෙන්න කලින් බොන්න, විශේෂයෙන් එළිමහනේ",
    by: "වෛද්‍යවරු",
    lede: "ක්ෂේත්‍ර සහ එළිමහන් වැඩේ නැවත නැවත Dehydration එක වෙන්නේ නිදන්ගත වකුගඩු රෝගය එක්ක සම්බන්ධයි. තිගිතුම එන්නේ පස්සේට.",
  },
  {
    title: "ඔබේ මුත්‍රාවේ Protein තමයි මුල්ම අනතුරු ඇඟවීම",
    by: "වකුගඩු රෝග",
    lede: "වකුගඩු අවුරුදු ගණනක් රෝග ලක්ෂණ නැතුවම ක්‍රියාකාරිත්වය අඩුවෙනවා, ඉදිමීම හෝ මහන්සිය එනකන් බොහෝ කලින්ම සරල මුත්‍රා Test එකකින් ඒක සොයාගන්නවා. දියවැඩියාව හෝ ඉහළ රුධිර පීඩනය එක්ක, ඒක වාර්ෂිකව ඉල්ලන්න.",
  },
  {
    title: "හොඳට හැඟුනත් Antibiotic Course එක ඉවර කරන්න",
    by: "Pharmacy",
    lede: "කලින් නවත්තන එක වඩාත් දැඩි Bacteria ජීවත් වෙන්න ඉඩ දෙනවා. සරල ආසාදනයක් Resistant එකක් වෙන්නේ එහෙමයි.",
  },
  {
    title: "විනාඩි 30ක ඇවිදීම Compromise එකක් නෙවෙයි",
    by: "Physiotherapy",
    lede: "රුධිර පීඩනය, සීනි සහ Mood එක සම්බන්ධව, දිනපතා වේගවත් ඇවිදීමකින් මිල අධික Gym Membership එකකින් වෙන බොහෝ දේ වෙනවා.",
  },
  {
    title: "නින්ද තරුණයන්ට සුවිශේෂී දෙයක් නෙවෙයි",
    by: "වෛද්‍යවරු",
    lede: "රාත්‍රියකට පැය හයකට අඩු නින්ද රුධිර පීඩනය, ආහාර රුචිය සහ රුධිර සීනිය නිශ්ශබ්දව, ස්ථිරවම වැරදි දිසාවට තල්ලු කරනවා.",
  },
  {
    title: "වාඩිවීම අලුත් දුම්පානය, Offices තමයි නරකම",
    by: "Physiotherapy",
    lede: "විනාඩි තිහකට වතාවක් විනාඩි දෙකක් නැගිට ගමන් කිරීම, Desk දවසක් ඔබට කරන දේවලින් පුදුම ප්‍රමාණයක් අහෝසි කරනවා.",
  },
  {
    title: "බුලත් සහ පුවක්: මුලින්ම නවත්තන්න වටින පුරුද්ද",
    by: "ENT ශල්‍යකර්ම",
    lede: "හපීම ශ්‍රී ලාංකික පිරිමින්ගේ මුඛ පිළිකාවට ප්‍රධාන හේතුව, දුම්කොළ එකතු නොකළත් ඒක හානියක් කරනවා. සති තුනක් ඇතුළත සුව නොවෙන ඕන වණයක් හෝ සුදු පැල්ලමක් බැලීමට ඕන.",
  },
];

export const featured = {
  title: "සතරවෙනි දිනයේ උණ තමයි වැදගත් වෙන දිනය",
  lede: "ඩෙංගුවට කුරිරු රටාවක් තියෙනවා. හතරවෙනි දිනය ලඟදී උණ බොහෝවිට බිඳ වෙලා මිනිසුන්ට හොඳ දැනෙනවා, ඒක හරියටම Plasma කාන්දු වෙන්න පටන් ගන්නා සහ Platelet ගණන අඩුවෙන මොහොතමයි. අපි Admit කරන හැම දරුණු Case එකකම ඇතුළත් වෙන්නේ එන්න ඕන දිනයේ Relax වුනු කෙනෙක්.",
  by: "හදිසි ප්‍රතිකාර කණ්ඩායම",
  read: "විනාඩි 4ක කියවීමක්",
  points: [
    "ඩෙංගු කාලයේ ඕන උණකදී තුන්වෙනි දිනයේ සම්පූර්ණ රුධිර ගණනක් කරගන්න",
    "Paracetamol විතරයි, කවදාවත් Ibuprofen හෝ Aspirin එපා",
    "හතරවෙනි දිනයේ හොඳ දැනීම සුවවීමේ සාක්ෂියක් නෙවෙයි",
    "මුඛයේ ලේ ගැලීම, කළු මළ මූත්‍ර හෝ දරුණු බඩේ වේදනාව කියන්නේ දැන්ම එන්න කියන එකයි",
  ],
};

export const featuredKicker = "මෙතනින් පටන් ගන්න";

export const librarySection = {
  eyebrow: "01 / පුස්තකාලය",
  allHeading: "කියවන්න වටින හැම දෙයක්ම",
  filterAriaLabel: "මාතෘකාව අනුව සෞඛ්‍ය උපදෙස් Filter කරන්න",
  countTemplate: "ලිපි {total} න් {shown}ක්",
  takeAwayHeading: "වැදගත් කරුණු",
};
