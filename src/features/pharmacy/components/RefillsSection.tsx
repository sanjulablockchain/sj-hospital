import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { LOGO_MARK } from "@/config/brand";
import { refills } from "../data/content";

/**
 * `#refills`: the second fixed-dark band, on the leaf mark rather than a
 * photograph, matching how the home page's pharmacy band is built.
 *
 * The reference promised a same-day dispatch and a doctor-review reminder here.
 * Neither is backed, so this says what the catalog does support: the
 * prescription is held digitally and the repeat is checked before it is
 * prepared.
 */
export function RefillsSection() {
  return (
    <section id="refills" className="relative mt-26 overflow-hidden bg-[#08123A]">
      <ParallaxLayer
        factor={0.1}
        maxOffsetPx={60}
        className="pointer-events-none absolute -top-[20%] -left-[6%] w-[32%] opacity-12"
      >
        <Image
          src={LOGO_MARK.src}
          alt=""
          width={LOGO_MARK.width}
          height={LOGO_MARK.height}
          className="h-auto w-full"
        />
      </ParallaxLayer>

      <div className="relative mx-auto max-w-[1440px] px-5 py-23 sm:px-8 lg:px-11">
        <div className="grid grid-cols-2 items-center gap-14 max-[899px]:grid-cols-1 max-[899px]:gap-10">
          <Reveal>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
              05 / Repeat prescriptions
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,5.2vw,74px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase">
              Chronic care
              <br />
              without the
              <br />
              paper chase
            </h2>
            <p
              className="mt-5.5 max-w-[46ch] text-[17.5px] leading-[1.65] text-white/78"
              style={{ textWrap: "pretty" }}
            >
              If you take medicine every day for blood pressure, diabetes, thyroid, asthma or heart
              disease, your prescription is kept on file digitally, so you do not have to carry the paper
              each time.
            </p>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.7] text-white/60">
              Ask for a repeat at the counter, by phone or on WhatsApp. A pharmacist checks it against your
              record before it is prepared, and it can go out with a delivery.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://wa.me/94742223334"
                className="sj-invert inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
              >
                Request a refill <span aria-hidden>&rarr;</span>
              </a>
              <a
                href="tel:+94742223334"
                className="sj-invert inline-flex items-center gap-2.5 border border-white/30 px-6 py-4 text-[15px] font-bold text-white"
              >
                Ask a pharmacist
              </a>
            </div>
          </Reveal>

          <RevealStagger stepMs={65} className="flex flex-col gap-0.5 bg-white/16">
            {refills.map((refill) => (
              <div
                key={refill.name}
                className="flex items-baseline justify-between gap-5 bg-[#08123A] px-7 py-5"
              >
                <span className="text-[16px] font-bold text-white">{refill.name}</span>
                <span className="text-right text-[13.5px] text-white/62">{refill.note}</span>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
