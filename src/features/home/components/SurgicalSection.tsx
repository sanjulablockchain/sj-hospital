"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "../hooks/useParallax";
import type { HomeContent } from "../data/getContent";

export function SurgicalSection({ content }: { content: HomeContent["content"]["surgical"] }) {
  const { eyebrow, heading, body, ctaPrimary, ctaSecondary, procedures } = content;
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
          <Reveal className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">{eyebrow}</div>
            <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(40px,5.2vw,78px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              {heading.line1}
              <br />
              {heading.line2}
              <br />
              {heading.line3}
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/80" style={{ textWrap: "pretty" }}>
              {body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/e-channeling"
                className="sj-invert inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
              >
                {ctaPrimary} <span aria-hidden>&rarr;</span>
              </Link>
              <a href="tel:+94117848484" className="sj-invert inline-flex items-center gap-2.5 border border-white/30 px-6 py-4 text-[15px] font-bold text-white">
                {ctaSecondary}
              </a>
            </div>
          </Reveal>
          <Reveal className="min-w-0">
            <div className="flex flex-col gap-px bg-white/18">
              {procedures.map((item, index) => (
                <div key={index} className="flex items-baseline justify-between gap-5 bg-[#08123A] px-7 py-5.5">
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
