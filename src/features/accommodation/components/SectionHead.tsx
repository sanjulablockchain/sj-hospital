import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The numbered eyebrow and heading on the left, the standfirst on the right,
 * both sitting on the same baseline. `#rooms` and `#book` use it with an
 * `intro`; `#specialties` omits one (see SpecialtiesSection.tsx for why), so
 * `intro` is optional and the `<p>` only renders when there is one to show.
 * `justify-between` still spaces the heading block correctly with the `<p>`
 * absent, since a `flex` container with one child just lets it take its
 * natural width instead of splitting space with a sibling.
 *
 * `heading` is typed as a node rather than a string so a caller could
 * hard-break it if a heading ever needed to; none of the three callers here do
 * today, they all just pass a plain string.
 *
 * The heading block carries `min-w-0`: without it, a long unbreakable
 * Sinhala or Tamil heading (a Tamil word ending in an enclitic is one token
 * to the browser, with nothing inside it to wrap on) pushes past its share
 * of the row and overflows a 360px viewport, since a flex item does not
 * shrink below its content width by default. See the i18n feature recipe's
 * Step E2.
 */
export function SectionHead({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: ReactNode;
  intro?: string;
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-10">
      <div className="min-w-0">
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          {eyebrow}
        </div>
        <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          {heading}
        </h2>
      </div>
      {intro && <p className="max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">{intro}</p>}
    </Reveal>
  );
}
