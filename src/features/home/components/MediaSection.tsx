import { Reveal } from "./Reveal";
import { mediaItems } from "../data/media";

export function MediaSection() {
  return (
    <section id="media" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              11 / Media
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              News, press
              <br />
              &amp; gallery
            </h2>
          </div>
          <a href="#media" className="inline-flex items-center gap-2.5 border border-[var(--home-hairline)] px-5.5 py-3.5 text-[14.5px] font-bold text-[var(--home-heading)]">
            Media enquiries <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </Reveal>
      <Reveal className="mt-11.5 border-t border-[var(--home-hairline)]">
        {mediaItems.map((item) => (
          <a
            key={item.title}
            href="#media"
            className="grid grid-cols-1 gap-3 border-b border-[var(--home-hairline)] py-6.5 text-inherit min-[640px]:grid-cols-[0.5fr_1.6fr_0.9fr] min-[640px]:items-baseline min-[640px]:gap-6"
          >
            <span className="text-[13.5px] font-bold tracking-[0.1em] text-[var(--home-muted)] tabular-nums">
              {item.date}
            </span>
            <span className="font-display text-[clamp(20px,2.1vw,30px)] leading-[1.1] font-semibold tracking-[-0.025em] text-[var(--home-heading)]">
              {item.title}
            </span>
            <span className="text-[13px] font-bold tracking-[0.14em] text-[var(--home-accent)] uppercase">
              {item.tag}
            </span>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
