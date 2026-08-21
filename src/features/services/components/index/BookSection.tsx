import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/**
 * `#book`: the page's closing call to action. Kept to what the brief asks
 * for — a heading, a short paragraph, the hospital's phone number, a primary
 * link to `/contact-us` and a ghost link back into the directory — rather
 * than the home page's larger three-link `ContactCtaSection`.
 */
export function BookSection() {
  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-30 pb-4 sm:px-8 lg:px-11">
      <Reveal
        className="bg-[var(--home-accent)] px-9 py-16 text-center text-[var(--home-on-accent)] sm:px-14 sm:py-20"
      >
        <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">10 / Book</div>
        <h2 className="font-display mx-auto mt-4.5 max-w-[20ch] text-[clamp(36px,5vw,68px)] leading-[0.94] font-extrabold tracking-[-0.035em] uppercase">
          Tell us what you need
        </h2>
        <p className="mx-auto mt-5.5 max-w-[52ch] text-[17px] leading-[1.6] opacity-85">
          Call the number below or send your details through &mdash; a coordinator will match you to the right
          department and confirm a plan before anything begins.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2.5 bg-[var(--home-on-accent)] px-6 py-4 text-[15px] font-bold text-[var(--home-accent)] transition-opacity duration-300 hover:opacity-90"
          >
            Contact us <span aria-hidden>&rarr;</span>
          </Link>
          <a
            href="tel:+94117848484"
            className="inline-flex items-center gap-2.5 border border-[var(--home-on-accent)]/40 px-6 py-4 text-[15px] font-bold tabular-nums"
          >
            0117 84 84 84 <span aria-hidden>&#9742;</span>
          </a>
        </div>
        <a
          href="#directory"
          className="mt-7 inline-flex items-center gap-2 border-b border-[var(--home-on-accent)]/40 pb-0.5 text-[14px] font-bold opacity-80"
        >
          Browse services <span aria-hidden>&rarr;</span>
        </a>
      </Reveal>
    </section>
  );
}
