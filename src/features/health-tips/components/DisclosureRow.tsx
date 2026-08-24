"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Measuring in a plain `useEffect` lets the browser paint one frame at
// max-height 0 first, so a row that starts open would visibly grow open on
// load. `useLayoutEffect` runs before that paint, but only in the browser: on
// the server it does nothing except warn, so it is aliased to the ordinary
// effect during the framework's server render pass. Same reasoning as
// `ServiceDirectory` and `FaqAccordion`, which this row follows.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type DisclosureRowProps = {
  /** Everything left of the + glyph. A row can lead with a badge, so this is a node. */
  heading: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  idPrefix: string;
};

/**
 * One expanding row, shared by `#warning` and `#myths`. Both sections in the
 * reference used the identical markup with a fixed max-height; the height is
 * measured here instead, because several answers on this page are long enough
 * that a fixed cap would clip clinical advice.
 */
export function DisclosureRow({
  heading,
  children,
  isOpen,
  onToggle,
  idPrefix,
}: DisclosureRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // ResizeObserver watches the inner content node, which is never itself
  // clipped by the animated wrapper's max-height/overflow, so it keeps
  // reporting the true height through the whole open/close transition and
  // across a resize that reflows the text.
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
    <div className="border-b border-[var(--home-hairline-strong)]">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5.5 py-5.5 pr-1.5 text-left"
      >
        {heading}
        {/* Decorative: the button's accessible name is the heading text. */}
        <span
          aria-hidden
          className={`shrink-0 text-[23px] leading-none font-normal text-[var(--home-heading)] transition-transform duration-[350ms] ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>

      {/* `hidden` sets display:none, which cannot be transitioned, so the
          animation runs on max-height + opacity and `inert` is what actually
          pulls the collapsed panel out of the tab order and the accessibility
          tree. `aria-hidden` stays alongside it for assistive tech that does
          not yet honour `inert`. */}
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
          {children}
        </div>
      </div>
    </div>
  );
}
