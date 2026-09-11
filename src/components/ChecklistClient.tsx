"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ChecklistItem } from "@/lib/content";
import { cn } from "@/lib/utils";

const storageKey = (slug: string) => `minha-espanha:checklist:${slug}`;

function loadCheckedFromStorage(slug: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(storageKey(slug));
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function ChecklistClient({
  slug,
  items,
}: {
  slug: string;
  items: ChecklistItem[];
}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setChecked(loadCheckedFromStorage(slug));
    setReady(true);
  }, [slug]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(storageKey(slug), JSON.stringify(checked));
  }, [checked, slug, ready]);

  const done = items.filter((item) => checked[item.id]).length;
  const progress = items.length ? Math.round((done / items.length) * 100) : 0;

  return (
    <div>
      <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-[var(--ink-muted)]">
            Neste aparelho:{" "}
            <strong className="text-[var(--ink)]">
              {done}/{items.length}
            </strong>
          </span>
          <span className="font-bold text-[var(--accent)]">{progress}%</span>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--paper-2)]"
          role="progressbar"
          aria-label="Progresso do checklist"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {done > 0 ? (
          <button
            type="button"
            className="mt-3 min-h-11 text-sm font-medium text-[var(--ink-muted)] underline-offset-2 hover:underline"
            onClick={() => setChecked({})}
          >
            Limpar progresso
          </button>
        ) : (
          <p className="mt-3 text-sm text-[var(--ink-muted)]">O progresso fica só neste navegador.</p>
        )}
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => {
          const isChecked = Boolean(checked[item.id]);
          const inputId = `${slug}-${item.id}`;
          return (
            <li key={item.id}>
              <div
                className={cn(
                  "rounded-2xl border border-[var(--line)] bg-white transition",
                  isChecked && "border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_6%,white)]",
                )}
              >
                <label htmlFor={inputId} className="flex cursor-pointer gap-4 p-4">
                  <input
                    id={inputId}
                    type="checkbox"
                    className="mt-1 size-5 shrink-0 accent-[var(--accent)]"
                    checked={isChecked}
                    onChange={(event) =>
                      setChecked((prev) => ({
                        ...prev,
                        [item.id]: event.target.checked,
                      }))
                    }
                  />
                  <span>
                    <span className="block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">
                      Passo {index + 1}
                    </span>
                    <span className={cn("mt-1 block font-semibold text-[var(--ink)]", isChecked && "line-through opacity-60")}>
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[var(--ink-muted)]">{item.detail}</span>
                  </span>
                </label>
                {item.links?.length ? (
                  <div className="flex flex-wrap gap-x-3 gap-y-2 border-t border-[var(--line)] px-4 py-3 pl-14">
                    {item.links.map((link) => {
                      const internal = link.href.startsWith("/");
                      if (internal) {
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                          >
                            {link.label}
                          </Link>
                        );
                      }
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                        >
                          {link.label}
                          <span className="sr-only"> (abre em nova aba)</span>
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
