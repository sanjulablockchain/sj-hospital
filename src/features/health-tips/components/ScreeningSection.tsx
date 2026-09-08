import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { HealthTipsContent } from "../data/getContent";

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
 *
 * `screening` arrives as a prop, already localized, rather than being
 * imported here. The "Health check packages" link is internal, so it goes
 * through `LocaleLink` rather than a plain `next/link`.
 */
export function ScreeningSection({ screening }: { screening: HealthTipsContent["screening"] }) {
  const { screening: checks, screeningSection } = screening;

  return (
    <section id="screening" className="mx-auto max-w-[1440px] px-5 pt-18.5 sm:px-8 min-[641px]:pt-26 lg:px-11">
      <div className="grid grid-cols-1 items-start gap-10 min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] min-[900px]:gap-14.5">
        <Reveal className="min-w-0 min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {screeningSection.eyebrow}
          </div>
          <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            {screeningSection.heading.line1}
            <br />
            {screeningSection.heading.line2}
          </h2>
          <p className="mt-5 max-w-[38ch] wrap-break-word text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            {screeningSection.body1}
          </p>
          <p className="mt-3.5 max-w-[38ch] wrap-break-word text-[15px] leading-[1.6] text-[var(--home-muted)]">
            {screeningSection.body2}
          </p>
          <LocaleLink
            href="/services#packages"
            className="sj-invert mt-6 inline-flex min-w-0 items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.75 text-[14.5px] font-bold wrap-break-word text-[var(--home-on-accent)]"
          >
            {screeningSection.cta} <span aria-hidden>&rarr;</span>
          </LocaleLink>
        </Reveal>

        <RevealStagger
          stepMs={30}
          className="border-t border-[var(--home-hairline-strong)]"
        >
          {checks.map((row) => (
            <dl
              key={row.check}
              className="grid grid-cols-1 items-baseline gap-x-5.5 gap-y-1.5 border-b border-[var(--home-hairline-strong)] px-1 py-5.25 min-[1025px]:grid-cols-[minmax(0,0.75fr)_minmax(0,1.15fr)_minmax(0,0.6fr)]"
            >
              <dt className="wrap-break-word text-[17.5px] font-bold text-[var(--home-heading)]">{row.check}</dt>
              <dd className="wrap-break-word text-[14.5px] leading-[1.5] text-[var(--home-muted)]">{row.who}</dd>
              {/* Ordered last visually on desktop, but read straight after the
                  check when the row is stacked, which is the order that makes
                  sense out loud: the check, who it is for, how often. */}
              <dd className="wrap-break-word text-[13.5px] font-bold text-[var(--home-accent-soft)] min-[1025px]:text-right">
                {row.freq}
              </dd>
            </dl>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
