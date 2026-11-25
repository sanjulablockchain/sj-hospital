import Image from "next/image";
import { LOGO_LOCKUP } from "@/config/brand";

type LogoLockupProps = {
  alt: string;
  /** Size classes shared by every variant, e.g. `h-9 w-auto`. */
  className?: string;
  /** Below `sm`, show the tagline free lockup (the mobile header). */
  compactBelowSm?: boolean;
};

type Variant = { src: string; show: string };

/**
 * The horizontal logo, in its own colours on the light theme and with a
 * white wordmark (and tagline) on the dark one. Every variant is rendered
 * and CSS shows one: the theme on `#sj-root` (`data-theme`) picks light or
 * dark before paint, and `compactBelowSm` swaps in the tagline free lockup
 * under 640px, where the tagline is too small to read.
 *
 * All variants load lazily, on purpose: a lazy image that is `display:
 * none` is never fetched, so only the one on screen downloads, and that one
 * starts at once because it is in the viewport. The hero holds the page's
 * preload. A hidden image is outside the accessibility tree, so the shared
 * alt text is read once.
 */
export function LogoLockup({ alt, className = "", compactBelowSm = false }: LogoLockupProps) {
  // Class names are written out in full: Tailwind only generates classes it
  // finds literally in the source, so they cannot be assembled from parts.
  const variants: Variant[] = compactBelowSm
    ? [
        { src: LOGO_LOCKUP.compactSrc, show: "block sm:hidden [[data-theme=dark]_&]:hidden" },
        { src: LOGO_LOCKUP.src, show: "hidden sm:block [[data-theme=dark]_&]:hidden" },
        { src: LOGO_LOCKUP.compactDarkSrc, show: "hidden [[data-theme=dark]_&]:max-sm:block" },
        { src: LOGO_LOCKUP.darkSrc, show: "hidden [[data-theme=dark]_&]:sm:block" },
      ]
    : [
        { src: LOGO_LOCKUP.src, show: "block [[data-theme=dark]_&]:hidden" },
        { src: LOGO_LOCKUP.darkSrc, show: "hidden [[data-theme=dark]_&]:block" },
      ];
  return (
    <>
      {variants.map(({ src, show }) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          width={LOGO_LOCKUP.width}
          height={LOGO_LOCKUP.height}
          data-logo
          className={`${show} ${className}`}
        />
      ))}
    </>
  );
}
