export function ContactCtaSection() {
  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-31.5 sm:px-8 lg:px-11">
      <div className="grid grid-cols-1 gap-px bg-white/16 min-[900px]:grid-cols-[1.15fr_0.85fr]">
        <div className="bg-[var(--home-accent)] p-9 py-13 text-[var(--home-on-accent)] sm:p-11">
          <div className="text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">14 / Come see us</div>
          <h2 className="font-display mt-4.5 text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase">
            Open right
            <br />
            now. Yes,
            <br />
            right now.
          </h2>
          <p className="mt-5.5 max-w-[40ch] text-[17px] leading-[1.6] opacity-85">
            229/10 St. Joseph Street, Negombo. Walk in, call us, or send a message on WhatsApp.
          </p>
        </div>
        <div className="flex flex-col bg-[var(--home-bg)]">
          <a
            href="#surgical"
            className="font-display flex flex-1 items-center justify-between gap-5 border-b border-white/16 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-white"
          >
            Surgical care <span aria-hidden>&rarr;</span>
          </a>
          <a
            href="#rooms"
            className="font-display flex flex-1 items-center justify-between gap-5 border-b border-white/16 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-white"
          >
            Reserve a room <span aria-hidden>&rarr;</span>
          </a>
          <a
            href="tel:+94117848484"
            className="font-display flex flex-1 items-center justify-between gap-5 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-white tabular-nums"
          >
            0117 84 84 84 <span aria-hidden>&#9742;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
