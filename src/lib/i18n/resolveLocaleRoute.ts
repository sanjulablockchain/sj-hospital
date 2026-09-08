import { DEFAULT_LOCALE, hasLocale } from "./locales.ts";
import { internalDefaultPath, localePath, splitLocale } from "./paths.ts";

export type RouteAction =
  | { kind: "pass" }
  | { kind: "redirect"; pathname: string }
  | { kind: "rewrite"; pathname: string };

const DEFAULT_PREFIX = `/${DEFAULT_LOCALE}`;

const SAFE_METHODS = new Set(["GET", "HEAD"]);

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
 *
 * `method` defaults to `"GET"` so every existing two-argument call (and its
 * tests) keeps behaving exactly as before; the proxy is the only caller that
 * ever passes something else. A redirect is a 307, which preserves the
 * method and body, so a POST (the career form attaches a CV up to 6 MB) must
 * never be redirected: it would silently resubmit the whole request to a
 * second URL. Both places below that would otherwise redirect instead serve
 * the request in place for a non-GET/HEAD method: the `/en/...` collapse
 * just passes it through unchanged, because that URL's `[locale]` segment
 * already resolves to `"en"` on its own; the remembered-locale case rewrites
 * to the English internal path instead, the same target a request with no
 * cookie at all would get, since honouring the cookie here would require the
 * cross-locale redirect this guard exists to prevent.
 */
export function resolveLocaleRoute(
  pathname: string,
  cookieLocale: string | undefined,
  method: string = "GET"
): RouteAction {
  // Already in Sinhala or Tamil: nothing to decide.
  if (splitLocale(pathname).locale !== DEFAULT_LOCALE) return { kind: "pass" };

  const isSafeMethod = SAFE_METHODS.has(method.toUpperCase());

  // `/en/...` is reachable by hand and would serve every English page at a
  // second URL, so it collapses onto the canonical bare path.
  if (pathname === DEFAULT_PREFIX || pathname.startsWith(`${DEFAULT_PREFIX}/`)) {
    if (!isSafeMethod) return { kind: "pass" };
    const bare = pathname.slice(DEFAULT_PREFIX.length);
    return { kind: "redirect", pathname: bare === "" ? "/" : bare };
  }

  const remembered =
    cookieLocale !== undefined && hasLocale(cookieLocale) ? cookieLocale : DEFAULT_LOCALE;

  if (remembered !== DEFAULT_LOCALE) {
    if (!isSafeMethod) return { kind: "rewrite", pathname: internalDefaultPath(pathname) };
    return { kind: "redirect", pathname: localePath(pathname, remembered) };
  }

  return { kind: "rewrite", pathname: internalDefaultPath(pathname) };
}
