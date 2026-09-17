import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { CountUp } from "./CountUp";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { HomeContent } from "../data/getContent";

export function WhoWeAreSection({
  content,
  locale,
}: {
  content: HomeContent["content"]["whoWeAre"];
  locale: Locale;
}) {
  const { eyebrow, heading, intro, body, cta, stats } = content;

  return (
    <section id="standards" className="mx-auto max-w-[1440px] px-5 pt-27 sm:px-8 lg:px-11">
      <div className="grid gap-18 min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[900px]:items-start">
        {/* A container, so the heading below can be sized off this column's
            own width rather than the viewport's. See the h2. */}
        <div className="@container min-w-0 min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {eyebrow}
          </div>
          {/* "NEIGHBOURHOOD" is one 13 character word and it sets the floor
              for this heading: at 66px it renders 558px wide, or 8.45px per
              px of font size. A viewport-based size alone cannot respect
              that, because this column is 0.85fr of a grid and so grows at a
              different rate from the viewport: the two cross repeatedly, and
              at 360px and from 900px to 1280px and again above 1600px the
              word overflowed and broke, dropping its last letter onto a
              fourth line under the rule.

              So the viewport ramp is capped by the column itself. 11.3cqw
              leaves the longest word 4.5% of the column to spare, and a min()
              means the cap only ever bites where the word would not have
              fit: everywhere else the original clamp still decides the size,
              including the whole single-column range below 900px. */}
          <h2 className="font-display mt-5 wrap-break-word text-[min(clamp(38px,4.4vw,66px),11.3cqw)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
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
              href={localeHref("/about-us", locale)}
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
