"use client";

import type { ReactNode } from "react";
import { useScrollParallax } from "@/hooks/useScrollParallax";

type ParallaxLayerProps = {
  children: ReactNode;
  className?: string;
  factor?: number;
  maxOffsetPx?: number;
};

/**
 * Scroll-drifts whatever is inside it. Exists so a Server Component can hold a
 * parallax layer without turning into a Client Component itself — only this
 * leaf ships to the browser.
 */
export function ParallaxLayer({
  children,
  className = "",
  factor = 0.08,
  maxOffsetPx = 44,
}: ParallaxLayerProps) {
  const { ref, offset } = useScrollParallax(factor, maxOffsetPx);

  return (
    <div ref={ref} style={{ transform: `translateY(${offset}px)` }} className={className}>
      {children}
    </div>
  );
}
