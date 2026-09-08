import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { InternationalCareContent } from "../data/getContent";

/**
 * Shared by all four rows. The hover is the reference's own pair, background
 * and text only: `sj-invert` would be the obvious utility, but it also flips
 * `border-color`, which on these rows would turn the hairline between them
 * white on hover.
 */
const ROW =
  "font-display flex flex-1 items-center justify-between gap-5 px-8 py-6.5 text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] transition-colors duration-[250ms] hover:bg-[var(--home-invert-bg)] hover:text-[var(--home-invert-fg)]";

/**
 * `#enquiry`: the closing call to action, an accent panel beside a stack of
 * contact rows that each invert on hover.
 *
 * The heading drops to a fixed 42px below 900px rather than staying on its
 * clamp, matching the reference's `[data-r="ctahead"]` rule: at 5vw the three
 * lines start colliding with the panel's own padding on a tablet.
 *
 * The last row is a next/link to the services directory, since that is an
 * internal route; the three above it are mail, WhatsApp and telephone, which
 * are not.
 *
 * `enquiryContactRows[2]` used to carry the hospital's own phone number as its
 * whole `label`, with no separate translatable action phrase, so it rendered
 * as bare digits in every language including English: the same A2 trap
 * `contact`, `accommodation` and `network` each had to fix. The row now has
 * both a `label` ("Call the desk") and a `value` (the number), and `min-w-0`
 * on the text cluster (rather than relying on `whitespace-nowrap` alone) is
 * the same fix `network`'s own `ContactSection` needed: without it this flex
 * row has only the glyph to share space with, so a long Sinhala or Tamil
 * `label` pushes the whole row past a 360px viewport instead of wrapping.
 */
export function EnquirySection({
  content,
  locale,
}: {
  content: InternationalCareContent;
  locale: Locale;
}) {
  const { enquiryBrowseCta, enquiryChips, enquiryContactRows, enquiryHeading, enquiryIntro, sectionEyebrows } =
    content;
  return (
    <section
      id="enquiry"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal>
        <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
          <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)]">
            <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
              {sectionEyebrows.enquiry}
            </div>
            <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
              {enquiryHeading.line1}
              <br />
              {enquiryHeading.line2}
              <br />
              {enquiryHeading.line3}
            </h2>
            <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">{enquiryIntro}</p>
            <ul className="mt-6.5 flex flex-wrap gap-2.5 text-[13.5px] font-bold">
              {enquiryChips.map((chip) => (
                <li key={chip} className="border border-[var(--home-on-accent)]/30 px-3.75 py-2.5">
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col bg-[var(--home-bg)]">
            {enquiryContactRows.map((row) => (
              <a
                key={row.href}
                href={row.href}
                className={`${ROW} border-b border-[var(--home-hairline)] ${
                  row.glyph === "phone" ? "tabular-nums" : ""
                }`}
              >
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
              </a>
            ))}
            <Link href={localeHref("/services", locale)} className={ROW}>
              {enquiryBrowseCta}
              <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
