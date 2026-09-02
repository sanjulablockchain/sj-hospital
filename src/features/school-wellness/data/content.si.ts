// Sinhala for the school wellness page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns and
// clinical, educational or business terms stay in English rather than being
// replaced by literary coinages nobody says out loud. So "Consent", "Report",
// "Session", "Class", "Classroom", "Hall", "Principal", "Coordinator",
// "Caretaker" and the named clinical conditions and tools ("Caries",
// "Scoliosis", "Fluorosis", "Malocclusion", "Snellen Chart", "Otoscopy",
// "Audiometry") stay in English throughout, and "Check", "Book" and "Review"
// stay verbs exactly like they are in contact's and home-care's own
// content.si.ts.
//
// "School" is NOT one of those: `navigationLabels.si.ts` already translates
// "School Wellness" to "පාසල් සුවතාව" and "Why school, not clinic" to
// "Clinic එකක් නොව පාසලක් ඇයි" for this exact page's own header and footer
// links, so "School" translates to "පාසල" here too, the same way "Negombo"
// translates to "මීගමුව" elsewhere: keeping it English would leave one page
// disagreeing with its own navigation. `hero.breadcrumbCurrent` and
// `sectionEyebrows.why` reuse those exact strings rather than inventing a
// second translation of the same English phrase.
//
// "Screening" likewise already has a site-wide translation in
// navigationLabels.si.ts ("The screening" -> "පරීක්ෂණය", "Screening by age"
// -> "වයස අනුව පරීක්ෂණ"), so it is "පරීක්ෂණය"/"පරීක්ෂණ" here rather than an
// English loanword. "By age group" and "Bring us in" are reused verbatim from
// the same file for the same reason.
//
// "Dengue" transliterates to "ඩෙංගු", the same spelling
// navigationLabels.si.ts already uses in "නිවසේ ඩෙංගු සත්කාර". "Grade"
// translates to "ශ්‍රේණිය" (a grade number is a fact and stays exactly as
// written: "1 ශ්‍රේණිය", never rounded or reworded) and "Katana" and
// "Kochchikade", the two smaller education divisions named alongside
// Negombo, translate to "කටාන" and "කොච්චිකඩේ".
//
// `training[1].title` ("Basic Life Support") is the one whole field kept in
// English: it is an internationally standardised course name, the same way
// "CT" and "MRI" stay English throughout this site rather than being coined
// into a Sinhala equivalent nobody trains under. See KEEPS_ENGLISH in
// content.i18n.test.ts.
//
// Sentence forms use the polite plural ("කරන්න"), which is how a hospital
// addresses a parent it has not met.
//
// Only translatable copy lives here. Every href, value, glyph, internal flag
// and station numeral stays in content.ts and has exactly one home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const heroFacts = [
  { k: "සිදුවෙන්නේ කොහෙද", v: "ඔබේ පාසලේම, අපේ නෙවෙයි" },
  { k: "පරීක්ෂණ දිනයක", v: "ශිෂ්‍යයන් 300ක් දක්වා" },
  { k: "සෑම දරුවෙක්ම යන්නේ", v: "මුද්‍රා තැබූ Report එකක් ගෙදරට රැගෙන" },
  { k: "ගැලපෙන්නේ", v: "ජාතික පාසල් සෞඛ්‍ය වැඩසටහනට" },
];

export const tickerItems: readonly string[] = [
  "දෘෂ්ටියයි ශ්‍රවණයයි",
  "උස, බර සහ වර්ධනය",
  "දන්ත පරීක්ෂණය",
  "කොඳු ඇට පෙළ සහ ඉරියව්ව",
  "රක්තහීනතා පරීක්ෂණය",
  "ගුරුවරුන්ට ප්‍රථමාධාර පුහුණුව",
  "පාසල් බිමේ ඩෙංගු",
];

export const jumpCards = [
  { count: "ඇයි පාසල", label: "Clinic එක නෙවෙයි", note: "ඕන කරන දරුවෝ කවදාවත් එන්නේ නෑ." },
  { count: "මධ්‍යස්ථාන 9ක්", label: "පරීක්ෂණය", note: "උදෑසනක්, ශිෂ්‍යයන් 300ක් දක්වා." },
  {
    count: "කාණ්ඩ 5ක්",
    label: "වයස් කාණ්ඩය අනුව",
    note: "1 ශ්‍රේණියේ සිට ජ්‍යෙෂ්ඨ ශ්‍රේණි දක්වා.",
  },
  {
    count: "පිළිතුරු 9ක්",
    label: "සාධාරණ ප්‍රශ්න",
    note: "Consent එක, වියදම, පෞද්ගලිකත්වය, දෙමව්පියන්ට ලැබෙන දේ.",
  },
];

