import { ContentCard } from "@/components/ContentCard";
import { SearchForm } from "@/components/SearchForm";
import { searchContent } from "@/lib/content";

export const metadata = {
  title: "Buscar",
  description: "Busque guias, apostilas e checklists por etapa, cidade e tema.",
};

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cidade?: string; tema?: string; etapa?: string }>;
}) {
  const filters = await searchParams;
  const results = searchContent(filters);
  const hasFilters = Boolean(filters.q || filters.cidade || filters.tema || filters.etapa);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">Buscar</h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
        Filtre por texto, etapa, cidade e tema.
      </p>
      <div className="mt-8">
        <SearchForm defaults={filters} />
      </div>
      <p className="mt-6 text-sm text-[var(--ink-muted)]">
        {hasFilters ? `${results.length} resultado(s)` : "Use os filtros para refinar, ou veja tudo abaixo."}
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {results.map((item) => (
          <ContentCard
            key={`${item.type}-${item.href}`}
            href={item.href}
            title={item.title}
            description={item.description}
            meta={item.type}
            image={item.image}
            imageAlt={item.imageAlt}
          />
        ))}
      </div>
    </div>
  );
}
