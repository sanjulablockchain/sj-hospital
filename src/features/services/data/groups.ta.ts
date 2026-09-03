// Tamil overlay for groups.ts. `GROUPS` and `SERVICE_GROUPS` are structural
// (see the header comment on both in groups.ts) and never appear here;
// `groupLabels` carries the word a reader actually sees for each group.
// "Diagnostics" and "Clinic" match src/config/navigationLabels.ta.ts's own
// entries for the identical words ("நோய் கண்டறிதல்", and "Clinic" kept
// English inline in "Clinic அல்ல, பள்ளி ஏன்").

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const groupLabels: Record<string, string> = {
  All: "அனைத்தும்",
  Emergency: "அவசர சிகிச்சை",
  Surgical: "அறுவை சிகிச்சை",
  Diagnostics: "நோய் கண்டறிதல்",
  Clinics: "Clinic",
  "Women & children": "பெண்கள் மற்றும் குழந்தைகள்",
  "At home": "வீட்டில்",
};
