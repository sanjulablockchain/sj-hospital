import { Reveal } from "@/components/ui/Reveal";

type FeatureSplitProps = {
  id: string;
  /** Numbered kicker, e.g. "01 / Why here". */
  eyebrow: string;
  heading: string;
  body: string;
  /** Heading above the bullet column on the right. */
  listHeading: string;
  items: readonly string[];
  /** Tighten the heading's measure. The reference uses 24ch and 26ch. */
  headingMaxCh?: number;
};

/**
 * The accent slab plus bullet column that the reference uses twice, for `#why`
 * and `#fraud`: a 1.3fr panel filled with the accent carrying the section's
 * argument, and a 0.7fr panel on the page background listing the specifics.
 *
 * Shared rather than written twice because the two sections are identical
 * apart from their strings, and the pair of them is where the page makes its
 * two strongest promises.
 *
 * The accent panel is fixed-dark-on-accent in both themes: `--home-on-accent`
 * already flips to white under the light theme, so the pairing stays legible
 * without the reference's `[data-fixed-dark]` escape hatch.
 */
export function FeatureSplit({
  id,
  eyebrow,
  heading,
  body,
  listHeading,
  items,
  headingMaxCh = 24,
}: FeatureSplitProps) {
  return (
    <section id={id} className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal>
        <div className="grid grid-cols-[1.3fr_0.7fr] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
          <div className="bg-[var(--home-accent)] px-10.5 py-11.5 text-[var(--home-on-accent)] max-[640px]:px-6 max-[640px]:py-8">
            <span className="text-[11.5px] font-bold tracking-[0.2em] uppercase opacity-68">
              {eyebrow}
            </span>
            <h2
              className="font-display mt-4 text-[clamp(30px,3.8vw,54px)] leading-[0.94] font-extrabold tracking-[-0.035em] uppercase"
              style={{ maxWidth: `${headingMaxCh}ch` }}
            >
              {heading}
            </h2>
            <p
              className="mt-4.5 max-w-[56ch] text-[17px] leading-[1.62] opacity-86"
              style={{ textWrap: "pretty" }}
            >
              {body}
            </p>
          </div>

          <div className="flex flex-col bg-[var(--home-bg)] px-7.5 py-8.5 max-[640px]:px-6">
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {listHeading}
            </span>
            <ul className="mt-4.5 flex flex-col gap-3.25">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-[1.55] text-[var(--home-body)]"
                >
                  <span aria-hidden className="text-[var(--home-accent)]">
                    &#10022;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
