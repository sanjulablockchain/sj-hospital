// Sinhala for the home page's `#facilities` band.
//
// Same code-mixed register as the rest of this feature: the sentence is
// Sinhala, everyday English nouns and clinical/engineering terms stay in
// English. "Ambulance", "Imaging" and "Digital X-ray" stay English throughout,
// the same site-wide precedent `career`'s, `media`'s, `network`'s and the
// standalone `facilities` feature's own content.si.ts already establish.
// "Laboratory" translates to "රසායනාගාරය", also matching those files.
//
// "Facilities" already has a site-wide translation in navigationLabels.si.ts
// for this exact page's own header and footer links, so `sectionEyebrow`
// reuses that exact string rather than inventing a second one.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const facilities = [
  {
    title: "තට්ටු හයක රෝහලක්",
    body: "මීගමුවේ විශේෂයෙන් තැනූ, වහලක් සහිත Ambulance Bay එකයි පිවිසුමයි සමඟ.",
    linkLabel: "Ambulance Bay එක පැය 24ම විවෘත",
  },
  {
    title: "Outpatient අංශය",
    body: "එදිනම Triage එකක් සහිත Consulting Suites, තදබදයක් නැති බලා සිටින කාමරයක්.",
    linkLabel: "එදිනම Triage",
  },
  {
    title: "Imaging, රසායනාගාරය සහ ශල්‍යාගාර",
    body: "Digital X-ray, පැය 24ම විවෘත රසායනාගාරයක් සහ පිරිසිදු Surgical Suites.",
    linkLabel: "Reports දෙපාරක්ම කියවනවා",
  },
  {
    title: "රැඳී සිටින කාමර",
    body: "Private සහ Semi Private, පැය දෙකට සැරයක් Sanitise කරනවා. රාත්‍රියට 10,000 LKR සිට.",
    linkLabel: "කාමර බලන්න",
  },
];

// Reused verbatim from navigationLabels.si.ts's "Facilities" -> "පහසුකම්".
export const sectionEyebrow = "04 / පහසුකම්";
export const heading = { line1: "US Facility", line2: "එකක් වගේ හදලා" };
