"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { DisclosureRow } from "./DisclosureRow";
import type { Myth } from "../types";

/**
 * `#myths`: the same one-open-at-a-time row as `#warning`, over the questions
 * our clinicians answer most often.
 */
export function MythsSection({ myths }: { myths: Myth[] }) {
  const [open, setOpen] = useState(-1);
  const baseId = useId();

  return (
    <section id="myths" className="mx-auto max-w-[1440px] px-5 pt-18.5 sm:px-8 min-[641px]:pt-26 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          05 / Straight answers
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Things we get
          <br />
          asked, and the
          <br />
          honest answer
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={35}
        className="mt-10 border-t border-[var(--home-hairline-strong)]"
      >
        {myths.map((myth, index) => (
          <DisclosureRow
            key={myth.q}
            idPrefix={`${baseId}-${index}`}
            isOpen={open === index}
            onToggle={() => setOpen((current) => (current === index ? -1 : index))}
            heading={
              <span className="font-display text-[clamp(19px,2vw,27px)] leading-[1.1] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
                {myth.q}
              </span>
            }
          >
            <p className="max-w-[76ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
              {myth.a}
            </p>
          </DisclosureRow>
        ))}
      </RevealStagger>
    </section>
  );
}
