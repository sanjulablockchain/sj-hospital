import Image from "next/image";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { servicesNavigation } from "@/config/servicesNavigation";
import { groupCounts } from "@/features/services/data/services";

/**
 * `#top` hero: a fixed-dark exterior render behind the themed header and the
 * page's only <h1>. Content uses `animate-sj-up` (not Reveal) so it appears on
 * load rather than waiting on an intersection observer for what's already in
 * the first viewport — the same choice the home hero makes.
 */
export function ServicesHero() {
  const totalServices = groupCounts().All;

  return (
    <section
      id="top"
      className="relative flex min-h-[86vh] flex-col overflow-hidden bg-[#060B1F] max-[899px]:min-h-[74vh]"
    >
      <ParallaxLayer
        factor={0.14}
        maxOffsetPx={100}
        className="absolute inset-x-0 -top-[14%] h-[128%] overflow-hidden"
      >
        <Image
          src="/images/services/exterior-dusk-a.png"
          alt="St. Joseph Hospital building at dusk"
          fill
          priority
          className="animate-sj-burns object-cover"
          style={{ objectPosition: "55% 50%" }}
        />
      </ParallaxLayer>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(6,11,31,0.86) 0%, rgba(6,11,31,0.42) 42%, rgba(6,11,31,0.96) 100%)",
        }}
      />

      <ThemedHeader navItems={servicesNavigation} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end gap-6 px-5 pb-16 sm:px-8 lg:px-11">
        <div className="animate-sj-up inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
          <span className="h-px w-11 bg-[var(--home-accent)]" />
          Medical Services
        </div>
        <h1 className="font-display animate-sj-up text-[clamp(52px,9vw,152px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-white uppercase">
          Every service,
          <br />
          under <span className="text-[var(--home-accent)]">one roof.</span>
        </h1>
        <p
          className="animate-sj-up max-w-[52ch] text-[18px] leading-[1.6] text-white/82"
          style={{ textWrap: "pretty" }}
        >
          {totalServices} services across nine centres of excellence — emergency, surgical, diagnostic and
          family care, organised around the problem you came in with, not the department that happens to
          treat it.
        </p>
        <a
          href="#directory"
          className="animate-sj-up inline-flex w-fit items-center gap-3 border border-white/30 px-6 py-4 text-[15px] font-bold text-white"
        >
          Open the directory <span aria-hidden>&rarr;</span>
        </a>
      </div>
    </section>
  );
}
