import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { StageId } from "@/lib/site";
import cities from "../../content/cities.json";
import topics from "../../content/topics.json";
import places from "../../content/places.json";
import costs from "../../content/costs.json";

const contentRoot = path.join(process.cwd(), "content");

export type ContentMeta = {
  title: string;
  description: string;
  stage: StageId;
  topics: string[];
  cities: string[];
  updatedAt?: string;
  pdf?: string | null;
};

export type Guide = ContentMeta & {
  slug: string;
  content: string;
};

export type Apostila = ContentMeta & {
  slug: string;
  content: string;
  pdf?: string | null;
};

export type ChecklistItem = {
  id: string;
  title: string;
  detail: string;
};

export type Checklist = {
  slug: string;
  title: string;
  description: string;
  stage: StageId;
  topics: string[];
  cities: string[];
  items: ChecklistItem[];
};

export type Place = {
  id: string;
  name: string;
  city: string;
  category: string;
  lat: number;
  lng: number;
  address: string;
  description: string;
  topics: string[];
};

export type SearchFilters = {
  q?: string;
  cidade?: string;
  tema?: string;
  etapa?: string;
};

function readMdxDir(dir: string) {
  const full = path.join(contentRoot, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

function parseMdxFile(dir: string, file: string) {
  const raw = fs.readFileSync(path.join(contentRoot, dir, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    stage: data.stage as StageId,
    topics: (data.topics as string[]) ?? [],
    cities: (data.cities as string[]) ?? [],
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    pdf: (data.pdf as string | null | undefined) ?? null,
    content,
  };
}

export function getGuides(): Guide[] {
  return readMdxDir("guias")
    .map((file) => parseMdxFile("guias", file))
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
}

export function getGuide(slug: string): Guide | undefined {
  return getGuides().find((guide) => guide.slug === slug);
}

export function getApostilas(): Apostila[] {
  return readMdxDir("apostilas")
    .map((file) => parseMdxFile("apostilas", file))
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
}

export function getApostila(slug: string): Apostila | undefined {
  return getApostilas().find((item) => item.slug === slug);
}

export function getChecklists(): Checklist[] {
  const dir = path.join(contentRoot, "checklists");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      return JSON.parse(raw) as Checklist;
    })
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
}

export function getChecklist(slug: string): Checklist | undefined {
  return getChecklists().find((item) => item.slug === slug);
}

export function getCities() {
  return cities;
}

export function getTopics() {
  return topics;
}

export function getPlaces(): Place[] {
  return places as Place[];
}

export function getCosts() {
  return costs;
}

function matchesFilters(
  item: {
    title: string;
    description: string;
    stage?: string;
    topics?: string[];
    cities?: string[];
    content?: string;
  },
  filters: SearchFilters,
) {
  const q = filters.q?.trim().toLowerCase();
  if (q) {
    const haystack = [
      item.title,
      item.description,
      item.content ?? "",
      ...(item.topics ?? []),
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  if (filters.etapa && item.stage !== filters.etapa) return false;
  if (filters.tema && !(item.topics ?? []).includes(filters.tema)) return false;
  if (
    filters.cidade &&
    (item.cities?.length ?? 0) > 0 &&
    !(item.cities ?? []).includes(filters.cidade)
  ) {
    return false;
  }
  if (filters.cidade && (item.cities?.length ?? 0) === 0) {
    // conteúdo geral (sem cidade) aparece em qualquer filtro de cidade
  }
  return true;
}

export function searchContent(filters: SearchFilters) {
  const guides = getGuides()
    .filter((item) => matchesFilters(item, filters))
    .map((item) => ({
      type: "guia" as const,
      href: `/guias/${item.slug}`,
      title: item.title,
      description: item.description,
      stage: item.stage,
      topics: item.topics,
    }));

  const apostilas = getApostilas()
    .filter((item) => matchesFilters(item, filters))
    .map((item) => ({
      type: "apostila" as const,
      href: `/apostilas/${item.slug}`,
      title: item.title,
      description: item.description,
      stage: item.stage,
      topics: item.topics,
    }));

  const checklists = getChecklists()
    .filter((item) => matchesFilters(item, filters))
    .map((item) => ({
      type: "checklist" as const,
      href: `/checklists/${item.slug}`,
      title: item.title,
      description: item.description,
      stage: item.stage,
      topics: item.topics,
    }));

  return [...guides, ...apostilas, ...checklists];
}

export function getContentByStage(stage: StageId) {
  return {
    guides: getGuides().filter((item) => item.stage === stage),
    apostilas: getApostilas().filter((item) => item.stage === stage),
    checklists: getChecklists().filter((item) => item.stage === stage),
  };
}

export function getCityName(id: string) {
  return getCities().find((city) => city.id === id)?.name ?? id;
}

export function getTopicName(id: string) {
  return getTopics().find((topic) => topic.id === id)?.name ?? id;
}
