import Link from "next/link";
import Image from "next/image";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { ContentCard, CardBullets } from "@/components/ContentCard";
import { getGuides, getCover, getTopicName } from "@/lib/content";
import { stages, getStage } from "@/lib/site";

const featuredGuideSlugs = ["visto-e-residencia", "primeiros-30-dias", "planejamento-financeiro"];

function pickBySlug<T extends { slug: string }>(items: T[], slugs: string[]) {
  return slugs
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => Boolean(item));
}

export default function HomePage() {
  const guides = pickBySlug(getGuides(), featuredGuideSlugs);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[var(--ink)] text-white md:min-h-[92vh]">
        <div
          className="anim-zoom absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(105deg, rgba(20,24,31,0.92) 18%, rgba(20,24,31,0.55) 55%, rgba(200,16,46,0.35) 100%), url('/images/unsplash/photo-1539037116277-4db20889f2d4.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        <div className="mx-auto flex max-w-6xl flex-col px-4 pb-10 pt-16 sm:px-6 md:min-h-[92vh] md:justify-end md:pb-20 md:pt-28">
          <p className="anim-rise max-w-full font-[family-name:var(--font-display)] text-[clamp(2.75rem,12vw,6.5rem)] font-extrabold leading-[0.88] tracking-tight">
            <span className="block">Minha</span>
            <span className="block">Espanha</span>
          </p>
          <h1
            className="anim-rise mt-6 max-w-xl text-xl font-medium text-white/90 sm:text-2xl"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block">Chegue preparado.</span>
            <span className="block">Resolva a burocracia.</span>
            <span className="block">Viva com método.</span>
          </h1>
          <p
            className="anim-rise mt-4 max-w-xl text-base text-pretty text-white/65"
            style={{ animationDelay: "0.18s" }}
          >
            Guias práticos para quem vai ou já mora na Espanha. Escolha a fase da jornada e avance com método.
          </p>
          <div className="anim-rise mt-9" style={{ animationDelay: "0.26s" }}>
            <Link
              href="/etapas/antes-de-ir"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[var(--accent)] px-6 text-sm font-bold text-white transition hover:brightness-110"
            >
              Começar pela minha etapa
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
            Três momentos da jornada. Em cada um, os guias que importam naquele ponto.
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
                  <CardBullets items={stage.bullets} />
                  <span className="mt-5 inline-block text-sm font-bold text-[var(--accent)]">Ver etapa</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">Guias para ler agora</h2>
              <p className="mt-2 text-[var(--ink-muted)]">
                Temas que mais travam quem está de mudança. Abra um e siga dali.
              </p>
            </div>
            <Link href="/guias" className="inline-flex min-h-11 shrink-0 items-center text-sm font-bold text-[var(--accent)] hover:underline">
              Todos os guias
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {guides.map((guide) => {
              const stage = getStage(guide.stage);
              const topics = guide.topics.map(getTopicName).slice(0, 2).join(" · ");
              const meta = [stage?.shortTitle, topics].filter(Boolean).join(" · ") || undefined;
              return (
                <ContentCard
                  key={guide.slug}
                  href={`/guias/${guide.slug}`}
                  title={guide.title}
                  description={guide.description}
                  bullets={guide.bullets}
                  meta={meta}
                  image={guide.cover}
                  imageAlt={guide.coverAlt}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <WhatsAppCTA />
      </section>
    </>
  );
}
