import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import type { CareerContent } from "../data/getContent";

/**
 * `#process`: the five hiring steps, against a drifting exterior shot washed
 * back to a quarter opacity.
 *
 * Fixed-dark in both themes, exactly as the reference has it: this band carries
 * none of the light-theme escape attributes its neighbours do, so the colours
 * here are literal rather than tokens. The photograph is the only thing behind
 * them, and a light-theme wash over it would leave the step numbers unreadable.
 *
 * The heading sticks while the steps scroll past it, and stops sticking below
 * 900px where the layout collapses to one column and there is nothing to stick
 * beside.
 */
export function ProcessSection({ content }: { content: CareerContent }) {
  const { process, processHeading, processIntro, sectionEyebrows } = content;
  return (
    <section id="process" className="relative mt-26 overflow-hidden bg-[#08123A] max-[640px]:mt-18">
      <ParallaxLayer factor={0.12} maxOffsetPx={80} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image
          src="/images/hero-exterior.png"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-24"
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, #060B1F 4%, rgba(6,11,31,0.9) 55%, rgba(6,11,31,0.78) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-23 sm:px-8 lg:px-11">
        <Reveal>
          <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-start gap-14.5 max-[899px]:grid-cols-1 max-[899px]:gap-10">
            <div className="sticky top-10 min-w-0 max-[899px]:static">
              <div className="text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
                {sectionEyebrows.process}
              </div>
              <h2 className="font-display wrap-break-word mt-4.5 text-[clamp(36px,4.6vw,66px)] leading-[0.9] font-extrabold tracking-[-0.04em] text-white uppercase max-[899px]:text-[42px]">
                {processHeading.line1}
                <br />
                {processHeading.line2}
                <br />
                {processHeading.line3}
                <br />
                {processHeading.line4}
              </h2>
              <p
                className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.65] text-white/78"
                style={{ textWrap: "pretty" }}
              >
                {processIntro}
              </p>
            </div>

            <ol className="flex flex-col gap-px bg-white/18">
              {process.map((step) => (
                <li key={step.n} className="bg-[#08123A] px-7 py-6.5 max-[640px]:px-5">
                  <div className="flex flex-wrap items-baseline gap-4.5">
                    <span className="font-display text-[30px] leading-none font-extrabold tracking-[-0.04em] text-[#2CA6F0]">
                      {step.n}
                    </span>
                    <h3 className="font-display wrap-break-word min-w-0 text-[23px] font-bold tracking-[-0.025em] text-white">
                      {step.title}
                    </h3>
                    <span className="ml-auto text-[12px] font-bold tracking-[0.14em] whitespace-nowrap text-[#7FCBFF] uppercase">
                      {step.when}
                    </span>
                  </div>
                  <p className="mt-3 max-w-[68ch] text-[15.5px] leading-[1.6] text-white/74">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
