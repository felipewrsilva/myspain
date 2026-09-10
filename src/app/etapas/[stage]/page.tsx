import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { CoverImage } from "@/components/CoverImage";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
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
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--ink)] sm:text-5xl">
        {stage.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--ink-muted)]">{stage.description}</p>

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

      <div className="mt-6 flex flex-wrap gap-2">
        {stages.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              item.id === stage.id
                ? "bg-[var(--ink)] text-white"
                : "border border-[var(--line)] bg-white text-[var(--ink-muted)]"
            }`}
          >
            {item.shortTitle}
          </a>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">Guias</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {content.guides.map((guide) => (
            <ContentCard
              key={guide.slug}
              href={`/guias/${guide.slug}`}
              title={guide.title}
              description={guide.description}
              image={guide.cover}
              imageAlt={guide.coverAlt}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">Checklists</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {content.checklists.map((item) => (
            <ContentCard
              key={item.slug}
              href={`/checklists/${item.slug}`}
              title={item.title}
              description={item.description}
              image={item.cover}
              imageAlt={item.coverAlt}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">Apostilas</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {content.apostilas.map((item) => (
            <ContentCard
              key={item.slug}
              href={`/apostilas/${item.slug}`}
              title={item.title}
              description={item.description}
              image={item.cover}
              imageAlt={item.coverAlt}
            />
          ))}
          {!content.apostilas.length ? (
            <p className="text-sm text-[var(--ink-muted)]">Nenhuma apostila nesta etapa por enquanto.</p>
          ) : null}
        </div>
      </section>

      <div className="mt-14">
        <WhatsAppCTA compact />
      </div>
    </div>
  );
}
