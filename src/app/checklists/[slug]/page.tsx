import { notFound } from "next/navigation";
import { ChecklistClient } from "@/components/ChecklistClient";
import { getChecklist, getChecklists } from "@/lib/content";
import { getStage } from "@/lib/site";
import Link from "next/link";

export function generateStaticParams() {
  return getChecklists().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/checklists/[slug]">) {
  const { slug } = await params;
  const item = getChecklist(slug);
  if (!item) return {};
  return { title: item.title, description: item.description };
}

export default async function ChecklistPage({ params }: PageProps<"/checklists/[slug]">) {
  const { slug } = await params;
  const item = getChecklist(slug);
  if (!item) notFound();
  const stage = getStage(item.stage);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Checklist</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">{item.title}</h1>
      <p className="mt-4 text-lg text-[var(--ink-muted)]">{item.description}</p>
      {stage ? (
        <Link href={stage.href} className="mt-4 inline-block text-sm text-[var(--accent)] hover:underline">
          Ver etapa: {stage.title}
        </Link>
      ) : null}
      <div className="mt-8">
        <ChecklistClient slug={item.slug} items={item.items} />
      </div>
    </div>
  );
}
