import { ContentCard } from "@/components/ContentCard";
import { getChecklistsForGuide, getGuides, getTopicName } from "@/lib/content";

export const metadata = {
  title: "Guias",
  description:
    "Guias práticos por etapa da jornada na Espanha, com checklist embutido quando houver passos para marcar.",
};

export default function GuiasPage() {
  const guides = getGuides();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--ink)]">Guias</h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
        {guides.length} guias. Leia no site ou baixe o PDF. O checklist, quando existir, fica no final de cada guia.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {guides.map((guide) => {
          const checklistCount = getChecklistsForGuide(guide.slug).length;
          const topics = guide.topics.map(getTopicName).slice(0, 2).join(" · ");
          const meta = checklistCount
            ? `${topics ? `${topics} · ` : ""}${checklistCount === 1 ? "checklist" : `${checklistCount} checklists`}`
            : topics;
          return (
            <ContentCard
              key={guide.slug}
              href={`/guias/${guide.slug}`}
              title={guide.title}
              description={guide.description}
              bullets={guide.bullets}
              meta={meta || undefined}
              image={guide.cover}
              imageAlt={guide.coverAlt}
            />
          );
        })}
      </div>
    </div>
  );
}
