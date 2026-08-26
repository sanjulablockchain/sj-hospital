import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "./SectionHead";
import { jumpCards, storyParagraphs } from "../data/content";

/**
 * `#story`: the four paragraphs ported verbatim from the deleted Intro.tsx, in
 * a prose column beside the same facility photograph the hero uses.
 *
 * `heading` and `intro` reuse `jumpCards[0]`'s already-approved label and note
 * rather than introducing new copy: every string on this page has to already
 * exist in the repo, and the jump card strings are the one exception carved
 * out for exactly this kind of restatement.
 */
export function StorySection() {
  return (
    <section id="story" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
      <SectionHead eyebrow="01 / Who we are" heading={jumpCards[0].label} intro={jumpCards[0].note} />

      <div className="mt-10.5 grid gap-10 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[900px]:items-center min-[900px]:gap-16">
        <Reveal className="flex flex-col gap-4.5">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-[16px] leading-[1.65] text-[var(--home-body)]">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#08123A]">
            <Image
              src="/images/about-facility.jpg"
              alt="The St. Joseph Hospital building in Negombo"
              fill
              sizes="(min-width: 900px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
