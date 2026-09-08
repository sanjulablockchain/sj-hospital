// Sinhala for every route's meta `description`. See pageMetadata.ts for what
// stays out of this file (services/[slug], both interpolation tokens) and
// pageMetadata.i18n.test.ts for the parity gate.
//
// Same register as every other overlay on this branch: the sentence is
// Sinhala, everyday English nouns and product names stay in English.
//
// Every route's `title` is deliberately ABSENT here, per the register policy
// (`docs/superpowers/i18n-register-rule.md`, `registerPolicy.ts`) and the
// owner's ruling on 2026-09-09: a route's `<title>` is a page name, and a tab
// title must not disagree with the menu label for the same page, which is now
// English (see navigationLabels.si.ts). `getPageMetadata` reads this file
// through `localize`, so the missing key falls back to the English title.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const pageMetadata = {
  home: {
    description:
      "මීගමුව, ශ්‍රී ලංකාවේ ඇමරිකානු ප්‍රමිතියේ සෞඛ්‍ය සේවා. 24/7 OPD, Emergency, Pharmacy, House Doctors, සහ Digital X-ray, 10,000 LKR සිට ආරම්භ වන රෝගී කාමර සමඟ.",
  },
  aboutUs: {
    description:
      "මීගමුව, ශ්‍රී ලංකාවේ ඇමරිකානු ප්‍රමිතියේ, උසස් තත්ත්වයේ සෞඛ්‍ය සේවා, Kids & Teens Medical Group, USA මගින් පවත්වාගෙන යනු ලැබේ.",
  },
  accommodation: {
    description:
      "St. Joseph Hospital Negombo හි Standard, Deluxe, Super Deluxe කාමර, සහ වාට්ටු, දැරිය හැකි මිල ගණන්වලින් ආරම්භ වේ.",
  },
  careers: {
    description:
      "St. Joseph Hospital Negombo හි විවෘත Roles: වෛද්‍ය, Nursing, Allied Health, Pharmacy සහ පරිපාලන. අපි කිසිම අවස්ථාවක අයදුම්කරුවන්ගෙන් Fee එකක් අය කරන්නේ නෑ, සහ හැම Application එකකටම අපි පිළිතුරු දෙනවා.",
  },
  contactUs: {
    description:
      "St. Joseph Hospital Negombo සමඟ සම්බන්ධ වන්න: ලිපිනය, දුරකථනය, Email, සහ සම්බන්ධතා Form එකක්.",
  },
  eChanneling: {
    description:
      "St. Joseph Hospital Negombo හි වෛද්‍යවරුන් විශේෂඥතාව අනුව සොයන්න, සහ Calendly හරහා Online වේලාවක් වෙන් කර ගන්න.",
  },
  facilities: {
    description:
      "St. Joseph Hospital Negombo ඇතුළත: විශේෂයෙන් තැනූ තට්ටු 6ක්, ශල්‍යාගාර, Monitor කරන දැඩි සත්කාරය, පැය 24ම විවෘත රසායනාගාරයක්, කාමර වර්ග හතරක් සහ වහලක් සහිත Ambulance Bay එකක්.",
  },
  healthTips: {
    // {articleCount} / {warningCount} are the interpolation tokens; see
    // pageMetadata.ts. "written by our own clinicians" and "the conditions
    // that turn up in Negombo" reuse pageContent.si.ts's own
    // verticalLabel/body wording verbatim.
    description:
      "{articleCount} සෞඛ්‍ය උපදෙස් අපේම වෛද්‍යවරු ලියපු, {warningCount} දැන්ම එන්න ඕන කියන සලකුණු, වයස අනුව පරීක්ෂණ සහ නිවසේ ප්‍රථමාධාර, මීගමුවේ ඇත්තටම එන තත්ත්ව සඳහා.",
  },
  homeCare: {
    // Every fact here reuses content.si.ts's own tickerItems wording
    // verbatim: "වෛද්‍යවරු, හෙදියන් සහ Laboratory technicians", "වෙන් වූ
    // Vehicles 6ක්", "Sample ගැනීම නිවසේදීම", "ඔබේ Hospital file එකට සටහන්".
    description:
      "වෛද්‍යවරු, හෙදියන් සහ Laboratory technicians ඔබේ නිවසට පැමිණෙනවා, වෙන් වූ Vehicles 6ක් මත, වයෝවෘද්ධ, කුඩා දරුවන් සහ සැත්කමකට පසු සුවය ලබන අයට. Samples නිවසේදීම ගන්නවා, සොයාගැනීම් ඔබේ Hospital file එකට සටහන් වෙනවා.",
  },
  internationalCare: {
    // Reuses content.si.ts's own "විනාඩි දහයයි", "ලිඛිත Estimate එක" and
    // "Insurance ලේඛන" phrasing verbatim.
    description:
      "Bandaranaike International Airport සිට විනාඩි දහයයි. Desk එකක් Transfer එක, ලිඛිත Estimate එක, Interpreter, Insurance ලේඛන සහ ඔබ ගෙදර ගෙනියන Records සකසනවා.",
  },
  media: {
    // "පුවත් කාමරය" (Newsroom), "මාධ්‍ය මේසය" (press desk) and "මාධ්‍ය
    // කට්ටලය" (press kit) all reused verbatim from earlier drafts of
    // navigationLabels.si.ts; "රූගත කිරීම සහ රෝගී පුද්ගලිකත්වය" reuses
    // "Filming and privacy"'s own translation, with "රෝගී" added for
    // "patient".
    description:
      "St. Joseph Hospital, මීගමුව සඳහා පුවත් කාමරය, මාධ්‍ය මේසය සහ මාධ්‍ය කට්ටලය. නම් කළ ප්‍රකාශකයින්, අනුමත Logo, අනුමත ඡායාරූප, සහ රූගත කිරීම සහ රෝගී පුද්ගලිකත්වය පිළිබඳ නීති.",
  },
  network: {
    // "නවයෙන් එකක්" / "මහාද්වීප දෙකක" reuse content.si.ts's own heroFacts
    // ("Companies in the family" -> "නවයක්, මහාද්වීප දෙකක") verbatim.
    description:
      "St. Joseph Hospital ක්‍රියාත්මක කරන්නේ Los Angeles හි Kids & Teens Medical Group, මහාද්වීප දෙකක සමාගම් නවයෙන් එකක්. මේ සම්බන්ධතාවෙන් ඔබේ සත්කාරයට වෙනස් වන දේ, සහ පවුලේ ඉන්නා අනිත් අය.",
  },
  pharmacy: {
    // "Authorized Stock", "Counter", "Order", "Pharmacist", "Hospital File",
    // "Prescriptions" and "Delivery" all reuse content.si.ts's own
    // KEEPS_ENGLISH register for this feature verbatim.
    description:
      "St. Joseph Hospital Negombo හි පැය 24ම විවෘත Pharmacy Counter එකක්: Authorized Stock විතරයි, හැම Order එකක්ම Pharmacist කෙනෙක් විසින් ඔබේ Hospital File එකට සසඳා පරීක්ෂා කරනවා, Repeat Prescriptions Digital ලෙස තියාගන්නවා, සහ මීගමුව පුරාම Delivery.",
  },
  privacyPolicy: {
    description:
      "St. Joseph Hospital Negombo හි පුද්ගලිකත්ව ප්‍රතිපත්තිය: අපි ඔබේ පුද්ගලික දත්ත රැස් කරන, භාවිතා කරන, සහ ආරක්ෂා කරන ආකාරය.",
  },
  schoolWellness: {
    // "දෘෂ්ටිය" (vision), "ශ්‍රවණය" (hearing), "දන්ත" (dental), "වර්ධනය"
    // (growth) and "ඉරියව්ව" (posture) all reuse content.si.ts's own
    // `stations[*].title` verbatim; "ගුරු" (teacher) and "දෙමව්පියෙකුටම"
    // (every parent) reuse this feature's own established words.
    description:
      "ළමා රෝග විශේෂඥ මගින් මෙහෙයවන පරීක්ෂණ වැඩසටහනක් ඔබේ පාසලට එනවා: හැම ශිෂ්‍යයෙකුටම දෘෂ්ටිය, ශ්‍රවණය, දන්ත, වර්ධනය සහ ඉරියව්ව පරීක්ෂණ, ගුරු First Aid පුහුණුව, සහ හැම දෙමව්පියෙකුටම වාර්තාවක් ගෙදරට.",
  },
  services: {
    // {total} / {groupList} are the interpolation tokens; see pageMetadata.ts.
    description: "St. Joseph Hospital Negombo හි කාණ්ඩ හයක් ({groupList}) පුරා වෛද්‍ය සේවා {total}ක්.",
  },
};
