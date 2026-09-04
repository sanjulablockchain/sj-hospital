// Sinhala overlay for womenChildren.ts (5 of the catalog's 36 services:
// obstetrics-maternity, gynaecology, paediatrics, fertility,
// vaccination-clinic).
//
// This file's own domain trap: "delivery" here is always the obstetric
// sense (childbirth), never the pharmacy counter's Delivery service, and
// "stock" (vaccination-clinic, cold-chain vaccine supply) is never the
// pharmacy counter's Stock either. Per the task's own instruction, these are
// different words that merely look the same, not the pharmacy vocabulary
// pharmacy/data/content.si.ts owns: this file is ordinary clinical prose and
// translates both in full, reusing the site's own established word for
// obstetric delivery, "ප්‍රසූතිය" (already used this way in
// emergency.si.ts's own team note, and in media/facilities/
// international-care's own content.si.ts for the identical fact). A THIRD
// sense of "delivery" also occurs, in the vaccination-clinic service's own
// "from delivery to administration" (body1, a team note, and a faq answer):
// this is neither childbirth nor the pharmacy counter, but the vaccine
// supply chain (when a batch of vaccines is received by the hospital), so
// it translates as ordinary logistics prose too ("ලැබෙන විට", "the time it
// is received"), not left bare. Likewise "record"/"records" here is always
// the clinical-documentation sense (an
// antenatal record book, a vaccination record card), not the pharmacy
// counter's digital prescription Record: school-wellness/data/content.si.ts
// already translates this exact sense in full ("Vaccination record" ->
// "එන්නත් වාර්තාව"), which this file follows rather than the pharmacy
// register.
//
// "Obstetric" (the adjective, e.g. "Obstetric Theatre") and "Theatre" stay
// English throughout, matching facilities.si.ts's and international-care's
// own header ("Consultant", "Anaesthesia", "Surgical", "Theatre",
// "Obstetric" stay English inside sentences). "Obstetrics" and "Paediatrics"
// (the specialty NOUN, as this feature's own emergency.si.ts translates
// "obstetrics and paediatrics" in full, "ප්‍රසූතිය සහ ළමා රෝග") translate in
// full rather than staying bare like the adjective form; "Maternity"
// (an ordinary noun: maternity desk, maternity unit) translates alongside
// them for the same reason, to "මාතෘත්වය"/"මාතෘ".
//
// "Neonatal" and "Antenatal" stay English throughout (established:
// facilities.si.ts's own "Neonatal සහාය", diagnostics.si.ts's own
// "Antenatal"). "Consultant" translates to විශේෂඥ වෛද්‍යවරයා as an ordinary
// noun (emergency.si.ts's own rule), except as a nameplate title directly in
// front of a named role, which stays wholly English: `[0].team[0].role`
// ("Consultant obstetrician") is exactly that pattern, the same one
// media/data/content.si.ts's own KEEPS_ENGLISH already keeps for
// "Consultant obstetrician and gynaecologist", "Consultant physician" and
// "Consultant paediatrician".
//
// Specific specialist-title role nouns (the person, not the field) stay
// English with a Sinhala particle where the grammar wants one, matching
// diagnostics.si.ts's own explicit rule for "Radiographer", "Sonographer"
// and "Radiologist": "Obstetrician", "Gynaecologist(s)", "Paediatrician(s)",
// "Sonographer(s)", "Coordinator", "Counsellor" and "Midwifery" all follow
// the same shape here. "Doctor"/"Physician" (the generic noun, not a
// specialty suffix) still translate in full to වෛද්‍යවරයා, matching
// emergency.si.ts and diagnostics.si.ts.
//
// "Card" (as in a vaccination/printed record card) stays English with a
// Sinhala particle, matching school-wellness/data/content.si.ts's own
// "එන්නත් Card එක" for the identical object.
//
// Every number (24 hours, vaccine schedule ages, and the like) is unchanged
// from the English base.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const womenChildrenServices = [
  {
    title: "ප්‍රසූතිය සහ මාතෘත්වය",
    directoryTitle: "ප්‍රසූතිය සහ මාතෘත්වය",
    hours: "පැය 24ම On-call",
    cta: "මාතෘ අංශයට කතා කරන්න",
    desc: "ගැබ්ගැනීමේ සත්කාරය විශේෂඥ වෛද්‍යවරයෙක් වටා හැදිලා තියෙන්නේ, ප්‍රසූතිය දක්වාම ඔබව බලාගන්නවා, Scans Clinic එකේදීම කරනවා, සාමාන්‍ය ශල්‍යකර්මයෙන් වෙන් වූ Obstetric Theatre එකකුත් සමඟ. අවශ්‍ය නම් ප්‍රසූතියේදී Neonatal සහාය ළඟින්ම ඉන්නවා, Private Rooms ලබාගත හැක.",
    tags: ["විශේෂඥ වෛද්‍යවරයෙක් මෙහෙයවන ගැබ්ගැනීමේ සත්කාරය", "Clinic එකේදීම Scans", "වෙන් වූ Obstetric Theatre එකක්", "ප්‍රසූතියේදී Neonatal සහාය"],
    facts: [
      { k: "විශේෂඥ වෛද්‍යවරයා", v: "ඔබේ ගැබ්ගැනීම පුරාම එක් අයෙක්" },
      { k: "පරීක්ෂණ", v: "Clinic එකේදීම කරනවා" },
      { k: "Theatre", v: "වෙන් වූ Obstetric Theatre එකක්" },
      { k: "On Call එක", v: "පැය 24ම" },
    ],
    lede: "ගැබ්ගැනීම සහ ප්‍රසූතිය සත්කාරය විශේෂඥ වෛද්‍යවරයෙක් ඔබව අවසානය දක්වාම බලාගෙන, Scans Clinic එකේදීම කර, පාර පැත්තකින්ම වෙන් වූ Obstetric Theatre එකකුත් සමඟ.",
    aboutHead: "එක් විශේෂඥ වෛද්‍යවරයෙක්, Booking සිට ප්‍රසූතිය දක්වා",
    body1: "Antenatal සත්කාරය හැදිලා තියෙන්නේ, මාරුවෙන් මාරුවට එන කණ්ඩායමක් නෙවෙයි, ඔබේ ගැබ්ගැනීම ප්‍රසූතිය දක්වාම බලාගන්නා එක් විශේෂඥ වෛද්‍යවරයෙක් වටාමයි, එහෙනම් හැම Visit එකකදීම ඔබව පරීක්ෂා කරන කෙනාට ඔබේ History ම කලින්ම දැනගෙන තියෙනවා. සාමාන්‍ය Scans කරන්නේ එකම Clinic එකේදීමයි, පුළුවන් හැම විටකම Antenatal පරීක්ෂණ එක් Visit එකකට සීමා කරගෙන.",
    body2: "ප්‍රසූතිය සිදු වෙන්නේ සාමාන්‍ය ශල්‍ය List වලින් වෙන් කර තියෙන Obstetric Theatre එකකදී, බබාගේ තත්ත්වය ඉල්ලුවොත් ප්‍රසූතියේදීම Neonatal සහායත් ළඟින්ම ඉන්නවා. ඇතුළත් වීම සඳහා Private Rooms ලබාගත හැක, උපදෙස් සඳහා හෝ දරු ප්‍රසූතිය පටන් ගත්තොත් මාතෘ Desk එකට ඕන වෙලාවක ලගාවෙන්නත් පුළුවන්.",
    strip: [
      { k: "විශේෂඥ වෛද්‍යවරයා", v: "පුරාවටම එක් අයෙක්" },
      { k: "පරීක්ෂණ", v: "Clinic එකේදීම" },
      { k: "Theatre", v: "වෙන් වූ Obstetric" },
      { k: "On Call එක", v: "පැය 24ම" },
    ],
    covers: [
      "Antenatal Booking සහ අඛණ්ඩ ගැබ්ගැනීමේ සත්කාරය",
      "Clinic එකේදීම ගැබ්ගැනීමේ Scanning",
      "දරු වෙදනාව සහ ප්‍රසූතිය",
      "ප්‍රසූතියේදී Neonatal සහාය",
      "Private Room ඇතුළත් වීම",
    ],
    conditions: [
      "සාමාන්‍ය ගැබ්ගැනීමේ සත්කාරය",
      "අවදානම් සහිත ගැබ්ගැනීමේ Follow-up",
      "රෝහල් ඇතුළත් වීම අවශ්‍ය දරු වෙදනාව",
      "Neonatal සහාය අවශ්‍ය ප්‍රසූතිය",
      "ප්‍රසූතියෙන් පසු සුවවීම",
    ],
    location: "දෙවන මහල, මාතෘ ඒකකය",
    steps: [
      { no: "01", title: "Book කිරීම", desc: "ඔබේ ගැබ්ගැනීම විශේෂඥ වෛද්‍යවරයා සමඟ Register කරන්න, එතුමා ප්‍රසූතිය දක්වාම ඔබේ සත්කාරය බලාගන්නවා." },
      { no: "02", title: "සහභාගී වීම", desc: "Antenatal Visits සියල්ලේදීම Consultation එකයි Clinic එකේදීම Scanning එකයි ගැබ්ගැනීමේ හැම අදියරකදීම එකට එකතු වෙනවා." },
      { no: "03", title: "ප්‍රසූතිය", desc: "දරු වෙදනාවයි ප්‍රසූතියයි වෙන් වූ Obstetric Theatre එකේදී සිදු වෙනවා, අවශ්‍ය නම් Neonatal සහායත් ළඟින්ම ඉන්නවා." },
      { no: "04", title: "සුවවීම", desc: "ඔබ සුවවෙන්නේ Private Room එකක, මාතෘ Desk එකට ඕන වෙලාවක ලගාවෙන්නත් පුළුවන්." },
    ],
    prep: [
      "හැම Visit එකකදීම ඔබේ Antenatal වාර්තා පොත අරගෙන එන්න",
      "ඔබේ නියමිත දිනයට කලින් රෝහල් බෑගය සූදානම් කරගන්න",
      "වේලාවෙන් පිටත ප්‍රශ්නවලට ඔබේ විශේෂඥ වෛද්‍යවරයාගේ Contact විස්තර සටහන් කරගන්න",
      "දරු වෙදනාව පටන් ගත් විට සඳහා කලින්ම Transport සලසාගන්න",
    ],
    team: [
      { role: "Consultant obstetrician", note: "එක් එක් ගැබ්ගැනීම Booking සිට ප්‍රසූතිය දක්වාම බලාගන්නවා." },
      { role: "Midwifery කණ්ඩායම", note: "Antenatal Visits, දරු වෙදනාව සහ ප්‍රසූතියෙන් පසු සුවවීමට සහාය වෙනවා." },
      { role: "Neonatal සහායක කණ්ඩායම", note: "බබාගේ තත්ත්වය ඉල්ලුවොත් ප්‍රසූතියේදී ළඟින්ම ඉන්නවා." },
      { role: "Obstetric Theatre කණ්ඩායම", note: "සාමාන්‍ය ශල්‍ය List වලින් වෙන් කර තියෙන Theatre එක Staff කරනවා." },
    ],
    faq: [
      { q: "මම හැම Visit එකකදීම එකම විශේෂඥ වෛද්‍යවරයාවම දකින්නද?", a: "ඔව්. එක් විශේෂඥ වෛද්‍යවරයෙක් ඔබේ ගැබ්ගැනීම ප්‍රසූතිය දක්වාම බලාගන්නවා, එහෙනම් ඔබව දකින කෙනාට ඔබේ History දැනටමත් දැනගෙන තියෙනවා." },
      { q: "Scans සඳහා මට වෙන තැනකට යන්න ඕනද?", a: "නෑ. සාමාන්‍ය ගැබ්ගැනීමේ Scans කරන්නේ ඔබේ Antenatal Visits වගේම එකම Clinic එකේදීමයි." },
      { q: "ප්‍රසූතිය සඳහා වෙනම ස්ථානයක් තියෙනවද?", a: "ඔව්. ප්‍රසූතිය සිදු වෙන්නේ සාමාන්‍ය ශල්‍ය List වලින් වෙන් කර තියෙන Obstetric Theatre එකකදීයි." },
      { q: "උපදින විට මගේ බබාට උදව් ඕන වුනොත් ළමා විශේෂඥ කණ්ඩායමක් ළඟින් ඉන්නවද?", a: "බබාගේ තත්ත්වය ඉල්ලන හැම විටකම Neonatal සහාය ප්‍රසූතියේදී ළඟින්ම ඉන්නවා." },
    ],
  },
  {
    title: "Gynaecology",
    directoryTitle: "Gynaecology",
    hours: "සතිපතා Clinics",
    cta: "Gynaecology Book කරන්න",
    desc: "ඔසප් වීම, දරුවන් ලැබීමේ සහ Menopause ගැටලු සඳහා සතිපතා Clinics, පලමු Visit එකේදීම Ultrasound ලබාගත හැක, අවශ්‍ය නම් Day-case ක්‍රියාපටිපාටි, ඉල්ලීම මත කාන්තා Staff ලාද ලබාගත හැක.",
    tags: ["ඔසප් සෞඛ්‍යය", "Menopause සත්කාරය", "Clinic එකේදීම Ultrasound", "Day-case ක්‍රියාපටිපාටි"],
    facts: [
      { k: "දින", v: "සතිපතා" },
      { k: "පලමු Visit එක", v: "Ultrasound ලබාගත හැක" },
      { k: "ක්‍රියාපටිපාටි", v: "Day Case එකක්" },
      { k: "Staff සැපයුම", v: "ඉල්ලීම මත කාන්තා Staff ලා" },
    ],
    lede: "ඔසප් වීම, දරුවන් ලැබීමේ සහ Menopause ගැටලු සඳහා සතිපතා Gynaecology Clinics, ඔබේ පලමු Visit එකේදීම Ultrasound ලබාගත හැක.",
    aboutHead: "සතිපතා Clinic එකකදී Gynaecology සත්කාරය",
    body1: "Gynaecology Clinic එක සතිපතා පවත්වන අතර ඔසප් ගැටලු, දරුවන් ලැබීමේ ගැටලු සහ Menopause කළමනාකරණය ආවරණය කරනවා. තක්සේරුවට උපකාරී වෙයි නම්, පලමු Visit එකේදීම Ultrasound ලබාගත හැක, එහෙනම් වෙනම Scan Appointment එකකට පස්සේ නෙවෙයි එදිනම සොයාගැනීම් ඔබ සමඟ සාකච්ඡා කරගත හැක.",
    body2: "ක්‍රියාපටිපාටියක් අවශ්‍ය නම්, බොහෝමයක් Day Cases විදිහට කරනවා, එහෙනම් රැදී නොසිට එදිනම ගෙදර යන්න පුළුවන්. කාන්තා Staff ලා විසින් බැලීමට සහ පරීක්ෂා කිරීමට කැමති නම්, Book කරන විට Clinic එකට කියන්න, පුළුවන් හැම විටකම එය සලසාගනී.",
    strip: [
      { k: "දින", v: "සතිපතා" },
      { k: "Ultrasound", v: "පලමු Visit එකේදී" },
      { k: "ක්‍රියාපටිපාටි", v: "Day Case එකක්" },
      { k: "කාන්තා Staff", v: "ඉල්ලීම මත" },
    ],
    covers: [
      "ඔසප් ආබාධ තක්සේරුව",
      "දරුවන් ලැබීමට අදාළ Gynaecology ගැටලු",
      "Menopause කළමනාකරණය",
      "Clinic එකේදීම Ultrasound Scanning",
      "Day-case Gynaecology ක්‍රියාපටිපාටි",
    ],
    conditions: [
      "අධික හෝ අක්‍රමවත් ඔසප් වීම",
      "Pelvic වේදනාව",
      "Menopause රෝග ලක්ෂණ",
      "අණ්ඩාශය Cysts",
      "Fibroid ගෙඩි",
    ],
    location: "දෙවන මහල, Gynaecology Clinic",
    steps: [
      { no: "01", title: "Book කිරීම", desc: "Gynaecology Book කරලා, කාන්තා Staff ලා කැමති නම් සඳහන් කරන්න." },
      { no: "02", title: "තක්සේරු කිරීම", desc: "Gynaecologist කෙනෙක් ඔබේ History ගෙන ඔබව පරීක්ෂා කරනවා, එකම Visit එකේදීම Ultrasound ලබාගත හැක." },
      { no: "03", title: "සැලසුම් කිරීම", desc: "සොයාගැනීම් සාකච්ඡා කර, කළමනාකරණ හෝ ක්‍රියාපටිපාටි සැලැස්මක් ඔබ සමඟ එකඟ වෙනවා." },
      { no: "04", title: "ප්‍රතිකාර කිරීම", desc: "අවශ්‍ය නම්, Day-case ක්‍රියාපටිපාටියක් Book කරලා, එදිනම ගෙදර යනවා." },
    ],
    prep: [
      "Visit එකට කලින් ඔබේ අවසාන ඔසප් දිනය සටහන් කරගන්න",
      "Book කරන විට දරුවන් ලැබීම හෝ Menopause සම්බන්ධ දැනට තියෙන ගැටලු කියන්න",
      "කැමති නම් කලින්ම කාන්තා Staff ලා ඉල්ලන්න",
      "ඔබ දැනට ගන්නා බෙහෙත් ලැයිස්තුවක් අරගෙන එන්න",
    ],
    team: [
      { role: "Gynaecologist ලා", note: "සතිපතා Clinic එක පවත්වා Day-case Gynaecology ක්‍රියාපටිපාටි කරනවා." },
      { role: "Sonographer ලා", note: "පලමු Visit එකේදීම Clinic එකේ Ultrasound Scans කරනවා." },
      { role: "කාන්තා Nursing Staff", note: "ඉල්ලීම මත පරීක්ෂණ සහ ක්‍රියාපටිපාටි සඳහා සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Appointments Book කර ඉල්ලීම මත කාන්තා Staff ලා සලසනවා." },
    ],
    faq: [
      { q: "මට කාන්තා වෛද්‍යවරියක් හෝ හෙදියක් ඉල්ලන්න පුළුවන්ද?", a: "ඔව්. Book කරන විට Clinic එකට කියන්න, පුළුවන් හැම විටකම කාන්තා Staff ලා සලසාගනී." },
      { q: "Scan එකකට මට වෙනම Visit එකක් ඕනද?", a: "සාමාන්‍යයෙන් නෑ. තක්සේරුවට උපකාරී වෙයි නම් පලමු Visit එකේදීම Ultrasound ලබාගත හැක." },
      { q: "ක්‍රියාපටිපාටියකට මට රැදී සිටින්න ඕනද?", a: "බොහෝ Gynaecology ක්‍රියාපටිපාටි Day Case, එහෙනම් එදිනම ගෙදර යනවා. ඔබේ Gynaecologist ඔබේ තත්ත්වයට අනුව බලාපොරොත්තු විය යුතු දේ තහවුරු කරයි." },
      { q: "Clinic එක කීයටත් පවත්වනවද?", a: "Gynaecology Clinic එක සතිපතා පවත්වනවා; ලබාගත හැකි ළඟම Appointment එක සඳහා Gynaecology Book කරන්න." },
    ],
  },
  {
    title: "ළමා රෝග සහ Neonatal සත්කාරය",
    directoryTitle: "ළමා රෝග සහ Neonatal සත්කාරය",
    hours: "පැය 24ම",
    cta: "ළමා රෝග විශේෂඥ Book කරන්න",
    desc: "අලුත උපන් Review එකක්, වර්ධන Tracking එකක් සහ සම්පූර්ණ එන්නත් Schedule එකක්, Kids & Teens Medical Group Protocol එකට අනුව ධාවනය කරන, ඕන වෙලාවක තියුණු ළමා අසනීප බැලීම සහ අලුත උපන් දරුවන් සඳහා Home Visit ක්‍රමයක්ද සමඟ.",
    tags: ["Kids & Teens Medical Group Protocol එක", "අලුත උපන් Review එක", "වර්ධන Tracking එක", "පැය 24ම තියුණු සත්කාරය"],
    facts: [
      { k: "වේලාවන්", v: "පැය 24ම" },
      { k: "Protocol එක", v: "Kids & Teens Medical Group" },
      { k: "අලුත උපන් සත්කාරය", v: "Home Visit ක්‍රමයක්" },
      { k: "එන්නත්කරණය", v: "සම්පූර්ණ ළමා Schedule" },
    ],
    lede: "අලුත උපන් Review එකක්, වර්ධන Tracking එකක් සහ ළමා එන්නත්කරණය Kids & Teens Medical Group Protocol එකට අනුව ධාවනය කරන, ඕන වෙලාවක තියුණු සත්කාරයක් සමඟ.",
    aboutHead: "Structured Protocol එකක් මත හැදුනු ළමා සෞඛ්‍ය සත්කාරය",
    body1: "ළමා රෝග සත්කාරය Kids & Teens Medical Group Protocol එකට අනුව ධාවනය වන අතර, ප්‍රසූතියෙන් පසු අලුත උපන් Review එකක්, අඛණ්ඩ වර්ධන සහ සංවර්ධන Tracking එකක් සහ සම්පූර්ණ ළමා එන්නත් Schedule එකක් ආවරණය කරනවා. දිවි ආරම්භයේ පලමු මිනිත්තු තුළ අලුත උපන් බබාට වැඩිපුර අවධානයක් ඕන වුනොත් ප්‍රසූතියේදීම Neonatal සහාය ලබාගත හැක.",
    body2: "තියුණු ළමා අසනීප (උණ, හුස්ම ගැනීමේ අපහසුතාවය, Dehydration එකයි වගේ ගැටලු) නියමිත Clinic එකක් වෙනුවෙන් රැදී නොසිට ඕන වෙලාවක බලනවා. අලුත උපන් දරුවන් සඳහා, රෝහලට එන එක ලේසිම පියවර නොවෙයි නම්, Home Visit ක්‍රමයක්ද ලබාගත හැක.",
    strip: [
      { k: "වේලාවන්", v: "පැය 24ම" },
      { k: "Protocol එක", v: "Kids & Teens" },
      { k: "අලුත උපන් සත්කාරය", v: "Home Visits ලබාගත හැක" },
      { k: "තියුණු සත්කාරය", v: "ඕන වෙලාවක" },
    ],
    covers: [
      "ප්‍රසූතියෙන් පසු අලුත උපන් Review එක",
      "වර්ධන සහ සංවර්ධන Tracking එක",
      "සම්පූර්ණ ළමා එන්නත් Schedule එක",
      "ඕන වෙලාවක තියුණු ළමා අසනීප සත්කාරය",
      "අලුත උපන් දරුවන් සඳහා Home Visits",
    ],
    conditions: [
      "ප්‍රසූතියෙන් පසු අලුත උපන් පරීක්ෂාව",
      "දරුවෙකුගේ උණ",
      "දරුවෙකුට හුස්ම ගැනීමේ අපහසුතාවය",
      "දරුවෙකුට Dehydration",
      "සාමාන්‍ය එන්නත්කරණය",
      "වර්ධන හෝ සංවර්ධන ගැටලු",
    ],
    location: "දෙවන මහල, ළමා ඒකකය",
    steps: [
      { no: "01", title: "Book කිරීම", desc: "නියමිත Review එකක් සඳහා ළමා රෝග විශේෂඥ Book කරන්න, නැත්නම් තියුණු අසනීපයක් සඳහා ඕන වෙලාවක කෙලින්ම එන්න." },
      { no: "02", title: "තක්සේරු කිරීම", desc: "ළමා රෝග විශේෂඥයෙක් Kids & Teens Medical Group Protocol එකට අනුව Structured Review එකක් සඳහා දරුවා පරීක්ෂා කරනවා." },
      { no: "03", title: "Track කිරීම", desc: "වර්ධනය, සංවර්ධනය සහ එන්නත් තත්ත්වය කාලයාන්තරයේදී වාර්තා කර Track කරනවා." },
      { no: "04", title: "Follow up කිරීම", desc: "දරුවාගේ අවශ්‍යතාවයට අනුව Follow-up Review එකක් හෝ Home Visit එකක් සලසනවා." },
    ],
    prep: [
      "ඔබේ දරුවාගේ සෞඛ්‍ය සහ එන්නත් වාර්තාව අරගෙන එන්න",
      "මෑත රෝග ලක්ෂණ, ආහාර ගැනීම සහ නින්දේ රටාව සටහන් කරගන්න",
      "වයස අඩු දරුවන් සඳහා ආදරයේ භාණ්ඩයක් අරගෙන එන්න",
      "රෝහල් Visit එකක් අපහසු නම් අලුත උපන් දරුවන් සඳහා Home Visit ක්‍රමය ගැන අහන්න",
    ],
    team: [
      { role: "ළමා රෝග විශේෂඥ ලා", note: "Kids & Teens Medical Group Protocol එකට අනුව අලුත උපන් Review, වර්ධන Tracking සහ තියුණු සත්කාරය මෙහෙයවනවා." },
      { role: "ළමා Nursing කණ්ඩායම", note: "එන්නත්කරණය, වර්ධන පරීක්ෂණ සහ ඕන වෙලාවක තියුණු ළමා සත්කාරයට සහාය වෙනවා." },
      { role: "Neonatal සහායක කණ්ඩායම", note: "අලුත උපන් බබාට වැඩිපුර අවධානයක් ඕන වුනොත් ප්‍රසූතියේදී ළඟින්ම ඉන්නවා." },
      { role: "Home Visit කණ්ඩායම", note: "සලසාගත් අලුත උපන් Home Visits සිදු කරනවා." },
    ],
    faq: [
      { q: "රාත්‍රියේ ළමා රෝග විශේෂඥයෙක් ලබාගත හැකිද?", a: "ඔව්. තියුණු ළමා අසනීප ඕන වෙලාවක බලනවා, නියමිත Clinics වලට විතරක් සීමා නොවෙයි." },
      { q: "Kids & Teens Medical Group Protocol එක කුමක්ද?", a: "ඒක අපේ ළමා කණ්ඩායම අලුත උපන් Review, වර්ධන Tracking සහ එන්නත්කරණය සඳහා අනුගමනය කරන Structured Protocol එකයි." },
      { q: "එන්නත්කරණය මෙතන කරගත හැකිද?", a: "ඔව්. සම්පූර්ණ ළමා එන්නත් Schedule එක ළමා රෝග සත්කාරයේ කොටසක් විදිහට ලබාගත හැක." },
      { q: "රෝහලට එනවා වෙනුවට අලුත උපන් දරුවෙක් Home එකේදී බලාගත හැකිද?", a: "අලුත උපන් දරුවන් සඳහා Home Visit ක්‍රමයක් ලබාගත හැක; Book කරන විට ළමා කණ්ඩායමෙන් අහන්න." },
    ],
  },
  {
    title: "Fertility සහ Embryology",
    directoryTitle: "Fertility සහ Embryology",
    hours: "Appointment එකකින්",
    cta: "Consultation එකක් Book කරන්න",
    desc: "දරුවන් ලැබීමට අපහසුතාවයක් තියෙන ඕන කෙනෙකුට තක්සේරුවක් සහ උපදේශනයක්, දිගටම ගන්නා සත්කාරයේ කොටසක් විදිහට Cycle Monitoring එකක් සහ Embryology සහායක් සමඟ.",
    tags: ["Fertility තක්සේරුව", "Fertility උපදේශනය", "Cycle Monitoring එක", "Embryology සහාය"],
    facts: [
      { k: "වේලාවන්", v: "Appointment එකකින්" },
      { k: "තක්සේරුව", v: "විශේෂඥ වෛද්‍යවරයෙක් මෙහෙයවනවා" },
      { k: "Monitoring එක", v: "Cycle Monitoring එක" },
      { k: "සහාය", v: "Embryology සහාය" },
    ],
    lede: "දරුවන් ලැබීමට අපහසුතාවයක් තියෙන ඕන කෙනෙකුට තක්සේරුවක් සහ උපදේශනයක්, ඔබේ සත්කාරය සමඟින්ම Cycle Monitoring එකක් සහ Embryology සහායක්.",
    aboutHead: "දරුවන් ලැබීමට උත්සාහ කරන ඕන කෙනෙකුට සහාය",
    body1: "පලමු Consultation එකේදී ඔබේ History එක සහ Conception එකට බලපාන Factors තක්සේරු කරනවා, සොයාගැනීම් වල තේරුම සහ සුදුසු විය හැකි Options ගැන කතා කරන උපදේශනයකුත් සමඟ. Partners දෙදෙනෙක් සිටින නම්, තක්සේරුව දෙදෙනාවම ආවරණය කරනවා, හැම සැලැස්මක්ම ඊළඟ පියවරකට එකඟ වෙන්න කලින් ඔබ සමඟ කෙලින්ම සාකච්ඡා කරනවා.",
    body2: "අඛණ්ඩ ප්‍රතිකාරයක් සුදුසු නම්, Cycle Monitoring එකෙන් ඔබේ Cycle එක කාලයාන්තරයේදී Track කරනවා, ඒ සත්කාරයේ කොටසක් විදිහට Embryology සහායද ලබාගත හැක. ඔබේ විශේෂඥ වෛද්‍යවරයා ඉදිරියට යන්න කලින් ඔබේ තත්ත්වයට අදාළව හැම අදියරකදීම ඕන දේ පැහැදිලි කරයි.",
    strip: [
      { k: "Booking එක", v: "Appointment එකකින්" },
      { k: "තක්සේරුව", v: "විශේෂඥ වෛද්‍යවරයෙක් මෙහෙයවනවා" },
      { k: "Monitoring එක", v: "Cycle-Based ක්‍රමයට" },
      { k: "සහාය", v: "Embryology සේවාව" },
    ],
    covers: [
      "Fertility තක්සේරුව",
      "උපදේශනය සහ Options සාකච්ඡාව",
      "Cycle Monitoring එක",
      "Embryology සහාය",
    ],
    conditions: [
      "දරුවන් ලැබීමට අපහසුතාවය",
      "Conception එකට බලපාන අක්‍රමවත් Cycles",
      "Fertility තක්සේරුවක් සඳහා Referral",
      "අඛණ්ඩ Fertility ප්‍රතිකාර සහාය",
    ],
    location: "දෙවන මහල, Fertility Clinic",
    steps: [
      { no: "01", title: "Book කිරීම", desc: "ආරම්භක Fertility තක්සේරුවක් සඳහා Consultation එකක් Book කරන්න." },
      { no: "02", title: "තක්සේරු කිරීම", desc: "History එකක් සහ තක්සේරුවක් සිදු කර, සොයාගැනීම් සාකච්ඡා කරන උපදේශනයකුත් සමඟ; Partners දෙදෙනෙක් සිටින නම්, තක්සේරුව දෙදෙනාවම ආවරණය කරනවා." },
      { no: "03", title: "Monitor කිරීම", desc: "සුදුසු නම්, Cycle Monitoring එක ආරම්භ වී, ඒ සමඟින්ම Embryology සහායද ලබාගත හැක." },
      { no: "04", title: "Review කිරීම", desc: "ඔබේ විශේෂඥ වෛද්‍යවරයා හැම අදියරකදීම ඔබ සමඟ ප්‍රගතිය Review කර ඊළඟ පියවර සාකච්ඡා කරනවා." },
    ],
    prep: [
      "Partner කෙනෙක් සිටින නම්, පලමු Consultation එකට එකට එන එක සම්පූර්ණ පින්තූරයක් ගොඩනගාගන්න උදව් වෙනවා",
      "ඔබේ ඔසප් Cycle History එකේ වාර්තාවක් අරගෙන එන්න",
      "කලින් තිබූ Fertility Test ප්‍රතිඵල අරගෙන එන්න",
      "තක්සේරුවේ හැම අදියරකදීම මොනවද කියලා ප්‍රශ්න සූදානම් කරගන්න",
    ],
    team: [
      { role: "Fertility විශේෂඥ වෛද්‍යවරු", note: "තක්සේරුව, උපදේශනය සහ අඛණ්ඩ ප්‍රතිකාර සැලසුම් කිරීම මෙහෙයවනවා." },
      { role: "Embryology සහායක කණ්ඩායම", note: "Fertility විශේෂඥ වෛද්‍යවරයා සමඟ ප්‍රතිකාර Cycles සඳහා සහාය වෙනවා." },
      { role: "Counsellor කෙනා", note: "තීරණයක් ගන්න කලින් සොයාගැනීම් සහ Options ගැන කතා කරනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Appointments සහ Cycle Monitoring Visits Book කරනවා." },
    ],
    faq: [
      { q: "මගේ Partner එන්නම ඕනද?", a: "අනිවාර්‍ය නෑ. Partner කෙනෙක් සිටින නම්, එකට එනවා සම්පූර්ණ පින්තූරයක් ගොඩනගාගන්න උදව් වෙනවා, ඒත් ආරම්භක තක්සේරුව ඔබ පමණක් සමඟින්ම ඉස්සරහට යනවා." },
      { q: "Cycle Monitoring එකෙන් වෙන්නේ මොකද්ද?", a: "ඒක ඔබේ Cycle එක කාලයාන්තරයේදී Track කරනවා, එහෙනම් ඔබේ විශේෂඥ වෛද්‍යවරයාට වෙන දේ ගැන පින්තූරයක් ගොඩනගාගෙන ඔබ සමඟ Options ගැන කතා කරගන්න පුළුවන්." },
      { q: "උපදේශනය මගේ සත්කාරයේ කොටසක් වේවිද?", a: "ඔව්. සොයාගැනීම් තේරුම්ගෙන තීරණයක් ගන්න කලින් Options ගැන කතා කරගන්න පුළුවන් වෙන්න, උපදේශනය තක්සේරුව සමඟින්ම ලබාදෙනවා." },
      { q: "Appointment එකක් Book කරන්නේ කොහොමද?", a: "Consultation එකක් Book කරන්න, Clinic Coordinator ඔබේ පලමු Visit එක සලසාගනී." },
    ],
  },
  {
    title: "එන්නත් Clinic එක",
    directoryTitle: "එන්නත් Clinic එක",
    hours: "දිනපතා",
    cta: "එන්නතක් Book කරන්න",
    desc: "සම්පූර්ණ ළමා Schedule එකට අමතරව වැඩිහිටි සහ Travel එන්නත්කරණය, Cold Chain Monitoring එකක් සමඟ දිනපතා ධාවනය කරන, හැම Visit එකකදීම මුද්‍රිත වාර්තා Card එකකුත්, ඔබේ ඊළඟ Dose එක සඳහා SMS මතක් කිරීමකුත් සමඟ.",
    tags: ["ළමා Schedule එක", "වැඩිහිටි සහ Travel එන්නත්කරණය", "Cold Chain Monitoring එක", "SMS මතක් කිරීම්"],
    facts: [
      { k: "වේලාවන්", v: "දිනපතා" },
      { k: "ආවරණය", v: "ළමා, වැඩිහිටි සහ Travel" },
      { k: "ගබඩා කිරීම", v: "Cold Chain Monitor කරයි" },
      { k: "මතක් කිරීම්", v: "SMS මගින්" },
    ],
    lede: "ළමා, වැඩිහිටි සහ Travel එන්නත්කරණය දිනපතා ධාවනය කරන, හැම Visit එකකදීම මුද්‍රිත වාර්තා Card එකකුත්, ඔබේ ඊළඟ Dose එකට කලින් SMS මතක් කිරීමකුත් සමඟ.",
    aboutHead: "හැම වයසකටම එන්නත්කරණය, වාර්තා කරලා මතක් කරලා",
    body1: "Clinic එක සම්පූර්ණ ළමා Immunisation Schedule එකට අමතරව වැඩිහිටි සහ Travel එන්නත්කරණයද ධාවනය කරන නිසා, පවුල් වලට හැම Dose එකක්ම එකම තැනක තියාගන්න පුළුවන්, Providers අතර මාරු වෙනවා වෙනුවට. එන්නත් ලැබෙන විට සිට Administration දක්වාම Monitor කරන Cold Chain තත්ත්වයන් යටතේ තියාගන්නවා, එහෙන් හැම Dose එකකම ක්‍රියාකාරීත්වය ආරක්ෂා වෙනවා.",
    body2: "හැම Visit එකක්ම අවසන් වෙන්නේ මොනවද, කවදාද ලබාදුන්නාද කියලා පෙන්වන මුද්‍රිත වාර්තා Card එකකින්, ඔබේ ඊළඟ නියමිත Dose එකට කලින් SMS මතක් කිරීමක්ද එවනවා, එහෙනම් සම්පූර්ණ ළමා Schedule එකක් පුරාවටත් Appointments Track කරගන්න ලේසි වෙනවා.",
    strip: [
      { k: "වේලාවන්", v: "දිනපතා" },
      { k: "Schedule එක", v: "ළමා, වැඩිහිටි සහ Travel" },
      { k: "ගබඩා කිරීම", v: "Cold Chain Monitor කරයි" },
      { k: "මතක් කිරීම්", v: "SMS" },
    ],
    covers: [
      "සම්පූර්ණ ළමා Immunisation Schedule එක",
      "වැඩිහිටි එන්නත්කරණය",
      "Travel එන්නත්කරණය",
      "මුද්‍රිත එන්නත් වාර්තා Cards",
      "SMS Dose මතක් කිරීම්",
    ],
    conditions: [
      "බිළිඳුන් සහ ළමා එන්නත්කරණය",
      "Catch-up එන්නත්කරණය",
      "Travel එන්නත්කරණයට කලින්ම ඕන දේවල්",
      "වැඩිහිටි Booster එන්නත්කරණය",
    ],
    location: "බිම් මහල, එන්නත් Clinic එක",
    steps: [
      { no: "01", title: "Book කිරීම", desc: "දරුවෙකුට, වැඩිහිටියෙකුට හෝ එන Travel අවශ්‍යතාවයකට එන්නතක් Book කරන්න." },
      { no: "02", title: "Review කිරීම", desc: "කාර්ය මණ්ඩලය නියමිත Schedule එක බලා Visit එකට සුදුසු එන්නත් තහවුරු කරනවා." },
      { no: "03", title: "එන්නත් කිරීම", desc: "Dose ලබාදෙන්නේ Cold-Chain-Monitor කරන තොගයෙන්, එතැනම වාර්තා කරලා." },
      { no: "04", title: "වාර්තා කර මතක් කිරීම", desc: "මුද්‍රිත වාර්තා Card එකක් සමඟ යනවා, ඊළඟ නියමිත Dose එකට SMS මතක් කිරීමකුත් සලසනවා." },
    ],
    prep: [
      "දැනට තියෙන එන්නත් වාර්තා Card එකක් තියෙනවා නම් අරගෙන එන්න",
      "එන්නත් වලට කලින් ලැබූ ඕන Reaction එකක් ගැන කාර්ය මණ්ඩලයට කියන්න",
      "Travel එන්නත්කරණය සඳහා, ඔබේ Travel දිනයන් සහ ගමනාන්තය අරගෙන එන්න",
      "SMS මතක් කිරීම් සඳහා ඔබේ Phone Number එක Update කරගෙන තියාගන්න",
    ],
    team: [
      { role: "එන්නත් Clinic Nurses", note: "ළමා, වැඩිහිටි සහ Travel එන්නත් දිනපතා ලබාදෙනවා." },
      { role: "Cold Chain Coordinator කෙනා", note: "ලැබෙන විට සිට Administration දක්වාම එන්නත් ගබඩා තත්ත්වයන් Monitor කරනවා." },
      { role: "Clinic Reception එක", note: "Bookings, වාර්තා Cards නිකුත් කිරීම සහ SMS මතක් කිරීම් හසුරුවනවා." },
    ],
    faq: [
      { q: "වැඩිහිටියන්ටත් මෙතනින්ම Travel එන්නත් ලබාගත හැකිද?", a: "ඔව්. Clinic එක ළමා Schedule එකට අමතරව වැඩිහිටි සහ Travel එන්නත්කරණයද ධාවනය කරනවා." },
      { q: "මගේ දරුවාට ලැබූ එන්නත් වාර්තාවක් මට ලැබෙයිද?", a: "ඔව්. හැම Visit එකකදීම, මොනවද කවදාද ලබාදුන්නාද කියලා පෙන්වන මුද්‍රිත වාර්තා Card එකක් ලබාදෙනවා." },
      { q: "ඊළඟ Dose එක කවදාද කියලා මම දැනගන්නේ කොහොමද?", a: "ඔබේ ඊළඟ නියමිත Dose එකට කලින් SMS මතක් කිරීමක් එවනවා." },
      { q: "ගබඩාවේදී එන්නත් Effective විදිහට තියාගන්නේ කොහොමද?", a: "හැම එන්නතක්ම ලබාදෙන මිනිත්තුව දක්වාම ලැබෙන විට සිට Monitor කරන Cold Chain තත්ත්වයන් යටතේ තියාගන්නවා." },
    ],
  },
];
