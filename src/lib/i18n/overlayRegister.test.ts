import { test } from "node:test";
import assert from "node:assert/strict";
import { overlayFiles, overlayScope, toImportUrl } from "./overlayFiles.ts";
import { stringPaths } from "./stringPaths.ts";
import { REGISTER_REASONS, registerReason, type RegisterReason } from "./registerPolicy.ts";

/**
 * The direction nothing enforced before: a path the register policy says
 * renders in English must be ABSENT from every overlay.
 *
 * Its mirror image, "a path the policy says is translated must be present", is
 * each feature's own parity test. `assertTranslationParity` now subtracts the
 * policy from what it demands, so the two halves meet exactly: a path is owed a
 * translation unless it is a fact (`isUntranslatable`, per feature) or English
 * by register (`staysEnglish`, here), and if it is English by register it must
 * not be in the file at all.
 *
 * This is a WALKER, like `overlayNumerals.test.ts`: it discovers overlays from
 * disk rather than importing them by name, so a new overlay is covered the day
 * it is written and cannot be forgotten. `overlayCoverage.test.ts` lists it
 * alongside the other walkers for that reason.
 *
 * Until 2026-09-09 this suite ran alongside `pendingRegisterSweep.ts`, an
 * allowlist that exempted one scope at a time from the assertion below while
 * a content sweep worked through the whole site feature by feature. Every
 * scope now obeys the policy unconditionally, so that module and the
 * skip/allowlist machinery built around it are gone; what remains is the
 * permanent regression gate.
 */

type Audited = {
  relative: string;
  scope: string;
  violations: { path: string; reason: RegisterReason }[];
};

const audited: Audited[] = [];
for (const overlay of overlayFiles()) {
  const loaded = await import(toImportUrl(overlay.path));
  const violations = stringPaths(loaded)
    .map((path) => ({ path, reason: registerReason(path) }))
    .filter((entry): entry is { path: string; reason: RegisterReason } => entry.reason !== null);
  audited.push({ relative: overlay.relative, scope: overlayScope(overlay.relative), violations });
}

/** The failure message doubles as the work list: every path, with its reason. */
function workList(entry: Audited): string {
  const lines = entry.violations.map(
    (violation) => `  ${violation.reason.padEnd(8)} ${violation.path}`
  );
  return (
    `${entry.relative} carries ${entry.violations.length} path(s) the register policy ` +
    `says render in English. Delete these keys from the overlay: keeping a string ` +
    `English means removing it, because \`localize\` iterates the English base and ` +
    `falls back to it. See docs/superpowers/i18n-register-rule.md.\n` +
    lines.join("\n") +
    `\n\nReasons: ${Object.entries(REGISTER_REASONS)
      .map(([reason, description]) => `${reason} = ${description}`)
      .join("; ")}`
  );
}

for (const entry of audited) {
  test(`${entry.relative} carries no path the register policy says is English`, () => {
    assert.deepEqual(
      entry.violations.map((violation) => violation.path),
      [],
      workList(entry)
    );
  });
}

test("every overlay on disk is placed in a recognised scope", () => {
  const unnamed = audited.filter((entry) => entry.scope === "other").map((entry) => entry.relative);
  assert.deepEqual(
    unnamed,
    [],
    `overlayScope cannot place ${unnamed.join(", ")}. That is only cosmetic here (it ` +
      `groups the audit script's totals by feature), but an overlay it cannot place is ` +
      `usually one that moved: teach overlayScope where it lives now.`
  );
});
