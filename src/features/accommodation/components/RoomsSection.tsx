import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { SectionHead } from "./SectionHead";
import { RoomTypeNav } from "./RoomTypeNav";
import { roomsHeading, roomsIntro, roomTypes } from "../data/content";

/**
 * `#rooms`: the sticky `RoomTypeNav` plus the four room categories, ported
 * verbatim from the deleted RoomTypes.tsx, each still carrying the alternating
 * copy/photo layout, the two-up photo grid below 1024px and the
 * large-plus-inset arrangement above it.
 *
 * `RoomTypeNav` sits outside the padded, max-width wrapper the heading and the
 * room list use, the same arrangement the old RoomTypes.tsx had, so its sticky
 * bar stays full-bleed rather than boxed in by the section's own gutters.
 *
 * `heading` and `intro` are `roomsHeading` and `roomsIntro`: RoomTypes.tsx's
 * own old h2 and meals sentence, so this section states nothing new.
 *
 * Each room wrapper carries `scroll-mt-[88px]`, matched to `RoomTypeNav`'s own
 * sticky bar so it clears the room heading rather than covering it (or, if
 * oversized, leaving it absurdly far below the bar). The bar renders at about
 * 64px tall: a 1px bottom border, `py-3`'s 24px of vertical padding, and a
 * chip's own 36px (`text-sm`'s 20px line height plus `py-2`'s 16px), rounded
 * up. 88px adds about 24px of breathing room past that, so a hash jump to,
 * say, `#super-deluxe` leaves the heading clear of the bar.
 */
export function RoomsSection() {
  return (
    <section id="rooms">
      <div className="mx-auto max-w-[1440px] px-5 pt-26 sm:px-8 lg:px-11 max-[640px]:pt-18">
        <SectionHead eyebrow="01 / Our rooms" heading={roomsHeading} intro={roomsIntro} />
      </div>

      <div className="mt-10.5">
        <RoomTypeNav />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-11">
        <div className="flex flex-col gap-16">
          {roomTypes.map((room, index) => (
            <RevealOnScroll key={room.id} delayMs={index * 60}>
              <div
                id={room.id}
                className="scroll-mt-[88px] grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <div className="mb-2.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-bold text-[var(--home-heading)]">
                      {room.name}
                    </h3>
                    <span className="font-display text-lg font-semibold text-[var(--home-accent)]">
                      {room.price}
                    </span>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-[var(--home-muted)]">{room.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-1.5 border border-[var(--home-hairline)] bg-[var(--home-surface)] px-3.5 py-1.5 text-sm font-semibold text-[var(--home-body)] transition-colors duration-200 hover:bg-[var(--home-accent)]/10"
                      >
                        <span className="text-[var(--home-accent)]">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="shrink-0"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="grid grid-cols-2 gap-3 lg:hidden">
                    {room.photos.map((photo) => (
                      <div
                        key={photo.src}
                        className="group relative aspect-3/4 overflow-hidden rounded-2xl"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="45vw"
                          className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="relative hidden aspect-4/3 lg:block">
                    <div className="group absolute inset-0 overflow-hidden rounded-2xl">
                      <Image
                        src={room.photos[0].src}
                        alt={room.photos[0].alt}
                        fill
                        sizes="40vw"
                        className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                      />
                    </div>
                    {room.photos[1] && (
                      <div
                        className={`group absolute bottom-4 h-28 w-40 overflow-hidden rounded-xl border-4 border-[var(--home-bg)] shadow-xl xl:h-32 xl:w-44 ${
                          index % 2 === 1 ? "left-4" : "right-4"
                        }`}
                      >
                        <Image
                          src={room.photos[1].src}
                          alt={room.photos[1].alt}
                          fill
                          sizes="16vw"
                          className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
