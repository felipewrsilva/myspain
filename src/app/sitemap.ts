import type { MetadataRoute } from "next";
import { getApostilas, getChecklists, getGuides } from "@/lib/content";
import { siteConfig, stages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/guias",
    "/apostilas",
    "/checklists",
    "/ferramentas",
    "/ferramentas/custo-de-vida",
    "/ferramentas/conversor",
    "/comunidade",
  ].map((path) => ({
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

  const apostilaRoutes = getApostilas().map((item) => ({
    url: `${base}/apostilas/${item.slug}`,
    lastModified: new Date(),
  }));

  const checklistRoutes = getChecklists().map((item) => ({
    url: `${base}/checklists/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...stageRoutes, ...guideRoutes, ...apostilaRoutes, ...checklistRoutes];
}
