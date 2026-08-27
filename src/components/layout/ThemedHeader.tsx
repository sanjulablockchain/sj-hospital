"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ThemeToggleButton } from "@/components/theme/ThemeToggleButton";
import { MobileNavPanel } from "@/components/layout/MobileNavPanel";
import { LOGO_MARK } from "@/config/brand";
import type { NavItem } from "@/config/navigation";

type ThemedHeaderProps = {
  navItems: NavItem[];
  bookHref?: string;
  homeHref?: string;
};

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * The element's laid-out width at its natural (unshrunk, unwrapped) size, read
 * even while it is `display:none`. Callers run this inside a layout effect, so
 * the temporary inline styles never reach a paint.
 */
function naturalWidth(el: HTMLElement) {
  const saved = el.getAttribute("style");
  el.style.cssText = "position:absolute;visibility:hidden;display:flex;white-space:nowrap";
  const width = el.scrollWidth;
  if (saved === null) el.removeAttribute("style");
  else el.setAttribute("style", saved);
  return width;
}

export function ThemedHeader({ navItems, bookHref = "#book", homeHref = "#top" }: ThemedHeaderProps) {
  const headerRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<HTMLAnchorElement | null>(null);

  // null until measured, which is what FALLBACK_WIDE covers.
  const [isCompact, setIsCompact] = useState<boolean | null>(null);

  /* The header row never wraps (see the render below), so the desktop nav has
     to give way to the hamburger at exactly the width where the row would have
     spilled onto a second line. That width depends on the nav labels and on
     which font actually loaded, so measure it instead of guessing a breakpoint:
     the switch then lands in the same place on every page and in every locale. */
  const measure = useCallback(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const nav = navRef.current;
    const toggle = toggleRef.current;
    const book = bookRef.current;
    if (!header || !logo || !nav || !toggle || !book) return;

    const styles = getComputedStyle(header);
    const available =
      header.clientWidth -
      Number.parseFloat(styles.paddingLeft) -
      Number.parseFloat(styles.paddingRight);
    // logo | nav | toggle | book: three gaps, and the inner group is given the
    // same gap utilities as the header so one measurement covers all three.
    const gap = Number.parseFloat(styles.columnGap) || 0;
    const required =
      logo.offsetWidth + naturalWidth(nav) + naturalWidth(toggle) + book.offsetWidth + gap * 3;

    // Nothing on the right of this comparison depends on isCompact (the nav and
    // the toggle are measured out of flow, the logo and the button are identical
    // in both layouts), so the ResizeObserver below cannot oscillate.
    setIsCompact(required > available);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    measure();
    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(header);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [measure]);

  // Web fonts land after the first measurement and change how wide the nav runs.
  useEffect(() => {
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
  }, [measure]);

  /* Until the first measurement lands there are no widths to read (the server
     renders this too), so fall back to a plain viewport breakpoint set near
     where the measurement actually flips. The min-[1240px] variants are spelled
     out in full rather than built from a constant: Tailwind only scans for
     complete class names, so an interpolated variant emits no CSS at all. */
  const wideOnly =
    isCompact === null ? "hidden min-[1240px]:flex" : isCompact ? "hidden" : "flex";
  const compactOnly =
    isCompact === null ? "flex min-[1240px]:hidden" : isCompact ? "flex" : "hidden";

  return (
    // z-20, not z-10: the header's z-index makes it a stacking context, so
    // MobileNavPanel's own z-30 cannot lift the open panel out of it. At z-10
    // the header tied with the hero content block that follows it in the DOM,
    // and the later sibling won, drawing the hero copy straight through the
    // open menu on every page that uses this header. z-20 keeps the header (and
    // the panel inside it) above hero content, and still below the z-60
    // FloatingActions.
    //
    // No flex-wrap: the row collapses to the hamburger rather than ever
    // dropping the Book now button onto a second line.
    <header
      ref={headerRef}
      className="relative z-20 mx-auto flex w-full max-w-[1440px] items-center gap-3 px-4 py-5 sm:gap-5 sm:px-8 lg:px-11"
    >
      <a ref={logoRef} href={homeHref} className="flex shrink-0 items-center gap-2.5 sm:gap-3.25">
        <Image
          src={LOGO_MARK.src}
          alt="St. Joseph Hospital"
          width={LOGO_MARK.width}
          height={LOGO_MARK.height}
          className="block h-10 w-auto sm:h-12"
          priority
        />
        {/* The header sits on the dark hero image in both themes, so these stay
            fixed-dark rather than following --home-heading / --home-accent-soft.
            They also step down on phones, where the lockup shares the row with
            both the Book now button and the hamburger. */}
        <span className="block leading-[1.05]">
          <span className="font-display block text-[15px] font-extrabold tracking-[-0.02em] text-white sm:text-[16.5px]">
            ST. JOSEPH
          </span>
          <span className="block text-[9px] tracking-[0.18em] text-[#7FCBFF] sm:text-[10px] sm:tracking-[0.22em]">
            HOSPITAL &middot; NEGOMBO
          </span>
        </span>
      </a>

      {/* One right-aligned group in a single DOM order: wide drops the
          hamburger, compact drops the nav and the toggle, which leaves Book now
          and the hamburger together at the top right. */}
      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
        <nav
          ref={navRef}
          /* The type/gap tier steps down well before the row runs out of room.
             A boundary sitting near the fit threshold would make widening the
             window *collapse* the nav, because the wider tier needs more space
             than the width that unlocked it, so the larger tier only starts at
             a width it comfortably clears. */
          className={`items-center gap-5 text-[13px] font-semibold max-[1399px]:gap-4 max-[1399px]:text-[12px] ${wideOnly}`}
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-white/82 hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>

        <div ref={toggleRef} className={wideOnly}>
          <ThemeToggleButton />
        </div>

        <a
          ref={bookRef}
          href={bookHref}
          className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap bg-[var(--home-accent)] px-3.5 py-2.5 text-[12.5px] font-bold text-[var(--home-on-accent)] sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-[13.5px]"
        >
          Book now{" "}
          <span aria-hidden className="hidden sm:inline">
            &rarr;
          </span>
        </a>

        <div className={compactOnly}>
          <MobileNavPanel items={navItems} />
        </div>
      </div>
    </header>
  );
}
