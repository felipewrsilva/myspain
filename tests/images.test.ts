import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { covers } from "../content/covers";
import {
  collectLocalPublicImages,
  collectUnsplashRefs,
  probeAllUnsplash,
  uniquePhotoIds,
} from "./helpers/site-images";

describe("imagens do site", () => {
  it("capas em content/covers.ts são únicas", () => {
    const srcs = Object.values(covers).map((cover) => cover.src);
    expect(new Set(srcs).size).toBe(srcs.length);
  });

  it("arquivos locais em /public existem", () => {
    const locals = collectLocalPublicImages();
    expect(locals.length).toBeGreaterThan(0);

    const missing = locals.filter((item) => !fs.existsSync(item.diskPath));
    expect(missing, JSON.stringify(missing, null, 2)).toEqual([]);
  });

  it("coleta pelo menos uma referência Unsplash", () => {
    const refs = collectUnsplashRefs();
    expect(refs.length).toBeGreaterThan(10);
  });

  it(
    "todas as URLs Unsplash respondem com imagem",
    async () => {
      const refs = collectUnsplashRefs();
      const ids = uniquePhotoIds(refs);
      const results = await probeAllUnsplash(ids);

      const broken = results
        .filter((result) => !result.ok)
        .map((result) => {
          const usedIn = refs
            .filter((ref) => ref.photoId === result.photoId)
            .map((ref) => ref.source);
          return {
            photoId: result.photoId,
            status: result.status,
            contentType: result.contentType,
            bytes: result.bytes,
            error: result.error,
            usedIn,
          };
        });

      expect(
        broken,
        broken.length
          ? `Imagens Unsplash quebradas:\n${JSON.stringify(broken, null, 2)}`
          : undefined,
      ).toEqual([]);
    },
    120_000,
  );
});
