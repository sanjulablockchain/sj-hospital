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
  // `next dev`'s Turbopack image-optimizer route hangs indefinitely on this
  // machine whenever a request negotiates a re-encoded format (the AVIF/WebP
  // a real browser's Accept header asks for), for any width that needs
  // resizing - confirmed with sharp itself working fine outside of Next, so
  // the hang is in Next's dev route, not the encoder. `next build`/`next
  // start` (production) are unaffected; this only turns optimization off in
  // dev, where the browser then just requests the original file.
  images: {
    unoptimized: process.env.NODE_ENV !== "production",
  },
  // The project root for Turbopack. Next infers it from the nearest lockfile
  // and, when this checkout is a git worktree under the main checkout's
  // `.claude/worktrees/`, that inference lands on the PARENT repository: it
  // then compiles the worktree as a subfolder of a different checkout, skips
  // the dot-directory when watching for changes, and serves stale modules.
  // Pinning the root to this file's own directory keeps each checkout
  // self-contained (see the "Root directory" section of the bundled
  // turbopack.md guide).
  turbopack: {
    root: import.meta.dirname,
  },
  async redirects() {
    return [
      // The careers page moved from the singular /career, which the old
      // marketing-layout version lived at, to /careers. Anything already
      // pointing at the old URL keeps working.
      { source: "/career", destination: "/careers", permanent: true },

      // sjhospital.lk Bluehost -> Lightsail migration: mapping the live
      // WordPress site's indexed URLs (pulled from its own sitemap.xml,
      // page-sitemap.xml and category-sitemap.xml on 2026-09-29) to their
      // closest equivalent here, so existing bookmarks, backlinks and search
      // results don't 404 the moment DNS moves. One-to-one matches:
      { source: "/medical-services", destination: "/services", permanent: true },
      { source: "/gallery", destination: "/media", permanent: true },

      // The WordPress blog/news content (10 posts, 4 category pages) has no
      // equivalent on this site - there's no post/CMS system here. Route
      // residual traffic to /health-tips, the closest thematic hub, rather
      // than let it 404. Same "gap -> hub page" call both the pizza and KT
      // Doctor migrations made for their own unmatched WordPress content.
      { source: "/news-and-events", destination: "/health-tips", permanent: true },
      {
        source: "/preventing-diabetes-in-sri-lanka-a-comprehensive-approach",
        destination: "/health-tips",
        permanent: true,
      },
      { source: "/blog-1-2", destination: "/health-tips", permanent: true },
      { source: "/blog-2", destination: "/health-tips", permanent: true },
      { source: "/blog-3", destination: "/health-tips", permanent: true },
      {
        source: "/understanding-the-risk-factors-for-diabetes-and-heart-disease",
        destination: "/health-tips",
        permanent: true,
      },
      { source: "/7-insights-into-elephantiasis", destination: "/health-tips", permanent: true },
      {
        source: "/how-to-find-the-right-doctor-in-negombo-for-your-needs",
        destination: "/health-tips",
        permanent: true,
      },
      { source: "/7-warning-signs-of-dengue-fever", destination: "/health-tips", permanent: true },
      { source: "/influenza-how-to-be-prepared", destination: "/health-tips", permanent: true },
      {
        source: "/the-impact-of-physical-inactivity-on-work-life-effectiveness-in-sri-lanka",
        destination: "/health-tips",
        permanent: true,
      },
      { source: "/category/hospital", destination: "/health-tips", permanent: true },
      { source: "/category/healthwellnesstips", destination: "/health-tips", permanent: true },
      {
        source: "/category/healthwellnesstips/diseases",
        destination: "/health-tips",
        permanent: true,
      },
      { source: "/category/blog", destination: "/health-tips", permanent: true },
    ];
  },
};

export default nextConfig;
