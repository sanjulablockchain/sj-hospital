/**
 * The pure rules `scripts/import-lab-catalogue.mjs` applies to every row of
 * the hospital's laboratory price list workbook before writing
 * `catalogue.ts`. Kept free of Node imports so `node --test` loads it beside
 * the script.
 *
 * The sheet is a working document (uppercase names, "0ne day", a few
 * spelling slips, reference-lab markers inside names), so the import is two
 * parts: these mechanical rules, and the hand maintained `overrides.ts` the
 * script applies afterwards. See the spec's "Catalogue cleaning" section:
 * docs/superpowers/specs/2026-10-28-hero-slideshow-design.md.
 */

export type LabTest = {
  /** The sheet's item code, as printed. A code can repeat (same test, two services). */
  code: string;
  /** Sentence case display name with abbreviations kept uppercase. */
  name: string;
  /** Short qualifier that tells two rows of the same test apart ("Night service"). */
  note?: string;
  /** Sample container, cleaned free text; patient instructions stay in it. */
  container: string;
  /** Working days until the report, from the sheet's turnaround phrase. */
  turnaroundDays: number;
  /** LKR, or null when the sheet has 0 or a blank. */
  price: number | null;
};

export type RawRow = {
  code: string;
  name: string;
  container: string;
  turnaround: string;
  price: string | number | null;
};

export type LabOverride = {
  /**
   * The mechanically cleaned name the importer must find at this key
   * (`sentenceCaseName` of the sheet's spelling). A row that moved under the
   * same code stops the import instead of taking another row's correction.
   */
  expect?: string;
  name?: string;
  note?: string;
  exclude?: true;
  reason?: string;
};

/**
 * Every turnaround phrase the 2026 sheet uses, lowercased with whitespace
 * collapsed, and the day count it means. A range maps to its upper bound.
 * "monday" appears once and reads as a weekly batch, so it maps to seven.
 */
export const TURNAROUND_DAYS: Readonly<Record<string, number>> = {
  "one day": 1,
  "0ne day": 1,
  "one days": 1,
  "two days": 2,
  "three day": 3,
  "three days": 3,
  "four days": 4,
  "seven days": 7,
  "seven to ten days": 10,
  "ten to fourteen days": 14,
  "fourteen days": 14,
  "twenty one days": 21,
  monday: 7,
};

const collapse = (value: string) => value.replace(/\s+/g, " ").trim();

export function turnaroundDays(phrase: string): number {
  const days = TURNAROUND_DAYS[collapse(phrase).toLowerCase()];
  if (days === undefined) throw new Error(`Unknown turnaround phrase: ${collapse(phrase)}`);
  return days;
}

/**
 * Tokens restored to their canonical spelling after the name is lowercased.
 * Matched case insensitively on word boundaries, so "EGFR" becomes "eGFR"
 * and "IGM" becomes "IgM". Extend while reviewing the generated output.
 */
export const KEEP_UPPER: readonly string[] = [
  "FBC", "FBS", "RBS", "UFR", "CRP", "TSH", "ALT", "AST", "SGOT", "SGPT", "Hb", "PCV",
  "BSS", "ABST", "AFB", "FNAC", "IgM", "IgG", "IgA", "IgE", "eGFR", "HIV", "HBsAg",
  "ESR", "LDH", "LH", "FSH", "PSA", "HbA1c", "CEA", "AFP", "ANA", "ANF", "PT", "INR",
  "APTT", "VDRL", "TPHA", "HCV", "HBV", "CMV", "EBV", "TB", "PCR", "DNA", "RNA", "ECG",
  "B12", "D3", "T3", "T4", "FT3", "FT4", "C3", "C4", "ASO", "CK", "CPK", "GGT", "ALP",
  "BUN", "HPLC", "HPV", "RPR", "HSV", "WBC", "RBC", "G6PD", "Rh", "OPD", "CSF", "ABO",
  "ACTH", "ANCA", "APLA", "BHCG", "CA", "DHEA", "DHEAS", "HCG", "HDL", "LDL", "VLDL",
  "IgE", "HE4", "HSCRP", "HTLV", "LFT", "MP", "MCV", "MCH", "MCHC", "PTH", "RA", "RF",
  "SHBG", "TPO", "TG", "TIBC", "UIBC", "VMA", "VZV", "HLA", "B27", "NT", "PRO", "BNP",
  "H1N1", "HBeAg", "HBc", "HAV", "HEV", "HDV", "NS1", "DC", "ELISA", "CBC", "BUSE",
  "FBG", "PPBS", "OGTT", "GTT", "AMH", "E2", "TSI", "TRAB", "IFA", "MRSA", "BOI",
  "PAP", "LE", "DLC", "PBF", "RDW", "MPV", "PDW", "PLT", "ANA/ANF", "HIV1", "HIV2",
];

