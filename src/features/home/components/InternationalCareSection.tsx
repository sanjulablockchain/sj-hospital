import Image from "next/image";
import Link from "next/link";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { HomeIcon } from "./HomeIcon";
import { Container, Eyebrow, pillButton, ArrowRight } from "./primitives";

/**
 * `#international`: the six-point list on the left and, on the right, the
 * arrival photograph in a white-ringed circle over a translucent accent disc,
 * with four floating badges (plane, globe, the "estimate in writing" card and
 * a stethoscope). The band fades from the page surface into the sky tint and
 * carries a dot pattern down its right side.
 *
 * Motion: the composition is layered in five depths that drift at different
 * rates as you scroll (disc up, photograph slowly up, the four badges down at
 * increasing speeds), the photograph eases up when the circle is hovered, each
 * badge lifts and turns on hover, and each list item highlights and slides
 * right with its dot growing when the pointer is over it.
 */
export function InternationalCareSection({
  content,
  locale,
}: {
  content: HomeContent["internationalCare"];
  locale: Locale;
}) {
  const badge =
    "sj-card-lift group/badge absolute flex items-center justify-center rounded-full shadow-[0_16px_30px_-14px_rgba(26,21,64,0.4)] hover:z-10";
  const badgeIcon = "transition-transform duration-500 group-hover/badge:rotate-[-8deg] group-hover/badge:scale-110 motion-reduce:transition-none";

  return (
    <section
      id="international"
      className="relative overflow-hidden py-20 sm:py-25"
      style={{ background: "linear-gradient(100deg, var(--home-bg) 0%, var(--home-bg) 45%, var(--home-sky-bg-2) 100%)" }}
    >
      <ParallaxLayer factor={0.04} maxOffsetPx={40} className="pointer-events-none absolute top-0 right-0 h-full w-[40%]">
        <div
          aria-hidden
          className="h-[120%] w-full"
          style={{ backgroundImage: "radial-gradient(var(--home-dot) 3px, transparent 3.5px)", backgroundSize: "36px 36px" }}
        />
      </ParallaxLayer>
      <Container className="relative grid items-center gap-10 sm:gap-14 [grid-template-columns:repeat(auto-fit,minmax(min(100%,480px),1fr))]">
        <Reveal className="flex flex-col gap-5.5">
          <Eyebrow>{content.sectionEyebrow}</Eyebrow>
          <h2 className="font-display m-0 text-[clamp(34px,3.8vw,52px)] leading-none font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
            {content.heading}
          </h2>
          <p className="m-0 max-w-[560px] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">{content.body}</p>
          <RevealStagger stepMs={70} className="flex flex-col gap-4">
            {content.internationalCareItems.map((item) => (
              <div key={item.index} className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="mt-1 h-[18px] w-[18px] shrink-0 rounded-full bg-[var(--home-accent)] shadow-[0_0_0_5px_var(--home-sky-bg)]"
                />
                <p className="m-0 text-[15.5px] leading-[1.6] text-[var(--home-body)]">
                  <strong className="font-extrabold text-[var(--home-heading)]">{item.title}:</strong> {item.body}
                </p>
              </div>
            ))}
          </RevealStagger>
          <div className="mt-1.5 flex flex-wrap gap-3">
            <Link href={localeHref(content.hrefPrimary, locale)} className={`${pillButton("brand")} h-[52px] px-6.5 text-[15px]`}>
              {content.ctaPrimary} <ArrowRight />
            </Link>
            <a href={content.hrefSecondary} className={`${pillButton("outline")} h-[52px] gap-2 px-6.5 text-[15px]`}>
              <HomeIcon name="chat" size={18} stroke={2} /> {content.ctaSecondary}
            </a>
          </div>
        </Reveal>

        <div className="relative flex min-h-[420px] items-center justify-center sm:min-h-[560px]">
          {/* Depth 1: the accent disc rises. */}
          <ParallaxLayer factor={-0.07} maxOffsetPx={40} className="absolute flex h-full w-full items-center justify-center">
            <div aria-hidden className="aspect-square w-[min(92%,540px)] rounded-full bg-[var(--home-accent)] opacity-[0.22]" />
          </ParallaxLayer>
          {/* Depth 2: the photograph, drifting slowly inside its ring and easing up on hover. */}
          <ParallaxLayer factor={0.03} maxOffsetPx={18} className="relative aspect-square w-[min(82%,480px)]">
            <div className="group relative h-full w-full overflow-hidden rounded-full border-[10px] border-white shadow-[0_30px_60px_-30px_rgba(26,21,64,0.45)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgba(26,21,64,0.6)]">
              <ParallaxLayer factor={0.05} maxOffsetPx={30} className="absolute inset-x-0 -inset-y-[10%]">
                <Image src={content.photo} alt={content.photoAlt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="sj-card-zoom object-cover" />
              </ParallaxLayer>
            </div>
          </ParallaxLayer>
          {/* Depths 3 to 5: the badges sink at increasing rates. */}
          <ParallaxLayer factor={0.08} maxOffsetPx={44} className="pointer-events-none absolute inset-0">
            <div
              className={`${badge} pointer-events-auto top-[12%] left-[4%] h-[92px] w-[92px] bg-[var(--home-brand)] text-white shadow-[0_16px_30px_-14px_rgba(69,51,143,0.7)] hover:bg-[var(--home-brand-hover)]`}
            >
              <span aria-hidden className={badgeIcon}>
                <HomeIcon name="plane" size={40} stroke={1.5} />
              </span>
            </div>
          </ParallaxLayer>
          <ParallaxLayer factor={0.12} maxOffsetPx={56} className="pointer-events-none absolute inset-0">
            <div className={`${badge} pointer-events-auto top-[22%] right-[4%] h-[76px] w-[76px] bg-[var(--home-bg)] text-[var(--home-accent-soft)]`}>
              <span aria-hidden className={badgeIcon}>
                <HomeIcon name="globe" size={34} stroke={1.5} />
              </span>
            </div>
            <div className={`${badge} pointer-events-auto right-[8%] bottom-[16%] h-16 w-16 bg-[var(--home-accent)] text-[var(--home-on-accent)] hover:bg-[var(--home-accent-hover)]`}>
              <span aria-hidden className={badgeIcon}>
                <HomeIcon name="steth" size={28} stroke={1.6} />
              </span>
            </div>
          </ParallaxLayer>
          <ParallaxLayer factor={0.16} maxOffsetPx={64} className="pointer-events-none absolute inset-0">
            <div className="sj-card-lift group/badge pointer-events-auto absolute bottom-[10%] left-[10%] flex items-center gap-3 rounded-[12px] bg-[var(--home-bg)] px-4.5 py-3.5 shadow-[0_16px_30px_-14px_rgba(26,21,64,0.4)] hover:z-10">
              <span className={`text-[var(--home-brand-text)] ${badgeIcon}`}>
                <HomeIcon name="shield" size={28} stroke={1.7} />
              </span>
              <span className="flex flex-col">
                <span className="text-[14.5px] font-extrabold text-[var(--home-heading)]">{content.badge.title}</span>
                <span className="text-[12.5px] text-[var(--home-muted-2)]">{content.badge.note}</span>
              </span>
            </div>
          </ParallaxLayer>
        </div>
      </Container>
    </section>
  );
}
