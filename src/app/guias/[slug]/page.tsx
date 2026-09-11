import Link from "next/link";
import { notFound } from "next/navigation";
import { PdfDownload } from "@/components/PdfDownload";
import { ContinueLinks } from "@/components/ContinueLinks";
import { CoverImage } from "@/components/CoverImage";
import { MdxContent } from "@/components/MdxContent";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { getContinuePages, getGuide, getGuides, getTopicName } from "@/lib/content";
import { contentPdfFilename, guidePdfPath } from "@/lib/apostila-pdf";
import { getStage } from "@/lib/site";

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guias/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    openGraph: guide.cover
      ? { images: [{ url: guide.cover, alt: guide.coverAlt ?? guide.title }] }
      : undefined,
  };
}

export default async function GuiaPage({ params }: PageProps<"/guias/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const stage = getStage(guide.stage);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Guia</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-balance text-[var(--ink)]">{guide.title}</h1>
      <p className="mt-4 text-lg text-pretty text-[var(--ink-muted)]">{guide.description}</p>
      <PdfDownload href={guidePdfPath(guide.slug)} filename={contentPdfFilename(guide.slug)} />
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {stage ? (
          <Link
            href={stage.href}
            className="inline-flex min-h-11 items-center rounded-full bg-[var(--paper-2)] px-3.5 text-[var(--ink)]"
          >
            {stage.title}
          </Link>
        ) : null}
        {guide.topics.map((topic) => (
          <span
            key={topic}
            className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-3.5 text-[var(--ink-muted)]"
          >
            {getTopicName(topic)}
          </span>
        ))}
      </div>
      {guide.cover ? (
        <div className="mt-8">
          <CoverImage src={guide.cover} alt={guide.coverAlt || guide.title} priority />
        </div>
      ) : null}
      <div className="mt-10">
        <MdxContent source={guide.content} />
      </div>
      <ContinueLinks key={guide.slug} currentHref={`/guias/${guide.slug}`} pages={getContinuePages()} />
      <div className="mt-12">
        <WhatsAppCTA compact />
      </div>
    </article>
  );
}
