"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { DisclosureRow } from "./DisclosureRow";
import type { Warning, WarningLevel } from "../types";

type WarningSectionProps = {
  warnings: Warning[];
  levelTone: Record<WarningLevel, "hot" | "warm" | "cool">;
};

// Only the top level gets the solid accent badge. "cool" reads as ordinary
// text on a faint ground, so the four levels stay distinguishable without the
// list turning into a wall of colour.
const TONE_CLASS = {
  hot: "bg-[var(--home-accent)] text-[var(--home-on-accent)]",
  warm: "bg-[rgba(44,166,240,0.16)] text-[var(--home-accent-soft)]",
  cool: "bg-[var(--home-hairline)] text-[var(--home-muted)]",
} as const;

/**
 * `#warning`: one-open-at-a-time triage list. Every row starts closed
 * (`useState(-1)`), unlike the services directory: nothing here has been asked
 * for yet, and opening the most urgent row by default would put a heart attack
 * on screen before the reader has chosen to look.
 */
export function WarningSection({ warnings, levelTone }: WarningSectionProps) {
  const [open, setOpen] = useState(-1);
  const baseId = useId();

  return (
    <section id="warning" className="mx-auto max-w-[1440px] px-5 pt-18.5 sm:px-8 min-[641px]:pt-26 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              02 / When to come in
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              Wait, or walk
              <br />
              in tonight
            </h2>
          </div>
          <p className="max-w-[36ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
            Open a symptom for the honest answer. When in doubt, come in. We would rather see you and
            send you home.
          </p>
        </div>
      </Reveal>

      <RevealStagger
        stepMs={35}
        className="mt-10 border-t border-[var(--home-hairline-strong)]"
      >
        {warnings.map((warning, index) => (
          <DisclosureRow
            key={warning.symptom}
            idPrefix={`${baseId}-${index}`}
            isOpen={open === index}
            onToggle={() => setOpen((current) => (current === index ? -1 : index))}
            heading={
              <span className="flex flex-wrap items-baseline gap-x-4.5 gap-y-2">
                <span
                  className={`px-2.75 py-1.5 text-[12px] font-bold tracking-[0.14em] whitespace-nowrap uppercase ${
                    TONE_CLASS[levelTone[warning.level]]
                  }`}
                >
                  {warning.level}
                </span>
                <span className="font-display text-[clamp(19px,2.1vw,28px)] leading-[1.1] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
                  {warning.symptom}
                </span>
              </span>
            }
          >
            <p className="max-w-[76ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
              {warning.advice}
            </p>
          </DisclosureRow>
        ))}
      </RevealStagger>
    </section>
  );
}
