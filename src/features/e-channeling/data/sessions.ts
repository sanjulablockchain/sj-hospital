import { WEEKDAYS, type Doctor, type Weekday } from "./doctors.ts";

/** A run of consecutive days, `from` and `to` equal for a single day. */
export type DayRun = { from: Weekday; to: Weekday };
export type SessionGroup = { days: DayRun[]; times: readonly string[] };

/**
 * A consultant's week as the card prints it: one line per distinct set of
 * times, naming every day that has it, with consecutive days joined into a
 * run ("Mon, Wed, Fri to Sat  4.00 PM"). Grouping by times rather than only by
 * consecutive days keeps the longest week to a few lines, so the directory's
 * cards can all share one height without most of them sitting half empty.
 * Days run Monday to Sunday and do not wrap; lines are ordered by their
 * first day.
 */
export function groupSessions(sessions: Doctor["sessions"]): SessionGroup[] {
  const groups = new Map<string, SessionGroup>();

  WEEKDAYS.forEach((day, index) => {
    const times = sessions[day];
    if (!times?.length) return;
    const key = times.join("|");
    const group = groups.get(key) ?? { days: [], times };
    groups.set(key, group);

    const last = group.days[group.days.length - 1];
    if (last && WEEKDAYS.indexOf(last.to) === index - 1) last.to = day;
    else group.days.push({ from: day, to: day });
  });

  return [...groups.values()];
}
