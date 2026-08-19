import { Reveal } from "./Reveal";
import { networkNodes } from "../data/network";

export function NetworkSection() {
  return (
    <section id="network" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              10 / Network
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              One group,
              <br />
              two countries
            </h2>
          </div>
          <p className="max-w-[36ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
            Our Negombo hospital shares clinical governance with the largest pediatric group in Los Angeles.
          </p>
        </div>
      </Reveal>
      <Reveal className="mt-11.5 border-t border-[var(--home-hairline)]">
        {networkNodes.map((node) => (
          <div
            key={node.name}
            className="sj-row grid grid-cols-1 gap-3 border-b border-[var(--home-hairline)] px-1 py-6.5 min-[640px]:grid-cols-[0.6fr_1.4fr_1fr] min-[640px]:items-baseline min-[640px]:gap-6"
          >
            <span className="text-[13px] font-bold tracking-[0.16em] text-[var(--home-accent)] uppercase">
              {node.location}
            </span>
            <span className="font-display text-[clamp(21px,2.2vw,32px)] leading-[1.08] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
              {node.name}
            </span>
            <span className="text-[14.5px] leading-[1.55] text-[var(--home-muted)]">{node.body}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
