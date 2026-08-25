import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { gallery } from "../data/content";

/**
 * `#gallery`: the three cleared photographs, each in a 4:3 frame that zooms on
 * hover.
 *
 * The logo mark is `contain` with padding rather than `cover`: cropping a
 * brand mark to fill a 4:3 box is exactly the misuse the section's own copy
 * warns against. `content.test.ts` pins that.
 *
 * `group` here rather than the shared `sj-tint`: what moves is the image inside
 * the frame, not the card, so this is Tailwind's group-hover on the <Image>
 * (which the accommodation and facilities showcases already do) rather than a
 * card-level utility.
 */
export function GallerySection() {
  return (
    <section id="gallery" className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18.5">
      <Reveal>
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          04 / Image library
        </div>
        <h2 className="font-display mt-4.5 text-[clamp(36px,4.4vw,64px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          Approved for
          <br />
          publication
        </h2>
        <p className="mt-4.5 max-w-[54ch] text-[16.5px] leading-[1.6] text-[var(--home-muted)]">
          Every photograph here is cleared for editorial use. Nothing showing an identifiable
          patient is released, at any resolution, without written consent on file.
        </p>
      </Reveal>

      <RevealStagger
        stepMs={70}
        className="mt-10 grid grid-cols-3 gap-px bg-[var(--home-hairline)] max-[1023px]:grid-cols-2 max-[640px]:grid-cols-1"
      >
        {gallery.map((shot) => (
          <figure key={shot.src} className="group flex flex-col bg-[var(--home-bg)]">
            {/* The padding sits on the frame, not the image: `fill` resolves
                `inset: 0` against the padding box, so the mark is inset without
                being scaled down a second time. */}
            <span
              className={`relative block aspect-[4/3] overflow-hidden ${
                shot.fit === "contain" ? "p-10.5" : ""
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className={`transition-transform duration-[600ms] ease-out group-hover:scale-[1.06] ${
                  shot.fit === "contain" ? "object-contain" : "object-cover"
                }`}
              />
            </span>
            <figcaption className="flex flex-col gap-1.5 px-5.5 pt-5 pb-6">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[var(--home-accent-soft)] uppercase">
                {shot.tag}
              </span>
              <span className="font-display text-[20px] leading-[1.1] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
                {shot.title}
              </span>
              <span className="text-[13.5px] leading-[1.5] text-[var(--home-muted)]">
                {shot.credit}
              </span>
            </figcaption>
          </figure>
        ))}
      </RevealStagger>
    </section>
  );
}
