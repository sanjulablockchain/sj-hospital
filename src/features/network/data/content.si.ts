// Sinhala for the network page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Sinhala, but everyday English nouns and
// business or clinical terms stay in English rather than being replaced by
// literary coinages nobody says out loud. So "Emergency", "OPD",
// "Telemedicine", "Telehealth", "Pharmacy", "Insurance" (as the loanword
// "ඉන්ෂුවරන්ස්"), "Network" and "Group" (the corporate sense) stay in
// English or transliterated English throughout, the same way they already
// do in about's, contact's, accommodation's, home-care's and pharmacy's own
// content.si.ts.
//
// "Los Angeles" and every abbreviation of it ("LA", "Greater LA") stay in
// English wherever they appear: that is the group's own American city, the
// same way about's own content.si.ts keeps it while transliterating
// "California" to "කැලිෆෝනියාව" and "Sri Lanka" to "ශ්‍රී ලංකාව" alongside
// it. "Negombo" translates to "මීගමුව" as a place name, the same as
// elsewhere on this site; "Chilaw" and "Gampaha" translate to their own
// Sinhala names, "හලාවත" and "ගම්පහ".
//
// Every company's own name and short "wordmark" stay in English throughout,
// the same way the hospital's own name never changes script: recasting
// "Kids & Teens Medical Group" into Sinhala letters would not be a
// translation, it would be a different name. See KEEPS_ENGLISH in
// content.i18n.test.ts for the full list, with a reason for each.
//
// Sentence forms use the polite plural ("කරන්න"), which is how a hospital
// addresses a patient it has not met.
//
// Only translatable copy lives here. Every href, slug, logo path, stat
// number, glyph name and fact value stays in content.ts and has exactly one
// home.

