import { RevealStagger } from "@/components/ui/RevealStagger";
import { jobOpenings } from "../data/careers";

export function CareersSection() {
  return (
    <section id="career" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <div className="grid gap-15 min-[900px]:grid-cols-[0.8fr_1.2fr] min-[900px]:items-start">
        <div className="min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            12 / Careers
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Work where
            <br />
            the standard
            <br />
            is the point
          </h2>
          <p className="mt-5.5 max-w-[34ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]">
            Clinicians and staff trained to US protocol, supported by a group that invests in them.
          </p>
          {/* Was a bare mailto. /careers now carries the application form, the
              full role detail and the recruitment-fraud warning, so the teaser
              sends people there instead of straight into their mail client. */}
          <a href="/careers#form" className="sj-invert mt-6 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-on-accent)]">
            Send your CV <span aria-hidden>&rarr;</span>
          </a>
        </div>
        <RevealStagger className="border-t border-[var(--home-hairline)]">
          {jobOpenings.map((job) => (
            <a
              key={job.title}
              href="/careers#openings"
              className="sj-row-fill grid grid-cols-1 gap-2 border-b border-[var(--home-hairline)] px-1 py-6 text-inherit min-[640px]:grid-cols-[1.4fr_0.8fr_0.7fr_auto] min-[640px]:items-center min-[640px]:gap-5"
            >
              <span className="font-display text-[clamp(20px,2vw,29px)] leading-[1.08] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
                {job.title}
              </span>
              <span className="text-[14.5px] text-[var(--home-muted)]">{job.department}</span>
              <span className="text-[14.5px] text-[var(--home-muted)]">{job.type}</span>
              <span className="text-[20px] opacity-60 min-[640px]:justify-self-end" aria-hidden>
                &rarr;
              </span>
            </a>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
