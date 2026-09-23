/**
 * A figure split for the counter: the fixed text before the number, the
 * integer to animate, and the fixed text after it. `"24/7"` becomes
 * `{ prefix: "", value: 24, suffix: "/7" }`; `"LKR 10,000"` becomes
 * `{ prefix: "LKR ", value: 10000, suffix: "" }`.
 */
export type SplitCount = { prefix: string; value: number; suffix: string };

/**
 * Finds the first run of digits (thousands separators allowed) in a stat's
 * display string. Returns `null` when there is none, so a word like "Negombo"
 * or "Digital" renders as it is, and when the string is an unsubstituted
 * template token such as `{count}`, so a missing substitution is visible
 * rather than counting to zero.
 */
export function splitCount(display: string): SplitCount | null {
  if (/\{[a-z]+\}/.test(display)) return null;
  const match = /(\d{1,3}(?:,\d{3})+|\d+)/.exec(display);
  if (!match || match.index === undefined) return null;
  const value = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(value)) return null;
  return {
    prefix: display.slice(0, match.index),
    value,
    suffix: display.slice(match.index + match[1].length),
  };
}
