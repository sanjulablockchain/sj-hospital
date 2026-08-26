"use client";

import { useActionState, useId, useState } from "react";
import { submitJobApplication } from "../actions/submitJobApplication";
import { experienceOptions, roleOptions, sourceOptions } from "../data/content";
import { initialJobApplicationFormState } from "../types";
import type { JobApplicationFormState } from "../types";

const FIELD_CLASS =
  "w-full border-0 border-b border-[var(--home-hairline-strong)] bg-transparent py-2.5 text-[16px] text-[var(--home-heading)] outline-none transition-colors placeholder:text-[var(--home-muted)] focus:border-[var(--home-accent)]";

const LABEL_CLASS =
  "text-[11.5px] font-bold tracking-[0.18em] text-[var(--home-accent-soft)] uppercase";

/**
 * The nine field form, posting to the `submitJobApplication` Server Action.
 *
 * The reference validates in the browser and then does nothing with the
 * result; here the browser hints (`required`, `type="email"`) are only a
 * convenience and the schema on the server is what actually decides, so a
 * submission with scripting disabled behaves identically.
 *
 * The selects use an empty first `option` rather than the reference's literal
 * "Select" string, so `required` catches an untouched select natively and the
 * schema never has to special-case a placeholder that looks like a real value.
 */
export function ApplicationForm() {
  const [state, formAction, pending] = useActionState(
    submitJobApplication,
    initialJobApplicationFormState
  );
  const baseId = useId();
  const id = (name: string) => `${baseId}-${name}`;

  // React empties an uncontrolled form as soon as its action resolves, so the
  // form is remounted on every response and repopulated from `state.values`.
  //
  // On success the action returns no values, so the remount leaves the fields
  // blank: a second applicant on a shared machine never finds the previous
  // one's details. On a rejection it returns everything the applicant typed, so
  // a CV that was 200KB too large costs them one file picker, not nine fields.
  //
  // Remounting rather than calling form.reset() in an effect: a fresh `key`
  // reapplies every defaultValue and clears the filename inside CvField in one
  // go. The counter is adjusted during render, React's documented way to derive
  // state from changed input, and `state` is a new object per submission.
  const [formKey, setFormKey] = useState(0);
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    setFormKey((current) => current + 1);
  }

  const kept = state.values ?? {};

  return (
    <form key={formKey} action={formAction}>
      <div className="grid grid-cols-2 gap-6.5 max-[899px]:grid-cols-1">
        <Field
          id={id("fullName")}
          name="fullName"
          label="Full name"
          placeholder="As it appears on your certificates"
          required
          autoComplete="name"
          defaultValue={kept.fullName ?? ""}
          errors={state.fieldErrors?.fullName}
        />

        <SelectField
          id={id("roleTitle")}
          name="roleTitle"
          label="Applying for"
          placeholder="Choose a role"
          options={roleOptions}
          required
          defaultValue={kept.roleTitle ?? ""}
          errors={state.fieldErrors?.roleTitle}
        />

        <Field
          id={id("email")}
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          required
          autoComplete="email"
          defaultValue={kept.email ?? ""}
          errors={state.fieldErrors?.email}
        />

        <Field
          id={id("phone")}
          name="phone"
          type="tel"
          label="Mobile"
          placeholder="07X XXX XXXX"
          required
          autoComplete="tel"
          className="tabular-nums"
          defaultValue={kept.phone ?? ""}
          errors={state.fieldErrors?.phone}
        />

        <Field
          id={id("registrationNumber")}
          name="registrationNumber"
          label="Registration number"
          placeholder="SLMC, Nurses Council, or not applicable"
          defaultValue={kept.registrationNumber ?? ""}
          errors={state.fieldErrors?.registrationNumber}
        />

        <SelectField
          id={id("experience")}
          name="experience"
          label="Years of experience"
          placeholder="Choose one"
          options={experienceOptions}
          defaultValue={kept.experience ?? ""}
          errors={state.fieldErrors?.experience}
        />

        <Field
          id={id("startDate")}
          name="startDate"
          label="Earliest start date"
          placeholder="Immediately, or after one month's notice"
          defaultValue={kept.startDate ?? ""}
          errors={state.fieldErrors?.startDate}
        />

        <SelectField
          id={id("source")}
          name="source"
          label="Where you saw this"
          placeholder="Choose one"
          options={sourceOptions}
          defaultValue={kept.source ?? ""}
          errors={state.fieldErrors?.source}
        />
      </div>

      <div className="mt-6.5 flex flex-col gap-2.25">
        <label htmlFor={id("note")} className={LABEL_CLASS}>
          Anything we should know
        </label>
        <textarea
          id={id("note")}
          name="note"
          defaultValue={kept.note ?? ""}
          rows={4}
          placeholder="Study commitments, a shift pattern you need, or the unit you particularly want to work in. Optional."
          className="w-full resize-y border border-[var(--home-hairline-strong)] bg-transparent p-3.5 text-[16px] leading-[1.55] text-[var(--home-heading)] outline-none transition-colors placeholder:text-[var(--home-muted)] focus:border-[var(--home-accent)]"
        />
        <FieldErrors errors={state.fieldErrors?.note} id={id("note")} />
      </div>

      <CvField
        id={id("cv")}
        errors={state.fieldErrors?.cv}
        mustReattach={state.status === "error"}
      />

      <label
        htmlFor={id("consent")}
        className="mt-6 flex cursor-pointer items-start gap-3.25 text-[14.5px] leading-[1.55] text-[var(--home-muted)]"
      >
        <input
          id={id("consent")}
          name="consent"
          type="checkbox"
          required
          defaultChecked={state.consentGiven ?? false}
          className="mt-0.5 h-[19px] w-[19px] shrink-0 accent-[var(--home-accent)]"
        />
        <span>
          I agree that St. Joseph Hospital may hold my application for six months and contact me
          about this and comparable vacancies. My current employer will not be approached without my
          written permission.
        </span>
      </label>
      <FieldErrors errors={state.fieldErrors?.consent} id={id("consent")} />

      <div className="mt-7 flex flex-wrap items-center gap-4.5">
        <button
          type="submit"
          disabled={pending}
          className="sj-invert inline-flex items-center gap-2.5 bg-[var(--home-accent)] px-6.5 py-4.25 text-[15px] font-bold text-[var(--home-on-accent)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitLabel(state, pending)} <span aria-hidden>&rarr;</span>
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`max-w-[42ch] text-[14px] leading-[1.5] ${statusClass(state.status)}`}
        >
          {state.message ||
            "We reply to every application, including the ones we do not take forward."}
        </p>
      </div>
    </form>
  );
}

