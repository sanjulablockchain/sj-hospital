import { PageBanner } from "@/components/layout/PageBanner";
import { ContactForm, ContactInfo } from "@/features/contact";
import { RoomTypes } from "./components/RoomTypes";
import { SpecialtiesChecklist } from "./components/SpecialtiesChecklist";

export function AccommodationPage() {
  return (
    <>
      <PageBanner
        title="Experience US Standard Comfort and Facilities in Our Inpatient Rooms"
        subtitle="Starting at affordable rates."
        imageSrc="/images/rooms/wards-1.jpg"
        imageAlt="Inpatient room at St. Joseph Hospital Negombo"
      />
      <RoomTypes />

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <SpecialtiesChecklist />

            <div className="flex h-full flex-col rounded-[22px] border border-ink/10 bg-white p-7 sm:p-8">
              <h3 className="mb-1 font-heading text-xl font-bold text-primary">Book an Inpatient Room</h3>
              <p className="mb-6 text-sm text-muted">
                Send us a message and our team will help you find the right room.
              </p>
              <ContactForm />
            </div>
          </div>

          <ContactInfo />
        </div>
      </section>
    </>
  );
}
