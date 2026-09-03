// Tamil overlay for atHome.ts (4 of the catalog's 36 services: pharmacy,
// medicine-delivery, home-visits, telemedicine).
//
// See atHome.si.ts's header for the full register rationale (reused here
// for Tamil): "Pharmacy", "Pharmacist(s)", "Order", "Counter", "File",
// "Digital", "Stock", "Delivery", "Prescription(s)" and "WhatsApp" stay
// English throughout, matching pharmacy/data/content.ta.ts's own header,
// and its body carries it out for every one of them. An earlier draft of
// this file pointed at `indexContent.ta.ts`'s own `pharmacyFacts` instead,
// which had fully translated "Stock" -> "இருப்பு" and "Delivery" ->
// "விநியோகம்". That was wrong for the same reason atHome.si.ts's header
// now explains: `pharmacy` owns this vocabulary and states the rule
// explicitly, the literary coinages are exactly what this project's
// code-mixed register exists to avoid, and this file already kept most of
// the same pharmacy-register words in English elsewhere ("Counter",
// "Pharmacist", "Authorized", "Digital", "File", "Order"). Fixed: every
// "Stock"/"Delivery"/"Prescription(s)" instance below now stays English
// with a particle where the grammar wants one ("எங்கள் Stock", "Stock
// தான்"/"இலிருந்து", "Prescription குறிப்புகள்", bare "Prescriptions" in
// flowing prose), reusing `pharmacy/data/content.ta.ts`'s own exact forms
// (`heroFacts`/`sectionEyebrows`/prose) rather than inventing new ones, and
// `indexContent.ta.ts`'s `pharmacyFacts` was corrected the same way as part
// of this fix. "Dispensing" (the noun) translates in full, to avoid a
// `facts` array where most labels are silently swept into English with no
// individual justification; "Dispense" (the verb, in flowing prose) keeps
// the pharmacy feature's own established English verb form. "Telemedicine"
// reuses navigationLabels.ta.ts's own exact entry ("தொலை மருத்துவம்").
// "Request a visit" reuses navigationLabels.ta.ts's own exact entry
// ("வருகைக்கு கோரிக்கை"). "Doctor"/"Physician" translate in full
// (மருத்துவர்), matching emergency.ta.ts; "Nurse" and "Coordinator" stay
// English, also matching emergency.ta.ts.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const atHomeServices = [
  {
    title: "24 மணி நேர Pharmacy",
    directoryTitle: "24 மணி நேர Pharmacy",
    hours: "24 மணி நேரம்",
    cta: "மருந்தை Order செய்யுங்கள்",
    desc: "24 மணி நேரமும் திறந்திருக்கும் Pharmacy Counter, Authorized மருந்து மட்டுமே வைத்திருக்கும், உங்கள் Hospital File ஐ Read செய்யக்கூடிய Pharmacists ஆல் Dispense செய்யப்படும். Substitute இல்லை, Grey-market Supply இல்லை, மீண்டும் Order செய்ய Digital Prescriptions File இல் வைக்கப்பட்டுள்ளன.",
    tags: ["24 மணி நேர Counter", "Authorized Stock மட்டும்", "ஒரு Pharmacist Dispensing", "Digital ஆக Prescriptions"],
    facts: [
      { k: "நேரம்", v: "24 மணி நேரம்" },
      { k: "எங்கள் Stock", v: "Authorized மருந்து மட்டும்" },
      { k: "மருந்தளித்தல்", v: "Pharmacist மூலம்" },
      { k: "Prescription குறிப்புகள்", v: "Digital ஆக File செய்யப்பட்டுள்ளன" },
    ],
    lede: "ஒவ்வொரு நேரமும் திறந்திருக்கும் Pharmacy Counter, Authorized மருந்து மட்டுமே வைத்திருக்கும், உங்கள் Hospital File ஐ பார்க்கக்கூடிய Pharmacists ஆல் Dispense செய்யப்படும்.",
    aboutHead: "ஒவ்வொரு நேரமும் திறந்திருக்கும், Substitute இல்லை",
    body1: "Pharmacy Counter இல் 24 மணி நேரமும் பணியாளர்கள் இருக்கிறார்கள். வைத்திருக்கும் ஒவ்வொன்றும் Authorized Stock மட்டுமே; Substitute இல்லை, Grey-market Supply இல்லை, ஒவ்வொரு Order ஐயும் கொடுப்பதற்கு முன் ஒரு Pharmacist உங்கள் File உடன் Check செய்வார்.",
    body2: "உங்கள் மருந்தை Dispense செய்யும் Pharmacists உங்கள் Hospital File ஐ Read செய்யக்கூடியதால், நீங்கள் எடுக்கும் மற்றொன்றுடன் ஏற்படும் Interaction ஐ Flag செய்யவோ, உங்கள் மருத்துவர் பரிந்துரைத்த Dose உடன் Confirm செய்யவோ முடியும். Prescriptions Digital ஆக File இல் வைக்கப்பட்டிருப்பதால், மீண்டும் ஒரு Order அல்லது மற்றொரு துறையிலிருந்து வரும் கேள்வி எளிதாகிறது.",
    strip: [
      { k: "நேரம்", v: "24 மணி நேரம்" },
      { k: "எங்கள் Stock", v: "Authorized மட்டும்" },
      { k: "மருந்தளித்தல்", v: "Pharmacist Check செய்யும்" },
      { k: "பதிவுகள்", v: "Digital, File இல்" },
    ],
    covers: [
      "எந்த நேரத்திலும் Prescription மருந்தை Dispense செய்தல்",
      "Over-the-counter மருந்து மற்றும் பொருட்கள்",
      "புதிய Order ஐ உங்கள் Hospital File உடன் Check செய்தல்",
      "உங்கள் Prescriptions ஐ Digital ஆக Record செய்து வைத்திருத்தல்",
    ],
    conditions: [
      "நேரத்திற்குப் பின் அவசர Prescription",
      "நீண்டகால நோய்க்கு மீண்டும் மருந்து",
      "அனுமதிக்குப் பின் Discharge மருந்து",
      "Over-the-counter மருந்து தேவைகள்",
    ],
    location: "தரைத் தளம், Pharmacy Counter",
    steps: [
      { title: "கொண்டு வாருங்கள் அல்லது அனுப்புங்கள்", desc: "உங்கள் Prescription ஐ Counter க்கு கொண்டு வாருங்கள், அல்லது உங்கள் Consultation இலிருந்தே அனுப்புங்கள்." },
      { title: "Check செய்தல்", desc: "தயார் செய்வதற்கு முன் ஒரு Pharmacist Order ஐ உங்கள் File உடன் Check செய்வார்." },
      { title: "Dispense செய்தல்", desc: "உங்கள் மருந்து Authorized இருப்பிலிருந்து Dispense செய்யப்படும், Substitute எதுவும் பயன்படுத்தப்படாது." },
      { title: "Record செய்தல்", desc: "எந்த Repeat Order அல்லது கேள்விக்கும் Prescription Digital ஆக File இல் வைக்கப்பட்டுள்ளது." },
    ],
    prep: [
      "உங்கள் Prescription அல்லது Hospital File எண்ணை கொண்டு வாருங்கள்",
      "நீங்கள் எடுக்கும் மற்ற மருந்துகள் பற்றி Pharmacist இடம் சொல்லுங்கள்",
      "Repeat Order செய்ய வேண்டுமெனில் உங்கள் Digital Prescription Record பற்றி கேளுங்கள்",
      "கேள்வி இருந்தால் Reference க்காக மருந்துப் பெட்டிகளை வைத்திருங்கள்",
    ],
    team: [
      { role: "எங்கள் Pharmacists", note: "ஒவ்வொரு Order ஐயும் Dispense செய்து, முதலில் உங்கள் Hospital File உடன் Check செய்வர்." },
      { role: "எங்கள் Pharmacy Assistants", note: "Stock மற்றும் Over-the-counter பொருட்களுடன் Counter க்கு உதவுவர்." },
      { role: "Pharmacy Coordinator ஒருவர்", note: "Repeat Orders க்காக Digital Prescription Records ஐ புதுப்பித்து வைப்பார்." },
    ],
    faq: [
      { q: "இரவிலும் Pharmacy திறந்திருக்குமா?", a: "ஆம். Counter 24 மணி நேரமும் திறந்திருக்கும்." },
      { q: "பரிந்துரைத்த மருந்தே எப்போதும் கிடைக்குமா?", a: "ஆம். Counter இல் Authorized மருந்து மட்டுமே உள்ளது, Substitute இல்லை, Grey-market Supply இல்லை." },
      { q: "நான் எடுக்கும் மற்றவை Pharmacists க்குத் தெரியுமா?", a: "உங்கள் மருந்தை Dispense செய்யும் Pharmacists உங்கள் Hospital File ஐ Read செய்யக்கூடியதால், Order ஐ கொடுப்பதற்கு முன் Interaction ஐ Check செய்ய உதவுகிறது." },
      { q: "Repeat Prescription ஐ மீண்டும் எளிதாக Order செய்யலாமா?", a: "ஆம். Prescriptions Digital ஆக File இல் வைக்கப்பட்டிருப்பதால், Repeat Order எளிதாகிறது." },
    ],
  },
  {
    title: "மருந்து Delivery",
    directoryTitle: "மருந்து Delivery",
    hours: "தினமும்",
    cta: "ஒரு Prescription ஐ அனுப்புங்கள்",
    desc: "Prescription மற்றும் Over-the-counter மருந்து எங்கள் சொந்த Pharmacy Counter இலிருந்து நீர்கொழும்பு முழுவதும் விநியோகிக்கப்படுகிறது, Dispatch செய்யும் முன் Pharmacist Check ஒன்றுடன், Photo Prescriptions ஏற்கப்படும்.",
    tags: ["நீர்கொழும்பு முழுவதும் Delivery", "எங்கள் சொந்த Counter இலிருந்து", "Dispatch க்கு முன் Pharmacist Check", "Photo Prescriptions ஏற்கப்படும்"],
    facts: [
      { k: "நேரம்", v: "தினமும்" },
      { k: "பரப்பு", v: "நீர்கொழும்பு முழுவதும்" },
      { k: "மூலம்", v: "எங்கள் சொந்த Pharmacy Counter" },
      { k: "Prescription குறிப்புகள்", v: "Photos ஏற்கப்படும்" },
    ],
    lede: "Prescription மற்றும் Over-the-counter மருந்து எங்கள் சொந்த Pharmacy Counter இலிருந்து நீர்கொழும்பு முழுவதும் விநியோகிக்கப்படுகிறது, ஒவ்வொரு Order ஐயும் Dispatch செய்யும் முன் ஒரு Pharmacist Check உடன்.",
    aboutHead: "எங்கள் சொந்த Counter இலிருந்து விநியோகிக்கப்பட்டு, செல்வதற்கு முன் Check செய்யப்படும்",
    body1: "மருந்து Delivery நீர்கொழும்பை உள்ளடக்கியது, மருத்துவமனையின் சொந்த Pharmacy Counter இலிருந்தே நிரப்பப்படுகிறது, அதனால் நேரடியாக வரும் Order களுக்குப் பயன்படுத்தப்படும் அதே Authorized Stock தான் Delivery க்கும் செல்கிறது. Dispatch செய்யும் முன் ஒரு Pharmacist ஒவ்வொரு Order ஐயும் Check செய்வார், Counter இல் ஒரு Over-the-counter Order ஐ Check செய்வது போலவே.",
    body2: "ஒரு Order ஐத் தொடங்க உங்கள் Prescription இன் Photo ஐ அனுப்பலாம், Original ஐ நேரடியாக கொண்டு வர முடியாவிட்டால் இது பயனுள்ளது. அதே Delivery இல் Over-the-counter Items ஐயும் சேர்க்கலாம், Orders தினமும் இயங்கும்.",
    strip: [
      { k: "பரப்பு", v: "நீர்கொழும்பு" },
      { k: "மூலம்", v: "எங்கள் சொந்த Counter" },
      { k: "Check செய்தல்", v: "Dispatch க்கு முன்" },
      { k: "Prescription குறிப்புகள்", v: "Photo ஏற்கப்படும்" },
    ],
    covers: [
      "Prescription மருந்து Delivery",
      "Over-the-counter மருந்து Delivery",
      "Photo Prescription Orders வழங்குதல்",
      "நீர்கொழும்பு முழுவதும் Delivery",
    ],
    conditions: [
      "நீண்டகால நோய்க்கு மீண்டும் மருந்து",
      "Consultation க்குப் பிறகு மருந்து தேவை",
      "மருந்து சேகரிக்கச் செல்வதில் சிரமம்",
      "Over-the-counter மருந்து தேவைகள்",
    ],
    location: "தரைத் தளம், Pharmacy Counter",
    steps: [
      { title: "அனுப்புங்கள்", desc: "ஒரு Prescription ஐ, அல்லது அதன் Photo ஐ Pharmacy Counter க்கு அனுப்புங்கள்." },
      { title: "Check செய்தல்", desc: "Dispatch க்கு தயார் செய்வதற்கு முன் ஒரு Pharmacist Order ஐ Check செய்வார்." },
      { title: "Dispatch செய்தல்", desc: "உங்கள் Order நீர்கொழும்பு முழுவதும் Delivery க்காக Dispatch செய்யப்படும்." },
      { title: "பெறுதல்", desc: "உங்கள் Address இல் மருந்தைப் பெறுவீர்கள், கேள்வி இருந்தால் மீண்டும் Pharmacy Counter க்கு திருப்பப்படும்." },
    ],
    prep: [
      "உங்கள் Prescription அல்லது அதன் தெளிவான Photo ஐ அனுப்ப தயாராக வையுங்கள்",
      "உங்கள் Delivery Address நீர்கொழும்பு எல்லைக்குள் உள்ளதா என்று உறுதிப்படுத்துங்கள்",
      "Order இல் சேர்க்க வேண்டிய Over-the-counter Items ஐ பட்டியலிடுங்கள்",
      "Pharmacist கேள்வி கேட்டால் தொடர்பு கொள்ளக்கூடிய Phone Number ஐ வைத்திருங்கள்",
    ],
    team: [
      { role: "எங்கள் Pharmacists", note: "Dispatch செய்யும் முன் ஒவ்வொரு Delivery Order ஐயும் Check செய்வர்." },
      { role: "Delivery Coordinator ஒருவர்", note: "நீர்கொழும்பு முழுவதும் Dispatch மற்றும் Delivery ஏற்பாடு செய்வார்." },
      { role: "எங்கள் Pharmacy Assistants", note: "மருத்துவமனையின் சொந்த Counter Stock இலிருந்து Orders ஐ தயார் செய்வர்." },
    ],
    faq: [
      { q: "என் Prescription இன் Photo ஐ அனுப்பலாமா?", a: "ஆம். Delivery Order ஐத் தொடங்க Photo Prescriptions ஏற்கப்படும்." },
      { q: "Delivery எங்கு வரை உள்ளடங்கும்?", a: "Delivery நீர்கொழும்பு முழுவதும் உள்ளடக்கும், எங்கள் சொந்த Pharmacy Counter இலிருந்து தயார் செய்யப்படும்." },
      { q: "என் Order அனுப்புவதற்கு முன் Check செய்யப்படுமா?", a: "ஆம். Dispatch செய்யும் முன் ஒரு Pharmacist ஒவ்வொரு Order ஐயும் Check செய்வார்." },
      { q: "Over-the-counter Items ஐயும் சேர்த்து Order செய்யலாமா?", a: "ஆம். அதே Delivery Order இல் Over-the-counter மருந்தையும் சேர்க்கலாம்." },
    ],
  },
  {
    title: "வீட்டு வருகைகள்",
    directoryTitle: "வீட்டு வருகைகள்",
    hours: "Appointment மூலம்",
    cta: "வருகைக்கு கோரிக்கை",
    desc: "முதியவர்கள், குழந்தைகள் மற்றும் Post-operative சிகிச்சைக்காக மருத்துவர்கள், Nurses மற்றும் ஆய்வுகூட Technicians உங்கள் வீட்டு வாசலுக்கே, அர்ப்பணிக்கப்பட்ட 6 Vehicles உடன், Sampling வீட்டிலேயே செய்யப்பட்டு, குறிப்புகள் நேரடியாக உங்கள் File இல் எழுதப்படும்.",
    tags: ["மருத்துவர்கள், Nurses மற்றும் Lab Technicians", "அர்ப்பணிக்கப்பட்ட 6 Vehicles", "வீட்டிலேயே Sampling", "உங்கள் File இல் குறிப்புகள்"],
    facts: [
      { k: "முன்பதிவு", v: "Appointment மூலம்" },
      { k: "Vehicles எண்ணிக்கை", v: "அர்ப்பணிக்கப்பட்ட 6" },
      { k: "Sampling செய்தல்", v: "வீட்டிலேயே செய்யப்படும்" },
      { k: "பதிவுகள்", v: "உங்கள் File இல் எழுதப்படும்" },
    ],
    lede: "முதியவர்கள், குழந்தைகள் மற்றும் Post-operative சிகிச்சைக்காக மருத்துவர்கள், Nurses மற்றும் ஆய்வுகூட Technicians உங்கள் வீட்டிற்கு வருகை தருவர், அர்ப்பணிக்கப்பட்ட 6 Vehicles இல் ஒன்றில் வருவர்.",
    aboutHead: "மருத்துவமனை சிகிச்சை உங்கள் வீட்டு வாசலுக்கே",
    body1: "வீட்டு வருகைகள் மருத்துவர்கள், Nurses மற்றும் ஆய்வுகூட Technicians ஐ உங்கள் வீட்டு வாசலுக்கே கொண்டுவருகின்றன, பயணிக்க சிரமப்படும் முதியவர்கள், குழந்தைகள் மற்றும் அறுவை சிகிச்சைக்குப் பிறகு குணமடையும் நோயாளர்களை நோக்கமாகக் கொண்டு. வருகைகள் இதற்காகவே அர்ப்பணிக்கப்பட்ட 6 Vehicles இல் இயங்குகின்றன, Appointment மூலம் ஏற்பாடு செய்யப்படும்.",
    body2: "இரத்த மாதிரி அல்லது வேறு ஏதேனும் Sample தேவைப்பட்டால், பயணிக்கச் சொல்வதற்குப் பதிலாக Sampling வீட்டிலேயே செய்யப்படும். வருகையின்போது கண்டறியப்பட்ட அல்லது பேசப்பட்ட எதுவும் நேரடியாக உங்கள் Hospital File இல் எழுதப்படும், அதனால் வேறு இடத்தில் உங்களைப் பார்க்கும் குழுவும் அதே பதிவைப் பார்க்கும்.",
    strip: [
      { k: "Vehicles எண்ணிக்கை", v: "அர்ப்பணிக்கப்பட்ட 6" },
      { k: "Sampling செய்தல்", v: "வீட்டிலேயே" },
      { k: "பதிவுகள்", v: "உங்கள் File இல்" },
      { k: "முன்பதிவு", v: "Appointment மூலம்" },
    ],
    covers: [
      "முதியவர்களுக்கான வீட்டு வருகைகள்",
      "குழந்தைகளுக்கான வீட்டு வருகைகள்",
      "Post-operative வீட்டு சிகிச்சை",
      "வீட்டிலேயே Sampling",
    ],
    conditions: [
      "வயது அல்லது Mobility காரணமாக பயணிக்க சிரமம்",
      "வீட்டில் Post-operative குணமடைதல்",
      "மருத்துவமனை வருகை சிரமமான குழந்தை பராமரிப்பு",
      "வீட்டில் இருக்கும் நோயாளிக்கு Routine Sampling",
    ],
    location: "மருத்துவமனையிலிருந்து Dispatch செய்யப்படும், தரைத் தளம்",
    steps: [
      { title: "கோரிக்கை", desc: "ஒரு வருகைக்கு கோரிக்கை வைத்து, யார் பார்க்கப்பட வேண்டும், ஏன் என்று விவரிக்கவும்." },
      { title: "திட்டமிடல்", desc: "Appointment மூலம் வருகை ஏற்பாடு செய்யப்பட்டு, அர்ப்பணிக்கப்பட்ட Vehicle ஒன்று Assign செய்யப்படும்." },
      { title: "வருகை", desc: "ஒரு மருத்துவர், Nurse அல்லது ஆய்வுகூட Technician வருகை தருவர், தேவைப்பட்டால் Sampling வீட்டிலேயே செய்யப்படும்." },
      { title: "Record செய்தல்", desc: "வருகையின் குறிப்புகள் நேரடியாக உங்கள் Hospital File இல் எழுதப்படும்." },
    ],
    prep: [
      "வருகைக்கு கோரிக்கை வைக்கும்போது உங்கள் Hospital File எண்ணை தயார் வையுங்கள்",
      "நோயாளி தற்போது எடுக்கும் மருந்துகளைக் குறித்துக் கொள்ளுங்கள்",
      "வருகைக்கு அமைதியான, அணுகக்கூடிய இடத்தைத் தயார் செய்யுங்கள்",
      "Sampling தேவைப்படும் என்று எதிர்பார்த்தால் குறிப்பிடுங்கள்",
    ],
    team: [
      { role: "வருகை மருத்துவர்கள்", note: "முதியவர்கள், குழந்தைகள் மற்றும் Post-operative நோயாளர்களுக்கு வீட்டு வருகைகளில் கலந்துகொள்வர்." },
      { role: "வருகை Nurses", note: "வீட்டு வருகைகளுக்கு உதவி, வீட்டிலேயே Sampling செய்வர்." },
      { role: "ஆய்வுகூட Technicians", note: "தேவைப்பட்டால் வீட்டிலேயே Sample எடுக்க வருவர்." },
      { role: "Vehicle Coordinator ஒருவர்", note: "வீட்டு வருகைகளுக்குப் பயன்படும் அர்ப்பணிக்கப்பட்ட 6 Vehicles ஐயும் திட்டமிடுவார்." },
    ],
    faq: [
      { q: "வீட்டு வருகைகள் யாருக்காக?", a: "இவை பயணிக்க சிரமப்படும் முதியவர்கள், குழந்தைகள் மற்றும் அறுவை சிகிச்சைக்குப் பிறகு குணமடையும் நோயாளர்களை நோக்கமாகக் கொண்டவை." },
      { q: "வீட்டிலேயே இரத்த மாதிரி எடுக்கலாமா?", a: "ஆம். பயணிக்கச் சொல்வதற்குப் பதிலாக Sampling வீட்டிலேயே செய்யப்படும்." },
      { q: "வருகையில் நடந்தது என் வழக்கமான மருத்துவருக்குத் தெரியுமா?", a: "ஆம். வருகையின் குறிப்புகள் நேரடியாக உங்கள் Hospital File இல் எழுதப்படும்." },
      { q: "வீட்டு வருகைகளை எத்தனை Vehicles உள்ளடக்கும்?", a: "வீட்டு வருகைகள் இதற்காகவே அர்ப்பணிக்கப்பட்ட 6 Vehicles இல் இயங்குகின்றன." },
    ],
  },
  {
    title: "தொலை மருத்துவம்",
    directoryTitle: "தொலை மருத்துவம்",
    hours: "தினமும்",
    cta: "Consultation ஐ Book செய்யுங்கள்",
    desc: "எங்கள் மருத்துவர்களுடன் Video மற்றும் Phone Consultations, Prescriptions Pharmacy க்கு அனுப்பப்படும் Delivery க்காக, வீட்டிற்குச் சென்ற நோயாளர்களுக்கு Follow-up உடன்.",
    tags: ["Video Consultations வழங்குதல்", "Phone Consultations வழங்குதல்", "Pharmacy க்கு Prescriptions", "பயணத்திற்குப் பின் Follow-up"],
    facts: [
      { k: "நேரம்", v: "தினமும்" },
      { k: "வகை", v: "Video அல்லது Phone" },
      { k: "Prescription குறிப்புகள்", v: "Pharmacy க்கு அனுப்பப்படும்" },
      { k: "ஒரு Follow-up", v: "வீட்டிற்குச் சென்ற நோயாளர்களுக்கு" },
    ],
    lede: "எங்கள் மருத்துவர்களுடன் Video மற்றும் Phone Consultations, எந்த Prescription உம் Delivery க்காக நேரடியாக Pharmacy க்கு அனுப்பப்படும்.",
    aboutHead: "பயணிக்காமலேயே ஒரு Consultation",
    body1: "தொலை மருத்துவம் எங்கள் மருத்துவர்களில் ஒருவருடன் Video அல்லது Phone மூலம் ஒரு Consultation வழங்குகிறது, தினமும் Book செய்யலாம். In-person Examination தேவையில்லாத Follow-up உரையாடலுக்கோ கவலைக்கோ இது பொருந்தும், மருத்துவமனைக்கு பயணிக்காமலேயே.",
    body2: "Prescription தேவைப்பட்டால், அது Pharmacy க்கு அனுப்பப்படும், பின்னர் அதை சேகரிக்கலாம் அல்லது Medicine Delivery மூலம் அனுப்பலாம். இங்கு பார்க்கப்பட்டு வீட்டிற்குச் சென்ற நோயாளர்களுடன் Follow-up க்கும் தொலை மருத்துவம் பயன்படுத்தப்படுகிறது, அவர்களின் சிகிச்சையின் அடுத்த கட்டத்திலும் அதே மருத்துவரே தொடர்கிறார்.",
    strip: [
      { k: "வகை", v: "Video அல்லது Phone" },
      { k: "முன்பதிவு", v: "தினமும்" },
      { k: "Prescription குறிப்புகள்", v: "Pharmacy க்கு" },
      { k: "ஒரு Follow-up", v: "வீட்டிற்குச் சென்ற பின்" },
    ],
    covers: [
      "Video Consultations வழங்குதல்",
      "Phone Consultations வழங்குதல்",
      "Pharmacy க்கு Prescriptions அனுப்புதல்",
      "வீட்டிற்குச் சென்ற நோயாளர்களுக்கான Follow-up",
    ],
    conditions: [
      "மருத்துவமனை வருகைக்குப் பிறகு Follow-up",
      "In-person Examination தேவையில்லாத கவலை",
      "Routine Review க்கு பயணிக்க சிரமம்",
      "தற்போதைய Prescription பற்றிய ஆலோசனை",
    ],
    location: "தொலைவிலிருந்து நடத்தப்படும், மருத்துவமனை மூலம் Book செய்யப்படும்",
    steps: [
      { title: "Book செய்தல்", desc: "ஒரு Consultation ஐ Book செய்து Video அல்லது Phone தேர்ந்துகொள்ளுங்கள்." },
      { title: "இணைதல்", desc: "Book செய்த நேரத்தில் Video அல்லது Phone மூலம் ஒரு மருத்துவருடன் இணைவீர்கள்." },
      { title: "Consult செய்தல்", desc: "மருத்துவர் உங்கள் கவலையைப் பற்றி பேசி, Follow-up Review தேவைப்பட்டால் அதை ஏற்பாடு செய்வார்." },
      { title: "Prescribe செய்தல்", desc: "எந்த Prescription உம் Collection அல்லது Delivery க்காக Pharmacy க்கு அனுப்பப்படும்." },
    ],
    prep: [
      "வேலை செய்யும் Phone அல்லது Video Connection ஒன்றை தயார் வையுங்கள்",
      "உங்கள் தற்போதைய மருந்து பட்டியலை அருகில் வையுங்கள்",
      "பேச விரும்பும் கேள்விகள் அல்லது அறிகுறிகளைக் குறித்துக் கொள்ளுங்கள்",
      "Prescription அனுப்பப்படும் என்று எதிர்பார்த்தால் Delivery Address ஐ உறுதிப்படுத்துங்கள்",
    ],
    team: [
      { role: "Consultation மருத்துவர்கள்", note: "Video மற்றும் Phone Consultations நடத்தி Follow-up ஏற்பாடு செய்வர்." },
      { role: "Pharmacy குழு", note: "தொலை மருத்துவ Consultations இலிருந்து அனுப்பப்படும் Prescriptions ஐப் பெறுவர்." },
      { role: "Booking Coordinator ஒருவர்", note: "Consultations ஐ திட்டமிட்டு Video அல்லது Phone வகையை உறுதிப்படுத்துவார்." },
    ],
    faq: [
      { q: "Video மற்றும் Phone இடையே தேர்வு செய்யலாமா?", a: "ஆம். தொலை மருத்துவம் Video மற்றும் Phone ஆகிய இரண்டையும் வழங்குகிறது." },
      { q: "தொலை மருத்துவ Consultation க்குப் பிறகு மருந்து எப்படிப் பெறுவது?", a: "எந்த Prescription உம் Pharmacy க்கு அனுப்பப்படும், பின்னர் சேகரிக்கலாம் அல்லது Medicine Delivery மூலம் அனுப்பலாம்." },
      { q: "தொலை மருத்துவம் Follow-up Visits க்கு மட்டுமா?", a: "நீங்கள் வீட்டிற்குச் சென்ற பின் Follow-up க்கும், In-person Examination தேவையில்லாத கவலைகளுக்கும் இது பயன்படுத்தப்படுகிறது." },
      { q: "Consultations எத்தனை முறை கிடைக்கும்?", a: "Consultations தினமும் Book செய்யலாம்." },
    ],
  },
];
