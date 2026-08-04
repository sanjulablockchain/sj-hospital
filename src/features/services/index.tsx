import { PageBanner } from "@/components/layout/PageBanner";
import { MainServicesGrid } from "./components/MainServicesGrid";
import { DepartmentGrid } from "./components/DepartmentGrid";

export function ServicesPage() {
  return (
    <>
      <PageBanner
        title="Receive USA Standard Healthcare at Affordable Prices Here in Sri Lanka"
        imageSrc="/images/doctors.jpg"
        imageAlt="Doctors at St. Joseph Hospital Negombo"
      />
      <MainServicesGrid />
      <DepartmentGrid />
    </>
  );
}
