"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  continueLabel,
  pickContinuePages,
  recordVisit,
  type ContinuePage,
} from "@/lib/continue";
import { CardBullets } from "@/components/ContentCard";

export function ContinueLinks({
  currentHref,
  pages,
}: {
  currentHref: string;
  pages: ContinuePage[];
}) {
  const [options, setOptions] = useState<ContinuePage[] | null>(null);

  useEffect(() => {
    const visited = recordVisit(currentHref);
    setOptions(pickContinuePages(currentHref, pages, visited));
  }, [currentHref, pages]);

  if (!options?.length) return null;

  const [left, right] = options;

  return (
    <nav aria-label="Continuar" className="mt-14 border-t border-[var(--line)] pt-10">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
        Continuar
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <ContinueCard page={left} />
        {right ? <ContinueCard page={right} /> : null}
      </div>
    </nav>
  );
}

function ContinueCard({ page }: { page: ContinuePage }) {
  return (
    <Link
      href={page.href}
      className="group flex flex-col rounded-2xl border border-[var(--line)] bg-white p-5 transition hover:border-[var(--accent-2)] hover:shadow-[0_24px_50px_-36px_rgba(20,24,31,0.55)]"
    >
      <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">
        {continueLabel(page)}
      </span>
      <span className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold leading-snug text-balance text-[var(--ink)]">
        {page.title}
      </span>
      {page.bullets?.length ? (
        <CardBullets items={page.bullets} className="w-full text-left" />
      ) : (
        <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-pretty text-[var(--ink-muted)]">
          {page.description}
        </span>
      )}
      <span className="mt-4 text-sm font-semibold text-[var(--accent)] transition group-hover:underline">
        Abrir
      </span>
    </Link>
  );
}
