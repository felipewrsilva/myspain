import Link from "next/link";
import { notFound } from "next/navigation";
import { AdContactLinks } from "@/components/AdContactLinks";
import { CardBullets } from "@/components/ContentCard";
import { CoverImage } from "@/components/CoverImage";
import { getAd, getAds } from "@/lib/anuncios";

export function generateStaticParams() {
  return getAds().map((ad) => ({ slug: ad.slug }));
}

export async function generateMetadata({ params }: PageProps<"/anuncios/[slug]">) {
  const { slug } = await params;
  const ad = getAd(slug);
  if (!ad) return {};
  return {
    title: ad.title,
    description: ad.summary,
    openGraph: {
      images: [{ url: ad.image, alt: ad.imageAlt }],
    },
  };
}

export default async function AnuncioPage({ params }: PageProps<"/anuncios/[slug]">) {
  const { slug } = await params;
  const ad = getAd(slug);
  if (!ad) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Anúncio</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-balance text-[var(--ink)]">
        {ad.title}
      </h1>
      {ad.tagline ? (
        <p className="mt-3 text-lg font-medium text-pretty text-[var(--ink)]">{ad.tagline}</p>
      ) : null}
      <p className="mt-3 text-lg text-pretty text-[var(--ink-muted)]">{ad.description}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="inline-flex min-h-11 items-center rounded-full bg-[var(--paper-2)] px-3.5 text-[var(--ink)]">
          {ad.category}
        </span>
        <span className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-3.5 text-[var(--ink-muted)]">
          {ad.location}
        </span>
        {ad.price ? (
          <span className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-3.5 text-[var(--ink-muted)]">
            {ad.price}
          </span>
        ) : null}
      </div>

      <div className="mt-8">
        <CoverImage src={ad.image} alt={ad.imageAlt} priority />
      </div>

      {ad.features.length ? (
        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
            O que inclui
          </h2>
          <CardBullets items={ad.features} className="mt-4 text-base" />
        </section>
      ) : null}

      <section className="mt-10 rounded-2xl border border-[var(--line)] bg-white p-6 sm:p-8">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-2)]">Contato</p>
        {ad.provider ? (
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
            {ad.provider}
          </h2>
        ) : (
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)]">
            Falar com o anunciante
          </h2>
        )}
        <ul className="mt-3 space-y-1 text-sm text-[var(--ink-muted)]">
          {ad.contacts.map((contact) => (
            <li key={`${contact.type}-${contact.value}`}>
              <span className="font-medium text-[var(--ink)]">{contact.label}:</span> {contact.value}
            </li>
          ))}
        </ul>
        <AdContactLinks contacts={ad.contacts} className="mt-6" />
      </section>

      <p className="mt-8 text-sm text-[var(--ink-muted)]">
        Este anúncio é publicado pela comunidade. Confirme detalhes e condições diretamente com o
        anunciante.
      </p>

      <p className="mt-6">
        <Link
          href="/anuncios"
          className="text-sm font-semibold text-[var(--accent)] transition hover:underline"
        >
          Voltar aos anúncios
        </Link>
      </p>
    </article>
  );
}
