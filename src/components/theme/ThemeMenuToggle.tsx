"use client";

import { useSiteTheme } from "./useSiteTheme";

/**
 * The theme switch as a menu row. ThemeToggleButton is styled for the dark hero
 * the header sits on; this variant lives inside the mobile nav panel, which is
 * painted in the current theme's own tokens.
 */
export function ThemeMenuToggle() {
  const { theme, toggle } = useSiteTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex w-full items-center justify-between gap-3 px-2 py-3 text-left text-[15px] font-semibold text-[var(--home-body)] hover:text-[var(--home-heading)]"
    >
      <span>{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
      <span
        aria-hidden
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-[var(--home-hairline)] text-[15px] text-[var(--home-heading)]"
      >
        {isDark ? "☀" : "☽"}
      </span>
    </button>
  );
}
