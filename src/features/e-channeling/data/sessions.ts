import { WEEKDAYS, type Doctor, type Weekday } from "./doctors.ts";

export type SessionGroup = { from: Weekday; to: Weekday; times: readonly string[] };

/**
 * A consultant's week as the card prints it: a run of consecutive days with
 * identical times becomes one line ("Mon–Fri  4.00 PM"), so a five-day
 * clinic does not take five lines. Days run Monday to Sunday and do not wrap,
 * so a Sunday session always stands on its own.
 */
export function groupSessions(sessions: Doctor["sessions"]): SessionGroup[] {
  const groups: SessionGroup[] = [];
  let previous: Weekday | null = null;

  for (const day of WEEKDAYS) {
    const times = sessions[day];
    if (!times?.length) {
      previous = null;
      continue;
    }
    const last = groups[groups.length - 1];
    if (previous && last && last.to === previous && last.times.join("|") === times.join("|")) {
      last.to = day;
    } else {
      groups.push({ from: day, to: day, times });
    }
    previous = day;
  }

  return groups;
}
