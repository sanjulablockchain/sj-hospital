"use client";

import { useState } from "react";
import type { NavItem } from "@/config/navigation";

type MobileNavPanelProps = {
  items: NavItem[];
};

export function MobileNavPanel({ items }: MobileNavPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ml-auto min-[1120px]:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="home-mobile-nav-panel"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 w-11 items-center justify-center border border-[var(--home-hairline)] text-[17px] text-[var(--home-heading)]"
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
            <a
              href="#book"
              onClick={() => setIsOpen(false)}
              className="mt-2 bg-[var(--home-accent)] px-5 py-3 text-center text-[15px] font-bold text-[var(--home-on-accent)]"
            >
              Book now
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
