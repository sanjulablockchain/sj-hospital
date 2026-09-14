import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as content from "./content";
import * as announcement from "./announcement";
import * as careers from "./careers";
import * as facilities from "./facilities";
import * as healthTips from "./healthTips";
import * as homeCare from "./homeCare";
import * as internationalCare from "./internationalCare";
import * as media from "./media";
import * as network from "./network";
import * as testimonials from "./testimonials";

/**
 * The home page's copy in one locale, across all ten data files.
 *
 * The tenth is `announcement.ts`, the pop-up that opens over the page. It is
 * fetched here with the rest rather than by the pop-up itself, for the same
 * reason every band is: the fetch stays in a Server Component, so no
 * translation data reaches the `'use client'` leaf that renders it.
 *
 * Eight of the ten are per-teaser data files that predate this task
 * (`careers.ts`, `facilities.ts`, `healthTips.ts`, `homeCare.ts`,
 * `internationalCare.ts`, `media.ts`, `network.ts`, `testimonials.ts`);
 * `content.ts` is the ninth, added for the bands that had no data file of
 * their own (see its own header comment for why).
 *
 * Each English module is the shape: the result always has its keys, its
 * array lengths and its facts, and an overlay can only replace strings. This
 * exposes ONE getter returning an object keyed by data file, so `HomePage`
 * awaits once rather than ten times, and passes slices of the one result
 * down to its sections as props, the same shape `MediaPage` and
 * `EChannelingPage`'s multi-file getter already use. This runs in a Server
 * Component, so no translation data reaches the client bundle; the eight
 * Client Component leaves on this page (`CountUp`, `HeroParallaxBackground`,
 * `NetworkAccordion`, `PharmacySection`, `RoomsSection`,
 * `SchoolWellnessSection`, `SurgicalSection`, `TestimonialsSection`) each
 * receive their own slice of the already localized result as a prop from
 * their Server parent, never by importing a data file themselves.
 */
const overlays = {
  content: { si: () => import("./content.si"), ta: () => import("./content.ta") },
  announcement: { si: () => import("./announcement.si"), ta: () => import("./announcement.ta") },
  careers: { si: () => import("./careers.si"), ta: () => import("./careers.ta") },
  facilities: { si: () => import("./facilities.si"), ta: () => import("./facilities.ta") },
  healthTips: { si: () => import("./healthTips.si"), ta: () => import("./healthTips.ta") },
  homeCare: { si: () => import("./homeCare.si"), ta: () => import("./homeCare.ta") },
  internationalCare: {
    si: () => import("./internationalCare.si"),
    ta: () => import("./internationalCare.ta"),
  },
  media: { si: () => import("./media.si"), ta: () => import("./media.ta") },
  network: { si: () => import("./network.si"), ta: () => import("./network.ta") },
  testimonials: { si: () => import("./testimonials.si"), ta: () => import("./testimonials.ta") },
};

export type HomeContent = {
  content: typeof content;
  announcement: typeof announcement;
  careers: typeof careers;
  facilities: typeof facilities;
  healthTips: typeof healthTips;
  homeCare: typeof homeCare;
  internationalCare: typeof internationalCare;
  media: typeof media;
  network: typeof network;
  testimonials: typeof testimonials;
};

export async function getHomeContent(locale: Locale): Promise<HomeContent> {
  if (locale === DEFAULT_LOCALE) {
    return {
      content,
      // Spread, not the namespace itself. `import * as announcement` is a
      // Module object, and `HomePage` hands this slice WHOLE to
      // `AnnouncementModal`, a Client Component: React refuses to serialize a
      // Module across that boundary ("Only plain objects can be passed to
      // Client Components"). The other nine are safe unspread only because
      // every section takes a sub-object of its module (`content.pharmacy`,
      // `home.media.mediaItems`) rather than the module, and a sub-object is
      // already a plain literal. This branch is English-only, which is what
      // made the bug invisible on /si and /ta: `localize` builds a plain
      // object, so the translated locales never carried a Module at all.
      announcement: { ...announcement },
      careers,
      facilities,
      healthTips,
      homeCare,
      internationalCare,
      media,
      network,
      testimonials,
    };
  }

  const [siteContent, announcementOverlay, careersOverlay, facilitiesOverlay, healthTipsOverlay, homeCareOverlay, internationalCareOverlay, mediaOverlay, networkOverlay, testimonialsOverlay] = await Promise.all([
    overlays.content[locale](),
    overlays.announcement[locale](),
    overlays.careers[locale](),
    overlays.facilities[locale](),
    overlays.healthTips[locale](),
    overlays.homeCare[locale](),
    overlays.internationalCare[locale](),
    overlays.media[locale](),
    overlays.network[locale](),
    overlays.testimonials[locale](),
  ]);

  return {
    content: localize(content, siteContent),
    announcement: localize(announcement, announcementOverlay),
    careers: localize(careers, careersOverlay),
    facilities: localize(facilities, facilitiesOverlay),
    healthTips: localize(healthTips, healthTipsOverlay),
    homeCare: localize(homeCare, homeCareOverlay),
    internationalCare: localize(internationalCare, internationalCareOverlay),
    media: localize(media, mediaOverlay),
    network: localize(network, networkOverlay),
    testimonials: localize(testimonials, testimonialsOverlay),
  };
}
