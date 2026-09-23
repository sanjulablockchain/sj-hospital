"use client";

import { useId, useState } from "react";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { FaqItem } from "../data/faq";

/**
 * One-open-at-a-time rows in the reference's card style: rounded, hairline
 * bordered, the open row washed lavender with a brand border and its "+"
 * rotated to a cross; a closed row takes the brand border on hover. The rows
 * reveal one after another as the band scrolls in. The first row starts open
 * (`faq: 0` in the reference). Every answer is in the served HTML (`hidden`
 * when closed) so the copy is indexable and readable without JavaScript.
 */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <RevealStagger stepMs={55} className="flex flex-col gap-2.5">
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div
            key={item.q}
            className={`sj-card-lift rounded-[12px] border ${
              isOpen
                ? "border-[var(--home-brand-text)] bg-[var(--home-surface)]"
                : "border-[var(--home-hairline)] bg-[var(--home-bg)] hover:border-[var(--home-brand-text)]"
            }`}
          >
            <button
              type="button"
              id={`${baseId}-q-${i}`}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-a-${i}`}
              onClick={() => setOpen((current) => (current === i ? -1 : i))}
              className="flex w-full items-center justify-between gap-4 px-6 py-5.5 text-left text-[17px] leading-[1.35] font-extrabold text-[var(--home-heading)]"
            >
              <span>{item.q}</span>
              <span
                aria-hidden
                className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[22px] leading-none font-semibold transition-[transform,background-color] duration-[250ms] ${
                  isOpen
                    ? "rotate-45 bg-[var(--home-brand)] text-white"
                    : "bg-[var(--home-surface-2)] text-[var(--home-brand-text)]"
                }`}
              >
                +
              </span>
            </button>
            <div id={`${baseId}-a-${i}`} role="region" aria-labelledby={`${baseId}-q-${i}`} hidden={!isOpen}>
              <p className="animate-sj-fade-in m-0 px-6 pb-6 text-[15.5px] leading-[1.7] text-[var(--home-muted)]">{item.a}</p>
            </div>
          </div>
        );
      })}
    </RevealStagger>
  );
}
