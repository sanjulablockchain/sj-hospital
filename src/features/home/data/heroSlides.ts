/**
 * The photographs the home hero rotates through, in order. The first slide is
 * the one `hero.photoAlt` describes and the only one that carries alt text;
 * the rest are decorative repeats of the same subject.
 *
 * `positionClass` is the object-position for `object-cover`. The hero box is
 * 128% of a min-h-screen section, so on a phone only around 40% of the frame's
 * width survives the crop and the focal point has to be chosen per shot. The
 * threshold is an aspect ratio, not a width (a portrait tablet crops like a
 * phone), which is why the overrides key on `min-aspect-ratio`.
 */
export type HeroSlide = {
  src: string;
  positionClass: string;
};

export const heroSlides: readonly HeroSlide[] = [
  {
    // Dusk facade: the signage over the entrance sits at 45-70% across, the
    // building fills the middle. Centred works at every aspect.
    src: "/images/home/hero-dusk-facade.jpg",
    positionClass: "object-[50%_50%]",
  },
  {
    // Night facade: symmetrical, entrance dead centre.
    src: "/images/home/hero-night-facade.jpg",
    positionClass: "object-[50%_50%]",
  },
  {
    // Night gate: the lit "St. JOSEPH HOSPITAL" lettering runs 27-55% across
    // with the leaf to its left and the services pylon at 62-82%. A portrait
    // crop centred at 40% keeps the lettering and most of the leaf; once the
    // frame is wide enough the pylon comes back on its own.
    src: "/images/home/hero-night-gate.jpg",
    positionClass: "object-[40%_50%] [@media(min-aspect-ratio:5/4)]:object-[50%_50%]",
  },
];

/** Time each slide holds before the next crossfade begins. */
export const HERO_SLIDE_INTERVAL_MS = 7000;
