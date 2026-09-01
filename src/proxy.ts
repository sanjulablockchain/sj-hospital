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

  return action.kind === "redirect"
    ? NextResponse.redirect(url)
    : NextResponse.rewrite(url);
}

export const config = {
  // Everything except Next internals, API routes, and any path with a file
  // extension, which covers icon.png, the sitemap and the rest of the static
  // assets.
  matcher: ["/((?!_next|api|.*\\.[a-zA-Z0-9]+$).*)"],
};
