import { localize } from "@/lib/i18n/localize";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import * as content from "./content";
import * as announcement from "./announcement";
import * as careers from "./careers";
import * as faq from "./faq";
import * as internationalCare from "./internationalCare";
import * as media from "./media";
import * as network from "./network";
import * as testimonials from "./testimonials";

/**
 * The home page's copy in one locale, across all eight data files:
 * `content.ts` for the bands with no file of their own, `announcement.ts` for
 * the pop-up that opens over the page, and the six per-band files
 * (`careers.ts`, `faq.ts`, `internationalCare.ts`, `media.ts`, `network.ts`,
 * `testimonials.ts`).
 *
 * Each English module is the shape: the result always has its keys, its
 * array lengths and its facts, and an overlay can only replace strings. This
 * exposes ONE getter returning an object keyed by data file, so `HomePage`
 * awaits once rather than eight times, and passes slices of the one result
 * down to its sections as props. This runs in a Server Component, so no
 * translation data reaches the client bundle; the Client Component leaves on
 * this page (`HeroParallaxBackground`, `SpecialtiesCarousel`,
 * `TestimonialsSection`, `NetworkAccordion`, `FaqList`, `AnnouncementModal`)
 * each receive their own slice of the already localized result as a prop
 * from their Server parent, never by importing a data file themselves.
 */
const overlays = {
  content: { si: () => import("./content.si"), ta: () => import("./content.ta") },
  announcement: { si: () => import("./announcement.si"), ta: () => import("./announcement.ta") },
  careers: { si: () => import("./careers.si"), ta: () => import("./careers.ta") },
  faq: { si: () => import("./faq.si"), ta: () => import("./faq.ta") },
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
  faq: typeof faq;
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
      // Client Components"). The other seven are safe unspread only because
      // every section takes a sub-object of its module (`content.pharmacy`,
      // `home.media.mediaItems`) rather than the module, and a sub-object is
      // already a plain literal. This branch is English-only, which is what
      // made the bug invisible on /si and /ta: `localize` builds a plain
      // object, so the translated locales never carried a Module at all.
      announcement: { ...announcement },
      careers,
      faq,
      internationalCare,
      media,
      network,
      testimonials,
    };
  }

  const [
    contentOverlay,
    announcementOverlay,
    careersOverlay,
    faqOverlay,
    internationalCareOverlay,
    mediaOverlay,
    networkOverlay,
    testimonialsOverlay,
  ] = await Promise.all([
    overlays.content[locale](),
    overlays.announcement[locale](),
    overlays.careers[locale](),
    overlays.faq[locale](),
    overlays.internationalCare[locale](),
    overlays.media[locale](),
    overlays.network[locale](),
    overlays.testimonials[locale](),
  ]);

  return {
    content: localize(content, contentOverlay),
    announcement: localize(announcement, announcementOverlay),
    careers: localize(careers, careersOverlay),
    faq: localize(faq, faqOverlay),
    internationalCare: localize(internationalCare, internationalCareOverlay),
    media: localize(media, mediaOverlay),
    network: localize(network, networkOverlay),
    testimonials: localize(testimonials, testimonialsOverlay),
  };
}
