const specialties = [
  "Comfortable & Spacious Rooms",
  "24/7 Medical Assistance",
  "Advanced Patient Monitoring",
  "Private & Semi-Private Options",
  "High-Quality Hygiene & Safety",
  "Personalized Meal Plans",
  "Family-Friendly Facilities",
  "Television & Wi-Fi Access",
  "Emergency Response System",
  "Pharmacy & Diagnostic Support",
];

export function SpecialtiesChecklist() {
  return (
    <div className="rounded-[22px] border border-ink/10 bg-white p-7 sm:p-8">
      <h3 className="mb-5 font-heading text-xl font-bold text-primary">
        Specialties of Our Inpatient Rooms
      </h3>
      <ul className="flex flex-col gap-2.5">
        {specialties.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 rounded-full bg-surface px-4 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent/10"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#33B4E5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
