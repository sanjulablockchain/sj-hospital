// Tamil for the laboratory price list page.
//
// Code-mixed register, as on every other page: the sentence is Tamil and
// the everyday English nouns people actually say stay English ("Lab",
// "Report", "Test", "OPD", "Counter", "Request Form"). Polite plural
// sentence forms. Western numerals, and the `{count}` / `{fromPrice}` /
// `{n}` tokens are kept exactly, since the page fills them.
//
// Per the register rule (docs/superpowers/i18n-register-rule.md) the hero,
// the eyebrows, the headings, the CTAs, the filter row and the column
// headers are ABSENT here and render in English; what remains is prose.
//
// "229/10 St. Joseph Street" in `bookIntro` never changes script.

/**
 * Not yet read by a Tamil speaker. `npm run i18n:status` lists every file
 * still in this state.
 */
export const __review = { status: "draft", reviewer: null, date: null } as const;

export const listIntro =
  "Test இன் பெயரையோ உங்கள் Request Form இல் உள்ள Code ஐயோ Type செய்யுங்கள். விலைகள் இலங்கை ரூபாயில், Report உட்பட; OPD நோயாளிகள் Counter இல் குறைவாகச் செலுத்துவார்கள்.";

export const table = {
  showingTemplate: "{total} இல் {n} காட்டப்படுகிறது",
  empty: "அந்தப் பெயருக்குப் பொருந்தும் Test இல்லை. குறுகிய சொல்லையோ Test Code ஐயோ Try செய்யுங்கள்.",
};

export const turnaroundTemplate = { one: "ஒரு நாள்", many: "{n} நாட்கள்" };

export const howIntro =
  "பட்டியலில் உள்ள ஒவ்வொரு Test க்கும் ஒரே நான்கு படிகள், நீங்கள் Request Form உடன் வந்தாலும், நாங்கள் வீட்டில் Sample எடுத்தாலும் சரி.";

export const bookIntro =
  "229/10 St. Joseph Street, நீர்கொழும்பு, தரை தளத்தில் Lab Reception. Request Form உடன் நேரடியாக வாருங்கள், அல்லது Call செய்யுங்கள், வீட்டில் Sample எடுக்க நேரம் ஏற்பாடு செய்கிறோம்.";
