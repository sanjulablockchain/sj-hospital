import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { FacilitiesContent } from "../data/getContent";

/**
 * `#book`: the closing invitation, built to the reference.
 *
 * The left panel is a solid accent block carrying ink-dark type, the page's
 * only fully filled panel, which is what makes it read as the finish. The right
 * is three equal-height rows on the page background, each filling with the
 * inverted pair on hover so the whole row lights up rather than just its label.
 *
 * The accent panel needs no fixed-dark literals: --home-accent and
 * --home-on-accent are already a matched contrast pair in both themes, so the
 * block flips with the site.
 *
 * The phone row used to carry the hospital's own number as its whole label,
 * with no separate action phrase, so it rendered as bare digits with no
 * translatable text at all, in every language including English, the same bug
 * `contact`'s, `accommodation`'s, `home-care`'s, `pharmacy`'s, `network`'s and
 * `school-wellness`'s own contact rows had; see `contactRows` in
 * data/content.ts. `min-w-0` on the text cluster is the same fix those rows
 * needed: without it this flex row has only the glyph to share space with, so
 * a long Sinhala or Tamil label pushes the whole row wider than the viewport
 * rather than wrapping.
 *
 * The first row is the one internal route ("Reserve a room"), so it goes
 * through `LocaleLink` rather than the plain `<a>` the other rows use, keeping
 * a reader in the language they are already reading; the other rows are an
 * external WhatsApp link and a `tel:` link.
 */
export function BookSection({ content }: { content: FacilitiesContent }) {
  const { bookHeading, bookIntro, contactRows, sectionEyebrows } = content;
  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="bg-[var(--home-accent)] p-8 text-[var(--home-on-accent)] min-[900px]:px-11 min-[900px]:py-13">
            <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
              {sectionEyebrows.book}
            </div>
            <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase">
              {bookHeading.line1}
              <br />
              {bookHeading.line2}
              <br />
              {bookHeading.line3}
            </h2>
            <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.6] opacity-85">{bookIntro}</p>
          </div>

          <div className="flex flex-col bg-[var(--home-bg)]">
            {contactRows.map((row, index) => {
              const className = `sj-invert flex flex-1 items-center justify-between gap-5 px-8 py-7 font-display text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] min-[900px]:text-[25px] ${
                index < contactRows.length - 1 ? "border-b border-[var(--home-hairline)]" : ""
              } ${row.glyph === "phone" ? "tabular-nums" : ""}`;
              const glyph = row.glyph === "phone" ? "☎" : "→";
              const label = row.value ? (
                <span className="flex min-w-0 flex-wrap items-baseline gap-x-2.5">
                  <span className="wrap-break-word min-w-0">{row.label}</span>
                  <span className="whitespace-nowrap font-normal tabular-nums opacity-70">{row.value}</span>
                </span>
              ) : (
                <span className="wrap-break-word min-w-0">{row.label}</span>
              );

              return row.internal ? (
                <LocaleLink key={row.href} href={row.href} className={className}>
                  {label} <span aria-hidden>{glyph}</span>
                </LocaleLink>
              ) : (
                <a key={row.href} href={row.href} className={className}>
                  {label} <span aria-hidden>{glyph}</span>
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
