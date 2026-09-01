"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/lib/i18n/useLocale";
import { localeHref } from "@/lib/i18n/paths";

type LocaleLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/**
 * An anchor that keeps the reader in the language they are already reading.
 *
 * A plain `<a>` is deliberate rather than `next/link`: these are the footer and
 * chrome links, several of them are same-document fragments, and the existing
 * markup they replace is a plain anchor. `localeHref` leaves fragments, `tel:`,
 * `mailto:` and absolute URLs untouched, so one component covers every link in
 * a footer column.
 */
export function LocaleLink({ href, className, children }: LocaleLinkProps) {
  return (
    <a href={localeHref(href, useLocale())} className={className}>
      {children}
    </a>
  );
}
