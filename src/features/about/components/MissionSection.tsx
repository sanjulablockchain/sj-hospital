import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";
import { jumpCards, mission, missionIntro, vision } from "../data/content";

/**
 * `#mission`: the mission and vision ported verbatim from the deleted
 * MissionVision.tsx, side by side above 900px and stacked below it.
 *
 * `intro` is `missionIntro`, a clause lifted from `mission.body`, not the
 * jump card's `note` restated.
 */
export function MissionSection() {
  return (
    <section
      id="mission"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead eyebrow="03 / What we aim at" heading={jumpCards[2].label} intro={missionIntro} />

      <div className="mt-10.5 grid gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-2">
        <Reveal>
          <div className="h-full bg-[var(--home-accent)] px-8 py-9 text-[var(--home-on-accent)]">
            <h3 className="font-display text-[22px] font-extrabold tracking-[-0.02em]">
              {mission.title}
            </h3>
            <p className="mt-3.5 text-[15.5px] leading-[1.62] opacity-88">{mission.body}</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="h-full bg-[var(--home-bg)] px-8 py-9">
            <h3 className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-[var(--home-heading)]">
              {vision.title}
            </h3>
            <p className="mt-3.5 text-[15.5px] leading-[1.62] text-[var(--home-muted)]">{vision.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
