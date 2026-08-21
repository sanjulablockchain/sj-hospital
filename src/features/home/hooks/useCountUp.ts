"use client";

import { useEffect, useRef } from "react";

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

type CountUpOptions = {
  from?: number;
  durationMs?: number;
  /**
   * Turns the in-flight number into the text to display. Must be referentially
   * stable: a new identity restarts the count.
   */
  format: (value: number) => string;
};

/**
 * Counts the text of the returned element towards `to` the first time it
 * scrolls into view.
 *
 * The number is written straight to the DOM rather than held in state: an
 * animation is exactly the "external system" effects are for, and this avoids
 * a React render on every one of the ~85 frames.
 *
 * Callers render `to` as the element's children, so the real figure is what
 * gets server-rendered: crawlers and no-JS readers see the number, not a zero.
 * On mount the element is rewound to `from` (it is still off screen at that
 * point) and played forward when the observer fires. Under
 * prefers-reduced-motion nothing is touched and the final value simply stands.
 */
export function useCountUp(to: number, { from = 0, durationMs = 1400, format }: CountUpOptions) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || from === to) return;

    node.textContent = format(from);

    let frame = 0;
    let startedAt: number | null = null;

    const tick = (now: number) => {
      startedAt ??= now;
      const progress = Math.min(1, (now - startedAt) / durationMs);
      const value = from + (to - from) * easeOutCubic(progress);
      node.textContent = format(Math.round(value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(node);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, from, durationMs, format]);

  return ref;
}
