"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks how far the attached element's center is from the viewport's
 * vertical center and returns a clamped translateY offset scaled by
 * `speed`, for a subtle scroll-linked parallax effect. Disabled under
 * prefers-reduced-motion.
 */
export function useScrollParallax(speed = 0.15, maxOffset = 60) {
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
      const raw = distanceFromCenter * speed;
      setOffset(Math.max(-maxOffset, Math.min(maxOffset, raw)));
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
  }, [speed, maxOffset]);

  return { ref, offset };
}
