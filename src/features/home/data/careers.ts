export type JobOpening = {
  title: string;
  department: string;
  type: string;
};

export const jobOpenings: JobOpening[] = [
  { title: "Medical Officer, Emergency", department: "Emergency", type: "Full time" },
  { title: "Theatre Nurse", department: "Surgical", type: "Full time" },
  { title: "Pharmacist (night shift)", department: "Pharmacy", type: "Shift" },
  { title: "Medical Laboratory Technologist", department: "Laboratory", type: "Full time" },
  { title: "Radiographer, Digital X-ray", department: "Imaging", type: "Full time" },
];
