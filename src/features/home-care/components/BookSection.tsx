import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeCareContent } from "../data/getContent";

/**
 * `#book`: the accent panel and the contact rows that each invert on hover.
 *
 * `sj-invert` is the shared utility for that hover, so the light theme inverts
 * to its own pair rather than to a hard-coded dark blue.
 *
 * The last row is a route rather than a phone number or a mailbox: it goes
 * through `LocaleLink` rather than the plain `<a>` the other rows use, so a
 * reader following it keeps the language they are already reading, while the
 * phone, WhatsApp and email rows stay untouched by locale (see `row.internal`
 * on `ContactRow`).
 *
 * The closing note is the one line here worth keeping exactly as it is. A home
 * visit is arranged by appointment, so a reader in an emergency has to be sent
 * somewhere else, and this is the last chance the page has to say so.
 */
export function BookSection({ content }: { content: HomeCareContent }) {
  const { bookHeading, bookIntro, contactRows, emergencyNote, sectionEyebrows } = content;
  return (
    <section
      id="book"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      {/* `minmax(0, ...)` on both tracks: a plain `fr` track cannot shrink below
          its content's intrinsic width, and Sinhala/Tamil form long
          unbreakable tokens where English would have a space, so without this
          the grid (and the page) overflows a 360px viewport. */}
      <Reveal className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)] max-[640px]:px-7">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
            {sectionEyebrows.book}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            {bookHeading.line1}
            <br />
            {bookHeading.line2}
            <br />
            {bookHeading.line3}
          </h2>
          <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">{bookIntro}</p>
        </div>

        <div className="flex flex-col bg-[var(--home-bg)]">
          {contactRows.map((row, index) => {
            const rowClassName = `sj-invert font-display flex flex-1 items-center justify-between gap-5 px-8 py-6.5 text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] ${
              index === contactRows.length - 1 ? "" : "border-b border-[var(--home-hairline)]"
            } ${row.glyph === "phone" ? "tabular-nums" : ""}`;
            // `min-w-0` on the text cluster, not `whitespace-nowrap` alone on
            // `row.value`: without it this flex row has only one other item
            // (the glyph) to share space with, so a nowrap value on a long
            // Sinhala/Tamil label pushed the whole row (and the page) wider
            // than the viewport rather than wrapping, the same flex-shrink
            // trap Step E2 of the i18n recipe names for a heading group.
            // `whitespace-nowrap` still guards `row.value` itself, so the
            // phone number can drop to its own line under the label but
            // never breaks apart mid-number.
            const label = (
              <>
                {row.value ? (
                  <span className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                    <span>{row.label}</span>
                    <span className="whitespace-nowrap font-normal tabular-nums opacity-70">
                      {row.value}
                    </span>
                  </span>
                ) : (
                  row.label
                )}
                <span aria-hidden className="shrink-0">
                  {row.glyph === "phone" ? "☎" : "→"}
                </span>
              </>
            );
            return row.internal ? (
              <LocaleLink key={row.href} href={row.href} className={rowClassName}>
                {label}
              </LocaleLink>
            ) : (
              <a
                key={row.href}
                href={row.href}
                {...(row.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                className={rowClassName}
              >
                {label}
              </a>
            );
          })}
        </div>
      </Reveal>

      <Reveal>
        <p className="mt-4.5 max-w-[84ch] text-[13.5px] leading-[1.6] text-[var(--home-muted)]">
          {emergencyNote}
        </p>
      </Reveal>
    </section>
  );
}
