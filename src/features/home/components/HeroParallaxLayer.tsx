"use client";

import { useScrollParallax } from "@/hooks/useScrollParallax";

export function HeroParallaxLayer() {
  const blobA = useScrollParallax(0.12, 40);
  const blobB = useScrollParallax(-0.1, 36);
  const blobC = useScrollParallax(0.16, 30);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        // eslint-disable-next-line react-hooks/refs -- useScrollParallax returns a ref for direct passthrough, not a `.current` read
        ref={blobA.ref}
        // eslint-disable-next-line react-hooks/refs -- offset is plain state, not a ref value
        style={{ transform: `translateY(${blobA.offset}px)` }}
        className="absolute -top-16 right-[8%] h-56 w-56"
      >
        <div className="decorative-blob decorative-blob--a animate-float-a h-full w-full" />
      </div>
      <div
        // eslint-disable-next-line react-hooks/refs -- useScrollParallax returns a ref for direct passthrough, not a `.current` read
        ref={blobB.ref}
        // eslint-disable-next-line react-hooks/refs -- offset is plain state, not a ref value
        style={{ transform: `translateY(${blobB.offset}px)` }}
        className="absolute -bottom-10 left-[4%] h-44 w-44"
      >
        <div className="decorative-blob decorative-blob--b animate-float-b h-full w-full" />
      </div>
      <div
        // eslint-disable-next-line react-hooks/refs -- useScrollParallax returns a ref for direct passthrough, not a `.current` read
        ref={blobC.ref}
        // eslint-disable-next-line react-hooks/refs -- offset is plain state, not a ref value
        style={{ transform: `translateY(${blobC.offset}px)` }}
        className="absolute left-[44%] top-[30%] h-32 w-32"
      >
        <div className="decorative-blob decorative-blob--c animate-float-c h-full w-full" />
      </div>
    </div>
  );
}
