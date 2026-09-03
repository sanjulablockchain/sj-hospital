// Tamil for the home page's `#facilities` band.
//
// Same code-mixed register as the rest of this feature: the sentence is
// Tamil, everyday English nouns and clinical/engineering terms stay in
// English. "Ambulance", "Imaging" and "Digital X-ray" stay English throughout,
// the same site-wide precedent `career`'s, `media`'s, `network`'s and the
// standalone `facilities` feature's own content.ta.ts already establish.
// "Laboratory" translates to "ஆய்வகம்", also matching those files.
//
// "Facilities" already has a site-wide translation in navigationLabels.ta.ts
// for this exact page's own header and footer links, so `sectionEyebrow`
// reuses that exact string rather than inventing a second one.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const facilities = [
  {
    title: "ஆறு மாடி மருத்துவமனை",
    body: "நீர்கொழும்பில் விசேடமாக கட்டப்பட்டது, கூரையுள்ள Ambulance Bay மற்றும் நுழைவுடன்.",
    linkLabel: "Ambulance Bay 24/7 திறந்திருக்கும்",
  },
  {
    title: "Outpatient பிரிவு",
    body: "அதே நாள் Triage உடன் Consulting Suites, நெரிசலில்லாத காத்திருப்பு அறை.",
    linkLabel: "அதே நாள் Triage",
  },
  {
    title: "Imaging, ஆய்வகம் மற்றும் அறுவை சிகிச்சை அரங்குகள்",
    body: "Digital X-ray, 24 மணி நேர ஆய்வகம் மற்றும் தூய்மையான Surgical Suites.",
    linkLabel: "Reports இரு முறை படிக்கப்படும்",
  },
  {
    title: "தங்கும் அறைகள்",
    body: "Private மற்றும் Semi Private, இரு மணி நேரத்திற்கு ஒருமுறை Sanitise செய்யப்படும். ஓர் இரவுக்கு 10,000 LKR முதல்.",
    linkLabel: "அறைகளைப் பார்க்கவும்",
  },
];

// Reused verbatim from navigationLabels.ta.ts's "Facilities" -> "வசதிகள்".
export const sectionEyebrow = "04 / வசதிகள்";
export const heading = { line1: "US Facility", line2: "ஒன்று போல கட்டப்பட்டது" };
