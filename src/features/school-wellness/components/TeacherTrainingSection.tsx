import { RevealStagger } from "@/components/ui/RevealStagger";
import { SectionHead } from "./SectionHead";
import { HoverTile } from "./HoverTile";
import { training } from "../data/content";

/**
 * `#teachers`: the four staff room sessions, four to a row, each hiding who it
 * is for until the card is hovered.
 *
 * Only the half day first aid course is backed by the repo. The other three
 * sessions, their durations and their audiences are unverified copy. See
 * PLACEHOLDER_NOTICE in `data/content.ts`.
 */
export function TeacherTrainingSection() {
  return (
    <section
      id="teachers"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead
        eyebrow="04 / For the staff room"
        heading={
          <>
            Train the adults
            <br />
            who are there
            <br />
            first
          </>
        }
        intro="When a child collapses on a Tuesday afternoon, the person kneeling beside them is a teacher. These sessions run free of charge for schools on the programme."
      />
      <RevealStagger
        stepMs={60}
        className="mt-10.5 grid grid-cols-4 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {training.map((session) => (
          <HoverTile key={session.title} item={session} minHeight="276px" />
        ))}
      </RevealStagger>
    </section>
  );
}
