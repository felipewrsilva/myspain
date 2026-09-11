import { notFound } from "next/navigation";
import { ChecklistClient } from "@/components/ChecklistClient";
import { ContinueLinks } from "@/components/ContinueLinks";
import { CoverImage } from "@/components/CoverImage";
import { PdfDownload } from "@/components/PdfDownload";
import { getChecklist, getChecklists, getContinuePages } from "@/lib/content";
import { checklistPdfPath, contentPdfFilename } from "@/lib/apostila-pdf";
import { getStage } from "@/lib/site";
import Link from "next/link";

export function generateStaticParams() {
  return getChecklists().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/checklists/[slug]">) {
  const { slug } = await params;
  const item = getChecklist(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    openGraph: item.cover
      ? { images: [{ url: item.cover, alt: item.coverAlt ?? item.title }] }
      : undefined,
  };
}

export default async function ChecklistPage({ params }: PageProps<"/checklists/[slug]">) {
  const { slug } = await params;
  const item = getChecklist(slug);
  if (!item) notFound();
  const stage = getStage(item.stage);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Checklist</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-balance text-[var(--ink)]">{item.title}</h1>
      <p className="mt-4 text-lg text-pretty text-[var(--ink-muted)]">{item.description}</p>
      <PdfDownload href={checklistPdfPath(item.slug)} filename={contentPdfFilename(item.slug)} />
      {stage ? (
        <Link href={stage.href} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--accent)] hover:underline">
          Ver etapa: {stage.title}
        </Link>
      ) : null}
      {item.cover ? (
        <div className="mt-8">
          <CoverImage src={item.cover} alt={item.coverAlt || item.title} priority />
        </div>
      ) : null}
      <div className="mt-8">
        <ChecklistClient slug={item.slug} items={item.items} />
      </div>
      <ContinueLinks key={item.slug} currentHref={`/checklists/${item.slug}`} pages={getContinuePages()} />
    </div>
  );
}
