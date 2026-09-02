import { RevealStagger } from "@/components/ui/RevealStagger";
import { SectionHead } from "./SectionHead";
import { HoverTile } from "./HoverTile";
import type { SchoolWellnessContent } from "../data/getContent";

/**
 * `#programme`: the nine screening stations, three to a row, each hiding what
 * it catches until the card is hovered.
 *
 * Every clinical detail in `stations` is unverified copy. See
 * PLACEHOLDER_NOTICE in `data/content.ts`.
 */
export function ScreeningSection({ content }: { content: SchoolWellnessContent }) {
  const { screeningHeading, screeningIntro, sectionEyebrows, stations } = content;
  return (
    <section
      id="programme"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead
        eyebrow={sectionEyebrows.programme}
        heading={
          <>
            {screeningHeading.line1}
            <br />
            {screeningHeading.line2}
          </>
        }
        intro={screeningIntro}
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