export const whyHeading = "වඩාත්ම අවශ්‍ය දරුවෝ කවදාවත් රෝහලට එන්නේ නෑ";
export const whyBody =
  "යමක් පැහැදිලිවම වැරදුනාම තමයි පවුලක් දරුවෙක්ව රෝහලට ගේන්නේ. කණ්ණාඩි ඕන වෙයි කියලා, නැත්නම් Haemoglobin එක අඩුයි කියලා කිසිම කෙනෙක් දරුවෙක්ව ගේන්නේ නෑ. ඒ තත්ත්ව නිහඬයි, ඒවා සුලභයි, ඒවා නිශ්ශබ්දවම දරුවෙකුගෙන් පාසල් අවුරුදු ගාණක් උදුරාගන්නවා. ඒවා සොයාගන්න තියෙන එකම විදිහ දරුවෝ දැනටමත් ඉන්න තැනටම යන එකයි.";

export const whyFindingsLabel = "සාමාන්‍යයෙන් අප සොයාගන්නා දේ";

export const findings: readonly string[] = [
  "පස්සේ වාඩිවෙලා Board එක කියවන්න බැරි දරුවෝ, කවුරුත් ඒක Test කරලා තිබුනේ නෑ",
  "සුව නොකළ දන්ත Caries, හැම වයසකදීම වඩාත්ම සුලභ සොයාගැනීම",
  "අඩු Haemoglobin, විශේෂයෙන් නව යොවුන් වියේ දැරියන්ට",
  "සාමාන්‍ය පරාසයෙන් එහාට මෙහාට වර්ධනය, එකම Classroom එකේ අඩු බරැති සහ තරබාරු දරුවෝ",
  "සුව නොකළ කන් ආසාදන නිසා ශ්‍රවණ හානි, අවධානය නැති කමක් කියලා වැරදියට තේරුම් ගන්නවා",
];

export const screeningHeading = { line1: "මධ්‍යස්ථාන නවයයි,", line2: "උදෑසනක්" };
export const screeningIntro =
  "Hall එකක හෝ Classrooms දෙකක Set up කරනවා. දරුවෝ Class Groups වශයෙන් ගමන් කරනවා, එහෙනම් කිසිම පාඩමකට විනාඩි තිහකට වඩා අහිමි වෙන්නේ නෑ.";

