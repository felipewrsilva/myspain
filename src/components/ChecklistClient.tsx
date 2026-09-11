"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChecklistItem } from "@/lib/content";
import { cn } from "@/lib/utils";

const storageKey = (slug: string) => `minha-espanha:checklist:${slug}`;

function loadCheckedFromStorage(slug: string): Record<string, boolean> {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(storageKey(slug)) : null;
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
  const [checked, setChecked] = useState<Record<string, boolean>>(() => loadCheckedFromStorage(slug));

  useEffect(() => {
    localStorage.setItem(storageKey(slug), JSON.stringify(checked));
  }, [checked, slug]);



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
              <div
                className={cn(
                  "rounded-2xl border border-[var(--line)] bg-white transition",
                  isChecked && "border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_6%,white)]",
                )}
              >
                <label className="flex cursor-pointer gap-4 p-4">
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
                {item.links?.length ? (
                  <div className="flex flex-wrap gap-x-3 gap-y-1 border-t border-[var(--line)] px-4 py-3 pl-[3.25rem]">
                    {item.links.map((link) => {
                      const internal = link.href.startsWith("/");
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          {...(internal
                            ? {}
                            : { target: "_blank", rel: "noreferrer" })}
                          className="text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                        >
                          {link.label}
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
