export function YouTube({ id, title }: { id: string; title: string }) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
      <div className="relative aspect-video bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption className="px-4 py-2.5 text-sm text-[var(--ink-muted)]">{title}</figcaption>
    </figure>
  );
}
