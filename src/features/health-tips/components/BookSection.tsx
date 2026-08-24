import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { disclaimer } from "../data/pageContent";

const actions = [
  { label: "Book a consultation", href: "/services", glyph: "→", internal: true },
  { label: "Ask on WhatsApp", href: "https://wa.me/94742223334", glyph: "→", internal: false },
  { label: "0117 84 84 84", href: "tel:+94117848484", glyph: "☎", internal: false },
];

/**
 * `#book`: the closing call to action, and the disclaimer that has to sit
 * under a page of medical advice. The disclaimer is part of the content, not
 * fine print to be trimmed: everything above it is general information.
 */
export function BookSection() {
  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-18.5 sm:px-8 min-[641px]:pt-28 lg:px-11">
      <Reveal>
        <div className="grid grid-cols-1 gap-px bg-[var(--home-hairline-strong)] min-[900px]:grid-cols-[1.15fr_0.85fr]">
          <div className="bg-[var(--home-accent)] px-11 py-13 text-[var(--home-on-accent)]">
            <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-[0.7]">
              06 / Still unsure
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase max-[899px]:text-[42px]">
              Reading is
              <br />
              not the same
              <br />
              as asking.
            </h2>
            <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.6] opacity-[0.85]">
              Nothing on this page replaces a doctor who can examine you. If something has been
              worrying you for a fortnight, book the consultation.
            </p>
          </div>

          <div className="flex flex-col bg-[var(--home-bg)]">
            {actions.map((action, index) => {
              const className = `sj-invert font-display flex flex-1 items-center justify-between gap-5 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] ${
                index < actions.length - 1 ? "border-b border-[var(--home-hairline-strong)]" : ""
              }`;

              return action.internal ? (
                <Link key={action.href} href={action.href} className={className}>
                  {action.label} <span aria-hidden>{action.glyph}</span>
                </Link>
              ) : (
                <a key={action.href} href={action.href} className={`${className} tabular-nums`}>
                  {action.label} <span aria-hidden>{action.glyph}</span>
                </a>
              );
            })}
          </div>
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
