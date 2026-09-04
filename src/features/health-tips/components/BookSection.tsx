import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { HealthTipsContent } from "../data/getContent";

/**
 * `#book`: the closing call to action, and the disclaimer that has to sit
 * under a page of medical advice. The disclaimer is part of the content, not
 * fine print to be trimmed: everything above it is general information.
 *
 * `pageContent` arrives as a prop, already localized, rather than being
 * imported here. Only the first action is internal (a route on this site),
 * so it alone goes through `LocaleLink`; the other two are an external
 * WhatsApp link and a `tel:` link, which stay plain `<a>` tags.
 */
export function BookSection({ pageContent }: { pageContent: HealthTipsContent["pageContent"] }) {
  const { bookSection, disclaimer } = pageContent;

  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-18.5 sm:px-8 min-[641px]:pt-28 lg:px-11">
      <Reveal>
        <div className="grid grid-cols-1 gap-px bg-[var(--home-hairline-strong)] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="min-w-0 bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)]">
            <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-[0.7]">
              {bookSection.eyebrow}
            </div>
            <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
              {bookSection.heading.line1}
              <br />
              {bookSection.heading.line2}
              <br />
              {bookSection.heading.line3}
            </h2>
            <p className="mt-5.5 max-w-[40ch] wrap-break-word text-[17px] leading-[1.6] opacity-[0.85]">
              {bookSection.body}
            </p>
          </div>

          <div className="flex flex-col bg-[var(--home-bg)]">
            {bookSection.actions.map((action, index) => {
              const className = `sj-invert font-display flex flex-1 min-w-0 items-center justify-between gap-5 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] ${
                index < bookSection.actions.length - 1 ? "border-b border-[var(--home-hairline-strong)]" : ""
              }`;
              const glyph = action.glyph === "phone" ? "☎" : "→";
              const label = <span className="wrap-break-word min-w-0">{action.label}</span>;

              return action.internal ? (
                <LocaleLink key={action.href} href={action.href} className={className}>
                  {label} <span aria-hidden>{glyph}</span>
                </LocaleLink>
              ) : (
                <a key={action.href} href={action.href} className={className}>
                  {label} <span aria-hidden>{glyph}</span>
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p className="mt-4.5 max-w-[84ch] wrap-break-word text-[13.5px] leading-[1.6] text-[var(--home-muted)]">
          {disclaimer}
        </p>
      </Reveal>
    </section>
  );
}
