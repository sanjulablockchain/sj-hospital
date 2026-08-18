"use client";

import Image from "next/image";
import { useParallax } from "../hooks/useParallax";

export function HeroParallaxBackground() {
  const { ref, offset } = useParallax(0.16, 130);

  return (
    <div
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
      className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
    >
      <Image
        src="/images/hero.jpg"
        alt="St. Joseph Hospital building at dusk"
        fill
        priority
        className="animate-sj-burns object-cover"
        style={{ objectPosition: "60% 50%" }}
      />
    </div>
  );
}