export const stations = [
  {
    title: "දෘෂ්ටිය",
    body: "මීටර් හයක Snellen Chart එකකින් ඇස් දෙකෙන්ම Distance Acuity එක, Near Vision එක, Squint එක සහ වර්ණ දෘෂ්ටිය. Threshold එකට අඩු දරුවෙක් නම් නිසි Refraction එකකට Refer කරනවා.",
    more: "අල්ලා ගන්නේ: පස්සේ පේළියේ ප්‍රශ්නය",
  },
  {
    title: "ශ්‍රවණය",
    body: "Whisper සහ Tuning Fork Screening, Wax, Perforation සහ Glue Ear බලන්න Otoscopy සමඟ. Pass නොවන දරුවෝ Audiometry සඳහා යවනවා.",
    more: "අල්ලා ගන්නේ: වැරදියට තේරුම් ගත් අවධානම් නැති කම",
  },
  {
    title: "වර්ධනය",
    body: "උස, බර සහ Body Mass Index එක දරුවාගේම Centile Chart එකේ Plot කරනවා, එක් අංකයකට එරෙහිව විනිශ්චය කරන්නේ නෑ. ජ්‍යෙෂ්ඨ ශ්‍රේණි වල ඉණ මනිනවා.",
    more: "අල්ලා ගන්නේ: Stunting එකයි තරබාරුකමයි",
  },
  {
    title: "දන්ත",
    body: "Caries, Gum Disease, Fluorosis සහ Malocclusion සඳහා බැලීමක්, Fluoride උපදෙස් සහ Brushing Technique එතනදීම පෙන්නනවා.",
    more: "අල්ලා ගන්නේ: වඩාත්ම සුලභ සොයාගැනීම",
  },
  {
    title: "රක්තහීනතාව",
    body: "පාසල ඉල්ලුවොත් Finger Prick එකකින් Haemoglobin, දෙමව්පියන්ගේ Consent එකත් සමඟ. නව යොවුන් වියේ දැරියෝ ප්‍රමුඛතා කාණ්ඩයයි.",
    more: "අල්ලා ගන්නේ: මහන්සි ශිෂ්‍යයා",
  },
  {
    title: "කොඳු ඇට පෙළ සහ ඉරියව්ව",
    body: "Scoliosis සඳහා Forward Bend Test එකක්, ඊට අමතරව ඉරියව්ව, ඇවිදින විදිහ සහ පැතලි පාද. වර්ධන Spurt අවුරුදු වලදී අල්ලාගත්තොත්, බොහෝ විට හදාගන්න පුළුවන්.",
    more: "අල්ලා ගන්නේ: Scoliosis, කලින්",
  },
  {
    title: "සාමාන්‍ය පරීක්ෂණය",
    body: "හෘද ශබ්ද, පපුව, Thyroid, Lymph Nodes, සම සහ බඩ බැලීමක්, එකම Gender එකේ Staff කෙනෙක් ඉන්න Screen එකක් පිටුපස.",
    more: "අල්ලා ගන්නේ: අනපේක්ෂිත Murmur එක",
  },
  {
    title: "එන්නත් වාර්තාව",
    body: "Immunisation Card එක ජාතික Schedule එකට එරෙහිව Check කරලා, නැති කොටස් දෙමව්පියන්ට List කරනවා, ළඟින්ම Catch Up කරගන්නේ කොහෙන්ද කියලත් සමඟ.",
    more: "අල්ලා ගන්නේ: මග හැරුණු Dose එක",
  },
  {
    title: "සුවතා සංවාදය",
    body: "ජ්‍යෙෂ්ඨ ශ්‍රේණි වල නින්ද, Screens, මනෝභාවය, Bullying සහ විභාග පීඩනය ගැන කෙටි පෞද්ගලික සංවාදයක්. කැමැත්තෙන් විතරයි, ගුරුවරුන්ට කවදාවත් Report කරන්නේ නෑ.",
    more: "අල්ලා ගන්නේ: කිසිවෙක් නොඅහන දේ",
  },
];

export const gradeBandsHeading = { line1: "විවිධ", line2: "වයස්, විවිධ", line3: "කරදර" };
export const gradeBandsIntro =
  "ජාතික පාසල් සෞඛ්‍ය වැඩසටහන අවධානය යොමු කරන්නේ 1, 4, 7 සහ 10 ශ්‍රේණි වලටයි. අපි ඒ රිද්මයම අනුගමනය කරලා, පාසල ඉල්ලන දේත් එකතු කරනවා.";

