"use client";

import { chromeCopyFor, type ChromeCopy } from "@/components/layout/chromeCopy";
import { useLocale } from "@/lib/i18n/useLocale";

/**
 * One of the chrome's own strings (`chromeCopy`), in the reader's language.
 *
 * A client leaf for the same reason `NavLabel` is one: `ThemedFooter` is a
 * Server Component rendered by 15 different Page components and must not
 * gain a `locale` prop, so a string that lives in `chromeCopy` rather than
 * `navigationLabels` gets read here instead, at the smallest possible leaf.
 */
export function ChromeText({ id }: { id: keyof ChromeCopy }) {
  const locale = useLocale();
  return <>{chromeCopyFor(locale)[id]}</>;
}
