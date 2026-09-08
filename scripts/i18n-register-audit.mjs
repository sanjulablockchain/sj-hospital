#!/usr/bin/env node
// Lists, per overlay, every path that must be DELETED so the string renders in
// English, and every path that looks as though it was deleted by mistake.
//
//   npm run i18n:register-audit                  the full work list
//   npm run i18n:register-audit -- --summary     totals only, no paths
//   npm run i18n:register-audit -- --scope=media one feature (repeatable)
//   npm run i18n:register-audit -- --require-clean   exit 1 while work remains
//
// The policy is `src/lib/i18n/registerPolicy.ts`, which encodes
// `docs/superpowers/i18n-register-rule.md`. `localize` iterates the English
// base, so a key absent from an overlay renders the English value: keeping a
// string English means deleting its key, never translating it to itself.
//
// Two directions are reported, because a sweep can go wrong in both:
//
//   TO DELETE   a path the policy says is English that is still in the overlay.
//               This is the work list. Delete the key.
//
//   CHECK       a path the policy says is TRANSLATED that this overlay does not
//               carry while its sibling locale does. That asymmetry is what
//               over-deletion looks like from the outside. It is a hint, not a
//               gate: the gate is each feature's own parity test, which knows
//               that feature's facts, hrefs and structural keys and fails when
//               a translation the policy owes is missing from both locales.
//
// Ordering is the overlay's own declaration order, so the list reads top to
// bottom against the open file, and re-running after an edit produces the same
// list minus what was removed.

import {
  overlayFiles,
  overlayScope,
  toImportUrl,
} from "../src/lib/i18n/overlayFiles.ts";
import { stringPaths } from "../src/lib/i18n/stringPaths.ts";
import { REGISTER_REASONS, registerReason } from "../src/lib/i18n/registerPolicy.ts";

const args = process.argv.slice(2);
const summaryOnly = args.includes("--summary");
const requireClean = args.includes("--require-clean");
const scopeFilter = args
  .filter((arg) => arg.startsWith("--scope="))
  .map((arg) => arg.slice("--scope=".length));

/** Every overlay, grouped by the English module it translates. */
const byBase = new Map();
for (const overlay of overlayFiles()) {
  const scope = overlayScope(overlay.relative);
  if (scopeFilter.length > 0 && !scopeFilter.includes(scope)) continue;
  const group = byBase.get(overlay.baseRelative) ?? { scope, overlays: [] };
  group.overlays.push(overlay);
  byBase.set(overlay.baseRelative, group);
}

const rows = [];
for (const [baseRelative, group] of byBase) {
  // A locale's own filled paths, so the sibling comparison below is about what
  // each overlay actually carries.
  const filled = new Map();
  for (const overlay of group.overlays) {
    const loaded = await import(toImportUrl(overlay.path));
    filled.set(overlay.locale, { overlay, paths: stringPaths(loaded) });
  }

  for (const [locale, { overlay, paths }] of filled) {
    const toDelete = paths
      .map((path) => ({ path, reason: registerReason(path) }))
      .filter((entry) => entry.reason !== null);

    const mine = new Set(paths);
    const sibling = [...filled.entries()].find(([other]) => other !== locale);
    const check = sibling
      ? sibling[1].paths.filter((path) => !mine.has(path) && registerReason(path) === null)
      : [];

    rows.push({ baseRelative, scope: group.scope, overlay, toDelete, check });
  }
}

rows.sort((a, b) => a.overlay.relative.localeCompare(b.overlay.relative));

/* ----------------------------- the work list ----------------------------- */

console.log("Register policy audit");
console.log("  policy: src/lib/i18n/registerPolicy.ts");
console.log("  rule:   docs/superpowers/i18n-register-rule.md");
console.log("");
console.log("TO DELETE: in the overlay, but the policy says it renders in English.");
console.log("");

const pad = Math.max(...Object.keys(REGISTER_REASONS).map((reason) => reason.length));

for (const row of rows) {
  if (row.toDelete.length === 0) {
    console.log(`${row.overlay.relative}  [${row.scope}]  clean`);
    continue;
  }
  console.log(
    `${row.overlay.relative}  [${row.scope}]  ${row.toDelete.length} to delete`
  );
  if (!summaryOnly) {
    for (const entry of row.toDelete) {
      console.log(`  ${entry.reason.padEnd(pad)}  ${entry.path}`);
    }
  }
}

/* ------------------------------- the inverse ------------------------------ */

const withCheck = rows.filter((row) => row.check.length > 0);
console.log("");
console.log(
  "CHECK: the policy says translated, this locale has no value, the sibling locale does."
);
if (withCheck.length === 0) {
  console.log("  none. No overlay is missing a translation its sibling locale supplies.");
} else {
  for (const row of withCheck) {
    console.log(`${row.overlay.relative}  ${row.check.length} missing`);
    if (!summaryOnly) for (const path of row.check) console.log(`  ${path}`);
  }
}

/* -------------------------------- totals --------------------------------- */

const byReason = new Map();
const byScope = new Map();
for (const row of rows) {
  const scope = byScope.get(row.scope) ?? { si: 0, ta: 0, files: 0 };
  scope[row.overlay.locale] += row.toDelete.length;
  scope.files += 1;
  byScope.set(row.scope, scope);
  for (const entry of row.toDelete) {
    const reason = byReason.get(entry.reason) ?? { si: 0, ta: 0 };
    reason[row.overlay.locale] += 1;
    byReason.set(entry.reason, reason);
  }
}

const total = (counts) => counts.si + counts.ta;

console.log("");
console.log("Paths to delete, by category:");
for (const [reason, counts] of [...byReason.entries()].sort((a, b) => total(b[1]) - total(a[1]))) {
  console.log(
    `  ${reason.padEnd(pad)}  si ${String(counts.si).padStart(4)}  ta ${String(counts.ta).padStart(4)}  ${REGISTER_REASONS[reason]}`
  );
}

console.log("");
console.log("Paths to delete, by feature:");
for (const [scope, counts] of [...byScope.entries()].sort((a, b) => total(b[1]) - total(a[1]))) {
  console.log(
    `  ${scope.padEnd(20)}  si ${String(counts.si).padStart(4)}  ta ${String(counts.ta).padStart(4)}  (${counts.files} overlays)`
  );
}

const si = [...byScope.values()].reduce((sum, counts) => sum + counts.si, 0);
const ta = [...byScope.values()].reduce((sum, counts) => sum + counts.ta, 0);
console.log("");
console.log(`Total to delete: ${si} Sinhala, ${ta} Tamil, ${si + ta} overall.`);
console.log(`Overlays audited: ${rows.length}.`);

if (requireClean && si + ta > 0) process.exit(1);
