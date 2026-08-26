import { RevealStagger } from "@/components/ui/RevealStagger";
import { SectionHeading } from "./SectionHeading";
import { students } from "../data/content";

/**
 * `#students`: three routes in for people who have not qualified yet, or have
 * just qualified.
 *
 * The `who` line at the foot of each tile fades up on hover, which is the
 * shared `sj-hover-reveal` helper inside `sj-tint`. That helper keeps the line
 * visible on touch devices, where the reference simply hides it forever.
 */
export function StudentsSection() {
  return (
    <section
      id="students"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHeading
        eyebrow="05 / Starting out"
        heading={
          <>
            Students and
            <br />
            new graduates
          </>
        }
        aside="The group supports students entering medicine, and we take trainees directly at the hospital."
      />

      <RevealStagger
        stepMs={80}
        className="mt-10.5 grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {students.map((route) => (
          <div
            key={route.title}
            className="sj-tint flex min-h-[268px] flex-col bg-[var(--home-bg)] px-6.5 pt-7.5 pb-7"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {route.kind}
            </span>
            <h3 className="font-display mt-3.5 text-[24px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {route.title}
            </h3>
            <p className="mt-2.5 text-[14.5px] leading-[1.58] text-[var(--home-muted)]">
              {route.body}
            </p>
            <span className="sj-hover-reveal mt-auto pt-4.5 text-[13px] font-bold text-[var(--home-accent-soft)]">
              {route.who}
            </span>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
