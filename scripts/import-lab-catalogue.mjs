// Turns the hospital's laboratory price list workbook into
// src/features/laboratory/data/catalogue.ts.
//
//   npm run lab:import -- "C:\path\to\Laboratory Tests Catalogue.xlsx"
//
// The workbook is not committed; the generated module is. No dependency: an
// .xlsx is a zip of XML, so this walks the zip's central directory with
// node:zlib, reads the shared strings and the first sheet, and hands the rows
// to the pure rules in src/features/laboratory/data/importRules.ts (Node 24
// strips the types) plus the hand maintained overrides beside them. Fails
// loudly on an unknown turnaround phrase rather than guessing a number.

import { readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateRawSync } from "node:zlib";

const here = dirname(fileURLToPath(import.meta.url));
const dataDir = join(here, "..", "src", "features", "laboratory", "data");
const { applyRules } = await import(`file://${join(dataDir, "importRules.ts").replace(/\\/g, "/")}`);
const { labOverrides } = await import(`file://${join(dataDir, "overrides.ts").replace(/\\/g, "/")}`);

const source = process.argv[2];
if (!source) {
  console.error('usage: npm run lab:import -- "<path to .xlsx>"');
  process.exit(2);
}

/** Every entry of a zip, by name, read through the central directory. */
function unzip(buffer) {
  const eocd = buffer.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (eocd < 0) throw new Error("not a zip file");
  const count = buffer.readUInt16LE(eocd + 10);
  let offset = buffer.readUInt32LE(eocd + 16);
  const entries = new Map();
  for (let i = 0; i < count; i++) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) throw new Error("bad central directory");
    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.toString("utf8", offset + 46, offset + 46 + nameLength);
    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const data = buffer.subarray(dataStart, dataStart + compressedSize);
    entries.set(name, method === 8 ? inflateRawSync(data) : data);
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

const decode = (text) =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

function sharedStrings(xml) {
  const strings = [];
  for (const si of xml.matchAll(/<si>([\s\S]*?)<\/si>/g)) {
    strings.push(decode([...si[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => t[1]).join("")));
  }
  return strings;
}

/** Row number → column letter → cell value (string or number). */
function sheetRows(xml, strings) {
  const rows = new Map();
  for (const cell of xml.matchAll(/<c r="([A-Z]+)(\d+)"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
    const [, column, rowNumber, attrs, inner = ""] = cell;
    const type = /t="([^"]+)"/.exec(attrs)?.[1];
    const v = /<v>([\s\S]*?)<\/v>/.exec(inner)?.[1];
    let value = null;
    if (type === "s" && v !== undefined) value = strings[Number(v)];
    else if (type === "inlineStr") value = decode(/<t[^>]*>([\s\S]*?)<\/t>/.exec(inner)?.[1] ?? "");
    else if (v !== undefined) value = Number.isNaN(Number(v)) ? v : Number(v);
    if (!rows.has(rowNumber)) rows.set(rowNumber, new Map());
    rows.get(rowNumber).set(column, value);
  }
  return rows;
}

const entries = unzip(readFileSync(source));
const strings = sharedStrings(entries.get("xl/sharedStrings.xml")?.toString("utf8") ?? "");
const sheet = entries.get("xl/worksheets/sheet1.xml");
if (!sheet) throw new Error("xl/worksheets/sheet1.xml not found in the workbook");
const rows = sheetRows(sheet.toString("utf8"), strings);

const title = String(rows.get("1")?.get("A") ?? "");
const year = Number(/(\d{4})\s*$/.exec(title)?.[1]);
if (!year) throw new Error(`cannot read the year from A1: "${title}"`);

const raw = [];
for (const [rowNumber, cells] of [...rows.entries()].sort((a, b) => Number(a[0]) - Number(b[0]))) {
  if (Number(rowNumber) < 4) continue;
  const name = cells.get("C");
  if (name === null || name === undefined || String(name).trim() === "") continue;
  raw.push({
    code: String(cells.get("B") ?? "").trim(),
    name: String(name),
    container: String(cells.get("D") ?? ""),
    turnaround: String(cells.get("E") ?? ""),
    price: cells.get("F") ?? null,
  });
}

const { tests, unusedOverrideKeys } = applyRules(raw, labOverrides);
for (const key of unusedOverrideKeys) console.warn(`warning: unused override key ${key}`);

const today = new Date().toISOString().slice(0, 10);
const header = `/**
 * GENERATED by scripts/import-lab-catalogue.mjs on ${today} from
 * "${basename(source)}" (the hospital's own price list; the workbook is not
 * committed). Do not edit by hand: fix the sheet or add an entry to
 * overrides.ts, then re-run \`npm run lab:import\`.
 */
import type { LabTest } from "./importRules.ts";

export const LAB_CATALOGUE_YEAR = ${year};

export const labTests: readonly LabTest[] = ${JSON.stringify(tests, null, 2)};
`;
writeFileSync(join(dataDir, "catalogue.ts"), header);
console.log(`Imported ${tests.length} tests, ${raw.length - tests.length} excluded`);
