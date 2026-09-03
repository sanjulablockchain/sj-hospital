// Sinhala overlay for emergency.ts (2 of the catalog's 36 services).
//
// Register matches the rest of the site: "Ambulance", "X-ray", "Theatre",
// "On-call", "Triage" and "Appointment" stay English inline (the same
// register facilities.si.ts and international-care/content.si.ts already
// use for "Ambulance" and "X-ray"; "Theatre"/"On-call"/"Triage" are the
// hospital's own operational vocabulary a Sri Lankan reader sees in English
// on a ward sign). "Consultant" as an ordinary noun ("consultants",
// "on-call consultants") translates to විශේෂඥ වෛද්‍යවරු, matching
// navigationLabels.si.ts's own "Find a consultant" → "විශේෂඥ වෛද්‍යවරයෙක්
// සොයන්න"; it only stays English as a nameplate title directly before a
// named role ("Consultant Surgeon"), which does not occur in this file.
// `facts[0].v` ("0117 84 84 84", accident-emergency's ambulance number) is
// excluded in content.i18n.test.ts as a fact, not copy.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const emergencyServices = [
  {
    title: "අනතුරු සහ හදිසි ප්‍රතිකාර",
    directoryTitle: "අනතුරු සහ හදිසි ප්‍රතිකාර ඒකකය",
    hours: "පැය 24ම, කෙලින්ම එන්න",
    cta: "කෙලින්ම එන්න",
    desc: "වහලක් සහිත Ambulance පිවිසුමක් පිටුපස පැය 24ම සේවකයින් සිටින Resuscitation Bay එකක්, papers වලට කලින් Triage පටන් ගන්නවා. On-call ශල්‍ය සහ Anaesthetic කණ්ඩායම් නිසා ශල්‍යාගාර ස්ථානයේම සූදානම්ව තියෙනවා.",
    tags: ["Resuscitation Bay එක", "තුවාල ප්‍රතිකාර", "Ambulance යැවීම", "On-call ශල්‍යාගාරය"],
    facts: [
      { k: "Ambulance" },
      { k: "වෛද්‍යවරයා ස්ථානයේ", v: "හැමවෙලේම" },
      { k: "On-call ශල්‍යාගාරය", v: "පැය 24ම" },
      { k: "රසායනාගාරයයි X-rayයි", v: "ඒම මහලේම" },
    ],
    lede: "වහලක් සහිත Ambulance පිවිසුමක් පිටුපස හැම වේලාවකම සේවකයින් සිටින Resuscitation Bay එකක්. Appointment එකක් නෑ, Queue එකක් නෑ, නිවසින් වෛද්‍යවරයෙක් කැඳවනකන් රැඳී සිටීමකුත් නෑ.",
    aboutHead: "හැම දිනකම හැම වේලාවකම විවෘතයි",
    body1: "Papers ආරම්භ කරන්න කලින්ම දොරටුවේදීම වෛද්‍යවරයෙක් ඔබව බලනවා. On-call ශල්‍ය සහ Anaesthetic කණ්ඩායම් ශල්‍යාගාර ස්ථානයේම සූදානම්ව තියෙනවා, එහෙනම් හදිසි ශල්‍යකර්ම Transfer එකකින් පස්සේ නෙවෙයි මෙතනදීම සිදු වෙනවා.",
    body2: "අපගේම Ambulances එම Bay එකෙන්ම Dispatch කරනවා, රසායනාගාරයයි Digital X-rayයි මීටර ගණනකින්, එහෙනම් ඔබව තවම Assess කරන අතරේම Bloods සහ Films ආපහු එනවා.",
    strip: [
      { k: "වේලාවන්", v: "24 / 7" },
      { k: "Appointment එකක්", v: "අවශ්‍ය නෑ" },
      { k: "Triage", v: "දොරටුවේදීම" },
      { k: "Ambulance", v: "අපේම රථ පිරිසක්" },
    ],
    covers: [
      "පපුවේ වේදනාවයි හුස්ම ගැනීමේ අපහසුතාවයයි",
      "තුවාල, ඇටකැඩීම් සහ තුවාල",
      "දරුණු බඩේ වේදනාව",
      "ළමුන්ගේ උණයි Dehydration එකයි",
      "විෂවීම් සහ Allergic Reactions",
      "Transfer එකකට කලින් තත්ත්වය Stabilise කිරීම",
    ],
    conditions: [
      "රථවාහන අනතුරු තුවාල",
      "හෘද පපුවේ වේදනාව",
      "Asthma Attack එකක්",
      "ඩෙංගු උණ",
      "හිසේ තුවාල",
      "පිළිස්සීම්",
      "සර්ප දෂ්ට කිරීම්",
      "අපස්මාරය",
    ],
    location: "බිම් මහල, Ambulance පිවිසුම",
    steps: [
      {
        title: "පැමිණීම",
        desc: "කෙලින්ම එන්න, නැත්නම් Ambulance එකෙන් එන්න. Registration එක රැඳී සිටිය හැක; Assessment එක රැඳී සිටින්නේ නෑ.",
      },
      {
        title: "Triage",
        desc: "පැමිණි විගසම Nurse කෙනෙක් සහ වෛද්‍යවරයෙක් තදබරකම Assess කරනවා, Registration එක අවසන් වෙනකලුත් ප්‍රතිකාර ආරම්භ වෙනවා.",
      },
      {
        title: "පරීක්ෂණ",
        desc: "Bloods, ECG සහ Imaging ස්ථානයේදීම Order කරලා ඔබ තවම මෙතන ඉන්නකොටම Report කරනවා.",
      },
      {
        title: "Admit කිරීම හෝ Discharge කිරීම",
        desc: "කාමරයක්, ශල්‍යාගාර වේලාවක් හෝ ලිඛිත උපදෙස් සහ Follow-up දිනයක් සහිත Discharge සැලැස්මක්.",
      },
    ],
    prep: [
      "පුළුවන්නම් Register කරන්න කෙනෙක් කලින් එවන්න",
      "ඔබේ දැනට ගන්නා බෙහෙත් ලැයිස්තුව හෝ බෙහෙත් පෙට්ටි ගෙනෙන්න",
      "ඔබේ රෝග ලක්ෂණ පටන් ගත් වේලාව සටහන් කරගන්න",
      "Ambulance එක අවශ්‍යනම් 0117 84 84 84 ට Call කරන්න",
    ],
    team: [
      { role: "හදිසි ප්‍රතිකාර වෛද්‍ය නිලධාරීන්", note: "හැම වේලාවකම ස්ථානයේ ඉන්නවා, ඉහළ මට්ටමේ සහාය ක්ෂණිකව ලබාගත හැක." },
      { role: "හදිසි ප්‍රතිකාර Nursing කණ්ඩායම", note: "Triage පුහුණුව ලැබූ, එක Nurse කෙනෙක් එක Resuscitation Bay එකකට Assign කරලා." },
      { role: "On-call විශේෂඥ වෛද්‍යවරු", note: "ශල්‍යකර්ම, Anaesthesia, ප්‍රසූතිය සහ ළමා රෝග සඳහා හැම වේලාවකම On-call." },
      { role: "Ambulance කණ්ඩායම", note: "අපගේම Bay එකෙන් Dispatch වෙනවා, Oxygen සහ Monitoring එකත් සමඟ." },
    ],
    faq: [
      {
        q: "මට Appointment එකක් හෝ Referral එකක් අවශ්‍යද?",
        a: "නෑ. Emergency ප්‍රතිකාර ඕනෑම වේලාවක කෙලින්ම එන්න පුළුවන්. එය Emergency එකක්ද කියලා විශ්වාස නැත්නම්, 0117 84 84 84 ට Call කරන්න, Nurse කෙනෙක් උපදෙස් දෙයි.",
      },
      {
        q: "මට ගෙවන්න කලින් බලනවාද?",
        a: "ඔව්. Assessment එකයි Stabilisation එකයි කලින් සිදු වෙනවා. Billing එක පස්සේ Settle කරනවා, Insurance Papers එකත් Desk එකෙන් Prepare කරයි.",
      },
      {
        q: "මගේ පවුලේ කෙනෙකුට මා ළඟ ඉන්න පුළුවන්ද?",
        a: "බොහෝවිට එක Family Member කෙනෙකුට ඉන්න පුළුවන්. Resuscitation කරන අතරේ ළඟින් රැඳී සිටින්න කියලා අහන්න පුළුවන්, Nurse කෙනෙක් ඔවුන්ට Update කරයි.",
      },
      {
        q: "මට ක්ෂණිකව ශල්‍යකර්මයක් අවශ්‍ය වුනොත්?",
        a: "On-call ශල්‍ය සහ Anaesthetic කණ්ඩායම් සහ ශල්‍යාගාර ස්ථානයේම සූදානම්ව තියෙනවා, එහෙනම් Emergency ශල්‍යකර්ම සඳහා ඔබව වෙන Transfer කරන්නේ නෑ.",
      },
    ],
  },
  {
    title: "දැඩි සත්කාර",
    directoryTitle: "දැඩි සත්කාර ඒකකය",
    hours: "අඛණ්ඩව",
    cta: "ICU Desk එකට කතා කරන්න",
    desc: "අඛණ්ඩ Observation, Ventilator සහාය හෝ ප්‍රධාන ශල්‍යකර්මයකින් හෝ දරුණු අසනීපයකින් පසු සමීප Nursing අවශ්‍ය රෝගීන් සඳහා Monitor කරන ඒකකයක්. Nurse කෙනෙක් බලන්නේ Beds කුඩා පිරිසක් විතරයි, විශේෂඥ වෛද්‍යවරයෙක් හැම දිනකම Rounds ඉස්සරහ ඉන්නවා.",
    tags: ["Ventilator සහාය", "අඛණ්ඩ Monitoring", "විශේෂඥ Rounds", "පවුලට Update"],
    facts: [
      { k: "Nursing Ratio එක", v: "Beds කුඩා, ස්ථිර පිරිසක්" },
      { k: "විශේෂඥ Rounds", v: "දිනපතා" },
      { k: "බැලීමට එන්න", v: "නියම වේලාවන්" },
      { k: "පවුලට Update", v: "දිනකට වරක් Phone එකෙන් හෝ මුහුණින්" },
    ],
    lede: "රෝහලේ වඩාත්ම අසනීප රෝගීන් සඳහා Monitor කරන ඒකකයක්, Nurse කෙනෙක් බලන්නේ Beds කුඩා පිරිසක් විතරයි, විශේෂඥ වෛද්‍යවරයෙක් හැම Case එකක්ම දිනපතා Review කරනවා.",
    aboutHead: "අඛණ්ඩ Monitoring, ළඟින්ම",
    body1: "Heart Rhythm, Oxygen මට්ටම් සහ රුධිර පීඩනය අඛණ්ඩව Monitor කරන්න Beds Wire කරලා තියෙනවා, හුස්ම ගැනීමට හෝ බෙහෙත් සහාය අවශ්‍ය රෝගීන් සඳහා Ventilators සහ Infusion Pumps ළඟින්ම තියෙනවා. විශේෂඥ වෛද්‍යවරයෙක් දිනපතා Rounds ඉස්සරහ ඉන්නවා, රෝගියාගේ තත්ත්වය වෙනස් වන විදිහට සැලැස්ම වෙනස් කරනවා.",
    body2: "ඒකකය ශල්‍යාගාර සහ Emergency Department ළඟින්ම ඉන්න නිසා, Ward එකේ හෝ ශල්‍යකර්මයකින් පස්සේ තත්ත්වය Worse වෙන රෝගියෙක් වෙන රෝහලකට Transfer කරනවා වෙනුවට කෙලින්ම ඒකකයට ගෙනෙන්න පුළුවන්. පැමිණීම නියම වේලාවන්ට සීමා කරලා තියෙනවා රෝගීන්ට Rest ගන්න, Family Member කෙනෙකුට දිනකට වරක් Update Call එකක් එනවා.",
    strip: [
      { k: "අධීක්ෂණය", v: "අඛණ්ඩව" },
      { k: "හෙදකම", v: "Beds කුඩා පිරිස්" },
      { k: "රවුම්", v: "දිනපතා" },
      { k: "බැලීමට එන්න", v: "නියම වේලාවන්" },
    ],
    covers: [
      "ප්‍රධාන ශල්‍යකර්මයකින් පස්සේ Ventilator සහාය",
      "දරුණු Infection එකකින් පස්සේ සමීප Monitoring",
      "හෘද හෝ ශ්වසන Crisis එකකින් සුවවීම",
      "අවදානම් සහිත ශල්‍යකර්මයකින් පස්සේ ප්‍රතිකාර",
      "Ward එකෙන් Transfer වෙන රෝගීන්ගේ තත්ත්වය Stabilise කිරීම",
    ],
    conditions: [
      "ශ්වසන අකර්මණ්‍යතාව",
      "දරුණු Sepsis",
      "ශල්‍යකර්මයෙන් පසු අස්ථාවරත්වය",
      "අනතුරකින් පසු බහු අවයව Monitoring",
      "අනතුරු සලකුණු සහිත දරුණු ඩෙංගු",
      "Observation අවශ්‍ය බෙහෙත් වැඩිවීමක්",
    ],
    location: "දෙවන මහල, දැඩි සත්කාර ඒකකය",
    steps: [
      {
        title: "ඇතුළත් කිරීම",
        desc: "Bed එකයි Monitor එකයි සූදානම් වුනාට පස්සේ රෝගියෙක් ශල්‍යාගාරයෙන්, Ward එකෙන් හෝ Emergency Department එකෙන් මෙතනට ගෙනෙනවා.",
      },
      {
        title: "Stabilise කිරීම",
        desc: "Lines, Monitoring සහ, අවශ්‍යනම්, Ventilator එකක් Setup කරනවා, විශේෂඥ වෛද්‍යවරයා සමඟ මූලික සැලැස්මක් එකඟ වෙනවා.",
      },
      {
        title: "දිනපතා Review",
        desc: "විශේෂඥ වෛද්‍යවරයා දිනපතා Rounds ඉස්සරහ ඉන්නවා, Nursing Observations Review අතරේම අඛණ්ඩව සටහන් කරනවා.",
      },
      {
        title: "පහළට මාරු කිරීම",
        desc: "Stable වූ පසු, ලිඛිත Handover එකක් සමඟ රෝගියා ආපහු Ward Bed එකකට ගෙනියනවා.",
      },
    ],
    prep: [
      "රෝගියාගේ නිතිපතා ගන්නා බෙහෙත් ලැයිස්තුවක් ගෙනෙන්න",
      "දිනපතා Update සඳහා එක Family Contact කෙනෙක් නම් කරන්න",
      "එන්න කලින් ICU Desk එකෙන් බැලීමට එන වේලාවන් බලාගන්න",
      "Update Call එකට Phone එකක් ළඟින් තියාගන්න",
    ],
    team: [
      { role: "දැඩි සත්කාර විශේෂඥ වෛද්‍යවරු", note: "දිනපතා Round එකක් ඉස්සරහ ඉඳලා හැම Bed එකකටම ප්‍රතිකාර සැලැස්ම දෙනවා." },
      { role: "දැඩි සත්කාර Nursing කණ්ඩායම", note: "අඛණ්ඩ Observation සඳහා Beds කුඩා, ස්ථිර පිරිසකට Assign වෙලා." },
      { role: "ශ්වසන Therapists", note: "Nursing කාර්ය මණ්ඩලය සමඟ Ventilator Settings සහ Airway Care කළමනාකරණය කරනවා." },
      { role: "ඒකක Coordinator", note: "පවුලේ Updates, බැලීමට එන සැලසුම් සහ Ward එකට Transfer කරන කටයුතු බලනවා." },
    ],
    faq: [
      {
        q: "මට ඕනෑම වේලාවක බැලීමට එන්න පුළුවන්ද?",
        a: "බැලීමට එන වේලාවන් නියම වේලාවන්ට සීමා කරලා තියෙන්නේ රෝගීන්ට Rest ගන්නත් කාර්ය මණ්ඩලයට වැඩේ කරගන්නත්. දැනට තියෙන වේලාවන් ICU Desk එකෙන් දැනගන්න පුළුවන්.",
      },
      {
        q: "මගේ ඥාතියාගේ තත්ත්වය කොහොමද කියලා මං දැනගන්නේ කොහොමද?",
        a: "Family Contact කෙනෙකුට දිනකට වරක් Update Call එකක් එනවා, ඉල්ලුවොත් විශේෂඥ වෛද්‍යවරයා සමඟ මුහුණින්ම කතා කරන්නත් Desk එකෙන් සලසන්න පුළුවන්.",
      },
      {
        q: "හැම රෝගියෙක්ටම Ventilator එකක් අවශ්‍යයද?",
        a: "නෑ. බොහෝ රෝගීන්ට ශල්‍යකර්මයකින් හෝ දරුණු අසනීපයකින් පස්සේ හුස්ම ගැනීමේ සහායක් නැතුවම සමීප Monitoring එකක් විතරක් සඳහා Admit කරනවා.",
      },
      {
        q: "මගේ ඥාතියා ඒකකයෙන් යන්න සූදානම් වුනාම මොකද වෙන්නේ?",
        a: "සම්පූර්ණ ලිඛිත Handover එකක් සමඟ ආපහු Ward Bed එකකට ගෙනියනවා, ICU විශේෂඥ වෛද්‍යවරයා දාපු සැලැස්ම Ward කණ්ඩායම දිගටම කරගෙන යනවා.",
      },
    ],
  },
];
