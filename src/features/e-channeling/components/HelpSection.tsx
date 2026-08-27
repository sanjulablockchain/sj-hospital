import { Reveal } from "@/components/ui/Reveal";
import { helpRail } from "../data/content";

/**
 * `#help`: the closing accent rail, ported out of DoctorDirectory.tsx where it
 * used to sit as static markup inside the client component that holds the
 * directory's filter state. `helpRail`'s heading and body are that old rail's
 * own copy, verbatim.
 *
 * No numbered eyebrow: this page has one job (`#directory`), and dressing a
 * two-line phone/email prompt as a second numbered section would overstate
 * it.
 */
export function HelpSection() {
  return (
    <section id="help" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-11 max-[640px]:py-10">
      <Reveal className="flex flex-col items-center gap-5 bg-[var(--home-accent)] p-8 text-center text-[var(--home-on-accent)] sm:flex-row sm:justify-between sm:p-11 sm:text-left">
        <div>
          <p className="font-display text-[22px] font-bold tracking-[-0.02em] uppercase">
            {helpRail.heading}
          </p>
          <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed opacity-85">{helpRail.body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-center gap-3">
          <a
            href={helpRail.phoneHref}
            className="sj-invert inline-flex h-12 items-center bg-[var(--home-on-accent)] px-6 text-sm font-bold whitespace-nowrap text-[var(--home-accent)]"
          >
            Call {helpRail.phone}
          </a>
          <a
            href={`mailto:${helpRail.email}`}
            className="inline-flex h-12 items-center border border-[var(--home-on-accent)]/40 px-6 text-sm font-bold whitespace-nowrap transition-colors hover:bg-[var(--home-on-accent)]/10"
          >
            Email us
          </a>
        </div>
      </Reveal>
    </section>
  );
}
