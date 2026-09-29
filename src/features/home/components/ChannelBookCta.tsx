"use client";

import { useState } from "react";
import { BookingModal } from "@/components/layout/BookingModal";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import { ArrowRight } from "./primitives";

/**
 * The channel card's CTA (`#book`, `quickAccess.channel`): a real link to
 * `/e-channeling` so it goes somewhere with JavaScript off, but with it on
 * the click opens the same booking sheet the header's Book now button opens,
 * whose first card is that same page. Mirrors `ThemedHeader`'s Book now
 * button.
 */
export function ChannelBookCta({
  href,
  locale,
  cta,
  className,
}: {
  href: string;
  locale: Locale;
  cta: string;
  className: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href={localeHref(href, locale)}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
        className={className}
      >
        {cta} <ArrowRight />
      </a>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
