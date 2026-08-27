"use client";

import { useState } from "react";
import { ThemeMenuToggle } from "@/components/theme/ThemeMenuToggle";
import type { NavItem } from "@/config/navigation";

type MobileNavPanelProps = {
  items: NavItem[];
};

export function MobileNavPanel({ items }: MobileNavPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // ThemedHeader decides when this is on screen and keeps it last in the row,
    // so the hamburger is the rightmost control. The panel below is positioned
    // against the header, which is the nearest positioned ancestor.
    <div className="shrink-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="home-mobile-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-10 w-10 items-center justify-center border border-white/28 text-[16px] text-white sm:h-11 sm:w-11 sm:text-[17px]"
      >
        <span aria-hidden>{isOpen ? "✕" : "☰"}</span>
      </button>

      {isOpen && (
        <div
          id="home-mobile-nav-panel"
          className="absolute inset-x-0 top-full z-30 border-t border-[var(--home-hairline)] bg-[var(--home-bg)] px-5 py-5"
        >
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-2 py-3 text-[15px] font-semibold text-[var(--home-body)] hover:text-[var(--home-heading)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Book now is not repeated here: it now sits in the header row at
              every width, so the menu carries the theme switch instead. */}
          <div className="mt-3 border-t border-[var(--home-hairline)] pt-2">
            <ThemeMenuToggle />
          </div>
        </div>
      )}
    </div>
  );
}
