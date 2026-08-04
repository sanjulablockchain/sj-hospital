import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

type RoomType = {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  photos: { src: string; alt: string }[];
};

const roomTypes: RoomType[] = [
  {
    id: "standard",
    name: "Standard Rooms",
    description:
      "Our standard rooms offer essential comfort to suit your basics and function, backed by comprehensive medical support.",
    amenities: [
      "Hot & cool water",
      "TV",
      "Wi-Fi",
      "Bystander bed & chair",
      "Air conditioning",
      "Necessary medical support",
    ],
    photos: [
      { src: "/images/rooms/standard-1.jpg", alt: "Standard room at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/standard-2.jpg", alt: "Standard room detail" },
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe Rooms",
    description: "A larger space with added comfort for patients who want a bit more.",
    amenities: [
      "Hot & cool water",
      "TV",
      "Wi-Fi",
      "Bystander bed & sofa",
      "Air conditioning",
      "Pantry area with tea station",
      "Coffee table",
      "Hot water kettle",
    ],
    photos: [
      { src: "/images/rooms/deluxe-1.jpg", alt: "Deluxe room at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/deluxe-2.jpg", alt: "Deluxe room detail" },
    ],
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Rooms",
    description: "Our most premium inpatient rooms, with dedicated steward service.",
    amenities: [
      "Hot & cool water",
      "TV",
      "Wi-Fi",
      "Bystander bed, sofa & chair",
      "Air conditioning",
      "Pantry with tea station",
      "Coffee table",
      "Hot water kettle",
      "Morning papers",
      "Separate steward service",
    ],
    photos: [
      { src: "/images/rooms/super-deluxe-1.jpg", alt: "Super Deluxe room at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/super-deluxe-2.jpg", alt: "Super Deluxe room detail" },
    ],
  },
  {
    id: "wards",
    name: "Wards",
    description:
      "Comfortable shared wards with 3-bed and 2-bed options and bed separators for privacy. Upon discharge, patients may receive a complimentary fruit or chocolate basket. Discounts may also be available at the attending physician's discretion, and VIP service is available for those seeking enhanced care.",
    amenities: [
      "Air conditioning",
      "Hot & cool water",
      "Individual bystander beds & chairs",
      "TV",
      "3-bed & 2-bed options",
      "Common washroom",
      "Bed separators for privacy",
    ],
    photos: [
      { src: "/images/rooms/wards-1.jpg", alt: "Ward at St. Joseph Hospital Negombo" },
      { src: "/images/rooms/wards-2.jpg", alt: "Ward detail" },
    ],
  },
];

export function RoomTypes() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-2xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Our Inpatient Room Types
          </p>
          <h2 className="mb-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Rooms ranging from functional to premium
          </h2>
          <p className="text-base text-muted">
            Enjoy three daily meals with a choice of Eastern, Western, or Sri Lankan cuisine,
            including a diabetic menu option, plus tea or coffee with a snack.
          </p>
        </RevealOnScroll>

        <div className="flex flex-col gap-16">
          {roomTypes.map((room, index) => (
            <RevealOnScroll key={room.id} delayMs={index * 60}>
              <div id={room.id} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <h3 className="mb-2.5 font-heading text-2xl font-bold text-ink">{room.name}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{room.description}</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                    {room.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#33B4E5"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`grid grid-cols-2 gap-3 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  {room.photos.map((photo) => (
                    <div key={photo.src} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
