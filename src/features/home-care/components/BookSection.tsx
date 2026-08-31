import { Reveal } from "@/components/ui/Reveal";
import { contactRows } from "../data/content";

/**
 * `#book`: the accent panel and the contact rows that each invert on hover.
 *
 * `sj-invert` is the shared utility for that hover, so the light theme inverts
 * to its own pair rather than to a hard-coded dark blue.
 *
 * The last row is a route rather than a phone number or a mailbox, and is left
 * as a plain `<a>` alongside the others: the rail is a single list of ways to
 * reach the hospital, and swapping one row for a `Link` would give it different
 * focus and hover behaviour from its neighbours for no reader-visible gain.
 *
 * The closing note is the one line here worth keeping exactly as it is. A home
 * visit is arranged by appointment, so a reader in an emergency has to be sent
 * somewhere else, and this is the last chance the page has to say so.
 */
export function BookSection() {
  return (
    <section
      id="book"
      className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal className="grid grid-cols-[1.15fr_0.85fr] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)] max-[640px]:px-7">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
            08 / Request a visit
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            Tell us who
            <br />
            needs to be
            <br />
            seen.
          </h2>
          <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">
            Call the hospital, say who the visit is for and why, and have the hospital file number to
            hand if there is one. Mention it if a sample is likely to be needed, so the right person
            is on the vehicle.
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
          Home visits are arranged by appointment and are not an emergency service. In an emergency,
          call the hospital or come straight to accident and emergency, which is open at every hour.
        </p>
      </Reveal>
    </section>
  );
}
