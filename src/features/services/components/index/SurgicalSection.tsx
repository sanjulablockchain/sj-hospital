import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { surgicalRows } from "@/features/services/data/indexContent";

/**
 * `#surgical`: a `--home-surface-2` band, the same charcoal plate the home
 * page's dark sections use by default, flipping to a plain white panel in
 * light mode. No fixed-dark literal here; only the fixed-dark hero is exempt
 * from the token rule.
 */
export function SurgicalSection() {
  return (
    <section id="surgical" className="bg-[var(--home-surface-2)]">
      <div className="mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-2 min-[900px]:items-center">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              03 / Department of surgery
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              Seven specialties,
              <br />
              one surgical standard
            </h2>
            <p
              className="mt-5.5 max-w-[46ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]"
              style={{ textWrap: "pretty" }}
            >
              Consultant-led lists across general, orthopaedic, ENT, urological, ophthalmic, neuro- and
              gastrointestinal surgery, each paired with its own anaesthesia service and a recovery nurse
              assigned from theatre to discharge.
            </p>
            <a
              href="#book"
              className="sj-invert mt-7 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
            >
              Request a surgical consult <span aria-hidden>&rarr;</span>
            </a>
          </Reveal>

          <RevealStagger className="flex flex-col gap-px bg-[var(--home-hairline)]">
            {surgicalRows.map((row) => (
              <div
                key={row.name}
                className="flex items-baseline justify-between gap-5 bg-[var(--home-surface-2)] px-7 py-5.5"
              >
                <span className="text-[17px] font-bold text-[var(--home-heading)]">{row.name}</span>
                <span className="text-right text-[14px] text-[var(--home-muted)]">{row.note}</span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
