import type { ServiceGroup } from "../types";

export const SERVICE_GROUPS = [
  "Emergency",
  "Surgical",
  "Diagnostics",
  "Clinics",
  "Women & children",
  "At home",
] as const satisfies readonly ServiceGroup[];

export const GROUPS = ["All", ...SERVICE_GROUPS] as const;
