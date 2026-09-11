import { siteConfig } from "@/lib/site";

export function WhatsAppCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={
        compact
          ? "rounded-2xl border border-[var(--line)] bg-white p-6"
          : "relative overflow-hidden rounded-[1.75rem] bg-[var(--ink)] p-8 text-white sm:p-10"
      }
    >
      {!compact ? (
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        />
      ) : null}
      <p
        className={
          compact
            ? "text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent)]"
            : "text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white/50"
        }
      >
        Comunidade
      </p>
      <h2
        className={
          compact
            ? "mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]"
            : "mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-bold text-balance sm:text-4xl"
        }
      >
        Entre nos grupos do WhatsApp
      </h2>
      <p className={compact ? "mt-2 text-sm text-[var(--ink-muted)]" : "mt-3 max-w-xl text-white/65"}>
        Dúvidas reais, relatos atualizados e gente no mesmo caminho que você.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <a
          href={siteConfig.whatsapp.principal.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--accent)] px-5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          {siteConfig.whatsapp.principal.label}
          <span className="sr-only"> (abre o WhatsApp)</span>
        </a>
        <a
          href={siteConfig.whatsapp.comunidade.href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            compact
              ? "inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--line)] px-5 text-sm font-semibold text-[var(--ink)]"
              : "inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
          }
        >
          {siteConfig.whatsapp.comunidade.label}
          <span className="sr-only"> (abre o WhatsApp)</span>
        </a>
      </div>
    </section>
  );
}
