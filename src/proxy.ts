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
    request.cookies.get(LOCALE_COOKIE)?.value,
    request.method
  );

  if (action.kind === "pass") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = action.pathname;

  // The app runs `output: "standalone"` behind a Docker stack, where a shared
  // cache (CDN, reverse proxy) is the expected deployment. For a given URL,
  // which action.kind this ends up as (and, on a redirect, where it points)
  // can depend on the sj-locale cookie: `/contact-us` rewrites to English for
  // no cookie or an English one, but redirects to `/si/contact-us` for a
  // Sinhala one. A cache keyed on the URL alone would serve one visitor's
  // response, redirect or rewrite, to every later visitor regardless of
  // their own cookie, so `Vary: Cookie` marks both below as cookie-dependent.
  //
  // One redirect sub-case is the exception in isolation: the `/en/...`
  // collapse (see resolveLocaleRoute) redirects to the bare canonical path
  // without ever consulting the cookie, so THAT response alone never varies
  // by it. It shares this branch with the remembered-locale redirect, which
  // does, so the header stays on both rather than trying to split a single
  // `action.kind === "redirect"` into the two cases that produced it.
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
