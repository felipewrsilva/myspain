import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { getContentByStage } from "@/lib/content";
import { getStage, stages, type StageId } from "@/lib/site";

export function generateStaticParams() {
  return stages.map((stage) => ({ stage: stage.id }));
}

export async function generateMetadata({ params }: PageProps<"/etapas/[stage]">) {
  const { stage: stageId } = await params;
  const stage = getStage(stageId);
  if (!stage) return {};
  return {
    title: stage.title,
    description: stage.description,
  };
}

export default async function StagePage({ params }: PageProps<"/etapas/[stage]">) {
  const { stage: stageId } = await params;
  const stage = getStage(stageId);
  if (!stage) notFound();

  const content = getContentByStage(stage.id as StageId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Etapa</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--ink)] sm:text-5xl">
        {stage.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--ink-muted)]">{stage.description}</p>

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
