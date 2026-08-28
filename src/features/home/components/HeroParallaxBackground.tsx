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
        src="/images/hero-exterior.png"
        alt="St. Joseph Hospital building at dusk"
        fill
        priority
        /* The building carries the hospital name and leaf on its right-hand
           face, at roughly 75-87% across the photograph. object-cover crops on
           the axis with the surplus, and this box is 128% of a min-h-screen
           section, so the narrower the viewport is *relative to its height*,
           the tighter the horizontal window gets: at 390x844 only 43-71% of
           the frame survives and the signage is cut off entirely. The
           threshold is an aspect ratio, not a width (an 820x1180 tablet in
           portrait loses it just as a phone does), so the focal point follows
           the aspect: hold the signage until the frame is wide enough that 60%
           keeps it in shot on its own. */
        className="animate-sj-burns object-cover object-[90%_50%] [@media(min-aspect-ratio:5/4)]:object-[60%_50%]"
      />
    </div>
  );
}
