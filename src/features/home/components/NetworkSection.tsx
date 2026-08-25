import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { NetworkAccordion } from "./NetworkAccordion";

export function NetworkSection() {
  return (
    <section id="network" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              10 / Network
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              One group,
              <br />
              two countries
            </h2>
          </div>
          <div>
            <p className="max-w-[36ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
              Our Negombo hospital shares clinical governance with the largest pediatric group in Los Angeles.
            </p>
            <Link
              href="/network"
              className="mt-5 sj-invert inline-flex items-center gap-2.5 border border-[var(--home-hairline-strong)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-heading)]"
            >
              The full network <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </Reveal>
      <Reveal className="mt-11.5">
        <NetworkAccordion />
      </Reveal>
    </section>
  );
}
