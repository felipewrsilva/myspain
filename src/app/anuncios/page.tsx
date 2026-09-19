import { ContentCard } from "@/components/ContentCard";
import { getAds } from "@/lib/anuncios";

export const metadata = {
  title: "Anúncios",
  description:
    "Anúncios de brasileiros na Espanha: serviços e oportunidades da comunidade, com contato direto.",
};

export default function AnunciosPage() {
  const items = getAds();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Anúncios</p>
      <h1 className="mt-2 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-extrabold text-balance text-[var(--ink)] sm:text-5xl">
        Serviços e oportunidades da comunidade
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-pretty text-[var(--ink-muted)]">
        Espaço simples para anúncios de brasileiros na Espanha. Abra o card para ver detalhes e
        falar com o anunciante. A Minha Espanha divulga, mas não intermedia nem garante os
        serviços anunciados.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {items.map((ad) => (
          <ContentCard
            key={ad.slug}
            href={`/anuncios/${ad.slug}`}
            title={ad.title}
            description={ad.summary}
            bullets={ad.features}
            meta={`${ad.subcategory ?? ad.category} · ${ad.location}`}
            image={ad.image}
            imageAlt={ad.imageAlt}
          />
        ))}
      </div>
    </div>
  );
}
