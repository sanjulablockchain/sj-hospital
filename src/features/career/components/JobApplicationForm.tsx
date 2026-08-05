"use client";

import { useActionState, useState } from "react";
import { submitJobApplication } from "../actions/submitJobApplication";
import { initialJobApplicationFormState } from "../types";

type JobApplicationFormProps = {
  roleTitle: string;
};

const MAX_CV_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function formatFileSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateCvFile(file: File) {
  if (!ALLOWED_CV_TYPES.includes(file.type)) {
    return "Only PDF or Word documents (.pdf, .doc, .docx) are accepted";
  }
  if (file.size > MAX_CV_SIZE_BYTES) {
    return "File is too large (max 5 MB)";
  }
  return null;
}

export function JobApplicationForm({ roleTitle }: JobApplicationFormProps) {
  const [state, formAction, pending] = useActionState(
    submitJobApplication,
    initialJobApplicationFormState
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [clientFileError, setClientFileError] = useState<string | null>(null);
  const cvError = clientFileError ?? state.fieldErrors?.cv?.[0];

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="roleTitle" value={roleTitle} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="app-firstName" className="mb-1.5 block text-sm font-semibold text-ink">
            First Name*
          </label>
          <input
            id="app-firstName"
            name="firstName"
            type="text"
            required
            className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {state.fieldErrors?.firstName && (
            <p className="mt-1 text-xs font-semibold text-red-600">{state.fieldErrors.firstName[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="app-lastName" className="mb-1.5 block text-sm font-semibold text-ink">
            Last Name*
          </label>
          <input
            id="app-lastName"
            name="lastName"
            type="text"
            required
            className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {state.fieldErrors?.lastName && (
            <p className="mt-1 text-xs font-semibold text-red-600">{state.fieldErrors.lastName[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="app-email" className="mb-1.5 block text-sm font-semibold text-ink">
          Email*
        </label>
        <input
          id="app-email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs font-semibold text-red-600">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="app-phone" className="mb-1.5 block text-sm font-semibold text-ink">
          Phone
        </label>
        <input
          id="app-phone"
          name="phone"
          type="tel"
          className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="app-message" className="mb-1.5 block text-sm font-semibold text-ink">
          Cover Note
        </label>
        <textarea
          id="app-message"
          name="message"
          rows={3}
          className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="app-cv" className="mb-1.5 block text-sm font-semibold text-ink">
          Attach CV* (PDF or Word, max 5 MB)
        </label>
        <label
          htmlFor="app-cv"
          className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 transition has-[:focus-visible]:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/20 ${
            cvError ? "border-red-300 bg-red-50" : "border-ink/15 hover:border-primary/50"
          }`}
        >
          <span className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white">
            Choose File
          </span>
          <span className={`truncate text-sm ${selectedFile ? "text-ink" : "text-muted"}`}>
            {selectedFile
              ? `${selectedFile.name} (${formatFileSize(selectedFile.size)})`
              : "No file selected"}
          </span>
          <input
            id="app-cv"
            name="cv"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              setSelectedFile(file);
              setClientFileError(file ? validateCvFile(file) : null);
            }}
            className="sr-only"
          />
        </label>
        {cvError && <p className="mt-1 text-xs font-semibold text-red-600">{cvError}</p>}
      </div>

      <button
        type="submit"
        disabled={pending || Boolean(clientFileError)}
        className="w-full cursor-pointer rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Submitting..." : "Submit Application"}
      </button>

      {state.status !== "idle" && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
            state.status === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {state.message}
        </div>
      )}
    </form>
  );
}
