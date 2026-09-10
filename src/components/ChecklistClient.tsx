"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChecklistItem } from "@/lib/content";
import { cn } from "@/lib/utils";

const storageKey = (slug: string) => `minha-espanha:checklist:${slug}`;

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
    try {
      const raw = localStorage.getItem(storageKey(slug));
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      // ignore
    }
    setReady(true);
  }, [slug]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(storageKey(slug), JSON.stringify(checked));
  }, [checked, ready, slug]);

  const done = useMemo(
    () => items.filter((item) => checked[item.id]).length,
    [checked, items],
  );

  const progress = items.length ? Math.round((done / items.length) * 100) : 0;

  return (
    <div>
      <div className="mb-6 overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-[var(--ink-muted)]">
            Neste dispositivo: <strong className="text-[var(--ink)]">{done}/{items.length}</strong>
          </span>
          <span className="font-bold text-[var(--accent)]">{progress}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--paper-2)]">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          type="button"
          className="mt-3 text-xs font-medium text-[var(--ink-muted)] underline-offset-2 hover:underline"
          onClick={() => setChecked({})}
        >
          Limpar progresso
        </button>
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => {
          const isChecked = Boolean(checked[item.id]);
          return (
            <li key={item.id}>
              <label
                className={cn(
                  "flex cursor-pointer gap-4 rounded-2xl border border-[var(--line)] bg-white p-4 transition",
                  isChecked && "border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_6%,white)]",
                )}
              >
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-[var(--accent)]"
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
