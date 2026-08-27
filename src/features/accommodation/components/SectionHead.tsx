import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The numbered eyebrow and heading on the left, the standfirst on the right,
 * both sitting on the same baseline. `#rooms`, `#specialties` and `#book` use
 * it identically; the reference repeats the same block for each.
 *
 * `heading` is a node rather than a string because both callers hard-break
 * their heading, and where the line falls is a typographic decision that
 * belongs beside the markup rather than in `data/content.ts`.
 */
export function SectionHead({ eyebrow, heading, intro }: { eyebrow: string; heading: ReactNode; intro: string }) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-10">
      <div>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          {eyebrow}
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          {heading}
        </h2>
      </div>
      <p className="max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">{intro}</p>
    </Reveal>
  );
}
