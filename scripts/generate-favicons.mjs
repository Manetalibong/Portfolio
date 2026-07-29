/**
 * Generates favicon assets from the client logo.
 *
 * Looks for (in order):
 *   public/images/logo.png
 *   public/images/logo.jpg
 *   public/images/logo.jpeg
 *   public/images/logo.webp
 *   public/images/logo.svg
 *
 * Writes to public/:
 *   favicon.ico          (16 + 32)
 *   favicon-32x32.png
 *   apple-touch-icon.png (180x180)
 *
 * Usage: npm run favicons
 */

import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const imagesDir = join(publicDir, "images");

const LOGO_CANDIDATES = [
  "logo.png",
  "logo.jpg",
  "logo.jpeg",
  "logo.webp",
  "logo.svg",
];

function findLogo() {
  for (const name of LOGO_CANDIDATES) {
    const path = join(imagesDir, name);
    if (existsSync(path)) return path;
  }
  return null;
}

/** Fit logo into a square canvas with padding (contain, not crop). */
async function squarePng(inputPath, size, paddingRatio = 0.12) {
  const padding = Math.round(size * paddingRatio);
  const inner = size - padding * 2;

  const resized = await sharp(inputPath)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, gravity: "centre" }])
    .png()
    .toBuffer();
}

async function main() {
  const logoPath = findLogo();
  if (!logoPath) {
    console.error(
      "No logo found. Drop the client logo at public/images/logo.png (or .jpg/.webp/.svg), then re-run:\n  npm run favicons",
    );
    process.exit(1);
  }

  console.log(`Using logo: ${logoPath}`);

  const [png16, png32, png180] = await Promise.all([
    squarePng(logoPath, 16),
    squarePng(logoPath, 32),
    squarePng(logoPath, 180, 0.1),
  ]);

  const ico = await toIco([png16, png32]);

  await Promise.all([
    writeFile(join(publicDir, "favicon.ico"), ico),
    writeFile(join(publicDir, "favicon-32x32.png"), png32),
    writeFile(join(publicDir, "apple-touch-icon.png"), png180),
  ]);

  // Drop the starter Astro SVG favicon so it doesn't win over the client icon
  const starterSvg = join(publicDir, "favicon.svg");
  if (existsSync(starterSvg)) {
    const svg = await readFile(starterSvg, "utf8");
    if (svg.includes("astro") || svg.includes("Astro")) {
      const { unlink } = await import("node:fs/promises");
      await unlink(starterSvg);
      console.log("Removed starter favicon.svg");
    }
  }

  console.log("Wrote:");
  console.log("  public/favicon.ico");
  console.log("  public/favicon-32x32.png");
  console.log("  public/apple-touch-icon.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
