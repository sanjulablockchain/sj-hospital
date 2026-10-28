"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { initialSlideState, stepSlides, type SlideState } from "./slideState";

/**
 * Drives the home hero slideshow: the active index, which photo layers to
 * keep mounted (and when each mounted), and the auto advance timer.
 *
 * The timer never starts under `prefers-reduced-motion` (the first slide
 * holds, the controls still work), pauses while the pointer or focus is
 * inside the hero (`pause` / `resume`, called by the component) and while
 * the tab is hidden, and restarts from a full interval after any manual
 * step so a tap is never followed by an immediate auto advance.
 */
export function useHeroSlideshow(count: number, intervalMs: number) {
  const [state, setState] = useState<SlideState>(() => initialSlideState(count, Date.now()));
  const paused = useRef(false);
  const timer = useRef<number | null>(null);
  const reduced = useRef(false);

  const stop = useCallback(() => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
  }, []);

  const start = useCallback(() => {
    stop();
    if (reduced.current || paused.current || document.hidden) return;
    timer.current = window.setInterval(() => {
      setState((s) => stepSlides(s, count, s.active + 1, Date.now()));
    }, intervalMs);
  }, [count, intervalMs, stop]);

  useEffect(() => {
    reduced.current =
      typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    start();
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [start, stop]);

  const go = useCallback(
    (to: number) => {
      setState((s) => stepSlides(s, count, to, Date.now()));
      start();
    },
    [count, start]
  );

  return {
    active: state.active,
    mounted: state.mounted,
    mountedAt: state.mountedAt,
    go,
    next: () => go(state.active + 1),
    prev: () => go(state.active - 1),
    pause: () => {
      paused.current = true;
      stop();
    },
    resume: () => {
      paused.current = false;
      start();
    },
  };
}
