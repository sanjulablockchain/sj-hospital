import Image from "next/image";
import Link from "next/link";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { Container, ArrowRight } from "./primitives";

/**
 * `#media`: the newsroom card (fixed ink, the radiology photograph under the
 * top story easing in on hover, three more stories in a strip that lift, a
 * brand footer link) beside the careers card (lavender, five job rows that
 * lift and reveal in turn). The first media item is the top story; the rest
 * fill the strip.
 */
export function MediaCareersSection({
  media,
  careers,
  locale,
}: {
  media: HomeContent["media"];
  careers: HomeContent["careers"];
  locale: Locale;
}) {
  const [top, ...rest] = media.mediaItems;
  const story = localeHref(media.storyHref, locale);

  return (
    <section id="media" className="pb-20 sm:pb-27.5">
      <Container className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr))]">
        <Reveal className="flex flex-col overflow-hidden rounded-[16px] bg-[#1A1540] text-white">
          <Link href={story} className="group relative block min-h-[300px] flex-1 overflow-hidden text-white hover:text-white">
            <ParallaxLayer factor={0.09} maxOffsetPx={40} className="absolute inset-x-0 -inset-y-[10%]">
              <Image
                src={media.photo}
                alt={media.photoAlt}
                fill
                sizes="(min-width: 1100px) 50vw, 100vw"
                className="sj-card-zoom object-cover"
              />
            </ParallaxLayer>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "linear-gradient(rgba(26,21,64,0.15) 0%, rgba(26,21,64,0.25) 40%, rgba(26,21,64,0.95) 100%)" }}
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 px-6 py-7 sm:px-8">
              <span className="rounded-full bg-[rgba(26,21,64,0.55)] px-3 py-2 text-[12px] font-extrabold tracking-[0.2em] text-white uppercase backdrop-blur-[6px]">
                {media.sectionEyebrow}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-6 sm:p-8">
              <span className="flex items-center gap-2.5 text-[13px] font-bold text-[#9FD6F5]">
                <span className="rounded-full bg-[var(--home-accent)] px-2.5 py-[5px] text-[11px] font-extrabold tracking-[0.1em] text-[#0F0B30] uppercase">
                  {top.tag}
                </span>
                {top.date}
              </span>
              <span className="font-display text-[clamp(26px,2.4vw,34px)] leading-[1.1] font-extrabold tracking-[-0.02em]">{top.title}</span>
              <span className="inline-flex items-center gap-2 text-[14px] font-extrabold text-[#9FD6F5]">
                {media.readMore} <ArrowRight />
              </span>
            </div>
          </Link>
          <RevealStagger className="grid gap-px border-t border-white/12 bg-white/12 [grid-template-columns:repeat(auto-fit,minmax(170px,1fr))]">
            {rest.map((item) => (
              <Link
                key={item.title}
                href={story}
                className="sj-card-lift relative flex flex-col gap-2 bg-[#1A1540] px-6 py-5.5 text-white hover:z-10 hover:bg-[var(--home-deep)] hover:text-white"
              >
                <span className="text-[11px] font-extrabold tracking-[0.12em] text-[var(--home-accent)] uppercase">
                  {item.tag} &middot; {item.date}
                </span>
                <span className="text-[15px] leading-[1.35] font-extrabold">{item.title}</span>
              </Link>
            ))}
          </RevealStagger>
          <Link
            href={localeHref(media.href, locale)}
            className="flex items-center justify-between gap-3 bg-[var(--home-brand)] px-6 py-4.5 text-[14.5px] font-extrabold text-white transition-colors hover:bg-[var(--home-brand-hover)] hover:text-white"
          >
            {media.cta} <ArrowRight />
          </Link>
        </Reveal>

        <Reveal className="flex flex-col gap-6 rounded-[16px] bg-[var(--home-surface)] p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-2.5">
              <span className="text-[12px] font-extrabold tracking-[0.2em] text-[var(--home-brand-text)] uppercase">{careers.sectionEyebrow}</span>
              <h3 className="font-display m-0 text-[32px] font-extrabold tracking-[-0.03em] text-[var(--home-heading)]">{careers.heading}</h3>
            </div>
            <Link
              href={localeHref(careers.href, locale)}
              className="inline-flex items-center gap-2 text-[14px] font-extrabold text-[var(--home-brand-text)] hover:text-[var(--home-accent-soft)]"
            >
              {careers.cta} <ArrowRight />
            </Link>
          </div>
          <RevealStagger stepMs={60} className="flex flex-col gap-2">
            {careers.jobOpenings.map((job) => (
              <Link
                key={job.title}
                href={localeHref(careers.openingsHref, locale)}
                className="sj-card-lift flex items-center justify-between gap-3 rounded-[10px] border border-[var(--home-hairline)] bg-[var(--home-bg)] px-4.5 py-[15px] text-[var(--home-heading)] hover:border-[var(--home-brand)] hover:text-[var(--home-heading)]"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15.5px] font-extrabold">{job.title}</span>
                  <span className="text-[13px] text-[var(--home-muted-2)]">
                    {job.department} &middot; {job.type}
                  </span>
                </span>
                <span aria-hidden className="font-extrabold text-[var(--home-brand-text)]">
                  &rarr;
                </span>
              </Link>
            ))}
          </RevealStagger>
        </Reveal>
      </Container>
    </section>
  );
}
