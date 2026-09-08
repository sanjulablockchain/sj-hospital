import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { Service } from "@/features/services/types";
import type { ServicesContent } from "@/features/services/data/getContent";

/**
 * `#book`: the detail page's closing call to action, and the target the
 * hero's CTA and the site header's "Book now" button both already point at
 * on all 36 detail pages. Mirrors the index page's `BookSection` (same
 * accent plate, phone number and contact link, both reused from
 * `content.indexContent` rather than duplicated here), but the heading is
 * built from this service's own `cta` rather than generic copy (via the
 * `{cta}` token in `detailChrome.bookHeading`), and the ghost link returns
 * to `/services` (there is no on-page directory to return to here, unlike
 * the index page's `#directory`).
 */
export function DetailBookSection({ service, content }: { service: Service; content: ServicesContent }) {
  const { bookSection, phoneNumber, detailChrome } = content.indexContent;
  const heading = detailChrome.bookHeading.replace("{cta}", service.cta);

  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-30 pb-4 sm:px-8 lg:px-11">
      <Reveal className="bg-[var(--home-accent)] px-9 py-16 text-center text-[var(--home-on-accent)] sm:px-14 sm:py-20">
        <h2 className="font-display wrap-break-word mx-auto max-w-[22ch] text-[clamp(36px,5vw,68px)] leading-[0.94] font-extrabold tracking-[-0.035em] uppercase">
          {heading}
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <LocaleLink
            href="/contact-us"
            className="inline-flex items-center gap-2.5 bg-[var(--home-on-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-accent)] transition-opacity duration-300 hover:opacity-90"
          >
            {bookSection.contactCta} <span aria-hidden>&rarr;</span>
          </LocaleLink>
          <a
            href="tel:+94117848484"
            className="inline-flex items-center gap-2.5 border border-[var(--home-on-accent)]/40 px-6 py-4 text-[15px] font-bold tabular-nums"
          >
            {phoneNumber} <span aria-hidden>&#9742;</span>
          </a>
        </div>
        <LocaleLink
          href="/services"
          className="mt-7 inline-flex items-center gap-2 border-b border-[var(--home-on-accent)]/40 pb-0.5 text-[14px] font-bold opacity-80"
        >
          {detailChrome.backToServices} <span aria-hidden>&rarr;</span>
        </LocaleLink>
      </Reveal>
    </section>
  );
}
