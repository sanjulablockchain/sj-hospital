// Tamil for the home page's `#media` band.
//
// `mediaItems[*].date` is a press date, a fact rather than copy, excluded
// from parity the same way `media`'s own content.i18n.test.ts excludes every
// `.date` path. The register sweep (2026-09-09) deleted `mediaItems[*].title`
// (a card title) and `mediaItems[*].tag` (a display chip, ruling 2 in
// docs/superpowers/i18n-register-rule.md) along with `sectionEyebrow`, the
// section `heading` and `cta`, leaving every card empty: this file no longer
// carries any translatable copy for this band.

export const __review = { status: "draft", reviewer: null, date: null } as const;

export const mediaItems = [{}, {}, {}, {}];

export const heading = {};
