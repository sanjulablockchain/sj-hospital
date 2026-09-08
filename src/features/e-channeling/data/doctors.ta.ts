// Tamil for the e-channeling consultant list.
//
// Only `specialization` is here. `name` is a proper noun, exactly like the
// hospital's own name, and never changes script; content.i18n.test.ts
// excludes it by path rather than listing all 71 names. `calendlySlug` is a
// URL fragment and stays in doctors.ts too.
//
// The 28 specialities below use the same vocabulary as the hero's ticker
// (content.ta.ts's tickerItems) and, where one already exists, the same
// wording as navigationLabels.ta.ts's "Find a consultant" so the site says a
// speciality the same way everywhere it appears.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state, and `-- --require-reviewed` exits non-zero while any
 * remain.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

// One entry per row in doctors.ts, in the same order, index for index.
export const doctors = [
  { specialization: "மகப்பேறு மற்றும் மகளிர் நோய் நிபுணர்" },
  { specialization: "மகப்பேறு மற்றும் மகளிர் நோய் நிபுணர்" },
  { specialization: "மகப்பேறு மற்றும் மகளிர் நோய் நிபுணர்" },
  { specialization: "மகப்பேறு மற்றும் மகளிர் நோய் நிபுணர்" },
  { specialization: "மகப்பேறு மற்றும் மகளிர் நோய் நிபுணர்" },
  { specialization: "குழந்தை மருத்துவ நிபுணர்" },
  { specialization: "குழந்தை மருத்துவ நிபுணர்" },
  { specialization: "குழந்தை மருத்துவ நிபுணர்" },
  { specialization: "குழந்தை மருத்துவ நிபுணர்" },
  { specialization: "குழந்தை மருத்துவ நிபுணர்" },
  { specialization: "குழந்தை மருத்துவ நிபுணர்" },
  { specialization: "குழந்தை மருத்துவ நிபுணர்" },
  { specialization: "குழந்தை மருத்துவ நிபுணர்" },
  { specialization: "பொது மருத்துவ நிபுணர்" },
  { specialization: "பொது மருத்துவ நிபுணர்" },
  { specialization: "பொது மருத்துவ நிபுணர்" },
  { specialization: "பொது மருத்துவ நிபுணர்" },
  { specialization: "பொது மருத்துவ நிபுணர்" },
  { specialization: "பொது மருத்துவ நிபுணர்" },
  { specialization: "பொது மருத்துவ நிபுணர்" },
  { specialization: "அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "எலும்பியல் அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "எலும்பியல் அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "மூட்டு நோய் நிபுணர்" },
  { specialization: "மூட்டு நோய் நிபுணர்" },
  { specialization: "மூட்டு நோய் நிபுணர்" },
  { specialization: "இதய நோய் நிபுணர்" },
  { specialization: "இதய நோய் நிபுணர்" },
  { specialization: "இதய நோய் நிபுணர்" },
  { specialization: "இதய நோய் நிபுணர்" },
  { specialization: "கண் அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "கண் அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "கண் அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "தோல் நோய் நிபுணர்" },
  { specialization: "தோல் நோய் நிபுணர்" },
  { specialization: "தோல் நோய் நிபுணர்" },
  { specialization: "தோல் நோய் நிபுணர்" },
  { specialization: "நரம்பியல் நோய் நிபுணர்" },
  { specialization: "நரம்பியல் நோய் நிபுணர்" },
  { specialization: "சிறுநீரக நோய் நிபுணர்" },
  { specialization: "மனநல மருத்துவ நிபுணர்" },
  { specialization: "மனநல மருத்துவ நிபுணர்" },
  { specialization: "ENT அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "ENT அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "ENT அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "இரைப்பை குடல் மற்றும் கல்லீரல் நோய் நிபுணர்" },
  { specialization: "நாளமில்லச் சுரப்பி நோய் நிபுணர்" },
  { specialization: "மார்பு நோய் நிபுணர்" },
  { specialization: "மார்பு நோய் நிபுணர்" },
  { specialization: "நரம்பியல் அறுவை சிகிச்சை நிபுணர்" },
  { specialization: "இரத்த நோய் நிபுணர்" },
  { specialization: "சிறுநீரியல் நிபுணர்" },
  { specialization: "திசு நோயியல் நிபுணர்" },
  { specialization: "கதிரியக்கவியல் நிபுணர்" },
  { specialization: "கதிரியக்கவியல் நிபுணர்" },
  { specialization: "கதிரியக்கவியல் நிபுணர்" },
  { specialization: "செவிவழி பரிசோதனை நிபுணர்" },
  { specialization: "செவிவழி பரிசோதனை நிபுணர்" },
  { specialization: "கருவுறுதல் ஆலோசனை நிபுணர்" },
  { specialization: "பேச்சு சிகிச்சை நிபுணர்" },
  { specialization: "பிசியோதெரபி நிபுணர்" },
  { specialization: "பிசியோதெரபி நிபுணர்" },
  { specialization: "ஊட்டச்சத்து நிபுணர்" },
  { specialization: "உளவியல் ஆலோசனை" },
  { specialization: "ஆலோசனை உளவியல் நிபுணர்" },
];
