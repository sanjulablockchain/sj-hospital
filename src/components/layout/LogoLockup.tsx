import Image from "next/image";
import { LOGO_LOCKUP } from "@/config/brand";

type LogoLockupProps = {
  alt: string;
  /** Size classes for both variants, e.g. `h-9 w-auto`. */
  className?: string;
  /**
   * Above the fold (the header). The light variant takes `preload`, the dark
   * one loads eagerly, and React preloads that too: two small SVGs (about
   * 10 KB each gzipped), so a dark theme visitor's logo never arrives late.
   */
  preload?: boolean;
};

/**
 * The horizontal logo, in its own colours on the light theme and with a
 * white wordmark and tagline on the dark one. Both images are rendered and
 * the theme on `#sj-root` (`data-theme`) shows one, so the swap happens
 * before paint with no client code. A `display: none` image is outside the
 * accessibility tree, so the shared alt text is read once.
 */
export function LogoLockup({ alt, className = "", preload = false }: LogoLockupProps) {
  const size = { width: LOGO_LOCKUP.width, height: LOGO_LOCKUP.height };
  return (
    <>
      <Image
        {...size}
        alt={alt}
        src={LOGO_LOCKUP.src}
        data-logo
        className={`block [[data-theme=dark]_&]:hidden ${className}`}
        preload={preload}
      />
      <Image
        {...size}
        alt={alt}
        src={LOGO_LOCKUP.darkSrc}
        data-logo
        className={`hidden [[data-theme=dark]_&]:block ${className}`}
        loading={preload ? "eager" : "lazy"}
      />
    </>
  );
}
