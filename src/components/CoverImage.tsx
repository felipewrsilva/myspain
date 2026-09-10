import Image from "next/image";
import { cn } from "@/lib/utils";

export function CoverImage({
  src,
  alt,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, 768px",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--paper-2)]",
        className,
      )}
    >
      <div className="relative aspect-[16/9]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
      </div>
    </figure>
  );
}
