// Sinhala overlay for surgical.ts (7 of the catalog's 36 services:
// general-surgery, orthopaedic-surgery, ent-surgery, urology, ophthalmology,
// neurosurgery, endoscopy).
//
// This file has no pharmacy-counter vocabulary at all: "Stock", "Delivery",
// "Counter", "Prescription", "Pharmacist", "Order", "File" and "WhatsApp"
// (grep-checked, case-insensitive, plurals included) do not occur anywhere
// in surgical.ts. The only two "record" hits ("recorded before your
// procedure", "record a baseline") are the ordinary clinical-testing verb
// (writing down a hearing-test result), not the pharmacy counter's Record;
// both translate as ordinary prose.
//
// "Anaesthesia"/"Anaesthetist" stay English in flowing prose, the
// established site-wide register (facilities.si.ts's own header, reused by
// network/pharmacy/international-care, and emergency.si.ts's own bare
// "Anaesthetic"). "Surgical" translates in full here ("ශල්‍ය"/"ශල්‍යකර්ම"),
// consistently across all five occurrences, matching emergency.si.ts's own
// practice for the same adjective. "Theatre" does NOT translate here: every
// occurrence in this file (body prose, a step description, and two
// team[*].role fields, five in total) stays bare English "Theatre". This
// diverges from emergency.si.ts, which translates "Theatre" throughout its
// own body prose as "ශල්‍යාගාරය"/"ශල්‍යාගාර ස්ථානයේම" (grep-verified: zero
// occurrences of "ශල්‍යාගාර" anywhere in this file's content). The two
// files' handling of "Theatre" has not been reconciled; treat that as an
// open question, not a precedent either way. "Recovery" stays English only
// in the fixed compound "Recovery Bay"/
// "Recovery nurse(s)", the same shape emergency.si.ts's own "Resuscitation
// Bay" already uses for a named ward area, not as a free-standing adjective
// elsewhere.
//
// "Consultant" translates to විශේෂඥ වෛද්‍යවරයා as an ordinary noun
// (emergency.si.ts's own rule, "on-call විශේෂඥ වෛද්‍යවරු"). It never occurs
// here as a singular nameplate title directly before one named role (the
// only pattern that would keep it bare, per media/data/content.si.ts's own
// KEEPS_ENGLISH), so there is no such exception in this file.
//
// Specific specialist-title role nouns (the person, not the field) stay
// English with a Sinhala particle, matching diagnostics.si.ts's own
// explicit rule for "Radiographer"/"Sonographer"/"Radiologist": "Surgeon(s)",
// "Anaesthetist(s)", "Urologist(s)", "Ophthalmologist(s)", "Optometrist(s)",
// "Neurosurgeon(s)", "Gastroenterologist(s)", "Radiologist(s)",
// "Radiographer(s)", "Audiologist(s)", "Physiotherapist(s)", "Sonographer(s)"
// and "Coordinator" all follow the same shape. "Doctor"/"Physician" (the
// generic noun) still translate in full, matching emergency.si.ts and
// diagnostics.si.ts.
//
// Procedure and equipment names stay English where that is what a Sri
// Lankan doctor actually says, matching facilities.si.ts's own established
// "Cataract", "Gastroscopy" and "Colonoscopy": "Laparoscopic"/"Laparoscopy",
// "Arthroscopy", "Gastroscopy", "Colonoscopy", "Biopsy", "Polypectomy",
// "Endoscopy", "Cataract" and "Grommets" all stay bare English throughout,
// applied to every sibling in each array so there is no odd one out. "ENT"
// stays English as an abbreviation, the same class "OPD"/"ICU" already are.
// Ordinary clinical nouns with a common, everyday Sinhala equivalent
// translate in full instead of staying bare: "fracture(s)" -> "ඇටකැඩීම්"
// (the same word emergency.si.ts's own covers list already uses for the
// identical fact), "kidney stones" -> "වකුගඩු ගල්", "bladder" ->
// "මුත්‍රාශය", "urinary tract" -> "මුත්‍රා පද්ධතිය", "brain"/"spine" ->
// "මොළය"/"කොඳු ඇට පෙළ", "glasses" -> "කණ්ණාඩි". "Hernia", "Gallbladder",
// "Appendix", "Ligament", "Meniscus", "Rotator cuff", "Prostate" and
// "Retina"/"Retinal" stay bare English, the same code-mixed register
// emergency.si.ts's own covers list already applies to "Dehydration" and
// "Allergic Reactions" sitting inside otherwise-Sinhala sentences.
//
// A short, isolated `facts`/`strip` label with a well-known Sinhala clinical
// equivalent translates even where the identical word stays bare in flowing
// prose two lines away (the same distinction facilities.si.ts's own header
// draws for "Protocol"/"Instrument sets"/"Consumables" as bare table
// labels, and the same fix this feature's own emergency.si.ts applied to
// "Monitoring"/"Nursing"/"Rounds" as `strip[*].k` values). This file applies
// it to every bare one/two-word `facts[*].k`/`strip[*].k` that would
// otherwise be byte-identical to its English source: "Anaesthesia" ->
// "නිර්වින්දනය", "Consumables" -> "පරිභෝජ්‍ය ද්‍රව්‍ය" (facilities.si.ts's
// own corrected form for this exact word), "Lists" -> "ලැයිස්තු",
// "Sedation" -> "සන්සුන් කිරීම", "Imaging" -> "රූප ගත කිරීම", "Booking"/
// "Consultation" -> "වෙන් කිරීම"/"විමසීම", "Consult" -> "විමසීම",
// "Review" -> "සමාලෝචනය", "Follow-up" -> "පසු විපරම", "Reporting" ->
// "වාර්තා කිරීම". Every one of these words stays bare English in flowing
// desc/body/faq prose throughout this file (e.g. "Follow-up Appointment
// එකක්", "Book කිරීම"), matching the site-wide register; only the isolated
// bare label translates, per the same rule that already governs
// "Anaesthesia" and "Consumables" above.
//
// Every number (fasting hours, stay lengths, follow-up timing, age ranges)
// is unchanged from the English base.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const surgicalServices = [
  {


    hours: "නියමිත Lists",

    desc: "Hernia, Gallbladder සහ Appendix ශල්‍යකර්ම සඳහා Elective Operating Lists, පුළුවන් හැම විටකම Laparoscopically කරන, එහෙන් සුවවීම කෙටි වෙනවා. විශේෂඥ වෛද්‍යවරයෙක් මෙහෙයවන නිර්වින්දනය සහ රෝගියෙකුට එක් Recovery Nurse කෙනෙක් Anaesthetic Room සිට Discharge දක්වා සත්කාරය රැගෙන යනවා.",
    tags: ["Laparoscopic ශල්‍යකර්මය", "Hernia අලුත්වැඩියාව", "Gallbladder ඉවත් කිරීම", "Appendix ශල්‍යකර්මය"],
    facts: [
      { k: "නිර්වින්දනය", v: "විශේෂඥ වෛද්‍යවරයෙක් මෙහෙයවනවා" },
      { k: "ප්‍රවේශය", v: "සුදුසු නම් Laparoscopic" },
      { k: "පරිභෝජ්‍ය ද්‍රව්‍ය", v: "රෝගියෙකුට Single-use" },
      { k: "සුවවීම", v: "රෝගියෙකුට Nurse කෙනෙක් Assign කරලා" },
    ],
    lede: "Hernia, Gallbladder සහ Appendix ගැටලු සඳහා Elective ශල්‍යකර්මය, ඔබව කලින් ගෙදර යවන Laparoscopic ප්‍රවේශය පුළුවන් හැම විටකම යොදාගෙන.",

    body1: "Hernia Repairs, Gallbladder ඉවත් කිරීම සහ Appendix ශල්‍යකර්මය නියමිත Operating Lists වලට Book කරනවා, Open ශල්‍යකර්මයකට සාපේක්ෂව සුවවීම කෙටි කර ලකුණු අඩු කරන Laparoscopic ප්‍රවේශය පුළුවන් හැම විටකම යොදාගෙන. විශේෂඥ Anaesthetist කෙනෙක් ශල්‍යකර්මයට කලින් හැම රෝගියෙක්ම Review කර, පුරාවටම නිර්වින්දනය සඳහා වගකිව යුතුව ඉන්නවා.",
    body2: "Instruments සහ Consumables හැම රෝගියෙකුටම Single-use, ඔබ Theatre එකෙන් පිටවෙන මොහොතේ සිට ගෙදර යන්න හෝ Ward Bed එකකට සූදානම් වෙනකම් ඔබව බලාගන්න Recovery Nurse කෙනෙක් Assign කරලා ඉන්නවා. Discharge එකට කලින් Wound-care උපදෙස් සහ Follow-up දිනයක් සමඟ යනවා.",
    strip: [
      { k: "ප්‍රවේශය", v: "පලමුව Laparoscopic" },
      { k: "නිර්වින්දනය", v: "විශේෂඥ වෛද්‍යවරයෙක් මෙහෙයවනවා" },
      { k: "ලැයිස්තු", v: "නියමිත" },
      { k: "සුවවීම", v: "රෝගියෙකුට Nurse කෙනෙක්" },
    ],
    covers: [
      "Hernia අලුත්වැඩියාව",
      "Gallbladder ඉවත් කිරීම",
      "Appendix ශල්‍යකර්මය",
      "සුළු Lump සහ Cyst ඉවත් කිරීම",
      "තුවාල සහ Abscess කළමනාකරණය",
    ],
    conditions: [
      "Inguinal සහ Umbilical Hernia",
      "Gallbladder ගල්",
      "තියුණු Appendicitis",
      "බුරුල් බිත්ති Lumps",
      "සම Abscesses",
    ],
    location: "තුන්වන මහල, සාමාන්‍ය ශල්‍ය ඒකකය",
    steps: [
      { desc: "Surgeon කෙනෙක් ඔබව පරීක්ෂා කර, ඕන Scans Review කර, ඔබේ තත්ත්වයට Laparoscopic හෝ Open ප්‍රවේශය සුදුසුද කියලා පැහැදිලි කරනවා." },
      { desc: "ඔබේ ශල්‍යකර්මය List එකකට Schedule කරලා, ඉස්සරහ දින කීපයකදී Pre-operative පරීක්ෂණ සලසනවා." },
      { desc: "විශේෂඥ නිර්වින්දනයයි කැපවුනු Theatre කණ්ඩායමයි ක්‍රියාපටිපාටිය පුරාවටම ඔබව රැගෙන යනවා." },
      { desc: "Assign කරපු Recovery Nurse කෙනෙක් ඉන් පස්සේ ඔබව Monitor කරනවා, ලිඛිත Wound-care සහ Follow-up උපදෙස් සමඟ යනවා." },
    ],
    prep: [
      "ඇතුළත් වන වේලාවට කලින් උපදෙස් අනුව උපවාසය කරන්න",
      "ඔබ දැනට ගන්නා බෙහෙත් ලැයිස්තුව අරගෙන එන්න",
      "ඉන් පස්සේ ගෙදර යන්න කෙනෙක් සලසාගන්න",
      "Blood Thinners නවත්වන එක ගැන කලින්ම අහන්න",
    ],
    team: [
      { role: "සාමාන්‍ය Surgeon ලා", note: "Hernia, Gallbladder සහ Appendix ශල්‍යකර්මය සඳහා Consultations සහ Operating Lists මෙහෙයවනවා." },
      { role: "විශේෂඥ Anaesthetist ලා", note: "හැම රෝගියෙක්ම කලින් Assess කර ශල්‍යකර්මය තුළ නිර්වින්දනය සඳහා වගකිව යුතුව ඉන්නවා." },
      { role: "Theatre Nursing කණ්ඩායම", note: "Single-use Instruments සූදානම් කර හැම Case එකකදීම Surgeon ට සහාය වෙනවා." },
      { role: "Recovery Nurse ලා", note: "ශල්‍යකර්මය අවසන් වීමේ සිට Discharge හෝ Ward Transfer දක්වා රෝගීන් Monitor කරන්න Assign කරලා." },
    ],
    faq: [
      { q: "මගේ ශල්‍යකර්මය Laparoscopically කරයිද?", a: "සුදුසු නම්, ඔව්, Laparoscopic ප්‍රවේශයක් යොදාගන්නවා, මොකද එයින් සාමාන්‍යයෙන් වේදනාව අඩුයි ඉක්මනින්ම ගෙදර යාමකුත් තියෙනවා. ඔබේ තත්ත්වයට Open ශල්‍යකර්මය හොඳම ප්‍රවේශයනම් Surgeon ඒක පැහැදිලි කරයි." },
      { q: "නිර්වින්දනය දෙන්නේ කවුද?", a: "විශේෂඥ Anaesthetist කෙනෙක් ඔබව කලින් Assess කර ශල්‍යකර්මය පුරාවටම ඔබේ නිර්වින්දනය සඳහා වගකිව යුතුව ඉන්නවා." },
      { q: "මට රෝහලේ කීයක් ඉන්න ඕනද?", a: "බොහෝ Hernia, Gallbladder සහ Appendix ශල්‍යකර්ම Day Case හෝ එක රැයක් රැදී සිටිනවා; ඔබේ Consultation එකේදී Surgeon බලාපොරොත්තු විය යුතු දේ තහවුරු කරයි." },
      { q: "ශල්‍යකර්මයට කෙළින්ම පස්සේ මොකද වෙන්නේ?", a: "Ward Bed එකකට හෝ ලිඛිත උපදෙස් සමඟ Discharge වෙනකම්, ඔබ අවදිවෙනකොට බලාගන්න Recovery Nurse කෙනෙක් Assign කරලා ඉන්නවා." },
    ],
  },
  {


    hours: "Day Case සහ Inpatient",

    desc: "ඇටකැඩීම්, ක්‍රීඩා තුවාල සහ Joint ගැටලු සඳහා Day Case සහ Inpatient ශල්‍යකර්මය, ඒම Corridor එකේම Imaging ලබාගත හැක, ඔබ යන්න කලින්ම Physiotherapy සැලැස්මකුත් එකඟ වෙනවා.",
    tags: ["ඇටකැඩීම් ශල්‍යකර්මය", "Arthroscopy සැත්කම", "ක්‍රීඩා තුවාල", "Physiotherapy සැලසුම් කිරීම"],
    facts: [
      { k: "රූප ගත කිරීම", v: "ඒම Corridor එකේම" },
      { k: "ලැයිස්තු", v: "Day Case සහ Inpatient" },
      { k: "Physiotherapy සැලසුම", v: "Discharge එකට කලින් සැලසුම් කර" },
      { k: "පසු විපරම", v: "Discharge එකේදී Schedule කරයි" },
    ],
    lede: "ඇටකැඩීම්, ක්‍රීඩා තුවාල සහ Joint ගැටලු සඳහා ශල්‍යකර්මය, පියවර ගාණකින් Imaging සහ ගෙදර යන්න කලින්ම එකඟ වෙන Physiotherapy සැලැස්මක් සමඟ.",

    body1: "ඇටකැඩීම්, Ligament තුවාල සහ Joint ගැටලු Clinic එකේ ම Corridor එකේදීම Imaging අරගෙන තක්සේරු කරනවා, එහෙනම් වෙනම තැනකින් ප්‍රතිඵල ලැබෙනකම් රැදී නොසිට පලමු Visit එකේදීම සැලැස්මක් එකඟ වෙන්න පුළුවන්. ශල්‍යකර්මය Day-case Arthroscopy සිට Inpatient ඇටකැඩුම් Fixation දක්වා විහිදෙනවා.",
    body2: "රෝහලෙන් යන්න කලින්, Physiotherapist කෙනෙක් ඔබ සමඟ Rehabilitation සැලැස්මකට එකඟ වෙනවා, ගමන් කිරීම, බර දැරීම සහ ගෙදර පටන් ගන්න Exercises ආවරණය කරමින්. ඔබේ Surgeon ට සුවවීම සහ ඒ සැලැස්මට එරෙහිව ප්‍රගතිය පරීක්ෂා කරගන්න Follow-up Appointment එකකුත් සලසනවා.",
    strip: [
      { k: "රූප ගත කිරීම", v: "ඒම Corridor එකේම" },
      { k: "ලැයිස්තු", v: "Day Case සහ Inpatient" },
      { k: "Physio සැලැස්ම", v: "Discharge එකට කලින්" },
      { k: "පසු විපරම", v: "Discharge එකේදී සලසයි" },
    ],
    covers: [
      "ඇටකැඩුම් Fixation",
      "දණහිසේ සහ උරහිසේ Arthroscopy",
      "ක්‍රීඩා තුවාල Repair",
      "Ligament සහ Tendon ශල්‍යකර්මය",
      "Joint වේදනා තක්සේරුව",
    ],
    conditions: [
      "ඇටකැඩීම්",
      "ඉරුණු Ligaments",
      "Meniscus හැලීම්",
      "Rotator Cuff තුවාල",
      "ක්‍රීඩාවට අදාළ Joint වේදනාව",
    ],
    location: "පලමු මහල, අස්ථි ඒකකය",
    steps: [
      { desc: "අස්ථි Surgeon කෙනෙක් තුවාලය පරීක්ෂා කර ඒම Corridor එකේම Imaging සලසනවා." },
      { desc: "ඇටකැඩීම හෝ තුවාලයට ඕන දේට අනුව ශල්‍යකර්මය Day Case හෝ Inpatient විදිහට Book කරනවා." },
      { desc: "Fixation, Arthroscopy හෝ Repair අස්ථි Theatre කණ්ඩායම විසින් සිදු කරනවා." },
      { desc: "ඔබ යන්න කලින් Physiotherapist කෙනෙක් ඔබ සමඟ ගමන් සහ Exercise සැලැස්මකට එකඟ වෙනවා." },
    ],
    prep: [
      "කලින් තිබූ Scans හෝ X-rays ඔබ සමඟ අරගෙන එන්න",
      "ශල්‍යකර්මයෙන් පස්සේ පලමු දින කීපය සඳහා ගෙදර සහාය සලසාගන්න",
      "Crutches හෝ Brace එකක් ගැන කලින්ම අහන්න",
      "Dressing හෝ Splint එකක් උඩින් ගැළපෙන ලෙළපෙන ඇඳුම් ඇඳගන්න",
    ],
    team: [
      { role: "අස්ථි Surgeon ලා", note: "ඇටකැඩීම් සහ Joint තුවාල තක්සේරු කර Fixation සහ Arthroscopic ශල්‍යකර්මය සිදු කරනවා." },
      { role: "Radiographer ලා", note: "ඒම Corridor එකේම Imaging ලබාදෙනවා, එහෙනම් ප්‍රතිඵල පලමු Visit එකේදීම ලැබෙනවා." },
      { role: "Physiotherapist ලා", note: "Discharge එකට කලින් හැම රෝගියෙක් සමඟම Rehabilitation සැලැස්මකට එකඟ වෙනවා." },
      { role: "අස්ථි Nursing කණ්ඩායම", note: "Ward එකේ ශල්‍යකර්මයට කලින් සහ පස්සේ සත්කාරයට සහාය වෙනවා." },
    ],
    faq: [
      { q: "මට ශල්‍යකර්මයක්ම ඕනද, Physiotherapy විතරක්ම ඇති ද?", a: "ඒක තුවාලයට අනුරූපයි. බොහෝ Sprains සහ සුළු හැලීම් Physiotherapy වලට විතරක්ම හොඳින් Respond කරනවා; ඇටකැඩීම් සහ තදබල Ligament හැලීම් සාමාන්‍යයෙන් ශල්‍යකර්මය සඳහා තක්සේරු කරනවා." },
      { q: "Imaging කොහොම ඉක්මනින් කරගන්න පුළුවන්ද?", a: "Imaging Clinic එකේම Corridor එකේදීම කරනවා, එහෙනම් බොහෝ රෝගීන්ට එකම Visit එකේදීම Scan එකයි Surgeon ට හමුවීමයි කරගන්න පුළුවන්." },
      { q: "මම එදිනම ගෙදර යනවද?", a: "බොහෝ Arthroscopic ක්‍රියාපටිපාටි Day Case. ඇටකැඩුම් Fixation සහ ලොකු Repairs සාමාන්‍යයෙන් කෙටි Inpatient රැඳී සිටීමක් අවශ්‍ය කරනවා, ඔබේ Surgeon කලින්ම ඒක තහවුරු කරයි." },
      { q: "Physiotherapy පටන් ගන්නේ කවදාද?", a: "Discharge වෙන්න කලින් Physiotherapist කෙනෙක් සමඟ සැලැස්මකට එකඟ වෙනවා, එහෙනම් ගෙදර පලමු දිනයේ සිටම මොනවද කරන්න ඕන කියලා ඔබ දන්නවා." },
    ],
  },
  {


    hours: "සතිපතා Lists",

    desc: "Tonsils, Sinuses සහ ශ්‍රවණ ගැටලු සඳහා ශල්‍යකර්මය, සතිපතා වැඩිහිටි සහ ළමා Lists මත ධාවනය කරන, ශ්‍රවණයට බලපාන ඕන ක්‍රියාපටිපාටියකට කලින් සහ පස්සේ ශ්‍රවණවේද තක්සේරුවකුත් සමඟ.",
    tags: ["Tonsil ශල්‍යකර්මය", "Sinus ශල්‍යකර්මය", "Grommets තැබීම", "ශ්‍රවණවේද තක්සේරුව"],
    facts: [
      { k: "ලැයිස්තු", v: "සතිපතා, වැඩිහිටි සහ ළමා" },
      { k: "ශ්‍රවණවේදය", v: "කලින් සහ පස්සේ තක්සේරු කරයි" },
      { k: "වයස් පරාසය", v: "ළමයි සහ වැඩිහිටි" },
      { k: "විමසීම", v: "කලින්ම Book කරයි" },
    ],
    lede: "Tonsils, Sinuses සහ Grommets සඳහා ශල්‍යකර්මය, ශ්‍රවණයට අදාළ ඕන ක්‍රියාපටිපාටියකට කලින් සහ පස්සේ ශ්‍රවණවේද පරීක්ෂාවකුත් සමඟ.",

    body1: "සතිපතා Operating Lists Tonsillectomy, Sinus ශල්‍යකර්මය සහ Grommet Insertion ළමයින්ට සහ වැඩිහිටියන්ට දෙදෙනාටම ආවරණය කරනවා. ක්‍රියාපටිපාටියක් ශ්‍රවණයට බලපානවා විය හැකි නම්, කලින්ම Baseline එකක් තියාගන්න ශ්‍රවණවේද තක්සේරුවක් කර, ප්‍රතිඵලය තහවුරු කරන්න පස්සේත් ආයෙත් කරනවා.",
    body2: "ළමා Lists වැඩිහිටි Lists වලින් වෙනම ධාවනය කරන්නේ, ළමයින්ට සහ ඔවුන්ගේ දෙමව්පියන්ට ගැළපෙන කාර්ය මණ්ඩලය සහ වේලාවන් සමඟ. ශල්‍යකර්මයට කලින්ම Consultation එකකින් බලාපොරොත්තු විය යුතු දේ, සුවවීමට කී කාලයක් යනවද, Follow-up එක කොහොමද වේවිද කියලා ආවරණය කරනවා.",
    strip: [
      { k: "ලැයිස්තු", v: "සතිපතා" },
      { k: "ලැයිස්තු ආවරණය", v: "වැඩිහිටි සහ ළමා" },
      { k: "ශ්‍රවණවේදය", v: "කලින් සහ පස්සේ" },
      { k: "වෙන් කිරීම", v: "Consultation එකකින්" },
    ],
    covers: [
      "Tonsillectomy ශල්‍යකර්මය",
      "Sinus ශල්‍යකර්මය",
      "Grommet තැබීම",
      "ශ්‍රවණ තක්සේරුව",
      "නාසික ශ්වාස ගැටලු",
    ],
    conditions: [
      "නැවත නැවත එන Tonsillitis",
      "අඛණ්ඩ Sinusitis",
      "ළමයින්ගේ Glue Ear",
      "ශ්‍රවණ අඩුවීම",
      "නාසික අවහිරතාව",
    ],
    location: "දෙවන මහල, ENT ඒකකය",
    steps: [
      { desc: "ENT Surgeon කෙනෙක් ඔබව පරීක්ෂා කර, ශ්‍රවණය සම්බන්ධ නම් ශ්‍රවණවේද තක්සේරුවක් සලසනවා." },
      { desc: "ඔබේ ක්‍රියාපටිපාටිය Book කරන්න කලින් Baseline ශ්‍රවණ පරීක්ෂණ වාර්තා කරනවා." },
      { desc: "ශල්‍යකර්මය සුදුසු ලෙස සතිපතා වැඩිහිටි හෝ ළමා List එකක් මත සිදු කරනවා." },
      { desc: "Follow-up ශ්‍රවණවේද පරීක්ෂාවක් සහ Consultation එකක් සුවවීම සහ ශ්‍රවණ ප්‍රතිඵලය තහවුරු කරයි." },
    ],
    prep: [
      "කලින් තිබූ ශ්‍රවණ පරීක්ෂණ ප්‍රතිඵල අරගෙන එන්න",
      "ළමයින් සඳහා, Visit එක පුරාවටම දෙමව්පියෙකුට ඉන්න සලසාගන්න",
      "මෑතකදී තිබූ කන Infection හෝ ශ්‍රවණ වෙනස්කම් සටහන් කරගන්න",
      "Book කරන විට දුන් උපවාස උපදෙස් අනුගමනය කරන්න",
    ],
    team: [
      { role: "ENT Surgeon ලා", note: "සතිපතා වැඩිහිටි සහ ළමා Lists මත Tonsil, Sinus සහ Grommet ශල්‍යකර්මය සිදු කරනවා." },
      { role: "Audiologist ලා", note: "ශ්‍රවණයට බලපානවා විය හැකි ඕන ක්‍රියාපටිපාටියකට කලින් සහ පස්සේ ශ්‍රවණය තක්සේරු කරනවා." },
      { role: "ළමා Nursing කණ්ඩායම", note: "වෙනම ළමා Lists තුළින් ළමයින්ට සහ දෙමව්පියන්ට සහාය වෙනවා." },
      { role: "ENT Clinic Coordinator කෙනා", note: "Consultations, ශ්‍රවණවේද Slots සහ Follow-up Appointments සලසනවා." },
    ],
    faq: [
      { q: "ළමයින්ට වෙනම List එකක් තියෙනවද?", a: "ඔව්. ළමා Cases ඔවුන්ටම වෙන් වූ Lists මත ධාවනය කරන්නේ, ළමයින්ට සහ දෙමව්පියන්ට ගැළපෙන කාර්ය මණ්ඩලය සහ වේලාවන් සමඟ." },
      { q: "ශල්‍යකර්මයට කලින් මගේ ශ්‍රවණය පරීක්ෂා කරයිද?", a: "ක්‍රියාපටිපාටියක් ශ්‍රවණයට බලපානවා විය හැකි නම්, Baseline එකක් වාර්තා කරන්න කලින්ම ශ්‍රවණවේද තක්සේරුවක් කර, ප්‍රතිඵලය පස්සේත් ආයෙත් පරීක්ෂා කරයි." },
      { q: "Consultation එකක් Book කරන්නේ කොහොමද?", a: "ENT Consult එකක් Book කරන්න, Surgeon කෙනෙක් ඔබව පරීක්ෂා කර Options ගැන කතා කරන්න කලින් අවශ්‍ය Imaging හෝ ශ්‍රවණවේද පරීක්ෂණ සලසනවා." },
      { q: "ශල්‍යකර්මයට කීයක් Wait කරන්න ඕනද?", a: "Operating Lists සතිපතා ධාවනය වන අතර, ඔබේ Consultation එකයි Pre-operative පරීක්ෂණයි අවසන් වූ පසු Surgeon ඔබට බලාපොරොත්තු විය හැකි දිනයක් දෙනවා." },
    ],
  },
  {


    hours: "සතිපතා Lists",

    desc: "වකුගඩු ගල්, Prostate ගැටලු සහ මුත්‍රා පද්ධති තත්ත්ව සඳහා තක්සේරුව සහ ශල්‍යකර්මය, ඔබේ පලමු Visit එකේදීම Ultrasound සහ Flow Studies සිදු කරන.",
    tags: ["වකුගඩු ගල්", "Prostate ශල්‍යකර්මය", "මුත්‍රා පද්ධතිය", "Flow පරීක්ෂණ"],
    facts: [
      { k: "ලැයිස්තු", v: "සතිපතා" },
      { k: "පලමු Visit එක", v: "Ultrasound සහ Flow Studies" },
      { k: "වයස් පරාසය", v: "වැඩිහිටි" },
      { k: "වෙන් කිරීම", v: "Consultation එකකින්" },
    ],
    lede: "වකුගඩු ගල්, Prostate ගැටලු සහ මුත්‍රා පද්ධති තත්ත්ව සඳහා තක්සේරුව සහ ශල්‍යකර්මය, ඔබේ පලමු Visit එකේදීම කරන Ultrasound සහ Flow Studies සමඟ.",

    body1: "වකුගඩු සහ මුත්‍රාශයේ ගල්, Prostate විශාල වීම සහ නැවත නැවත එන මුත්‍රා පද්ධති ගැටලු පලමු Consultation එකේදීම Ultrasound සහ මුත්‍රා Flow Studies සමඟ තක්සේරු කරනවා, එහෙනම් ප්‍රතිඵල සඳහා වෙනම Visit එකක් නැතුවම ප්‍රතිකාර සැලැස්මක් සාකච්ඡා කරගත හැක.",
    body2: "ශල්‍යකර්මයක් අවශ්‍ය නම්, ක්‍රියාපටිපාටි සතිපතා Operating Lists වලට Book කරනවා. ඔබේ Surgeon ගල් ඉවත් කිරීමේ සිට Prostate ශල්‍යකර්මය දක්වා ඔබේ තත්ත්වයට සුදුසු ප්‍රවේශය, බලාපොරොත්තු විය යුතු සුවවීම සහ Follow-up එකත් සමඟ පැහැදිලි කරයි.",
    strip: [
      { k: "ලැයිස්තු", v: "සතිපතා" },
      { k: "පලමු Visit එක", v: "Ultrasound සහ Flow Studies" },
      { k: "විමසීම", v: "Booking එකකින්" },
      { k: "පසු විපරම", v: "ශල්‍යකර්මයෙන් පස්සේ සලසයි" },
    ],
    covers: [
      "වකුගඩු සහ මුත්‍රාශයේ ගල් ප්‍රතිකාරය",
      "Prostate ශල්‍යකර්මය",
      "මුත්‍රා පද්ධති Infection තක්සේරුව",
      "මුත්‍රා Flow Studies",
      "මුත්‍රාශය ගැටලු",
    ],
    conditions: [
      "වකුගඩු ගල්",
      "විශාල වූ Prostate",
      "නැවත නැවත එන මුත්‍රා Infection",
      "මුත්‍රයේ ලේ",
      "මුත්‍රා රැදීම",
    ],
    location: "පලමු මහල, Urology Clinic",
    steps: [
      { desc: "Urologist කෙනෙක් පලමු Visit එකේදීම ඔබේ History ගෙන ඔබව පරීක්ෂා කරනවා." },
      { desc: "Ultrasound සහ මුත්‍රා Flow Studies එදිනම සිදු කරනවා." },
      { desc: "ඔබේ Surgeon සොයාගැනීම් සාකච්ඡා කර ප්‍රතිකාර හෝ ශල්‍ය සැලැස්මකට ඔබ සමඟ එකඟ වෙනවා." },
      { desc: "අවශ්‍ය නම් ශල්‍යකර්මය සතිපතා List එකකට Book කරලා, පස්සේ Follow-up එකකුත් සලසනවා." },
    ],
    prep: [
      "Flow Study එකක් සැලසුම් කරලා තියෙනවනම් සුවපහසුව පිරුණු මුත්‍රාශයක් සමඟ එන්න",
      "ඔබ දැනට ගන්නා බෙහෙත් ලැයිස්තුවක් අරගෙන එන්න",
      "මෑතකදී තිබූ මුත්‍රා Test ප්‍රතිඵල සටහන් කරගන්න",
      "ශල්‍යකර්මයට කලින් Blood Thinners නවත්වන එක ගැන අහන්න",
    ],
    team: [
      { role: "Urologist ලා", note: "ගල්, Prostate සහ මුත්‍රා පද්ධති තත්ත්ව තක්සේරු කර සතිපතා Lists මත ශල්‍යකර්මය සිදු කරනවා." },
      { role: "Sonographer ලා", note: "පලමු Consultation එකේදීම Ultrasound Scans කරනවා." },
      { role: "Urology Nursing කණ්ඩායම", note: "Flow Studies, Pre-operative පරීක්ෂණ සහ ශල්‍යකර්මයෙන් පස්සේ සත්කාරයට සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Consultations සහ ශල්‍ය Slots Book කරනවා." },
    ],
    faq: [
      { q: "එදිනම ප්‍රතිඵල ලැබෙයිද?", a: "Ultrasound සහ Flow Studies පලමු Visit එකේදීම සිදු කරනවා, එහෙනම් ඔබේ Urologist ට සාමාන්‍යයෙන් එදිනම සොයාගැනීම් ඔබ සමඟ සාකච්ඡා කරගත හැක." },
      { q: "Flow Study එකකට මට සූදානම් වෙන්න ඕනද?", a: "සුවපහසුව පිරුණු මුත්‍රාශයක් සමඟ එන්න කියලා අහයි; Clinic එකෙන් Book කරන විට වේලාව පැහැදිලි කරයි." },
      { q: "ගල් සඳහා හැම විටම ශල්‍යකර්මය ඕනද?", a: "හැම විටම නෑ. සමහර ගල් තමන්ම යනවා, නැත්නම් බෙහෙතින් කළමනාකරණය කරනවා. ඔබේ තත්ත්වයට ගැළපෙන Options ඔබේ Urologist පැහැදිලි කරයි." },
      { q: "ශල්‍යකර්මය කොහොම ඉක්මනින් Book කරගන්න පුළුවන්ද?", a: "ක්‍රියාපටිපාටි සතිපතා Lists මත ධාවනය වන අතර, තක්සේරුව අවසන් වූ පසු ඔබේ Urologist බලාපොරොත්තු විය හැකි දිනයක් දෙනවා." },
    ],
  },
  {


    hours: "සතිපතා Lists",

    desc: "අක්ෂි තක්සේරුව සහ Day-case Cataract ශල්‍යකර්මය, ඔබේ පලමු Visit එකේදීම Refraction, Pressure පරීක්ෂණ සහ Retinal තක්සේරුවකුත් සමඟ, ශල්‍යකර්මයෙන් පසුදින Review එකකුත් සමඟ.",
    tags: ["Cataract ශල්‍යකර්මය", "Refraction පරීක්ෂාව", "Pressure පරීක්ෂණ", "Retinal තක්සේරුව"],
    facts: [
      { k: "ලැයිස්තු", v: "සතිපතා" },
      { k: "ශල්‍යකර්මය", v: "Day Case එකක්" },
      { k: "සමාලෝචනය", v: "පසුදින" },
      { k: "පලමු Visit එක", v: "Refraction, Pressure සහ Retinal පරීක්ෂාව" },
    ],
    lede: "අක්ෂි තක්සේරුව සහ Day-case Cataract ශල්‍යකර්මය, ඔබේ පලමු Visit එකේදීම සම්පූර්ණ පරීක්ෂාවකුත් හරියටම පසුදින Review එකකුත් සමඟ.",

    body1: "පලමු Visit එකේදී Refraction, අක්ෂි Pressure පරීක්ෂණ සහ Retinal තක්සේරුවක් සිදු කරනවා, Cataract ශල්‍යකර්මය ඔබට හරියටම සුදුසුද කියලා තීරණය කරන්න කලින් ඔබේ Ophthalmologist ට සම්පූර්ණ පින්තූරයක් දෙනවා. Lens Options මේ අවස්ථාවේදීම ශල්‍ය සැලැස්මේ කොටසක් විදිහට සාකච්ඡා කරගත හැක.",
    body2: "Cataract ශල්‍යකර්මය Day Case එකක් විදිහට කරනවා, Drops සහ ලිඛිත උපදෙස් සමඟ එදිනම ගෙදර යනවා. පසුදින Review එකකින් සුවවීම සහ දෘෂ්ටිය පරීක්ෂා කර, අවශ්‍ය නම් තව Follow-up එකක් සලසනවා.",
    strip: [
      { k: "ලැයිස්තු", v: "සතිපතා" },
      { k: "ශල්‍යකර්මය", v: "Day Case එකක්" },
      { k: "සමාලෝචනය", v: "පසුදින" },
      { k: "තක්සේරුව", v: "Refraction, Pressure සහ Retina" },
    ],
    covers: [
      "Cataract ශල්‍යකර්මය",
      "Refraction සහ කණ්ණාඩි තක්සේරුව",
      "අක්ෂි Pressure පරීක්ෂණ",
      "Retinal තක්සේරුව",
      "Lens Option සාකච්ඡාව",
    ],
    conditions: [
      "Cataract තත්ත්වය",
      "අවුල් සහගත දෘෂ්ටිය",
      "වැඩිවූ අක්ෂි Pressure",
      "Retinal වෙනස්කම්",
      "රාත්‍රී දෘෂ්ටියේ අපහසුතාව",
    ],
    location: "බිම් මහල, Ophthalmology Clinic",
    steps: [
      { desc: "Ophthalmologist කෙනෙක් ඔබේ පලමු Visit එකේදීම Refraction, අක්ෂි Pressure සහ Retina පරීක්ෂා කරනවා." },
      { desc: "සොයාගැනීම් සහ Lens Options සාකච්ඡා කර, සුදුසු නම් ශල්‍යකර්මය Book කරනවා." },
      { desc: "Cataract ශල්‍යකර්මය සතිපතා List එකක Day Case එකක් විදිහට සිදු කරනවා." },
      { desc: "දෘෂ්ටිය සහ සුවවීම පරීක්ෂා කරගන්න ඔබ පසුදින ආපහු එනවා." },
    ],
    prep: [
      "ශල්‍යකර්මයෙන් පස්සේ ගෙදර ගෙනියන්න කෙනෙකුට Drive කරන්න සලසාගන්න",
      "ඔබේ තක්සේරුවට ඔබේ දැනට තියෙන කණ්ණාඩි අරගෙන එන්න",
      "ඕන Eye Drops නවත්වන එක ගැන කලින්ම අහන්න",
      "පසුදින Review එකට Companion කෙනෙකුට එන්න සැලසුම් කරගන්න",
    ],
    team: [
      { role: "Ophthalmologist ලා", note: "දෘෂ්ටිය, අක්ෂි Pressure සහ Retina තක්සේරු කර සතිපතා Lists මත Cataract ශල්‍යකර්මය සිදු කරනවා." },
      { role: "Optometrist ලා", note: "පලමු තක්සේරුවේ කොටසක් විදිහට Refraction පරීක්ෂාව සිදු කරනවා." },
      { role: "Theatre Nursing කණ්ඩායම", note: "Day-case Cataract ශල්‍යකර්මය සූදානම් කර සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "තක්සේරු, ශල්‍යකර්මය සහ පසුදින Review Book කරනවා." },
    ],
    faq: [
      { q: "Cataract ශල්‍යකර්මයෙන් පසු මම රැඳී සිටින්නද?", a: "නෑ. Cataract ශල්‍යකර්මය Day Case එකක් විදිහට කරනවා, Drops සහ ලිඛිත උපදෙස් සමඟ ඔබ එදිනම ගෙදර යනවා." },
      { q: "පලමු Visit එකේදී මොකද වෙන්නේ?", a: "ඔබේ Ophthalmologist Refraction, අක්ෂි Pressure සහ Retina පරීක්ෂා කර, ශල්‍යකර්මය Book කරන්න කලින් Lens Options ඔබ සමඟ සාකච්ඡා කරනවා." },
      { q: "එදින මට කෙනෙක් ළඟ ඕනද?", a: "ඔව්, ශල්‍යකර්මයෙන් පස්සේ ගෙදර ගෙනියන්න කෙනෙකුට සලසාගන්න, ක්‍රියාපටිපාටියේදී යොදාගත් Drops නිසා ඔබේ දෘෂ්ටිය අවුල් වෙනවා." },
      { q: "පස්සේ මගේ දෘෂ්ටිය කවදාද පරීක්ෂා කරන්නේ?", a: "පසුදින Review එකට ආපහු එනවා, ඔබේ Ophthalmologist Recommend කරනවනම් තව Follow-up එකකුත් සලසනවා." },
    ],
  },
  {


    hours: "Referral එකකින්",

    desc: "මොළයේ සහ කොඳු ඇට පෙළේ ගැටලු Imaging මගින් මෙහෙයවන තක්සේරුවක්, ඊළඟ පියවර සාකච්ඡා කරන්න කලින්ම සැලැස්මකට එකඟ වී පස්සේත් Structured සත්කාරයක් සමඟ. Referral එකකින් බලනවා, කිසිම Recommendation එකක් කරන්න කලින්ම Scans ස්නායු Surgeon කෙනෙක් සමඟ එකට Review කරනවා.",
    tags: ["මොළයේ තක්සේරුව", "කොඳු ඇට පෙළේ තක්සේරුව", "Imaging-Led සැලසුම්කරණය", "ශල්‍යකර්මයෙන් පසු සත්කාරය"],
    facts: [
      { k: "ප්‍රවේශය", v: "Referral එකකින්" },
      { k: "සැලසුම්කරණය", v: "Imaging මත" },
      { k: "විමසීම", v: "Scans එකට Review කරයි" },
      { k: "සත්කාරය", v: "ශල්‍යකර්මයෙන් පසු Follow-up" },
    ],
    lede: "මොළයේ සහ කොඳු ඇට පෙළේ ගැටලු තක්සේරුව, Imaging සහ Referral මාර්ගයක් වටා හැදිලා තියෙන්නේ, සුදුසු ඊළඟ පියවර සත්කාරයට.",

    body1: "රෝගීන් Referral එකකින් බලනවා, ස්නායු Surgeon කෙනෙක් රෝගියා සමඟ එකට Imaging Review කර ඊළඟට මොකද කරන්න ඕනද, ඕනද කියලාවෙන් සාකච්ඡා කරනවා. සැලසුම්කරණය Fixed ක්‍රියාපටිපාටි ලැයිස්තුවකට වඩා Scans පෙන්වන දේ වටා හැදිලා තියෙන නිසා, හැම Case එකකම එහි ම සොයාගැනීම් මත සලකා බලනවා.",
    body2: "ශල්‍යකර්මයක් Recommend කරනවනම්, සුදුසු ශල්‍ය මාර්ගය හරහා සලසනවා, මේ සේවාව රෝගියා ලුහුබදින්නත් දිගටම කරගෙන යනවා: Imaging Review කරමින්, සුවවීම පරීක්ෂා කරමින් සහ තව සත්කාරයක් සඳහා සැලැස්ම තහවුරු කරමින්.",
    strip: [
      { k: "ප්‍රවේශය", v: "Referral එකකින්" },
      { k: "සැලසුම්කරණය", v: "Imaging මත" },
      { k: "සමාලෝචනය", v: "ස්නායු Surgeon සමඟ" },
      { k: "පසු විපරම", v: "ශල්‍යකර්මයෙන් පසු සත්කාරය" },
    ],
    covers: [
      "මොළයේ Imaging තක්සේරුව",
      "කොඳු ඇට පෙළේ Imaging තක්සේරුව",
      "Referral මත පදනම් වූ Consultation",
      "ශල්‍යකර්මයෙන් පසු Follow-up සත්කාරය",
    ],
    conditions: [
      "තක්සේරුව අවශ්‍ය හිසේ තුවාලය",
      "Spinal Cord Compression සැක සහිතව",
      "අඛණ්ඩ තදබල හිසේ රුදාව",
      "ඉණේ හෝ කකුලේ Nerve වේදනාව",
      "මොළයේ හෝ කොඳු ඇට පෙළේ Imaging වල අසාමාන්‍ය සොයාගැනීම්",
    ],
    location: "දෙවන මහල, ස්නායු Consultation Suite",
    steps: [
      { desc: "ඔබේ Referral එකයි දැනට තියෙන ඕන Imaging එකයි ඔබේ Consultation එකට කලින් Review කරනවා." },
      { desc: "ස්නායු Surgeon කෙනෙක් ඔබව පරීක්ෂා කර ඔබ සමඟ එකට Imaging Review කරනවා." },
      { desc: "සොයාගැනීම් සාකච්ඡා කර, අවශ්‍ය නම් තව Imaging එකකුත් සමඟ සැලැස්මකට එකඟ වෙනවා." },
      { desc: "ඕන ශල්‍යකර්මයකින් පසු, Review Appointments සුවවීම Track කර ඊළඟ පියවර තහවුරු කරනවා." },
    ],
    prep: [
      "ඔබේ වෛද්‍යවරයාගෙන් Referral Letter එකක් අරගෙන එන්න",
      "දැනටමත් තියෙන මොළයේ හෝ කොඳු ඇට පෙළේ Imaging Copies අරගෙන එන්න",
      "ඔබේ රෝග ලක්ෂණ පටන් ගත් වේලාවයි ඒවා වෙනස් වුන විදිහයි සටහන් කරගන්න",
      "ඔබ දැනට ගන්නා බෙහෙත් ලැයිස්තු කරගන්න",
    ],
    team: [
      { role: "ස්නායු Surgeon ලා", note: "Imaging Review කර මොළයේ සහ කොඳු ඇට පෙළේ Referrals සඳහා තක්සේරුව සහ සැලසුම්කරණය මෙහෙයවනවා." },
      { role: "Radiologist ලා", note: "ස්නායු කණ්ඩායම සමඟින්ම මොළයේ සහ කොඳු ඇට පෙළේ Imaging Report කරනවා." },
      { role: "ස්නායු Nursing කණ්ඩායම", note: "Consultations සහ ශල්‍යකර්මයෙන් පසු Follow-up එකට සහාය වෙනවා." },
      { role: "Clinic Coordinator කෙනා", note: "Referrals සහ Follow-up Appointments කළමනාකරණය කරනවා." },
    ],
    faq: [
      { q: "බැලෙන්න මට Referral එකක් ඕනද?", a: "ඔව්. මේ සේවාව Referral එකකින් ක්‍රියාත්මක වෙන නිසා, ඔබේ වෛද්‍යවරයාගෙන් Letter එකක් සහ දැනටමත් තියෙන ඕන Imaging එකක් අරගෙන එන්න." },
      { q: "මට ශල්‍යකර්මයක් ඕන වේවිද?", a: "අනිවාර්‍ය නෑ. තක්සේරුව ඔබේ Imaging වටා හැදිලා තියෙන නිසා, බොහෝ Referrals ශල්‍යකර්මයකට වඩා Monitoring සහ Follow-up එකෙන් කළමනාකරණය කරනවා." },
      { q: "මගේ Imaging එකට මොකද වෙන්නේ?", a: "ස්නායු Surgeon කෙනෙක් ඔබේ Scans කෙලින්ම ඔබ සමඟ Review කරනවා, සැලසුම්කරණය Standard ක්‍රියාපටිපාටියකට වඩා ඒ සොයාගැනීම් මතයි." },
      { q: "ශල්‍යකර්මයෙන් පස්සේ මොකද Follow-up එකේ බලාපොරොත්තු විය යුත්තේ?", a: "Review Appointments ඔබේ සුවවීම Track කර ඔබට ඕන තව සත්කාරයක් සඳහා සැලැස්ම තහවුරු කරනවා." },
    ],
  },
  {


    hours: "නියමිත Lists",

    desc: "නියමිත Gastroscopy සහ Colonoscopy Lists, අවශ්‍ය නම් එකම Sitting එකේදීම Biopsy සහ Polypectomy සිදු කරන, විශේෂඥ Anaesthetist කෙනෙක් දෙන Sedation එකකුත්, ඔබ යන්න කලින්ම එදින Reporting එකකුත් සමඟ.",
    tags: ["Gastroscopy පරීක්ෂණය", "Colonoscopy පරීක්ෂණය", "Biopsy සහ Polypectomy", "Sedation එකක්"],
    facts: [
      { k: "සන්සුන් කිරීම", v: "විශේෂඥ Anaesthetist කෙනෙක් දෙයි" },
      { k: "වාර්තා කිරීම", v: "එදිනම" },
      { k: "සුවවීම", v: "Suite එකට යාබද Bay එකේ" },
      { k: "ලැයිස්තු", v: "නියමිත" },
    ],
    lede: "නියමිත Lists මත Gastroscopy සහ Colonoscopy, එකම Sitting එකේදීම Biopsy හෝ Polypectomy සහ ඔබ ගෙදර යන්න කලින්ම එදින Reporting එකකුත් සමඟ.",

    body1: "Gastroscopy සහ Colonoscopy නියමිත Lists මත සිදු කරනවා, සොයාගැනීම් ඉල්ලනවනම් එකම Sitting එකේදීම Biopsy හෝ Polypectomy සිදු කරනවා. Sedation දෙන්නේ විශේෂඥ Anaesthetist කෙනෙක්, එහෙනම් ක්‍රියාපටිපාටිය පුරාවටම Monitoring අඛණ්ඩව සිදු වෙනවා.",
    body2: "Recovery Bay එකක් Endoscopy Suite එකට යාබදව තියෙනවා, Sedation එක ක්ෂය වෙනකම් ඔබව එතන Observe කරනවා. Reporting එදිනම අවසන් කරනවා, එහෙනම් සොයාගැනුනු දේ සහ ඊළඟට මොකද වෙන්නේද කියලා පැහැදිලි පින්තූරයක් සමඟ ඔබ යනවා.",
    strip: [
      { k: "සන්සුන් කිරීම", v: "විශේෂඥ වෛද්‍යවරයා මෙහෙයවනවා" },
      { k: "වාර්තා කිරීම", v: "එදිනම" },
      { k: "සුවවීම", v: "Suite එකට යාබදව" },
      { k: "ලැයිස්තු", v: "නියමිත" },
    ],
    covers: [
      "Gastroscopy පරීක්ෂණය",
      "Colonoscopy පරීක්ෂණය",
      "Biopsy ගැනීම",
      "Polypectomy සිදු කිරීම",
      "Sedated ක්‍රියාපටිපාටි",
    ],
    conditions: [
      "අඛණ්ඩ අජීර්ණය",
      "පැහැදිලි නොවන බර අඩුවීම",
      "අමලේ ලේ",
      "බඩවැලේ ක්‍රියාකාරීත්වයේ වෙනසක්",
      "සැක සහිත Ulcers",
    ],
    location: "පලමු මහල, Endoscopy Suite",
    steps: [
      { desc: "ඔබේ ක්‍රියාපටිපාටිය Schedule කරලා, කලින්ම සූදානම් වීමේ උපදෙස් දෙනවා." },
      { desc: "ඇතුළත් වන්න කලින් උපවාස හෝ බඩවැල් සූදානම් කිරීමේ උපදෙස් අනුගමනය කරනවා." },
      { desc: "Sedation එකක් යටතේ Gastroscopy හෝ Colonoscopy සිදු කරනවා, අවශ්‍ය නම් Biopsy හෝ Polypectomy එකකුත් සමඟ." },
      { desc: "Suite එකට යාබද Bay එකේ සුවවී, Discharge එකට කලින් එදින Reporting එකක් ලබාගන්නවා." },
    ],
    prep: [
      "දුන් උපවාස හෝ බඩවැල් සූදානම් කිරීමේ උපදෙස් හරියටම අනුගමනය කරන්න",
      "Sedation එකෙන් Driving එකට බලපාන නිසා ගෙදර ගෙනියන්න කෙනෙකුට සලසාගන්න",
      "ඔබ දැනට ගන්නා බෙහෙත් ලැයිස්තුව අරගෙන එන්න",
      "Blood Thinners නවත්වන එක ගැන කලින්ම අහන්න",
    ],
    team: [
      { role: "Gastroenterologist ලා", note: "අවශ්‍ය නම් Biopsy සහ Polypectomy සමඟින්ම Gastroscopy සහ Colonoscopy සිදු කරනවා." },
      { role: "විශේෂඥ Anaesthetist ලා", note: "හැම ක්‍රියාපටිපාටියකදීම Sedation ලබාදී Monitor කරනවා." },
      { role: "Endoscopy Nursing කණ්ඩායම", note: "සූදානම් වීම, ක්‍රියාපටිපාටිය සහ සුවවීමට සහාය වෙනවා." },
      { role: "Recovery Nurse ලා", note: "Sedation ක්ෂය වෙනකම් Suite එකට යාබද Bay එකේ රෝගීන් Monitor කරනවා." },
    ],
    faq: [
      { q: "ක්‍රියාපටිපාටියට මම නිදාගෙන ඉන්නවද?", a: "විශේෂඥ Anaesthetist කෙනෙක් ඔබට Sedation දෙනවා, එහෙනම් ඔබ සම්පූර්ණ General Anaesthesia එකකට වඩා Relax වී Monitor වී ඉන්නවා." },
      { q: "මගේ ප්‍රතිඵල කවදාද ලැබෙන්නේ?", a: "Reporting එදිනම අවසන් කරනවා, එහෙනම් සොයාගැනුනු දේ පැහැදිලි පැහැදිලි කිරීමක් සමඟ ඔබ යනවා." },
      { q: "එකම ක්‍රියාපටිපාටියේදීම Biopsy එකක් ගන්න පුළුවන්ද?", a: "ඔව්. සොයාගැනීම් ඉල්ලනවනම් Biopsy සහ Polypectomy එකම Sitting එකේදීම සිදු කරනවා, වෙනම Visit එකක් අවශ්‍ය නොවෙයි." },
      { q: "ඉන් පස්සේ මට Drive කරන්න පුළුවන්ද?", a: "නෑ. Sedation එකෙන් ඉතිරි දවසේ ඔබේ Reactions වලට බලපානවා, එහෙන් ගෙදර ගෙනියන්න කෙනෙකුට සලසාගන්න." },
    ],
  },
];
