import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { desk, MEDIA_EMAIL, SWITCHBOARD, SWITCHBOARD_TEL } from "../data/content";

/**
 * `#press`: the full-bleed dark band, fixed-dark in both themes because it sits
 * on a photograph, in the same way the international desk band is.
 *
 * The photograph is the building at dusk, drifting behind a left-to-right scrim
 * at 24% so the copy stays the subject.
 *
 * The left column sticks while the eight desk cards scroll past it, and goes
 * static below 900px where the grid is a single column and there is nothing
 * left to stick beside.
 */
export function PressDeskSection() {
  return (
    <section id="press" className="relative mt-26 overflow-hidden bg-[#08123A]">
      <ParallaxLayer
        factor={0.12}
        maxOffsetPx={80}
        className="pointer-events-none absolute inset-x-0 -top-[10%] h-[120%]"
      >
        <Image
          src="/images/hero-exterior.png"
          alt=""
          aria-hidden
          fill
          className="object-cover opacity-24"
          sizes="100vw"
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #060B1F 4%, rgba(6,11,31,0.9) 55%, rgba(6,11,31,0.78) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-23 sm:px-8 lg:px-11">
        <div className="grid items-start gap-14.5 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] max-[899px]:gap-10">
          <Reveal className="min-[900px]:sticky min-[900px]:top-10">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              02 / Press desk
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.6vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              One number,
              <br />
              one inbox,
              <br />
              no runaround
            </h2>
            <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.65] text-white/78">
              Corporate Communications is staffed on weekdays from 8am to 5pm, with a duty phone for
              breaking stories outside those hours. We will tell you when we cannot comment, and
              why, rather than going quiet.
            </p>
            <div className="mt-6.5 flex flex-col items-start gap-3">
              <a
                href={`mailto:${MEDIA_EMAIL}`}
                className="sj-invert inline-flex items-center gap-2.5 bg-[#2CA6F0] px-5.5 py-3.75 text-[14.5px] font-bold text-[#04122B]"
              >
                {MEDIA_EMAIL}
              </a>
              <a
                href={`tel:${SWITCHBOARD_TEL}`}
                className="inline-flex items-center gap-2.5 border border-white/30 px-5.5 py-3.75 text-[14.5px] font-bold text-white tabular-nums transition-colors hover:bg-white hover:text-[#060B1F]"
              >
                {SWITCHBOARD}, ask for Communications
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-px bg-white/18 max-[899px]:grid-cols-1">
            {desk.map((card) => (
              <Reveal key={card.title} className="h-full">
                <div className="h-full bg-[#08123A] px-6 pt-6.5 pb-7">
                  <div className="text-[11.5px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
                    {card.kind}
                  </div>
                  <h3 className="font-display mt-3 text-[22px] leading-[1.1] font-semibold tracking-[-0.025em] text-white">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-white/70">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
