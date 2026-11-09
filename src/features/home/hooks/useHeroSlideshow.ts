"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { initialSlideState, stepSlides, type SlideState } from "./slideState";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}

/**
 * Drives the home hero slideshow: the active index, which photo layers to
 * keep mounted (and when each mounted), and the auto advance timer.
 *
 * `rotating` is derived, never set: the slides move on their own only when
 * the reader has not asked for reduced motion, the tab is visible, and the
 * pointer and focus are outside the hero. The interval effect follows that
 * one boolean (plus `cycle`, which a manual step bumps so the next auto
 * advance is a full interval away, and a tap is never followed by an
 * immediate advance). Reduced motion and tab
 * visibility are read through `useSyncExternalStore`, so nothing here sets
 * state inside an effect; on the server both read as "rotating", which is
 * also the first client render, so hydration agrees.
 *
 * There is no stop button: the owner asked for it to go (2026-10-29), so
 * hover and focus are the only holds on the rotation.
 */
export function useHeroSlideshow(count: number, intervalMs: number) {
  const [state, setState] = useState<SlideState>(() => initialSlideState(count, Date.now()));
  const [held, setHeld] = useState(false);
  const [cycle, setCycle] = useState(0);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
  const visible = useSyncExternalStore(subscribeVisibility, () => !document.hidden, () => true);

  const rotating = !reduced && visible && !held;

  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => {
      setState((s) => stepSlides(s, count, s.active + 1, Date.now()));
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [rotating, cycle, count, intervalMs]);

  const go = useCallback(
    (to: number) => {
      setState((s) => stepSlides(s, count, to, Date.now()));
      setCycle((c) => c + 1);
    },
    [count]
  );

  return {
    active: state.active,
    mounted: state.mounted,
    mountedAt: state.mountedAt,
    rotating,
    go,
    next: () => go(state.active + 1),
    prev: () => go(state.active - 1),
    pause: () => setHeld(true),
    resume: () => setHeld(false),
  };
}
