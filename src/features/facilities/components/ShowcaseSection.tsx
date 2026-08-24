import Image from "next/image";
import Link from "next/link";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { showcaseCards } from "@/features/facilities/data/content";

/**
 * `#showcase`: four photo cards in the site's canonical card idiom, parallax
 * drift on the image, a bar wipe along the bottom edge and the body lifting on
 * hover.
 *
 * The dark navy base and pale-blue index are fixed literals rather than
 * `--home-*` tokens, matching the home and services facility cards: a
 * photograph needs a dark scrim for white text to stay legible, and that has to
 * hold in the light theme too.
 */
export function ShowcaseSection() {
  return (
    <section id="showcase" className="mx-auto max-w-[1440px] pt-30">
      <RevealStagger
        stepMs={95}
        className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4"
      >
        {showcaseCards.map((card) => {
          const isInternal = card.href.startsWith("/");

          return (
            <article
              key={card.no}
              className="group relative flex min-h-[430px] items-end overflow-hidden bg-[#08123A]"
            >
              <ParallaxLayer factor={0.05} maxOffsetPx={26} className="absolute inset-x-0 -top-[8%] h-[116%]">
                <Image
                  src={card.photo}
                  alt={card.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-[1.09] group-hover:opacity-78"
                />
              </ParallaxLayer>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(rgba(6,11,31,0.08) 30%, rgba(6,11,31,0.94) 100%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[var(--home-accent)] transition-transform duration-[450ms] group-hover:scale-x-100" />
              <div className="relative p-7 transition-transform duration-500 group-hover:-translate-y-2">
                <div className="text-[12px] font-bold tracking-[0.18em] text-[#7FCBFF] tabular-nums">
                  {card.no}
                </div>
                {/* Two lines are reserved whether the title needs them or not.
                    The cards are bottom-aligned, so without this a title that
                    wraps ("Reception & admissions") makes its body taller and
                    knocks that card's heading and paragraph out of line with
                    the other three. */}
                <h3 className="font-display mt-3 min-h-[2.12em] text-[25px] leading-[1.06] font-semibold tracking-[-0.025em] text-white">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.55] text-white/78">{card.body}</p>
                {isInternal ? (
                  <Link
                    href={card.href}
                    className="mt-3.5 inline-flex translate-y-2.5 items-center gap-2 text-[13.5px] font-bold text-[#7FCBFF] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {card.linkLabel} <span aria-hidden>&rarr;</span>
                  </Link>
                ) : (
                  <a
                    href={card.href}
                    className="mt-3.5 inline-flex translate-y-2.5 items-center gap-2 text-[13.5px] font-bold text-[#7FCBFF] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    {card.linkLabel} <span aria-hidden>&rarr;</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </RevealStagger>
    </section>
  );
}
