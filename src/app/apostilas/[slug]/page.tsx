import { notFound } from "next/navigation";
import { ContinueLinks } from "@/components/ContinueLinks";
import { CoverImage } from "@/components/CoverImage";
import { MdxContent } from "@/components/MdxContent";
import { getApostila, getApostilas, getContinuePages } from "@/lib/content";

export function generateStaticParams() {
  return getApostilas().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/apostilas/[slug]">) {
  const { slug } = await params;
  const item = getApostila(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    openGraph: item.cover
      ? { images: [{ url: item.cover, alt: item.coverAlt ?? item.title }] }
      : undefined,
  };
}

export default async function ApostilaPage({ params }: PageProps<"/apostilas/[slug]">) {
  const { slug } = await params;
  const item = getApostila(slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Apostila</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">{item.title}</h1>
      <p className="mt-4 text-lg text-[var(--ink-muted)]">{item.description}</p>
      {item.pdf ? (
        <a
          href={item.pdf}
          className="mt-6 inline-flex rounded-xl bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] hover:bg-[var(--accent)]"
          download
        >
          Baixar PDF
        </a>
      ) : (
        <p className="mt-6 text-sm text-[var(--ink-muted)]">
          PDF em preparação. Por enquanto, use a leitura online abaixo.
        </p>
      )}
      {item.cover ? (
        <div className="mt-8">
          <CoverImage src={item.cover} alt={item.coverAlt || item.title} priority />
        </div>
      ) : null}
      <div className="mt-10">
        <MdxContent source={item.content} />
      </div>
      <ContinueLinks key={item.slug} currentHref={`/apostilas/${item.slug}`} pages={getContinuePages()} />
    </article>
  );
}
