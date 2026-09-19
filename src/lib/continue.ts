import type { StageId } from "@/lib/site";

export type ContinueKind = "guia" | "checklist" | "outro";

export type ContinuePage = {
  href: string;
  title: string;
  description: string;
  bullets?: string[];
  kind: ContinueKind;
  label?: string;
  stage: StageId;
  topics: string[];
};

const STORAGE_KEY = "myspain:session-visits";
const STAGE_ORDER: StageId[] = ["antes-de-ir", "acabei-de-chegar", "ja-moro"];

const KIND_LABEL: Record<ContinueKind, string> = {
  guia: "Guia",
  checklist: "Checklist",
  outro: "Seguir",
};

export const continueFallbacks: ContinuePage[] = [
  {
    href: "/fale-conosco",
    title: "Fale Conosco",
    description: "E-mail do projeto e grupo oficial no WhatsApp.",
    bullets: ["Contato por e-mail", "Grupo no WhatsApp", "Dúvidas e anúncios"],
    kind: "outro",
    label: "Contato",
    stage: "acabei-de-chegar",
    topics: [],
  },
];

export function continueLabel(page: ContinuePage) {
  return page.label ?? KIND_LABEL[page.kind];
}

export function readVisited(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function recordVisit(href: string): string[] {
  const visited = readVisited();
  if (visited[visited.length - 1] !== href) {
    visited.push(href);
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(visited.slice(-80)));
  } catch {
    // private mode / quota
  }
  return visited;
}

function overlap(a: string[], b: string[]) {
  return a.filter((topic) => b.includes(topic)).length;
}

function scorePage(
  page: ContinuePage,
  current: ContinuePage | undefined,
  visitedSet: Set<string>,
  previousHref: string | undefined,
  sibling?: ContinuePage,
) {
  let score = 0;
  if (!visitedSet.has(page.href)) score += 24;
  if (page.href === previousHref) score -= 80;

  if (current) {
    if (page.stage === current.stage) score += 12;
    const currentIndex = STAGE_ORDER.indexOf(current.stage);
    const pageIndex = STAGE_ORDER.indexOf(page.stage);
    if (pageIndex === currentIndex + 1) score += 9;
    if (pageIndex === currentIndex - 1) score -= 5;
    score += overlap(page.topics, current.topics) * 6;
    if (page.kind !== current.kind && page.kind !== "outro") score += 6;
  }

  if (sibling) {
    if (page.kind !== sibling.kind) score += 5;
    const shared = overlap(page.topics, sibling.topics);
    if (shared === 0) score += 4;
    if (page.kind === sibling.kind && shared > 0) score -= 3;
  }

  return score;
}

function sortPool(
  pool: ContinuePage[],
  current: ContinuePage | undefined,
  visitedSet: Set<string>,
  previousHref: string | undefined,
  sibling?: ContinuePage,
) {
  return [...pool].sort((a, b) => {
    const delta =
      scorePage(b, current, visitedSet, previousHref, sibling) -
      scorePage(a, current, visitedSet, previousHref, sibling);
    return delta || a.href.localeCompare(b.href, "pt-BR");
  });
}

export function pickContinuePages(
  currentHref: string,
  pages: ContinuePage[],
  visited: string[],
  extras: ContinuePage[] = continueFallbacks,
): ContinuePage[] {
  const current = pages.find((page) => page.href === currentHref);
  const visitedSet = new Set(visited);
  const previousHref = [...visited].reverse().find((href) => href !== currentHref);

  const content = pages.filter((page) => page.href !== currentHref);
  const extraPool = extras.filter((page) => page.href !== currentHref);
  const unvisitedContent = content.filter((page) => !visitedSet.has(page.href));
  const unvisitedExtras = extraPool.filter((page) => !visitedSet.has(page.href));

  const firstPool = unvisitedContent.length
    ? unvisitedContent
    : unvisitedExtras.length
      ? unvisitedExtras
      : extraPool;

  const left = sortPool(firstPool, current, visitedSet, previousHref)[0];
  if (!left) return [];

  const remainingUnvisited = [...unvisitedContent, ...unvisitedExtras].filter(
    (page) => page.href !== left.href && page.href !== previousHref,
  );
  const remainingAny = [...content, ...extraPool].filter(
    (page) => page.href !== left.href && page.href !== previousHref,
  );
  const secondPool = remainingUnvisited.length
    ? remainingUnvisited
    : remainingAny.length
      ? remainingAny
      : extraPool.filter((page) => page.href !== left.href);

  const right = sortPool(secondPool, current, visitedSet, previousHref, left)[0];
  if (!right || right.href === left.href) return [left];
  return [left, right];
}
