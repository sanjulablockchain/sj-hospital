import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { HeroParallaxLayer } from "./HeroParallaxLayer";
import { HeroImageCard } from "./HeroImageCard";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-mid">
      <HeroParallaxLayer />

      <div className="relative mx-auto grid max-w-[1240px] gap-14 px-6 py-20 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
        <div>
          <RevealOnScroll>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-2 text-sm font-semibold text-[#BEE7F8]">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(51,180,229,0.3)]" />
              US-standard care, managed by Kids &amp; Teens Medical Group, USA
            </div>
          </RevealOnScroll>

          <RevealOnScroll delayMs={80}>
            <h1 className="mb-5 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              To live is
              <br />
              a <span className="text-accent">privilege.</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delayMs={160}>
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-white/85">
              American healthcare standards, right here in Negombo.
              Affordable, evidence-based care with a 24-hour pharmacy,
              in-house doctors, a modern lab, and digital X-ray, with rooms
              from just 10,000 LKR.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delayMs={240}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/e-channeling"
                className="shadow-accent-glow rounded-full bg-accent px-7 py-3.5 text-base font-bold text-[#0E2E3D] transition hover:-translate-y-0.5"
              >
                Book an Appointment
              </Link>
              <Link
                href="#services"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-base font-bold text-white transition hover:bg-white/20"
              >
                Explore Services
              </Link>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delayMs={200}>
          <HeroImageCard />
        </RevealOnScroll>
      </div>

      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-11 w-full">
        <path d="M0,40 C360,0 1080,80 1440,20 L1440,60 L0,60 Z" fill="white" />
      </svg>
    </section>
  );
}
