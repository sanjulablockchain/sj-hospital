const tickerItems = [
  "Emergency open 24/7",
  "Surgical theatres to US protocol",
  "Cleaned every two hours",
  "Reports same day, checked twice",
  "Rooms from 10,000 LKR",
];

function TickerTrack({ hidden }: { hidden?: boolean }) {
  return (
    <span
      aria-hidden={hidden}
      className="flex items-center gap-8 pr-8 text-[12.5px] font-bold tracking-[0.2em] whitespace-nowrap text-white/72 uppercase"
    >
      {tickerItems.map((item, index) => (
        <span key={index} className="flex items-center gap-8">
          <span>{item}</span>
          <span className="text-[var(--home-accent)]">&#10022;</span>
        </span>
      ))}
    </span>
  );
}

export function StatTicker() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/14 bg-black/20 py-3.5">
      <div className="animate-sj-tick flex w-max">
        <TickerTrack />
        <TickerTrack hidden />
      </div>
    </div>
  );
}