export const gradeBands = [
  {
    band: "1 ශ්‍රේණිය",
    title: "පළමු නිසි බැල්ම",
    body: "බොහෝ දරුවන්ට බාල්‍ය කාලයෙන් පසු පළමු සෞඛ්‍ය පරීක්ෂණය මෙයයි. දෘෂ්ටියයි ශ්‍රවණයයි මෙතන වඩාත්ම වැදගත්, මොකද පළමු අවුරුද්දේදී ගුරුවරයා පේන්නේ නැති, ඇහෙන්නේ නැති දරුවෙක් පස්සේ අල්ලගන්නේ කලාතුරකිනුයි. වර්ධනය, දත් සහ එන්නත් Card එක Check කරනවා, බාල්‍ය කාලයේදී මග ඇරුණු Congenital ප්‍රශ්නයක් නම් මේ Station එකේදී බොහෝ විට මතු වෙනවා.",
  },
  {
    band: "4 ශ්‍රේණිය",
    title: "පුරුදු තහවුරු වෙන කාලය",
    body: "දන්ත Caries සහ බර තමයි මේ වයසේදී කතාව. දැන් හදාගන්නා ආහාර සහ ක්‍රියාකාරකම් රටාවන් වැඩිපුරම දිගටම පවතිනවා, දෙමව්පියෙක් සමඟ පෝෂණය ගැන කතාවක් තාමත් යමක් වෙනස් කරන අවස්ථාවත් මෙයයි. හත සහ දහය අතර දුර දෘෂ්ටි දෝෂය සාමාන්‍යයෙන් මතුවෙන නිසා දෘෂ්ටිය නැවත Check කරනවා.",
  },
  {
    band: "7 ශ්‍රේණිය",
    title: "වර්ධන Spurt එක",
    body: "Scoliosis පරීක්ෂණය මේ කාණ්ඩයේදී වඩාත්ම වැදගත්, මොකද වර්ධන Spurt කාලයේදී හමුවෙන Curve එකක් බොහෝ විට සැත්කමකින් තොරව Bracing එකකින්ම හසුරුවගන්න පුළුවන්. රක්තහීනතා පරීක්ෂණය තදින්ම පටන් ගන්නවා, ඔසප් සෞඛ්‍යය ගැනත් දැරියන් සමඟ ඔවුන්ටම වෙන් වූ Session එකකදී කතා කරනවා.",
  },
  {
    band: "10 ශ්‍රේණිය",
    title: "විභාග අවුරුද්දේ පීඩනය",
    body: "ශාරීරිකව මේ කාණ්ඩය සරළයි. සරළ නැත්තේ නින්ද, Stress එක, මේසයක දිගු වේලා ඉඳීමෙන් එන ඉරියව්ව, ඇස් වෙහෙස, සහ සමහර ශිෂ්‍යයන්ට Tobacco හෝ Alcohol පළමු වතාවට පාවිච්චි කිරීමයි. සුවතා සංවාදයට මෙතන ඕනෑම මිනුමකට වඩා බර තියෙනවා.",
  },
  {
    band: "ක්‍රීඩා කණ්ඩායම්",
    title: "Season එක පටන් ගන්න කලින්",
    body: "පාසලේ කණ්ඩායමක ඕනෑම ශිෂ්‍යයෙකුට Pre Participation Check එකක්: හෘද ශබ්ද සහ රිද්මය, රුධිර පීඩනය, වෙහෙසෙන විට Fainting හෝ පපුවේ වේදනා History එකක්, කලින් තුවාල සහ Joint Stability. තරුණ ක්‍රීඩකයන්ට හදිසි හෘද සිදුවීම් දුර්ලභයි, දුර්ලභ Case එක සොයාගන්නේ මෙහෙමයි.",
  },
];

export const teacherHeading = { line1: "පළමුවෙන්ම එහෙ", line2: "ඉන්න අයට", line3: "පුහුණුව දෙන්න" };
export const teacherIntro =
  "අඟහරුවාදා දහවල දරුවෙක් වැටුනොත්, ලඟින්ම දණහිස Bend කරන කෙනා ගුරුවරයෙක්. මේ Sessions වැඩසටහනේ පාසල් වලට නොමිලේ පවත්වනවා.";

export const training = [
  {
    kicker: "අඩක් දවසක්",
    title: "ගුරුවරුන්ට ප්‍රථමාධාර",
    body: "ලේ ගැලීම, පිළිස්සීම්, අස්ථි බිඳීම්, හුස්ම හිරවීම, Seizures සහ Fainting, කථා කරනවා වෙනුවට ප්‍රායෝගිකව පුහුණු කරනවා. සෑම Participant කෙනෙක්ම Scenario එක තමන්ම හසුරුවනවා.",
    more: "සියලුම ගුරු Staff",
  },
  {
    // Kept in English: an internationally standardised course name, the same
    // way CT and MRI stay English throughout this site. See the file header
    // and KEEPS_ENGLISH in content.i18n.test.ts.
    kicker: "පැය දෙකක්",
    title: "Basic Life Support",
    body: "Manikin එකක Chest Compressions සහ Rescue Breathing, ඊට අමතරව Ambulance එක Gate එකට එනකන් Emergency එකක් හසුරුවන විදිහ.",
    more: "Sports සහ Science Staff",
  },
  {
    kicker: "පැය දෙකක්",
    title: "අසනීප දරුවා",
    body: "Sick Room එකේ වැතිරෙනවා වෙනුවට අද රෝහලකට ඕන දරුවා හඳුනාගැනීම. Asthma Attacks, Dehydration, High Fever, Allergic Reactions.",
    more: "Class ගුරුවරු, Matrons",
  },
  {
    kicker: "පැයක්",
    title: "අසනීප කාමරයේ Review එකක්",
    body: "ඔබේ Sick Room Stock එක, Expiry Dates සහ වාර්තා අපි Review කරලා, නැති දේ මොනවද, ළඟින්ම ගන්නේ කොහෙන්ද කියලා ලියපු List එකක් තියලා යනවා.",
    more: "එය හසුරුවන ඕනෑම කෙනෙක්",
  },
];

