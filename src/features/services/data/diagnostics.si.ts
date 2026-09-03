// Sinhala overlay for diagnostics.ts (4 of the catalog's 36 services:
// laboratory, radiology, cardiac-screening, fetal-monitoring).
//
// Equipment and modality names stay English throughout: "X-ray", "CT", "MRI",
// "ECG", "Ultrasound", "Echocardiography", "Haematology", "Biochemistry",
// "Microbiology", "Histopathology", "Cardiotocography"/"CTG", "Antenatal"
// and "Clinic". This is not a sweep: it is the site's own established
// register for exactly these words (facilities.si.ts's own `equipment[*]`
// keeps this same set of names English uniformly with the same reasoning;
// indexContent.si.ts's own `diagnosticRows` translates the connector around
// several of the same names while keeping the names themselves English;
// "Antenatal" and "Clinic" are each independently established elsewhere:
// "Antenatal" in indexContent.si.ts's own diagnosticRows[4].note, "Clinic"
// in groups.si.ts's own groupLabels.Clinics and used as an ordinary noun
// throughout facilities.si.ts, international-care and school-wellness).
// Applying the sibling test to each array specifically: every equipment/
// modality name gets this same treatment, so there is no odd one out
// translated beside siblings that are not, and every other word around
// them (readings, waiting times, department names, roles, ordinary prose)
// translates in full. "Radiology" itself is NOT in this class: it has its
// own established full translation, "විකිරණවේදය", reused verbatim from
// indexContent.si.ts's own diagnosticRows[5].name.
//
// A tag or covers entry that is otherwise just a bare equipment name always
// carries a small Sinhala suffix ("සේවාව", "එක", "-කිරීම") so it is never
// byte-identical to its English source, the same shape emergency.si.ts's
// own tags already use ("Resuscitation Bay එක", "Ambulance යැවීම").
//
// "Doctor"/"Physician" translate in full (වෛද්‍යවරයා), matching
// emergency.si.ts. "Nurse", "Coordinator", "Technologist", "Technician",
// "Radiographer", "Sonographer", "Radiologist" and "Reception" stay
// English as role/department nouns, matching emergency.si.ts's "Nurse"
// and "Coordinator" and facilities.si.ts's "Radiologist කෙනෙක්". Any
// number (turnaround times, discount percentages, hours) is unchanged.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const diagnosticServices = [
  {
    title: "රසායනාගාර සේවා",
    directoryTitle: "රසායනාගාර සේවා",
    hours: "පැය 24",
    cta: "පරීක්ෂණයක් Book කරන්න",
    desc: "Haematology, Biochemistry, Microbiology සහ Histopathology පරීක්ෂණ, පැය 24ම විවෘතයි. නිකුත් කිරීමට කලින් හැම Report එකක්ම වෛද්‍යවරු දෙදෙනෙක් Check කරනවා, බොහෝ ප්‍රතිඵල එදිනම ලැබෙනවා, OPD රෝගීන්ට රසායනාගාර ගාස්තුවලින් 10% වට්ටමක් ලැබෙනවා.",
    tags: ["Haematology සේවාව", "Biochemistry සේවාව", "Microbiology සේවාව", "එදිනම Reports"],
    facts: [
      { k: "වේලාවන්", v: "පැය 24" },
      { k: "Report Check එක", v: "හැම Report එකක්ම, වෛද්‍යවරු දෙදෙනෙක්" },
      { k: "ලැබෙන කාලය", v: "බොහෝ පරීක්ෂණ එදිනම" },
      { k: "OPD වට්ටම", v: "රසායනාගාර ගාස්තුවලින් 10%" },
    ],
    lede: "රුධිර, මූත්‍ර සහ පටක පරීක්ෂණ හැම වේලාවකම විවෘතයි, ඔබ වෙතට එන්න කලින් හැම ප්‍රතිඵලයක්ම දෙපාරක් Check කරනවා.",
    aboutHead: "දිවා රෑ දෙකේම ධාවනය වන පරීක්ෂණ",
    body1: "රසායනාගාරය Haematology, Biochemistry, Microbiology සහ Histopathology ආවරණය කරන අතර පැය 24ම විවෘතව තියෙන නිසා ඕන වේලාවක ගත් Sample එකක් ඊළඟ Shift එකට රැඳී නොසිට Process කරනවා. බොහෝ ප්‍රතිඵල එදිනම ලැබෙනවා, Ward සහ Emergency Department වලින් එන හදිසි Requests ප්‍රමුඛතාවය ලබාදෙනවා.",
    body2: "නිකුත් කිරීමට කලින් හැම Report එකක්ම වෛද්‍යවරු දෙදෙනෙක් Verify කරනවා, Technologist කෙනාගේ වැඩට උඩින් දෙවෙනි Check එකක් එකතු කරලා. OPD හරහා Book කරන Outpatients ලාට රසායනාගාර ගාස්තුවලින් 10% වට්ටමක් ලැබෙනවා, ප්‍රතිඵල මුහුණින්ම ලබාගන්නත් නැත්නම් ඔබව Refer කරපු වෛද්‍යවරයාට යවන්නත් පුළුවන්.",
    strip: [
      { k: "වේලාවන්", v: "පැය 24" },
      { k: "Verify කිරීම", v: "වෛද්‍යවරු දෙදෙනෙක්" },
      { k: "වාර්තා", v: "එදිනම" },
      { k: "OPD වට්ටම", v: "10%" },
    ],
    covers: [
      "සම්පූර්ණ රුධිර ගණනය සහ Haematology පරීක්ෂණ",
      "Biochemistry සහ Metabolic Panels",
      "Microbiology සහ Culture පරීක්ෂණ",
      "Histopathology සහ පටක විශ්ලේෂණය",
      "Ward සහ Emergency Department වලින් එන හදිසි Samples",
    ],
    conditions: [
      "Routine සෞඛ්‍ය පරීක්ෂණ",
      "සැකසහිත Infection එකක්",
      "දියවැඩියාව සහ Cholesterol Monitoring",
      "රක්තහීනතා පරීක්ෂණය",
      "ශල්‍යකර්මයට පෙර රුධිර පරීක්ෂණ",
      "පටක Biopsy විශ්ලේෂණය",
    ],
    location: "බිම් මහල, රසායනාගාර Reception",
    steps: [
      { title: "Book කිරීම", desc: "OPD හරහා පරීක්ෂණයක් ඉල්ලන්න, නැත්නම් ඔබේ වෛද්‍යවරයාගෙන් Referral Form එකක් අරගෙන එන්න." },
      { title: "Sample ලබාගැනීම", desc: "Phlebotomist කෙනෙක් ඔබේ Sample එක ලබාගන්නවා, අවශ්‍ය නම් කලින්ම Fasting උපදෙස් දෙනවා." },
      { title: "Process කිරීම", desc: "ඔබේ Sample එක පරීක්ෂා කරලා, නිකුත් කිරීමට කලින් Report එක වෛද්‍යවරු දෙදෙනෙක් Check කරනවා." },
      { title: "ලබාගැනීම", desc: "බොහෝ Reports එදිනම ලැබෙනවා, මුහුණින්ම ලබාගන්නත් නැත්නම් ඔබේ වෛද්‍යවරයාට යවන්නත් පුළුවන්." },
    ],
    prep: [
      "ඔබේ පරීක්ෂණයට කලින් Fasting අවශ්‍යද කියලා අහන්න",
      "ඔබේ වෛද්‍යවරයා දුන්නොත් Referral Form එකක් අරගෙන එන්න",
      "10% වට්ටම ඉල්ලන්න OPD Card එක අරගෙන එන්න",
      "Sampling ලේසි කරගන්න කලින් වතුර බීගන්න",
    ],
    team: [
      { role: "රසායනාගාර Technologists", note: "Haematology, Biochemistry, Microbiology සහ Histopathology Samples පැය 24ම Process කරනවා." },
      { role: "Verify කරන වෛද්‍යවරු", note: "නිකුත් කිරීමට කලින් Technologist ගේ සොයාගැනීම් වලට එරෙහිව හැම Report එකක්ම Check කරනවා." },
      { role: "Phlebotomy කණ්ඩායම", note: "Outpatients, Inpatients සහ Emergency වලින් එන අයගෙන් ඕන වේලාවක Samples ලබාගන්නවා." },
      { role: "රසායනාගාර Reception", note: "Bookings, OPD වට්ටම් සහ Report ලබාගැනීම් හසුරුවනවා." },
    ],
    faq: [
      { q: "රසායනාගාරය රාත්‍රියේත් විවෘතද?", a: "ඔව්. රසායනාගාරය පැය 24ම ධාවනය වෙන නිසා, ඕන වේලාවක Sample එකක් ලබාගන්නත් Process කරන්නත් පුළුවන්, Emergency Department වලින් එන හදිසි Requests ඇතුළුව." },
      { q: "මගේ ප්‍රතිඵල ලැබෙන්නේ කීයටද?", a: "බොහෝ Reports එදිනම ලැබෙනවා. ඔබ Book කරන කොට ඔබේ Test Request එකේ අපේක්ෂිත වේලාව පෙන්වයි." },
      { q: "Report එකක් Check කරන්න වෛද්‍යවරු දෙන්නෙක් ඕන ඇයි?", a: "නිකුත් කිරීමට කලින් හැම Report එකක්ම වෛද්‍යවරු දෙදෙනෙක් Verify කරනවා, ඔබට හෝ ඔබේ වෛද්‍යවරයාට ලැබෙන්න කලින් නිරවද්‍යතාවයට අමතර Check එකක් එකතු කරලා." },
      { q: "Outpatient කෙනෙක් විදිහට වට්ටමක් ලැබෙනවද?", a: "ඔව්. OPD රෝගීන්ට රසායනාගාර ගාස්තුවලින් 10% වට්ටමක් ලැබෙනවා. ගෙවන කොට ඔබේ OPD Card එක අරගෙන එන්න." },
    ],
  },
  {
    title: "විකිරණවේදය සහ Digital X-ray",
    directoryTitle: "විකිරණවේදය සහ Digital X-ray",
    hours: "පැය 24",
    cta: "Imaging Book කරන්න",
    desc: "Digital X-ray සහ Ultrasound පැය 24ම ලබාගත හැක, Films පැයක් ඇතුළත කියවනවා, රෝගියෙක්ට Travel කරන්න බැරි උනොත් Portable Imaging වාට්ටුවටම ගෙනෙනවා. CT සහ MRI මෙතන සිදු කරන්නේ නෑ: Scan එකක් අවශ්‍ය උනොත්, Partner Imaging Centre එකකට Referral සංවිධානය කරනවා.",
    tags: ["Digital X-ray සේවාව", "Ultrasound සේවාව", "Portable Imaging සේවාව", "CT/MRI සඳහා Referral"],
    facts: [
      { k: "වේලාවන්", v: "පැය 24" },
      { k: "X-ray ලැබෙන කාලය", v: "පැයක් ඇතුළත" },
      { k: "මෙතන තියෙන්නේ", v: "Digital X-ray සහ Ultrasound" },
      { k: "CT සහ MRI", v: "Partner Centre එකකට Referral එකකින්" },
    ],
    lede: "Digital X-ray සහ Ultrasound හැම වේලාවකම, Films පැයක් ඇතුළත කියවනවා, Scan එකකට CT හෝ MRI ඕන උනොත් පැහැදිලි Referral මාර්ගයකුත් සමඟ.",
    aboutHead: "Digital Imaging මෙතනම, තව දුරට යනවනම් Referral",
    body1: "Digital Radiography සහ Ultrasound පැය 24ම ධාවනය වෙනවා, හැම X-ray එකක්ම වෙනම Film Handling අවශ්‍ය නැතුව කෙලින්ම ඔබේ File එකට එනවා. රෝගියෙක්ව Move කරන්න බැරි උනොත් Radiographer කෙනෙක්ට Portable Machine එකක් වාට්ටුවටම ගෙනෙන්නත් පුළුවන්. X-ray Films පැයක් ඇතුළත කියවලා Report කරනවා, එහෙනම් සාමාන්‍යයෙන් එකම Visit එකේදීම සැලැස්මක් එකඟ වෙන්න පුළුවන්.",
    body2: "මෙම රෝහලේ CT හෝ MRI Scanning මෙතන නෑ. එකක් අවශ්‍ය Case එකක් ආවොත්, අපේ කණ්ඩායම Partner Imaging Centre එකකට Referral සංවිධානය කරලා, ඔබේ දැනට තියෙන Films සහ Clinical Notes Referral එකත් සමඟම යවනවා, එහෙනම් ලබාගන්න Centre එකට හිස් අතින් පටන් ගන්න වෙන්නේ නෑ.",
    strip: [
      { k: "වේලාවන්", v: "පැය 24" },
      { k: "X-ray කියවීම", v: "පැයක් ඇතුළත" },
      { k: "Ultrasound එක", v: "මෙතනම" },
      { k: "CT/MRI එක", v: "Referral එකෙන් විතරයි" },
    ],
    covers: [
      "Digital X-ray සේවාව",
      "Ultrasound Scan කිරීම",
      "Portable Ward Imaging සේවාව",
      "CT Scan සඳහා Referral සැලසුම",
      "MRI Scan සඳහා Referral සැලසුම",
    ],
    conditions: [
      "සැකසහිත ඇටකැඩීමක්",
      "පපුවේ Infection තක්සේරුව",
      "Ultrasound අවශ්‍ය බඩේ වේදනාව",
      "Antenatal Scan කිරීම",
      "මාංශ පේශි තුවාලයක්",
      "CT හෝ MRI Referral අවශ්‍ය Cases",
    ],
    location: "බිම් මහල, විකිරණවේද අංශය",
    steps: [
      { title: "ඉල්ලීම", desc: "ඔබේ වෛද්‍යවරයා අවශ්‍ය Imaging Order කරනවා, නැත්නම් සරළ X-ray එකක් සඳහා ඔබටම කෙලින්ම Book කරන්න පුළුවන්." },
      { title: "Scan කිරීම", desc: "Digital X-ray හෝ Ultrasound මෙතනදීම කරනවා, නැත්නම් Portable Machine එකක් ඔබේ ඇඳටම ගෙනෙනවා." },
      { title: "Report කිරීම", desc: "X-ray Films පැයක් ඇතුළත කියවනවා; Ultrasound සොයාගැනීම් Scan කරන වේලාවේදීම කතා කරනවා." },
      { title: "අවශ්‍ය නම් Refer කිරීම", desc: "CT හෝ MRI අවශ්‍ය නම්, Partner Centre එකකට Referral සංවිධානය කරලා, ඔබේ Films සහ Notes කලින්ම යවනවා." },
    ],
    prep: [
      "Scan කරන ප්‍රදේශයට ළඟින් තියෙන Jewellery හෝ Metal අයින් කරන්න",
      "Compare කරගන්න කලින් Imaging එකක් තියෙනවනම් අරගෙන එන්න",
      "බඩේ Ultrasound එකක් නම් Fasting ගැන අහන්න",
      "වෛද්‍යවරයෙක් විශේෂිත Scan එකක් ඉල්ලලා තියෙනවනම් Referral Letter එක අරගෙන එන්න",
    ],
    team: [
      { role: "Radiographer ලා", note: "Digital X-ray සහ Portable Ward Imaging පැය 24ම කරනවා." },
      { role: "Sonographer ලා", note: "බඩේ, Antenatal සහ මාංශ පේශි තක්සේරු සඳහා Ultrasound Scans කරනවා." },
      { role: "Report කරන Radiologists", note: "X-ray Films පැයක් ඇතුළත කියවලා Report කරනවා." },
      { role: "Referral Coordinator කෙනා", note: "Partner Imaging Centres වල CT සහ MRI Appointments සංවිධානය කර Clinical Notes යවනවා." },
    ],
    faq: [
      { q: "CT හෝ MRI මෙතන තියෙනවද?", a: "නෑ. CT සහ MRI Scans මෙම රෝහලේ කරන්නේ නෑ. එකක් අවශ්‍ය උනොත්, Partner Imaging Centre එකකට Referral සංවිධානය කරලා, Appointment එකට කලින්ම ඔබේ Notes සහ දැනට තියෙන Films යවනවා." },
      { q: "මගේ X-ray කීයටද කියවෙන්නේ?", a: "X-ray Films පැයක් ඇතුළත කියවනවා, එහෙනම් ඔබත් ඔබේ වෛද්‍යවරයාත් සාමාන්‍යයෙන් Department එකෙන් යනකොටම Report එකක් ලබාගන්නවා." },
      { q: "Imaging මගේ ඇඳ ළඟදීම කරන්න පුළුවන්ද?", a: "ඔව්. Move කරන්න බැරි රෝගීන් සඳහා Radiographer කෙනෙක්ට Portable X-ray Machine එකක් වාට්ටුවටම ගෙනෙන්න පුළුවන්." },
      { q: "Department එක රාත්‍රියේත් විවෘතද?", a: "ඔව්. Digital X-ray සහ Ultrasound පැය 24ම ලබාගත හැක, Emergency Cases ඇතුළුව." },
    ],
  },
  {
    title: "හෘද Screening සහ ECG",
    directoryTitle: "හෘද Screening සහ ECG",
    hours: "දිනපතා",
    cta: "Screening එකක් Book කරන්න",
    desc: "Resting ECG, Echocardiography සහ හෘද අවදානම් තක්සේරුව, ඔබේ Visit එකේදීම කරලා වෛද්‍යවරයෙක් විසින් Review කරනවා, ප්‍රතිඵලය ඉල්ලනවනම් Cardiology එකට Referral එකකුත් සමඟ.",
    tags: ["Resting ECG සේවාව", "Echocardiography සේවාව", "හෘද අවදානම් තක්සේරුව", "වෛද්‍ය Review"],
    facts: [
      { k: "වේලාවන්", v: "දිනපතා" },
      { k: "අර්ථ දැක්වීම", v: "වෛද්‍යවරයෙක් අතින්" },
      { k: "ලබාදෙන පරීක්ෂණ", v: "ECG සහ Echocardiography" },
      { k: "Referral එක", v: "අවශ්‍ය නම් Cardiology එකට" },
    ],
    lede: "ECG, Echocardiography සහ හෘද අවදානම් තක්සේරුවක් දිනපතා ධාවනය වෙනවා, ඔබේ Visit එකේදීම කරලා වෛද්‍යවරයෙක් විසින් Review කරනවා.",
    aboutHead: "වෛද්‍යවරයෙක් Review කරන හෘද Screening",
    body1: "Resting ECG එකක් හදවතේ විදුලි රිද්මය Record කරනවා, Echocardiography එකෙන් හදවත Pump වෙන විදිහත් Valves වැඩ කරන විදිහත් පින්තූරයක් එකතු වෙනවා. දෙකම ඔබේ History, රුධිර පීඩනය සහ අනිත් Factors පරීක්ෂණ ප්‍රතිඵල සමඟ බලන හෘද අවදානම් තක්සේරුවක් සමඟ එකතු කරනවා.",
    body2: "පරීක්ෂණය ඔබේ Visit එකේදීම කරලා වෛද්‍යවරයෙක් විසින් Review කරනවා, එහෙනම් ඔබේ සත්කාරය වෙනම Report එකක් හඹාගෙන ඉන්න වෙන්නේ නෑ. සොයාගැනීම් තව සමීපව බැලිය යුතු දෙයක් පෙන්නුවොත්, තව තක්සේරුවක් සහ කළමනාකරණයක් සඳහා ඔබව Cardiology එකට Refer කරනවා.",
    strip: [
      { k: "වේලාවන්", v: "දිනපතා" },
      { k: "ECG එක", v: "Resting, මෙතනම" },
      { k: "Echo එක", v: "මෙතනම" },
      { k: "අර්ථ දැක්වීම", v: "වෛද්‍යවරයෙක් අතින්" },
    ],
    covers: [
      "Resting ECG සේවාව",
      "Echocardiography සේවාව",
      "හෘද අවදානම් තක්සේරුව",
      "වෛද්‍ය ප්‍රතිඵල Review",
      "Cardiology එකට Referral",
    ],
    conditions: [
      "පරීක්ෂාවට ලක්වන පපුවේ අපහසුතාවය",
      "Palpitations ඇතිවීම",
      "හෘද කරදරයක් සමඟ ඉහළ රුධිර පීඩනය",
      "ශල්‍යකර්මයට පෙර හෘද Clearance",
      "හෘද රෝගයේ පවුල් History",
      "වෙහෙසෙන විට හුස්ම ගැනීමේ අපහසුතාවය",
    ],
    location: "පළමු මහල, හෘද රෝග විනිශ්චය",
    steps: [
      { title: "Book කිරීම", desc: "Screening එකක් කෙලින්ම Book කරන්න, නැත්නම් ඔබේ වෛද්‍යවරයාගෙන් Referral එකක් සමඟ එන්න." },
      { title: "පරීක්ෂණය", desc: "Resting ECG එකක් සහ, සුදුසු නම්, Echocardiogram එකක් Record කරනවා." },
      { title: "අර්ථ දැක්වීම", desc: "වෛද්‍යවරයෙක් ඔබේ ප්‍රතිඵල Review කරලා අවදානම් තක්සේරුව ඔබ සමඟ කතා කරනවා." },
      { title: "අවශ්‍ය නම් Refer කිරීම", desc: "සොයාගැනීම් ඉල්ලනවනම්, තව කළමනාකරණයක් සඳහා ඔබව Cardiology එකට Refer කරනවා." },
    ],
    prep: [
      "ඔබේ පපුවට ලේසියෙන් ලගාවෙන්න පුළුවන් Top එකක් අඳින්න",
      "දැනට ගන්නා බෙහෙත් List එකක් අරගෙන එන්න",
      "පුළුවන්නම් කලින් පැය කීපයක් Caffeine වළකින්න",
      "Compare කරගන්න පෙර ECG හෝ හෘද Reports තියෙනවනම් අරගෙන එන්න",
    ],
    team: [
      { role: "හෘද Technicians", note: "Resting ECG සහ Echocardiography Studies Record කරනවා." },
      { role: "අර්ථ දක්වන වෛද්‍යවරු", note: "පරීක්ෂණ ප්‍රතිඵල සහ අවදානම් තක්සේරුව රෝගියා සමඟ Review කරනවා." },
      { role: "Screening Clinic Coordinator කෙනා", note: "Appointments Book කරලා Cardiology එකට Referrals කළමනාකරණය කරනවා." },
      { role: "Nursing කණ්ඩායම", note: "පරීක්ෂණය සඳහා රෝගීන් Prepare කරලා Screening Clinic එකට සහාය වෙනවා." },
    ],
    faq: [
      { q: "මගේ ප්‍රතිඵල කීයටද ලැබෙන්නේ?", a: "පරීක්ෂණය ඔබේ Visit එකේදීම කරලා, වෛද්‍යවරයෙක් ඔබේ ECG සහ Echocardiogram Review කරලා සොයාගැනීම් ඔබ සමඟ කතා කරනවා." },
      { q: "Screening එකක් Book කරන්න Referral එකක් ඕනද?", a: "නෑ. Screening එකක් කෙලින්ම Book කරන්න පුළුවන්, ඔබේම වෛද්‍යවරයාගෙන් Referral එකක් ලැබුනත් පිලිගන්නවා." },
      { q: "අසාමාන්‍ය දෙයක් හම්බුවුනොත් මොකද වෙන්නේ?", a: "තව තක්සේරුවක් සහ කළමනාකරණයක් සඳහා ඔබව Cardiology එකට Refer කරනවා, ඔබේ ප්‍රතිඵල ඒ Appointment එකට කලින්ම යවනවා." },
      { q: "Echocardiogram එක අපහසුද?", a: "නෑ. පපුව මතින් Ultrasound යොදාගන්නවා, Needles හෝ Sedation කිසිවක් ඇතුළත් නෑ, ඔබේ Appointment එකට ඒ සඳහා වේලාවක් වෙන් කරලා තියෙනවා." },
    ],
  },
  {
    title: "CTG සහ දරුවාගේ Monitoring",
    directoryTitle: "CTG සහ දරුවාගේ Monitoring",
    hours: "Appointment එකකින්",
    cta: "Monitoring Book කරන්න",
    desc: "දරුවාගේ හෘද ස්පන්දනය සහ සංකෝචන Monitor කරන්න Cardiotocography (CTG), Antenatal Clinic එකට සමගාමීව ධාවනය කරලා Obstetric කණ්ඩායම විසින් Review කරනවා.",
    tags: ["Cardiotocography සේවාව", "දරුවාගේ හෘද ස්පන්දනය", "සංකෝචන Monitoring", "Antenatal Clinic එක"],
    facts: [
      { k: "වෙන් කිරීම", v: "Appointment එකකින්" },
      { k: "Monitor කරන්නේ", v: "දරුවාගේ හෘද ස්පන්දනය සහ සංකෝචන" },
      { k: "සමගාමීව", v: "Antenatal Clinic එකට" },
      { k: "Review කරන්නේ", v: "Obstetric කණ්ඩායම" },
    ],
    lede: "දරුවාගේ හෘද ස්පන්දනය සහ සංකෝචන Track කරන්න Cardiotocography, ඔබේ Antenatal Visits සමඟ Book කරලා Obstetric කණ්ඩායම විසින් Review කරනවා.",
    aboutHead: "ඔබේ දරුවාගේ හෘද ස්පන්දනයයි ඔබේ සංකෝචනයයි Monitor කිරීම",
    body1: "CTG Trace එකක් ඔබේ දරුවාගේ හෘද ස්පන්දනයයි ඕන Uterine සංකෝචනයන්ම Monitoring කාල පරිච්ඡේදයකට Record කරනවා, සාමාන්‍යයෙන් ඔබ සුවපහසුව වාඩිවෙලා හෝ හාන්සි වෙලා ඉන්නකොට ඔබේ බඩේ Soft Sensors දෙකක් තියලා. මේක Antenatal Clinic එකට සමගාමීව ලබාදෙනවා, එහෙනම් පුළුවන් තැන ඔබේ Regular ගැබ්ගිනි පරීක්ෂණ වගේම එකම Visit එකට Fit වෙනවා.",
    body2: "හැම Trace එකක්ම Obstetric කණ්ඩායම විසින් Review කරනවා, ඔවුන් Record කරගත් ඕන සංකෝචනයකට එරෙහිව හෘද ස්පන්දන රටාවත් ඔබේ සමස්ත Antenatal තත්ත්වයටත් එරෙහිව බලනවා. Trace එකෙන් ප්‍රශ්නයක් ආවොත්, ඒක කෙලින්ම ඔබ සමඟ කතා කරලා ඔබේ අඛණ්ඩ Antenatal සත්කාරයේ කොටසක් විදිහට Follow-up කරනවා.",
    strip: [
      { k: "Monitor කරන්නේ", v: "හෘද ස්පන්දනය සහ සංකෝචන" },
      { k: "වෙන් කිරීම", v: "Appointment එකකින්" },
      { k: "සිදු වන්නේ", v: "Antenatal Clinic එකේ" },
      { k: "Review කරන්නේ", v: "Obstetric කණ්ඩායම" },
    ],
    covers: [
      "දරුවාගේ හෘද ස්පන්දන Monitoring",
      "සංකෝචන Monitoring",
      "Antenatal CTG Review එක",
      "Routine Antenatal Visits සමඟ Monitoring",
    ],
    conditions: [
      "දරුවාගේ චලනය අඩුවීම",
      "Post-dates ගැබ්ගිනි Monitoring",
      "High-risk ගැබ්ගිනි Follow-up",
      "සැකසහිත ඉක්මන් Labour",
      "Routine Antenatal Surveillance එක",
    ],
    location: "පළමු මහල, Antenatal Clinic",
    steps: [
      { title: "Book කිරීම", desc: "ඔබේ Antenatal Appointment එකට සමගාමීව, නැත්නම් ඔබේ Obstetric කණ්ඩායම කියන විදිහට Monitoring Book කරන්න." },
      { title: "සම්බන්ධ කිරීම", desc: "හෘද ස්පන්දනයයි ඕන සංකෝචනයන්ම අල්ලගන්න Soft Sensors දෙකක් ඔබේ බඩේ තියනවා." },
      { title: "Monitor කිරීම", desc: "ඔබේ Obstetric කණ්ඩායම ඉල්ලපු කාල පරිච්ඡේදයට Trace එක ධාවනය වෙනවා, ඔබ සුවපහසුව Rest ගන්නකොට." },
      { title: "Review කිරීම", desc: "ඔබ යනකොට Obstetric කණ්ඩායම Trace එක Review කරලා සොයාගැනීම් ඔබ සමඟ කතා කරනවා." },
    ],
    prep: [
      "Trace එකේදී දරුවාගේ ක්‍රියාකාරීත්වයට උදව් වෙයි නම් කලින්ම කන්න",
      "Monitoring පටන් ගන්න කලින් සුවපහසුවට Bladder එක Empty කරගන්න",
      "ඔබේ Antenatal Record Book එක අරගෙන එන්න",
      "ඔබේ බඩට ලේසියෙන් ලගාවෙන්න පුළුවන් ඇඳුමක් අඳින්න",
    ],
    team: [
      { role: "Antenatal Nursing කණ්ඩායම", note: "Monitoring Sensors සම්බන්ධ කරලා Trace එක පුරාවටම රෝගීන්ට සහාය වෙනවා." },
      { role: "Obstetric කණ්ඩායම", note: "හැම CTG Trace එකක්ම Review කරලා සොයාගැනීම් රෝගියා සමඟ කතා කරනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Antenatal Visits සමඟ Monitoring Appointments Book කරනවා." },
    ],
    faq: [
      { q: "Monitoring එකෙන් වදනවද?", a: "නෑ. Soft Sensors දෙකක් ඔබේ බඩේ Strap කරනවා; Needles නෑ, ඔබේ ශරීරයට කිසිවක් ඇතුළු වෙන්නේ නෑ." },
      { q: "Session එකක් කීයක් වේලාවක් ගන්නවද?", a: "Obstetric කණ්ඩායම බලන දේ මත වෙනස් වෙනවා, ඒත් බොහෝ Sessions ඔබේ Antenatal Clinic Visit එකට Fit වෙන්න සැලසුම් කරලා තියෙනවා." },
      { q: "ප්‍රතිඵල බලන්නේ කවුද?", a: "Obstetric කණ්ඩායම හැම Trace එකක්ම Review කරලා, ඔබ Clinic එකෙන් යනකොට සොයාගැනීම් ඔබ සමඟ කතා කරනවා." },
      { q: "Antenatal Appointment එකකින් තොරව Monitoring Book කරන්න පුළුවන්ද?", a: "සාමාන්‍යයෙන් Monitoring Antenatal Clinic එකට සමගාමීව සංවිධානය කරනවා; Scheduled Visit එකකින් පිටත ඕන නම් Clinic Coordinator සමඟ කතා කරන්න." },
    ],
  },
];
