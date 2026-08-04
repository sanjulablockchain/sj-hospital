import Image from "next/image";

type PageBannerProps = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
};

export function PageBanner({ title, subtitle, imageSrc, imageAlt }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-mid">
      {imageSrc && (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            priority
          />
        </div>
      )}
      <div className="relative mx-auto max-w-[1240px] px-6 py-16 sm:py-20">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
