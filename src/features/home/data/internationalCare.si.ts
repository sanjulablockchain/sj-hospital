// Sinhala for the home page's `#international` band.
//
// Same register the standalone `international-care` feature's own
// content.si.ts already established: "Bandaranaike International" stays
// English (the airport's own official name), "Insurance", "Interpreter",
// "Imaging" and "Discharge" stay English inside the sentence. "International
// patient care" and "International care" already have a site-wide
// translation in navigationLabels.si.ts, so `sectionEyebrow` and `ctaPrimary`
// reuse those roots rather than inventing second translations.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const internationalCareItems = [
  {
    title: "Airport සිට Bed එක දක්වා",
    body: "Bandaranaike International සිට විනාඩි දහයක්. ඔබ Land වෙන්න කලින් Transfer එකයි Admission එකයි සකසනවා.",
  },
  {
    title: "ලිඛිත Estimates",
    body: "ඔබේ Currency එකෙන්ම Cost කරගත් Treatment Plan එකක්, මොකක් හරි පටන් ගන්න කලින් Approve කරලා.",
  },
  {
    title: "Insurance සහ Claims",
    body: "ජාත්‍යන්තර Insurers ලාටයි Travel Policies සඳහායි Documentation සකසනවා.",
  },
  {
    title: "භාෂා සහාය",
    body: "English කතා කරන Clinicians, ඉල්ලීම මත Interpreters සකසමින්.",
  },
  {
    title: "ගෙදර ගෙනියන්න Records",
    body: "Digital Reports, Imaging සහ Discharge සටහන් ගෙදර ඔබේ වෛද්‍යවරයාට යවනවා.",
  },
  {
    title: "අන්තර්ජාලයෙන් Follow-up",
    body: "ඔබ ආපහු පිටරට ගියාට පස්සේ Telemedicine එකෙන් Treatment එකෙන් පස්සේ Review එකක්.",
  },
];

// Reused verbatim from navigationLabels.si.ts's "International patient care".
export const sectionEyebrow = "08 / විදේශීය රෝගී සත්කාර";
export const heading = { line1: "සත්කාරය සඳහා", line2: "Travel කරනවද, නැත්නම්", line3: "බැහැදාන්නද විතරයි" };
export const body =
  "මීගමුව ජාත්‍යන්තර Airport එකෙන් විනාඩි දහයක් දුරින්. Visitors ලා, Expatriates ලා සහ Medical Travelers ලා පැමිණීමේ ඉඳන් ගෙදර Follow-up එක දක්වා අපි බලාගන්නවා.";
// Reused verbatim from navigationLabels.si.ts's "International care" -> "විදේශීය සත්කාර".
export const ctaPrimary = "විදේශීය සත්කාර බලන්න";
export const ctaSecondary = "Desk එකට කතා කරන්න";
