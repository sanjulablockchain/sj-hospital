import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/features/services/data/services";
import { localeHref } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/locales";
import type { HomeContent } from "../data/getContent";

export function ServicesBentoSection({
  content,
  locale,
}: {
  content: HomeContent["content"]["servicesBento"];
  locale: Locale;
}) {
  const { eyebrow, heading, tilesNote, tiles, footer } = content;
  const viewAllLabel = footer.viewAllTemplate.replace("{count}", String(services.length));

  return (
    <section id="services" className="mx-auto max-w-[1440px] px-5 pt-30 sm:px-8 lg:px-11">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div className="min-w-0">
            <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
              {eyebrow}
            </div>
            <h2 className="font-display mt-4.5 wrap-break-word text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
              {heading.line1}
              <br />
              {heading.line2}
            </h2>
          </div>
          <span className="text-[13px] tracking-[0.12em] text-[var(--home-muted)] uppercase">{tilesNote}</span>
        </div>
      </Reveal>

      <Reveal className="mt-11.5">
        <div
          className="grid gap-3.5 max-[639px]:grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4"
          style={{ gridAutoRows: "minmax(178px, auto)" }}
        >
          <Link
            href={localeHref("/services/accident-emergency", locale)}
            className="sj-bento sj-bento-accent group relative col-span-2 row-span-2 flex flex-col justify-between overflow-hidden bg-[var(--home-accent)] p-8 text-[var(--home-on-accent)] max-[639px]:col-span-1"
          >
            <span className="flex flex-wrap items-center justify-between gap-4 text-[12px] font-bold tracking-[0.2em] uppercase opacity-72">
              <span className="wrap-break-word">{tiles[0].badge}</span>
              <span className="inline-flex shrink-0 items-center gap-2">
                <span className="animate-sj-pulse h-2 w-2 rounded-full bg-[var(--home-on-accent)]" />
                {tiles[0].openNow}
              </span>
            </span>
            <span className="block">
              <span className="font-display block wrap-break-word text-[clamp(34px,4.2vw,62px)] leading-[0.92] font-extrabold tracking-[-0.04em] uppercase">
                {tiles[0].heading.line1}
                <br />
                {tiles[0].heading.line2}
              </span>
              <span className="mt-3.5 block max-w-[34ch] text-[15.5px] leading-[1.55] opacity-85">
                {tiles[0].body}
              </span>
            </span>
          </Link>

          <Link
            href={localeHref("/services/general-surgery", locale)}
            className="sj-bento relative col-span-2 flex min-h-[178px] flex-col justify-end overflow-hidden bg-[#0B1846] p-7 text-white max-[639px]:col-span-1"
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
              <span className="block min-w-0">
                <span className="block wrap-break-word text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
                  {tiles[1].badge}
                </span>
                <span className="font-display mt-3 block wrap-break-word text-[clamp(26px,2.8vw,38px)] leading-[0.98] font-bold tracking-[-0.03em] text-white">
                  {tiles[1].heading}
                </span>
                <span className="mt-2.5 block max-w-[40ch] text-[14.5px] leading-[1.5] text-white/72">
                  {tiles[1].body}
                </span>
              </span>
              <span className="inline-flex items-center gap-2.5 text-[14px] font-bold text-white">
                {tiles[1].linkLabel} <span aria-hidden className="text-[18px]">&rarr;</span>
              </span>
            </span>
          </Link>

          <Link
            href={localeHref("/services/inpatient-rooms", locale)}
            className="sj-bento relative row-span-2 flex flex-col justify-between overflow-hidden border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <Image
              src="/images/rooms/deluxe-1.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-30"
            />
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(rgba(6,11,31,0.82) 0%, rgba(11,24,70,0.55) 46%, rgba(6,11,31,0.95) 100%)" }}
            />
            <span className="relative wrap-break-word text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
              {tiles[2].badge}
            </span>
            <span className="relative block">
              <span className="font-display block text-[clamp(38px,4vw,58px)] leading-[0.86] font-extrabold tracking-[-0.045em] text-[var(--home-accent)] tabular-nums">
                10,000
              </span>
              <span className="mt-2.5 block text-[14px] leading-[1.5] text-white/70">{tiles[2].body}</span>
            </span>
          </Link>

          <Link
            href={localeHref("/services/pharmacy", locale)}
            className="sj-bento relative flex flex-col justify-between overflow-hidden border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <Image
              src="/images/services/pharmacy.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-28"
            />
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(rgba(6,11,31,0.76) 0%, rgba(6,11,31,0.95) 100%)" }}
            />
            <span className="relative wrap-break-word text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
              {tiles[3].badge}
            </span>
            <span className="relative block">
              <span className="font-display block wrap-break-word text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                {tiles[3].heading}
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">{tiles[3].body}</span>
            </span>
          </Link>

          <Link
            href={localeHref("/services/radiology", locale)}
            className="sj-bento relative flex flex-col justify-between overflow-hidden border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <Image
              src="/images/services/digital-xray.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-28"
            />
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(rgba(6,11,31,0.76) 0%, rgba(6,11,31,0.95) 100%)" }}
            />
            <span className="relative wrap-break-word text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
              {tiles[4].badge}
            </span>
            <span className="relative block">
              <span className="font-display block wrap-break-word text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                {tiles[4].heading}
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">{tiles[4].body}</span>
            </span>
          </Link>

          <Link
            href={localeHref("/services/laboratory", locale)}
            className="sj-bento relative col-span-2 flex min-h-[178px] items-end overflow-hidden bg-[#08123A] p-6.5 text-inherit max-[639px]:col-span-1"
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
              <span className="block min-w-0">
                <span className="block wrap-break-word text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
                  {tiles[5].badge}
                </span>
                <span className="font-display mt-3 block wrap-break-word text-[clamp(24px,2.6vw,34px)] leading-none font-bold tracking-[-0.03em] text-white">
                  {tiles[5].heading}
                </span>
              </span>
              <span className="text-[14px] whitespace-nowrap text-white/75">{tiles[5].note}</span>
            </span>
          </Link>

          <Link
            href={localeHref("/services/home-visits", locale)}
            className="sj-bento relative flex flex-col justify-between overflow-hidden border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <Image
              src="/images/network/home-visit-vehicle.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-30"
            />
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(rgba(6,11,31,0.74) 0%, rgba(6,11,31,0.95) 100%)" }}
            />
            <span className="relative wrap-break-word text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
              {tiles[6].badge}
            </span>
            <span className="relative block">
              <span className="font-display block wrap-break-word text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                {tiles[6].heading}
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">{tiles[6].body}</span>
            </span>
          </Link>

          <Link
            href={localeHref("/services/medicine-delivery", locale)}
            className="sj-bento relative flex flex-col justify-between overflow-hidden border border-[var(--home-hairline)] bg-[#0B1846] p-6.5 text-inherit"
          >
            <Image
              src="/images/services/medicine-delivery.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-28"
            />
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(rgba(6,11,31,0.76) 0%, rgba(6,11,31,0.95) 100%)" }}
            />
            <span className="relative wrap-break-word text-[12px] font-bold tracking-[0.2em] text-[#7FCBFF] uppercase">
              {tiles[7].badge}
            </span>
            <span className="relative block">
              <span className="font-display block wrap-break-word text-[26px] leading-none font-bold tracking-[-0.03em] text-white">
                {tiles[7].heading}
              </span>
              <span className="mt-2 block text-[14px] leading-[1.5] text-white/70">{tiles[7].body}</span>
            </span>
          </Link>
        </div>
      </Reveal>

      <Reveal>
        <Link
          href={localeHref("/services", locale)}
          className="mt-8.5 flex flex-wrap items-center justify-between gap-7.5 bg-[var(--home-accent)] px-9 py-8.5 text-[var(--home-on-accent)] sj-invert"
        >
          <span className="block min-w-0">
            <span className="block text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">
              {footer.label}
            </span>
            <span className="font-display mt-2.5 block wrap-break-word text-[clamp(28px,3.4vw,46px)] leading-none font-extrabold tracking-[-0.035em] uppercase">
              {footer.heading}
            </span>
          </span>
          <span className="inline-flex items-center gap-3 text-[15px] font-bold">
            {viewAllLabel} <span aria-hidden className="text-[22px]">&rarr;</span>
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
