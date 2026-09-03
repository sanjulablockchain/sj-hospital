"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { useParallax } from "../hooks/useParallax";
import { CountUp } from "./CountUp";
import type { HomeContent } from "../data/getContent";

export function RoomsSection({ content }: { content: HomeContent["content"]["rooms"] }) {
  const { eyebrow, heading, body, cta, fromLabel, priceCaption, perks } = content;
  const { ref: bgRef, offset: bgOffset } = useParallax(0.14, 90);

  return (
    <section id="rooms" className="relative overflow-hidden bg-[#08123A]">
      <div ref={bgRef} style={{ transform: `translateY(${bgOffset}px)` }} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image src="/images/rooms/deluxe-1.jpg" alt="" fill className="object-cover opacity-32" />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, #060B1F 6%, rgba(6,11,31,0.84) 58%, rgba(6,11,31,0.72) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-26 sm:px-8 lg:px-11">
        <div className="grid gap-15 min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[900px]:items-center">
          <Reveal className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">{eyebrow}</div>
            <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(40px,5.4vw,82px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              {heading.line1}
              <br />
              {heading.line2}
              <br />
              {heading.line3}
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/78" style={{ textWrap: "pretty" }}>
              {body}
            </p>
            <Link
              href="/accommodation#book"
              className="sj-accentify mt-8 inline-flex items-center gap-3 bg-white px-6.5 py-4.5 text-[15px] font-bold text-[#060B1F]"
            >
              {cta} <span aria-hidden>&rarr;</span>
            </Link>
          </Reveal>
          <Reveal className="min-w-0 border-l border-white/24 pl-8">
            <div className="text-[12px] tracking-[0.18em] text-white/55 uppercase">{fromLabel}</div>
            <div className="font-display mt-2.5 text-[clamp(62px,8vw,126px)] leading-[0.82] font-extrabold tracking-[-0.05em] text-[var(--home-accent)] tabular-nums">
              <CountUp to={10000} grouped durationMs={1700} />
            </div>
            <div className="mt-3 text-[15px] text-white/70">{priceCaption}</div>
            <div className="mt-7 flex flex-col gap-3 text-[15px] text-white/80">
              {perks.map((perk, index) => (
                <span key={index} className="flex gap-3">
                  <span className="shrink-0 text-[var(--home-accent)]">&#10022;</span> {perk}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
