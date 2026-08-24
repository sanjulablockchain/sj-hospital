import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RevealStagger } from "@/components/ui/RevealStagger";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { comforts } from "@/features/services/data/indexContent";

type FacilityCard = {
  index: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  photo: string;
  photoAlt: string;
};

const facilityCards: FacilityCard[] = [
  {
    index: "01",
    title: "One campus, six floors",
    body: "A purpose-built hospital in Negombo, with covered arrival for both the ambulance bay and outpatients.",
    linkLabel: "See Accident & Emergency",
    href: "/services/accident-emergency",
    photo: "/images/hero-exterior.png",
    photoAlt: "St. Joseph Hospital exterior",
  },
  {
    index: "02",
    title: "Reception & OPD",
    body: "A 24-hour outpatient department, staffed alongside the emergency entrance for whenever you arrive.",
    linkLabel: "See admissions",
    href: "#admissions",
    photo: "/images/welcome.jpg",
    photoAlt: "Hospital reception desk",
  },
  {
    index: "03",
    title: "Wards, rooms & ICU",
    body: "Private and semi-private rooms from 10,000 LKR a night, backed by a full ICU for higher-dependency care.",
    linkLabel: "See intensive & critical care",
    href: "/services/intensive-critical-care",
    photo: "/images/doctors.jpg",
    photoAlt: "Doctor and nurse reviewing a patient's file at the bedside",
  },
  {
    index: "04",
    title: "Ambulance entrance",
    body: "A covered entrance served by our own ambulance fleet, ten minutes from Bandaranaike International.",
    linkLabel: "See international care",
    // The /international-care page supersedes this index's own #international
    // band, the same way /facilities and /pharmacy superseded theirs. The band
    // stays as the summary; this card is the way through to the full page.
    href: "/international-care",
    photo: "/images/services/exterior-dusk-b.png",
    photoAlt: "Hospital exterior and ambulance entrance",
  },
];

/**
 * `#facilities`: four campus cards in the home page's canonical photo-card
 * idiom (`ParallaxLayer` drift, bottom bar wipe, body lift on hover), followed
 * by the everyday-comfort chips. The cards' dark navy base and pale-blue
 * index colour are fixed literals rather than `--home-*` tokens (matching
 * `features/home/components/FacilitiesSection.tsx` exactly) because a photo
 * needs a dark scrim to keep white text legible in both the light and dark
 * site themes, the same reasoning that exempts the hero.
 */
export function FacilitiesSection() {
  return (
    <section id="facilities" className="mx-auto max-w-[1440px] pt-30">
      <Reveal className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-11">
        <div className="text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent)] uppercase">
          07 / Facilities
        </div>
        <h2 className="font-display mt-4.5 mb-7.5 text-[clamp(38px,4.4vw,66px)] leading-[0.92] font-extrabold tracking-[-0.035em] text-[var(--home-heading)] uppercase">
          A campus built
          <br />
          for the whole stay
        </h2>
      </Reveal>

      <RevealStagger
        stepMs={95}
        className="grid grid-cols-1 gap-px bg-[var(--home-hairline)] min-[640px]:grid-cols-2 min-[1024px]:grid-cols-4"
      >
        {facilityCards.map((card) => (
          <article
            key={card.index}
            className="group relative flex min-h-[430px] items-end overflow-hidden bg-[#08123A]"
          >
            <ParallaxLayer factor={0.05} maxOffsetPx={26} className="absolute inset-x-0 -top-[8%] h-[116%]">
              <Image
                src={card.photo}
                alt={card.photoAlt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-55 transition-transform duration-700 group-hover:scale-[1.09] group-hover:opacity-78"
              />
            </ParallaxLayer>
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(rgba(6,11,31,0.08) 30%, rgba(6,11,31,0.94) 100%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[var(--home-accent)] transition-transform duration-[450ms] group-hover:scale-x-100" />
            <div className="relative p-7 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="text-[12px] font-bold tracking-[0.18em] text-[#7FCBFF]">{card.index}</div>
              <h3 className="font-display mt-3 text-[26px] leading-[1.06] font-semibold tracking-[-0.025em] text-white">
                {card.title}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-[1.55] text-white/78">{card.body}</p>
              <a
                href={card.href}
                className="mt-3.5 inline-flex translate-y-2.5 items-center gap-2 text-[13.5px] font-bold text-[#7FCBFF] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
              >
                {card.linkLabel} <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </article>
        ))}
      </RevealStagger>

      <Reveal className="mx-auto mt-11.5 max-w-[1440px] px-5 sm:px-8 lg:px-11">
        <h3 className="font-display text-[19px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--home-heading)]">
          Everyday comforts
        </h3>
        <ul className="mt-4.5 flex flex-wrap gap-2.5">
          {comforts.map((item) => (
            <li
              key={item}
              className="border border-[var(--home-hairline-strong)] px-3.5 py-2 text-[13px] font-bold text-[var(--home-heading)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