export const dengueHeading = { line1: "ඩෙංගු කියන්නේ", line2: "පාසල් ප්‍රශ්නයක්" };
export const dengueIntro =
  "මදුරුවා දෂ්ට කරන්නේ දහවල් වෙලාවේ, ඒ කියන්නේ දරුවෝ දෂ්ට වෙන්නේ පාසලේදී, ඇඳේ නිවසේ නෙවෙයි. Corridor එකක Pot එකක් යටින් තියෙන Tray එකක් හෝ අවහිර වූ එක් Gutter එකකින් Class එකක් පුරාම ප්‍රමාණවත්.";
export const dengueNote =
  "ඔබේ Caretaker සමඟ අපි පරිශ්‍රය තුළ ඇවිද, බෝවීමේ ස්ථාන Plan එකක සලකුණු කරලා, අප නැතුවම ඔබේම Staff එකට සතිපතා නැවත කරගන්න පුළුවන් Checklist එකක් අත ලා දෙනවා.";
export const dengueFindingsLabel = "සාමාන්‍යයෙන් අප සොයාගන්නා ස්ථාන";

export const breedingSites: readonly string[] = [
  "වැසි කාලයෙන් පසු කොළවලින් අවහිර වූ වහල Gutters",
  "Corridors සහ කාර්යාලයේ Pot පැළෑටි යටින් තියෙන Trays",
  "Sports Store එක පිටුපස දමා තිබෙන Tyres",
  "වැසුමක් නැති ජල ගබඩා බැරල් සහ උඩුමහල් Tanks",
  "කලාතුරකින් පාවිච්චි කරන Toilet Blocks වල අවහිර වූ බිම් කාණු",
  "කසළ ගොඩවල් තුළ බෝතල්, කෝප්ප සහ දිවා ආහාර Containers",
  "සීමාවේ පොල් කටු සහ ගස් කඳන්",
  "Caretaker ගේ Store එකේ පාවිච්චි නොකරන Tanks, බාල්දි සහ බේසම්",
  "දමා තිබෙන ඉදිකිරීම් Debris සහ Cement මිශ්‍ර කරන Trays",
];

export const followUpHeading = {
  line1: "Report එකකින්",
  line2: "ඉවර වෙන",
  line3: "පරීක්ෂණයක්",
  line4: "අඩක් විතරයි",
};
export const followUpIntro =
  "වැදගත් වෙන්නේ Data එක නෙවෙයි. වැදගත් වෙන්නේ අඩු Haemoglobin තියෙන දරුවා ඇත්තටම Treatment ලබන එකයි. Flag කරපු හැම දරුවෙක්වම යමක් වෙනතුරු Track කරනවා.";
export const followUpCta = "Coordinator සමඟ කතා කරන්න";

export const followUp = [
  {
    when: "එදිනම",
    what: "හදිසි අවධානයක් ඕන දරුවෙක් නම් අපි යනකොටම හඳුනාගන්නවා, දෙමව්පියාට එදින දහවලම Note එකක් යවනවා වෙනුවට Call කරනවා.",
  },
  {
    when: "දින 10ක් ඇතුළත",
    what: "සෑම දරුවෙක්ම ගෙදර යන්නේ දෙමව්පියාගේ භාෂාවෙන් මුද්‍රා තැබූ පුද්ගලික Report එකක් සමඟ, සොයාගත් දේ සහ ඊළඟට හරියටම කරන්න ඕන දේ සඳහන් කරමින්.",
  },
  {
    when: "දින 10ක් ඇතුළත",
    what: "Principal ට පුද්ගලික නම් නැති Aggregate Report එකක් ලැබෙනවා: කීයදෙනෙක් පරීක්ෂණයට ලක් වුනාද, කොපමණ ප්‍රතිශතයකට එක් එක් සොයාගැනීම තිබුනාද කියලා.",
  },
  {
    when: "සති දෙකකින්",
    what: "Flag කළ හැම දරුවෙක්ගේම දෙමව්පියන්ට Coordinator Call කරලා Referral එක තේරුම් ගත්තාද කියලා Check කරලා, Appointment එක Book කරගන්න උදව් කරනවා.",
  },
  {
    when: "සති හයකින්",
    what: "තවම යමක් කරලා නැති අයට දෙවෙනි Call එකක්. බොහෝ වැඩසටහන් මග හරින Step එක මෙයයි, පරීක්ෂණයේ අගයක් තිබුනාද කියලා තීරණය කරන Step එකත් මෙයමයි.",
  },
  {
    when: "ඊළඟ Term එකේදී",
    what: "Flag කළ දරුවන් පාසලේදීම නැවත Check කරනවා, එහෙනම් කවදාවත් Fill නොකළ කණ්ණාඩි Prescription එකක් File එක ඇතුළේ නැති වෙන්නේ නෑ.",
  },
];

