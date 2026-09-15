import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { HomeContent } from "../data/getContent";

/**
 * `02 / Free OPD`, the band announcing that a consultation costs nothing.
 *
 * A Server Component, unlike most bands on this page: it has no parallax, no
 * counter and no state, so nothing here needs to reach the browser as
 * JavaScript. Only `Reveal` and `RevealStagger`, the two scroll-in leaves,
 * are Client Components, and they are shared with the rest of the site.
 *
 * The photograph is the OPD service page's own hero image rather than a
 * second picture of the same department: one file, and the band and the page
 * it links to look like the same place.
 */
export function FreeOpdSection({
  content,
  locale,
}: {
  content: HomeContent["content"]["freeOpd"];
  locale: Locale;
}) {
  const {
    eyebrow,
    heading,
    body,
    points,
    ctaPrimary,
    hrefPrimary,
    ctaSecondary,
    hrefSecondary,
    photo,
    photoAlt,
  } = content;

  return (
    <section
      id="free-opd"
      className="relative mt-30 overflow-hidden border-y border-[var(--home-hairline)] bg-[var(--home-surface)]"
    >
      {/* Photo first in the source, so on a phone the band opens with the
          picture and then reads down into the copy, the same order every
          other split band on this page uses. */}
      <div className="mx-auto grid max-w-[1440px] min-[900px]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="relative h-[clamp(200px,32vh,300px)] min-w-0 min-[900px]:h-auto min-[900px]:min-h-[540px]">
          <Image
            src={photo}
            alt={photoAlt}
            fill
            sizes="(min-width: 900px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 px-5 py-14 sm:px-8 lg:px-11 lg:py-24">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              {eyebrow}
            </div>
            <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(32px,4.6vw,64px)] leading-[0.95] font-extrabold tracking-[-0.04em] text-[var(--home-heading)] uppercase">
              {heading.line1}
              <br />
              {heading.line2}
            </h2>
            <p
              className="mt-6 max-w-[46ch] text-[16.5px] leading-[1.65] text-[var(--home-body)] sm:text-[17.5px]"
              style={{ textWrap: "pretty" }}
            >
              {body}
            </p>
          </Reveal>

          <RevealStagger stepMs={95} className="mt-8 grid gap-0">
            {points.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 border-t border-[var(--home-hairline)] py-3.5 text-[15px] leading-[1.5] text-[var(--home-body)]"
              >
                <span aria-hidden className="mt-px text-[var(--home-accent)]">
                  &#10003;
                </span>
                <span className="min-w-0">{point}</span>
              </div>
            ))}
          </RevealStagger>

          {/* One full-width column on phones so the two buttons read as a
              pair; inline at their own widths from `sm`. */}
          <div className="mt-9 grid gap-3 sm:flex sm:flex-wrap">
            <Link
              href={localeHref(hrefPrimary, locale)}
              className="sj-invert inline-flex items-center justify-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
            >
              {ctaPrimary} <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href={hrefSecondary}
              className="sj-invert inline-flex items-center justify-center gap-2.5 border border-[var(--home-hairline-strong)] px-6 py-4 text-[15px] font-bold text-[var(--home-heading)]"
            >
              {ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
