/**
 * Baixa todas as fotos Unsplash referenciadas no projeto para public/images/unsplash/
 * e reescreve content/ + src/ para caminhos locais.
 *
 * Uso: node scripts/vendor-unsplash-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images", "unsplash");
const PHOTO_ID_RE = /photo-[a-zA-Z0-9-]+/g;
const UNSPLASH_URL_RE =
  /https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9-]+)(?:\?[^"'\\\s)]*)?/g;
const SCAN_EXTS = new Set([".ts", ".tsx", ".mdx", ".js", ".jsx", ".css"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (SCAN_EXTS.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function collectPhotoIds() {
  const ids = new Set();
  for (const dir of ["content", "src"]) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of walk(abs)) {
      const text = fs.readFileSync(file, "utf8");
      for (const match of text.matchAll(PHOTO_ID_RE)) ids.add(match[0]);
    }
  }
  return [...ids].sort();
}

function localHref(photoId) {
  return `/images/unsplash/${photoId}.jpg`;
}

function downloadUrl(photoId, width = 1600) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=80`;
}

async function downloadOne(photoId) {
  const dest = path.join(OUT_DIR, `${photoId}.jpg`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    return { photoId, status: "skip", bytes: fs.statSync(dest).size };
  }

  const res = await fetch(downloadUrl(photoId), {
    redirect: "follow",
    signal: AbortSignal.timeout(60_000),
    headers: { Accept: "image/*,*/*" },
  });
  if (!res.ok) {
    throw new Error(`${photoId}: HTTP ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.byteLength < 1000) {
    throw new Error(`${photoId}: arquivo muito pequeno (${buf.byteLength} bytes)`);
  }
  fs.writeFileSync(dest, buf);
  return { photoId, status: "ok", bytes: buf.byteLength };
}

async function downloadAll(photoIds, concurrency = 4) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const results = [];
  let i = 0;

  async function worker() {
    while (i < photoIds.length) {
      const id = photoIds[i++];
      process.stdout.write(`download ${id}...\n`);
      results.push(await downloadOne(id));
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, photoIds.length) }, () => worker()));
  return results;
}

function rewriteFile(filePath) {
  const rel = path.relative(ROOT, filePath).replaceAll("\\", "/");
  let text = fs.readFileSync(filePath, "utf8");
  const before = text;

  // URLs Unsplash completas -> local
  text = text.replace(UNSPLASH_URL_RE, (_m, photoId) => localHref(photoId));

  // covers.ts helper
  if (rel === "content/covers.ts") {
    text = text.replace(
      /function unsplash\(photoId: string, width = 1600\) \{\r?\n  return `https:\/\/images\.unsplash\.com\/\$\{photoId\}\?auto=format&fit=crop&w=\$\{width\}&q=80`;\r?\n\}/,
      `/** Caminho local vendido em public/images/unsplash/. */\nfunction localImage(photoId: string) {\n  return \`/images/unsplash/\${photoId}.jpg\`;\n}`,
    );
    text = text.replace(/unsplash\(/g, "localImage(");
  }

  if (text !== before) {
    fs.writeFileSync(filePath, text);
    return true;
  }
  return false;
}

function rewriteSources() {
  const changed = [];
  for (const dir of ["content", "src"]) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of walk(abs)) {
      if (rewriteFile(file)) changed.push(path.relative(ROOT, file).replaceAll("\\", "/"));
    }
  }
  return changed;
}

const ids = collectPhotoIds();
console.log(`Fotos únicas: ${ids.length}`);
const downloads = await downloadAll(ids);
const failed = downloads.filter((d) => d.status === "error");
console.log(
  `Download: ${downloads.filter((d) => d.status === "ok").length} novas, ${downloads.filter((d) => d.status === "skip").length} já existiam`,
);

const missingOnDisk = ids.filter((id) => !fs.existsSync(path.join(OUT_DIR, `${id}.jpg`)));
if (missingOnDisk.length) {
  console.error("Faltam arquivos:", missingOnDisk);
  process.exit(1);
}

const changed = rewriteSources();
console.log(`Arquivos reescritos: ${changed.length}`);
for (const file of changed) console.log(`  - ${file}`);
console.log("Pronto.");
