import { PageBanner } from "@/components/layout/PageBanner";
import { Intro } from "./components/Intro";
import { WhyWorkWithUs } from "./components/WhyWorkWithUs";
import { OpenRoles } from "./components/OpenRoles";

export function CareerPage() {
  return (
    <>
      <PageBanner
        title="Join the Team That Heals With Purpose"
        subtitle="More than a career, it's a calling to care, serve, and make a difference in lives."
        imageSrc="/images/career-staff.jpg"
        imageAlt="St. Joseph Hospital Negombo staff"
      />
      <Intro />
      <WhyWorkWithUs />
      <OpenRoles />
    </>
  );
}
