"use client";

import dynamic from "next/dynamic";

// This boundary exists purely so `ssr: false` is legal here (Next.js only allows
// `ssr: false` on `next/dynamic` calls made from Client Components). Skipping SSR
// entirely (rather than just deferring the JS) keeps LocationMap's module (and its
// `leaflet/dist/leaflet.css` import) out of the server-rendered module graph for any
// page, so its CSS chunk cannot leak into other pages that share components with
// ContactPageContent (e.g. /accommodation, which reuses ContactForm/ContactInfo).
export const LocationMap = dynamic(
  () => import("./LocationMap").then((mod) => mod.LocationMap),
  { ssr: false }
);
