// Sinhala overlay for firstAid.ts (`#firstaid`: the four first aid steps,
// the home kit, the emergency numbers, and the section's own copy).
//
// CLINICAL FIDELITY: every step below translates the English instruction
// exactly, in the same order and with the same emphasis; nothing is
// softened, reordered or corrected. Every number (twenty minutes, five back
// blows, five thrusts, ten minutes) is unchanged from the English base,
// including where it sits inside a sentence.
//
// "Ambulance" and "Pharmacy" stay bare English throughout, the same
// established register word this whole site uses (emergency.si.ts's own
// header for "Ambulance"; navigationLabels.si.ts's own "Pharmacy").
// "Paracetamol" (a drug name) stays bare English, matching the register
// rule's own "drug classes, brands" exception and this feature's own
// myths.ts, which never translates a drug name either. "Digital" reuses the
// site's own established "Digital X-ray" compound (services/data/
// indexContent.si.ts's own KEEPS_ENGLISH) for the identical adjective in
// front of another medical device. "ORS" is the internationally standard
// acronym for oral rehydration salts, said in English in Sri Lanka too, the
// same never-translate class as "OPD"/"ICU". Every other home-kit item and
// number label translates in full: `pharmacy/data/content.si.ts`'s own
// "Dressings"/"Tapes"/"Antiseptics"/"Thermometers" (its own stock-category
// names) are NOT reused here, because a first aid kit list is not that
// feature's stock catalogue, and the task's own recipe flags exactly this
// kind of borrowed exception ("pharmacy swept four generic supply
// categories into keeps-English and they had to be pulled back out").

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const firstAidSteps = [
  {
    kind: "පිලිස්සීම්",
    title: "සිසිල් වතුර, විනාඩි විස්සක්",
    action:
      "පිලිස්සුම සම්පූර්ණ විනාඩි විස්සක් සිසිල් ගලායන වතුර යටතේ තියාගන්න, ඊට පස්සේ Cling Film එකකින් හෝ පිරිසිදු රෙද්දකින් ලිහිල්ව වහන්න. අත් තලයකට වඩා විශාල ඕන දෙයක් සඳහාත්, මුහුණේ, අත්වල හෝ සන්ධියක් හරහා තියෙන ඕන පිලිස්සීමකදීත් එන්න.",
    avoid: "අයිස්, දත් Paste, බටර්, හෝ බුබුළු පිපිරවීම",
  },
  {
    kind: "හුස්ම හිරවීම",
    title: "පිටේට පහරවීම් පහක්, තට්ටුවීම් පහක්",
    action:
      "එයාට කැස්සන්නවත් කතාකරන්නවත් බෑ නම්, එයාව ඉස්සරහට නමා උරහිස් අස්තකර දෙක අතරට තියුණු පහරවීම් පහක් දෙන්න, ඊට පස්සේ බඩේ තට්ටුවීම් පහක් දෙන්න. මාරුවෙන් මාරුවට කරගෙන යන්න, ඒ අතරේම කවුරු හරි කෙනෙක්ට Ambulance එකට Call කරන්න කියලා දෙන්න.",
    avoid: "බලාගෙනවත් බැරුව අත කටේ ඇතුළට දාලා එය අස්සගන්න හදන එක",
  },
  {
    kind: "ලේ ගැලීම",
    title: "තදින් තද කරන්න, තද කරගෙන ඉන්න",
    action:
      "තුවාලය මතට පිරිසිදු රෙද්දක් තියලා තදින් තද කරගෙන ඉන්න, පුළුවන් නම් අත හෝ පාද හදවතට වඩා උසට එසවගෙන. විනාඩි දහයක් නොකඩවා තද කරගෙන ඉන්නවා නම් වැඩිම ලේ ගැලීම් නවතිනවා.",
    avoid: "විනාඩියෙන් විනාඩියට රෙද්ද උස්සලා බලන එක",
  },
  {
    kind: "සර්ප දෂ්ට කිරීම්",
    title: "නිශ්චලව, පහළින්, කෙලින්ම රෝහලට",
    action:
      "එයාව සන්සුන්ව සහ පුළුවන් තරම් නිශ්චලව තියාගන්න, දෂ්ට වුනු අත හෝ පාද හදවතට වඩා පහළින් තියාගන්න, මිටි සහ තද ඇඳුම් අයින් කරන්න, ඉක්මනින්ම එයාව රෝහලට ගෙනියන්න. දෂ්ට වුනු වෙලාව සටහන් කරගන්න.",
    avoid: "කපනවා, උරාගන්නවා, Tourniquet එකක් දානවා, හෝ සර්පයා පස්සේ දුවනවා",
  },
];

export const homeKit = [
  "ඩිජිටල් උෂ්ණත්වමානය",
  "Paracetamol, වැඩිහිටි සහ සිරප්",
  "ORS ලුණු මල්ලි",
  "විෂබීජහරණ ගෝස් සහ ටේප්",
  "ක්‍රේප් තුවාල පටිය",
  "විෂබීජ නාශක ද්‍රාවණය",
  "විවිධ ප්ලාස්ටර්",
  "තුඩ නොකැපෙන කතුර සහ ටුවීසර්ස්",
  "එක වර පාවිච්චි කරන අත්කොට්ට",
  "ඔබේ බෙහෙත් ලැයිස්තුව, මුද්‍රණය කරගත්තා",
  "අත් ලාම්පුව",
];

export const emergencyNumbers = [
  { label: "රෝහල සහ Ambulance" },
  { label: "Pharmacy, පැය 24" },
  { label: "ජාතික Ambulance" },
  { label: "ජාතික විස මධ්‍යස්ථානය" },
];

export const firstAidSection = {
  eyebrow: "04 / නිවසේ ප්‍රථමාධාර",
  heading: { line1: "විනාඩි හතර", line2: "ඔබ අප ළඟට එනකන්" },
  neverLabel: "කිසිදා එපා:",
  homeKitHeading: "ගෙදර තියාගන්න",
  numbersHeading: "මේ දුරකථන අංක තියාගන්න",
};
