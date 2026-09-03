import Image from "next/image";
import Link from "next/link";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { LOGO_MARK } from "@/config/brand";
import type { HomeContent } from "../data/getContent";

export function ContactCtaSection({ content }: { content: HomeContent["content"]["contactCta"] }) {
  const { eyebrow, heading, body, ctaSurgical, ctaRooms } = content;

  return (
    <section id="book" className="mx-auto max-w-[1440px] px-5 pt-31.5 sm:px-8 lg:px-11">
      <div className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="relative min-w-0 overflow-hidden bg-[var(--home-accent)] p-9 py-13 text-[var(--home-on-accent)] sm:p-11">
          <ParallaxLayer
            factor={0.09}
            maxOffsetPx={52}
            className="pointer-events-none absolute -top-[22%] -right-[8%] w-[42%] opacity-14"
          >
            <Image
              src={LOGO_MARK.src}
              alt=""
              width={LOGO_MARK.width}
              height={LOGO_MARK.height}
              className="h-auto w-full"
            />
          </ParallaxLayer>
          <div className="relative text-[11.5px] font-bold tracking-[0.24em] uppercase opacity-70">{eyebrow}</div>
          <h2 className="font-display relative mt-4.5 wrap-break-word text-[clamp(36px,5vw,72px)] leading-[0.9] font-extrabold tracking-[-0.04em] uppercase">
            {heading.line1}
            <br />
            {heading.line2}
            <br />
            {heading.line3}
          </h2>
          <p className="relative mt-5.5 max-w-[40ch] text-[17px] leading-[1.6] opacity-85">{body}</p>
        </div>
        <div className="flex min-w-0 flex-col bg-[var(--home-bg)]">
          <Link
            href="/services/general-surgery"
            className="sj-invert font-display flex flex-1 items-center justify-between gap-5 border-b border-[var(--home-hairline)] px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-[var(--home-heading)]"
          >
            <span className="wrap-break-word">{ctaSurgical}</span> <span aria-hidden className="shrink-0">&rarr;</span>
          </Link>
          <Link
            href="/accommodation#book"
            className="sj-invert font-display flex flex-1 items-center justify-between gap-5 border-b border-[var(--home-hairline)] px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-[var(--home-heading)]"
          >
            <span className="wrap-break-word">{ctaRooms}</span> <span aria-hidden className="shrink-0">&rarr;</span>
          </Link>
          <a
            href="tel:+94117848484"
            className="sj-invert font-display flex flex-1 items-center justify-between gap-5 px-8 py-7 text-[25px] font-semibold tracking-[-0.02em] text-[var(--home-heading)] tabular-nums"
          >
            0117 84 84 84 <span aria-hidden>&#9742;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
