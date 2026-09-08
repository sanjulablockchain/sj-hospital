import { LocaleLink } from "@/components/i18n/LocaleLink";
import { Reveal } from "@/components/ui/Reveal";
import type { CareerContent } from "../data/getContent";

/**
 * `#apply`: the closing accent panel, the four ways to reach the hospital, and
 * the equal opportunity notice.
 *
 * Laid out like `/network`'s `#contact`, which the reference draws the same
 * way: an accent slab beside a column of rows that each invert on hover via
 * the shared `sj-invert`, so the light theme inverts to its own pair rather
 * than to the reference's hard-coded `#F2F6FF`.
 *
 * The one internal row (`/network#family`) goes through `LocaleLink` rather
 * than a plain `<a>`, the same fix `network`'s own `ContactSection` needed, so
 * a translated reader stays in the language they are already reading; the
 * other rows are `mailto:`, `tel:` and an external site, which stay plain
 * anchors. The phone row's `label` used to be the bare number with no action
 * phrase, so it rendered as digits with no translatable text in every
 * language including English; `label` is now "Call us" and `value` carries
 * the number, matching `network`'s own fix to the same shape.
 */
export function ApplySection({ content }: { content: CareerContent }) {
  const { applyChecklist, applyRows, equalOpportunity, applyHeading, applyBody, sectionEyebrows } = content;
  return (
    <section
      id="apply"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="min-w-0 bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)] max-[640px]:px-6 max-[640px]:py-9">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
            {sectionEyebrows.apply}
          </div>
          <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            {applyHeading.line1}
            <br />
            {applyHeading.line2}
            <br />
            {applyHeading.line3}
          </h2>
          <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">{applyBody}</p>
          <ul className="mt-6.5 flex flex-wrap gap-2.5 text-[13.5px] font-bold">
            {applyChecklist.map((item) => (
              <li key={item} className="border border-[currentColor]/30 px-3.75 py-2.5">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col bg-[var(--home-bg)]">
          {applyRows.map((row, index) => {
            const rowClassName = `sj-invert font-display flex flex-1 items-center justify-between gap-5 px-8 py-6.5 text-[21px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] max-[640px]:px-6 ${
              index === applyRows.length - 1 ? "" : "border-b border-[var(--home-hairline)]"
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
                  <span className="min-w-0 wrap-break-word">{row.label}</span>
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
          {equalOpportunity}
        </p>
      </Reveal>
    </section>
  );
}
