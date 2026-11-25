/**
 * Brand artwork: the 2026 St. Joseph Hospital logo (three leaf mark in
 * bright blue, navy and violet; navy serif wordmark; violet tagline).
 *
 * The owner supplied it only as a 1647x400 PNG, so these SVGs are traced
 * from that file (one path per colour, checked against the PNG pixel for
 * pixel). Ask for a vector master before redrawing or recolouring them.
 */

/** Leaf mark on its own, transparent. Keeps its colours on both themes. */
export const LOGO_MARK = {
  src: "/images/logo-mark-2026.svg",
  width: 295,
  height: 306,
} as const;

/**
 * Horizontal lockup: mark, wordmark and tagline, trimmed tight to the
 * artwork. `darkSrc` is the dark theme variant: the same mark, with the
 * wordmark and tagline in white (the navy wordmark reads at about 2.2:1 on
 * the dark surfaces). The `compact` pair drops the tagline for the mobile
 * header, with the wordmark moved down 28 units so its capitals centre on
 * the leaf; same canvas, so the same width and height apply. Render them
 * through `LogoLockup`, which shows the right one.
 */
export const LOGO_LOCKUP = {
  src: "/images/logo-lockup-2026.svg",
  darkSrc: "/images/logo-lockup-2026-dark.svg",
  compactSrc: "/images/logo-lockup-2026-compact.svg",
  compactDarkSrc: "/images/logo-lockup-2026-compact-dark.svg",
  width: 1575,
  height: 306,
} as const;
