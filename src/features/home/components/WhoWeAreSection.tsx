import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { CountUp } from "./CountUp";

type Stat = {
  /** Animated when set; `value` is used verbatim otherwise. */
  count?: number;
  value?: string;
  /** Fixed text that sits directly after the counter. */
  suffix?: string;
  caption: string;
};

// The zero stays a literal zero: counting it down from anything would briefly
// show a number its own caption then contradicts.
const stats: Stat[] = [
  { count: 24, caption: "Hours a day, every service open" },
  { count: 2, suffix: "h", caption: "Cleaning cycle, US specification" },
  { value: "0", caption: "Tests ordered that you don't need" },
];

export function WhoWeAreSection() {
  return (
    <section id="standards" className="mx-auto max-w-[1440px] px-5 pt-27 sm:px-8 lg:px-11">
      <div className="grid gap-18 min-[900px]:grid-cols-[0.85fr_1.15fr] min-[900px]:items-start">
        <div className="min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            01 / Who we are
          </div>
          <h2 className="font-display mt-5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            A US hospital
            <br />
            in a Sri Lankan
            <br />
            neighbourhood
          </h2>
        </div>
        <div>
          <Reveal>
            <p className="max-w-[52ch] text-[21px] leading-[1.55] font-semibold text-[var(--home-heading)]" style={{ textWrap: "pretty" }}>
              St. Joseph Hospital is managed and operated by the Kids &amp; Teens Pediatric Medical Group of Los
              Angeles: the standards, protocols and clinical discipline of American care, priced for families in
              Negombo.
            </p>
          </Reveal>
          <Reveal className="mt-5.5">
            <p className="max-w-[56ch] text-[16.5px] leading-[1.7] text-[var(--home-muted)]">
              Consumables are never reused. Waste is managed to international protocol. Every surface is cleaned
              on a two hour cycle. Our in-house doctors order only the tests you genuinely need, and every
              report is read by two of them before it reaches you.
            </p>
          </Reveal>
          <RevealStagger
            stepMs={110}
            className="mt-13.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-3"
          >
            {stats.map((stat) => (
              <div key={stat.caption} className="bg-[var(--home-bg)] px-6.5 py-7.5">
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
