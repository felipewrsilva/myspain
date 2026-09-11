import { NextResponse } from "next/server";
import { getApostila, getApostilas } from "@/lib/content";
import { apostilaPdfFilename, renderApostilaPdf } from "@/lib/apostila-pdf";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getApostilas().map((item) => ({ slug: item.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getApostila(slug);
  if (!item) {
    return new NextResponse("Apostila não encontrada", { status: 404 });
  }

  const pdf = await renderApostilaPdf(item);
  const body = new Uint8Array(pdf);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${apostilaPdfFilename(slug)}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
