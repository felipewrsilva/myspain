"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function navIsActive(href: string, pathname: string) {
  if (href.startsWith("/etapas/")) return pathname.startsWith("/etapas/");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" aria-label="Minha Espanha, ir para o início" className="group flex items-center gap-2.5 rounded-lg">
          <LogoMark className="size-9 text-[1.55rem]" />
          <span className="flex shrink-0 items-baseline gap-1 whitespace-nowrap">
            <span className="font-[family-name:var(--font-display)] text-[1.35rem] font-extrabold tracking-tight text-[var(--ink)]">
              Minha
            </span>
            <span className="font-[family-name:var(--font-display)] text-[1.35rem] font-extrabold tracking-tight text-[var(--accent)]">
              Espanha
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Principal">
          {siteConfig.nav.map((item) => {
            const active = navIsActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-2 text-[0.9rem] font-medium text-[var(--ink-muted)] transition hover:text-[var(--ink)]",
                  active && "font-semibold text-[var(--ink)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[var(--line)] px-3 text-sm font-medium xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="border-t border-[var(--line)] bg-white px-4 py-3 xl:hidden"
      >
        <nav className="mx-auto flex max-w-6xl flex-col" aria-label="Principal">
          {siteConfig.nav.map((item) => {
            const active = navIsActive(item.href, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium text-[var(--ink-muted)]",
                  active && "bg-[var(--paper-2)] text-[var(--ink)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