export const faqHeading = { line1: "අපිගෙන් අහන්න", line2: "සාධාරණ ප්‍රශ්න" };

export const faq = [
  {
    q: "මේක රජයේ පාසල් වෛද්‍ය පරීක්ෂණයට ආදේශකයක්ද?",
    a: "නෑ, දෙමව්පියන්ට ඒ විදිහට Present කරන්නත් එපා. ඔබේ ප්‍රදේශයේ Medical Officer of Health සහ Public Health Midwife හරහා ක්‍රියාත්මක වන Ministry of Health පාසල් වෛද්‍ය පරීක්ෂණය, තවමත් Statutory වැඩසටහනයි, අපි ඒක සමඟ එකට වැඩ කරනවා. අපි එකතු කරන්නේ ජාතික වැඩසටහන Cover නොකරන අවුරුදු වල Second Pass එකක්, යමක් හමුවුනොත් Specialist කෙනෙක් ලඟට ඉක්මන් මාර්ගයක්, සහ Routine Inspection එකකට වේලාවක් නැති දේවල් කිහිපයකට පරීක්ෂණයක්.",
  },
  {
    q: "පාසලට මේකෙන් වියදමක් තියෙනවද?",
    a: "පරීක්ෂණ දිනයමයි ගුරු පුහුණු Sessions ත් රෝහලේ Community වැඩසටහනේ කොටසක් විදිහට මීගමුව, කටාන සහ කොච්චිකඩේ අධ්‍යාපන කලාප වල රජයේ පාසල් වලට නොමිලේ දෙනවා. Private සහ International පාසල් වලට Publish කළ Rate එකකට ශිෂ්‍යයෙකුට අනුව Charge කරනවා. දරුවෙකුට Onward Treatment එකක් ඕන නම්, ඒක සාමාන්‍ය පරිදි Bill කරනවා, පරීක්ෂණයට කොන්දේසියක් විදිහට කිසිම පවුලක් මේ රෝහලේ Treatment එකට කවදාවත් බැඳෙන්නේ නෑ.",
  },
  {
    q: "දෙමව්පියන්ගේ Consent එකක් ඕනද?",
    a: "ඔව්, ලිඛිතව, දවසට කලින්. හරියටම මොනවද Check කරන්නේ, රක්තහීනතා පරීක්ෂණයක් ඉල්ලුවොත් Finger Prick Blood Sample එකකුත් ඇතුළත් වෙනවා කියලා පැහැදිලි කරන Sinhala, Tamil සහ English Consent Form එකක් අපි දෙනවා. දෙමව්පියා Consent දුන්නේ නැති, හෝ එදින Examine වෙන්න කැමති නැති ඕනෑම දරුවෙක් Examine කරන්නේ නෑ. කිසිම කෙනෙක් වෙන් කරලා පෙන්නන්නේ නෑ.",
  },
  {
    q: "දරුවා Examine කරන්නේ පෞද්ගලිකවද?",
    a: "දෘෂ්ටිය, ශ්‍රවණය සහ දන්ත Stations Open Hall එකේදීම වෙනවා. සාමාන්‍ය පරීක්ෂණයයි, කොඳු ඇට පෙළ බලන්න Shirt එක උස්සන ඕන ඕනෑම දෙයක්ම, එකම Gender එකේ Staff කෙනෙක් ඉන්න Screen එකක් පිටුපස වෙනවා. නව යොවුන් වියේ අයට Room එකේ ඉන්න ශිෂ්‍යයන් විශ්වාස කරන ගුරුවරයෙක් Nominate කරන්න පාසලෙන් අහනවා. මේක අපේ පැත්තෙන් Negotiable දෙයක් නෙවෙයි.",
  },
  {
    q: "දෙමව්පියන්ට ඇත්තටම ලැබෙන්නේ මොකක්ද?",
    a: "දින දහයක් ඇතුළත දරුවා සමඟ ගෙදර යවන මුද්‍රා තැබූ පුද්ගලික Report එකක්, දෙමව්පියා කැමති භාෂාවෙන් සරළව ලියපු. මොනවද Check කළේ, මොනවද Normal, මොනවද නොවුනා, ඊළඟට හරියටම කරන්න ඕන දේ ඒකේ තියෙනවා. Referral එකක් ඕන තැන Report එකේ Clinic එකේ නමයි Call කරන්න Number එකයි දෙනවා, වෛද්‍යවරයෙක්ව බලන්න කියලා දෙමව්පියාට අපැහැදිලිව කියනවා වෙනුවට.",
  },
  {
    q: "පාසලට පුද්ගලික ප්‍රතිඵල පේනවද?",
    a: "Principal ට ලැබෙන්නේ Aggregate Report එකක්: කී දෙනෙක් පරීක්ෂණයට ලක් වුනාද, කී ප්‍රතිශතයකට අඩු දෘෂ්ටිය, දන්ත Caries, අඩු Haemoglobin, සාමාන්‍ය පරාසයෙන් එහාට වර්ධනය තිබුනාද කියලා. පුද්ගලික Clinical සොයාගැනීම් යන්නේ දෙමව්පියාට, Staff Room එකට නෙවෙයි. ව්‍යතිරේකය, දෙමව්පියාගේ Consent එකත් සමඟ, ඉදිරියෙන් වාඩිවෙන්න ඕන දරුවෙක් හෝ අලුතින් Asthma Diagnose වුන දරුවෙක් වගේ, පාසලට දිනපතා Manage කරන්න ඕන තත්ත්වයක් නම් විතරයි.",
  },
  {
    q: "පරීක්ෂණ දිනයකට කොපමණ වේලාවක් යනවද?",
    a: "මධ්‍යස්ථාන නවයක් දුවනකොට ශිෂ්‍යයන් 300ක් පමණ දක්වා උදෑසනක්. වැඩි පාසල් වලට දින දෙකකට හෝ තුනකට බෙදනවා, සාමාන්‍යයෙන් දිනකට ශ්‍රේණි කාණ්ඩයක්. අපිට ඕන Hall එකක් හෝ ලඟ ලඟම Classrooms දෙකක්, Tables, පුටු, Power Point එකක් සහ Screen කරගන්න පුළුවන් Corner එකක්. පළමු Class එක එනකන් Setup එකට විනාඩි හතළිස් පහක් විතර යනවා.",
  },
  {
    q: "කණ්ණාඩි ඕන වුනාට Afford කරගන්න බැරි දරුවන්ට මොකක්ද?",
    a: "මේ තමයි වඩාත්ම සුලභ Gap එකයි, විසඳන්න වඩාත්ම වටින එකයි, මොකද මුළු වැඩසටහනේම කණ්ණාඩි Pair එකක් තමයි ලාභම Intervention එක, School Report Card එක වෙනස් කරන එකත් ඒකමයි. පවුලට වියදම දරාගන්න බැරි දරුවන් සඳහා අපේ Optical Partner සමඟ කුඩා අරමුදලක් තියාගන්නවා, Principal ගේ නිර්දේශය මත පාසල හරහා Allocate කරනවා, දරුවා ඔවුන්ගේ Class එකට Identify කරාම නැතුව.",
  },
  {
    q: "ශිෂ්‍යයන්ට Health Education Session එකකට උදව් කරන්න පුළුවන්ද?",
    a: "ඔව්, පාසල් Ask කරන්නේ වැඩිපුරම මේ කොටසමයි. Sessions Period එකක් දුවනවා, වයස අනුව Pitch කරනවා: Primary Grades වලට අත් සේදීමයි දන්ත සත්කාරයයි, Middle School එකේ ඩෙංගු සහ පෝෂණය, ජ්‍යෙෂ්ඨ ශ්‍රේණි වලට නව යොවුන් වියේ සෞඛ්‍යය, Screen Time, නින්ද සහ Substance Awareness. එදිනම හවසට දෙමව්පියන්ට වෙනම Session එකක් ඔබ හිතනවට වඩා හොඳ Turnout එකක් සාමාන්‍යයෙන් ලැබෙනවා.",
  },
];

