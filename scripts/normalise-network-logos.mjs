// One-off: normalises the nine group company marks into a single shape so the
// 48px logo tile on /network renders them consistently.
//
// Every mark is fitted into a 144x144 square (48px at 3x) with `contain`, on a
// transparent canvas, padded so nothing touches the tile edge. The card renders
// them on a solid white chip, so marks that arrive on an opaque white
// background (St. Gianna, LAIPT, Human Compass MSO) need no alpha surgery: the
// white simply meets the white of the chip. That is why this script does not
// repeat the flood-fill and un-composite treatment that `logo-mark.png` needed,
// which exists because that mark sits directly on the dark theme.
//
// sharp is not a declared dependency. It is resolved from the repository's
// node_modules, where Next installs it for image optimisation. Run from the
// repository root:  node scripts/normalise-network-logos.mjs
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const OUT_DIR = path.join("public", "images", "network", "logos");
const SIZE = 144;
const PAD = 8;

const SCRATCH = "C:/Users/User/AppData/Local/Temp/claude/c--dev-sj-hospital/0400c68f-e4ee-4ec2-baeb-c0fe0c367f33/scratchpad/net";

/** slug -> source file. Order matches the cards' reading order on the page. */
const SOURCES = {
  "st-joseph": "public/images/logo-mark.png",
  acig: "public/images/partners/partner-4.png",
  "kids-and-teens": "public/images/kids-teens-logo.png",
  "st-gianna": `${SCRATCH}/sgm.png`,
  laipt: `${SCRATCH}/laipt.png`,
  "serendib-healthways": "C:/Users/User/Pictures/Logo/serendib-logo.png",
  "after-hours": "public/images/partners/partner-5.png",
  "human-compass": `${SCRATCH}/hcm.png`,
  "blockchain-bpo": "public/images/partners/partner-2.png",
};

await mkdir(OUT_DIR, { recursive: true });

for (const [slug, src] of Object.entries(SOURCES)) {
  const out = path.join(OUT_DIR, `${slug}.png`);
  await sharp(src)
    .resize(SIZE - PAD * 2, SIZE - PAD * 2, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: PAD,
      bottom: PAD,
      left: PAD,
      right: PAD,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(out);
  const { size } = await sharp(out).metadata();
  console.log(`${slug}: ${out} (${size} bytes)`);
}
