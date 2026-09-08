// Sinhala for every route's `<title>` and meta `description`. See
// pageMetadata.ts for what stays out of this file (services/[slug], both
// interpolation tokens) and pageMetadata.i18n.test.ts for the parity gate.
//
// Same register as every other overlay on this branch: the sentence is
// Sinhala, everyday English nouns and product names stay in English. Where a
// route's own feature already translates the exact same fact (a nav label, a
// hero line, a ticker item), that translation is reused verbatim rather than
// re-coined; each such reuse is called out below.
//
// `home.title` and `pharmacy.title` are deliberately identical to the
// English (see pageMetadata.ts's header comment and this file's
// KEEPS_ENGLISH in pageMetadata.i18n.test.ts), so both are still written out
// in full here rather than omitted, the same way chromeCopy.si.ts writes out
// "whatsapp" in full even though it stays English.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const pageMetadata = {
  home: {
    // The motto stays English as a brand mark; see pageMetadata.ts.
    title: "St. Joseph Hospital Negombo | To Live Is a Privilege",
    description:
      "මීගමුව, ශ්‍රී ලංකාවේ ඇමරිකානු ප්‍රමිතියේ සෞඛ්‍ය සේවා. 24/7 OPD, Emergency, Pharmacy, House Doctors, සහ Digital X-ray, 10,000 LKR සිට ආරම්භ වන රෝගී කාමර සමඟ.",
  },
  aboutUs: {
    // Reused verbatim from navigationLabels.si.ts's "About us" -> "අප ගැන".
    title: "අප ගැන | St. Joseph Hospital Negombo",
    description:
      "මීගමුව, ශ්‍රී ලංකාවේ ඇමරිකානු ප්‍රමිතියේ, උසස් තත්ත්වයේ සෞඛ්‍ය සේවා, Kids & Teens Medical Group, USA මගින් පවත්වාගෙන යනු ලැබේ.",
  },
  accommodation: {
    // Reused verbatim from navigationLabels.si.ts's own entry.
    title: "නවාතැන් පහසුකම් | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo හි Standard, Deluxe, Super Deluxe කාමර, සහ වාට්ටු, දැරිය හැකි මිල ගණන්වලින් ආරම්භ වේ.",
  },
  careers: {
    // Reused verbatim from navigationLabels.si.ts's own entry.
    title: "රැකියා | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo හි විවෘත Roles: වෛද්‍ය, Nursing, Allied Health, Pharmacy සහ පරිපාලන. අපි කිසිම අවස්ථාවක අයදුම්කරුවන්ගෙන් Fee එකක් අය කරන්නේ නෑ, සහ හැම Application එකකටම අපි පිළිතුරු දෙනවා.",
  },
  contactUs: {
    // Reused verbatim from navigationLabels.si.ts's "Contact us".
    title: "අප හා සම්බන්ධ වන්න | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo සමඟ සම්බන්ධ වන්න: ලිපිනය, දුරකථනය, Email, සහ සම්බන්ධතා Form එකක්.",
  },
  // The page-name half reuses e-channeling's own hero copy ("Make an
  // appointment." -> headingLead/headingAccent "වේලාවක් වෙන් කරන්න."), the
  // same fact this page's own title names, rather than the nav dictionary's
  // "Book a doctor" (a related but different phrase, about who you book, not
  // that you're booking a slot).
  eChanneling: {
    title: "වේලාවක් වෙන් කරන්න | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo හි වෛද්‍යවරුන් විශේෂඥතාව අනුව සොයන්න, සහ Calendly හරහා Online වේලාවක් වෙන් කර ගන්න.",
  },
  facilities: {
    // Reused verbatim from navigationLabels.si.ts's own entry.
    title: "පහසුකම් | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo ඇතුළත: විශේෂයෙන් තැනූ තට්ටු 6ක්, ශල්‍යාගාර, Monitor කරන දැඩි සත්කාරය, පැය 24ම විවෘත රසායනාගාරයක්, කාමර වර්ග හතරක් සහ වහලක් සහිත Ambulance Bay එකක්.",
  },
  healthTips: {
    // Reused verbatim from navigationLabels.si.ts's own entry.
    title: "සෞඛ්‍ය උපදෙස් | St. Joseph Hospital Negombo",
    // {articleCount} / {warningCount} are the interpolation tokens; see
    // pageMetadata.ts. "written by our own clinicians" and "the conditions
    // that turn up in Negombo" reuse pageContent.si.ts's own
    // verticalLabel/body wording verbatim; "screening by age" and "first aid
    // at home" reuse navigationLabels.si.ts's own entries.
    description:
      "{articleCount} සෞඛ්‍ය උපදෙස් අපේම වෛද්‍යවරු ලියපු, {warningCount} දැන්ම එන්න ඕන කියන සලකුණු, වයස අනුව පරීක්ෂණ සහ නිවසේ ප්‍රථමාධාර, මීගමුවේ ඇත්තටම එන තත්ත්ව සඳහා.",
  },
  homeCare: {
    // Reused verbatim from navigationLabels.si.ts's "Care at Home".
    title: "නිවසේ සත්කාර | St. Joseph Hospital Negombo",
    // Every fact here reuses content.si.ts's own tickerItems wording
    // verbatim: "වෛද්‍යවරු, හෙදියන් සහ Laboratory technicians", "වෙන් වූ
    // Vehicles 6ක්", "Sample ගැනීම නිවසේදීම", "ඔබේ Hospital file එකට සටහන්".
    description:
      "වෛද්‍යවරු, හෙදියන් සහ Laboratory technicians ඔබේ නිවසට පැමිණෙනවා, වෙන් වූ Vehicles 6ක් මත, වයෝවෘද්ධ, කුඩා දරුවන් සහ සැත්කමකට පසු සුවය ලබන අයට. Samples නිවසේදීම ගන්නවා, සොයාගැනීම් ඔබේ Hospital file එකට සටහන් වෙනවා.",
  },
  internationalCare: {
    // Reused verbatim from navigationLabels.si.ts's own entry.
    title: "විදේශීය රෝගී සත්කාර | St. Joseph Hospital Negombo",
    // Reuses content.si.ts's own "විනාඩි දහයයි", "ලිඛිත Estimate එක" and
    // "Insurance ලේඛන" phrasing verbatim.
    description:
      "Bandaranaike International Airport සිට විනාඩි දහයයි. Desk එකක් Transfer එක, ලිඛිත Estimate එක, Interpreter, Insurance ලේඛන සහ ඔබ ගෙදර ගෙනියන Records සකසනවා.",
  },
  media: {
    // "Media" kept English (navigationLabels.si.ts's own KEEPS_ENGLISH
    // entry); "සහ මාධ්‍ය" ("and press") reuses the root word
    // navigationLabels.si.ts already uses for "Press desk" -> "මාධ්‍ය මේසය".
    title: "Media සහ මාධ්‍ය | St. Joseph Hospital Negombo",
    // "පුවත් කාමරය" (Newsroom), "මාධ්‍ය මේසය" (press desk) and "මාධ්‍ය
    // කට්ටලය" (press kit) all reused verbatim from navigationLabels.si.ts;
    // "රූගත කිරීම සහ රෝගී පුද්ගලිකත්වය" reuses "Filming and privacy"'s own
    // translation, with "රෝගී" added for "patient".
    description:
      "St. Joseph Hospital, මීගමුව සඳහා පුවත් කාමරය, මාධ්‍ය මේසය සහ මාධ්‍ය කට්ටලය. නම් කළ ප්‍රකාශකයින්, අනුමත Logo, අනුමත ඡායාරූප, සහ රූගත කිරීම සහ රෝගී පුද්ගලිකත්වය පිළිබඳ නීති.",
  },
  network: {
    // Reused verbatim from navigationLabels.si.ts's "Our network".
    title: "අපගේ ජාලය | St. Joseph Hospital Negombo",
    // "නවයෙන් එකක්" / "මහාද්වීප දෙකක" reuse content.si.ts's own heroFacts
    // ("Companies in the family" -> "නවයක්, මහාද්වීප දෙකක") verbatim.
    description:
      "St. Joseph Hospital ක්‍රියාත්මක කරන්නේ Los Angeles හි Kids & Teens Medical Group, මහාද්වීප දෙකක සමාගම් නවයෙන් එකක්. මේ සම්බන්ධතාවෙන් ඔබේ සත්කාරයට වෙනස් වන දේ, සහ පවුලේ ඉන්නා අනිත් අය.",
  },
  pharmacy: {
    // "Pharmacy" kept English; see pageMetadata.ts and
    // navigationLabels.si.ts's own KEEPS_ENGLISH entry for the same word.
    title: "Pharmacy | St. Joseph Hospital Negombo",
    // "Authorized Stock", "Counter", "Order", "Pharmacist", "Hospital File",
    // "Prescriptions" and "Delivery" all reuse content.si.ts's own
    // KEEPS_ENGLISH register for this feature verbatim.
    description:
      "St. Joseph Hospital Negombo හි පැය 24ම විවෘත Pharmacy Counter එකක්: Authorized Stock විතරයි, හැම Order එකක්ම Pharmacist කෙනෙක් විසින් ඔබේ Hospital File එකට සසඳා පරීක්ෂා කරනවා, Repeat Prescriptions Digital ලෙස තියාගන්නවා, සහ මීගමුව පුරාම Delivery.",
  },
  privacyPolicy: {
    // Reused verbatim from navigationLabels.si.ts's "Privacy policy".
    title: "පුද්ගලිකත්ව ප්‍රතිපත්තිය | St. Joseph Hospital Negombo",
    description:
      "St. Joseph Hospital Negombo හි පුද්ගලිකත්ව ප්‍රතිපත්තිය: අපි ඔබේ පුද්ගලික දත්ත රැස් කරන, භාවිතා කරන, සහ ආරක්ෂා කරන ආකාරය.",
  },
  schoolWellness: {
    // Reused verbatim from navigationLabels.si.ts's "School Wellness".
    title: "පාසල් සුවතාව | St. Joseph Hospital Negombo",
    // "දෘෂ්ටිය" (vision), "ශ්‍රවණය" (hearing), "දන්ත" (dental), "වර්ධනය"
    // (growth) and "ඉරියව්ව" (posture) all reuse content.si.ts's own
    // `stations[*].title` verbatim; "ගුරු" (teacher) and "දෙමව්පියෙකුටම"
    // (every parent) reuse this feature's own established words.
    description:
      "ළමා රෝග විශේෂඥ මගින් මෙහෙයවන පරීක්ෂණ වැඩසටහනක් ඔබේ පාසලට එනවා: හැම ශිෂ්‍යයෙකුටම දෘෂ්ටිය, ශ්‍රවණය, දන්ත, වර්ධනය සහ ඉරියව්ව පරීක්ෂණ, ගුරු First Aid පුහුණුව, සහ හැම දෙමව්පියෙකුටම වාර්තාවක් ගෙදරට.",
  },
  services: {
    // Reused verbatim from indexContent.si.ts's own `eyebrow`: "Medical
    // Services" -> "වෛද්‍ය සේවා". Same fact (this exact page's own eyebrow),
    // one translation.
    title: "වෛද්‍ය සේවා | St. Joseph Hospital Negombo",
    // {total} / {groupList} are the interpolation tokens; see pageMetadata.ts.
    description: "St. Joseph Hospital Negombo හි කාණ්ඩ හයක් ({groupList}) පුරා වෛද්‍ය සේවා {total}ක්.",
  },
};
