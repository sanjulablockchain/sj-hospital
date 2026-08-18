"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { useParallax } from "../hooks/useParallax";

const procedures = [
  { name: "General surgery", note: "Elective and emergency" },
  { name: "Obstetric theatre", note: "Consultant led" },
  { name: "Orthopaedic procedures", note: "Day case and inpatient" },
  { name: "Endoscopy suite", note: "Same day reporting" },
  { name: "Post-operative care", note: "Assigned recovery nurse" },
];

export function SurgicalSection() {
  const { ref: bgRef, offset: bgOffset } = useParallax(0.12, 80);

  return (
    <section id="surgical" className="relative mt-30 overflow-hidden bg-[#08123A]">
      <div ref={bgRef} style={{ transform: `translateY(${bgOffset}px)` }} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image src="/images/about-facility.jpg" alt="" fill className="object-cover opacity-34" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, #060B1F 4%, rgba(6,11,31,0.86) 52%, rgba(6,11,31,0.74) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-2 min-[900px]:items-center">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              03 / Surgical care
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(40px,5.2vw,78px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              Theatres run
              <br />
              to protocol,
              <br />
              not to habit
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/80" style={{ textWrap: "pretty" }}>
              Elective and emergency surgery with consultant anaesthesia, single use consumables, sterile
              tracking on every instrument set and a nurse assigned to your recovery from theatre to discharge.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#book" className="inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]">
                Request a surgical consult <span aria-hidden>&rarr;</span>
              </a>
              <a href="tel:+94117848484" className="inline-flex items-center gap-2.5 border border-white/30 px-6 py-4 text-[15px] font-bold text-white">
                Speak to the theatre desk
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col gap-px bg-white/18">
              {procedures.map((item) => (
                <div key={item.name} className="flex items-baseline justify-between gap-5 bg-[#08123A] px-7 py-5.5">
                  <span className="text-[17px] font-bold text-white">{item.name}</span>
                  <span className="text-right text-[14px] text-white/66">{item.note}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