export const contactRows = [
  { label: "රෝහලට Call කරන්න" },
  { label: "රෝහලට Email කරන්න" },
  { label: "අපට WhatsApp කරන්න" },
  { label: "දෙමව්පියන්ට Health Tips" },
];

export const bookingChecklist: readonly string[] = [
  "ශිෂ්‍ය සංඛ්‍යාව",
  "ඇතුළත් කරන ශ්‍රේණි",
  "Hall එකක් හෝ Classrooms දෙකක්",
  "Term දින",
];

export const disclaimer =
  "පාසල් පරීක්ෂණය Ministry of Health පාසල් වෛද්‍ය පරීක්ෂණයයි ඔබේ Division එකේ Public Health Midwife සහ Medical Officer of Health සේවා ත් Complement කරනවා මිසක් ආදේශ කරන්නේ නෑ. සොයාගැනීම් පාසලයි දෙමව්පියායි එක්කම Share කරනවා; ඉදිරි දැනුම්දීම යන්නේ පාසලේම ප්‍රදේශයේ MOH එක සමඟ තියෙන එකඟතා අනුවයි.";

export const hero = {
  strapline: "අපි පාසලට එනවා",
  breadcrumbHome: "මුල් පිටුව",
  // Reused verbatim from navigationLabels.si.ts's "School Wellness" ->
  // "පාසල් සුවතාව": this page's own header and footer already print that
  // translation, so the breadcrumb has to agree with it.
  breadcrumbCurrent: "පාසල් සුවතාව",
  headingLead: "ප්‍රශ්නය",
  headingOutline: "කවුරුවත්",
  headingAccent: "දැක්කේ නෑ.",
  bookCta: "අපිව ඔබේ පාසලට කැඳවන්න",
  // Short deliberately: this sits inside a whitespace-nowrap pill at 360px
  // (see WellnessHero.tsx), the same trap that cost e-channeling's
  // helpRail.heading a rewrite. A one-line punchy phrase, not the full
  // English sentence.
  exploreCta: "පරීක්ෂණයේ දේ",
};

