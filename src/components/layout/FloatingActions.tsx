"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon, CallIcon } from "@/components/ui/BrandIcons";

export function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-[14px] right-[14px] z-[60] flex flex-col items-end gap-2.5 sm:bottom-[22px] sm:right-[22px]">
      {showBackToTop && (
        <button
          type="button"
          title="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex h-[52px] w-[52px] items-center justify-center border border-[var(--home-hairline)] bg-[var(--home-bg)]/70 text-[18px] text-[var(--home-heading)] backdrop-blur-sm"
        >
          <span aria-hidden>&uarr;</span>
        </button>
      )}
      <a
        href="https://wa.me/94742223334"
        title="WhatsApp us"
        className="inline-flex items-center justify-center gap-2.5 bg-[#1FAF54] px-5 py-3.5 text-[14.5px] font-bold text-[#04220F] shadow-[0_18px_34px_-18px_rgba(0,0,0,0.75)] max-[639px]:h-[52px] max-[639px]:w-[52px] max-[639px]:px-0"
      >
        <WhatsAppIcon />
        <span className="max-[639px]:hidden">WhatsApp</span>
      </a>
      <a
        href="tel:+94117848484"
        title="Call us"
        className="animate-sj-pulse inline-flex items-center justify-center gap-2.5 bg-[var(--home-accent)] px-5 py-3.5 text-[14.5px] font-bold text-[var(--home-on-accent)] shadow-[0_18px_34px_-18px_rgba(0,0,0,0.75)] max-[639px]:h-[52px] max-[639px]:w-[52px] max-[639px]:px-0"
      >
        <CallIcon />
        <span className="max-[639px]:hidden">Call us</span>
      </a>
    </div>
  );
}
