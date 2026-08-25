"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Measuring in a plain `useEffect` would let the browser paint one frame at
// max-height 0 before the effect runs, so a panel that starts open would
// visibly grow open on load. `useLayoutEffect` runs before that paint, but
// only in the browser; on the server it does nothing but warn, so it's
// aliased to the ordinary effect during the framework's server render pass.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Reports the natural height of the node the returned ref is attached to, and
 * keeps reporting it as the content reflows.
 *
 * For collapsible panels animated on `max-height`: a fixed cap clips a long
 * answer, and `height: auto` cannot be transitioned, so the panel needs its
 * real height as a number. Attach the ref to the *inner* content node, never
 * the animated wrapper, so the measurement is not itself clipped by the
 * wrapper's `overflow: hidden` mid-transition.
 *
 * Shared by `FaqAccordion` and the media page's ground rules accordion, which
 * animate identically but are laid out to different references.
 */
export function useMeasuredHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => setHeight(node.scrollHeight);
    measure();

    // ResizeObserver is what catches a reflow with no resize event behind it,
    // such as a webfont swapping in and reflowing the answer to a new line
    // count. Fall back to the resize event where it is missing.
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, height };
}
