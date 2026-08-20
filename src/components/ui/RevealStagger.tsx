"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  /** Gap between consecutive children. */
  stepMs?: number;
};

/**
 * Reveals its direct children one after another as the group scrolls into view.
 *
 * Children are styled from globals.css through the `data-stagger-*` attributes
 * rather than being wrapped in extra elements, so the grid and flex layouts
 * that rely on these being direct children are left intact.
 *
 * The attributes are set on the node directly instead of through state: this is
 * a CSS class toggle, not data React needs to render, and it keeps the reveal
 * out of the render cycle entirely.
 *
 * Nothing is hidden until this mounts and sets `data-stagger-armed`, so with JS
 * off — or under prefers-reduced-motion — every child just renders.
 */
export function RevealStagger({ children, className = "", stepMs = 70 }: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    node.dataset.staggerArmed = "";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.dataset.staggerRevealed = "";
        observer.unobserve(node);
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ "--sj-stagger-step": `${stepMs}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}
