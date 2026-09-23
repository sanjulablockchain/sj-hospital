"use client";

import Image from "next/image";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { CloseIcon } from "@/components/ui/Icons";
import { LOGO_MARK } from "@/config/brand";
import { chromeCopyFor } from "@/components/layout/chromeCopy";
import { localeHref } from "@/lib/i18n/paths";
import { useLocale } from "@/lib/i18n/useLocale";

const BOOK_HREF = "/e-channeling";
const WHATSAPP_HREF = "https://wa.me/94742223334";
const PHONE_HREF = "tel:+94117848484";
const PHONE_DISPLAY = "0117 84 84 84";
const WHATSAPP_DISPLAY = "074 222 333 4";

/**
 * The sheet that opens from the header's Book now: three ways to be seen,
 * side by side. Online channelling (the highlighted card), WhatsApp, and the
 * switchboard, with the free OPD consultation and corporate insurance line
 * along the foot and a "Not now" to dismiss. Themed, so it is dark on the
 * dark theme, and sized as a compact sheet rather than the wide announcement
 * panel. The Book now button itself stays a real link to /e-channeling, so
 * with JavaScript off the click still goes somewhere.
 */
export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const locale = useLocale();
  const copy = chromeCopyFor(locale);

  const card =
    "sj-card-lift group flex flex-col gap-2 rounded-[14px] border p-5 text-left transition-colors";
  const kicker = "text-[11px] font-extrabold tracking-[0.18em] uppercase";
  const title = "font-display text-[19px] font-extrabold tracking-[-0.01em] text-[var(--home-heading)]";
  const desc = "text-[13.5px] leading-[1.5] text-[var(--home-muted)]";

  return (
    <Modal open={open} onClose={onClose} labelledBy="sj-booking-title" size="sheet" surface="themed">
      <div className="flex flex-col">
        <div className="flex items-start gap-4 border-b border-[var(--home-hairline)] px-6 py-5 sm:px-7">
          <Image src={LOGO_MARK.src} alt="" aria-hidden width={LOGO_MARK.width} height={LOGO_MARK.height} className="mt-0.5 h-9 w-auto" />
          <div className="min-w-0 flex-1">
            <h3 id="sj-booking-title" className="font-display m-0 text-[20px] leading-tight font-extrabold tracking-[-0.01em] text-[var(--home-heading)]">
              {copy.bookTitle}
            </h3>
            <p className="m-0 mt-1 text-[13.5px] leading-[1.5] text-[var(--home-muted)]">{copy.bookSubtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeBooking}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-[var(--home-accent)]/50 text-[var(--home-accent-soft)] transition-colors hover:bg-[var(--home-accent-tint)]"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 pt-5 pb-6 sm:px-7">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-extrabold tracking-[0.18em] text-[var(--home-muted)] uppercase">{copy.bookEyebrow}</span>
            <span aria-hidden className="h-px flex-1 bg-[var(--home-hairline)]" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Link
              href={localeHref(BOOK_HREF, locale)}
              onClick={onClose}
              className={`${card} border-[var(--home-accent)] bg-[var(--home-accent-tint)] hover:bg-[var(--home-accent-tint)]`}
            >
              <span className={`${kicker} text-[var(--home-accent-soft)]`}>{copy.bookOnlineKicker}</span>
              <span className={title}>{copy.bookOnlineTitle}</span>
              <span className={desc}>{copy.bookOnlineDesc}</span>
            </Link>
            <a href={WHATSAPP_HREF} className={`${card} border-[var(--home-hairline)] bg-[var(--home-surface)] hover:border-[var(--home-brand-text)]`}>
              <span className={`${kicker} text-[var(--home-muted)]`}>{copy.bookMessageKicker}</span>
              <span className={title}>{copy.bookMessageTitle}</span>
              <span className={`${desc} tabular-nums`}>{WHATSAPP_DISPLAY}</span>
              <span className={desc}>{copy.bookMessageDesc}</span>
            </a>
            <a href={PHONE_HREF} className={`${card} border-[var(--home-hairline)] bg-[var(--home-surface)] hover:border-[var(--home-brand-text)]`}>
              <span className={`${kicker} text-[var(--home-muted)]`}>{copy.bookCallKicker}</span>
              <span className={`${title} tabular-nums`}>{PHONE_DISPLAY}</span>
              <span className={desc}>{copy.bookCallDesc}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--home-hairline)] bg-[var(--home-surface)] px-6 py-4 sm:px-7">
          <span className="text-[13.5px] text-[var(--home-muted)]">{copy.bookFooter}</span>
          <button
            type="button"
            onClick={onClose}
            className="sj-invert inline-flex h-10 items-center rounded-[10px] border-[1.5px] border-[var(--home-hairline-strong)] px-4 text-[14px] font-extrabold text-[var(--home-heading)]"
          >
            {copy.notNow}
          </button>
        </div>
      </div>
    </Modal>
  );
}
