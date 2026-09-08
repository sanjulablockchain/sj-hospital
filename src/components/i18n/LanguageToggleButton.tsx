"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/i18n/locales";
import { swapLocale } from "@/lib/i18n/paths";
import { rememberLocale } from "@/lib/i18n/rememberLocale";
import { useLocale } from "@/lib/i18n/useLocale";
import { chromeCopyFor } from "@/components/layout/chromeCopy";

/**
 * The header's language control, sized and bordered to match
 * ThemeToggleButton beside it so the pair reads as one set. A 44px square is
 * also the smallest comfortable touch target, and keeping it square is what
 * stops the header's width measurement from collapsing the nav any earlier
 * than it already does.
 */
export function LanguageToggleButton() {
  const current = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const copy = chromeCopyFor(current);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      // Escape must not strand the focus ring inside a menu that is no longer
      // on screen, so it goes back to the control that opened it.
      buttonRef.current?.focus();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  function choose(locale: Locale) {
    rememberLocale(locale);
    setIsOpen(false);
    router.push(swapLocale(pathname, locale));
  }

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={copy.changeLanguage.replace("{locale}", LOCALE_LABELS[current])}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/28 bg-transparent text-[16px] text-white"
      >
        <span aria-hidden>&#127760;</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label={copy.language}
          className="absolute right-0 top-full z-40 mt-1 min-w-40 border border-[var(--home-hairline)] bg-[var(--home-bg)] py-1"
        >
          {LOCALES.map((locale) => (
            <button
              key={locale}
              type="button"
              role="menuitem"
              lang={locale}
              aria-current={locale === current ? "true" : undefined}
              onClick={() => choose(locale)}
              className={`block w-full px-4 py-2.5 text-left text-[15px] ${
                locale === current
                  ? "font-semibold text-[var(--home-heading)]"
                  : "text-[var(--home-body)] hover:text-[var(--home-heading)]"
              }`}
            >
              {LOCALE_LABELS[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
