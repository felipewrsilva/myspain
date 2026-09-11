import { ContentCard } from "@/components/ContentCard";
import { getApostilas } from "@/lib/content";

export const metadata = {
  title: "Apostilas",
  description: "Materiais para ler no site e baixar em PDF.",
};

export default function ApostilasPage() {
  const apostilas = getApostilas();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-[var(--ink)]">Apostilas</h1>
      <p className="mt-3 max-w-2xl text-[var(--ink-muted)]">
        Materiais para estudar com calma: leitura no site e PDF para levar no celular.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {apostilas.map((item) => (
          <ContentCard
            key={item.slug}
            href={`/apostilas/${item.slug}`}
            title={item.title}
            description={item.description}
            bullets={item.bullets}
            meta="Leitura + PDF"
            image={item.cover}
            imageAlt={item.coverAlt}
          />
        ))}
      </div>
    </div>
  );
}
