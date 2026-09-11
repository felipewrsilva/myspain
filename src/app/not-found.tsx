import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">404</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--ink)]">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-xl text-lg text-pretty text-[var(--ink-muted)]">
        Esse endereço não existe ou foi movido. Volte ao início ou escolha a etapa em que você está.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--accent)] px-5 text-sm font-bold text-white transition hover:brightness-110"
        >
          Ir para o início
        </Link>
        <Link
          href="/etapas/antes-de-ir"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--line)] bg-white px-5 text-sm font-semibold text-[var(--ink)]"
        >
          Ver etapas
        </Link>
      </div>
    </div>
  );
}
