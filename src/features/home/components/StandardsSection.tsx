import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { HomeContent } from "../data/getContent";
import { HomeIcon } from "./HomeIcon";
import { Container } from "./primitives";

/**
 * `#standards`: the deep purple band with a dot pattern, three standards
 * with sky icons (each lifting on hover), and the accent plaque carrying the
 * motto, hung 56px over the band's foot and drifting a little against the
 * scroll so it reads as a separate object. Fixed-dark in both themes, as in
 * the reference.
 */
export function StandardsSection({ content }: { content: HomeContent["content"]["standards"] }) {
  return (
    <section id="standards" className="relative">
      <div
        className="pt-20 pb-30 text-white sm:pt-24 sm:pb-37.5"
        style={{
          backgroundColor: "var(--home-deep)",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.2px, transparent 1.4px)",
          backgroundSize: "18px 18px",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1300px] flex-col gap-13 px-5 sm:px-8 lg:px-11">
          <Reveal className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-display m-0 text-[clamp(32px,3.6vw,48px)] font-extrabold tracking-[-0.02em] uppercase">
              {content.heading}
            </h2>
            <span className="text-[15px] text-white/80">{content.sub}</span>
          </Reveal>
          <RevealStagger className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {content.items.map((item) => (
              <div
                key={item.title}
                className="sj-card-lift flex items-start gap-5 rounded-[14px] border border-white/10 bg-white/[0.04] p-5 hover:bg-white/[0.08]"
              >
                <span className="shrink-0 text-[var(--home-accent)]">
                  <HomeIcon name={item.icon} size={52} stroke={1.4} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[17px] font-extrabold">{item.title}</span>
                  <span className="text-[14.5px] leading-[1.55] text-white/82">{item.desc}</span>
                </div>
              </div>
            ))}
          </RevealStagger>
        </div>
      </div>
      <Container className="relative z-[2] -mt-14 max-w-[1000px]">
        <ParallaxLayer factor={-0.06} maxOffsetPx={24}>
          <div className="bg-[var(--home-accent)] px-6 py-8 text-center shadow-[0_24px_40px_-24px_rgba(26,21,64,0.5)]">
            <span className="font-display text-[clamp(26px,3vw,38px)] font-bold tracking-[-0.01em] text-[#0F0B30] italic">
              {content.plaqueHeading}
            </span>
          </div>
        </ParallaxLayer>
      </Container>
    </section>
  );
}
