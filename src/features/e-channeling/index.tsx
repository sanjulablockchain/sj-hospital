import { PageBanner } from "@/components/layout/PageBanner";
import { DoctorDirectory } from "./components/DoctorDirectory";
import { doctors } from "./data/doctors";

export function EChannelingPage() {
  return (
    <>
      <PageBanner
        title="Make An Appointment"
        subtitle="Consult our in-house doctors at St. Joseph Hospital in Negombo. We have a 24/7 online doctor channeling system to help you book online."
        imageSrc="/images/echanneling-hero.jpg"
        imageAlt="Doctors and nurses with medical equipment at St. Joseph Hospital Negombo"
      />
      <section className="bg-surface px-6 py-16">
        <div className="mx-auto max-w-[1240px]">
          <DoctorDirectory doctors={doctors} />
        </div>
      </section>
    </>
  );
}
