"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { Faq } from "@/features/services/types";

// Measuring in a plain `useEffect` would let the browser paint one frame at
// max-height 0 before the effect runs, so a panel that starts open would
// visibly grow open on load. `useLayoutEffect` runs before that paint, but
// only in the browser; on the server it does nothing but warn, so it's
// aliased to the ordinary effect during the framework's server render pass.
// See `ServiceDirectory.tsx`, which this accordion mirrors.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * `#faq`: one-open-at-a-time accordion over a service's FAQ entries. Unlike
 * `ServiceDirectory`'s directory rows (which open the first row by default),
 * every panel here starts closed (`useState<number>(-1)`) since nothing on
 * this page has been clicked yet.
 */
export function FaqAccordion({ faq }: { faq: Faq[] }) {
  const [open, setOpen] = useState(-1);
  const baseId = useId();

  return (
    <section id="faq" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <h2 className="font-display text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
          Asked before you ask
        </h2>
      </Reveal>

      <RevealStagger stepMs={45} className="mt-10 flex flex-col gap-px bg-[var(--home-hairline)]">
        {faq.map((item, index) => (
          <FaqRow
            key={item.q}
            item={item}
            isOpen={open === index}
            onToggle={() => setOpen((current) => (current === index ? -1 : index))}
            idPrefix={`${baseId}-${index}`}
          />
        ))}
      </RevealStagger>
    </section>
  );
}

type FaqRowProps = {
  item: Faq;
  isOpen: boolean;
  onToggle: () => void;
  idPrefix: string;
};

function FaqRow({ item, isOpen, onToggle, idPrefix }: FaqRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Measure the panel's natural content height instead of the reference's
  // fixed 320px cap: a longer answer must never be clipped. ResizeObserver
  // watches the inner content node (never itself clipped by the animated
  // wrapper's max-height/overflow), so it keeps reporting the true height
  // through the whole open/close transition.
  useIsomorphicLayoutEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const measure = () => setContentHeight(node.scrollHeight);
    measure();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

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
