import Image from "next/image";
import { Reveal } from "./Reveal";

export function ServicesBentoSection() {
  return (
    <section id="services" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              02 / What we do
            </div>
            <h2 className="font-display mt-4.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              Eight ways we
              <br />
              look after you
            </h2>
          </div>
          <span className="text-[13px] tracking-[0.12em] text-[var(--home-muted)] uppercase">
            Every tile opens a service
          </span>
        </div>
      </Reveal>

      <Reveal className="mt-11.5">
        <div
          className="grid gap-3.5 max-[639px]:grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4"
          style={{ gridAutoRows: "minmax(178px, auto)" }}
        >
          <a
            href="#book"
            className="group relative col-span-2 row-span-2 flex flex-col justify-between overflow-hidden bg-[var(--home-accent)] p-8 text-[var(--home-on-accent)] max-[639px]:col-span-1"
          >
            <span className="flex items-center justify-between gap-4 text-[12px] font-bold tracking-[0.2em] uppercase opacity-72">
              <span>/01 Emergency &amp; OPD</span>
              <span className="inline-flex items-center gap-2">
                <span className="animate-sj-pulse h-2 w-2 rounded-full bg-[var(--home-on-accent)]" />
                Open now
              </span>
            </span>
            <span className="block">
              <span className="font-display block text-[clamp(34px,4.2vw,62px)] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase">
                Walk in at
                <br />
                any hour
              </span>
              <span className="mt-3.5 block max-w-[34ch] text-[15.5px] leading-[1.55] opacity-85">
                Emergency care, outpatient consultations, laboratory and digital X-ray, live around the clock
                every day of the year.
              </span>
            </span>
          </a>

          <a
            href="#surgical"
            className="relative col-span-2 flex min-h-[178px] flex-col justify-end overflow-hidden bg-[#0B1846] p-7 text-white max-[639px]:col-span-1"
          >
            <Image
              src="/images/about-facility.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-32"
            />
            <span
              className="absolute inset-0"
              style={{
                background: "linear-gradient(105deg, rgba(6,11,31,0.94) 20%, rgba(6,11,31,0.55) 100%)",
              }}
            />
            <span className="relative flex flex-wrap items-end justify-between gap-5">
              <span className="block">
                <span className="block text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
                  /02 Surgical care
                </span>
                <span className="font-display mt-3 block text-[clamp(26px,2.8vw,38px)] leading-[0.98] font-bold tracking-[-0.03em] text-white">
                  Theatres, consultant led
                </span>
                <span className="mt-2.5 block max-w-[40ch] text-[14.5px] leading-[1.5] text-white/72">
                  Elective and emergency surgery with sterile instrument tracking and an assigned recovery
                  nurse.
                </span>
              </span>
              <span className="inline-flex items-center gap-2.5 text-[14px] font-bold whitespace-nowrap text-white">
                Surgical services <span aria-hidden className="text-[18px]">&rarr;</span>
              </span>
            </span>
          </a>

          <a
            href="#rooms"
            className="row-span-2 flex flex-col justify-between border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">/03 Rooms</span>
            <span className="block">
              <span className="font-display block text-[clamp(38px,4vw,58px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-[var(--home-accent)] tabular-nums">
                10,000
              </span>
              <span className="mt-2.5 block text-[14px] leading-[1.5] text-white/70">
                LKR a night. Private and semi private, sanitised every two hours, nursing that knows your name.
              </span>
            </span>
          </a>

          <a
            href="#pharmacy"
            className="flex flex-col justify-between border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">/04 Pharmacy</span>
            <span className="block">
              <span className="font-display block text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                Authorized stock, 24/7
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">
                Verified medicine only. No substitutes.
              </span>
            </span>
          </a>

          <a
            href="#facilities"
            className="flex flex-col justify-between border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">/05 Digital X-ray</span>
            <span className="block">
              <span className="font-display block text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                Lower dose, sharper plates
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">
                Read within the hour, not the week.
              </span>
            </span>
          </a>

          <a
            href="#facilities"
            className="relative col-span-2 flex min-h-[178px] items-end overflow-hidden bg-[#081A3A] p-6.5 text-inherit max-[639px]:col-span-1"
          >
            <Image
              src="/images/doctors.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover opacity-42"
            />
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(rgba(6,11,31,0.3) 20%, rgba(6,11,31,0.92) 100%)" }}
            />
            <span className="relative flex w-full flex-wrap items-end justify-between gap-5">
              <span className="block">
                <span className="block text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
                  /06 Laboratory
                </span>
                <span className="font-display mt-3 block text-[clamp(24px,2.6vw,34px)] leading-none font-bold tracking-[-0.03em] text-white">
                  Two doctors read every report
                </span>
              </span>
              <span className="text-[14px] whitespace-nowrap text-white/75">10% off for OPD patients</span>
            </span>
          </a>

          <a
            href="#book"
            className="flex flex-col justify-between border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">/07 Home visits</span>
            <span className="block">
              <span className="font-display block text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                We come to you
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">
                Doctors, nurses and lab technicians at your door.
              </span>
            </span>
          </a>

          <a
            href="#pharmacy"
            className="flex flex-col justify-between border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <span className="text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">/08 Delivery</span>
            <span className="block">
              <span className="font-display block text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                Medicine to your door
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">
                Across Negombo, from our own counter.
              </span>
            </span>
          </a>
        </div>
      </Reveal>

      <Reveal>
        <a
          href="#surgical"
          className="mt-8.5 flex flex-wrap items-center justify-between gap-7.5 bg-[var(--home-accent)] px-9 py-8.5 text-[var(--home-on-accent)] transition-colors"
        >
          <span className="block">
            <span className="block text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
              Full service directory
            </span>
            <span className="font-display mt-2.5 block text-[clamp(28px,3.4vw,46px)] leading-none font-extrabold tracking-[-0.035em] uppercase">
              Go to surgical care &amp; services
            </span>
          </span>
          <span className="inline-flex items-center gap-3 text-[15px] font-bold whitespace-nowrap">
            Open the page <span aria-hidden className="text-[22px]">&rarr;</span>
          </span>
        </a>
      </Reveal>
    </section>
  );
}
