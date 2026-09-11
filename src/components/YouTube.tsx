export function YouTube({ id, title }: { id: string; title: string }) {
  const params = new URLSearchParams({
    hl: "pt",
    cc_lang_pref: "pt",
    rel: "0",
  });

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
      <div className="relative aspect-video bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption className="px-4 py-2.5 text-sm text-[var(--ink-muted)]">
        {title}
        <span className="mt-0.5 block text-xs">Em português do Brasil. Complementa o texto; a regra oficial está nos links .gob.es.</span>
      </figcaption>
    </figure>
  );
}
