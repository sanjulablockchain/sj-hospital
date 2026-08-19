"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { useParallax } from "../hooks/useParallax";
import { RevealStagger } from "./RevealStagger";
import { CountUp } from "./CountUp";
import { LOGO_MARK } from "@/config/brand";

type PharmacyStat = {
  label: string;
  /** Animated when set; `value` is used verbatim otherwise. */
  count?: number;
  value?: string;
  /** Fixed text that sits directly after the counter. */
  suffix?: string;
  accent?: boolean;
};

const stats: PharmacyStat[] = [
  { label: "Counter hours", count: 24, suffix: " / 7" },
  { label: "Home delivery radius", value: "Negombo" },
  { label: "Prescriptions on file", value: "Digital", accent: true },
  { label: "OPD patient lab discount", count: 10, suffix: "%" },
];

export function PharmacySection() {
  const { ref: watermarkRef, offset: watermarkOffset } = useParallax(0.1, 60);

  return (
    <section id="pharmacy" className="relative mt-30 overflow-hidden bg-[#08123A]">
      <div
        ref={watermarkRef}
        style={{ transform: `translateY(${watermarkOffset}px)` }}
        className="pointer-events-none absolute -top-[20%] -left-[6%] w-[32%] opacity-12"
      >
        <Image
          src={LOGO_MARK.src}
          alt=""
          width={LOGO_MARK.width}
          height={LOGO_MARK.height}
          className="h-auto w-full"
        />
      </div>
      <div className="relative mx-auto max-w-[1440px] px-5 py-25 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-2 min-[900px]:items-center">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">05 / Pharmacy</div>
            <h2 className="font-display mt-4.5 text-[clamp(40px,5.2vw,78px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              Authorized
              <br />
              medicine.
              <br />
              Nothing else.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/78" style={{ textWrap: "pretty" }}>
              Our in-house pharmacy stocks only verified, authorized stock, dispensed by pharmacists who can
              read your file, at any hour of the night.
            </p>
            <div className="mt-7.5 flex flex-wrap gap-3">
              <a href="#book" className="sj-invert inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]">
                Order a delivery <span aria-hidden>&rarr;</span>
              </a>
              <a href="tel:+94742223334" className="sj-invert inline-flex items-center gap-2.5 border border-white/30 px-6 py-4 text-[15px] font-bold text-white">
                Ask a pharmacist
              </a>
            </div>
          </Reveal>
          <RevealStagger stepMs={90} className="flex flex-col gap-px bg-white/16">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline justify-between gap-5 bg-[#08123A] px-7.5 py-6">
                <span className="text-[15px] text-white/72">{stat.label}</span>
                <span
                  className={`font-display text-[32px] font-extrabold tracking-[-0.03em] tabular-nums ${
                    stat.accent ? "text-[var(--home-accent)]" : "text-white"
                  }`}
                >
                  {stat.count === undefined ? (
                    stat.value
                  ) : (
                    <>
                      <CountUp to={stat.count} />
                      {stat.suffix}
                    </>
                  )}
                </span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
