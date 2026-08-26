import { RevealStagger } from "@/components/ui/RevealStagger";
import { SectionHead } from "./SectionHead";
import { HoverTile } from "./HoverTile";
import { stations } from "../data/content";

/**
 * `#programme`: the nine screening stations, three to a row, each hiding what
 * it catches until the card is hovered.
 *
 * Every clinical detail in `stations` is unverified copy. See
 * PLACEHOLDER_NOTICE in `data/content.ts`.
 */
export function ScreeningSection() {
  return (
    <section
      id="programme"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead
        eyebrow="02 / The screening"
        heading={
          <>
            Nine stations,
            <br />
            one morning
          </>
        }
        intro="Set up in a hall or two classrooms. Children move through in class groups, so no lesson loses more than half an hour."
      />
      <RevealStagger
        stepMs={60}
        className="mt-10.5 grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {stations.map((station) => (
          <HoverTile key={station.kicker} item={station} minHeight="292px" />
        ))}
      </RevealStagger>
    </section>
  );
}
