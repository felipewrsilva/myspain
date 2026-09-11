import { ContentCard } from "@/components/ContentCard";
import { getChecklists } from "@/lib/content";

export const metadata = {
  title: "Checklists",
  description: "Listas passo a passo: número de estrangeiro, cadastro na prefeitura, banco e mais.",
};

export default function ChecklistsPage() {
  const checklists = getChecklists();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--ink)]">Checklists</h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
        {checklists.length} checklists com progresso salvo neste navegador.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {checklists.map((item) => (
          <ContentCard
            key={item.slug}
            href={`/checklists/${item.slug}`}
            title={item.title}
            description={item.description}
            bullets={item.bullets}
            meta={`${item.items.length} passos`}
            image={item.cover}
            imageAlt={item.coverAlt}
          />
        ))}
      </div>
    </div>
  );
}
