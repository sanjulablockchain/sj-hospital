#!/usr/bin/env node
// Reports the review state of every translation overlay.
//
//   npm run i18n:status                     list every overlay and its status
//   npm run i18n:status -- --require-reviewed   exit 1 if any is still a draft
//
// The second form is the pre-merge gate. Translations are drafted by Claude
// and must be read by a Sinhala or Tamil speaker before they reach production:
// the health-tips content alone covers symptoms, first aid and emergency
// guidance, where a mistranslation carries real risk.
//
// Covers two kinds of overlay: every feature's `src/features/*/data/*.si.ts`
// / `*.ta.ts` (globbed), plus the shared chrome's overlays, which live outside
// `src/features` and are listed explicitly below rather than crawled for.

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const FEATURES_DIR = join(process.cwd(), "src", "features");
const LOCALES = ["si", "ta"];

// The chrome (header, footer, mobile panel, floating rail, theme toggles) is
// shared across every route rather than owned by one feature, so its overlays
// don't live under src/features and the glob above can't find them. Hardcoded
// rather than crawling the whole tree for `__review` markers: the chrome is
// the only place outside src/features an overlay currently lives, and adding
// a third here is cheap the day that changes.
const CHROME_OVERLAY_BASES = [
  { dir: join(process.cwd(), "src", "config"), base: "navigationLabels" },
  { dir: join(process.cwd(), "src", "components", "layout"), base: "chromeCopy" },
];

/** Every overlay file on disk, as { feature, locale, file, status, reviewer }. */
function collectOverlays() {
  const rows = [];

  if (existsSync(FEATURES_DIR)) {
    for (const feature of readdirSync(FEATURES_DIR, { withFileTypes: true })) {
      if (!feature.isDirectory()) continue;

      const dataDir = join(FEATURES_DIR, feature.name, "data");
      if (!existsSync(dataDir)) continue;

      for (const entry of readdirSync(dataDir)) {
        const match = /^(.*)\.(si|ta)\.ts$/.exec(entry);
        if (!match) continue;

        const source = readFileSync(join(dataDir, entry), "utf8");
        rows.push({
          feature: feature.name,
          base: match[1],
          locale: match[2],
          file: join("src", "features", feature.name, "data", entry),
          status: read(source, "status") ?? "unknown",
          reviewer: read(source, "reviewer") ?? "none",
        });
      }
    }
  }

  for (const { dir, base } of CHROME_OVERLAY_BASES) {
    for (const locale of LOCALES) {
      const path = join(dir, `${base}.${locale}.ts`);
      if (!existsSync(path)) continue;

      const source = readFileSync(path, "utf8");
      rows.push({
        feature: "chrome",
        base,
        locale,
        file: join(dir.slice(process.cwd().length + 1), `${base}.${locale}.ts`),
        status: read(source, "status") ?? "unknown",
        reviewer: read(source, "reviewer") ?? "none",
      });
    }
  }

  return rows.sort((a, b) => a.file.localeCompare(b.file));
}

/** Pull one field out of the `__review` marker without importing the module. */
function read(source, field) {
  const marker = /export const __review\s*=\s*\{([\s\S]*?)\}/.exec(source);
  if (!marker) return null;
  const value = new RegExp(`${field}\\s*:\\s*("([^"]*)"|null)`).exec(marker[1]);
  if (!value) return null;
  return value[2] ?? null;
}

const rows = collectOverlays();
const requireReviewed = process.argv.includes("--require-reviewed");

if (rows.length === 0) {
  console.log("No translation overlays found yet.");
  process.exit(0);
}

const width = Math.max(...rows.map((r) => r.file.length));
for (const row of rows) {
  const mark = row.status === "reviewed" ? "ok  " : "DRAFT";
  console.log(`${mark} ${row.file.padEnd(width)}  reviewer: ${row.reviewer}`);
}

const drafts = rows.filter((r) => r.status !== "reviewed");
const byLocale = LOCALES.map((l) => {
  const all = rows.filter((r) => r.locale === l);
  const done = all.filter((r) => r.status === "reviewed").length;
  return `${l}: ${done}/${all.length} reviewed`;
}).join(", ");

console.log(`\n${rows.length} overlays. ${byLocale}.`);

if (requireReviewed && drafts.length > 0) {
  console.error(
    `\n${drafts.length} overlay(s) still marked draft. A Sinhala or Tamil speaker` +
      ` must sign these off before they ship.`
  );
  process.exit(1);
}
