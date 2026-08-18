"use client";

import { useHomeTheme } from "../hooks/useHomeTheme";

export function ThemeToggleButton() {
  const { theme, toggle } = useHomeTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="inline-flex h-11 w-11 items-center justify-center border border-[var(--home-hairline)] bg-transparent text-[16px] text-[var(--home-heading)]"
    >
      <span aria-hidden>{isDark ? "☀" : "☽"}</span>
      <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
    </button>
  );
}
