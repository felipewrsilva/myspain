import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function CardBullets({ items, className }: { items: string[]; className?: string }) {
  if (!items.length) return null;

  return (
    <ul className={cn("mt-3 space-y-1.5 text-sm text-[var(--ink-muted)]", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ContentCard({
  href,
  title,
  description,
  bullets,
  meta,
  image,
  imageAlt,
  className,
}: {
  href: string;
  title: string;
  description?: string;
  bullets?: string[];
  meta?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}) {
  const points = bullets?.filter(Boolean) ?? [];

  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-[var(--line)] bg-white transition duration-300 hover:border-[var(--accent-2)] hover:shadow-[0_24px_50px_-36px_rgba(20,24,31,0.55)]",
        className,
      )}
    >
      <span className="absolute inset-y-0 left-0 z-10 w-1 bg-[var(--accent)]" />
      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--paper-2)]">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="p-6">
        {meta ? (
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">{meta}</p>
        ) : null}
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold leading-snug text-balance text-[var(--ink)]">
          {title}
        </h3>
        {points.length ? (
          <CardBullets items={points} />
        ) : description ? (
          <p className="mt-2 text-sm leading-relaxed text-pretty text-[var(--ink-muted)]">{description}</p>
        ) : null}
        <span className="mt-4 inline-block text-sm font-semibold text-[var(--accent)] transition group-hover:underline">
          Abrir
        </span>
      </div>
    </Link>
  );
}
