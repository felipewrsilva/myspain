import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Fale Conosco",
  description:
    "Entre em contato com a Minha Espanha por e-mail ou participe do grupo oficial no WhatsApp.",
};

export default function FaleConoscoPage() {
  const grupo = siteConfig.whatsapp.grupo;
  const email = siteConfig.contact.email;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
        Contato
      </p>
      <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-extrabold text-balance text-[var(--ink)] sm:text-5xl">
        Fale Conosco
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-pretty text-[var(--ink-muted)]">
        E-mail para falar com o projeto. WhatsApp para trocar experiência com quem está na mesma jornada.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <a
          href={`mailto:${email}`}
          className="rounded-2xl bg-[var(--ink)] p-8 text-white transition hover:-translate-y-0.5"
        >
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/50">
            E-mail
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold">
            Contato do projeto
          </h2>
          <p className="mt-3 text-white/70">
            Para falar com quem cuida da Minha Espanha sobre o site ou os anúncios.
          </p>
          <span className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-[var(--accent)] px-4 text-sm font-bold">
            {email}
          </span>
        </a>

        <a
          href={grupo.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-[var(--line)] bg-white p-8 transition hover:-translate-y-0.5 hover:border-[var(--accent-2)]"
        >
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">
            WhatsApp
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--ink)]">
            Grupo oficial
          </h2>
          <p className="mt-3 text-[var(--ink-muted)]">{grupo.description}</p>
          <span className="mt-6 inline-flex min-h-11 items-center rounded-lg border border-[var(--line)] px-4 text-sm font-bold text-[var(--ink)]">
            Entrar no WhatsApp
            <span className="sr-only"> (abre em nova aba)</span>
          </span>
        </a>
      </div>
    </div>
  );
}
