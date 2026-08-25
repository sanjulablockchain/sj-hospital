import { Reveal } from "@/components/ui/Reveal";
import { MEDIA_EMAIL, SWITCHBOARD, SWITCHBOARD_TEL } from "../data/content";

/**
 * `#contactdesk`: the closing call to action, an accent panel beside four
 * full-height rows that invert on hover.
 *
 * The rows use `sj-invert` rather than `sj-row-fill`: they should flip to the
 * light pair the reference specifies, and they must not take `sj-row-fill`'s
 * 16px padding step, which would shunt four stacked rows sideways in unison.
 */
export function EnquirySection() {
  return (
    <section
      id="contactdesk"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18.5"
    >
      <Reveal className="grid gap-px bg-[var(--home-hairline-strong)] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)]">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
            07 / On deadline
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            Filing today?
            <br />
            Say so in
            <br />
            the subject.
          </h2>
          <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">
            Put your outlet, the topic and your deadline in the first line and we will come back
            within the working day. Overnight and weekend stories reach the duty phone through the
            main hospital number.
          </p>
        </div>

        <div className="flex flex-col bg-[var(--home-bg)]">
          <a
            href={`mailto:${MEDIA_EMAIL}`}
            className="sj-invert font-display flex flex-1 items-center justify-between gap-5 border-b border-[var(--home-hairline-strong)] px-8 py-6.5 text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)]"
          >
            {MEDIA_EMAIL} <span aria-hidden>&rarr;</span>
          </a>
          <a
            href={`tel:${SWITCHBOARD_TEL}`}
            className="sj-invert font-display flex flex-1 items-center justify-between gap-5 border-b border-[var(--home-hairline-strong)] px-8 py-6.5 text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] tabular-nums"
          >
            {SWITCHBOARD} <span aria-hidden>&#9742;</span>
          </a>
          <a
            href="#kit"
            className="sj-invert font-display flex flex-1 items-center justify-between gap-5 border-b border-[var(--home-hairline-strong)] px-8 py-6.5 text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)]"
          >
            Press kit and logos <span aria-hidden>&rarr;</span>
          </a>
          <a
            href="#spokespeople"
            className="sj-invert font-display flex flex-1 items-center justify-between gap-5 px-8 py-6.5 text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)]"
          >
            Request an interview <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
