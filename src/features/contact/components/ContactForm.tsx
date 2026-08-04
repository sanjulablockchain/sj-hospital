"use client";

import { useActionState } from "react";
import { sendContactMessage, initialContactFormState } from "../actions/sendContactMessage";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactFormState);

  return (
    <form action={formAction} className="space-y-5">
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
            className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
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
            className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
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
          className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs font-semibold text-red-600">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
          Comment or Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-primary px-7 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send a Message"}
      </button>

      {state.status !== "idle" && (
        <p
          role="status"
          aria-live="polite"
          className={`text-sm font-semibold ${state.status === "success" ? "text-green-700" : "text-red-600"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
