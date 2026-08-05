import { LocationMap } from "./LocationMapLazy";

export function MapSection() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-ink/10 shadow-[0_24px_60px_-44px_rgba(30,27,46,0.5)]">
      <LocationMap />
    </div>
  );
}
