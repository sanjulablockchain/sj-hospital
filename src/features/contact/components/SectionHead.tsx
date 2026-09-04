import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The numbered eyebrow and heading on the left, the standfirst on the right,
 * both sitting on the same baseline. `#reach`, `#message` and `#map` use it
 * identically; the reference repeats the same block for each.
 *
 * `heading` is a node rather than a string because a caller may want to
 * hard-break its heading, and where the line falls is a typographic decision
 * that belongs beside the markup rather than in `data/content.ts`.
 *
 * `min-w-0` on the heading group and `wrap-break-word` on the heading
 * itself: this is the recipe's own reference feature, and every sibling
 * `SectionHead` already carries both. Sinhala and Tamil form long
 * unbreakable tokens where English would have a space, and a flex item does
 * not shrink below its content width by default, so without `min-w-0` a
 * long token pushes straight out of a 360px column; `wrap-break-word` is
 * what then lets a token wider than the column itself break instead of
 * overflowing.
 */
export function SectionHead({ eyebrow, heading, intro }: { eyebrow: string; heading: ReactNode; intro: string }) {
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
      <p className="max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">{intro}</p>
    </Reveal>
  );
}
