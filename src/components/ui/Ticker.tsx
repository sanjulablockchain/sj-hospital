/**
 * Scrolling marquee strip. Two identical tracks sit side by side inside a
 * `w-max` flex row and the whole row is translated by -50% over the animation
 * (`animate-sj-tick`), so the second track has taken the first one's place
 * exactly when the loop restarts and the seam never shows.
 *
 * The duplicate track is `aria-hidden`, so a screen reader reads the phrases
 * once rather than twice.
 */
export function Ticker({ items }: { items: string[] }) {
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/14 bg-black/20 py-3.5">
      <div className="animate-sj-tick flex w-max">
        <TickerTrack items={items} />
        <TickerTrack items={items} hidden />
      </div>
    </div>
  );
}

function TickerTrack({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden}
      className="flex items-center gap-8 pr-8 text-[12.5px] font-bold tracking-[0.2em] whitespace-nowrap text-white/72 uppercase max-[640px]:text-[11px]"
    >
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-8">
          <span>{item}</span>
          <span className="text-[var(--home-accent)]">&#10022;</span>
        </span>
      ))}
    </span>
  );
}
