import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { admissionSteps, bringWithYou, paymentNotes } from "@/features/services/data/indexContent";

/**
 * `#admissions`: the four-step journey, then what to bring, how payment and
 * insurance work, and a short pointer to the rooms themselves.
 */
export function AdmissionsSection() {
  return (
    <section id="admissions" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          06 / Admissions
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Four steps, no surprises
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={80}
        className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4"
      >
        {admissionSteps.map((step) => (
          <div key={step.no} className="bg-[var(--home-bg)] p-7.5">
            <div className="font-display text-[56px] leading-[0.85] font-extrabold tracking-[-0.04em] text-[var(--home-accent)] tabular-nums min-[900px]:text-[clamp(64px,6vw,92px)]">
              {step.no}
            </div>
            <h3 className="font-display mt-3.5 text-[20px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
              {step.title}
            </h3>
            <p className="mt-2.5 text-[14px] leading-[1.55] text-[var(--home-muted)]">{step.desc}</p>
          </div>
        ))}
      </RevealStagger>

      <div className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-3">
        <Reveal className="bg-[var(--home-surface-2)] p-7.5">
          <h3 className="font-display text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
            Bring with you
          </h3>
          <ul className="mt-4.5 flex flex-col gap-2.5">
            {bringWithYou.map((item) => (
              <li key={item} className="flex gap-3 text-[14px] leading-[1.5] text-[var(--home-muted)]">
                <span aria-hidden className="text-[var(--home-accent)]">
                  &#10003;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="bg-[var(--home-surface-2)] p-7.5">
          <h3 className="font-display text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
            Payment & insurance
          </h3>
          <ul className="mt-4.5 flex flex-col gap-2.5">
            {paymentNotes.map((note) => (
              <li key={note} className="flex gap-3 text-[14px] leading-[1.5] text-[var(--home-muted)]">
                <span aria-hidden className="text-[var(--home-accent)]">
                  &#10003;
                </span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="bg-[var(--home-surface-2)] p-7.5">
          <h3 className="font-display text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
            The rooms
          </h3>
          <p className="mt-4.5 text-[14px] leading-[1.55] text-[var(--home-muted)]">
            Private and semi-private rooms with attendant space, sanitised on a two hour cycle.
          </p>
          <a
            href="/accommodation"
            className="sj-invert mt-5.5 inline-flex w-fit items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.5 text-[14px] font-bold text-[var(--home-on-accent)]"
          >
            See the rooms <span aria-hidden>&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
