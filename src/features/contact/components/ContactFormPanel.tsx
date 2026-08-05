"use client";

import { useActionState } from "react";
import { sendContactMessage } from "../actions/sendContactMessage";
import { initialContactFormState } from "../types";

const inputClasses =
  "w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted/60 transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export function ContactFormPanel() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactFormState);

  return (
    <div className="flex flex-col gap-6 bg-white px-6 py-10 sm:px-9 sm:py-12">
      <div>
        <h2 className="mb-1 font-heading text-2xl font-extrabold tracking-tight text-ink">
          Drop Us a Line
        </h2>
        <p className="text-[15px] text-muted">We will contact you within one business day.</p>
      </div>

      <form action={formAction} className="flex flex-1 flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-ink">
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
              <p className="mt-1 text-xs font-semibold text-red-600">{state.fieldErrors.firstName[0]}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-sm font-semibold text-ink">
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
              <p className="mt-1 text-xs font-semibold text-red-600">{state.fieldErrors.lastName[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
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
            <p className="mt-1 text-xs font-semibold text-red-600">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <div className="flex flex-1 flex-col">
          <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
            Comment or Message
          </label>
          <textarea
            id="message"
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
            className="min-w-50 flex-1 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {pending ? "Sending..." : "Send Message"}
          </button>
          <a
            href="tel:+94117848484"
            className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-bold text-primary transition hover:bg-surface"
          >
            Or Call Us
          </a>
        </div>

        {state.status !== "idle" && (
          <p
            role="status"
            aria-live="polite"
            className={`rounded-xl px-4 py-3 text-sm font-semibold ${
              state.status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
            }`}
          >
            {state.message}
          </p>
        )}

        <p className="text-xs leading-relaxed text-muted">
          For emergencies, please call{" "}
          <a href="tel:+94117848484" className="font-semibold text-primary hover:text-primary-dark">
            0117 84 84 84
          </a>
          . The form is not monitored overnight.
        </p>
      </form>
    </div>
  );
}
