import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      // The application form attaches a CV capped at 5 MB, and the multipart
      // body carries the other nine fields on top of it.
      bodySizeLimit: "6mb",
    },
    // The root layout lives at `src/app/[locale]/layout.tsx`, a top level
    // dynamic segment with no `src/app/layout.tsx` above it. The Next docs
    // name this exact case (alongside multiple root layouts) as the one
    // `not-found.js` cannot cover: a segment-level `not-found.tsx` only
    // catches `notFound()` thrown from within an already-matched, already
    // valid route tree, so a locale segment that fails `hasLocale` before
    // any layout below it renders (e.g. `/xx/contact-us`) has no boundary to
    // land in and falls through to Next's bare, unbranded, unstyled built-in
    // 404. `globalNotFound` (app/global-not-found.tsx) is the framework's own
    // fix for that: it is handled at the routing level, before any layout.
    globalNotFound: true,
  },
  watchOptions: {
    pollIntervalMs: 500,
  },
  async redirects() {
    return [
      // The careers page moved from the singular /career, which the old
      // marketing-layout version lived at, to /careers. Anything already
      // pointing at the old URL keeps working.
      { source: "/career", destination: "/careers", permanent: true },
    ];
  },
};

export default nextConfig;