export const heroStandfirst =
  "Board එක කියවන්න බැරි දරුවා මන්දගාමී කෙනෙක් නෙවෙයි. Class එකේදී නින්ද යන දරුවා රක්තහීන කෙනෙක් වෙන්න පුළුවන්. අපේ කණ්ඩායම ඔබේ පාසලට ඇවිත්, සෑම ශිෂ්‍යයෙක්වම පරීක්ෂා කරලා, කවුද වෛද්‍යවරයෙක් ඕන කියලා ඔබට කියනවා.";

export const bookHeading = { line1: "උදෑසනක්.", line2: "සෑම දරුවෙක්ම", line3: "පරීක්ෂා කරනවා." };
export const bookIntro =
  "ඔබේ ශිෂ්‍ය සංඛ්‍යාව සහ ගැලපෙන Term දින අපිට කියන්න. අපි මුලින්ම ඇවිත් Hall එක බලනවා, ඊට පස්සේ දිනයක් තහවුරු කරනවා. මීගමුව, කටාන සහ කොච්චිකඩේ කලාප වල පාසල් අපේ ප්‍රමුඛතාවයි.";

// Every value below is reused verbatim from navigationLabels.si.ts where that
// file already translates the same English phrase for this page's own header
// and footer links ("Why school, not clinic", "The screening", "By age
// group", "Bring us in"): see the file header. `faq`'s own "Principal" stays
// an English loanword throughout its body copy, so the eyebrow matches rather
// than switching to the formal "විදුහල්පති" only here.
export const sectionEyebrows = {
  why: "01 / Clinic එකක් නොව පාසලක් ඇයි",
  programme: "02 / පරීක්ෂණය",
  grades: "03 / වයස් කාණ්ඩය අනුව",
  teachers: "04 / ගුරු කාමරය සඳහා",
  dengue: "05 / පාසල් බිම",
  referral: "06 / පරීක්ෂණයෙන් පසු",
  faq: "07 / Principal ලාට සහ දෙමව්පියන්ට",
  book: "08 / අපව ආරාධනා කරන්න",
};
