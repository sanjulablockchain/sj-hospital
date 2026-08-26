import { RevealStagger } from "@/components/ui/RevealStagger";
import { SectionHeading } from "./SectionHeading";
import { benefits } from "../data/content";

/**
 * `#benefits`: four tiles, one per kind of benefit, each listing what is
 * actually written into the letter of appointment.
 *
 * The reference's `[data-tile]` hover (lift 6px, wash with the accent at 10%)
 * is the shared `sj-tint` utility, which tokenises the wash so the light theme
 * uses its own deeper accent rather than the dark theme's.
 */
export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHeading
        eyebrow="02 / What you get"
        heading={
          <>
            Benefits, stated
            <br />
            plainly
          </>
        }
        aside="No vague talk of a rewarding environment. These are the specific things in the letter of appointment."
      />

      <RevealStagger
        stepMs={80}
        className="mt-10.5 grid grid-cols-4 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {benefits.map((group) => (
          <div
            key={group.kind}
            className="sj-tint flex min-h-[300px] flex-col bg-[var(--home-bg)] px-6.5 pt-7.5 pb-7"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {group.kind}
            </span>
            <h3 className="font-display mt-3.5 text-[24px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {group.title}
            </h3>
            <ul className="mt-3.5 flex flex-col gap-2.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[14.5px] leading-[1.5] text-[var(--home-muted)]"
                >
                  <span aria-hidden className="text-[var(--home-accent)]">
                    &middot;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
