// Sinhala overlay for groups.ts. `GROUPS` and `SERVICE_GROUPS` are structural
// (see the header comment on both in groups.ts) and never appear here.
//
// `groupLabels` carries the word a reader sees for each filter chip; the
// 2026-09-09 register sweep deleted every entry (filter and category chips
// are English throughout the site, per the register rule), so this
// dictionary is empty and every chip falls back to `groups.ts`'s own
// English values.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const groupLabels: Record<string, string> = {};
