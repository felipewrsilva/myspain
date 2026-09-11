import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Comunidade",
  description: "Participe dos grupos oficiais da Minha Espanha no WhatsApp.",
};

export default function ComunidadePage() {
  const { principal, comunidade } = siteConfig.whatsapp;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Comunidade</p>
      <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-extrabold text-balance text-[var(--ink)] sm:text-5xl">
        Encontre gente no mesmo caminho,
        <span className="block">nos grupos oficiais do WhatsApp</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-pretty text-[var(--ink-muted)]">
        Tire dúvidas, compare processos e troque indicações com respeito e objetividade.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <a
          href={principal.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-[var(--ink)] p-8 text-white transition hover:-translate-y-0.5"
        >
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/50">Principal</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold">{principal.label}</h2>
          <p className="mt-3 text-white/70">{principal.description}</p>
          <span className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[var(--accent)] px-4 text-sm font-bold">
            Entrar no WhatsApp
          </span>
        </a>

        <a
          href={comunidade.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-[var(--line)] bg-white p-8 transition hover:-translate-y-0.5 hover:border-[var(--accent-2)]"
        >
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">Dúvidas</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--ink)]">
            {comunidade.label}
          </h2>
          <p className="mt-3 text-[var(--ink-muted)]">{comunidade.description}</p>
          <span className="mt-6 inline-flex min-h-11 items-center rounded-lg border border-[var(--line)] px-4 text-sm font-bold text-[var(--ink)]">
            Entrar no WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
