import Image from "next/image";
import Link from "next/link";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { schools } from "@/features/school-wellness";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { CountUp } from "./CountUp";
import { HomeIcon } from "./HomeIcon";
import { ArrowRight, Container, Eyebrow, displayHeading, pillButton } from "./primitives";

type Tile = HomeContent["content"]["community"]["tiles"]["school"];

/**
 * One diamond of the mosaic. The grid it sits in is turned 45 degrees, so the
 * photograph is turned back and oversized (inset -22%, a square of about
 * 1.44x the cell) until its corners clear the cell's. `focus` is the
 * object-position that keeps faces in the visible diamond.
 */
function PhotoTile({ tile, focus }: { tile: Tile; focus: string }) {
  return (
    <div className="group relative overflow-hidden rounded-[20px] bg-[var(--home-surface-2)] shadow-[0_18px_40px_-24px_rgba(26,21,64,0.45)]">
      <div className="absolute -inset-[22%] -rotate-45">
        <Image
          src={tile.photo}
          alt={tile.photoAlt}
          fill
          sizes="(min-width: 900px) 300px, 50vw"
          className={`object-cover ${focus} transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.06]`}
        />
      </div>
    </div>
  );
}

/**
 * `#community`: what the hospital does for the town, under the free OPD band.
 * Copy and stats on the left; on the right a diamond mosaic after the
 * reference teasers the owner supplied: a 2x2 grid turned 45 degrees (school
 * on top, the clinicians right, reception left, a brand tile with a heart at
 * the bottom) over an accent outline offset to the right that drifts on
 * scroll. Mobile first, the mosaic stacks under the copy and only sits beside
 * it from 900px. The stacked grid has no row gap: the turned mosaic's empty
 * top corner (14.6% of its box) already spaces it from the buttons.
 *
 * The school figures are counted from the Wellness Center Program tracker
 * (`school-wellness`'s `schools`), the same list that page counts, so the two
 * can never disagree. The background runs page to surface, handing over to
 * the specialties band's own surface top.
 */
export function CommunitySection({
  content,
  locale,
}: {
  content: HomeContent["content"]["community"];
  locale: Locale;
}) {
  const counts = {
    total: String(schools.length),
    open: String(schools.filter((s) => s.status === "open").length),
  };
  const figure = (value: string) => value.replace("{total}", counts.total).replace("{open}", counts.open);

  return (
    <section
      id="community"
      className="relative overflow-hidden py-20 sm:py-27.5"
      style={{ background: "linear-gradient(var(--home-bg), var(--home-surface))" }}
    >
      {/* Faint diagonal bands behind the mosaic, after the reference's patterned backdrop. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[12%] -right-[10%] h-[340px] w-[340px] rotate-45 rounded-[48px] border-[28px] border-[color-mix(in_srgb,var(--home-brand)_6%,transparent)]" />
        <div className="absolute -bottom-[8%] right-[30%] h-[220px] w-[220px] rotate-45 rounded-[36px] border-[20px] border-[color-mix(in_srgb,var(--home-accent)_8%,transparent)]" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-x-16 gap-y-0 min-[900px]:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className={displayHeading} style={{ textWrap: "balance" }}>
              {content.heading}
            </h2>
            <p className="m-0 max-w-[560px] text-[17px] leading-[1.65] text-[var(--home-body)]" style={{ textWrap: "pretty" }}>
              {content.body}
            </p>

            <RevealStagger className="mt-1 grid max-w-[560px] grid-cols-3 gap-3 sm:gap-5">
              {content.stats.map((stat) => (
                <div key={stat.value} className="flex flex-col gap-1.5 border-l-2 border-[var(--home-accent)] pl-3 sm:pl-4">
                  <CountUp
                    display={figure(stat.value)}
                    className="font-display text-[28px] leading-none font-bold tracking-[-0.02em] text-[var(--home-brand-text)] tabular-nums sm:text-[36px]"
                  />
                  <span className="text-[13px] leading-[1.35] font-bold text-[var(--home-heading)] sm:text-[14px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </RevealStagger>

            <div className="mt-3 flex flex-wrap gap-3">
              <Link href={localeHref(content.hrefPrimary, locale)} className={`${pillButton("brand")} h-[52px] px-6.5 text-[15px]`}>
                {content.ctaPrimary} <ArrowRight />
              </Link>
              <Link href={localeHref(content.hrefSecondary, locale)} className={`${pillButton("outline")} h-[52px] px-6.5 text-[15px]`}>
                {content.ctaSecondary}
              </Link>
            </div>
          </Reveal>

          <Reveal className="relative mx-auto aspect-square w-full max-w-[540px]">
            {/* The accent outline, the same size as the mosaic and nudged right so it frames one side. */}
            <ParallaxLayer factor={0.08} maxOffsetPx={28} className="absolute inset-[14.6%] translate-x-[9%]">
              <div aria-hidden className="h-full w-full rotate-45 rounded-[26px] border-[3px] border-[var(--home-accent)]" />
            </ParallaxLayer>
            <div className="absolute inset-[14.6%] grid rotate-45 grid-cols-2 gap-2.5 sm:gap-3.5">
              <PhotoTile tile={content.tiles.school} focus="object-[50%_45%]" />
              <PhotoTile tile={content.tiles.team} focus="object-[50%_35%]" />
              <PhotoTile tile={content.tiles.welcome} focus="object-[50%_45%]" />
              <div aria-hidden className="flex items-center justify-center rounded-[20px] bg-[var(--home-brand)] text-white">
                <span className="-rotate-45">
                  <HomeIcon name="heart" size={44} stroke={1.6} />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
