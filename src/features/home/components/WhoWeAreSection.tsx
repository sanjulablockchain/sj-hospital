import { RevealStagger } from "@/components/ui/RevealStagger";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "../data/getContent";
import type { StatTone } from "../types";
import { HomeIcon } from "./HomeIcon";
import { Container, Eyebrow, displayHeading } from "./primitives";

/**
 * The tinted icon well on each stat card. The reference hard-codes the red,
 * green and orange washes; brand and sky come from the palette so they flip
 * with the theme.
 */
const TONE: Record<StatTone, { bg: string; fg: string }> = {
  red: { bg: "rgba(217,45,32,0.12)", fg: "#E0473B" },
  brand: { bg: "var(--home-surface-2)", fg: "var(--home-brand-text)" },
  sky: { bg: "var(--home-sky-bg)", fg: "var(--home-accent-soft)" },
  green: { bg: "rgba(14,143,85,0.12)", fg: "#16A865" },
  orange: { bg: "rgba(196,100,10,0.12)", fg: "#D9771A" },
};

/**
 * `#about`: the two-column intro over a lavender gradient, then six stat cards
 * (1 / 2 / 3 columns at 720 and 1180px). The services figure is filled from
 * the live count rather than typed into the data.
 */
export function WhoWeAreSection({
  content,
  servicesCount,
}: {
  content: HomeContent["content"]["whoWeAre"];
  servicesCount: number;
}) {
  return (
    <section
      id="about"
      className="py-20 sm:py-27.5"
      style={{ background: "linear-gradient(var(--home-bg), var(--home-surface))" }}
    >
      <Container className="flex flex-col gap-10">
        <Reveal className="grid items-end gap-x-18 gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,480px),1fr))]">
          <div className="flex flex-col gap-4.5">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2 className={displayHeading} style={{ textWrap: "balance" }}>
              {content.heading}
            </h2>
          </div>
          <div className="flex flex-col gap-3.5">
            <p className="m-0 text-[17px] leading-[1.65] font-semibold text-[var(--home-heading)]" style={{ textWrap: "pretty" }}>
              {content.intro}
            </p>
            <p className="m-0 text-[15.5px] leading-[1.7] text-[var(--home-muted-2)]" style={{ textWrap: "pretty" }}>
              {content.body}
            </p>
          </div>
        </Reveal>

        <RevealStagger className="grid grid-cols-1 gap-5 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-3">
          {content.stats.map((stat) => {
            const tone = TONE[stat.tone];
            return (
              <div
                key={stat.label}
                className="flex gap-5 rounded-[14px] bg-[var(--home-bg)] p-5.5 shadow-[0_1px_2px_rgba(26,21,64,0.06),0_12px_32px_-20px_rgba(26,21,64,0.25)]"
              >
                <span
                  className="flex h-[84px] w-[84px] shrink-0 items-center justify-center rounded-[14px]"
                  style={{ background: tone.bg, color: tone.fg }}
                >
                  <HomeIcon name={stat.icon} size={40} stroke={1.5} />
                </span>
                <div className="flex min-w-0 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-display text-[38px] leading-none font-bold tracking-[-0.02em] text-[var(--home-accent-soft)] tabular-nums">
                      {stat.value.replace("{count}", String(servicesCount))}
                    </span>
                    <span className="max-w-[140px] text-[15px] leading-[1.25] font-extrabold text-[var(--home-heading)]">
                      {stat.label}
                    </span>
                  </div>
                  <span className="text-[14px] leading-[1.5] text-[var(--home-muted)]">{stat.desc}</span>
                </div>
              </div>
            );
          })}
        </RevealStagger>
      </Container>
    </section>
  );
}
