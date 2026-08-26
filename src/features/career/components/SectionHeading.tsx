import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  /** Numbered kicker, e.g. "02 / What you get". */
  eyebrow: string;
  /** Pass a fragment with <br /> where the reference breaks the line. */
  heading: ReactNode;
  /** Muted paragraph pinned to the baseline on the right. */
  aside?: ReactNode;
  /** Rendered in the aside slot instead, for the openings count label. */
  asideClassName?: string;
};

/**
 * The heading row the reference repeats across `#benefits`, `#openings`,
 * `#students` and `#form`: eyebrow and oversized heading on the left, a short
 * muted line bottom-aligned on the right, wrapping to its own row on narrow
 * screens.
 */
export function SectionHeading({
  eyebrow,
  heading,
  aside,
  asideClassName = "max-w-[38ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]",
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-10">
        <div>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            {eyebrow}
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            {heading}
          </h2>
        </div>
        {aside ? <p className={asideClassName}>{aside}</p> : null}
      </div>
    </Reveal>
  );
}
