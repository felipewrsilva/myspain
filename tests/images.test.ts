import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { covers } from "../content/covers";
import {
  collectLocalPublicImages,
  collectLocalUnsplashRefs,
  findRemoteUnsplashUrls,
  uniquePhotoIds,
} from "./helpers/site-images";

describe("imagens do site", () => {
  it("capas em content/covers.ts são únicas e locais", () => {
    const srcs = Object.values(covers).map((cover) => cover.src);
    expect(new Set(srcs).size).toBe(srcs.length);
    for (const src of srcs) {
      expect(src.startsWith("/images/unsplash/")).toBe(true);
      expect(src.endsWith(".jpg")).toBe(true);
    }
  });

  it("não resta URL remota do Unsplash no conteúdo", () => {
    expect(findRemoteUnsplashUrls()).toEqual([]);
  });

  it("coleta referências locais de imagem", () => {
    const refs = collectLocalUnsplashRefs();
    expect(uniquePhotoIds(refs).length).toBeGreaterThan(10);
  });

  it("todos os arquivos de imagem referenciados existem em /public", () => {
    const locals = collectLocalPublicImages();
    expect(locals.length).toBeGreaterThan(0);

    const missing = locals.filter((item) => {
      if (!fs.existsSync(item.diskPath)) return true;
      return fs.statSync(item.diskPath).size < 500;
    });

    expect(missing, JSON.stringify(missing, null, 2)).toEqual([]);
  });
});
