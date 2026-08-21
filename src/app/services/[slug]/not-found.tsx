import Link from "next/link";

// Renders inside the /services layout's ThemedShell, so the --home-* tokens
// and font-display are already in scope; this reads as a real page, not a
// bare Next.js stub.
export default function ServiceNotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-[var(--home-bg)] px-5 py-24 text-center sm:px-8">
      <div className="inline-flex items-center gap-3 text-[11.5px] font-bold tracking-[0.24em] text-[var(--home-accent-soft)] uppercase">
        <span className="h-px w-11 bg-[var(--home-accent)]" />
        Service not found
      </div>
      <h1 className="font-display max-w-[18ch] text-[clamp(34px,6vw,64px)] leading-[0.95] font-extrabold tracking-[-0.03em] text-[var(--home-heading)] uppercase">
        We don&rsquo;t have that service.
      </h1>
      <p className="max-w-[52ch] text-[16px] leading-[1.6] text-[var(--home-body)]">
        The service you&rsquo;re looking for doesn&rsquo;t exist, or may have moved. Take a look at the full
        directory to find the right department instead.
      </p>
      <Link
        href="/services"
        className="mt-2 inline-flex items-center gap-2.5 border border-[var(--home-hairline)] px-6 py-4 text-[15px] font-bold text-[var(--home-heading)] hover:border-[var(--home-accent)]"
      >
        Back to all services <span aria-hidden>&rarr;</span>
      </Link>
    </section>
  );
}
