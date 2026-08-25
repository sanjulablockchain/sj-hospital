"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { useMeasuredHeight } from "@/hooks/useMeasuredHeight";
import type { GroundRule } from "../types";
import { rules } from "../data/content";

/**
 * `#usage`: the eight filming, naming and patient privacy rules, one open at a
 * time.
 *
 * Laid out to this page's reference rather than reusing `FaqAccordion`: the
 * rules run at a larger type scale, the glyph is bare rather than boxed, and
 * the answers are long enough to need a 76ch measure. What the two share is the
 * part worth sharing, `useMeasuredHeight`, which is the awkward bit: a panel
 * animated on `max-height` needs a real pixel height, and the reference's fixed
 * 320px cap would clip half of these answers.
 */
export function RulesSection() {
  const [open, setOpen] = useState(-1);
  const baseId = useId();

  return (
    <section id="usage" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18.5">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          06 / Ground rules
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Filming, names
          <br />
          and patient
          <br />
          privacy
        </h2>
      </Reveal>

      <RevealStagger stepMs={45} className="mt-10 border-t border-[var(--home-hairline-strong)]">
        {rules.map((rule, index) => (
          <RuleRow
            key={rule.q}
            rule={rule}
            isOpen={open === index}
            onToggle={() => setOpen((current) => (current === index ? -1 : index))}
            idPrefix={`${baseId}-${index}`}
          />
        ))}
      </RevealStagger>
    </section>
  );
}

type RuleRowProps = {
  rule: GroundRule;
  isOpen: boolean;
  onToggle: () => void;
  idPrefix: string;
};

function RuleRow({ rule, isOpen, onToggle, idPrefix }: RuleRowProps) {
  const { ref: contentRef, height: contentHeight } = useMeasuredHeight<HTMLDivElement>();

  const buttonId = `${idPrefix}-trigger`;
  const panelId = `${idPrefix}-panel`;

  return (
    <div className="border-b border-[var(--home-hairline-strong)]">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5.5 py-5.5 pr-1.5 text-left"
      >
        <span className="font-display text-[clamp(19px,2vw,27px)] leading-[1.1] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
          {rule.q}
        </span>
        {/* Decorative only: the button's accessible name is the question text
            above, not this glyph. Bare rather than boxed, per this page's
            reference. */}
        <span
          aria-hidden
          className={`shrink-0 text-[23px] leading-none text-[var(--home-heading)] transition-transform duration-[350ms] ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {/* `hidden` (display:none) can't be transitioned, so the animation runs
          on max-height + opacity instead; `inert` is what actually pulls the
          panel's text out of the tab order and accessibility tree while
          collapsed (a zero max-height alone doesn't stop keyboard focus from
          landing inside). `aria-hidden` stays alongside it for assistive tech
          that doesn't yet honour `inert`. */}
      <div
        id={panelId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
          transitionProperty: "max-height, opacity",
          transitionDuration: "550ms, 400ms",
          transitionTimingFunction: "cubic-bezier(0.2,0.8,0.2,1), ease",
        }}
        className={`overflow-hidden ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <div ref={contentRef} className="pb-6">
          <p className="max-w-[76ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            {rule.a}
          </p>
        </div>
      </div>
    </div>
  );
}
