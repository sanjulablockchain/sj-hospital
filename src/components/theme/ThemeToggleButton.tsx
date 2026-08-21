"use client";

import { useSiteTheme } from "./useSiteTheme";

export function ThemeToggleButton() {
  const { theme, toggle } = useSiteTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/28 bg-transparent text-[16px] text-white"
    >
      <span aria-hidden>{isDark ? "☀" : "☽"}</span>
      <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
  );
}
