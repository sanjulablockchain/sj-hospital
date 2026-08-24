import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { screening } from "../data/screening";

/**
 * `#screening`: a sticky intro beside the list of checks.
 *
 * The reference hid the "who" column below 1025px to keep the row from
 * cramping. That is the wrong thing to drop: a check with no indication of who
 * it is for is only a test name, and most of this page's readers are on a
 * phone. The row stacks into one column instead, so "who" survives at every
 * width and only the three-across arrangement is desktop-only.
 *
 * Marked up as a definition list rather than a table: each row is one check
 * described, not a cell in a grid the reader compares across.
 */
export function ScreeningSection() {
  return (
    <section id="screening" className="mx-auto max-w-[1440px] px-5 pt-18.5 sm:px-8 min-[641px]:pt-26 lg:px-11">
      <div className="grid grid-cols-1 items-start gap-10 min-[900px]:grid-cols-[0.85fr_1.15fr] min-[900px]:gap-14.5">
        <Reveal className="min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            03 / Screening by age
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            The checks
            <br />
            worth doing
          </h2>
          <p className="mt-5 max-w-[38ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            Most useful screening is cheap and boring. This is what our physicians actually order,
            and roughly how often, for someone with no symptoms and no family history.
          </p>
          <p className="mt-3.5 max-w-[38ch] text-[15px] leading-[1.6] text-[var(--home-muted)]">
            A family history of diabetes, heart disease or cancer moves everything earlier. Ask us
            rather than guessing.
          </p>
          <Link
            href="/services#packages"
            className="sj-invert mt-6 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.75 text-[14.5px] font-bold text-[var(--home-on-accent)]"
          >
            Health check packages <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>

        <RevealStagger
          stepMs={30}
          className="border-t border-[var(--home-hairline-strong)]"
        >
          {screening.map((row) => (
            <dl
              key={row.check}
              className="grid grid-cols-1 items-baseline gap-x-5.5 gap-y-1.5 border-b border-[var(--home-hairline-strong)] px-1 py-5.25 min-[1025px]:grid-cols-[0.75fr_1.15fr_0.6fr]"
            >
              <dt className="text-[17.5px] font-bold text-[var(--home-heading)]">{row.check}</dt>
              <dd className="text-[14.5px] leading-[1.5] text-[var(--home-muted)]">{row.who}</dd>
              {/* Ordered last visually on desktop, but read straight after the
                  check when the row is stacked, which is the order that makes
                  sense out loud: the check, who it is for, how often. */}
              <dd className="text-[13.5px] font-bold text-[var(--home-accent-soft)] min-[1025px]:text-right">
                {row.freq}
              </dd>
            </dl>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
