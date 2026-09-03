// Tamil for the home page's `#tips` band.
//
// "Dengue" is written as "டெங்கு" rather than kept in English letters,
// matching navigationLabels.ta.ts's own "Dengue at home" -> "வீட்டில் டெங்கு
// சிகிச்சை": that is how this specific word is written site-wide, unlike
// "Emergency" or "OPD".
//
// "Health tips" already has a site-wide translation in navigationLabels.ta.ts
// for this exact page's own header and footer links, so `sectionEyebrow` and
// `cta` reuse that root rather than inventing a second one.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const healthTips = [
  {
    category: "குழந்தை மருத்துவம்",
    title: "குழந்தைக்கு காய்ச்சல்: காத்திருக்க வேண்டிய நேரம், வர வேண்டிய நேரம்",
    excerpt: "இரவு வருகை மதிப்புள்ளதாக்கும் மூன்று அறிகுறிகள்.",
  },
  {
    category: "தடுப்பு",
    title: "நாற்பதுக்குப் பிறகு செய்யத் தகுந்த ஆண்டு பரிசோதனைகள் ஐந்து",
    excerpt: "எங்கள் Physicians Order செய்வது, மற்றும் தவிர்ப்பது.",
  },
  {
    category: "டெங்கு",
    title: "மழைக்காலம்: வீட்டில் டெங்கு அபாயத்தைக் குறைக்கும் வழி",
    excerpt: "வாரத்திற்கு இருபது நிமிடங்கள் உங்கள் தோட்டம் மற்றும் Gutters சுற்றி.",
  },
  {
    category: "குணமடைதல்",
    title: "அறுவை சிகிச்சைக்குப் பிறகு இரு வாரங்களில் சரியாக உண்ணுதல்",
    excerpt: "குணமடைவை விரைவாக்கும் Protein, திரவம் மற்றும் தூக்க Targets.",
  },
];

// Reused verbatim from navigationLabels.ta.ts's "Health tips" -> "சுகாதார ஆலோசனைகள்".
export const sectionEyebrow = "09 / சுகாதார ஆலோசனைகள்";
export const heading = { line1: "சிறிய பழக்கங்கள்,", line2: "எழுதுவது", line3: "எங்கள் மருத்துவர்கள்" };
export const cta = "அனைத்து சுகாதார ஆலோசனைகளும்";
