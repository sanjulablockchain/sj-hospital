import type { Locale } from "@/lib/i18n/locales";
// Explicit extensions on the three value imports: `chromeCopy.i18n.test.ts`
// imports this module, and `npm test` runs the files through Node's own type
// stripping, which resolves ESM specifiers literally and will not guess at
// `.ts`. tsconfig has `allowImportingTsExtensions` and Turbopack resolves it
// the same way, so the app build is unaffected. Same reason
// `career/schemas.ts` imports `./data/content.ts` with its extension.
import { localize } from "../../lib/i18n/localize.ts";
import { chromeCopy as si } from "./chromeCopy.si.ts";
import { chromeCopy as ta } from "./chromeCopy.ta.ts";

/**
 * The chrome's own hardcoded strings: the header, the mobile panel, the
 * floating rail and both theme toggles. Everything else that varies by
 * locale in the chrome (nav labels, footer headings) comes from
 * `@/config/navigationLabels` instead, because those are keyed dictionaries
 * covering dozens of repeated strings rather than twelve one-off ones.
 */
export const chromeCopy = {
  bookNow: "Book now",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  backToTop: "Back to top",
  whatsappUs: "WhatsApp us",
  whatsapp: "WhatsApp",
  callUs: "Call us",
  tagline: "Compassionate, patient centered care, bringing American healthcare standards to Sri Lanka.",
  toLightMode: "Switch to light mode",
  toDarkMode: "Switch to dark mode",
  // Shared by the mobile panel's section heading (LanguageMenuToggle) and the
  // header switcher's dropdown aria-label (LanguageToggleButton): both are the
  // same fact, the word naming the language picker, not two.
  language: "Language",
  // The header switcher button's aria-label. `{locale}` carries the current
  // language's own name (from LOCALE_LABELS), interpolated with a token
  // rather than a split because it sits mid sentence.
  changeLanguage: "Language: {locale}. Change language",
};

export type ChromeCopy = typeof chromeCopy;

// Merged through `localize`, not read directly: some keys (the Book CTA, the
// tagline, the two floating rail actions, the visible "Language" label) are
// now deliberately ABSENT from the Sinhala and Tamil overlays, per the
// register policy. `localize` iterates the English base and falls back to it
// for any key the overlay omits, so a deleted key renders "Book now" rather
// than an empty button. Reading `si` / `ta` directly, as this used to, would
// render `undefined` for exactly those keys instead.
const BY_LOCALE = {
  en: chromeCopy,
  si: localize(chromeCopy, si),
  ta: localize(chromeCopy, ta),
};

/**
 * Synchronous because every caller is a client component. This is the one
 * place all three locales are allowed into the client bundle: twelve short
 * strings, against the alternative of threading a prop through the header,
 * the mobile panel, the floating rail and both theme toggles.
 */
export function chromeCopyFor(locale: Locale): ChromeCopy {
  return BY_LOCALE[locale] ?? chromeCopy;
}
