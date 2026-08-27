import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { deskServices } from "../data/content";

/**
 * `#services`: the full-bleed dark band, fixed-dark in both themes because it
 * sits on a photograph, in the same way the facilities theatre band is.
 *
 * The photograph is a ward round with the family at the bedside, which is the
 * thing this section is actually about, drifting behind a left-to-right scrim
 * at 20% so the copy stays the subject.
 *
 * The left column sticks while the ten service cards scroll past it, and goes
 * static below 900px where the grid is a single column and there is nothing
 * left to stick beside.
 *
 * No desk hours or floor are stated: the hospital publishes neither, and the
 * reference's "beside the main lobby, staffed 7am to 9pm with a duty number"
 * is not backed anywhere in this repo.
 */
export function DeskSection() {
  return (
    <section id="services" className="relative mt-26 overflow-hidden bg-[#08123A]">
      <ParallaxLayer
        factor={0.12}
        maxOffsetPx={80}
        className="pointer-events-none absolute inset-x-0 -top-[10%] h-[120%]"
      >
        <Image
          src="/images/international/ward-round.jpg"
          alt=""
          aria-hidden
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #060B1F 4%, rgba(6,11,31,0.9) 55%, rgba(6,11,31,0.76) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-23 sm:px-8 lg:px-11">
        <div className="grid items-start gap-14.5 min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] max-[899px]:gap-10">
          <Reveal className="min-[900px]:sticky min-[900px]:top-10">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              02 / What the desk handles
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(36px,4.6vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              Everything
              <br />
              except the
              <br />
              flight
            </h2>
            <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.65] text-white/78">
              One desk carries the transfer, the estimate, the insurance paperwork, the interpreter
              and the records you leave with. Ask for the international desk at the main entrance, or
              write ahead and it is arranged before you land.
            </p>
            <a
              href="mailto:appointments@sjhospital.lk"
              className="sj-invert mt-6.5 inline-flex w-fit items-center gap-2.5 bg-[#2CA6F0] px-5.5 py-3.75 text-[14.5px] font-bold text-[#04122B]"
            >
              appointments@sjhospital.lk
            </a>
          </Reveal>

          <div className="grid grid-cols-2 gap-px bg-white/18 max-[899px]:grid-cols-1">
            {deskServices.map((service) => (
              <Reveal key={service.title} className="h-full">
                <div className="h-full bg-[#08123A] px-6 pt-6.5 pb-7">
                  <div className="text-[11.5px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
                    {service.kind}
                  </div>
                  <h3 className="font-display mt-3 text-[22px] leading-[1.1] font-semibold tracking-[-0.025em] text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.6] text-white/70">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
