// Sinhala for the home page's `#home-care` band.
//
// "Sampling at home", "Telemedicine" and "Care at home" already have a
// site-wide translation in navigationLabels.si.ts, and this band links to all
// three, so the matching card titles and `sectionEyebrow` reuse those exact
// strings rather than inventing second translations of the same phrases.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const homeCareCards = [
  {
    // Reused from navigationLabels.si.ts's "Home visit services" root.
    title: "නිවසේ සේවා",
    body: "වෛද්‍යවරු, Nurses සහ රසායනාගාර Technicians ඔබේ දොරටුවට, කැපවූ Vehicles 6ක.",
    linkLabel: "වයෝවෘද්ධ අයටත්, බිලිඳුන්ටත්, සුවය ලබන අයටත්",
  },
  {
    // Reused verbatim from navigationLabels.si.ts's "Sampling at home".
    title: "නිවසේ නියැදි ලබා ගැනීම",
    body: "රෝගියා ඉන්න තැනින්ම Samples අරගෙන, රෝහලේම රසායනාගාරයෙන් Process කරනවා.",
    linkLabel: "සොයාගැනීම් ඔබේ File එකේ",
  },
  {
    // Reused verbatim from navigationLabels.si.ts's "Telemedicine".
    title: "දුරස්ථ වෛද්‍ය සේවා",
    body: "Video හෝ Phone මගින් Consultations, Prescription එකක් තිබ්බොත් කෙළින්ම Pharmacy එකට.",
    linkLabel: "එන්න යන්න ඕන නෑ",
  },
];

// Reused verbatim from navigationLabels.si.ts's "Care at home" -> "නිවසේ සත්කාර".
export const sectionEyebrow = "06 / නිවසේ සත්කාර";
export const heading = { line1: "සමහර රෝගීන්ට", line2: "එන්න බෑ" };
export const body =
  "ඒ වෙනුවට අපේ වෛද්‍යවරු, Nurses සහ රසායනාගාර Technicians ඔබේ නිවසට එනවා, වයෝවෘද්ධ අයටත්, බිලිඳුන්ටත්, සැත්කමකින් පස්සේ සුවය ලබන අයටත්. Visit එකේ සටහන් කෙළින්ම ඔබේ රෝහල් File එකට එකතු වෙනවා.";
export const cta = "නිවසේ Visit එකක් වෙන්නේ කොහොමද";
