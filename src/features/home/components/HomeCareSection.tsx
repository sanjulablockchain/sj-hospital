import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { homeCareCards } from "../data/homeCare";

/**
 * `#home-care`: the teaser for /home-care, sitting directly under the pharmacy
 * band.
 *
 * On the default background rather than a dark full-bleed panel, deliberately:
 * the pharmacy band immediately above is `#08123A`, and a second dark band
 * against it would read as one long block with a seam rather than two subjects.
 *
 * A Server Component, unlike most bands here. The others are clients only
 * because they run a parallax or a counter, and this one has no photograph to
 * move: the three cards are the content. `Reveal` and `RevealStagger` are
 * already client leaves, so nothing here needs the directive.
 *
 * Every link leaves for a page, which `teaserLinks.test.ts` pins along with the
 * three card destinations.
 */
export function HomeCareSection() {
  return (
    <section id="home-care" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal className="flex flex-wrap items-end justify-between gap-10">
        <div>
          <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
            06 / Care at home
          </div>
          <h2 className="font-display mt-4.5 text-[clamp(38px,4.6vw,70px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-[var(--home-heading)] uppercase">
            Some patients
            <br />
            cannot come in
          </h2>
        </div>
        <p
          className="max-w-[42ch] text-[17.5px] leading-[1.65] text-[var(--home-muted)]"
          style={{ textWrap: "pretty" }}
        >
          Our doctors, nurses and laboratory technicians visit your home instead, for elders,
          infants and recovery after an operation. Notes from the visit go straight onto your
          hospital file.
        </p>
      </Reveal>

      <RevealStagger
        stepMs={90}
        className="mt-11 grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[899px]:grid-cols-1"
      >
        {homeCareCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="sj-fill flex flex-col gap-3 bg-[var(--home-bg)] px-7 py-8"
          >
            <span
              className={`font-display text-[13px] font-extrabold tracking-[0.14em] tabular-nums uppercase ${
                card.accent ? "text-[var(--home-accent)]" : "text-[var(--home-accent-soft)]"
              }`}
            >
              {card.index}
            </span>
            <span className="font-display text-[27px] leading-[1.04] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {card.title}
            </span>
            <span className="text-[15px] leading-[1.55] text-[var(--home-muted)]">{card.body}</span>
            <span className="mt-auto pt-4 text-[13px] font-bold tracking-[0.12em] text-[var(--home-accent)] uppercase">
              {card.linkLabel} <span aria-hidden>&rarr;</span>
            </span>
          </Link>
        ))}
      </RevealStagger>

      <Reveal>
        <Link
          href="/home-care"
          className="sj-invert mt-8 inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
        >
          How a home visit works <span aria-hidden>&rarr;</span>
        </Link>
      </Reveal>
    </section>
  );
}
