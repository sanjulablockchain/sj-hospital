// Sinhala for the home page's `#voices` band.
//
// `testimonials[*].quote` is translated as the patient's own quoted speech,
// not paraphrased; `testimonials[*].name` is absent here on purpose, the
// patient's own name and never translated (see content.ts's header note).
// `testimonials[*].role` translates like any other short label.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const testimonials = [
  {
    quote:
      "මගේ Reports වෛද්‍යවරු දෙන්නෙක් කියෙව්වා, ඒ දිනයේම එවුවා. මට මොකද වුනේ කියලා ඇත්තටම පැහැදිලි කරලා දුන්නා.",
    role: "OPD රෝගියෙක්",
  },
  {
    quote:
      "Nurses ඇත්තටම තේරුම් ගන්නවා, Check-up Reminders ත් හරි උදව්වක්. Facilities ලා World Class වගේ දැනුනා.",
    role: "නිතිපතා Check-ups",
  },
  {
    quote:
      "උදේ ශල්‍යකර්මය, දවල් වෙනකොට මගේම කාමරය, සහ මම Steady වෙනකන් මාත් එක්ක හිටපු Nurse කෙනෙක්.",
    role: "Surgical රෝගියෙක්",
  },
];

export const body = "මෙතන ප්‍රතිකාර ලබපු, සැත්කම් කරගත්තු සහ බලාගත්තු රෝගීන්ගේම ඇත්ත වචන.";
export const ariaShow = "Review {n} පෙන්වන්න";
export const ariaPrev = "කලින් Review එක";
export const ariaNext = "ඊළඟ Review එක";
