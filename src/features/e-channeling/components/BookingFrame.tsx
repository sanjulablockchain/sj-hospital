"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { CloseIcon } from "@/components/ui/Icons";

export type BookingFrameCopy = {
  closeBooking: string;
  openInNewTab: string;
  loadingBooking: string;
  bookingFrameTitleTemplate: string;
};

export type BookingTarget = { name: string; specialization: string; href: string };

type BookingFrameProps = {
  target: BookingTarget | null;
  onClose: () => void;
  copy: BookingFrameCopy;
};

/**
 * A consultant's Calendly booking page, shown inside our own modal so the
 * patient never leaves the directory (owner's choice, 2026-11-20: "option B").
 *
 * A plain iframe and nothing else: Calendly's widget.js is deliberately not
 * loaded, so no third party script runs on our page. The cost, per
 * Calendly's iframe embed article, is no booking events back to us and no
 * prefill; neither was used when the cards opened a new tab either. The
 * patient types their details into Calendly exactly as before.
 *
 * `embed_type=Inline` with `embed_domain` asks Calendly for its embed layout
 * (no Calendly page chrome), the same parameters widget.js would add.
 * `sandbox` grants what the booking flow needs (its scripts, its own cookies,
 * the form, and popups for links such as "add to calendar") and nothing more:
 * the frame cannot navigate our page.
 */
export function BookingFrame({ target, onClose, copy }: BookingFrameProps) {
  return (
    <Modal open={target !== null} onClose={onClose} labelledBy="sj-calendly-title" size="frame" surface="themed">
      {/* Keyed by the booking link so a second doctor starts with a fresh
          loading state rather than the first doctor's finished one. */}
      {target && <FrameBody key={target.href} target={target} onClose={onClose} copy={copy} />}
    </Modal>
  );
}

function FrameBody({ target, onClose, copy }: { target: BookingTarget; onClose: () => void; copy: BookingFrameCopy }) {
  const [loaded, setLoaded] = useState(false);
  const src = `${target.href}?embed_type=Inline&embed_domain=sjhospital.lk&hide_gdpr_banner=1`;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-[var(--home-hairline)] px-4 py-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="m-0 text-[11px] font-bold tracking-wider text-[var(--home-accent-soft)] uppercase">
            {target.specialization}
          </p>
          <h3
            id="sj-calendly-title"
            className="font-display m-0 truncate text-lg font-bold text-[var(--home-heading)]"
          >
            {target.name}
          </h3>
        </div>
        <a
          href={target.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-11 shrink-0 items-center gap-2 px-2 text-sm font-semibold text-[var(--home-accent)] hover:underline sm:inline-flex"
        >
          {copy.openInNewTab}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M7 17 17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.closeBooking}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border border-[var(--home-accent)]/50 text-[var(--home-accent-soft)] transition-colors hover:bg-[var(--home-accent-tint)]"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="relative min-h-0 flex-1 bg-[var(--home-bg)]">
        {!loaded && (
          <div
            role="status"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--home-bg)] text-sm text-[var(--home-muted)]"
          >
            <span
              aria-hidden="true"
              className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--home-hairline)] border-t-[var(--home-accent)] motion-reduce:animate-none"
            />
            {copy.loadingBooking}
          </div>
        )}
        <iframe
          src={src}
          title={copy.bookingFrameTitleTemplate.replace("{name}", target.name)}
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block h-full w-full border-0"
        />
      </div>
    </div>
  );
}
