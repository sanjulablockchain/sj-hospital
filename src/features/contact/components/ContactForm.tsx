"use client";

import { useActionState } from "react";
import { sendContactMessage } from "../actions/sendContactMessage";
import { initialContactFormState } from "../types";

const inputClasses =
  "w-full border border-[var(--home-hairline)] bg-[var(--home-surface)] px-4 py-2.5 text-sm text-[var(--home-body)] outline-none placeholder:text-[var(--home-muted)] transition focus:border-[var(--home-accent)] focus:ring-2 focus:ring-[var(--home-accent)]/20";

/**
 * The contact form, consolidated from the two near-duplicate forms the old
 * page carried (`ContactForm.tsx` and `ContactFormPanel.tsx`, the panel being
 * the richer one). This keeps the panel's behaviour: field-error rendering,
 * the pending label swap, the `role="status"` block and the emergency note,
 * retokenized onto the `--home-*` design system.
 *
 * Also used on `/accommodation`, which is why it stays exported from this
 * feature's `index.ts` rather than moving into a route-only folder.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactFormState);

  return (
    <form action={formAction} className="flex flex-1 flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-[var(--home-heading)]">
            First Name*
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder="John"
            className={inputClasses}
          />
          {state.fieldErrors?.firstName && (
            <p className="mt-1 text-xs font-semibold text-[var(--home-danger)]">
              {state.fieldErrors.firstName[0]}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-semibold text-[var(--home-heading)]">
            Last Name*
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder="Doe"
            className={inputClasses}
          />
          {state.fieldErrors?.lastName && (
            <p className="mt-1 text-xs font-semibold text-[var(--home-danger)]">
              {state.fieldErrors.lastName[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[var(--home-heading)]">
          Email*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="john.doe@example.com"
          className={inputClasses}
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs font-semibold text-[var(--home-danger)]">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <label htmlFor="contactMessage" className="mb-1.5 block text-sm font-semibold text-[var(--home-heading)]">
          Comment or Message
        </label>
        <textarea
          id="contactMessage"
          name="message"
          rows={5}
          placeholder="Please let us know any specific requirements..."
          className={`${inputClasses} flex-1 resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="min-w-50 flex-1 bg-[var(--home-accent)] px-7 py-3.5 text-sm font-bold text-[var(--home-on-accent)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending..." : "Send Message"}
        </button>
        <a
          href="tel:+94117848484"
          className="inline-flex items-center justify-center border border-[var(--home-hairline)] bg-transparent px-6 py-3.5 text-sm font-bold text-[var(--home-accent)] transition hover:bg-[var(--home-surface)]"
        >
          Or Call Us
        </a>
      </div>

      {state.status !== "idle" && (
        <p
          role="status"
          aria-live="polite"
          className={`px-4 py-3 text-sm font-semibold ${
            state.status === "success" ? "text-[var(--home-accent-soft)]" : "text-[var(--home-danger)]"
          }`}
        >
          {state.message}
        </p>
      )}

      <p className="text-xs leading-relaxed text-[var(--home-muted)]">
        For emergencies, please call{" "}
        <a href="tel:+94117848484" className="font-semibold text-[var(--home-accent)] hover:opacity-80">
          0117 84 84 84
        </a>
        . The form is not monitored overnight.
      </p>
    </form>
  );
}
