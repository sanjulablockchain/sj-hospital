"use client";

import { useActionState } from "react";
import { sendContactMessage } from "../actions/sendContactMessage";
import { initialContactFormState } from "../types";
import type { ContactContent } from "../data/getContent";
import { useLocale } from "@/lib/i18n/useLocale";

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
export function ContactForm({ copy }: { copy: ContactContent["form"] }) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactFormState);
  const locale = useLocale();

  // The number sits in a different place in each language, so the sentence
  // carries a {phone} token rather than being split into two fixed halves.
  const [beforePhone, afterPhone] = copy.emergency.split("{phone}");

  return (
    <form action={formAction} className="flex flex-1 flex-col gap-5">
      <input type="hidden" name="locale" value={locale} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-semibold text-[var(--home-heading)]">
            {copy.firstNameLabel}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            placeholder={copy.firstNamePlaceholder}
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
            {copy.lastNameLabel}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            placeholder={copy.lastNamePlaceholder}
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
          {copy.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder={copy.emailPlaceholder}
          className={inputClasses}
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs font-semibold text-[var(--home-danger)]">{state.fieldErrors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <label htmlFor="contactMessage" className="mb-1.5 block text-sm font-semibold text-[var(--home-heading)]">
          {copy.messageLabel}
        </label>
        <textarea
          id="contactMessage"
          name="message"
          rows={5}
          placeholder={copy.messagePlaceholder}
          className={`${inputClasses} flex-1 resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="min-w-50 flex-1 bg-[var(--home-accent)] px-7 py-3.5 text-sm font-bold text-[var(--home-on-accent)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? copy.submitting : copy.submit}
        </button>
        <a
          href="tel:+94117848484"
          className="inline-flex items-center justify-center border border-[var(--home-hairline)] bg-transparent px-6 py-3.5 text-sm font-bold text-[var(--home-accent)] transition hover:bg-[var(--home-surface)]"
        >
          {copy.callInstead}
        </a>
      </div>

      {state.status !== "idle" && (
        <p
          role="status"
          aria-live="polite"
          className={`border px-4 py-3 text-sm font-semibold ${
            state.status === "success"
              ? "border-[var(--home-accent)]/30 bg-[var(--home-accent)]/10 text-[var(--home-accent-soft)]"
              : "border-[var(--home-danger)]/30 bg-[var(--home-danger)]/10 text-[var(--home-danger)]"
          }`}
        >
          {state.message}
        </p>
      )}

      <p className="text-xs leading-relaxed text-[var(--home-muted)]">
        {beforePhone}
        <a href="tel:+94117848484" className="font-semibold text-[var(--home-accent)] hover:opacity-80">
          0117 84 84 84
        </a>
        {afterPhone}
      </p>
    </form>
  );
}
