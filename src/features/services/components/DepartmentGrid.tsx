import type { ReactNode } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Tooltip } from "@/components/ui/Tooltip";
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

type Department = { title: string; description: string; icon: ReactNode };
type DepartmentCategory = { name: string; items: Department[] };

const departmentCategories: DepartmentCategory[] = [
  {
    name: "Emergency and Critical Care",
    items: [
      {
        title: "General Physician",
        description: "Everyday health checks and treatment for common illnesses.",
        icon: <StethoscopeIcon />,
      },
      {
        title: "Pediatrics",
        description: "Specialized medical care for infants, children, and teens.",
        icon: <HeartIcon />,
      },
      {
        title: "Orthopedic",
        description: "Diagnosis and treatment of bone, joint, and muscle conditions.",
        icon: <ActivityIcon />,
      },
      {
        title: "Cardiology",
        description: "Expert care for heart health and cardiovascular conditions.",
        icon: <HeartPulseIcon />,
      },
      {
        title: "Surgeon",
        description: "Skilled surgical care across a wide range of procedures.",
        icon: <StethoscopeIcon />,
      },
    ],
  },
  {
    name: "Diagnostic and Imaging Services",
    items: [
      {
        title: "ECG (Electrocardiogram)",
        description: "Quick, accurate heart rhythm testing and monitoring.",
        icon: <ActivityIcon />,
      },
      {
        title: "CTG (Cardiotocography)",
        description: "Fetal heart rate and contraction monitoring for expecting mothers.",
        icon: <HeartPulseIcon />,
      },
      {
        title: "Scanning",
        description: "Advanced imaging for fast, accurate diagnosis.",
        icon: <ScanIcon />,
      },
      {
        title: "Clinical Laboratory",
        description: "Reliable lab testing for accurate diagnostic results.",
        icon: <FlaskIcon />,
      },
      {
        title: "Pharmacy",
        description: "Authorized medicines dispensed by our in-house pharmacy.",
        icon: <PillIcon />,
      },
    ],
  },
  {
    name: "Specialized Medical Care",
    items: [
      {
        title: "Gynecology",
        description: "Comprehensive care for women's reproductive health.",
        icon: <VenusIcon />,
      },
      {
        title: "Dermatology",
        description: "Treatment for skin, hair, and nail conditions.",
        icon: <SmileIcon />,
      },
      {
        title: "Eye Specialist",
        description: "Complete eye exams and vision care.",
        icon: <EyeIcon />,
      },
      {
        title: "ENT (Ear, Nose, and Throat)",
        description: "Diagnosis and treatment of ear, nose, and throat conditions.",
        icon: <EarIcon />,
      },
      {
        title: "Diabetes Care",
        description: "Ongoing management and support for diabetes patients.",
        icon: <DropletIcon />,
      },
      {
        title: "Nutrition",
        description: "Personalized dietary guidance for better health.",
        icon: <LeafIcon />,
      },
      {
        title: "Rheumatology",
        description: "Care for joint, muscle, and autoimmune conditions.",
        icon: <WheelchairIcon />,
      },
    ],
  },
  {
    name: "Rehabilitation Services",
    items: [
      {
        title: "Physiotherapy",
        description: "Movement-based therapy to restore strength and mobility.",
        icon: <WheelchairIcon />,
      },
      {
        title: "Speech Therapy",
        description: "Support for speech, language, and communication difficulties.",
        icon: <CommentIcon />,
      },
      {
        title: "PTA (Physical Therapy Assistant)",
        description: "Hands-on support for physical therapy and recovery plans.",
        icon: <WheelchairIcon />,
      },
      {
        title: "Vaccination Clinic",
        description: "Immunizations for children and adults, on schedule.",
        icon: <SyringeIcon />,
      },
      {
        title: "Telemedicine",
        description: "Consult our doctors remotely from anywhere.",
        icon: <MonitorIcon />,
      },
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
                  <RevealOnScroll
                    key={item.title}
                    className="h-full hover:z-30 focus-within:z-30 has-data-[open=true]:z-30"
                  >
                    <Tooltip
                      content={<p>{item.description}</p>}
                      triggerClassName="flex h-full cursor-pointer flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-white p-5 text-center transition duration-200 ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_20px_36px_-20px_rgba(74,42,130,0.35)] focus-visible:-translate-y-1 focus-visible:border-accent/30 focus-visible:shadow-[0_20px_36px_-20px_rgba(74,42,130,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 data-[open=true]:-translate-y-1 data-[open=true]:border-accent/30 data-[open=true]:shadow-[0_20px_36px_-20px_rgba(74,42,130,0.35)]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF7FD] text-accent-dark transition-colors duration-200 group-hover:bg-accent group-hover:text-white group-focus-visible:bg-accent group-focus-visible:text-white group-data-[open=true]:bg-accent group-data-[open=true]:text-white">
                        {item.icon}
                      </div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                    </Tooltip>
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
