#!/usr/bin/env node
/**
 * ingest-images.mjs
 * Copia y renombra imágenes de productos a la convención del proyecto.
 *
 * Convención esperada:
 *   public/products/[slug]/flat.jpg
 *   public/products/[slug]/with-phone.jpg
 *
 * Uso:
 *   node scripts/ingest-images.mjs --slug funda-silicona-iphone-15 --flat "/ruta/foto1.jpg" --with-phone "/ruta/foto2.jpg"
 *   node scripts/ingest-images.mjs --slug cargador-20w-usb-c --flat "/ruta/foto.jpg"
 */

import { copyFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public", "products");

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      result[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return result;
}

async function main() {
  const args = parseArgs();

  if (!args.slug) {
    console.error("Error: --slug es requerido");
    console.error("Ejemplo: node scripts/ingest-images.mjs --slug funda-silicona-iphone-15 --flat /ruta/foto.jpg");
    process.exit(1);
  }

  if (!args.flat) {
    console.error("Error: --flat es requerido (imagen frontal del producto)");
    process.exit(1);
  }

  const destDir = join(PUBLIC_DIR, args.slug);
  await mkdir(destDir, { recursive: true });

  await copyFile(args.flat, join(destDir, "flat.jpg"));
  console.log(`✓ flat.jpg → public/products/${args.slug}/flat.jpg`);

  if (args["with-phone"]) {
    await copyFile(args["with-phone"], join(destDir, "with-phone.jpg"));
    console.log(`✓ with-phone.jpg → public/products/${args.slug}/with-phone.jpg`);
  }

  console.log(`\nListo. Acordate de agregar el producto a data/products.json con slug: "${args.slug}"`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
