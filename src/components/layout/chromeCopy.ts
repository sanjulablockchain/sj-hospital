import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import { chromeCopy as si } from "./chromeCopy.si";
import { chromeCopy as ta } from "./chromeCopy.ta";

/**
 * The chrome's own hardcoded strings: the header, the mobile panel, the
 * floating rail and both theme toggles. Everything else that varies by
 * locale in the chrome (nav labels, footer headings) comes from
 * `@/config/navigationLabels` instead, because those are keyed dictionaries
 * covering dozens of repeated strings rather than ten one-off ones.
 */
export const chromeCopy = {
  bookNow: "Book now",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  backToTop: "Back to top",
  whatsappUs: "WhatsApp us",
  whatsapp: "WhatsApp",
  callUs: "Call us",
  reachUs: "Reach us",
  toLightMode: "Switch to light mode",
  toDarkMode: "Switch to dark mode",
};

export type ChromeCopy = typeof chromeCopy;

const overlays = { si: () => import("./chromeCopy.si"), ta: () => import("./chromeCopy.ta") };

/** For server callers. Every current caller of the chrome is a client
 * component (see `chromeCopyFor` below), but this is the shape every other
 * feature's getter follows, and a future server-rendered chrome piece should
 * reach for this rather than reintroducing the pattern. */
export async function getChromeCopy(locale: Locale): Promise<ChromeCopy> {
  if (locale === DEFAULT_LOCALE) return chromeCopy;
  return localize(chromeCopy, await overlays[locale]());
}

// chromeCopy above is already the English object, so the synchronous map
// only needs the two overlays imported at the top of this file.
const BY_LOCALE = { en: chromeCopy, si, ta };

/**
 * Synchronous because every caller is a client component. This is the one
 * place all three locales are allowed into the client bundle: ten short
 * strings, against the alternative of threading a prop through the header,
 * the mobile panel, the floating rail and both theme toggles.
 */
export function chromeCopyFor(locale: Locale): ChromeCopy {
  return BY_LOCALE[locale] ?? chromeCopy;
}
