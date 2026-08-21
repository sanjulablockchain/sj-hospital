import Image from "next/image";
import Link from "next/link";
import { ThemedHeader } from "@/components/layout/ThemedHeader";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { servicesDetailNavigation } from "@/config/servicesNavigation";
import type { Service } from "@/features/services/types";

/**
 * `#top` hero for a single service's detail page. Same fixed-dark exterior
 * render and Ken Burns drift as the services index hero (ServicesHero),
 * shorter at ~72vh since a detail page has more content below the fold, and
 * scoped to one service's title/lede/cta/strip rather than the index copy.
 *
 * The exterior render is shared across all 36 detail pages, so the alt text
 * describes the building rather than the service shown on it.
 */
export function ServiceHero({ service }: { service: Service }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[72vh] flex-col overflow-hidden bg-[#060B1F]"
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

      <ThemedHeader navItems={servicesDetailNavigation} homeHref="/" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end gap-6 px-5 pb-14 sm:px-8 lg:px-11">
        <Link
          href="/services"
          className="animate-sj-up inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-white/70 hover:text-white"
        >
          <span aria-hidden>&larr;</span> All services
        </Link>

        <div className="animate-sj-up inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[#7FCBFF] uppercase">
          <span className="h-px w-11 bg-[var(--home-accent)]" />
          {service.group}
        </div>

        <h1 className="font-display animate-sj-up text-[clamp(40px,7vw,108px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-white uppercase">
          {service.title}
        </h1>

        <p
          className="animate-sj-up max-w-[58ch] text-[18px] leading-[1.6] text-white/82"
          style={{ textWrap: "pretty" }}
        >
          {service.lede}
        </p>

        <a
          href="#book"
          className="animate-sj-up inline-flex w-fit items-center gap-2.5 bg-[var(--home-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-on-accent)]"
        >
          {service.cta} <span aria-hidden>&rarr;</span>
        </a>

        <div className="animate-sj-up mt-2 flex flex-wrap items-stretch">
          {service.strip.map((stat, i) => (
            <div
              key={stat.k}
              className={`flex flex-col gap-1 px-6 py-2 first:pl-0 ${
                i > 0 ? "border-l border-white/14" : ""
              }`}
            >
              <span className="text-[11px] font-bold tracking-[0.16em] text-white/55 uppercase">
                {stat.k}
              </span>
              <span className="text-[16px] font-bold text-white">{stat.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
