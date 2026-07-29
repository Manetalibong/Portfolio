/**
 * Resize + convert client photos in public/images/ to WebP.
 *
 * Astro does NOT optimize files in public/ — they ship as-is.
 * Run this after dropping client images, BEFORE wiring image paths in pages.
 *
 * - Max long edge: 2000px
 * - Converts .jpg / .jpeg / .png / .tif → .webp (deletes the original)
 * - Recompresses existing .webp if oversized
 * - Keeps logo.* as PNG/JPEG (favicons + transparency); still resizes if huge
 * - Skips: SVG, Preview/
 *
 * Usage: npm run optimize-images
 */

import { existsSync } from "node:fs";
import { readdir, stat, unlink, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const imagesDir = join(root, "public", "images");

const MAX_EDGE = 2000;
const WEBP_QUALITY = 82;
const PNG_COMPRESSION = 8;
const JPEG_QUALITY = 82;

const CONVERT_TO_WEBP = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".avif"]);
const RASTER = new Set([...CONVERT_TO_WEBP, ".webp"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "Preview") continue;
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }

  return files;
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function isLogo(filePath) {
  return /^logo\./i.test(basename(filePath));
}

function resizeIfNeeded(pipeline, width, height) {
  const longEdge = Math.max(width, height);
  if (longEdge <= MAX_EDGE) return { pipeline, resized: false };

  return {
    pipeline: pipeline.resize({
      width: width >= height ? MAX_EDGE : undefined,
      height: height > width ? MAX_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
    }),
    resized: true,
  };
}

async function optimizeLogo(filePath, ext, before, width, height) {
  const longEdge = Math.max(width, height);
  const needsResize = longEdge > MAX_EDGE;
  if (!needsResize && before < 300_000) {
    return { filePath, skipped: true, reason: "logo already small", before, after: before };
  }

  let pipeline = sharp(filePath, { failOn: "none" }).rotate();
  const resized = resizeIfNeeded(pipeline, width, height);
  pipeline = resized.pipeline;

  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: PNG_COMPRESSION });
  } else if (ext === ".jpg" || ext === ".jpeg") {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: WEBP_QUALITY });
  } else {
    return { filePath, skipped: true, reason: "logo format left as-is", before, after: before };
  }

  const buffer = await pipeline.toBuffer();
  if (buffer.length >= before && !needsResize) {
    return { filePath, skipped: true, reason: "logo no savings", before, after: before };
  }

  await writeFile(filePath, buffer);
  return {
    filePath,
    skipped: false,
    before,
    after: buffer.length,
    resized: resized.resized,
    from: `${width}x${height}`,
    converted: false,
  };
}

async function optimizeFile(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!RASTER.has(ext)) return null;

  const before = (await stat(filePath)).size;
  const meta = await sharp(filePath, { failOn: "none" }).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  if (isLogo(filePath)) {
    return optimizeLogo(filePath, ext, before, width, height);
  }

  let pipeline = sharp(filePath, { failOn: "none" }).rotate();
  const { pipeline: sized, resized } = resizeIfNeeded(pipeline, width, height);
  pipeline = sized.webp({ quality: WEBP_QUALITY });

  const buffer = await pipeline.toBuffer();
  const outPath =
    ext === ".webp" ? filePath : join(dirname(filePath), `${basename(filePath, ext)}.webp`);

  // Skip rewrite if already webp, small enough, and no savings
  if (ext === ".webp" && !resized && buffer.length >= before * 0.98) {
    return { filePath, skipped: true, reason: "already optimized webp", before, after: before };
  }

  await writeFile(outPath, buffer);

  if (outPath !== filePath) {
    await unlink(filePath);
  }

  return {
    filePath: outPath,
    skipped: false,
    before,
    after: buffer.length,
    resized,
    from: `${width}x${height}`,
    converted: outPath !== filePath,
    fromName: relative(imagesDir, filePath),
    toName: relative(imagesDir, outPath),
  };
}

async function main() {
  if (!existsSync(imagesDir)) {
    console.error(`Missing ${imagesDir}. Drop client images into public/images/ first.`);
    process.exit(1);
  }

  const files = await walk(imagesDir);
  if (files.length === 0) {
    console.log("No images found in public/images/.");
    return;
  }

  console.log(
    `Optimizing public/images/ → WebP (max edge ${MAX_EDGE}px, logo kept as-is)...\n`,
  );

  let saved = 0;
  let optimized = 0;
  let skipped = 0;

  for (const file of files) {
    const rel = relative(imagesDir, file);
    try {
      const result = await optimizeFile(file);
      if (!result) continue;

      if (result.skipped) {
        skipped++;
        console.log(`  skip  ${rel} (${result.reason})`);
        continue;
      }

      optimized++;
      saved += result.before - result.after;
      const bits = [];
      if (result.converted) bits.push(`${result.fromName} → ${result.toName}`);
      if (result.resized) bits.push(`${result.from} → max ${MAX_EDGE}`);
      const detail = bits.length ? ` ${bits.join(", ")}` : "";
      console.log(
        `  ok    ${result.toName ?? rel}${detail}  ${formatBytes(result.before)} → ${formatBytes(result.after)}`,
      );
    } catch (err) {
      console.error(`  FAIL  ${rel}: ${err.message}`);
    }
  }

  console.log(
    `\nDone. Optimized ${optimized}, skipped ${skipped}, saved ${formatBytes(saved)}.`,
  );
  console.log("Use the .webp filenames in page props/markdown (logo.png stays .png).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
