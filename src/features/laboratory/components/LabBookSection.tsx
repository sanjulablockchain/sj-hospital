import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { LaboratoryContent } from "../data/getContent";

/**
 * `#book`: the closing call to action, in the pharmacy page's pattern: an
 * accent panel with the address against full height rows that invert on
 * hover. The one internal route goes through `LocaleLink`; the phone row
 * stays a plain `<a>`.
 */
export function LabBookSection({ content }: { content: LaboratoryContent }) {
  const { bookActions, bookHeading, bookIntro, sectionEyebrows } = content;
  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-0.5 bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)] max-[640px]:px-6 max-[640px]:py-9">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">{sectionEyebrows.book}</div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            {bookHeading.line1}
            <br />
            {bookHeading.line2}
            <br />
            {bookHeading.line3}
          </h2>
          <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.6] opacity-85">{bookIntro}</p>
        </div>

        <div className="flex flex-col bg-[var(--home-bg)]">
          {bookActions.map((action, index) => {
            const rowClassName = `font-display flex flex-1 items-center justify-between gap-5 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] transition-colors hover:bg-[var(--home-invert-bg)] hover:text-[var(--home-invert-fg)] max-[640px]:px-6 max-[640px]:text-[21px] ${
              index < bookActions.length - 1 ? "border-b border-[var(--home-hairline)]" : ""
            } ${action.glyph === "phone" ? "tabular-nums" : ""}`;
            const label = (
              <>
                {action.value ? (
                  <span className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                    <span>{action.label}</span>
                    <span className="whitespace-nowrap font-normal tabular-nums opacity-70">{action.value}</span>
                  </span>
                ) : (
                  <span className="min-w-0">{action.label}</span>
                )}
                <span aria-hidden className="shrink-0">
                  {action.glyph === "phone" ? "☎" : "→"}
                </span>
              </>
            );
            return action.internal ? (
              <LocaleLink key={action.href} href={action.href} className={rowClassName}>
                {label}
              </LocaleLink>
            ) : (
              <a key={action.href} href={action.href} className={rowClassName}>
                {label}
              </a>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
