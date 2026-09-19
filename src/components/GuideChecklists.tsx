import { ChecklistClient } from "@/components/ChecklistClient";
import { PdfDownload } from "@/components/PdfDownload";
import {
  checklistAnchor,
  type Checklist,
} from "@/lib/content";
import { checklistPdfPath, contentPdfFilename } from "@/lib/apostila-pdf";

export function GuideChecklists({ checklists }: { checklists: Checklist[] }) {
  if (!checklists.length) return null;

  return (
    <section className="mt-14 space-y-12 border-t border-[var(--line)] pt-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
          Checklist{checklists.length > 1 ? "s" : ""}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ink)] sm:text-3xl">
          Marque o que já resolveu
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--ink-muted)]">
          O progresso fica neste navegador. Se preferir papel, baixe o PDF abaixo.
        </p>
      </div>

      {checklists.map((item) => (
        <div
          key={item.slug}
          id={checklistAnchor(item.slug)}
          className="scroll-mt-28"
        >
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)] sm:text-2xl">
            {item.title}
          </h3>
          <p className="mt-2 text-pretty text-[var(--ink-muted)]">{item.description}</p>
          <PdfDownload
            href={checklistPdfPath(item.slug)}
            filename={contentPdfFilename(item.slug)}
          />
          <div className="mt-6">
            <ChecklistClient slug={item.slug} items={item.items} />
          </div>
        </div>
      ))}
    </section>
  );
}
