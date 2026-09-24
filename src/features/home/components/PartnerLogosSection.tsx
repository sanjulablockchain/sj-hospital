import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { orgGroups } from "@/features/network";
import type { Locale } from "@/lib/i18n/locales";
import { localeHref } from "@/lib/i18n/paths";
import type { HomeContent } from "../data/getContent";
import { Container, Eyebrow, ArrowRight } from "./primitives";

/**
 * An infinite logo marquee of the nine group companies, between the network
 * accordion and the FAQ. The logos are `network`'s own (`orgGroups`), so the
 * family has one home and this band can never list a company the network
 * page does not. Two identical tracks scroll left inside a `w-max` row; the
 * duplicate is `aria-hidden`, so a screen reader hears each company once.
 * Logos sit desaturated and take their colour and a lift on hover; the
 * marquee pauses while the pointer is over it. Every logo opens the family
 * section of the network page.
 */
export function PartnerLogosSection({ content, locale }: { content: HomeContent["network"]; locale: Locale }) {
  const orgs = orgGroups.flatMap((group) => group.orgs);
  const href = localeHref(content.familyHref, locale);

  return (
    <section id="family" className="pb-20 sm:pb-27.5">
      <Container className="flex flex-col gap-8">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <Eyebrow>{content.familyEyebrow}</Eyebrow>
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-[14px] font-extrabold text-[var(--home-brand-text)] hover:text-[var(--home-accent-soft)]"
          >
            {content.familyCta} <ArrowRight />
          </Link>
        </Reveal>
        <div
          className="sj-marquee relative overflow-hidden py-2"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div className="animate-sj-tick flex w-max items-center">
            <LogoTrack orgs={orgs} href={href} />
            <LogoTrack orgs={orgs} href={href} hidden />
          </div>
        </div>
      </Container>
    </section>
  );
}

function LogoTrack({
  orgs,
  href,
  hidden,
}: {
  orgs: (typeof orgGroups)[number]["orgs"];
  href: string;
  hidden?: boolean;
}) {
  return (
    <ul aria-hidden={hidden} className="m-0 flex list-none items-center gap-5 p-0 pr-5">
      {orgs.map((org) => (
        <li key={org.slug}>
          <Link
            href={href}
            tabIndex={hidden ? -1 : undefined}
            title={org.wordmark}
            // Tile and logo mark treatment live in globals.css: the tile
            // follows the theme (`.sj-logo-tile`), and the logo itself sits
            // on a small white plate (`.sj-logo-mark`) that reads correctly
            // whichever tile it is on, since two of the nine logos are
            // full-colour badges a white-mark invert would have collapsed
            // into a blank disc.
            className="sj-card-lift sj-logo-tile group flex h-[96px] w-[176px] items-center justify-center rounded-[14px] border border-[var(--home-hairline)] px-6"
          >
            <span className="sj-logo-mark flex h-[72px] w-[72px] items-center justify-center rounded-[10px] p-2">
              <Image
                src={org.logo}
                alt={hidden ? "" : org.wordmark}
                width={64}
                height={64}
                className="h-full w-full object-contain"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
