import type { HoverTileItem } from "../types";

/**
 * The reference's `[data-tile]` card, used by both `#programme` (nine stations,
 * oversized numerals) and `#teachers` (four sessions, a duration label).
 *
 * Three things happen together on hover, per the reference's rules: the tile
 * lifts 6px, its background warms to a 10% accent tint, and the `more` line
 * fades up from `translateY(8px)`. That last line is the point of the card, so
 * it is a `group-hover` reveal rather than anything conditional in JS, and the
 * tile stays a Server Component.
 *
 * `min-h` differs between the two grids in the reference (292px for stations,
 * 276px for training) so the caller passes it. It exists so the hidden line,
 * pinned to the bottom by `mt-auto`, does not make short cards jump height
 * relative to their neighbours.
 *
 * `motion-reduce:` cancels the lift and the slide but keeps the opacity change,
 * so the caption still appears for someone who has asked for less motion.
 */
export function HoverTile({ item, minHeight }: { item: HoverTileItem; minHeight: string }) {
  return (
    <div
      className="group flex flex-col bg-[var(--home-bg)] px-6.5 pt-7.5 pb-7 transition-[background-color,transform] duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1.5 hover:bg-[var(--home-accent-tint)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{ minHeight }}
    >
      {item.numeral ? (
        <span className="font-display text-[38px] leading-none font-extrabold tracking-[-0.04em] text-[var(--home-accent)]">
          {item.kicker}
        </span>
      ) : (
        <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
          {item.kicker}
        </span>
      )}
      <span className="font-display mt-3.5 text-[24px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
        {item.title}
      </span>
      <span className="mt-2.5 text-[14.5px] leading-[1.58] text-[var(--home-muted)]">
        {item.body}
      </span>
      <span
        className={`mt-auto translate-y-2 pt-4.5 text-[13px] font-bold text-[var(--home-accent-soft)] opacity-0 transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none ${
          item.numeral ? "tracking-[0.14em] uppercase" : ""
        }`}
      >
        {item.more}
      </span>
    </div>
  );
}
