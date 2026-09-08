import { LocaleLink } from "@/components/i18n/LocaleLink";

/**
 * Renders inside the /services layout's ThemedShell, so the --home-* tokens
 * and font-display are already in scope; this reads as a real page, not a
 * bare Next.js stub.
 *
 * Next.js does not pass `params` (or any other prop) to a segment-level
 * `not-found.tsx` (see the "Props" note in the Next 16 `not-found.js` doc:
 * "not-found.js ... components do not accept any props"), so this component
 * has no way to read which of the three locales the reader is actually on,
 * even though the URL that reached it IS validly prefixed (an unknown
 * SERVICE, not an unknown locale; an unknown locale never reaches this file,
 * it 404s at `global-not-found.tsx` instead). Rather than guess, or thread a
 * locale through non-standard plumbing (a request header set in the proxy)
 * for one error page, the message is trilingual: English, Sinhala and Tamil
 * together, so every reader can read it regardless of which locale's URL
 * they are on. `LocaleLink` still resolves "Back to all services" to the
 * correct prefixed `/services` for whichever locale the surrounding
 * `[locale]` segment matched, which is ordinary routing and unaffected by the
 * props restriction above.
 */
export default function ServiceNotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-[var(--home-bg)] px-5 py-24 text-center sm:px-8">
      <div className="inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent-soft)] uppercase">
        <span className="h-px w-11 bg-[var(--home-accent)]" />
        Service not found
      </div>
      <h1 className="font-display wrap-break-word max-w-[18ch] text-[clamp(34px,6vw,64px)] leading-[0.95] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
        We don&rsquo;t have that service.
      </h1>
      <div className="flex max-w-[52ch] flex-col gap-3 text-[16px] leading-[1.6] text-[var(--home-body)]">
        <p>
          The service you&rsquo;re looking for doesn&rsquo;t exist, or may have moved. Take a look at the full
          directory to find the right department instead.
        </p>
        <p lang="si">
          ඔබ සොයන සේවාව නොමැත, හෝ එය මාරු වී ඇති. නිවැරදි අංශය සොයා ගැනීමට සම්පූර්ණ නාමාවලිය බලන්න.
        </p>
        <p lang="ta">
          நீங்கள் தேடும் சேவை இல்லை, அல்லது அது மாறியிருக்கலாம். சரியான துறையைக் கண்டறிய முழு அடைவைப் பாருங்கள்.
        </p>
      </div>
      <LocaleLink
        href="/services"
        className="mt-2 inline-flex items-center gap-2.5 border border-[var(--home-hairline)] px-6 py-4 text-[15px] font-bold text-[var(--home-heading)] hover:border-[var(--home-accent)]"
      >
        Back to all services <span aria-hidden>&rarr;</span>
      </LocaleLink>
    </section>
  );
}
