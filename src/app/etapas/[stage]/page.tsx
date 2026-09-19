import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { CoverImage } from "@/components/CoverImage";
import { getContentByStage, getCover } from "@/lib/content";
import { getStage, stages, type StageId } from "@/lib/site";

export function generateStaticParams() {
  return stages.map((stage) => ({ stage: stage.id }));
}

export async function generateMetadata({ params }: PageProps<"/etapas/[stage]">) {
  const { stage: stageId } = await params;
  const stage = getStage(stageId);
  if (!stage) return {};
  const cover = getCover(stage.id);
  return {
    title: stage.title,
    description: stage.description,
    openGraph: cover ? { images: [{ url: cover.src, alt: cover.alt }] } : undefined,
  };
}

export default async function StagePage({ params }: PageProps<"/etapas/[stage]">) {
  const { stage: stageId } = await params;
  const stage = getStage(stageId);
  if (!stage) notFound();

  const content = getContentByStage(stage.id as StageId);
  const cover = getCover(stage.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Etapa</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-balance text-[var(--ink)] sm:text-5xl">
        {stage.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-pretty text-[var(--ink-muted)]">{stage.description}</p>

      {cover ? (
        <div className="mt-8">
          <CoverImage
            src={cover.src}
            alt={cover.alt}
            priority
            sizes="(max-width: 768px) 100vw, 1152px"
          />
        </div>
      ) : null}

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Trocar etapa">
        {stages.map((item) => {
          const current = item.id === stage.id;
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-semibold ${
                current
                  ? "bg-[var(--ink)] text-white"
                  : "border border-[var(--line)] bg-white text-[var(--ink-muted)]"
              }`}
            >
              {item.shortTitle}
            </Link>
          );
        })}
      </nav>

      {content.guides.length ? (
        <section className="mt-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">Guias</h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--ink-muted)]">
            Cada guia traz o texto completo. Quando houver passos para marcar, o checklist fica no final da página.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {content.guides.map((guide) => (
              <ContentCard
                key={guide.slug}
                href={`/guias/${guide.slug}`}
                title={guide.title}
                description={guide.description}
                bullets={guide.bullets}
                image={guide.cover}
                imageAlt={guide.coverAlt}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