function submitLabel(state: JobApplicationFormState, pending: boolean) {
  if (pending) return "Sending";
  return state.status === "success" ? "Application received" : "Submit application";
}

function statusClass(status: JobApplicationFormState["status"]) {
  if (status === "error") return "text-[var(--home-danger)]";
  if (status === "success") return "text-[var(--home-accent-soft)]";
  return "text-[var(--home-muted)]";
}

/**
 * The dashed CV box. Owns the chosen filename so that remounting the form
 * clears the label along with the input behind it.
 *
 * A file input is the one field that cannot be repopulated: no browser lets a
 * page put a file back into it, for obvious reasons. So where the other nine
 * fields come back filled after a rejection, this one has to be reattached, and
 * `mustReattach` says so rather than leaving the applicant to notice.
 */
function CvField({
  id,
  errors,
  mustReattach,
}: {
  id: string;
  errors?: string[];
  mustReattach?: boolean;
}) {
  const [fileName, setFileName] = useState("");

  const hint = fileName
    ? fileName
    : mustReattach
      ? "Please attach your CV again. A browser will not let us keep the file across a failed submission."
      : "PDF preferred, under 5 MB. Do not send your NIC copy or a photograph at this stage.";

  return (
    <div className="mt-6.5 flex flex-wrap items-center gap-5 border border-dashed border-[var(--home-hairline-strong)] px-6 py-5.5">
      <span className="min-w-[220px] flex-1">
        <span className="font-display block text-[18px] font-bold tracking-[-0.02em] text-[var(--home-heading)]">
          Attach your CV as a PDF
        </span>
        <span className="mt-1.25 block text-[14.5px] leading-[1.55] text-[var(--home-muted)]">
          {hint}
        </span>
        <FieldErrors errors={errors} id={id} />
      </span>
      {/* The input is `sr-only` rather than `display: none`, so it can still
          take keyboard focus and be reached by Tab; focus-within then styles
          the label as though it were the focused control. */}
      <label
        htmlFor={id}
        className="inline-flex cursor-pointer items-center gap-2.25 border border-[var(--home-hairline-strong)] px-5 py-3.25 text-[13.5px] font-bold whitespace-nowrap text-[var(--home-heading)] transition-colors hover:bg-[var(--home-invert-bg)] hover:text-[var(--home-invert-fg)] focus-within:bg-[var(--home-invert-bg)] focus-within:text-[var(--home-invert-fg)]"
      >
        {fileName ? "Change file" : "Choose file"}
        <input
          id={id}
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
          className="sr-only"
        />
      </label>
    </div>
  );
}

type FieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  errors?: string[];
  /** Echoed back from the action after a rejection; "" on a fresh form. */
  defaultValue?: string;
};

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
  autoComplete,
  className = "",
  errors,
  defaultValue = "",
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2.25">
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-describedby={errors?.length ? `${id}-error` : undefined}
        aria-invalid={errors?.length ? true : undefined}
        className={`${FIELD_CLASS} ${className}`}
      />
      <FieldErrors errors={errors} id={id} />
    </div>
  );
}

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  required?: boolean;
  errors?: string[];
  /** Echoed back from the action after a rejection; "" on a fresh form. */
  defaultValue?: string;
};

function SelectField({
  id,
  name,
  label,
  placeholder,
  options,
  required,
  errors,
  defaultValue = "",
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2.25">
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue={defaultValue}
        aria-describedby={errors?.length ? `${id}-error` : undefined}
        aria-invalid={errors?.length ? true : undefined}
        className={FIELD_CLASS}
      >
        {/* An option list rendered by the browser draws on the OS palette, not
            the page's, so each option carries explicit colours or the dark
            theme shows white text on a white menu in some browsers. */}
        <option value="" disabled className="bg-[var(--home-bg)] text-[var(--home-heading)]">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[var(--home-bg)] text-[var(--home-heading)]"
          >
            {option}
          </option>
        ))}
      </select>
      <FieldErrors errors={errors} id={id} />
    </div>
  );
}

function FieldErrors({ errors, id }: { errors?: string[]; id: string }) {
  if (!errors?.length) return null;
  return (
    <p id={`${id}-error`} className="text-[13px] leading-[1.45] font-semibold text-[var(--home-danger)]">
      {errors[0]}
    </p>
  );
}
