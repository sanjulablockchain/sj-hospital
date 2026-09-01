import { DEFAULT_LOCALE, hasLocale } from "./locales.ts";
import { internalDefaultPath, localePath, splitLocale } from "./paths.ts";

export type RouteAction =
  | { kind: "pass" }
  | { kind: "redirect"; pathname: string }
  | { kind: "rewrite"; pathname: string };

const DEFAULT_PREFIX = `/${DEFAULT_LOCALE}`;

/**
 * What the proxy should do with an incoming path.
 *
 * There is deliberately no `Accept-Language` inspection. Plenty of readers in
 * Sri Lanka browse with `en-US` set whatever language they actually read, so
 * sniffing guesses wrong often, and a wrong guess strands the reader. Only an
 * explicit choice from the switcher, remembered in a cookie, moves anyone.
 *
 * A crawler carries no cookie and therefore always takes the rewrite branch,
 * seeing stable English at the canonical URL with hreflang alternates.
 */
export function resolveLocaleRoute(
  pathname: string,
  cookieLocale: string | undefined
): RouteAction {
  // Already in Sinhala or Tamil: nothing to decide.
  if (splitLocale(pathname).locale !== DEFAULT_LOCALE) return { kind: "pass" };

  // `/en/...` is reachable by hand and would serve every English page at a
  // second URL, so it collapses onto the canonical bare path.
  if (pathname === DEFAULT_PREFIX || pathname.startsWith(`${DEFAULT_PREFIX}/`)) {
    const bare = pathname.slice(DEFAULT_PREFIX.length);
    return { kind: "redirect", pathname: bare === "" ? "/" : bare };
  }

  const remembered =
    cookieLocale !== undefined && hasLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  if (remembered !== DEFAULT_LOCALE) {
    return { kind: "redirect", pathname: localePath(pathname, remembered) };
  }

  return { kind: "rewrite", pathname: internalDefaultPath(pathname) };
}
