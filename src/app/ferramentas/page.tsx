import Link from "next/link";

export const metadata = {
  title: "Ferramentas",
  description: "Calculadora de custo de vida e conversor BRL/EUR.",
};

export default function FerramentasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">Ferramentas</h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
        Apoio rápido para planejar dinheiro e comparar valores.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/ferramentas/custo-de-vida"
          className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-6 transition hover:border-[var(--accent)]"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Custo de vida</h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Estimativa mensal por cidade e perfil (sozinho ou casal).
          </p>
        </Link>
        <Link
          href="/ferramentas/conversor"
          className="rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-6 transition hover:border-[var(--accent)]"
        >
          <h2 className="font-[family-name:var(--font-display)] text-2xl">Conversor BRL ↔ EUR</h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Cotação aproximada com base em API pública de câmbio.
          </p>
        </Link>
      </div>
    </div>
  );
}
