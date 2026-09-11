"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  continueLabel,
  pickContinuePages,
  recordVisit,
  type ContinuePage,
} from "@/lib/continue";
import { cn } from "@/lib/utils";

export function ContinueLinks({
  currentHref,
  pages,
}: {
  currentHref: string;
  pages: ContinuePage[];
}) {
  const options = useMemo(() => {
    const visited = recordVisit(currentHref);
    return pickContinuePages(currentHref, pages, visited);
  }, [currentHref, pages]);

  if (!options?.length) return null;

  const [left, right] = options;

  return (
    <nav aria-label="Continuar" className="mt-14 border-t border-[var(--line)] pt-10">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
        Continuar
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ContinueCard page={left} align="left" />
        {right ? <ContinueCard page={right} align="right" /> : null}
      </div>
    </nav>
  );
}

function ContinueCard({
  page,
  align,
}: {
  page: ContinuePage;
  align: "left" | "right";
}) {
  return (
    <Link
      href={page.href}
      className={cn(
        "group flex flex-col rounded-2xl border border-[var(--line)] bg-white p-5 transition hover:border-[var(--accent-2)] hover:shadow-[0_24px_50px_-36px_rgba(20,24,31,0.55)]",
        align === "right" && "sm:items-end sm:text-right",
      )}
    >
      <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">
        {continueLabel(page)}
      </span>
      <span className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold leading-snug text-[var(--ink)]">
        {page.title}
      </span>
      <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--ink-muted)]">
        {page.description}
      </span>
      <span className="mt-4 text-sm font-semibold text-[var(--accent)] transition group-hover:underline">
        Abrir
      </span>
    </Link>
  );
}
