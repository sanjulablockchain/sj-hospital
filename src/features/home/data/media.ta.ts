// Tamil for the home page's `#media` band.
//
// "Media" itself stays in English throughout, the same site-wide precedent
// navigationLabels.ta.ts's own KEEPS_ENGLISH entry sets for this exact word
// (see content.i18n.test.ts's own KEEPS_ENGLISH for `sectionEyebrow`).
// "Gallery" reuses navigationLabels.ta.ts's "Image library" root rather than
// coining a second translation of the same idea. `mediaItems[*].date` is a
// press date, a fact rather than copy, excluded from parity the same way
// `media`'s own content.i18n.test.ts excludes every `.date` path.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const mediaItems = [
  { title: "Digital X-ray Suite ஆனது Outpatients க்கு திறக்கப்படுகிறது", tag: "செய்தி" },
  {
    // "School Wellness" reused verbatim from navigationLabels.ta.ts.
    title: "பள்ளி நல்வாழ்வு பயணத்தில் 5,000 மாணவர்கள் Screen செய்யப்பட்டனர்",
    tag: "அறிக்கை",
  },
  { title: "இரு மணி நேரத்திற்கு ஒருமுறை சுத்தம் செய்யப்படும் மருத்துவமனைக்கு உள்ளே", tag: "பத்திரிகை" },
  { title: "புதிய அறுவை சிகிச்சை பிரிவு: திறப்பு Gallery", tag: "பட நூலகம்" },
];

// "Media" is KEEPS_ENGLISH here, same as navigationLabels.ta.ts's own entry.
export const sectionEyebrow = "12 / Media";
export const heading = { line1: "செய்தி, பத்திரிகை", line2: "மற்றும் பட நூலகம்" };
export const cta = "Media விசாரணைகள்";
