import { SectionHead } from "./SectionHead";
import { LocationMap } from "./LocationMapLazy";
import { jumpCards, mapIntro } from "../data/content";

/**
 * `#map`: `SectionHead` plus the lazy-loaded Leaflet map in a hairline frame.
 * `LocationMap` themes its own marker and popup at mount (see LocationMap.tsx)
 * and the tile layer is themed globally in globals.css, so this component has
 * nothing theme-specific to do beyond the frame.
 *
 * `heading` reuses `jumpCards[2].label`. `intro` is `mapIntro`, distinct from
 * `jumpCards[2].note`.
 */
export function MapSection() {
  return (
    <section id="map" className="mx-auto max-w-[1440px] px-5 pt-26 pb-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <SectionHead eyebrow="03 / Find us" heading={jumpCards[2].label} intro={mapIntro} />

      <div className="mt-10.5 overflow-hidden border border-[var(--home-hairline)]">
        <LocationMap />
      </div>
    </section>
  );
}
