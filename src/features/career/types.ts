export type JobApplicationFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<
    Record<"firstName" | "lastName" | "email" | "phone" | "message" | "cv", string[]>
  >;
};

export const initialJobApplicationFormState: JobApplicationFormState = {
  status: "idle",
  message: "",
};
