import fs from "node:fs";
import path from "node:path";
import { covers } from "../../content/covers";
import { ads } from "../../content/anuncios";

const ROOT = path.resolve(__dirname, "../..");
const PHOTO_ID_RE = /photo-[a-zA-Z0-9-]+/g;
const UNSPLASH_URL_RE =
  /https:\/\/images\.unsplash\.com\/(photo-[a-zA-Z0-9-]+)(?:\?[^"'\\\s)]*)?/g;
const LOCAL_IMAGE_RE = /\/(?:anuncios|images)\/[a-zA-Z0-9._/-]+\.(?:jpe?g|png|webp|avif|gif)/g;

const SCAN_DIRS = ["content", "src"] as const;
const SCAN_EXTS = new Set([".ts", ".tsx", ".mdx", ".js", ".jsx", ".css"]);

export type ImageRef = {
  photoId: string;
  source: string;
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

/** Todas as referências Unsplash do conteúdo e do código. */
export function collectUnsplashRefs(): ImageRef[] {
  const refs: ImageRef[] = [];
  const seen = new Set<string>();

  const add = (photoId: string, source: string) => {
    const key = `${photoId}::${source}`;
    if (seen.has(key)) return;
    seen.add(key);
    refs.push({ photoId, source });
  };

  for (const [slug, cover] of Object.entries(covers)) {
    const match = cover.src.match(PHOTO_ID_RE);
    if (match) add(match[0], `content/covers.ts#${slug}`);
  }

  for (const dir of SCAN_DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of walkFiles(abs)) {
      const rel = path.relative(ROOT, file).replaceAll("\\", "/");
      if (rel === "content/covers.ts") continue;
      const text = fs.readFileSync(file, "utf8");
      for (const match of text.matchAll(UNSPLASH_URL_RE)) {
        add(match[1], rel);
      }
      // capas via helper unsplash("photo-...")
      for (const match of text.matchAll(/unsplash\(\s*["'](photo-[a-zA-Z0-9-]+)["']/g)) {
        add(match[1], rel);
      }
    }
  }

  return refs;
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

  for (const dir of SCAN_DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of walkFiles(abs)) {
      const rel = path.relative(ROOT, file).replaceAll("\\", "/");
      const text = fs.readFileSync(file, "utf8");
      for (const match of text.matchAll(LOCAL_IMAGE_RE)) {
        if (!found.has(match[0])) found.set(match[0], rel);
      }
    }
  }

  return [...found.entries()].map(([href, source]) => ({
    href,
    source,
    diskPath: path.join(ROOT, "public", href.replace(/^\//, "")),
  }));
}

export function unsplashProbeUrl(photoId: string) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=200&q=60`;
}

export async function probeUnsplash(photoId: string): Promise<{
  photoId: string;
  ok: boolean;
  status: number;
  contentType: string;
  bytes: number;
  error?: string;
}> {
  const url = unsplashProbeUrl(photoId);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(25_000),
      headers: { Accept: "image/*,*/*" },
    });
    const buf = Buffer.from(await res.arrayBuffer());
    const contentType = res.headers.get("content-type") ?? "";
    const ok =
      res.ok &&
      buf.byteLength >= 500 &&
      (contentType.startsWith("image/") || contentType.includes("octet-stream"));
    return {
      photoId,
      ok,
      status: res.status,
      contentType,
      bytes: buf.byteLength,
    };
  } catch (error) {
    return {
      photoId,
      ok: false,
      status: 0,
      contentType: "",
      bytes: 0,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/** Executa probes com concorrência limitada. */
export async function probeAllUnsplash(photoIds: string[], concurrency = 6) {
  const results: Awaited<ReturnType<typeof probeUnsplash>>[] = [];
  let index = 0;

  async function worker() {
    while (index < photoIds.length) {
      const current = photoIds[index++];
      results.push(await probeUnsplash(current));
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, photoIds.length) }, () => worker()));
  return results;
}
