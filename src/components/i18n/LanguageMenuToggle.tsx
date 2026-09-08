"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALE_LABELS, LOCALES, type Locale } from "@/lib/i18n/locales";
import { swapLocale } from "@/lib/i18n/paths";
import { useLocale } from "@/lib/i18n/useLocale";
import { rememberLocale } from "@/lib/i18n/rememberLocale";
import { chromeCopyFor } from "@/components/layout/chromeCopy";

type LanguageMenuToggleProps = {
  onChoose?: () => void;
};

/**
 * The language switch as a menu row, the same relationship ThemeMenuToggle has
 * to ThemeToggleButton. Inside the panel there is room to lay all three
 * languages out flat, so there is no second menu to open.
 */
export function LanguageMenuToggle({ onChoose }: LanguageMenuToggleProps) {
  const current = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const copy = chromeCopyFor(current);

  function choose(locale: Locale) {
    rememberLocale(locale);
    onChoose?.();
    router.push(swapLocale(pathname, locale));
  }

  return (
    <div className="px-2 py-3">
      <p className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-[var(--home-body)]">
        {copy.language}
      </p>
      <div className="flex flex-wrap gap-2">
        {LOCALES.map((locale) => (
          <button
            key={locale}
            type="button"
            lang={locale}
            aria-current={locale === current ? "true" : undefined}
            onClick={() => choose(locale)}
            className={`border px-3 py-2 text-[15px] ${
              locale === current
                ? "border-[var(--home-heading)] font-semibold text-[var(--home-heading)]"
                : "border-[var(--home-hairline)] text-[var(--home-body)]"
            }`}
          >
            {LOCALE_LABELS[locale]}
          </button>
        ))}
      </div>
    </div>
  );
}
