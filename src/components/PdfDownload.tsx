export function PdfDownload({
  href,
  filename,
}: {
  href: string;
  filename: string;
}) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
      <a
        href={href}
        download={filename}
        className="inline-flex min-h-11 items-center rounded-xl bg-[var(--ink)] px-5 text-sm font-medium text-[var(--paper)] hover:bg-[var(--accent)]"
      >
        Baixar PDF
      </a>
      <p className="text-sm text-[var(--ink-muted)]">Mesmo conteúdo, para imprimir ou ler offline.</p>
    </div>
  );
}
