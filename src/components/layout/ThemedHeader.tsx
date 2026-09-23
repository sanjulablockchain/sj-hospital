"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ThemeToggleButton } from "@/components/theme/ThemeToggleButton";
import { LanguageToggleButton } from "@/components/i18n/LanguageToggleButton";
import { DesktopNav } from "@/components/layout/mega-nav/DesktopNav";
import { MobileNavDrawer } from "@/components/layout/mega-nav/MobileNavDrawer";
import { LOGO_LOCKUP_BRAND, LOGO_MARK } from "@/config/brand";
import type { MegaNavSection } from "@/config/megaNavigation";
import { chromeCopyFor } from "@/components/layout/chromeCopy";
import { useLocale } from "@/lib/i18n/useLocale";
import { localeHref } from "@/lib/i18n/paths";

type ThemedHeaderProps = {
  /** The whole site's tree (src/config/megaNavigation.ts), passed in by ThemedShell. */
  sections: MegaNavSection[];
  /**
   * See ThemedShell. `"fixed"` (default) floats over the hero and goes solid
   * on scroll; `"solid"` is sticky, in normal flow, always in its solid state,
   * and shows the horizontal lockup instead of the mark and wordmark.
   */
  variant?: "fixed" | "solid";
};

const BOOK_HREF = "/e-channeling";

// How far the page scrolls before the bar goes solid. Small enough that the
// bar is opaque by the time hero copy would start passing under it, large
// enough that the bounce at the top of a touch scroll does not flicker it.
const SOLID_AFTER_PX = 24;

/**
 * The site header: fixed over every page, rendered once by `ThemedShell`.
 * Transparent over the hero at the top of the page (the hero photographs are
 * fixed-dark in both themes, so the chrome is white there), solid in the
 * theme's own colours once the page scrolls or a menu opens. The colour flip
 * is the `data-solid` attribute; globals.css maps it onto the four
 * `--sj-chrome-*` tokens this component, the two toggles and the hamburger
 * paint from.
 *
 * The `"solid"` variant (the v4 home page) skips the transparent state: it is
 * `data-solid` from the first paint, sticky in normal flow rather than fixed
 * over the hero, and shows the horizontal lockup. Book now paints from the
 * `--home-cta-*` pair so the brand palette can turn it purple while every
 * other page keeps the accent.
 *
 * `--sj-header-h` (globals.css) is this bar's height. The heroes pad by it and
 * anchors offset by it, so a change to the padding or logo size here has to
 * land there too.
 *
 * Only HREFS pass through `localeHref`: labels are English in every locale by
 * the register rule, so there is nothing to translate.
 */
export function ThemedHeader({ sections, variant = "fixed" }: ThemedHeaderProps) {
  const solid = variant === "solid";
  const locale = useLocale();
  const copy = chromeCopyFor(locale);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SOLID_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onOpenChange = useCallback((open: boolean) => setMenuOpen(open), []);

  return (
    // z-70: above the hero, every in-page sticky rail (the accommodation
    // room-type bar is z-30) and the z-60 floating action rail, which on a
    // short viewport otherwise sat over the open Services panel's footer. The
    // mobile drawer (z-80) escapes this stacking context through a portal.
    <header
      data-solid={solid || scrolled || menuOpen ? true : undefined}
      className={solid ? "sj-header sj-header-solid z-[70]" : "sj-header fixed inset-x-0 top-0 z-[70]"}
    >
      <div className="mx-auto flex h-[var(--sj-header-h)] w-full max-w-[1440px] items-center gap-1.5 px-3 sm:gap-5 sm:px-8 lg:gap-6 lg:px-11">
        <a href={localeHref("/", locale)} className="flex shrink-0 items-center gap-2.5 sm:gap-3.25">
          {solid ? (
            <Image
              src={LOGO_LOCKUP_BRAND.src}
              alt="St. Joseph Hospital, to live is a privilege"
              width={LOGO_LOCKUP_BRAND.width}
              height={LOGO_LOCKUP_BRAND.height}
              data-logo
              className="-mx-2 block h-12 w-auto sm:-mx-3.5 sm:h-16"
              preload
            />
          ) : (
            <>
              <Image
                src={LOGO_MARK.src}
                alt="St. Joseph Hospital"
                width={LOGO_MARK.width}
                height={LOGO_MARK.height}
                className="block h-10 w-auto sm:h-12"
                preload
              />
              <span className="block leading-[1.05]">
                <span className="font-display block text-[15px] font-extrabold tracking-[-0.02em] text-[var(--sj-chrome-fg)] transition-colors duration-300 sm:text-[16.5px]">
                  ST. JOSEPH
                </span>
                <span className="block text-[9px] tracking-[0.18em] text-[var(--sj-chrome-accent)] transition-colors duration-300 sm:text-[10px] sm:tracking-[0.22em]">
                  HOSPITAL &middot; NEGOMBO
                </span>
              </span>
            </>
          )}
        </a>

        {/* `hidden lg:flex` here rather than inside DesktopNav so the nav's
            own `flex-1` centring only applies once it is on screen. */}
        <div className="hidden min-w-0 flex-1 lg:flex">
          <DesktopNav sections={sections} locale={locale} onOpenChange={onOpenChange} />
        </div>

        {/* One right-aligned group in a single DOM order: `lg` drops the
            hamburger, everything narrower drops the two toggles (they live in
            the drawer instead), leaving Book now and the hamburger together. */}
        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-3 lg:ml-0">
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageToggleButton />
            <ThemeToggleButton />
          </div>

          <a
            href={localeHref(BOOK_HREF, locale)}
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap bg-[var(--home-cta-bg)] px-2 py-2.5 text-[12.5px] font-bold text-[var(--home-cta-fg)] transition-colors hover:bg-[var(--home-cta-hover)] sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-[13.5px]"
          >
            {copy.bookNow}{" "}
            <span aria-hidden className="hidden sm:inline">
              &rarr;
            </span>
          </a>

          <div className="flex lg:hidden">
            <MobileNavDrawer sections={sections} locale={locale} bookHref={BOOK_HREF} />
          </div>
        </div>
      </div>
    </header>
  );
}
