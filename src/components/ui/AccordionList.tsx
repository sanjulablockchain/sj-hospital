"use client";

import { useId, useState } from "react";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { useMeasuredHeight } from "@/hooks/useMeasuredHeight";

export type AccordionItem = { q: string; a: string };

type AccordionListProps = {
  items: AccordionItem[];
  /** Applied to the row container, so a caller can set its own hairline and spacing. */
  className?: string;
  /** Stagger between consecutive rows revealing. */
  stepMs?: number;
};

/**
 * One-open-at-a-time accordion rows, with no section wrapper or heading of its
 * own. Every panel starts closed (`useState(-1)`) since nothing has been
 * clicked yet, unlike `ServiceDirectory`'s rows, which open their first row by
 * default.
 *
 * Extracted from `FaqAccordion` so `/network`'s referrals section can put the
 * same rows inside a two-column split with a sticky heading. The row markup and
 * the `inert` collapsed panel below are not worth having two copies of, and the
 * height measurement itself lives one level down again in `useMeasuredHeight`,
 * which the media page's ground rules accordion also uses with its own markup.
 */
export function AccordionList({ items, className = "", stepMs = 45 }: AccordionListProps) {
  const [open, setOpen] = useState(-1);
  const baseId = useId();

  return (
    <RevealStagger stepMs={stepMs} className={className}>
      {items.map((item, index) => (
        <AccordionRow
          key={item.q}
          item={item}
          isOpen={open === index}
          onToggle={() => setOpen((current) => (current === index ? -1 : index))}
          idPrefix={`${baseId}-${index}`}
        />
      ))}
    </RevealStagger>
  );
}

type AccordionRowProps = {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  idPrefix: string;
};

function AccordionRow({ item, isOpen, onToggle, idPrefix }: AccordionRowProps) {
  // Measure the panel's natural content height instead of the reference's
  // fixed 320px cap: a longer answer must never be clipped. The hook attaches
  // to the inner content node, never the animated wrapper, so the measurement
  // is not itself clipped mid-transition. Shared with the media page's ground
  // rules accordion, which animates identically but is laid out differently.
  const { ref: contentRef, height: contentHeight } = useMeasuredHeight<HTMLDivElement>();

  const buttonId = `${idPrefix}-trigger`;
  const panelId = `${idPrefix}-panel`;

  return (
    <div className="bg-[var(--home-bg)]">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 px-1 py-6.5 text-left"
      >
        <span className="font-display text-[clamp(17px,1.7vw,22px)] leading-[1.25] font-semibold tracking-[-0.01em] text-[var(--home-heading)]">
          {item.q}
        </span>
        {/* Decorative only: the button's accessible name is the question
            text above, not this glyph. */}
        <span
          aria-hidden
          className={`flex h-8.5 w-8.5 shrink-0 items-center justify-center border border-[var(--home-hairline-strong)] text-[18px] leading-none font-bold text-[var(--home-heading)] transition-transform duration-[350ms] ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {/* `hidden` (display:none) can't be transitioned, so the animation runs
          on max-height + opacity instead; `inert` is what actually pulls the
          panel's links/text out of the tab order and accessibility tree
          while collapsed (a zero max-height alone doesn't stop keyboard
          focus from landing inside). `aria-hidden` stays alongside it for
          assistive tech that doesn't yet honour `inert`. */}
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
        <div ref={contentRef} className="px-1 pb-7">
          <p className="max-w-[62ch] text-[15px] leading-[1.65] text-[var(--home-muted)]">{item.a}</p>
        </div>
      </div>
    </div>
  );
}
