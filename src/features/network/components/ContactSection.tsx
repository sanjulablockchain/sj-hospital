import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { NetworkContent } from "../data/getContent";

/**
 * `#contact`: the accent panel and four rows that each invert on hover, then
 * the rights notice for the third-party marks used on this page.
 *
 * `sj-invert` is the shared utility for that hover, so the light theme inverts
 * to its own pair rather than to the reference's hard-coded `#F2F6FF`.
 *
 * The last row is the one internal route, so it goes through `LocaleLink`
 * rather than the plain `<a>` the other rows use, keeping a reader in the
 * language they are already reading (see `row.internal` on `ContactRow`); the
 * other rows are `tel:`, `mailto:` and an external site.
 *
 * The phone row used to carry the hospital's own number as its whole `label`,
 * with no separate action phrase, so it rendered as bare digits with no
 * translatable text at all, in every language including English. The number
 * now lives in `value`, and `min-w-0` on the text cluster (rather than relying
 * on `whitespace-nowrap` alone) is the same fix `contact`'s, `accommodation`'s,
 * `home-care`'s and `pharmacy`'s own contact rows needed: without it this flex
 * row has only the glyph to share space with, so a nowrap value on a long
 * Sinhala or Tamil `label` pushed the whole row (and the page) wider than the
 * viewport rather than wrapping.
 */
export function ContactSection({ content }: { content: NetworkContent }) {
  const { contactEyebrow, contactHeading, contactIntro, contactRows, disclaimer } = content;
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      {/* `minmax(0, ...)` on both tracks: a bare `fr` track cannot shrink
          below its content's intrinsic width, and Sinhala/Tamil form long
          unbreakable tokens where English would have a space, so without
          this the grid (and the page) overflows a 360px viewport. */}
      <Reveal className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)]">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
            {contactEyebrow}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            {contactHeading.line1}
            <br />
            {contactHeading.line2}
            <br />
            {contactHeading.line3}
          </h2>
          <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">{contactIntro}</p>
        </div>

        <div className="flex flex-col bg-[var(--home-bg)]">
          {contactRows.map((row, index) => {
            const rowClassName = `sj-invert font-display flex flex-1 items-center justify-between gap-5 px-8 py-6.5 text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] ${
              index === contactRows.length - 1 ? "" : "border-b border-[var(--home-hairline)]"
            } ${row.glyph === "phone" ? "tabular-nums" : ""}`;
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
                  <span className="min-w-0">{row.label}</span>
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
          {disclaimer}
        </p>
      </Reveal>
    </section>
  );
}
