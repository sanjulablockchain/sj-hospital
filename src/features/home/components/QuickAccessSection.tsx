import Image from "next/image";
import Link from "next/link";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { RevealStagger } from "@/components/ui/RevealStagger";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { ChannelBookCta } from "./ChannelBookCta";
import { HomeIcon } from "./HomeIcon";
import { Container, pillButton } from "./primitives";

/**
 * `#book`: the mosaic under the hero. Top row: the channelling card over the
 * team photograph (drifting on scroll under a fade from the page surface so
 * the copy stays legible in both themes) beside the emergency column (the
 * switchboard row over a brand card and the emergency photograph). Bottom
 * row: laboratory photo, the accent "Facilities and services" card, the
 * building, the brand "Our location" card. Every tile lifts on hover and the
 * photographs ease in. Grids are the reference's: `auto-fit` above, 1 / 2 / 4
 * columns below at 600 and 1100px.
 */
export function QuickAccessSection({
  content,
  servicesCount,
  locale,
}: {
  content: HomeContent["content"]["quickAccess"];
  servicesCount: number;
  locale: Locale;
}) {
  const { channel, emergencyCall, emergency, facilities, location } = content;
  const cardText = "sj-card-lift relative flex flex-col justify-center gap-2.5 p-7.5 hover:z-10";
  const photoTile = "group relative overflow-hidden";

  return (
    <section id="book" className="pt-16 sm:pt-22">
      <Container className="flex flex-col">
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,520px),1fr))]">
          <div className="group relative flex min-h-[420px] items-center overflow-hidden bg-[var(--home-surface)]">
            <ParallaxLayer factor={0.1} maxOffsetPx={44} className="absolute inset-x-0 -inset-y-[10%]">
              <Image
                src={channel.photo}
                alt={channel.photoAlt}
                fill
                sizes="(min-width: 1100px) 50vw, 100vw"
                className="sj-card-zoom object-cover object-[75%_30%]"
              />
            </ParallaxLayer>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: "linear-gradient(90deg, var(--home-fade-a) 0%, var(--home-fade-b) 38%, var(--home-fade-c) 70%)",
              }}
            />
            <div className="relative flex max-w-[340px] flex-col gap-4.5 p-6 sm:p-11">
              <span className="text-[var(--home-brand-text)]">
                <HomeIcon name="steth" size={52} stroke={1.5} />
              </span>
              <h2 className="font-display m-0 text-[40px] leading-none font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
                {channel.heading}
              </h2>
              <p className="m-0 text-[15px] leading-[1.55] text-[var(--home-muted)]">{channel.body}</p>
              <ChannelBookCta
                href={channel.href}
                locale={locale}
                cta={channel.cta}
                className={`${pillButton("brand")} h-[50px] self-start px-6 text-[15px]`}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <a
              href={emergencyCall.href}
              className="sj-card-lift flex min-h-[150px] items-center gap-5.5 px-6 py-7.5 text-[var(--home-heading)] hover:bg-[var(--home-surface)] sm:px-9"
            >
              <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border-2 border-[var(--home-heading)]">
                <HomeIcon name="phone" size={32} stroke={1.7} />
              </span>
              <span className="flex flex-col gap-1">
                <span className="font-display text-[22px] leading-[1.1] font-extrabold tracking-[-0.02em] sm:text-[28px]">
                  {emergencyCall.heading}
                </span>
                <span className="font-display text-[28px] leading-[1.1] font-extrabold tracking-[-0.01em] text-[var(--home-accent-soft)] tabular-nums sm:text-[34px]">
                  0117 84 84 84 / 031
                </span>
              </span>
            </a>
            <RevealStagger className="grid min-h-[270px] flex-1 grid-cols-1 min-[480px]:grid-cols-2">
              <Link
                href={localeHref(emergency.href, locale)}
                className={`${cardText} bg-[var(--home-brand)] text-white hover:bg-[var(--home-brand-hover)] hover:text-white`}
              >
                <HomeIcon name="ambulance" size={46} stroke={1.5} />
                <span className="mt-1.5 text-[18px] font-extrabold">{emergency.title}</span>
                <span className="text-[14px] leading-[1.55] text-white/88">{emergency.body}</span>
                <span className="mt-1.5 text-[14px] font-bold italic">{emergency.cta}</span>
              </Link>
              <div className={`${photoTile} min-h-[220px]`}>
                <ParallaxLayer factor={0.08} maxOffsetPx={28} className="absolute inset-x-0 -inset-y-[10%]">
                  <Image
                    src={emergency.photo}
                    alt={emergency.photoAlt}
                    fill
                    sizes="(min-width: 1100px) 25vw, 50vw"
                    className="sj-card-zoom object-cover"
                  />
                </ParallaxLayer>
              </div>
            </RevealStagger>
          </div>
        </div>

        <RevealStagger className="grid grid-cols-1 min-[600px]:grid-cols-2 min-[1100px]:grid-cols-4">
          <div className={`${photoTile} h-[260px]`}>
            <ParallaxLayer factor={0.08} maxOffsetPx={28} className="absolute inset-x-0 -inset-y-[10%]">
              <Image
                src={facilities.photo}
                alt={facilities.photoAlt}
                fill
                sizes="(min-width: 1100px) 25vw, 50vw"
                className="sj-card-zoom object-cover"
              />
            </ParallaxLayer>
          </div>
          <Link
            href={localeHref(facilities.href, locale)}
            className={`${cardText} min-h-[260px] bg-[var(--home-accent)] text-[var(--home-on-accent)] hover:bg-[var(--home-accent-hover)] hover:text-[var(--home-on-accent)]`}
          >
            <HomeIcon name="nurse" size={46} stroke={1.5} />
            <span className="mt-1.5 text-[18px] font-extrabold">{facilities.title}</span>
            <span className="text-[14px] leading-[1.55]">{facilities.bodyTemplate.replace("{count}", String(servicesCount))}</span>
            <span className="mt-1.5 text-[14px] font-bold italic">{facilities.cta}</span>
          </Link>
          <div className={`${photoTile} h-[260px]`}>
            <ParallaxLayer factor={0.08} maxOffsetPx={28} className="absolute inset-x-0 -inset-y-[10%]">
              <Image
                src={location.photo}
                alt={location.photoAlt}
                fill
                sizes="(min-width: 1100px) 25vw, 50vw"
                className="sj-card-zoom object-cover"
              />
            </ParallaxLayer>
          </div>
          <a
            href={location.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardText} min-h-[260px] bg-[var(--home-brand)] text-white hover:bg-[var(--home-brand-hover)] hover:text-white`}
          >
            <HomeIcon name="pin" size={46} stroke={1.5} />
            <span className="mt-1.5 text-[18px] font-extrabold">{location.title}</span>
            <span className="text-[14px] leading-[1.55] text-white/88">{location.body}</span>
            <span className="mt-1.5 text-[14px] font-bold italic">{location.cta}</span>
          </a>
        </RevealStagger>
      </Container>
    </section>
  );
}
