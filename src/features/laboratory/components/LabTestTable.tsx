"use client";

import { useId, useMemo, useState } from "react";
import type { LabTest } from "../data/importRules";
import { fillTemplate } from "../lib/fillTemplate";
import { filterTests, type TurnaroundBand } from "../lib/filterTests";

/**
 * The price list itself: a search box, a four position turnaround control,
 * the count line and every matching test. The full list renders on the
 * server from props (no empty state on load); this leaf only filters it.
 *
 * `copy` and `turnaround` are handed down already localized by the Server
 * parent, never imported here, so no translation reaches the browser bundle.
 *
 * From `sm:` the list is a real table with right aligned tabular prices;
 * below it each row is a stacked card so nothing scrolls sideways at 375px.
 * The two renderings share one filtered array and one key, and the table
 * is `hidden` rather than unmounted below `sm:` so a screen reader meets
 * the list once (the cards are `sm:hidden` the other way round).
 */
type TableCopy = {
  search: string;
  searchAria: string;
  filterAll: string;
  filterSameDay: string;
  filterShort: string;
  filterLong: string;
  colTest: string;
  colSample: string;
  colTurnaround: string;
  colPrice: string;
  onRequest: string;
  showingTemplate: string;
  empty: string;
};

type TurnaroundCopy = { one: string; many: string };

const BANDS: { band: TurnaroundBand; key: keyof TableCopy }[] = [
  { band: "all", key: "filterAll" },
  { band: "1", key: "filterSameDay" },
  { band: "2-4", key: "filterShort" },
  { band: "7+", key: "filterLong" },
];

function turnaroundLabel(days: number, copy: TurnaroundCopy): string {
  return days === 1 ? copy.one : fillTemplate(copy.many, { n: days });
}

function priceLabel(price: number | null, onRequest: string): string {
  return price === null ? onRequest : price.toLocaleString("en");
}

export function LabTestTable({
  tests,
  copy,
  turnaround,
}: {
  tests: readonly LabTest[];
  copy: TableCopy;
  turnaround: TurnaroundCopy;
}) {
  const [query, setQuery] = useState("");
  const [band, setBand] = useState<TurnaroundBand>("all");
  const searchId = useId();

  const filtered = useMemo(() => filterTests(tests, query, band), [tests, query, band]);
  const rowKey = (t: LabTest, i: number) => `${t.code}-${i}`;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <label htmlFor={searchId} className="sr-only">
            {copy.searchAria}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.search}
            autoComplete="off"
            className="h-12 w-full min-w-0 border border-[var(--home-hairline)] bg-[var(--home-bg)] px-4 text-[15px] text-[var(--home-heading)] outline-none placeholder:text-[var(--home-muted)] focus-visible:border-[var(--home-accent)] sm:max-w-[440px]"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label={copy.colTurnaround}>
          {BANDS.map(({ band: value, key }) => {
            const active = value === band;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setBand(value)}
                className={`min-h-11 rounded-full border px-4 text-[13px] font-semibold transition ${
                  active
                    ? "border-transparent bg-[var(--home-accent)] text-[var(--home-on-accent)]"
                    : "border-[var(--home-hairline)] bg-[var(--home-bg)] text-[var(--home-muted)] hover:border-[var(--home-accent)] hover:text-[var(--home-heading)]"
                }`}
              >
                {copy[key]}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-5 text-[13.5px] text-[var(--home-muted)]" aria-live="polite">
        {fillTemplate(copy.showingTemplate, { n: filtered.length, total: tests.length })}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-6 border border-[var(--home-hairline)] px-5 py-6 text-[15px] text-[var(--home-body)]">{copy.empty}</p>
      ) : (
        <>
          <div className="mt-4 hidden overflow-x-auto sm:block">
            <table className="w-full border-collapse text-[14.5px]">
              <thead>
                <tr className="text-left text-[11.5px] tracking-[0.14em] text-[var(--home-muted)] uppercase">
                  <th scope="col" className="border-b border-[var(--home-hairline)] py-3 pr-4 font-bold">{copy.colTest}</th>
                  <th scope="col" className="border-b border-[var(--home-hairline)] px-4 py-3 font-bold">{copy.colSample}</th>
                  <th scope="col" className="border-b border-[var(--home-hairline)] px-4 py-3 font-bold">{copy.colTurnaround}</th>
                  <th scope="col" className="border-b border-[var(--home-hairline)] py-3 pl-4 text-right font-bold">{copy.colPrice}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={rowKey(t, i)} className="sj-tint-row">
                    <td className="border-b border-[var(--home-hairline)] py-3 pr-4 font-semibold text-[var(--home-heading)]">
                      {t.name}
                      {t.note ? <span className="ml-2 text-[12px] font-normal text-[var(--home-muted)]">{t.note}</span> : null}
                    </td>
                    <td className="border-b border-[var(--home-hairline)] px-4 py-3 text-[var(--home-body)]">{t.container}</td>
                    <td className="border-b border-[var(--home-hairline)] px-4 py-3 whitespace-nowrap text-[var(--home-body)]">
                      {turnaroundLabel(t.turnaroundDays, turnaround)}
                    </td>
                    <td className="border-b border-[var(--home-hairline)] py-3 pl-4 text-right font-bold whitespace-nowrap text-[var(--home-heading)] tabular-nums">
                      {priceLabel(t.price, copy.onRequest)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-4 flex flex-col gap-px bg-[var(--home-hairline)] sm:hidden">
            {filtered.map((t, i) => (
              <li key={rowKey(t, i)} className="bg-[var(--home-bg)] px-4 py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="min-w-0 text-[15px] font-semibold text-[var(--home-heading)]">
                    {t.name}
                    {t.note ? <span className="ml-2 text-[12px] font-normal text-[var(--home-muted)]">{t.note}</span> : null}
                  </span>
                  <span className="shrink-0 text-[15px] font-bold text-[var(--home-heading)] tabular-nums">
                    {priceLabel(t.price, copy.onRequest)}
                  </span>
                </div>
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[13px]">
                  <dt className="text-[var(--home-muted)]">{copy.colSample}</dt>
                  <dd className="min-w-0 text-[var(--home-body)]">{t.container}</dd>
                  <dt className="text-[var(--home-muted)]">{copy.colTurnaround}</dt>
                  <dd className="text-[var(--home-body)]">{turnaroundLabel(t.turnaroundDays, turnaround)}</dd>
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
