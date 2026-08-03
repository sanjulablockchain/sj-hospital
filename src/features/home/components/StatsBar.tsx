import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

type Stat = {
  target: number;
  suffix?: string;
  prefix?: string;
  caption: string;
};

const stats: Stat[] = [
  {
    target: 24,
    suffix: "/7",
    caption: "Always open for OPD, Emergency & Pharmacy",
  },
  {
    target: 10000,
    caption: "LKR, starting price for inpatient rooms",
  },
  {
    target: 2,
    prefix: "Every ",
    suffix: "h",
    caption: "Deep-cleaned to US standards",
  },
  {
    target: 100,
    suffix: "%",
    caption: "Authorized medicine only",
  },
];

export function StatsBar() {
  return (
    <section className="bg-white px-6 pb-14">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <RevealOnScroll key={stat.caption} delayMs={index * 90}>
            <div className="rounded-[20px] border border-ink/10 bg-surface p-7 text-center">
              <div className="font-heading text-4xl font-extrabold leading-none text-primary">
                <AnimatedCounter
                  target={stat.target}
                  prefix={stat.prefix ?? ""}
                  suffix={stat.suffix ?? ""}
                />
              </div>
              <div className="mt-2 text-sm font-semibold text-muted">
                {stat.caption}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
