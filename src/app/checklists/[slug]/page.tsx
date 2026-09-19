import { notFound, permanentRedirect } from "next/navigation";
import { getChecklist, getChecklists } from "@/lib/content";

export function generateStaticParams() {
  return getChecklists().map((item) => ({ slug: item.slug }));
}

export default async function ChecklistRedirectPage({
  params,
}: PageProps<"/checklists/[slug]">) {
  const { slug } = await params;
  const item = getChecklist(slug);
  if (!item) notFound();
  // Hash na Location nem sempre sobrevive ao redirect HTTP; a guia hospeda o checklist.
  permanentRedirect(`/guias/${item.guia}`);
}
