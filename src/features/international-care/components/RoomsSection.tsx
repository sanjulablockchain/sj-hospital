import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { roomStandard, roomTiles } from "../data/content";

/**
 * `#rooms`: the four room categories, in the reference's 4-across tile grid
 * with the same wash-and-lift hover as `#journey`.
 *
 * These are the four the hospital actually offers, taken from
 * `features/facilities/data/content`. The reference invented a Category A/B/C
 * ladder with a semi private fourth tier, which the facilities page's own test
 * already rejects.
 */
export function RoomsSection() {
  return (
    <section
      id="rooms"
      className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          04 / Where you stay
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Your attendant
          <br />
          stays with you
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={70}
        className="mt-10.5 grid grid-cols-4 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {roomTiles.map((room) => (
          <div
            key={room.name}
            className="sj-tint group flex min-h-[260px] flex-col bg-[var(--home-bg)] px-6.5 pt-7.5 pb-7"
          >
            <span className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
              {room.tier}
            </span>
            <h3 className="font-display mt-3.5 text-[24px] leading-[1.06] font-semibold tracking-[-0.03em] text-[var(--home-heading)]">
              {room.name}
            </h3>
            <p className="mt-3 text-[14.5px] leading-[1.58] text-[var(--home-body)]">{room.desc}</p>
            <span className="mt-auto pt-4.5 text-[13px] font-bold text-[var(--home-accent-soft)] transition-[opacity,transform] duration-[450ms] motion-reduce:transform-none [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
              {room.extra}
            </span>
          </div>
        ))}
      </RevealStagger>

      {/* Shared across all four categories, so the tiles above do not repeat
          them seven times each. */}
      <Reveal>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {roomStandard.map((item) => (
            <li
              key={item}
              className="border border-[var(--home-hairline-strong)] px-3.75 py-2.5 text-[13.5px] font-bold text-[var(--home-body)]"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13.5px] leading-[1.6] text-[var(--home-muted)]">
          Every category, from the wards up, carries the list above as standard.
        </p>
      </Reveal>
    </section>
  );
}
