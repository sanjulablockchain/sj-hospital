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
 * One `<table>` serves every width, so each of the 334 rows is in the DOM
 * once. From `sm:` it lays out as a table with right aligned tabular prices;
 * below that the header row is hidden and each row becomes a block, each
 * cell a line that prints its column name first from `data-label`, so
 * nothing scrolls sideways at 375px and the markup stays a table for a
 * screen reader.
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

/** A cell that prints its column name before the value below `sm:`. */
const labelledCell =
  "block py-0.5 text-[13.5px] text-[var(--home-body)] before:mr-2 before:text-[var(--home-muted)] before:content-[attr(data-label)] sm:table-cell sm:border-b sm:border-[var(--home-hairline)] sm:px-4 sm:py-3 sm:text-[14.5px] sm:before:content-none";

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
        <table className="mt-4 block w-full border-collapse sm:table">
          <thead className="hidden sm:table-header-group">
            <tr className="text-left text-[11.5px] tracking-[0.14em] text-[var(--home-muted)] uppercase">
              <th scope="col" className="border-b border-[var(--home-hairline)] py-3 pr-4 font-bold">{copy.colTest}</th>
              <th scope="col" className="border-b border-[var(--home-hairline)] px-4 py-3 font-bold">{copy.colSample}</th>
              <th scope="col" className="border-b border-[var(--home-hairline)] px-4 py-3 font-bold">{copy.colTurnaround}</th>
              <th scope="col" className="border-b border-[var(--home-hairline)] py-3 pl-4 text-right font-bold">{copy.colPrice}</th>
            </tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {filtered.map((t, i) => (
              <tr key={`${t.code}-${i}`} className="sj-tint-row block border-b border-[var(--home-hairline)] py-3.5 sm:table-row sm:border-0 sm:py-0">
                <td className="block pr-4 text-[15px] font-semibold text-[var(--home-heading)] sm:table-cell sm:border-b sm:border-[var(--home-hairline)] sm:py-3 sm:text-[14.5px]">
                  {t.name}
                  {t.note ? <span className="ml-2 text-[12px] font-normal text-[var(--home-muted)]">{t.note}</span> : null}
                </td>
                <td data-label={copy.colSample} className={labelledCell}>
                  {t.container}
                </td>
                <td data-label={copy.colTurnaround} className={`${labelledCell} sm:whitespace-nowrap`}>
                  {turnaroundLabel(t.turnaroundDays, turnaround)}
                </td>
                <td
                  data-label={copy.colPrice}
                  className={`${labelledCell} font-bold text-[var(--home-heading)] tabular-nums sm:pr-0 sm:pl-4 sm:text-right sm:whitespace-nowrap`}
                >
                  {priceLabel(t.price, copy.onRequest)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
