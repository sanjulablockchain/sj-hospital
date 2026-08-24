import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

/**
 * `#book`: the closing invitation. The three actions sit as stacked hairline
 * rows rather than buttons, so the heading keeps the weight in the split.
 */
export function BookSection() {
  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
          <div className="bg-[var(--home-surface-2)] p-8 min-[900px]:p-12">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              10 / Come and look
            </div>
            <h2 className="font-display mt-5 text-[clamp(34px,4.6vw,64px)] leading-[0.94] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              See the rooms
              <br />
              before you
              <br />
              need them.
            </h2>
            <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.65] text-[var(--home-muted)]">
              Ask at reception and we will show you a room and the ward. No appointment, and no sales talk.
            </p>
          </div>

          <div className="flex flex-col justify-center bg-[var(--home-surface-2)] p-8 min-[900px]:p-12">
            <Link
              href="/accommodation"
              className="sj-link flex items-center justify-between gap-5 border-b border-[var(--home-hairline)] py-5 text-[17px] font-bold text-[var(--home-heading)]"
            >
              Reserve a room <span aria-hidden>&rarr;</span>
            </Link>
            <a
              href="https://wa.me/94742223334"
              className="sj-link flex items-center justify-between gap-5 border-b border-[var(--home-hairline)] py-5 text-[17px] font-bold text-[var(--home-heading)]"
            >
              Message on WhatsApp <span aria-hidden>&rarr;</span>
            </a>
            <a
              href="tel:+94117848484"
              className="sj-link flex items-center justify-between gap-5 py-5 text-[17px] font-bold text-[var(--home-heading)] tabular-nums"
            >
              0117 84 84 84 <span aria-hidden>&#9742;</span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
