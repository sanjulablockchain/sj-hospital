// Sinhala overlay for clinics.ts (14 of the catalog's 36 services: the
// general clinics group, the largest and last group file in the services
// feature). Read this header before touching any other services data file:
// most of its rules are established elsewhere and reused here rather than
// reinvented.
//
// PHARMACY VOCABULARY (standing ruling, `pharmacy/data/` owns it: "Counter",
// "Prescription", "Delivery", "Pharmacist", "Order", "Record", "File",
// "Stock", "WhatsApp" stay English site-wide). Grepped this file for every
// form, case-insensitive:
// - `outpatient-department.conditions[1]` ("Ongoing prescription review"):
//   the pharmacy sense (a patient's own repeat prescription), so
//   "Prescription" stays bare English here, per the task's own flag.
// - `outpatient-department.prep[0]` ("a previous visit record"): the
//   ordinary clinical-documentation sense (a prior OPD visit note), NOT the
//   pharmacy counter's digital-prescription Record. Translated in full to
//   "වාර්තාව", the same distinction womenChildren.si.ts's own header already
//   draws for its antenatal/vaccination record entries.
// - `outpatient-department.faq[1].a` ("Your doctor orders only the tests"):
//   the ordinary verb "to order [a test]", not the pharmacy Order noun.
//   Translated as prose ("Order කරනවා").
// - `inpatient-rooms` ×3 ("Meals to dietary orders" / "dietary orders", at
//   `tags[3]`, `strip[3].v` and `steps[3].desc`): a catering/clinical
//   instruction ("dietary orders" = the diet a patient is prescribed on the
//   ward), a different domain from the pharmacy counter's medicine Order.
//   Corrected on review: an earlier pass here left the English word
//   "Orders" bare, reasoning it was a translated compound rather than the
//   pharmacy register, but never actually translated it. This service
//   fully translates the near-identical concept "dietary requirements" in
//   `body2`, `covers` and `prep` (si: "ආහාර අවශ්‍යතා"), so "dietary orders"
//   now reuses that exact noun rather than coining a second, English form
//   for the same idea: "ආහාර අවශ්‍යතාවලට".
// No "Counter", "Delivery" (pharmacy sense), "Pharmacist", "File", "Stock"
// or "WhatsApp" occurrence exists anywhere in clinics.ts (grepped clean).
//
// "Theatre": clinics.ts has ZERO occurrences of the word (grepped clean),
// so neither emergency.si.ts's practice (translates it) nor surgical.si.ts's
// practice (keeps it bare) needed to be chosen between here. Nothing to
// flag beyond confirming the absence.
//
// SPECIALTY NAMES, cross-checked against e-channeling/data/doctors.si.ts
// (28 specialities across 71 doctors, per the task's own instruction to
// reuse its exact strings rather than coining a second form): every
// doctor-type specialist noun that is NEW to the services feature (not
// already given a same-feature precedent by emergency.si.ts, surgical.si.ts,
// diagnostics.si.ts or womenChildren.si.ts) reuses e-channeling's own
// root, pluralised with "වරු": Cardiologist -> "හෘද රෝග විශේෂඥවරු"
// (e-channeling: "හෘද රෝග විශේෂඥ"), and the same pattern for
// Dermatologist ("සම රෝග"), Endocrinologist ("අන්තර්ස්‍රාවී රෝග"),
// Rheumatologist ("සන්ධි රෝග"), Neurologist ("ස්නායු රෝග"), Nephrologist
// ("වකුගඩු රෝග"), Hematologist ("රක්ත රෝග"), Psychiatrist ("මනෝ රෝග"),
// Nutritionist ("පෝෂණ", reused for this file's own "Dietitians": the site
// has no separate e-channeling category for that title, and both describe
// the same nutrition specialism here). Where a same-feature precedent
// already exists it wins instead (kept bare English with a particle,
// diagnostics.si.ts's own rule): "Physiotherapist(s)" -> "Physiotherapist
// ලා" (surgical.si.ts), "Radiographer(s)" -> "Radiographer ලා"
// (diagnostics.si.ts/surgical.si.ts), "Gastroenterologist" would too if it
// occurred here (it does not). "Doctor"/"Physician"/"Consultant" translate
// in full everywhere as ordinary nouns (emergency.si.ts's own rule): e.g.
// "General physicians" -> "සාමාන්‍ය වෛද්‍යවරු", "Specialist consultants" ->
// "විශේෂඥ වෛද්‍යවරු" (reused verbatim from emergency.si.ts), "Respiratory
// physicians" -> "ශ්වසන වෛද්‍යවරු". "Nurse", "Coordinator", "Technician",
// "Technologist" and "Reception" stay English as role/department nouns
// (diagnostics.si.ts's own rule), e.g. "Clinic Coordinator කෙනා",
// "රසායනාගාර Technologists" (both reused verbatim from diagnostics.si.ts).
// "Histopathology" and "Cardiac technicians" ("හෘද Technicians") reuse
// diagnostics.si.ts's own established bare-equipment/team forms verbatim.
//
// "Clinic" stays English throughout as the site's own established register
// word (diagnostics.si.ts's header). `title`, `directoryTitle` and `cta`
// were removed from this overlay by the 2026-09-09 register sweep (they
// render in English on every page now); the paragraph that used to
// document their Sinhala coinages here went with them.
//
// Ordinary clinical prose (consultations, testing, hours, plans) translates
// in full throughout: this file, unlike surgical.ts or womenChildren.ts,
// carries very little procedure-name jargon, so the sibling test rarely
// finds a bare-English array entry that needs a particle. Established
// short labels reused verbatim: "By appointment" -> "Appointment එකකින්",
// "By referral" -> "Referral එකකින්", "Daily" -> "දිනපතා", "Booking" (as a
// facts/strip k) -> "වෙන් කිරීම" (all four from atHome.si.ts/
// diagnostics.si.ts/womenChildren.si.ts). Every number (24 hours, 10%, 30 or
// 45 minutes, 10,000 LKR, two hours) is unchanged; "two hours" is an English
// word, not a digit, so it is translated like any other word ("පැය
// දෙකකට"), the same as every other spelled-out number in this feature.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const clinicServices = [
  {


    hours: "පැය 24",

    desc: "සාමාන්‍ය හා විශේෂඥ Consultations එකම වහලක් යටතේ, එදිනෙදා අසනීප සඳහාත් නිවැරදි විශේෂඥ සායනයට Referral සඳහාත් අපේම වෛද්‍යවරු කටයුතු කරනවා. ඔබේ තත්ත්වයට අවශ්‍ය පරීක්ෂණ විතරක් Order කරනවා, ඔබ යන්න කලින්ම ඔබේ රෝග විනිශ්චය පැහැදිලි කරනවා, Follow-up එකත් එම Desk එකෙන්ම Book කරලා දෙනවා.",
    tags: ["සාමාන්‍ය Consultation", "විශේෂඥ Referral", "එදිනම Slots", "රසායනාගාර 10% වට්ටම්"],
    facts: [
      { k: "පැය", v: "පැය 24" },
      { k: "වෙන් කිරීම", v: "එදිනම Slots තියෙනවා" },
      { k: "රෝග විනිශ්චය", v: "යන්න කලින් පැහැදිලි කරනවා" },
      { k: "රසායනාගාර වට්ටම", v: "OPD රෝගීන්ට 10%" },
    ],
    lede: "සාමාන්‍ය හා විශේෂඥ Consultations එකම අංශයකින්, එදිනම Slots සහ යන්න කලින්ම පැහැදිලි කරන රෝග විනිශ්චයක් සමඟ.",

    body1: "බාහිර රෝගී අංශය පැය 24ම විවෘතයි, එදිනෙදා අසනීප වගේම Book කරපු විශේෂඥ සායනත් ආවරණය කරනවා, ස්ථාවර පරීක්ෂණ ලැයිස්තුවක් හරහා වැඩ කරනවා වෙනුවට ඔබේ තත්ත්වයට ඇත්තටම ඕන දේ අපේම වෛද්‍යවරු තීරණය කරනවා. ලබන සතිය දක්වා බලා සිටින්න බැරි ප්‍රශ්නවලට එදිනම Slots විවෘතව තියෙනවා.",
    body2: "ඔබ යන්න කලින්ම, හමුවුනු දේ සහ ඒකේ තේරුම ඔබේ වෛද්‍යවරයා පැහැදිලි කරනවා, Follow-up එකත් සකස් කරගන්න වෙන කොහෙටවත් යවන්නේ නැතුව එම Desk එකෙන්ම Book කරලා දෙනවා. Visit එකේ කොටසක් විදිහට පරීක්ෂණ Order කළොත් OPD රෝගීන්ට රසායනාගාර ගාස්තුවලින් 10% වට්ටමක්ද ලැබෙනවා.",
    strip: [
      { k: "පැය", v: "පැය 24" },
      { k: "වේලාවන්", v: "එදිනම ලැබෙනවා" },
      { k: "රෝග විනිශ්චය", v: "Visit එකේදීම පැහැදිලි කරයි" },
      { k: "රසායනාගාර වට්ටම", v: "10%" },
    ],
    covers: [
      "සාමාන්‍ය වෛද්‍ය Consultations",
      "විශේෂඥ සායන Referral",
      "ඉලක්කගත පරීක්ෂණ Order කිරීම",
      "Discharge එකට කලින් රෝග විනිශ්චය පැහැදිලි කිරීම",
      "එම Desk එකෙන්ම Follow-up Book කිරීම",
    ],
    conditions: [
      "එදිනෙදා උණ සහ ආසාදන",
      "අඛණ්ඩ Prescription සමාලෝචනය",
      "රෝග විනිශ්චය නොවූ වේදනා සහ පැමිණිලි",
      "විශේෂඥ සායනයකට Referral",
      "රැකියාවට පෙර හෝ සාමාන්‍ය Check-up එකක්",
    ],
    location: "බිම් මහල, බාහිර රෝගී අංශය",
    steps: [
      { desc: "Consultation එකක් Book කරන්න හෝ කෙලින්ම ඇවිත් OPD Desk එකේ ලියාපදිංචි වෙන්න." },
      { desc: "වෛද්‍යවරයෙක් ඔබේ History ගෙන ඔබව පරීක්ෂා කර, ඔබේ තත්ත්වයට ඕන පරීක්ෂණ විතරක් Order කරනවා." },
      { desc: "ඔබ කාමරයෙන් යන්න කලින්ම ඔබේ වෛද්‍යවරයා රෝග විනිශ්චය සහ ඒක පිටුපස තියෙන හේතුව පැහැදිලි කරනවා." },
      { desc: "ඔබ ගෙදර යන්න කලින්ම OPD Desk එක ඔබේ ඊළඟ Appointment එක හෝ Referral එක Book කරලා දෙනවා." },
    ],
    prep: [
      "ඔබේ OPD Card එක හෝ තියෙනවා නම් කලින් Visit එකක වාර්තාවක් ගෙන එන්න",
      "ඔබේ වර්තමාන බෙහෙත් ලැයිස්තුවක් ගෙන එන්න",
      "ඔබේ රෝග ලක්ෂණ පටන් ගත්තේ කවදද සටහන් කරන්න",
      "ඔබට දුන්නා නම් Referral Letter එකක් ගෙන එන්න",
    ],
    team: [
      { role: "සාමාන්‍ය වෛද්‍යවරු", note: "එදිනෙදා පැමිණිලි සහ අඛණ්ඩ Review සඳහා කෙලින්ම එන සහ Book කරපු රෝගීන් බලනවා." },
      { role: "විශේෂඥ වෛද්‍යවරු", note: "OPD වෛද්‍යවරුන්ට කෙලින්ම Refer කරන්න පුළුවන් Book කරපු සායන පවත්වනවා." },
      { role: "OPD Nursing කණ්ඩායම", note: "Consultations, Vitals සහ Sample එකතු කිරීමට සහාය වෙනවා." },
      { role: "OPD Reception එක", note: "ලියාපදිංචිය, වට්ටම් සහ Follow-up Booking හසුරුවනවා." },
    ],
    faq: [
      { q: "මට Appointment එකක් ඕනද?", a: "නෑ. ඔබට ඕන වේලාවක කෙලින්ම එන්න පුළුවන්, ඒත් කලින් Consultation එකක් Book කිරීමෙන් ඔබේ බලා සිටීම අඩු වෙන්න පුළුවන්." },
      { q: "මට ඕන නැති පරීක්ෂණවලට යවනවද?", a: "නෑ. ඔබේ වෛද්‍යවරයා ඔබේ තත්ත්වයට ඕන පරීක්ෂණ විතරක් Order කරනවා, එකින් එක ඉල්ලන්නේ ඇයි කියලත් පැහැදිලි කරනවා." },
      { q: "මෙතන Lab Tests වලට වට්ටමක් ලැබෙයිද?", a: "ඔව්. Visit එකේ කොටසක් විදිහට Order කරන රසායනාගාර ගාස්තුවලින් OPD රෝගීන්ට 10% වට්ටමක් ලැබෙනවා." },
      { q: "යන්න කලින්ම මගේ Follow-up එක Book කරගන්න පුළුවන්ද?", a: "ඔව්. එකම Visit එකේදීම OPD Desk එක ඔබේ ඊළඟ Appointment එක හෝ විශේෂඥ Referral එක සලසනවා." },
    ],
  },
  {


    hours: "සතිපතා Clinics",

    desc: "රුධිර පීඩනය, හෘද ස්පන්දන ගැටළු සහ හෘද අකර්මන්‍යතා Follow-up සඳහා විශේෂඥ වෛද්‍ය Clinics, ප්‍රතිඵල සඳහා වෙනම Appointment එකක් නැතුවම සැලැස්මක් සාකච්ඡා කරගන්න පුළුවන් වෙන්න එකම Visit එකේදීම ECG සහ Echocardiography ලබාගත හැක.",
    tags: ["රුධිර පීඩන සමාලෝචනය", "ස්පන්දන Follow-up", "හෘද අකර්මන්‍යතා සත්කාරය", "එකම Visit ECG සහ Echo"],
    facts: [
      { k: "සායන", v: "සතිපතා" },
      { k: "එකම Visit", v: "ECG සහ Echocardiography" },
      { k: "අවධානය", v: "රුධිර පීඩනය, ස්පන්දනය, හෘද අකර්මන්‍යතාව" },
      { k: "වෙන් කිරීම", v: "Consult හෝ Referral" },
    ],
    lede: "රුධිර පීඩනය, ස්පන්දනය සහ හෘද අකර්මන්‍යතා Follow-up සඳහා විශේෂඥ හෘද රෝග Clinics, එකම Visit එකේදීම ECG සහ Echo කරගත හැක.",

    body1: "රුධිර පීඩන පාලනය, හෘද ස්පන්දන ගැටළු සහ හෘද අකර්මන්‍යතාව සඳහා Follow-up වන රෝගීන් සඳහා හෘද රෝග Clinic එක සතිපතා විශේෂඥ Sessions පවත්වනවා. තත්ත්වය බලන්න පරීක්ෂණයක් ඕන වුනොත්, වෙනම Booking එකක් වෙනුවට එකම Visit එකේදීම ECG සහ Echocardiography සිදු කරනවා.",
    body2: "ඔබේ විශේෂඥ වෛද්‍යවරයා ප්‍රතිඵල ඔබ සමඟ කෙලින්ම සමාලෝචනය කර, පුළුවන් තැන ඔබේ කළමනාකරණ සැලැස්ම එතැනම වෙනස් කරනවා, ඔබ ගෙදර ගිය පස්සේ Report එකක් සොයාගෙන යාමක් මත අඛණ්ඩ සත්කාරය රඳා නොපවතින්නට.",
    strip: [
      { k: "සායන", v: "සතිපතා" },
      { k: "පරීක්ෂණ", v: "ECG සහ Echo, එකම Visit" },
      { k: "සමාලෝචනය කරන්නේ", v: "විශේෂඥ වෛද්‍යවරයා" },
      { k: "අවධානය", v: "BP, ස්පන්දනය, හෘද අකර්මන්‍යතාව" },
    ],
    covers: [
      "රුධිර පීඩන සමාලෝචනය",
      "හෘද ස්පන්දන Follow-up",
      "හෘද අකර්මන්‍යතා කළමනාකරණය",
      "Clinic එකේම ECG",
      "Clinic එකේම Echocardiography",
    ],
    conditions: [
      "ඉහළ රුධිර පීඩනය",
      "හෘද ස්පන්දන දැනීම (Palpitations)",
      "දන්නා හෘද අකර්මන්‍යතාව",
      "අක්‍රමවත් හෘද ස්පන්දනය",
      "හෘද සිද්ධියකින් පසු Follow-up",
    ],
    location: "පළමු මහල, හෘද රෝග Clinic එක",
    steps: [
      { desc: "හෘද රෝග Consult එකක් කෙලින්ම හෝ වෙනත් Clinic එකකින් Referral එකක් හරහා Book කරන්න." },
      { desc: "හෘද රෝග විශේෂඥවරයෙක් ඔබේ History ගෙන ඔබව පරීක්ෂා කරනවා." },
      { desc: "ECG සහ, ඕන වුනොත්, Echocardiography එකම Visit එකේදීම සිදු කරනවා." },
      { desc: "ඔබේ විශේෂඥ වෛද්‍යවරයා ප්‍රතිඵල ඔබ සමඟ සමාලෝචනය කර ඔබේ අඛණ්ඩ කළමනාකරණ සැලැස්මට එකඟ වෙනවා." },
    ],
    prep: [
      "මාත්‍රා ඇතුළුව ඔබේ වර්තමාන බෙහෙත් ලැයිස්තුවක් ගෙන එන්න",
      "කලින් තිබ්බ ECG හෝ Echo Reports තියෙනවා නම් ගෙන එන්න",
      "මෑතක පපුවේ වේදනාවක්, හුස්ම ගැනීමේ අපහසුතාවක් හෝ Palpitations නම් සටහන් කරන්න",
      "පරීක්ෂණය සඳහා පපුවට පහසුවෙන් ළඟාවෙන්න පුළුවන් ඇඳුමක් අඳින්න",
    ],
    team: [
      { role: "හෘද රෝග විශේෂඥවරු", note: "රුධිර පීඩනය, ස්පන්දනය සහ හෘද අකර්මන්‍යතා Follow-up සඳහා සතිපතා Clinics මෙහෙයවනවා." },
      { role: "හෘද Technicians", note: "එකම Visit එකේදීම ECG සහ Echocardiography සිදු කරනවා." },
      { role: "හෘද රෝග Nursing කණ්ඩායම", note: "Consultations සහ සාමාන්‍ය Observations සඳහා සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Consultations Book කර Clinic එකට එන Referrals කළමනාකරණය කරනවා." },
    ],
    faq: [
      { q: "පරීක්ෂණ සඳහා වෙනම Appointment එකක් ඕන වෙයිද?", a: "සාමාන්‍යයෙන් නෑ. ඔබේ හෘද රෝග විශේෂඥවරයාට ඕන වුනොත් ECG සහ Echocardiography ඔබේ Consultation එකේම එකම Visit එකේදී සිදු කරනවා." },
      { q: "බලපත් වෙන්න Referral එකක් ඕනද?", a: "නෑ. ඔබට හෘද රෝග Consult එකක් කෙලින්ම Book කරන්න පුළුවන්, වෙනත් වෛද්‍යවරයෙකුගෙන් Referral එකකුත් පිළිගන්නවා." },
      { q: "කොපමණ නිතරද Review කරන්නේ?", a: "Clinic එක සතිපතා පවත්වනවා, ඔබේ තත්ත්වයට ගැලපෙන Review කාල පරාසයක් ඔබේ විශේෂඥ වෛද්‍යවරයා තීරණය කරනවා." },
      { q: "මේ Clinic එකට අඛණ්ඩ හෘද අකර්මන්‍යතාව කළමනාකරණය කරන්න පුළුවන්ද?", a: "ඔව්. හෘද අකර්මන්‍යතා Follow-up එක Clinic එකේ නිතිපතා වැඩකොටසක්, හැම Visit එකකදීම ඔබේ කළමනාකරණ සැලැස්ම Review කරනවා." },
    ],
  },
  {


    hours: "සතිපතා Clinics",

    desc: "සමේ, කෙස් හා නියපොතු තත්ත්වයන් තක්සේරුව, කුඩා සම් ශල්‍යකර්ම, සහ දියවැඩියා හා නොසුව වෙන අනිත් තුවාල සඳහා විශේෂිත තුවාල Clinic එකක්, Dressings සපයනවා සහ ඔබේ පලමු Visit එකේදීම ව්‍යුහගත Dressing Schedule එකකට එකඟ වෙනවා.",
    tags: ["සම, කෙස් හා නියපොතු තත්ත්වයන්", "කුඩා සම් ශල්‍යකර්ම", "තුවාල Clinic එක", "ව්‍යුහගත Dressing Schedule"],
    facts: [
      { k: "සායන", v: "සතිපතා" },
      { k: "තුවාල Clinic", v: "දියවැඩියා සහ නොසුව තුවාල" },
      { k: "තුවාල පටි", v: "සපයනවා" },
      { k: "කාලසටහන", v: "පලමු Visit එකේදීම සකසයි" },
    ],
    lede: "සම, කෙස් හා නියපොතු තක්සේරුව, කුඩා සම් ශල්‍යකර්ම, සහ දියවැඩියා හා නොසුව වෙන අනිත් තුවාල සඳහා විශේෂිත තුවාල Clinic එකක්.",

    body1: "සම රෝග Clinic එක සම, කෙස් හා නියපොතු තත්ත්වයන් තක්සේරු කර, ඉවත් කිරීමට ඕන වර්ධන, Cysts සහ තුවාල සඳහා කුඩා සම් ශල්‍යකර්ම සිදු කරනවා. මේ සමඟින්ම, විශේෂිත තුවාල Clinic එකක් දියවැඩියා සහ නොසුව වෙන අනිත් තුවාල බලාගන්නවා, එක එක Session එකේදී සොයාගන්නවා වෙනුවට පලමු Visit එකේදීම Dressing Schedule එකකට එකඟ වෙනවා.",
    body2: "ඔබේ අඛණ්ඩ තුවාල සත්කාරයේ කොටසක් විදිහට Dressings සපයනවා, හැම Visit එකකදීම තුවාලය සැලැස්මට එරෙහිව කෙසේ දියුණු වෙනවද බලා, සුවවීම බලාපොරොත්තු වුනාට වඩා මන්දගාමීද ඉක්මන්ද අනුව Schedule එක සකසනවා.",
    strip: [
      { k: "සායන", v: "සතිපතා" },
      { k: "තුවාල සත්කාරය", v: "ව්‍යුහගත Schedule" },
      { k: "තුවාල පටි", v: "සපයනවා" },
      { k: "කුඩා ශල්‍යකර්ම", v: "ලබාගත හැක" },
    ],
    covers: [
      "සමේ තත්ත්ව තක්සේරුව",
      "කෙස් හා නියපොතු තත්ත්ව තක්සේරුව",
      "කුඩා සම් ශල්‍යකර්ම",
      "දියවැඩියා තුවාල සත්කාරය",
      "නොසුව වෙන තුවාල කළමනාකරණය",
    ],
    conditions: [
      "Eczema සහ Psoriasis",
      "සම් ආසාදන",
      "සැක සහිත තිත් හෝ තුවාල",
      "දියවැඩියා පාද තුවාල",
      "නොසුව වෙන වණ",
      "කෙස් ගැලවීම",
    ],
    location: "බිම් මහල, සම රෝග Clinic එක",
    steps: [
      { desc: "සම, කෙස් හෝ නියපොතු ගැටළුවක් හෝ ව්‍යුහගත සත්කාරයක් ඕන තුවාලයක් සඳහා සම රෝග Clinic Book කරන්න." },
      { desc: "සම රෝග විශේෂඥවරයෙක් තත්ත්වය හෝ තුවාලය පරීක්ෂා කර, විකල්ප ඔබ සමඟ සාකච්ඡා කරනවා." },
      { desc: "සුදුසු නම් කුඩා ශල්‍යකර්මයක් සලසනවා, නැත්නම් තුවාලයක් සඳහා Dressing Schedule එකක් සකසනවා." },
      { desc: "Follow-up Visits සුවවීම හෝ සුවවීම පරීක්ෂා කර අවශ්‍ය ලෙස සැලැස්ම සකසනවා." },
    ],
    prep: [
      "ඔබේ Visit එකට කලින් බලපෑමට ලක්වූ ප්‍රදේශයට Creams හෝ Makeup ගාන එපා",
      "ඔබ දැනට සමට හෝ කෙසට යොදාගන්නා නිෂ්පාදන ලැයිස්තුවක් ගෙන එන්න",
      "තුවාල Review සඳහා, ප්‍රදේශයට පහසුවෙන් ළඟාවෙන්න පුළුවන් ඇඳුමක් අඳින්න",
      "සම වෙනසක් හෝ තුවාලයක් කොපමණ කාලයක් තිබෙනවාද සටහන් කරන්න",
    ],
    team: [
      { role: "සම රෝග විශේෂඥවරු", note: "සම, කෙස් හා නියපොතු තත්ත්වයන් තක්සේරු කර කුඩා සම් ශල්‍යකර්ම සිදු කරනවා." },
      { role: "තුවාල සත්කාර Nurse ලා", note: "දියවැඩියා හා නොසුව තුවාල සඳහා ව්‍යුහගත Dressing Schedule එක මෙහෙයවනවා." },
      { role: "සම රෝග Nursing කණ්ඩායම", note: "Clinic Consultations සහ කුඩා ක්‍රියාපටිපාටිවලට සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Appointments සහ තුවාල Clinic Follow-up Book කරනවා." },
    ],
    faq: [
      { q: "තුවාල Clinic එකට Referral එකක් ඕනද?", a: "නෑ. සුව නොවෙන තුවාලයක් සඳහා, දියවැඩියා තුවාල ඇතුළුව, ඔබට සම රෝග Clinic කෙලින්ම Book කරන්න පුළුවන්." },
      { q: "Dressings සපයනවද, එහෙමත් නැත්තම් මගේම ගන්න ඕනද?", a: "ඔබේ තුවාල සත්කාර Schedule එකේ කොටසක් විදිහට Dressings සපයනවා." },
      { q: "කුඩා සම් වර්ධන මෙතනින් ඉවත් කරන්න පුළුවන්ද?", a: "ඔව්. Clinic එකේදී ඉවත් කරන්න සුදුසුයි කියා තක්සේරු කරන වර්ධන, Cysts සහ තුවාල සඳහා කුඩා සම් ශල්‍යකර්ම ලබාගත හැක." },
      { q: "මගේ තුවාලය කොපමණ නිතරද Review කරන්නේ?", a: "ඔබේ පලමු Visit එකේදීම ව්‍යුහගත Schedule එකකට එකඟ වී, තුවාලය සුවවෙන අන්දම අනුව හැම Review එකකදීම සකසනවා." },
    ],
  },
  {


    hours: "සතිපතා Clinics",

    desc: "HbA1c පරීක්ෂණ සහ සංකූලතා Screening සමඟ දියවැඩියා Review එකක්, ඒ සමඟින්ම Thyroid සහ අනිත් Hormone ආබාධ තක්සේරුවක්. හැම Review එකක්ම අවසන් වෙන්නේ ලිඛිත සැලැස්මකින්, ඕන වුනොත් පෝෂණ විශේෂඥ Referral එකකින්.",
    tags: ["දියවැඩියා Review", "HbA1c සහ සංකූලතා Screening", "Thyroid සහ Hormone ආබාධ", "ලිඛිත සැලැස්ම"],
    facts: [
      { k: "සායන", v: "සතිපතා" },
      { k: "දියවැඩියා Review", v: "HbA1c සහ සංකූලතා Screening" },
      { k: "තවත් ආවරණය කරයි", v: "Thyroid සහ Hormone ආබාධ" },
      { k: "හැම Visit එකකම", v: "ලිඛිත සැලැස්ම" },
    ],
    lede: "HbA1c සහ සංකූලතා Screening සමඟ දියවැඩියා Review එකක්, ඒ සමඟින්ම Thyroid හා Hormone ආබාධ තක්සේරුවක්, දෙකම අවසන් වෙන්නේ ලිඛිත සැලැස්මකින්.",

    body1: "දියවැඩියා Reviews, HbA1c පරීක්ෂණය සමඟ කාලයාන්තරයේදී දියවැඩියාවෙන් ඇතිවෙන්න පුළුවන් සංකූලතා සඳහා Screening එකතු කර, බ්ලඩ් Sugar කියවීමකින් විතරක් ලැබෙන දේට වඩා පිරිපුන් චිත්‍රයක් දෙනවා. එකම Clinic එකෙන්ම Thyroid ගැටළු සහ අනිත් Hormone ආබාධ තක්සේරු කරනවා, Consultation එකට මගපෙන්වන්න අදාළ Blood Tests යොදාගෙන.",
    body2: "හැම Review එකක්ම අවසන් වෙන්නේ ඔබ ගෙදර ගෙනියන ලිඛිත සැලැස්මකින්, බෙහෙත් වෙනස්කම්, ඉලක්ක සහ ඊළඟ Visit එකට කලින් බලාගන්න ඕන දේවල් ආවරණය කරමින්. ආහාර වේල ඔබේ තත්ත්වය කළමනාකරණයේ කොටසක් නම්, ඔබේ Medical Review එකත් සමඟින්ම පෝෂණ විශේෂඥ Referral එකක් සලසනවා.",
    strip: [
      { k: "සායන", v: "සතිපතා" },
      { k: "Screening එක", v: "HbA1c සහ සංකූලතා" },
      { k: "සැලැස්ම", v: "ලිඛිත, හැම Visit එකකම" },
      { k: "යොමුව", v: "පෝෂණ විශේෂඥ, ඕන වුනොත්" },
    ],
    covers: [
      "දියවැඩියා Review",
      "HbA1c පරීක්ෂණය",
      "දියවැඩියා සංකූලතා Screening",
      "Thyroid ආබාධ තක්සේරුව",
      "Hormone ආබාධ තක්සේරුව",
      "පෝෂණ විශේෂඥ Referral",
    ],
    conditions: [
      "Type 1 සහ Type 2 දියවැඩියාව",
      "හොඳින් පාලනය නොවූ Blood Sugar",
      "Thyroid අධි ක්‍රියාකාරීත්වය හෝ අඩු ක්‍රියාකාරීත්වය",
      "Hormone අසමතුලිතතාව",
      "දියවැඩියා සංකූලතා Screening",
    ],
    location: "පළමු මහල, දියවැඩියා හා අන්තර්ස්‍රාවී Clinic එක",
    steps: [
      { desc: "දියවැඩියා Follow-up එකක් හෝ සැක සහිත Hormone හෝ Thyroid ගැටළුවක් සඳහා Review එකක් Book කරන්න." },
      { desc: "HbA1c සහ අනිත් අදාළ Blood Tests ඔබේ Visit එක වටා සලසනවා." },
      { desc: "ඔබේ විශේෂඥ වෛද්‍යවරයා ප්‍රතිඵල Review කර අදාළ නම් දියවැඩියා සංකූලතා සඳහා Screen කරනවා." },
      { desc: "ඔබ යන්නේ ලිඛිත සැලැස්මක් සමඟ, උදව් වෙනවා නම් පෝෂණ විශේෂඥ Referral එකකුත් සලසනවා." },
    ],
    prep: [
      "ඔබ තියාගන්නවා නම් වර්තමාන Blood Sugar Diary එක හෝ Monitor කියවීම් ගෙන එන්න",
      "ඔබේ වර්තමාන බෙහෙත් හා මාත්‍රා ලැයිස්තුවක් ගෙන එන්න",
      "Blood Tests සඳහා කියලා තිබ්බොත් කලින් උපවාසය කරන්න",
      "ඔබේ අන්තිම Review එකේ ඉඳන් අලුත් රෝග ලක්ෂණ තිබෙනවා නම් සටහන් කරන්න",
    ],
    team: [
      { role: "අන්තර්ස්‍රාවී රෝග විශේෂඥවරු", note: "දියවැඩියා, Thyroid සහ Hormone ආබාධ Clinics මෙහෙයවනවා." },
      { role: "දියවැඩියා Nursing කණ්ඩායම", note: "Reviews අතර පරීක්ෂණ, අධ්‍යාපනය සහ Monitoring සඳහා සහාය වෙනවා." },
      { role: "පෝෂණ විශේෂඥවරු", note: "ආහාර සම්බන්ධ කළමනාකරණයට සහාය වෙන්න Clinic එකෙන් Referrals ලබාගන්නවා." },
      { role: "Clinic Coordinator කෙනා", note: "Reviews Book කර පෝෂණ විශේෂඥ Referrals සම්බන්ධීකරණය කරනවා." },
    ],
    faq: [
      { q: "දියවැඩියා Review එකකට මොනවද ඇතුළත්?", a: "HbA1c පරීක්ෂණය සහ දියවැඩියාවෙන් ඇතිවෙන්න පුළුවන් සංකූලතා සඳහා Screening, ඒ සමඟින්ම ඔබේ වර්තමාන පාලනය සහ බෙහෙත් ගැන සාකච්ඡාවක්." },
      { q: "මේ Clinic එක දියවැඩියාවට විතරද?", a: "නෑ. අදාළ Blood Tests යොදාගෙන Thyroid ගැටළු සහ අනිත් Hormone ආබාධත් තක්සේරු කරනවා." },
      { q: "ගෙදර ගෙනියන්න ලිඛිත සැලැස්මක් ලැබෙයිද?", a: "ඔව්. හැම Review එකක්ම බෙහෙත් වෙනස්කම්, ඉලක්ක සහ බලාගන්න ඕන දේවල් ආවරණය කරන ලිඛිත සැලැස්මකින් අවසන් වෙනවා." },
      { q: "මේ Clinic එක හරහා පෝෂණ විශේෂඥවරයෙකු හමුවෙන්න පුළුවන්ද?", a: "ඔව්. ආහාර වේල ඔබේ තත්ත්වය කළමනාකරණයේ කොටසක් නම්, ඔබේ Medical Review එකත් සමඟින්ම පෝෂණ විශේෂඥවරයෙකුට Referral එකක් සලසනවා." },
    ],
  },
  {


    hours: "Appointment එකකින්",

    desc: "දියවැඩියාව, බර කළමනාකරණය, ගැබ්ගැනීම සහ ශල්‍යකර්මයකින් පසු සුවවීම සඳහා ආහාර තක්සේරුව සහ ලිඛිත ආහාර සැලසුම්, ප්‍රතිකාරයට ගැළපෙන ආහාර ඕන ඇතුළත් වූ රෝගීන් සඳහා Ward Reviews ලබාගත හැක.",
    tags: ["ආහාර තක්සේරුව", "ලිඛිත ආහාර සැලසුම්", "ගැබ්ගැනීම සහ ශල්‍යකර්මයෙන් පසු ආහාර", "Ward Review කිරීම"],
    facts: [
      { k: "වෙන් කිරීම", v: "Appointment එකකින්" },
      { k: "සැලසුම්", v: "ලිඛිත සහ පුද්ගලික" },
      { k: "ආවරණය කරයි", v: "දියවැඩියාව, බර, ගැබ්ගැනීම, සුවවීම" },
      { k: "ඇතුළත් රෝගීන්", v: "Ward Reviews ලබාගත හැක" },
    ],
    lede: "දියවැඩියාව, බර, ගැබ්ගැනීම හෝ ශල්‍යකර්මයෙන් පසු සුවවීම සඳහා ආහාර තක්සේරුවක් සහ ලිඛිත ආහාර සැලසුමක්, ඇතුළත් රෝගීන් සඳහා Ward Reviews සමඟින්.",

    body1: "පලමු Session එක ඔබේ වර්තමාන ආහාර වේල, දිනචරියාව සහ සැලසුම වට කරන්න ඕන ඕන වෛද්‍ය තත්ත්වයක් ආවරණය කරනවා, ඒක දියවැඩියාව, බර කළමනාකරණය, ගැබ්ගැනීම හෝ ශල්‍යකර්මයෙන් පසු සුවවීම වුවත්. මෙයින්, පොදු Sheet එකක් දෙනවා වෙනුවට පෝෂණ විශේෂඥවරයෙක් පුද්ගලික සැලසුමක් ලියනවා.",
    body2: "දැනටමත් ඇතුළත් වූ රෝගීන් සඳහා, ප්‍රතිකාර සැලසුමට ඇත්තටම ඕන දේට ආහාර ගැළපෙන්න Ward Reviews ලබාගත හැක, නවාතැන් කාලය පුරාම වෙනස් නොකර තියනවා වෙනුවට සුවවීම දියුණු වෙන විදිහට සකසනවා.",
    strip: [
      { k: "වෙන් කිරීම", v: "Appointment එකකින්" },
      { k: "සැලැස්ම", v: "ලිඛිත, පුද්ගලික" },
      { k: "Ward Review එක", v: "ලබාගත හැක" },
      { k: "ආවරණය කරයි", v: "දියවැඩියාව, බර, ගැබ්ගැනීම, සුවවීම" },
    ],
    covers: [
      "ආහාර තක්සේරුව",
      "ලිඛිත ආහාර සැලසුම්",
      "දියවැඩියා-කේන්ද්‍රීය පෝෂණය",
      "බර කළමනාකරණ සහාය",
      "ගැබ්ගැනීමේ පෝෂණය",
      "ශල්‍යකර්මයෙන් පසු සුවවීමේ ආහාර",
      "ඇතුළත් රෝගී Ward Reviews",
    ],
    conditions: [
      "ආහාර පාලනය ඕන දියවැඩියාව",
      "බර කළමනාකරණය",
      "ගැබ්ගැනීමේ පෝෂණ ගැටළු",
      "ශල්‍යකර්මයෙන් පසු සුවවීම",
      "අසනීප කාලයේ ආහාර රුචිය අඩුවීම",
    ],
    location: "පළමු මහල, පෝෂණ Clinic එක",
    steps: [
      { desc: "Session එකක් කෙලින්ම Book කරන්න, නැත්නම් ඇතුළත් වී ඉන්න කොට Review එකක් සලසන්න ඔබේ Ward කණ්ඩායමට කියන්න." },
      { desc: "පෝෂණ විශේෂඥවරයෙක් ඔබේ වර්තමාන ආහාර වේල, දිනචරියාව සහ සැලසුමට සහාය වෙන්න ඕන තත්ත්වය Review කරනවා." },
      { desc: "ගෙනියන්න හෝ Ward එකේදී අනුගමනය කරන්න ලිඛිත, පුද්ගලික ආහාර සැලසුමක් සකස් කරනවා." },
      { desc: "ඔබේ අවශ්‍යතා වෙනස් වෙන විදිහට Follow-up Sessions හෝ Ward Reviews සැලසුම සකසනවා." },
    ],
    prep: [
      "කලින් දින කීපයක් ඔබ සාමාන්‍යයෙන් කන දේ සටහන් කරගන්න",
      "සැලසුම වට කරන්න ඕන ඕන වෛද්‍ය තත්ත්වයක විස්තර ගෙන එන්න",
      "ඔබේ වර්තමාන බෙහෙත් ලැයිස්තුවක් ගෙන එන්න",
      "ආහාර Allergies හෝ නොඉවසීම් තිබෙනවා නම් සටහන් කරන්න",
    ],
    team: [
      { role: "පෝෂණ විශේෂඥවරු", note: "බාහිර හා ඇතුළත් රෝගීන් සඳහා ආහාර තක්සේරු කර ලිඛිත සැලසුම් සකස් කරනවා." },
      { role: "Ward Nursing කණ්ඩායම", note: "ඇතුළත් රෝගී Ward Reviews පෝෂණ සේවාව සමඟ සම්බන්ධීකරණය කරනවා." },
      { role: "Clinic Coordinator කෙනා", note: "බාහිර රෝගී Sessions සහ Follow-up Appointments Book කරනවා." },
    ],
    faq: [
      { q: "Session එකක් Book කරන්න Referral එකක් ඕනද?", a: "නෑ. ආහාර තක්සේරුවක් සහ ලිඛිත සැලසුමක් සඳහා ඔබට Session එකක් කෙලින්ම Book කරන්න පුළුවන්." },
      { q: "මම ගැබ්ගැනීමේ ඉන්න කොට මේ සේවාවෙන් උදව් වෙයිද?", a: "ඔව්. ගැබ්ගැනීමේ පෝෂණය Clinic එක ලිඛිත සැලසුම් සකස් කරන ක්ෂේත්‍රවලින් එකක්." },
      { q: "මම Ward එකට ඇතුළත් වුනොත් මොකද වෙන්නේ?", a: "ඔබේ ප්‍රතිකාර සැලසුමට ආහාර ගැළපෙන්නත් ඔබ සුවවෙන විදිහට සකසන්නත් Ward Reviews ලබාගත හැක." },
      { q: "ලිඛිතව මොකක් හරි ලැබෙයිද?", a: "ඔව්. හැම සැලසුමක්ම ලිඛිතයි, ඔබේ තක්සේරුවට පුද්ගලිකයි, පොදු Sheet එකක් නෙවෙයි." },
    ],
  },
  {


    hours: "සතිපතා Clinics",

    desc: "සන්ධි හා සම්බන්ධක පටක රෝග තක්සේරුව, Clinic එකේම Corridor එකේදී පත් කරන ගිනි අවුලුවන Blood Markers සහ Imaging සමඟින්, අඛණ්ඩ Monitoring ඕන තත්ත්ව සඳහා දිගුකාලීන Review එකක්.",
    tags: ["සන්ධි රෝග තක්සේරුව", "සම්බන්ධක පටක රෝගය", "එකම Corridor Markers සහ Imaging", "දිගුකාලීන Review"],
    facts: [
      { k: "සායන", v: "සතිපතා" },
      { k: "පරීක්ෂණ", v: "ගිනි අවුලුවන Markers, එකම Corridor" },
      { k: "රූප ගත කිරීම", v: "එකම Corridor" },
      { k: "පසු විපරම", v: "දිගුකාලීන Review" },
    ],
    lede: "සන්ධි හා සම්බන්ධක පටක රෝග තක්සේරුව, එකම Corridor එකේදී ගිනි අවුලුවන Markers සහ Imaging සලසමින්.",

    body1: "සන්ධි රෝග Clinic එක සන්ධි වේදනාව, ඉදිමීම සහ තද වීම, ශරීරයේ එකකට වඩා කොටස්වලට බලපාන සම්බන්ධක පටක තත්ත්වයන් සමඟින්ම තක්සේරු කරනවා. හැම පියවරකටම ඔබව වෙනතක යවනවා නැතුවම චිත්‍රයක් හදාගන්න පුළුවන් වෙන්නට ගිනි අවුලුවන Blood Markers සහ Imaging Clinic එකේම Corridor එකේදී සලසනවා.",
    body2: "මෙතන දකින බොහෝ තත්ත්වයන්ට තනි Visit එකක් වෙනුවට දිගුකාලීන Monitoring ඕන, ඒනිසා Clinic එක අඛණ්ඩ Review එකක් වටා හදලා තියෙන්නේ: Markers සහ රෝග ලක්ෂණ වෙනස් වෙන අන්දම Track කර හැම Appointment එකකදීම ඔබේ කළමනාකරණ සැලැස්ම සකසමින්.",
    strip: [
      { k: "සායන", v: "සතිපතා" },
      { k: "සලකුණු", v: "එකම Corridor" },
      { k: "රූප ගත කිරීම", v: "එකම Corridor" },
      { k: "සමාලෝචනය", v: "දිගුකාලීන" },
    ],
    covers: [
      "සන්ධි රෝග තක්සේරුව",
      "සම්බන්ධක පටක රෝග තක්සේරුව",
      "ගිනි අවුලුවන Marker පරීක්ෂණ",
      "සන්ධි හා මාංශ පේශි Imaging",
      "දිගුකාලීන තත්ත්ව Review",
    ],
    conditions: [
      "Rheumatoid Arthritis රෝගය",
      "නොනැවතෙන සන්ධි වේදනාව සහ ඉදිමීම",
      "සැක සහිත සම්බන්ධක පටක රෝගය",
      "නිදන්ගත උල්පත් හෝ සන්ධි තදබව",
      "පැහැදිලි කරන්න බැරි ගිනි අවුලුවන ලක්ෂණ",
    ],
    location: "දෙවන මහල, සන්ධි රෝග Clinic එක",
    steps: [
      { desc: "සන්ධි රෝග Clinic කෙලින්ම Book කරන්න, නැත්නම් වෙනත් Clinic එකකින් Referral එකක් සමඟ එන්න." },
      { desc: "සන්ධි රෝග විශේෂඥවරයෙක් ඔබේ සන්ධි පරීක්ෂා කර ඔබේ රෝග ලක්ෂණවල History එකක් ගන්නවා." },
      { desc: "ගිනි අවුලුවන Markers සහ Imaging Clinic එකේම Corridor එකේදී සලසනවා." },
      { desc: "ඔබේ විශේෂඥ වෛද්‍යවරයා කළමනාකරණ සැලැස්මකට සහ දිගුකාලීන Review සඳහා Schedule එකකට එකඟ වෙනවා." },
    ],
    prep: [
      "මොන සන්ධි වලට බලපානවද, කාලයාන්තරයේ රෝග ලක්ෂණ කොහොම වෙනස් වුනාද සටහන් කරන්න",
      "ඔබේ වර්තමාන බෙහෙත් ලැයිස්තුවක් ගෙන එන්න",
      "කලින් තිබ්බ Blood Test හෝ Imaging ප්‍රතිඵල ගෙන එන්න",
      "බලපෑමට ලක්වූ සන්ධි පහසුවෙන් පරීක්ෂා කරන්න පුළුවන් ඇඳුමක් අඳින්න",
    ],
    team: [
      { role: "සන්ධි රෝග විශේෂඥවරු", note: "සන්ධි හා සම්බන්ධක පටක රෝග තක්සේරු කර දිගුකාලීන Review මෙහෙයවනවා." },
      { role: "රසායනාගාර Technologists", note: "Clinic එකෙන් සලසන ගිනි අවුලුවන Marker පරීක්ෂණ Process කරනවා." },
      { role: "Radiographer ලා", note: "එකම Corridor එකේදී සන්ධි හා මාංශ පේශි Imaging ලබාදෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Consultations සහ දිගුකාලීන Review Appointments Book කරනවා." },
    ],
    faq: [
      { q: "බලපත් වෙන්න Referral එකක් ඕනද?", a: "නෑ. ඔබට සන්ධි රෝග Clinic කෙලින්ම Book කරන්න පුළුවන්, වෙනත් වෛද්‍යවරයෙකුගෙන් Referral එකකුත් පිළිගන්නවා." },
      { q: "නැවත නැවත Blood Tests ඕන වෙයිද?", a: "සන්ධි රෝග තත්ත්ව බොහෝමයක් කාලයාන්තරයේ ගිනි අවුලුවන Markers සමඟ Monitor කරනවා, ඒනිසා නැවත පරීක්ෂණය බොහෝවිට දිගුකාලීන Review එකේ කොටසක්." },
      { q: "එකම Visit එකේදී Imaging කරගන්න පුළුවන්ද?", a: "Imaging Clinic එකේම Corridor එකේදී සලසනවා, ඒනිසා බොහෝවිට වෙනම ගමනක් නැතුවම සංවිධානය කරගත හැක." },
      { q: "මේක තනි Consultation එකක්ද, එහෙමත් නැත්තම් අඛණ්ඩ සත්කාරයක්ද?", a: "මෙතන දකින බොහෝ තත්ත්වයන්ට දිගුකාලීන Review ඕන, ඔබේ තත්ත්වයට ගැලපෙන Schedule එකක් ඔබේ විශේෂඥ වෛද්‍යවරයා තීරණය කරනවා." },
    ],
  },
  {


    hours: "සතිපතා Clinics",

    desc: "හිසරදය, කම්පනාත්මක ආබාධ, Stroke සුවවීම සහ ස්නායු පැමිණිලි සඳහා තක්සේරුව හා Follow-up, ඔබේ විශේෂඥ වෛද්‍යවරයාගේ තක්සේරුවට ඕන වූ විදිහට Imaging සලසමින්.",
    tags: ["හිසරද තක්සේරුව", "කම්පනාත්මක Follow-up", "Stroke සුවවීම", "ස්නායු පැමිණිලි"],
    facts: [
      { k: "සායන", v: "සතිපතා" },
      { k: "ආවරණය කරයි", v: "හිසරදය, කම්පනාත්මක, Stroke, ස්නායු පැමිණිලි" },
      { k: "රූප ගත කිරීම", v: "ඕන වූ විදිහට සලසයි" },
      { k: "වෙන් කිරීම", v: "Consult හෝ Referral" },
    ],
    lede: "හිසරදය, කම්පන, Stroke සුවවීම සහ ස්නායු පැමිණිලි සඳහා තක්සේරුව හා Follow-up, ඔබේ Case එකට ඕන තැන Imaging සලසමින්.",

    body1: "ස්නායු රෝග Clinic එක නොනැවතෙන හිසරදය, කම්පනාත්මක ආබාධ, Stroke එකකින් පසු සුවවීම, සහ හිරිගඩුව, දුර්වලතාවය හෝ Tingling වගේ ස්නායුවලට බලපාන පැමිණිලි තක්සේරු කරනවා. තව විමර්ශනයක් ඕනද කියලා තීරණය කරන්න කලින් ඔබේ විශේෂඥ වෛද්‍යවරයා ඔබව පරීක්ෂා කර විස්තරාත්මක History එකක් ගන්නවා.",
    body2: "රෝග විනිශ්චය පැහැදිලි කරන්න Imaging උදව් වෙයි නම්, ඔබේ තක්සේරුවේ කොටසක් විදිහට එය සලසනවා, ප්‍රතිඵල Follow-up Visit එකකදී ඔබ සමඟ සාකච්ඡා කරනවා. බොහෝ ස්නායු තත්ත්වයන්ට තනි Consultation එකක් වෙනුවට අඛණ්ඩ Review ඕන, Clinic එක සකසලා තියෙන්නේ Appointments ගණනාවක් පුරාවට ඔබේ ප්‍රගතිය Track කරන්නට.",
    strip: [
      { k: "සායන", v: "සතිපතා" },
      { k: "ආවරණය කරයි", v: "හිසරදය, කම්පනාත්මක, Stroke, ස්නායු" },
      { k: "රූප ගත කිරීම", v: "ඕන වූ විදිහට" },
      { k: "පසු විපරම", v: "අඛණ්ඩ" },
    ],
    covers: [
      "හිසරද තක්සේරුව",
      "කම්පනාත්මක ආබාධ Follow-up",
      "Stroke සුවවීම Review",
      "ස්නායු පැමිණිලි තක්සේරුව",
      "ඕන තැන Imaging සැලසුම",
    ],
    conditions: [
      "නිදන්ගත හෝ දරුණු හිසරදය",
      "Epilepsy සහ කම්පන",
      "Stroke සුවවීම",
      "හිරිගඩුව හෝ Tingling",
      "මාංශ පේශි දුර්වලතාවය",
    ],
    location: "දෙවන මහල, ස්නායු රෝග Clinic එක",
    steps: [
      { desc: "ස්නායු රෝග Clinic කෙලින්ම Book කරන්න, නැත්නම් වෙනත් වෛද්‍යවරයෙකුගෙන් Referral එකක් සමඟ එන්න." },
      { desc: "ස්නායු රෝග විශේෂඥවරයෙක් විස්තරාත්මක History එකක් ගෙන ඔබේ ස්නායු පද්ධතිය පරීක්ෂා කරනවා." },
      { desc: "ඔබේ විශේෂඥ වෛද්‍යවරයාගේ තක්සේරුව ඉල්ලන තැන Imaging සලසනවා." },
      { desc: "ප්‍රතිඵල සහ අඛණ්ඩ කළමනාකරණ සැලැස්මක් ඔබේ Follow-up Visit එකේදී සාකච්ඡා කරනවා." },
    ],
    prep: [
      "රෝග ලක්ෂණ පටන් ගත්තේ කවදද, කොහොම වෙනස් වුනාද සටහන් කරන්න",
      "ඔබේ වර්තමාන බෙහෙත් ලැයිස්තුවක් ගෙන එන්න",
      "කලින් තිබ්බ Imaging හෝ ස්නායු රෝග Reports ගෙන එන්න",
      "කම්පන ගැටළුවක් නම්, පුළුවන් නම් සාක්ෂිකරුවෙක් විස්තර කරපු දේ සටහන් කරන්න",
    ],
    team: [
      { role: "ස්නායු රෝග විශේෂඥවරු", note: "හිසරදය, කම්පනාත්මක, Stroke සුවවීම සහ ස්නායු පැමිණිලි තක්සේරු කරනවා." },
      { role: "Radiographer ලා", note: "ස්නායු තක්සේරුවේ කොටසක් විදිහට Imaging ලබාදෙනවා." },
      { role: "ස්නායු Nursing කණ්ඩායම", note: "Consultations සහ Follow-up Appointments සඳහා සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Consultations Book කර අඛණ්ඩ Review Appointments කළමනාකරණය කරනවා." },
    ],
    faq: [
      { q: "බලපත් වෙන්න Referral එකක් ඕනද?", a: "නෑ. ඔබට ස්නායු රෝග Clinic කෙලින්ම Book කරන්න පුළුවන්, වෙනත් වෛද්‍යවරයෙකුගෙන් Referral එකකුත් පිළිගන්නවා." },
      { q: "මගේ පලමු Visit එකේදී Scan එකක් ඕන වෙයිද?", a: "හැම වෙලාවකම නෑ. හැම Visit එකකටම වඩා ඔබේ විශේෂඥ වෛද්‍යවරයාගේ තක්සේරුවට ඕන තැන Imaging සලසනවා." },
      { q: "මේ Clinic එක Stroke රෝගීන්ට විතරද?", a: "නෑ. හිසරදය, කම්පනාත්මක ආබාධ සහ විවිධ ස්නායු පැමිණිලිත් ආවරණය කරනවා." },
      { q: "කොපමණ නිතරද Review කරන්නේ?", a: "බොහෝ ස්නායු තත්ත්වයන්ට අඛණ්ඩ Follow-up ඕන, ඔබේ Case එකට ගැලපෙන Schedule එකක් ඔබේ විශේෂඥ වෛද්‍යවරයා තීරණය කරනවා." },
    ],
  },
  {


    hours: "සතිපතා Clinics",

    desc: "වකුගඩු ක්‍රියාකාරිත්වය, රුධිර පීඩන පාලනය සහ වකුගඩු Follow-up තක්සේරුව, Visit එකේදීම ප්‍රතිඵල ඔබ සමඟ සාකච්ඡා කරන්න ඔබේ විශේෂඥ වෛද්‍යවරයාට පුළුවන් වෙන්නට එදිනම Report කරන රසායනාගාර Panels සමඟින්.",
    tags: ["වකුගඩු ක්‍රියාකාරිත්ව තක්සේරුව", "රුධිර පීඩන පාලනය", "වකුගඩු Follow-up", "එදිනම රසායනාගාර Panels"],
    facts: [
      { k: "සායන", v: "සතිපතා" },
      { k: "අවධානය", v: "වකුගඩු ක්‍රියාකාරිත්වය සහ රුධිර පීඩනය" },
      { k: "රසායනාගාර Panels", v: "එදිනම Reporting" },
      { k: "වෙන් කිරීම", v: "Consult හෝ Referral" },
    ],
    lede: "වකුගඩු ක්‍රියාකාරිත්ව තක්සේරුව, රුධිර පීඩන පාලනය සහ වකුගඩු Follow-up, එදිනම Report කරන රසායනාගාර Panels සමඟින්.",

    body1: "වකුගඩු Clinic එක වකුගඩු කොහොම ක්‍රියා කරනවද තක්සේරු කර, වකුගඩු සෞඛ්‍යයට බලපාන තැන රුධිර පීඩන පාලනය Review කර, දැනටමත් වකුගඩු තත්ත්වයක් ඇති රෝගීන් Follow-up කරනවා. වකුගඩු ක්‍රියාකාරිත්වය ආවරණය කරන රසායනාගාර Panels එදිනම Report කරනවා, වෙනම Appointment එකකදී වෙනුවට Visit එකේදීම ඔබේ විශේෂඥ වෛද්‍යවරයාට ඉලක්කම් ඔබ සමඟ සාකච්ඡා කරන්න පුළුවන් වෙන්නට.",
    body2: "ප්‍රතිඵල ඔබේ වකුගඩු සෞඛ්‍යයට කුමක් අදහස් කරයිද ඔබේ විශේෂඥ වෛද්‍යවරයා පැහැදිලි කර, රුධිර පීඩන පාලනය, බෙහෙත් සකස් කිරීම සහ ඔබේ ඊළඟ Review එකට කලින් තියෙන කාල පරාසය සඳහා සැලැස්මකට එකඟ වෙනවා.",
    strip: [
      { k: "සායන", v: "සතිපතා" },
      { k: "රසායනාගාර Panels", v: "එදිනම Reporting" },
      { k: "අවධානය", v: "වකුගඩු ක්‍රියාකාරිත්වය සහ BP" },
      { k: "පසු විපරම", v: "අඛණ්ඩ වකුගඩු Review" },
    ],
    covers: [
      "වකුගඩු ක්‍රියාකාරිත්ව තක්සේරුව",
      "වකුගඩු සෞඛ්‍යය සඳහා රුධිර පීඩන Review",
      "වකුගඩු Follow-up",
      "එදිනම වකුගඩු ක්‍රියාකාරිත්ව රසායනාගාර Panels",
      "වකුගඩු තත්ත්ව සඳහා බෙහෙත් Review",
    ],
    conditions: [
      "අඩු වූ වකුගඩු ක්‍රියාකාරිත්වය",
      "වකුගඩුවලට බලපාන ඉහළ රුධිර පීඩනය",
      "නිදන්ගත වකුගඩු රෝග Follow-up",
      "මුත්‍රාවේ Protein හෝ රුධිරය හමුවීම",
      "වෙනත් අසනීපයකින් පසු වකුගඩු ක්‍රියාකාරිත්ව Monitoring",
    ],
    location: "පළමු මහල, වකුගඩු Clinic එක",
    steps: [
      { desc: "වකුගඩු Clinic කෙලින්ම Book කරන්න, නැත්නම් වකුගඩු ක්‍රියාකාරිත්ව ගැටළු සඳහා Referral එකක් සමඟ එන්න." },
      { desc: "වකුගඩු ක්‍රියාකාරිත්ව රසායනාගාර Panels ඔබේ Visit එක වටා සලසා එදිනම Report කරනවා." },
      { desc: "වකුගඩු රෝග විශේෂඥවරයෙක් ඔබේ ප්‍රතිඵල, රුධිර පීඩනය සහ History ඔබ සමඟ Review කරනවා." },
      { desc: "රුධිර පීඩන පාලනය සහ අඛණ්ඩ වකුගඩු Review සඳහා සැලැස්මකට ඔබ යන්න කලින්ම එකඟ වෙනවා." },
    ],
    prep: [
      "වේදනා නාශක ඇතුළුව ඔබේ වර්තමාන බෙහෙත් ලැයිස්තුවක් ගෙන එන්න",
      "කලින් තිබ්බ වකුගඩු ක්‍රියාකාරිත්ව පරීක්ෂණ ප්‍රතිඵල ගෙන එන්න",
      "ගෙදර Monitor කරනවා නම් මෑත රුධිර පීඩන කියවීම් සටහන් කරන්න",
      "ඔබේ Blood Test සඳහා දුන් උපවාස උපදෙස් අනුගමනය කරන්න",
    ],
    team: [
      { role: "වකුගඩු රෝග විශේෂඥවරු", note: "වකුගඩු ක්‍රියාකාරිත්වය තක්සේරු කර රුධිර පීඩනය සහ වකුගඩු Follow-up මෙහෙයවනවා." },
      { role: "රසායනාගාර Technologists", note: "එදිනම Reporting සමඟ වකුගඩු ක්‍රියාකාරිත්ව Panels Process කරනවා." },
      { role: "වකුගඩු Nursing කණ්ඩායම", note: "Consultations සහ රුධිර පීඩන Monitoring සඳහා සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Consultations සහ අඛණ්ඩ වකුගඩු Review Appointments Book කරනවා." },
    ],
    faq: [
      { q: "බලපත් වෙන්න Referral එකක් ඕනද?", a: "නෑ. ඔබට වකුගඩු Clinic කෙලින්ම Book කරන්න පුළුවන්, වෙනත් වෛද්‍යවරයෙකුගෙන් Referral එකකුත් පිළිගන්නවා." },
      { q: "මගේ වකුගඩු ක්‍රියාකාරිත්ව ප්‍රතිඵල කවදද දැනගන්නේ?", a: "වකුගඩු ක්‍රියාකාරිත්ව රසායනාගාර Panels එදිනම Report කරනවා, ඒනිසා සාමාන්‍යයෙන් ඔබේ විශේෂඥ වෛද්‍යවරයාට Visit එකේදීම ඒවා ඔබ සමඟ සාකච්ඡා කරන්න පුළුවන්." },
      { q: "මගේ වකුගඩු ක්‍රියාකාරිත්වයට තව සමීප Monitoring ඕන වුනොත් මොකද වෙන්නේ?", a: "ඔබේ වකුගඩු ක්‍රියාකාරිත්වය වෙනස් වෙන විදිහට ඔබේ වකුගඩු රෝග විශේෂඥවරයාට Review කරන වාර ගණන වැඩි කර ඔබේ රුධිර පීඩන සහ බෙහෙත් සැලැස්ම සකසන්න පුළුවන්." },
      { q: "කොපමණ නිතරද Review ඕන වෙන්නේ?", a: "ඔබේ වකුගඩු ක්‍රියාකාරිත්වය සහ ඔබේ තත්ත්වය කොපමණ ස්ථාවරද අනුව ඔබේ වකුගඩු රෝග විශේෂඥවරයා Review කාල පරාසයක් තීරණය කරනවා." },
    ],
  },
  {


    hours: "සතිපතා Clinics",

    desc: "Asthma, COPD සහ පපුවේ ආසාදන තක්සේරුව, එකම Visit එකේදීම Chest X-ray ලබාගත හැක සහ Ward එකට ඇතුළත් වූ රෝගීන් සඳහා ශ්වසන Physiotherapy සලසයි.",
    tags: ["Asthma සහ COPD සත්කාරය", "පපුවේ ආසාදන තක්සේරුව", "එකම Visit Chest X-ray", "ශ්වසන Physiotherapy"],
    facts: [
      { k: "සායන", v: "සතිපතා" },
      { k: "එකම Visit", v: "පපුවේ X-ray" },
      { k: "ආවරණය කරයි", v: "Asthma, COPD, පපුවේ ආසාදන" },
      { k: "ඇතුළත් රෝගීන්", v: "ශ්වසන Physiotherapy" },
    ],
    lede: "Asthma, COPD සහ පපුවේ ආසාදන තක්සේරුව, එකම Visit එකේදීම Chest X-ray සහ ඇතුළත් රෝගීන් සඳහා ශ්වසන Physiotherapy සමඟින්.",

    body1: "ශ්වසන Clinic එක Asthma, Chronic Obstructive Pulmonary Disease සහ පපුවේ ආසාදන තක්සේරු කරනවා, රෝග විනිශ්චයට උදව් වෙන තැන එකම Visit එකේදීම Chest X-ray ලබාගත හැක. කළමනාකරණ සැලැස්මකට එකඟ වෙන්න කලින් ඔබේ විශේෂඥ වෛද්‍යවරයා Film එක ඔබේ රෝග ලක්ෂණ සහ හුස්ම ගැනීමේ පරීක්ෂණ සමඟින්ම Review කරනවා.",
    body2: "පපුවේ තත්ත්වයක් සමඟ Ward එකට ඇතුළත් වූ රෝගීන් සඳහා, Secretions ඉවත් කරගන්නත් වෛද්‍ය ප්‍රතිකාරය සමඟින්ම හුස්ම ගැනීමට සහාය වෙන්නත් ඇතුළත් රෝගී සත්කාරයේ කොටසක් විදිහට ශ්වසන Physiotherapy සලසනවා.",
    strip: [
      { k: "සායන", v: "සතිපතා" },
      { k: "පපුවේ X-ray", v: "එකම Visit" },
      { k: "ආවරණය කරයි", v: "Asthma, COPD, ආසාදන" },
      { k: "භෞත චිකිත්සාව", v: "ඇතුළත් රෝගීන් සඳහා" },
    ],
    covers: [
      "Asthma තක්සේරුව සහ Review",
      "COPD තක්සේරුව සහ Review",
      "පපුවේ ආසාදන තක්සේරුව",
      "එකම Visit Chest X-ray",
      "ඇතුළත් රෝගී ශ්වසන Physiotherapy",
    ],
    conditions: [
      "Asthma රෝගය",
      "Chronic Obstructive Pulmonary Disease රෝගය",
      "නොනැවතෙන කැස්ස",
      "පපුවේ ආසාදනය",
      "වෑයමකදී හුස්ම හිරවීම",
    ],
    location: "පළමු මහල, ශ්වසන Clinic එක",
    steps: [
      { desc: "Consult එකක් කෙලින්ම Book කරන්න, නැත්නම් පපුවේ හෝ හුස්ම ගැනීමේ පැමිණිල්ලක් සඳහා Referral එකක් සමඟ එන්න." },
      { desc: "ශ්වසන වෛද්‍යවරයෙක් ඔබව පරීක්ෂා කර ඔබේ හුස්ම ගැනීමේ History Review කරනවා." },
      { desc: "තක්සේරුවට උදව් වෙන තැන එකම Visit එකේදීම Chest X-ray එකක් ගන්නවා." },
      { desc: "ඔබ ඇතුළත් වුනොත් Physiotherapy සලසමින්, ඔබේ විශේෂඥ වෛද්‍යවරයා කළමනාකරණ සැලැස්මකට එකඟ වෙනවා." },
    ],
    prep: [
      "ඔබේ වර්තමාන Inhalers හෝ ශ්වසන බෙහෙත් ගෙන එන්න",
      "රෝග ලක්ෂණ කොපමණ නිතරද එනවද, මොකද ඒවා අවුස්සන්නේද සටහන් කරන්න",
      "කලින් තිබ්බ Chest X-ray හෝ හුස්ම ගැනීමේ පරීක්ෂණ ප්‍රතිඵල ගෙන එන්න",
      "ඔබේ Consultation එකේදී දුම්කොළ පානය පිළිබඳ History එකක් තිබෙනවා නම් සඳහන් කරන්න",
    ],
    team: [
      { role: "ශ්වසන වෛද්‍යවරු", note: "Asthma, COPD සහ පපුවේ ආසාදන තක්සේරු කර Clinic එක මෙහෙයවනවා." },
      { role: "Radiographer ලා", note: "Consultation එකේම එකම Visit එකේදී Chest X-ray ලබාදෙනවා." },
      { role: "ශ්වසන Physiotherapist ලා", note: "ඇතුළත් රෝගීන් සඳහා හුස්ම ගැනීම සහ Secretion ඉවත් කිරීමට සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Consultations Book කර අඛණ්ඩ ශ්වසන Review කළමනාකරණය කරනවා." },
    ],
    faq: [
      { q: "මගේ පලමු Visit එකේදී Chest X-ray එකක් ලැබෙයිද?", a: "ඔබේ තක්සේරුවට උදව් වෙන තැන, ඔව්, ඔබේ Consultation එකේම එකම Visit එකේදී Chest X-ray එකක් ගන්න පුළුවන්." },
      { q: "බලපත් වෙන්න Referral එකක් ඕනද?", a: "නෑ. ඔබට Consult එකක් කෙලින්ම Book කරන්න පුළුවන්, වෙනත් වෛද්‍යවරයෙකුගෙන් Referral එකකුත් පිළිගන්නවා." },
      { q: "Physiotherapy මේ Clinic එකේ කොටසක්ද?", a: "පපුවේ තත්ත්වයක් සමඟ Ward එකට ඇතුළත් වූ රෝගීන් සඳහා, වෛද්‍ය ප්‍රතිකාරය සමඟින්ම ශ්වසන Physiotherapy සලසනවා." },
      { q: "මේ Clinic එකට දිගුකාලීන COPD කළමනාකරණය කරන්න පුළුවන්ද?", a: "ඔව්. අඛණ්ඩ COPD Review සහ කළමනාකරණය Clinic එකේ නිතිපතා වැඩකොටසක්." },
    ],
  },
  {


    hours: "Referral එකකින්",

    desc: "රක්තහීනතාව සහ රුධිර ගණන අසාමාන්‍යතා සඳහා විශේෂඥ Review එකක්, Consultation එකට කලින්ම අපේම Histopathology සේවාව හරහා Blood Film සහ Bone Marrow සොයාගැනීම් Report කරමින්.",
    tags: ["රක්තහීනතා තක්සේරුව", "රුධිර ගණන අසාමාන්‍යතා", "Blood Film වාර්තා කිරීම", "විශේෂඥ Review"],
    facts: [
      { k: "ප්‍රවේශය", v: "Referral එකකින්" },
      { k: "වාර්තා කිරීම", v: "Histopathology හරහා" },
      { k: "අවධානය", v: "රක්තහීනතාව සහ රුධිර ගණන අසාමාන්‍යතා" },
      { k: "සමාලෝචනය", v: "විශේෂඥ මෙහෙයවන" },
    ],
    lede: "රක්තහීනතාව සහ රුධිර ගණන අසාමාන්‍යතා සඳහා විශේෂඥ Review එකක්, Histopathology හරහා Blood Film සහ Marrow සොයාගැනීම් Report කරමින්.",

    body1: "සාමාන්‍ය හෝ Follow-up පරීක්ෂණවලින් හමුවෙන රක්තහීනතාව සහ අනිත් රුධිර ගණන අසාමාන්‍යතා සඳහා රෝගීන් Referral එකකින් බලනවා. Blood Film හෝ Bone Marrow Sample එකක් ඕන වුනොත්, සොයාගැනීම් අපේම Histopathology සේවාව හරහා Report කර, ඔබේ Clinical History සමඟින්ම රක්ත රෝග විශේෂඥවරයා විසින් Review කරනවා.",
    body2: "සොයාගැනීම් කුමක් අදහස් කරයිද ඔබේ විශේෂඥ වෛද්‍යවරයා පැහැදිලි කර, තව පරීක්ෂණ හෝ අඛණ්ඩ Monitoring සඳහා සැලැස්මකට එකඟ වෙනවා, කාලයාන්තරයේ ඔබේ රුධිර ගණන Track කරන්න Review Appointments සලසමින්.",
    strip: [
      { k: "ප්‍රවේශය", v: "Referral එකකින්" },
      { k: "වාර්තා කිරීම", v: "Histopathology හරහා" },
      { k: "සමාලෝචනය", v: "විශේෂඥ මෙහෙයවන" },
      { k: "පසු විපරම", v: "අඛණ්ඩ Monitoring" },
    ],
    covers: [
      "රක්තහීනතා තක්සේරුව",
      "රුධිර ගණන අසාමාන්‍යතා Review",
      "Blood Film වාර්තා කිරීම",
      "Bone Marrow Sample වාර්තා කිරීම",
      "සොයාගැනීම්වල විශේෂඥ Review",
    ],
    conditions: [
      "පැහැදිලි කරන්න බැරි රක්තහීනතාව",
      "අසාමාන්‍ය White Cell හෝ Platelet ගණන්",
      "සාමාන්‍ය පරීක්ෂණයේදී සැක සහිත රුධිර ආබාධයක්",
      "දන්නා රුධිර තත්ත්වයක Follow-up",
    ],
    location: "දෙවන මහල, රක්ත රෝග Clinic එක",
    steps: [
      { desc: "ඔබේ Referral එකයි දැනට තියෙන ඕන රුධිර ප්‍රතිඵලයි ඔබේ Appointment එකට කලින් Review කරනවා." },
      { desc: "රක්ත රෝග විශේෂඥවරයෙක් ඔබේ History ගෙන ඔබව පරීක්ෂා කරනවා." },
      { desc: "Blood Film හෝ Bone Marrow Samples, ඕන වුනොත්, Histopathology හරහා Report කරනවා." },
      { desc: "ඔබේ විශේෂඥ වෛද්‍යවරයා සොයාගැනීම් සාකච්ඡා කර Monitoring හෝ තව පරීක්ෂණ සැලැස්මකට එකඟ වෙනවා." },
    ],
    prep: [
      "ඔබේ වෛද්‍යවරයාගෙන් Referral Letter එකක් ගෙන එන්න",
      "මෑත Full Blood Count ප්‍රතිඵලවල පිටපත් ගෙන එන්න",
      "ඔබේ වර්තමාන බෙහෙත් ලැයිස්තුවක් ගෙන එන්න",
      "ඔබ දැක්කා නම් අසාමාන්‍ය තැලීම්, මහන්සිය හෝ රුධිර වහනය සටහන් කරන්න",
    ],
    team: [
      { role: "රක්ත රෝග විශේෂඥවරු", note: "Clinic එකට Referral කරන රක්තහීනතාව සහ රුධිර ගණන අසාමාන්‍යතා Review කරනවා." },
      { role: "Histopathology කණ්ඩායම", note: "Clinic එක සඳහා Blood Film සහ Bone Marrow Samples Report කරනවා." },
      { role: "රක්ත රෝග Nursing කණ්ඩායම", note: "Consultations සහ Sample එකතු කිරීමට සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Referrals සහ Follow-up Appointments කළමනාකරණය කරනවා." },
    ],
    faq: [
      { q: "බලපත් වෙන්න Referral එකක් ඕනද?", a: "ඔව්. මේ Clinic එක Referral එකකින් ක්‍රියාත්මක වෙනවා, ඒනිසා ඔබේ වෛද්‍යවරයාගෙන් Letter එකක් සහ මෑත රුධිර ප්‍රතිඵල ගෙන එන්න." },
      { q: "මට Bone Marrow Sample එකක් ඕන වුනොත් මොකද වෙන්නේ?", a: "සොයාගැනීම් අපේම Histopathology සේවාව හරහා Report කර, ඔබේ History සමඟින්ම ඔබේ රක්ත රෝග විශේෂඥවරයා විසින් Review කරනවා." },
      { q: "හැම රක්තහීනතා Case එකක්ම මෙතන බලනවද?", a: "රක්තහීනතාවේ බොහෝ Cases ඔබේම වෛද්‍යවරයා විසින් කළමනාකරණය කරනවා; මේ Clinic එක අවධානය යොමු කරන්නේ මූලික රුධිර ගණන අසාමාන්‍යතාවේ විශේෂඥ තක්සේරුවක් ඕන Cases වලට." },
      { q: "නැවත Blood Tests ඕන වෙයිද?", a: "රුධිර ආබාධ සඳහා අඛණ්ඩ Monitoring සාමාන්‍යයි, ඔබේ Case එකට ගැලපෙන Review Schedule එකක් ඔබේ විශේෂඥ වෛද්‍යවරයා තීරණය කරනවා." },
    ],
  },
  {


    hours: "Appointment එකකින්",

    desc: "පුද්ගලික Consulting Rooms වල මානසික තක්සේරුව සහ උපදේශනය, ඔබේ සත්කාරයේ කොටසක් නම් බෙහෙත් Review එකක් සමඟින්, ඉදිරියට ඔබට ඕන දේට ගැලපෙන Follow-up එකක් Schedule කරමින්.",
    tags: ["මානසික තක්සේරුව", "පුද්ගලික උපදේශන Rooms", "බෙහෙත් Review", "නම්‍යශීලී Follow-up"],
    facts: [
      { k: "වෙන් කිරීම", v: "Appointment එකකින්" },
      { k: "පසුබිම", v: "පුද්ගලික Consulting Rooms" },
      { k: "බෙහෙත් Review", v: "ඕන තැන ඇතුළත් වෙයි" },
      { k: "පසු විපරම", v: "ඔබ සමඟ Schedule කරයි" },
    ],
    lede: "පුද්ගලික Consulting Rooms වල මානසික තක්සේරුව සහ උපදේශනය, ඔබ වටා සලසන බෙහෙත් Review සහ Follow-up සමඟින්.",

    body1: "Appointments සිදු වෙන්නේ පොදු Outpatient ප්‍රදේශයෙන් ඈත, පුද්ගලික Consulting Rooms වල, ඔබට අමාරු වුනු දේ ගැන විවෘතව කතා කරන්න පුළුවන් වෙන්නට. පලමු Appointment එක තක්සේරුවක්: ඔබ කොහොමද ඉන්නේ, මොකද වෙනස් වුනේ, කවර වගේ සහයෝගයක් උදව් වෙයිද කියන කතාබහක්.",
    body2: "බෙහෙත් දැනටමත් ඔබේ සත්කාරයේ කොටසක් නම්, එහෙමත් නැත්තම් උදව් වෙයි නම්, Appointment එකේ කොටසක් විදිහට Review කර පැහැදිලිව විස්තර කරනවා, බලාපොරොත්තු වෙන්න ඕන දේත් හරි නොවෙනවා නම් මතු කරන්න ඕන දේත් ඇතුළුව. Follow-up එක ඔබට ගැලපෙන විදිහට Schedule කරනවා, ඒක තනි කතාබහක් වුනත් කාලයාන්තරයේ අඛණ්ඩ Appointments වුනත්.",
    strip: [
      { k: "පසුබිම", v: "පුද්ගලික Rooms" },
      { k: "වෙන් කිරීම", v: "Appointment එකකින්" },
      { k: "බෙහෙත් Review", v: "අදාළ තැන" },
      { k: "පසු විපරම", v: "ඔබ සමඟ සලසයි" },
    ],
    covers: [
      "මානසික තක්සේරුව",
      "තනි උපදේශනය",
      "බෙහෙත් Review",
      "පසු විපරම Appointment Scheduling",
    ],
    conditions: [
      "නොනැවතෙන අඩු මානසික බව",
      "කාංසාව (Anxiety)",
      "Stress හෝ ජීවිත වෙනසකට මුහුණදීමේ අපහසුතාව",
      "මානසික බවට සම්බන්ධ නින්ද අපහසුතා",
      "මානසික සෞඛ්‍ය තත්ත්වයක් සඳහා අඛණ්ඩ බෙහෙත් Review",
    ],
    location: "පළමු මහල, පුද්ගලික Consulting Rooms",
    steps: [
      { desc: "රහසිගතව Appointment එකක් Book කරන්න; පටන්ගන්න Referral එකක් ඕන නෑ." },
      { desc: "පුද්ගලික කතාබහක් ඔබ කොහොමද ඉන්නේ, කවර වගේ සහයෝගයක් උදව් වෙයිද කියලා ආවරණය කරනවා." },
      { desc: "බෙහෙත් අදාළ තැන, Review කර පැහැදිලිව විස්තර කරනවා." },
      { desc: "ඊළඟට මොකද වෙන්නේ කියලා එකට එකඟ වෙනවා, ඒක එක Visit එකක් වුනත් අඛණ්ඩ Appointments වුනත්." },
    ],
    prep: [
      "ඔබ සූදානම් වෙන්න ඕන කිසිම දෙයක් නෑ; ඔබ ඉන්න විදිහටම එන්න",
      "අදාළ නම්, ඔබ දැනට ගන්නා බෙහෙත් ලැයිස්තුවක් ගෙන එන්න",
      "මතක් කරගන්න ඕන දේවල් ලියාගන්න",
      "විශේෂිත Appointment වේලාවක් කැමති නම් Desk එකට කියන්න",
    ],
    team: [
      { role: "මනෝ රෝග විශේෂඥවරු", note: "තක්සේරුව සිදු කර සත්කාරයේ කොටසක් නම් බෙහෙත් Review මෙහෙයවනවා." },
      { role: "උපදේශකයින්", note: "පුද්ගලික Consulting Rooms වල තනි උපදේශනය ලබාදෙනවා." },
      { role: "මානසික සෞඛ්‍ය Nursing කණ්ඩායම", note: "Appointments සහ Follow-up Scheduling සඳහා සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "රහසිගතව Appointments Book කර Follow-up සලසනවා." },
    ],
    faq: [
      { q: "Appointment එකක් Book කරන්න Referral එකක් ඕනද?", a: "නෑ. ඔබට Appointment එකක් කෙලින්ම Book කර, කෙනෙක් සමඟ රහසිගතව කතා කරන්න පුළුවන්." },
      { q: "මගේ Appointment එක පුද්ගලිකද?", a: "ඔව්. Appointments සිදු වෙන්නේ පොදු Outpatient ප්‍රදේශයෙන් වෙනම, පුද්ගලික Consulting Rooms වල." },
      { q: "මට බෙහෙත් දෙයිද?", a: "අනිවාර්යයෙන් නෑ. බෙහෙත් කතාබහේ කොටසක් වෙන්නේ ඔබට අදාළ තැන විතරයි, මොකක් හරි වෙනස් වෙන්න කලින්ම හැමවිටම පැහැදිලිව විස්තර කරනවා." },
      { q: "කොපමණ නිතරද ආපහු එන්න ඕන?", a: "ඒක ඔබ සමඟ කෙලින්ම එකඟ වෙනවා: සමහරුන්ට තනි කතාබහක් ඕන, අනිත් අයට අඛණ්ඩ Appointments කැමතියි." },
    ],
  },
  {


    hours: "දිනපතා",

    desc: "ශල්‍යකර්මයෙන් පසු, අස්ථි හා ස්නායු පුනරුත්ථාපනය, ගෙනියන්න ලිඛිත Home Programme එකක් සහ Ward එකේ ලබාදෙන ශ්වසන Physiotherapy සමඟින්. ඔබේ සුවවීමට ඕන දේ අනුව Sessions විනාඩි 30 හෝ 45 පවත්වනවා.",
    tags: ["ශල්‍යකර්මයෙන් පසු පුනරුත්ථාපනය", "අස්ථි සහ ස්නායු චිකිත්සාව", "ලිඛිත Home Programme", "Ward ශ්වසන Physiotherapy"],
    facts: [
      { k: "පැය", v: "දිනපතා" },
      { k: "Session කාලය", v: "විනාඩි 30 හෝ 45" },
      { k: "ගෙනියන දේ", v: "ලිඛිත Home Programme" },
      { k: "Ward සත්කාරය", v: "ශ්වසන Physiotherapy" },
    ],
    lede: "ශල්‍යකර්මයෙන් පසු, අස්ථි හා ස්නායු පුනරුත්ථාපනය, ලිඛිත Home Programme එකක් සහ විනාඩි 30 හෝ 45 Sessions සමඟින්.",

    body1: "Physiotherapy Clinic එක ශල්‍යකර්මයෙන් පසු සුවවීම, අස්ථි තුවාල සහ ස්නායු තත්ත්ව සඳහා දිනපතා Sessions පවත්වනවා, ඔබේ Programme එකට ඕන දේ අනුව හැම Session එකක්ම විනාඩි 30 හෝ 45 පවතී. Physiotherapist කෙනෙක් හැම Visit එකකදීම ඔබ සමඟ ගමන, ශක්තිය සහ ක්‍රියාකාරිත්වය හරහා වැඩ කරනවා.",
    body2: "ඔබේ ප්‍රතිකාර මාලාව අවසන් වෙන්න කලින්, Sessions අතරත් Discharge එකෙන් පස්සෙත් ප්‍රගතිය දිගටම යන්න ලිඛිත Home Programme එකක් සමඟින් ඔබ යනවා. Ward එකේ රෝගීන් සඳහා, වෛද්‍ය ප්‍රතිකාරය සමඟින්ම හුස්ම ගැනීමට සහ සුවවීමට සහාය වෙන්න ඇඳ අසලින්ම ශ්වසන Physiotherapy සලසනවා.",
    strip: [
      { k: "පැය", v: "දිනපතා" },
      { k: "සැසි", v: "විනාඩි 30 හෝ 45" },
      { k: "ගෙදර Programme", v: "ලිඛිත" },
      { k: "Ward එක", v: "ශ්වසන Physiotherapy" },
    ],
    covers: [
      "ශල්‍යකර්මයෙන් පසු පුනරුත්ථාපනය",
      "අස්ථි පුනරුත්ථාපනය",
      "ස්නායු පුනරුත්ථාපනය",
      "ලිඛිත Home Exercise Programmes",
      "Ward ශ්වසන Physiotherapy",
    ],
    conditions: [
      "සන්ධි හෝ ඇටකැඩීම් ශල්‍යකර්මයෙන් පසු සුවවීම",
      "Stroke පුනරුත්ථාපනය",
      "උල්පත් හා බෙල්ල වේදනාව",
      "ක්‍රීඩා තුවාල සුවවීම",
      "අසනීපයකින් පසු අඩු වූ චලනය",
    ],
    location: "බිම් මහල, Physiotherapy අංශය",
    steps: [
      { desc: "Physiotherapy කෙලින්ම Book කරන්න, නැත්නම් ශල්‍ය හෝ වෛද්‍ය කණ්ඩායමකින් Referral එකකින් පටන් ගන්න." },
      { desc: "Physiotherapist කෙනෙක් ඔබේ ඉලක්ක සකසන්න ගමන, ශක්තිය සහ ක්‍රියාකාරිත්වය තක්සේරු කරනවා." },
      { desc: "විනාඩි 30 හෝ 45 Sessions ඔබේ පුනරුත්ථාපන Programme එක හරහා වැඩ කරනවා." },
      { desc: "ඔබේ ප්‍රගතිය දිගටම යන්න ලිඛිත Home Programme එකක් සමඟ ඔබ යනවා." },
    ],
    prep: [
      "ඔබට චලනය කරන්න පුළුවන් Loose, Comfortable ඇඳුමක් අඳින්න",
      "ඔබ දැනට යොදාගන්නා Brace, Splint හෝ ඇවිදින උදව්වක් ගෙන එන්න",
      "ඔබට දුන්නා නම් Referral Letter එකක් ගෙන එන්න",
      "ඔබේ Physiotherapist සමඟ මතු කරන්න ඕන වේදනාවක් හෝ සීමාවක් සටහන් කරන්න",
    ],
    team: [
      { role: "Physiotherapist ලා", note: "ශල්‍යකර්මයෙන් පසු, අස්ථි හා ස්නායු පුනරුත්ථාපන Sessions මෙහෙයවනවා." },
      { role: "ශ්වසන Physiotherapist ලා", note: "Ward රෝගීන් සඳහා ඇඳ අසලින්ම Physiotherapy ලබාදෙනවා." },
      { role: "පුනරුත්ථාපන සහායක", note: "අංශයේ රෝගීන් සඳහා Exercise Sessions සහ උපකරණ සඳහා සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Sessions Book කර අංශයට එන Referrals කළමනාකරණය කරනවා." },
    ],
    faq: [
      { q: "Session එකක් Book කරන්න Referral එකක් ඕනද?", a: "නෑ. ඔබට Physiotherapy කෙලින්ම Book කරන්න පුළුවන්, බොහෝ රෝගීන් ශල්‍ය හෝ වෛද්‍ය කණ්ඩායමකින් Referral එකකින්ත් පටන් ගන්නවා." },
      { q: "Session එකක් කොපමණ කාලයක් පවතීද?", a: "ඔබේ පුනරුත්ථාපන Programme එකට ඕන දේ අනුව Sessions විනාඩි 30 හෝ 45 පවතී." },
      { q: "ගෙදර කරන්න Exercises ලැබෙයිද?", a: "ඔව්. Sessions අතර දිගටම යන්න ලිඛිත Home Programme එකක් සමඟ ඔබ යනවා." },
      { q: "Ward රෝගීන් සඳහා Physiotherapy ලබාගත හැකිද?", a: "ඔව්. ඕන ඇතුළත් වූ රෝගීන් සඳහා ඇඳ අසලින්ම ශ්වසන Physiotherapy සලසනවා." },
    ],
  },
  {


    hours: "Appointment එකකින්",

    desc: "දරුවන් සහ වැඩිහිටියන් තුළ කථන, භාෂා සහ ගිලීමේ අපහසුතා සඳහා තක්සේරුව සහ චිකිත්සාව, Sessions අතර ප්‍රගතිය දිගටම යන්න හැම Visit එකකදීම Home Practice Plan එකකට එකඟ වෙමින්.",
    tags: ["කථන සහ භාෂා තක්සේරුව", "ගිලීමේ අපහසුතා", "දරුවන් සහ වැඩිහිටියන්", "ගෙදර Practice Plan"],
    facts: [
      { k: "වෙන් කිරීම", v: "Appointment එකකින්" },
      { k: "වයස් පරාසය", v: "දරුවන් සහ වැඩිහිටියන්" },
      { k: "ආවරණය කරයි", v: "කථනය, භාෂාව සහ ගිලීම" },
      { k: "ගෙනියන දේ", v: "ගෙදර Practice Plan" },
    ],
    lede: "දරුවන් සහ වැඩිහිටියන් සඳහා කථන, භාෂා සහ ගිලීමේ තක්සේරුව, හැම Visit එකකදීම Home Practice Plan එකකට එකඟ වෙමින්.",

    body1: "කථන හා භාෂා චිකිත්සා සේවාව කථන පැහැදිලිකම, භාෂා සංවර්ධනය, සන්නිවේදනය සහ ගිලීමේ අපහසුතා තක්සේරු කරනවා, දරුවන් සහ වැඩිහිටියන් දෙපිරිසම බලමින්. චිකිත්සා ඉලක්ක ඔබ හෝ ඔබේ දරුවාගේ මුහුකුරු සමඟ එකඟ වෙන්න කලින් පලමු Session එක විස්තරාත්මක තක්සේරුවක් ආවරණය කරනවා.",
    body2: "හැම Session එකක්ම අවසන් වෙන්නේ Home Practice Plan එකකින්, Clinic එකේදී කරන වැඩ එතනම තියෙනවා වෙනුවට Visits අතරත් Reinforce වෙන්නට. ප්‍රගතිය හැටියට Plans Review කර සකසනවා.",
    strip: [
      { k: "වෙන් කිරීම", v: "Appointment එකකින්" },
      { k: "වයස්", v: "දරුවන් සහ වැඩිහිටියන්" },
      { k: "ආවරණය කරයි", v: "කථනය, භාෂාව, ගිලීම" },
      { k: "ගෙදර Plan", v: "හැම Session එකකම" },
    ],
    covers: [
      "කථන තක්සේරුව",
      "භාෂා තක්සේරුව",
      "ගිලීමේ අපහසුතා තක්සේරුව",
      "තනි චිකිත්සා Sessions",
      "ගෙදර Practice Planning",
    ],
    conditions: [
      "දරුවන්ගේ පසුබෑ වූ කථන හෝ භාෂා සංවර්ධනය",
      "තැති ගැනීම (Stammering)",
      "අසනීපයකින් හෝ Stroke එකකින් පසු ගිලීමේ අපහසුතාව",
      "හඬේ අපහසුතා",
      "ස්නායු තත්ත්වයකින් පසු සන්නිවේදන අපහසුතාව",
    ],
    location: "පළමු මහල, කථන සහ භාෂා චිකිත්සාව",
    steps: [
      { desc: "කථන, භාෂා හෝ ගිලීමේ ගැටළුවක් සහිත දරුවෙකු හෝ වැඩිහිටියෙකු සඳහා Session එකක් Book කරන්න." },
      { desc: "කථන හා භාෂා චිකිත්සකවරයෙක් අපහසුතාවේ විස්තරාත්මක තක්සේරුවක් සිදු කරනවා." },
      { desc: "චිකිත්සා ඉලක්ක ඔබ සමඟ, එහෙමත් නැත්තම් ඔබේ දරුවාගේ මුහුකුරු සමඟ එකඟ වෙනවා." },
      { desc: "Visits අතර ප්‍රගතියට සහාය වෙන්න හැම Session එකකදීම Home Practice Plan එකක් දෙනවා." },
    ],
    prep: [
      "ඔබට තියෙනවා නම් කලින් තිබ්බ තක්සේරු Reports ගෙන එන්න",
      "දරුවෙකු නම්, පහසුවෙන් හිඳගන්න උදව් වෙන්න කැමති Toy එකක් හෝ පොතක් ගෙන එන්න",
      "අපහසුතාව වඩාත් පෙනෙන විශේෂිත අවස්ථා සටහන් කරන්න",
      "ගිලීම ගැටළුව නම් වර්තමාන බෙහෙත් ලැයිස්තුවක් ගෙන එන්න",
    ],
    team: [
      { role: "කථන හා භාෂා චිකිත්සකවරු", note: "හැම වයසකම කථන, භාෂා සහ ගිලීමේ අපහසුතා තක්සේරු කර ප්‍රතිකාර කරනවා." },
      { role: "ළමා සහායක කාර්ය මණ්ඩලය", note: "තක්සේරුවට සහ චිකිත්සා Sessions වලට කුඩා දරුවන්ට හිඳගන්න උදව් කරනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Sessions Book කර අඛණ්ඩ චිකිත්සා Scheduling කළමනාකරණය කරනවා." },
    ],
    faq: [
      { q: "මේ සේවාව දරුවන්ට විතරද?", a: "නෑ. දරුවන් සහ වැඩිහිටියන් දෙපිරිසටම තක්සේරුව සහ චිකිත්සාව ලබාදෙනවා." },
      { q: "Session එකක් Book කරන්න Referral එකක් ඕනද?", a: "නෑ. කථන, භාෂා හෝ ගිලීමේ ගැටළුවක් සඳහා ඔබට Session එකක් කෙලින්ම Book කරන්න පුළුවන්." },
      { q: "Sessions අතර කරන්න වැඩ ලැබෙයිද?", a: "ඔව්. Visits අතර ප්‍රගතියට සහාය වෙන්න හැම Session එකක්ම Home Practice Plan එකකින් අවසන් වෙනවා." },
      { q: "Stroke එකකින් පසු ගිලීමේ ප්‍රශ්නවලට මේ සේවාවෙන් උදව් වෙයිද?", a: "ඔව්. Stroke එකකින් හෝ අනිත් අසනීපයකින් පසු ගිලීමේ අපහසුතාව සේවාව තක්සේරු කර ප්‍රතිකාර කරන ක්ෂේත්‍රවලින් එකක්." },
    ],
  },
  {


    hours: "අඛණ්ඩව",

    desc: "Standard, Deluxe සහ Super Deluxe පුද්ගලික කාමර ඇතුළුව සාමාන්‍ය වාට්ටු, හැම එකක්ම පැය දෙකකට වතාවක් Sanitise කරනවා, නවාතැන් ගන්න Attendant කෙනෙකුට ඉඩක් සමඟ සහ ඔබේ ආහාර අවශ්‍යතාවලට සකසන ආහාර සමඟින්. කාමර රුපියල් 10,000 සිට එක් රාත්‍රියකට ලබාගත හැක.",
    tags: ["Standard, Deluxe සහ Super Deluxe කාමර", "පැය දෙකකට Sanitise කරයි", "Attendant ඉඩ", "ආහාර අවශ්‍යතාවලට ආහාර"],
    facts: [
      { k: "කාමර වර්ග", v: "Standard, Deluxe, Super Deluxe සහ වාට්ටු" },
      { k: "සිට", v: "රුපියල් 10,000 එක් රාත්‍රියකට" },
      { k: "පිරිසිදුකරණය", v: "පැය දෙකකට වතාවක්" },
      { k: "Attendant කෙනා", v: "ඉඩ ලබාදෙයි" },
    ],
    lede: "Standard, Deluxe සහ Super Deluxe කාමර ඇතුළුව වාට්ටු, පැය දෙකකට වතාවක් Sanitise කරයි, Attendant ඉඩ සහ ඔබේ ආහාර අවශ්‍යතාවලට ආහාර සමඟින්.",

    body1: "Standard, Deluxe සහ Super Deluxe පුද්ගලික කාමර, සහ සාමාන්‍ය වාට්ටු ඇතුළු කාමර වර්ග ගණනාවක් හරහා ඇතුළත් වීම ලබාදෙනවා, ඔබේ සුවවීමට සහ Budget එකට ගැලපෙන දේ තෝරාගන්න පුළුවන් වෙන්නට. ඔබේ නවාතැන් කාලය පුරාවටම හැම කාමරයක්ම හා වාට්ටුවක්ම පැය දෙකකට වතාවක් Sanitise කරනවා, කාමරවලට Attendant කෙනෙකුට ඔබ සමඟ රැඳී සිටින්න ඉඩක් ලැබෙනවා.",
    body2: "ආහාර ඔබේ ආහාර අවශ්‍යතාවලට සකසනවා, ඒක දියවැඩියා ආහාරයක් වුනත්, ශල්‍යකර්මයෙන් පසු ආහාරයක් වුනත් හෝ ඇතුළත් වීමේදී සටහන් කරන අනිත් අවශ්‍යතාවක් වුනත්. කාමර රුපියල් 10,000 සිට එක් රාත්‍රියකට ලබාගත හැක, නිශ්චිත ගාස්තුව ඔබ තෝරාගන්නා කාමර වර්ගය අනුව වෙනස් වේ.",
    strip: [
      { k: "සිට", v: "රුපියල් 10,000 / රාත්‍රිය" },
      { k: "පිරිසිදුකරණය", v: "පැය දෙකකට වතාවක්" },
      { k: "Attendant ඉඩ", v: "ඇතුළත්" },
      { k: "ආහාර", v: "ආහාර අවශ්‍යතාවලට" },
    ],
    covers: [
      "Standard කාමර ඇතුළත් වීම",
      "Deluxe කාමර ඇතුළත් වීම",
      "Super Deluxe කාමර ඇතුළත් වීම",
      "සාමාන්‍ය වාට්ටු ඇතුළත් වීම",
      "ආහාර අවශ්‍යතාවලට සකසන ආහාර",
    ],
    conditions: [
      "සැලසුම් කළ ශල්‍ය ඇතුළත් වීම",
      "රාත්‍රියක් නවාතැන් ඕන වෛද්‍ය ඇතුළත් වීම",
      "ශල්‍යකර්මයෙන් පසු සුවවීමේ නවාතැන්",
      "Attendant කෙනෙක් ඕන දිගු නවාතැන්",
    ],
    location: "ඇතුළත් රෝගී ගොඩනැගිල්ල පුරාම",
    steps: [
      { desc: "සැලසුම් කළ ඇතුළත් වීමකට කලින් කාමරයක් වෙන්කර ගන්න, එහෙමත් නැත්තම් හදිසි නවාතැනකට පැමිණි විට එකක් හදාරයි." },
      { desc: "ඔබේ අවශ්‍යතා අනුව Standard, Deluxe, Super Deluxe හෝ වාට්ටු නවාතැන් අතරින් තෝරාගන්න." },
      { desc: "ඔබට කාමරය, Attendant ඉඩ පෙන්වා, ඔබේ ආහාරවල ආහාර අවශ්‍යතා ගැන අහනවා." },
      { desc: "ඔබේ ඇතුළත් වීම පුරාවටම ඔබේ කාමරය පැය දෙකකට වතාවක් Sanitise කරනවා, ආහාර ඔබේ ආහාර අවශ්‍යතාවලට ලබාදෙනවා." },
    ],
    prep: [
      "ඔබේ නවාතැන් සඳහා පුද්ගලික Toiletries සහ Comfortable ඇඳුම් ගෙන එන්න",
      "ඇතුළත් වීමේදී ආහාර අවශ්‍යතාවක් තිබෙනවා නම් Ward එකට කියන්න",
      "ඔබ සමඟ රැඳී සිටින්න Attendant කෙනෙක් ඕන නම් සලසාගන්න",
      "ඔබේ වර්තමාන බෙහෙත් ලැයිස්තුවක් ගෙන එන්න",
    ],
    team: [
      { role: "Ward Nursing කණ්ඩායම", note: "ඔබේ නවාතැන් පුරාවටම අඛණ්ඩ සත්කාරය ලබාදී කාමර අවශ්‍යතා සම්බන්ධීකරණය කරනවා." },
      { role: "පිරිසිදුකරණ කණ්ඩායම", note: "පැය දෙකකට වතාවක් කාමර සහ වාට්ටු Sanitise කරනවා." },
      { role: "ආහාර සැපයුම් කණ්ඩායම", note: "පුද්ගලික ආහාර අවශ්‍යතාවලට ආහාර සකසනවා." },
      { role: "Admissions Coordinator කෙනා", note: "කාමර වෙන්කිරීම් සහ Attendant ඉඩ සලසනවා." },
    ],
    faq: [
      { q: "මොනවද තියෙන කාමර වර්ග?", a: "Standard, Deluxe සහ Super Deluxe පුද්ගලික කාමර, ඒ වගේම සාමාන්‍ය වාට්ටුත්, ඔබ කැමති දේට අනුව ලබාගත හැක." },
      { q: "කාමරයක් කීයද?", a: "කාමර රුපියල් 10,000 සිට එක් රාත්‍රියකට ලබාගත හැක, ගාස්තුව ඔබ තෝරාගන්නා කාමර වර්ගය අනුව වෙනස් වේ." },
      { q: "කවුරු හරි මා සමඟ රැඳී සිටින්න පුළුවන්ද?", a: "ඔව්. ඔබේ නවාතැන් කාලය පුරාවටම ඔබ සමඟ රැඳී සිටින්න Attendant කෙනෙකුට ඉඩක් කාමරවලට ඇතුළත්." },
      { q: "කාමර කොපමණ නිතරද පිරිසිදු කරන්නේ?", a: "ඔබේ ඇතුළත් වීම පුරාවටම හැම කාමරයක්ම හා වාට්ටුවක්ම පැය දෙකකට වතාවක් Sanitise කරනවා." },
    ],
  },
];
