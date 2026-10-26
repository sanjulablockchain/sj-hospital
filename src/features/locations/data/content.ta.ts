// Tamil for the locations page.
//
// The register is code-mixed, which is how Sri Lankans actually read a
// hospital site: the sentence is Tamil, but everyday English nouns and
// clinical terms stay in English rather than being replaced by literary
// coinages nobody says out loud. So "Emergency", "OPD", "Surgery",
// "Laboratory", "Imaging", "Pharmacy", "Reception", "WhatsApp", "clinic",
// "message", "switchboard" and "American protocol" stay in English, the same
// way they already do in contact's, network's and school-wellness's own
// content.ta.ts.
//
// Both hospitals' own names stay in English throughout, the same way the
// hospital's name never changes script anywhere on this site: recasting
// "Blue Sapphire Hospital" into Tamil letters would not be a translation, it
// would be a different name. See KEEPS_ENGLISH in content.i18n.test.ts.
// "Negombo" translates to "நீர்கொழும்பு" and "Ratnapura" to "இரத்தினபுரி"
// as place names, the same as elsewhere on this site.
//
// Only translatable copy lives here. Every href, id, photo path, street
// address and fact value stays in content.ts and has exactly one home. The
// hero, the eyebrows, the headings, the fact strip and every CTA label are
// English in every language by the register rule, so they are absent here.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const hero = {
  photoAlt: "நீர்கொழும்பு St. Joseph Hospital கட்டிடம்",
};

export const tickerItems: readonly string[] = [
  "நீர்கொழும்பு: Emergency 24/7 திறந்துள்ளது",
  "இரத்தினபுரி: விவரங்கள் விரைவில்",
  "இரு மருத்துவமனைகள், ஒரே protocol",
  "Los Angeles, USA இலிருந்து நிர்வாகம்",
  "Reception எண் 0117 84 84 84",
];

export const hospitalsIntro =
  "நீர்கொழும்பு St. Joseph Hospital இப்போது திறந்துள்ளது. இரத்தினபுரி Blue Sapphire Hospital அதனுடன் இணைகிறது; அதன் முழு விவரங்கள் உறுதிப்படுத்தப்பட்டவுடன் இங்கே வெளியிடப்படும்.";

export const hospitals = [
  {
    name: "St. Joseph Hospital",
    city: "நீர்கொழும்பு",
    region: "மேல் மாகாணம்",
    statusLabel: "24/7 திறந்துள்ளது",
    body: "எங்கள் முதன்மை மருத்துவமனை: Emergency, OPD, Surgery, Inpatient, Laboratory, Imaging மற்றும் Pharmacy சேவைகள் ஆறு தளங்களில், American protocol படி இயங்குகிறது.",
    photoAlt: "நீர்கொழும்பு St. Joseph Hospital",
    address: { locality: "நீர்கொழும்பு, இலங்கை" },
    facts: [{ label: "Emergency" }, { label: "Reception" }, { label: "WhatsApp" }],
  },
  {
    name: "Blue Sapphire Hospital",
    city: "இரத்தினபுரி",
    region: "சபரகமுவ மாகாணம்",
    statusLabel: "விவரங்கள் விரைவில்",
    body: "எங்கள் இரண்டாவது மருத்துவமனை. முகவரி, தொலைபேசி எண்கள் மற்றும் திறக்கும் நேரங்களை உறுதிப்படுத்தி வருகிறோம்; அவை இங்கே வெளியிடப்படும். அதுவரை நீர்கொழும்பு switchboard உதவும்.",
  },
];

export const helpBody =
  "எங்களை அழைக்கவும் அல்லது message அனுப்பவும்; சரியான மருத்துவமனை, சரியான clinic மற்றும் வர வேண்டிய சரியான நேரத்தை நாங்கள் சொல்கிறோம்.";