const keepByLower = new Map(KEEP_UPPER.map((token) => [token.toLowerCase(), token]));

function tidyPunctuation(value: string): string {
  return collapse(value)
    .replace(/\s*\(\s*/g, " (")
    .replace(/\s*\)\s*/g, ") ")
    .replace(/\s+-\s+|\s+\/\s*|\s*\/\s+/g, ", ")
    // A hyphen that touches a space on one side only is a dash, not a
    // compound: "C- REACTIVE" and "ANTIBODY -(A)" lose it; "ANTI-NUCLEAR" keeps it.
    .replace(/(\S)-\s+/g, "$1 ")
    .replace(/\s+-(\S)/g, " $1")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/,$/, "");
}

const ROMAN = new Set(["i", "ii", "iii", "iv", "xl"]);

export function sentenceCaseName(raw: string): string {
  const lower = tidyPunctuation(raw).toLowerCase();
  // Restore known abbreviations; uppercase a lone letter ("hepatitis b",
  // "troponin i"), a roman numeral, and a 2 to 4 letter token inside
  // brackets, which in this sheet is always a code ("(SAT)", "(DAT)") and
  // never a word ("(blood)" is five).
  const restored = lower
    .replace(/\b[a-z0-9]+\b/g, (word) => keepByLower.get(word) ?? (word.length === 1 || ROMAN.has(word) ? word.toUpperCase() : word))
    .replace(/\(([a-z]{2,4})\)/g, (_, code: string) => `(${keepByLower.get(code) ?? code.toUpperCase()})`);
  return restored.charAt(0).toUpperCase() + restored.slice(1);
}

export function cleanContainer(raw: string): string {
  // Patient instructions first, while the sheet's "10- 12 hrs" still has its
  // hyphen; tidyPunctuation would otherwise read that hyphen as a dash.
  const withInstructions = collapse(raw)
    .replace(/\s*(\d+)\s*-\s*(\d+)\s*hrs?\s+fasting/i, ", $1 to $2 hours fasting")
    .replace(/\s+with ice\b/i, ", on ice")
    .replace(/\bEube\b/gi, "tube")
    .replace(/\bsteri?l?i?[sz]ed\b/gi, "Sterilised")
    .replace(/\bcontainers\b/gi, "container")
    .replace(/\)\s+(?=[A-Za-z])/g, "), ");
  const lower = tidyPunctuation(withInstructions)
    .toLowerCase()
    .replace(/\b(edta|esr|sst|pcr|boi)\b/g, (token) => token.toUpperCase());
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export function priceOf(value: string | number | null): number | null {
  if (value === null || value === undefined) return null;
  const numeric = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : null;
}

/**
 * `"<code>#<n>"`: the sheet's item code and the zero based occurrence of that
 * code among the rows, since a code can repeat (Vitamin B12 is 10134 twice).
 * The raw name is deliberately NOT part of the key: it would put the sheet's
 * own dash punctuation into a string under `src`, which `check:dashes`
 * scans. Each override instead carries `expect`, the cleaned name, which
 * `applyRules` checks against the row before applying anything.
 */
export function overrideKey(code: string, occurrence: number): string {
  return `${String(code).trim()}#${occurrence}`;
}

export function applyRules(
  rows: RawRow[],
  overrides: Record<string, LabOverride>
): { tests: LabTest[]; unusedOverrideKeys: string[] } {
  const used = new Set<string>();
  const tests: LabTest[] = [];
  const seen = new Map<string, number>();
  for (const row of rows) {
    const code = String(row.code).trim();
    const occurrence = seen.get(code) ?? 0;
    seen.set(code, occurrence + 1);
    const key = overrideKey(code, occurrence);
    const override = overrides[key];
    if (override) used.add(key);
    const cleaned = sentenceCaseName(row.name);
    if (override?.expect !== undefined && override.expect !== cleaned) {
      throw new Error(`override ${key} expected "${override.expect}" but the row reads "${cleaned}"`);
    }
    if (override?.exclude) continue;
    const test: LabTest = {
      code,
      name: override?.name ?? cleaned,
      container: cleanContainer(row.container),
      turnaroundDays: turnaroundDays(row.turnaround),
      price: priceOf(row.price),
    };
    if (override?.note) test.note = override.note;
    tests.push(test);
  }
  const unusedOverrideKeys = Object.keys(overrides).filter((key) => !used.has(key));
  return { tests, unusedOverrideKeys };
}
