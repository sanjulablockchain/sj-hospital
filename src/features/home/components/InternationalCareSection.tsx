import { RevealStagger } from "@/components/ui/RevealStagger";
import { internationalCareItems } from "../data/internationalCare";

export function InternationalCareSection() {
  return (
    <section id="international" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <div className="grid gap-15 min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:items-start">
        <div className="min-[900px]:sticky min-[900px]:top-10">
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            07 / International patient care
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(38px,4.6vw,70px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-[var(--home-heading)] uppercase">
            Travelling
            <br />
            for care, or
            <br />
            just visiting
          </h2>
          <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.65] text-[var(--home-muted)]">
            Negombo sits ten minutes from the international airport. We look after visitors, expatriates and
            medical travellers from arrival to follow up at home.
          </p>
          <a href="mailto:international@sjhospital.lk" className="sj-invert mt-7 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-on-accent)]">
            Talk to the international desk <span aria-hidden>&rarr;</span>
          </a>
        </div>
        <RevealStagger className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2">
          {internationalCareItems.map((item) => (
            <div key={item.index} className="bg-[var(--home-bg)] px-7 py-7.5">
              <div className="text-[12px] font-bold tracking-[0.18em] text-[var(--home-accent)]">{item.index}</div>
              <h3 className="font-display mt-3.5 text-[24px] leading-[1.08] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--home-muted)]">{item.body}</p>
            </div>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
