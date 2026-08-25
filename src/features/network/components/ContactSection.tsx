import { Reveal } from "@/components/ui/Reveal";
import { contactRows, disclaimer } from "../data/content";

/**
 * `#contact`: the accent panel and four rows that each invert on hover, then
 * the rights notice for the third-party marks used on this page.
 *
 * `sj-invert` is the shared utility for that hover, so the light theme inverts
 * to its own pair rather than to the reference's hard-coded `#F2F6FF`.
 *
 * The last row is an internal route, so it is a plain anchor like the rest: the
 * others are `tel:`, `mailto:` and an external site, and mixing next/link in
 * for one of four would make the row list read inconsistently for no gain.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal className="grid grid-cols-[1.15fr_0.85fr] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)]">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
            05 / Get in touch
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            Wherever
            <br />
            in the network
            <br />
            you start.
          </h2>
          <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">
            Patients, partner hospitals, insurers and institutions looking to work with the group:
            reach the hospital directly and we will route you to the right company.
          </p>
        </div>

        <div className="flex flex-col bg-[var(--home-bg)]">
          {contactRows.map((row, index) => (
            <a
              key={row.href}
              href={row.href}
              {...(row.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className={`sj-invert font-display flex flex-1 items-center justify-between gap-5 px-8 py-6.5 text-[22px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] ${
                index === contactRows.length - 1 ? "" : "border-b border-[var(--home-hairline)]"
              } ${row.glyph === "phone" ? "tabular-nums" : ""}`}
            >
              {row.label} <span aria-hidden>{row.glyph === "phone" ? "☎" : "→"}</span>
            </a>
          ))}
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