/**
 * Not yet read by a Sinhala speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {
  strapline: "මීගමුවේ සිට Los Angeles දක්වා",
  breadcrumbHome: "මුල් පිටුව",
  breadcrumbCurrent: "අපගේ Network එක",
  headingLead: "රෝහලක්",
  headingOutline: "මීගමුවේ,",
  headingAccent: "LA සිට සහාය.",
  familyCta: "Network එක හඳුනාගන්න",
  mattersCta: "ඔබට මේකෙන් වෙන දේ",
};

export const heroStandfirst =
  "St. Joseph Hospital මෙහෙයවනු ලබන්නේ කැලිෆෝනියාවේ විශාලතම ළමා රෝග Group එකක් වන Kids & Teens Medical Group විසිනුයි. Clinical Protocols, Training සහ Second Opinions ලැබෙන්නේ එතනිනුයි.";

// The other eight companies in the group, exactly as ktdoctor.com/network
// names them. See KEEPS_ENGLISH in content.i18n.test.ts.
export const tickerItems: readonly string[] = [
  "Kids & Teens Medical Group",
  "St. Gianna Medical Group",
  "LA Intensive Pediatric Therapy",
  "Serendib Healthways",
  "After-Hours Pediatric Urgent Care",
  "ACIG Asiacorp Insurance Brokers",
  "Human Compass MSO",
  "Blockchain BPO",
];

export const heroFacts = [
  // `v` is the parent company's own name: see KEEPS_ENGLISH.
  { k: "මූලික සමූහය", v: "Kids & Teens Medical Group" },
  { k: "Group එකේ Clinics", v: "Greater LA පුරා 25" },
  { k: "පවුලේ සමාගම්", v: "නවයක්, මහාද්වීප දෙකක" },
  { k: "ශ්‍රී ලංකා අංශය", v: "මේ රෝහල, සහ ACIG" },
];

export const jumpCards = [
  { count: "ඇයි වැදගත්ද", label: "ඇඳ ලඟදී", note: "මේ සම්බන්ධතාවෙන් ඔබේ සත්කාරයට වෙන වෙනස." },
  { count: "සමාගම් 9ක්", label: "පවුල", note: "කැලිෆෝනියාව, ශ්‍රී ලංකාව, සහ සහායක අංශ." },
  { count: "ගණන්", label: "Group එකේ ප්‍රමාණය", note: "Clinics, වෛද්‍යවරු, ස්ථාන, ප්‍රකාශිත ලෙස." },
  { count: "පිළිතුරු 7ක්", label: "අප අතර යාම", note: "Referrals, Second Opinions, ඉන්ෂුවරන්ස්, රැකියා." },
];

export const mattersEyebrow = "01 / ඇඳ ලඟදී ඇයි වැදගත්ද";
export const mattersHeading = "Network එකක වටිනාකම රෝගියෙකුට තියෙනවා නම් විතරයි";
export const mattersBody =
  "බොහෝ රෝහල් Group පිටු corporate බිත්ති කඩදාසි විතරයි. මේක තියෙන්නේ මේ සම්බන්ධතාවෙන් ඔබේ සත්කාරයට වෙනස් වන විශේෂිත දේවල් නිසායි: වෛද්‍යවරු අනුගමනය කරන Protocols මොනවද, දුෂ්කර Case එකක් බලන්නේ කවුද, සහ Los Angeles හිදී සත්කාර ලබපු දරුවෙක්ට මීගමුවේ File එක අලුතින් පටන් නොගෙනම Follow-up කරන්න පුළුවන් විදිහ.";

export const practiceHeading = "ප්‍රායෝගිකව";

export const practice = [
  "Group එකෙන් උරුම වූ Paediatric සහ Emergency Protocols, ශ්‍රී ලංකාවේ Guidelines වලට අනුගත කර ඇත",
  "දුෂ්කර Paediatric Cases, Second Opinion එකක් සඳහා ඇමරිකාවේ Colleagues ලා ලවා අහන්න පුළුවන්",
  "LA සහ ශ්‍රී ලංකාව අතර යාවත් එන පවුල් තියාගන්නේ එකම අඛණ්ඩ Record එකක්",
  "Prescriptions ලියන්නේ Generic නම්වලින්, ඒ නිසා දෙපැත්තෙන්ම Dispense කරගන්න පුළුවන්",
  "Nursing සහ Technician Training Programmes ක්‍රියාත්මක වන්නේ Group එකේ Standards වලට අනුරූපවයි",
];

export const familyEyebrow = "02 / පවුල";
export const familyHeading = { line1: "සමාගම් නවයක්,", line2: "මහාද්වීප දෙකක" };
export const familyIntro =
  "කැලිෆෝනියාවේ Paediatric සහ Family Care, ශ්‍රී ලංකාවේ රෝහල් සත්කාර සහ ඉන්ෂුවරන්ස්, සහ දෙකම ක්‍රියාත්මකව තියාගන්න පරිපාලන සමාගම්.";

export const orgGroups = [
  {
    name: "ශ්‍රී ලංකාව",
    note: "රෝහල් සත්කාර සහ ඉන්ෂුවරන්ස්, Group එක විසින් ශ්‍රී ලංකාවට ගෙන එන ලද.",
    orgs: [
      {
        // `wordmark` and `name` are this company's own name: see
        // KEEPS_ENGLISH.
        wordmark: "St. Joseph Hospital",
        badge: "ඔබ මෙතනයි",
        name: "St. Joseph Hospital Negombo",
        tagline: "මීගමුවේ US Standard සත්කාරය.",
        body: "Kids & Teens Medical Group, USA විසින් මෙහෙයවනු ලබන, ජාත්‍යන්තර Airport එකේ සිට විනාඩි දහයක් දුරින්, ඇමෙරිකානු සෞඛ්‍ය සේවා Standards, දැරිය හැකි, ලබාගත හැකි සත්කාරයට ගෙන එනවා.",
        chips: ["Emergency සහ OPD", "Inpatient සත්කාර", "Telemedicine", "Pharmacy සහ Diagnostics"],
        // A statement of fact rather than a company's own domain, so it is
        // translated: see KEEPS_ENGLISH for why the other eight `cta`s are
        // not.
        cta: "මේ රෝහල",
      },
      {
        wordmark: "Asiacorp Insurance",
        badge: "ඉන්ෂුවරන්ස්",
        name: "ACIG, Asiacorp Insurance Brokers",
        tagline: "ශ්‍රී ලංකාව පුරා ඉන්ෂුවරන්ස් විසඳුම්.",
        body: "පුද්ගලයන් සහ Businesses සඳහා අවශ්‍යතාවයට ගැලපෙන Motor, Health, Life සහ Corporate Cover ලබාදෙන ඉන්ෂුවරන්ස් Brokerage එකක්, සහ අපේ රෝගීන් වඩාත්ම අහන Group සමාගම.",
        chips: ["Health ඉන්ෂුවරන්ස්", "Life ඉන්ෂුවරන්ස්", "Motor ඉන්ෂුවරන්ස්", "Corporate ඉන්ෂුවරන්ස්"],
        // This company's own domain, pinned against `href` by
        // content.test.ts: see KEEPS_ENGLISH.
        cta: "acig.lk",
      },
    ],
  },
  {
    name: "Paediatric සහ Family Care, කැලිෆෝනියාව",
    note: "Greater Los Angeles පුරා දරුවන් සහ පවුල් සඳහා දිනපතා Primary, Urgent සහ Specialty සත්කාර.",
    orgs: [
      {
        wordmark: "Kids & Teens Medical Group",
        badge: "Flagship, අපගේ මාපිය සමාගම",
        name: "Kids & Teens Medical Group",
        tagline: "ප්‍රධාන Paediatric Network එක.",
        body: "Greater LA හි Clinics 25ක් පුරා, වයස 0 සිට 21 දක්වා දරුවන් සඳහා Board Certified Paediatric සත්කාර, සහ මේ රෝහල මෙහෙයවන Group එක.",
        chips: ["මූලික සත්කාර", "හදිසි සත්කාර", "Telehealth", "අලුත උපන් සත්කාර"],
        cta: "ktdoctor.com",
      },
      {
        wordmark: "St. Gianna Medical",
        badge: "පවුල් වෛද්‍ය සේවය",
        name: "St. Gianna Medical Group",
        tagline: "සියලුම වයස්වල අයට පවුල් වෛද්‍ය සේවය.",
        body: "එදිනම Appointments සහ පැය 24ම Booking සමඟින් වැඩිහිටියන් සහ දරුවන් සඳහා සම්පූර්ණ සත්කාර, Group එක Paediatrics ඉන් ඔබ්බට ගෙන යනවා.",
        chips: ["එදිනම Appointments", "පැය 24ම Booking", "Telehealth", "දියුණු තුවාල සත්කාර"],
        cta: "sgmdoctor.com",
      },
      {
        wordmark: "LA Intensive Pediatric Therapy",
        badge: "Therapy, 2010 සිට",
        name: "LA Intensive Pediatric Therapy",
        tagline: "විශේෂඥ Paediatric Therapy.",
        body: "දරුවන් සඳහා Individual සහ Centre පාදක Speech, Occupational සහ Developmental Therapy, සහ Early Intervention සඳහා Group එකේ Reference ස්ථානය.",
        // These three are clinical therapy-service names without a natural
        // Sinhala equivalent Sri Lankans say out loud, the same reason
        // pharmacy's `stock[].name` keeps dosage-form English names: see
        // KEEPS_ENGLISH.
        chips: ["Speech therapy", "Occupational therapy", "Sensory integration"],
        cta: "laipt.org",
      },
      {
        wordmark: "Serendib Healthways",
        badge: "සෞඛ්‍ය Plans",
        name: "Serendib Healthways",
        tagline: "Greater LA පුරා Paediatric සෞඛ්‍ය Plans.",
        body: "Clinic ස්ථාන 20කට වැඩි සහ Board Certified වෛද්‍යවරු 50කට වැඩි සමඟින්, Los Angeles County පුරා දරුවන් සඳහා දැරිය හැකි Coverage ලබාදෙන Paediatric HMO සහ IPA Network එකක්.",
        // `chips[0]` is a US insurance-scheme acronym with no Sinhala
        // equivalent, and `chips[2]` is the same loanword `chips[2]` is
        // elsewhere on this page: see KEEPS_ENGLISH.
        chips: ["Paediatric HMO/IPA", "එදිනම Appointments", "Telehealth", "වෙලාවෙන් පස්සේ හදිසි සත්කාර"],
        cta: "serendibhealthways.com",
      },
      {
        wordmark: "After-Hours Pediatric Urgent Care",
        badge: "පැය 24ම",
        name: "After-Hours Pediatric Urgent Care",
        tagline: "වේලාවෙන් පිට? අපි ඔබේ දරුවන් වෙනුවෙන් මෙතන ඉන්නවා.",
        body: "California Clinics 20කට වැඩි ප්‍රමාණයක වයස 0 සිට 21 දක්වා දරුවන් සඳහා, ඕන වෙලාවක Paediatric Urgent Care, ප්‍රධාන ඉන්ෂුවරන්ස් Plans සියල්ලම පිළිගන්නවා.",
        chips: ["පැය 24ම හදිසි සත්කාර", "එදිනම Appointments", "වයස 0 සිට 21", "සියලුම ඉන්ෂුවරන්ස් පිළිගැනේ"],
        cta: "pediatricafterhour.com",
      },
    ],
  },
  {
    name: "Business සහ සහාය",
    note: "Network එක ක්‍රියාත්මකව තියාගන්න පරිපාලන සහ Outsourcing සමාගම්.",
    orgs: [
      {
        wordmark: "Human Compass MSO",
        badge: "කළමනාකරණ සේවා",
        name: "Human Compass MSO",
        tagline: "සත්කාරයට මගපෙන්වීම, මානුෂීය විසඳුම් ලබාදීම.",
        body: "වසර 25කට වැඩි කාලයක් රෝගීන් Primary, Specialty සහ Urgent Care Providers ලා සමඟ සම්බන්ධ කරන දකුණු කැලිෆෝනියාවේ Management Services Organisation එකක්.",
        chips: ["මූලික සත්කාර Network", "Specialty සත්කාර", "හදිසි සත්කාර", "Provider කළමනාකරණය"],
        cta: "humancompassmso.com",
      },
      {
        wordmark: "Blockchain BPO",
        badge: "Outsourcing සේවා",
        name: "Blockchain BPO",
        tagline: "US Businesses සඳහා Offshore කණ්ඩායම්.",
        body: "Customer Care, Claims Processing සහ Billing Support සඳහා ශ්‍රී ලංකාව සහ Mexico හි කැපවුනු Offshore කණ්ඩායම්, සහ Group එකේ විශාලතම ශ්‍රී ලාංකික Employers කෙනෙක්.",
        chips: ["පාරිභෝගික සත්කාර", "Claims සැකසීම", "Billing සහාය", "දත්ත ඇතුළත් කිරීම"],
        cta: "myblockchainbpo.com",
      },
    ],
  },
];

export const reachEyebrow = "03 / ගණන්";
export const reachHeading = { line1: "Network එකේ", line2: "එකතුව", line3: "මෙයයි." };
export const reachIntro =
  "Group සමාගම් ප්‍රකාශයට පත් කරපු Figures. පට්ට හැඟුම් දෙන අපැහැදිලි ගණනකට වඩා, කුඩා, අවංක ගණනක් ඔබට පෙන්නන එකයි අපි කැමති.";

export const reachRows = [
  { k: "Network එකේ සමාගම්", who: "ඇමරිකාව සහ ශ්‍රී ලංකාව පුරා" },
  { k: "Kids & Teens හි Clinics", who: "Greater Los Angeles ප්‍රදේශය" },
  { k: "Serendib Healthways හි ස්ථාන", who: "Los Angeles County ප්‍රදේශය" },
  { k: "Board Certified වෛද්‍යවරු", who: "Serendib Healthways Network එකේ" },
  { k: "වෙලාවෙන් පස්සේ හදිසි සත්කාර Clinics", who: "කැලිෆෝනියාව, වයස 0 සිට 21" },
  { k: "Human Compass MSO හි වසර", who: "දකුණු කැලිෆෝනියාව" },
  { k: "LA Intensive Pediatric Therapy සිට", who: "කථන, Occupational, විකාශන" },
  { k: "BPO කණ්ඩායම් සහිත රටවල්", who: "ශ්‍රී ලංකාව සහ Mexico" },
  { k: "ශ්‍රී ලංකාවේ රෝහල", who: "මේකයි, මීගමුවේ" },
];

export const referralEyebrow = "04 / අප අතර යාම";
export const referralHeading = { line1: "එකම File එකක්,", line2: "ඔබ", line3: "කොහේ හිටියත්" };

export const referralIntro =
  "Group එකේ පවුල් ඔබ හිතනවාට වඩා නිතරම Los Angeles සහ ශ්‍රී ලංකාව අතර යනවා එනවා. සීයා-ආච්චි ලඟ Summer එකක්, Semester එකක් ගෙදර, විදේශගත වූ දෙමාපියෙක්. Referral Desk එක තියෙන්නේ කාටවත් හිස් පිටුවකින් පටන් ගන්න වෙන්නේ නැති වෙන්නයි.";

export const referralCta = "Referral Desk එකෙන් අහන්න";

export const referrals = [
  {
    q: "මගේ දරුවාට Los Angeles හි Kids & Teens මගින් සත්කාර දෙනවා. ඔබට මෙතන Follow-up කරන්න පුළුවන්ද?",
    a: "ඔව්, සහ පවුල් Network එක Use කරන්නේ බහුතරයක් මේ හේතුවෙන්මයි. ගමන යන්න කලින් ඔබේ LA Paediatrician ලවා Chart එක රෝහලට එවන්න කියන්න, අපේ Paediatric කණ්ඩායම අලුතින් History එකක් පටන් ගන්නවා වඩා ඒක Read කරනවා. Growth Charts, Vaccination Records සහ දිගටම ගන්න Prescriptions ම දෙපැත්තෙන්ම එනවා, සහ මෙතන දෙන ඕන දෙයක්ම Generic නම්වලින් ලියන්නේ, එහෙනම් ඔබ ආපහු ගියාම කැලිෆෝනියාවේ Pharmacy එකට ඒක Match කරගන්න පුළුවන්.",
  },
  {
    q: "මීගමුවේ Case එකක් ඇමරිකාවේ Group එකේ වෛද්‍යවරයෙක් ලවා Review කරගන්න පුළුවන්ද?",
    a: "දුෂ්කර Paediatric Cases සඳහා, ඔව්. අපේ Consultants ලාට Imaging සහ Reports අමුණාගෙන, Second Opinion එකක් සඳහා Group එකේ Colleagues ලාට Case එකක් දාන්න පුළුවන්, සහ ඒක කරාවි නම් අපි ඔබට පැහැදිලිවම කියනවා. මේක ඇමෙරිකානු වෛද්‍යවරු මීගමුවේදී ඔබට සත්කාර දෙනවා කියන Marketing පොරොන්දුවක් නෙවෙයි; Case එකකට තව ඇස් යුවලක් හරියටම ඕන වුනොත් Use කරන සැබෑ මාර්ගයක්.",
  },
  {
    q: "Clinical Protocols හරියටම එන්නේ US පැත්තෙන්ද?",
    a: "Group එකේ Paediatric සහ Emergency Protocols තමයි ආරම්භක ලක්ෂ්‍යය, මෙතන තියෙන දේවල් සහ බහුලවම දක්නට ලැබෙන දේවල් වලට අනුගත කරගෙන. උදාහරණයක් විදිහට, Dengue Management එක අනුගමනය කරන්නේ ශ්‍රී ලංකා ජාතික Guidelines, ඒකයි මේ රටට හරි Standard එක. Infection Control එකේ හෝ Newborn Observation එකේ ඇමෙරිකානු Protocol එක තදබල නම්, අපි තියාගන්නේ තදබල එකයි.",
  },
  {
    q: "මගේ ACIG ඉන්ෂුවරන්ස් Policy එක මේ රෝහලේදීම කෙළින්ම Settle කරගන්න පුළුවන්ද?",
    a: "ACIG කියන්නේ ම පවුලේම Brokerage එකක්, Insurer කෙනෙක් නෙවෙයි, ඒ නිසා Settlement එක තීරණය වෙන්නේ Group Relationship එක මත නෙවෙයි ඔබේ Policy එක පිටිපස ඉන්න Insurer මතයි. Admission එකට කලින් ඔබේ Policy Documents Billing Desk එකට ගෙනියන්න, Direct Settlement එක Apply වෙනවද නැත්නම් අපේ Invoice Pack එකත් එක්කම පස්සේ Claim කරගන්න වෙයිද කියලා අපි ඔබට අවංකවම කියනවා.",
  },
  {
    q: "මට Group එකට වැඩ කරන්න ඕන. මම කොහෙන්ද Apply කරන්නේ?",
    a: "මීගමුවේ Clinical සහ Hospital Roles යන්නේ මේ රෝහලේම Careers පිටුව හරහායි. ශ්‍රී ලංකාවේ Blockchain BPO හි Roles, සහ කැලිෆෝනියාවේ Clinical Roles, ඒ සමාගම් විසින්ම Advertise කරනවා. අපි කිසිම අවස්ථාවකදී Candidates ලාගෙන් Fee එකක් අය කරගන්නේ නෑ, සහ Group එකේ කිසිම කෙනෙක්ට ඔබෙන් ඒක ඉල්ලන්න අවසර නෑ.",
  },
  {
    q: "අලුත් Partner Hospitals හෝ Referring Doctors ලා Accept කරනවද?",
    a: "ඔව්, විශේෂයෙන්ම Admission දෙන්න අයිතිය ඕන කරන මීගමුව, හලාවත සහ ගම්පහ වල Consultants ලා, සහ විදේශයෙන් එන රෝගීන් සඳහා Airport ලඟ Partner කෙනෙක් හොයන රෝහල්. රෝහලට ලියන්න, ඒ Enquiry එක Marketing Inbox එකකට නෙවෙයි Medical Director ලඟටම යනවා.",
  },
  {
    q: "ඇමෙරිකානු Group එකක Part එකක් වීම නිසා Treatment එක වඩා මිල අධික වෙනවද?",
    a: "නෑ, සහ මේ Arrangement එකේ අදහසම ඊට Opposite එකයි. Prices Set කරන්නේ ශ්‍රී ලංකා Market එකට, සහ ඔබ Commit කරන්න කලින්ම Estimate එකේ Publish කරනවා. Group එකෙන් ලැබෙන්නේ Protocols, Training සහ Purchasing Scale එකයි, Import කරගත්ත Cost Base එකක් නෙවෙයි.",
  },
];

export const contactEyebrow = "05 / අප හා සම්බන්ධ වෙන්න";
export const contactHeading = { line1: "Network එකේ", line2: "කොහෙන් පටන්", line3: "ගත්තත් හරි." };
export const contactIntro =
  "රෝගීන්, Partner Hospitals, Insurers සහ Group එකත් එක්ක වැඩ කරන්න බලාපොරොත්තු වන ආයතන: රෝහලට කෙළින්ම සම්බන්ධ වෙන්න, අපි ඔබව හරි සමාගමට Route කරනවා.";

// `contactRows[0].value` (the hospital's own phone number) is absent here on
// purpose: see the file header and `isUntranslatable` in
// content.i18n.test.ts.
export const contactRows = [
  { label: "රෝහලට Call කරන්න" },
  { label: "රෝහලට Email කරන්න" },
  { label: "Group එකේ Network පිටුව" },
  { label: "Treatment සඳහා Travel කිරීම" },
];

export const disclaimer =
  "මේ පිටුවේ තියෙන Company නම්, Logos සහ Figures අදාළ Group සමාගම් සහ Partners ලාට අයිතියි, සහ ඒවා පෙන්නන්නේ ඒ අය Publish කරපු විදිහටමයි. හැම සමාගමක්ම එයාගේම Services සහ එයාගේම බල ප්‍රදේශයේ Regulatory බැඳීම් වලට වගකියනවා.";
