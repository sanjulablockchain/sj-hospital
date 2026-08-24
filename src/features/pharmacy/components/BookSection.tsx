import { Reveal } from "@/components/ui/Reveal";

const actions = [
  { href: "https://wa.me/94742223334", label: "Send a prescription", glyph: "→" },
  { href: "tel:+94742223334", label: "074 222 333 4", glyph: "☎", numeric: true },
  { href: "/services", label: "All services", glyph: "→" },
];

/**
 * `#book`: the closing call to action. An accent panel carrying the address,
 * against three full-height rows that each invert on hover.
 *
 * The accent panel keeps `--home-accent` / `--home-on-accent` rather than a
 * literal, so it darkens correctly in the light theme where the rest of the
 * page does.
 */
export function BookSection() {
  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-28 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <Reveal className="grid grid-cols-[1.15fr_0.85fr] gap-0.5 bg-[var(--home-hairline)] max-[899px]:grid-cols-1">
        <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)] max-[640px]:px-6 max-[640px]:py-9">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
            08 / Start here
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
            Open right
            <br />
            now. Yes,
            <br />
            right now.
          </h2>
          <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.6] opacity-85">
            Ground floor at 229/10 St. Joseph Street, Negombo. Walk up to the counter, call, or send your
            prescription on WhatsApp.
          </p>
        </div>

        <div className="flex flex-col bg-[var(--home-bg)]">
          {actions.map((action, index) => (
            <a
              key={action.href}
              href={action.href}
              className={`font-display flex flex-1 items-center justify-between gap-5 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] transition-colors hover:bg-[var(--home-invert-bg)] hover:text-[var(--home-invert-fg)] max-[640px]:px-6 max-[640px]:text-[21px] ${
                index < actions.length - 1 ? "border-b border-[var(--home-hairline)]" : ""
              } ${action.numeric ? "tabular-nums" : ""}`}
            >
              {action.label}{" "}
              <span aria-hidden>{action.glyph}</span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
