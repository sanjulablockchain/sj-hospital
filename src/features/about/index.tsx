import { PageBanner } from "@/components/layout/PageBanner";
import { Intro } from "./components/Intro";
import { WhyDifferent } from "./components/WhyDifferent";
import { MissionVision } from "./components/MissionVision";
import { ParentGroup } from "./components/ParentGroup";

export function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        subtitle="US standard, high-quality healthcare, brought to Negombo."
        imageSrc="/images/about-facility.jpg"
        imageAlt="St. Joseph Hospital Negombo facility"
      />
      <Intro />
      <WhyDifferent />
      <MissionVision />
      <ParentGroup />
    </>
  );
}
