"use client";

import Image from "next/image";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import { ClockIcon } from "@/components/ui/Icons";

export function HeroImageCard() {
  const parallax = useScrollParallax(0.06, 24);

  return (
    <div
      // eslint-disable-next-line react-hooks/refs -- useScrollParallax returns a ref for direct passthrough, not a `.current` read
      ref={parallax.ref}
      // eslint-disable-next-line react-hooks/refs -- offset is plain state, not a ref value
      style={{ transform: `translateY(${parallax.offset}px)` }}
      className="relative"
    >
      <div className="pointer-events-none absolute -right-3 -top-3 h-32 w-32 animate-spin-slow rounded-full border-2 border-dashed border-accent/40 sm:h-36 sm:w-36" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
        <Image
          src="/images/hero.jpg"
          alt="St. Joseph Hospital Negombo building and staff"
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute -left-5 bottom-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-[0_20px_40px_-16px_rgba(20,10,50,0.4)] sm:-left-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF7FD]">
          <ClockIcon className="text-accent-dark" />
        </div>
        <div>
          <div className="font-heading text-lg font-extrabold leading-none text-ink">
            24/7
          </div>
          <div className="text-xs text-muted">Open, every hour</div>
        </div>
      </div>
    </div>
  );
}
