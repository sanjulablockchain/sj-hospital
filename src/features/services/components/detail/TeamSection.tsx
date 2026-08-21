import { RevealStagger } from "@/components/ui/RevealStagger";
import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/features/services/types";

/**
 * `#team`: who staffs this service, by role only. `content.test.ts` enforces
 * that no `team` entry names an individual clinician: these rows describe a
 * function on the ward, not a person.
 */
export function TeamSection({ service }: { service: Service }) {
  return (
    <section id="team" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <h2 className="font-display text-[clamp(34px,3.8vw,54px)] leading-[1.02] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
          The team on this service
        </h2>
      </Reveal>

      <RevealStagger stepMs={60} className="mt-10 flex flex-col gap-px bg-[var(--home-hairline)]">
        {service.team.map((member) => (
          <div key={member.role} className="bg-[var(--home-bg)] px-1 py-6.5">
            <h3 className="font-display text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              {member.role}
            </h3>
            <p className="mt-2 max-w-[62ch] text-[14.5px] leading-[1.6] text-[var(--home-muted)]">{member.note}</p>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}
