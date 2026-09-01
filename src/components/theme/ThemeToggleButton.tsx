"use client";

import { useSiteTheme } from "./useSiteTheme";
import { chromeCopyFor } from "@/components/layout/chromeCopy";
import { useLocale } from "@/lib/i18n/useLocale";

export function ThemeToggleButton() {
  const { theme, toggle } = useSiteTheme();
  const isDark = theme === "dark";
  const copy = chromeCopyFor(useLocale());
  const label = isDark ? copy.toLightMode : copy.toDarkMode;

  return (
    <button
      type="button"
      title={label}
      onClick={toggle}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/28 bg-transparent text-[16px] text-white"
    >
      <span aria-hidden>{isDark ? "☀" : "☽"}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
