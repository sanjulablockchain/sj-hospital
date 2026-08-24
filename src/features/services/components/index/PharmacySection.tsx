import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";

type PharmacyFact = { name: string; note: string };

const pharmacyFacts: PharmacyFact[] = [
  { name: "Hours", note: "Open 24 hours" },
  { name: "Stock", note: "Authorized medicine only" },
  { name: "Dispatch check", note: "Confirmed by a pharmacist first" },
  { name: "Delivery", note: "Across Negombo" },
  { name: "Prescriptions", note: "Kept on file digitally" },
];

/**
 * `#pharmacy`: a `--home-surface-2` band summarising the 24-hour counter and
 * its delivery service. This is a summary, not a duplicate of the `pharmacy`
 * and `medicine-delivery` catalog entries in `data/atHome.ts`: it reuses
 * their facts (authorized stock only, pharmacist check, digital
 * prescriptions, Negombo coverage) without repeating their sentences.
 */
export function PharmacySection() {
  return (
    // mt-30 matches the home page's banded sections, so the tinted band does
    // not start flush against the preceding section's last row.
    <section id="pharmacy" className="mt-30 bg-[var(--home-surface-2)]">
      <div className="mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-2 min-[900px]:items-center">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              08 / Pharmacy
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              Medicine you can
              <br />
              trust, day or night
            </h2>
            <p
              className="mt-5.5 max-w-[46ch] text-[16.5px] leading-[1.65] text-[var(--home-muted)]"
              style={{ textWrap: "pretty" }}
            >
              The counter holds authorized stock only, with a pharmacist checking every order against your file
              before it is handed over or sent out for delivery. Digital records make a repeat order
              straightforward, and delivery reaches homes across Negombo.
            </p>
            {/* This band is a summary; the counter, stock, delivery and repeat
                prescriptions all have their own sections on /pharmacy, so the
                CTA hands off there rather than to this page's #book. */}
            <a
              href="/pharmacy"
              className="sj-invert mt-7 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
            >
              Visit the pharmacy <span aria-hidden>&rarr;</span>
            </a>
          </Reveal>

          <RevealStagger className="flex flex-col gap-px bg-[var(--home-hairline)]">
            {pharmacyFacts.map((row) => (
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
