// Sinhala overlay for atHome.ts (4 of the catalog's 36 services: pharmacy,
// medicine-delivery, home-visits, telemedicine).
//
// Register matches the rest of the site and, specifically, this hospital's
// own `pharmacy` feature, which describes the identical real-world pharmacy
// counter and delivery service these two atHome entries also cover:
// "Pharmacy", "Pharmacist(s)", "Order", "Counter", "File", "Digital",
// "Stock", "Delivery", "Prescription(s)" and "WhatsApp" stay English
// throughout (pharmacy/data/content.si.ts's own header states this, and its
// body carries it out for every one of them). An earlier draft of this file
// pointed the short k/v fact labels at `indexContent.si.ts`'s own
// `pharmacyFacts` instead, which had fully translated "Stock" -> "තොග" and
// "Delivery" -> "ගෙන්වා දීම". That was wrong: `pharmacy` is the feature that
// owns this vocabulary and states the rule explicitly, "තොග"/"ගෙන්වා දීම"
// are exactly the literary coinage this project's code-mixed register
// exists to avoid, and this very file already kept six of the same eight
// pharmacy-register words in English elsewhere ("Counter", "Pharmacist",
// "Authorized", "Digital", "File", "Order"), so translating only these
// three was inconsistent with itself as well as with `pharmacy`. Fixed:
// every "Stock"/"Delivery"/"Prescription(s)" instance below now stays
// English with a particle where the grammar wants one ("Stock එක",
// "Delivery එක", "Prescription ටික", "නැවත Prescriptions"), reusing
// `pharmacy/data/content.si.ts`'s own exact forms
// (`heroFacts`/`jumpCards`/`tickerItems`) rather than inventing new ones,
// and `indexContent.si.ts`'s `pharmacyFacts` was corrected the same way as
// part of this fix. "Dispensing" (the noun) translates in full, to avoid a
// `facts` array where most labels are silently swept into English with no
// individual justification (the sibling-test trap the recipe names twice);
// "Dispense" (the verb, in flowing prose) keeps the pharmacy feature's own
// established English verb form. "Telemedicine" reuses
// navigationLabels.si.ts's own exact entry ("දුරස්ථ වෛද්‍ය සේවා"). "Request
// a visit" reuses navigationLabels.si.ts's own exact entry ("පැමිණීමක්
// ඉල්ලන්න"). "Doctor"/"Physician" translate in full (වෛද්‍යවරයා), matching
// emergency.si.ts; "Nurse" and "Coordinator" stay English, also matching
// emergency.si.ts.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const atHomeServices = [
  {
    title: "පැය 24 Pharmacy",
    directoryTitle: "පැය 24 Pharmacy",
    hours: "පැය 24",
    cta: "බෙහෙත් Order කරන්න",
    desc: "පැය 24ම විවෘත Pharmacy Counter එකක්, තියෙන්නේ Authorized බෙහෙත් විතරයි, ඔබේ Hospital File එක Read කරන්න පුළුවන් Pharmacist ලා විසින්ම Dispense කරනවා. Substitute නෑ, Grey-market Supply එකක්වත් නෑ, නැවත Order සඳහා Digital Prescriptions File කරලා තියෙනවා.",
    tags: ["පැය 24 Counter එක", "Authorized Stock විතරයි", "Pharmacist Dispensing එක", "Digital Prescriptions තිබීම"],
    facts: [
      { k: "වේලාවන්", v: "පැය 24" },
      { k: "Stock එක", v: "Authorized බෙහෙත් විතරයි" },
      { k: "බෙහෙත් සැපයීම", v: "Pharmacist ලා අතින්" },
      { k: "Prescription ටික", v: "Digital ලෙස File කර තියෙනවා" },
    ],
    lede: "හැම වේලාවකම විවෘත Pharmacy Counter එකක්, Authorized බෙහෙත් විතරයි තියෙන්නේ, ඔබේ Hospital File එක බලන්න පුළුවන් Pharmacist ලා විසින්ම Dispense කරනවා.",
    aboutHead: "හැම වේලාවකම විවෘත, Substitute නෑ",
    body1: "Pharmacy Counter එකේ පැය 24ම කාර්ය මණ්ඩලය ඉන්නවා. තියෙන හැම දේකම Authorized Stock විතරයි; Substitute නෑ, Grey-market Supply එකක්වත් නෑ, Pharmacist කෙනෙක් හැම Order එකක්ම දෙන්න කලින් ඔබේ File එකට එරෙහිව Check කරනවා.",
    body2: "ඔබේ බෙහෙත් Dispense කරන Pharmacist ලාට ඔබේ Hospital File එක Read කරන්න පුළුවන් නිසා, ඔබ ගන්න අනිත් දේකින් Interaction එකක් තියෙනවනම් ඒක Flag කරන්න, නැත්නම් ඔබේ වෛද්‍යවරයා ලියපු Dose එකට එරෙහිව Confirm කරන්න පුළුවන්. Prescriptions ම Digital ලෙස File කරලා තියෙන නිසා, නැවත Order එකක් හෝ අනිත් අංශයකින් එන ප්‍රශ්නයක් ලේසියි.",
    strip: [
      { k: "වේලාවන්", v: "පැය 24" },
      { k: "Stock එක", v: "Authorized විතරයි" },
      { k: "බෙහෙත් සැපයීම", v: "Pharmacist Check කරයි" },
      { k: "වාර්තා", v: "Digital, File කර" },
    ],
    covers: [
      "ඕන වේලාවක Prescription බෙහෙත් Dispense කිරීම",
      "Over-the-counter බෙහෙත් සහ ද්‍රව්‍ය",
      "අලුත් Order එකක් ඔබේ Hospital File එකට එරෙහිව Check කිරීම",
      "ඔබේ Prescriptions ම Digital ලෙස Record කරගෙන තිබීම",
    ],
    conditions: [
      "වේලාවෙන් පස්සේ හදිසි Prescription එකක්",
      "දිගුකාලීන අසනීපයකට නැවත බෙහෙත්",
      "ඇතුළත් වීමකින් පස්සේ Discharge බෙහෙත්",
      "Over-the-counter බෙහෙත් අවශ්‍යතා",
    ],
    location: "බිම් මහල, Pharmacy Counter",
    steps: [
      { title: "අරගෙන එන්න හෝ එවන්න", desc: "ඔබේ Prescription එක Counter එකට අරගෙන එන්න, නැත්නම් ඔබේ Consultation එකෙන්ම එවන්න." },
      { title: "Check කිරීම", desc: "සකස් කරන්න කලින් Pharmacist කෙනෙක් Order එක ඔබේ File එකට එරෙහිව Check කරනවා." },
      { title: "Dispense කිරීම", desc: "ඔබේ බෙහෙත් Authorized Stock එකෙන් Dispense කරනවා, Substitute කිසිවක් යොදාගන්නේ නෑ." },
      { title: "Record කිරීම", desc: "ඕන Repeat Order එකකට හෝ ප්‍රශ්නයකට Prescription එක Digital ලෙස File එකේ තියෙනවා." },
    ],
    prep: [
      "ඔබේ Prescription එක හෝ Hospital File අංකය අරගෙන එන්න",
      "ඔබ ගන්න අනිත් බෙහෙත් ගැන Pharmacist කෙනාට කියන්න",
      "Repeat Order එකක් නම් ඔබේ Digital Prescription Record එක ගැන අහන්න",
      "ප්‍රශ්නයක් තියෙනවනම් Reference සඳහා බෙහෙත් පෙට්ටි තියාගන්න",
    ],
    team: [
      { role: "Pharmacist ලා", note: "හැම Order එකක්ම Dispense කරලා, පලවෙනුව ඔබේ Hospital File එකට එරෙහිව Check කරනවා." },
      { role: "Pharmacy Assistants ලා", note: "Stock එක සහ Over-the-counter ද්‍රව්‍ය සමඟ Counter එකට සහාය වෙනවා." },
      { role: "Pharmacy Coordinator කෙනා", note: "Repeat Orders සඳහා Digital Prescription Records අලුත් කරගෙන යනවා." },
    ],
    faq: [
      { q: "රාත්‍රියේත් Pharmacy එක විවෘතද?", a: "ඔව්. Counter එක පැය 24ම විවෘතයි." },
      { q: "ලියපු බෙහෙතම හැමවෙලේම ලැබෙයිද?", a: "ඔව්. Counter එකේ තියෙන්නේ Authorized බෙහෙත් විතරයි, Substitute නෑ, Grey-market Supply එකක්වත් නෑ." },
      { q: "මම ගන්න අනිත් දේවල් Pharmacist ලා දන්නවද?", a: "ඔබේ බෙහෙත් Dispense කරන Pharmacist ලාට ඔබේ Hospital File එක Read කරන්න පුළුවන්, ඒකෙන් Order එකක් දෙන්න කලින් Interaction Check කරන්න පුළුවන් වෙනවා." },
      { q: "Repeat Prescription එකක් ලේසියෙන් නැවත Order කරන්න පුළුවන්ද?", a: "ඔව්. Prescriptions ම Digital ලෙස File කරලා තියෙන නිසා, Repeat Order එකක් ලේසියි." },
    ],
  },
  {
    title: "බෙහෙත් Delivery",
    directoryTitle: "බෙහෙත් Delivery",
    hours: "දිනපතා",
    cta: "Prescription එකක් යවන්න",
    desc: "Prescription සහ Over-the-counter බෙහෙත් අපේම Pharmacy Counter එකෙන් මීගමුව පුරාම ගෙන්වා දෙනවා, Dispatch කරන්න කලින් Pharmacist Check එකක් සහ Photo Prescriptions පිලිගන්නවා.",
    tags: ["මීගමුව පුරාම Delivery", "අපේම Counter එකෙන්", "Dispatch කරන්න කලින් Pharmacist Check", "Photo Prescriptions පිලිගන්නවා"],
    facts: [
      { k: "වේලාවන්", v: "දිනපතා" },
      { k: "ආවරණය", v: "මීගමුව පුරාම" },
      { k: "මූලාශ්‍රය", v: "අපේම Pharmacy Counter එක" },
      { k: "Prescription ටික", v: "Photos පිලිගන්නවා" },
    ],
    lede: "Prescription සහ Over-the-counter බෙහෙත් අපේම Pharmacy Counter එකෙන් මීගමුව පුරාම ගෙන්වා දෙනවා, හැම Order එකක්ම Dispatch කරන්න කලින් Pharmacist Check එකකුත් සමඟ.",
    aboutHead: "අපේම Counter එකෙන් ගෙන්වන, යන්න කලින් Check කරන",
    body1: "බෙහෙත් Delivery මීගමුව ආවරණය කරන අතර රෝහලේම Pharmacy Counter එකෙන්ම සකස් වෙනවා, එහෙනම් කෙලින්ම එන අයට යොදාගන්න Authorized Stock එකම Delivery සඳහාත් යනවා. Pharmacist කෙනෙක් Dispatch කරන්න කලින් හැම Order එකක්ම Check කරනවා, Counter එකේදී Over-the-counter Order එකක් Check කරන විදිහටම.",
    body2: "Order එකක් පටන් ගන්න ඔබේ Prescription එකේ Photo එකක් යවන්න පුළුවන්, Original එක කෙලින්ම අරගෙන එන්න බැරි වුනොත් ඒක ප්‍රයෝජනවත්. එකම Delivery එකට Over-the-counter Items එකතු කරගන්නත් පුළුවන්, Orders දිනපතා ධාවනය වෙනවා.",
    strip: [
      { k: "ආවරණය", v: "මීගමුව" },
      { k: "මූලාශ්‍රය", v: "අපේම Counter එක" },
      { k: "Check කිරීම", v: "Dispatch කරන්න කලින්" },
      { k: "Prescription ටික", v: "Photo පිලිගන්නවා" },
    ],
    covers: [
      "Prescription බෙහෙත් Delivery",
      "Over-the-counter බෙහෙත් Delivery",
      "Photo Prescription Orders ලබාදීම",
      "මීගමුව පුරාම Delivery",
    ],
    conditions: [
      "දිගුකාලීන අසනීපයකට නැවත බෙහෙත්",
      "Consultation එකකින් පස්සේ බෙහෙත් අවශ්‍යතාවය",
      "බෙහෙත් ගන්න යන්න අපහසුතාවය",
      "Over-the-counter බෙහෙත් අවශ්‍යතා",
    ],
    location: "බිම් මහල, Pharmacy Counter",
    steps: [
      { title: "යවන්න", desc: "Prescription එක, නැත්නම් එහි Photo එකක් Pharmacy Counter එකට යවන්න." },
      { title: "Check කිරීම", desc: "Dispatch සඳහා සකස් කරන්න කලින් Pharmacist කෙනෙක් Order එක Check කරනවා." },
      { title: "Dispatch කිරීම", desc: "ඔබේ Order එක මීගමුව පුරාම Delivery සඳහා Dispatch කරනවා." },
      { title: "ලැබීම", desc: "ඔබේ Address එකේදීම බෙහෙත් ලැබෙනවා, ප්‍රශ්නයක් තියෙනවනම් ආපහු Pharmacy Counter එකට යොමු කරනවා." },
    ],
    prep: [
      "ඔබේ Prescription එක හෝ ඒකේ පැහැදිලි Photo එකක් යවන්න සූදානම් තියාගන්න",
      "ඔබේ Delivery Address එක මීගමුව ඇතුළතද කියලා තහවුරු කරගන්න",
      "Order එකට එකතු කරගන්න ඕන Over-the-counter Items List කරගන්න",
      "Pharmacist කෙනාට ප්‍රශ්නයක් ආවොත් Reach කරගන්න පුළුවන් Phone Number එකක් තියාගන්න",
    ],
    team: [
      { role: "Pharmacist ලා", note: "Dispatch කරන්න කලින් හැම Delivery Order එකක්ම Check කරනවා." },
      { role: "Delivery Coordinator කෙනා", note: "මීගමුව පුරාම Dispatch සහ Delivery සංවිධානය කරනවා." },
      { role: "Pharmacy Assistants ලා", note: "රෝහලේම Counter Stock එකෙන් Orders සකස් කරනවා." },
    ],
    faq: [
      { q: "Prescription එකේ Photo එකක් යවන්න පුළුවන්ද?", a: "ඔව්. Delivery Order එකක් පටන් ගන්න Photo Prescriptions පිලිගන්නවා." },
      { q: "Delivery එක කොහෙද ආවරණය කරන්නේ?", a: "Delivery එක මීගමුව ආවරණය කරනවා, අපේම Pharmacy Counter එකෙන් සකස් වෙනවා." },
      { q: "මගේ Order එක යවන්න කලින් Check කරනවද?", a: "ඔව්. Dispatch කරන්න කලින් Pharmacist කෙනෙක් හැම Order එකක්ම Check කරනවා." },
      { q: "Over-the-counter Items එකතු කරන්නත් Order කරන්න පුළුවන්ද?", a: "ඔව්. එකම Delivery Order එකට Over-the-counter බෙහෙත් එකතු කරගන්න පුළුවන්." },
    ],
  },
  {
    title: "නිවසේ පැමිණීම්",
    directoryTitle: "නිවසේ පැමිණීම්",
    hours: "Appointment එකකින්",
    cta: "පැමිණීමක් ඉල්ලන්න",
    desc: "වයෝවෘද්ධ අය, බිළිඳුන් සහ Post-operative සත්කාරය සඳහා වෛද්‍යවරු, Nurse ලා සහ රසායනාගාර Technician ලා ඔබේ දොරටුවටම, කැපවුනු Vehicles 6ක් සමඟ, Sampling නිවසේදීම කරලා, සටහන් කෙලින්ම ඔබේ File එකට ලියනවා.",
    tags: ["වෛද්‍යවරු, Nurse ලා සහ Lab Technician ලා", "කැපවුනු Vehicles 6ක්", "නිවසේදීම Sampling", "ඔබේ File එකේ සටහන්"],
    facts: [
      { k: "වෙන් කිරීම", v: "Appointment එකකින්" },
      { k: "Vehicles ගණන", v: "කැපවුනු 6ක්" },
      { k: "Sampling කිරීම", v: "නිවසේදීම කරයි" },
      { k: "වාර්තා", v: "ඔබේ File එකට ලියනවා" },
    ],
    lede: "වයෝවෘද්ධ අය, බිළිඳුන් සහ Post-operative සත්කාරය සඳහා වෛද්‍යවරු, Nurse ලා සහ රසායනාගාර Technician ලා ඔබේ නිවසටම එනවා, කැපවුනු Vehicles 6න් එකකින්.",
    aboutHead: "රෝහලේ සත්කාරය ඔබේ දොරටුවටම",
    body1: "නිවසේ පැමිණීම් වෛද්‍යවරු, Nurse ලා සහ රසායනාගාර Technician ලා ඔබේ දොරටුවටම ගෙනෙනවා, Travel කරන්න අපහසු වයෝවෘද්ධ අය, බිළිඳුන් සහ ශල්‍යකර්මයකින් පසු සුවවෙන රෝගීන් ඉලක්ක කරගෙන. පැමිණීම් මේ සඳහාම කැපවුනු Vehicles 6ක් මත ධාවනය වන අතර, Appointment එකකින් සංවිධානය කරනවා.",
    body2: "රුධිර නියැදියක් හෝ අනිත් Sample එකක් අවශ්‍ය නම්, Travel කරන්න කියලා ඉල්ලනවා වෙනුවට Sampling නිවසේදීම කරනවා. පැමිණීමේදී හම්බුවුනු හෝ කතා කරපු ඕන දෙයක් කෙලින්ම ඔබේ Hospital File එකට ලියනවා, එහෙනම් වෙන තැනක ඔබව බලන කණ්ඩායමටත් එකම වාර්තාව පේනවා.",
    strip: [
      { k: "Vehicles ගණන", v: "කැපවුනු 6ක්" },
      { k: "Sampling කිරීම", v: "නිවසේදීම" },
      { k: "වාර්තා", v: "ඔබේ File එකේ" },
      { k: "වෙන් කිරීම", v: "Appointment එකකින්" },
    ],
    covers: [
      "වයෝවෘද්ධ අය සඳහා නිවසේ පැමිණීම්",
      "බිළිඳුන් සඳහා නිවසේ පැමිණීම්",
      "Post-operative නිවසේ සත්කාරය",
      "නිවසේදීම Sampling",
    ],
    conditions: [
      "වයස හෝ Mobility නිසා Travel කරන්න අපහසුතාවය",
      "නිවසේදී Post-operative සුවවීම",
      "රෝහල් පැමිණීමක් අපහසු බිළිඳු සත්කාරය",
      "නිවසේ රැඳී සිටින රෝගියෙකුට Routine Sampling",
    ],
    location: "රෝහලෙන් Dispatch කරනවා, බිම් මහල",
    steps: [
      { title: "ඉල්ලීම", desc: "පැමිණීමක් ඉල්ලා, බලාගන්න ඕන කවුද, ඇයි කියලා විස්තර කරන්න." },
      { title: "සැලසුම් කිරීම", desc: "Appointment එකකින් පැමිණීමක් සංවිධානය කරලා, කැපවුනු Vehicle එකක් Assign කරනවා." },
      { title: "පැමිණීම", desc: "වෛද්‍යවරයෙක්, Nurse කෙනෙක් හෝ රසායනාගාර Technician කෙනෙක් පැමිණෙනවා, අවශ්‍ය නම් Sampling නිවසේදීම කරනවා." },
      { title: "Record කිරීම", desc: "පැමිණීමේ සටහන් කෙලින්ම ඔබේ Hospital File එකට ලියනවා." },
    ],
    prep: [
      "පැමිණීමක් ඉල්ලන කොට ඔබේ Hospital File අංකය සූදානම් තියාගන්න",
      "රෝගියා දැනට ගන්නා බෙහෙත් සටහන් කරගන්න",
      "පැමිණීම සඳහා නිශ්ශබ්ද, ලේසියෙන් ලගාවෙන්න පුළුවන් තැනක් සූදානම් කරගන්න",
      "Sampling අවශ්‍ය වෙයි කියලා හිතෙනවනම් කියන්න",
    ],
    team: [
      { role: "පැමිණෙන වෛද්‍යවරු", note: "වයෝවෘද්ධ අය, බිළිඳුන් සහ Post-operative රෝගීන් සඳහා නිවසේ පැමිණීම් සිදු කරනවා." },
      { role: "පැමිණෙන Nurse ලා", note: "නිවසේ පැමිණීම් සඳහා සහාය වී, නිවසේදීම Sampling කරනවා." },
      { role: "රසායනාගාර Technician ලා", note: "අවශ්‍ය වුනොත් නිවසේදීම Sample ලබාගන්න පැමිණෙනවා." },
      { role: "Vehicle Coordinator කෙනා", note: "නිවසේ පැමිණීම් සඳහා යොදාගන්නා කැපවුනු Vehicles 6ම සැලසුම් කරනවා." },
    ],
    faq: [
      { q: "නිවසේ පැමිණීම් කාටද?", a: "මේවා ලක්ෂ්‍ය කරන්නේ Travel කරන්න අපහසු වයෝවෘද්ධ අය, බිළිඳුන් සහ ශල්‍යකර්මයකින් පසු සුවවෙන රෝගීන්." },
      { q: "රුධිර නියැදියක් නිවසේදී ගන්න පුළුවන්ද?", a: "ඔව්. Travel කරන්න කියලා ඉල්ලනවා වෙනුවට Sampling නිවසේදීම කරනවා." },
      { q: "පැමිණීමේදී වුනු දේ මගේ නිතිපතා වෛද්‍යවරයාට පේනවද?", a: "ඔව්. පැමිණීමේ සටහන් කෙලින්ම ඔබේ Hospital File එකට ලියනවා." },
      { q: "නිවසේ පැමිණීම් ආවරණය කරන්නේ කී Vehicle ද?", a: "නිවසේ පැමිණීම් මේ සඳහාම කැපවුනු Vehicles 6ක් මත ධාවනය වෙනවා." },
    ],
  },
  {
    title: "දුරස්ථ වෛද්‍ය සේවා",
    directoryTitle: "දුරස්ථ වෛද්‍ය සේවා",
    hours: "දිනපතා",
    cta: "Consultation එකක් Book කරන්න",
    desc: "අපේ වෛද්‍යවරු සමඟ Video සහ Phone Consultations, Prescriptions Pharmacy එකට යවනවා Delivery සඳහා, ගෙදර ගිය රෝගීන්ට Follow-up එකකුත් සමඟ.",
    tags: ["Video Consultations ලබාදීම", "Phone Consultations ලබාදීම", "Pharmacy එකට Prescriptions", "Travel කිරීමෙන් පසු Follow-up"],
    facts: [
      { k: "වේලාවන්", v: "දිනපතා" },
      { k: "ආකාරය", v: "Video හෝ Phone" },
      { k: "Prescription ටික", v: "Pharmacy එකට යවනවා" },
      { k: "Follow-up එක", v: "ගෙදර ගිය රෝගීන් සඳහා" },
    ],
    lede: "අපේ වෛද්‍යවරු සමඟ Video සහ Phone Consultations, ඕන Prescription එකක් Delivery සඳහා කෙලින්ම Pharmacy එකට යවනවා.",
    aboutHead: "Travel කරන්නම ඕන නෑ Consultation එකක්",
    body1: "දුරස්ථ වෛද්‍ය සේවාව අපේ වෛද්‍යවරු අතරින් කෙනෙක් සමඟ Video එකෙන් හෝ Phone එකෙන් Consultation එකක් ලබාදෙනවා, දිනපතා Book කරගන්න පුළුවන්. In-person Examination එකක් අවශ්‍ය නැති Follow-up කතාබහකට හෝ ප්‍රශ්නයකට මේක සුදුසුයි, රෝහලට Travel කරන්නම ඕන නැතුව.",
    body2: "Prescription එකක් අවශ්‍ය නම්, ඒක Pharmacy එකට යවනවා, ඊට පස්සේ එකතු කරගන්නත් නැත්නම් Medicine Delivery එකෙන් යවන්නත් පුළුවන්. මෙහෙ බැලුවාට පස්සේ ගෙදර ගිය රෝගීන් සමඟ Follow-up සඳහාත් දුරස්ථ වෛද්‍ය සේවාව යොදාගන්නවා, ඔවුන්ගේ සත්කාරයේ ඊළඟ පියවරේත් එකම වෛද්‍යවරයාම ඉන්නවා.",
    strip: [
      { k: "ආකාරය", v: "Video හෝ Phone" },
      { k: "වෙන් කිරීම", v: "දිනපතා" },
      { k: "Prescription ටික", v: "Pharmacy එකට" },
      { k: "Follow-up එක", v: "ගෙදර ගිය පසු" },
    ],
    covers: [
      "Video Consultations ලබාදීම",
      "Phone Consultations ලබාදීම",
      "Pharmacy එකට Prescriptions යැවීම",
      "ගෙදර ගිය රෝගීන් සඳහා Follow-up",
    ],
    conditions: [
      "රෝහල් පැමිණීමකින් පස්සේ Follow-up",
      "In-person Examination අවශ්‍ය නැති ප්‍රශ්නයක්",
      "Routine Review එකකට එන්න Travel කරන්න අපහසුතාවය",
      "තියෙන Prescription එකක් ගැන උපදෙස්",
    ],
    location: "දුරස්ථව සිදු කරයි, රෝහල හරහා Book කරයි",
    steps: [
      { title: "Book කිරීම", desc: "Consultation එකක් Book කරලා Video හෝ Phone තෝරන්න." },
      { title: "සම්බන්ධ වීම", desc: "Book කරපු වෙලාවට Video එකෙන් හෝ Phone එකෙන් වෛද්‍යවරයෙක් සමඟ සම්බන්ධ වෙනවා." },
      { title: "Consultation එක", desc: "වෛද්‍යවරයා ඔබේ ප්‍රශ්නය ගැන කතා කරලා, Follow-up Review එකක් අවශ්‍ය නම් ඒක සංවිධානය කරනවා." },
      { title: "Prescribe කිරීම", desc: "ඕන Prescription එකක් Collection එකට හෝ Delivery එකට Pharmacy එකට යවනවා." },
    ],
    prep: [
      "වැඩකරන Phone එකක් හෝ Video Connection එකක් සූදානම් තියාගන්න",
      "දැනට ගන්නා බෙහෙත් List එක ළඟින් තියාගන්න",
      "කතා කරන්න ඕන ප්‍රශ්න හෝ රෝග ලක්ෂණ සටහන් කරගන්න",
      "Prescription එකක් එවනවා කියලා අපේක්ෂා කරනවනම් Delivery Address එක තහවුරු කරගන්න",
    ],
    team: [
      { role: "Consultation කරන වෛද්‍යවරු", note: "Video සහ Phone Consultations පවත්වා Follow-up සංවිධානය කරනවා." },
      { role: "Pharmacy කණ්ඩායම", note: "දුරස්ථ වෛද්‍ය සේවා Consultations වලින් එවන Prescriptions ලබාගන්නවා." },
      { role: "Booking Coordinator කෙනා", note: "Consultations සැලසුම් කරලා Video හෝ Phone ආකාරය තහවුරු කරනවා." },
    ],
    faq: [
      { q: "Video සහ Phone අතර තෝරගන්න පුළුවන්ද?", a: "ඔව්. දුරස්ථ වෛද්‍ය සේවාව Video සහ Phone යන දෙකම ලබාදෙනවා." },
      { q: "දුරස්ථ Consultation එකකින් පස්සේ බෙහෙත් ලබාගන්නේ කොහොමද?", a: "ඕන Prescription එකක් Pharmacy එකට යවනවා, ඊට පස්සේ එකතු කරගන්නත් Medicine Delivery එකෙන් යවන්නත් පුළුවන්." },
      { q: "දුරස්ථ වෛද්‍ය සේවාව Follow-up Visits සඳහා විතරද?", a: "ඔබ ගෙදර ගිය පසු Follow-up සඳහාත්, In-person Examination අවශ්‍ය නැති ප්‍රශ්න සඳහාත් මේක යොදාගන්නවා." },
      { q: "Consultations කීයටත් ලබාගන්න පුළුවන්ද?", a: "Consultations දිනපතා Book කරගන්න පුළුවන්." },
    ],
  },
];
