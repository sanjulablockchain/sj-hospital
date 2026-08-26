import { Reveal } from "@/components/ui/Reveal";
import { applyChecklist, applyRows, equalOpportunity } from "../data/content";

/**
 * `#apply`: the closing accent panel, the four ways to reach the hospital, and
 * the equal opportunity notice.
 *
 * Laid out like `/network`'s `#contact`, which the reference draws the same
 * way: an accent slab beside a column of rows that each invert on hover via
 * the shared `sj-invert`, so the light theme inverts to its own pair rather
 * than to the reference's hard-coded `#F2F6FF`.
 */
export function ApplySection() {
  return (
    <section
      id="apply"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal className="grid grid-cols-[1.15fr_0.85fr] gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)] max-[640px]:px-6 max-[640px]:py-9">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
            09 / Apply
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            Send it in.
            <br />
            You will hear
            <br />
            from us.
          </h2>
          <p className="mt-5.5 max-w-[44ch] text-[17px] leading-[1.6] opacity-85">
            Use the form above, or email your CV with the role in the subject line. Put your
            registration number and available start date at the top: it saves a round of emails.
          </p>
          <ul className="mt-6.5 flex flex-wrap gap-2.5 text-[13.5px] font-bold">
            {applyChecklist.map((item) => (
              <li key={item} className="border border-[currentColor]/30 px-3.75 py-2.5">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col bg-[var(--home-bg)]">
          {applyRows.map((row, index) => (
            <a
              key={row.href}
              href={row.href}
              {...(row.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className={`sj-invert font-display flex flex-1 items-center justify-between gap-5 px-8 py-6.5 text-[21px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] max-[640px]:px-6 ${
                index === applyRows.length - 1 ? "" : "border-b border-[var(--home-hairline)]"
              } ${row.glyph === "phone" ? "tabular-nums" : ""}`}
            >
              {row.label} <span aria-hidden>{row.glyph === "phone" ? "☎" : "→"}</span>
            </a>
          ))}
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
