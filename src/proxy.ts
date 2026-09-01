import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/lib/i18n/locales";
import { resolveLocaleRoute } from "@/lib/i18n/resolveLocaleRoute";

/**
 * Keeps English on its historic unprefixed URLs while the route tree lives
 * under `app/[locale]`.
 *
 * Every decision is made by `resolveLocaleRoute`, which is a pure function with
 * its own tests. This file is only the Next.js glue, and stays that way: the
 * proxy runs on every request, so it must never fetch data.
 */
export function proxy(request: NextRequest) {
  const action = resolveLocaleRoute(
    request.nextUrl.pathname,
    request.cookies.get(LOCALE_COOKIE)?.value
  );

  if (action.kind === "pass") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = action.pathname;

  // The app runs `output: "standalone"` behind a Docker stack, where a shared
  // cache (CDN, reverse proxy) is the expected deployment. Both branches below
  // choose their response by reading the sj-locale cookie, so a cache keyed on
  // the URL alone would serve one visitor's redirect or rewrite to every later
  // visitor with a different cookie, bare URL and all: a shared cache could
  // trap crawlers, and everyone else, in one reader's chosen locale. `Vary:
  // Cookie` tells any such cache the response depends on the cookie, not just
  // the URL.
  if (action.kind === "redirect") {
    // A redirect additionally must never be cached at all: caching a 307 to
    // /si/... under the bare URL is exactly the "one Sinhala reader bounces
    // every later visitor into Sinhala" scenario Vary alone is meant to
    // prevent, since a cache is free to key on Vary and still store the
    // response for that cookie value.
    const response = NextResponse.redirect(url);
    response.headers.set("Vary", "Cookie");
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }

  const response = NextResponse.rewrite(url);
  response.headers.set("Vary", "Cookie");
  return response;
}

export const config = {
  // Everything except Next internals, API routes, and any path with a file
  // extension, which covers icon.png, the sitemap and the rest of the static
  // assets.
  matcher: ["/((?!_next|api|.*\\.[a-zA-Z0-9]+$).*)"],
};
