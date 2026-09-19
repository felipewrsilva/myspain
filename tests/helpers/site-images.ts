import fs from "node:fs";
import path from "node:path";
import { covers } from "../../content/covers";
import { ads } from "../../content/anuncios";

const ROOT = path.resolve(__dirname, "../..");
const PHOTO_ID_RE = /photo-[a-zA-Z0-9-]+/g;
const REMOTE_UNSPLASH_RE = /https:\/\/images\.unsplash\.com\//g;
const LOCAL_IMAGE_RE = /\/(?:anuncios|images)\/[a-zA-Z0-9._/-]+\.(?:jpe?g|png|webp|avif|gif)/g;
const LOCAL_UNSPLASH_RE = /\/images\/unsplash\/(photo-[a-zA-Z0-9-]+)\.jpg/g;

const SCAN_DIRS = ["content", "src"] as const;
const SCAN_EXTS = new Set([".ts", ".tsx", ".mdx", ".js", ".jsx", ".css"]);

export type ImageRef = {
  photoId: string;
  source: string;
  href: string;
};

function walkFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkFiles(full));
      continue;
    }
    if (SCAN_EXTS.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

function scannedSourceFiles(): { abs: string; rel: string }[] {
  const files: { abs: string; rel: string }[] = [];
  for (const dir of SCAN_DIRS) {
    const absDir = path.join(ROOT, dir);
    if (!fs.existsSync(absDir)) continue;
    for (const abs of walkFiles(absDir)) {
      files.push({ abs, rel: path.relative(ROOT, abs).replaceAll("\\", "/") });
    }
  }
  return files;
}

/** Referências locais /images/unsplash/{photoId}.jpg no conteúdo e código. */
export function collectLocalUnsplashRefs(): ImageRef[] {
  const refs: ImageRef[] = [];
  const seen = new Set<string>();

  const add = (photoId: string, source: string) => {
    const href = `/images/unsplash/${photoId}.jpg`;
    const key = `${href}::${source}`;
    if (seen.has(key)) return;
    seen.add(key);
    refs.push({ photoId, source, href });
  };

  for (const [slug, cover] of Object.entries(covers)) {
    const id = cover.src.match(PHOTO_ID_RE)?.[0];
    if (id) add(id, `content/covers.ts#${slug}`);
  }

  for (const { abs, rel } of scannedSourceFiles()) {
    if (rel === "content/covers.ts") continue;
    const text = fs.readFileSync(abs, "utf8");
    for (const match of text.matchAll(LOCAL_UNSPLASH_RE)) {
      add(match[1], rel);
    }
    for (const match of text.matchAll(/localImage\(\s*["'](photo-[a-zA-Z0-9-]+)["']/g)) {
      add(match[1], rel);
    }
  }

  return refs;
}

export function findRemoteUnsplashUrls(): { source: string; snippet: string }[] {
  const hits: { source: string; snippet: string }[] = [];
  for (const { abs, rel } of scannedSourceFiles()) {
    const text = fs.readFileSync(abs, "utf8");
    if (!REMOTE_UNSPLASH_RE.test(text)) continue;
    REMOTE_UNSPLASH_RE.lastIndex = 0;
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (line.includes("images.unsplash.com")) {
        hits.push({ source: `${rel}:${index + 1}`, snippet: line.trim().slice(0, 160) });
      }
    });
  }
  return hits;
}

export function uniquePhotoIds(refs: ImageRef[]): string[] {
  return [...new Set(refs.map((ref) => ref.photoId))].sort();
}

/** Caminhos locais sob /public referenciados no conteúdo. */
export function collectLocalPublicImages(): { href: string; diskPath: string; source: string }[] {
  const found = new Map<string, string>();

  for (const ad of ads) {
    found.set(ad.image, `content/anuncios.ts#${ad.slug}`);
    if (ad.locationDetail?.image) {
      found.set(ad.locationDetail.image, `content/anuncios.ts#${ad.slug}.location`);
    }
  }

  for (const ref of collectLocalUnsplashRefs()) {
    if (!found.has(ref.href)) found.set(ref.href, ref.source);
  }

  for (const { abs, rel } of scannedSourceFiles()) {
    const text = fs.readFileSync(abs, "utf8");
    for (const match of text.matchAll(LOCAL_IMAGE_RE)) {
      if (!found.has(match[0])) found.set(match[0], rel);
    }
  }

  return [...found.entries()].map(([href, source]) => ({
    href,
    source,
    diskPath: path.join(ROOT, "public", href.replace(/^\//, "")),
  }));
}
