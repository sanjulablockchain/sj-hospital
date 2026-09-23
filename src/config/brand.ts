/** Brand artwork lifted from the official St. Joseph Hospital logo. */

/** Leaf mark on its own, transparent; legible on both the dark and light themes. */
export const LOGO_MARK = {
  src: "/images/logo-mark.png",
  width: 583,
  height: 640,
} as const;

/** Horizontal lockup: leaf mark plus the serif wordmark and tagline. */
export const LOGO_LOCKUP = {
  src: "/images/logo-lockup.png",
  width: 1684,
  height: 360,
} as const;

/**
 * The lockup recoloured to the brand palette: sky leaf, logo-purple serif
 * wordmark and tagline, on transparency. Lifted from the v4 home reference
 * bundle. Used by the solid header variant and the home footer; the dark
 * theme inverts it to white through `img[data-logo]` in globals.css.
 */
export const LOGO_LOCKUP_BRAND = {
  src: "/images/logo-lockup-brand.png",
  width: 1248,
  height: 386,
} as const;
