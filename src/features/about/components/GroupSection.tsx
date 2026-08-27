import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";
import { groupBody, groupHeading, groupIntro, partnerLogos } from "../data/content";

/**
 * `#group`: the parent group copy ported verbatim from the deleted
 * ParentGroup.tsx, the Kids & Teens logo, and the five-partner marquee.
 *
 * The marquee keeps ParentGroup's `animate-marquee` and edge-fade mask, and
 * `hover:[animation-play-state:paused]` so a viewer can stop it to read a
 * name.
 *
 * `intro` is `groupIntro`, the first sentence of `groupBody[0]`, not the jump
 * card's `note` restated.
 */
export function GroupSection() {
  return (
    <section
      id="group"
      className="mx-auto max-w-[1440px] px-5 pt-26 pb-26 sm:px-8 lg:px-11 max-[640px]:pt-18"
    >
      <SectionHead eyebrow="04 / Our parent group" heading={groupHeading} intro={groupIntro} />

      <Reveal className="mt-10.5 grid gap-10 min-[900px]:grid-cols-[auto_1fr] min-[900px]:items-center">
        <Image
          src="/images/kids-teens-logo.png"
          alt="Kids & Teens Medical Group logo"
          width={223}
          height={218}
          className="h-28 w-auto"
        />
        <div className="flex flex-col gap-4.5">
          {groupBody.map((paragraph) => (
            <p key={paragraph} className="text-[16px] leading-[1.65] text-[var(--home-body)]">
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      <div className="relative mt-14 overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-10 sm:gap-16 hover:[animation-play-state:paused]">
          {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((src, index) => (
            <Image
              key={`${src}-${index}`}
              src={src}
              alt="Partner organization logo"
              width={140}
              height={70}
              className="h-10 w-auto shrink-0 object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-12"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
