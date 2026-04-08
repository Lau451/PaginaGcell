#!/usr/bin/env node
/**
 * compress-images.mjs
 * Comprime todas las imágenes de productos en /public/products/ usando sharp.
 * Genera versión JPG optimizada + WebP para cada imagen.
 *
 * Uso:
 *   npm run compress-images          → comprime y sobreescribe
 *   npm run compress-images:dry      → preview sin tocar archivos
 */

import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "products");
const DRY_RUN = process.argv.includes("--dry-run");

// Dimensiones máximas por tipo de imagen
const CONFIG = {
  flat: { width: 800, height: 800, fit: "inside" },
  "with-phone": { width: 800, height: 1000, fit: "inside" },
};
const QUALITY = 85;
const SUPPORTED_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG"]);

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

function getKindFromFilename(filePath) {
  const base = basename(filePath, extname(filePath)).toLowerCase();
  if (base === "with-phone") return "with-phone";
  return "flat";
}

async function walkDir(dir) {
  let files = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return files;
  }
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await walkDir(fullPath));
    } else if (entry.isFile() && SUPPORTED_EXTS.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

async function compressImage(filePath) {
  const kind = getKindFromFilename(filePath);
  const dims = CONFIG[kind] ?? CONFIG["flat"];
  const dir = dirname(filePath);
  const ext = extname(filePath);
  const base = basename(filePath, ext);

  const originalStat = await stat(filePath);
  const originalSize = originalStat.size;

  const outJpg = join(dir, `${base}.jpg`);
  const outWebp = join(dir, `${base}.webp`);

  if (DRY_RUN) {
    console.log(`[DRY-RUN] ${filePath.replace(ROOT, "")}`);
    console.log(`          Tipo: ${kind} | Dims máx: ${dims.width}x${dims.height}`);
    console.log(`          Original: ${formatBytes(originalSize)}`);
    console.log(`          → ${outJpg.replace(ROOT, "")}`);
    console.log(`          → ${outWebp.replace(ROOT, "")}`);
    console.log("");
    return;
  }

  const pipeline = sharp(filePath).resize({
    width: dims.width,
    height: dims.height,
    fit: dims.fit,
    withoutEnlargement: true,
  });

  await pipeline.clone().jpeg({ quality: QUALITY, mozjpeg: true }).toFile(outJpg);
  await pipeline.clone().webp({ quality: QUALITY }).toFile(outWebp);

  const jpgStat = await stat(outJpg);
  const webpStat = await stat(outWebp);

  const jpgSaving = (((originalSize - jpgStat.size) / originalSize) * 100).toFixed(0);
  const webpSaving = (((originalSize - webpStat.size) / originalSize) * 100).toFixed(0);

  console.log(`✓ ${filePath.replace(ROOT, "")}`);
  console.log(`  Original : ${formatBytes(originalSize)}`);
  console.log(`  JPG      : ${formatBytes(jpgStat.size)} (-${jpgSaving}%)`);
  console.log(`  WebP     : ${formatBytes(webpStat.size)} (-${webpSaving}%)`);
  console.log("");
}

async function main() {
  console.log(`\nGcellShop — Compresión de imágenes${DRY_RUN ? " [DRY RUN]" : ""}`);
  console.log(`Directorio: ${ROOT}\n`);

  let files;
  try {
    files = await walkDir(ROOT);
  } catch (err) {
    console.error(`No se pudo leer ${ROOT}:`, err.message);
    console.error("Asegurate de que exista la carpeta public/products/");
    process.exit(1);
  }

  if (files.length === 0) {
    console.log("No se encontraron imágenes. Colocá fotos en public/products/[slug]/");
    return;
  }

  console.log(`Imágenes encontradas: ${files.length}\n`);

  let ok = 0;
  let errors = 0;

  for (const file of files) {
    try {
      await compressImage(file);
      ok++;
    } catch (err) {
      console.error(`ERROR: ${file}\n  ${err.message}\n`);
      errors++;
    }
  }

  console.log(`\nFin: ${ok} comprimidas, ${errors} errores.`);
  if (!DRY_RUN && ok > 0) {
    console.log("Actualizá los paths en products.json si cambiaste nombres de archivo.");
  }
}

main();
