import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { FacilityCard } from "../data/facilities";

/**
 * The card itself is the link, not the small label inside it. Readers click the
 * photograph or the heading, and on the three photo cards the label only fades
 * in on hover, so a nested link left most of a 430px card doing nothing.
 */
export function FacilitiesSection({
  items,
  eyebrow,
  heading,
  locale,
}: {
  items: readonly FacilityCard[];
  eyebrow: string;
  heading: { line1: string; line2: string };
  locale: Locale;
}) {
  return (
    <section id="facilities" className="mx-auto max-w-[1440px] pt-30">
      <Reveal className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-11">
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          {eyebrow}
        </div>
        <h2 className="font-display mt-4.5 mb-7.5 wrap-break-word text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          {heading.line1}
          <br />
          {heading.line2}
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={95}
        className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4"
      >
        {items.map((card) =>
          card.accent ? (
            <Link
              key={card.index}
              href={localeHref(card.href, locale)}
              className="group relative flex min-h-[430px] flex-col justify-end overflow-hidden bg-[var(--home-accent)] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--home-on-accent)]"
            >
              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[var(--home-on-accent)] transition-transform duration-[450ms] group-hover:scale-x-100" />
              <div className="relative p-7 text-[var(--home-on-accent)] transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-[12px] font-bold tracking-[0.18em] opacity-65">{card.index}</div>
                <h3 className="font-display mt-3 wrap-break-word text-[26px] leading-[1.06] font-semibold tracking-[-0.025em]">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.55] opacity-82">{card.body}</p>
                <span className="mt-4.5 inline-flex items-center gap-2 border-b border-[var(--home-on-accent)]/40 pb-0.5 text-[14px] font-bold">
                  {card.linkLabel} <span aria-hidden>&rarr;</span>
                </span>
              </div>
            </Link>
          ) : (
            <Link
              key={card.index}
              href={localeHref(card.href, locale)}
              className="group relative flex min-h-[430px] items-end overflow-hidden bg-[#08123A] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[var(--home-accent)]"
            >
              {card.photo && (
                // Taller than the card so the drift never exposes an edge.
                <ParallaxLayer
                  factor={0.05}
                  maxOffsetPx={26}
                  className="absolute inset-x-0 -top-[8%] h-[116%]"
                >
                  <Image
                    src={card.photo}
                    alt={card.photoAlt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-[1.09] group-hover:opacity-78"
                  />
                </ParallaxLayer>
              )}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(rgba(6,11,31,0.08) 30%, rgba(6,11,31,0.94) 100%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[var(--home-accent)] transition-transform duration-[450ms] group-hover:scale-x-100" />
              <div className="relative p-7 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-[12px] font-bold tracking-[0.18em] text-[#7FCBFF]">{card.index}</div>
                <h3 className="font-display mt-3 wrap-break-word text-[26px] leading-[1.06] font-semibold tracking-[-0.025em] text-white">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.55] text-white/78">{card.body}</p>
                {/* Below 1024px there is no hover to reveal it, so the label
                    stays put rather than never showing at all. */}
                <span className="mt-3.5 inline-flex translate-y-2.5 items-center gap-2 text-[13.5px] font-bold text-[#7FCBFF] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-[1023px]:translate-y-0 max-[1023px]:opacity-100">
                  {card.linkLabel} <span aria-hidden>&rarr;</span>
                </span>
              </div>
            </Link>
          )
        )}
      </RevealStagger>
    </section>
  );
}
