import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  dica: {
    label: "Dica",
    className:
      "border-[var(--accent-2)] bg-[color-mix(in_oklab,var(--accent-2)_8%,white)]",
    labelClass: "text-[var(--accent-2)]",
  },
  aviso: {
    label: "Atenção",
    className: "border-[#b45309] bg-[#fff7ed]",
    labelClass: "text-[#b45309]",
  },
  "nao-pode": {
    label: "Não pode",
    className:
      "border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_7%,white)]",
    labelClass: "text-[var(--accent)]",
  },
} as const;

export function Callout({
  variant = "dica",
  children,
}: {
  variant?: keyof typeof variants;
  children: ReactNode;
}) {
  const style = variants[variant] ?? variants.dica;

  return (
    <aside className={cn("my-6 rounded-2xl border px-4 py-4 sm:px-5", style.className)}>
      <p className={cn("mb-2 text-[0.7rem] font-bold uppercase tracking-[0.14em]", style.labelClass)}>
        {style.label}
      </p>
      <div className="text-[var(--ink)] [&_a]:font-semibold [&_a]:text-[var(--accent)] [&_p]:mb-0 [&_p]:text-[var(--ink)] [&_ul]:mb-0">
        {children}
      </div>
    </aside>
  );
}
