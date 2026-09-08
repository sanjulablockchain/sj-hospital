"use client";

import { chromeCopyFor, type ChromeCopy } from "@/components/layout/chromeCopy";
import { useLocale } from "@/lib/i18n/useLocale";

/**
 * One of the chrome's own strings (`chromeCopy`), in the reader's language.
 *
 * A client leaf, unlike the nav and footer labels in `navigationLabels`,
 * which are now translated at the server boundary and passed into
 * `ThemedHeader`, `MobileNavPanel` and `ThemedFooter` as already-translated
 * props. `chromeCopy` stays the bounded exception: twelve strings read here, at
 * the smallest possible leaf, rather than threaded as props through the
 * Hero and Page components that would otherwise need to carry them.
 */
export function ChromeText({ id }: { id: keyof ChromeCopy }) {
  const locale = useLocale();
  return <>{chromeCopyFor(locale)[id]}</>;
}
