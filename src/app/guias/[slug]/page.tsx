import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/MdxContent";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { getGuide, getGuides, getTopicName } from "@/lib/content";
import { getStage } from "@/lib/site";

export function generateStaticParams() {
  return getGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guias/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description };
}

export default async function GuiaPage({ params }: PageProps<"/guias/[slug]">) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const stage = getStage(guide.stage);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">Guia</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl text-[var(--ink)]">{guide.title}</h1>
      <p className="mt-4 text-lg text-[var(--ink-muted)]">{guide.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {stage ? (
          <Link href={stage.href} className="rounded-full bg-[var(--paper-2)] px-3 py-1 text-[var(--ink)]">
            {stage.title}
          </Link>
        ) : null}
        {guide.topics.map((topic) => (
          <span key={topic} className="rounded-full border border-[var(--line)] px-3 py-1 text-[var(--ink-muted)]">
            {getTopicName(topic)}
          </span>
        ))}
      </div>
      <div className="mt-10">
        <MdxContent source={guide.content} />
      </div>
      <div className="mt-12">
        <WhatsAppCTA compact />
      </div>
    </article>
  );
}
