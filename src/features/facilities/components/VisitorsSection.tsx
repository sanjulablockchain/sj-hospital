import { Reveal } from "@/components/ui/Reveal";
import { comforts, gettingHere, visitingRows } from "@/features/facilities/data/content";

/**
 * `#visiting`: three tinted cards, visiting arrangements, how to get here, and
 * what there is to use while you wait.
 *
 * No clock times: the hospital publishes that critical care visiting is kept to
 * fixed hours confirmed at the unit desk, and nothing more specific, so nothing
 * more specific is stated here.
 */
export function VisitorsSection() {
  return (
    <section id="visiting" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          09 / For visitors
        </div>
        <div className="mt-4.5 grid gap-6 min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] min-[900px]:items-end min-[900px]:gap-14">
          <h2 className="font-display text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
            Getting here,
            <br />
            and waiting well
          </h2>
          <p className="text-[16px] leading-[1.6] text-[var(--home-muted)]" style={{ textWrap: "pretty" }}>
            Ten minutes from Bandaranaike International Airport, on St. Joseph Street in central Negombo.
          </p>
        </div>
      </Reveal>

      <div className="mt-11.5 grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-3">
        <Reveal className="bg-[var(--home-surface-2)] p-7.5">
          <h3 className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent)] uppercase">
            Visiting
          </h3>
          <dl className="mt-5 flex flex-col gap-3">
            {visitingRows.map((row) => (
              <div key={row.k} className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-0.5">
                <dt className="text-[14px] text-[var(--home-muted)]">{row.k}</dt>
                <dd className="font-display text-[14.5px] font-semibold text-[var(--home-heading)]">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[13.5px] leading-[1.55] text-[var(--home-muted)]">
            The ward or unit desk will confirm the current times before you travel.
          </p>
        </Reveal>

        <Reveal className="bg-[var(--home-surface-2)] p-7.5">
          <h3 className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent)] uppercase">
            Getting here
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {gettingHere.map((item) => (
              <li key={item} className="flex gap-3 text-[14.5px] leading-[1.55] text-[var(--home-muted)]">
                <span aria-hidden className="text-[var(--home-accent)]">
                  &#10022;
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="bg-[var(--home-surface-2)] p-7.5">
          <h3 className="text-[11.5px] font-bold tracking-[0.2em] text-[var(--home-accent)] uppercase">
            While you wait
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {comforts.map((item) => (
              <li
                key={item}
                className="border border-[var(--home-hairline-strong)] px-3.5 py-2 text-[13px] font-bold text-[var(--home-heading)]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
