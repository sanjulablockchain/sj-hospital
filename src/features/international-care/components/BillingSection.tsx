import { Reveal } from "@/components/ui/Reveal";
import { insuranceNotes, payChips } from "../data/content";

/**
 * `#insurance`: the reference's `[data-r="feat"]` pair, a wide accent panel
 * beside a narrow list panel, collapsing to one column below 900px.
 *
 * The accent panel is the one place on the page where the fill is the
 * background, so everything inside it is `--home-on-accent` and the chip
 * borders are that colour at 30%, which reads correctly in both themes.
 *
 * The reference's headline here was "No surprises on the last day", carried by
 * an itemised interim bill every 48 hours. That bill is not something the
 * hospital publishes, so the claim went and the headline now says the thing the
 * repo does back: the estimate comes before the treatment does.
 */
export function BillingSection() {
  return (
    <section
      id="insurance"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal>
        <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
          <div className="bg-[var(--home-accent)] px-10 pt-11 pb-10.5 text-[var(--home-on-accent)]">
            <span className="text-[11.5px] font-bold tracking-[0.2em] uppercase opacity-68">
              05 / Paying for it
            </span>
            <h2 className="font-display mt-4 max-w-[26ch] text-[clamp(30px,3.8vw,52px)] leading-[0.94] font-extrabold tracking-[-0.035em] uppercase">
              The estimate comes first
            </h2>
            <p className="mt-4.5 max-w-[56ch] text-[17px] leading-[1.62] opacity-86">
              A written estimate is given before treatment starts, covering the likely course of
              care, so nothing begins until you have it in front of you. Send your policy details to
              the desk before you travel and the insurance paperwork is prepared alongside it.
            </p>
            <ul className="mt-6.5 flex flex-wrap gap-2.5">
              {payChips.map((chip) => (
                <li
                  key={chip}
                  className="border border-[var(--home-on-accent)]/30 px-3.75 py-2.5 text-[13.5px] font-bold"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col bg-[var(--home-bg)] px-7.5 py-8.5">
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              Insurance
            </span>
            <ul className="mt-4.5 flex flex-col gap-3.25">
              {insuranceNotes.map((note) => (
                <li
                  key={note}
                  className="flex gap-3 text-[15px] leading-[1.55] text-[var(--home-body)]"
                >
                  <span aria-hidden className="shrink-0 text-[var(--home-accent)]">
                    &#10022;
                  </span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
