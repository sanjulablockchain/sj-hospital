"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParallax } from "../hooks/useParallax";
import { HERO_SLIDE_INTERVAL_MS, heroSlides } from "../data/heroSlides";

/**
 * Stacks every hero photograph and crossfades between them. All layers mount
 * at once so the shared Ken Burns animation runs in lockstep: a fade between
 * two frames at the same zoom reads as one continuous shot changing, not as a
 * cut. Under prefers-reduced-motion the rotation never starts and the first
 * slide holds, matching how `useParallax` disables itself.
 */
export function HeroParallaxBackground({ photoAlt }: { photoAlt: string }) {
  const { ref, offset } = useParallax(0.16, 130);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % heroSlides.length);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      style={{ transform: `translateY(${offset}px)` }}
      className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
    >
      {heroSlides.map((slide, index) => {
        /* Only the first slide describes itself: `hero.photoAlt` is translated
           into all three languages for that shot, and the others are further
           views of the same building. */
        const isFirst = index === 0;
        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={isFirst ? photoAlt : ""}
            aria-hidden={isFirst ? undefined : true}
            fill
            priority={isFirst}
            sizes="100vw"
            className={`animate-sj-burns object-cover transition-opacity duration-[1600ms] ease-in-out ${slide.positionClass} ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
    </div>
  );
}
