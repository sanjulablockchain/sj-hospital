// Tamil for every nav label and footer heading used across the route
// configs in this directory: deliberately empty. The register policy
// (`docs/superpowers/i18n-register-rule.md`, `registerPolicy.ts`) says the
// whole nav bar and footer are English in every language, per the owner's
// ruling on 2026-09-09 ("nav bar and footer should be in english in every
// language"). `navLabel` / `footerHeading` in `navigationLabels.ts` fall back
// to the English string for any label neither dictionary carries, so an empty
// dictionary here renders every nav label and footer heading in English.
//
// This module stays, rather than being deleted, because `navigationLabels.ts`
// still imports `NAV_LABELS` and `FOOTER_HEADINGS` by name from it; only their
// contents are gone. See `navigationLabels.test.ts` for the gate that keeps
// both empty.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const NAV_LABELS: Record<string, string> = {};

export const FOOTER_HEADINGS: Record<string, string> = {};
