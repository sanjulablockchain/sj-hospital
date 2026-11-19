"use client";

/**
 * The Service Book page failed to render. Offers a retry and the download,
 * which is a static file and works even when the page does not.
 */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-[720px] px-5 py-28 text-center">
      <h1 className="font-display text-[32px] font-extrabold tracking-[-0.03em] text-[var(--home-heading)]">
        The Service Book did not load
      </h1>
      <p className="mt-4 text-[16px] leading-[1.6] text-[var(--home-body)]">
        Please try again, or download the book as a PDF.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="min-h-11 cursor-pointer bg-[var(--home-accent)] px-6 py-3 text-[15px] font-bold text-[var(--home-on-accent)]"
        >
          Try again
        </button>
        <a
          href="/downloads/sj-service-book-2026.pdf"
          download
          className="inline-flex min-h-11 items-center border border-[var(--home-hairline-strong)] px-6 py-3 text-[15px] font-bold text-[var(--home-heading)]"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
