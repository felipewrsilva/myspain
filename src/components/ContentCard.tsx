import Link from "next/link";
import { cn } from "@/lib/utils";

export function ContentCard({
  href,
  title,
  description,
  meta,
  className,
}: {
  href: string;
  title: string;
  description: string;
  meta?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-[var(--line)] bg-white p-6 transition duration-300 hover:border-[var(--accent-2)] hover:shadow-[0_24px_50px_-36px_rgba(20,24,31,0.55)]",
        className,
      )}
    >
      <span className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)] opacity-0 transition group-hover:opacity-100" />
      {meta ? (
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">{meta}</p>
      ) : null}
      <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold leading-snug text-[var(--ink)]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{description}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-[var(--accent)] opacity-0 transition group-hover:opacity-100">
        Abrir
      </span>
    </Link>
  );
}
