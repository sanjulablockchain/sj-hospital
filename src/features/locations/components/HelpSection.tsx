import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { LocationsContent } from "../data/getContent";

/**
 * `#help`: the accent panel for a reader who does not know which hospital to
 * go to, and the four rows that each invert on hover. The same shape as the
 * contact rails on school-wellness and network, so it reads as the site's
 * own closing band rather than a new pattern.
 *
 * `sj-invert` is the shared utility for that hover, so the light theme
 * inverts to its own pair. `min-w-0` on the text cluster and `minmax(0, ...)`
 * on both grid tracks are the same overflow fixes the other rails needed for
 * a long Sinhala or Tamil label at 360px.
 */
export function HelpSection({ content }: { content: LocationsContent }) {
  const { contactRows, helpBody, helpHeading, sectionEyebrows } = content;
  return (
    <section
      id="help"
      className="mx-auto max-w-[1440px] scroll-mt-[calc(var(--sj-header-h)+16px)] px-5 pt-24 pb-24 sm:px-8 lg:px-11 max-[640px]:pt-16 max-[640px]:pb-16"
    >
      <Reveal className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-8 py-11 text-[var(--home-on-accent)] sm:px-11 sm:py-13">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
            {sectionEyebrows.help}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            {helpHeading.line1}
            <br />
            {helpHeading.line2}
          </h2>
          <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">{helpBody}</p>
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
                    <span className="whitespace-nowrap font-normal tabular-nums opacity-70">{row.value}</span>
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
                {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={rowClassName}
              >
                {label}
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
