import { NextResponse } from "next/server";
import { getChecklist, getChecklists } from "@/lib/content";
import { contentPdfFilename, renderChecklistPdf } from "@/lib/apostila-pdf";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getChecklists().map((item) => ({ slug: item.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getChecklist(slug);
  if (!item) {
    return new NextResponse("Checklist não encontrado", { status: 404 });
  }

  const pdf = await renderChecklistPdf(item);
  const body = new Uint8Array(pdf);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${contentPdfFilename(slug)}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
