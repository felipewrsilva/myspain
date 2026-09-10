"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-1">
          <span className="font-[family-name:var(--font-display)] text-[1.35rem] font-extrabold tracking-tight text-[var(--ink)]">
            Minha
          </span>
          <span className="font-[family-name:var(--font-display)] text-[1.35rem] font-extrabold tracking-tight text-[var(--accent)]">
            Espanha
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-[0.9rem] font-medium text-[var(--ink-muted)] transition hover:text-[var(--ink)]",
                  active && "text-[var(--ink)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/buscar"
            className="ml-3 rounded-lg bg-[var(--ink)] px-3.5 py-2 text-[0.9rem] font-semibold text-white transition hover:bg-[var(--accent)]"
          >
            Buscar
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-medium lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Abrir menu"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-[var(--line)] bg-white px-4 py-3 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-2 py-2.5 text-sm font-medium text-[var(--ink-muted)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/buscar"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg bg-[var(--ink)] px-3 py-2.5 text-center text-sm font-semibold text-white"
            >
              Buscar
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
