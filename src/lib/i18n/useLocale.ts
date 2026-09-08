"use client";

import { usePathname } from "next/navigation";
import { splitLocale } from "./paths.ts";
import type { Locale } from "./locales.ts";

/**
 * The locale of the page currently on screen, read from the address bar.
 *
 * This works because an English page is served from its bare URL: the rewrite
 * onto `/en` happens inside the proxy and never reaches the browser, so a
 * pathname with no prefix is English by definition. Deriving it here means no
 * provider to mount and no locale prop threaded through twenty components.
 */
export function useLocale(): Locale {
  return splitLocale(usePathname()).locale;
}
