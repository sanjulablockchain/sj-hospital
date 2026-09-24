"use client";

import { useId, useState } from "react";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { useMeasuredHeight } from "@/hooks/useMeasuredHeight";
import type { FaqItem } from "../data/faq";

/**
 * One-open-at-a-time rows in the reference's card style: rounded, hairline
 * bordered, the open row washed lavender with a brand border and its "+"
 * rotated to a cross; a closed row takes the brand border on hover. The rows
 * reveal one after another as the band scrolls in. The first row starts open
 * (`faq: 0` in the reference).
 *
 * The answer unfolds on `max-height` + opacity rather than snapping open with
 * `hidden`, the same pattern `AccordionList` and the media page's ground
 * rules accordion already use site-wide: a plain `hidden` toggle changes
 * display instantly, which is what made the band below jump down the moment
 * a row opened. `useMeasuredHeight` reads the answer's real height so the
 * transition animates to it rather than to a guessed cap, and every answer is
 * still in the served HTML (never removed, only collapsed), so the copy stays
 * indexable and readable without JavaScript, just no longer pre-expanded.
 */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <RevealStagger stepMs={55} className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <FaqRow key={item.q} item={item} isOpen={i === open} onToggle={() => setOpen((current) => (current === i ? -1 : i))} idPrefix={`${baseId}-${i}`} />
      ))}
    </RevealStagger>
  );
}

function FaqRow({
  item,
  isOpen,
  onToggle,
  idPrefix,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  idPrefix: string;
}) {
  // Attached to the inner content node, never the animated wrapper, so the
  // measurement is not itself clipped by the wrapper's overflow: hidden
  // mid-transition.
  const { ref: contentRef, height: contentHeight } = useMeasuredHeight<HTMLDivElement>();
  const buttonId = `${idPrefix}-q`;
  const panelId = `${idPrefix}-a`;

  return (
    <div
      className={`sj-card-lift rounded-[12px] border ${
        isOpen
          ? "border-[var(--home-brand-text)] bg-[var(--home-surface)]"
          : "border-[var(--home-hairline)] bg-[var(--home-bg)] hover:border-[var(--home-brand-text)]"
      }`}
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5.5 text-left text-[17px] leading-[1.35] font-extrabold text-[var(--home-heading)]"
      >
        <span>{item.q}</span>
        <span
          aria-hidden
          className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[22px] leading-none font-semibold transition-[transform,background-color] duration-[250ms] ${
            isOpen ? "rotate-45 bg-[var(--home-brand)] text-white" : "bg-[var(--home-surface-2)] text-[var(--home-brand-text)]"
          }`}
        >
          +
        </span>
      </button>

      {/* `inert` pulls the collapsed answer out of the tab order and
          accessibility tree; a zero max-height alone would not stop keyboard
          focus landing inside it. `aria-hidden` stays alongside for
          assistive tech that does not yet honour `inert`. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        inert={!isOpen}
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0px",
          transitionProperty: "max-height, opacity",
          transitionDuration: "550ms, 400ms",
          transitionTimingFunction: "cubic-bezier(0.2,0.8,0.2,1), ease",
        }}
        className={`overflow-hidden motion-reduce:transition-none ${isOpen ? "opacity-100" : "opacity-0"}`}
      >
        <div ref={contentRef}>
          <p className="m-0 px-6 pb-6 text-[15.5px] leading-[1.7] text-[var(--home-muted)]">{item.a}</p>
        </div>
      </div>
    </div>
  );
}
