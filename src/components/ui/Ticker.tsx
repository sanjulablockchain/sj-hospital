/**
 * The horizontal marquee that sits under a hero.
 *
 * Two identical tracks sit side by side inside a `w-max` flex row, and
 * `animate-sj-tick` translates that row by exactly -50%, so the moment the
 * first track scrolls out the second has taken its place and the loop is
 * seamless. The duplicate is `aria-hidden`, so a screen reader hears the list
 * once.
 *
 * Fixed-dark on purpose: this band always sits over the hero photograph, where
 * a token-driven light-theme foreground would disappear. Same exemption the
 * hero heading and the photo cards take.
 */
export function Ticker({ items }: { items: readonly string[] }) {
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/14 bg-black/20 py-3.5">
      <div className="animate-sj-tick flex w-max">
        <TickerTrack items={items} />
        <TickerTrack items={items} hidden />
      </div>
    </div>
  );
}

function TickerTrack({ items, hidden }: { items: readonly string[]; hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden}
      // Drops to 11px under 640px, per the reference's own `[data-r="tick"]` rule:
      // at 12.5px with this tracking the phrases crowd on a phone.
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
