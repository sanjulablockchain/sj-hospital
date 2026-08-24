import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { roomExtras, roomRows, roomStandard } from "@/features/facilities/data/content";

/**
 * `#rooms`: the four room categories as a table, then what every category
 * includes and the extras that separate them.
 *
 * The amenities column is hidden between 1024px and 900px (where there is room
 * for name, occupancy and price but not a sentence) and returns as its own
 * stacked line below 900px, where the row becomes a single column. That is the
 * reference's own `roomamen` behaviour.
 *
 * /accommodation owns booking and the photographs; this table exists to answer
 * "what are my options" in one screen, then hands over.
 */
export function RoomsSection() {
  return (
    <section id="rooms" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          04 / Rooms &amp; wards
        </div>
        <div className="mt-4.5 grid gap-6 min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] min-[900px]:items-end min-[900px]:gap-14">
          <h2 className="font-display text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Four ways to
            <br />
            spend the night
          </h2>
          <p className="text-[16px] leading-[1.6] text-[var(--home-muted)]" style={{ textWrap: "pretty" }}>
            Every category is cleaned on the same two hour cycle. What changes is space, privacy and how
            much room your family gets.
          </p>
        </div>
      </Reveal>

      <Reveal className="mt-11.5 border-t border-[var(--home-hairline)]">
        {roomRows.map((room) => (
          <div
            key={room.name}
            className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-[var(--home-hairline)] py-6 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.6fr)_minmax(0,0.9fr)] min-[900px]:items-baseline min-[1024px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.5fr)_minmax(0,1.8fr)_minmax(0,0.7fr)]"
          >
            <h3 className="font-display text-[20px] leading-[1.12] font-semibold tracking-[-0.02em] text-[var(--home-heading)] min-[900px]:text-[22px]">
              {room.name}
            </h3>
            <span className="text-[13.5px] font-bold tracking-[0.08em] text-[var(--home-accent)] uppercase">
              {room.occupancy}
            </span>
            {/* Hidden only in the 900-1023px band, where there is room for the
                name, occupancy and price but not for a sentence as well. Below
                900px the row is a single column and this stacks under the name,
                so a phone still gets the amenities. */}
            <p className="text-[14px] leading-[1.55] text-[var(--home-muted)] [@media(min-width:900px)_and_(max-width:1023px)]:hidden">
              {room.amenities}
            </p>
            <span className="font-display text-[16px] font-semibold tracking-[-0.01em] text-[var(--home-heading)] tabular-nums min-[900px]:text-right">
              {room.price}
            </span>
          </div>
        ))}
      </Reveal>

      <div className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-2">
        <Reveal className="bg-[var(--home-surface-2)] p-7.5">
          <h3 className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent)] uppercase">
            In every category
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {roomStandard.map((item) => (
              <li
                key={item}
                className="border border-[var(--home-hairline-strong)] px-3.5 py-2 text-[13px] font-bold text-[var(--home-heading)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="bg-[var(--home-surface-2)] p-7.5">
          <h3 className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent)] uppercase">
            Small things that help
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {roomExtras.map((extra) => (
              <li key={extra} className="flex gap-3 text-[14.5px] leading-[1.55] text-[var(--home-muted)]">
                <span aria-hidden className="text-[var(--home-accent)]">
                  &#10022;
                </span>
                <span>{extra}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-4">
        <Link
          href="/accommodation"
          className="sj-invert inline-flex w-fit items-center gap-2.5 bg-[var(--home-accent)] px-5.5 py-3.5 text-[14px] font-bold text-[var(--home-on-accent)]"
        >
          See the rooms <span aria-hidden>&rarr;</span>
        </Link>
        <p className="max-w-[62ch] text-[14px] leading-[1.6] text-[var(--home-muted)]">
          Room rates cover accommodation and nursing care. Doctor visits, medicine, tests and procedures
          are billed separately and appear on your interim bill.
        </p>
      </Reveal>
    </section>
  );
}
