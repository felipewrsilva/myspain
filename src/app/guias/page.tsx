import Link from "next/link";
import { ContentCard } from "@/components/ContentCard";
import { getGuides, getTopicName } from "@/lib/content";
import { getStage } from "@/lib/site";

export const metadata = {
  title: "Guias",
  description:
    "Guias práticos para brasileiros na Espanha, organizados por tema e pela fase da jornada.",
};

export default function GuiasPage() {
  const guides = getGuides();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--ink)]">Guias</h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
        Do visto ao dia a dia: cada guia cobre um tema concreto. Se preferir pelo momento da viagem,
        comece em{" "}
        <Link href="/etapas/antes-de-ir" className="font-semibold text-[var(--ink)] underline-offset-2 hover:underline">
          Antes de ir
        </Link>
        ,{" "}
        <Link href="/etapas/acabei-de-chegar" className="font-semibold text-[var(--ink)] underline-offset-2 hover:underline">
          Acabei de chegar
        </Link>{" "}
        ou{" "}
        <Link href="/etapas/ja-moro" className="font-semibold text-[var(--ink)] underline-offset-2 hover:underline">
          Já moro
        </Link>
        .
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
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
  );
}
