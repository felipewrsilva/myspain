import { NextResponse } from "next/server";
import { getGuide, getGuides } from "@/lib/content";
import { contentPdfFilename, renderMarkdownPdf } from "@/lib/apostila-pdf";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getGuides().map((item) => ({ slug: item.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getGuide(slug);
  if (!item) {
    return new NextResponse("Guia não encontrado", { status: 404 });
  }

  const pdf = await renderMarkdownPdf({
    title: item.title,
    description: item.description,
    content: item.content,
    kicker: "Guia",
    path: `/guias/${slug}`,
  });
  const body = new Uint8Array(pdf);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${contentPdfFilename(slug)}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
