import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { CountUp } from "./CountUp";
import type { HomeContent } from "../data/getContent";

export function WhoWeAreSection({ content }: { content: HomeContent["content"]["whoWeAre"] }) {
  const { eyebrow, heading, intro, body, cta, stats } = content;

  return (
    <section id="standards" className="mx-auto max-w-[1440px] px-5 pt-27 sm:px-8 lg:px-11">
      <div className="grid gap-18 min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[900px]:items-start">
        <div className="min-w-0 min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {eyebrow}
          </div>
          <h2 className="font-display mt-5 wrap-break-word text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            {heading.line1}
            <br />
            {heading.line2}
            <br />
            {heading.line3}
          </h2>
        </div>
        <div className="min-w-0">
          <Reveal>
            <p className="max-w-[52ch] text-[21px] leading-[1.55] font-semibold text-[var(--home-heading)]" style={{ textWrap: "pretty" }}>
              {intro}
            </p>
          </Reveal>
          <Reveal className="mt-5.5">
            <p className="max-w-[56ch] text-[16.5px] leading-[1.7] text-[var(--home-muted)]">{body}</p>
          </Reveal>
          <Reveal className="mt-8">
            <Link
              href="/about-us"
              className="sj-invert inline-flex items-center gap-2.5 border border-[var(--home-hairline-strong)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-heading)]"
            >
              {cta} <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
          <RevealStagger
            stepMs={110}
            className="mt-13.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-3"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-[var(--home-bg)] px-6.5 py-7.5">
                <div className="font-display text-[76px] leading-[0.82] font-extrabold tracking-[-0.05em] text-[var(--home-accent)] tabular-nums">
                  {stat.count === undefined ? (
                    stat.value
                  ) : (
                    <>
                      <CountUp to={stat.count} />
                      {stat.suffix}
                    </>
                  )}
                </div>
                <div className="mt-3.5 text-[12.5px] leading-[1.5] tracking-[0.14em] text-[var(--home-muted)] uppercase">
                  {stat.caption}
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
