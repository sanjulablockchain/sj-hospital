import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { ServicesContent } from "@/features/services/data/getContent";

/**
 * `#book`: the page's closing call to action. Kept to what the brief asks
 * for: a heading, a short paragraph, the hospital's phone number, a primary
 * link to `/contact-us` and a ghost link back into the directory, rather
 * than the home page's larger three-link `ContactCtaSection`.
 *
 * `phoneNumber` (from `indexContent.ts`) is the hospital's own switchboard
 * number, a fact, and never translated; the `tel:` href it also feeds is a
 * separate literal that must stay in step with it by hand.
 */
export function BookSection({ content }: { content: ServicesContent }) {
  const { bookSection, phoneNumber } = content.indexContent;

  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-30 pb-4 sm:px-8 lg:px-11">
      <Reveal
        className="bg-[var(--home-accent)] px-9 py-16 text-center text-[var(--home-on-accent)] sm:px-14 sm:py-20"
      >
        <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">{bookSection.eyebrow}</div>
        <h2 className="font-display wrap-break-word mx-auto mt-4.5 max-w-[20ch] text-[clamp(36px,5vw,68px)] leading-[0.94] font-extrabold tracking-[-0.035em] uppercase">
          {bookSection.heading}
        </h2>
        <p className="mx-auto mt-5.5 max-w-[52ch] text-[17px] leading-[1.6] opacity-85">{bookSection.body}</p>
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
        <a
          href="#directory"
          className="mt-7 inline-flex items-center gap-2 border-b border-[var(--home-on-accent)]/40 pb-0.5 text-[14px] font-bold opacity-80"
        >
          {bookSection.browseServices} <span aria-hidden>&rarr;</span>
        </a>
      </Reveal>
    </section>
  );
}
