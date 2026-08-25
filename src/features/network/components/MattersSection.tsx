import { Reveal } from "@/components/ui/Reveal";
import { mattersBody, mattersEyebrow, mattersHeading, practice } from "../data/content";

/**
 * `#matters`: the argument for the page existing, in an accent-filled panel,
 * beside the five things the connection is said to change at the bedside.
 *
 * The `1.3fr / 0.7fr` split collapses to one column at 900px, as the
 * reference's `[data-r="feat"]` rule does. The hairline between the two panels
 * is the grid's own 1px gap showing the parent background through.
 *
 * Every line in the right-hand list is unverified copy. See PLACEHOLDER_NOTICE
 * in `data/content.ts`.
 */
export function MattersSection() {
  return (
    <section id="matters" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal className="grid grid-cols-[1.3fr_0.7fr] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-10.5 pt-11.5 pb-11 text-[var(--home-on-accent)]">
          <span className="text-[11.5px] font-bold tracking-[0.2em] uppercase opacity-68">
            {mattersEyebrow}
          </span>
          <h2 className="font-display mt-4 max-w-[24ch] text-[clamp(30px,3.8vw,54px)] leading-[0.94] font-extrabold tracking-[-0.035em] uppercase">
            {mattersHeading}
          </h2>
          <p className="mt-4.5 max-w-[56ch] text-[17px] leading-[1.62] opacity-86">{mattersBody}</p>
        </div>
        <div className="flex flex-col bg-[var(--home-bg)] px-7.5 py-8.5">
          <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
            In practice
          </span>
          <ul className="mt-4.5 flex flex-col gap-3.25">
            {practice.map((line) => (
              <li key={line} className="flex gap-3 text-[15px] leading-[1.55] text-[var(--home-body)]">
                <span aria-hidden className="text-[var(--home-accent)]">
                  &#10022;
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
