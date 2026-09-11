import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { StageId } from "@/lib/site";
import type { ContinuePage } from "@/lib/continue";
import topics from "../../content/topics.json";
import { getCover } from "../../content/covers";

const contentRoot = path.join(process.cwd(), "content");

export type ContentMeta = {
  title: string;
  description: string;
  bullets: string[];
  stage: StageId;
  topics: string[];
  cities: string[];
  updatedAt?: string;
  pdf?: string | null;
  cover?: string;
  coverAlt?: string;
};

export type Guide = ContentMeta & {
  slug: string;
  content: string;
};

export type ChecklistLink = {
  label: string;
  href: string;
};

export type ChecklistItem = {
  id: string;
  title: string;
  detail: string;
  links?: ChecklistLink[];
};

export type Checklist = {
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  stage: StageId;
  topics: string[];
  cities: string[];
  items: ChecklistItem[];
  cover?: string;
  coverAlt?: string;
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
    bullets: Array.isArray(data.bullets) ? data.bullets.map((item) => String(item)) : [],
    stage: data.stage as StageId,
    topics: (data.topics as string[]) ?? [],
    cities: (data.cities as string[]) ?? [],
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    pdf: (data.pdf as string | null | undefined) ?? null,
    cover: data.cover ? String(data.cover) : getCover(slug)?.src,
    coverAlt: data.coverAlt ? String(data.coverAlt) : getCover(slug)?.alt,
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

export function getChecklists(): Checklist[] {
  const dir = path.join(contentRoot, "checklists");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const item = JSON.parse(raw) as Checklist;
      const cover = getCover(item.slug);
      return {
        ...item,
        bullets: item.bullets ?? [],
        cover: item.cover ?? cover?.src,
        coverAlt: item.coverAlt ?? cover?.alt,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
}

export function getChecklist(slug: string): Checklist | undefined {
  return getChecklists().find((item) => item.slug === slug);
}

export function getTopics() {
  return topics;
}

export function getContentByStage(stage: StageId) {
  return {
    guides: getGuides().filter((item) => item.stage === stage),
    checklists: getChecklists().filter((item) => item.stage === stage),
  };
}

export function getContinuePages(): ContinuePage[] {
  return [
    ...getGuides().map((item) => ({
      href: `/guias/${item.slug}`,
      title: item.title,
      description: item.description,
      bullets: item.bullets,
      kind: "guia" as const,
      stage: item.stage,
      topics: item.topics,
    })),
    ...getChecklists().map((item) => ({
      href: `/checklists/${item.slug}`,
      title: item.title,
      description: item.description,
      bullets: item.bullets,
      kind: "checklist" as const,
      stage: item.stage,
      topics: item.topics,
    })),
  ];
}

export { getCover } from "../../content/covers";

export function getTopicName(id: string) {
  return getTopics().find((topic) => topic.id === id)?.name ?? id;
}
