import { z } from "zod";

export const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;

export const jobApplicationSchema = z.object({
  roleTitle: z.string().trim().min(1, "Role is required"),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .pipe(z.email("Enter a valid email address")),
  phone: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
