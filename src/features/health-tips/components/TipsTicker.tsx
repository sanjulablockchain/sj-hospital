/**
 * The marquee under the hero fact strip. Two identical tracks slide together
 * by exactly half their combined width (`animate-sj-tick`), so the second
 * arrives where the first began and the loop has no seam. The duplicate is
 * `aria-hidden`, so a screen reader hears the five lines once.
 *
 * The keyframe is already disabled under `prefers-reduced-motion` in
 * globals.css, which leaves the first track parked and readable.
 *
 * `tickerLines` arrives as a prop, already localized, rather than being
 * imported here.
 */
function TickerTrack({ lines, hidden }: { lines: readonly string[]; hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden}
      className="flex items-center gap-8 pr-8 text-[11px] font-bold tracking-[0.2em] whitespace-nowrap text-white/72 uppercase min-[641px]:text-[12.5px]"
    >
      {lines.map((line) => (
        <span key={line} className="flex items-center gap-8">
          <span>{line}</span>
          <span className="text-[var(--home-accent)]" aria-hidden>
            &#10022;
          </span>
        </span>
      ))}
    </span>
  );
}

export function TipsTicker({ tickerLines }: { tickerLines: readonly string[] }) {
  return (
    <div className="relative z-[5] overflow-hidden border-y border-white/14 bg-[#1A1540]/50 py-3.25">
      <div className="animate-sj-tick flex w-max">
        <TickerTrack lines={tickerLines} />
        <TickerTrack lines={tickerLines} hidden />
      </div>
    </div>
  );
}
