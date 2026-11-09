/**
 * The pure arithmetic behind `useHeroSlideshow`, kept out of the hook so
 * `node --test` can pin it without React.
 *
 * `mounted` is which photo layers should be in the DOM: the active slide,
 * every slide already shown (so stepping back never crossfades to a blank
 * layer), and the one after the active slide so its photo is fetching before
 * it is due. Nothing else mounts, so a phone on a slow network downloads one
 * hero photo at first paint rather than eight.
 *
 * `mountedAt` records the time (`now`, passed in so this stays pure) each
 * layer first mounted. A layer mounted later starts its Ken Burns animation
 * that far into the cycle, so a crossfade between two layers reads as one
 * continuous shot rather than a cut to a differently zoomed frame.
 */
export type SlideState = {
  active: number;
  /** Every index that has been active so far, in first-shown order. */
  shown: number[];
  mounted: number[];
  mountedAt: Record<number, number>;
};

function mountNext(active: number, shown: number[], count: number, mountedAt: Record<number, number>, now: number) {
  const next = (active + 1) % count;
  const mounted = shown.includes(next) ? shown : [...shown, next];
  const times = { ...mountedAt };
  for (const index of mounted) times[index] ??= now;
  return { mounted, mountedAt: times };
}

export function initialSlideState(count: number, now: number): SlideState {
  return { active: 0, shown: [0], ...mountNext(0, [0], count, {}, now) };
}

export function stepSlides(state: SlideState, count: number, to: number, now: number): SlideState {
  const active = ((to % count) + count) % count;
  const shown = state.shown.includes(active) ? state.shown : [...state.shown, active];
  return { active, shown, ...mountNext(active, shown, count, state.mountedAt, now) };
}
