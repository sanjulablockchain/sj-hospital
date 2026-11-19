/**
 * Shown while the Service Book page streams in: a dark hero block and the
 * reader's outline, so the layout does not jump when the page arrives.
 */
export default function Loading() {
  return (
    <div aria-busy="true" className="animate-pulse">
      <div className="h-[420px] bg-[#0B0826]" />
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 lg:px-11">
        <div className="h-10 w-64 rounded bg-[var(--home-surface-2)]" />
        <div className="mt-9 aspect-[2000/1414] w-full rounded-[10px] bg-[var(--home-surface-2)]" />
      </div>
    </div>
  );
}
