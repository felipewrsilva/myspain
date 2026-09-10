import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ContentCard({
  href,
  title,
  description,
  meta,
  image,
  imageAlt,
  className,
}: {
  href: string;
  title: string;
  description: string;
  meta?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-[var(--line)] bg-white transition duration-300 hover:border-[var(--accent-2)] hover:shadow-[0_24px_50px_-36px_rgba(20,24,31,0.55)]",
        className,
      )}
    >
      <span className="absolute inset-y-0 left-0 z-10 w-1 bg-[var(--accent)] opacity-0 transition group-hover:opacity-100" />
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
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold leading-snug text-[var(--ink)]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">{description}</p>
        <span className="mt-4 inline-block text-sm font-semibold text-[var(--accent)] opacity-0 transition group-hover:opacity-100">
          Abrir
        </span>
      </div>
    </Link>
  );
}
