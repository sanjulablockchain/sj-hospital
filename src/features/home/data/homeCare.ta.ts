// Tamil for the home page's `#home-care` band.
//
// "Sampling at home", "Telemedicine" and "Care at home" already have a
// site-wide translation in navigationLabels.ta.ts, and this band links to all
// three, so the matching card titles and `sectionEyebrow` reuse those exact
// strings rather than inventing second translations of the same phrases.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const homeCareCards = [
  {
    // Reused from navigationLabels.ta.ts's "Home visit services" root.
    title: "வீட்டு வருகை சேவைகள்",
    body: "மருத்துவர்கள், Nurses மற்றும் ஆய்வக Technicians உங்கள் வாசலுக்கு, பிரத்யேக Vehicles 6 இல்.",
    linkLabel: "முதியோருக்கும், குழந்தைகளுக்கும், குணமடைபவர்களுக்கும்",
  },
  {
    // Reused verbatim from navigationLabels.ta.ts's "Sampling at home".
    title: "வீட்டில் மாதிரி சேகரிப்பு",
    body: "நோயாளி இருக்கும் இடத்திலேயே Samples எடுக்கப்பட்டு, மருத்துவமனையின் சொந்த ஆய்வகத்தில் Process செய்யப்படும்.",
    linkLabel: "கண்டுபிடிப்புகள் உங்கள் File இல்",
  },
  {
    // Reused verbatim from navigationLabels.ta.ts's "Telemedicine".
    title: "தொலை மருத்துவம்",
    body: "Video அல்லது Phone மூலம் Consultations, Prescription ஏதேனும் இருந்தால் நேரடியாக Pharmacy க்கு.",
    linkLabel: "வர வேண்டிய அவசியமில்லை",
  },
];

// Reused verbatim from navigationLabels.ta.ts's "Care at home" -> "வீட்டு சிகிச்சை".
export const sectionEyebrow = "06 / வீட்டு சிகிச்சை";
export const heading = { line1: "சில நோயாளர்களால்", line2: "வர முடியாது" };
export const body =
  "அதற்குப் பதிலாக எங்கள் மருத்துவர்கள், Nurses மற்றும் ஆய்வக Technicians உங்கள் வீட்டிற்கு வருகிறார்கள், முதியோர், குழந்தைகள் மற்றும் அறுவை சிகிச்சைக்குப் பிறகு குணமடைபவர்களுக்காக. Visit இன் குறிப்புகள் நேரடியாக உங்கள் மருத்துவமனை File இல் சேர்க்கப்படும்.";
export const cta = "வீட்டு Visit ஒன்று எப்படி வேலை செய்கிறது";
