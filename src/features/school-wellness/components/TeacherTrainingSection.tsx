import { RevealStagger } from "@/components/ui/RevealStagger";
import { SectionHead } from "./SectionHead";
import { HoverTile } from "./HoverTile";
import type { SchoolWellnessContent } from "../data/getContent";

/**
 * `#teachers`: the four staff room sessions, four to a row, each hiding who it
 * is for until the card is hovered.
 *
 * Only the half day first aid course is backed by the repo. The other three
 * sessions, their durations and their audiences are unverified copy. See
 * PLACEHOLDER_NOTICE in `data/content.ts`.
 */
export function TeacherTrainingSection({ content }: { content: SchoolWellnessContent }) {
  const { sectionEyebrows, teacherHeading, teacherIntro, training } = content;
  return (
    <section
      id="teachers"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead
        eyebrow={sectionEyebrows.teachers}
        heading={
          <>
            {teacherHeading.line1}
            <br />
            {teacherHeading.line2}
            <br />
            {teacherHeading.line3}
          </>
        }
        intro={teacherIntro}
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
