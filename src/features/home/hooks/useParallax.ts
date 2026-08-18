"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-linked translateY offset for background-image parallax layers,
 * matching the reference's data-px factors (0.05-0.16). Disabled under
 * prefers-reduced-motion.
 */
export function useParallax(factor = 0.1, maxOffsetPx = 120) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    let ticking = false;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;
      const raw = distanceFromCenter * factor;
      setOffset(Math.max(-maxOffsetPx, Math.min(maxOffsetPx, raw)));
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [factor, maxOffsetPx]);

  return { ref, offset };
}
