import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import {
  StethoscopeIcon,
  HeartIcon,
  ActivityIcon,
  HeartPulseIcon,
  ScanIcon,
  FlaskIcon,
  PillIcon,
  VenusIcon,
  SmileIcon,
  EyeIcon,
  EarIcon,
  DropletIcon,
  LeafIcon,
  WheelchairIcon,
  CommentIcon,
  SyringeIcon,
  MonitorIcon,
} from "./DepartmentIcons";

type Department = { title: string; icon: ReactNode };
type DepartmentCategory = { name: string; items: Department[] };

const departmentCategories: DepartmentCategory[] = [
  {
    name: "Emergency and Critical Care",
    items: [
      { title: "General Physician", icon: <StethoscopeIcon /> },
      { title: "Pediatrics", icon: <HeartIcon /> },
      { title: "Orthopedic", icon: <ActivityIcon /> },
      { title: "Cardiology", icon: <HeartPulseIcon /> },
      { title: "Surgeon", icon: <StethoscopeIcon /> },
    ],
  },
  {
    name: "Diagnostic and Imaging Services",
    items: [
      { title: "ECG (Electrocardiogram)", icon: <ActivityIcon /> },
      { title: "CTG (Cardiotocography)", icon: <HeartPulseIcon /> },
      { title: "Scanning", icon: <ScanIcon /> },
      { title: "Clinical Laboratory", icon: <FlaskIcon /> },
      { title: "Pharmacy", icon: <PillIcon /> },
    ],
  },
  {
    name: "Specialized Medical Care",
    items: [
      { title: "Gynecology", icon: <VenusIcon /> },
      { title: "Dermatology", icon: <SmileIcon /> },
      { title: "Eye Specialist", icon: <EyeIcon /> },
      { title: "ENT (Ear, Nose, and Throat)", icon: <EarIcon /> },
      { title: "Diabetes Care", icon: <DropletIcon /> },
      { title: "Nutrition", icon: <LeafIcon /> },
      { title: "Rheumatology", icon: <WheelchairIcon /> },
    ],
  },
  {
    name: "Rehabilitation Services",
    items: [
      { title: "Physiotherapy", icon: <WheelchairIcon /> },
      { title: "Speech Therapy", icon: <CommentIcon /> },
      { title: "PTA (Physical Therapy Assistant)", icon: <WheelchairIcon /> },
      { title: "Vaccination Clinic", icon: <SyringeIcon /> },
      { title: "Telemedicine", icon: <MonitorIcon /> },
    ],
  },
];

export function DepartmentGrid() {
  return (
    <section className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-[1240px]">
        <RevealOnScroll className="mx-auto mb-13 max-w-xl text-center">
          <p className="mb-3 font-heading text-[13px] font-bold uppercase tracking-[0.12em] text-accent-dark">
            Departments
          </p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Specialties We Cover
          </h2>
        </RevealOnScroll>

        <div className="flex flex-col gap-12">
          {departmentCategories.map((category) => (
            <div key={category.name}>
              <h3 className="mb-5 font-heading text-lg font-bold text-ink">{category.name}</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {category.items.map((item) => (
                  <RevealOnScroll key={item.title}>
                    <div className="flex h-full flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-white p-5 text-center">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF7FD] text-accent-dark">
                        {item.icon}
                      </div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
