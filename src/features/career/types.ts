/** A department filter chip. `All` is synthesised, the rest are derived from `jobs`. */
export type Department = string;

export type Job = {
  title: string;
  /** The one-line meta under the title: contract, roster, location. */
  line: string;
  department: Department;
  body: string;
  /** "You will need" column. */
  requirements: readonly string[];
  /** "The detail" column. */
  detail: readonly string[];
};

export type FactRow = { k: string; v: string };

export type JumpCard = { count: string; label: string; note: string; href: string };

export type BenefitGroup = {
  kind: string;
  title: string;
  items: readonly string[];
};

export type ProcessStep = {
  n: string;
  title: string;
  /** Right-aligned timing badge. */
  when: string;
  body: string;
};

export type StudentRoute = {
  kind: string;
  title: string;
  body: string;
  /** Revealed on hover, at the foot of the tile. */
  who: string;
};

/* ---- Application form ---- */

/** The nine text fields, in the order the form asks for them. */
export type JobApplicationField =
  | "fullName"
  | "roleTitle"
  | "email"
  | "phone"
  | "registrationNumber"
  | "experience"
  | "startDate"
  | "source"
  | "note";

export type JobApplicationFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<JobApplicationField | "consent" | "cv", string[]>>;
  /**
   * What the applicant typed, echoed back on a rejection.
   *
   * React resets an uncontrolled form once its action resolves, so without this
   * a submission the server turns down (a CV over 5 MB, say) would empty all
   * nine fields and make the applicant start again. The form feeds these back
   * in as `defaultValue`. Absent on success, which is what clears the form.
   */
  values?: Partial<Record<JobApplicationField, string>>;
  /** True when consent was ticked, so the checkbox can be restored too. */
  consentGiven?: boolean;
};

export const initialJobApplicationFormState: JobApplicationFormState = {
  status: "idle",
  message: "",
};
