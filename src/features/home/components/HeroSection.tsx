import { Reveal } from "./Reveal";
import { HomeHeader } from "./HomeHeader";
import { HeroParallaxBackground } from "./HeroParallaxBackground";
import { StatTicker } from "./StatTicker";

export function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-[#060B1F]">
      <HeroParallaxBackground />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(6,11,31,0.84) 0%, rgba(6,11,31,0.4) 40%, rgba(6,11,31,0.95) 100%)",
        }}
      />
      <div
        className="animate-sj-sheen absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 78% 26%, rgba(44,166,240,0.34) 0%, rgba(6,11,31,0) 66%)",
        }}
      />
      <div
        className="animate-sj-scan pointer-events-none absolute inset-x-0 top-0 h-[14%]"
        style={{
          background:
            "linear-gradient(rgba(127,203,255,0) 0%, rgba(127,203,255,0.16) 60%, rgba(127,203,255,0) 100%)",
        }}
      />

      <HomeHeader />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 gap-10 px-5 pb-13 sm:px-8 lg:px-11">
        <div className="hidden flex-col items-center gap-4.5 pb-2.5 min-[900px]:flex" style={{ flex: "0 0 44px" }}>
          <span
            className="text-[11px] tracking-[0.3em] text-white/50 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Negombo, Sri Lanka
          </span>
          <span className="w-px flex-1 bg-gradient-to-b from-white/40 to-transparent" />
        </div>

        <div className="flex flex-1 flex-col justify-end pb-13">
          <div className="animate-sj-up mb-0 inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
            <span className="h-px w-11 bg-[var(--home-accent)]" />
            Managed from Los Angeles, USA
          </div>
          <h1 className="font-display animate-sj-up mt-5 text-[clamp(52px,9vw,152px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
            To live is
            <br />
            <span style={{ color: "transparent", WebkitTextStroke: "1.4px rgba(242,246,255,0.75)" }}>a</span>{" "}
            <span className="text-[var(--home-accent)]">privilege.</span>
          </h1>
          <div className="animate-sj-up mt-10 flex flex-col items-start gap-6.5">
            <p className="max-w-[46ch] text-[18px] leading-[1.6] text-white/82" style={{ textWrap: "pretty" }}>
              American healthcare standards in Negombo: 24 hour emergency care, surgical theatres, in-house
              doctors, a modern laboratory, digital X-ray and a pharmacy that never closes.
            </p>
            <a
              href="tel:+94117848484"
              className="inline-flex items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold whitespace-nowrap text-white tabular-nums"
            >
              <span className="animate-sj-pulse h-2 w-2 rounded-full bg-[var(--home-accent)]" />
              0117 84 84 84
            </a>
          </div>
        </div>
      </div>

      <StatTicker />
    </section>
  );
}
