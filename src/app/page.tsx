import Link from "next/link";
import Image from "next/image";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { ContentCard } from "@/components/ContentCard";
import { getGuides, getChecklists, getCover } from "@/lib/content";
import { stages, siteConfig } from "@/lib/site";

export default function HomePage() {
  const guides = getGuides().slice(0, 3);
  const checklists = getChecklists().slice(0, 3);

  return (
    <>
      <section className="relative isolate min-h-[92vh] overflow-hidden bg-[var(--ink)] text-white">
        <div
          className="anim-zoom absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(105deg, rgba(20,24,31,0.92) 18%, rgba(20,24,31,0.55) 55%, rgba(200,16,46,0.35) 100%), url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=2200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        <div className="mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-4 pb-20 pt-28 sm:px-6">
          <p className="anim-rise font-[family-name:var(--font-display)] text-[clamp(3.4rem,12vw,7.5rem)] font-extrabold leading-[0.9] tracking-tight">
            {siteConfig.name}
          </p>
          <h1
            className="anim-rise mt-6 max-w-xl text-xl font-medium text-white/90 sm:text-2xl"
            style={{ animationDelay: "0.1s" }}
          >
            Chegue preparado. Resolva a burocracia. Viva com método.
          </h1>
          <p
            className="anim-rise mt-4 max-w-lg text-base text-white/65"
            style={{ animationDelay: "0.18s" }}
          >
            Guias, checklists e apostilas para brasileiros na Espanha, sem cadastro e sem enrolação.
          </p>
          <div className="anim-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.26s" }}>
            <Link
              href="/etapas/antes-de-ir"
              className="inline-flex items-center justify-center rounded-lg bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              Começar pela minha etapa
            </Link>
            <Link
              href="/comunidade"
              className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Ir para a comunidade
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Jornada</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--ink)] sm:text-4xl">
              Em qual fase você está?
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--ink-muted)]">
            Cada etapa reúne o que importa agora: guias, checklists e apostilas no lugar certo.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stages.map((stage, index) => {
            const cover = getCover(stage.id);
            return (
              <Link
                key={stage.id}
                href={stage.href}
                className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-[var(--line)] transition hover:-translate-y-1 hover:ring-[var(--accent-2)]"
              >
                {cover ? (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                    <span className="absolute bottom-3 left-4 font-[family-name:var(--font-display)] text-4xl font-extrabold text-white/90">
                      0{index + 1}
                    </span>
                  </div>
                ) : (
                  <span className="block px-7 pt-7 font-[family-name:var(--font-display)] text-5xl font-extrabold text-[var(--paper-2)]">
                    0{index + 1}
                  </span>
                )}
                <div className="p-7 pt-5">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">{stage.description}</p>
                  <span className="mt-5 inline-block text-sm font-bold text-[var(--accent)]">Ver etapa</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">Guias para ler agora</h2>
              <p className="mt-2 text-[var(--ink-muted)]">Orientações objetivas, sem rodeio.</p>
            </div>
            <Link href="/guias" className="text-sm font-bold text-[var(--accent)] hover:underline">
              Todos os guias
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {guides.map((guide) => (
              <ContentCard
                key={guide.slug}
                href={`/guias/${guide.slug}`}
                title={guide.title}
                description={guide.description}
                meta="Guia"
                image={guide.cover}
                imageAlt={guide.coverAlt}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">Checklists</h2>
            <p className="mt-2 text-[var(--ink-muted)]">Marque no celular e avance passo a passo.</p>
          </div>
          <Link href="/checklists" className="text-sm font-bold text-[var(--accent)] hover:underline">
            Todos os checklists
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {checklists.map((item) => (
            <ContentCard
              key={item.slug}
              href={`/checklists/${item.slug}`}
              title={item.title}
              description={item.description}
              meta="Checklist"
              image={item.cover}
              imageAlt={item.coverAlt}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <WhatsAppCTA />
      </section>
    </>
  );
}
