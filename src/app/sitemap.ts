import type { MetadataRoute } from "next";
import { getChecklists, getGuides } from "@/lib/content";
import { siteConfig, stages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = ["", "/guias", "/checklists", "/comunidade"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const stageRoutes = stages.map((stage) => ({
    url: `${base}${stage.href}`,
    lastModified: new Date(),
  }));

  const guideRoutes = getGuides().map((guide) => ({
    url: `${base}/guias/${guide.slug}`,
    lastModified: new Date(),
  }));

  const checklistRoutes = getChecklists().map((item) => ({
    url: `${base}/checklists/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...stageRoutes, ...guideRoutes, ...checklistRoutes];
}
